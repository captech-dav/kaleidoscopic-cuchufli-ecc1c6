import { useState, useEffect } from "react";

const NAV_LINKS = ["Personal Banking", "Business", "Investment"];

const FEATURES = [
  {
    icon: "🏦",
    title: "Savings & Deposits",
    desc: "High-yield savings accounts with competitive APYs. FDIC-insured up to $250,000. Flexible term deposits from 30 days to 5 years.",
    tag: "Up to 5.2% APY",
  },
  {
    icon: "₿",
    title: "Digital Asset Trading",
    desc: "Seamlessly convert crypto-to-fiat and back. Real-time rates, zero hidden fees, and institutional-grade liquidity across 80+ digital assets.",
    tag: "80+ Assets",
  },
  {
    icon: "💳",
    title: "Personal & Business Loans",
    desc: "Competitive rates starting at 6.9% APR. Quick approvals in as little as 24 hours for personal loans, with tailored business financing solutions.",
    tag: "From 6.9% APR",
  },
  {
    icon: "🔒",
    title: "24/7 Secure Online Banking",
    desc: "Full-featured digital banking at your fingertips. Real-time alerts, instant transfers, bill pay, and round-the-clock fraud monitoring.",
    tag: "Always Online",
  },
];

const TRANSACTIONS = [
  { id: 1, name: "Apple Inc. Dividend", type: "credit", amount: "+$1,240.00", date: "May 18", icon: "📈" },
  { id: 2, name: "International Wire Transfer", type: "debit", amount: "-$3,500.00", date: "May 17", icon: "🌍" },
  { id: 3, name: "Crypto → USD Conversion", type: "credit", amount: "+$8,921.50", date: "May 16", icon: "🔄" },
  { id: 4, name: "Monthly Savings Deposit", type: "debit", amount: "-$2,000.00", date: "May 15", icon: "💰" },
  { id: 5, name: "Treasury Bond Interest", type: "credit", amount: "+$380.75", date: "May 14", icon: "📊" },
];

const CURRENCIES = ["USD", "EUR", "GBP", "BTC", "ETH", "USDT", "JPY", "CHF"];

