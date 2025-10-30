import React, { useEffect, useState } from "react";
import "./_governance.scss";
import GovernanceContent from "./GovernanceContent/GovernanceContent";
import GovernanceHero from "./GovernanceHero/GovernanceHero";
import CreateProposal from "./CreateProposal/CreateProposal";
import { readContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiClient } from "../../../wagmiConnectors";

const Governance = ({
  isConnected,
  coinbase,
  chainId,
  wodBalance,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  handleConnection,
  walletClient,
  publicClient,
  network_matchain,
}) => {
  const [createProposalPopup, setCreateProposalPopup] = useState(false);
  const [minWodBalanceForProposal, setminWodBalanceForProposal] = useState(0);
  const [govLoading, setgovLoading] = useState(false);
  const [govStatus, setgovStatus] = useState("initial");
  const [allProposals, setallProposals] = useState([]);
  const [totalProposals, settotalProposals] = useState(0);
  const today = new Date();

  const getProposalInfo = async () => {
    try {
      const minAmount = await readContract(wagmiClient, {
        address: window.config.governance_address,
        abi: window.GOVERNANCE_ABI,
        functionName: "MIN_BALANCE_TO_INIT_PROPOSAL",
        args: [],
        chainId: 56,
      });

      const minAmount_formatted = new window.BigNumber(minAmount)
        .div(1e18)
        .toFixed(6);
      setminWodBalanceForProposal(minAmount_formatted);
    } catch (e) {
      console.error("Error getting proposal info:", e);
    }
  };

  const getProposal = async (_proposalId) => {
    if (_proposalId) {
      try {
        let p = await readContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "getProposal",
          args: [_proposalId],
          chainId: 56,
        });
        return p;
      } catch (e) {
        console.error("Error getting proposal:", e);
        return undefined;
      }
    }
  };
  const refreshProposals = async () => {
    try {
      let total_proposals = Number(
        await readContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "lastIndex",
          args: [],
          chainId: 56,
        })
      );

      let newProposals = [];
      let newProposals2 = [];

      for (let i = total_proposals; i >= 1; i--) {
        const checkproposal = await getProposal(i);
        if (checkproposal != undefined) {
          newProposals.push(checkproposal);
        }
      }

      newProposals = await Promise.all(newProposals);

      const newnewProposalsFinal = newProposals.map((item) => {
        let action = item._proposalAction;
        const proposalStartTime =
          item._proposalStartTime * 1e3 +
          window.config.vote_duration_in_seconds * 1e3;

        let actionText =
          {
            0: "New Game Events",
            1: "Revamp Events",
            2: "New Bundles",
            3: "Special Offer",
            4: "Feature Request",
            5: "General",
          }[action] || "";

        return {
          ...item,
          subject: actionText,
          expired: today.getTime() > Number(proposalStartTime) ? true : false,
        };
      });

      newProposals2 = [...newnewProposalsFinal].sort(function (a, b) {
        return a._proposalStartTime - b._proposalStartTime;
      });
      setallProposals(newProposals2);
      settotalProposals(total_proposals);
    } catch (e) {
      console.error("Error refreshing proposals:", e);
    }
  };

  const handleSubmitProposal = async (desc) => {
    setgovLoading(true);

    if (Number(wodBalance) < Number(minWodBalanceForProposal)) {
      window.alertify.error("Insufficient Governance Token Balance!");
      setgovLoading(false);
      setgovStatus("error");
      setTimeout(() => {
        setgovStatus("initial");
      }, 5000);
      return;
    }

    try {
      // Use walletClient for MatchID, wagmiClient for all others
      if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          const result = await walletClient.writeContract({
            address: window.config.governance_address,
            abi: window.GOVERNANCE_ABI,
            functionName: "proposeText",
            args: [desc],
          });

          const receipt = await publicClient.waitForTransactionReceipt({
            hash: result,
          });

          if (receipt) {
            setgovLoading(false);
            setgovStatus("success");
            refreshProposals();
            setTimeout(() => {
              setgovStatus("initial");
              setCreateProposalPopup(false);
            }, 3000);
          }
        }
      } else {
        const hash = await writeContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "proposeText",
          args: [desc],
        });

        const receipt = await waitForTransactionReceipt(wagmiClient, {
          hash: hash,
        });

        if (receipt) {
          setgovLoading(false);
          setgovStatus("success");
          refreshProposals();
          setTimeout(() => {
            setgovStatus("initial");
            setCreateProposalPopup(false);
          }, 3000);
        }
      }
    } catch (e) {
      console.error("Error submitting proposal:", e);
      setgovLoading(false);
      setgovStatus("error");
      window.alertify.error(e?.message || e?.shortMessage || "Proposal submission failed");
      setTimeout(() => {
        setgovStatus("initial");
      }, 5000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Governance";
    getProposalInfo();
    refreshProposals();
  }, []);

  return (
    <>
      <div className="container-fluid governance-mainhero-wrapper px-0">
        <div className="d-flex flex-column">
          <GovernanceHero
            onCreateProposal={() => {
              setCreateProposalPopup(true);
            }}
          />
          <GovernanceContent
            totalProposals={totalProposals}
            allProposals={allProposals}
          />
        </div>
      </div>
      {createProposalPopup && (
        <CreateProposal
          onClose={() => {
            setCreateProposalPopup(false);
          }}
          open={createProposalPopup}
          minWodBalanceForProposal={minWodBalanceForProposal}
          onSubmitProposal={handleSubmitProposal}
          isConnected={isConnected}
          chainId={chainId}
          coinbase={coinbase}
          handleSwitchNetwork={handleSwitchNetwork}
          handleSwitchChainGateWallet={handleSwitchChainGateWallet}
          handleSwitchChainBinanceWallet={handleSwitchChainBinanceWallet}
          govStatus={govStatus}
          govLoading={govLoading}
          handleConnection={() => {
            handleConnection();
            setCreateProposalPopup(false);
          }}
          network_matchain={network_matchain}
        />
      )}
    </>
  );
};

export default Governance;
