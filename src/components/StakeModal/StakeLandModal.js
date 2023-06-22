import React, { useState, useEffect } from "react";
import "./_stakemodal.scss";
import xmark from "./assets/xmark.svg";
import { Checkbox } from "@mui/material";
import EmptyWodCard from "./EmptyWodCard";
import greenInfo from "./assets/greenInfo.svg";
import cawsTag from "./assets/cawsTag.svg";
import wodTag from "./assets/wodTag.svg";
import fullWod from "./assets/fullWod.png";
import NftStakingCawChecklist from "./NftStakingCawChecklist";
import LandNftChecklist from "./LandNftChecklist";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";

const StakeLandModal = ({
  onModalClose,
  getApprovedNfts,
  getApprovedLandNfts,
  isConnected,
  coinbase,
  onDepositComplete,
  nftItem,
  isStake,
  ETHrewards,
  hideItem,
}) => {
  const [active, setActive] = useState(true);
  const [showToStake, setshowToStake] = useState(false);
  const [showStaked, setshowStaked] = useState(false);
  const [checkbtn, setCheckBtn] = useState(false);
  const [checkUnstakebtn, setCheckUnstakeBtn] = useState(false);
  const [checkLandbtn, setCheckLandBtn] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingdeposit, setloadingdeposit] = useState(false);
  const [showClaim, setshowClaim] = useState(false);
  const [loadingClaim, setloadingClaim] = useState(false);
  const [showApprove, setshowApprove] = useState(true);

  const [checknft, setchecknft] = useState(false);
  const [showCawsApprove, setshowCawsApprove] = useState(true);
  const [showLandApprove, setshowLandApprove] = useState(true);
  const [val, setVal] = useState("");
  const [color, setColor] = useState("#F13227");
  const [selectNftIds, setSelectedNftIds] = useState([]);
  const [selectNftLandIds, setSelectedNftLandIds] = useState([]);
  const [tooltip, setTooltip] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);

  let nftIds = [];
  const handleClearStatus = () => {
    const interval = setInterval(async () => {
      setStatus("");
    }, 8000);
    return () => clearInterval(interval);
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(ETHrewards));
  };

  // array containing items whether Staked or To Stake

  const checkApproval = async () => {
    const address = coinbase;
    const stake25 = await window.config.landnftstake_address;
    if (address) {
      const result = await window.landnft
        .checkapproveStake(address, stake25)
        .then((data) => {
          return data;
        });

      if (result === true && nftItem.length !== 0) {
        setshowApprove(false);
        setStatus("");
        setColor("#939393");
      } else if (result === true && nftItem.length == 0) {
        setStatus("");
      } else if (result === false) {
        setStatus(" *Please approve before deposit");
        setshowApprove(true);
      }
    }
  };

  const handleSelectAll = () => {
    setCheckBtn(!checkbtn);
    if (checkbtn === false) {
      if (nftIds.length > 50) {
        setSelectedNftIds(nftIds.slice(0, 50));
      } else if (nftIds.length <= 50) {
        setSelectedNftIds(nftIds);
      }
    } else if (checkbtn === true) {
      setSelectedNftIds([]);
    }
    setCheckUnstakeBtn(false);
  };

  const handleSelectAllToUnstake = () => {
    setCheckUnstakeBtn(!checkUnstakebtn);
    if (checkUnstakebtn === false) {
      if (nftIds.length > 50) {
        setSelectedNftIds(nftIds.slice(0, 50));
      } else if (nftIds.length <= 50) {
        setSelectedNftIds(nftIds);
      }
    } else if (checkUnstakebtn === true) {
      setSelectedNftIds([]);
    }
    setCheckBtn(false);
  };

  const handleApprove = async () => {
    const stake25 = await window.config.landnftstake_address;
    setloading(true);
    setStatus("*Waiting for approval");
    setColor("#52A8A4");
    await window.landnft
      .approveStake(stake25)
      .then(() => {
        setActive(false);
        setloading(false);
        setColor("#52A8A4");
        setStatus("*Now you can deposit");
      })
      .catch((err) => {
        setloading(false);
        setColor("#F13227");
        setStatus("*An error occurred. Please try again");
        handleClearStatus();
      });
  };

  const handleDeposit = async (value) => {
    let stake_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    setloadingdeposit(true);
    setStatus("*Processing deposit");
    setColor("#52A8A4");
    // console.log(selectNftIds)
    await stake_contract.methods
      .deposit(
        checkbtn === true
          ? nftIds.length === selectNftIds.length
            ? nftIds
            : selectNftIds
          : selectNftIds
      )
      .send()
      .then(() => {
        setloadingdeposit(false);
        setshowClaim(true);
        setActive(true);
        setStatus("*Sucessfully deposited");
        setSelectedNftIds([]);
        setColor("#57AEAA");
        handleClearStatus();
        onDepositComplete();
      })
      .catch((err) => {
        setloadingdeposit(false);
        setColor("#F13227");
        setStatus("*An error occurred. Please try again");
        setSelectedNftIds([]);
        handleClearStatus();
      });
  };

  useEffect(() => {
    setshowStaked(true);
  }, []);

  useEffect(() => {
    setUSDPrice().then();
  }, [ETHrewards]);

  useEffect(() => {
    if (
      selectNftIds.length > 50 &&
      checkbtn === false &&
      showToStake === true
    ) {
      window.alertify.error("Limit to Stake/Unstake NFT is 50 NFT's per round");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        return () => clearInterval(interval);
      }, 500);
    } else if (
      selectNftIds.length > 50 &&
      checkbtn === true &&
      showToStake === true
    ) {
      window.alertify.error("Limit to Stake/Unstake NFT is 50 NFT's per round");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        setSelectedNftIds([]);
        return () => clearInterval(interval);
      }, 500);
    } else if (
      selectNftIds.length > 50 &&
      checkUnstakebtn === false &&
      showToStake === false
    ) {
      window.alertify.error("Limit to Stake/Unstake NFT is 50 NFT's per round");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        return () => clearInterval(interval);
      }, 500);
    } else if (
      selectNftIds.length > 50 &&
      checkUnstakebtn === true &&
      showToStake === false
    ) {
      window.alertify.error("Limit to Stake/Unstake NFT is 50 NFT's per round");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        setSelectedNftIds([]);
        return () => clearInterval(interval);
      }, 500);
    }
  }, [selectNftIds.length, val, checkbtn, checkUnstakebtn]);

  useEffect(() => {
    if (showToStake === true) {
      checkApproval().then();
    } else setSelectedNftIds([]);
  }, [showClaim, showToStake]);

  useEffect(() => {
    if (hideItem === "staked") {
      setshowToStake(true);
      setshowStaked(false);
    }
  }, [hideItem, showStaked, showToStake]);

  const onEmptyState = () => {};

  const handleUnstake = async (value) => {
    let stake_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    setStatus("*Processing unstake");
    setColor("#52A8A4");

    await stake_contract.methods
      .withdraw(
        checkUnstakebtn === true
          ? nftIds.length === selectNftIds.length
            ? nftIds
            : selectNftIds
          : selectNftIds
      )
      .send()
      .then(() => {
        setStatus("*Unstaked successfully");
        setColor("#57AEAA");
        handleClearStatus();
        setSelectedNftIds([]);
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        setStatus("An error occurred, please try again");
        setColor("#F13227");
        setSelectedNftIds([]);
        handleClearStatus();
      });
  };

  const handleClaim = async (itemId) => {
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    setColor("#52A8A4");
    setloadingClaim(true);
    setActive(false);
    setStatus("*Claiming rewards...");

    await staking_contract.methods
      .claimRewards(
        checkUnstakebtn === true
          ? nftIds.length === selectNftIds.length
            ? nftIds
            : selectNftIds
          : selectNftIds
      )
      .send()
      .then(() => {
        setloadingClaim(false);
        setStatus("*Claimed successfully");
        handleClearStatus();
        setColor("#57AEAA");
        setSelectedNftIds([]);
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        setloadingClaim(false);
        setStatus("An error occurred, please try again");
        setSelectedNftIds([]);
      });
  };

  const devicewidth = window.innerWidth;
  return (
    <div className="stake-modal p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="stake-modal-title">Stakeable NFTs</h6>
        <img
          src={xmark}
          style={{ cursor: "pointer" }}
          onClick={onModalClose}
          alt=""
        />
      </div>
      <span className="stake-modal-desc">
        A list of your NFT collection that can be added and removed from the
        staking pools
      </span>
      <div className="d-flex align-items-center justify-content-center">
        <button className="btn nft-stake-btn mt-3 p-2">To stake</button>
      </div>
      <span className="d-flex my-3 market-stake-divider"></span>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column gap-2">
          <button
            onClick={() => {
              handleSelectAll();
            }}
            className="select-all-btn d-flex align-items-center"
            style={{
              pointerEvents: nftItem.length !== 0 ? "auto" : "none",
              opacity: nftItem.length !== 0 ? "1" : "0.4",
              color: checkbtn === true ? "#4ED5D2" : "#fff",
            }}
          >
            <Checkbox
              sx={{
                color: "#8E97CD",
                "&.Mui-checked": {
                  color: "#82DAAB",
                },
              }}
              checked={checkbtn}
            />
            {checkbtn ? "Unselect all CAWS NFTs" : "Select all CAWS NFTs"}
          </button>
        </div>
      </div>
      <div className="row modal-scroll position-relative mt-3">
        <div className="col-12">
          <div className="nft-modal-grid2">
            {nftItem.length === 0 ? (
              [...Array(devicewidth < 500 ? 1 : 2)].map((item, id) => {
                return <EmptyWodCard key={id} />;
              })
            ) : nftItem.length === 1 ? (
              <>
                {nftItem.map((item, id) => {
                  let nftId = item.name?.slice(1, nftItem.name?.length);

                  nftIds.push(nftId);

                  return (
                    <>
                      <LandNftChecklist
                        key={id}
                        nft={item}
                        width={"auto"}
                        height={"auto"}
                        modalId="#newNftchecklist"
                        isStake={showStaked}
                        checked={
                          ((showToStake === true && checkbtn === true) ||
                            (showStaked === true &&
                              checkUnstakebtn === true)) &&
                          selectNftIds.length <= 50
                        }
                        checked2={selectNftIds.length <= 50 ? true : false}
                        checklistItemID={nftId}
                        onChange={(value) => {
                          selectNftIds.indexOf(value) === -1
                            ? selectNftIds.push(value)
                            : selectNftIds.splice(
                                selectNftIds.indexOf(value),
                                1
                              );
                          setchecknft(!checknft);
                          setSelectedNftIds(selectNftIds);
                          getApprovedNfts(selectNftIds);
                          console.log(selectNftIds);
                          setVal(value);
                        }}
                        coinbase={coinbase}
                        isConnected={isConnected}
                      />
                    </>
                  );
                })}
                {[
                  ...Array(
                    devicewidth < 500
                      ? 1
                      : Math.abs(2 - parseInt(nftItem.length))
                  ),
                ].map((item, id) => {
                  return <EmptyWodCard key={id} />;
                })}
              </>
            ) : (
              <>
                {nftItem.map((item, id) => {
                  let nftId = item.name?.slice(1, nftItem.name?.length);
                  nftIds.push(nftId);

                  return (
                    <>
                      <LandNftChecklist
                        key={id}
                        nft={item}
                        width={"auto"}
                        height={"auto"}
                        modalId="#newNftchecklist"
                        isStake={false}
                        checked={
                          ((showToStake === true && checkbtn === true) ||
                            (showStaked === true &&
                              checkUnstakebtn === true)) &&
                          selectNftIds.length <= 50
                        }
                        checked2={selectNftIds.length <= 50 ? true : false}
                        checklistItemID={nftId}
                        onChange={(value) => {
                          selectNftIds.indexOf(value) === -1
                            ? selectNftIds.push(value)
                            : selectNftIds.splice(
                                selectNftIds.indexOf(value),
                                1
                              );
                          setchecknft(!checknft);
                          setSelectedNftIds(selectNftIds);
                          getApprovedNfts(selectNftIds);
                          console.log(selectNftIds);
                          setVal(value);
                        }}
                        coinbase={coinbase}
                        isConnected={isConnected}
                      />
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-100 p-2 d-flex align-items-center gap-2 mt-3 info-span">
        <img src={greenInfo} alt="" />
        <span className="info-span-text">
          Please choose the NFTs that you wish to stake. Once you have made your
          selection, you will be required to approve the process before
          depositing the NFTs.
        </span>
      </div>
      <div className="mt-3 d-flex align-items-end justify-content-between">
        <div className="selected-nfts-wrapper p-3">
          <div className="d-flex align-items-center justify-content-between position-relative">
            <span className="selected-nfts-span mb-2">Selected NFTs:</span>
            <OutsideClickHandler
              onOutsideClick={() => {
                setTooltip(false);
              }}
            >
              <img
                src={greenInfo}
                alt=""
                className="tooltipicon"
                onClick={() => {
                  setTooltip(true);
                }}
              />
            </OutsideClickHandler>
            <div
              className={`tooltip-wrapper2 p-2 col-11 ${
                tooltip && "tooltip-active"
              }`}
              style={{ top: "-30px", right: "-175px" }}
            >
              <p className="tooltip-content2 m-0">
                You can select a maximum of 50 WoD Land NFTs
              </p>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-1">
              <img src={wodTag} alt="" />
              <span className="selected-nfts-amount">
                {getApprovedLandNfts(selectNftIds).length} Wod Land
              </span>
            </div>
          </div>
        </div>
        {/* <button className="btn disabled-approve-btn px-4">Approve</button> */}
        <div className="d-flex flex-column gap-2">
          <div className="mt-4 row mx-0 justify-content-xxl-between justify-content-lg-between justify-content-md-between justify-content-sm-between justify-content-center gap-3">
            {showApprove === true && (
              <button
                className={`btn m-auto ${
                  showApprove === true &&
                  getApprovedNfts(selectNftIds).length > 0 &&
                  getApprovedNfts(selectNftIds).length < 51
                    ? "pill-btn"
                    : "disabled-approve-btn"
                }`}
                style={{
                  pointerEvents:
                    showApprove === true &&
                    getApprovedNfts(selectNftIds).length > 0 &&
                    getApprovedNfts(selectNftIds).length < 51
                      ? "auto"
                      : "none",
                }}
                onClick={() => {
                  handleApprove();
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner-border " role="status"></div>
                  </>
                ) : (
                  "Approve"
                )}
              </button>
            )}
            <button
              className={`btn m-auto ${
                showApprove === false &&
                getApprovedNfts(selectNftIds).length > 0 &&
                getApprovedNfts(selectNftIds).length < 51
                  ? "pill-btn"
                  : "disabled-approve-btn"
              }`}
              style={{
                display: showApprove === false ? "" : "none",
                pointerEvents:
                  showApprove === false &&
                  getApprovedNfts(selectNftIds).length > 0 &&
                  getApprovedNfts(selectNftIds).length < 51
                    ? "auto"
                    : "none",
              }}
              onClick={() =>
                (checkbtn === true &&
                  getApprovedNfts(selectNftIds).length === 0) ||
                (checkbtn === false &&
                  getApprovedNfts(selectNftIds).length === 0) ||
                getApprovedNfts(selectNftIds).length > 50
                  ? onEmptyState()
                  : handleDeposit()
              }
            >
              {loadingdeposit ? (
                <>
                  <div
                    className="spinner-border "
                    role="status"
                    style={{ height: "1.5rem", width: "1.5rem" }}
                  ></div>
                </>
              ) : (
                "Deposit"
              )}
            </button>
          </div>
          <p className="mt-1" style={{ color: color, textAlign: "center" }}>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StakeLandModal;
