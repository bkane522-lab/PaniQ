import { useEffect, useMemo, useRef, useState } from "react";

const STORES = ["Leclerc", "Lidl", "Aldi", "Carrefour", "Intermarché"];

const PALETTE = {
  cream: "#FAFAF7",
  green: "#173F2B",
  greenLight: "#E8F5EE",
  greenMid: "#2D8A54",
  yellow: "#F5C518",
  yellowLight: "#FFF7D6",
  red: "#E8442A",
  redLight: "#FDEEEC",
  gray: "#667085",
  grayLight: "#F3F4F6",
  dark: "#171717",
  border: "#E5E7EB"
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,500;0,700;1,500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background:
      radial-gradient(circle at top left, rgba(245,197,24,0.16), transparent 34%),
      radial-gradient(circle at top right, rgba(45,138,84,0.18), transparent 28%),
      ${PALETTE.cream};
    color: ${PALETTE.dark};
  }
  button, textarea { font: inherit; }
  button { -webkit-tap-highlight-color: transparent; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  .header {
    background: rgba(23,63,43,0.96);
    color: white;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: sticky;
    top: 0;
    z-index: 20;
    box-shadow: 0 8px 28px rgba(23,63,43,0.25);
    backdrop-filter: blur(14px);
  }
  .brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 15px;
    display: grid;
    place-items: center;
    background: linear-gradient(145deg, ${PALETTE.yellow}, #fff1a0 45%, #ffffff 46%, #dff6e8 100%);
    color: ${PALETTE.green};
    font-size: 22px;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.55), 0 10px 24px rgba(0,0,0,0.14);
  }
  .header-title {
    font-family: 'Fraunces', serif;
    font-size: 25px;
    font-weight: 700;
    letter-spacing: -0.6px;
    line-height: 1;
  }
  .header-sub { font-size: 12px; opacity: 0.82; margin-top: 3px; }
  .header-badge {
    margin-left: auto;
    background: ${PALETTE.yellow};
    color: ${PALETTE.dark};
    font-size: 10px;
    font-weight: 800;
    padding: 5px 9px;
    border-radius: 999px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .main { flex: 1; padding: 16px; max-width: 680px; margin: 0 auto; width: 100%; }

  .hero {
    background: linear-gradient(150deg, rgba(23,63,43,0.97), rgba(45,138,84,0.94));
    border-radius: 24px;
    padding: 22px 18px;
    color: white;
    margin: 4px 0 16px;
    box-shadow: 0 14px 40px rgba(23,63,43,0.22);
    overflow: hidden;
    position: relative;
  }
  .hero::after {
    content: "";
    position: absolute;
    width: 180px;
    height: 180px;
    right: -70px;
    top: -70px;
    background: radial-gradient(circle, rgba(245,197,24,0.42), transparent 68%);
  }
  .hero-kicker {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.18);
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    margin-bottom: 13px;
  }
  .hero h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(31px, 7vw, 44px);
    line-height: 0.96;
    letter-spacing: -1px;
    max-width: 420px;
    margin-bottom: 12px;
  }
  .hero p { color: rgba(255,255,255,0.82); font-size: 15px; line-height: 1.55; max-width: 500px; }
  .disclaimer {
    margin-top: 14px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 14px;
    padding: 10px 12px;
    font-size: 12px;
    color: rgba(255,255,255,0.82);
    line-height: 1.45;
  }

  .section-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${PALETTE.gray};
    margin-bottom: 10px;
  }

  .input-area {
    background: white;
    border: 1.5px solid ${PALETTE.border};
    border-radius: 20px;
    padding: 14px;
    margin-bottom: 16px;
    box-shadow: 0 8px 26px rgba(16,24,40,0.06);
  }
  .input-area:focus-within { border-color: rgba(45,138,84,0.45); box-shadow: 0 10px 30px rgba(45,138,84,0.12); }
  .input-area textarea {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    color: ${PALETTE.dark};
    background: transparent;
    resize: none;
    min-height: 112px;
    line-height: 1.55;
  }
  .input-area textarea::placeholder { color: #A7B0BA; }
  .input-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
    padding-top: 12px;
    border-top: 1px solid ${PALETTE.border};
  }
  .char-hint { font-size: 12px; color: ${PALETTE.gray}; white-space: nowrap; }

  .btn-analyze {
    background: ${PALETTE.green};
    color: white;
    border: none;
    border-radius: 13px;
    padding: 12px 18px;
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 46px;
    transition: background 0.15s, transform 0.1s;
  }
  .btn-analyze:hover:not(:disabled) { background: ${PALETTE.greenMid}; }
  .btn-analyze:active:not(:disabled) { transform: scale(0.98); }
  .btn-analyze:disabled { background: #A0C4B0; cursor: not-allowed; }

  .examples-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
  .example-chip {
    background: ${PALETTE.greenLight};
    color: ${PALETTE.green};
    border: 1px solid #C3E6D0;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }
  .example-chip:active { transform: scale(0.98); }

  .result-card, .loading-card {
    background: white;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 12px 34px rgba(16,24,40,0.08);
    margin-bottom: 16px;
    animation: fadeUp 0.35s ease both;
  }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .result-header { background: ${PALETTE.green}; padding: 20px; color: white; }
  .result-header-top { display: flex; align-items: baseline; gap: 10px; margin-bottom: 6px; }
  .savings-amount { font-family: 'Fraunces', serif; font-size: 46px; font-weight: 700; line-height: 1; color: ${PALETTE.yellow}; }
  .savings-label { font-size: 14px; opacity: 0.9; font-weight: 700; }
  .result-subtitle { font-size: 13px; opacity: 0.76; }

  .verdict-bar {
    background: ${PALETTE.yellowLight};
    border-bottom: 1px solid #FAE9A0;
    padding: 13px 20px;
    font-size: 14px;
    font-weight: 800;
    color: #715700;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .result-body { padding: 18px 20px 20px; }

  .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px; }
  .store-card {
    border: 1.5px solid ${PALETTE.border};
    border-radius: 15px;
    padding: 13px 10px;
    text-align: center;
    position: relative;
    background: #fff;
  }
  .store-card.best { border-color: ${PALETTE.green}; background: ${PALETTE.greenLight}; }
  .store-badge {
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    background: ${PALETTE.green};
    color: white;
    font-size: 9px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .store-name { font-size: 12px; font-weight: 800; color: ${PALETTE.gray}; text-transform: uppercase; letter-spacing: 0.5px; margin: 5px 0; }
  .store-price { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: ${PALETTE.dark}; }
  .store-card.best .store-price { color: ${PALETTE.green}; }
  .store-diff { font-size: 11px; color: ${PALETTE.gray}; margin-top: 3px; }

  .ai-analysis {
    background: #F0F4FF;
    border: 1px solid #D1DAFF;
    border-radius: 15px;
    padding: 14px;
    margin-bottom: 18px;
    font-size: 14px;
    line-height: 1.6;
    color: #263483;
  }
  .ai-analysis-label { font-size: 11px; font-weight: 800; letter-spacing: 0.8px; color: #6D7BD0; margin-bottom: 6px; text-transform: uppercase; }

  .source-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: ${PALETTE.greenLight};
    color: ${PALETTE.green};
    border: 1px solid #C3E6D0;
    border-radius: 999px;
    padding: 6px 10px;
    margin-bottom: 14px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .2px;
  }

  .items-section { margin-bottom: 18px; }
  .items-title { font-size: 13px; font-weight: 800; color: ${PALETTE.gray}; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .item-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 8px;
    padding: 11px 0;
    border-bottom: 1px solid #F3F4F6;
    font-size: 14px;
  }
  .item-row:last-child { border-bottom: none; }
  .item-name { color: ${PALETTE.dark}; min-width: 0; overflow-wrap: anywhere; line-height: 1.35; }
  .item-swap { font-size: 12px; color: ${PALETTE.greenMid}; font-weight: 700; background: ${PALETTE.greenLight}; padding: 4px 8px; border-radius: 9px; max-width: 220px; text-align: left; line-height: 1.25; }
  .item-saving { font-size: 12px; font-weight: 800; color: ${PALETTE.green}; white-space: nowrap; }
  .item-ok { font-size: 12px; color: ${PALETTE.gray}; white-space: nowrap; }

  .tip-box { background: ${PALETTE.yellowLight}; border: 1px solid #F0D875; border-radius: 15px; padding: 12px 14px; font-size: 13px; color: #6B5000; line-height: 1.5; display: flex; gap: 8px; }
  .tip-icon { font-size: 16px; flex-shrink: 0; }

  .loading-card { padding: 34px 20px; text-align: center; }
  .loading-basket { font-size: 42px; margin-bottom: 12px; animation: bounce 0.7s ease-in-out infinite alternate; }
  @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-8px); } }
  .loading-text { font-size: 15px; color: ${PALETTE.gray}; font-weight: 800; }
  .loading-sub { font-size: 12px; color: #A7B0BA; margin-top: 5px; }
  .progress-bar { width: 190px; height: 4px; background: ${PALETTE.border}; border-radius: 999px; margin: 15px auto 0; overflow: hidden; }
  .progress-fill { height: 100%; background: ${PALETTE.green}; border-radius: 999px; animation: progress 1.4s ease-in-out infinite; width: 60%; }
  @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }

  .error-box { background: ${PALETTE.redLight}; border: 1px solid #F5BDB5; border-radius: 15px; padding: 14px; font-size: 14px; color: ${PALETTE.red}; margin-bottom: 16px; line-height: 1.5; }

  .footer { text-align: center; padding: 17px 16px 24px; font-size: 11px; color: #98A2B3; line-height: 1.5; }

  @media (max-width: 480px) {
    .main { padding: 14px; }
    .input-footer { align-items: stretch; flex-direction: column; }
    .btn-analyze { width: 100%; }
    .comparison-grid { grid-template-columns: 1fr; }
    .item-row { grid-template-columns: 1fr; gap: 6px; align-items: start; }
    .item-swap { max-width: 100%; text-align: left; justify-self: start; }
    .item-saving, .item-ok { justify-self: start; }
  }
`;

const EXAMPLES = [
  "lait, œufs, riz, pâtes, huile, poulet, pommes, yaourts, pain de mie, beurre",
  "couches Pampers T4, lessive Ariel, savon, dentifrice, shampooing",
  "steaks hachés, carottes, courgettes, tomates, fromage râpé, crème fraîche, farine"
];

function normalizeItems(input) {
  return input
    .split(/[\n,;]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function priceForItem(name) {
  const lower = name.toLowerCase();
  if (lower.includes("couche") || lower.includes("pampers")) return 18.9;
  if (lower.includes("lessive") || lower.includes("ariel")) return 8.8;
  if (lower.includes("poulet")) return 8.5;
  if (lower.includes("steak")) return 6.5;
  if (lower.includes("huile")) return 4.2;
  if (lower.includes("beurre")) return 2.7;
  if (lower.includes("fromage")) return 3.4;
  if (lower.includes("crème") || lower.includes("creme")) return 1.6;
  if (lower.includes("riz") || lower.includes("pâte") || lower.includes("pate")) return 1.75;
  if (lower.includes("lait")) return 1.25;
  if (lower.includes("œuf") || lower.includes("oeuf")) return 3.1;
  if (lower.includes("yaourt")) return 2.4;
  if (lower.includes("pain")) return 1.65;
  if (lower.includes("shampoo") || lower.includes("dentifrice") || lower.includes("savon")) return 2.8;
  if (lower.includes("pomme") || lower.includes("carotte") || lower.includes("courgette") || lower.includes("tomate")) return 2.6;
  return 2.9;
}

function swapForItem(name) {
  const lower = name.toLowerCase();
  if (lower.includes("pampers")) return { swap: "marque distributeur taille équivalente", saving: 420 };
  if (lower.includes("ariel")) return { swap: "lessive marque distributeur", saving: 260 };
  if (lower.includes("taureau") || lower.includes("riz")) return { swap: "riz marque distributeur 1 kg", saving: 80 };
  if (lower.includes("huile")) return { swap: "huile marque distributeur", saving: 70 };
  if (lower.includes("yaourt")) return { swap: "pack familial marque distributeur", saving: 90 };
  if (lower.includes("pain")) return { swap: "pain de mie marque distributeur", saving: 55 };
  if (lower.includes("fromage")) return { swap: "fromage râpé marque distributeur", saving: 75 };
  if (lower.includes("poulet")) return { swap: "format familial ou promotion rayon boucherie", saving: 120 };
  if (lower.includes("steak")) return { swap: "lot familial ou marque distributeur", saving: 110 };
  if (lower.includes("shampoo") || lower.includes("dentifrice") || lower.includes("savon")) return { swap: "marque distributeur hygiène", saving: 65 };
  return { swap: null, saving: 0 };
}

function fallbackAnalyze(input) {
  const items = normalizeItems(input);
  const baseTotal = items.reduce((sum, item) => sum + priceForItem(item), 0);
  const stores = [
    { name: "Leclerc", multiplier: 0.96 },
    { name: "Lidl", multiplier: 0.91 },
    { name: "Aldi", multiplier: 0.90 },
    { name: "Carrefour", multiplier: 1.05 },
    { name: "Intermarché", multiplier: 1.0 }
  ].map((store) => ({ name: store.name, price: Number((baseTotal * store.multiplier).toFixed(2)) }));

  const minPrice = Math.min(...stores.map((store) => store.price));
  const storesWithDiff = stores.map((store) => ({
    ...store,
    diff: Number((store.price - minPrice).toFixed(2))
  }));
  const bestStore = storesWithDiff.find((store) => store.price === minPrice)?.name || "Aldi";

  const analyzedItems = items.map((item) => ({ name: item, ...swapForItem(item) }));
  const savingsCents = analyzedItems.reduce((sum, item) => sum + (item.saving || 0), 0);
  const savings = Math.round(savingsCents / 100);
  const originalTotal = baseTotal;
  const optimizedTotal = Math.max(0, originalTotal - savingsCents / 100);

  return {
    savings,
    original_total: Number(originalTotal.toFixed(2)),
    optimized_total: Number(optimizedTotal.toFixed(2)),
    verdict: `${bestStore} semble le plus intéressant pour ce panier, selon une estimation indicative.`,
    best_store: bestStore,
    stores: storesWithDiff,
    items: analyzedItems,
    tip: "Compare surtout Aldi, Lidl et les marques distributeur : les plus grosses économies viennent souvent des couches, de la lessive, des viandes et des produits de marque.",
    analysis: "Cette analyse est une estimation indicative. Les prix réels peuvent varier selon la ville, le drive, le magasin et les promotions en cours."
  };
}

function completeStores(result, input) {
  const fallback = fallbackAnalyze(input);
  const provided = Array.isArray(result?.stores) ? result.stores : [];
  const byName = new Map(
    provided.map((store) => [String(store?.name || "").toLowerCase(), store])
  );

  const stores = STORES.map((name) => {
    const found = byName.get(name.toLowerCase());
    const fallbackStore = fallback.stores.find((store) => store.name === name);
    return {
      name,
      price: Number(found?.price ?? fallbackStore?.price ?? 0),
      diff: 0
    };
  });

  const minPrice = Math.min(...stores.map((store) => store.price));
  return stores.map((store) => ({
    ...store,
    diff: Number((store.price - minPrice).toFixed(2))
  }));
}

function normalizeClientResult(data, input) {
  const fallback = fallbackAnalyze(input);
  const stores = completeStores(data?.stores ? data : fallback, input);
  const bestStore = stores.find((store) => store.diff === 0)?.name || fallback.best_store;

  return {
    ...fallback,
    ...data,
    savings: Number.isFinite(Number(data?.savings)) ? Number(data.savings) : fallback.savings,
    original_total: Number.isFinite(Number(data?.original_total)) ? Number(data.original_total) : fallback.original_total,
    optimized_total: Number.isFinite(Number(data?.optimized_total)) ? Number(data.optimized_total) : fallback.optimized_total,
    best_store: bestStore,
    stores,
    items: Array.isArray(data?.items) && data.items.length ? data.items : fallback.items,
    verdict: data?.verdict || `${bestStore} semble le plus intéressant pour ce panier, selon une estimation indicative.`,
    tip: data?.tip || fallback.tip,
    analysis: data?.analysis || fallback.analysis,
    source: data?.source || "local"
  };
}

function formatMoney(value) {
  const number = Number(value || 0);
  return `${number.toFixed(2)}€`;
}

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  const itemCount = useMemo(() => normalizeItems(input).length, [input]);
  const sortedStores = useMemo(() => {
    if (!result?.stores) return [];
    return [...result.stores].sort((a, b) => Number(a.price) - Number(b.price));
  }, [result]);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  async function analyze() {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });

      if (!response.ok) throw new Error("API indisponible");
      const data = await response.json();
      const normalized = normalizeClientResult(data, input);
      setResult(normalized);
      if (normalized?.source === "local") {
        setError("Mode estimation locale : ajoute la clé API Groq dans Vercel pour activer l’analyse IA.");
      }
    } catch {
      setResult(normalizeClientResult(fallbackAnalyze(input), input));
      setError("Mode estimation locale activé : l'app fonctionne, mais la clé IA serveur n'est pas encore configurée.");
    } finally {
      setLoading(false);
    }
  }

  function useExample(example) {
    setInput(example);
    setResult(null);
    setError(null);
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <header className="header">
          <div className="brand-mark">🛒</div>
          <div>
            <div className="header-title">PaniQ</div>
            <div className="header-sub">Compare ton panier, économise simplement</div>
          </div>
          <span className="header-badge">Courses IA</span>
        </header>

        <main className="main">
          <section className="hero">
            <div className="hero-kicker">⚡ Estimation rapide</div>
            <h1>Repère les économies possibles.</h1>
            <p>
              Entre ta liste de courses. PaniQ estime ton panier, compare plusieurs enseignes et propose des substitutions simples.
            </p>
            <div className="disclaimer">
              Les résultats sont indicatifs : les prix peuvent varier selon le magasin, le drive, la ville et les promotions.
            </div>
          </section>

          <div className="section-label">Ta liste de courses</div>
          <div className="input-area">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ex : lait, œufs, riz, pâtes, poulet, couches Pampers T4, lessive Ariel, pommes, yaourts, beurre..."
            />
            <div className="input-footer">
              <span className="char-hint">
                {itemCount} article{itemCount !== 1 ? "s" : ""}
              </span>
              <button className="btn-analyze" onClick={analyze} disabled={loading || !input.trim()}>
                {loading ? "⏳ Analyse..." : "✨ Optimiser mon panier"}
              </button>
            </div>
          </div>

          <div className="section-label">Exemples rapides</div>
          <div className="examples-row">
            {EXAMPLES.map((example, index) => (
              <button key={example} className="example-chip" onClick={() => useExample(example)}>
                {index === 0 ? "🥛 Panier semaine" : index === 1 ? "🧴 Hygiène & bébé" : "🥩 Panier cuisiné"}
              </button>
            ))}
          </div>

          {loading && (
            <div className="loading-card">
              <div className="loading-basket">🛒</div>
              <div className="loading-text">Comparaison en cours...</div>
              <div className="loading-sub">Leclerc · Lidl · Aldi · Carrefour · Intermarché</div>
              <div className="progress-bar"><div className="progress-fill" /></div>
            </div>
          )}

          {error && <div className="error-box">⚠️ {error}</div>}

          {result && (
            <div ref={resultRef} className="result-card">
              <div className="result-header">
                <div className="result-header-top">
                  <span className="savings-amount">-{Number(result.savings || 0)}€</span>
                  <span className="savings-label">d'économies possibles</span>
                </div>
                <div className="result-subtitle">
                  {formatMoney(result.original_total)} → {formatMoney(result.optimized_total)} avec les substitutions
                </div>
              </div>

              <div className="verdict-bar">
                <span>🏆</span>
                <span>{result.verdict}</span>
              </div>

              <div className="result-body">
                <div className="source-chip">{result.source === "groq" ? "🤖 Analyse Groq serveur" : result.source === "ia" ? "🤖 Analyse IA serveur" : "⚡ Estimation locale"}</div>
                <div className="section-label">Prix par enseigne</div>
                <div className="comparison-grid">
                  {sortedStores.map((store, index) => (
                    <div key={store.name} className={`store-card${index === 0 ? " best" : ""}`}>
                      {index === 0 && <span className="store-badge">Le moins cher</span>}
                      <div className="store-name">{store.name}</div>
                      <div className="store-price">{formatMoney(store.price)}</div>
                      {Number(store.diff) > 0 && <div className="store-diff">+{formatMoney(store.diff)} de plus</div>}
                    </div>
                  ))}
                </div>

                {result.analysis && (
                  <div className="ai-analysis">
                    <div className="ai-analysis-label">🤖 Analyse</div>
                    {result.analysis}
                  </div>
                )}

                <div className="items-section">
                  <div className="items-title"><span>📦</span> Produit par produit</div>
                  {result.items?.map((item, index) => (
                    <div className="item-row" key={`${item.name}-${index}`}>
                      <span className="item-name">{item.name}</span>
                      {item.swap ? (
                        <>
                          <span className="item-swap">→ {item.swap}</span>
                          {Number(item.saving) > 0 && <span className="item-saving">-{formatMoney(Number(item.saving) / 100)}</span>}
                        </>
                      ) : (
                        <span className="item-ok">✓ Prix OK</span>
                      )}
                    </div>
                  ))}
                </div>

                {result.tip && (
                  <div className="tip-box">
                    <span className="tip-icon">💡</span>
                    <span>{result.tip}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          PaniQ · Estimations indicatives · Les prix peuvent varier selon magasin, drive et promotions.
        </footer>
      </div>
    </>
  );
}
