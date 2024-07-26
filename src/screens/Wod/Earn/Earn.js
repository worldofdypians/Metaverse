import React, { useState, useEffect } from "react";
import "./_earn.scss";
import EarnHero from "./EarnHero/EarnHero";
import EarnContent from "./EarnContent/EarnContent";
import StakingWod from "./stakingpools/StakingWod";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useWindowSize from "../../../hooks/useWindowSize";
import { ClickAwayListener } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import closeX from "./assets/closeX.svg";

const Earn = ({
  isConnected,
  coinbase,
  chainId,
  handleSwitchNetwork,
  onConnectWallet,
}) => {
  const tokenPools = [
    {
      tokenName: "WOD",
      apr: 20,
      locktime: "30 days",
      chain: "BNB Chain",
      tokenURL: ["wod"],
      chainLogo: "bnbLogo.svg",
    },
    {
      tokenName: "WOD",
      apr: 15,
      locktime: "60 days",
      chain: "BNB Chain",
      tokenURL: ["wod"],
      chainLogo: "bnbLogo.svg",
    },
    {
      tokenName: "WOD",
      apr: 5,
      locktime: "No lock",
      chain: "Ethereum",
      tokenURL: ["wod"],
      chainLogo: "ethIcon.svg",
    },
  ];

  const nftPools = [
    {
      tokenName: "CAWS NFT",
      apr: 5,
      locktime: "No lock",
      chain: "Ethereum",
      tokenURL: ["caws"],
      chainLogo: "ethIcon.svg",
    },
    {
      tokenName: "LAND NFT",
      apr: 5,
      locktime: "No lock",
      chain: "Ethereum",
      tokenURL: ["land"],
      chainLogo: "ethIcon.svg",
    },
  ];

  const nftTokenPools = [
    {
      tokenName: "WOD + CAWS NFT",
      apr: 5,
      locktime: "No lock",
      chain: "Ethereum",
      tokenURL: ["wod", "caws"],
      chainLogo: "ethIcon.svg",
    },
    {
      tokenName: "WOD + LAND NFT",
      apr: 5,
      locktime: "No lock",
      chain: "Ethereum",
      tokenURL: ["wod", "land"],
      chainLogo: "ethIcon.svg",
    },
  ];
  const windowSize = useWindowSize();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      windowSize.width > 1400 ? "auto" : windowSize.width > 786 ? "50%" : "95%",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    overflowX: "hidden",
    borderRadius: "10px",
    height: windowSize.width < 500 ? "480px" : "auto",
    background: `#1A1A36`,
  };

  const allPools = [...tokenPools, ...nftPools, ...nftTokenPools];

  const [selectedFilter, setSelectedFilter] = useState("All Pools");
  const [stakingPools, setStakingPools] = useState(allPools);
  const [showPopup, setshowPopup] = useState(false);
  const [selectedTab, setselectedTab] = useState("deposit");
  const [locktime, setlocktime] = useState("flexible");
  const [aprTooltip, setaprTooltip] = useState(false);

  const handleSetPools = (poolFilter) => {
    if (poolFilter === "All pools") {
      setStakingPools(allPools);
    } else if (poolFilter === "Token") {
      setStakingPools(tokenPools);
    } else if (poolFilter === "NFT") {
      setStakingPools(nftPools);
    } else if (poolFilter === "Token + NFT") {
      setStakingPools(nftTokenPools);
    }
  };

  const aprOpen = () => {
    setaprTooltip(true);
  };
  const aprClose = () => {
    setaprTooltip(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Earn";

  }, []);

  return (
    <>
      <div className="container-fluid token-wrapper px-0 mt-5 pt-5">
        <div className="d-flex flex-column gap-3">
          <EarnHero
            onSelectFilter={(value) => {
              setSelectedFilter(value);
              handleSetPools(value);
            }}
          />
          <EarnContent
            isConnected={isConnected}
            coinbase={coinbase}
            chainId={chainId}
            handleSwitchNetwork={handleSwitchNetwork}
            onConnectWallet={onConnectWallet}
            selectedFilter={selectedFilter}
            stakingPools={stakingPools}
            onPoolSelect={() => {
              setshowPopup(true);
            }}
          />
        </div>
      </div>
      {showPopup && (
        <Modal
          open={showPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="position-relative d-flex flex-column">
              <img
                    src={closeX}
                    alt=""
                    className="close-x position-relative cursor-pointer "
                    onClick={() => {
                      setshowPopup(false);
                    }}
                    style={{
                      bottom: "17px",
                      alignSelf: "end",
                      width: 16,
                      height: 16,
                    }}
                  /><div className="staking-pool-bigwrapper my-0 p-3">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-column gap-2 w-100 align-items-center">
                
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
                  <div className="info-pool-wrapper py-3 w-100">
                    <div className="info-pool-inner-wrapper d-flex flex-column flex-lg-row align-items-center gap-2">
                      <div className="info-pool-item p-2">
                        <div className="d-flex justify-content-between gap-1 align-items-center">
                          <span className="info-pool-left-text">Chain </span>
                          <span className="info-pool-right-text">Ethereum</span>
                        </div>
                      </div>
                      <div className="info-pool-item p-2">
                        <div className="d-flex justify-content-between gap-1 align-items-center">
                          <span className="info-pool-left-text">APR </span>
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
                  chainId={chainId?.toString()}
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
            </div></div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Earn;
