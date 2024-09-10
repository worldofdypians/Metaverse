import React, { useState, useEffect } from "react";
import "./_stakemodal.scss";
import xmark from "./assets/xmark.svg";
import { Checkbox } from "@mui/material";
import EmptyWodCard from "./EmptyWodCard";
import greenInfo from "./assets/greenInfo.svg";
import cawsTag from "./assets/cawsTag.svg";
import wodTag from "./assets/wodTag.svg";
import fullWod from "./assets/fullWod.png";
import ethIcon from "./assets/ethIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { formattedNum } from "../../screens/Caws/functions/formatUSD";
import EmptyCawsCard from "./EmptyCawsCard";
import CawsPremiumChecklist from "./CawsPremiumChecklist";
import { ethers } from "ethers";

const CawsStakeModal = ({
  onModalClose,
  getApprovedLandPoolsNfts,
  isConnected,
  coinbase,
  onDepositComplete,
  nftItem,
  isStake,
  ETHrewards,
  hideItem,
  finalUsd,
  onClaimAll,
  handleConnect,
  myCawsstakes,
  binanceW3WProvider,
  onUnstake,
}) => {
  const [active, setActive] = useState(true);
  const [showToStake, setshowToStake] = useState(false);
  const [showStaked, setshowStaked] = useState(false);
  const [checkbtn, setCheckBtn] = useState(false);
  const [checkUnstakebtn, setCheckUnstakeBtn] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingdeposit, setloadingdeposit] = useState(false);
  const [showClaim, setshowClaim] = useState(false);
  const [loadingClaim, setloadingClaim] = useState(false);
  const [showApprove, setshowApprove] = useState(true);
  const [checknft, setchecknft] = useState(false);
  const [val, setVal] = useState("");
  const [color, setColor] = useState("#F13227");
  const [selectNftIds, setSelectedNftIds] = useState([]);
  const [tooltip, setTooltip] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [loadingWithdraw, setloadingWithdraw] = useState(false);

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
    const stake25 = await window.config.nft_caws_premiumstake_address;
    if (address) {
      const result = await window.nft
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
      if (nftIds.length > 4) {
        setSelectedNftIds(nftIds.slice(0, 4 - myCawsstakes.length));
        getApprovedLandPoolsNfts(nftIds.slice(0, 4 - myCawsstakes.length));
      } else if (nftIds.length <= 4) {
        setSelectedNftIds(nftIds.slice(0, 4 - myCawsstakes.length));
        getApprovedLandPoolsNfts(nftIds.slice(0, 4 - myCawsstakes.length));
      }
    } else if (checkbtn === true) {
      setSelectedNftIds([]);
    }
    setCheckUnstakeBtn(false);
  };

  const handleSelectAllToUnstake = () => {
    setCheckUnstakeBtn(!checkUnstakebtn);
    if (checkUnstakebtn === false) {
      if (nftIds.length > 4) {
        setSelectedNftIds(nftIds.slice(0, 4));
        getApprovedLandPoolsNfts(nftIds.slice(0, 4));
      } else if (nftIds.length <= 4) {
        setSelectedNftIds(nftIds);
        getApprovedLandPoolsNfts(nftIds);
      }
    } else if (checkUnstakebtn === true) {
      setSelectedNftIds([]);
    }
    setCheckBtn(false);
  };

  const handleApprove = async () => {
    const stake25 = await window.config.nft_caws_premiumstake_address;
    setloading(true);
    setStatus("*Waiting for approval");
    setColor("#52A8A4");
    if (window.WALLET_TYPE !== "binance") {
      await window.nft
        .approveStake(stake25)
        .then(() => {
          setActive(false);
          setloading(false);
          setColor("#52A8A4");
          setStatus("*Now you can deposit");
        })
        .catch((err) => {
          console.error(err)
          setloading(false);
          setColor("#F13227");
          setStatus("*An error occurred. Please try again");
          handleClearStatus();
        });
    } else if (window.WALLET_TYPE === "binance") {
      const nft_contract = new ethers.Contract(
        window.config.nft_caws_address,
        window.CAWS_ABI,
        binanceW3WProvider.getSigner()
      );
      const txResponse = await nft_contract
        .setApprovalForAll(stake25, true)
        .catch((err) => {
          setloading(false);
          setColor("#F13227");
          setStatus("*An error occurred. Please try again");
          handleClearStatus();
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setActive(false);
        setloading(false);
        setColor("#52A8A4");
        setStatus("*Now you can deposit");
      }
    }
  };

  const handleDeposit = async (value) => {
    setloadingdeposit(true);
    setStatus("*Processing deposit");
    setColor("#52A8A4");

    if (window.WALLET_TYPE !== "binance") {
      let stake_contract = await window.getContractCawsPremiumNFT(
        "CAWSPREMIUM"
      );
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
    } else if (window.WALLET_TYPE === "binance") {
      let stake_contract = await new ethers.Contract(
        window.config.nft_caws_premiumstake_address,
        window.CAWSPREMIUM_ABI,
        binanceW3WProvider.getSigner()
      );
      const txResponse = await stake_contract
        .deposit(
          checkbtn === true
            ? nftIds.length === selectNftIds.length
              ? nftIds
              : selectNftIds
            : selectNftIds
        )
        .catch((err) => {
          setloadingdeposit(false);
          setColor("#F13227");
          setStatus("*An error occurred. Please try again");
          setSelectedNftIds([]);
          handleClearStatus();
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setloadingdeposit(false);
        setshowClaim(true);
        setActive(true);
        setStatus("*Sucessfully deposited");
        setSelectedNftIds([]);
        setColor("#57AEAA");
        handleClearStatus();
        onDepositComplete();
      }
    }
  };

  useEffect(() => {
    setshowStaked(true);
  }, []);

  useEffect(() => {
    setUSDPrice().then();
  }, [ETHrewards]);

  useEffect(() => {
    if (selectNftIds.length > 4 && checkbtn === false && showToStake === true) {
      window.alertify.error("Limit to Stake/Unstake NFT is 4 NFT's per wallet");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        return () => clearInterval(interval);
      }, 500);
    } else if (
      selectNftIds.length > 4 &&
      checkbtn === true &&
      showToStake === true
    ) {
      window.alertify.error("Limit to Stake/Unstake NFT is 4 NFT's per wallet");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        setSelectedNftIds([]);
        return () => clearInterval(interval);
      }, 500);
    } else if (
      selectNftIds.length > 4 &&
      checkUnstakebtn === false &&
      showToStake === false
    ) {
      window.alertify.error("Limit to Stake/Unstake NFT is 4 NFT's per wallet");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        return () => clearInterval(interval);
      }, 500);
    } else if (
      selectNftIds.length > 4 &&
      checkUnstakebtn === true &&
      showToStake === false
    ) {
      window.alertify.error("Limit to Stake/Unstake NFT is 4 NFT's per wallet");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setCheckUnstakeBtn(false);
        setSelectedNftIds([]);
        return () => clearInterval(interval);
      }, 500);
    }
  }, [selectNftIds.length, val, checkbtn, checkUnstakebtn]);

  useEffect(() => {
    if (isStake === false) {
      checkApproval();
    } else setSelectedNftIds([]);
  }, [isStake, coinbase]);

  useEffect(() => {
    if (hideItem === "staked") {
      setshowToStake(true);
      setshowStaked(false);
    }
  }, [hideItem, showStaked, showToStake]);

  const onEmptyState = () => {};

  const handleUnstake = async (value) => {
    setStatus("*Processing unstake");
    setColor("#52A8A4");
    setloadingWithdraw(true);
    if (window.WALLET_TYPE !== "binance") {
      let stake_contract = await window.getContractCawsPremiumNFT(
        "CAWSPREMIUM"
      );
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
          setloadingWithdraw(false);
        })
        .catch((err) => {
          window.alertify.error(err?.message);
          setStatus("An error occurred, please try again");
          setColor("#F13227");
          setSelectedNftIds([]);
          handleClearStatus();
          setloadingWithdraw(false);
        });
    } else if (window.WALLET_TYPE === "binance") {
      let stake_contract = await new ethers.Contract(
        window.config.nft_caws_premiumstake_address,
        window.CAWSPREMIUM_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await stake_contract
        .withdraw(
          checkUnstakebtn === true
            ? nftIds.length === selectNftIds.length
              ? nftIds
              : selectNftIds
            : selectNftIds
        )
        .catch((err) => {
          window.alertify.error(err?.message);
          setStatus("An error occurred, please try again");
          setColor("#F13227");
          setSelectedNftIds([]);
          handleClearStatus();
          setloadingWithdraw(false);
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setStatus("*Unstaked successfully");
        setColor("#57AEAA");
        handleClearStatus();
        setSelectedNftIds([]);
        onUnstake();
        setloadingWithdraw(false);
      }
    }
  };

  const handleClaim = async (itemId) => {
    setColor("#52A8A4");
    setloadingClaim(true);
    setActive(false);
    setStatus("*Claiming rewards...");

    if (window.WALLET_TYPE !== "binance") {
      let staking_contract = await window.getContractCawsPremiumNFT(
        "CAWSPREMIUM"
      );
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
    } else if (window.WALLET_TYPE === "binance") {
      let staking_contract = await new ethers.Contract(
        window.config.nft_caws_premiumstake_address,
        window.CAWSPREMIUM_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await staking_contract
        .claimRewards(
          checkUnstakebtn === true
            ? nftIds.length === selectNftIds.length
              ? nftIds
              : selectNftIds
            : selectNftIds
        )
        .catch((err) => {
          window.alertify.error(err?.message);
          setloadingClaim(false);
          setStatus("An error occurred, please try again");
          setSelectedNftIds([]);
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setloadingClaim(false);
        setStatus("*Claimed successfully");
        handleClearStatus();
        setColor("#57AEAA");
        setSelectedNftIds([]);
      }
    }
  };

  const devicewidth = window.innerWidth;

  return (
    <div className="stake-modal p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="stake-modal-title">
          {!isStake ? "Stakeable NFTs" : "Staked NFTs"}
        </h6>
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

      <span className="d-flex my-3 market-stake-divider"></span>
      <div className="modal-scroll2">
        <div className="d-flex align-items-center justify-content-end">
          <div className="d-flex flex-column gap-2">
            {!isStake ? (
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
                {checkbtn ? "Unselect all NFTs" : "Select all NFTs"}
              </button>
            ) : (
              <button
                onClick={() => {
                  handleSelectAllToUnstake();
                }}
                className="select-all-btn d-flex align-items-center"
                style={{
                  pointerEvents: nftItem.length !== 0 ? "auto" : "none",
                  opacity: nftItem.length !== 0 ? "1" : "0.4",
                  color: checkUnstakebtn === true ? "#4ED5D2" : "#fff",
                }}
              >
                <Checkbox
                  sx={{
                    color: "#8E97CD",
                    "&.Mui-checked": {
                      color: "#82DAAB",
                    },
                  }}
                  checked={checkUnstakebtn}
                />
                {checkUnstakebtn
                  ? "Unselect all to unstake"
                  : "Select all NFTs"}
              </button>
            )}
          </div>
        </div>
        <div className="row position-relative mt-3">
          <div className="col-12">
            <div className="nft-modal-grid22">
              {nftItem.length === 0 ? (
                [...Array(devicewidth < 500 ? 2 : 4)].map((item, id) => {
                  return <EmptyCawsCard key={id} />;
                })
              ) : nftItem.length === 1 ? (
                <>
                  {nftItem.map((item, id) => {
                    let nftId = item.name?.slice(6, nftItem.name?.length);

                    nftIds.push(nftId);

                    return (
                      <>
                        <CawsPremiumChecklist
                          key={id}
                          nft={item}
                          width={"auto"}
                          height={"auto"}
                          modalId="#newNftchecklist"
                          isStake={isStake}
                          countDownLeft={0}
                          checked={
                            (isStake === false &&
                              checkbtn === true &&
                              selectNftIds.length <= 4 &&
                              selectNftIds.includes(nftId)) ||
                            (isStake === true &&
                              checkUnstakebtn === true &&
                              selectNftIds.length <= 4 &&
                              selectNftIds.includes(nftId))
                          }
                          checked2={selectNftIds.length <= 4 ? true : false}
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
                            getApprovedLandPoolsNfts(selectNftIds);
                            console.log(selectNftIds);
                            setVal(value);
                          }}
                          coinbase={coinbase}
                          isConnected={isConnected}
                          binanceW3WProvider={binanceW3WProvider}
                          onUnstake={onUnstake}
                        />
                      </>
                    );
                  })}
                  {[
                    ...Array(
                      devicewidth < 500
                        ? 1
                        : Math.abs(4 - parseInt(nftItem.length))
                    ),
                  ].map((item, id) => {
                    return <EmptyCawsCard key={id} />;
                  })}
                </>
              ) : (
                <>
                  {nftItem.map((item, id) => {
                    let nftId = item.name?.slice(6, nftItem.name?.length);
                    nftIds.push(nftId);

                    return (
                      <>
                        <CawsPremiumChecklist
                          key={id}
                          nft={item}
                          countDownLeft={0}
                          width={"auto"}
                          height={"auto"}
                          modalId="#newNftchecklist"
                          isStake={isStake}
                          checked={
                            (isStake === false &&
                              checkbtn === true &&
                              selectNftIds.length <= 4 &&
                              selectNftIds.includes(nftId)) ||
                            (isStake === true &&
                              checkUnstakebtn === true &&
                              selectNftIds.length <= 4 &&
                              selectNftIds.includes(nftId))
                          }
                          checked2={selectNftIds.length <= 4 ? true : false}
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
                            getApprovedLandPoolsNfts(selectNftIds);
                            console.log(selectNftIds);
                            setVal(value);
                          }}
                          coinbase={coinbase}
                          isConnected={isConnected}
                          binanceW3WProvider={binanceW3WProvider}
                          onUnstake={onUnstake}
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
            {isStake
              ? `Please select the NFTs to claim your rewards or withdraw them
            from the staking pool.`
              : ` Please choose the NFTs that you wish to stake. Once you have made your
          selection, you will be required to approve the process before
          depositing the NFTs.`}
          </span>
        </div>
        {!isStake ? (
          <div className="mt-3 d-flex flex-column flex-lg-row align-items-center align-items-lg-end justify-content-between">
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
                    You can select a maximum of 4 CAWS NFTs
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-1">
                  <img src={cawsTag} alt="" />
                  <span className="selected-nfts-amount">
                    {getApprovedLandPoolsNfts(selectNftIds).length} CAWS
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="mt-4 row mx-0 justify-content-xxl-between justify-content-lg-between justify-content-md-between justify-content-sm-between justify-content-center gap-3">
                {showApprove === true && isConnected && (
                  <button
                    className={`btn m-auto ${
                      showApprove === true &&
                      getApprovedLandPoolsNfts(selectNftIds).length > 0 &&
                      getApprovedLandPoolsNfts(selectNftIds).length < 5
                        ? "pill-btn"
                        : "disabled-approve-btn"
                    }`}
                    style={{
                      pointerEvents:
                        showApprove === true &&
                        getApprovedLandPoolsNfts(selectNftIds).length > 0 &&
                        getApprovedLandPoolsNfts(selectNftIds).length < 5
                          ? "auto"
                          : "none",
                    }}
                    onClick={() => {
                      handleApprove();
                    }}
                  >
                    {loading ? (
                      <>
                        <div
                          className="spinner-border "
                          role="status"
                          style={{ height: "1.5rem", width: "1.5rem" }}
                        ></div>
                      </>
                    ) : (
                      "Approve"
                    )}
                  </button>
                )}
                <button
                  className={`btn m-auto ${
                    showApprove === false &&
                    isConnected &&
                    getApprovedLandPoolsNfts(selectNftIds).length > 0 &&
                    getApprovedLandPoolsNfts(selectNftIds).length < 5
                      ? "pill-btn"
                      : "disabled-approve-btn"
                  }`}
                  style={{
                    display: showApprove === false ? "" : "none",
                    pointerEvents:
                      showApprove === false &&
                      getApprovedLandPoolsNfts(selectNftIds).length > 0 &&
                      getApprovedLandPoolsNfts(selectNftIds).length < 5
                        ? "auto"
                        : "none",
                  }}
                  onClick={() =>
                    (checkbtn === true &&
                      getApprovedLandPoolsNfts(selectNftIds).length === 0) ||
                    (checkbtn === false &&
                      getApprovedLandPoolsNfts(selectNftIds).length === 0) ||
                    getApprovedLandPoolsNfts(selectNftIds).length > 4
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
                {!isConnected && (
                  <button
                    className={`btn m-auto pill-btn`}
                    onClick={handleConnect}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
              <p className="mt-1" style={{ color: color, textAlign: "center" }}>
                {status}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 d-flex flex-column flex-xxl-row flex-lg-row align-items-center justify-content-between gap-5">
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-100 w-xxl-50 w-lg-50 w-md-50">
              <div className="selected-nfts-wrapper2 p-3 w-100">
                <span className="selected-nfts-span mb-2">Total Earned</span>

                <div className="d-flex gap-2 justify-content-between">
                  <div className="d-flex align-items-center gap-1">
                    <img
                      src={ethIcon}
                      alt=""
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="selected-nfts-amount2">
                      {getFormattedNumber(ETHrewards, 3)} ETH
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <span className="nft-price-usd">
                      {formattedNum(finalUsd, true)}
                    </span>
                  </div>
                </div>
              </div>
              {isConnected && (
                <button
                  className={` ${
                    ETHrewards == 0 ? "disabled-approve-btn" : "pill-btn"
                  } mb-1 w-100 p-2`}
                  onClick={() => {
                    checkUnstakebtn === true &&
                    selectNftIds.length === nftItem.length
                      ? onClaimAll()
                      : checkUnstakebtn === true && selectNftIds.length === 0
                      ? onEmptyState()
                      : selectNftIds.length !== 0 &&
                        selectNftIds.length < nftItem.length
                      ? handleClaim(selectNftIds)
                      : onClaimAll();
                  }}
                  style={{
                    pointerEvents: ETHrewards == 0 ? "none" : "auto",
                  }}
                >
                  {loadingClaim ? (
                    <>
                      <div
                        className="spinner-border "
                        role="status"
                        style={{ height: "1.5rem", width: "1.5rem" }}
                      ></div>
                    </>
                  ) : (
                    <>
                      {getApprovedLandPoolsNfts(selectNftIds).length > 0 &&
                      nftItem.length > 0
                        ? "Claim Selected"
                        : nftItem.length === 0
                        ? "Claim"
                        : "Claim all rewards"}
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-100 w-xxl-50 w-lg-50 w-md-50">
              <div className="gap-3 selected-nfts-wrapper2 p-3 w-100 d-flex flex-column">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="selected-nfts-span mb-2">In stake NFTs</span>
                </div>
                <div className="d-flex gap-2 justify-content-between">
                  <div className="d-flex align-items-center gap-1">
                    <img src={cawsTag} alt="" />
                    <span className="selected-nfts-amount">
                      {getApprovedLandPoolsNfts(selectNftIds).length} CAWS
                    </span>
                  </div>
                </div>
              </div>
              {isConnected && (
                <button
                  className={` ${
                    (getApprovedLandPoolsNfts(selectNftIds).length !== 0 &&
                      getApprovedLandPoolsNfts(selectNftIds).length < 5 &&
                      nftItem.length !== 0) ||
                    checkUnstakebtn === true
                      ? "withdrawbtn border-0"
                      : "disabled-approve-btn"
                  } w-100 p-2`}
                  onClick={() => {
                    checkUnstakebtn === true &&
                    getApprovedLandPoolsNfts(selectNftIds).length ===
                      nftItem.length &&
                    getApprovedLandPoolsNfts(selectNftIds).length < 5
                      ? handleUnstake()
                      : (checkUnstakebtn === true &&
                          getApprovedLandPoolsNfts(selectNftIds).length ===
                            0) ||
                        getApprovedLandPoolsNfts(selectNftIds).length > 4
                      ? onEmptyState()
                      : getApprovedLandPoolsNfts(selectNftIds).length !== 0 &&
                        getApprovedLandPoolsNfts(selectNftIds).length <
                          nftItem.length
                      ? handleUnstake()
                      : handleUnstake();
                  }}
                  style={{
                    pointerEvents:
                      getApprovedLandPoolsNfts(selectNftIds).length !== 0
                        ? "auto"
                        : nftItem.length !== 0 &&
                          checkUnstakebtn === true &&
                          getApprovedLandPoolsNfts(selectNftIds).length === 0
                        ? "auto"
                        : "none",
                  }}
                >
                  {loadingWithdraw ? (
                    <>
                      <div
                        className="spinner-border "
                        role="status"
                        style={{ height: "1.5rem", width: "1.5rem" }}
                      ></div>
                    </>
                  ) : (
                    "Unstake"
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CawsStakeModal;
