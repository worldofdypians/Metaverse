import React, { useEffect, useState } from "react";
import "./_governance.scss";
import GovernanceContent from "./GovernanceContent/GovernanceContent";
import GovernanceHero from "./GovernanceHero/GovernanceHero";
import CreateProposal from "./CreateProposal/CreateProposal";
import { ethers } from "ethers";
import Web3 from "web3";

const Governance = ({
  isConnected,
  coinbase,
  chainId,
  binanceW3WProvider,
  wodBalance,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  handleConnection,
}) => {
  const [createProposalPopup, setCreateProposalPopup] = useState(false);
  const [minWodBalanceForProposal, setminWodBalanceForProposal] = useState(0);
  const [govLoading, setgovLoading] = useState(false);
  const [govStatus, setgovStatus] = useState("initial");
  const [allProposals, setallProposals] = useState([]);
  const [totalProposals, settotalProposals] = useState(0);
  const today = new Date();

  const getProposalInfo = async () => {
    const governanceSc = new window.bscWeb3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );
    const minAmount = await governanceSc.methods
      .MIN_BALANCE_TO_INIT_PROPOSAL()
      .call()
      .catch((e) => {
        console.error(e);
      });
    const minAmount_formatted = new window.BigNumber(minAmount)
      .div(1e18)
      .toFixed(6);
    setminWodBalanceForProposal(minAmount_formatted);
  };

  const getProposal = async (_proposalId) => {
    if (_proposalId) {
      const governanceSc = new window.bscWeb3.eth.Contract(
        window.GOVERNANCE_ABI,
        window.config.governance_address
      );
      let p = await governanceSc.methods
        .getProposal(_proposalId)
        .call()
        .catch((e) => {
          console.error(e);
        });
      return p;
    }
  };
  const refreshProposals = async () => {
    const governanceSc = new window.bscWeb3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );

    let total_proposals = Number(
      await governanceSc.methods
        .lastIndex()
        .call()
        .catch((e) => {
          console.error(e);
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
  };

  const handleSubmitProposal = async (subject, desc) => {
    window.web3 = new Web3(window.ethereum);
    const governanceSc = new window.web3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );

    setgovLoading(true);

    if (Number(wodBalance) < Number(minWodBalanceForProposal)) {
      window.alertify.error("Insufficient Governance Token Balance!");
      setgovLoading(false);
      setgovStatus("error");
      setTimeout(() => {
        setgovStatus("initial");
      }, 5000);
      return;
    } else {
      if (window.WALLET_TYPE !== "binance") {
        await governanceSc.methods
          .proposeText(desc)
          .send({ from: coinbase })
          .then(() => {
            setgovLoading(false);
            setgovStatus("success");
            refreshProposals();
            setTimeout(() => {
              setgovStatus("initial");
              setCreateProposalPopup(false);
            }, 3000);
          })
          .catch((e) => {
            setgovLoading(false);
            setgovStatus("error");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setgovStatus("initial");
            }, 5000);
          });
      } else if (window.WALLET_TYPE === "binance") {
        let govSc = new ethers.Contract(
          window.config.governance_address,
          window.GOVERNANCE_ABI,
          binanceW3WProvider.getSigner()
        );
        const txResponse = await govSc.proposeText(desc).catch((e) => {
          setgovLoading(false);
          setgovStatus("error");
          window.alertify.error(e?.message);
          setTimeout(() => {
            setgovStatus("initial");
          }, 5000);
        });
        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setgovLoading(false);
          setgovStatus("success");
          refreshProposals();
          setTimeout(() => {
            setgovStatus("initial");
            setCreateProposalPopup(false);
          }, 3000);
        }
      }
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
        />
      )}
    </>
  );
};

export default Governance;
