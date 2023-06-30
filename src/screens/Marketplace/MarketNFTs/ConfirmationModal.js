import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeX from "./assets/closeX.svg";
import nftImage from "./assets/nftImage.png";
import "./_filters.scss";

const ComfirmationModal = ({ open, onclose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    overflowX: "hidden",
    borderRadius: "10px",
    background: "#1A1C39",
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between gap-1">
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
            <div className="d-flex align-items-center justify-content-between gap-5">
              <img src={nftImage} alt="" />
              <div className="d-flex flex-column justify-content-between gap-2">
                <div className="d-flex flex-column">
                  <span className="itemname">CAWS #256</span>
                  <span className="itemcollectionName">
                    Cats and Watches Society
                  </span>
                </div>
                <span className="itemchain">Chain: Ethereum</span>
              </div>
              <div className="d-flex flex-column">
                <span className="itemname">0.78 ETH</span>
                <span className="itemcollectionName">$956.62</span>
              </div>
            </div>
          </div>
          <div className="summaryseparator"></div>
          <span className="gotowallet">Go to your wallet</span>
          <span className="footertext">You will be asked to approve this purchase from your wallet.</span>

        </div>
      </Box>
    </Modal>
  );
};

export default ComfirmationModal;