const RATES = {
  USD: 1, EUR: 0.921, GBP: 0.789, BTC: 0.0000158, ETH: 0.000286,
  USDT: 1.0002, JPY: 153.4, CHF: 0.902,
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [amount, setAmount] = useState("1000");
  const [converted, setConverted] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const val = parseFloat(amount) || 0;
    const rate = (RATES[toCur] / RATES[fromCur]);
    setConverted((val * rate).toLocaleString("en-US", { maximumFractionDigits: 6 }));
  }, [amount, fromCur, toCur]);

  function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    if (!email.includes("@")) { setLoginError("Please enter a valid email address."); return; }
    if (loginStep === 1) { setLoginStep(2); return; }
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setLoginError("Demo mode: Login disabled. Explore the interface freely.");
    }, 1400);
  }

  function swap() {
    setFromCur(toCur);
    setToCur(fromCur);
  }

  const modalBg = loginOpen ? {
    position: "fixed", inset: 0, zIndex: 1000,
    background: "rgba(3,14,40,0.72)", display: "flex",
    alignItems: "center", justifyContent: "center", padding: "1rem",
  } : null;

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: "#030e28", color: "#f0f4ff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Outfit:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #030e28;
          --navy-mid: #071838;
          --navy-light: #0d2552;
          --gold: #c8a84b;
          --gold-light: #e5c97a;
          --gold-pale: rgba(200,168,75,0.13);
          --white: #f0f4ff;
          --muted: #8ea3c3;
          --border: rgba(200,168,75,0.18);
          --card-bg: rgba(13,37,82,0.55);
        }
        body { background: #030e28; }
        .sans { font-family: 'Outfit', sans-serif; }
        .gold { color: var(--gold); }
        .gold-light { color: var(--gold-light); }
        .muted { color: var(--muted); }

        /* Nav */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.3s ease; }
        .nav.scrolled { background: rgba(3,14,40,0.97); border-bottom: 1px solid var(--border); backdrop-filter: blur(12px); }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 72px; }
        .logo { font-size: 1.35rem; font-weight: 700; letter-spacing: 0.01em; cursor: pointer; }
        .logo span { color: var(--gold); }
        .nav-links { display: flex; gap: 2rem; list-style: none; font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 400; letter-spacing: 0.04em; }
        .nav-links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover { color: var(--white); }
        .btn-login { font-family: 'Outfit', sans-serif; background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 0.5rem 1.4rem; font-size: 0.8rem; letter-spacing: 0.08em; cursor: pointer; transition: all 0.25s; font-weight: 500; }
        .btn-login:hover { background: var(--gold); color: var(--navy); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
        .hamburger span { width: 22px; height: 1.5px; background: var(--muted); display: block; transition: all 0.3s; }

        /* Hero */
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; padding: 7rem 2rem 4rem; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(13,37,82,0.9) 0%, rgba(3,14,40,1) 70%); }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(200,168,75,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,0.04) 1px, transparent 1px); background-size: 60px 60px; }
        .hero-orb { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%); left: 50%; top: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .hero-content { position: relative; max-width: 820px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--border); padding: 0.4rem 1.1rem; font-family: 'Outfit', sans-serif; font-size: 0.72rem; letter-spacing: 0.12em; color: var(--gold); margin-bottom: 2.5rem; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .hero h1 { font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 300; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1.5rem; }
        .hero h1 em { font-style: italic; color: var(--gold-light); }
        .hero-sub { font-family: 'Outfit', sans-serif; font-size: 1.05rem; color: var(--muted); max-width: 560px; margin: 0 auto 3rem; line-height: 1.7; font-weight: 300; }
        .hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-primary { font-family: 'Outfit', sans-serif; background: var(--gold); color: var(--navy); border: none; padding: 0.85rem 2.4rem; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.06em; cursor: pointer; transition: all 0.25s; }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
        .btn-ghost { font-family: 'Outfit', sans-serif; background: transparent; color: var(--white); border: 1px solid rgba(240,244,255,0.2); padding: 0.85rem 2.4rem; font-size: 0.85rem; font-weight: 400; letter-spacing: 0.04em; cursor: pointer; transition: all 0.25s; }
        .btn-ghost:hover { border-color: rgba(240,244,255,0.5); }
        .hero-stats { display: flex; gap: 3rem; justify-content: center; margin-top: 5rem; flex-wrap: wrap; }
        .stat { text-align: center; }
        .stat-num { font-size: 2rem; font-weight: 600; color: var(--gold-light); display: block; }
        .stat-label { font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--muted); letter-spacing: 0.06em; margin-top: 2px; }
        .stat-divider { width: 1px; background: var(--border); align-self: stretch; }

        /* Section */
        .section { padding: 6rem 2rem; max-width: 1200px; margin: 0 auto; }
        .section-label { font-family: 'Outfit', sans-serif; font-size: 0.72rem; letter-spacing: 0.18em; color: var(--gold); text-transform: uppercase; margin-bottom: 1rem; }
        .section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; line-height: 1.15; }
        .section-title em { font-style: italic; color: var(--gold-light); }
        .divider { width: 60px; height: 1px; background: var(--gold); margin: 2rem 0; }

        /* Feature Grid */
        .features-wrap { padding: 6rem 2rem; background: linear-gradient(180deg, #030e28 0%, #071838 50%, #030e28 100%); }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5px; max-width: 1200px; margin: 4rem auto 0; }
        .feature-card { background: var(--card-bg); border: 1px solid var(--border); padding: 2.5rem 2rem; transition: all 0.3s; position: relative; overflow: hidden; }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); opacity: 0; transition: opacity 0.3s; }
        .feature-card:hover { background: rgba(13,37,82,0.8); transform: translateY(-3px); }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon { font-size: 2rem; margin-bottom: 1.5rem; display: block; }
        .feature-tag { font-family: 'Outfit', sans-serif; font-size: 0.65rem; letter-spacing: 0.1em; color: var(--gold); border: 1px solid var(--border); padding: 0.25rem 0.6rem; display: inline-block; margin-bottom: 1rem; }
        .feature-card h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 0.75rem; }
        .feature-card p { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: var(--muted); line-height: 1.7; font-weight: 300; }

        /* Dashboard */
        .dashboard-wrap { padding: 6rem 2rem; }
        .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
        .db-card { background: var(--card-bg); border: 1px solid var(--border); padding: 2rem; }
        .db-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .db-label { font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
        .db-balance { font-size: 2.4rem; font-weight: 300; letter-spacing: -0.02em; color: var(--white); margin: 0.25rem 0; }
        .db-change { font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: #4ade80; }
        .db-acct { font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--muted); font-weight: 300; }
        .tx-list { list-style: none; }
        .tx-item { display: flex; align-items: center; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid rgba(200,168,75,0.07); }
        .tx-item:last-child { border-bottom: none; }
        .tx-icon { width: 36px; height: 36px; border-radius: 50%; background: rgba(200,168,75,0.08); display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
        .tx-info { flex: 1; }
        .tx-name { font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 400; color: var(--white); }
        .tx-date { font-family: 'Outfit', sans-serif; font-size: 0.7rem; color: var(--muted); margin-top: 2px; }
        .tx-amt { font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 500; }
        .tx-credit { color: #4ade80; }
        .tx-debit { color: #f87171; }

        /* Converter */
        .converter-card { grid-column: 2; grid-row: 1 / 3; background: var(--card-bg); border: 1px solid var(--border); padding: 2rem; display: flex; flex-direction: column; }
        .conv-row { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
        .conv-input { flex: 1; background: rgba(3,14,40,0.6); border: 1px solid var(--border); color: var(--white); padding: 0.75rem 1rem; font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 300; outline: none; }
        .conv-input:focus { border-color: var(--gold); }
        .conv-select { background: rgba(3,14,40,0.8); border: 1px solid var(--border); color: var(--gold); padding: 0.75rem 0.75rem; font-family: 'Outfit', sans-serif; font-size: 0.8rem; cursor: pointer; outline: none; min-width: 80px; }
        .conv-swap { width: 100%; background: transparent; border: 1px dashed var(--border); color: var(--gold); padding: 0.5rem; font-family: 'Outfit', sans-serif; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; letter-spacing: 0.06em; margin-bottom: 1rem; }
        .conv-swap:hover { background: var(--gold-pale); }
        .conv-result { background: rgba(200,168,75,0.06); border: 1px solid var(--border); padding: 1.25rem; flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .conv-result-label { font-family: 'Outfit', sans-serif; font-size: 0.7rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .conv-result-num { font-size: 2rem; font-weight: 300; color: var(--gold-light); word-break: break-all; }
        .conv-result-cur { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: var(--muted); margin-top: 0.25rem; }
        .conv-rate { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: var(--muted); margin-top: 1rem; text-align: center; }
        .btn-convert { font-family: 'Outfit', sans-serif; background: var(--gold); color: var(--navy); border: none; padding: 0.85rem; font-size: 0.8rem; font-weight: 600; cursor: pointer; letter-spacing: 0.06em; transition: all 0.2s; margin-top: 1rem; width: 100%; }
        .btn-convert:hover { background: var(--gold-light); }

        /* Trust */
        .trust-wrap { padding: 6rem 2rem; background: linear-gradient(180deg, #030e28 0%, #071838 100%); }
        .trust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 1200px; margin: 3rem auto 0; }
        .trust-card { }
        .trust-item { display: flex; gap: 1.25rem; align-items: flex-start; margin-bottom: 2rem; }
        .trust-icon-wrap { width: 44px; height: 44px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.2rem; }
        .trust-item h4 { font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 500; color: var(--white); margin-bottom: 0.25rem; }
        .trust-item p { font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--muted); line-height: 1.6; font-weight: 300; }

        /* Footer */
        footer { border-top: 1px solid var(--border); padding: 3rem 2rem; background: #020b1e; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
        .footer-logo { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem; }
        .footer-logo span { color: var(--gold); }
        .footer-desc { font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--muted); line-height: 1.7; font-weight: 300; }
        .footer-col h5 { font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .footer-col ul { list-style: none; }
        .footer-col li { font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--muted); padding: 0.3rem 0; cursor: pointer; transition: color 0.2s; }
        .footer-col li:hover { color: var(--white); }
        .footer-bottom { max-width: 1200px; margin: 2rem auto 0; padding-top: 1.5rem; border-top: 1px solid rgba(200,168,75,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: var(--muted); }

        /* Modal */
        .modal { background: #071838; border: 1px solid var(--border); padding: 2.5rem; width: 100%; max-width: 420px; position: relative; }
        .modal h2 { font-size: 1.8rem; font-weight: 300; margin-bottom: 0.5rem; }
        .modal-sub { font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: var(--muted); margin-bottom: 2rem; }
        .field { margin-bottom: 1.25rem; }
        .field label { font-family: 'Outfit', sans-serif; font-size: 0.72rem; letter-spacing: 0.1em; color: var(--muted); display: block; margin-bottom: 0.5rem; text-transform: uppercase; }
        .field input { width: 100%; background: rgba(3,14,40,0.7); border: 1px solid var(--border); color: var(--white); padding: 0.8rem 1rem; font-family: 'Outfit', sans-serif; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
        .field input:focus { border-color: var(--gold); }
        .pw-wrap { position: relative; }
        .pw-toggle { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.75rem; font-family: 'Outfit', sans-serif; }
        .modal-err { font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: #f87171; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2); padding: 0.6rem 0.9rem; margin-bottom: 1rem; }
        .btn-submit { width: 100%; background: var(--gold); color: var(--navy); border: none; padding: 0.9rem; font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; letter-spacing: 0.06em; transition: all 0.2s; margin-top: 0.5rem; }
        .btn-submit:hover:not(:disabled) { background: var(--gold-light); }
        .btn-submit:disabled { opacity: 0.6; cursor: wait; }
        .modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--muted); cursor: pointer; font-size: 1.5rem; line-height: 1; }
        .modal-close:hover { color: var(--white); }
        .modal-footer { font-family: 'Outfit', sans-serif; font-size: 0.75rem; color: var(--muted); text-align: center; margin-top: 1.25rem; }
        .modal-footer a { color: var(--gold); cursor: pointer; text-decoration: none; }
        .step-dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 2rem; }
        .step-dot { width: 28px; height: 2px; background: var(--border); transition: background 0.3s; }
        .step-dot.active { background: var(--gold); }
        .cert-badges { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; }
        .cert-badge { font-family: 'Outfit', sans-serif; font-size: 0.65rem; letter-spacing: 0.08em; border: 1px solid var(--border); padding: 0.35rem 0.75rem; color: var(--muted); }

        /* Mobile menu */
        .mobile-menu { display: none; position: fixed; top: 72px; left: 0; right: 0; background: rgba(3,14,40,0.98); border-bottom: 1px solid var(--border); padding: 1.5rem 2rem; z-index: 99; flex-direction: column; gap: 1.25rem; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-family: 'Outfit', sans-serif; color: var(--muted); text-decoration: none; font-size: 1rem; }

        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .converter-card { grid-column: 1; grid-row: auto; }
          .trust-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr; }
          .footer-inner { grid-template-columns: 1fr; }
          .hero-stats { gap: 1.5rem; }
          .stat-divider { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="logo">City <span>Investment</span> CU</div>
          <ul className="nav-links">
            {NAV_LINKS.map(l => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
          <button className="btn-login" onClick={() => setLoginOpen(true)}>Login / Sign Up</button>
          <div className="hamburger" onClick={() => setMenuOpen(m => !m)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(l => <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>)}
        <button className="btn-login" style={{ alignSelf: "flex-start" }} onClick={() => { setMenuOpen(false); setLoginOpen(true); }}>Login / Sign Up</button>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-content">
          <div className="hero-badge">FDIC Insured · Est. 1987 · 200K+ Members</div>
          <h1>Your Gateway to<br /><em>Secure Global</em><br />Investments</h1>
          <p className="hero-sub sans">
            Professional digital asset management and banking services — from high-yield savings to institutional-grade crypto trading, all under one trusted roof.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => setLoginOpen(true)}>Get Started</button>
            <button className="btn-ghost">Watch Overview</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">$4.2B</span>
              <span className="stat-label sans">Assets Under Management</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">200K+</span>
              <span className="stat-label sans">Active Members</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">36yr</span>
              <span className="stat-label sans">Years of Trust</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">5.2%</span>
              <span className="stat-label sans">Top Savings APY</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div className="features-wrap">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label">Our Services</div>
          <h2 className="section-title">Banking built for<br /><em>every ambition</em></h2>
          <div className="divider" />
        </div>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <span className="feature-tag sans">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="dashboard-wrap" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Account Dashboard</div>
        <h2 className="section-title">Your finances,<br /><em>at a glance</em></h2>
        <div className="divider" />
        <div className="dashboard-grid">
          {/* Balance */}
          <div className="db-card">
            <div className="db-card-header">
              <div>
                <div className="db-label sans">Total Portfolio Value</div>
                <div className="db-balance">$248,391.50</div>
                <div className="db-change sans">↑ +2.4% this month · +$5,820.40</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="db-label sans">Account</div>
                <div className="db-acct sans">**** **** 4821</div>
                <div style={{ marginTop: 8, width: 36, height: 22, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontFamily: "Outfit,sans-serif", fontWeight: 700, color: "var(--navy)", letterSpacing: "0.04em", marginLeft: "auto" }}>VISA</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
              {[["$82,100", "Savings"], ["$121,450", "Investments"], ["$44,841", "Digital Assets"]].map(([v, l]) => (
                <div key={l} style={{ background: "rgba(200,168,75,0.05)", padding: "0.75rem", borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "Outfit,sans-serif", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.06em" }}>{l}</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 300, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div className="db-card" style={{ gridRow: "2" }}>
            <div className="db-label sans" style={{ marginBottom: "1rem" }}>Recent Transactions</div>
            <ul className="tx-list">
              {TRANSACTIONS.map(tx => (
                <li className="tx-item" key={tx.id}>
                  <div className="tx-icon">{tx.icon}</div>
                  <div className="tx-info">
                    <div className="tx-name">{tx.name}</div>
                    <div className="tx-date sans">{tx.date}, 2025</div>
                  </div>
                  <div className={`tx-amt sans ${tx.type === "credit" ? "tx-credit" : "tx-debit"}`}>{tx.amount}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Currency Converter */}
          <div className="converter-card">
            <div className="db-label sans" style={{ marginBottom: "1.5rem" }}>Currency Converter</div>
            <div className="conv-row">
              <input
                className="conv-input"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <select className="conv-select" value={fromCur} onChange={e => setFromCur(e.target.value)}>
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button className="conv-swap" onClick={swap}>⇅ Swap Currencies</button>
            <div className="conv-row">
              <div className="conv-input" style={{ display: "flex", alignItems: "center", color: "var(--muted)", fontSize: "0.85rem" }}>Converted amount</div>
              <select className="conv-select" value={toCur} onChange={e => setToCur(e.target.value)}>
                {CURRENCIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="conv-result">
              <div className="conv-result-label">Result</div>
              <div className="conv-result-num">{converted || "—"}</div>
              <div className="conv-result-cur sans">{toCur}</div>
            </div>
            <div className="conv-rate sans">
              1 {fromCur} = {(RATES[toCur] / RATES[fromCur]).toLocaleString("en-US", { maximumFractionDigits: 6 })} {toCur} · Live rate
            </div>
            <button className="btn-convert">Confirm Conversion</button>
            <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(200,168,75,0.04)", border: "1px solid var(--border)" }}>
              <div className="conv-rate sans" style={{ textAlign: "left", color: "var(--gold)", fontWeight: 500 }}>⚡ Zero conversion fees for Premium members</div>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST */}
      <div className="trust-wrap">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label">Security & Compliance</div>
          <h2 className="section-title">Your security is our<br /><em>first principle</em></h2>
          <div className="divider" />
          <div className="trust-grid">
            <div className="trust-card">
              {[
                { icon: "🔐", title: "256-bit AES Encryption", desc: "Military-grade encryption protects every transaction and stored credential. Your data is fully encrypted at rest and in transit." },
                { icon: "📱", title: "Multi-Factor Authentication", desc: "Layered identity verification with biometric support, hardware keys, and one-time passcodes ensures only you access your account." },
                { icon: "🛡️", title: "Real-Time Fraud Monitoring", desc: "AI-powered systems scan millions of signals per second to detect and block suspicious activity before it affects your account." },
                { icon: "🏛️", title: "FDIC Insured · NCUA Member", desc: "All deposits insured up to $250,000 per account category. Regulated and audited by federal financial authorities." },
              ].map(item => (
                <div className="trust-item" key={item.title}>
                  <div className="trust-icon-wrap">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="db-card" style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 400, marginBottom: "1.25rem" }}>Contact Us</h3>
                {[
                  ["📞", "Member Services", "1-800-CITY-INV", "Mon–Fri, 8am–8pm ET"],
                  ["✉️", "Secure Messaging", "support@cityinvestcu.com", "Response within 4 hours"],
                  ["📍", "Headquarters", "350 Park Avenue, New York, NY", "Walk-in by appointment"],
                  ["💬", "Live Chat", "Available 24/7 in app", "Average wait: < 2 min"],
                ].map(([icon, label, val, sub]) => (
                  <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", paddingBottom: "1rem", borderBottom: "1px solid rgba(200,168,75,0.07)", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                    <div>
                      <div className="sans" style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</div>
                      <div className="sans" style={{ fontSize: "0.85rem", color: "var(--gold-light)", margin: "2px 0" }}>{val}</div>
                      <div className="sans" style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cert-badges">
                {["FDIC Member", "NCUA Insured", "SOC 2 Type II", "ISO 27001", "PCI DSS Level 1"].map(b => (
                  <div className="cert-badge" key={b}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">City <span>Investment</span> Credit Union</div>
            <p className="footer-desc">A federally insured credit union serving members since 1987. Committed to delivering superior financial services with integrity, transparency, and innovation.</p>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
              {["𝕏", "in", "f", "📧"].map(s => (
                <div key={s} style={{ width: 32, height: 32, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.8rem", color: "var(--muted)", transition: "all 0.2s" }}>{s}</div>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Personal</h5>
            <ul>{["Checking", "Savings", "Mortgages", "Auto Loans", "Credit Cards"].map(l => <li key={l}>{l}</li>)}</ul>
          </div>
          <div className="footer-col">
            <h5>Business</h5>
            <ul>{["Business Checking", "Commercial Loans", "Merchant Services", "Payroll", "Treasury"].map(l => <li key={l}>{l}</li>)}</ul>
          </div>
          <div className="footer-col">
            <h5>Investments</h5>
            <ul>{["Brokerage", "Retirement IRA", "Digital Assets", "Forex Trading", "Wealth Mgmt"].map(l => <li key={l}>{l}</li>)}</ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 City Investment Credit Union. All rights reserved.</span>
          <span style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
            <span style={{ cursor: "pointer" }}>Disclosures</span>
          </span>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div style={modalBg} onClick={e => { if (e.target === e.currentTarget) { setLoginOpen(false); setLoginStep(1); setLoginError(""); } }}>
          <div className="modal">
            <button className="modal-close" onClick={() => { setLoginOpen(false); setLoginStep(1); setLoginError(""); }}>×</button>
            <div className="step-dots">
              <div className={`step-dot${loginStep >= 1 ? " active" : ""}`} />
              <div className={`step-dot${loginStep >= 2 ? " active" : ""}`} />
            </div>
            <h2>{loginStep === 1 ? "Welcome Back" : "Enter Password"}</h2>
            <p className="modal-sub sans">{loginStep === 1 ? "Sign in to your City Investment account." : `Signing in as ${email}`}</p>
            {loginError && <div className="modal-err">{loginError}</div>}
            <form onSubmit={handleLogin}>
              {loginStep === 1 && (
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
                </div>
              )}
              {loginStep === 2 && (
                <div className="field">
                  <label>Password</label>
                  <div className="pw-wrap">
                    <input type={showPw ? "text" : "password"} placeholder="••••••••••" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
                    <button type="button" className="pw-toggle" onClick={() => setShowPw(p => !p)}>{showPw ? "Hide" : "Show"}</button>
                  </div>
                </div>
              )}
              <button className="btn-submit" type="submit" disabled={loginLoading}>
                {loginLoading ? "Verifying…" : loginStep === 1 ? "Continue →" : "Sign In Securely"}
              </button>
            </form>
            {loginStep === 2 && (
              <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
                <span className="sans" style={{ fontSize: "0.75rem", color: "var(--gold)", cursor: "pointer" }}>Forgot password?</span>
              </div>
            )}
            <div className="modal-footer">
              New member? <a href="#" onClick={e => { e.preventDefault(); }}>Open an account</a>
            </div>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <div style={{ height: 1, flex: 1, background: "var(--border)" }} />
              <span className="sans" style={{ fontSize: "0.68rem", color: "var(--muted)" }}>Protected by 256-bit SSL</span>
              <div style={{ height: 1, flex: 1, background: "var(--border)" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
