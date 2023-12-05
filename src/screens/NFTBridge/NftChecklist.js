import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const NftChecklist = ({
  modalId,
  nft,
  checklistItemID,
  width,
  nftType,
  onChange,
}) => {
  const [checkbtn, setCheckBtn] = useState(false);

  const handleCawClick = () => {
    setCheckBtn(!checkbtn);
    onChange(checklistItemID);
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div
        className="nft-caw-card sub-container p-0 m-0"
        data-toggle="modal"
        data-target={modalId}
        onClick={() => {
          handleCawClick(checklistItemID);
        }}
        style={{
          width: width,
          height: "auto",
          borderRadius: "20px",
          border: checkbtn === true ? "2px solid #4ED5D2" : "none",
        }}
      >
        <div
          className="elevated-stake-container p-0"
          style={{
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            className="sub-container p-0 position-relative"
            style={{ boxShadow: "none", borderRadius: "20px" }}
          >
            <img
              src={nft.image.replace("images", "thumbs")}
              className="nft-img"
              alt=""
              style={{ borderRadius: "20px 20px 0px 0px" }}
            />

            <div
              className="name-wrapper d-flex justify-content-center p-2"
              style={{ bottom: "55px" }}
            >
              <span className="nft-card-name">
                {" "}
                {nftType === "land" ? "World of Dypians Land" : "CAWS"}{" "}
              </span>
            </div>

            <div className="d-flex flex-column py-3 px-2">
              <div className="d-flex w-100 justify-content-between align-baseline">
                <p
                  className="nft-id"
                  style={{
                    color: "#B8B8E0",
                  }}
                >
                  {nft.name}
                </p>

                <input
                  type="checkbox"
                  id={checklistItemID}
                  name="checkbtn"
                  checked={checkbtn}
                  onChange={(e) => {
                    setCheckBtn(!checkbtn);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
NftChecklist.propTypes = {
  modalId: PropTypes.string,
  nft: PropTypes.object,
  checked: PropTypes.bool,
  checklistItemID: PropTypes.number,
  width: PropTypes.number,
};

export default NftChecklist;
