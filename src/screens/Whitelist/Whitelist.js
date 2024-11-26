import React, { useState, useEffect } from "react";
import "./whitelist.css";
import dyp from "./assets/dyp.svg";
import idyp from "./assets/idyp.svg";
import premium from "./assets/premium.png";
import tooltipIcon from "./assets/tooltipIcon.svg";
import usdt from "./assets/usdt.svg";
import eth from "./assets/eth.svg";
import bnb from "./assets/bnb.svg";
import dropArrow from "./assets/dropArrow.svg";
import { shortAddress } from "../Caws/functions/shortAddress";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import { Tooltip } from "@material-ui/core";
import checkIcon from "./assets/checkIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import buyToken from "./assets/buyToken.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Web3 from "web3";
// import wallet from "../FARMINNG/assets/wallet.svg";
import moment from "moment";
import axios from "axios";
import { TOKEN_LOCK_ABI, VESTING_ABI } from "./abis";
import Countdown from "react-countdown";
import WhitelistHero from "./WhitelistHero/WhitelistHero";
import WhitelistContent from "./WhitelistContent/WhitelistContent";
import StakingBanner from "../Release/StakingBanner/StakingBanner";

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
  isPremium,
  userPools,
  hasDypBalance,
  hasiDypBalance,
}) => {
  const [coinDropdown, setCoinDropdown] = useState(false);
  const [chainDropdown, setChainDropdown] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({
    coin: "USDT",
    icon: usdt,
    address: "",
  });
  const [selectedChain, setSelectedChain] = useState({
    chain: "BNB Chain",
    icon: bnb,
  });

  const [slice, setSlice] = useState(5);
  const [loading, setLoading] = useState(false);
  const [cliffTime, setcliffTime] = useState(0);
  const [releaseProcent, setreleaseProcent] = useState(0);
  const [pendingTokens, setpendingTokens] = useState(0);
  const [userClaimedTokens, setuserClaimedTokens] = useState(0);
  const [userVestedTokens, setuserVestedTokens] = useState(0);

  const [pendingTokensPrivate, setpendingTokensPrivate] = useState(0);
  const [userClaimedTokensPrivate, setuserClaimedTokensPrivate] = useState(0);
  const [userVestedTokensPrivate, setuserVestedTokensPrivate] = useState(0);

  const [pendingTokensKOL, setpendingTokensKOL] = useState(0);
  const [userClaimedTokensKOL, setuserClaimedTokensKOL] = useState(0);
  const [userVestedTokensKOL, setuserVestedTokensKOL] = useState(0);

  const [startedVesting, setstartedVesting] = useState(false);
  const [canClaim, setcanClaim] = useState(false);
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [allUserCommitments, setAllUserCommitments] = useState([]);
  const [selectedRound, setselectedRound] = useState();

  let expireDay = new Date("2024-10-16T14:00:00.000+02:00");

  const poolCap = 20000;

  const getInfo = async () => {
    const vestingSc = new window.bscTestWeb3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address
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
    ).toFixed(0);
    setcanClaim(tokensToClaimAmount_formatted > 0);
    setpendingTokens(tokensToClaimAmount_formatted);

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
      ).toFixed(0);

      setuserClaimedTokens(totalClaimedTokensByUser_formatted);
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
      ).toFixed(0);

      setuserVestedTokens(totalClaimedTokensByUser_formatted);
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
    const vestingSc = new window.bscTestWeb3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address
    );

    const tokenLockSc = new window.bscTestWeb3.eth.Contract(
      TOKEN_LOCK_ABI,
      window.config.token_lock_address
    );
    //  cliff -> Lock time until TGE release.
    //  When cliff will pass (deployTime + cliff) it will be available to claim the vested tokens - 'releaseProcent';

    // const amountCliffTime = await vestingSc.methods
    //   .cliff()
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });

    // const deployTime = await tokenLockSc.methods
    //   .unlockTime()
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });

    const lastClaimedTime = await vestingSc.methods
      .lastClaimedTime(coinbase)
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const today = new Date();

    if (lastClaimedTime && Number(lastClaimedTime * 1000) > today.getTime()) {
      setcliffTime(Number(lastClaimedTime * 1000));
    } else {
      setcliffTime(0);
    }
  };

  const handleClaim = async () => {
    setclaimLoading(true);
    let web3 = new Web3(window.ethereum);
    const vestingSc = new web3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address,
      { from: await window.getCoinbase() }
    );

    const gasPrice = await window.bscTestWeb3.eth.getGasPrice();
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
        }, 5000);
      })
      .catch((e) => {
        console.error(e);
        window.alertify.error(e?.message);
        console.log(window.getCoinbase());
        setclaimStatus("failed");
        setclaimLoading(false);
        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
      });
  };

  const handleClaimPrivate = async () => {
    setclaimLoading(true);
    let web3 = new Web3(window.ethereum);
    const vestingSc = new web3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address,
      { from: await window.getCoinbase() }
    );

    await vestingSc.methods
      .claim()
      .send({ from: await window.getCoinbase() })
      .then(() => {
        setclaimStatus("success");
        setclaimLoading(false);

        setTimeout(() => {
          setclaimStatus("initial");
          getInfo();
        }, 5000);
      })
      .catch((e) => {
        console.error(e);
        window.alertify.error(e?.message);
        console.log(window.getCoinbase());
        setclaimStatus("failed");
        setclaimLoading(false);
        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
      });
  };

  const handleClaimKol = async () => {
    setclaimLoading(true);
    let web3 = new Web3(window.ethereum);
    const vestingSc = new web3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address,
      { from: await window.getCoinbase() }
    );

    await vestingSc.methods
      .claim()
      .send({ from: await window.getCoinbase() })
      .then(() => {
        setclaimStatus("success");
        setclaimLoading(false);

        setTimeout(() => {
          setclaimStatus("initial");
          getInfo();
        }, 5000);
      })
      .catch((e) => {
        console.error(e);
        window.alertify.error(e?.message);
        console.log(window.getCoinbase());
        setclaimStatus("failed");
        setclaimLoading(false);
        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
      });
  };

  const handleEthPool = async () => {
    await handleSwitchNetworkhook("0x38")
      .then(() => {
        handleSwitchNetwork("56");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getInfo();
    getInfoTimer();
  }, [coinbase]);

  return (
    <div className="container-fluid whitelist-mainhero-wrapper token-wrapper px-0">
      <div className="d-flex flex-column">
        <WhitelistHero
          onSelectRound={(value) => {
            setselectedRound(value);
          }}
        />
        <StakingBanner />
        <WhitelistContent
          isConnected={isConnected}
          chainId={chainId}
          coinbase={coinbase}
          onConnect={handleConnection}
          handleSwitchChain={handleEthPool}
          wodBalance={selectedRound?.id === 'seed' ? pendingTokens : 0}
          userClaimedTokens={userClaimedTokens}
          totalVestedTokens={userVestedTokens}
          handleClaim={handleClaim}
          claimStatus={claimStatus}
          claimLoading={claimLoading}
          startedVesting={startedVesting}
          canClaim={canClaim}
          selectedRound={selectedRound}
          cliffTime={cliffTime}
        />
      </div>
    </div>
  );
};

export default Whitelist;
