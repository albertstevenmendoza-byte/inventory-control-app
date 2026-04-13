<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <title>Cycle Counter — Novus Ops</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    body {
      margin: 0;
      padding: 0;
      background: #0c0e14;
      -webkit-tap-highlight-color: transparent;
    }
    /* Add a subtle home link to navigate back to your hub */
    .home-btn {
      position: absolute;
      top: 16px;
      left: 16px;
      color: #9197a6;
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      font-size: 13px;
      z-index: 100;
      background: #1e2230;
      padding: 8px 12px;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  
  <a href="index.html" class="home-btn">← Hub</a>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useCallback, useMemo, useRef } = React;

    // ─── CONSTANTS ───────────────────────────────────────────────────────
    const FRESH_ITEMS = [
      "3305704","3307506","3307509","3307515","3307518","3307525",
      "3307710","3308356","3309009","3309016","3309017","3309019",
      "3309138","3309139"
    ];

    const AISLES = ["WA","WB","WC","WD","WE","WF","WG","WH","WJ","WK","WL","WM","WN","WP"];
    const BIN_SUFFIXES = ["A","B","C"];
    const BIN_NUMBERS = Array.from({length:39},(_,i)=>String(i).padStart(2,"0"));

    const generateBins = (aisle) => {
      const bins = [];
      BIN_NUMBERS.forEach(n => BIN_SUFFIXES.forEach(s => bins.push(`${aisle}${n}${s}`)));
      return bins;
    };

    // ─── MOCK SAP DATA GENERATOR ─────────────────────────────────────────
    const generateMockSAP = () => {
      const data = {};
      const materials = [
        "3305704","3307506","3307509","3307515","3307518","3307525","3307710",
        "3308356","3309009","3309016","3309017","3309019","3309138","3309139",
        "1001001","1001002","2390010","2390015","2390020","4001050","4001060"
      ];
      let huId = 100000000;
      AISLES.forEach(aisle => {
        const bins = generateBins(aisle);
        const usedBins = bins.filter(() => Math.random() < 0.15);
        usedBins.forEach(bin => {
          const numHUs = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < numHUs; i++) {
            const hu = String(huId++);
            const mat = materials[Math.floor(Math.random() * materials.length)];
            if (!data[hu]) {
              data[hu] = { hu, material: mat, expectedBin: bin, qty: Math.floor(Math.random()*50)+1 };
            }
          }
        });
      });
      return data;
    };

    // ─── ICONS ───────────────────────────────────────────────────────────
    const Icon = ({name, size=20}) => {
      const icons = {
        search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>,
        check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>,
        x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
        arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
        alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>,
        box: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>,
        grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
        zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
        back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
        plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
        minus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>,
        clipboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
        move: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/></svg>,
      };
      return icons[name] || null;
    };

    // ─── MAIN APP ────────────────────────────────────────────────────────
    function CycleCounter() {
      // Core state
      const [sapData, setSapData] = useState({});
      const [mode, setMode] = useState("idle"); // idle | aisle | product | fresh
      const [records, setRecords] = useState({}); // hu -> { state, foundBin, expectedBin, material, qty, timestamp }
      const [ghostItems, setGhostItems] = useState([]); // [{hu, bin, material, qty}]

      // Mode-specific state
      const [selectedAisle, setSelectedAisle] = useState(null);
      const [currentBinIndex, setCurrentBinIndex] = useState(0);
      const [productSearch, setProductSearch] = useState("");
      const [activeProduct, setActiveProduct] = useState(null);

      // FRESH mode state
      const [freshCounts, setFreshCounts] = useState({}); // material -> { locations: [{bin, qty}], totalQty }

      // UI state
      const [scanInput, setScanInput] = useState("");
      const [notification, setNotification] = useState(null);
      const [showReport, setShowReport] = useState(false);
      const [ghostPrompt, setGhostPrompt] = useState(null);
      const scanRef = useRef(null);

      // Initialize mock SAP data
      useEffect(() => { setSapData(generateMockSAP()); }, []);

      // ─── DERIVED DATA ────────────────────────────────────────────────
      const currentBins = useMemo(() => {
        if (mode === "aisle" && selectedAisle) return generateBins(selectedAisle);
        return [];
      }, [mode, selectedAisle]);

      const currentBin = currentBins[currentBinIndex] || null;

      const expectedHUsForBin = useMemo(() => {
        if (!currentBin) return [];
        return Object.values(sapData).filter(h => h.expectedBin === currentBin);
      }, [currentBin, sapData]);

      const productLocations = useMemo(() => {
        if (!activeProduct) return [];
        return Object.values(sapData).filter(h => h.material === activeProduct);
      }, [activeProduct, sapData]);

      const freshSAPData = useMemo(() => {
        const grouped = {};
        FRESH_ITEMS.forEach(mat => {
          const hus = Object.values(sapData).filter(h => h.material === mat);
          grouped[mat] = { material: mat, hus, totalExpected: hus.reduce((s,h)=>s+h.qty,0), binCount: new Set(hus.map(h=>h.expectedBin)).size };
        });
        return grouped;
      });

      // ─── NOTIFICATION HELPER ──────────────────────────────────────────
      const notify = useCallback((msg, type="info", duration=3000) => {
        setNotification({msg, type});
        if (duration) setTimeout(() => setNotification(null), duration);
      }, []);

      // ─── CONFLICT RESOLUTION ENGINE ───────────────────────────────────
      const resolveState = useCallback((hu, foundBin) => {
        const sapRecord = sapData[hu];

        // GHOST: HU not in SAP at all
        if (!sapRecord) return "GHOST";

        // OK: found in expected bin
        if (sapRecord.expectedBin === foundBin) return "OK";

        // MOVEMENT: found in wrong bin
        return "MOVEMENT";
      }, [sapData]);

      const checkMovementConflict = useCallback((hu) => {
        // If this HU was already scanned as a MOVEMENT somewhere else,
        // it should NOT be marked MISSING from its expected bin
        return records[hu]?.state === "MOVEMENT";
      }, [records]);

      // ─── SCAN HANDLER ─────────────────────────────────────────────────
      const handleScan = useCallback((inputHU, contextBin) => {
        const hu = inputHU.trim();
        if (!hu) return;

        const state = resolveState(hu, contextBin);
        const sapRecord = sapData[hu];

        if (state === "GHOST") {
          setGhostPrompt({ hu, bin: contextBin });
          return;
        }

        const record = {
          hu,
          state,
          foundBin: contextBin,
          expectedBin: sapRecord.expectedBin,
          material: sapRecord.material,
          qty: sapRecord.qty,
          timestamp: Date.now()
        };

        setRecords(prev => ({ ...prev, [hu]: record }));

        if (state === "OK") {
          notify(`✓ HU ${hu} verified in ${contextBin}`, "success");
        } else if (state === "MOVEMENT") {
          notify(`⇄ HU ${hu} MOVED — expected ${sapRecord.expectedBin}, found ${contextBin}`, "warning");
        }

        setScanInput("");
        scanRef.current?.focus();
      }, [resolveState, sapData, notify]);

      // ─── FINALIZE BIN (auto-detect missing) ───────────────────────────
      const finalizeBin = useCallback((bin) => {
        const expected = Object.values(sapData).filter(h => h.expectedBin === bin);
        const newRecords = { ...records };
        let missingCount = 0;

        expected.forEach(h => {
          if (!newRecords[h.hu]) {
            // Check if this HU was found elsewhere as MOVEMENT
            if (!checkMovementConflict(h.hu)) {
              newRecords[h.hu] = {
                hu: h.hu, state: "MISSING", foundBin: null,
                expectedBin: h.expectedBin, material: h.material,
                qty: h.qty, timestamp: Date.now()
              };
              missingCount++;
            }
            // If MOVEMENT exists, skip — do NOT mark as MISSING
          }
        });

        setRecords(newRecords);
        if (missingCount > 0) {
          notify(`${missingCount} item(s) marked MISSING from ${bin}`, "error");
        } else {
          notify(`Bin ${bin} finalized — all items accounted for`, "success");
        }
      }, [sapData, records, checkMovementConflict, notify]);

      // ─── GHOST ITEM HANDLERS ──────────────────────────────────────────
      const acceptGhostAudit = useCallback(() => {
        if (!ghostPrompt) return;
        setGhostItems(prev => [...prev, ghostPrompt]);
        setActiveProduct(ghostPrompt.hu);
        setMode("product");
        setGhostPrompt(null);
        notify("Pivoting to Product Audit for ghost item", "info");
      }, [ghostPrompt, notify]);

      const dismissGhost = useCallback(() => {
        if (!ghostPrompt) return;
        setGhostItems(prev => [...prev, ghostPrompt]);
        setGhostPrompt(null);
        notify("Ghost item logged", "info");
      }, [ghostPrompt, notify]);

      // ─── FRESH MODE HANDLERS ──────────────────────────────────────────
      const updateFreshCount = useCallback((material, bin, delta) => {
        setFreshCounts(prev => {
          const existing = prev[material] || { locations: [], totalQty: 0 };
          const locIdx = existing.locations.findIndex(l => l.bin === bin);
          let newLocs = [...existing.locations];
          if (locIdx >= 0) {
            const newQty = Math.max(0, newLocs[locIdx].qty + delta);
            if (newQty === 0) newLocs.splice(locIdx, 1);
            else newLocs[locIdx] = { ...newLocs[locIdx], qty: newQty };
          } else if (delta > 0) {
            newLocs.push({ bin, qty: delta });
          }
          const totalQty = newLocs.reduce((s,l)=>s+l.qty, 0);
          return { ...prev, [material]: { locations: newLocs, totalQty } };
        });
      }, []);

      const addFreshScan = useCallback((material, bin) => {
        if (!bin.trim()) return;
        updateFreshCount(material, bin.trim().toUpperCase(), 1);
      }, [updateFreshCount]);

      // ─── MODE LAUNCHER ────────────────────────────────────────────────
      const launchMode = useCallback((newMode, payload) => {
        setRecords({});
        setGhostItems([]);
        setFreshCounts({});
        setShowReport(false);
        setCurrentBinIndex(0);
        setActiveProduct(null);
        setSelectedAisle(null);

        if (newMode === "aisle") {
          setSelectedAisle(payload);
          setMode("aisle");
        } else if (newMode === "product") {
          setActiveProduct(payload);
          setMode("product");
        } else if (newMode === "fresh") {
          setMode("fresh");
        } else {
          setMode("idle");
        }
      }, []);

      // ─── REPORT DATA ──────────────────────────────────────────────────
      const reportData = useMemo(() => {
        const all = Object.values(records);
        return {
          total: all.length,
          ok: all.filter(r => r.state === "OK").length,
          missing: all.filter(r => r.state === "MISSING").length,
          movement: all.filter(r => r.state === "MOVEMENT").length,
          ghosts: ghostItems.length,
          records: all,
          accuracy: all.length ? ((all.filter(r=>r.state==="OK").length / all.length)*100).toFixed(1) : "0.0"
        };
      }, [records, ghostItems]);

      // ─── FRESH REPORT DATA ────────────────────────────────────────────
      const freshReportData = useMemo(() => {
        return FRESH_ITEMS.map(mat => {
          const sap = freshSAPData[mat] || { totalExpected: 0, binCount: 0 };
          const counted = freshCounts[mat] || { locations: [], totalQty: 0 };
          const variance = counted.totalQty - sap.totalExpected;
          return { material: mat, expected: sap.totalExpected, counted: counted.totalQty, variance, locations: counted.locations, sapBins: sap.binCount };
        });
      }, [freshSAPData, freshCounts]);

      // ─── SEARCH / MODE SELECTOR HANDLER ───────────────────────────────
      const handleModeSearch = useCallback((val) => {
        if (val.toUpperCase() === "FRESH") {
          launchMode("fresh");
          setProductSearch("");
          return;
        }
        setProductSearch(val);
      }, [launchMode]);

      // ═════════════════════════════════════════════════════════════════════
      // RENDER
      // ═════════════════════════════════════════════════════════════════════

      // ─── NOTIFICATION TOAST ───────────────────────────────────────────
      const NotificationToast = () => {
        if (!notification) return null;
        const colors = { success: "#10b981", warning: "#f59e0b", error: "#ef4444", info: "#6366f1" };
        return (
          <div style={{
            position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
            background: colors[notification.type] || colors.info, color: "#fff",
            padding: "12px 24px", borderRadius: 12, fontWeight: 600, fontSize: 14,
            zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            animation: "slideDown 0.3s ease", maxWidth: "90vw", textAlign: "center"
          }}>
            {notification.msg}
          </div>
        );
      };

      // ─── GHOST PROMPT MODAL ───────────────────────────────────────────
      const GhostModal = () => {
        if (!ghostPrompt) return null;
        return (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9998, padding: 20
          }}>
            <div style={{
              background: "var(--card-bg)", borderRadius: 16, padding: 32,
              maxWidth: 420, width: "100%", textAlign: "center"
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}><Icon name="alert" size={48}/></div>
              <h3 style={{ color: "var(--text-primary)", margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: 20 }}>
                Ghost Item Detected
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "0 0 8px" }}>
                HU <span style={{color: "var(--accent)", fontWeight: 700}}>{ghostPrompt.hu}</span> scanned in <span style={{fontWeight: 700}}>{ghostPrompt.bin}</span>
              </p>
              <p style={{ color: "#f59e0b", fontSize: 13, margin: "0 0 24px", fontWeight: 500 }}>
                This item does not exist in the SAP system upload.
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: "0 0 20px" }}>
                Cycle count recommended for this item.
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={acceptGhostAudit} style={{
                  flex: 1, padding: "14px", borderRadius: 10, border: "none",
                  background: "var(--accent)", color: "#fff", fontWeight: 700,
                  fontSize: 14, cursor: "pointer"
                }}>
                  Start Product Audit
                </button>
                <button onClick={dismissGhost} style={{
                  flex: 1, padding: "14px", borderRadius: 10, border: "2px solid var(--border)",
                  background: "transparent", color: "var(--text-secondary)", fontWeight: 600,
                  fontSize: 14, cursor: "pointer"
                }}>
                  Log & Skip
                </button>
              </div>
            </div>
          </div>
        );
      };

      // ─── IDLE / HOME SCREEN ───────────────────────────────────────────
      const IdleScreen = () => (
        <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40, paddingTop: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 18, margin: "0 auto 16px",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dim))",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Icon name="clipboard" size={36} />
            </div>
            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800,
              color: "var(--text-primary)", margin: "0 0 6px", letterSpacing: "-0.5px"
            }}>Cycle Counter</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: 0 }}>
              Plant 1730 · Inventory Reconciliation
            </p>
          </div>

          {/* Search / Mode Selector */}
          <div style={{
            position: "relative", marginBottom: 32,
            background: "var(--card-bg)", borderRadius: 14,
            border: "2px solid var(--border)", padding: "4px"
          }}>
            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }}>
              <Icon name="search" size={18} />
            </div>
            <input
              value={productSearch}
              onChange={e => handleModeSearch(e.target.value)}
              placeholder='Search product # or type "FRESH"'
              style={{
                width: "100%", padding: "14px 14px 14px 44px", border: "none",
                background: "transparent", fontSize: 16, color: "var(--text-primary)",
                outline: "none", fontFamily: "var(--font-mono)", boxSizing: "border-box"
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && productSearch.trim()) {
                  const mat = productSearch.trim();
                  const exists = Object.values(sapData).some(h => h.material === mat);
                  if (exists) launchMode("product", mat);
                  else notify("Material not found in SAP data", "error");
                }
              }}
            />
          </div>

          {/* Mode Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => document.getElementById("aisle-select")?.classList.toggle("expanded")} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
              background: "var(--card-bg)", border: "2px solid var(--border)",
              borderRadius: 14, cursor: "pointer", width: "100%", textAlign: "left",
              transition: "all 0.2s"
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(99,102,241,0.15)", color: "#6366f1", flexShrink: 0
              }}><Icon name="grid" size={24}/></div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 16, fontFamily: "var(--font-display)" }}>Aisle Audit</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>Sequential bin-by-bin audit</div>
              </div>
            </button>

            {/* Aisle Grid (hidden by default) */}
            <div id="aisle-select" style={{
              maxHeight: 0, overflow: "hidden", transition: "max-height 0.3s ease"
            }}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
                gap: 8, padding: "8px 0"
              }}>
                {AISLES.map(a => (
                  <button key={a} onClick={() => launchMode("aisle", a)} style={{
                    padding: "14px 8px", borderRadius: 10, border: "2px solid var(--border)",
                    background: "var(--card-bg)", color: "var(--text-primary)",
                    fontWeight: 700, fontSize: 16, cursor: "pointer",
                    fontFamily: "var(--font-mono)", transition: "all 0.15s"
                  }}>{a}</button>
                ))}
              </div>
            </div>

            <button onClick={() => {
              const el = document.querySelector('[placeholder*="Search"]');
              el?.focus();
            }} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
              background: "var(--card-bg)", border: "2px solid var(--border)",
              borderRadius: 14, cursor: "pointer", width: "100%", textAlign: "left"
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(16,185,129,0.15)", color: "#10b981", flexShrink: 0
              }}><Icon name="box" size={24}/></div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: 16, fontFamily: "var(--font-display)" }}>Product Audit</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>Search a material # above</div>
              </div>
            </button>

            <button onClick={() => launchMode("fresh")} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
              background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.08))",
              border: "2px solid rgba(245,158,11,0.3)", borderRadius: 14, cursor: "pointer",
              width: "100%", textAlign: "left"
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(245,158,11,0.2)", color: "#f59e0b", flexShrink: 0
              }}><Icon name="zap" size={24}/></div>
              <div>
                <div style={{ fontWeight: 700, color: "#f59e0b", fontSize: 16, fontFamily: "var(--font-display)" }}>FRESH Audit</div>
                <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 2 }}>Speed mode · 14 items · Tally counters</div>
              </div>
            </button>
          </div>

          <div style={{
            marginTop: 32, padding: 16, borderRadius: 12,
            background: "var(--card-bg)", border: "1px solid var(--border)",
            textAlign: "center"
          }}>
            <p style={{ color: "var(--text-dim)", fontSize: 12, margin: 0 }}>
              SAP Data Loaded: <span style={{color:"var(--text-secondary)", fontWeight:600}}>{Object.keys(sapData).length} HUs</span>
              {" · "}{AISLES.length} Aisles
            </p>
          </div>
        </div>
      );

      // ─── AISLE AUDIT SCREEN ───────────────────────────────────────────
      const AisleAuditScreen = () => {
        const binProgress = currentBins.map(bin => {
          const expected = Object.values(sapData).filter(h => h.expectedBin === bin);
          const scanned = expected.filter(h => records[h.hu]);
          return { bin, expected: expected.length, scanned: scanned.length, done: expected.length > 0 && scanned.length === expected.length };
        });
        const totalScanned = Object.values(records).length;
        const totalExpected = Object.values(sapData).filter(h => h.expectedBin?.startsWith(selectedAisle)).length;

        return (
          <div style={{ padding: 16, maxWidth: 600, margin: "0 auto" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <button onClick={() => launchMode("idle")} style={{
                background: "var(--card-bg)", border: "1px solid var(--border)",
                borderRadius: 10, padding: 10, cursor: "pointer", display: "flex", color: "var(--text-secondary)"
              }}><Icon name="back" size={20}/></button>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22, color: "var(--text-primary)" }}>
                  Aisle {selectedAisle}
                </h2>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-dim)" }}>
                  Bin {currentBinIndex + 1} / {currentBins.length} · {totalScanned}/{totalExpected} HUs
                </p>
              </div>
              <button onClick={() => setShowReport(true)} style={{
                background: "var(--accent)", color: "#fff", border: "none",
                borderRadius: 10, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer"
              }}>Report</button>
            </div>

            {/* Progress Bar */}
            <div style={{
              height: 6, borderRadius: 3, background: "var(--border)", marginBottom: 20, overflow: "hidden"
            }}>
              <div style={{
                height: "100%", borderRadius: 3, transition: "width 0.3s ease",
                background: "linear-gradient(90deg, #6366f1, #10b981)",
                width: `${totalExpected ? (totalScanned/totalExpected)*100 : 0}%`
              }}/>
            </div>

            {/* Current Bin Card */}
            {currentBin && (
              <div style={{
                background: "var(--card-bg)", border: "2px solid var(--accent)",
                borderRadius: 16, padding: 20, marginBottom: 16
              }}>
                <div style={{ display: "flex", justify-content: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{
                    margin: 0, fontFamily: "var(--font-mono)", fontSize: 28,
                    fontWeight: 800, color: "var(--accent)", letterSpacing: 1
                  }}>{currentBin}</h3>
                  <span style={{
                    background: "rgba(99,102,241,0.15)", color: "#6366f1",
                    padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600
                  }}>
                    {expectedHUsForBin.filter(h=>records[h.hu]).length}/{expectedHUsForBin.length} scanned
                  </span>
                </div>

                {/* Scan Input */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <input
                    ref={scanRef}
                    value={scanInput}
                    onChange={e => setScanInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleScan(scanInput, currentBin); }}
                    placeholder="Scan or type HU #"
                    autoFocus
                    style={{
                      flex: 1, padding: "14px 16px", borderRadius: 10,
                      border: "2px solid var(--border)", background: "var(--bg)",
                      fontSize: 18, fontFamily: "var(--font-mono)", fontWeight: 700,
                      color: "var(--text-primary)", outline: "none", boxSizing: "border-box"
                    }}
                  />
                  <button onClick={() => handleScan(scanInput, currentBin)} style={{
                    padding: "14px 20px", borderRadius: 10, border: "none",
                    background: "var(--accent)", color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center"
                  }}><Icon name="check" size={22}/></button>
                </div>

                {/* Expected Items List */}
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 8px", textTransform: "uppercase", fontWeight: 600, letterSpacing: 1 }}>
                    Expected in this bin
                  </p>
                  {expectedHUsForBin.length === 0 ? (
                    <p style={{ color: "var(--text-dim)", fontSize: 13, fontStyle: "italic" }}>No items expected (empty bin)</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {expectedHUsForBin.map(h => {
                        const rec = records[h.hu];
                        const stateColor = !rec ? "var(--text-dim)" : rec.state === "OK" ? "#10b981" : rec.state === "MOVEMENT" ? "#f59e0b" : "#ef4444";
                        const stateLabel = !rec ? "—" : rec.state;
                        return (
                          <div key={h.hu} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "10px 12px", borderRadius: 8,
                            background: rec ? `${stateColor}11` : "var(--bg)",
                            border: `1px solid ${rec ? `${stateColor}33` : "var(--border)"}`
                          }}>
                            <span style={{
                              width: 8, height: 8, borderRadius: "50%",
                              background: stateColor, flexShrink: 0
                            }}/>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{h.hu}</span>
                            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{h.material}</span>
                            <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: stateColor, textTransform: "uppercase" }}>{stateLabel}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Bin Actions */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { finalizeBin(currentBin); if(currentBinIndex < currentBins.length - 1) setCurrentBinIndex(i=>i+1); }}
                    style={{
                      flex: 1, padding: "14px", borderRadius: 10, border: "none",
                      background: "#10b981", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer"
                    }}>
                    Finalize & Next →
                  </button>
                  <button onClick={() => currentBinIndex < currentBins.length - 1 && setCurrentBinIndex(i=>i+1)}
                    style={{
                      padding: "14px 18px", borderRadius: 10, border: "2px solid var(--border)",
                      background: "transparent", color: "var(--text-secondary)", fontWeight: 600,
                      fontSize: 14, cursor: "pointer"
                    }}>
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* Bin Navigator */}
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {binProgress.slice(Math.max(0, currentBinIndex-10), currentBinIndex+20).map((bp, i) => (
                <button key={bp.bin} onClick={() => setCurrentBinIndex(currentBins.indexOf(bp.bin))} style={{
                  width: 36, height: 36, borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 9, fontWeight: 600, fontFamily: "var(--font-mono)",
                  background: bp.bin === currentBin ? "var(--accent)" : bp.done ? "#10b98133" : bp.expected > 0 ? "var(--card-bg)" : "var(--bg)",
                  color: bp.bin === currentBin ? "#fff" : bp.done ? "#10b981" : "var(--text-dim)",
                  display: "flex", alignItems: "center", justify-content: "center"
                }}>
                  {bp.bin.slice(-3)}
                </button>
              ))}
            </div>
          </div>
        );
      };

      // ─── PRODUCT AUDIT SCREEN ─────────────────────────────────────────
      const ProductAuditScreen = () => (
        <div style={{ padding: 16, maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <button onClick={() => launchMode("idle")} style={{
              background: "var(--card-bg)", border: "1px solid var(--border)",
              borderRadius: 10, padding: 10, cursor: "pointer", display: "flex", color: "var(--text-secondary)"
            }}><Icon name="back" size={20}/></button>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22, color: "var(--text-primary)" }}>
                Product Audit
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: "#10b981", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                {activeProduct}
              </p>
            </div>
            <button onClick={() => setShowReport(true)} style={{
              background: "var(--accent)", color: "#fff", border: "none",
              borderRadius: 10, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer"
            }}>Report</button>
          </div>

          <div style={{
            background: "var(--card-bg)", border: "2px solid var(--border)",
            borderRadius: 16, padding: 20, marginBottom: 16
          }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                ref={scanRef}
                value={scanInput}
                onChange={e => setScanInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && scanInput.trim()) {
                    const parts = scanInput.trim().split(/[\s,]+/);
                    if (parts.length >= 2) handleScan(parts[0], parts[1].toUpperCase());
                    else notify("Format: HU# BIN (e.g., 100000015 WA05B)", "warning");
                  }
                }}
                placeholder="HU# BIN (e.g., 100000015 WA05B)"
                autoFocus
                style={{
                  flex: 1, padding: "14px 16px", borderRadius: 10,
                  border: "2px solid var(--border)", background: "var(--bg)",
                  fontSize: 16, fontFamily: "var(--font-mono)", fontWeight: 600,
                  color: "var(--text-primary)", outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 8px", textTransform: "uppercase", fontWeight: 600, letterSpacing: 1 }}>
              SAP Locations for {activeProduct}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 400, overflowY: "auto" }}>
              {productLocations.length === 0 ? (
                <p style={{ color: "#f59e0b", fontSize: 13 }}>No SAP records — this is a ghost item. Scan all locations found.</p>
              ) : productLocations.map(h => {
                const rec = records[h.hu];
                const stateColor = !rec ? "var(--text-dim)" : rec.state === "OK" ? "#10b981" : rec.state === "MOVEMENT" ? "#f59e0b" : "#ef4444";
                return (
                  <div key={h.hu} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: 8,
                    background: rec ? `${stateColor}11` : "var(--bg)",
                    border: `1px solid ${rec ? `${stateColor}33` : "var(--border)"}`
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: stateColor, flexShrink: 0 }}/>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{h.hu}</span>
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{h.expectedBin}</span>
                    <span style={{ fontSize: 12, color: "var(--text-dim)" }}>×{h.qty}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: stateColor, textTransform: "uppercase" }}>
                      {rec ? rec.state : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

      // ─── FRESH AUDIT SCREEN ───────────────────────────────────────────
      const FreshAuditScreen = () => {
        const [activeFreshItem, setActiveFreshItem] = useState(null);
        const [freshBinInput, setFreshBinInput] = useState("");
        const freshBinRef = useRef(null);

        const activeData = activeFreshItem ? freshSAPData[activeFreshItem] : null;
        const activeCounts = activeFreshItem ? (freshCounts[activeFreshItem] || { locations: [], totalQty: 0 }) : null;

        return (
          <div style={{ padding: 16, maxWidth: 600, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <button onClick={() => activeFreshItem ? setActiveFreshItem(null) : launchMode("idle")} style={{
                background: "var(--card-bg)", border: "1px solid var(--border)",
                borderRadius: 10, padding: 10, cursor: "pointer", display: "flex", color: "var(--text-secondary)"
              }}><Icon name="back" size={20}/></button>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22, color: "#f59e0b" }}>
                  <Icon name="zap" size={22}/> FRESH Audit
                </h2>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-dim)" }}>
                  {activeFreshItem ? `Item: ${activeFreshItem}` : "14 items · Rapid tally mode"}
                </p>
              </div>
              <button onClick={() => setShowReport(true)} style={{
                background: "#f59e0b", color: "#000", border: "none",
                borderRadius: 10, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer"
              }}>Report</button>
            </div>

            {!activeFreshItem ? (
              /* ── FRESH Item Selector Grid ────────────────────────── */
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {FRESH_ITEMS.map(mat => {
                  const sap = freshSAPData[mat] || { totalExpected: 0, binCount: 0 };
                  const counted = freshCounts[mat] || { totalQty: 0, locations: [] };
                  const done = counted.locations.length > 0;
                  const variance = counted.totalQty - sap.totalExpected;
                  return (
                    <button key={mat} onClick={() => { setActiveFreshItem(mat); setTimeout(()=>freshBinRef.current?.focus(), 100); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "14px 16px", borderRadius: 12,
                        background: done ? "rgba(16,185,129,0.08)" : "var(--card-bg)",
                        border: `2px solid ${done ? "rgba(16,185,129,0.3)" : "var(--border)"}`,
                        cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.15s"
                      }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0,
                        background: done ? "#10b98122" : "var(--bg)",
                        color: done ? "#10b981" : "var(--text-dim)"
                      }}>
                        {done ? <Icon name="check" size={20}/> : <Icon name="box" size={20}/>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>{mat}</div>
                        <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>
                          SAP: {sap.totalExpected} units · {sap.binCount} bins
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, color: done ? "#10b981" : "var(--text-dim)" }}>
                          {counted.totalQty}
                        </div>
                        {done && variance !== 0 && (
                          <div style={{ fontSize: 11, fontWeight: 600, color: variance > 0 ? "#f59e0b" : "#ef4444" }}>
                            {variance > 0 ? "+" : ""}{variance}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* ── FRESH Item Detail — Rapid Tally ────────────────── */
              <div>
                {/* SAP Summary */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16
                }}>
                  {[
                    { label: "SAP Expected", value: activeData.totalExpected, color: "var(--text-primary)" },
                    { label: "Counted", value: activeCounts.totalQty, color: "#10b981" },
                    { label: "Variance", value: activeCounts.totalQty - activeData.totalExpected, color: (activeCounts.totalQty - activeData.totalExpected) === 0 ? "#10b981" : "#ef4444" }
                  ].map(s => (
                    <div key={s.label} style={{
                      background: "var(--card-bg)", border: "1px solid var(--border)",
                      borderRadius: 12, padding: "12px 10px", textAlign: "center"
                    }}>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 4, textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Scan-and-Tally Input */}
                <div style={{
                  background: "var(--card-bg)", border: "2px solid rgba(245,158,11,0.4)",
                  borderRadius: 14, padding: 16, marginBottom: 16
                }}>
                  <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 8px", textTransform: "uppercase", fontWeight: 600, letterSpacing: 1 }}>
                    Scan bin → auto-tally
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      ref={freshBinRef}
                      value={freshBinInput}
                      onChange={e => setFreshBinInput(e.target.value.toUpperCase())}
                      onKeyDown={e => {
                        if (e.key === "Enter" && freshBinInput.trim()) {
                          addFreshScan(activeFreshItem, freshBinInput);
                          setFreshBinInput("");
                        }
                      }}
                      placeholder="Scan bin (e.g., WA05B)"
                      style={{
                        flex: 1, padding: "14px 16px", borderRadius: 10,
                        border: "2px solid var(--border)", background: "var(--bg)",
                        fontSize: 18, fontFamily: "var(--font-mono)", fontWeight: 700,
                        color: "var(--text-primary)", outline: "none", boxSizing: "border-box"
                      }}
                    />
                    <button onClick={() => { if(freshBinInput.trim()) { addFreshScan(activeFreshItem, freshBinInput); setFreshBinInput(""); } }}
                      style={{
                        padding: "14px 20px", borderRadius: 10, border: "none",
                        background: "#f59e0b", color: "#000", cursor: "pointer", fontWeight: 700
                      }}>+1</button>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "8px 0 0", fontStyle: "italic" }}>
                    Each scan adds 1 pallet at that bin. Scan the same bin repeatedly for multiple pallets.
                  </p>
                </div>

                {/* Tally List */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {activeCounts.locations.length === 0 ? (
                    <p style={{ color: "var(--text-dim)", fontSize: 13, textAlign: "center", padding: 20 }}>
                      No scans yet — start scanning bins
                    </p>
                  ) : activeCounts.locations.sort((a,b)=>a.bin.localeCompare(b.bin)).map(loc => (
                    <div key={loc.bin} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px", borderRadius: 10,
                      background: "var(--card-bg)", border: "1px solid var(--border)"
                    }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700,
                        color: "var(--text-primary)", minWidth: 70
                      }}>{loc.bin}</span>
                      <div style={{ flex: 1 }}/>
                      <button onClick={() => updateFreshCount(activeFreshItem, loc.bin, -1)} style={{
                        width: 36, height: 36, borderRadius: 8, border: "2px solid var(--border)",
                        background: "transparent", cursor: "pointer", display: "flex",
                        alignItems: "center", justifyContent: "center", color: "#ef4444"
                      }}><Icon name="minus" size={16}/></button>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 800,
                        color: "var(--text-primary)", minWidth: 40, textAlign: "center"
                      }}>{loc.qty}</span>
                      <button onClick={() => updateFreshCount(activeFreshItem, loc.bin, 1)} style={{
                        width: 36, height: 36, borderRadius: 8, border: "2px solid var(--border)",
                        background: "transparent", cursor: "pointer", display: "flex",
                        alignItems: "center", justifyContent: "center", color: "#10b981"
                      }}><Icon name="plus" size={16}/></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      };

      // ─── VARIANCE REPORT MODAL ────────────────────────────────────────
      const ReportModal = () => {
        if (!showReport) return null;
        const isFresh = mode === "fresh";

        return (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            zIndex: 9990, padding: 20, overflowY: "auto"
          }}>
            <div style={{
              background: "var(--bg)", borderRadius: 20, padding: 24,
              maxWidth: 560, width: "100%", marginTop: 40, marginBottom: 40
            }}>
              <div style={{ display: "flex", justify-content: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, color: "var(--text-primary)" }}>
                  {isFresh ? "FRESH Variance Report" : "Audit Variance Report"}
                </h3>
                <button onClick={() => setShowReport(false)} style={{
                  background: "none", border: "none", cursor: "pointer", color: "var(--text-dim)", padding: 4
                }}><Icon name="x" size={20}/></button>
              </div>

              {isFresh ? (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                    <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 14, textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 600 }}>Items Counted</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 800, color: "#10b981" }}>
                        {freshReportData.filter(r => r.counted > 0).length}/{FRESH_ITEMS.length}
                      </div>
                    </div>
                    <div style={{ background: "var(--card-bg)", borderRadius: 12, padding: 14, textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 600 }}>Total Variance</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 800, color: freshReportData.reduce((s,r)=>s+Math.abs(r.variance),0) === 0 ? "#10b981" : "#ef4444" }}>
                        {freshReportData.reduce((s,r)=>s+Math.abs(r.variance),0)}
                      </div>
                    </div>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid var(--border)" }}>
                          {["Material","Expected","Counted","Variance","Bins"].map(h => (
                            <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: "var(--text-dim)", fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {freshReportData.map(r => (
                          <tr key={r.material} style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "10px 6px", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--text-primary)" }}>{r.material}</td>
                            <td style={{ padding: "10px 6px", color: "var(--text-secondary)" }}>{r.expected}</td>
                            <td style={{ padding: "10px 6px", fontWeight: 700, color: r.counted > 0 ? "#10b981" : "var(--text-dim)" }}>{r.counted}</td>
                            <td style={{ padding: "10px 6px", fontWeight: 700, color: r.variance === 0 ? "#10b981" : r.variance > 0 ? "#f59e0b" : "#ef4444" }}>
                              {r.variance > 0 ? "+" : ""}{r.variance}
                            </td>
                            <td style={{ padding: "10px 6px", color: "var(--text-dim)" }}>{r.locations.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
                    {[
                      { label: "OK", value: reportData.ok, color: "#10b981" },
                      { label: "Missing", value: reportData.missing, color: "#ef4444" },
                      { label: "Moved", value: reportData.movement, color: "#f59e0b" },
                      { label: "Ghost", value: reportData.ghosts, color: "#8b5cf6" }
                    ].map(s => (
                      <div key={s.label} style={{ background: `${s.color}11`, borderRadius: 10, padding: 12, textAlign: "center", border: `1px solid ${s.color}33` }}>
                        <div style={{ fontSize: 10, color: s.color, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    background: "var(--card-bg)", borderRadius: 12, padding: 14, textAlign: "center", marginBottom: 16,
                    border: `2px solid ${parseFloat(reportData.accuracy) >= 95 ? "#10b98155" : "#ef444455"}`
                  }}>
                    <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 600 }}>Accuracy</div>
                    <div style={{
                      fontFamily: "var(--font-mono)", fontSize: 36, fontWeight: 800,
                      color: parseFloat(reportData.accuracy) >= 95 ? "#10b981" : "#ef4444"
                    }}>{reportData.accuracy}%</div>
                  </div>

                  {reportData.records.filter(r => r.state !== "OK").length > 0 && (
                    <>
                      <p style={{ fontSize: 11, color: "var(--text-dim)", margin: "0 0 8px", textTransform: "uppercase", fontWeight: 600 }}>Discrepancies</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 300, overflowY: "auto" }}>
                        {reportData.records.filter(r => r.state !== "OK").map(r => (
                          <div key={r.hu} style={{
                            display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                            borderRadius: 6, background: "var(--card-bg)", fontSize: 12
                          }}>
                            <span style={{
                              padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                              background: r.state === "MISSING" ? "#ef444422" : "#f59e0b22",
                              color: r.state === "MISSING" ? "#ef4444" : "#f59e0b"
                            }}>{r.state}</span>
                            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--text-primary)" }}>{r.hu}</span>
                            <span style={{ color: "var(--text-dim)" }}>{r.material}</span>
                            {r.state === "MOVEMENT" && (
                              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-dim)" }}>
                                {r.expectedBin} → {r.foundBin}
                              </span>
                            )}
                            {r.state === "MISSING" && (
                              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-dim)" }}>from {r.expectedBin}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              <button onClick={() => setShowReport(false)} style={{
                width: "100%", marginTop: 20, padding: 14, borderRadius: 10,
                border: "none", background: "var(--accent)", color: "#fff",
                fontWeight: 700, fontSize: 14, cursor: "pointer"
              }}>Close Report</button>
            </div>
          </div>
        );
      };

      // ─── MAIN RENDER ──────────────────────────────────────────────────
      return (
        <div style={{
          "--bg": "#0c0e14", "--card-bg": "#14171f", "--border": "#1e2230",
          "--text-primary": "#e8eaf0", "--text-secondary": "#9197a6",
          "--text-dim": "#555d70", "--accent": "#6366f1", "--accent-dim": "#4f46e5",
          "--font-display": "'DM Sans', 'Segoe UI', sans-serif",
          "--font-mono": "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
          minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)",
          fontFamily: "var(--font-display)", WebkitFontSmoothing: "antialiased"
        }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
            * { box-sizing: border-box; }
            input::placeholder { color: var(--text-dim); }
            button:active { transform: scale(0.97); }
            @keyframes slideDown { from { opacity:0; transform: translate(-50%, -20px); } to { opacity:1; transform: translate(-50%, 0); } }
            #aisle-select.expanded { max-height: 400px !important; }
            ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
          `}</style>

          <NotificationToast />
          <GhostModal />
          <ReportModal />

          {mode === "idle" && <IdleScreen />}
          {mode === "aisle" && <AisleAuditScreen />}
          {mode === "product" && <ProductAuditScreen />}
          {mode === "fresh" && <FreshAuditScreen />}
        </div>
      );
    }

    // Bind React to the DOM
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<CycleCounter />);
  </script>
</body>
</html>
