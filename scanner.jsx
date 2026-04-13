import { useState, useEffect, useCallback, useMemo, useRef } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────
const FRESH_ITEMS = [
  "3305704","3307506","3307509","3307515","3307518","3307525",
  "3307710","3308356","3309009","3309016","3309017","3309019",
  "3309138","3309139"
];

const AISLE_LETTERS = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P"];
const BIN_SUFFIXES = ["A","B","C"];
const BIN_NUMBERS = Array.from({length:39},(_,i)=>String(i).padStart(2,"0"));

const generateBinsForAisle = (letter) => {
  const bins = [];
  BIN_NUMBERS.forEach(n => BIN_SUFFIXES.forEach(s => bins.push(`W${letter}${n}${s}`)));
  return bins;
};

// ─── ICONS ───────────────────────────────────────────────────────────
const Icon = ({name, size=20}) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
    box: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>,
  };
  return icons[name] || null;
};

// ─── MAIN APP ────────────────────────────────────────────────────────
export default function CycleCounter() {
  const [sapData, setSapData] = useState({});
  const [mode, setMode] = useState("idle"); 
  const [records, setRecords] = useState({}); 
  const [ghostItems, setGhostItems] = useState([]);
  
  // Navigation State
  const [selectedAisle, setSelectedAisle] = useState(null);
  const [currentBinIndex, setCurrentBinIndex] = useState(0);
  const [activeProduct, setActiveProduct] = useState(null);
  const [freshCounts, setFreshCounts] = useState({});

  // UI State
  const [scanInput, setScanInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [ghostPrompt, setGhostPrompt] = useState(null);
  const scanRef = useRef(null);

  // Mock SAP Data Init
  useEffect(() => {
    // Simplified Mocking for Layout Preview
    const mock = {};
    for(let i=0; i<500; i++) {
        const hu = String(100000000 + i);
        mock[hu] = { 
            hu, 
            material: FRESH_ITEMS[i % 14], 
            expectedBin: `W${AISLE_LETTERS[i % 14]}0${Math.floor(i/20)}A`,
            qty: 20 
        };
    }
    setSapData(mock);
  }, []);

  // ─── LOGIC ───────────────────────────────────────────────────────
  const notify = useCallback((msg, type="info") => {
    setNotification({msg, type});
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const launchMode = useCallback((newMode, payload) => {
    setScanInput("");
    if (newMode === "aisle") {
      setSelectedAisle(payload);
      setCurrentBinIndex(0);
    } else if (newMode === "product") {
      setActiveProduct(payload);
    }
    setMode(newMode);
  }, []);

  const handleScan = useCallback((input, contextBin) => {
    const hu = input.trim();
    if (!hu) return;
    const sapRecord = sapData[hu];

    if (!sapRecord) {
      setGhostPrompt({ hu, bin: contextBin });
      return;
    }

    const state = sapRecord.expectedBin === contextBin ? "OK" : "MOVEMENT";
    setRecords(prev => ({ 
        ...prev, 
        [hu]: { hu, state, foundBin: contextBin, expectedBin: sapRecord.expectedBin, material: sapRecord.material, qty: sapRecord.qty } 
    }));
    
    notify(state === "OK" ? `✓ HU ${hu} Verified` : `⇄ HU ${hu} Moved`, state === "OK" ? "success" : "warning");
    setScanInput("");
  }, [sapData, notify]);

  // ─── RENDER COMPONENTS ───────────────────────────────────────────

  const AisleGrid = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, padding: "10px 0" }}>
      {AISLE_LETTERS.map(letter => (
        <button key={letter} onClick={() => launchMode("aisle", letter)} style={{
          background: "var(--card-bg)", border: "2px solid var(--border)",
          borderRadius: 14, padding: "24px 0", cursor: "pointer", transition: "all 0.2s"
        }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>{letter}</div>
          <div style={{ fontSize: 10, color: "var(--text-dim)", fontWeight: 700, marginTop: 4 }}>AISLE</div>
        </button>
      ))}
    </div>
  );

  const BinStrip = () => {
    const bins = generateBinsForAisle(selectedAisle);
    return (
      <div style={{ 
        display: "flex", gap: 6, overflowX: "auto", padding: "12px 16px", 
        background: "var(--card-bg)", borderBottom: "1px solid var(--border)",
        scrollbarWidth: "none"
      }}>
        {bins.map((bin, idx) => (
          <button key={bin} onClick={() => setCurrentBinIndex(idx)} style={{
            minWidth: 50, height: 32, borderRadius: 8, border: "none",
            background: idx === currentBinIndex ? "var(--accent)" : "var(--bg)",
            color: idx === currentBinIndex ? "#fff" : "var(--text-secondary)",
            fontSize: 11, fontWeight: 800, fontFamily: "var(--font-mono)", flexShrink: 0
          }}>
            {bin.slice(-3)}
          </button>
        ))}
      </div>
    );
  };

  // ─── VIEWS ───────────────────────────────────────────────────────

  const HubView = () => (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-1px" }}>Novus Ops</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Buena Park · Plant 1730</p>
      </header>

      <div style={{ position: "relative", marginBottom: 24 }}>
        <Icon name="search" size={18} />
        <input 
          style={{ width: "100%", padding: "16px 16px 16px 48px", borderRadius: 14, border: "2px solid var(--border)", background: "var(--card-bg)", color: "#fff", fontSize: 16 }}
          placeholder="Scan SKU or type 'FRESH'..."
          onChange={(e) => {
            const val = e.target.value.toUpperCase();
            if (val === "FRESH") launchMode("fresh");
            setSearchQuery(val);
          }}
        />
        <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }}><Icon name="search" size={20}/></div>
      </div>

      <h3 style={{ fontSize: 11, fontWeight: 800, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Select Aisle</h3>
      <AisleGrid />

      <button onClick={() => launchMode("fresh")} style={{
        width: "100%", marginTop: 12, padding: 20, borderRadius: 14, background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", color: "#000", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: 10
      }}>
        <Icon name="zap" size={20}/> START FRESH AUDIT
      </button>
    </div>
  );

  const AuditView = () => {
    const bins = generateBinsForAisle(selectedAisle);
    const bin = bins[currentBinIndex];
    const expected = Object.values(sapData).filter(h => h.expectedBin === bin);

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <header style={{ padding: 16, background: "var(--card-bg)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setMode("idle")} style={{ background: "none", border: "none", color: "var(--text-secondary)" }}><Icon name="back" size={24}/></button>
          <h2 style={{ fontSize: 18, fontWeight: 800, flex: 1 }}>Aisle {selectedAisle}</h2>
          <div style={{ background: "var(--accent)", color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{currentBinIndex + 1} / {bins.length}</div>
        </header>

        <BinStrip />

        <main style={{ flex: 1, padding: 20, overflowY: "auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={{ fontSize: 48, fontWeight: 900, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{bin}</h1>
          </div>

          <div style={{ marginBottom: 24 }}>
            <input 
              ref={scanRef}
              autoFocus
              style={{ width: "100%", padding: 20, borderRadius: 12, border: "2px solid var(--accent)", background: "var(--bg)", color: "#fff", fontSize: 20, textAlign: "center", fontWeight: 700, fontFamily: "var(--font-mono)" }}
              placeholder="SCAN HU"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan(scanInput, bin)}
            />
          </div>

          <h3 style={{ fontSize: 11, fontWeight: 800, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 12 }}>Expected Items</h3>
          {expected.map(item => {
            const record = records[item.hu];
            return (
              <div key={item.hu} style={{ 
                padding: 16, background: "var(--card-bg)", borderRadius: 12, marginBottom: 8, border: "1px solid var(--border)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                opacity: record ? 0.5 : 1
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{item.hu}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{item.material} · Qty: {item.qty}</div>
                </div>
                {record && <div style={{ color: "var(--green)" }}><Icon name="check" size={24}/></div>}
              </div>
            );
          })}
        </main>

        <footer style={{ padding: 16, background: "var(--card-bg)", borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
          <button style={{ flex: 1, padding: 16, borderRadius: 12, background: "var(--surface-3)", color: "var(--text-primary)", fontWeight: 800 }}>MISSING</button>
          <button onClick={() => setCurrentBinIndex(i => i + 1)} style={{ flex: 2, padding: 16, borderRadius: 12, background: "var(--green)", color: "#000", fontWeight: 800 }}>NEXT BIN →</button>
        </footer>
      </div>
    );
  };

  // ─── MAIN RENDER ──────────────────────────────────────────────────
  return (
    <div style={{
      "--bg": "#0f1117", "--card-bg": "#181a23", "--surface-3": "#2a2d3a", "--border": "#313546",
      "--text-primary": "#eceef4", "--text-secondary": "#9ba1b5", "--text-dim": "#6c7189",
      "--accent": "#5b9aff", "--green": "#34d399",
      "--font-display": "'DM Sans', sans-serif", "--font-mono": "'JetBrains Mono', monospace",
      minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-display)"
    }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        input:focus { outline: none; border-color: var(--accent) !important; }
      `}</style>

      {/* Notification Toast */}
      {notification && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
          background: notification.type === "success" ? "var(--green)" : "#f59e0b", color: "#000",
          padding: "12px 24px", borderRadius: 12, fontWeight: 800, fontSize: 13, boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
        }}>
          {notification.msg}
        </div>
      )}

      {mode === "idle" && <HubView />}
      {mode === "aisle" && <AuditView />}
      
      {/* Ghost Modal */}
      {ghostPrompt && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20 }}>
          <div style={{ background: "var(--card-bg)", padding: 30, borderRadius: 20, maxWidth: 400, textAlign: "center", border: "2px solid var(--red)" }}>
            <Icon name="alert" size={48} />
            <h2 style={{ marginTop: 16 }}>Ghost Item</h2>
            <p style={{ color: "var(--text-secondary)", margin: "10px 0 20px" }}>HU {ghostPrompt.hu} is not in SAP. Cycle count recommended.</p>
            <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setGhostPrompt(null)} style={{ flex: 1, padding: 14, borderRadius: 12, background: "var(--surface-3)", color: "#fff", border: "none" }}>Dismiss</button>
                <button onClick={() => setGhostPrompt(null)} style={{ flex: 1, padding: 14, borderRadius: 12, background: "var(--accent)", color: "#fff", border: "none" }}>Log & Pivot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
