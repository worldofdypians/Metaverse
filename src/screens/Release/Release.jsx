import React, { useState, useEffect } from "react";
import "./release.css";
import { switchNetworkWagmi } from "../../utils/wagmiSwitchChain";
import { IDO_ABI } from "./abis";
import ReleaseHero from "./ReleaseHero/ReleaseHero";
import ReleaseContent from "./ReleaseContent/ReleaseContent";
import StakingBanner from "./StakingBanner/StakingBanner";
import { formatUnits } from "viem";

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m
    </h6>
  );
};

const Release = ({
  isEOA,
  chainId,
  isConnected,
  handleConnection,
  coinbase,
  handleSwitchNetwork,
  network_matchain,
  walletClient,
  publicClient,
  wagmiWalletClient,
  wagmiPublicClient,
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

  const poolCap = 20000;

  // Determine which clients to use based on wallet type
  const isMatchIdWallet = window.WALLET_TYPE === "matchId";
  const activePublicClient = isMatchIdWallet ? publicClient : wagmiPublicClient;
  const activeWalletClient = isMatchIdWallet ? walletClient : wagmiWalletClient;

  const getInfo = async () => {
    if (!activePublicClient || !coinbase) return;

    try {
      //availableTGE -> If 1, he has to claim 'releaseProcent' at TGE (end of 'cliff'), if 0, he has already claimed 'releaseProcent';
      const availableTGE = await activePublicClient.readContract({
        address: window.config.ido_address,
        abi: IDO_ABI,
        functionName: "availableTGE",
        args: [coinbase],
      }).catch(() => 0);

      setcanClaim(Number(availableTGE) === 1);

      //getPendingUnlocked(address _holder) -> It will give you the pending tokens that are available to Claim;
      const tokensToClaimAmount = await activePublicClient.readContract({
        address: window.config.ido_address,
        abi: IDO_ABI,
        functionName: "getPendingUnlocked",
        args: [coinbase],
      }).catch(() => 0n);

      const tokensToClaimAmount_formatted = Number(
        formatUnits(tokensToClaimAmount, 18)
      ).toFixed(6);
      setcanClaim(tokensToClaimAmount_formatted > 0);
      setpendingTokens(tokensToClaimAmount_formatted);

      //claimedTokens(address) -> Return total WOD tokens Claimed in general by single user;
      const totalClaimedTokensByUser = await activePublicClient.readContract({
        address: window.config.ido_address,
        abi: IDO_ABI,
        functionName: "claimedTokens",
        args: [coinbase],
      }).catch(() => 0n);

      const totalClaimedTokensByUser_formatted = Number(
        formatUnits(totalClaimedTokensByUser, 18)
      ).toFixed(6);
      setuserClaimedTokens(totalClaimedTokensByUser_formatted);

      //vestedTokens(address) -> Return total WOD tokens vested for single user;
      const totalVestedTokensPerUser = await activePublicClient.readContract({
        address: window.config.ido_address,
        abi: IDO_ABI,
        functionName: "vestedTokens",
        args: [coinbase],
      }).catch(() => 0n);

      const totalVestedTokensPerUser_formatted = Number(
        formatUnits(totalVestedTokensPerUser, 18)
      ).toFixed(6);
      setuserVestedTokens(totalVestedTokensPerUser_formatted);
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  const getInfoTimer = async () => {
    if (!activePublicClient || !coinbase) return;

    try {
      //  cliff -> Lock time until TGE release.
      //  When cliff will pass (deployTime + cliff) it will be available to claim the vested tokens - 'releaseProcent';
      const lastClaimedTime = await activePublicClient.readContract({
        address: window.config.ido_address,
        abi: IDO_ABI,
        functionName: "lastClaimedTime",
        args: [coinbase],
      }).catch(() => 0n);

      const today = new Date();
      const lastClaimedTimeMs = Number(lastClaimedTime) * 1000;

      if (lastClaimedTime && lastClaimedTimeMs > today.getTime()) {
        setcliffTime(lastClaimedTimeMs);
      } else {
        setcliffTime(0);
      }
    } catch (error) {
      console.error("Error fetching timer info:", error);
    }
  };

  const handleClaim = async () => {
    if (!activeWalletClient || !activePublicClient) {
      window.alertify.error("Wallet not connected");
      return;
    }

    setclaimLoading(true);

    try {
      const hash = await activeWalletClient.writeContract({
        address: window.config.ido_address,
        abi: IDO_ABI,
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
      window.alertify.error(error?.shortMessage || error?.message || "Transaction failed");
      setclaimStatus("failed");
      setclaimLoading(false);
      setTimeout(() => {
        setclaimStatus("initial");
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
    if (coinbase && isConnected) {
      getInfoTimer();
    }
  }, [coinbase, isConnected]);

  useEffect(() => {
    document.title = "Claim WOD";

    window.scrollTo(0, 0);
  }, []);

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
          isEOA={isEOA}
          isConnected={isConnected}
          chainId={chainId}
          coinbase={coinbase}
          onConnect={handleConnection}
          handleSwitchChain={handleEthPool}
          wodBalance={selectedRound?.id === "ido" ? pendingTokens : 0}
          userClaimedTokens={
            selectedRound?.id === "ido" ? userClaimedTokens : 0
          }
          totalVestedTokens={selectedRound?.id === "ido" ? userVestedTokens : 0}
          handleClaim={() => {
            selectedRound?.id === "ido" ? handleClaim() : console.log("");
          }}
          claimStatus={selectedRound?.id === "ido" ? claimStatus : "initial"}
          claimLoading={selectedRound?.id === "ido" ? claimLoading : false}
          startedVesting={selectedRound?.id === "ido" ? startedVesting : false}
          canClaim={selectedRound?.id === "ido" ? canClaim : false}
          selectedRound={selectedRound}
          cliffTime={cliffTime}
        />
      </div>
    </div>
  );
};

export default Release;
