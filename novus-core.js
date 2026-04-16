/**
 * novus-core.js — Shared utilities for Novus Ops · Plant 1730
 * ─────────────────────────────────────────────────────────────
 * Include this file ONCE in every page's <head> BEFORE page-specific scripts.
 * Provides: API_URL, AISLE_ROWS, NovusSettings, window.toast, NovusLoader
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

// ═══════════════════════════════════════════════════════════
// GLOBAL CONSTANTS
// ═══════════════════════════════════════════════════════════

/** Google Apps Script deployment endpoint */
const API_URL = 'https://script.google.com/macros/s/AKfycbwZ1Dhmf6cK_hWV2xLKYmwEImUvifIRCPqVm0Fz4E7gjvfcpyzoqhAFIgvgwrjBretc/exec';

/** Warehouse aisle letters (no I or O to avoid barcode confusion) */
const AISLE_ROWS = 'ABCDEFGHJKLMNP'.split('');


// ═══════════════════════════════════════════════════════════
// NOVUS SETTINGS — Persistent user preferences + theme engine
// ═══════════════════════════════════════════════════════════

const NovusSettings = (() => {
  const STORAGE_KEY = 'novus_settings';
  const DEFAULTS = {
    userName:       '',
    theme:          'dark',
    pollInterval:   10,
    hapticFeedback: true,
    compactMode:    false,
  };

  /* ── CSS variable maps ── */
  const LIGHT_VARS = {
    '--bg':         '#f8f9fb',
    '--surface':    '#ffffff',
    '--surface-2':  '#f1f3f5',
    '--surface-3':  '#e5e7eb',
    '--border':     '#d1d5dc',
    '--text':       '#111827',
    '--text-2':     '#374151',
    '--text-3':     '#6b7280',
    '--accent':     '#2563eb',
    '--accent-dim': 'rgba(37,99,235,.07)',
    '--green':      '#059669',
    '--green-bg':   'rgba(5,150,105,.08)',
    '--red':        '#dc2626',
    '--red-bg':     'rgba(220,38,38,.07)',
    '--amber':      '#b45309',
    '--amber-bg':   'rgba(180,83,9,.07)',
    '--purple':     '#7c3aed',
    '--purple-bg':  'rgba(124,58,237,.07)',
    '--cyan':       '#0e7490',
    '--cyan-bg':    'rgba(14,116,144,.07)',
  };

  const DARK_VARS = {
    '--bg':         '#0f1117',
    '--surface':    '#181a23',
    '--surface-2':  '#1f2230',
    '--surface-3':  '#2a2d3a',
    '--border':     '#313546',
    '--text':       '#eceef4',
    '--text-2':     '#9ba1b5',
    '--text-3':     '#6c7189',
    '--accent':     '#5b9aff',
    '--accent-dim': 'rgba(91,154,255,.1)',
    '--green':      '#34d399',
    '--green-bg':   'rgba(52,211,153,.1)',
    '--red':        '#f87171',
    '--red-bg':     'rgba(248,113,113,.1)',
    '--amber':      '#fbbf24',
    '--amber-bg':   'rgba(251,191,36,.1)',
    '--purple':     '#a78bfa',
    '--purple-bg':  'rgba(167,139,250,.1)',
    '--cyan':       '#22d3ee',
    '--cyan-bg':    'rgba(34,211,238,.1)',
  };

  /* ── Storage helpers ── */
  function loadAll() {
    try {
      const r = localStorage.getItem(STORAGE_KEY);
      return r ? { ...DEFAULTS, ...JSON.parse(r) } : { ...DEFAULTS };
    } catch { return { ...DEFAULTS }; }
  }
  function saveAll(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

  /* ── Bootstrap: migrate legacy novus_name key ── */
  let _cache = loadAll();
  const legacyName = localStorage.getItem('novus_name');
  if (legacyName && !_cache.userName) { _cache.userName = legacyName; saveAll(_cache); }

  /* ── Public get / set ── */
  function get(key) { return _cache[key] !== undefined ? _cache[key] : DEFAULTS[key]; }
  function set(key, val) {
    _cache[key] = val;
    saveAll(_cache);
    if (key === 'userName') localStorage.setItem('novus_name', val);
    if (key === 'theme')    applyTheme();
  }
  function getUser() { return get('userName') || ''; }

  /* ── Theme engine ── */
  function applyTheme() {
    const vars = get('theme') === 'light' ? LIGHT_VARS : DARK_VARS;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    document.body.setAttribute('data-theme', get('theme'));
  }

  /* ── Settings modal (lazily injected once per page) ── */
  let _modalInjected = false;

  function _injectModal() {
    if (_modalInjected) return;
    _modalInjected = true;

    /* ── Overlay markup ── */
    const overlay = document.createElement('div');
    overlay.id = 'novus-settings-overlay';
    overlay.innerHTML = `
      <div class="ns-modal">
        <div class="ns-header">
          <h3>⚙ Settings</h3>
          <button class="ns-close" onclick="NovusSettings.closeModal()">✕</button>
        </div>
        <div class="ns-body">
          <div class="ns-section">
            <div class="ns-section-title">Identity</div>
            <label class="ns-field-label">Your Name / ID</label>
            <input type="text" class="ns-input" id="ns-username" placeholder="Enter your name...">
            <div class="ns-hint">Attached to all audit payloads and reports</div>
          </div>
          <div class="ns-section">
            <div class="ns-section-title">Appearance</div>
            <div class="ns-toggle-row">
              <div><div class="ns-toggle-label">Theme</div><div class="ns-hint" style="margin-top:2px">Dark or light mode</div></div>
              <div class="ns-theme-switch" id="ns-theme-switch" onclick="NovusSettings._toggleTheme()">
                <span class="ns-switch-option" data-val="dark">🌙 Dark</span>
                <span class="ns-switch-option" data-val="light">☀️ Light</span>
                <div class="ns-switch-slider" id="ns-switch-slider"></div>
              </div>
            </div>
          </div>
          <div class="ns-section">
            <div class="ns-section-title">Preferences</div>
            <div class="ns-toggle-row">
              <div><div class="ns-toggle-label">Haptic Feedback</div><div class="ns-hint" style="margin-top:2px">Vibrate on taps (mobile)</div></div>
              <label class="ns-checkbox">
                <input type="checkbox" id="ns-haptic" onchange="NovusSettings.set('hapticFeedback',this.checked)">
                <span class="ns-check-slider"></span>
              </label>
            </div>
            <div class="ns-toggle-row" style="margin-top:10px">
              <div><div class="ns-toggle-label">Compact Mode</div><div class="ns-hint" style="margin-top:2px">Smaller spacing</div></div>
              <label class="ns-checkbox">
                <input type="checkbox" id="ns-compact" onchange="NovusSettings.set('compactMode',this.checked)">
                <span class="ns-check-slider"></span>
              </label>
            </div>
          </div>
          <div class="ns-section">
            <div class="ns-section-title">Data</div>
            <button class="ns-danger-btn" onclick="if(confirm('Clear all local data?')){localStorage.removeItem('novus_sap');localStorage.removeItem('novus_done');localStorage.removeItem('novus_queue');NovusSettings._toast('Cache cleared');}">
              🗑 Clear Local Cache
            </button>
            <div class="ns-hint" style="margin-top:6px">App v2.3 · Plant 1730</div>
          </div>
        </div>
        <div class="ns-footer">
          <button class="ns-save-btn" onclick="NovusSettings._save()">Save & Close</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    /* ── Modal styles (injected once) ── */
    const style = document.createElement('style');
    style.textContent = `
      #novus-settings-overlay {
        display: none; position: fixed; inset: 0;
        background: rgba(0,0,0,.75); backdrop-filter: blur(6px);
        z-index: 9999; align-items: center; justify-content: center; padding: 20px;
        animation: ns-fade-in .2s ease;
      }
      #novus-settings-overlay.open { display: flex; }
      @keyframes ns-fade-in { from { opacity: 0; } to { opacity: 1; } }

      .ns-modal {
        background: var(--surface); width: 100%; max-width: 480px;
        border-radius: 16px; border: 1.5px solid var(--border);
        display: flex; flex-direction: column; max-height: 90vh; overflow: hidden;
        animation: ns-slide-up .25s cubic-bezier(.34,1.56,.64,1);
      }
      @keyframes ns-slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      .ns-header { padding: 16px 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
      .ns-header h3 { font-size: 16px; font-weight: 800; color: var(--text); }
      .ns-close { background: none; border: none; color: var(--text-3); font-size: 18px; font-weight: 900; cursor: pointer; transition: color .15s; }
      .ns-close:hover { color: var(--red); }
      .ns-body { padding: 0; overflow-y: auto; flex: 1; }
      .ns-section { padding: 16px 20px; border-bottom: 1px solid var(--border); }
      .ns-section:last-child { border-bottom: none; }
      .ns-section-title { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent); margin-bottom: 12px; }
      .ns-field-label { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--text-3); display: block; margin-bottom: 6px; }
      .ns-input {
        width: 100%; padding: 12px 14px; background: var(--surface-2);
        border: 1.5px solid var(--border); border-radius: 10px;
        font-size: 14px; font-weight: 600; color: var(--text); outline: none; font-family: inherit;
        transition: border-color .15s;
      }
      .ns-input:focus { border-color: var(--accent); }
      .ns-hint { font-size: 9px; color: var(--text-3); margin-top: 4px; }
      .ns-toggle-row { display: flex; justify-content: space-between; align-items: center; }
      .ns-toggle-label { font-size: 12px; font-weight: 700; color: var(--text); }
      .ns-theme-switch {
        display: flex; position: relative; background: var(--surface-2);
        border-radius: 8px; border: 1px solid var(--border);
        overflow: hidden; cursor: pointer; user-select: none;
      }
      .ns-switch-option { padding: 6px 14px; font-size: 10px; font-weight: 800; color: var(--text-3); position: relative; z-index: 2; transition: color .2s; }
      .ns-switch-option.active { color: #fff; }
      .ns-switch-slider {
        position: absolute; top: 2px; left: 2px;
        width: calc(50% - 2px); height: calc(100% - 4px);
        background: var(--accent); border-radius: 6px;
        transition: transform .2s ease; z-index: 1;
      }
      .ns-switch-slider.right { transform: translateX(100%); }
      .ns-checkbox { position: relative; width: 44px; height: 24px; flex-shrink: 0; }
      .ns-checkbox input { opacity: 0; width: 0; height: 0; }
      .ns-check-slider {
        position: absolute; inset: 0; background: var(--surface-3);
        border-radius: 12px; cursor: pointer; transition: background .2s;
      }
      .ns-check-slider::after {
        content: ''; position: absolute; width: 18px; height: 18px;
        border-radius: 50%; background: #fff; top: 3px; left: 3px;
        transition: transform .2s;
      }
      .ns-checkbox input:checked + .ns-check-slider { background: var(--accent); }
      .ns-checkbox input:checked + .ns-check-slider::after { transform: translateX(20px); }
      .ns-danger-btn {
        width: 100%; padding: 10px; background: var(--red-bg); color: var(--red);
        border: 1px solid rgba(248,113,113,.25); border-radius: 8px;
        font-size: 11px; font-weight: 800; cursor: pointer; font-family: inherit;
        transition: background .15s;
      }
      .ns-danger-btn:hover { background: rgba(248,113,113,.2); }
      .ns-footer { padding: 12px 20px; border-top: 1px solid var(--border); }
      .ns-save-btn {
        width: 100%; padding: 14px; background: var(--accent); color: #fff;
        border: none; border-radius: 10px; font-size: 13px; font-weight: 800;
        cursor: pointer; font-family: inherit; transition: filter .15s;
      }
      .ns-save-btn:hover { filter: brightness(1.1); }
    `;
    document.body.appendChild(style);
  }

  /* ── Modal lifecycle ── */
  function openModal() {
    _injectModal();
    document.getElementById('novus-settings-overlay').classList.add('open');
    document.getElementById('ns-username').value  = get('userName');
    document.getElementById('ns-haptic').checked  = get('hapticFeedback');
    document.getElementById('ns-compact').checked = get('compactMode');
    _updateThemeSwitch();
  }

  function closeModal() {
    const o = document.getElementById('novus-settings-overlay');
    if (o) o.classList.remove('open');
  }

  function _updateThemeSwitch() {
    const s    = document.getElementById('ns-switch-slider');
    const opts = document.querySelectorAll('.ns-switch-option');
    if (!s) return;
    s.classList.toggle('right', get('theme') === 'light');
    opts.forEach(o => o.classList.toggle('active', o.dataset.val === get('theme')));
  }

  function _toggleTheme() {
    set('theme', get('theme') === 'dark' ? 'light' : 'dark');
    _updateThemeSwitch();
  }

  function _save() {
    set('userName', document.getElementById('ns-username').value.trim());
    closeModal();
    _toast('Settings saved');
    window.dispatchEvent(new CustomEvent('novus-settings-changed'));
  }

  /** Internal toast helper — falls back to window.toast if available */
  function _toast(msg) {
    if (typeof window.toast === 'function') { window.toast(msg, 'green'); return; }
    const t = document.getElementById('toast');
    if (t) {
      const x = document.getElementById('toast-text');
      if (x) x.textContent = msg;
      t.className = 'toast green show';
      setTimeout(() => t.classList.remove('show'), 2000);
    }
  }

  /* ── Apply theme immediately on load ── */
  applyTheme();

  /* ── Public API ── */
  return { get, set, getUser, applyTheme, openModal, closeModal, _toggleTheme, _save, _toast };
})();


// ═══════════════════════════════════════════════════════════
// SHARED TOAST
// ═══════════════════════════════════════════════════════════

/**
 * Show a non-blocking toast notification.
 * @param {string} msg   - Message text
 * @param {string} color - 'green' | 'red' | 'amber' | 'blue'
 */
window.toast = function (msg, color = 'blue') {
  const t = document.getElementById('toast');
  if (!t) return;
  const x = document.getElementById('toast-text');
  if (x) x.textContent = msg;
  // Force re-animation by stripping and re-applying class
  t.className = '';
  void t.offsetWidth; // reflow
  t.className = `toast ${color} show`;
  clearTimeout(t._hideTimer);
  t._hideTimer = setTimeout(() => t.classList.remove('show'), 2500);
};


// ═══════════════════════════════════════════════════════════
// NOVUS LOADER — Top progress bar + skeleton helpers
// ═══════════════════════════════════════════════════════════

const NovusLoader = (() => {
  let _bar = null;
  let _progress = 0;
  let _raf = null;

  /**
   * Inject a slim top progress bar (once per page).
   * Called automatically on first start().
   */
  function _ensureBar() {
    if (_bar) return;
    _bar = document.createElement('div');
    _bar.id = 'novus-progress-bar';
    _bar.style.cssText = `
      position: fixed; top: 0; left: 0; z-index: 99999;
      height: 3px; width: 0%; background: var(--accent);
      transition: width .2s ease, opacity .3s ease;
      border-radius: 0 2px 2px 0;
      box-shadow: 0 0 8px var(--accent);
      pointer-events: none;
      opacity: 0;
    `;
    document.body.appendChild(_bar);
  }

  /**
   * Start the progress bar (simulated crawl).
   * Crawls to ~80% and waits for done().
   */
  function start() {
    _ensureBar();
    _progress = 0;
    _bar.style.opacity = '1';
    _bar.style.width = '0%';
    _crawl();
  }

  function _crawl() {
    if (_progress < 75) {
      // Slow exponential crawl — feels natural
      _progress += (75 - _progress) * 0.06;
      _bar.style.width = _progress + '%';
      _raf = requestAnimationFrame(() => setTimeout(_crawl, 80));
    }
  }

  /**
   * Complete the progress bar and fade it out.
   */
  function done() {
    cancelAnimationFrame(_raf);
    if (!_bar) return;
    _bar.style.transition = 'width .15s ease, opacity .4s ease .2s';
    _bar.style.width = '100%';
    setTimeout(() => {
      _bar.style.opacity = '0';
      setTimeout(() => { _bar.style.width = '0%'; _bar.style.transition = ''; }, 400);
    }, 150);
  }

  /**
   * Generate N skeleton row strings for a table.
   * @param {number} cols - number of <td> per row
   * @param {number} rows - number of rows
   */
  function skeletonTableRows(cols, rows = 6) {
    const shimStyle = `
      background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 5px; height: 12px; display: block;
    `;
    const widths = ['60%','45%','55%','40%','50%','65%','35%','50%'];
    const cells = Array.from({ length: cols }, (_, i) =>
      `<td><span style="${shimStyle} width:${widths[i % widths.length]}"></span></td>`
    ).join('');
    return Array.from({ length: rows }, () => `<tr>${cells}</tr>`).join('');
  }

  /**
   * Generate skeleton cards for the aisle grid.
   * @param {number} count
   */
  function skeletonAisleCards(count = 14) {
    return Array.from({ length: count }, () => `
      <div class="aisle-btn" style="
        background: linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
        color: transparent; pointer-events: none;">
        &nbsp;
      </div>`).join('');
  }

  /* Inject shimmer keyframes once */
  const _shimStyle = document.createElement('style');
  _shimStyle.textContent = `@keyframes shimmer { to { background-position: -200% 0; } }`;
  document.head.appendChild(_shimStyle);

  return { start, done, skeletonTableRows, skeletonAisleCards };
})();
