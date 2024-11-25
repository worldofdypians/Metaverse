import React, { useState, useEffect } from "react";
import "./release.css";

import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Web3 from "web3";
// import wallet from "../FARMINNG/assets/wallet.svg";
import moment from "moment";
import axios from "axios";
import { TOKEN_LOCK_ABI, VESTING_ABI } from "./abis";
import Countdown from "react-countdown";
import ReleaseHero from "./ReleaseHero/ReleaseHero";
import ReleaseContent from "./ReleaseContent/ReleaseContent";
import StakingBanner from "./StakingBanner/StakingBanner";

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m
    </h6>
  );
};

const Release = ({
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
   
  const [cliffTime, setcliffTime] = useState(0);
  const [releaseProcent, setreleaseProcent] = useState(0);
  const [pendingTokens, setpendingTokens] = useState(0);
  const [userClaimedTokens, setuserClaimedTokens] = useState(0);
  const [userVestedTokens, setuserVestedTokens] = useState(0);

  const [pendingTokensIDO, setpendingTokensIDO] = useState(0);
  const [userClaimedTokensIDO, setuserClaimedTokensIDO] = useState(0);
  const [userVestedTokensIDO, setuserVestedTokensPrivate] = useState(0);
 

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

    setcanClaim(Number(availableTGE) === 1 ? true : false);
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

    const amountCliffTime = await vestingSc.methods
      .cliff()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const deployTime = await tokenLockSc.methods
      .unlockTime()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setcliffTime(Number(deployTime) + Number(amountCliffTime));
  };

  const handleClaim = async () => {
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

  const handleClaimIDO = async () => {
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

  const handleRefund = async () => {
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
    await handleSwitchNetworkhook("0x61")
      .then(() => {
        handleSwitchNetwork("97");
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
    <div className="container-fluid release-mainhero-wrapper token-wrapper px-0">
      <div className="d-flex flex-column">
        <ReleaseHero
          onSelectRound={(value) => {
            setselectedRound(value);
          }}
        />
        <StakingBanner />
        <ReleaseContent
          isConnected={isConnected}
          chainId={chainId}
          coinbase={coinbase}
          onConnect={handleConnection}
          handleSwitchChain={handleEthPool}
          wodBalance={pendingTokens}
          userClaimedTokens={userClaimedTokens}
          totalVestedTokens={userVestedTokens}
          handleClaim={handleClaim}
          claimStatus={claimStatus}
          claimLoading={claimLoading}
          startedVesting={startedVesting}
          canClaim={canClaim}
          selectedRound={selectedRound}
        />
      </div>
    </div>
  );
};

export default Release;
