import "../DypianHeist/_dypianheist.scss";
import "./_buildgta.scss";
import street from "../DypianHeist/assets/street.jpg";

const TOTAL_PIECES = 14;
// ponytail: hardcoded until the game API exists. Zeros = not logged in to the game account.
export const GTA_EARNINGS = { collected: 6, points: 12500, stars: 25 };

// ponytail: placeholder reward milestones, replace with real tiers from the game team.
const MILESTONES = [
  { pieces: 3, reward: "2,500 Points" },
  { pieces: 7, reward: "10,000 Points + 10 Stars" },
  { pieces: 10, reward: "20,000 Points + 25 Stars" },
  { pieces: 14, reward: "50,000 Points + 100 Stars" },
];
const fmt = (n) => Number(n).toLocaleString("en-US");

const BuildGta = ({ onClose, isLoggedIn = true }) => {
  const e = isLoggedIn ? GTA_EARNINGS : { collected: 0, points: 0, stars: 0 };

  return (
    <div className="dh-overlay" onClick={onClose}>
      <div className="dh-popup gta-popup" onClick={(ev) => ev.stopPropagation()}>
        <div className="dh-bg" style={{ backgroundImage: `url(${street})` }} />
        <div className="dh-bg-shade" />
        <div className="dh-content">
          <header className="dh-header">
            <h1 className="dh-title dh-russo">BUILD YOUR GTA VI</h1>
            <p className="dh-muted">Collect GTA VI pieces in the game and earn points and stars on BNB Chain.</p>
          </header>

          <div className="gta-grid">
            <div className="dh-card">
              <p className="dh-label">Your earnings</p>
              <div className="gta-stats">
                <div><span className="dh-russo gta-val">{fmt(e.points)}</span><span className="dh-muted">Points</span></div>
                <div><span className="dh-russo gta-val">{fmt(e.stars)}</span><span className="dh-muted">Stars</span></div>
                <div><span className="dh-russo gta-val">{e.collected}/{TOTAL_PIECES}</span><span className="dh-muted">Pieces</span></div>
              </div>
              <div className="gta-bar"><div style={{ width: `${(e.collected / TOTAL_PIECES) * 100}%` }} /></div>
              {!isLoggedIn && <p className="dh-muted">Log in to your game account to track your progress.</p>}
            </div>

            <div className="dh-card">
              <p className="dh-label">How it works</p>
              <ol className="gta-steps">
                <li>Log in to the World of Dypians game with your account.</li>
                <li>Find and collect {TOTAL_PIECES} different GTA VI pieces inside the game.</li>
                <li>The more pieces you collect, the more points and stars you earn on BNB Chain.</li>
                <li>Your earnings appear here once you are logged in to the game.</li>
              </ol>
            </div>

            <div className="dh-card">
              <p className="dh-label">Rewards</p>
              {MILESTONES.map((m) => (
                <div key={m.pieces} className={`dh-haul ${e.collected >= m.pieces ? "gta-done" : ""}`}>
                  <span style={{ fontWeight: 600 }}>{m.pieces} pieces</span>
                  <span>{m.reward}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dh-frame" />
        <button className="dh-btn dh-close" aria-label="Close" onClick={onClose}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BuildGta;
