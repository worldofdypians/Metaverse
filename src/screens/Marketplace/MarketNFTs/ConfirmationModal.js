import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeX from "./assets/closeX.svg";
import errorImg from "./assets/error.svg";
import successImg from "./assets/success.svg";
import "./_filters.scss";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import OutsideClickHandler from "react-outside-click-handler";
import useWindowSize from "../../../hooks/useWindowSize";

const ConfirmationModal = ({
  open,
  onclose,
  isCaws,
  isWod,
  isTimepiece,
  state,
  nft,
  ethTokenData,
  dypTokenData,
}) => {

  const windowSize = useWindowSize();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowSize.width > 1400 ? "30%" : windowSize.width > 786 ? "50%" : "90%",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    overflowX: "hidden",
    borderRadius: "10px",
    background: "#1A1C39",
  };

  return (
    <OutsideClickHandler onOutsideClick={onclose}>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {state === "approve" ? (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between gap-1  position-relative">
                <h6 className="text-white summarytitle">Approve purchase</h6>
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
                          ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                          : isWod
                          ? `https://mint.worldofdypians.com/thumbs150/${nft.tokenId}.png`
                          : `https://timepiece.worldofdypians.com/thumbs150/${nft.tokenId}.png`
                      }
                      alt=""
                      style={{ width: windowSize.width > 500 ? 80 : '100%', height: windowSize.width > 500 ? 80 : '150', borderRadius: 20 }}
                    />
                    <div className="d-flex flex-column justify-content-between">
                      <div className="d-flex flex-column align-items-center">
                        <span className="itemname">
                          {isCaws
                            ? "CAWS"
                            : isWod
                            ? "Genesis Land"
                            : "Timepiece"}{" "}
                          #{nft.tokenId}
                        </span>
                        {/* <span className="itemcollectionName">
                   {nft.name}
                  </span> */}
                      </div>
                      <span className="itemchain">Chain: Ethereum</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row flex-lg-column flex-xxl-column gap-2 gap-lg-0 gap-xxl-0 align-items-center">
                    <span className="itemname" style={{whiteSpace: 'nowrap'}}>
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
                  </div>
                </div>
              </div>
              <div className="summaryseparator"></div>
              <span className="gotowallet">
                Approving in progress{" "}
                <div
                  className="spinner-border mx-1"
                  role="status"
                  style={{ width: 16, height: 16 }}
                ></div>
              </span>
              <span className="footertext">
                You will be asked to approve this purchase from your wallet.
              </span>
            </div>
          ) : state === "buy" ? (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between gap-1  position-relative">
                <h6 className="text-white summarytitle">Buy purchase</h6>
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
                          ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                          : isWod
                          ? `https://mint.worldofdypians.com/thumbs150/${nft.tokenId}.png`
                          : `https://timepiece.worldofdypians.com/thumbs150/${nft.tokenId}.png`
                      }
                      alt=""
                      style={{ width: windowSize.width > 500 ? 80 : '100%', height: windowSize.width > 500 ? 80 : '150', borderRadius: 20 }}
                    />
                    <div className="d-flex flex-column align-items-center">
                      <div className="d-flex flex-column">
                        <span className="itemname">
                          {isCaws
                            ? "CAWS"
                            : isWod
                            ? "Genesis Land"
                            : "Timepiece"}{" "}
                          #{nft.tokenId}
                        </span>
                      </div>
                      <span className="itemchain">Chain: Ethereum</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row flex-lg-column flex-xxl-column gap-2 gap-lg-0 gap-xxl-0 align-items-center">
                    <span className="itemname" style={{whiteSpace: 'nowrap'}}>
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
                  </div>
                </div>
              </div>
              <div className="summaryseparator"></div>
              <span className="gotowallet">
                NFT purchasing in progress
                <div
                  className="spinner-border mx-1"
                  role="status"
                  style={{ width: 16, height: 16 }}
                ></div>
              </span>
              <span className="footertext">
                You will be asked to confirm buying this purchase from your
                wallet.
              </span>
            </div>
          ) : state === "success" || state === "successappr" ? (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-end gap-1 position-relative">
                <img
                  src={closeX}
                  alt=""
                  className="close-x"
                  onClick={() => {
                    onclose();
                  }}
                  style={{ bottom: "17px", right: "auto", width: "auto" }}
                />
              </div>
              <div className="summarywrapper successwrapper">
                <img src={successImg} alt="" />
              </div>
              <div className="summaryseparator"></div>
              <span className="footertext" style={{textAlign: 'center'}}>
                {state === "successappr"
                  ? "The NFT purchase approval was successful"
                  : "The NFT purchase was successful"}
              </span>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-end gap-1 position-relative">
                <img
                  src={closeX}
                  alt=""
                  className="close-x"
                  onClick={() => {
                    onclose();
                  }}
                  style={{ bottom: "17px", right: "auto", width: "auto" }}
                />
              </div>
              <div className="summarywrapper errorwrapper">
                <img src={errorImg} alt="" />
              </div>
              <div className="summaryseparator"></div>
              <span className="footertext" style={{ textAlign: "center" }}>
                An error occurred. Please try again.
              </span>
            </div>
          )}
        </Box>
      </Modal>
    </OutsideClickHandler>
  );
};

export default ConfirmationModal;
