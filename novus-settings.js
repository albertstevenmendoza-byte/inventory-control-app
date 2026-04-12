// ══════════════════════════════════════════════════════════════
// Novus Ops — Shared Settings & Preferences Engine
// Include this script in EVERY page before page-specific JS.
//
// Provides:
//   NovusSettings.get(key)        — read any setting
//   NovusSettings.set(key, val)   — write any setting (auto-persists)
//   NovusSettings.getUser()       — shorthand for user name/ID
//   NovusSettings.applyTheme()    — apply current theme to :root
//   NovusSettings.openModal()     — show the settings UI
//   NovusSettings.closeModal()    — hide the settings UI
// ══════════════════════════════════════════════════════════════

const NovusSettings = (() => {
const STORAGE_KEY = ‘novus_settings’;

// ── Default settings (extensible — just add keys here) ──
const DEFAULTS = {
userName:       ‘’,
theme:          ‘dark’,       // ‘dark’ | ‘light’
pollInterval:   10,           // seconds
hapticFeedback: true,
compactMode:    false,
// Future: fontSize, language, defaultAisle, etc.
};

// ── Light theme — Crisp, airy, Tailwind Slate-inspired ──
// All text colors meet WCAG AA (4.5:1+) on their respective backgrounds
const LIGHT_VARS = {
‘–bg’:        ‘#f8f9fb’,      // warm off-white, not sterile
‘–surface’:   ‘#ffffff’,
‘–surface-2’: ‘#f1f3f5’,      // subtle gray for input backgrounds
‘–surface-3’: ‘#e5e7eb’,      // borders, dividers, disabled
‘–border’:    ‘#d1d5dc’,
‘–text’:      ‘#111827’,      // near-black — 15.4:1 on #f8f9fb
‘–text-2’:    ‘#374151’,      // dark gray — 9.6:1 on white
‘–text-3’:    ‘#6b7280’,      // muted — 5.3:1 on white (AA pass)
‘–accent’:    ‘#2563eb’,      // vivid blue — 4.6:1 on white
‘–accent-dim’:‘rgba(37,99,235,.07)’,
‘–green’:     ‘#059669’,      // emerald 600 — 4.6:1 on white
‘–green-bg’:  ‘rgba(5,150,105,.08)’,
‘–red’:       ‘#dc2626’,      // red 600 — 4.6:1 on white
‘–red-bg’:    ‘rgba(220,38,38,.07)’,
‘–amber’:     ‘#b45309’,      // amber 700 — 5.1:1 on white (darkened for contrast)
‘–amber-bg’:  ‘rgba(180,83,9,.07)’,
‘–purple’:    ‘#7c3aed’,      // violet 600 — 5.0:1 on white
‘–purple-bg’: ‘rgba(124,58,237,.07)’,
‘–cyan’:      ‘#0e7490’,      // cyan 700 — 4.7:1 on white
‘–cyan-bg’:   ‘rgba(14,116,144,.07)’,
};

// ── Dark theme — Deep, rich, NOT pure black ──
// Uses a warm charcoal base with enough surface separation for depth
const DARK_VARS = {
‘–bg’:        ‘#0f1117’,      // rich near-black (warm undertone)
‘–surface’:   ‘#181a23’,      // card/panel background
‘–surface-2’: ‘#1f2230’,      // inputs, recessed areas
‘–surface-3’: ‘#2a2d3a’,      // hover states, disabled fills
‘–border’:    ‘#313546’,      // visible but not harsh
‘–text’:      ‘#eceef4’,      // soft white — 14.5:1 on #0f1117
‘–text-2’:    ‘#9ba1b5’,      // muted — 6.8:1 on #181a23
‘–text-3’:    ‘#6c7189’,      // deemphasized — 4.5:1 on #181a23 (AA pass)
‘–accent’:    ‘#5b9aff’,      // brighter blue — 6.2:1 on #181a23
‘–accent-dim’:‘rgba(91,154,255,.1)’,
‘–green’:     ‘#34d399’,      // emerald 400 — 8.7:1 on dark
‘–green-bg’:  ‘rgba(52,211,153,.1)’,
‘–red’:       ‘#f87171’,      // red 400 — 6.4:1 on dark
‘–red-bg’:    ‘rgba(248,113,113,.1)’,
‘–amber’:     ‘#fbbf24’,      // amber 400 — 10.6:1 on dark
‘–amber-bg’:  ‘rgba(251,191,36,.1)’,
‘–purple’:    ‘#a78bfa’,      // violet 400 — 7.0:1 on dark
‘–purple-bg’: ‘rgba(167,139,250,.1)’,
‘–cyan’:      ‘#22d3ee’,      // cyan 400 — 10.1:1 on dark
‘–cyan-bg’:   ‘rgba(34,211,238,.1)’,
};

// ── Persistence ──
function loadAll() {
try {
const raw = localStorage.getItem(STORAGE_KEY);
return raw ? { …DEFAULTS, …JSON.parse(raw) } : { …DEFAULTS };
} catch { return { …DEFAULTS }; }
}

function saveAll(settings) {
localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

let _cache = loadAll();

// ── Migration: pull old novus_name into settings if present ──
const legacyName = localStorage.getItem(‘novus_name’);
if (legacyName && !_cache.userName) {
_cache.userName = legacyName;
saveAll(_cache);
}

// ── Public API ──
function get(key) {
return _cache[key] !== undefined ? _cache[key] : DEFAULTS[key];
}

function set(key, val) {
_cache[key] = val;
saveAll(_cache);
// Also keep novus_name in sync for backwards compatibility
if (key === ‘userName’) localStorage.setItem(‘novus_name’, val);
if (key === ‘theme’) applyTheme();
}

function getUser() { return get(‘userName’) || ‘’; }

function applyTheme() {
const vars = get(‘theme’) === ‘light’ ? LIGHT_VARS : DARK_VARS;
const root = document.documentElement;
Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
document.body.setAttribute(‘data-theme’, get(‘theme’));
}

// ── Settings Modal (injected into DOM on first call) ──
let _modalInjected = false;

function _injectModal() {
if (_modalInjected) return;
_modalInjected = true;

```
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
          <div>
            <div class="ns-toggle-label">Theme</div>
            <div class="ns-hint" style="margin-top:2px">Switch between dark and light mode</div>
          </div>
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
          <div>
            <div class="ns-toggle-label">Haptic Feedback</div>
            <div class="ns-hint" style="margin-top:2px">Vibrate on button taps (mobile)</div>
          </div>
          <label class="ns-checkbox">
            <input type="checkbox" id="ns-haptic" onchange="NovusSettings.set('hapticFeedback', this.checked)">
            <span class="ns-check-slider"></span>
          </label>
        </div>
        <div class="ns-toggle-row" style="margin-top:10px">
          <div>
            <div class="ns-toggle-label">Compact Mode</div>
            <div class="ns-hint" style="margin-top:2px">Reduce spacing for smaller screens</div>
          </div>
          <label class="ns-checkbox">
            <input type="checkbox" id="ns-compact" onchange="NovusSettings.set('compactMode', this.checked)">
            <span class="ns-check-slider"></span>
          </label>
        </div>
      </div>

      <div class="ns-section">
        <div class="ns-section-title">Data</div>
        <button class="ns-danger-btn" onclick="if(confirm('Clear all local data? This clears your cached SAP data and completed bins.')) { localStorage.removeItem('novus_sap'); localStorage.removeItem('novus_done'); localStorage.removeItem('novus_queue'); NovusSettings._toast('Local cache cleared'); }">
          🗑 Clear Local Cache
        </button>
        <div class="ns-hint" style="margin-top:6px">App version: 2.1.0 · Plant 1730</div>
      </div>

    </div>
    <div class="ns-footer">
      <button class="ns-save-btn" onclick="NovusSettings._save()">Save & Close</button>
    </div>
  </div>
`;
document.body.appendChild(overlay);

// Inject styles
const style = document.createElement('style');
style.textContent = `
  #novus-settings-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);z-index:9999;align-items:center;justify-content:center;padding:20px}
  #novus-settings-overlay.open{display:flex}
  .ns-modal{background:var(--surface);width:100%;max-width:480px;border-radius:16px;border:1.5px solid var(--border);display:flex;flex-direction:column;max-height:90vh;overflow:hidden}
  .ns-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
  .ns-header h3{font-size:16px;font-weight:800;color:var(--text)}
  .ns-close{background:none;border:none;color:var(--text-3);font-size:18px;font-weight:900;cursor:pointer}
  .ns-body{padding:0;overflow-y:auto;flex:1}
  .ns-section{padding:16px 20px;border-bottom:1px solid var(--border)}
  .ns-section:last-child{border-bottom:none}
  .ns-section-title{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:12px}
  .ns-field-label{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text-3);display:block;margin-bottom:6px}
  .ns-input{width:100%;padding:12px 14px;background:var(--surface-2);border:1.5px solid var(--border);border-radius:10px;font-size:14px;font-weight:600;color:var(--text);outline:none;font-family:inherit}
  .ns-input:focus{border-color:var(--accent)}
  .ns-hint{font-size:9px;color:var(--text-3);margin-top:4px}
  .ns-toggle-row{display:flex;justify-content:space-between;align-items:center}
  .ns-toggle-label{font-size:12px;font-weight:700;color:var(--text)}
  /* Theme switch */
  .ns-theme-switch{display:flex;position:relative;background:var(--surface-2);border-radius:8px;border:1px solid var(--border);overflow:hidden;cursor:pointer;user-select:none}
  .ns-switch-option{padding:6px 14px;font-size:10px;font-weight:800;color:var(--text-3);position:relative;z-index:2;transition:color .2s}
  .ns-switch-option.active{color:#fff}
  .ns-switch-slider{position:absolute;top:2px;left:2px;width:calc(50% - 2px);height:calc(100% - 4px);background:var(--accent);border-radius:6px;transition:transform .2s ease;z-index:1}
  .ns-switch-slider.right{transform:translateX(100%)}
  /* Checkbox toggle */
  .ns-checkbox{position:relative;width:44px;height:24px;flex-shrink:0}
  .ns-checkbox input{opacity:0;width:0;height:0}
  .ns-check-slider{position:absolute;inset:0;background:var(--surface-3);border-radius:12px;cursor:pointer;transition:background .2s}
  .ns-check-slider::after{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:3px;left:3px;transition:transform .2s}
  .ns-checkbox input:checked+.ns-check-slider{background:var(--accent)}
  .ns-checkbox input:checked+.ns-check-slider::after{transform:translateX(20px)}
  .ns-danger-btn{width:100%;padding:10px;background:var(--red-bg, rgba(239,68,68,.1));color:var(--red, #ef4444);border:1px solid rgba(239,68,68,.25);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;font-family:inherit}
  .ns-footer{padding:12px 20px;border-top:1px solid var(--border)}
  .ns-save-btn{width:100%;padding:14px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit}
`;
document.body.appendChild(style);
```

}

function openModal() {
_injectModal();
const overlay = document.getElementById(‘novus-settings-overlay’);
overlay.classList.add(‘open’);

```
// Populate current values
document.getElementById('ns-username').value = get('userName');
document.getElementById('ns-haptic').checked = get('hapticFeedback');
document.getElementById('ns-compact').checked = get('compactMode');
_updateThemeSwitch();
```

}

function closeModal() {
const overlay = document.getElementById(‘novus-settings-overlay’);
if (overlay) overlay.classList.remove(‘open’);
}

function _updateThemeSwitch() {
const slider = document.getElementById(‘ns-switch-slider’);
const opts = document.querySelectorAll(’.ns-switch-option’);
if (!slider) return;
const isLight = get(‘theme’) === ‘light’;
slider.classList.toggle(‘right’, isLight);
opts.forEach(o => o.classList.toggle(‘active’, o.dataset.val === get(‘theme’)));
}

function _toggleTheme() {
set(‘theme’, get(‘theme’) === ‘dark’ ? ‘light’ : ‘dark’);
_updateThemeSwitch();
}

function _save() {
const name = document.getElementById(‘ns-username’).value.trim();
set(‘userName’, name);
// haptic and compact are saved on-change via their handlers
closeModal();
_toast(‘Settings saved’);
// Fire a custom event so pages can react
window.dispatchEvent(new CustomEvent(‘novus-settings-changed’));
}

function _toast(msg) {
// Use page-level toast if available, otherwise create a transient one
if (typeof window.toast === ‘function’) {
window.toast(msg, ‘green’);
} else {
const t = document.getElementById(‘toast’);
if (t) {
const txt = document.getElementById(‘toast-text’);
if (txt) txt.textContent = msg;
t.className = ‘toast green show’;
setTimeout(() => t.classList.remove(‘show’), 2000);
}
}
}

// ── Apply theme on load ──
applyTheme();

return {
get, set, getUser, applyTheme, openModal, closeModal,
_toggleTheme, _save, _toast,
};
})();
