/**
 * ════════════════════════════════════════════════════════════════════════
 *  novus-core.js  ·  Shared runtime for all Novus Ops pages
 *  ─────────────────────────────────────────────────────────────────────
 *  SETUP:  Replace API_URL below with your /exec deployment URL.
 *
 *  Exports (globals used by all pages):
 *    API_URL          — GAS web-app endpoint
 *    AISLE_ROWS       — Plant 1730 warehouse aisle letters
 *    toast(msg,type)  — hardware-accelerated notification banner
 *    NovusLoader      — thin top-bar progress indicator + skeletons
 *    NovusSettings    — localStorage prefs + settings modal
 * ════════════════════════════════════════════════════════════════════════
 */

/* ── ① API ENDPOINT ────────────────────────────────────────────────── */
/* Replace with your deployed GAS URL after running "Deploy as web app" */
const API_URL = 'https://script.google.com/macros/s/AKfycbxmMxyKwpLfOeRSJJhwfrSiP_j75Qn-Un_nvVxt9ipA40cgOqwopBr68Z-rMQF52z2-/exec';


/* ── ② PLANT CONFIGURATION ─────────────────────────────────────────── */
/* Ordered aisle letters for Plant 1730 (skip I to avoid confusion)    */
const AISLE_ROWS = ['A','B','C','D','E','F','G','H','J','K','L','M','N'];


/* ════════════════════════════════════════════════════════════════════════
   ③ TOAST NOTIFICATION
   ════════════════════════════════════════════════════════════════════════
   Usage: toast('Saved!', 'green')   types: green | red | blue | amber | pink
   Animates via opacity only (GPU-composited — no layout thrash).
   Re-calling before expiry resets the timer cleanly.
════════════════════════════════════════════════════════════════════════ */
(function _ensureToastDOM() {
  /* Inject toast element if the page omitted it (defensive) */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _inject);
  } else {
    _inject();
  }
  function _inject() {
    if (document.getElementById('toast')) return;
    const el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.innerHTML = '<span id="toast-text"></span>';
    document.body.appendChild(el);
  }
})();

let _toastTimer = null;
function toast(msg, type = 'blue', duration = 3000) {
  const el   = document.getElementById('toast');
  const text = document.getElementById('toast-text');
  if (!el || !text) return;

  if (_toastTimer) clearTimeout(_toastTimer);

  text.textContent = msg;
  el.className = 'toast ' + type;
  void el.offsetWidth; // force reflow so transition fires on re-trigger
  el.classList.add('show');

  _toastTimer = setTimeout(() => {
    el.classList.remove('show');
    _toastTimer = null;
  }, duration);
}


/* ════════════════════════════════════════════════════════════════════════
   ④ NOVUS LOADER
   ════════════════════════════════════════════════════════════════════════
   Thin progress bar pinned to the top of the viewport.
   Call start() before async work, done() when finished.
   Stacking-safe: N calls to start() require N calls to done().
   Animates only transform + opacity (zero layout cost).
════════════════════════════════════════════════════════════════════════ */
const NovusLoader = (() => {
  let _depth = 0;
  let _bar   = null;
  let _timer = null;

  function _ensureBar() {
    if (_bar) return;
    _bar = document.createElement('div');
    _bar.id = '_nv_loader';
    Object.assign(_bar.style, {
      position:        'fixed',
      top:             '0',
      left:            '0',
      height:          '3px',
      width:           '0%',
      background:      'var(--accent, #5b9aff)',
      zIndex:          '9999',
      pointerEvents:   'none',
      transition:      'width .45s ease, opacity .3s ease',
      opacity:         '0',
      willChange:      'width, opacity',
    });
    if (document.body) {
      document.body.appendChild(_bar);
    } else {
      document.addEventListener('DOMContentLoaded', () => document.body.appendChild(_bar));
    }
  }

  /**
   * start() — call before any async fetch or heavy operation.
   * Animates bar to 75% (never completes until done() is called).
   */
  function start() {
    _ensureBar();
    _depth++;
    if (_timer) { clearTimeout(_timer); _timer = null; }
    _bar.style.opacity = '1';
    requestAnimationFrame(() => { _bar.style.width = '75%'; });
  }

  /**
   * done() — call in finally{} after the operation completes.
   * Advances bar to 100%, fades out, resets.
   */
  function done() {
    _ensureBar();
    if (_depth > 0) _depth--;
    if (_depth > 0) return; // still loading from another call
    _bar.style.width = '100%';
    _timer = setTimeout(() => {
      _bar.style.opacity = '0';
      setTimeout(() => {
        if (_depth === 0) _bar.style.width = '0%';
      }, 300);
      _timer = null;
    }, 250);
  }

  /**
   * skeletonAisleCards(n) — returns placeholder HTML for the aisle grid
   * while SAP data loads.  Matches .aisle-btn structure in scanner.html.
   */
  function skeletonAisleCards(n) {
    return Array.from({ length: n }, (_, i) => {
      const letter = AISLE_ROWS[i] || '?';
      return `<button class="aisle-btn" style="pointer-events:none;cursor:default;opacity:.45" disabled>
        <span class="a-letter">${letter}</span>
        <span class="a-count">—/—</span>
        <div class="aisle-prog" style="width:0%"></div>
      </button>`;
    }).join('');
  }

  return { start, done, skeletonAisleCards };
})();


