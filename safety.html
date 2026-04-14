<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Safety Reporter — Novus Ops</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#0f1117;--surface:#181a23;--surface-2:#1f2230;--surface-3:#2a2d3a;--border:#313546;--text:#eceef4;--text-2:#9ba1b5;--text-3:#6c7189;--accent:#5b9aff;--accent-dim:rgba(91,154,255,.1);--green:#34d399;--green-bg:rgba(52,211,153,.1);--red:#f87171;--red-bg:rgba(248,113,113,.1);--amber:#fbbf24;--amber-bg:rgba(251,191,36,.1);--radius:14px}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100dvh}
button{font-family:inherit;border:none;cursor:pointer}
button:active{transform:scale(.96)}
.screen{display:none;flex-direction:column;min-height:100dvh}
.screen.active{display:flex}
.header{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:var(--surface);border-bottom:1px solid var(--border);flex-shrink:0}
.header h1{font-size:16px;font-weight:800}
.hdr-btn{background:var(--surface-2);color:var(--text-2);padding:8px 14px;border-radius:10px;font-size:11px;font-weight:700;text-decoration:none}
.report-btn{background:var(--red);color:#fff;padding:10px 18px;border-radius:12px;font-size:11px;font-weight:800;text-transform:uppercase}
.content{flex:1;overflow-y:auto;padding:16px;-webkit-overflow-scrolling:touch}
.content::-webkit-scrollbar{display:none}
.field-label{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text-3);display:block;margin:18px 0 6px}
.field-label:first-child{margin-top:0}
.field{width:100%;padding:14px 16px;background:var(--surface);border:1.5px solid var(--border);border-radius:12px;font-size:15px;font-weight:600;color:var(--text);outline:none;font-family:inherit}
.field:focus{border-color:var(--accent)}
.field::placeholder{color:var(--text-3)}
textarea.field{resize:none;line-height:1.5}
.sev-row{display:flex;gap:6px}
.sev-pill{flex:1;padding:16px 0;border-radius:12px;text-align:center;font-size:10px;font-weight:800;text-transform:uppercase;background:var(--surface-2);color:var(--text-3);border:2px solid transparent;min-height:52px;display:flex;align-items:center;justify-content:center;transition:all .15s}
.sev-pill.active{border-color:var(--sc);color:var(--sc);background:var(--sb)}
.photo-row{display:flex;gap:8px;margin-bottom:8px}
.photo-btn{flex:1;padding:20px 0;border-radius:12px;text-align:center;font-size:11px;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;min-height:60px;justify-content:center}
.photo-btn.cam{background:var(--accent-dim);border:1.5px dashed rgba(91,154,255,.25);color:var(--accent)}
.photo-btn.gal{background:var(--surface-2);border:1.5px dashed var(--border);color:var(--text-3)}
.preview-wrap{position:relative;margin-bottom:8px}
.preview-img{width:100%;border-radius:12px;border:1px solid var(--border);max-height:200px;object-fit:contain;background:var(--surface-2)}
.preview-remove{position:absolute;top:8px;right:8px;background:rgba(0,0,0,.7);color:#fff;width:30px;height:30px;border-radius:50%;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center}
.submit-btn{width:100%;margin-top:24px;padding:20px;border-radius:var(--radius);background:var(--red);color:#fff;font-size:14px;font-weight:800;text-transform:uppercase;min-height:60px}
.submit-btn:disabled{opacity:.5;pointer-events:none}
.inc-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:8px}
.inc-top{display:flex;justify-content:space-between;margin-bottom:6px}
.inc-sev,.inc-status{font-size:8px;font-weight:800;text-transform:uppercase;padding:3px 10px;border-radius:6px}
.inc-sev.low{background:var(--green-bg);color:var(--green)}.inc-sev.medium{background:var(--amber-bg);color:var(--amber)}
.inc-sev.high{background:var(--red-bg);color:var(--red)}.inc-sev.critical{background:var(--red-bg);color:#7c2d12;font-weight:900}
.inc-status.open{background:var(--red-bg);color:var(--red)}.inc-status.resolved{background:var(--green-bg);color:var(--green)}
.inc-loc{font-size:12px;font-weight:700;margin-bottom:3px}
.inc-desc{font-size:11px;color:var(--text-2);line-height:1.4}
.inc-footer{display:flex;justify-content:space-between;margin-top:8px;font-size:9px;color:var(--text-3);font-weight:600}
.empty{text-align:center;padding:60px 24px;color:var(--text-3)}
.empty-icon{font-size:42px;display:block;margin-bottom:10px}
.success{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px}
.success-icon{font-size:60px;margin-bottom:16px}
.success h2{font-size:22px;font-weight:900;margin-bottom:6px}
.success p{color:var(--text-2);font-size:13px}
.toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:12px;font-size:12px;font-weight:700;z-index:999;pointer-events:none;opacity:0;transition:opacity .3s}
.toast.show{opacity:1}
.toast.green{background:var(--green-bg);color:var(--green);border:1px solid rgba(52,211,153,.25)}
.toast.red{background:var(--red-bg);color:var(--red);border:1px solid rgba(248,113,113,.25)}
.toast.amber{background:var(--amber-bg);color:var(--amber);border:1px solid rgba(251,191,36,.25)}
</style>
</head>
<body>

<div id="toast" class="toast"><span id="toast-text"></span></div>

<div id="screen-list" class="screen active">
  <div class="header">
    <a href="index.html" class="hdr-btn">← Home</a>
    <h1>Safety Reports</h1>
    <div style="display:flex;gap:8px">
      <button class="hdr-btn" style="font-size:14px;padding:8px 10px" onclick="NovusSettings.openModal()">⚙</button>
      <button class="report-btn" onclick="showForm()">+ Report</button>
    </div>
  </div>
  <div class="content" id="incident-list"></div>
</div>

<div id="screen-form" class="screen">
  <div class="header">
    <button class="hdr-btn" onclick="showList()">← Back</button>
    <h1>Report Incident</h1>
    <div></div>
  </div>
  <div class="content">
    <label class="field-label">Your Name *</label>
    <input type="text" class="field" id="f-name" placeholder="Your name">
    <label class="field-label">Location *</label>
    <input type="text" class="field" id="f-location" placeholder="e.g. Aisle F, near bin WF12A">
    <label class="field-label">Photo Evidence</label>
    <div id="photo-area">
      <div class="photo-row">
        <input type="file" accept="image/*" capture="environment" id="cam-input" hidden onchange="handlePhoto(event)">
        <label for="cam-input" class="photo-btn cam">📷 Camera</label>
        <input type="file" accept="image/*" id="gal-input" hidden onchange="handlePhoto(event)">
        <label for="gal-input" class="photo-btn gal">🖼️ Gallery</label>
      </div>
    </div>
    <div id="photo-preview"></div>
    <label class="field-label">Description *</label>
    <textarea class="field" id="f-desc" rows="4" placeholder="Describe the hazard or incident..."></textarea>
    <label class="field-label">Severity</label>
    <div class="sev-row" id="sev-row">
      <button class="sev-pill" data-sev="low" style="--sc:var(--green);--sb:var(--green-bg)" onclick="setSev('low',this)">Low</button>
      <button class="sev-pill active" data-sev="medium" style="--sc:var(--amber);--sb:var(--amber-bg)" onclick="setSev('medium',this)">Medium</button>
      <button class="sev-pill" data-sev="high" style="--sc:var(--red);--sb:var(--red-bg)" onclick="setSev('high',this)">High</button>
      <button class="sev-pill" data-sev="critical" style="--sc:#991b1b;--sb:var(--red-bg)" onclick="setSev('critical',this)">Critical</button>
    </div>
    <label class="field-label">Resolution *</label>
    <textarea class="field" id="f-resolution" rows="3" placeholder="Describe what action was taken..."></textarea>
    <button class="submit-btn" id="submit-btn" onclick="submitIncident()">Submit Report</button>
  </div>
</div>

<div id="screen-success" class="screen">
  <div class="success">
    <span class="success-icon">✅</span>
    <h2>Report Submitted</h2>
    <p>Your safety report has been logged</p>
  </div>
</div>

<script>
const NovusSettings = (() => {
  const STORAGE_KEY = 'novus_settings';
  const DEFAULTS = { userName: '', theme: 'dark', pollInterval: 10, hapticFeedback: true, compactMode: false };

  const LIGHT_VARS = {
    '--bg': '#f8f9fb', '--surface': '#ffffff', '--surface-2': '#f1f3f5', '--surface-3': '#e5e7eb',
    '--border': '#d1d5dc', '--text': '#111827', '--text-2': '#374151', '--text-3': '#6b7280',
    '--accent': '#2563eb', '--accent-dim': 'rgba(37,99,235,.07)',
    '--green': '#059669', '--green-bg': 'rgba(5,150,105,.08)',
    '--red': '#dc2626', '--red-bg': 'rgba(220,38,38,.07)',
    '--amber': '#b45309', '--amber-bg': 'rgba(180,83,9,.07)',
    '--purple': '#7c3aed', '--purple-bg': 'rgba(124,58,237,.07)',
    '--cyan': '#0e7490', '--cyan-bg': 'rgba(14,116,144,.07)'
  };

  const DARK_VARS = {
    '--bg': '#0f1117', '--surface': '#181a23', '--surface-2': '#1f2230', '--surface-3': '#2a2d3a',
    '--border': '#313546', '--text': '#eceef4', '--text-2': '#9ba1b5', '--text-3': '#6c7189',
    '--accent': '#5b9aff', '--accent-dim': 'rgba(91,154,255,.1)',
    '--green': '#34d399', '--green-bg': 'rgba(52,211,153,.1)',
    '--red': '#f87171', '--red-bg': 'rgba(248,113,113,.1)',
    '--amber': '#fbbf24', '--amber-bg': 'rgba(251,191,36,.1)',
    '--purple': '#a78bfa', '--purple-bg': 'rgba(167,139,250,.1)',
    '--cyan': '#22d3ee', '--cyan-bg': 'rgba(34,211,238,.1)'
  };

  function loadAll() {
    try { const r = localStorage.getItem(STORAGE_KEY); return r ? { ...DEFAULTS, ...JSON.parse(r) } : { ...DEFAULTS }; }
    catch { return { ...DEFAULTS }; }
  }
  function saveAll(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

  let _cache = loadAll();
  const legacyName = localStorage.getItem('novus_name');
  if (legacyName && !_cache.userName) { _cache.userName = legacyName; saveAll(_cache); }

  function get(key) { return _cache[key] !== undefined ? _cache[key] : DEFAULTS[key]; }
  function set(key, val) {
    _cache[key] = val; saveAll(_cache);
    if (key === 'userName') localStorage.setItem('novus_name', val);
    if (key === 'theme') applyTheme();
  }
  function getUser() { return get('userName') || ''; }
  function applyTheme() {
    const vars = get('theme') === 'light' ? LIGHT_VARS : DARK_VARS;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    document.body.setAttribute('data-theme', get('theme'));
  }

  let _modalInjected = false;
  function _injectModal() {
    if (_modalInjected) return;
    _modalInjected = true;
    const overlay = document.createElement('div');
    overlay.id = 'novus-settings-overlay';
    overlay.innerHTML = `
      <div class="ns-modal">
        <div class="ns-header"><h3>⚙ Settings</h3><button class="ns-close" onclick="NovusSettings.closeModal()">✕</button></div>
        <div class="ns-body">
          <div class="ns-section"><div class="ns-section-title">Identity</div>
            <label class="ns-field-label">Your Name / ID</label>
            <input type="text" class="ns-input" id="ns-username" placeholder="Enter your name...">
            <div class="ns-hint">Attached to all audit payloads and reports</div></div>
          <div class="ns-section"><div class="ns-section-title">Appearance</div>
            <div class="ns-toggle-row"><div><div class="ns-toggle-label">Theme</div><div class="ns-hint" style="margin-top:2px">Dark or light mode</div></div>
              <div class="ns-theme-switch" id="ns-theme-switch" onclick="NovusSettings._toggleTheme()">
                <span class="ns-switch-option" data-val="dark">🌙 Dark</span>
                <span class="ns-switch-option" data-val="light">☀️ Light</span>
                <div class="ns-switch-slider" id="ns-switch-slider"></div></div></div></div>
          <div class="ns-section"><div class="ns-section-title">Preferences</div>
            <div class="ns-toggle-row"><div><div class="ns-toggle-label">Haptic Feedback</div><div class="ns-hint" style="margin-top:2px">Vibrate on taps (mobile)</div></div>
              <label class="ns-checkbox"><input type="checkbox" id="ns-haptic" onchange="NovusSettings.set('hapticFeedback',this.checked)"><span class="ns-check-slider"></span></label></div>
            <div class="ns-toggle-row" style="margin-top:10px"><div><div class="ns-toggle-label">Compact Mode</div><div class="ns-hint" style="margin-top:2px">Smaller spacing</div></div>
              <label class="ns-checkbox"><input type="checkbox" id="ns-compact" onchange="NovusSettings.set('compactMode',this.checked)"><span class="ns-check-slider"></span></label></div></div>
          <div class="ns-section"><div class="ns-section-title">Data</div>
            <button class="ns-danger-btn" onclick="if(confirm('Clear all local data?')){localStorage.removeItem('novus_sap');localStorage.removeItem('novus_done');localStorage.removeItem('novus_queue');NovusSettings._toast('Cache cleared');}">🗑 Clear Local Cache</button>
            <div class="ns-hint" style="margin-top:6px">App v2.2 · Plant 1730</div></div>
        </div>
        <div class="ns-footer"><button class="ns-save-btn" onclick="NovusSettings._save()">Save & Close</button></div>
      </div>`;
    document.body.appendChild(overlay);
    const style = document.createElement('style');
    style.textContent = `
      #novus-settings-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(6px);z-index:9999;align-items:center;justify-content:center;padding:20px}
      #novus-settings-overlay.open{display:flex}
      .ns-modal{background:var(--surface);width:100%;max-width:480px;border-radius:16px;border:1.5px solid var(--border);display:flex;flex-direction:column;max-height:90vh;overflow:hidden}
      .ns-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
      .ns-header h3{font-size:16px;font-weight:800;color:var(--text)}
      .ns-close{background:none;border:none;color:var(--text-3);font-size:18px;font-weight:900;cursor:pointer}
      .ns-body{padding:0;overflow-y:auto;flex:1}
      .ns-section{padding:16px 20px;border-bottom:1px solid var(--border)}.ns-section:last-child{border-bottom:none}
      .ns-section-title{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:var(--accent);margin-bottom:12px}
      .ns-field-label{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:var(--text-3);display:block;margin-bottom:6px}
      .ns-input{width:100%;padding:12px 14px;background:var(--surface-2);border:1.5px solid var(--border);border-radius:10px;font-size:14px;font-weight:600;color:var(--text);outline:none;font-family:inherit}
      .ns-input:focus{border-color:var(--accent)}
      .ns-hint{font-size:9px;color:var(--text-3);margin-top:4px}
      .ns-toggle-row{display:flex;justify-content:space-between;align-items:center}
      .ns-toggle-label{font-size:12px;font-weight:700;color:var(--text)}
      .ns-theme-switch{display:flex;position:relative;background:var(--surface-2);border-radius:8px;border:1px solid var(--border);overflow:hidden;cursor:pointer;user-select:none}
      .ns-switch-option{padding:6px 14px;font-size:10px;font-weight:800;color:var(--text-3);position:relative;z-index:2;transition:color .2s}
      .ns-switch-option.active{color:#fff}
      .ns-switch-slider{position:absolute;top:2px;left:2px;width:calc(50% - 2px);height:calc(100% - 4px);background:var(--accent);border-radius:6px;transition:transform .2s ease;z-index:1}
      .ns-switch-slider.right{transform:translateX(100%)}
      .ns-checkbox{position:relative;width:44px;height:24px;flex-shrink:0}
      .ns-checkbox input{opacity:0;width:0;height:0}
      .ns-check-slider{position:absolute;inset:0;background:var(--surface-3);border-radius:12px;cursor:pointer;transition:background .2s}
      .ns-check-slider::after{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:3px;left:3px;transition:transform .2s}
      .ns-checkbox input:checked+.ns-check-slider{background:var(--accent)}
      .ns-checkbox input:checked+.ns-check-slider::after{transform:translateX(20px)}
      .ns-danger-btn{width:100%;padding:10px;background:var(--red-bg);color:var(--red);border:1px solid rgba(248,113,113,.25);border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;font-family:inherit}
      .ns-footer{padding:12px 20px;border-top:1px solid var(--border)}
      .ns-save-btn{width:100%;padding:14px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit}`;
    document.body.appendChild(style);
  }

  function openModal() {
    _injectModal();
    document.getElementById('novus-settings-overlay').classList.add('open');
    document.getElementById('ns-username').value = get('userName');
    document.getElementById('ns-haptic').checked = get('hapticFeedback');
    document.getElementById('ns-compact').checked = get('compactMode');
    _updateThemeSwitch();
  }
  function closeModal() { const o = document.getElementById('novus-settings-overlay'); if (o) o.classList.remove('open'); }
  function _updateThemeSwitch() {
    const s = document.getElementById('ns-switch-slider'); const opts = document.querySelectorAll('.ns-switch-option');
    if (!s) return; s.classList.toggle('right', get('theme') === 'light');
    opts.forEach(o => o.classList.toggle('active', o.dataset.val === get('theme')));
  }
  function _toggleTheme() { set('theme', get('theme') === 'dark' ? 'light' : 'dark'); _updateThemeSwitch(); }
  function _save() {
    set('userName', document.getElementById('ns-username').value.trim());
    closeModal(); _toast('Settings saved');
    window.dispatchEvent(new CustomEvent('novus-settings-changed'));
  }
  function _toast(msg) {
    if (typeof window.toast === 'function') { window.toast(msg, 'green'); return; }
    const t = document.getElementById('toast');
    if (t) { const x = document.getElementById('toast-text'); if (x) x.textContent = msg; t.className = 'toast green show'; setTimeout(() => t.classList.remove('show'), 2000); }
  }

  applyTheme();
  return { get, set, getUser, applyTheme, openModal, closeModal, _toggleTheme, _save, _toast };
})();
</script>

<script>
const API_URL = 'https://script.google.com/macros/s/AKfycbwZ1Dhmf6cK_hWV2xLKYmwEImUvifIRCPqVm0Fz4E7gjvfcpyzoqhAFIgvgwrjBretc/exec';
let incidents = [];
let severity = 'medium';
let photoBase64 = null;

loadIncidents();

async function loadIncidents() {
  try {
    const res = await fetch(API_URL + '?type=safety');
    const data = await res.json();
    incidents = data.incidents || [];
  } catch { incidents = []; }
  renderList();
}

function renderList() {
  const list = document.getElementById('incident-list');
  if (incidents.length === 0) {
    list.innerHTML = '<div class="empty"><span class="empty-icon">🦺</span><p>No incidents reported</p></div>';
    return;
  }
  list.innerHTML = incidents.map(i => `
    <div class="inc-card">
      <div class="inc-top">
        <span class="inc-sev ${i.severity || 'low'}">${i.severity || 'low'}</span>
        <span class="inc-status ${i.status || 'open'}">${i.status || 'open'}</span>
      </div>
      <div class="inc-loc">📍 ${i.location}</div>
      <div class="inc-desc">${i.description}</div>
      <div class="inc-footer">
        <span>👤 ${i.reportedBy}</span>
        <span>${new Date(i.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  `).join('');
}

function showForm() {
  switchScreen('form');
  document.getElementById('f-name').value = NovusSettings.getUser();
}

function showList() { switchScreen('list'); loadIncidents(); }

function setSev(val, el) {
  severity = val;
  document.querySelectorAll('.sev-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function handlePhoto(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    photoBase64 = ev.target.result;
    document.getElementById('photo-preview').innerHTML = `
      <div class="preview-wrap">
        <img src="${photoBase64}" class="preview-img">
        <button class="preview-remove" onclick="removePhoto()">✕</button>
      </div>`;
  };
  reader.readAsDataURL(file);
  e.target.value = '';
}

function removePhoto() {
  photoBase64 = null;
  document.getElementById('photo-preview').innerHTML = '';
}

async function submitIncident() {
  const name = document.getElementById('f-name').value.trim();
  const location = document.getElementById('f-location').value.trim();
  const description = document.getElementById('f-desc').value.trim();
  const resolution = document.getElementById('f-resolution').value.trim();

  if (!name || !location || !description || !resolution) { 
    toast('Please fill out all required fields', 'amber'); 
    return; 
  }

  const btn = document.getElementById('submit-btn');
  btn.disabled = true; btn.textContent = 'Submitting...';

  try {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'logSafety',
        reportedBy: name,
        location, description, severity,
        resolution,
        photoUrl: photoBase64 || '',
      }),
    });
    switchScreen('success');
    setTimeout(() => { showList(); }, 2000);
  } catch (err) { toast('Failed to submit: ' + err.message, 'red'); }
  
  btn.disabled = false; btn.textContent = 'Submit Report';
}

function switchScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
}

function toast(msg, color) {
  const t = document.getElementById('toast');
  document.getElementById('toast-text').textContent = msg;
  t.className = `toast ${color} show`;
  setTimeout(() => t.classList.remove('show'), 2500);
}
window.toast = toast;
</script>

</body>
</html>
