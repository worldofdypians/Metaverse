import { useState, useEffect } from "react";
import "./whitelist.css";
import { switchNetworkWagmi } from "../../utils/wagmiSwitchChain";
import { readContractData, formatTokenAmount } from "./contractHelpers";

import {
  VESTING_ABI,
  VESTING_SPECIAL_ABI,
  KOL_ABI,
  PRIVATE_ABI,
  ADVISORS_ABI,
  OTC_ABI,
  blockedAccounts,
  specialWallets,
  specialWalletsSeed,
  OTC2_ABI,
  OTCBONUS_ABI,
  OTCSPECIAL_ABI,
  OTCSPECIAL4_ABI,
  OTCPOOLBONUS_ABI,
  OTCPOOLDYNAMIC_ABI,
  OTCPOOL2DYNAMIC_ABI,
  OTCWODDYNAMIC_ABI,
  OTCCLIFF_ABI,
  OTC1CLIFF4_ABI,
  OTCCLIFF2_ABI,
  ROUNDOTC_VESTING_ABI,
  DYPIANSVESTING_ABI
} from "./abis";
import WhitelistHero from "./WhitelistHero/WhitelistHero";
import WhitelistContent from "./WhitelistContent/WhitelistContent";
import StakingBanner from "../Release/StakingBanner/StakingBanner";

// const renderer2 = ({ hours, minutes }) => {
//   return (
//     <h6 className="timer-text mb-0">
//       {hours}h:{minutes}m
//     </h6>
//   );
// };

