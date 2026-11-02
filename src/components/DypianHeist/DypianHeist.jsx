import { useEffect, useRef, useState } from "react";
import "./_dypianheist.scss";

const TIERS = [
  { id: "street", tier: "Street Haul", color: "#3de0ff", interior: "#0f4a66", glow: "rgba(61,224,255,.35)", odds: "60%", w: 60, desc: "2,500 Points", points: 2500, stars: 0, wod: 0 },
  { id: "crew", tier: "Crew Cut", color: "#b896ff", interior: "#3a1f80", glow: "rgba(169,123,255,.4)", odds: "28%", w: 28, desc: "10,000 Points + 5 Stars", points: 10000, stars: 5, wod: 0 },
  { id: "vault", tier: "Vault Score", color: "#ff6fb5", interior: "#6a1048", glow: "rgba(255,79,163,.45)", odds: "10%", w: 10, desc: "25,000 Points + 50 Stars", points: 25000, stars: 50, wod: 0 },
  { id: "kingpin", tier: "Kingpin Jackpot", color: "#f5c542", interior: "#6a4a05", glow: "rgba(245,197,66,.5)", odds: "2%", w: 2, desc: "$100", points: 0, stars: 0, wod: 100 },
];
const BUNDLES = [
  { n: 1, label: "1 Crack", price: "1 WOD" },
  { n: 5, label: "5 Cracks", price: "5 WOD" },
  { n: 10, label: "10 Cracks", price: "10 WOD" },
];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const FREE_CRACKS = 1;
const DAILY_CAP = 10;

const fmt = (n) => Number(n).toLocaleString("en-US");

const pickTier = () => {
  let r = Math.random() * 100;
  for (const t of TIERS) {
    if (r < t.w) return t;
    r -= t.w;
  }
  return TIERS[0];
};

const untilUtcMidnight = () => {
  const now = new Date();
  const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  const s = Math.max(0, Math.floor((next - now.getTime()) / 1000));
  return [s / 3600, (s % 3600) / 60, s % 60]
    .map((v) => String(Math.floor(v)).padStart(2, "0"))
    .join(":");
};

const bolts = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return { left: 170 + Math.cos(a) * 151 - 8, top: 170 + Math.sin(a) * 151 - 8 };
});

const ticks = Array.from({ length: 36 }, (_, j) => {
  const long = j % 3 === 0;
  return {
    top: long ? 3 : 5,
    height: long ? 12 : 7,
    background: j === 0 ? "#ff3d9a" : "rgba(30,24,70,.75)",
    transformOrigin: `1px ${long ? 87 : 85}px`,
    transform: `rotate(${j * 10}deg)`,
  };
});

const PointsIcon = () => (
  <img className="dh-logo" src="https://cdn.worldofdypians.com/wod/ai-points-reward-active.webp" alt="" />
);
const StarsIcon = () => (
  <img className="dh-logo" src="https://cdn.worldofdypians.com/wod/ai-star-reward-active.webp" alt="" />
);
const CashIcon = () => (
  <img className="dh-logo" src="https://cdn.worldofdypians.com/wod/ai-reward-active.webp" alt="" />
);

const Stat = ({ icon, value, label }) => (
  <div className="d-flex align-items-center gap-3">
    {icon}
    <div className="d-flex flex-column align-items-start">
      <span className="dh-russo dh-stat-value">{value}</span>
      <span className="dh-muted">{label}</span>
    </div>
  </div>
);

