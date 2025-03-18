import React, { useState, useEffect } from "react";
import "./whitelist.css";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Web3 from "web3";
// import wallet from "../FARMINNG/assets/wallet.svg";

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
} from "./abis";
import Countdown from "react-countdown";
import WhitelistHero from "./WhitelistHero/WhitelistHero";
import WhitelistContent from "./WhitelistContent/WhitelistContent";
import StakingBanner from "../Release/StakingBanner/StakingBanner";
import { ethers } from "ethers";

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m
    </h6>
  );
};

const Whitelist = ({
  chainId,
  isConnected,
  handleConnection,
  coinbase,
  handleSwitchNetwork,
  type,
  network_matchain,
  walletClient,
  binanceW3WProvider,
}) => {
  const [cliffTime, setcliffTime] = useState(0);
  const [cliffTimePrivate, setcliffTimePrivate] = useState(0);
  const [cliffTimeKol, setcliffTimeKol] = useState(0);
  const [cliffTimeAdvisors, setcliffTimeAdvisors] = useState(0);
  const [cliffTimeOtc, setcliffTimeOtc] = useState(0);

  const [releaseProcent, setreleaseProcent] = useState(0);
  const [pendingTokens, setpendingTokens] = useState(0);
  const [userClaimedTokens, setuserClaimedTokens] = useState(0);
  const [userVestedTokens, setuserVestedTokens] = useState(0);

  const [pendingTokensOTC, setpendingTokensOTC] = useState(0);
  const [userClaimedTokensOTC, setuserClaimedTokensOTC] = useState(0);
  const [userVestedTokensOTC, setuserVestedTokensOTC] = useState(0);

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

  const getInfo = async () => {
    let isSpecial = false;
    let isSpecialSeed = false;

    if (coinbase) {
      if (specialWallets.includes(coinbase.toLowerCase())) {
        isSpecial = true;
      } else isSpecial = false;
    }

    if (coinbase) {
      if (specialWalletsSeed.includes(coinbase.toLowerCase())) {
        isSpecialSeed = true;
      } else isSpecialSeed = false;
    }

    const vestingSc = new window.bscWeb3.eth.Contract(
      isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI,
      isSpecialSeed
        ? window.config.vesting_special_address
        : window.config.vesting_address
    );

    const otcSc = new window.bscWeb3.eth.Contract(
      OTC_ABI,
      window.config.otc_address
    );

    const privateSc = new window.bscWeb3.eth.Contract(
      PRIVATE_ABI,
      window.config.private_address
    );

    const kolSc = new window.bscWeb3.eth.Contract(
      KOL_ABI,
      isSpecial ? window.config.kol2_address : window.config.kol_address
    );

    const advisorsSc = new window.bscWeb3.eth.Contract(
      ADVISORS_ABI,
      window.config.advisors_address
    );

    //  releaseProcent -> Procent (%) of the Amount Vested which will be available at TGE -> after 'cliff' has passed;
    const releaseProcent = await vestingSc.methods
      .releaseProcent()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setreleaseProcent(releaseProcent / 100);

    const isstartVesting = await vestingSc.methods
      .startVesting()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setstartedVesting(isstartVesting);
    //lockDuration -> Vesting period, this will start and release tokens, once 'cliff' has passed;
    // const lockDuration = await vestingSc.methods
    //   .lockDuration()
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });

    //availableTGE -> If 1, he has to claim 'releaseProcent' at TGE (end of 'cliff'), if 0, he has already claimed 'releaseProcent';
    let availableTGE = 0;
    if (coinbase) {
      availableTGE = await vestingSc.methods
        .availableTGE(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    setcanClaim(Number(availableTGE) === 1);

    let availableTGE_OTC = 0;
    if (coinbase) {
      availableTGE_OTC = await otcSc.methods
        .availableTGE(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    setcanClaimOTC(Number(availableTGE_OTC) === 1);

    let availableTGEPrivate = 0;
    if (coinbase) {
      availableTGEPrivate = await privateSc.methods
        .availableTGE(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    setcanClaimPrivate(Number(availableTGEPrivate) === 1);

    let availableTGEKol = 0;
    if (coinbase) {
      if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) !== undefined
      ) {
        availableTGEKol = 0;
      } else if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) === undefined
      ) {
        availableTGEKol = await kolSc.methods
          .availableTGE(coinbase)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });
      }
    }

    setcanClaimKol(Number(availableTGEKol) === 1);

    let availableTGEAdvisors = 0;
    if (coinbase) {
      availableTGEAdvisors = await advisorsSc.methods
        .availableTGE(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    setcanClaimAdvisors(Number(availableTGEAdvisors) === 1);

    //getPendingUnlocked(address _holder) -> It will give you the pending tokens that are available to Claim;
    let tokensToClaimAmount = 0;
    if (coinbase) {
      tokensToClaimAmount = await vestingSc.methods
        .getPendingUnlocked(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    const tokensToClaimAmount_formatted = new window.BigNumber(
      tokensToClaimAmount / 1e18
    ).toFixed(6);
    setcanClaim(tokensToClaimAmount_formatted > 0);
    setpendingTokens(tokensToClaimAmount_formatted);

    let tokensToClaimAmountOTC = 0;
    if (coinbase) {
      tokensToClaimAmountOTC = await otcSc.methods
        .getPendingUnlocked(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    const tokensToClaimAmountOTC_formatted = new window.BigNumber(
      tokensToClaimAmountOTC / 1e18
    ).toFixed(6);
    setcanClaimOTC(tokensToClaimAmountOTC_formatted > 0);
    setpendingTokensOTC(tokensToClaimAmountOTC_formatted);

    let tokensToClaimAmountPrivate = 0;
    if (coinbase) {
      tokensToClaimAmountPrivate = await privateSc.methods
        .getPendingUnlocked(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    const tokensToClaimAmountPrivate_formatted = new window.BigNumber(
      tokensToClaimAmountPrivate / 1e18
    ).toFixed(6);
    // setcanClaim(tokensToClaimAmountPrivate_formatted > 0);
    setpendingTokensPrivate(tokensToClaimAmountPrivate_formatted);

    let tokensToClaimAmountKol = 0;
    if (coinbase) {
      if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) !== undefined
      ) {
        tokensToClaimAmountKol = 0;
      } else if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) === undefined
      ) {
        tokensToClaimAmountKol = await kolSc.methods
          .getPendingUnlocked(coinbase)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });
      }
    }

    const tokensToClaimAmountKol_formatted = new window.BigNumber(
      tokensToClaimAmountKol / 1e18
    ).toFixed(6);
    // setcanClaim(tokensToClaimAmountKol_formatted > 0);
    setpendingTokensKOL(tokensToClaimAmountKol_formatted);

    let tokensToClaimAmountAdvisors = 0;
    if (coinbase) {
      tokensToClaimAmountAdvisors = await advisorsSc.methods
        .getPendingUnlocked(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    const tokensToClaimAmountAdvisors_formatted = new window.BigNumber(
      tokensToClaimAmountAdvisors / 1e18
    ).toFixed(6);
    // setcanClaim(tokensToClaimAmountAdvisors_formatted > 0);
    setpendingTokensAdvisors(tokensToClaimAmountAdvisors_formatted);

    //getTotalClaimedTokens() -> Return total WOD tokens Claimed in general by ppl;

    // const totalWodTokensClaimed = await vestingSc.methods
    //   .getTotalClaimedTokens()
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });

    //claimedTokens(address) -> Return total WOD tokens Claimed in general by single user;
    let totalClaimedTokensByUser = 0;
    if (coinbase) {
      totalClaimedTokensByUser = await vestingSc.methods
        .claimedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalClaimedTokensByUser_formatted = new window.BigNumber(
        totalClaimedTokensByUser / 1e18
      ).toFixed(6);

      setuserClaimedTokens(totalClaimedTokensByUser_formatted);
    }

    let totalClaimedTokensByUserOTC = 0;
    if (coinbase) {
      totalClaimedTokensByUserOTC = await otcSc.methods
        .claimedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalClaimedTokensByUserOTC_formatted = new window.BigNumber(
        totalClaimedTokensByUserOTC / 1e18
      ).toFixed(6);

      setuserClaimedTokensOTC(totalClaimedTokensByUserOTC_formatted);
    }

    let totalClaimedTokensByUserPrivate = 0;
    if (coinbase) {
      totalClaimedTokensByUserPrivate = await privateSc.methods
        .claimedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalClaimedTokensByUserPrivate_formatted = new window.BigNumber(
        totalClaimedTokensByUserPrivate / 1e18
      ).toFixed(6);

      setuserClaimedTokensPrivate(totalClaimedTokensByUserPrivate_formatted);
    }

    let totalClaimedTokensByUserKol = 0;
    if (coinbase) {
      if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) !== undefined
      ) {
        totalClaimedTokensByUserKol = 0;
      } else if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) === undefined
      ) {
        totalClaimedTokensByUserKol = await kolSc.methods
          .claimedTokens(coinbase)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });
      }
    }
    const totalClaimedTokensByUserKol_formatted = new window.BigNumber(
      totalClaimedTokensByUserKol / 1e18
    ).toFixed(6);
    setuserClaimedTokensKOL(totalClaimedTokensByUserKol_formatted);

    let totalClaimedTokensByUserAdvisors = 0;
    if (coinbase) {
      totalClaimedTokensByUserAdvisors = await advisorsSc.methods
        .claimedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalClaimedTokensByUserAdvisors_formatted = new window.BigNumber(
        totalClaimedTokensByUserAdvisors / 1e18
      ).toFixed(6);

      setuserClaimedTokensAdvisors(totalClaimedTokensByUserAdvisors_formatted);
    }

    //claimedTokens(address) -> Return total WOD tokens Claimed in general by single user;
    let totalVestedTokensPerUser = 0;
    if (coinbase) {
      totalVestedTokensPerUser = await vestingSc.methods
        .vestedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalClaimedTokensByUser_formatted = new window.BigNumber(
        totalVestedTokensPerUser / 1e18
      ).toFixed(6);

      setuserVestedTokens(totalClaimedTokensByUser_formatted);
    }

    let totalVestedTokensPerUserOTC = 0;
    if (coinbase) {
      totalVestedTokensPerUserOTC = await otcSc.methods
        .vestedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalClaimedTokensByUserOTC_formatted = new window.BigNumber(
        totalVestedTokensPerUserOTC / 1e18
      ).toFixed(6);

      setuserVestedTokensOTC(totalClaimedTokensByUserOTC_formatted);
    }

    let totalVestedTokensPerUserPrivate = 0;
    if (coinbase) {
      totalVestedTokensPerUserPrivate = await privateSc.methods
        .vestedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalVestedTokensPerUserPrivate_formatted = new window.BigNumber(
        totalVestedTokensPerUserPrivate / 1e18
      ).toFixed(6);

      setuserVestedTokensPrivate(totalVestedTokensPerUserPrivate_formatted);
    }

    let totalVestedTokensPerUserKol = 0;
    if (coinbase) {
      if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) !== undefined
      ) {
        totalVestedTokensPerUserKol = 0;
      } else if (
        blockedAccounts.find((item) => {
          return item.toLowerCase() === coinbase.toLowerCase();
        }) === undefined
      ) {
        totalVestedTokensPerUserKol = await kolSc.methods
          .vestedTokens(coinbase)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });
      }
    }
    const totalVestedTokensPerUserKol_formatted = new window.BigNumber(
      totalVestedTokensPerUserKol / 1e18
    ).toFixed(6);
    setuserVestedTokensKOL(totalVestedTokensPerUserKol_formatted);

    let totalVestedTokensPerUserAdvisors = 0;
    if (coinbase) {
      totalVestedTokensPerUserAdvisors = await advisorsSc.methods
        .vestedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const totalVestedTokensPerUserAdvisors_formatted = new window.BigNumber(
        totalVestedTokensPerUserAdvisors / 1e18
      ).toFixed(6);

      setuserVestedTokensAdvisors(totalVestedTokensPerUserAdvisors_formatted);
    }

    //getStakersList(uint startIndex, uint endIndex) -> Return list of Adress that are in the Vesting including info as 'lastClaimed', 'VestedTokens', 'ClaimedTokens so far'.;

    // const stakersList = await vestingSc.methods
    //   .getStakersList(startIndex, endIndex)
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });

    //getNumberOfWallets() -> Return the number of Adresses that are in the vesting;

    // const addressesInVesting = await vestingSc.methods
    //   .getNumberOfWallets(startIndex, endIndex)
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });
  };

  const getInfoTimer = async () => {
    let isSpecial = false;
    let isSpecialSeed = false;

    if (coinbase) {
      if (specialWallets.includes(coinbase.toLowerCase())) {
        isSpecial = true;
      } else isSpecial = false;
    }

    if (coinbase) {
      if (specialWalletsSeed.includes(coinbase.toLowerCase())) {
        isSpecialSeed = true;
      } else isSpecialSeed = false;
    }

    const vestingSc = new window.bscWeb3.eth.Contract(
      isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI,
      isSpecialSeed
        ? window.config.vesting_special_address
        : window.config.vesting_address
    );

    const otcSc = new window.bscWeb3.eth.Contract(
      OTC_ABI,
      window.config.otc_address
    );

    const privateSc = new window.bscWeb3.eth.Contract(
      PRIVATE_ABI,
      window.config.private_address
    );

    const kolSc = new window.bscWeb3.eth.Contract(
      KOL_ABI,
      isSpecial ? window.config.kol2_address : window.config.kol_address
    );

    const advisorsSc = new window.bscWeb3.eth.Contract(
      ADVISORS_ABI,
      window.config.advisors_address
    );

    //  cliff -> Lock time until TGE release.
    //  When cliff will pass (deployTime + cliff) it will be available to claim the vested tokens - 'releaseProcent';

    const lastClaimedTime = await vestingSc.methods
      .lastClaimedTime(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const lastClaimedTimeOTC = await otcSc.methods
      .lastClaimedTime(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const lastClaimedTimePrivate = await privateSc.methods
      .lastClaimedTime(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const lastClaimedTimeKol = await kolSc.methods
      .lastClaimedTime(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const lastClaimedTimeAdvisors = await advisorsSc.methods
      .lastClaimedTime(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const today = new Date();

    // if (lastClaimedTime && Number(lastClaimedTime * 1000) > today.getTime()) {
    setcliffTime(Number(lastClaimedTime * 1000));
    // } else {
    //   setcliffTime(0);
    // }

    // if (lastClaimedTimeOTC && Number(lastClaimedTimeOTC * 1000) > today.getTime()) {
    setcliffTimeOtc(Number(lastClaimedTimeOTC * 1000));
    // } else {
    //   setcliffTimeOtc(0);
    // }

    // if (
    //   lastClaimedTimePrivate &&
    //   Number(lastClaimedTimePrivate * 1000) > today.getTime()
    // ) {
    setcliffTimePrivate(Number(lastClaimedTimePrivate * 1000));
    // } else {
    //   setcliffTimePrivate(0);
    // }

    // if (
    //   lastClaimedTimeKol &&
    //   Number(lastClaimedTimeKol * 1000) > today.getTime()
    // ) {
    setcliffTimeKol(Number(lastClaimedTimeKol * 1000));
    // }
    // else {
    //   setcliffTimeKol(0);
    // }

    // if (
    //   lastClaimedTimeAdvisors &&
    //   Number(lastClaimedTimeAdvisors * 1000) > today.getTime()
    // ) {
    setcliffTimeAdvisors(Number(lastClaimedTimeAdvisors * 1000));
    // } else {
    //   setcliffTimeAdvisors(0);
    // }
  };

  const handleClaim = async () => {
    console.log("seed");
    setclaimLoading(true);
    if (window.WALLET_TYPE === "matchId") {
      let isSpecialSeed = false;

      if (walletClient) {
        if (coinbase) {
          if (specialWalletsSeed.includes(coinbase.toLowerCase())) {
            isSpecialSeed = true;
          } else isSpecialSeed = false;
        }
        await walletClient
          .writeContract({
            address: isSpecialSeed
              ? window.config.vesting_special_address
              : window.config.vesting_address,
            abi: isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI,
            functionName: "claim",
            args: [],
          })
          .then(() => {
            setclaimStatus("success");
            setclaimLoading(false);

            setTimeout(() => {
              setclaimStatus("initial");
              getInfo();
              getInfoTimer();
            }, 5000);
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);

            setclaimStatus("failed");
            setclaimLoading(false);
            setTimeout(() => {
              setclaimStatus("initial");
            }, 5000);
          });
      }
    } else if (window.WALLET_TYPE === "binance") {
      let isSpecialSeed = false;
      if (coinbase) {
        if (specialWalletsSeed.includes(coinbase.toLowerCase())) {
          isSpecialSeed = true;
        } else isSpecialSeed = false;
      }
      const vestingSc = new ethers.Contract(
        isSpecialSeed
          ? window.config.vesting_special_address
          : window.config.vesting_address,
        isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI,
        binanceW3WProvider.getSigner()
      );
      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await vestingSc
        .claim({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatus("failed");
          setclaimLoading(false);
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setclaimStatus("success");
        setclaimLoading(false);

        setTimeout(() => {
          setclaimStatus("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      }
    } else {
      let web3 = new Web3(window.ethereum);
      let isSpecialSeed = false;
      if (coinbase) {
        if (specialWalletsSeed.includes(coinbase.toLowerCase())) {
          isSpecialSeed = true;
        } else isSpecialSeed = false;
      }

      const vestingSc = new web3.eth.Contract(
        isSpecialSeed ? VESTING_SPECIAL_ABI : VESTING_ABI,
        isSpecialSeed
          ? window.config.vesting_special_address
          : window.config.vesting_address
      );

      const gasPrice = await window.bscWeb3.eth.getGasPrice();
      console.log("gasPrice", gasPrice);
      const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
      // const increasedGwei = parseInt(currentGwei) + 2;
      // console.log("increasedGwei", increasedGwei);

      const transactionParameters = {
        gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
      };

      await vestingSc.methods
        .claim()
        .estimateGas({ from: await window.getCoinbase() })
        .then((gas) => {
          transactionParameters.gas = web3.utils.toHex(gas);
        })
        .catch(function (error) {
          console.log(error);
        });

      await vestingSc.methods
        .claim()
        .send({ from: await window.getCoinbase(), ...transactionParameters })
        .then(() => {
          setclaimStatus("success");
          setclaimLoading(false);

          setTimeout(() => {
            setclaimStatus("initial");
            getInfo();
            getInfoTimer();
          }, 5000);
        })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatus("failed");
          setclaimLoading(false);
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        });
    }
  };

  const handleClaimOTC = async () => {
    console.log("otc");
    setclaimLoadingOTC(true);
    if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        await walletClient
          .writeContract({
            address: window.config.otc_address,
            abi: OTC_ABI,
            functionName: "claim",
            args: [],
          })
          .then(() => {
            setclaimStatusOTC("success");
            setclaimLoadingOTC(false);

            setTimeout(() => {
              setclaimStatusOTC("initial");
              getInfo();
              getInfoTimer();
            }, 5000);
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);

            setclaimStatusOTC("failed");
            setclaimLoadingOTC(false);
            setTimeout(() => {
              setclaimStatusOTC("initial");
            }, 5000);
          });
      }
    } else if (window.WALLET_TYPE === "binance") {
      const otcSc = new ethers.Contract(
        window.config.otc_address,
        OTC_ABI,
        binanceW3WProvider.getSigner()
      );
      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await otcSc
        .claim({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusOTC("failed");
          setclaimLoadingOTC(false);
          setTimeout(() => {
            setclaimStatusOTC("initial");
          }, 5000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setclaimStatusOTC("success");
        setclaimLoadingOTC(false);

        setTimeout(() => {
          setclaimStatusOTC("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      }
    } else {
      let web3 = new Web3(window.ethereum);

      const otcSc = new web3.eth.Contract(OTC_ABI, window.config.otc_address);

      const gasPrice = await window.bscWeb3.eth.getGasPrice();
      console.log("gasPrice", gasPrice);
      const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
      // const increasedGwei = parseInt(currentGwei) + 2;
      // console.log("increasedGwei", increasedGwei);

      const transactionParameters = {
        gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
      };

      await otcSc.methods
        .claim()
        .estimateGas({ from: await window.getCoinbase() })
        .then((gas) => {
          transactionParameters.gas = web3.utils.toHex(gas);
        })
        .catch(function (error) {
          console.log(error);
        });

      await otcSc.methods
        .claim()
        .send({ from: await window.getCoinbase(), ...transactionParameters })
        .then(() => {
          setclaimStatusOTC("success");
          setclaimLoadingOTC(false);

          setTimeout(() => {
            setclaimStatusOTC("initial");
            getInfo();
            getInfoTimer();
          }, 5000);
        })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusOTC("failed");
          setclaimLoadingOTC(false);
          setTimeout(() => {
            setclaimStatusOTC("initial");
          }, 5000);
        });
    }
  };

  const handleClaimPrivate = async () => {
    console.log("private");

    setclaimLoadingPrivate(true);
    if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        await walletClient
          .writeContract({
            address: window.config.private_address,
            abi: PRIVATE_ABI,
            functionName: "claim",
            args: [],
          })
          .then(() => {
            setclaimStatusPrivate("success");
            setclaimLoadingPrivate(false);

            setTimeout(() => {
              setclaimStatusPrivate("initial");
              getInfo();
              getInfoTimer();
            }, 5000);
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);

            setclaimStatusPrivate("failed");
            setclaimLoadingPrivate(false);
            setTimeout(() => {
              setclaimStatusPrivate("initial");
            }, 5000);
          });
      }
    } else if (window.WALLET_TYPE === "binance") {
      const privateSc = new ethers.Contract(
        window.config.private_address,
        PRIVATE_ABI,
        binanceW3WProvider.getSigner()
      );
      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await privateSc
        .claim({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusPrivate("failed");
          setclaimLoadingPrivate(false);
          setTimeout(() => {
            setclaimStatusPrivate("initial");
          }, 5000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setclaimStatusPrivate("success");
        setclaimLoadingPrivate(false);

        setTimeout(() => {
          setclaimStatusPrivate("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      }
    } else {
      let web3 = new Web3(window.ethereum);
      const privateSc = new web3.eth.Contract(
        PRIVATE_ABI,
        window.config.private_address,
        { from: await window.getCoinbase() }
      );

      await privateSc.methods
        .claim()
        .send({ from: await window.getCoinbase() })
        .then(() => {
          setclaimStatusPrivate("success");
          setclaimLoadingPrivate(false);

          setTimeout(() => {
            setclaimStatusPrivate("initial");
            getInfo();
            getInfoTimer();
          }, 5000);
        })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusPrivate("failed");
          setclaimLoadingPrivate(false);
          setTimeout(() => {
            setclaimStatusPrivate("initial");
          }, 5000);
        });
    }
  };

  const handleClaimKol = async () => {
    console.log("kol");
    setclaimLoadingKol(true);
    if (window.WALLET_TYPE === "matchId") {
      let isSpecial = false;

      if (walletClient) {
        let isSpecial = false;
        if (coinbase) {
          if (specialWallets.includes(coinbase.toLowerCase())) {
            isSpecial = true;
          } else isSpecial = false;
        }

        await walletClient
          .writeContract({
            address: isSpecial
              ? window.config.kol2_address
              : window.config.kol_address,
            abi: KOL_ABI,
            functionName: "claim",
            args: [],
          })
          .then(() => {
            setclaimStatusKol("success");
            setclaimLoadingKol(false);

            setTimeout(() => {
              setclaimStatusKol("initial");
              getInfo();
              getInfoTimer();
            }, 5000);
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);

            setclaimStatusKol("failed");
            setclaimLoadingKol(false);
            setTimeout(() => {
              setclaimStatusKol("initial");
            }, 5000);
          });
      }
    } else if (window.WALLET_TYPE === "binance") {
      let isSpecial = false;
      if (coinbase) {
        if (specialWallets.includes(coinbase.toLowerCase())) {
          isSpecial = true;
        } else isSpecial = false;
      }

      const kolSc = new ethers.Contract(
        isSpecial ? window.config.kol2_address : window.config.kol_address,
        KOL_ABI,
        binanceW3WProvider.getSigner()
      );
      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await kolSc
        .claim({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusKol("failed");
          setclaimLoadingKol(false);
          setTimeout(() => {
            setclaimStatusKol("initial");
          }, 5000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setclaimStatusKol("success");
        setclaimLoadingKol(false);

        setTimeout(() => {
          setclaimStatusKol("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      }
    } else {
      let isSpecial = false;
      if (coinbase) {
        if (specialWallets.includes(coinbase.toLowerCase())) {
          isSpecial = true;
        } else isSpecial = false;
      }

      let web3 = new Web3(window.ethereum);
      const kolSc = new web3.eth.Contract(
        KOL_ABI,
        isSpecial ? window.config.kol2_address : window.config.kol_address,
        {
          from: await window.getCoinbase(),
        }
      );

      await kolSc.methods
        .claim()
        .send({ from: await window.getCoinbase() })
        .then(() => {
          setclaimStatusKol("success");
          setclaimLoadingKol(false);

          setTimeout(() => {
            setclaimStatusKol("initial");
            getInfo();
            getInfoTimer();
          }, 5000);
        })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusKol("failed");
          setclaimLoadingKol(false);
          setTimeout(() => {
            setclaimStatusKol("initial");
          }, 5000);
        });
    }
  };

  const handleClaimAdvisors = async () => {
    console.log("advisors");
    setclaimLoadingAdvisors(true);
    if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        await walletClient
          .writeContract({
            address: window.config.advisors_address,
            abi: ADVISORS_ABI,
            functionName: "claim",
            args: [],
          })
          .then(() => {
            setclaimStatusAdvisors("success");
            setclaimLoadingAdvisors(false);

            setTimeout(() => {
              setclaimStatusAdvisors("initial");
              getInfo();
              getInfoTimer();
            }, 5000);
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);

            setclaimStatusAdvisors("failed");
            setclaimLoadingAdvisors(false);
            setTimeout(() => {
              setclaimStatusAdvisors("initial");
            }, 5000);
          });
      }
    } else if (window.WALLET_TYPE === "binance") {
      const advisorsSc = new ethers.Contract(
        window.config.advisors_address,
        ADVISORS_ABI,
        binanceW3WProvider.getSigner()
      );
      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await advisorsSc
        .claim({ from: coinbase, ...transactionParameters })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusAdvisors("failed");
          setclaimLoadingAdvisors(false);
          setTimeout(() => {
            setclaimStatusAdvisors("initial");
          }, 5000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setclaimStatusAdvisors("success");
        setclaimLoadingAdvisors(false);

        setTimeout(() => {
          setclaimStatusAdvisors("initial");
          getInfo();
          getInfoTimer();
        }, 5000);
      }
    } else {
      let web3 = new Web3(window.ethereum);
      const advisorsSc = new web3.eth.Contract(
        ADVISORS_ABI,
        window.config.advisors_address,
        {
          from: await window.getCoinbase(),
        }
      );

      await advisorsSc.methods
        .claim()
        .send({ from: await window.getCoinbase() })
        .then(() => {
          setclaimStatusAdvisors("success");
          setclaimLoadingAdvisors(false);

          setTimeout(() => {
            setclaimStatusAdvisors("initial");
            getInfo();
            getInfoTimer();
          }, 5000);
        })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);

          setclaimStatusAdvisors("failed");
          setclaimLoadingAdvisors(false);
          setTimeout(() => {
            setclaimStatusAdvisors("initial");
          }, 5000);
        });
    }
  };

  const handleEthPool = async () => {
    if (window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else {
      await handleSwitchNetworkhook("0x38")
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
          isConnected={isConnected}
          chainId={chainId}
          coinbase={coinbase}
          onConnect={handleConnection}
          handleSwitchChain={handleEthPool}
          wodBalance={
            type === "pool"
              ? pendingTokensOTC
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