const Whitelist = ({
  isEOA,
  chainId,
  isConnected,
  handleConnection,
  coinbase,
  handleSwitchNetwork,
  type,
  network_matchain,
  walletClient,
  publicClient,
  wagmiWalletClient,
  wagmiPublicClient,
}) => {
  const [cliffTime, setcliffTime] = useState(0);
  const [cliffTimePrivate, setcliffTimePrivate] = useState(0);
  const [cliffTimeKol, setcliffTimeKol] = useState(0);
  const [cliffTimeAdvisors, setcliffTimeAdvisors] = useState(0);
  const [cliffTimeOtc, setcliffTimeOtc] = useState(0);
  const [cliffTimeOtc2, setcliffTimeOtc2] = useState(0);

  const [cliffTimeOtcBonus, setcliffTimeOtcBonus] = useState(0);
  const [cliffTimeOtcSpecial, setcliffTimeOtcSpecial] = useState(0);
  const [cliffTimeOtcSpecial4, setcliffTimeOtcSpecial4] = useState(0);
  const [cliffTimeOtcCliff, setcliffTimeOtcCliff] = useState(0);
  const [cliffTimeOtcCliff2, setcliffTimeOtcCliff2] = useState(0);
  const [cliffTimeOtc1Cliff4, setcliffTimeOtc1Cliff4] = useState(0);
  const [cliffTimeRoundOtcVesting, setcliffTimeRoundOtcVesting] = useState(0);
  const [cliffTimeDypiansVesting, setcliffTimeDypiansVesting] = useState(0);

  const [cliffTimeOtcPoolBonus, setcliffTimeOtcPoolBonus] = useState(0);
  const [cliffTimeOtcPoolDynamic, setcliffTimeOtcPoolDynamic] = useState(0);
  const [cliffTimeOtcPool2Dynamic, setcliffTimeOtcPool2Dynamic] = useState(0);
  const [cliffTimeOtcWodDynamic, setcliffTimeOtcWodDynamic] = useState(0);

  const [releaseProcent, setreleaseProcent] = useState(0);
  const [pendingTokens, setpendingTokens] = useState(0);
  const [userClaimedTokens, setuserClaimedTokens] = useState(0);
  const [userVestedTokens, setuserVestedTokens] = useState(0);

  const [pendingTokensOTC, setpendingTokensOTC] = useState(0);
  const [userClaimedTokensOTC, setuserClaimedTokensOTC] = useState(0);
  const [userVestedTokensOTC, setuserVestedTokensOTC] = useState(0);

  const [pendingTokensOTC2, setpendingTokensOTC2] = useState(0);
  const [userClaimedTokensOTC2, setuserClaimedTokensOTC2] = useState(0);
  const [userVestedTokensOTC2, setuserVestedTokensOTC2] = useState(0);

  const [pendingTokensOTCSpecial, setpendingTokensOTCSpecial] = useState(0);
  const [userClaimedTokensOTCSpecial, setuserClaimedTokensOTCSpecial] =
    useState(0);
  const [userVestedTokensOTCSpecial, setuserVestedTokensOTCSpecial] =
    useState(0);

  const [pendingTokensOTCSpecial4, setpendingTokensOTCSpecial4] = useState(0);
  const [userClaimedTokensOTCSpecial4, setuserClaimedTokensOTCSpecial4] =
    useState(0);
  const [userVestedTokensOTCSpecial4, setuserVestedTokensOTCSpecial4] =
    useState(0);

  const [pendingTokensOTCCliff, setpendingTokensOTCCliff] = useState(0);
  const [userClaimedTokensOTCCliff, setuserClaimedTokensOTCCliff] = useState(0);
  const [userVestedTokensOTCCliff, setuserVestedTokensOTCCliff] = useState(0);

  const [pendingTokensOTC1Cliff4, setpendingTokensOTC1Cliff4] = useState(0);
  const [userClaimedTokensOTC1Cliff4, setuserClaimedTokensOTC1Cliff4] =
    useState(0);
  const [userVestedTokensOTC1Cliff4, setuserVestedTokensOTC1Cliff4] =
    useState(0);

  const [pendingTokensRoundOtcVesting, setpendingTokensRoundOtcVesting] =
    useState(0);
  const [
    userClaimedTokensRoundOtcVesting,
    setuserClaimedTokensRoundOtcVesting,
  ] = useState(0);
  const [userVestedTokensRoundOtcVesting, setuserVestedTokensRoundOtcVesting] =
    useState(0);

    const [pendingTokensDypiansVesting, setpendingTokensDypiansVesting] =
    useState(0);
  const [
    userClaimedTokensDypiansVesting,
    setuserClaimedTokensDypiansVesting,
  ] = useState(0);
  const [userVestedTokensDypiansVesting, setuserVestedTokensDypiansVesting] =
    useState(0);

  const [pendingTokensOTCCliff2, setpendingTokensOTCCliff2] = useState(0);
  const [userClaimedTokensOTCCliff2, setuserClaimedTokensOTCCliff2] =
    useState(0);
  const [userVestedTokensOTCCliff2, setuserVestedTokensOTCCliff2] = useState(0);

  const [pendingTokensOTCPoolBonus, setpendingTokensOTCPoolBonus] = useState(0);
  const [userClaimedTokensOTCPoolBonus, setuserClaimedTokensOTCPoolBonus] =
    useState(0);
  const [userVestedTokensOTCPoolBonus, setuserVestedTokensOTCPoolBonus] =
    useState(0);

  const [pendingTokensOTCPoolDynamic, setpendingTokensOTCPoolDynamic] =
    useState(0);
  const [userClaimedTokensOTCPoolDynamic, setuserClaimedTokensOTCPoolDynamic] =
    useState(0);
  const [userVestedTokensOTCPoolDynamic, setuserVestedTokensOTCPoolDynamic] =
    useState(0);

  const [pendingTokensOTCPool2Dynamic, setpendingTokensOTCPool2Dynamic] =
    useState(0);
  const [
    userClaimedTokensOTCPool2Dynamic,
    setuserClaimedTokensOTCPool2Dynamic,
  ] = useState(0);
  const [userVestedTokensOTCPool2Dynamic, setuserVestedTokensOTCPool2Dynamic] =
    useState(0);

  const [pendingTokensOTCWodDynamic, setpendingTokensOTCWodDynamic] =
    useState(0);
  const [userClaimedTokensOTCWodDynamic, setuserClaimedTokensOTCWodDynamic] =
    useState(0);
  const [userVestedTokensOTCWodDynamic, setuserVestedTokensOTCWodDynamic] =
    useState(0);

  const [pendingTokensOTCBonus, setpendingTokensOTCBonus] = useState(0);
  const [userClaimedTokensOTCBonus, setuserClaimedTokensOTCBonus] = useState(0);
  const [userVestedTokensOTCBonus, setuserVestedTokensOTCBonus] = useState(0);

  const [pendingTokensPrivate, setpendingTokensPrivate] = useState(0);
  const [userClaimedTokensPrivate, setuserClaimedTokensPrivate] = useState(0);
  const [userVestedTokensPrivate, setuserVestedTokensPrivate] = useState(0);

  const [pendingTokensKOL, setpendingTokensKOL] = useState(0);
  const [userClaimedTokensKOL, setuserClaimedTokensKOL] = useState(0);
  const [userVestedTokensKOL, setuserVestedTokensKOL] = useState(0);

  const [pendingTokensAdvisors, setpendingTokensAdvisors] = useState(0);
  const [userClaimedTokensAdvisors, setuserClaimedTokensAdvisors] = useState(0);
  const [userVestedTokensAdvisors, setuserVestedTokensAdvisors] = useState(0);

  const [startedVesting, setstartedVesting] = useState(false);

  const [canClaim, setcanClaim] = useState(false);
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");

  const [canClaimOTC, setcanClaimOTC] = useState(false);
  const [claimLoadingOTC, setclaimLoadingOTC] = useState(false);
  const [claimStatusOTC, setclaimStatusOTC] = useState("initial");

  const [canClaimOTC2, setcanClaimOTC2] = useState(false);
  const [claimLoadingOTC2, setclaimLoadingOTC2] = useState(false);
  const [claimStatusOTC2, setclaimStatusOTC2] = useState("initial");

  const [canClaimOTCBonus, setcanClaimOTCBonus] = useState(false);
  const [claimLoadingOTCBonus, setclaimLoadingOTCBonus] = useState(false);
  const [claimStatusOTCBonus, setclaimStatusOTCBonus] = useState("initial");

  const [canClaimOTCSpecial, setcanClaimOTCSpecial] = useState(false);
  const [claimLoadingOTCSpecial, setclaimLoadingOTCSpecial] = useState(false);
  const [claimStatusOTCSpecial, setclaimStatusOTCSpecial] = useState("initial");

  const [canClaimOTCSpecial4, setcanClaimOTCSpecial4] = useState(false);
  const [claimLoadingOTCSpecial4, setclaimLoadingOTCSpecial4] = useState(false);
  const [claimStatusOTCSpecial4, setclaimStatusOTCSpecial4] =
    useState("initial");

  const [canClaimOTCCliff, setcanClaimOTCCliff] = useState(false);
  const [claimLoadingOTCCliff, setclaimLoadingOTCCliff] = useState(false);
  const [claimStatusOTCCliff, setclaimStatusOTCCliff] = useState("initial");

  const [canClaimOTC1Cliff4, setcanClaimOTC1Cliff4] = useState(false);
  const [claimLoadingOTC1Cliff4, setclaimLoadingOTC1Cliff4] = useState(false);
  const [claimStatusOTC1Cliff4, setclaimStatusOTC1Cliff4] = useState("initial");

  const [canClaimRoundOtcVesting, setcanClaimRoundOtcVesting] = useState(false);
  const [claimLoadingRoundOtcVesting, setclaimLoadingRoundOtcVesting] =
    useState(false);
  const [claimStatusRoundOtcVesting, setclaimStatusRoundOtcVesting] =
    useState("initial");

    const [canClaimDypiansVesting, setcanClaimDypiansVesting] = useState(false);
    const [claimLoadingDypiansVesting, setclaimLoadingDypiansVesting] =
      useState(false);
    const [claimStatusDypiansVesting, setclaimStatusDypiansVesting] =
      useState("initial");

  const [canClaimOTCCliff2, setcanClaimOTCCliff2] = useState(false);
  const [claimLoadingOTCCliff2, setclaimLoadingOTCCliff2] = useState(false);
  const [claimStatusOTCCliff2, setclaimStatusOTCCliff2] = useState("initial");

  const [canClaimOTCPoolBonus, setcanClaimOTCPoolBonus] = useState(false);
  const [claimLoadingOTCPoolBonus, setclaimLoadingOTCPoolBonus] =
    useState(false);
  const [claimStatusOTCPoolBonus, setclaimStatusOTCPoolBonus] =
    useState("initial");

  const [canClaimOTCPoolDynamic, setcanClaimOTCPoolDynamic] = useState(false);
  const [claimLoadingOTCPoolDynamic, setclaimLoadingOTCPoolDynamic] =
    useState(false);
  const [claimStatusOTCPoolDynamic, setclaimStatusOTCPoolDynamic] =
    useState("initial");

  const [canClaimOTCPool2Dynamic, setcanClaimOTCPool2Dynamic] = useState(false);
  const [claimLoadingOTCPool2Dynamic, setclaimLoadingOTCPool2Dynamic] =
    useState(false);
  const [claimStatusOTCPool2Dynamic, setclaimStatusOTCPool2Dynamic] =
    useState("initial");

  const [canClaimOTCWodDynamic, setcanClaimOTCWodDynamic] = useState(false);
  const [claimLoadingOTCWodDynamic, setclaimLoadingOTCWodDynamic] =
    useState(false);
  const [claimStatusOTCWodDynamic, setclaimStatusOTCWodDynamic] =
    useState("initial");

  const [canClaimPrivate, setcanClaimPrivate] = useState(false);
  const [claimLoadingPrivate, setclaimLoadingPrivate] = useState(false);
  const [claimStatusPrivate, setclaimStatusPrivate] = useState("initial");

  const [canClaimKol, setcanClaimKol] = useState(false);
  const [claimLoadingKol, setclaimLoadingKol] = useState(false);
  const [claimStatusKol, setclaimStatusKol] = useState("initial");

  const [canClaimAdvisors, setcanClaimAdvisors] = useState(false);
  const [claimLoadingAdvisors, setclaimLoadingAdvisors] = useState(false);
  const [claimStatusAdvisors, setclaimStatusAdvisors] = useState("initial");

  const [selectedRound, setselectedRound] = useState();

  // Determine which clients to use based on wallet type
  const isMatchIdWallet = window.WALLET_TYPE === "matchId";
  const activePublicClient = isMatchIdWallet ? publicClient : wagmiPublicClient;
  const activeWalletClient = isMatchIdWallet ? walletClient : wagmiWalletClient;

  const getInfo = async () => {
    if (!activePublicClient || !coinbase) return;

    const isSpecial = specialWallets.includes(coinbase.toLowerCase());
    const isSpecialSeed = specialWalletsSeed.includes(coinbase.toLowerCase());
    const isBlocked = blockedAccounts.some(
      (item) => item.toLowerCase() === coinbase.toLowerCase()
    );

    const vestingAddress = isSpecialSeed
      ? window.config.vesting_special_address
      : window.config.vesting_address;
    const vestingABI = isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI;
    const kolAddress = isSpecial
      ? window.config.kol2_address
      : window.config.kol_address;

    try {
      //  releaseProcent -> Procent (%) of the Amount Vested which will be available at TGE -> after 'cliff' has passed;
      const releaseProcent = await readContractData(
        activePublicClient,
        vestingAddress,
        vestingABI,
        "releaseProcent"
      );
      setreleaseProcent(Number(releaseProcent) / 100);

      const isstartVesting = await readContractData(
        activePublicClient,
        vestingAddress,
        vestingABI,
        "startVesting"
      );
      setstartedVesting(Boolean(isstartVesting));

      //availableTGE -> If 1, he has to claim 'releaseProcent' at TGE (end of 'cliff'), if 0, he has already claimed 'releaseProcent';
      const availableTGE = await readContractData(
        activePublicClient,
        vestingAddress,
        vestingABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaim(Number(availableTGE) === 1);

      const availableTGE_OTC = await readContractData(
        activePublicClient,
        window.config.otc_address,
        OTC_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTC(Number(availableTGE_OTC) === 1);

      const availableTGE_OTC2 = await readContractData(
        activePublicClient,
        window.config.otc2_address,
        OTC2_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTC2(Number(availableTGE_OTC2) === 1);

      const availableTGE_OTCBonus = await readContractData(
        activePublicClient,
        window.config.otcbonus_address,
        OTCBONUS_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCBonus(Number(availableTGE_OTCBonus) === 1);

      const availableTGE_OTCSpecial = await readContractData(
        activePublicClient,
        window.config.otcspecial_address,
        OTCSPECIAL_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCSpecial(Number(availableTGE_OTCSpecial) === 1);

      const availableTGE_OTCSpecial4 = await readContractData(
        activePublicClient,
        window.config.otcspecial4_address,
        OTCSPECIAL4_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCSpecial4(Number(availableTGE_OTCSpecial4) === 1);

      const availableTGE_OTCCliff = await readContractData(
        activePublicClient,
        window.config.otccliff_address,
        OTCCLIFF_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCCliff(Number(availableTGE_OTCCliff) === 1);

      const availableTGE_OTC1Cliff4 = await readContractData(
        activePublicClient,
        window.config.otc1cliff4_address,
        OTC1CLIFF4_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTC1Cliff4(Number(availableTGE_OTC1Cliff4) === 1);

      const availableTGE_RoundOtcVesting = await readContractData(
        activePublicClient,
        window.config.roundotc_vesting_address,
        ROUNDOTC_VESTING_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimRoundOtcVesting(Number(availableTGE_RoundOtcVesting) === 1);


      const availableTGE_DypiansVesting = await readContractData(
        activePublicClient,
        window.config.dypiansvesting_address,
        DYPIANSVESTING_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimDypiansVesting(Number(availableTGE_DypiansVesting) === 1);


      const availableTGE_OTCCliff2 = await readContractData(
        activePublicClient,
        window.config.otccliff2_address,
        OTCCLIFF2_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCCliff2(Number(availableTGE_OTCCliff2) === 1);

      const availableTGE_OTCPoolBonus = await readContractData(
        activePublicClient,
        window.config.otcpoolbonus_address,
        OTCPOOLBONUS_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCPoolBonus(Number(availableTGE_OTCPoolBonus) === 1);

      const availableTGE_OTCPoolDynamic = await readContractData(
        activePublicClient,
        window.config.otcpooldynamic_address,
        OTCPOOLDYNAMIC_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCPoolDynamic(Number(availableTGE_OTCPoolDynamic) === 1);

      const availableTGE_OTCPool2Dynamic = await readContractData(
        activePublicClient,
        window.config.otcpool2dynamic_address,
        OTCPOOL2DYNAMIC_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCPool2Dynamic(Number(availableTGE_OTCPool2Dynamic) === 1);

      const availableTGE_OTCWodDynamic = await readContractData(
        activePublicClient,
        window.config.otcwoddynamic_address,
        OTCWODDYNAMIC_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimOTCWodDynamic(Number(availableTGE_OTCWodDynamic) === 1);

      const availableTGEPrivate = await readContractData(
        activePublicClient,
        window.config.private_address,
        PRIVATE_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimPrivate(Number(availableTGEPrivate) === 1);

      const availableTGEKol = isBlocked
        ? 0n
        : await readContractData(
            activePublicClient,
            kolAddress,
            KOL_ABI,
            "availableTGE",
            [coinbase]
          );
      setcanClaimKol(Number(availableTGEKol) === 1);

      const availableTGEAdvisors = await readContractData(
        activePublicClient,
        window.config.advisors_address,
        ADVISORS_ABI,
        "availableTGE",
        [coinbase]
      );
      setcanClaimAdvisors(Number(availableTGEAdvisors) === 1);

      //getPendingUnlocked(address _holder) -> It will give you the pending tokens that are available to Claim;
      const tokensToClaimAmount = await readContractData(
        activePublicClient,
        vestingAddress,
        vestingABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmount_formatted =
        formatTokenAmount(tokensToClaimAmount);
      setcanClaim(tokensToClaimAmount_formatted > 0);
      setpendingTokens(tokensToClaimAmount_formatted);

      const tokensToClaimAmountOTC = await readContractData(
        activePublicClient,
        window.config.otc_address,
        OTC_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTC_formatted = formatTokenAmount(
        tokensToClaimAmountOTC
      );
      setcanClaimOTC(tokensToClaimAmountOTC_formatted > 0);
      setpendingTokensOTC(tokensToClaimAmountOTC_formatted);

      const tokensToClaimAmountOTC2 = await readContractData(
        activePublicClient,
        window.config.otc2_address,
        OTC2_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTC2_formatted = formatTokenAmount(
        tokensToClaimAmountOTC2
      );
      setcanClaimOTC2(tokensToClaimAmountOTC2_formatted > 0);
      setpendingTokensOTC2(tokensToClaimAmountOTC2_formatted);

      const tokensToClaimAmountOTCBonus = await readContractData(
        activePublicClient,
        window.config.otcbonus_address,
        OTCBONUS_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCBonus_formatted = formatTokenAmount(
        tokensToClaimAmountOTCBonus
      );
      setcanClaimOTCBonus(tokensToClaimAmountOTCBonus_formatted > 0);
      setpendingTokensOTCBonus(tokensToClaimAmountOTCBonus_formatted);

      const tokensToClaimAmountOTCSpecial = await readContractData(
        activePublicClient,
        window.config.otcspecial_address,
        OTCSPECIAL_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCSpecial_formatted = formatTokenAmount(
        tokensToClaimAmountOTCSpecial
      );
      setcanClaimOTCSpecial(tokensToClaimAmountOTCSpecial_formatted > 0);
      setpendingTokensOTCSpecial(tokensToClaimAmountOTCSpecial_formatted);

      const tokensToClaimAmountOTCSpecial4 = await readContractData(
        activePublicClient,
        window.config.otcspecial4_address,
        OTCSPECIAL4_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCSpecial_formatted4 = formatTokenAmount(
        tokensToClaimAmountOTCSpecial4
      );
      setcanClaimOTCSpecial4(tokensToClaimAmountOTCSpecial_formatted4 > 0);
      setpendingTokensOTCSpecial4(tokensToClaimAmountOTCSpecial_formatted4);

      const tokensToClaimAmountOTCCliff = await readContractData(
        activePublicClient,
        window.config.otccliff_address,
        OTCCLIFF_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCCliff_formatted = formatTokenAmount(
        tokensToClaimAmountOTCCliff
      );
      setcanClaimOTCCliff(tokensToClaimAmountOTCCliff_formatted > 0);
      setpendingTokensOTCCliff(tokensToClaimAmountOTCCliff_formatted);

      const tokensToClaimAmountOTC1Cliff4 = await readContractData(
        activePublicClient,
        window.config.otc1cliff4_address,
        OTC1CLIFF4_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTC1Cliff4_formatted = formatTokenAmount(
        tokensToClaimAmountOTC1Cliff4
      );
      setcanClaimOTC1Cliff4(tokensToClaimAmountOTC1Cliff4_formatted > 0);
      setpendingTokensOTC1Cliff4(tokensToClaimAmountOTC1Cliff4_formatted);

      const tokensToClaimAmountRoundOtcVesting = await readContractData(
        activePublicClient,
        window.config.roundotc_vesting_address,
        ROUNDOTC_VESTING_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountRoundOtcVesting_formatted = formatTokenAmount(
        tokensToClaimAmountRoundOtcVesting
      );
      setcanClaimRoundOtcVesting(
        tokensToClaimAmountRoundOtcVesting_formatted > 0
      );
      setpendingTokensRoundOtcVesting(
        tokensToClaimAmountRoundOtcVesting_formatted
      );




      const tokensToClaimAmountDypiansVesting = await readContractData(
        activePublicClient,
        window.config.dypiansvesting_address,
        DYPIANSVESTING_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountDypiansVesting_formatted = formatTokenAmount(
        tokensToClaimAmountDypiansVesting
      );
      setcanClaimDypiansVesting(
        tokensToClaimAmountDypiansVesting_formatted > 0
      );
      setpendingTokensDypiansVesting(
        tokensToClaimAmountDypiansVesting_formatted
      );





      const tokensToClaimAmountOTCCliff2 = await readContractData(
        activePublicClient,
        window.config.otccliff2_address,
        OTCCLIFF2_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCCliff_formatted2 = formatTokenAmount(
        tokensToClaimAmountOTCCliff2
      );
      setcanClaimOTCCliff2(tokensToClaimAmountOTCCliff_formatted2 > 0);
      setpendingTokensOTCCliff2(tokensToClaimAmountOTCCliff_formatted2);

      const tokensToClaimAmountOTCPoolBonus = await readContractData(
        activePublicClient,
        window.config.otcpoolbonus_address,
        OTCPOOLBONUS_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCPoolBonus_formatted = formatTokenAmount(
        tokensToClaimAmountOTCPoolBonus
      );
      setcanClaimOTCPoolBonus(tokensToClaimAmountOTCPoolBonus_formatted > 0);
      setpendingTokensOTCPoolBonus(tokensToClaimAmountOTCPoolBonus_formatted);

      const tokensToClaimAmountOTCPoolDynamic = await readContractData(
        activePublicClient,
        window.config.otcpooldynamic_address,
        OTCPOOLDYNAMIC_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCPoolDynamic_formatted = formatTokenAmount(
        tokensToClaimAmountOTCPoolDynamic
      );
      setcanClaimOTCPoolDynamic(
        tokensToClaimAmountOTCPoolDynamic_formatted > 0
      );
      setpendingTokensOTCPoolDynamic(
        tokensToClaimAmountOTCPoolDynamic_formatted
      );

      const tokensToClaimAmountOTCPool2Dynamic = await readContractData(
        activePublicClient,
        window.config.otcpool2dynamic_address,
        OTCPOOL2DYNAMIC_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCPool2Dynamic_formatted = formatTokenAmount(
        tokensToClaimAmountOTCPool2Dynamic
      );
      setcanClaimOTCPool2Dynamic(
        tokensToClaimAmountOTCPool2Dynamic_formatted > 0
      );
      setpendingTokensOTCPool2Dynamic(
        tokensToClaimAmountOTCPool2Dynamic_formatted
      );

      const tokensToClaimAmountOTCWodDynamic = await readContractData(
        activePublicClient,
        window.config.otcwoddynamic_address,
        OTCWODDYNAMIC_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountOTCWodDynamic_formatted = formatTokenAmount(
        tokensToClaimAmountOTCWodDynamic
      );
      setcanClaimOTCWodDynamic(tokensToClaimAmountOTCWodDynamic_formatted > 0);
      setpendingTokensOTCWodDynamic(tokensToClaimAmountOTCWodDynamic_formatted);

      const tokensToClaimAmountPrivate = await readContractData(
        activePublicClient,
        window.config.private_address,
        PRIVATE_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountPrivate_formatted = formatTokenAmount(
        tokensToClaimAmountPrivate
      );
      setpendingTokensPrivate(tokensToClaimAmountPrivate_formatted);

      const tokensToClaimAmountKol = isBlocked
        ? 0n
        : await readContractData(
            activePublicClient,
            kolAddress,
            KOL_ABI,
            "getPendingUnlocked",
            [coinbase]
          );
      const tokensToClaimAmountKol_formatted = formatTokenAmount(
        tokensToClaimAmountKol
      );
      setpendingTokensKOL(tokensToClaimAmountKol_formatted);

      const tokensToClaimAmountAdvisors = await readContractData(
        activePublicClient,
        window.config.advisors_address,
        ADVISORS_ABI,
        "getPendingUnlocked",
        [coinbase]
      );
      const tokensToClaimAmountAdvisors_formatted = formatTokenAmount(
        tokensToClaimAmountAdvisors
      );
      setpendingTokensAdvisors(tokensToClaimAmountAdvisors_formatted);

      //claimedTokens(address) -> Return total WOD tokens Claimed in general by single user;
      const [
        claimedSeed,
        claimedOTC,
        claimedOTC2,
        claimedOTCBonus,
        claimedOTCSpecial,
        claimedOTCSpecial4,
        claimedOTCCliff,
        claimedOTC1Cliff4,
        claimedRoundOtcVesting,
        claimedDypiansVesting,
        claimedOTCCliff2,
        claimedOTCPoolBonus,
        claimedOTCPoolDynamic,
        claimedOTCPool2Dynamic,
        claimedOTCWodDynamic,
        claimedPrivate,
        claimedKol,
        claimedAdvisors,
      ] = await Promise.all([
        readContractData(
          activePublicClient,
          vestingAddress,
          vestingABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc_address,
          OTC_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc2_address,
          OTC2_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcbonus_address,
          OTCBONUS_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcspecial_address,
          OTCSPECIAL_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcspecial4_address,
          OTCSPECIAL4_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otccliff_address,
          OTCCLIFF_ABI,
          "claimedTokens",
          [coinbase]
        ),

        readContractData(
          activePublicClient,
          window.config.otc1cliff4_address,
          OTC1CLIFF4_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.roundotc_vesting_address,
          ROUNDOTC_VESTING_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.dypiansvesting_address,
          DYPIANSVESTING_ABI,
          "claimedTokens",
          [coinbase]
        ),

        readContractData(
          activePublicClient,
          window.config.otccliff2_address,
          OTCCLIFF2_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpoolbonus_address,
          OTCPOOLBONUS_ABI,
          "claimedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpooldynamic_address,
          OTCPOOLDYNAMIC_ABI,
          "totalClaimedWodTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpool2dynamic_address,
          OTCPOOL2DYNAMIC_ABI,
          "totalClaimedWodTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcwoddynamic_address,
          OTCWODDYNAMIC_ABI,
          "totalClaimedWodTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.private_address,
          PRIVATE_ABI,
          "claimedTokens",
          [coinbase]
        ),
        isBlocked
          ? Promise.resolve(0n)
          : readContractData(
              activePublicClient,
              kolAddress,
              KOL_ABI,
              "claimedTokens",
              [coinbase]
            ),
        readContractData(
          activePublicClient,
          window.config.advisors_address,
          ADVISORS_ABI,
          "claimedTokens",
          [coinbase]
        ),
      ]);

      setuserClaimedTokens(formatTokenAmount(claimedSeed));
      setuserClaimedTokensOTC(formatTokenAmount(claimedOTC));
      setuserClaimedTokensOTC2(formatTokenAmount(claimedOTC2));
      setuserClaimedTokensOTCBonus(formatTokenAmount(claimedOTCBonus));
      setuserClaimedTokensOTCSpecial(formatTokenAmount(claimedOTCSpecial));
      setuserClaimedTokensOTCSpecial4(formatTokenAmount(claimedOTCSpecial4));
      setuserClaimedTokensOTCCliff(formatTokenAmount(claimedOTCCliff));
      setuserClaimedTokensOTC1Cliff4(formatTokenAmount(claimedOTC1Cliff4));
      setuserClaimedTokensRoundOtcVesting(
        formatTokenAmount(claimedRoundOtcVesting)
      );
      setuserClaimedTokensDypiansVesting(
        formatTokenAmount(claimedDypiansVesting)
      );
      setuserClaimedTokensOTCCliff2(formatTokenAmount(claimedOTCCliff2));

      setuserClaimedTokensOTCPoolBonus(formatTokenAmount(claimedOTCPoolBonus));
      setuserClaimedTokensOTCPoolDynamic(
        formatTokenAmount(claimedOTCPoolDynamic)
      );
      setuserClaimedTokensOTCPool2Dynamic(
        formatTokenAmount(claimedOTCPool2Dynamic)
      );
      setuserClaimedTokensOTCWodDynamic(
        formatTokenAmount(claimedOTCWodDynamic)
      );
      setuserClaimedTokensPrivate(formatTokenAmount(claimedPrivate));
      setuserClaimedTokensKOL(formatTokenAmount(claimedKol));
      setuserClaimedTokensAdvisors(formatTokenAmount(claimedAdvisors));

      //vestedTokens(address) -> Return total WOD tokens vested for single user;
      const [
        vestedSeed,
        vestedOTC,
        vestedOTC2,
        vestedOTCBonus,
        vestedOTCSpecial,
        vestedOTCSpecial4,
        vestedOTCCliff,
        vestedOTC1Cliff4,
        vestedRoundOtcVesting,
        vestedDypiansVesting,
        vestedOTCCliff2,
        vestedOTCPoolBonus,
        vestedOTCPoolDynamic,
        vestedOTCPool2Dynamic,
        vestedOTCWodDynamic,
        vestedPrivate,
        vestedKol,
        vestedAdvisors,
      ] = await Promise.all([
        readContractData(
          activePublicClient,
          vestingAddress,
          vestingABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc_address,
          OTC_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc2_address,
          OTC2_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcbonus_address,
          OTCBONUS_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcspecial_address,
          OTCSPECIAL_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcspecial4_address,
          OTCSPECIAL4_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otccliff_address,
          OTCCLIFF_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc1cliff4_address,
          OTC1CLIFF4_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.roundotc_vesting_address,
          ROUNDOTC_VESTING_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.dypiansvesting_address,
          DYPIANSVESTING_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otccliff2_address,
          OTCCLIFF2_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpoolbonus_address,
          OTCPOOLBONUS_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpooldynamic_address,
          OTCPOOLDYNAMIC_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpool2dynamic_address,
          OTCPOOL2DYNAMIC_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcwoddynamic_address,
          OTCWODDYNAMIC_ABI,
          "vestedTokens",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.private_address,
          PRIVATE_ABI,
          "vestedTokens",
          [coinbase]
        ),
        isBlocked
          ? Promise.resolve(0n)
          : readContractData(
              activePublicClient,
              kolAddress,
              KOL_ABI,
              "vestedTokens",
              [coinbase]
            ),
        readContractData(
          activePublicClient,
          window.config.advisors_address,
          ADVISORS_ABI,
          "vestedTokens",
          [coinbase]
        ),
      ]);

      setuserVestedTokens(formatTokenAmount(vestedSeed));
      setuserVestedTokensOTC(formatTokenAmount(vestedOTC));
      setuserVestedTokensOTC2(formatTokenAmount(vestedOTC2));
      setuserVestedTokensOTCBonus(formatTokenAmount(vestedOTCBonus));
      setuserVestedTokensOTCSpecial(formatTokenAmount(vestedOTCSpecial));
      setuserVestedTokensOTCSpecial4(formatTokenAmount(vestedOTCSpecial4));
      setuserVestedTokensOTCCliff(formatTokenAmount(vestedOTCCliff));
      setuserVestedTokensOTC1Cliff4(formatTokenAmount(vestedOTC1Cliff4));
      setuserVestedTokensRoundOtcVesting(
        formatTokenAmount(vestedRoundOtcVesting)
      );
      setuserVestedTokensDypiansVesting(
        formatTokenAmount(vestedDypiansVesting)
      );
      setuserVestedTokensOTCCliff2(formatTokenAmount(vestedOTCCliff2));

      setuserVestedTokensOTCPoolBonus(formatTokenAmount(vestedOTCPoolBonus));
      setuserVestedTokensOTCPoolDynamic(
        formatTokenAmount(vestedOTCPoolDynamic)
      );
      setuserVestedTokensOTCPool2Dynamic(
        formatTokenAmount(vestedOTCPool2Dynamic)
      );
      setuserVestedTokensOTCWodDynamic(formatTokenAmount(vestedOTCWodDynamic));
      setuserVestedTokensPrivate(formatTokenAmount(vestedPrivate));
      setuserVestedTokensKOL(formatTokenAmount(vestedKol));
      setuserVestedTokensAdvisors(formatTokenAmount(vestedAdvisors));
    } catch (error) {
      console.error("Error in getInfo:", error);
    }
  };

  const getInfoTimer = async () => {
    if (!activePublicClient || !coinbase) return;

    const isSpecial = specialWallets.includes(coinbase.toLowerCase());
    const isSpecialSeed = specialWalletsSeed.includes(coinbase.toLowerCase());

    const vestingAddress = isSpecialSeed
      ? window.config.vesting_special_address
      : window.config.vesting_address;
    const vestingABI = isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI;
    const kolAddress = isSpecial
      ? window.config.kol2_address
      : window.config.kol_address;

    try {
      // Read all lastClaimedTime values in parallel
      const [
        lastClaimedTime,
        lastClaimedTimeOTC,
        lastClaimedTimeOTC2,
        lastClaimedTimeOTCBonus,
        lastClaimedTimeOTCSpecial,
        lastClaimedTimeOTCSpecial4,
        lastClaimedTimeOTCCliff,
        lastClaimedTimeOTC1Cliff4,
        lastClaimedTimeRoundOtcVesting,
        lastClaimedTimeDypiansVesting,
        lastClaimedTimeOTCCliff2,
        lastClaimedTimeOTCPoolBonus,
        lastClaimedTimeOTCPoolDynamic,
        lastClaimedTimeOTCPool2Dynamic,
        lastClaimedTimeOTCWodDynamic,
        lastClaimedTimePrivate,
        lastClaimedTimeKol,
        lastClaimedTimeAdvisors,
      ] = await Promise.all([
        readContractData(
          activePublicClient,
          vestingAddress,
          vestingABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc_address,
          OTC_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc2_address,
          OTC2_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcbonus_address,
          OTCBONUS_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcspecial_address,
          OTCSPECIAL_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcspecial4_address,
          OTCSPECIAL4_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otccliff_address,
          OTCCLIFF_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otc1cliff4_address,
          OTC1CLIFF4_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.roundotc_vesting_address,
          ROUNDOTC_VESTING_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.dypiansvesting_address,
          DYPIANSVESTING_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otccliff2_address,
          OTCCLIFF2_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpoolbonus_address,
          OTCPOOLBONUS_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpooldynamic_address,
          OTCPOOLDYNAMIC_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcpool2dynamic_address,
          OTCPOOL2DYNAMIC_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.otcwoddynamic_address,
          OTCWODDYNAMIC_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.private_address,
          PRIVATE_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          kolAddress,
          KOL_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
        readContractData(
          activePublicClient,
          window.config.advisors_address,
          ADVISORS_ABI,
          "lastClaimedTime",
          [coinbase]
        ),
      ]);

      // Convert to milliseconds and set cliff times
      setcliffTime(Number(lastClaimedTime) * 1000);
      setcliffTimeOtc(Number(lastClaimedTimeOTC) * 1000);
      setcliffTimeOtc2(Number(lastClaimedTimeOTC2) * 1000);
      setcliffTimeOtcBonus(Number(lastClaimedTimeOTCBonus) * 1000);
      setcliffTimeOtcSpecial(Number(lastClaimedTimeOTCSpecial) * 1000);
      setcliffTimeOtcSpecial4(Number(lastClaimedTimeOTCSpecial4) * 1000);
      setcliffTimeOtcCliff(Number(lastClaimedTimeOTCCliff) * 1000);
      setcliffTimeOtc1Cliff4(Number(lastClaimedTimeOTC1Cliff4) * 1000);
      setcliffTimeRoundOtcVesting(
        Number(lastClaimedTimeRoundOtcVesting) * 1000
      );
      setcliffTimeDypiansVesting(
        Number(lastClaimedTimeDypiansVesting) * 1000
      );
      setcliffTimeOtcCliff2(Number(lastClaimedTimeOTCCliff2) * 1000);

      setcliffTimeOtcPoolBonus(Number(lastClaimedTimeOTCPoolBonus) * 1000);
      setcliffTimeOtcPoolDynamic(Number(lastClaimedTimeOTCPoolDynamic) * 1000);
      setcliffTimeOtcPool2Dynamic(
        Number(lastClaimedTimeOTCPool2Dynamic) * 1000
      );
      setcliffTimeOtcWodDynamic(Number(lastClaimedTimeOTCWodDynamic) * 1000);
      setcliffTimePrivate(Number(lastClaimedTimePrivate) * 1000);
      setcliffTimeKol(Number(lastClaimedTimeKol) * 1000);
      setcliffTimeAdvisors(Number(lastClaimedTimeAdvisors) * 1000);
    } catch (error) {
      console.error("Error in getInfoTimer:", error);
    }
  };

  const handleClaim = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoading(true);

    const isSpecialSeed = specialWalletsSeed.includes(coinbase?.toLowerCase());
    const vestingAddress = isSpecialSeed
      ? window.config.vesting_special_address
      : window.config.vesting_address;
    const vestingABI = isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI;

    try {
      const hash = await activeWalletClient.writeContract({
        address: vestingAddress,
        abi: vestingABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatus("success");
        setclaimLoading(false);
        setTimeout(() => {
          setclaimStatus("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatus("failed");
      setclaimLoading(false);
      setTimeout(() => {
        setclaimStatus("initial");
      }, 5000);
    }
  };

  const handleClaimOTC = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTC(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otc_address,
        abi: OTC_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTC("success");
        setclaimLoadingOTC(false);
        setTimeout(() => {
          setclaimStatusOTC("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTC("failed");
      setclaimLoadingOTC(false);
      setTimeout(() => {
        setclaimStatusOTC("initial");
      }, 5000);
    }
  };

  const handleClaimOTC2 = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTC2(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otc2_address,
        abi: OTC2_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTC2("success");
        setclaimLoadingOTC2(false);
        setTimeout(() => {
          setclaimStatusOTC2("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTC2("failed");
      setclaimLoadingOTC2(false);
      setTimeout(() => {
        setclaimStatusOTC2("initial");
      }, 5000);
    }
  };

  const handleClaimOTCBonus = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCBonus(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otcbonus_address,
        abi: OTCBONUS_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCBonus("success");
        setclaimLoadingOTCBonus(false);
        setTimeout(() => {
          setclaimStatusOTCBonus("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCBonus("failed");
      setclaimLoadingOTCBonus(false);
      setTimeout(() => {
        setclaimStatusOTCBonus("initial");
      }, 5000);
    }
  };

  const handleClaimOTCSpecial = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCSpecial(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otcspecial_address,
        abi: OTCSPECIAL_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCSpecial("success");
        setclaimLoadingOTCSpecial(false);
        setTimeout(() => {
          setclaimStatusOTCSpecial("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCSpecial("failed");
      setclaimLoadingOTCSpecial(false);
      setTimeout(() => {
        setclaimStatusOTCSpecial("initial");
      }, 5000);
    }
  };

  const handleClaimOTCSpecial4 = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCSpecial4(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otcspecial4_address,
        abi: OTCSPECIAL4_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCSpecial4("success");
        setclaimLoadingOTCSpecial4(false);
        setTimeout(() => {
          setclaimStatusOTCSpecial4("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCSpecial4("failed");
      setclaimLoadingOTCSpecial4(false);
      setTimeout(() => {
        setclaimStatusOTCSpecial4("initial");
      }, 5000);
    }
  };

  const handleClaimOTCCliff = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCCliff(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otccliff_address,
        abi: OTCCLIFF_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCCliff("success");
        setclaimLoadingOTCCliff(false);
        setTimeout(() => {
          setclaimStatusOTCCliff("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCCliff("failed");
      setclaimLoadingOTCCliff(false);
      setTimeout(() => {
        setclaimStatusOTCCliff("initial");
      }, 5000);
    }
  };

  const handleClaimOTC1Cliff4 = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }
    console.log("cliff1-otc4");
    setclaimLoadingOTC1Cliff4(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otc1cliff4_address,
        abi: OTC1CLIFF4_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTC1Cliff4("success");
        setclaimLoadingOTC1Cliff4(false);
        setTimeout(() => {
          setclaimStatusOTC1Cliff4("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTC1Cliff4("failed");
      setclaimLoadingOTC1Cliff4(false);
      setTimeout(() => {
        setclaimStatusOTC1Cliff4("initial");
      }, 5000);
    }
  };

  const handleClaimRoundOtcVesting = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }
    console.log("roundotc-vesting");
    setclaimLoadingRoundOtcVesting(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.roundotc_vesting_address,
        abi: ROUNDOTC_VESTING_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusRoundOtcVesting("success");
        setclaimLoadingRoundOtcVesting(false);
        setTimeout(() => {
          setclaimStatusRoundOtcVesting("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusRoundOtcVesting("failed");
      setclaimLoadingRoundOtcVesting(false);
      setTimeout(() => {
        setclaimStatusRoundOtcVesting("initial");
      }, 5000);
    }
  };

  const handleClaimDypiansVesting = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }
    console.log("dypians-vesting");
    setclaimLoadingDypiansVesting(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.dypiansvesting_address,
        abi: DYPIANSVESTING_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusDypiansVesting("success");
        setclaimLoadingDypiansVesting(false);
        setTimeout(() => {
          setclaimStatusDypiansVesting("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusDypiansVesting("failed");
      setclaimLoadingDypiansVesting(false);
      setTimeout(() => {
        setclaimStatusDypiansVesting("initial");
      }, 5000);
    }
  };

  const handleClaimOTCCliff2 = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCCliff2(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otccliff2_address,
        abi: OTCCLIFF2_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCCliff2("success");
        setclaimLoadingOTCCliff2(false);
        setTimeout(() => {
          setclaimStatusOTCCliff2("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCCliff2("failed");
      setclaimLoadingOTCCliff2(false);
      setTimeout(() => {
        setclaimStatusOTCCliff2("initial");
      }, 5000);
    }
  };

  const handleClaimOTCPoolBonus = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCPoolBonus(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otcpoolbonus_address,
        abi: OTCPOOLBONUS_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCPoolBonus("success");
        setclaimLoadingOTCPoolBonus(false);
        setTimeout(() => {
          setclaimStatusOTCPoolBonus("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCPoolBonus("failed");
      setclaimLoadingOTCPoolBonus(false);
      setTimeout(() => {
        setclaimStatusOTCPoolBonus("initial");
      }, 5000);
    }
  };

  const handleClaimOTCPoolDynamic = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCPoolDynamic(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otcpooldynamic_address,
        abi: OTCPOOLDYNAMIC_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCPoolDynamic("success");
        setclaimLoadingOTCPoolDynamic(false);
        setTimeout(() => {
          setclaimStatusOTCPoolDynamic("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCPoolDynamic("failed");
      setclaimLoadingOTCPoolDynamic(false);
      setTimeout(() => {
        setclaimStatusOTCPoolDynamic("initial");
      }, 5000);
    }
  };

  const handleClaimOTCPool2Dynamic = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCPool2Dynamic(true);

    try {
      console.log(activeWalletClient);
      const hash = await activeWalletClient.writeContract({
        address: window.config.otcpool2dynamic_address,
        abi: OTCPOOL2DYNAMIC_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCPool2Dynamic("success");
        setclaimLoadingOTCPool2Dynamic(false);
        setTimeout(() => {
          setclaimStatusOTCPool2Dynamic("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCPool2Dynamic("failed");
      setclaimLoadingOTCPool2Dynamic(false);
      setTimeout(() => {
        setclaimStatusOTCPool2Dynamic("initial");
      }, 5000);
    }
  };

  const handleClaimOTCWodDynamic = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingOTCWodDynamic(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.otcwoddynamic_address,
        abi: OTCWODDYNAMIC_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusOTCWodDynamic("success");
        setclaimLoadingOTCWodDynamic(false);
        setTimeout(() => {
          setclaimStatusOTCWodDynamic("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusOTCWodDynamic("failed");
      setclaimLoadingOTCWodDynamic(false);
      setTimeout(() => {
        setclaimStatusOTCWodDynamic("initial");
      }, 5000);
    }
  };

  const handleClaimPrivate = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingPrivate(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.private_address,
        abi: PRIVATE_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusPrivate("success");
        setclaimLoadingPrivate(false);
        setTimeout(() => {
          setclaimStatusPrivate("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusPrivate("failed");
      setclaimLoadingPrivate(false);
      setTimeout(() => {
        setclaimStatusPrivate("initial");
      }, 5000);
    }
  };

  const handleClaimKol = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingKol(true);

    const isSpecial = specialWallets.includes(coinbase?.toLowerCase());
    const kolAddress = isSpecial
      ? window.config.kol2_address
      : window.config.kol_address;

    try {
      const hash = await activeWalletClient.writeContract({
        address: kolAddress,
        abi: KOL_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusKol("success");
        setclaimLoadingKol(false);
        setTimeout(() => {
          setclaimStatusKol("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusKol("failed");
      setclaimLoadingKol(false);
      setTimeout(() => {
        setclaimStatusKol("initial");
      }, 5000);
    }
  };

  const handleClaimAdvisors = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoadingAdvisors(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.advisors_address,
        abi: ADVISORS_ABI,
        functionName: "claim",
        args: [],
        account: coinbase,
      });

      const receipt = await activePublicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status === "success") {
        setclaimStatusAdvisors("success");
        setclaimLoadingAdvisors(false);
        setTimeout(() => {
          setclaimStatusAdvisors("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      window.alertify.error(
        error?.shortMessage || error?.message || "Transaction failed"
      );
      setclaimStatusAdvisors("failed");
      setclaimLoadingAdvisors(false);
      setTimeout(() => {
        setclaimStatusAdvisors("initial");
      }, 5000);
    }
  };

  const handleEthPool = async () => {
    if (window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else {
      await switchNetworkWagmi(parseInt("0x38", 16), null, { coinbase })
        .then(() => {
          handleSwitchNetwork("56");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getInfo();
  }, [coinbase]);

  useEffect(() => {
    if (coinbase && isConnected) {
      getInfoTimer();
    }
  }, [coinbase, isConnected]);

  useEffect(() => {
    document.title = "WOD Claim";

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid whitelist-mainhero-wrapper token-wrapper px-0">
      <div className="d-flex flex-column">
        <WhitelistHero
          onSelectRound={(value) => {
            setselectedRound(value);
          }}
          type={type}
        />
        <StakingBanner />
        <WhitelistContent
          isEOA={isEOA}
          isConnected={isConnected}
          chainId={chainId}
          coinbase={coinbase}
          onConnect={handleConnection}
          handleSwitchChain={handleEthPool}
          wodBalance={
            type === "pool"
              ? pendingTokensOTC
              : type === "pool2"
              ? pendingTokensOTC2
              : type === "special-otc"
              ? pendingTokensOTCSpecial
              : type === "special-otc-4"
              ? pendingTokensOTCSpecial4
              : type === "cliff-otc"
              ? pendingTokensOTCCliff
              : type === "cliff1-otc4"
              ? pendingTokensOTC1Cliff4
              : type === "roundotc-vesting"
              ? pendingTokensRoundOtcVesting
              : type === "dypians-vesting"
              ? pendingTokensDypiansVesting
              : type === "cliff-otc2"
              ? pendingTokensOTCCliff2
              : type === "pool-bonus"
              ? pendingTokensOTCPoolBonus
              : type === "pool-dynamic"
              ? pendingTokensOTCPoolDynamic
              : type === "pool2-dynamic"
              ? pendingTokensOTCPool2Dynamic
              : type === "wod-dynamic"
              ? pendingTokensOTCWodDynamic
              : type === "bonus-otc"
              ? pendingTokensOTCBonus
              : selectedRound?.id === "seed"
              ? pendingTokens
              : selectedRound?.id === "private"
              ? pendingTokensPrivate
              : selectedRound?.id === "kol"
              ? pendingTokensKOL
              : selectedRound?.id === "advisors"
              ? pendingTokensAdvisors
              : 0
          }
          userClaimedTokens={
            type === "pool"
              ? userClaimedTokensOTC
              : type === "pool2"
              ? userClaimedTokensOTC2
              : type === "special-otc"
              ? userClaimedTokensOTCSpecial
              : type === "special-otc-4"
              ? userClaimedTokensOTCSpecial4
              : type === "cliff-otc"
              ? userClaimedTokensOTCCliff
              : type === "cliff1-otc4"
              ? userClaimedTokensOTC1Cliff4
              : type === "roundotc-vesting"
              ? userClaimedTokensRoundOtcVesting
              : type === "dypians-vesting"
              ? userClaimedTokensDypiansVesting
              : type === "cliff-otc2"
              ? userClaimedTokensOTCCliff2
              : type === "pool-bonus"
              ? userClaimedTokensOTCPoolBonus
              : type === "pool-dynamic"
              ? userClaimedTokensOTCPoolDynamic
              : type === "pool2-dynamic"
              ? userClaimedTokensOTCPool2Dynamic
              : type === "wod-dynamic"
              ? userClaimedTokensOTCWodDynamic
              : type === "bonus-otc"
              ? userClaimedTokensOTCBonus
              : selectedRound?.id === "seed"
              ? userClaimedTokens
              : selectedRound?.id === "private"
              ? userClaimedTokensPrivate
              : selectedRound?.id === "kol"
              ? userClaimedTokensKOL
              : selectedRound?.id === "advisors"
              ? userClaimedTokensAdvisors
              : 0
          }
          totalVestedTokens={
            type === "pool"
              ? userVestedTokensOTC
              : type === "pool2"
              ? userVestedTokensOTC2
              : type === "special-otc"
              ? userVestedTokensOTCSpecial
              : type === "special-otc-4"
              ? userVestedTokensOTCSpecial4
              : type === "cliff-otc"
              ? userVestedTokensOTCCliff
              : type === "cliff1-otc4"
              ? userVestedTokensOTC1Cliff4
              : type === "roundotc-vesting"
              ? userVestedTokensRoundOtcVesting
              : type === "dypians-vesting"
              ? userVestedTokensDypiansVesting
              : type === "cliff-otc2"
              ? userVestedTokensOTCCliff2
              : type === "pool-bonus"
              ? userVestedTokensOTCPoolBonus
              : type === "pool-dynamic"
              ? userVestedTokensOTCPoolDynamic
              : type === "pool2-dynamic"
              ? userVestedTokensOTCPool2Dynamic
              : type === "wod-dynamic"
              ? userVestedTokensOTCWodDynamic
              : type === "bonus-otc"
              ? userVestedTokensOTCBonus
              : selectedRound?.id === "seed"
              ? userVestedTokens
              : selectedRound?.id === "private"
              ? userVestedTokensPrivate
              : selectedRound?.id === "kol"
              ? userVestedTokensKOL
              : selectedRound?.id === "advisors"
              ? userVestedTokensAdvisors
              : 0
          }
          handleClaim={() => {
            type === "pool"
              ? handleClaimOTC()
              : type === "pool2"
              ? handleClaimOTC2()
              : type === "special-otc"
              ? handleClaimOTCSpecial()
              : type === "special-otc-4"
              ? handleClaimOTCSpecial4()
              : type === "cliff-otc"
              ? handleClaimOTCCliff()
              : type === "cliff1-otc4"
              ? handleClaimOTC1Cliff4()
              : type === "roundotc-vesting"
              ? handleClaimRoundOtcVesting()
              : type === "dypians-vesting"
              ? handleClaimDypiansVesting()
              : type === "cliff-otc2"
              ? handleClaimOTCCliff2()
              : type === "pool-bonus"
              ? handleClaimOTCPoolBonus()
              : type === "pool-dynamic"
              ? handleClaimOTCPoolDynamic()
              : type === "pool2-dynamic"
              ? handleClaimOTCPool2Dynamic()
              : type === "wod-dynamic"
              ? handleClaimOTCWodDynamic()
              : type === "bonus-otc"
              ? handleClaimOTCBonus()
              : selectedRound?.id === "seed"
              ? handleClaim()
              : selectedRound?.id === "private"
              ? handleClaimPrivate()
              : selectedRound?.id === "kol"
              ? handleClaimKol()
              : handleClaimAdvisors();
          }}
          claimStatus={
            type === "pool"
              ? claimStatusOTC
              : type === "pool2"
              ? claimStatusOTC2
              : type === "special-otc"
              ? claimStatusOTCSpecial
              : type === "special-otc-4"
              ? claimStatusOTCSpecial4
              : type === "cliff-otc"
              ? claimStatusOTCCliff
              : type === "cliff1-otc4"
              ? claimStatusOTC1Cliff4
              : type === "roundotc-vesting"
              ? claimStatusRoundOtcVesting
              : type === "dypians-vesting"
              ? claimStatusDypiansVesting
              : type === "cliff-otc2"
              ? claimStatusOTCCliff2
              : type === "pool-bonus"
              ? claimStatusOTCPoolBonus
              : type === "pool-dynamic"
              ? claimStatusOTCPoolDynamic
              : type === "pool2-dynamic"
              ? claimStatusOTCPool2Dynamic
              : type === "wod-dynamic"
              ? claimStatusOTCWodDynamic
              : type === "bonus-otc"
              ? claimStatusOTCBonus
              : selectedRound?.id === "seed"
              ? claimStatus
              : selectedRound?.id === "private"
              ? claimStatusPrivate
              : selectedRound?.id === "kol"
              ? claimStatusKol
              : selectedRound?.id === "advisors"
              ? claimStatusAdvisors
              : false
          }
          claimLoading={
            type === "pool"
              ? claimLoadingOTC
              : type === "pool2"
              ? claimLoadingOTC2
              : type === "special-otc"
              ? claimLoadingOTCSpecial
              : type === "special-otc-4"
              ? claimLoadingOTCSpecial4
              : type === "cliff-otc"
              ? claimLoadingOTCCliff
              : type === "cliff1-otc4"
              ? claimLoadingOTC1Cliff4
              : type === "roundotc-vesting"
              ? claimLoadingRoundOtcVesting
              : type === "dypians-vesting"
              ? claimLoadingDypiansVesting
              : type === "cliff-otc2"
              ? claimLoadingOTCCliff2
              : type === "pool-bonus"
              ? claimLoadingOTCPoolBonus
              : type === "pool-dynamic"
              ? claimLoadingOTCPoolDynamic
              : type === "pool2-dynamic"
              ? claimLoadingOTCPool2Dynamic
              : type === "wod-dynamic"
              ? claimLoadingOTCWodDynamic
              : type === "bonus-otc"
              ? claimLoadingOTCBonus
              : selectedRound?.id === "seed"
              ? claimLoading
              : selectedRound?.id === "private"
              ? claimLoadingPrivate
              : selectedRound?.id === "kol"
              ? claimLoadingKol
              : selectedRound?.id === "advisors"
              ? claimLoadingAdvisors
              : false
          }
          startedVesting={startedVesting}
          canClaim={
            type === "pool"
              ? canClaimOTC
              : type === "pool2"
              ? canClaimOTC2
              : type === "special-otc"
              ? canClaimOTCSpecial
              : type === "special-otc-4"
              ? canClaimOTCSpecial4
              : type === "cliff-otc"
              ? canClaimOTCCliff
              : type === "cliff1-otc4"
              ? canClaimOTC1Cliff4
              : type === "roundotc-vesting"
              ? canClaimRoundOtcVesting
              : type === "dypians-vesting"
              ? canClaimDypiansVesting
              : type === "cliff-otc2"
              ? canClaimOTCCliff2
              : type === "pool-bonus"
              ? canClaimOTCPoolBonus
              : type === "pool-dynamic"
              ? canClaimOTCPoolDynamic
              : type === "pool2-dynamic"
              ? canClaimOTCPool2Dynamic
              : type === "wod-dynamic"
              ? canClaimOTCWodDynamic
              : type === "bonus-otc"
              ? canClaimOTCBonus
              : selectedRound?.id === "seed"
              ? canClaim
              : selectedRound?.id === "private"
              ? canClaimPrivate
              : selectedRound?.id === "kol"
              ? canClaimKol
              : selectedRound?.id === "advisors"
              ? canClaimAdvisors
              : false
          }
          onTimerFinished={(value) => {
            type === "pool"
              ? setcanClaimOTC(value)
              : type === "pool2"
              ? setcanClaimOTC2(value)
              : type === "special-otc"
              ? setcanClaimOTCSpecial(value)
              : type === "special-otc-4"
              ? setcanClaimOTCSpecial4(value)
              : type === "cliff-otc"
              ? setcanClaimOTCCliff(value)
              : type === "cliff1-otc4"
              ? setcanClaimOTC1Cliff4(value)
              : type === "roundotc-vesting"
              ? setcanClaimRoundOtcVesting(value)
              : type === "dypians-vesting"
              ? setcanClaimDypiansVesting(value)
              : type === "cliff-otc2"
              ? setcanClaimOTCCliff2(value)
              : type === "pool-bonus"
              ? setcanClaimOTCPoolBonus(value)
              : type === "pool-dynamic"
              ? setcanClaimOTCPoolDynamic(value)
              : type === "pool2-dynamic"
              ? setcanClaimOTCPool2Dynamic(value)
              : type === "wod-dynamic"
              ? setcanClaimOTCWodDynamic(value)
              : type === "bonus-otc"
              ? setcanClaimOTCBonus(value)
              : selectedRound?.id === "seed"
              ? setcanClaim(value)
              : selectedRound?.id === "private"
              ? setcanClaimPrivate(value)
              : selectedRound?.id === "kol"
              ? setcanClaimKol(value)
              : selectedRound?.id === "advisors"
              ? setcanClaimAdvisors(value)
              : setcanClaim(value);
          }}
          selectedRound={selectedRound}
          cliffTime={
            type === "pool"
              ? cliffTimeOtc
              : type === "pool2"
              ? cliffTimeOtc2
              : type === "special-otc"
              ? cliffTimeOtcSpecial
              : type === "special-otc-4"
              ? cliffTimeOtcSpecial4
              : type === "cliff-otc"
              ? cliffTimeOtcCliff
              : type === "cliff1-otc4"
              ? cliffTimeOtc1Cliff4
              : type === "roundotc-vesting"
              ? cliffTimeRoundOtcVesting
              : type === "dypians-vesting"
              ? cliffTimeDypiansVesting
              : type === "cliff-otc2"
              ? cliffTimeOtcCliff2
              : type === "pool-bonus"
              ? cliffTimeOtcPoolBonus
              : type === "pool-dynamic"
              ? cliffTimeOtcPoolDynamic
              : type === "pool2-dynamic"
              ? cliffTimeOtcPool2Dynamic
              : type === "wod-dynamic"
              ? cliffTimeOtcWodDynamic
              : type === "bonus-otc"
              ? cliffTimeOtcBonus
              : selectedRound?.id === "seed"
              ? cliffTime
              : selectedRound?.id === "private"
              ? cliffTimePrivate
              : selectedRound?.id === "kol"
              ? cliffTimeKol
              : selectedRound?.id === "advisors"
              ? cliffTimeAdvisors
              : 0
          }
          type={type}
        />
      </div>
    </div>
  );
};

export default Whitelist;