// ponytail: all state is local to the popup — rolls, cracks, bundles and the
// streak reset on reload and nothing is credited. Wire to backend + WOD payment before launch.
const DypianHeist = ({ onClose }) => {
  const [phase, setPhase] = useState("idle"); // idle | spinning | open
  const [dialAngle, setDialAngle] = useState(0);
  const [used, setUsed] = useState(0);
  const [bought, setBought] = useState(0);
  const [take, setTake] = useState({ points: 0, stars: 0, wod: 0 });
  const [reward, setReward] = useState(null);
  const [history, setHistory] = useState([]);
  const [nudge, setNudge] = useState(false);
  const [countdown, setCountdown] = useState(untilUtcMidnight());
  const timers = useRef([]);

  useEffect(() => {
    const id = setInterval(() => setCountdown(untilUtcMidnight()), 1000);
    return () => {
      clearInterval(id);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const left = Math.max(0, Math.min(FREE_CRACKS + bought - used, FREE_CRACKS + DAILY_CAP - used));
  const freeLeft = Math.max(0, FREE_CRACKS - used);
  const capped = used >= FREE_CRACKS + DAILY_CAP;
  const isOpen = phase === "open";

  const crack = () => {
    if (left <= 0) return setNudge(true);
    setPhase("spinning");
    setDialAngle((a) => a + 1080 + Math.floor(Math.random() * 360));
    setUsed((u) => u + 1);
    setNudge(false);
    timers.current.push(
      setTimeout(() => {
        const t = pickTier();
        setReward(t);
        setHistory((h) => [t, ...h].slice(0, 4));
        setTake((s) => ({ points: s.points + t.points, stars: s.stars + t.stars, wod: s.wod + t.wod }));
        setPhase("open");
      }, 1550)
    );
  };

  const onMain = () => {
    if (phase === "spinning") return;
    if (!isOpen) return crack();
    setPhase("idle");
    if (left > 0) timers.current.push(setTimeout(crack, 700));
  };

  let btnLabel = "CRACK THE VAULT";
  let btnHint =
    freeLeft > 0
      ? "Free daily crack ready"
      : left > 0
      ? `${left} paid ${left === 1 ? "crack" : "cracks"} left`
      : "Out of cracks. Grab a bundle below.";
  if (capped && phase === "idle") {
    btnLabel = `UNLOCKS IN ${countdown}`;
    btnHint = "Daily limit reached. Your free crack and bundles unlock at reset.";
  }
  if (phase === "spinning") {
    btnLabel = "CRACKING...";
    btnHint = "Dial is turning";
  }
  if (isOpen) {
    btnLabel = left > 0 ? "CRACK AGAIN" : "LOCK IT UP";
    btnHint = "Added to your account";
  }
  const btnMuted = phase === "spinning" || (capped && phase === "idle");

  const todayIdx = (new Date().getDay() + 6) % 7;
  const rewardRows = reward
    ? reward.wod
      ? [{ icon: <CashIcon />, value: `$${fmt(reward.wod)}`, label: "Rewards" }]
      : [
          { icon: <PointsIcon />, value: `+${fmt(reward.points)}`, label: "Points" },
          ...(reward.stars ? [{ icon: <StarsIcon />, value: `+${fmt(reward.stars)}`, label: "Stars" }] : []),
        ]
    : [];

  return (
    <div className="dh-overlay" onClick={onClose}>
      <div className="dh-popup" onClick={(e) => e.stopPropagation()}>
        <div className="dh-bg" />
        <div className="dh-bg-shade" />

        <div className="dh-content">
          <header className="dh-header">
            <h1 className="dh-title dh-russo">DYPIAN HEIST</h1>
            {left === 0 && phase !== "spinning" && (
              <div className="dh-timer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5c542" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <span style={{ color: capped ? "#ffd96b" : "#c9c2ec" }}>
                  {capped ? "Vault locked. Unlocks in" : "Free crack resets in"}
                </span>
                <span className="dh-russo dh-timer-value">{countdown}</span>
              </div>
            )}
          </header>

          <div className="dh-grid">
            <section className="dh-col dh-stats">
              <div className="dh-card">
                <p className="dh-label">Today's take</p>
                <Stat icon={<PointsIcon />} value={fmt(take.points)} label="Points" />
                <Stat icon={<StarsIcon />} value={fmt(take.stars)} label="Stars" />
                <Stat icon={<CashIcon />} value={`$${fmt(take.wod)}`} label="Rewards" />
              </div>
              <div className="dh-card">
                <div className="d-flex justify-content-between align-items-baseline">
                  <p className="dh-label">What's inside</p>
                  <span className="dh-muted" style={{ fontSize: 11 }}>Drop rate</span>
                </div>
                {TIERS.map((t) => (
                  <div key={t.id} className="d-flex align-items-center gap-3">
                    <div className="dh-tier-bar" style={{ background: t.color, boxShadow: `0 0 10px ${t.color}` }} />
                    <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                      <span className="dh-tier-name">{t.tier}</span>
                      <span className="dh-tier-desc">{t.desc}</span>
                    </div>
                    <span className="dh-russo" style={{ fontSize: 14, color: t.color }}>{t.odds}</span>
                  </div>
                ))}
                <p className="dh-muted mb-0" style={{ fontSize: 11 }}>Every crack pays out. No empty vaults.</p>
              </div>
            </section>

            <section className="dh-center">
              <div
                className="dh-glow"
                style={{ background: `radial-gradient(circle, ${isOpen && reward ? reward.glow : "rgba(123,60,255,.35)"} 0%, transparent 62%)` }}
              />
              <div className="dh-safe">
                <div className="dh-safe-body" />
                <div className="dh-hinge" style={{ top: 92 }} />
                <div className="dh-hinge" style={{ bottom: 92 }} />

                <div
                  className="dh-interior"
                  style={{ background: `radial-gradient(circle at 50% 45%, ${isOpen && reward ? reward.interior : "#1a1240"} 0%, #0b0720 70%)` }}
                >
                  {isOpen && reward && (
                    <>
                      <div className={`dh-tier-bg dh-${reward.id}`} />
                      <div className="dh-tier-shade" />
                    </>
                  )}
                  <div className="dh-rays" />
                  {isOpen && reward && (
                    <div className="dh-reward">
                      <span className="dh-reward-tier" style={{ borderColor: reward.color, color: reward.color }}>
                        {reward.tier}
                      </span>
                      <div className="dh-reward-box">
                        {rewardRows.map((w) => (
                          <Stat key={w.label} icon={w.icon} value={w.value} label={w.label} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="dh-door" style={{ transform: isOpen ? "rotateY(-112deg)" : "rotateY(0deg)" }}>
                  <div className="dh-door-ring" />
                  <div className="dh-door-face" />
                  {bolts.map((b, i) => (
                    <div key={i} className="dh-bolt" style={b} />
                  ))}
                  <div className="dh-pointer" />
                  <div className="dh-dial" style={{ transform: `rotate(${dialAngle}deg)` }}>
                    {ticks.map((t, i) => (
                      <div key={i} className="dh-tick" style={t} />
                    ))}
                    <div className="dh-spoke" />
                    <div className="dh-spoke" style={{ transform: "rotate(60deg)" }} />
                    <div className="dh-spoke" style={{ transform: "rotate(-60deg)" }} />
                    <div className="dh-knob" style={{ transform: `rotate(-${dialAngle}deg)` }}>
                      <span className="dh-russo">D</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column align-items-center gap-2 position-relative">
                <button
                  className={`dh-btn dh-main-btn dh-russo ${btnMuted ? "muted" : ""}`}
                  onClick={onMain}
                >
                  {btnLabel}
                </button>
                <span className="dh-hint">{btnHint}</span>
              </div>
            </section>

            <section className="dh-col dh-side">
              <div className="dh-card dh-card-purple">
                <p className="dh-label" style={{ color: "#d6ccff" }}>Cracks available</p>
                <div className="d-flex align-items-baseline gap-2">
                  <span className="dh-russo dh-cracks">{left}</span>
                  <span style={{ fontSize: 13, color: "#d6ccff" }}>free crack</span>
                </div>
                <div className="dh-streak">
                  {DAYS.map((d, k) => {
                    const done = k === todayIdx && history.length > 0;
                    return (
                      <div key={k} className="d-flex flex-column align-items-center gap-1">
                        <div className={`dh-day ${done ? "done" : ""} ${k === todayIdx ? "today" : ""}`}>
                          {done && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2a1a00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12l5 5L20 7" />
                            </svg>
                          )}
                        </div>
                        <span style={{ fontSize: 10, color: "#c9c2ec" }}>{d}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="mb-0" style={{ fontSize: 12, color: "#c9c2ec" }}>Your daily streak this week</p>
              </div>

              {history.length > 0 && (
                <div className="dh-card flex-grow-1">
                  <p className="dh-label">Your recent hauls</p>
                  {history.map((h, i) => (
                    <div key={i} className="dh-haul">
                      <span style={{ color: h.color, fontWeight: 600 }}>{h.tier}</span>
                      <span>{h.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section className="dh-bundles">
            <div className="dh-bundles-intro">
              <p className="dh-russo mb-0" style={{ fontSize: 20 }}>Need more cracks?</p>
              <p className="mb-0" style={{ fontSize: 13, color: nudge ? "#ffd96b" : "#c9c2ec" }}>
                {capped
                  ? "Locked until reset."
                  : nudge
                  ? "Out of cracks. Pick a bundle to keep going."
                  : `1 WOD per crack. Max ${DAILY_CAP} extra a day.`}
              </p>
            </div>
            {BUNDLES.map((b, k) => {
              const disabled = bought + b.n > DAILY_CAP;
              return (
                <div
                  key={b.n}
                  className={`dh-bundle ${k === 2 ? "best" : ""} ${nudge ? "nudge" : ""}`}
                  style={{ opacity: disabled ? 0.4 : 1 }}
                >
                  <div className="d-flex flex-column gap-1">
                    <span className="dh-russo dh-bundle-qty">x{b.n}</span>
                    <span style={{ fontSize: 12, color: "#d6ccff" }}>{b.label}</span>
                  </div>
                  <button
                    className="dh-btn dh-buy-btn"
                    disabled={disabled}
                    onClick={() => {
                      setBought((v) => v + b.n);
                      setNudge(false);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                    {b.price}
                  </button>
                </div>
              );
            })}
          </section>
        </div>

        <div className="dh-frame" />
        <div className="dh-corner tl" />
        <div className="dh-corner bl" />
        <div className="dh-corner br" />
        <div className="dh-notch top" />
        <div className="dh-notch bottom" />
        <div className="dh-notch left" />
        <div className="dh-notch right" />
        <button className="dh-btn dh-close" aria-label="Close" onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DypianHeist;
