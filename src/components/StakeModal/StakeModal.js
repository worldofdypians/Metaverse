import React, { useState, useEffect } from "react";
import "./_stakemodal.scss"; 
import { Checkbox } from "@mui/material";
import EmptyWodCard from "./EmptyWodCard";
import EmptyCawsCard from "./EmptyCawsCard";
import greenInfo from "./assets/greenInfo.svg";
import cawsTag from "./assets/cawsTag.svg";
import wodTag from "./assets/wodTag.svg";
import fullWod from "./assets/fullWod.png";
import NftStakingCawChecklist from "./NftStakingCawChecklist";
import LandNftChecklist from "./LandNftChecklist";
import OutsideClickHandler from "react-outside-click-handler";
import Web3 from "web3";

const StakeModal = ({
  onModalClose,
  getApprovedNfts,
  getApprovedLandNfts,
  landItems,
  cawsItems,
  isConnected,
  coinbase,
  onDepositComplete,
  nftItem,
  handleConnect
}) => {
  const [checkbtn, setCheckBtn] = useState(false);

  const [checkLandbtn, setCheckLandBtn] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingdeposit, setloadingdeposit] = useState(false);
  const [checknft, setchecknft] = useState(false);
  const [showCawsApprove, setshowCawsApprove] = useState(true);
  const [showLandApprove, setshowLandApprove] = useState(true);
  const [val, setVal] = useState("");
  const [color, setColor] = useState("#F13227");
  const [selectNftIds, setSelectedNftIds] = useState([]);
  const [selectNftLandIds, setSelectedNftLandIds] = useState([]);
  const [tooltip, setTooltip] = useState(false);

  let nftIds = [];
  let nftLandIds = [];

  const devicewidth = window.innerWidth;

  const handleClearStatus = () => {
    const interval = setInterval(async () => {
      setStatus("");
      setloadingdeposit(false);
    }, 8000);
    return () => clearInterval(interval);
  };

  const checkApproval = async () => {
    const address = coinbase;
    const stakeApr50 = await window.config.wod_caws_address;
     let web3 = new Web3(window.ethereum);
   
    if (address !== null && address !== undefined && web3.utils.isAddress(address)) {
      const result = await window.nft
        .checkapproveStake(address, stakeApr50)
        .then((data) => {
          return data;
        });

      if (result === true && nftItem.length !== 0) {
        setshowCawsApprove(false);
        setStatus("");
        setColor("#939393");
      } else if (result === true && nftItem.length == 0) {
        setStatus("");
      } else if (result === false) {
        setStatus("");
        setshowCawsApprove(true);
      }
    }
  };

  const checkApprovalLand = async () => {
    const address = coinbase;
    const stake25 = await window.config.wod_caws_address;
    if (address !== null && address !== undefined) {
      const result = await window.landnft
        .checkapproveStake(address, stake25)
        .then((data) => {
          return data;
        });

      if (result === true && nftItem.length !== 0) {
        setshowLandApprove(false);
        setStatus("");
        setColor("#939393");
      } else if (result === true && nftItem.length === 0) {
        setStatus("");
      } else if (result === false) {
        setStatus("");
        setshowLandApprove(true);
      }
    }
  };

  const handleApprove = async () => {
    const stakeApr50 = await window.config.wod_caws_address;

    setloading(true);
    setStatus("*Waiting for approval");
    await window.nft
      .approveStake(stakeApr50)
      .then(() => {
        setloading(false);
        setColor("#52A8A4");
        setStatus("*Caws approved successfully");
        setTimeout(() => {
          checkApproval();
        }, 3000);
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        setloading(false);
        setColor("#F13227");
        setStatus("*An error occurred. Please try again");
        handleClearStatus();
      });
  };

  const handleApproveWod = async () => {
    const caws_land_nft = await window.config.wod_caws_address;

    setloading(true);
    setStatus("*Waiting for approval");
    await window.landnft
      .approveStake(caws_land_nft)
      .then(() => {
        setloading(false);
        setColor("#52A8A4");
        setStatus("*WOD approved successfully");
        setTimeout(() => {
          checkApprovalLand();
        }, 3000);
      })
      .catch((err) => {
        setloading(false);
        setColor("#F13227");
        window.alertify.error(err?.message);
        setStatus("*An error occurred. Please try again");
        handleClearStatus();
      });
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
  };

  const handleSelectAllLand = () => {
    setCheckLandBtn(!checkLandbtn);
    if (checkLandbtn === false) {
      if (nftLandIds.length > 50) {
        setSelectedNftLandIds(nftLandIds.slice(0, 50));
      } else if (nftLandIds.length <= 50) {
        setSelectedNftLandIds(nftLandIds);
      }
    } else if (checkLandbtn === true) {
      setSelectedNftIds([]);
      setSelectedNftLandIds([]);
    }
  };

  const handleDeposit = async (value) => {
    setloadingdeposit(true);
    setStatus("*Processing deposit");
    setColor("#57AEAA");
    // console.log(getApprovedNfts(selectNftIds), getApprovedLandNfts(selectNftLandIds))
    await window.wod_caws
      .depositWodCaws(
        getApprovedNfts(selectNftIds),
        getApprovedLandNfts(selectNftLandIds)
      )
      .then(() => {
        setloadingdeposit(false);
        setStatus("*Sucessfully deposited");
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
        onDepositComplete();
        setColor("#57AEAA");
        handleClearStatus();
      })
      .catch((err) => {
        console.log(err);
        window.alertify.error(err?.message);
        setloadingdeposit(false);
        setColor("#F13227");
        setStatus("*An error occurred. Please try again");
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
        handleClearStatus();
        onDepositComplete();
      });
  };

  const onEmptyState = () => {};

  useEffect(() => {
    if (selectNftIds.length > 50 && checkbtn === false) {
      window.alertify.error("Limit to Stake/Unstake NFT is 50 NFT's per round");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        return () => clearInterval(interval);
      }, 500);
    } else if (selectNftIds.length > 50 && checkbtn === true) {
      window.alertify.error("Limit to Stake/Unstake NFT is 50 NFT's per round");
      const interval = setInterval(async () => {
        setCheckBtn(false);
        setSelectedNftIds([]);
        setSelectedNftLandIds([]);
        return () => clearInterval(interval);
      }, 500);
    }
  }, [selectNftIds.length, val, checkbtn]);

  useEffect(() => {
    checkApproval().then();
    checkApprovalLand().then();
  }, [coinbase, nftItem.length]);

  useEffect(() => {
    if (
      getApprovedLandNfts(selectNftLandIds).length > 0 &&
      getApprovedNfts(selectNftIds).length > 0
    ) {
      if (
        getApprovedLandNfts(selectNftLandIds).length !==
        getApprovedNfts(selectNftIds).length
      ) {
        setStatus("You must select the same amount of NFTs!");
        setColor("#F13227");
      }
      if (
        getApprovedLandNfts(selectNftLandIds).length ===
        getApprovedNfts(selectNftIds).length
      ) {
        setStatus("");
      }
    }
  }, [
    getApprovedNfts(selectNftIds).length,
    getApprovedLandNfts(selectNftLandIds).length,
    selectNftLandIds.length,
    selectNftIds.length,
    checknft,
  ]);

  return (
    <div className="stake-modal p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="stake-modal-title">Stakeable NFTs</h6>
        <img
          src={'https://cdn.worldofdypians.com/wod/popupXmark.svg'}
          style={{ cursor: "pointer" }}
          onClick={onModalClose}
          alt=""
        />
      </div>
      <span className="stake-modal-desc text-wrap">
        A list of your NFT collection that can be added and removed from the
        staking pools
      </span>

      <span className="d-flex my-3 market-stake-divider"></span>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center ">
          <button
            onClick={() => {
              handleSelectAllLand();
            }}
            className="select-all-btn d-flex align-items-center"
            style={{
              pointerEvents: nftItem.length !== 0 ? "auto" : "none",
              opacity: nftItem.length !== 0 ? "1" : "0.4",
              color: checkLandbtn === true ? "#4ED5D2" : "#fff",
            }}
          >
            <Checkbox
              sx={{
                color: "#8E97CD",
                "&.Mui-checked": {
                  color: "#82DAAB",
                },
              }}
              checked={checkLandbtn}
            />

            {checkLandbtn ? "Unselect all Land NFTs" : "Select all Land NFTs"}
          </button>
        </div>

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
        <span className="vertical-stake-divider d-none d-lg-flex"></span>
        <div className="col-6 col-lg-6">
          <div className="nft-modal-grid">
            {landItems.length === 0 ? (
              [...Array(devicewidth < 500 ? 2 : 2)].map((item, id) => {
                return <EmptyWodCard key={id} />;
              })
            ) : landItems.length === 1 ? (
              <>
                {landItems.map((item, id) => {
                  let nftId = item.name?.slice(1, landItems.name?.length);

                  nftLandIds.push(nftId);

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
                          checkLandbtn === true ||
                          (getApprovedLandNfts(selectNftLandIds).includes(
                            item.name?.slice(1, landItems.name?.length)
                          ) &&
                            getApprovedLandNfts(selectNftLandIds).length <= 50)
                        }
                        checked2={
                          getApprovedLandNfts(selectNftLandIds).length <= 50
                            ? true
                            : false
                        }
                        checklistItemID={nftId}
                        onChange={(value) => {
                          selectNftLandIds.indexOf(value) === -1
                            ? selectNftLandIds.push(value)
                            : selectNftLandIds.splice(
                                selectNftLandIds.indexOf(value),
                                1
                              );
                          setchecknft(!checknft);
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
                      ? 2
                      : Math.abs(2 - parseInt(landItems.length))
                  ),
                ].map((item, id) => {
                  return <EmptyWodCard key={id} />;
                })}
              </>
            ) : (
              <>
                {landItems.map((item, id) => {
                  let nftId = item.name?.slice(1, landItems.name?.length);
                  nftLandIds.push(nftId);

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
                          checkLandbtn === true ||
                          (getApprovedLandNfts(selectNftLandIds).includes(
                            item.name?.slice(1, landItems.name?.length)
                          ) &&
                            getApprovedLandNfts(selectNftLandIds).length <= 50)
                        }
                        checked2={
                          getApprovedLandNfts(selectNftLandIds).length <= 50
                            ? true
                            : false
                        }
                        checklistItemID={nftId}
                        onChange={(value) => {
                          selectNftLandIds.indexOf(value) === -1
                            ? selectNftLandIds.push(value)
                            : selectNftLandIds.splice(
                                selectNftLandIds.indexOf(value),
                                1
                              );
                          setchecknft(!checknft);
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
        <div className="col-6 col-lg-6">
          <div className="nft-modal-grid">
            {cawsItems.length === 0 ? (
              [...Array(devicewidth < 500 ? 2 : 2)].map((item, id) => {
                return <EmptyCawsCard key={id} />;
              })
            ) : cawsItems.length === 1 ? (
              <>
                {cawsItems.map((item, id) => {
                  let nftId = item.name?.slice(6, cawsItems.name?.length);

                  nftIds.push(nftId);

                  return (
                    <>
                      <NftStakingCawChecklist
                        key={id}
                        nft={item}
                        width={"auto"}
                        height={"auto"}
                        modalId="#newNftchecklist"
                        isStake={false}
                        checked={
                          checkbtn === true ||
                          (getApprovedNfts(selectNftIds).includes(
                            item.name?.slice(6, cawsItems.name?.length)
                          ) &&
                            getApprovedNfts(selectNftIds).length <= 50)
                        }
                        checked2={
                          getApprovedNfts(selectNftIds).length <= 50
                            ? true
                            : false
                        }
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
                      : Math.abs(2 - parseInt(cawsItems.length))
                  ),
                ].map((item, id) => {
                  return <EmptyCawsCard key={id} />;
                })}
              </>
            ) : (
              <>
                {cawsItems.map((item, id) => {
                  let nftId = item.name?.slice(6, cawsItems.name?.length);
                  nftIds.push(nftId);

                  return (
                    <>
                      <NftStakingCawChecklist
                        key={id}
                        nft={item}
                        width={"auto"}
                        height={"auto"}
                        modalId="#newNftchecklist"
                        isStake={false}
                        checked={
                          checkbtn === true ||
                          (getApprovedNfts(selectNftIds).includes(
                            item.name?.slice(6, cawsItems.name?.length)
                          ) &&
                            getApprovedNfts(selectNftIds).length <= 50)
                        }
                        checked2={
                          getApprovedNfts(selectNftIds).length <= 50
                            ? true
                            : false
                        }
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
        <span className="info-span-text text-wrap">
          Please choose the NFTs that you wish to stake. Once you have made your
          selection, you will be required to approve the process before
          depositing the NFTs.
        </span>
      </div>
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
                src={'https://cdn.worldofdypians.com/wod/tooltip.svg'}
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
                You can select a maximum of 50 WOD Land and CAWS NFTs
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-1">
              <img src={wodTag} alt="" />
              <span className="selected-nfts-amount">
                {getApprovedLandNfts(selectNftLandIds).length} WOD Land
              </span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img src={cawsTag} alt="" />
              <span className="selected-nfts-amount">
                {getApprovedNfts(selectNftIds).length} CAWS
              </span>
            </div>
          </div>
        </div>
        {/* <button className="btn disabled-approve-btn px-4">Approve</button> */}
        <div className="d-flex flex-column gap-2">
          <div className="mt-4 row mx-0 justify-content-xxl-between justify-content-lg-between justify-content-md-between justify-content-sm-between justify-content-center gap-3">
            {showCawsApprove === true &&
              showLandApprove === true &&
              isConnected && (
                <button
                  className={`btn m-auto ${
                    showCawsApprove === true &&
                    showLandApprove === true &&
                    getApprovedNfts(selectNftIds).length > 0 &&
                    getApprovedLandNfts(selectNftLandIds).length > 0 &&
                    getApprovedNfts(selectNftIds).length ===
                      getApprovedLandNfts(selectNftLandIds).length &&
                    getApprovedNfts(selectNftIds).length < 51 &&
                    getApprovedLandNfts(selectNftLandIds).length < 51
                      ? "pill-btn"
                      : "disabled-approve-btn"
                  }`}
                  style={{
                    pointerEvents:
                      showCawsApprove === true &&
                      showLandApprove === true &&
                      getApprovedNfts(selectNftIds).length > 0 &&
                      getApprovedLandNfts(selectNftLandIds).length > 0 &&
                      getApprovedNfts(selectNftIds).length ===
                        getApprovedLandNfts(selectNftLandIds).length &&
                      getApprovedNfts(selectNftIds).length < 51 &&
                      getApprovedLandNfts(selectNftLandIds).length < 51
                        ? "auto"
                        : "none",
                  }}
                  onClick={() => {
                    handleApproveWod();
                  }}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border " role="status"></div>
                    </>
                  ) : (
                    "Approve Land"
                  )}
                </button>
              )}
            {showCawsApprove === true &&
              showLandApprove === false &&
              isConnected && (
                <button
                  className={`btn m-auto ${
                    showCawsApprove === true &&
                    showLandApprove === false &&
                    getApprovedNfts(selectNftIds).length > 0 &&
                    getApprovedLandNfts(selectNftLandIds).length > 0 &&
                    getApprovedNfts(selectNftIds).length ===
                      getApprovedLandNfts(selectNftLandIds).length &&
                    getApprovedNfts(selectNftIds).length < 51 &&
                    getApprovedLandNfts(selectNftLandIds).length < 51
                      ? "pill-btn"
                      : "disabled-approve-btn"
                  }`}
                  style={{
                    pointerEvents:
                      showCawsApprove === true &&
                      showLandApprove === false &&
                      getApprovedNfts(selectNftIds).length > 0 &&
                      getApprovedLandNfts(selectNftLandIds).length > 0 &&
                      getApprovedNfts(selectNftIds).length ===
                        getApprovedLandNfts(selectNftLandIds).length &&
                      getApprovedNfts(selectNftIds).length < 51 &&
                      getApprovedLandNfts(selectNftLandIds).length < 51
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
                    "Approve CAWS"
                  )}
                </button>
              )}
            {!isConnected && (
              <button className={`btn m-auto pill-btn`} onClick={handleConnect}>
                Connect Wallet
              </button>
            )}
            <button
              className={`btn m-auto ${
                showCawsApprove === false &&
                showLandApprove === false &&
                getApprovedNfts(selectNftIds).length > 0 &&
                getApprovedLandNfts(selectNftLandIds).length > 0 &&
                getApprovedNfts(selectNftIds).length ===
                  getApprovedLandNfts(selectNftLandIds).length &&
                getApprovedNfts(selectNftIds).length < 51 &&
                getApprovedLandNfts(selectNftLandIds).length < 51
                  ? "pill-btn"
                  : "disabled-approve-btn"
              }`}
              style={{
                display:
                  showLandApprove === false && showCawsApprove === false
                    ? ""
                    : "none",
                pointerEvents:
                  showCawsApprove === false &&
                  showLandApprove === false &&
                  getApprovedNfts(selectNftIds).length ===
                    getApprovedLandNfts(selectNftLandIds).length &&
                  getApprovedNfts(selectNftIds).length > 0 &&
                  getApprovedLandNfts(selectNftLandIds).length > 0
                    ? "auto"
                    : "none",
              }}
              onClick={() =>
                (checkbtn === true &&
                  (getApprovedNfts(selectNftIds).length === 0 ||
                    getApprovedLandNfts(selectNftLandIds).length === 0)) ||
                (checkbtn === false &&
                  (getApprovedNfts(selectNftIds).length === 0 ||
                    getApprovedLandNfts(selectNftLandIds).length === 0)) ||
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

export default StakeModal;
