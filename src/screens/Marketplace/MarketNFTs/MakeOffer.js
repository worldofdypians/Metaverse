import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeX from "./assets/closeX.svg";
import errorImg from "./assets/error.svg";
import successImg from "./assets/success.svg";
import "./_filters.scss";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import OutsideClickHandler from "react-outside-click-handler";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import dropdownIcon from "./assets/dropdownIcon.svg";
import whiteTag from "./assets/whiteTag.svg";
import { objectOf } from "prop-types";

const MakeOffer = ({
  open,
  onclose,
  isCaws,
  isWod,
  isTimepiece,
  nft,
  ethTokenData,
  dypTokenData,
  handleMakeOffer,
  handleUpdateOffer,
  handleDeleteOffer,

  coinbase,
  status,
  nftAddr, nftId
}) => {
  const windowSize = useWindowSize();
  const [filter1, setFilter1] = useState("weth");
  const [price, setprice] = useState(0);
  const [offerData, setofferData] = useState([]);

  const getOffer = async () => {
    let finalArray = [];
    const result = await window
      .getAllOffers(nftAddr, nftId)
      .catch((e) => {
        console.error(e);
      });

    finalArray = result.filter((object) => {
        console.log(object)
      return object.offer.buyer.toLowerCase() === coinbase.toLowerCase();
    });
    console.log(finalArray);

    // finalArray.push({ offer: result[0].offer, index: result[0].index });
    setofferData(finalArray);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      windowSize.width > 1400 ? "30%" : windowSize.width > 786 ? "50%" : "90%",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    overflowX: "hidden",
    borderRadius: "10px",
    background: "#1A1C39",
  };

  useEffect(() => {
    if (coinbase) {
      getOffer();
    }
  }, [coinbase]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between gap-1  position-relative">
            <h6 className="text-white summarytitle">Make an offer</h6>
            <img
              src={closeX}
              alt=""
              className="close-x"
              onClick={() => {
                onclose();
              }}
              style={{ bottom: "17px", right: "-22px", width: "auto" }}
            />
          </div>
          <div className="summarywrapper">
            <div className="d-flex flex-column flex-column flex-xxl-row flex-lg-row align-items-center justify-content-between">
              <div className="d-flex flex-column w-100 flex-xxl-row flex-lg-row align-items-center gap-2">
                <img
                  className="p-0 nft-img"
                  src={
                    isCaws
                      ? `https://mint.dyp.finance/thumbs150/${nftId}.png`
                      : isWod
                      ? `https://mint.worldofdypians.com/thumbs150/${nftId}.png`
                      : `https://timepiece.worldofdypians.com/thumbs150/${nftId}.png`
                  }
                  alt=""
                  style={{
                    width: windowSize.width > 500 ? 80 : "100%",
                    height: windowSize.width > 500 ? 80 : "150",
                    borderRadius: 20,
                  }}
                />
                <div className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column align-items-center">
                    <span className="itemname">
                      {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
                      {nftId}
                    </span>
                    {/* <span className="itemcollectionName">
                   {nft.name}
                  </span> */}
                  </div>
                  <span className="itemchain">Chain: Ethereum</span>
                </div>
              </div>
              {nft.price &&
              <div className="d-flex flex-row flex-lg-column flex-xxl-column gap-2 gap-lg-0 gap-xxl-0 align-items-center">
                <span className="itemname" style={{ whiteSpace: "nowrap" }}>
                  {getFormattedNumber(nft.price / 1e18, 2)}{" "}
                  {nft.payment_priceType === 0 ? "ETH" : "DYP"}
                </span>
                <span className="itemcollectionName">
                  $
                  {getFormattedNumber(
                    nft.payment_priceType === 0
                      ? ethTokenData * (nft.price / 1e18)
                      : dypTokenData * (nft.price / 1e18),
                    nft.payment_priceType === 0 ? 3 : 0
                  )}
                </span>
              </div> }
            </div>
          </div>
          <div className="summarywrapper">
            <div className="d-flex flex-column align-items-center justify-content-between">
              <div className="d-flex w-100 align-items-center gap-3 justify-content-between">
                <span className="itemchain">Balance</span>
                <span className="itemchain">0.78 WETH</span>
              </div>
              <div className="d-flex w-100 align-items-center gap-3 justify-content-between">
                <span className="itemchain">Floor price</span>
                <span className="itemchain">0.78 WETH</span>
              </div>
              <div className="d-flex  w-100 align-items-center gap-3 justify-content-between">
                <span className="itemchain">Best offer</span>
                <span className="itemchain">0.78 WETH</span>
              </div>
            </div>
          </div>
          <div className="summaryseparator"></div>
          {offerData.length > 0 && (
            <div className="summaryred">
              <div className="d-flex align-items-center gap-2 justify-content-between w-100">
                <span className="itemchain">
                  <img src={whiteTag} alt="" /> My offer
                </span>
                <div className="d-flex flex-row flex-lg-column flex-xxl-column gap-2 gap-lg-0 gap-xxl-0 align-items-center">
                  <span className="itemname" style={{ whiteSpace: "nowrap" }}>
                    {getFormattedNumber(offerData[0].offer[0], 2)}{" "}
                    {offerData[0].offer.payment.priceType === "0"
                      ? "ETH"
                      : "DYP"}
                  </span>
                  <span className="itemcollectionName">
                    $
                    {getFormattedNumber(
                      offerData[0].offer.payment.priceType === "0"
                        ? ethTokenData * offerData[0].offer[0]
                        : dypTokenData * offerData[0].offer[0],
                      offerData[0].offer.payment.priceType === "0" ? 3 : 0
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex align-items-center gap-3 justify-content-between">
            <input
              type="number"
              min={0}
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="Price"
              className="px-3 py-2 offerInput"
              value={price}
              onChange={(e) => {
                setprice(e.target.value === "" ? "" : Number(e.target.value));
              }}
            />
            <div class="dropdown" style={{ width: "150px" }}>
              <button
                class="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center gap-2">
                  <h6
                    className="filter-nav-title mb-0"
                    style={{ textTransform: "uppercase" }}
                  >
                    {filter1}
                  </h6>
                </div>
                <img src={dropdownIcon} alt="" />
              </button>
              <ul class="dropdown-menu nft-dropdown-menu  p-2 w-100">
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilter1("weth");
                  }}
                >
                  <span>WETH</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilter1("dyp");
                  }}
                >
                  <span>DYP</span>
                </li>
              </ul>
            </div>
          </div>
          {offerData.length === 0 ?
          <button
            className={`btn ${
              status === "fail" ? "errorbtn" : "mint-now-btn"
            } gap-2 align-self-end mt-4`}
            style={{ width: "fit-content" }}
            onClick={() => {
              handleMakeOffer(price, filter1 === "weth" ? 0 : 1);
            }}
          >
            {status !== "fail " && <img src={whiteTag} alt="" />}
            {status === "initial" ? (
              "Make offer"
            ) : status === "loading" ? (
              <>
                Making offer{" "}
                <div
                  className="spinner-border mx-1"
                  role="status"
                  style={{ width: 16, height: 16 }}
                ></div>
              </>
            ) : status === "success" ? (
              "Success"
            ) : (
              "Failed"
            )}
          </button> : <div className="d-flex align-items-center gap-2 justify-content-between w-100">

          <button
            className={`btn ${
              status === "fail" ? "errorbtn" : "mint-now-btn"
            } gap-2 align-self-end mt-4`}
            style={{ width: "fit-content" }}
            onClick={() => {
              handleDeleteOffer(offerData.index);
            }}
          >
           {status === "initial" ? (
              "Delete offer"
            ) : status === "loadingdelete" ? (
              <>
                Deleting offer{" "}
                <div
                  className="spinner-border mx-1"
                  role="status"
                  style={{ width: 16, height: 16 }}
                ></div>
              </>
            ) : status === "successdelete" ? (
              "Success"
            ) : (
              "Failed"
            )}
          </button>

          <button
            className={`btn ${
              status === "fail" ? "errorbtn" : "pill-btn"
            } gap-2 align-self-end mt-4`}
            style={{ width: "fit-content" }}
            onClick={() => {
              handleUpdateOffer(price, filter1 === "weth" ? 0 : 1, offerData.index);
            }}
          >
           {status === "initial" ? (
              "Update"
            ) : status === "loadingupdate" ? (
              <>
                Updating offer{" "}
                <div
                  className="spinner-border mx-1"
                  role="status"
                  style={{ width: 16, height: 16 }}
                ></div>
              </>
            ) : status === "successupdate" ? (
              "Success"
            ) : (
              "Failed"
            )}
          </button>
          </div> }
        </div>
      </Box>
    </Modal>
  );
};

export default MakeOffer;
