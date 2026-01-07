import { useState, useEffect } from "react";
import {
  Droplets,
  TrendingUp,
  Clock,
  Lock,
  Trophy,
  Info,
  ChevronDown,
  DollarSign,
  Wallet,
  Check,
} from "lucide-react";
import DisclaimerModal from "./components/DisclaimerModal";
import Countdown from "react-countdown";
import OutsideClickHandler from "react-outside-click-handler";
import "../../../../components/Kickstarter/components/kickstarter_newcss.scss";
const renderer = ({ days, hours }) => {
  return (
    <div className="d-flex">
      <div className="text-2xl font-bold text-white">
        {days}d {hours}h
      </div>
    </div>
  );
};

const LiquidityComp = () => {
  let lastDay = new Date("2026-04-06T14:00:00.000+02:00");

  const STABLECOINS = [
    {
      symbol: "USDT",
      name: "Tether USD",
      balance: "1,234.56",
      icon: "usdtIconPremium.svg",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: "5,678.90",
      icon: "usdcIconPremium.svg",
    },
    {
      symbol: "U",
      name: "U Stablecoin",
      balance: "0.00",
      icon: "uIconPremium.svg",
    },
    {
      symbol: "USD1",
      name: "USD1",
      balance: "890.12",
      icon: "usd1IconPremium.svg",
    },
  ];
  const [selectedToken, setSelectedToken] = useState(STABLECOINS[0]);
  const [amount, setAmount] = useState("");
  const [showTokenSelect, setShowTokenSelect] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [totalDeposited, setTotalDeposited] = useState(5420.0);
  const [activeTab, setActiveTab] = useState("deposit");
  const [claimFilter, setClaimFilter] = useState("available");

  const claims = [
    {
      week: "Week 1",
      amount: 145.32,
      status: "available",
      date: "2026-01-06",
    },
    {
      week: "Week 2",
      amount: 138.45,
      status: "available",
      date: "2026-01-13",
    },
    {
      week: "Week 3",
      amount: 138.45,
      status: "available",
      date: "2026-01-20",
    },
    {
      week: "Week 4",
      amount: 138.45,
      status: "available",
      date: "2026-01-27",
    },
    {
      week: "Week 5",
      amount: 138.45,
      status: "available",
      date: "2026-02-03",
    },
    {
      week: "Week 6",
      amount: 138.45,
      status: "available",
      date: "2026-02-10",
    },
    {
      week: "Week 7",
      amount: 138.45,
      status: "available",
      date: "2026-02-17",
    },
    {
      week: "Week 8",
      amount: 142.18,
      status: "available",
      date: "2026-02-24",
    },
    { week: "Week 9", amount: 139.67, status: "available", date: "2026-03-03" },
    {
      week: "Week 10",
      amount: 138.45,
      status: "available",
      date: "2026-03-10",
    },
    {
      week: "Week 11",
      amount: 138.45,
      status: "available",
      date: "2026-03-17",
    },
    {
      week: "Week 12",
      amount: 138.45,
      status: "available",
      date: "2026-03-23",
    },
  ];

  const filteredClaims = claims.filter((claim) => {
    if (claimFilter === "all") return true;
    return claim.status === claimFilter;
  });

  const totalAvailableToClaim = claims
    .filter((c) => c.status === "available")
    .reduce((sum, c) => sum + c.amount, 0);

  const handleDeposit = () => {
    if (amount && parseFloat(amount) > 0) {
      setTotalDeposited((prev) => prev + parseFloat(amount));
      setAmount("");
      window.alertify.message("Deposit successful!");
    }
  };

  const handleClaim = (week) => {
    window.alertify.message(`Claimed rewards for ${week}!`);
  };

  const handleClaimAll = () => {
    window.alertify.message(
      `Claimed all available rewards: $${totalAvailableToClaim.toFixed(
        2
      )} USDT!`
    );
  };

  useEffect(() => {
    document.title = "WOD Liquidity Catalyst Campaign";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid font-ui  d-flex justify-content-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      <div className="custom-container mt-5">
        <div className="mt-5 relative overflow-hidden">
          {/* Disclaimer Modal */}
          {showDisclaimer && (
            <DisclaimerModal onClose={() => setShowDisclaimer(false)} />
          )}

          {/* Main content - single scroll */}
          <main className="max-w-7xl mx-auto px-lg-4 sm:px-6 lg:px-8 py-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column - Campaign info */}
              <div className="space-y-4 d-flex flex-column h-100">
                {/* Hero */}
                <div className="h-100 bg-gradient-to-br from-slate-900/80 to-slate-800/50 bordertw border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 bordertw border-blue-500/30 rounded-full mb-3">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    <span className="text-cyan-400 text-xs font-medium">
                      Season 1 • Liquidity Catalyst
                    </span>
                  </div>
                  <br />
                  <span className="text-3xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                      Enter the Liquidity Catalyst Campaign
                    </span>
                  </span>
                  <p className="text-xs text-slate-300 mb-4">
                    Deposit and earn rewards through automated WOD-USDT LP
                    positions on PancakeSwap.
                  </p>
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Current APR</span>
                      </div>
                      <div className="text-2xl font-bold text-white">78.4%</div>
                      <div className="text-xs text-slate-400">
                        38.4% Base + 40% Bonus
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Time Left</span>
                      </div>
                      <Countdown renderer={renderer} date={lastDay} />
                      <div className="text-xs text-slate-400">
                        Until Season Ends
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs">Pool Status</span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        $847K / $2M
                      </div>
                      <div className="text-xs text-slate-400">42.4% Filled</div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-yellow-400 mb-1">
                        <Trophy className="w-4 h-4" />
                        <span className="text-xs">Bonus Rewards</span>
                      </div>
                      <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        $200K USDT
                      </div>
                      <div className="text-xs text-slate-400">Season Pool</div>
                    </div>
                  </div>
                  {/* Key features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                      <Lock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">
                        3-Month Campaign
                      </div>
                    </div>
                    <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                      <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">
                        Auto-Compound
                      </div>
                    </div>
                    <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                      <Trophy className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">
                        Tiered Rewards
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rewards section */}
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 bordertw border-blue-500/30 rounded-2xl p-4 backdrop-blur-xl">
                  <span className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    Rewards
                  </span>

                  {/* Tiered Rewards */}
                  <div className="mb-4">
                    {/* <div className="text-xs text-cyan-400 font-semibold mb-2">
                      Tiered Rewards (60% Pool Share + 40% Duration)
                    </div> */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 text-xs">
                      <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                        <div className="text-cyan-400 font-semibold">
                          Top 10
                        </div>
                        <div className="text-white font-bold">$50K USDT</div>
                      </div>
                      <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                        <div className="text-cyan-400 font-semibold">
                          Rank 11-50
                        </div>
                        <div className="text-white font-bold">$80K USDT</div>
                      </div>
                      <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                        <div className="text-cyan-400 font-semibold">
                          Rank 51-100
                        </div>
                        <div className="text-white font-bold">$40K USDT</div>
                      </div>
                      <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                        <div className="text-cyan-400 font-semibold">
                          Rank 101-300
                        </div>
                        <div className="text-white font-bold">$30K USDT</div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly LP Rewards */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs text-slate-300">
                      LP Rewards are claimable weekly from PancakeSwap LP
                      positions
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Deposit/Claim form */}
              <div className="space-y-4 d-flex flex-column h-100">
                {/* Your Position Summary */}
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/50 bordertw border-blue-500/30 rounded-2xl p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-cyan-400" />
                      Your Position
                    </span>
                    <button
                      onClick={() => setShowDisclaimer(true)}
                      className="w-7 h-7 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center transition-colors group"
                      title="View Important Disclaimer"
                    >
                      <Info className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">
                        Total Deposited
                      </div>
                      <div className="text-xl font-bold text-cyan-400">
                        $
                        {totalDeposited.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">
                        Est. Final Rewards
                      </div>
                      <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        $
                        {(totalDeposited * 0.784).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deposit/Claim Tabs */}
                <div className="h-100 bg-gradient-to-br from-slate-900/80 to-slate-800/50 bordertw border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setActiveTab("deposit")}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold text-xs transition-all ${
                        activeTab === "deposit"
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 bordertw border-blue-400/30 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/5 text-slate-400 bordertw border-white/10 hover:bg-white/10"
                      }`}
                    >
                      Deposit
                    </button>
                    <button
                      onClick={() => setActiveTab("claim")}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold text-xs transition-all ${
                        activeTab === "claim"
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 bordertw border-blue-400/30 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/5 text-slate-400 bordertw border-white/10 hover:bg-white/10"
                      }`}
                    >
                      Claim Weekly
                    </button>
                  </div>

                  {/* Deposit Tab */}
                  {activeTab === "deposit" && (
                    <>
                      {/* Token selection */}
                      <div className="mb-3">
                        <label className="text-xs text-slate-400 mb-2 block">
                          Select Token
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => setShowTokenSelect(!showTokenSelect)}
                            className="w-full bg-slate-800/50 bordertw border-white/10 rounded-lg p-3 flex items-center justify-between hover:border-cyan-500/30 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://cdn.worldofdypians.com/wod/${selectedToken.icon}`}
                                alt=""
                                className="w-8 h-8"
                              />
                              <div className="text-left">
                                <div className="text-white font-semibold text-xs">
                                  {selectedToken.symbol}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {selectedToken.name}
                                </div>
                              </div>
                            </div>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform ${
                                showTokenSelect ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {showTokenSelect && (
                            <OutsideClickHandler
                              onOutsideClick={() => {
                                setShowTokenSelect(false);
                              }}
                            >
                              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 bordertw border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                {STABLECOINS.map((token) => (
                                  <button
                                    key={token.symbol}
                                    onClick={() => {
                                      setSelectedToken(token);
                                      setShowTokenSelect(false);
                                    }}
                                    className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      {/* <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs">
                                      {token.symbol[0]}
                                    </div> */}
                                      <img
                                        src={`https://cdn.worldofdypians.com/wod/${token.icon}`}
                                        alt=""
                                        className="w-7 h-7"
                                      />
                                      <div className="text-left">
                                        <div className="text-white font-semibold text-xs">
                                          {token.symbol}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                          {token.name}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xs text-slate-400">
                                        Balance
                                      </div>
                                      <div className="text-white font-semibold text-xs">
                                        {token.balance}
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </OutsideClickHandler>
                          )}
                        </div>
                      </div>

                      {/* Amount input */}
                      <div className="mb-3">
                        <label className="text-xs text-slate-400 mb-2 d-flex items-center w-100 justify-between">
                          <span>Amount</span>
                          <span className="text-xs">
                            Balance: {selectedToken.balance}
                          </span>
                        </label>
                        <div className="bg-slate-800/50 bordertw border-white/10 rounded-lg p-3 focus-within:border-cyan-500/30 transition-colors">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="0.00"
                              className="flex-1 bg-transparent text-white text-xl font-semibold outline-none"
                              maxLength={7}
                            />
                            <button
                              onClick={() => setAmount(selectedToken.balance)}
                              className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded text-xs font-semibold transition-colors"
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Estimated rewards */}
                      <div className="bg-gradient-to-br d-flex align-items-center justify-content-between from-yellow-500/10 to-orange-500/10 bordertw border-yellow-500/20 rounded-lg p-3 mb-3">
                        <div className="text-xs text-slate-300 mb-0">
                          Estimated Rewards (USDT)
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-xs text-slate-400">
                              LP Fees
                            </div>
                            <div className="text-lg font-bold text-white">
                              ${((parseFloat(amount) || 0) * 0.384).toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-400">Bonus</div>
                            <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                              ${((parseFloat(amount) || 0) * 0.4).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Deposit button */}
                      <button
                        onClick={handleDeposit}
                        disabled={!amount || parseFloat(amount) === 0}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 font-semibold"
                      >
                        Deposit Now
                      </button>
                    </>
                  )}

                  {/* Claim Tab */}
                  {activeTab === "claim" && (
                    <>
                      {/* Claim filters */}
                      <div className="flex gap-2 mb-4">
                        {["available", "claimed"].map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setClaimFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              claimFilter === filter
                                ? "bg-cyan-500/20 text-cyan-400 bordertw border-cyan-500/30"
                                : "bg-white/5 text-slate-400 hover:bg-white/10"
                            }`}
                          >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                          </button>
                        ))}
                      </div>

                      {/* Available to claim summary */}
                      {claimFilter !== "claimed" &&
                        totalAvailableToClaim > 0 && (
                          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 bordertw border-green-500/30 rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-slate-300 mb-1">
                                  Total Available
                                </div>
                                <div className="text-xl font-bold text-green-400">
                                  {totalAvailableToClaim.toFixed(2)} USDT
                                </div>
                              </div>
                              <button
                                onClick={handleClaimAll}
                                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-green-500/30"
                              >
                                Claim
                              </button>
                            </div>
                          </div>
                        )}

                      {/* Claims list */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pe-2">
                        {filteredClaims.length === 0 ? (
                          <div className="text-center py-8 text-slate-400 text-xs">
                            You have no rewards claimed.
                          </div>
                        ) : (
                          filteredClaims.map((claim) => (
                            <div
                              key={claim.week}
                              className="bg-slate-800/50 bordertw border-white/10 rounded-lg p-3 flex items-center justify-between hover:border-cyan-500/30 transition-colors"
                            >
                              <div>
                                <div className="text-white font-semibold text-xs">
                                  {claim.week}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {claim.date}
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-white font-bold">
                                    {claim.amount.toFixed(2)}
                                  </div>
                                  <div className="text-xs text-slate-400 text-end">
                                    USDT
                                  </div>
                                </div>
                                {claim.status === "available" ? null : ( //   </button> //     Claim //   > //     className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold transition-all" //     onClick={() => handleClaim(claim.week)} //   <button
                                  <div className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-semibold flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Claimed
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                By depositing, you acknowledge all risks and agree to the terms.
                3-month Campaign period • Auto-LP every 3 hours
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LiquidityComp;