/* ════════════════════════════════════════════════════════════════════════
   ⑤ NOVUS SETTINGS
   ════════════════════════════════════════════════════════════════════════
   Persists preferences to localStorage under key 'novus_prefs_v2'.
   Injects a settings modal into the page on first openModal() call.

   Public API:
     NovusSettings.openModal()          — shows settings overlay
     NovusSettings.closeModal()         — hides it
     NovusSettings.saveAndClose()       — commits and closes
     NovusSettings.getUser()            — returns saved name string
     NovusSettings.get(key)             — reads any pref
     NovusSettings.set(key, value)      — writes pref + fires event
     NovusSettings._toggle(key, btnId)  — internal toggle used by modal

   Fires window event 'novus-settings-changed' after any set() or save.
════════════════════════════════════════════════════════════════════════ */
const NovusSettings = (() => {
  const STORAGE_KEY = 'novus_prefs_v2';

  const DEFAULTS = {
    userName:       '',
    hapticFeedback: true,
    compactMode:    false,
  };

  /* ── Storage ── */
  function _load() {
    try {
      return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch (_) {
      return { ...DEFAULTS };
    }
  }
  function _persist(prefs) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (_) {}
  }

  let _prefs = _load();

  function get(key)      { return _prefs[key]; }
  function getUser()     { return _prefs.userName || ''; }
  function set(key, val) {
    _prefs[key] = val;
    _persist(_prefs);
    _applyPrefs();
    window.dispatchEvent(new CustomEvent('novus-settings-changed', { detail: { key, val } }));
  }

  /* ── Apply preferences to document ── */
  function _applyPrefs() {
    document.body.classList.toggle('compact-mode', !!_prefs.compactMode);
  }

  /* ─────────────────────────────────────────────────────────────────
     MODAL MARKUP
     Injected once on first openModal() call.  Uses inline styles so
     it works across all pages without a shared stylesheet dependency.
  ───────────────────────────────────────────────────────────────────*/
  function _buildModal() {
    const overlay = document.createElement('div');
    overlay.id = '_nv_overlay';
    Object.assign(overlay.style, {
      display:        'none',
      position:       'fixed',
      inset:          '0',
      background:     'rgba(0,0,0,.8)',
      backdropFilter: 'blur(8px)',
      zIndex:         '10000',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '20px',
    });

    overlay.innerHTML = `
      <div id="_nv_box" style="
        background:var(--surface,#181a23);
        width:100%;max-width:400px;
        border-radius:20px;
        border:1px solid var(--border,#313546);
        box-shadow:0 32px 80px rgba(0,0,0,.75);
        overflow:hidden;
        animation:_nv_rise .25s cubic-bezier(.34,1.56,.64,1);
      ">
        <style>
          @keyframes _nv_rise{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
          ._nv_toggle{width:52px;height:28px;border-radius:14px;border:none;cursor:pointer;
            position:relative;transition:background .2s;flex-shrink:0}
          ._nv_knob{position:absolute;top:3px;left:3px;width:22px;height:22px;
            background:#fff;border-radius:50%;transition:transform .2s;
            box-shadow:0 2px 4px rgba(0,0,0,.3);pointer-events:none}
          ._nv_row{display:flex;justify-content:space-between;align-items:center}
          ._nv_label{font-size:13px;font-weight:600;color:var(--text,#eceef4);
            font-family:'DM Sans',sans-serif}
          ._nv_field{width:100%;padding:12px 14px;
            background:var(--surface-2,#1f2230);
            border:1.5px solid var(--border,#313546);border-radius:12px;
            font-size:15px;font-weight:600;color:var(--text,#eceef4);
            outline:none;font-family:'DM Sans',sans-serif;
            transition:border-color .15s;box-sizing:border-box}
        </style>

        <!-- Header -->
        <div style="padding:16px 20px;border-bottom:1px solid var(--border,#313546);
                    display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:15px;font-weight:800;color:var(--text,#eceef4);
                       font-family:'DM Sans',sans-serif">⚙ Settings</span>
          <button onclick="NovusSettings.closeModal()" style="
            background:none;color:var(--text-3,#6c7189);
            font-size:18px;font-weight:900;border:none;cursor:pointer;line-height:1">✕</button>
        </div>

        <!-- Body -->
        <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
          <!-- Name field -->
          <div>
            <div style="font-size:8px;font-weight:800;text-transform:uppercase;
                        letter-spacing:1.5px;color:var(--text-3,#6c7189);
                        margin-bottom:7px;font-family:'DM Sans',sans-serif">
              Your Name / Badge ID
            </div>
            <input id="_nv_name" type="text" class="_nv_field"
              placeholder="Enter your name…"
              onfocus="this.style.borderColor='var(--accent,#5b9aff)'"
              onblur="this.style.borderColor='var(--border,#313546)'">
          </div>

          <!-- Haptic toggle -->
          <div class="_nv_row">
            <span class="_nv_label">Haptic Feedback</span>
            <button id="_nv_haptic" class="_nv_toggle"
              onclick="NovusSettings._toggle('hapticFeedback','_nv_haptic')">
              <div class="_nv_knob"></div>
            </button>
          </div>

          <!-- Compact mode toggle -->
          <div class="_nv_row">
            <span class="_nv_label">Compact Mode</span>
            <button id="_nv_compact" class="_nv_toggle"
              onclick="NovusSettings._toggle('compactMode','_nv_compact')">
              <div class="_nv_knob"></div>
            </button>
          </div>

          <!-- App info -->
          <div style="font-size:9px;color:var(--text-3,#6c7189);text-align:center;
                      font-family:'DM Sans',sans-serif;margin-top:4px">
            Novus Foods · Plant 1730 · Buena Park, CA
          </div>
        </div>

        <!-- Footer -->
        <div style="padding:14px 20px;border-top:1px solid var(--border,#313546)">
          <button onclick="NovusSettings.saveAndClose()" style="
            width:100%;padding:14px;border-radius:12px;
            background:var(--accent,#5b9aff);color:#fff;
            font-size:13px;font-weight:800;border:none;cursor:pointer;
            font-family:'DM Sans',sans-serif;
            text-transform:uppercase;letter-spacing:.5px;transition:filter .15s">
            Save Settings
          </button>
        </div>
      </div>`;

    /* Close on backdrop click */
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });

    return overlay;
  }

  /* ── Toggle helper (used by modal buttons) ── */
  function _updateToggleUI(id, val) {
    const btn  = document.getElementById(id); if (!btn) return;
    const knob = btn.querySelector('._nv_knob');
    btn.style.background = val ? 'var(--accent,#5b9aff)' : 'var(--surface-3,#2a2d3a)';
    if (knob) knob.style.transform = val ? 'translateX(24px)' : 'translateX(0)';
  }

  function _syncModalUI() {
    const nameEl = document.getElementById('_nv_name');
    if (nameEl) nameEl.value = _prefs.userName || '';
    _updateToggleUI('_nv_haptic',  _prefs.hapticFeedback);
    _updateToggleUI('_nv_compact', _prefs.compactMode);
  }

  /* ── Public modal controls ── */
  function openModal() {
    if (!document.getElementById('_nv_overlay')) {
      document.body.appendChild(_buildModal());
    }
    _syncModalUI();
    const overlay = document.getElementById('_nv_overlay');
    overlay.style.display = 'flex';
  }

  function closeModal() {
    const overlay = document.getElementById('_nv_overlay');
    if (overlay) overlay.style.display = 'none';
  }

  function saveAndClose() {
    const nameEl = document.getElementById('_nv_name');
    if (nameEl) _prefs.userName = nameEl.value.trim();
    _persist(_prefs);
    _applyPrefs();
    window.dispatchEvent(new CustomEvent('novus-settings-changed', { detail: { ..._prefs } }));
    closeModal();
    toast(`Saved · Hello, ${_prefs.userName || 'there'}! 👋`, 'green');
  }

  /* Called by modal toggle buttons (exposed on NovusSettings so inline onclick works) */
  function _toggle(key, btnId) {
    _prefs[key] = !_prefs[key];
    _updateToggleUI(btnId, _prefs[key]);
  }

  /* ── Global keyboard shortcut (Escape closes modal) ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Apply prefs on load ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _applyPrefs);
  } else {
    _applyPrefs();
  }

  return { get, set, getUser, openModal, closeModal, saveAndClose, _toggle };
})();
