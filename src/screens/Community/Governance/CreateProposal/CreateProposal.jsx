import React, { useState } from "react";
import "./_createproposal.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useWindowSize from "../../../../hooks/useWindowSize";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";

import { switchNetworkWagmi } from "../../../../utils/wagmiSwitchChain";

const CreateProposal = ({
  open,
  onClose,
  minWodBalanceForProposal,
  onSubmitProposal,
  isConnected,
  chainId,
  coinbase,
  handleSwitchNetwork,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  govStatus,
  govLoading,
  handleConnection,
  network_matchain,
}) => {
  const windowSize = useWindowSize();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowSize.width
      ? windowSize.width > 1400
        ? "auto"
        : windowSize.width > 786
        ? "50%"
        : "95%"
      : "auto",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    overflowX: "hidden",
    borderRadius: "10px",
    height: windowSize.width < 500 ? "480px" : "auto",
    background: `#0E0F35`,
  };

  const [selectedCategory, setSelectedCategory] = useState("aor");
  // const [subject, setSubject] = useState("");
  const [proposalDesc, setproposalDesc] = useState("");

  const switchNetwork = async (hexChainId, chain) => {
    // Extract chainId from hex or use chain number directly
    const chainId = typeof chain === 'number' ? chain : parseInt(hexChainId, 16);
    
    try {
      await switchNetworkWagmi(chainId, chain, {
        handleSwitchNetwork,
        handleSwitchChainGateWallet,
        handleSwitchChainBinanceWallet,
        network_matchain,
        coinbase,
      });
    } catch (error) {
      // Error handling is done in switchNetworkWagmi
      console.error("Network switch error:", error);
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="position-relative d-flex flex-column gap-3">
          <div className="d-flex align-items-center gap-3 justify-content-between position-relative">
            <span className="create-proposal-title">CREATE PROPOSAL</span>{" "}
            <img
              src={"https://cdn.worldofdypians.com/wod/closeX.svg"}
              alt=""
              className="close-x position-relative cursor-pointer "
              onClick={() => {
                onClose();
              }}
              style={{
                bottom: "0",
                alignSelf: "center",
                width: 16,
                height: 16,
              }}
            />
          </div>

          {/* <div className="d-flex flex-column gap-2">
            <div className="dropdown position relative">
              <button
                className={`btn w-100 launchpad-dropdown gap-2 d-flex justify-content-between align-items-center dropdown-toggle`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ color: "#fff" }}
                >
                  {subject === "" ? "Select Subject" : subject}
                </div>
                <img
                  src={
                    "https://cdn.worldofdypians.com/wod/launchpadIndicator.svg"
                  }
                  alt=""
                />
              </button>
              <ul className="dropdown-menu w-100">
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={() => {
                    setSubject("New Game Events");
                  }}
                >
                  New Game Events
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={() => {
                    setSubject("Revamp Events");
                  }}
                >
                  Revamp Events
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={() => {
                    setSubject("New Bundles");
                  }}
                >
                  New Bundles
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={() => {
                    setSubject("Special Offer");
                  }}
                >
                  Special Offer
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={() => {
                    setSubject("Feature Request");
                  }}
                >
                  Feature Request
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={() => {
                    setSubject("General");
                  }}
                >
                  General
                </li>
              </ul>
            </div>
          </div> */}
          <div className="d-flex flex-column gap-2">
            <span className="proposal-subject-text">Description</span>
            <textarea
              className="proposal-textarea p-3"
              rows={8}
              placeholder="Enter the proposal content..."
              value={proposalDesc}
              onChange={(e) => {
                setproposalDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <span className="create-proposal-desc col-10">
            *Submitting a proposal requires a minimum of{" "}
            {getFormattedNumber(minWodBalanceForProposal)} WOD Governance Token
            Balance.
          </span>

          <div className="d-flex w-100 justify-content-center">
            {isConnected && coinbase && chainId === 56 && (
              <button
                className={` ${
                  proposalDesc === ""
                    ? "disabled-btn-gov"
                    : govStatus === "error"
                    ? "fail-button-gov"
                    : "action-btn"
                }  px-3 py-2`}
                style={{ width: "fit-content" }}
                onClick={() => {
                  onSubmitProposal(proposalDesc);
                }}
                disabled={proposalDesc === "" || govStatus === "error"}
              >
                {govLoading ? (
                  <div className="d-flex align-items-center gap-2">
                    Processing
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : govStatus === "initial" ? (
                  <>Submit</>
                ) : govStatus === "success" ? (
                  <>Success</>
                ) : (
                  <>
                    Failed{" "}
                    <img
                      src={"https://cdn.worldofdypians.com/wod/failMark.svg"}
                      alt=""
                    />
                  </>
                )}
              </button>
            )}
            {chainId !== 56 && isConnected && (
              <button
                className="fail-button-gov px-3 py-2"
                style={{ width: "fit-content" }}
                onClick={() => {
                  switchNetwork("0x38", 56);
                }}
              >
                Switch to BNB Chain
              </button>
            )}
            {!isConnected && (
              <button
                className="connectbtn-gov px-3 py-2"
                style={{ width: "fit-content" }}
                onClick={() => {
                  handleConnection();
                }}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateProposal;
