import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
  WalletCards,
  BadgeDollarSign,
  TrendingDown,
  BarChart3,
} from "lucide-react";
import DisclaimerModal from "./components/DisclaimerModal";
import UserPositionModal from "./components/UserPositionModal";
import Countdown from "react-countdown";
import OutsideClickHandler from "react-outside-click-handler";
import "../../../../components/Kickstarter/components/kickstarter_newcss.scss";

import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
  getAccount,
} from "@wagmi/core";
import { wagmiClient } from "../../../../wagmiConnectors";
import { bsc } from "viem/chains";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import { switchNetworkWagmi } from "../../../../utils/wagmiSwitchChain";
import { abbreviateNumber } from "js-abbreviation-number";

const SEASON1_USER_STATS_BASE =
  "https://api.worldofdypians.com/api/wod/season1/user-stats";

const formatUtcDateTime = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return String(iso);
  }
};

/** API sometimes returns `datetime_utc` as `"YYYY-MM-DD HH:mm:ss"` (no `T`). */
const formatClaimsUtcDateTime = (value) => {
  if (!value) return "—";
  const s = String(value);
  if (s.includes("T")) return formatUtcDateTime(s);
  try {
    return new Date(s.replace(" ", "T") + "Z").toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return s;
  }
};

const renderer = ({ days, hours, completed }) => {
  return (
    <div className="d-flex">
      {completed ? (
        <span className="text-2xl font-bold text-white">Season Ended</span>
      ) : (
        <div className="text-2xl font-bold text-white">
          {days}d {hours}h
        </div>
      )}
    </div>
  );
};

