import React, { useState, useEffect } from "react";
import xmark from "./assets/xmark.svg";
import EmptyWodCard from "../../components/StakeModal/EmptyWodCard";
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
}) => {
  const [showCaws, setshowCaws] = useState(false);
  const [showLands, setshowLands] = useState(true);
  const [checkbtn, setCheckBtn] = useState(false);
  const [checkUnstakebtn, setCheckUnstakeBtn] = useState(false);

  const [checknft, setchecknft] = useState(false);
  const [val, setVal] = useState("");
  const [color, setColor] = useState("#F13227");
  const [selectNftIds, setSelectedNftIds] = useState([]);

  let nftIds = [];

  const devicewidth = window.innerWidth;
  return (
    <div className="stake-modal p-3">
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
              [...Array(devicewidth < 500 ? 1 : 8)].map((item, id) => {
                return <EmptyWodCard key={id} />;
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
                          ((isStake === false && checkbtn === true) ||
                            (isStake === true && checkUnstakebtn === true)) &&
                          selectNftIds.length <= 50
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
                          getApprovedLandPoolsNfts(selectNftIds);

                          setVal(value);
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
                  return <EmptyWodCard key={id} />;
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
                          ((isStake === true && checkbtn === true) ||
                            (isStake === false && checkUnstakebtn === true)) &&
                          selectNftIds.length <= 50
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
                          getApprovedLandPoolsNfts(selectNftIds);

                          setVal(value);
                        }}
                        nftType={showCaws ? "caws" : "land"}
                      />
                    </>
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
            handleConfirmTransfer(selectNftIds[0]);
          }}
        >
          Select NFT
        </button>
      </div>
    </div>
  );
};

export default NftPopup;
