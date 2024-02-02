import React, { useState, useEffect } from "react";
import xmark from "./assets/xmark.svg";
import EmptyWodCard from "../../components/StakeModal/EmptyWodCard";
import EmptyCawsCard from "../../components/StakeModal/EmptyCawsCard";
import NftChecklist from "./NftChecklist";

const NftPopup = ({
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
  onTabSelect,
  handleConfirmTransfer,
  itemSelected,
  previousNftType,
}) => {
  const [showCaws, setshowCaws] = useState(false);
  const [showLands, setshowLands] = useState(true);
  const [selectNftIds, setSelectedNftIds] = useState([]);
  const [finalNftType, setfinalNftType] = useState("");

  let nftIds = [];
  let nftIds2 = [];

  const devicewidth = window.innerWidth;

  const handleManageNFTArray = (nftId) => {
    if (selectNftIds.length === 0) {
      setSelectedNftIds([nftId]);
      if (showCaws) {
        setfinalNftType("caws");
      } else if (showLands) {
        setfinalNftType("land");
      }
    } else if (selectNftIds.length > 0 && selectNftIds[0] !== nftId) {
      selectNftIds.pop();
      setSelectedNftIds([nftId]);
      if (showCaws) {
        setfinalNftType("caws");
      } else if (showLands) {
        setfinalNftType("land");
      }
    }
  };

  useEffect(() => {
    if (itemSelected !== 0) {
      setSelectedNftIds([itemSelected]);
    }
  }, [itemSelected]);

  useEffect(() => {
    onTabSelect("land");
  }, []);

  useEffect(() => {
    setfinalNftType(previousNftType);
  }, []);

  return (
    <div className="stake-modal2 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="stake-modal-title">Select NFT</h6>
        <img
          src={xmark}
          style={{ cursor: "pointer" }}
          onClick={onModalClose}
          alt=""
        />
      </div>
      <span className="stake-modal-desc">
        Select the NFT you wish to bridge, whether from CAWS or WoD Genesis Land
        NFTs.
      </span>

      <span className="d-flex my-3 market-stake-divider"></span>
      <div className="d-flex align-items-center justify-content-center">
        <div className="d-flex gap-2 justify-content-center ">
          <button
            onClick={() => {
              setshowCaws(false);
              setshowLands(true);
              onTabSelect("land");
            }}
            className={` ${
              showLands && "select-all-btn-new-active"
            } select-all-btn-new d-flex align-items-center`}
          >
            Genesis Land
          </button>

          <button
            onClick={() => {
              setshowCaws(true);
              setshowLands(false);
              onTabSelect("caws");
            }}
            className={` ${
              showCaws && "select-all-btn-new-active"
            } select-all-btn-new d-flex align-items-center`}
          >
            CAWS
          </button>
        </div>
      </div>
      <div className="row modal-scroll h-auto position-relative mt-3">
        <div className="col-12">
          <div className="nft-modal-grid2">
            {nftItem.length === 0 ? (
              [...Array(devicewidth < 500 ? 2 : 8)].map((item, id) => {
                return showLands ? (
                  <EmptyWodCard key={id} />
                ) : (
                  <EmptyCawsCard key={id} />
                );
              })
            ) : nftItem.length === 1 ? (
              <>
                {nftItem.map((item, id) => {
                  let nftId = showLands
                    ? item.name?.slice(1, nftItem.name?.length)
                    : item.name?.slice(6, item.name?.length);
                  nftIds.push(nftId);

                  return (
                    <>
                      <NftChecklist
                        key={id}
                        nft={item}
                        width={"auto"}
                        height={"auto"}
                        modalId="#newNftchecklist"
                        checked={
                          selectNftIds[0] === nftId ||
                          selectNftIds[0] === itemSelected
                        }
                        checklistItemID={nftId}
                        checkedItem={
                          selectNftIds.length > 0 ? selectNftIds[0] : "-1"
                        }
                        onChange={(value) => {
                          handleManageNFTArray(value);

                          // selectNftIds.indexOf(value) === -1
                          //   ? selectNftIds.push(value)
                          //   : selectNftIds.splice(
                          //       selectNftIds.indexOf(value),
                          //       1
                          //     );
                          // showCaws
                          //   ? setchecknft(!checknft)
                          //   : setCheckUnstakeBtn(!checkUnstakebtn);
                          // setSelectedNftIds(selectNftIds);
                          // getApprovedLandPoolsNfts(selectNftIds);
                          // setVal(value);
                        }}
                        coinbase={coinbase}
                        isConnected={isConnected}
                        nftType={showCaws ? "caws" : "land"}
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
                  return showLands ? (
                    <EmptyWodCard key={id} />
                  ) : (
                    <EmptyCawsCard key={id} />
                  );
                })}
              </>
            ) : (
              <>
                {nftItem.map((item, id) => {
                  let nftId = showLands
                    ? item.name?.slice(1, nftItem.name?.length)
                    : item.name?.slice(6, item.name?.length);
                  nftIds.push(nftId);

                  return (
                    <>
                      <NftChecklist
                        key={id}
                        nft={item}
                        width={"auto"}
                        height={"auto"}
                        modalId="#newNftchecklist"
                        checked={
                          selectNftIds[0] === nftId ||
                          selectNftIds[0] === itemSelected
                        }
                        checklistItemID={nftId}
                        checkedItem={
                          selectNftIds.length > 0 ? selectNftIds[0] : "-1"
                        }
                        onChange={(value) => {
                          handleManageNFTArray(value);
                          // selectNftIds.indexOf(value) === -1
                          //   ? selectNftIds.push(value)
                          //   : selectNftIds.splice(
                          //       selectNftIds.indexOf(value),
                          //       1
                          //     );
                          // showCaws
                          //   ? setchecknft(!checknft)
                          //   : setCheckUnstakeBtn(!checkUnstakebtn);
                          // setSelectedNftIds(selectNftIds);
                          // getApprovedLandPoolsNfts(selectNftIds);
                          // setVal(value);
                        }}
                        nftType={showCaws ? "caws" : "land"}
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
                  return showLands ? (
                    <EmptyWodCard key={id} />
                  ) : (
                    <EmptyCawsCard key={id} />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <span className="d-flex my-3 market-stake-divider"></span>
      <div className="d-flex justify-content-center">
        <button
          className={`btn ${
            selectNftIds.length > 0 ? "pill-btn" : "inactive-pill-btn"
          } px-4 py-2`}
          disabled={selectNftIds.length === 0}
          onClick={() => {
            handleConfirmTransfer(selectNftIds[0], finalNftType);
          }}
        >
          Select NFT
        </button>
      </div>
    </div>
  );
};

export default NftPopup;
