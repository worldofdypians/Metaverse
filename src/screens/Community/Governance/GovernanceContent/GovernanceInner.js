import React, { useEffect, useState } from "react";
import "./_governanceContent.scss";
import leftWhiteArrow from "../../assets/leftWhiteArrow.svg";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import { handleSwitchNetworkhook } from "../../../../hooks/hooks";
import Web3 from "web3";

const GovernanceInner = ({
  coinbase,
  isConnected,
  chainId,
  handleConnection,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  refreshBalance,
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
  const [selectOption, setselectOption] = useState("");

  const { BigNumber, reward_token_wod } = window;

  const purchaseDate = currentProposal?._proposalStartTime
    ? new Date(currentProposal?._proposalStartTime * 1000)
    : new Date();
  const endDate = new Date(
    purchaseDate.getTime() + window.config.vote_duration_in_seconds * 1e3
  );

  const switchNetwork = async (hexChainId, chain) => {
    if (window.ethereum) {
      if (!window.gatewallet && window.WALLET_TYPE !== "binance") {
        await handleSwitchNetworkhook(hexChainId)
          .then(() => {
            handleSwitchNetwork(chain);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (window.gatewallet && window.WALLET_TYPE !== "binance") {
        handleSwitchChainGateWallet(chain);
      } else if (coinbase && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(chain);
      }
    } else if (coinbase && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(chain);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
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
      setCurrentProposal(p);
      return p;
    }
  };

  const getuserInfo = async () => {
    const governanceSc = new window.bscWeb3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );
    if (coinbase && isConnected) {
      const balance = await governanceSc.methods
        .totalDepositedTokens(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const balanceFormatted = balance / 1e18;
      setmyDepositedTokens(balanceFormatted);
    }
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

  const handleRemoveVote = async (proposalId) => {
    // e.preventDefault();
    setwithdrawLoading(true);
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
        window.alertify.error(e?.message);
        setTimeout(() => {
          setwithdrawLoading(false);
          setwithdrawStatus("initial");
          setwithdrawAmount(0);
        }, 8000);
      });
  };

  const handleClaim = async () => {
    window.web3 = new Web3(window.ethereum);
    const governanceSc = new window.web3.eth.Contract(
      window.GOVERNANCE_ABI,
      window.config.governance_address
    );

    await governanceSc.methods
      .withdrawAllTokens()
      .send({ from: coinbase })
      .then(() => {
        refreshBalance();
      })
      .catch((e) => {
        console.error(e);
      });
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
  }, [coinbase, isConnected]);

  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="d-flex flex-column gap-4 justify-content-center align-items-center">
        <div className="custom-container">
          <NavLink
            to="/governance"
            className="d-flex align-items-center gap-2 gov-navlink"
          >
            <img src={leftWhiteArrow} alt="" /> Governance
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
                    {currentProposal._proposalText}
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
                            <span className="percentage-text">85%</span>
                          </div>
                          <div className="progress prog1">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: "85%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Votes</span>
                            <span className="gov-white-text">
                              {getFormattedNumber(
                                currentProposal._optionOneVotes / 1e18,
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
                            <span className="percentage-text">15%</span>
                          </div>
                          <div className="progress prog2">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: "15%" }}
                              aria-valuenow="15"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="gov-gray-text">Votes</span>
                            <span className="gov-white-text">
                              {getFormattedNumber(
                                currentProposal._optionTwoVotes / 1e18,
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
                    {isConnected ? (
                      myDepositedTokens !== undefined &&
                      myDepositedTokens > 0 &&
                      chainId === 56 ? (
                        <div className="mt-4 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="d-flex flex-column">
                            <span className="my-votes-amount">
                              {getFormattedNumber(myDepositedTokens)}
                            </span>
                            <span className="my-votes-desc">My Votes</span>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn-withdraw-gov px-2 px-lg-5 py-2"
                              onClick={handleRemoveVote}
                            >
                              {withdrawLoading ? (
                                <div
                                  class="spinner-border spinner-border-sm text-light"
                                  role="status"
                                >
                                  <span class="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : withdrawStatus === "initial" ? (
                                <>Withdraw</>
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
                      ) : myDepositedTokens !== undefined &&
                        Number(myDepositedTokens) === 0 &&
                        chainId === 56 ? (
                        <div className="mt-4 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <span className="single-proposal-description-green">
                            Vote
                          </span>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className={` ${
                                selectOption === "0"
                                  ? "getpremium-active-btn"
                                  : "getpremium-btn"
                              }  px-2 px-lg-5 py-2`}
                              onClick={() => {
                                setselectOption("0");
                              }}
                            >
                              Yes
                            </button>
                            <button
                              className={` ${
                                selectOption === "1"
                                  ? "getpremium-active-btn"
                                  : "getpremium-btn"
                              }  px-2 px-lg-5 py-2`}
                              onClick={() => {
                                setselectOption("1");
                              }}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )
                    ) : !isConnected ? (
                      <div className="mt-4 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                        <button
                          className="connectbtn-gov px-3 py-2"
                          style={{ width: "fit-content" }}
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
                          className="fail-button px-3 py-2"
                          style={{ width: "fit-content" }}
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
