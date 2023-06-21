import React, { useState, useEffect } from "react";
import "./_stakemodal.scss";
import xmark from "./assets/xmark.svg";
import { Checkbox } from "@mui/material";
import EmptyWodCard from "./EmptyWodCard";
import EmptyCawsWod from "./EmptyCawsWod";
import greenInfo from "./assets/greenInfo.svg";
import cawsTag from "./assets/cawsTag.svg";
import wodTag from "./assets/wodTag.svg";
import fullWod from "./assets/fullWod.png";
import axios from "axios";
import CawsWodNftChecklist from "./CawsWodNftChecklist";
import ethIcon from "./assets/ethIcon.svg";

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
      <div className="d-flex align-items-center justify-content-center">
        <button className="btn nft-stake-btn mt-3 p-2">Staked</button>
      </div>
      <span className="d-flex my-3 market-stake-divider"></span>
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
      <div className="row modal-scroll position-relative mt-3">
        <div className="col-12">
          <div className="nft-modal-grid2">
            {cawsStakes.length === 0 ? (
              [...Array(devicewidth < 500 ? 1 : 4)].map((item, id) => {
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
                          checkUnstakebtn === true && selectNftIds.length <= 50
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
                      : Math.abs(2 - parseInt(cawsStakes.length))
                  ),
                ].map((item, id) => {
                  return <EmptyWodCard key={id} />;
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
                          checkUnstakebtn === true && selectNftIds.length <= 50
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
      <div className="mt-3 d-flex align-items-end justify-content-between">
        <div className="selected-nfts-wrapper2 p-3">
          <div className="d-flex align-items-center justify-content-between">
            <span className="selected-nfts-span mb-2">Total Earned</span>
          </div>
          <div className="d-flex gap-2 justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <img src={ethIcon} alt="" style={{ width: 30, height: 30 }} />
              <span className="selected-nfts-amount2">{ETHrewards} ETH</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="nft-price-usd">${finalUsd}</span>
            </div>
          </div>
        </div>

        <div className="selected-nfts-wrapper2 p-3">
          <div className="d-flex align-items-center justify-content-between">
            <span className="selected-nfts-span mb-2">In stake NFTs</span>
          </div>
          <div className="d-flex gap-2 justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <img src={wodTag} alt="" />
              <span className="selected-nfts-amount">
                {landStakes.length} Wod Land
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
      </div>
    </div>
  );
};

export default RewardsModal;
