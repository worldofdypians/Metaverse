import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeX from "./assets/closeX.svg";
import "./_filters.scss";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import { Checkbox } from "@mui/material";

const SyncModal = ({ open, onclose, onConfirm, onCancel, syncStatus }) => {
  const windowSize = useWindowSize();

  const [approvestatus, setapprovestatus] = useState("initial");
  const [checkbtn, setCheckBtn] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      windowSize.width > 1400 ? "21%" : windowSize.width > 786 ? "50%" : "94%",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    overflowX: "hidden",
    borderRadius: "10px",
    background: "#1A1C39",
    height: "auto",
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between gap-1  position-relative">
            <h6 className="text-white summarytitle"></h6>
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
          <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
            <h6 className="text-white summarytitle2">
              Are you sure you want to update your game wallet address?
            </h6>
            <div className="d-flex align-items-center gap-2 justify-content-between w-100">
              <button
                onClick={() => {
                  setCheckBtn(!checkbtn);
                }}
                className="select-all-btn d-flex align-items-center syncText"
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
                I confirm to update my game wallet address.
              </button>
            </div>
            <button
              onClick={onConfirm}
              className="btn pill-btn"
              disabled={!checkbtn}
            >
              {syncStatus === "initial"
                ? "Update"
                : syncStatus === "loading"
                ? "Updating..."
                : syncStatus === "success"
                ? "Success"
                : "Error"}
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SyncModal;
