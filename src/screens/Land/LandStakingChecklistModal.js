import Modal from "@mui/material/Modal";
import axios from "axios";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ToolTip from "../Caws/elements/ToolTip";
import X from "../../assets/x_close.png";
import LandPlaceHolder from "./LandPlaceholder";
import LandItem from "./LandItem";
import { formattedNum } from "../Caws/functions/formatUSD";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import "../Caws/NftMinting/NftStakeChecklistModal/_nftStakeChecklistModal.scss";
import ethereum from "../../assets/landAssets/ethereum.svg";
import useWindowSize from '../../hooks/useWindowSize'


const LandStakingChecklistModal = ({
  nftItem,
  open,
  onShareClick,
  onClose,
  onshowToStake,
  onshowStaked,
  onUnstake,
  onClaimAll,
  link,
  ETHrewards,

  coinbase,
  showStaked,
  showToStake,
  isConnected,
}) => {


  const windowSize = useWindowSize();

  const style = {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowSize.width < 500 ? "80%" : "55%",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    height: "80%",
    borderRadius: "8px",
    overflowX: "hidden",
    padding: windowSize.width  < 500 ? '18px' : '32px'
  };

  const [active, setActive] = useState(true);
  const [checkbtn, setCheckBtn] = useState(false);
  const [checkUnstakebtn, setCheckUnstakeBtn] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingdeposit, setloadingdeposit] = useState(false);
  const [showClaim, setshowClaim] = useState(false);
  const [loadingClaim, setloadingClaim] = useState(false);
  const [apr, setapr] = useState(25);
  const [showApprove, setshowApprove] = useState(true);
  const [val, setVal] = useState("");
  const [color, setColor] = useState("#F13227");
  const [selectNftIds, setSelectedNftIds] = useState([]);
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
      if (apr == 25) {
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
    }
  };

  const handleSelectAll = () => {
    setCheckBtn(!checkbtn);
    if (checkbtn === false) {
      setSelectedNftIds(nftIds);
    } else if (checkbtn === true) {
      setSelectedNftIds([]);
    }
    setCheckUnstakeBtn(false);
  };

  const handleSelectAllToUnstake = () => {
    setCheckUnstakeBtn(!checkUnstakebtn);
    if (checkUnstakebtn === false) {
      setSelectedNftIds(nftIds);
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
  }, [showClaim, apr, showToStake]);

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
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setCheckUnstakeBtn(false);
        setCheckBtn(false);
        setSelectedNftIds([]);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="left-col">
          <div className="d-flex align-items-center justify-content-between width-100 position-relative">
            <div
              className="rarity-rank mt-6"
              style={{
                position: "relative",
                marginBottom: window.innerWidth < 500 ? "4rem" : "3rem",
                top: "1rem",
              }}
            >
              <h3
                className="text-white"
                style={{ fontSize: devicewidth < 500 ? 16 : 32 }}
              >
                {showStaked === true ? "Staked NFTs" : "NFTs to Stake"}
              </h3>
              <h6 className="landchecklist-subtitle">
                A list of your NFT collection that can be added and removed from
                the staking pool.
              </h6>
            </div>
            <img
              src={X}
              alt=""
              className="position-absolute"
              onClick={() => {
                onClose();
                setCheckUnstakeBtn(false);
                setCheckBtn(false);
                setSelectedNftIds([]);
              }}
              style={{
                right: "-12px",
                top: "-10px",
                height: "fit-content",
                width: 50,
                cursor: "pointer",
              }}
            />
          </div>
          <div className="d-flex flex-column gap-2 w-100">
            <div className="sub-navbar-wrapper">
              <div className={showToStake ? "linear-border" : ""}>
                <button
                  className={`btn d-flex gap-1 ${
                    showToStake ? "outline-btn" : "landtab-wrapper border-0"
                  } px-3 px-xxl-5 px-lg-5 px-md-5 w-100`}
                  onClick={() => {
                    onshowToStake();
                    //Make selectedNfts empty []
                    setSelectedNftIds([]);
                  }}
                  style={{
                    color: showToStake ? "#F7F7FC" : "#8E97CD",
                    background: showToStake ? "#1E1C40" : "transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  To Stake
                </button>
              </div>
              <div className={showStaked ? "linear-border" : ""}>
                <button
                  className={`btn d-flex gap-1 ${
                    showStaked ? "outline-btn" : "landtab-wrapper border-0"
                  } px-3 px-xxl-5 px-lg-5 px-md-5 w-100`}
                  onClick={() => {
                    onshowStaked();
                    //Make selectedNfts empty []
                    setSelectedNftIds([]);
                  }}
                  style={{
                    color: showStaked ? "#F7F7FC" : "#8E97CD",
                    background: showStaked ? "#1E1C40" : "transparent",
                  }}
                >
                  Staked
                  {showStaked && (
                    <sup className="landsup-notification">
                      <span>{nftItem.length}</span>
                    </sup>
                  )}
                </button>
              </div>
            </div>
            {showToStake ? (
              <div className="justify-content-start">
                <button
                  onClick={() => {
                    handleSelectAll();
                  }}
                  className="select-all-btn"
                  style={{
                    display: "flex",
                    pointerEvents: nftItem.length !== 0 ? "auto" : "none",
                    opacity: nftItem.length !== 0 ? "1" : "0.4",
                    color: checkbtn === true ? "#F7F7FC" : "#fff",
                  }}
                >
                  <input
                    type="checkbox"
                    id="add-to-stake"
                    name="checkbtn"
                    checked={checkbtn}
                    onChange={() => {}}
                  />
                  {checkbtn ? "Unselect All" : "Select All"}
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-start">
                <button
                  onClick={() => {
                    handleSelectAllToUnstake();
                    // selectNftIds.push(value)
                  }}
                  className="select-all-btn"
                  style={{
                    display: "flex",
                    pointerEvents: nftItem.length !== 0 ? "auto" : "none",
                    opacity: nftItem.length !== 0 ? "1" : "0.4",
                    color: checkUnstakebtn === true ? "#F7F7FC" : "#fff",
                  }}
                >
                  <input
                    type="checkbox"
                    id="add-to-stake"
                    name="AddtoUnstake"
                    checked={checkUnstakebtn}
                  />
                  {checkUnstakebtn ? "Unselect All" : "Select All"}
                </button>
              </div>
            )}
          </div>
          <div className="caw-card2">
            <div className="caw-card2 align-items-center">
              {nftItem.length == 0 ? (
                [...Array(devicewidth < 500 ? 1 : 8)].map((item, id) => {
                  return (
                    <LandPlaceHolder
                      key={id}
                      onMintClick={() => {
                        onClose();
                        setCheckUnstakeBtn(false);
                        setCheckBtn(false);
                      }}
                    />
                  );
                })
              ) : nftItem.length <= 4 ? (
                <>
                  {nftItem.map((item, id) => {
                    let nftId = item.name?.slice(6, nftItem.name?.length);

                    if (showToStake) {
                      // selectNftIds.push(nftId);
                      nftIds.push(nftId);
                    }
                    if (showStaked) {
                      nftIds.push(nftId);

                      // selectNftIds.push(nftId)
                    }
                    return (
                      <>
                        <LandItem
                          key={id}
                          nft={item}
                          modalId="#newNftchecklist"
                          isStake={showStaked}
                          checked={
                            (showToStake === true && checkbtn === true) ||
                            (showStaked === true && checkUnstakebtn === true)
                          }
                          checklistItemID={nftId}
                          onChange={(value) => {
                            selectNftIds.indexOf(value) === -1
                              ? selectNftIds.push(value)
                              : selectNftIds.splice(
                                  selectNftIds.indexOf(value),
                                  1
                                );
                            setSelectedNftIds(selectNftIds);
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
                        : Math.abs(8 - parseInt(nftItem.length))
                    ),
                  ].map((item, id) => {
                    return (
                      <LandPlaceHolder
                        key={id}
                        onMintClick={() => {
                          onClose();
                          setCheckUnstakeBtn(false);
                          setCheckBtn(false);
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                nftItem.map((item, id) => {
                  let nftId = item.name?.slice(6, nftItem.name?.length);
                  if (showToStake) {
                    // selectNftIds.push(nftId);
                    nftIds.push(nftId);
                  }
                  if (showStaked) {
                    nftIds.push(nftId);

                    // selectNftIds.push(nftId)
                  }
                  return (
                    <>
                      <LandItem
                        coinbase={coinbase}
                        key={id}
                        nft={item}
                        action={onShareClick}
                        modalId="#NftUnstake2"
                        isStake={showStaked}
                        checked={
                          (showToStake === true && checkbtn === true) ||
                          (showStaked === true && checkUnstakebtn === true)
                        }
                        checklistItemID={nftId}
                        onChange={(value) => {
                          selectNftIds.indexOf(value) === -1
                            ? selectNftIds.push(value)
                            : selectNftIds.splice(
                                selectNftIds.indexOf(value),
                                1
                              );
                          setSelectedNftIds(selectNftIds);
                          console.log(selectNftIds);
                          setVal(value);
                        }}
                        isConnected={isConnected}
                      />
                    </>
                  );
                })
              )}
            </div>
          </div>
        </div>{" "}
        <div  className="bottom-static-wrapper d-flex flex-column align-items-center m-0">
          <div className="landbottom-static-wrapper  bottom-width">
            <p className="d-flex landinfo-text">
              *
              {!showStaked
                ? "Please select which NFTs to Stake. Once selected, you need to approve the process and then proceed to deposit in order to start receiving rewards."
                : "Please select your NFTs to Claim or to Unstake"}
            </p>
          </div>

          <div className="mt-2 bottom-width">
            <div
              className="gap-2 flex-column flex-xl-row flex-lg-row flex-md-row"
              style={{ display: showStaked === false ? "flex" : "none" }}
            >
              <div className="landbottom-static-wrapper b-0 w-100 flex-column d-flex justify-content-between">
                <div className="d-flex gap-4 align-items-center">
                  <h5
                    className="landselect-apr d-flex m-0 align-items-baseline"
                    style={{ gap: 8 }}
                  >
                    APR:<span className="landaprText">25% </span>
                  </h5>
                  <h5
                    className="landselect-apr d-flex m-0 align-items-baseline"
                    style={{ gap: 8 }}
                  >
                    Lock time:<span className="landaprText">No lock time</span>
                  </h5>
                </div>
                <div className="mt-4 d-flex flex-column flex-xl-row flex-lg-row flex-md-row justify-content-center">
                  <div
                    className={
                      active && selectNftIds.length > 0 && showApprove === true
                        ? "linear-border w-100"
                        : "linear-border-disabled w-100"
                    }
                  >
                    <button
                      className={`btn ${
                        active &&
                        selectNftIds.length > 0 &&
                        showApprove === true
                          ? "filled-btn"
                          : "outline-btn-disabled"
                      } px-5 w-100`}
                      onClick={() => {
                        handleApprove();
                      }}
                      disabled={
                        active &&
                        selectNftIds.length > 0 &&
                        showApprove === true
                          ? false
                          : true
                      }
                    >
                      {loading ? (
                        <>
                          <div className="spinner-border " role="status"></div>
                        </>
                      ) : (
                        "Approve stake"
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="landbottom-static-wrapper b-0 w-100 d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between p-0 flex-column">
                  <div className="d-flex align-items-center gap-1 justify-content-end">
                    <span
                      className="mb-0 landethPrice"
                      style={{
                        display: "flex",
                        fontWeight: 700,
                      }}
                    >
                      {selectNftIds.length}
                      /50
                    </span>
                    <span
                      className="mb-0 landethPrice"
                      style={{
                        display: "flex",
                      }}
                    >
                      selected
                    </span>
                  </div>
                  <span className="landnote m-0">
                    Maximum of 50 NFTs selectable
                  </span>
                </div>
                <div
                  style={{ display: showStaked === false ? "block" : "none" }}
                >
                  <div
                    className="mt-4 d-flex flex-column flex-xl-row flex-lg-row flex-md-row justify-content-center"
                    style={{
                      gap: 20,
                      display: showStaked === false ? "" : "none",
                    }}
                  >
                    <div
                      className={
                        !active ||
                        (!showApprove &&
                          selectNftIds.length > 0 &&
                          selectNftIds.length !== 0 &&
                          selectNftIds.length < 51)
                          ? "linear-border  w-100"
                          : "linear-border-disabled  w-100"
                      }
                      style={
                        {
                          // display: showApprove === true ? "block" : "none",
                        }
                      }
                    >
                      <button
                        className={`btn ${
                          !active ||
                          (!showApprove &&
                            selectNftIds.length > 0 &&
                            selectNftIds.length !== 0 &&
                            selectNftIds.length < 51)
                            ? "filled-btn"
                            : "outline-btn-disabled"
                        } px-5 w-100`}
                        onClick={() =>
                          (checkbtn === true && selectNftIds.length === 0) ||
                          (checkbtn === false && selectNftIds.length === 0) ||
                          selectNftIds.length > 50
                            ? onEmptyState()
                            : handleDeposit(val)
                        }
                        disabled={
                          !active || (!showApprove && selectNftIds.length)
                            ? false
                            : true
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
                          "Stake"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 bottom-width">
            <div
              className="gap-2 flex-column flex-xl-row flex-lg-row flex-md-row"
              style={{
                display:
                  showStaked === true && nftItem.length > 0 ? "flex" : "none",
              }}
            >
              <div className="landbottom-static-wrapper b-0 w-100 flex-column justify-content-between">
                <div className="d-flex gap-4 align-items-center justify-content-between">
                  <h5
                    className="landaprText d-flex m-0 align-items-baseline"
                    style={{ gap: 8 }}
                  >
                    All total earned
                  </h5>
                  <h5
                    className="landaprText d-flex m-0 align-items-center"
                    style={{ gap: 8 }}
                  >
                    {getFormattedNumber(ETHrewards, 2)}ETH{"   "}({" "}
                    {formattedNum(ethToUSD, true)})
                    <img
                      src={ethereum}
                      alt=""
                      style={{ width: 24, height: 24 }}
                    />
                  </h5>
                </div>
                <div className="mt-4 flex-column flex-xl-row flex-lg-row flex-md-row justify-content-center">
                  <div
                    className={
                      ETHrewards != 0
                        ? "linear-border w-100"
                        : "linear-border-disabled w-100"
                    }
                  >
                    <button
                      className={`btn ${
                        ETHrewards != 0 ? "filled-btn" : "outline-btn-disabled"
                      } px-5 w-100`}
                      onClick={() => {
                        checkUnstakebtn === true &&
                        selectNftIds.length === nftItem.length
                          ? onClaimAll()
                          : checkUnstakebtn === true &&
                            selectNftIds.length === 0
                          ? onEmptyState()
                          : selectNftIds.length !== 0 &&
                            selectNftIds.length < nftItem.length
                          ? handleClaim(selectNftIds)
                          : onClaimAll();
                        // setCheckUnstakeBtn(false);
                      }}
                      disabled={ETHrewards !== 0 ? false : true}
                    >
                      {loadingClaim ? (
                        <>
                          <div className="spinner-border " role="status"></div>
                        </>
                      ) : (
                        "Claim All Rewards"
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="landbottom-static-wrapper b-0 w-100 flex-column justify-content-between">
                <div className="d-flex justify-content-between p-0 flex-column">
                  <div className="d-flex align-items-center gap-1 justify-content-end">
                    <span
                      className="mb-0 landethPrice"
                      style={{
                        display: "flex",
                        fontWeight: 700,
                      }}
                    >
                      {selectNftIds.length}
                      /50
                    </span>
                    <span
                      className="mb-0 landethPrice"
                      style={{
                        display: "flex",
                      }}
                    >
                      selected
                    </span>
                  </div>
                  <span className="landnote m-0">
                    Maximum of 50 NFTs selectable
                  </span>
                </div>
                <div>
                  <div className="mt-4 flex-column flex-xl-row flex-lg-row flex-md-row justify-content-center">
                    <div
                      className={
                        active &&
                        selectNftIds.length !== 0 &&
                        selectNftIds.length < 51
                          ? "linear-border  w-100"
                          : "linear-border-disabled  w-100"
                      }
                    >
                      <button
                        className={`btn ${
                          (active && selectNftIds.length !== 0) ||
                          (nftItem.length !== 0 &&
                            checkUnstakebtn === true &&
                            selectNftIds.length == 0)
                            ? "filled-btn"
                            : "outline-btn-disabled"
                        } px-5 w-100`}
                        onClick={() => {
                          checkUnstakebtn === true &&
                          selectNftIds.length === nftItem.length &&
                          selectNftIds.length < 51
                            ? onUnstake()
                            : (checkUnstakebtn === true &&
                                selectNftIds.length === 0) ||
                              selectNftIds.length > 50
                            ? onEmptyState()
                            : selectNftIds.length !== 0 &&
                              selectNftIds.length < nftItem.length
                            ? handleUnstake(selectNftIds)
                            : onUnstake();
                        }}
                        disabled={
                          (active && selectNftIds.length !== 0) ||
                          (nftItem.length !== 0 &&
                            checkUnstakebtn === true &&
                            selectNftIds.length === 0)
                            ? false
                            : true
                        }
                      >
                        {loading ? (
                          <>
                            <div
                              className="spinner-border"
                              role="status"
                            ></div>
                          </>
                        ) : (
                          "Unstake Selected"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-1" style={{ color: color, textAlign: "center" }}>
              {status}
            </p>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
LandStakingChecklistModal.propTypes = {
  nftItem: PropTypes.array,
  open: PropTypes.bool,
  onShareClick: PropTypes.func,
  onClose: PropTypes.func,
  onshowToStake: PropTypes.func,
  onshowStaked: PropTypes.func,
  onClaimAll: PropTypes.func,
  onUnstake: PropTypes.func,
  ETHrewards: PropTypes.number,
};

export default LandStakingChecklistModal;
