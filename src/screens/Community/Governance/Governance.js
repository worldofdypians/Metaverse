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
  refreshBalance
}) => {
  const [createProposalPopup, setCreateProposalPopup] = useState(false);
  const [minWodBalanceForProposal, setminWodBalanceForProposal] = useState(0);
  const [govLoading, setgovLoading] = useState(false);
  const [govStatus, setgovStatus] = useState("initial");
  const [allProposals, setallProposals] = useState([]);
  const [totalProposals, settotalProposals] = useState(0);

  const [depositAmount, setdepositAmount] = useState(0);
  const [depositLoading, setdepositLoading] = useState(false);
  const [depositStatus, setdepositStatus] = useState("initial");
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [withdrawAmount, setwithdrawAmount] = useState(0);
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const [withdrawStatus, setwithdrawStatus] = useState("initial");

  const { BigNumber, reward_token_wod } = window;

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

    let proposals = allProposals;
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
      return { ...item };
    });

    // newProposals = newProposals.map(p => {
    //     p.vault = getVaultByAddress(p._stakingPool)
    //     return p
    // })
    newProposals2 = proposals.concat(newnewProposalsFinal);
    setallProposals(newProposals2);
    settotalProposals(total_proposals);
  };

  const handleApprove = (e) => {
    // e.preventDefault();
    setdepositLoading(true);

    let amount = depositAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    reward_token_wod
      .approve(window.config.governance_address, amount)
      .then(() => {
        setdepositLoading(false);
        setdepositStatus("deposit");
      })
      .catch((e) => {
        setdepositLoading(false);
        setdepositStatus("error");
        window.alertify.error(e?.message);
        setTimeout(() => {
          setdepositAmount(0);
          setdepositStatus("initial");
        }, 8000);
      });
  };

  const handleAddVote = async (proposalId, option) => {
    setdepositLoading(true);
    window.web3 = new Web3(window.ethereum);
    const governanceSc = new window.web3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );
    let amount = depositAmount;
    amount = new BigNumber(amount).times(1e18).toFixed(0);
    await governanceSc.methods
      .addVotes(proposalId, option, amount)
      .then(() => {
        setdepositLoading(false);
        setdepositStatus("success");
      })
      .catch((e) => {
        setdepositLoading(false);
        setdepositStatus("error");
        window.alertify.error(e?.message);
        setTimeout(() => {
          setdepositLoading(false);
          setdepositStatus("initial");
        }, 8000);
      });
  };

  const handleRemoveVote = async(proposalId) => {
    // e.preventDefault();
    setwithdrawLoading(true)
    window.web3 = new Web3(window.ethereum);
    const governanceSc = new window.web3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );
      let amount = withdrawAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
      await governanceSc.methods
        .removeVotes(proposalId, amount)
        .then(() => {
          setwithdrawLoading(false);
          setwithdrawStatus("success");
        })
        .catch((e) => {
          setwithdrawLoading(false);
          setwithdrawStatus("error");
          window.alertify.error(e?.message )
          setTimeout(() => {
            setwithdrawLoading(false);
            setwithdrawStatus("initial");
            setwithdrawAmount(0)
          }, 8000);
        });
    
  };

  const handleClaim = async() => {
    window.web3 = new Web3(window.ethereum);
    const governanceSc = new window.web3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );
 
      await governanceSc.methods.withdrawAllTokens().send({from: coinbase}).then(()=>{
         refreshBalance();
      }).catch((e)=>{console.error(e)});
     
 
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
            setTimeout(() => {
              setgovStatus("initial");
              setCreateProposalPopup(false);
            }, 5000);
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
          setTimeout(() => {
            setgovStatus("initial");
            setCreateProposalPopup(false);
          }, 5000);
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Governance";
    getProposalInfo();
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
