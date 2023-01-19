import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import X from "../../assets/x_close.png";
import "./_unstakeModal.scss";

const UnstakeAllModal = ({ open, onClose, onUnstake, onClaimAll }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "710px",
    boxShadow: 24,
    p: "3rem",
    overflow: "auto",
    height: "fit-content",
    borderRadius: "8px",
    overflowX: "hidden",
  };

  const devicewidth = window.innerWidth;

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex flex-column gap-4 align-items-center justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="unstaketitle">
              Are you sure you want to Unstake all your current selected NFTs?
            </h1>
            <img
              src={X}
              alt=""
              className="close-x"
              onClick={() => {
                onClose();
              }}
            />
          </div>
          <p className="m-0 unstakedesc">
            By Unstaking your NFT you will still be able to recieve your current
            amout of ETH rewards that will be added to your wallet.
          </p>
          <div className="d-flex flex-column flex-xl-row flex-lg-row flex-md-row gap-4">
            <div className={"linear-border w-100"}>
              <button
                className={`btn filled-btn
                          
                       px-5 w-100`}
                onClick={() => {
                  onClose();
                }}
              >
                Continue
              </button>
            </div>

            <div className={"linear-border w-100"}>
              <button
                className={`btn outline-btn
                          
                       px-5 w-100`}
                onClick={() => {
                  onClose();
                }}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
UnstakeAllModal.propTypes = {
  nftItem: PropTypes.array,
  open: PropTypes.bool,
  onShareClick: PropTypes.func,
  onClose: PropTypes.func,
  onshowToStake: PropTypes.func,
  onshowStaked: PropTypes.func,
  onClaimAll: PropTypes.func,
  onUnstake: PropTypes.func,
  ETHrewards: PropTypes.number,
  onNftCheckListClick: PropTypes.func,
};

export default UnstakeAllModal;
