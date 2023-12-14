import React, { useState, useEffect } from "react";
import "./_stakemodal.scss";
import xmark from "./assets/xmark.svg";
import { Checkbox } from "@mui/material";
import EmptyCawsWod from "./EmptyCawsWod";
import greenInfo from "./assets/greenInfo.svg";
import cawsTag from "./assets/cawsTag.svg";
import wodTag from "./assets/wodTag.svg";
import fullWod from "./assets/fullWod.png";
import axios from "axios";
import CawsWodNftChecklist from "./CawsWodNftChecklist";
import ethIcon from "./assets/ethIcon.svg";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { formattedNum } from "../../screens/Caws/functions/formatUSD";

const RewardsModal = ({
  onModalClose,
  getApprovedNfts,
  getApprovedLandNfts,
  landStakes,
  cawsStakes,
  nftItem,
  isConnected,
  coinbase,
  onDepositComplete,
  ETHrewards,
  finalUsd,
  onClaimAll,
  handleConnect,
}) => {
  const [checkUnstakebtn, setCheckUnstakeBtn] = useState(false);
  const [status, setStatus] = useState("");
  const [showClaim, setshowClaim] = useState(false);
  const [loadingClaim, setloadingClaim] = useState(false);
  const [loadingWithdraw, setloadingWithdraw] = useState(false);
  const [selectNftIds, setSelectedNftIds] = useState([]);
  const [selectNftLandIds, setSelectedNftLandIds] = useState([]);
  const [ethToUSD, setethToUSD] = useState(0);
  const [checkbtn, setCheckBtn] = useState(false);
  const [color, setColor] = useState("#F13227");
  const [active, setActive] = useState(true);
  const [checknft, setchecknft] = useState(false);
  const [val, setVal] = useState("");

  let nftIds = [];
  let nftLandIds = [];

  const devicewidth = window.innerWidth;

  const handleClearStatus = () => {
    const interval = setInterval(async () => {
      setStatus("");
      setloadingWithdraw(false);
      setloadingClaim(false);
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

  const handleSelectAllToUnstake = () => {
    let cawsIdArray = [];
    let landIdArray = [];

    if (cawsStakes && cawsStakes.length > 0) {
      for (let i = 0; i < cawsStakes.length; i++) {
        let cawsId = cawsStakes[i].name?.slice(6, cawsStakes[i].name.length);
        cawsIdArray.push(cawsId);

        let WodId = landStakes[i].name?.slice(1, landStakes[i].name.length);
        landIdArray.push(WodId);
      }

      setCheckUnstakeBtn(!checkUnstakebtn);
      if (checkUnstakebtn === false) {
        if (cawsIdArray.length > 50) {
          setSelectedNftIds(cawsIdArray.slice(0, 50));
          getApprovedNfts(cawsIdArray.slice(0, 50));
        }
        if (landStakes.length > 50) {
          setSelectedNftLandIds(landIdArray.slice(0, 50));
          getApprovedLandNfts(landStakes.slice(0, 50));
        }

        if (cawsStakes.length <= 50) {
          setSelectedNftIds(cawsIdArray);
          getApprovedNfts(cawsIdArray);
        }

        if (landStakes.length <= 50) {
          setSelectedNftLandIds(landIdArray);
          getApprovedLandNfts(landStakes);
        }
      } else if (checkUnstakebtn === true) {
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
      }
      setCheckBtn(false);
    }
  };

  const onEmptyState = () => {};

  const handleUnstake = async (value) => {
    setStatus("*Processing unstake");
    setColor("#57AEAA");
    setloadingWithdraw(true);
    await window.wod_caws
      .withdrawWodCaws(
        getApprovedNfts(selectNftIds),
        getApprovedLandNfts(selectNftLandIds)
      )
      .then(() => {
        onDepositComplete();
        setloadingWithdraw(false);
        setStatus("*Unstaked successfully");
        setColor("#57AEAA");
        handleClearStatus();
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
      })
      .catch((err) => {
        setloadingWithdraw(false);
        window.alertify.error(err?.message);
        setStatus("An error occurred, please try again");
        setColor("#F13227");
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
        handleClearStatus();
      });
  };

  const handleClaim = async (itemId) => {
    setloadingClaim(true);
    setActive(false);
    setStatus("*Claiming rewards...");
    setColor("#57AEAA");
    await window.wod_caws
      .claimRewardsWodCaws(getApprovedNfts(selectNftIds))
      .then(() => {
        setloadingClaim(false);
        setStatus("*Claimed successfully");
        handleClearStatus();
        setColor("#57AEAA");
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        setloadingClaim(false);
        setColor("#F13227");
        setStatus("An error occurred, please try again");
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
      });
  };

  return (
    <div className="stake-modal p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="stake-modal-title">Staked NFTs</h6>
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
          <div className="d-flex align-items-center ">
            <button
              onClick={() => {
                handleSelectAllToUnstake();
              }}
              className="select-all-btn d-flex align-items-center"
              style={{
                pointerEvents: nftItem?.length !== 0 ? "auto" : "none",
                opacity: nftItem?.length !== 0 ? "1" : "0.4",
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

              {checkUnstakebtn ? "Unselect all NFTs" : "Select all NFTs"}
            </button>
          </div>
        </div>
        <div className="row position-relative mt-3">
          <div className="col-12">
            <div className="nft-modal-grid2">
              {cawsStakes.length === 0 ? (
                [...Array(devicewidth < 500 ? 2 : 4)].map((item, id) => {
                  return <EmptyCawsWod key={id} />;
                })
              ) : cawsStakes.length === 1 ? (
                <>
                  {cawsStakes.map((item, id) => {
                    let nftId = item.name?.slice(6, item.name?.length);
                    let WodId = landStakes[id]?.name?.slice(
                      1,
                      landStakes[id]?.name?.length
                    );
                    nftLandIds.push(nftId);

                    return (
                      <>
                        <CawsWodNftChecklist
                          key={id}
                          nft={item}
                          landNft={landStakes[id]}
                          modalId="#newNftchecklist"
                          isStake={true}
                          checked={
                            checkUnstakebtn === true &&
                            selectNftIds.length <= 50
                          }
                          checked2={selectNftIds.length <= 50 ? true : false}
                          checklistItemID={nftId}
                          landlistItemID={WodId}
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
                          onChangeLand={(value) => {
                            selectNftLandIds.indexOf(value) === -1
                              ? selectNftLandIds.push(value)
                              : selectNftLandIds.splice(
                                  selectNftLandIds.indexOf(value),
                                  1
                                );

                            setSelectedNftLandIds(selectNftLandIds);
                            getApprovedLandNfts(selectNftLandIds);
                            console.log(selectNftLandIds);
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
                        : Math.abs(4 - parseInt(cawsStakes.length))
                    ),
                  ].map((item, id) => {
                    return <EmptyCawsWod key={id} />;
                  })}
                </>
              ) : (
                <>
                  {cawsStakes.map((item, id) => {
                    let nftId = item.name?.slice(6, cawsStakes.name?.length);
                    let WodId = landStakes[id]?.name?.slice(
                      1,
                      landStakes[id]?.name?.length
                    );
                    nftLandIds.push(nftId);

                    return (
                      <>
                        <CawsWodNftChecklist
                          key={id}
                          nft={item}
                          landNft={landStakes[id]}
                          modalId="#newNftchecklist"
                          isStake={true}
                          checked={
                            checkUnstakebtn === true &&
                            selectNftIds.length <= 50
                          }
                          checked2={selectNftIds.length <= 50 ? true : false}
                          checklistItemID={nftId}
                          landlistItemID={WodId}
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
                          onChangeLand={(value) => {
                            selectNftLandIds.indexOf(value) === -1
                              ? selectNftLandIds.push(value)
                              : selectNftLandIds.splice(
                                  selectNftLandIds.indexOf(value),
                                  1
                                );

                            setSelectedNftLandIds(selectNftLandIds);
                            getApprovedLandNfts(selectNftLandIds);
                            console.log(selectNftLandIds);
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
            Please select the NFT pairs to claim your rewards or withdraw them
            from the staking pool.
          </span>
        </div>
        <div className="mt-3 d-flex flex-column flex-xxl-row flex-lg-row align-items-center justify-content-between gap-5">
          <div className="d-flex flex-column gap-2 justify-content-center align-items-center w-100 w-xxl-50 w-lg-50 w-md-50">
            <div className="selected-nfts-wrapper2 p-3 w-100">
              <span className="selected-nfts-span mb-2">Total Earned</span>

              <div className="d-flex gap-2 justify-content-between">
                <div className="d-flex align-items-center gap-1">
                  <img src={ethIcon} alt="" style={{ width: 30, height: 30 }} />
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
                className={`pill-btn ${
                  ETHrewards == 0 && "disabled-approve-btn"
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
                    {getApprovedNfts(selectNftIds).length > 0 &&
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
                  <img src={wodTag} alt="" />
                  <span className="selected-nfts-amount">
                    {landStakes.length} WOD Land
                  </span>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <img src={cawsTag} alt="" />
                  <span className="selected-nfts-amount">
                    {cawsStakes.length} CAWS
                  </span>
                </div>
              </div>
            </div>
            {isConnected && (
              <button
                className={` ${
                  (getApprovedNfts(selectNftIds).length !== 0 &&
                    getApprovedNfts(selectNftIds).length < 51 &&
                    nftItem.length !== 0) ||
                  checkUnstakebtn === true
                    ? "withdrawbtn"
                    : "disabled-approve-btn"
                } w-100 p-2`}
                onClick={() => {
                  checkUnstakebtn === true &&
                  getApprovedNfts(selectNftIds).length === nftItem.length &&
                  getApprovedNfts(selectNftIds).length < 51
                    ? handleUnstake()
                    : (checkUnstakebtn === true &&
                        getApprovedNfts(selectNftIds).length === 0) ||
                      getApprovedNfts(selectNftIds).length > 50
                    ? onEmptyState()
                    : getApprovedNfts(selectNftIds).length !== 0 &&
                      getApprovedNfts(selectNftIds).length < nftItem.length
                    ? handleUnstake()
                    : handleUnstake();
                }}
                style={{
                  pointerEvents:
                    getApprovedNfts(selectNftIds).length !== 0
                      ? "auto"
                      : nftItem.length !== 0 &&
                        checkUnstakebtn === true &&
                        getApprovedNfts(selectNftIds).length === 0
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
      </div>
    </div>
  );
};

export default RewardsModal;
