import React from "react";

const GameModes = () => {
  return (
    <div className="row w-100 px-3 px-lg-5 gap-5" style={{minHeight: '60vh'}}>
      <h3 className="game-mode-header font-organetto">Game modes</h3>
      <div className="d-flex align-items-center justify-content-between">
        <div className="game-mode-card p-3 d-flex flex-column gap-1">
          <span className="game-mode-title font-poppins">Campaign Mode</span>
          <span className="game-mode-desc font-poppins">
            Explore maps to fight creatures, loot materials, forge new items and
            earn rewards
          </span>
        </div>
        <div className="game-mode-card p-3 d-flex flex-column gap-1">
          <span className="game-mode-title font-poppins">Open world Mode</span>
          <span className="game-mode-desc font-poppins">
            Real-time interaction with other players and NPCs
          </span>
        </div>
        <div className="game-mode-card p-3 d-flex flex-column gap-1">
          <span className="game-mode-title font-poppins">Multiplayer Mode</span>
          <span className="game-mode-desc font-poppins">
            Team up together, form clans, or enter the battle arenas
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameModes;