const LiquidityComp = ({
  coinbase,
  isConnected,
  chainId,
  handleConnection,
  handleSwitchNetwork,
  isEOA,
}) => {
  const location = useLocation();
  let lastDay = new Date("2026-04-14T18:22:00.000+02:00");
  const SEASON_DAYS = 90;
  const [tokenBalance, setTokenBalance] = useState({
    usdtBalance: 0,
    usdcBalance: 0,
    usd1Balance: 0,
    uBalance: 0,
  });
  const STABLECOINS = [
    {
      address: "0x55d398326f99059ff775485246999027b3197955",
      symbol: "USDT",
      name: "Tether USD",
      icon: "usdtIconPremium.svg",
      decimals: 18,
      balance: tokenBalance.usdtBalance,
    },
    {
      address: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      symbol: "USDC",
      name: "USD Coin",
      icon: "usdcIconPremium.svg",
      decimals: 18,
      balance: tokenBalance.usdcBalance,
    },
    {
      address: "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
      symbol: "USD1",
      name: "USD1",
      icon: "usd1IconPremium.svg",
      decimals: 18,
      balance: tokenBalance.usd1Balance,
    },
    {
      address: "0xcE24439F2D9C6a2289F741120FE202248B666666",
      symbol: "U",
      name: "U Stablecoin",
      balance: tokenBalance.uBalance,
      icon: "uIconPremium.svg",
    },
  ];

  const [selectedSymbol, setSelectedSymbol] = useState("USDT");
  const [amount, setAmount] = useState("");

  const [claimLPAmount, setClaimLPAmount] = useState(0);
  const [claimBonusAmount, setClaimBonusAmount] = useState(0);
  const [weeklyClaimsData, setWeeklyClaimsData] = useState(null);

  const [showTokenSelect, setShowTokenSelect] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showUserPosition, setShowUserPosition] = useState(false);

  const [totalDeposited, setTotalDeposited] = useState(0);
  const [activeTab, setActiveTab] = useState("claim");
  const [claimFilter, setClaimFilter] = useState("available");
  const [totalUserDeposited, setTotalUserDeposited] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const [seasonStart, setSeasonStart] = useState(null);
  const [seasonEnd, setSeasonEnd] = useState(lastDay.getTime());
  const [share, setShare] = useState(0);
  const [estimatedFinalBonus, setEstimatedFinalBonus] = useState(0);
  const [calculatedFinalBonus, setCalculatedFinalBonus] = useState(0);
  const [calculatedLPBonus, setCalculatedLPBonus] = useState(0);

  const setCookie = (name, value, days = 30) => {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(
      value,
    )}; Max-Age=${maxAge}; Path=/; SameSite=None; Secure`;
  };

  const getCookie = (name) => {
    const prefix = `${name}=`;
    return (
      document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith(prefix))
        ?.slice(prefix.length) || ""
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search || "");
    const sourceParam = searchParams.get("source");

    if (sourceParam) {
      setCookie("source", sourceParam);
    } else setCookie("source", "wod");
  }, [location.search]);

  const [withdrawAmount, setwithdrawAmount] = useState("");
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const [withdrawStatus, setwithdrawStatus] = useState("initial");

  const [depositLoading, setdepositLoading] = useState(false);
  const [depositStatus, setdepositStatus] = useState("initial");
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimBonusLoading, setclaimBonusLoading] = useState(false);

  const [claimStatus, setclaimStatus] = useState("initial");
  const [claimBonusStatus, setclaimBonusStatus] = useState("initial");
  const [errorMsg, seterrorMsg] = useState("");
  const [errorMsg2, seterrorMsg2] = useState("");
  const [errorMsg3, seterrorMsg3] = useState("");
  const [errorMsg4, seterrorMsg4] = useState("");
  const [baseAprPercent, setBaseAprPercent] = useState(0);
  const [bonusAprPercent, setBonusAprPercent] = useState(0);
  const [totalAprPercent, setTotalAprPercent] = useState(0);
  const [feesUsd24Percent, setfeesUsd24Percent] = useState(0);

  const [seasonUserStats, setSeasonUserStats] = useState(null);
  const [seasonStatsLoading, setSeasonStatsLoading] = useState(false);

  const BONUS_POOL_USDT = 250000;
  const MIN_DEPOSIT = 100;
  const MAX_POOL = 2500000;
  const selectedToken = STABLECOINS.find((t) => t.symbol === selectedSymbol);
  const maxPoolRemaining = Math.max(0, MAX_POOL - Number(totalDeposited || 0));
  const parsedAmount = Number(amount);
  const isAmountInvalid =
    !Number.isFinite(parsedAmount) ||
    parsedAmount < MIN_DEPOSIT ||
    parsedAmount > maxPoolRemaining;
  const baseClaims = useMemo(
    () => [
      {
        week: "Week 1",
        amount: 0,
        status: "available",
        date: "2026-01-22",
      },
      {
        week: "Week 2",
        amount: 0,
        status: "available",
        date: "2026-01-29",
      },
      {
        week: "Week 3",
        amount: 0,
        status: "available",
        date: "2026-02-05",
      },
      {
        week: "Week 4",
        amount: 0,
        status: "available",
        date: "2026-02-12",
      },
      {
        week: "Week 5",
        amount: 0,
        status: "available",
        date: "2026-02-19",
      },
      {
        week: "Week 6",
        amount: 0,
        status: "available",
        date: "2026-02-26",
      },
      {
        week: "Week 7",
        amount: 0,
        status: "available",
        date: "2026-03-05",
      },
      {
        week: "Week 8",
        amount: 0,
        status: "available",
        date: "2026-03-12",
      },
      { week: "Week 9", amount: 0, status: "available", date: "2026-03-19" },
      {
        week: "Week 10",
        amount: 0,
        status: "available",
        date: "2026-03-26",
      },
      {
        week: "Week 11",
        amount: 0,
        status: "available",
        date: "2026-04-02",
      },
      {
        week: "Week 12",
        amount: 0,
        status: "available",
        date: "2026-04-09",
      },
    ],
    [],
  );
  const { BigNumber } = window;
  const claims = useMemo(() => {
    const currentWeek = Math.min(
      12,
      Math.max(1, Math.floor(Number(currentDayIndex || 0) / 7) + 1),
    );

    return baseClaims.map((claim, index) => {
      const weekNumber = index + 1;
      const apiKey = `week${weekNumber}`;
      const hasApiValue =
        weeklyClaimsData != null &&
        typeof weeklyClaimsData === "object" &&
        Object.prototype.hasOwnProperty.call(weeklyClaimsData, apiKey);
      const claimedAmount = Number(weeklyClaimsData?.[apiKey] ?? 0);
      const isClaimed = claimedAmount > 0;
      const isCurrentWeek = weekNumber === currentWeek;
      const availableAmount =
        !isClaimed && isCurrentWeek ? Number(claimLPAmount || 0) : 0;

      return {
        ...claim,
        amount: isClaimed ? claimedAmount : availableAmount,
        status: isClaimed ? "claimed" : "available",
        dimmed: hasApiValue && claimedAmount === 0,
      };
    });
  }, [baseClaims, claimLPAmount, currentDayIndex, weeklyClaimsData]);

  const filteredClaims = claims.filter((claim) => {
    if (claimFilter === "all") return true;
    return claim.status === claimFilter;
  });

  const totalAvailableToClaim = claims
    .filter((c) => c.status === "available")
    .reduce((sum, c) => sum + c.amount, 0);

  const fetchAprData = async () => {
    const result = await fetch(
      "https://api.worldofdypians.com/api/wod/pancake/apr",
    )
      .then((res) => res.json())
      .catch((e) => console.error("Error fetching APR data:", e));
    if (result) {
      setBaseAprPercent(result.base_apr_percent);
      setBonusAprPercent(result.bonus_apr_percent);
      setTotalAprPercent(result.total_apr_percent);
      setfeesUsd24Percent(result.fees_usd_24h);
    }
  };

  const fetchWeeklyClaimedData = async (address) => {
    if (!address) {
      setWeeklyClaimsData(null);
      return;
    }
    const result = await fetch(
      `https://api.worldofdypians.com/api/weekly-claims/${address}`,
    )
      .then((res) => res.json())
      .catch((e) => console.error("Error fetching APR data:", e));

    if (result) {
      setWeeklyClaimsData(result || null);
    }
  };

  const fetchSeasonUserStats = async (address) => {
    if (!address) {
      setSeasonUserStats(null);
      setSeasonStatsLoading(false);
      return;
    }
    setSeasonStatsLoading(true);
    try {
      const res = await fetch(`${SEASON1_USER_STATS_BASE}/${address}`);
      if (!res.ok) {
        setSeasonUserStats(null);
        return;
      }
      const data = await res.json();
      setSeasonUserStats(data && typeof data === "object" ? data : null);
    } catch (e) {
      console.error("Error fetching Season 1 user stats:", e);
      setSeasonUserStats(null);
    } finally {
      setSeasonStatsLoading(false);
    }
  };

  const stableSymbolForToken = (tokenAddress) => {
    if (!tokenAddress) return "—";
    const match = STABLECOINS.find(
      (t) => t.address.toLowerCase() === String(tokenAddress).toLowerCase(),
    );
    return match?.symbol ?? "Stable";
  };

  const checkTokenApproval = async (amount) => {
    try {
      let result;

      result = await readContract(wagmiClient, {
        address: selectedToken.address,
        abi: window.TOKEN_ABI,
        functionName: "allowance",
        args: [coinbase, window.config.liquidity_campaign_address],
        chainId: 56,
      });

      let result_formatted = new BigNumber(result || 0).div(1e18).toFixed(6);

      if (
        Number(result_formatted) >= Number(amount) &&
        Number(result_formatted) !== 0
      ) {
        setdepositStatus("deposit");
      } else {
        setdepositStatus("initial");
      }
    } catch (e) {
      console.error("Error checking approval:", e);
      setdepositStatus("initial");
    }
  };

  const handleApproveToken = async () => {
    setdepositLoading(true);

    try {
      let amount_formatted = new BigNumber(amount).times(1e18).toFixed(0);

      const hash = await writeContract(wagmiClient, {
        address: selectedToken.address,
        abi: window.TOKEN_ABI,
        functionName: "approve",
        args: [window.config.liquidity_campaign_address, amount_formatted],
      });

      const receipt = await waitForTransactionReceipt(wagmiClient, {
        hash: hash,
      });

      if (receipt) {
        setdepositLoading(false);
        setdepositStatus("deposit");
        getAllInfo();
      }
    } catch (e) {
      console.error("Error approving:", e?.message || e?.shortMessage);
      // window.alertify.error(e);
      setdepositLoading(false);
      setdepositStatus("fail");
      seterrorMsg(e?.message || e?.shortMessage || "Approval failed");
      setTimeout(() => {
        setAmount("");
        setdepositStatus("initial");
        seterrorMsg("");
      }, 10000);
    }
  };

  const handleDeposit = async () => {
    try {
      setdepositLoading(true);
      let amount_formatted = new BigNumber(amount).times(1e18).toFixed(0);

      const hash = await writeContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "deposit",
        args: [selectedToken.address, amount_formatted],
      });

      const receipt = await waitForTransactionReceipt(wagmiClient, {
        hash: hash,
      });

      if (receipt) {
        const sourceCookie = getCookie("source");
        if (sourceCookie && coinbase && amount) {
          try {
            await fetch(
              "https://api.worldofdypians.com/api/track-liquidity-deposit",
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  wallet: coinbase,
                  amount,
                  txHash: hash,
                  source: sourceCookie,
                }),
              },
            );
          } catch (postError) {
            console.error("Deposit attribution POST failed:", postError);
          }
        }

        setdepositLoading(false);
        setdepositStatus("success");
        setTimeout(() => {
          setdepositStatus("initial");
          setAmount("");
          getAllInfo();
          setCalculatedFinalBonus(0);
          getTokenBalance();
        }, 5000);
      }
    } catch (e) {
      console.error("Error depositing:", e);
      setdepositLoading(false);
      setdepositStatus("fail");
      seterrorMsg(e?.message || e?.shortMessage || "Deposit failed");
      setTimeout(() => {
        setAmount("");
        setdepositStatus("deposit");
        seterrorMsg("");
        setCalculatedFinalBonus(0);
      }, 5000);
    }
  };

  const handleClaim = async () => {
    setclaimLoading(true);

    try {
      const hash = await writeContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "claimLPFees",
        args: [],
      });

      const receipt = await waitForTransactionReceipt(wagmiClient, {
        hash: hash,
      });

      if (receipt) {
        setclaimStatus("success");
        setclaimLoading(false);
        setClaimLPAmount(0);
        getAllInfo();
        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
      }
    } catch (e) {
      console.error("Error claiming rewards:", e);
      setclaimStatus("failed");
      setclaimLoading(false);
      seterrorMsg2(e?.message || e?.shortMessage || "Claim failed");
      setTimeout(() => {
        setclaimStatus("initial");
        seterrorMsg2("");
      }, 5000);
    }
  };

  const handleClaimBonus = async () => {
    setclaimBonusLoading(true);

    try {
      const hash = await writeContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "claimBonusRewards",
        args: [],
      });

      const receipt = await waitForTransactionReceipt(wagmiClient, {
        hash: hash,
      });

      if (receipt) {
        setclaimBonusStatus("success");
        setclaimBonusLoading(false);
        setClaimBonusAmount(0);
        getAllInfo();
        setTimeout(() => {
          setclaimBonusStatus("initial");
        }, 5000);
      }
    } catch (e) {
      console.error("Error claiming rewards:", e);
      setclaimBonusStatus("failed");
      setclaimBonusLoading(false);
      seterrorMsg3(e?.message || e?.shortMessage || "Claim failed");
      setTimeout(() => {
        setclaimBonusStatus("initial");
        seterrorMsg3("");
      }, 10000);
    }
  };

  const handleWithdrawPrincipal = async () => {
    setwithdrawLoading(true);

    try {
      const hash = await writeContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "withdrawPrincipal",
        args: [],
      });

      const receipt = await waitForTransactionReceipt(wagmiClient, {
        hash: hash,
      });

      if (receipt) {
        setwithdrawLoading(false);
        setwithdrawStatus("success");
        setTimeout(() => {
          setwithdrawStatus("initial");
          getAllInfo();
          setwithdrawAmount(0);
        }, 5000);
      }
    } catch (e) {
      console.error("Error withdrawing:", e);
      setwithdrawLoading(false);
      setwithdrawStatus("failed");
      seterrorMsg4(e?.message || e?.shortMessage || "Withdrawal failed");
      setTimeout(() => {
        setwithdrawStatus("initial");
        seterrorMsg4("");
        setwithdrawAmount("");
      }, 10000);
    }
  };

  const getTokenBalance = async () => {
    let temp = {
      usdtBalance: 0,
      usdcBalance: 0,
      usd1Balance: 0,
      uBalance: 0,
    };
    if (coinbase) {
      for (let token of STABLECOINS) {
        const result = await readContract(wagmiClient, {
          address: token.address,
          abi: window.TOKEN_ABI,
          functionName: "balanceOf",
          args: [coinbase],
          chainId: bsc.id,
        }).catch(() => 0);

        if (token.symbol === "USDT") {
          temp.usdtBalance = new BigNumber(result ?? 0).div(1e18).toString(10);
        } else if (token.symbol === "USDC") {
          temp.usdcBalance = new BigNumber(result ?? 0).div(1e18).toString(10);
        } else if (token.symbol === "USD1") {
          temp.usd1Balance = new BigNumber(result ?? 0).div(1e18).toString(10);
        } else if (token.symbol === "U") {
          temp.uBalance = new BigNumber(result ?? 0).div(1e18).toString(10);
        }
      }

      setTokenBalance(temp);
    }
  };

  const calculateScore = async (amount) => {
    // let newScore
    let dayIdx = currentDayIndex;
    // since we ensured block.timestamp < seasonEnd, dayIdx <= 89
    let remaining = SEASON_DAYS - Number(dayIdx); // 90..1
    let scoreAdded = Number(amount) * Number(remaining);
    let userScorePrime = Number(userScore) + Number(scoreAdded);
    let totalScorePrime = Number(totalScore) + Number(scoreAdded);

    let sharePrime =
      userScorePrime === 0 ? 0 : userScorePrime / totalScorePrime;
    let estimatedFinalBonusPrime = BONUS_POOL_USDT * sharePrime;

    const userShare =
      totalScorePrime === 0 ? 0 : Number(amount) / totalScorePrime;
    const estimatedLPFees = feesUsd24Percent * remaining * userShare;
    setCalculatedLPBonus(estimatedLPFees);
    setCalculatedFinalBonus(estimatedFinalBonusPrime);
  };

  const getAllInfo = async () => {
    const [
      user_totalDeposited,
      userScore,
      totalScore,
      seasonStart,
      seasonEnd,
      currentDayIndex,
      claimsAvailableLP,
      claimsAvailableBonus,
      withdrawableAmount,
      totalUnits,
    ] = await Promise.all([
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "userUnits",
        args: [coinbase ?? window.config.ZERO_ADDRESS],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "userScore",
        args: [coinbase ?? window.config.ZERO_ADDRESS],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "totalScore",
        args: [],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "seasonStart",
        args: [],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "seasonEnd",
        args: [],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "currentDayIndex",
        args: [],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "lpFeesClaimableUSDT",
        args: [coinbase ?? window.config.ZERO_ADDRESS],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "bonusClaimableUSDT",
        args: [coinbase ?? window.config.ZERO_ADDRESS],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "withdrawableUSDT",
        args: [coinbase ?? window.config.ZERO_ADDRESS],
        chainId: bsc.id,
      }).catch(() => 0),
      readContract(wagmiClient, {
        address: window.config.liquidity_campaign_address,
        abi: window.LIQUIDITY_ABI,
        functionName: "totalUnits",
        args: [],
        chainId: bsc.id,
      }).catch(() => 0),
    ]);

    const userScore_formatted = new BigNumber(userScore ?? 0)
      .div(1e18)
      .toString(10);
    const totalScore_formatted = new BigNumber(totalScore ?? 0)
      .div(1e18)
      .toString(10);

    const share =
      Number(totalScore_formatted) === 0
        ? 0
        : userScore_formatted / totalScore_formatted;

    let estimatedFinalBonus = share * BONUS_POOL_USDT;
    setUserScore(userScore_formatted);
    setTotalScore(totalScore_formatted);
    setCurrentDayIndex(currentDayIndex);
    const seasonEndMiliseconds = Number(seasonEnd) * 1000;
    const seasonStart_formatted = Number(seasonStart);

    const user_totalDeposited_formatted = new BigNumber(
      user_totalDeposited ?? 0,
    )
      .div(1e18)
      .toString(10);
    const totalPoolDeposited = new BigNumber(totalUnits ?? 0)
      .div(1e18)
      .toString(10);
    const claimsAvailableLP_formatted = new BigNumber(claimsAvailableLP ?? 0)
      .div(1e18)
      .toString(10);
    const claimsAvailableBonus_formatted = new BigNumber(
      claimsAvailableBonus ?? 0,
    )
      .div(1e18)
      .toString(10);
    const withdrawableAmount_formatted = new BigNumber(withdrawableAmount ?? 0)
      .div(1e18)
      .toString(10);
    setwithdrawAmount(Number(withdrawableAmount_formatted));
    setClaimLPAmount(Number(claimsAvailableLP_formatted));
    setClaimBonusAmount(Number(claimsAvailableBonus_formatted));
    setTotalDeposited(totalPoolDeposited);
    setTotalUserDeposited(user_totalDeposited_formatted);
    setEstimatedFinalBonus(estimatedFinalBonus);
    setSeasonEnd(seasonEndMiliseconds);
  };

  const handleSwitchChainPool = async (hexChainId, chainId, options = {}) => {
    const {
      supportsBinance = true,
      binanceError = "This network is not available on Binance Wallet",
    } = options;

    try {
      await switchNetworkWagmi(parseInt(hexChainId, 16), chainId, {
        handleSwitchNetwork,
        handleSwitchChainGateWallet: null,
        handleSwitchChainBinanceWallet: null,
        coinbase,
      });
    } catch (error) {
      // Error handling is done in switchNetworkWagmi
      console.error("Network switch error:", error);

      // Show specific error for Binance wallet if network not supported
      if (
        (window.WALLET_TYPE === "binance" || window.ethereum?.isBinance) &&
        !supportsBinance &&
        binanceError &&
        window.alertify
      ) {
        window.alertify.error(binanceError);
      }
    }
  };

  const handleBNBPool = async () => {
    await handleSwitchChainPool("0x38", 56);
  };

  useEffect(() => {
    if (isConnected && coinbase && chainId === 56) {
      if (Number(amount) > maxPoolRemaining) {
        window.alertify.error(
          "Deposit amount is greater than available quota. Please add another amount.",
        );
      }
    }
  }, [amount, maxPoolRemaining, isConnected, coinbase, chainId]);

  useEffect(() => {
    document.title = "WOD Liquidity Catalyst Campaign";
    window.scrollTo(0, 0);
    fetchAprData();
  }, []);

  useEffect(() => {
    getTokenBalance();
    getAllInfo();
    fetchWeeklyClaimedData(coinbase);
    fetchSeasonUserStats(coinbase);
  }, [coinbase]);

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
          {showUserPosition && (
            <UserPositionModal onClose={() => setShowUserPosition(false)} />
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
                      <div className="text-2xl font-bold text-white">
                        {getFormattedNumber(totalAprPercent)}%
                      </div>
                      <div className="text-xs text-slate-400">
                        {getFormattedNumber(baseAprPercent)}% Base +{" "}
                        {getFormattedNumber(bonusAprPercent)}% Bonus
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Time Left</span>
                      </div>
                      {seasonEnd && (
                        <Countdown renderer={renderer} date={seasonEnd} />
                      )}
                      <div className="text-xs text-slate-400">Season Ended</div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs">Pool Status</span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        ${abbreviateNumber(MAX_POOL)}
                      </div>
                      <div className="text-xs text-slate-400">
                        {/* {(totalDeposited / 2000000) * 100}% Filled */}
                        Max Cap
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-yellow-400 mb-1">
                        <Trophy className="w-4 h-4" />
                        <span className="text-xs">Bonus Rewards</span>
                      </div>
                      <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        ${abbreviateNumber(BONUS_POOL_USDT, 0)} USDT
                      </div>
                      <div className="text-xs text-slate-400">Season Pool</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <WalletCards className="w-4 h-4" />
                        <span className="text-xs">Current Pool Status</span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        ${getFormattedNumber(totalDeposited, 2)} USDT
                      </div>
                      <div className="text-xs text-slate-400">
                        Currently deposited
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-cyan-400 mb-1">
                        <BadgeDollarSign className="w-4 h-4" />
                        <span className="text-xs">Current Bonus Rewards</span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        ${getFormattedNumber(totalDeposited / 10, 2)} USDT
                      </div>
                      <div className="text-xs text-slate-400">
                        Based on Current Pool Status
                      </div>
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
                        <div className="text-white font-bold">$90K USDT</div>
                      </div>
                      <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                        <div className="text-cyan-400 font-semibold">
                          Rank 11-50
                        </div>
                        <div className="text-white font-bold">$70K USDT</div>
                      </div>
                      <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                        <div className="text-cyan-400 font-semibold">
                          Rank 51-100
                        </div>
                        <div className="text-white font-bold">$50K USDT</div>
                      </div>
                      <div className="bg-blue-500/10 bordertw border-blue-500/20 rounded-lg p-2">
                        <div className="text-cyan-400 font-semibold">
                          Rank 101-300
                        </div>
                        <div className="text-white font-bold">$40K USDT</div>
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
                      onClick={() => setShowUserPosition(true)}
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
                        ${getFormattedNumber(totalUserDeposited, 2)}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">
                        Est. Final Rewards
                      </div>
                      <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        ${getFormattedNumber(estimatedFinalBonus, 2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Season 1 settlement breakdown (API) */}
                {isConnected && coinbase && (
                  <div className=" max-h-[300px] overflow-y-auto bg-gradient-to-br from-slate-900/80 to-slate-800/50 bordertw border-emerald-500/20 rounded-2xl p-4 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-400" />
                        Season 1 settlement
                      </span>
                      {seasonStatsLoading && (
                        <span className="text-xs text-slate-400">
                          Updating…
                        </span>
                      )}
                    </div>

                    {seasonStatsLoading && !seasonUserStats && (
                      <div className="text-xs text-slate-400 py-2">
                        Loading settlement breakdown…
                      </div>
                    )}

                    {!seasonStatsLoading && !seasonUserStats && (
                      <div className="text-xs text-slate-400 py-2">
                        No Season 1 settlement data found for this wallet.
                      </div>
                    )}

                    {seasonUserStats && (
                      <>
                        {/* {seasonUserStats.generated_at?.principal && (
                          <div className="text-[10px] text-white mb-3">
                            Principal data as of{" "}
                            {formatUtcDateTime(
                              seasonUserStats.generated_at.principal,
                            )}
                          </div>
                        )} */}

                        {seasonUserStats.principal && (
                          <div className="mb-4">
                            <div className="text-[11px] font-semibold text-white mb-2">
                              Principal breakdown
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  Deposited (USD)
                                </div>
                                <div className="font-bold text-white">
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.principal.deposited_usd,
                                    2,
                                  )}
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  Settlement (USDT)
                                </div>
                                <div className="font-bold text-cyan-300">
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.principal.settlement_usdt,
                                    2,
                                  )}
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  Stable leg (USD)
                                </div>
                                <div className="font-bold text-white">
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.principal.stable_side_usd,
                                    2,
                                  )}
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  WOD leg at exit (USD)
                                </div>
                                <div className="font-bold text-white">
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.principal
                                      .wod_exit_value_usd,
                                    2,
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 bg-slate-800/50 rounded-lg p-3 bordertw border-white/5">
                              <div className="flex items-start gap-2 text-xs text-slate-300">
                                <TrendingDown className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-slate-400">
                                    WOD-side vs entry notional (pool IL and
                                    price move):{" "}
                                  </span>
                                  <span
                                    className={`font-semibold ${
                                      Number(
                                        seasonUserStats.principal
                                          .wod_entry_side_usd ?? 0,
                                      ) -
                                        Number(
                                          seasonUserStats.principal
                                            .wod_exit_value_usd ?? 0,
                                        ) >=
                                      0
                                        ? "text-rose-300"
                                        : "text-emerald-300"
                                    }`}
                                  >
                                    {Number(
                                      seasonUserStats.principal
                                        .wod_entry_side_usd ?? 0,
                                    ) -
                                      Number(
                                        seasonUserStats.principal
                                          .wod_exit_value_usd ?? 0,
                                      ) >=
                                    0
                                      ? "−"
                                      : "+"}
                                    $
                                    {getFormattedNumber(
                                      Math.abs(
                                        Number(
                                          seasonUserStats.principal
                                            .wod_entry_side_usd ?? 0,
                                        ) -
                                          Number(
                                            seasonUserStats.principal
                                              .wod_exit_value_usd ?? 0,
                                          ),
                                      ),
                                      2,
                                    )}
                                  </span>
                                  <span className="text-slate-500">
                                    {" "}
                                    (entry notional{" "}
                                    <span className="text-slate-400">
                                      $
                                      {getFormattedNumber(
                                        seasonUserStats.principal
                                          .wod_entry_side_usd,
                                        2,
                                      )}
                                    </span>{" "}
                                    → exit value{" "}
                                    <span className="text-slate-400">
                                      $
                                      {getFormattedNumber(
                                        seasonUserStats.principal
                                          .wod_exit_value_usd,
                                        2,
                                      )}
                                    </span>
                                    )
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap justify-between gap-2 text-xs">
                                <span className="text-slate-400">
                                  Principal PnL
                                </span>
                                <span
                                  className={
                                    Number(
                                      seasonUserStats.principal.pnl_usdt,
                                    ) >= 0
                                      ? "font-bold text-emerald-400"
                                      : "font-bold text-rose-400"
                                  }
                                >
                                  {Number(seasonUserStats.principal.pnl_usdt) >=
                                  0
                                    ? "+"
                                    : ""}
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.principal.pnl_usdt,
                                    2,
                                  )}{" "}
                                  (
                                  {Number(
                                    seasonUserStats.principal.pnl_percent,
                                  ) >= 0
                                    ? "+"
                                    : ""}
                                  {getFormattedNumber(
                                    seasonUserStats.principal.pnl_percent,
                                    2,
                                  )}
                                  %)
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {(seasonUserStats.exit_date_utc ||
                          seasonUserStats.exit_wod_price != null) && (
                          <div className="flex flex-wrap gap-3 mb-4 text-[11px] text-slate-400">
                            {seasonUserStats.exit_date_utc && (
                              <span>
                                Exit date:{" "}
                                <span className="text-slate-200">
                                  {formatUtcDateTime(
                                    seasonUserStats.exit_date_utc,
                                  )}
                                </span>
                              </span>
                            )}
                            {seasonUserStats.exit_wod_price != null && (
                              <span>
                                Pool exit WOD price:{" "}
                                <span className="text-slate-200">
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.exit_wod_price,
                                    6,
                                  )}
                                </span>
                              </span>
                            )}
                          </div>
                        )}

                        {(seasonUserStats.claims ||
                          seasonUserStats.lp_rewards) && (
                          <div className="mb-4">
                            <div className="text-[11px] font-semibold text-emerald-400 mb-2">
                              Claims & weekly LP rewards
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-emerald-500/5 rounded-lg p-2 bordertw border-emerald-500/15">
                                <div className="text-slate-400 mb-0.5">
                                  LP fees claimed (USDT)
                                </div>
                                <div className="font-bold text-emerald-300">
                                  $
                                  {getFormattedNumber(
                                    Number(
                                      seasonUserStats.claims
                                        ?.lp_fees_claimed_usdt ??
                                        seasonUserStats.lp_rewards
                                          ?.claimed_usdt ??
                                        0,
                                    ),
                                    2,
                                  )}
                                </div>
                                {seasonUserStats.lp_rewards?.claims_count !=
                                  null && (
                                  <div className="text-[10px] text-slate-500 mt-0.5">
                                    {seasonUserStats.lp_rewards.claims_count}{" "}
                                    claim
                                    {Number(
                                      seasonUserStats.lp_rewards.claims_count,
                                    ) === 1
                                      ? ""
                                      : "s"}
                                  </div>
                                )}
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  Total claimed / withdrawn (USDT)
                                </div>
                                <div className="font-bold text-white">
                                  $
                                  {getFormattedNumber(
                                    Number(
                                      seasonUserStats.claims != null
                                        ? (seasonUserStats.claims
                                            .total_claimed_and_withdrawn_usdt ??
                                          0)
                                        : (seasonUserStats.lp_rewards
                                            ?.claimed_usdt ?? 0),
                                    ),
                                    2,
                                  )}
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  Bonus claimed (USDT)
                                </div>
                                <div className="font-bold text-yellow-200">
                                  $
                                  {getFormattedNumber(
                                    Number(
                                      seasonUserStats.claims
                                        ?.bonus_claimed_usdt ?? 0,
                                    ),
                                    2,
                                  )}
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  Principal withdrawn (USDT)
                                </div>
                                <div className="font-bold text-cyan-200">
                                  $
                                  {getFormattedNumber(
                                    Number(
                                      seasonUserStats.claims
                                        ?.principal_withdrawn_usdt ?? 0,
                                    ),
                                    2,
                                  )}
                                </div>
                              </div>
                              {Number(
                                seasonUserStats.claims
                                  ?.emergency_principal_withdrawn_usdt ?? 0,
                              ) > 0 && (
                                <div className="bg-white/5 rounded-lg p-2 col-span-2">
                                  <div className="text-slate-400 mb-0.5">
                                    Emergency principal withdrawn (USDT)
                                  </div>
                                  <div className="font-bold text-orange-300">
                                    $
                                    {getFormattedNumber(
                                      Number(
                                        seasonUserStats.claims
                                          ?.emergency_principal_withdrawn_usdt ??
                                          0,
                                      ),
                                      2,
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            {seasonUserStats.lp_rewards?.rank != null && (
                              <div className="text-[10px] text-slate-400 mt-2">
                                LP rewards leaderboard rank: #
                                {seasonUserStats.lp_rewards.rank}
                              </div>
                            )}
                            {Array.isArray(seasonUserStats.lp_rewards?.claims) &&
                              seasonUserStats.lp_rewards.claims.length > 0 && (
                                <div className="mt-3 pt-2 border-t border-white/10">
                                  <div className="text-[10px] font-semibold text-slate-400 mb-2">
                                    LP fee claim history
                                  </div>
                                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1 text-[10px]">
                                    {seasonUserStats.lp_rewards.claims.map(
                                      (c, idx) => (
                                        <div
                                          key={
                                            c.tx_hash ??
                                            `${c.block_number}-${idx}`
                                          }
                                          className="flex flex-wrap items-baseline justify-between gap-2 bg-slate-800/40 rounded-md px-2 py-1.5"
                                        >
                                          <div className="text-slate-300 min-w-0">
                                            <span className="text-emerald-400 font-semibold">
                                              $
                                              {getFormattedNumber(
                                                Number(c.amount_usdt ?? 0),
                                                4,
                                              )}
                                            </span>
                                            <span className="text-slate-500 mx-1">
                                              ·
                                            </span>
                                            <span className="text-slate-400">
                                              {formatClaimsUtcDateTime(
                                                c.datetime_utc,
                                              )}
                                            </span>
                                          </div>
                                          {c.tx_hash && (
                                            <a
                                              href={`https://bscscan.com/tx/${c.tx_hash}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-cyan-400 hover:text-cyan-300 shrink-0"
                                            >
                                              Tx
                                            </a>
                                          )}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        )}

                        {seasonUserStats.totals && (
                          <div className="mb-4">
                            <div className="text-[11px] font-semibold text-white mb-1">
                              Totals
                            </div>
                            <p className="text-[10px] text-slate-400 mb-2 leading-snug">
                              Pending total is pending principal plus pending
                              bonus. Total payout is that amount plus LP fees
                              already claimed. Realized (USDT) is LP fees
                              claimed to date.
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {seasonUserStats.totals.deposited_usd != null && (
                                <div className="bg-white/5 rounded-lg p-2">
                                  <div className="text-slate-400 mb-0.5">
                                    Deposited (USD)
                                  </div>
                                  <div className="font-bold text-white">
                                    $
                                    {getFormattedNumber(
                                      seasonUserStats.totals.deposited_usd,
                                      2,
                                    )}
                                  </div>
                                </div>
                              )}
                              {(seasonUserStats.totals.realized_usdt != null ||
                                seasonUserStats.lp_rewards?.claimed_usdt !=
                                  null) && (
                                <div className="bg-emerald-500/5 rounded-lg p-2 bordertw border-emerald-500/15">
                                  <div className="text-slate-400 mb-0.5">
                                    Realized — LP fees (USDT)
                                  </div>
                                  <div className="font-bold text-emerald-300">
                                    $
                                    {getFormattedNumber(
                                      Number(
                                        seasonUserStats.totals
                                          .realized_usdt ??
                                          seasonUserStats.lp_rewards
                                            ?.claimed_usdt ??
                                          0,
                                      ),
                                      2,
                                    )}
                                  </div>
                                </div>
                              )}
                              {seasonUserStats.totals.pending_principal_usdt !=
                                null && (
                                <div className="bg-white/5 rounded-lg p-2">
                                  <div className="text-slate-400 mb-0.5">
                                    Pending principal (USDT)
                                  </div>
                                  <div className="font-bold text-cyan-200">
                                    $
                                    {getFormattedNumber(
                                      seasonUserStats.totals
                                        .pending_principal_usdt,
                                      2,
                                    )}
                                  </div>
                                </div>
                              )}
                              {seasonUserStats.totals.pending_bonus_usdt !=
                                null && (
                                <div className="bg-white/5 rounded-lg p-2">
                                  <div className="text-slate-400 mb-0.5">
                                    Pending bonus (USDT)
                                  </div>
                                  <div className="font-bold text-yellow-200">
                                    $
                                    {getFormattedNumber(
                                      seasonUserStats.totals.pending_bonus_usdt,
                                      2,
                                    )}
                                  </div>
                                </div>
                              )}
                              {seasonUserStats.totals.pending_total_usdt !=
                                null && (
                                <div className="bg-white/5 rounded-lg p-2 col-span-2">
                                  <div className="text-slate-400 mb-0.5">
                                    Pending total — principal + bonus (USDT)
                                  </div>
                                  <div className="font-bold text-white">
                                    $
                                    {getFormattedNumber(
                                      seasonUserStats.totals.pending_total_usdt,
                                      2,
                                    )}
                                  </div>
                                </div>
                              )}
                              <div className="bg-white/5 rounded-lg p-2 col-span-2">
                                <div className="text-slate-400 mb-0.5">
                                  Total payout — pending + LP fees (USDT)
                                </div>
                                <div className="font-bold text-white">
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.totals.total_payout_usdt,
                                    2,
                                  )}
                                </div>
                              </div>
                              <div className="bg-white/5 rounded-lg p-2">
                                <div className="text-slate-400 mb-0.5">
                                  Net PnL
                                </div>
                                <div className="font-bold text-white">
                                  {Number(
                                    seasonUserStats.totals.net_pnl_usdt,
                                  ) >= 0
                                    ? "+"
                                    : ""}
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.totals.net_pnl_usdt,
                                    2,
                                  )}
                                </div>
                                <div className="text-[10px] text-white mt-0.5">
                                  (
                                  {Number(
                                    seasonUserStats.totals.net_pnl_percent,
                                  ) >= 0
                                    ? "+"
                                    : ""}
                                  {getFormattedNumber(
                                    seasonUserStats.totals.net_pnl_percent,
                                    2,
                                  )}
                                  %)
                                </div>
                              </div>
                              {seasonUserStats.totals.net_pnl_excl_lp_usdt !=
                                null && (
                                <div className="bg-white/5 rounded-lg p-2">
                                  <div className="text-slate-400 mb-0.5">
                                    Net PnL excl. LP
                                  </div>
                                  <div className="font-bold text-white">
                                    {Number(
                                      seasonUserStats.totals
                                        .net_pnl_excl_lp_usdt,
                                    ) >= 0
                                      ? "+"
                                      : ""}
                                    $
                                    {getFormattedNumber(
                                      seasonUserStats.totals
                                        .net_pnl_excl_lp_usdt,
                                      2,
                                    )}
                                  </div>
                                  <div className="text-[10px] text-white mt-0.5">
                                    (
                                    {Number(
                                      seasonUserStats.totals
                                        .net_pnl_excl_lp_percent,
                                    ) >= 0
                                      ? "+"
                                      : ""}
                                    {getFormattedNumber(
                                      seasonUserStats.totals
                                        .net_pnl_excl_lp_percent,
                                      2,
                                    )}
                                    %)
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {seasonUserStats.bonus && (
                          <div className="mb-4">
                            <div className="text-[11px] font-semibold text-yellow-400 mb-2">
                              Bonus pool share
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-yellow-500/5 rounded-lg p-2 bordertw border-yellow-500/10">
                                <div className="text-slate-400 mb-0.5">
                                  Bonus (USDT)
                                </div>
                                <div className="font-bold text-yellow-300">
                                  $
                                  {getFormattedNumber(
                                    seasonUserStats.bonus.bonus_usdt,
                                    2,
                                  )}
                                </div>
                              </div>
                              <div className="bg-yellow-500/5 rounded-lg p-2 bordertw border-yellow-500/10">
                                <div className="text-slate-400 mb-0.5">
                                  Share / Rank
                                </div>
                                <div className="font-bold text-white">
                                  {getFormattedNumber(
                                    seasonUserStats.bonus.bonus_share_percent,
                                    2,
                                  )}
                                  % · #{seasonUserStats.bonus.rank ?? "—"}
                                </div>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2">
                              Campaign score is used internally for bonus
                              allocation only.
                            </p>
                          </div>
                        )}

                        {Array.isArray(seasonUserStats.deposits) &&
                          seasonUserStats.deposits.length > 0 && (
                            <div>
                              <div className="text-[11px] font-semibold text-slate-300 mb-2">
                                Per deposit
                              </div>
                              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                                {seasonUserStats.deposits.map((d) => {
                                  const wodLegDelta =
                                    Number(d.wod_entry_side_usd ?? 0) -
                                    Number(d.wod_exit_value_usd ?? 0);
                                  return (
                                    <div
                                      key={`${d.deposit_index}-${d.timestamp ?? d.date_utc}`}
                                      className="bg-slate-800/40 rounded-lg p-3 bordertw border-white/5 text-xs"
                                    >
                                      <div className="flex justify-between gap-2 mb-2">
                                        <span className="text-slate-400">
                                          Deposit #{d.deposit_index + 1} ·{" "}
                                          {stableSymbolForToken(d.token)}
                                        </span>
                                        <span className="text-slate-400">
                                          {formatUtcDateTime(d.date_utc)}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <span className="text-slate-400">
                                            Deposited
                                          </span>
                                          <div className="font-semibold text-white">
                                            $
                                            {getFormattedNumber(
                                              d.deposited_usd,
                                              2,
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <span className="text-slate-400">
                                            Settlement
                                          </span>
                                          <div className="font-semibold text-cyan-300">
                                            $
                                            {getFormattedNumber(
                                              d.settlement_usdt,
                                              2,
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <span className="text-slate-400">
                                            Entry WOD price
                                          </span>
                                          <div className="font-semibold text-white">
                                            $
                                            {getFormattedNumber(
                                              d.entry_wod_price,
                                              6,
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <span className="text-slate-400">
                                            Exit WOD price
                                          </span>
                                          <div className="font-semibold text-white">
                                            $
                                            {getFormattedNumber(
                                              d.exit_wod_price,
                                              6,
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <span className="text-slate-400">
                                            WOD amount (entry)
                                          </span>
                                          <div className="font-semibold text-slate-300">
                                            {getFormattedNumber(
                                              d.wod_amount_at_entry,
                                              2,
                                            )}{" "}
                                            WOD
                                          </div>
                                        </div>
                                        <div>
                                          <span className="text-slate-400">
                                            Day / remaining
                                          </span>
                                          <div className="font-semibold text-slate-300">
                                            {d.day_index ?? "—"} /{" "}
                                            {d.days_remaining ?? "—"} days
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between gap-2">
                                        <span className="text-slate-400">
                                          WOD-side vs entry notional
                                        </span>
                                        <span
                                          className={`font-semibold ${
                                            wodLegDelta >= 0
                                              ? "text-orange-300"
                                              : "text-emerald-300"
                                          }`}
                                        >
                                          {wodLegDelta >= 0 ? "−" : "+"}$
                                          {getFormattedNumber(
                                            Math.abs(wodLegDelta),
                                            2,
                                          )}
                                        </span>
                                      </div>
                                      <div className="mt-1 flex justify-between gap-2">
                                        <span className="text-slate-400">
                                          Deposit PnL
                                        </span>
                                        <span
                                          className={
                                            Number(d.pnl_usdt) >= 0
                                              ? "text-emerald-400 font-semibold"
                                              : "text-orange-400 font-semibold"
                                          }
                                        >
                                          {Number(d.pnl_usdt) >= 0 ? "+" : ""}$
                                          {getFormattedNumber(d.pnl_usdt, 2)} (
                                          {Number(d.pnl_percent) >= 0
                                            ? "+"
                                            : ""}
                                          {getFormattedNumber(d.pnl_percent, 2)}
                                          %)
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        {/* {seasonUserStats.pool && (
                          <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-slate-400 space-y-1">
                            <div>
                              Pool snapshot:{" "}
                              {seasonUserStats.pool.users_count ?? "—"} users ·
                              bonus pool $
                              {getFormattedNumber(
                                seasonUserStats.pool.bonus_pool_usdt,
                                0,
                              )}{" "}
                              USDT
                            </div>
                          </div>
                        )} */}
                      </>
                    )}
                  </div>
                )}

                {/* Claim Bonus / Withdraw / Claim Weekly Tabs */}
                <div className="h-100 bg-gradient-to-br from-slate-900/80 to-slate-800/50 bordertw border-cyan-500/30 rounded-2xl p-6 backdrop-blur-xl">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setActiveTab("claim")}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold text-xs transition-all ${
                        activeTab === "claim"
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 bordertw border-blue-400/30 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/5 text-slate-400 bordertw border-white/10 hover:bg-white/10"
                      }`}
                    >
                      Claim
                    </button>
                    <button
                      onClick={() => setActiveTab("withdraw")}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold text-xs transition-all ${
                        activeTab === "withdraw"
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 bordertw border-blue-400/30 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white/5 text-slate-400 bordertw border-white/10 hover:bg-white/10"
                      }`}
                    >
                      Withdraw
                    </button>
                  </div>

                  {/* Withdraw Principal Tab */}
                  {activeTab === "withdraw" && (
                    <>
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 bordertw border-cyan-500/30 rounded-lg p-4 mb-3 flex items-center gap-2 justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Wallet className="w-4 h-4" />
                            <span className="text-xs font-semibold">
                              Withdrawable Principal
                            </span>
                          </div>
                          <div className="text-3xl font-bold text-white">
                            {getFormattedNumber(withdrawAmount, 4)} USDT
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Total principal returned to your wallet
                          </div>
                        </div>
                        {isConnected && coinbase && chainId === 56 && (
                          <button
                            onClick={handleWithdrawPrincipal}
                            disabled={
                              !(
                                Date.now() >= Number(seasonEnd) &&
                                Number(withdrawAmount) > 0
                              ) || withdrawLoading
                            }
                            className={`${
                              withdrawStatus === "initial" &&
                              Number(withdrawAmount) > 0
                                ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                                : withdrawStatus === "initial" &&
                                    Number(withdrawAmount) === 0
                                  ? "bg-white/5 text-slate-400 bordertw border-white/10 hover:bg-white/10 cursor-not-allowed"
                                  : withdrawStatus === "success"
                                    ? "bg-gradient-to-r from-brandBlue to-brandCyan hover:from-blue-700 hover:to-cyan-600"
                                    : "d-flex align-items-center gap-2 justify-content-center bg-gradient-to-r from-amber-800 to-amber-1000 hover:from-orange-400 hover:to-orange-500"
                            }  px-4 py-2 text-lg disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 font-semibold`}
                          >
                            {withdrawLoading ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : withdrawStatus === "success" ? (
                              <>Success</>
                            ) : withdrawStatus === "failed" ? (
                              <>
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/failMark.svg"
                                  }
                                  alt=""
                                />
                                Failed
                              </>
                            ) : (
                              <>Withdraw</>
                            )}
                          </button>
                        )}

                        {!isConnected && !coinbase && (
                        <button
                          onClick={handleConnection}
                          className="px-4 py-2 text-lg bg-gradient-to-r from-brandBlue to-brandCyan line-height-inherit hover:from-blue-700 hover:to-cyan-600 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 font-semibold"
                        >
                          Connect Wallet
                        </button>
                      )}
                      {isConnected && coinbase && chainId !== 56 && (
                        <button
                          onClick={handleBNBPool}
                          className="px-4 py-2 text-lg bg-gradient-to-r from-amber-800 to-amber-1000 hover:from-orange-400 hover:to-orange-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 font-semibold"
                        >
                          Switch to BNB Chain
                        </button>
                      )}

                      </div>

                      <div className="bg-slate-800/40 bordertw border-white/10 rounded-lg p-3 mb-3 text-xs text-slate-300">
                        The campaign has ended. You will be able to withdraw
                        your full principal deposit soon.
                      </div>

                      
                      {errorMsg4 && (
                        <div className="mt-2 text-xs text-red-400 text-center">
                          {errorMsg4}
                        </div>
                      )}
                    </>
                  )}

                  {/* Claim Tab (Bonus + Weekly History) */}
                  {activeTab === "claim" && (
                    <>
                      {/* Claim LP Rewards section */}
                      {/* <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 bordertw border-green-500/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 text-green-400 mb-2">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Total LP Rewards
                              </span>
                            </div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              {getFormattedNumber(claimLPAmount, 4)} USDT
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              Available from weekly LP rewards
                            </div>
                          </div>
                          {isConnected && coinbase && chainId === 56 && (
                            <button
                              onClick={handleClaim}
                              disabled={
                                Number(claimLPAmount) <= 0 || claimLoading
                              }
                              className={`${
                                claimStatus === "initial" &&
                                Number(claimLPAmount) > 0
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                  : claimStatus === "initial" &&
                                      Number(claimLPAmount) === 0
                                    ? "bg-white/5 text-slate-400 bordertw border-white/10 hover:bg-white/10 cursor-not-allowed"
                                    : claimStatus === "success"
                                      ? "bg-gradient-to-r from-brandBlue to-brandCyan hover:from-blue-700 hover:to-cyan-600"
                                      : "d-flex align-items-center gap-2 justify-content-center bg-gradient-to-r from-amber-800 to-amber-1000 hover:from-orange-400 hover:to-orange-500"
                              } px-4 py-2 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-green-500/30`}
                            >
                              {claimLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : claimStatus === "success" ? (
                                <>Success</>
                              ) : claimStatus === "failed" ? (
                                <>
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/failMark.svg"
                                    }
                                    alt=""
                                  />
                                  Failed
                                </>
                              ) : (
                                <>Claim</>
                              )}
                            </button>
                          )}
                          {!isConnected && !coinbase && (
                            <button
                              onClick={handleConnection}
                              className="px-4 py-2 bg-gradient-to-r from-brandBlue to-brandCyan hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-blue-500/30"
                            >
                              Connect Wallet
                            </button>
                          )}
                          {isConnected && coinbase && chainId !== 56 && (
                            <button
                              onClick={handleBNBPool}
                              className="px-4 py-2 bg-gradient-to-r from-amber-800 to-amber-1000 hover:from-orange-400 hover:to-orange-500 text-white rounded-lg text-xs font-semibold transition-all shadow-lg"
                            >
                              Switch Network
                            </button>
                          )}
                        </div>
                        {errorMsg2 && (
                          <div className="mt-2 text-xs text-red-400">
                            {errorMsg2}
                          </div>
                        )}
                      </div>
                      <div className="bg-slate-800/40 bordertw border-white/10 rounded-lg p-3 mb-3 text-xs text-slate-300">
                        The campaign has ended. You will be able to claim your
                        bonus rewards soon.
                      </div> */}

                      {/* Claim Bonus section */}
                      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 bordertw border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 text-yellow-400 mb-2">
                              <Trophy className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Final Bonus Rewards
                              </span>
                            </div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                              {getFormattedNumber(claimBonusAmount, 4)} USDT
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              Available from the season bonus rewards pool
                            </div>
                          </div>
                          {isConnected && coinbase && chainId === 56 && (
                            <button
                              onClick={handleClaimBonus}
                              disabled={
                                !(
                                  Date.now() >= Number(seasonEnd) &&
                                  Number(claimBonusAmount) > 0
                                ) || claimBonusLoading
                              }
                              className={`${
                                claimBonusStatus === "initial" &&
                                Number(claimBonusAmount) > 0
                                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                                  : claimBonusStatus === "initial" &&
                                      Number(claimBonusAmount) === 0
                                    ? "bg-white/5 text-slate-400 bordertw border-white/10 hover:bg-white/10 cursor-not-allowed"
                                    : claimBonusStatus === "success"
                                      ? "bg-gradient-to-r from-brandBlue to-brandCyan hover:from-blue-700 hover:to-cyan-600"
                                      : "d-flex align-items-center gap-2 justify-content-center bg-gradient-to-r from-amber-800 to-amber-1000 hover:from-orange-400 hover:to-orange-500"
                              } px-4 py-2 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-yellow-500/30`}
                            >
                              {claimBonusLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : claimBonusStatus === "success" ? (
                                <>Success</>
                              ) : claimBonusStatus === "failed" ? (
                                <>
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/failMark.svg"
                                    }
                                    alt=""
                                  />
                                  Failed
                                </>
                              ) : (
                                <>Claim</>
                              )}
                            </button>
                          )}
                          {!isConnected && !coinbase && (
                            <button
                              onClick={handleConnection}
                              className="px-4 py-2 bg-gradient-to-r from-brandBlue to-brandCyan hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-blue-500/30"
                            >
                              Connect Wallet
                            </button>
                          )}
                          {isConnected && coinbase && chainId !== 56 && (
                            <button
                              onClick={handleBNBPool}
                              className="px-4 py-2 bg-gradient-to-r from-amber-800 to-amber-1000 hover:from-orange-400 hover:to-orange-500 text-white rounded-lg text-xs font-semibold transition-all shadow-lg"
                            >
                              Switch Network
                            </button>
                          )}
                        </div>
                        {errorMsg3 && (
                          <div className="mt-2 text-xs text-red-400">
                            {errorMsg3}
                          </div>
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
                By participating, you acknowledge all risks and agree to the
                terms. •{" "}
                <span
                  className="text-decoration-underline cursor-pointer"
                  onClick={() => {
                    setShowDisclaimer(true);
                  }}
                >
                  Terms and conditions
                </span>{" "}
                •
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LiquidityComp;
