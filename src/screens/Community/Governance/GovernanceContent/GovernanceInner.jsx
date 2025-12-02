import React, { useEffect, useState } from "react";
import "./_governanceContent.scss";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";

import { switchNetworkWagmi } from "../../../../utils/wagmiSwitchChain";
import { Checkbox } from "@mui/material";
import { readContract, writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiClient } from "../../../../wagmiConnectors";

const GovernanceInner = ({
  coinbase,
  isConnected,
  chainId,
  handleConnection,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  refreshBalance,
  wodBalance,
}) => {
  const { proposalId } = useParams();
  const [currentProposal, setCurrentProposal] = useState([]);
  const [myDepositedTokens, setmyDepositedTokens] = useState(0);
  const [depositAmount, setdepositAmount] = useState(0);
  const [depositLoading, setdepositLoading] = useState(false);
  const [depositStatus, setdepositStatus] = useState("initial");
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [withdrawAmount, setwithdrawAmount] = useState(0);
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const [withdrawStatus, setwithdrawStatus] = useState("initial");
  const [selectOption, setselectOption] = useState("0");

  const today = new Date();

  const { BigNumber, reward_token_wod } = window;

  const totalVotes =
    Number(currentProposal?._optionOneVotes) +
    Number(currentProposal?._optionTwoVotes);
  const optionone_percentage =
    (Number(currentProposal?._optionOneVotes) /
      (totalVotes === 0 ? 1 : totalVotes)) *
    100;

  const optiontwo_percentage =
    (Number(currentProposal?._optionTwoVotes) /
      (totalVotes === 0 ? 1 : totalVotes)) *
    100;

  const purchaseDate = currentProposal?._proposalStartTime
    ? new Date(currentProposal?._proposalStartTime * 1000)
    : new Date();
  const endDate = new Date(
    purchaseDate.getTime() + window.config.vote_duration_in_seconds * 1e3
  );

  const handleSetMaxWithdraw = async (e) => {
    if (coinbase && isConnected) {
      try {
        const balance = await readContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "totalDepositedTokens",
          args: [coinbase],
          chainId: 56,
        });
        const balanceFormatted = Number(balance) / 1e18;
        setwithdrawAmount(balanceFormatted);
      } catch (e) {
        console.error("Error getting max withdraw:", e);
        setwithdrawAmount(0);
      }
    }
  };

  const handleSetMaxDeposit = (e) => {
    const depositAmount = wodBalance;
    checkApproval(depositAmount);
    setdepositAmount(depositAmount);
  };

  const switchNetwork = async (hexChainId, chain) => {
    // Extract chainId from hex or use chain number directly
    const chainId = typeof chain === 'number' ? chain : parseInt(hexChainId, 16);
    
    try {
      await switchNetworkWagmi(chainId, chain, {
        handleSwitchNetwork,
        handleSwitchChainGateWallet,
        handleSwitchChainBinanceWallet,
        coinbase,
      });
    } catch (error) {
      // Error handling is done in switchNetworkWagmi
      console.error("Network switch error:", error);
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

        const proposalStartTime =
          p._proposalStartTime * 1e3 +
          window.config.vote_duration_in_seconds * 1e3;

        p.expired = today.getTime() > Number(proposalStartTime) ? true : false;
        setCurrentProposal(p);
        return p;
      } catch (e) {
        console.error("Error getting proposal:", e);
      }
    }
  };

  const getuserInfo = async () => {
    if (coinbase && isConnected) {
      try {
        const balance = await readContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "votesForProposalByAddress",
          args: [coinbase, proposalId],
          chainId: 56,
        });
        const balanceFormatted = Number(balance) / 1e18;
        setmyDepositedTokens(balanceFormatted);
      } catch (e) {
        console.error("Error getting user info:", e);
        setmyDepositedTokens(0);
      }
    }
  };

  const handleApprove = async (e) => {
    setdepositLoading(true);

    try {
      const { BigNumber, reward_token_wod } = window;
      let amount = depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);
 
   
        const hash = await writeContract(wagmiClient, {
          address: reward_token_wod._address,
          abi: window.TOKEN_ABI,
          functionName: "approve",
          args: [window.config.governance_address, amount],
        });

        const receipt = await waitForTransactionReceipt(wagmiClient, {
          hash: hash,
        });

        if (receipt) {
          setdepositLoading(false);
          setdepositStatus("deposit");
        }
   
    } catch (e) {
      console.error("Error approving:", e);
      setdepositLoading(false);
      setdepositStatus("error");
      window.alertify.error(e?.message || e?.shortMessage || "Approval failed");
      setTimeout(() => {
        setdepositAmount(0);
        setdepositStatus("initial");
      }, 8000);
    }
  };

  const checkApproval = async (amount) => {
    try {
      const { BigNumber, reward_token_wod } = window;
      let result;

      
        result = await readContract(wagmiClient, {
          address: reward_token_wod._address,
          abi: window.TOKEN_ABI,
          functionName: "allowance",
          args: [coinbase, window.config.governance_address],
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

  const handleAddVote = async (proposalId, option) => {
    setdepositLoading(true);

    try {
      const { BigNumber } = window;
      let amount = depositAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);

      
     
        const hash = await writeContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "addVotes",
          args: [proposalId, option, amount],
        });

        const receipt = await waitForTransactionReceipt(wagmiClient, {
          hash: hash,
        });

        if (receipt) {
          setdepositLoading(false);
          setdepositStatus("success");
          getuserInfo();
        }
      
    } catch (e) {
      console.error("Error adding vote:", e);
      setdepositLoading(false);
      setdepositStatus("error");
      window.alertify.error(e?.message || e?.shortMessage || "Vote failed");
      setTimeout(() => {
        setdepositLoading(false);
        setdepositStatus("initial");
      }, 8000);
    }
  };

  const handleRemoveVote = async () => {
    setwithdrawLoading(true);

    try {
      const { BigNumber } = window;
      let amount = withdrawAmount;
      amount = new BigNumber(amount).times(1e18).toFixed(0);

      
      
        const hash = await writeContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "removeVotes",
          args: [proposalId, amount],
        });

        const receipt = await waitForTransactionReceipt(wagmiClient, {
          hash: hash,
        });

        if (receipt) {
          setwithdrawLoading(false);
          setwithdrawStatus("success");
          getuserInfo();
        }
      
    } catch (e) {
      console.error("Error removing vote:", e);
      setwithdrawLoading(false);
      setwithdrawStatus("error");
      window.alertify.error(e?.message || e?.shortMessage || "Remove vote failed");
      setTimeout(() => {
        setwithdrawLoading(false);
        setwithdrawStatus("initial");
        setwithdrawAmount(0);
      }, 8000);
    }
  };

  const handleClaim = async () => {
    try {
      
    
        const hash = await writeContract(wagmiClient, {
          address: window.config.governance_address,
          abi: window.GOVERNANCE_ABI,
          functionName: "withdrawAllTokens",
          args: [],
        });

        const receipt = await waitForTransactionReceipt(wagmiClient, {
          hash: hash,
        });

        if (receipt) {
          refreshBalance();
        }
      
    } catch (e) {
      console.error("Error claiming tokens:", e);
      window.alertify.error(e?.message || e?.shortMessage || "Claim failed");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Governance";
  }, []);

  useEffect(() => {
    getProposal(proposalId);
  }, [proposalId]);

  useEffect(() => {
    getuserInfo();
  }, [coinbase, isConnected, proposalId]);

  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="d-flex flex-column gap-4 justify-content-center align-items-center">
        <div className="custom-container">
          <NavLink
            to="/governance"
            className="d-flex align-items-center gap-2 gov-navlink"
          >
            <img
              src={"https://cdn.worldofdypians.com/wod/whitearrow.svg"}
              alt=""
              style={{ transform: "rotate(180deg)" }}
            />{" "}
            Governance
          </NavLink>
        </div>
        <div className="proposal-top-wrapper w-100 p-3">
          <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
            <div className="custom-container">
              <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between">
                <div className="d-flex flex-column gap-3 col-lg-5 p-lg-3">
                  <span className="single-proposal-description-green">
                    Description
                  </span>
                  <span className="single-proposal-content-txt">
                    {currentProposal?._proposalText}
                  </span>
                </div>
                <div className="proposal-right-col col-lg-5 p-lg-3">
                  <div className="d-flex flex-column gap-3">
                    <span className="single-proposal-description-green text-white">
                      Current Results
                    </span>
                    <div className="proposal-result-wrapper p-3">
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="single-proposal-option-txt">
                              Yes
                            </span>
                            <span className="percentage-text">
                              {optionone_percentage}%
                            </span>
                          </div>
                          <div className="progress prog1">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${optionone_percentage}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Votes</span>
                            <span className="gov-white-text">
                              {getFormattedNumber(
                                currentProposal?._optionOneVotes / 1e18,
                                6
                              )}{" "}
                              WOD
                            </span>
                          </div>
                        </div>

                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="single-proposal-option-txt">
                              No
                            </span>
                            <span className="percentage-text">
                              {optiontwo_percentage}%
                            </span>
                          </div>
                          <div className="progress prog2">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${optiontwo_percentage}%` }}
                              aria-valuenow="15"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Votes</span>
                            <span className="gov-white-text">
                              {getFormattedNumber(
                                currentProposal?._optionTwoVotes / 1e18,
                                6
                              )}{" "}
                              WOD
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="proposal-result-wrapper p-3">
                      <div className="d-flex flex-column gap-2">
                        {/* <div className="d-flex align-items-center gap-2">
                          <span className="gov-gray-text">Author</span>
                          <span className="gov-white-text">0x253...acb3</span>
                        </div> */}
                        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 justify-content-between w-100">
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Start</span>
                            <span className="gov-white-text">
                              {purchaseDate.toDateString()}
                            </span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Ends</span>
                            <span className="gov-white-text">
                              {endDate.toDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isConnected && chainId === 56 ? (
                      <div className="d-flex flex-column w-100">
                        {currentProposal?.expired === false && (
                          <div className="sidebar-separator2 my-4"></div>
                        )}
                        {currentProposal?.expired === false && (
                          <div className="d-flex flex-column gap-2 w-100">
                            <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                              <span className="single-proposal-description-green">
                                Vote
                              </span>
                              <div className="pools-toggle-wrapper py-2 px-3">
                                <div className="d-flex align-items-center gap-2">
                                  <span
                                    className="tvl-earn-title "
                                    style={{ color: "#c0c9ff" }}
                                  >
                                    My Balance:
                                  </span>
                                  <span
                                    className="tvl-earn-title d-flex align-items-center gap-2"
                                    style={{ color: "#4ed5d2" }}
                                  >
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/wodToken.png"
                                      }
                                      alt=""
                                      style={{ width: 20, height: 20 }}
                                    />
                                    {getFormattedNumber(wodBalance)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-2">
                              <div className="position-relative w-100 d-flex">
                                <input
                                  type="number"
                                  autoComplete="off"
                                  value={
                                    Number(depositAmount) > 0
                                      ? depositAmount
                                      : depositAmount
                                  }
                                  onChange={(e) => {
                                    setdepositAmount(e.target.value);
                                    checkApproval(e.target.value);
                                  }}
                                  placeholder=""
                                  className="text-input2 w-100"
                                  name="amount_deposit"
                                  id="amount_deposit"
                                  key="amount_deposit"
                                />

                                <button
                                  className="inner-max-btn position-absolute px-2"
                                  onClick={handleSetMaxDeposit}
                                >
                                  Max
                                </button>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  onClick={() => {
                                    setselectOption("0");
                                  }}
                                  className="d-flex align-items-center gap-2 text-white"
                                  style={{ cursor: "pointer" }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "#8E97CD",
                                      "&.Mui-checked": {
                                        color: "#82DAAB",
                                      },
                                    }}
                                    checked={selectOption === "0"}
                                  />{" "}
                                  Yes
                                </div>
                                <div
                                  onClick={() => {
                                    setselectOption("1");
                                  }}
                                  className="d-flex align-items-center gap-2 text-white"
                                  style={{ cursor: "pointer" }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: "#8E97CD",
                                      "&.Mui-checked": {
                                        color: "#82DAAB",
                                      },
                                    }}
                                    checked={selectOption === "1"}
                                  />
                                  No
                                </div>
                              </div>
                            </div>

                            <button
                              disabled={
                                (depositAmount === "" ||
                                  depositLoading === true) &&
                                isConnected &&
                                chainId === 56
                                  ? true
                                  : false
                              }
                              className={`btn w-100 ${
                                depositAmount === "" &&
                                isConnected &&
                                chainId === 56 &&
                                "disabled-btn-gov"
                              }    ${
                                depositStatus === "initial" &&
                                depositAmount !== "" &&
                                isConnected &&
                                chainId === 56 &&
                                "action-btn"
                              }  ${
                                ((depositStatus === "deposit" &&
                                  isConnected &&
                                  chainId === 56) ||
                                  !isConnected) &&
                                "action-btn"
                              } ${
                                depositStatus === "success"
                                  ? "action-btn"
                                  : (depositStatus === "error" ||
                                      chainId !== 56) &&
                                    isConnected
                                  ? "fail-button-gov"
                                  : null
                              } d-flex justify-content-center align-items-center gap-2`}
                              onClick={() => {
                                !isConnected
                                  ? handleConnection()
                                  : isConnected && chainId !== 56
                                  ? switchNetwork("0x38", 56)
                                  : depositStatus === "deposit"
                                  ? handleAddVote(proposalId, selectOption)
                                  : depositStatus === "initial" &&
                                    depositAmount !== ""
                                  ? handleApprove()
                                  : console.log("");
                              }}
                            >
                              {!isConnected ? (
                                <>Connect Wallet</>
                              ) : isConnected && chainId !== 56 ? (
                                <>Switch to BNB Chain</>
                              ) : depositLoading ? (
                                <div
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : depositStatus === "initial" ? (
                                <>Approve</>
                              ) : depositStatus === "deposit" ? (
                                <>Deposit</>
                              ) : depositStatus === "success" ? (
                                <>Success</>
                              ) : (
                                <>
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/failMark.svg"
                                    }
                                    alt=""
                                  />
                                  Failed
                                </>
                              )}
                            </button>
                          </div>
                        )}
                        <div className="sidebar-separator2 my-4"></div>
                        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="d-flex flex-column w-100 gap-2">
                            <span className="single-proposal-description-green">
                              Remove Vote
                            </span>
                            <div className="d-flex flex-column">
                              <span className="my-votes-amount">
                                {getFormattedNumber(myDepositedTokens)}
                              </span>
                              <span className="my-votes-desc">My Votes</span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              {currentProposal?.expired === false && (
                                <div className="position-relative w-100 d-flex">
                                  <input
                                    type="number"
                                    autoComplete="off"
                                    value={
                                      Number(withdrawAmount) > 0
                                        ? withdrawAmount
                                        : withdrawAmount
                                    }
                                    onChange={(e) => {
                                      setwithdrawAmount(e.target.value);
                                    }}
                                    placeholder=""
                                    className="text-input2 w-100"
                                    name="amount_deposit"
                                    id="amount_deposit"
                                    key="amount_deposit"
                                  />

                                  <button
                                    className="inner-max-btn position-absolute px-2"
                                    onClick={handleSetMaxWithdraw}
                                  >
                                    Max
                                  </button>
                                </div>
                              )}
                              <button
                                className="btn-withdraw-gov px-2 px-lg-5 py-2"
                                onClick={() => {
                                  currentProposal?.expired
                                    ? handleClaim()
                                    : handleRemoveVote();
                                }}
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
                                ) : withdrawStatus === "initial" ? (
                                  <>
                                    {currentProposal.expired === false
                                      ? `Remove`
                                      : "Withdraw"}
                                  </>
                                ) : withdrawStatus === "success" ? (
                                  <>Success</>
                                ) : (
                                  <>
                                    {/* <img src={failMark} alt="" /> */}
                                    Failed
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : !isConnected ? (
                      <div className="mt-4 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                        <button
                          className="connectbtn-gov px-3 py-2 w-100"
                          // style={{ width: "fit-content" }}
                          onClick={() => {
                            handleConnection();
                          }}
                        >
                          Connect Wallet
                        </button>
                      </div>
                    ) : isConnected && chainId !== 56 ? (
                      <div className="mt-4 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                        <button
                          className="fail-button-gov px-3 py-2 w-100"
                          // style={{ width: "fit-content" }}
                          onClick={() => {
                            switchNetwork("0x38", 56);
                          }}
                        >
                          Switch to BNB Chain
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceInner;
