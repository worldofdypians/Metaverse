import React, { useState } from "react";
import StakingWod from "../stakingpools/StakingWod";
import stakingIcon from "../assets/stakingIcon.svg";
import farmingIcon from "../assets/farmingIcon.svg";
import moreinfo from "../assets/more-info.svg";
import { ClickAwayListener } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";

const EarnContent = ({
  isConnected,
  coinbase,
  chainId,
  handleSwitchNetwork,
  onConnectWallet,
}) => {
  const [option, setOption] = useState("stake");
  const [stakeoption, setStakeOption] = useState("token");
  const [selectedTab, setselectedTab] = useState("deposit");
  const [locktime, setlocktime] = useState("flexible");
  const [aprTooltip, setaprTooltip] = useState(false);

  const aprOpen = () => {
    setaprTooltip(true);
  };
  const aprClose = () => {
    setaprTooltip(false);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column gap-2 w-100 px-2">
          <div className="d-flex flex-column flex-lg-row flex-md-row mx-0 justify-content-between align-items-center p-2 options-container">
            <div className="col-lg-6 row d-flex flex-column flex-lg-row flex-md-row gap-0 gap-xl-3 justify-content-start p-2">
              <div
                className={`option-item col-3 col-xl-2 ${
                  option === "stake" && "option-item-active"
                } `}
                onClick={() => {
                  setOption("stake");
                }}
              >
                <span className="option-text d-flex algin-items-center gap-1">
                  {" "}
                  <img src={stakingIcon} alt="" /> Stake
                </span>
              </div>
              <div
                className={`option-item col-3 col-xl-2 ${
                  option === "farm" && "option-item-active"
                } `}
                onClick={() => {
                  setOption("farm");
                }}
              >
                <span className="option-text d-flex algin-items-center gap-1">
                  <img src={farmingIcon} alt="" />
                  Farm
                </span>
              </div>
            </div>
            <div className="earn-tvl-wrapper p-2">
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <span className="tvl-title">Total value locked</span>
                <span className="tvl-amount">$500,000</span>
              </div>
            </div>
          </div>
          <div className="earn-bottom-wrapper p-2">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex algin-items-center gap-4">
                <div
                  className={`${
                    stakeoption === "token"
                      ? "stake-option-item-active"
                      : "stake-option-item"
                  } p-3 w-100 d-flex align-items-center justify-content-center`}
                  onClick={() => {
                    setStakeOption("token");
                  }}
                >
                  <span className="stake-option-text">TOKEN</span>
                </div>
                <div
                  className={`${
                    stakeoption === "nft"
                      ? "stake-option-item-active"
                      : "stake-option-item"
                  } p-3 w-100 d-flex align-items-center justify-content-center`}
                  onClick={() => {
                    setStakeOption("nft");
                  }}
                >
                  <span className="stake-option-text">NFT</span>
                </div>
                <div
                  className={`${
                    stakeoption === "tokennft"
                      ? "stake-option-item-active"
                      : "stake-option-item"
                  } p-3 w-100 d-flex align-items-center justify-content-center`}
                  onClick={() => {
                    setStakeOption("tokennft");
                  }}
                >
                  <span className="stake-option-text">TOKEN+NFT</span>
                </div>
              </div>
            </div>
          </div>
          <div className="staking-pool-bigwrapper my-3 p-3">
            <div className="d-flex flex-column gap-4">
              <div className="d-flex gap-2 w-100 align-items-center">
                <div className="d-flex align-items-center gap-5 w-100">
                  <span
                    className={
                      selectedTab === "deposit"
                        ? "switchchain-txt-active"
                        : "switchchain-txt"
                    }
                    onClick={() => {
                      setselectedTab("deposit");
                    }}
                  >
                    Deposit
                  </span>
                  <span
                    className={
                      selectedTab === "withdraw"
                        ? "switchchain-txt-active"
                        : "switchchain-txt"
                    }
                    onClick={() => {
                      setselectedTab("withdraw");
                    }}
                  >
                    Withdraw
                  </span>
                </div>
                <div className="info-pool-wrapper p-3 w-100">
                  <div className="info-pool-inner-wrapper d-flex flex-column flex-lg-row align-items-center gap-2">
                    <div className="info-pool-item p-2">
                      <div className="d-flex justify-content-between gap-1 align-items-center">
                        <span className="info-pool-left-text">Chain </span>
                        <span className="info-pool-right-text">Ethereum</span>
                      </div>
                    </div>
                    <div className="info-pool-item p-2">
                      <div className="d-flex justify-content-between gap-1 align-items-center">
                        <span className="info-pool-left-text">
                          APR{" "}
                          <ClickAwayListener onClickAway={aprClose}>
                            <Tooltip
                              open={aprTooltip}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              placement="top"
                              title={
                                <div className="tooltip-text">
                                  {
                                    "APR reflects the interest rate of earnings on an account over the course of one year."
                                  }
                                </div>
                              }
                            >
                              <img
                                src={moreinfo}
                                alt=""
                                onClick={aprOpen}
                                style={{ width: 16, height: 16 }}
                              />
                            </Tooltip>
                          </ClickAwayListener>
                        </span>
                        <span className="info-pool-right-text">12%</span>
                      </div>
                    </div>

                    <div className="info-pool-item p-2">
                      <div className="d-flex justify-content-between gap-1 align-items-center">
                        <span className="info-pool-left-text">TVL</span>
                        <span className="info-pool-right-text">
                          ${getFormattedNumber(5000, 2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="locktimewrapper align-items-center gap-2">
                  <button
                    className={
                      //   getClassName(
                      //   selectedchain,
                      //   "No lock",
                      //   selectedpoolType,
                      //   selectedPool,
                      //   ethPoolsDyp,
                      //   ethPoolsiDyp,
                      //   bnbPoolsDyp,
                      //   bnbPoolsiDyp,
                      //   avaxPoolsDyp,
                      //   avaxPoolsiDyp
                      // )

                      locktime === "flexible"
                        ? "method-btn-active"
                        : "method-btn"
                    }
                    onClick={() => {
                      setlocktime("flexible");
                    }}
                    // onClick={() =>
                    //  { handleSelectPool(
                    //     selectedchain,
                    //     "No lock",
                    //     selectedpoolType,
                    //     ethPoolsDyp,
                    //     ethPoolsiDyp,
                    //     bnbPoolsDyp,
                    //     bnbPoolsiDyp,
                    //     avaxPoolsDyp,
                    //     avaxPoolsiDyp
                    //   )}
                    // }
                  >
                    Flexible
                  </button>
                  <button
                    className={
                      //   getClassName(
                      //   selectedchain,
                      //   "30 days",
                      //   selectedpoolType,
                      //   selectedPool,
                      //   ethPoolsDyp,
                      //   ethPoolsiDyp,
                      //   bnbPoolsDyp,
                      //   bnbPoolsiDyp,
                      //   avaxPoolsDyp,
                      //   avaxPoolsiDyp
                      // )
                      locktime === "30 days"
                        ? "method-btn-active"
                        : "method-btn"
                    }
                    onClick={() => {
                      setlocktime("30 days");
                    }}
                    // onClick={() =>
                    //   {handleSelectPool(
                    //     selectedchain,
                    //     "30 days",
                    //     selectedpoolType,
                    //     ethPoolsDyp,
                    //     ethPoolsiDyp,
                    //     bnbPoolsDyp,
                    //     bnbPoolsiDyp,
                    //     avaxPoolsDyp,
                    //     avaxPoolsiDyp
                    //   )}
                    // }
                  >
                    30 Days
                  </button>
                  <button
                    className={
                      //   getClassName(
                      //   selectedchain,
                      //   "60 days",
                      //   selectedpoolType,
                      //   selectedPool,
                      //   ethPoolsDyp,
                      //   ethPoolsiDyp,
                      //   bnbPoolsDyp,
                      //   bnbPoolsiDyp,
                      //   avaxPoolsDyp,
                      //   avaxPoolsiDyp
                      // )

                      locktime === "60 days"
                        ? "method-btn-active"
                        : "method-btn"
                    }
                    onClick={() => {
                      setlocktime("60 days");
                    }}
                    // onClick={() => {
                    //   handleSelectPool(
                    //     selectedchain,
                    //     "60 days",
                    //     selectedpoolType,
                    //     ethPoolsDyp,
                    //     ethPoolsiDyp,
                    //     bnbPoolsDyp,
                    //     bnbPoolsiDyp,
                    //     avaxPoolsDyp,
                    //     avaxPoolsiDyp
                    //   )
                    // }}
                  >
                    60 Days
                  </button>
                  <button
                    className={
                      //   getClassName(
                      //   selectedchain,
                      //   "90 days",
                      //   selectedpoolType,
                      //   selectedPool,
                      //   ethPoolsDyp,
                      //   ethPoolsiDyp,
                      //   bnbPoolsDyp,
                      //   bnbPoolsiDyp,
                      //   avaxPoolsDyp,
                      //   avaxPoolsiDyp
                      // )
                      locktime === "90 days"
                        ? "method-btn-active"
                        : "method-btn"
                    }
                    onClick={() => {
                      setlocktime("90 days");
                    }}
                    // onClick={() =>
                    //  { handleSelectPool(
                    //     selectedchain,
                    //     "90 days",
                    //     selectedpoolType,
                    //     ethPoolsDyp,
                    //     ethPoolsiDyp,
                    //     bnbPoolsDyp,
                    //     bnbPoolsiDyp,
                    //     avaxPoolsDyp,
                    //     avaxPoolsiDyp
                    //   )}
                    // }
                  >
                    90 Days
                  </button>
                  <button
                    className={
                      //   getClassName(
                      //   selectedchain,
                      //   "120 days",
                      //   selectedpoolType,
                      //   selectedPool,
                      //   ethPoolsDyp,
                      //   ethPoolsiDyp,
                      //   bnbPoolsDyp,
                      //   bnbPoolsiDyp,
                      //   avaxPoolsDyp,
                      //   avaxPoolsiDyp
                      // )
                      locktime === "120 days"
                        ? "method-btn-active"
                        : "method-btn"
                    }
                    onClick={() => {
                      setlocktime("120 days");
                    }}
                    // onClick={() =>
                    //  { handleSelectPool(
                    //     selectedchain,
                    //     "120 days",
                    //     selectedpoolType,
                    //     ethPoolsDyp,
                    //     ethPoolsiDyp,
                    //     bnbPoolsDyp,
                    //     bnbPoolsiDyp,
                    //     avaxPoolsDyp,
                    //     avaxPoolsiDyp
                    //   )}
                    // }
                  >
                    120 Days
                  </button>
                </div>
              </div>
              <StakingWod
                selectedTab={selectedTab}
                chainId={chainId.toString()}
                coinbase={coinbase}
                lockTime={30}
                is_wallet_connected={isConnected}
                fee={0}
                staking={window.constant_staking_idyp_2}
                expiration_time={"Jul 12 2025"}
                onConnectWallet={onConnectWallet}
                handleSwitchNetwork={handleSwitchNetwork}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnContent;
