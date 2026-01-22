import { AlertTriangle, Info, X } from "lucide-react";

const DisclaimerModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 bordertw border-blue-500/30 rounded-2xl max-w-2xl w-full shadow-2xl shadow-blue-500/20 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900/90 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-white">Important Disclaimer</h3>
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
                  Impermanent Loss Risk
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  Your deposited stablecoins will be{" "}
                  {/* <span className="bg-orange-300/20 text-orange-300 font-semibold px-1 rounded"> */}
                  converted to WOD-USDT liquidity pool positions on PancakeSwap
                  {/* </span> */}.
                  {/* <span className="bg-orange-300/20 text-orange-300 font-semibold px-1 rounded ml-1"> */}
                  This exposes you to impermanent loss (IL)
                  {/* </span> */}, which occurs when the price ratio between WOD
                  and USDT changes.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If the WOD token price significantly{" "}
                  {/* <span className="bg-orange-300/20 text-orange-300 font-semibold px-1 rounded"> */}
                  increases or decreases relative to USDT {/* </span> */} during
                  the 3-month campaign, you may receive less value than if you
                  had simply held the stablecoins. The LP rewards and bonus
                  tokens are designed to offset this risk, but{" "}
                  {/* <span className="bg-orange-300/20 text-orange-300 font-semibold px-1 rounded"> */}
                  impermanent loss is NOT guaranteed to be covered
                  {/* </span> */}.
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
                  Reward Structure
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  All rewards are distributed in <span className="">USDT</span>{" "}
                  and consist of two components:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  <span className="">1. Weekly LP Rewards:</span> Earned from
                  PancakeSwap trading fees on your WOD-USDT LP position. These
                  rewards are <span className="">claimable every week</span>{" "}
                  throughout the campaign duration.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <span className="">2. Bonus Rewards ($250K pool):</span>{" "}
                  Distributed{" "}
                  <span className="">at the end of the 3-month campaign</span>{" "}
                  based on your pool share. Allocated across tiered rankings
                  (Top 10, 11-50, 51-100, 101-300).
                </p>
              </div>
            </div>
          </div>

          {/* Reward Adjustments */}
          <div className="">
            <div className="flex items-start gap-3">
              {/* <Info className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" /> */}
              <div>
                <h4 className="text-sm font-bold text-blue-300 mb-2">
                  Pool Maturity & Adjustments
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  The advertised reward pool and APR calculations are based on
                  the assumption that the total value locked (TVL) reaches our
                  target pool cap of{" "}
                  {/* <span className="bg-yellow-300/20 text-yellow-300 font-semibold px-1 rounded"> */}
                  $2,500,000
                  {/* </span> */}.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  {/* <span className="bg-yellow-300/20 text-yellow-300 font-semibold px-1 rounded"> */}
                  If the pool does not reach minimum maturity thresholds
                  {/* </span>{" "} */}
                  (e.g., $500,000 TVL), the{" "}
                  {/* <span className="bg-yellow-300/20 text-yellow-300 font-semibold px-1 rounded"> */}
                  WOD team reserves the right to adjust the total reward pool
                  amount at our sole discretion
                  {/* </span> */}. This ensures sustainable reward distribution
                  aligned with actual participation levels.
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {/* <span className="bg-yellow-300/20 text-yellow-300 font-semibold px-1 rounded"> */}
                  Reward adjustments, if necessary, will be made proportionally
                  across all tiers
                  {/* </span>{" "} */}
                  to maintain fairness among participants.
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
                  Additional Terms
                </h4>
                <ul className="text-xs p-0 text-slate-300 space-y-1.5">
                  <li>
                    •{" "}
                    {/* <span className="bg-blue-300/20 text-blue-300 font-semibold px-1 rounded"> */}
                    Campaign Period:
                    {/* </span> */} The campaign is{" "}
                    {/* <span className="bg-blue-300/20 text-blue-300 font-semibold px-1 rounded"> */}
                    running for 3 months
                    {/* </span> */}. Early withdrawals are NOT permitted.
                  </li>
                  <li>
                    •{" "}
                    {/* <span className="bg-blue-300/20 text-blue-300 font-semibold px-1 rounded"> */}
                    Accepted Assets: {/* </span>{" "} */}
                    {/* <span className="bg-blue-300/20 text-blue-300 font-semibold px-1 rounded"> */}
                    Only stablecoins
                    {/* </span>{" "} */}
                    (USDT, USDC, USD1) are accepted.
                  </li>
                  <li>
                    •{" "}
                    {/* <span className="bg-blue-300/20 text-blue-300 font-semibold px-1 rounded"> */}
                    Smart Contract Risk: {/* </span>{" "} */}
                    DeFi protocols carry inherent risks.{" "}
                    {/* <span className="bg-blue-300/20 text-blue-300 font-semibold px-1 rounded"> */}
                    Participate only with funds you can afford to lose
                    {/* </span> */}.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 bordertw border-white/10 rounded-xl p-4 text-center">
            <p className="text-slate-300 text-xs mb-0">
              {/* <span className="bg-cyan-300/20 text-cyan-300 font-semibold px-1 rounded"> */}
              By depositing funds, you acknowledge that you have read,
              understood, and agree to all terms and risks outlined above.
              {/* </span> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
