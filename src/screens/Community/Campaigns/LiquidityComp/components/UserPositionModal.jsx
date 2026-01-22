import { AlertTriangle, Info, X } from "lucide-react";

const UserPositionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 bordertw border-blue-500/30 rounded-2xl max-w-2xl w-full shadow-2xl shadow-blue-500/20 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900/90 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white">
            Important Information
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Impermanent Loss */}
          <div className="">
            <div className="flex items-start gap-3">
              <div>
                <h4 className="text-sm font-bold text-orange-300 mb-2">
                  Campaign information
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-0">
                  Campaign Duration: 90 days total
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-0">
                  Dynamic APR: Updates in real time based on pool activity and
                  market conditions
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-0">
                  Pool Status: $2.5M max cap for the campaign pool
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-0">
                  Bonus Rewards Pool: $250,000 USDT total incentives
                </p>
              </div>
            </div>
          </div>
          {/* Reward Adjustments */}
          <div className="">
            <div className="flex items-start gap-3">
              {/* <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" /> */}
              <div>
                <h4 className="text-sm font-bold text-yellow-300 mb-2">
                  How Rewards Work
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed  mb-0">
                  Estimated Rewards include 2 parts:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed  mb-0">
                  LP Fees: Earned from WOD USDT LP activity and claimable weekly
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-0">
                  Bonus Rewards: Shared from the $250,000 USDT pool based on
                  your ranking
                </p>
              </div>
            </div>
          </div>

          {/* Reward Adjustments */}
          <div className="">
            <div className="flex items-start gap-3">
              {/* <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" /> */}
              <div>
                <h4 className="text-sm font-bold text-blue-300">
                  Bonus Rewards Tiers
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed  mb-0">
                  Top 10
                </p>
                <p className="text-xs text-slate-300 leading-relaxed  mb-0">
                  {/* <span className="bg-yellow-300/20 text-yellow-300 font-semibold px-1 rounded"> */}
                  Rank 11 to 50
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-0">
                  {/* <span className="bg-yellow-300/20 text-yellow-300 font-semibold px-1 rounded"> */}
                  Rank 51 to 100
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-0">
                  {/* <span className="bg-yellow-300/20 text-yellow-300 font-semibold px-1 rounded"> */}
                  Rank 101 to 300
                </p>
              </div>
            </div>
          </div>

          {/* General Terms */}
          <div className="">
            <div className="flex items-start gap-3">
              {/* <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" /> */}
              <div>
                <h4 className="text-sm font-bold text-blue-400 mb-2">
                  How to Participate
                </h4>
                <ul className="text-xs p-0 text-slate-300 space-y-1.5">
                  <li>Deposit supported stablecoins: USDT, USDC, USD1</li>
                  <li>You can deposit multiple times during the campaign</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 bordertw border-white/10 rounded-xl p-3 text-center">
            <p className="text-slate-300 text-xs mb-0">Important Note</p>
            <p className="text-slate-300 text-xs mb-0">
              Timing matters: Earlier deposits have a higher weight in pool
              share calculation, impacting your estimated final rewards and
              leaderboard position
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPositionModal;
