import React, { useState } from "react";
import "./_createproposal.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useWindowSize from "../../../../hooks/useWindowSize";
import closeX from "../../../Wod/Earn/assets/closeX.svg";

const CreateProposal = ({ open, onClose }) => {
  const windowSize = useWindowSize();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      windowSize.width > 1400 ? "auto" : windowSize.width > 786 ? "50%" : "95%",
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
  const [subject, setSubject] = useState("");

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
              src={closeX}
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

          <div className="d-flex flex-column gap-2">
            <span className="proposal-subject-text">Subject</span>
            <input
              type="text"
              className="proposal-popup-input w-100 px-3"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              placeholder="Enter the proposal topic..."
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="proposal-subject-text">Description</span>
            <textarea
              className="proposal-textarea p-3"
              rows={8}
              placeholder="Enter the proposal content..."
            ></textarea>
          </div>
          <span className="create-proposal-desc col-10">
            *Submitting a proposal requires a minimum of 1,000,000 WOD
            Governance Token Balance.
          </span>

          <div className="d-flex w-100 justify-content-center">
            <button
              className="action-btn px-3 py-2"
              style={{ width: "fit-content" }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateProposal;
