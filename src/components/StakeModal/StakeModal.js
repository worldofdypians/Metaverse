import React from "react";
import "./_stakemodal.scss";
import xmark from "./assets/xmark.svg";
import { Checkbox } from "@mui/material";
import EmptyWodCard from "./EmptyWodCard";
import EmptyCawsCard from "./EmptyCawsCard";
import greenInfo from "./assets/greenInfo.svg";
import cawsTag from "./assets/cawsTag.svg";
import wodTag from "./assets/wodTag.svg";
import fullWod from "./assets/fullWod.png";

const StakeModal = ({ onModalClose }) => {
  return (
    <div className="stake-modal p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="stake-modal-title">Stakeable NFTs</h6>
        <img
          src={xmark}
          style={{ cursor: "pointer" }}
          onClick={onModalClose}
          alt=""
        />
      </div>
      <span className="stake-modal-desc">
        A list of your NFT collection that can be added and removed from the
        staking pools
      </span>
      <div className="d-flex align-items-center justify-content-center">
        <button className="btn nft-stake-btn mt-3 p-2">To stake</button>
      </div>
      <span className="d-flex my-3 market-stake-divider"></span>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center ">
          <Checkbox
            sx={{
              color: "#8E97CD",
              "&.Mui-checked": {
                color: "#82DAAB",
              },
            }}
          />
          <span className="checkbox-label">Select all Land NFTs</span>
        </div>
        <div className="d-flex align-items-center ">
          <Checkbox
            sx={{
              color: "#8E97CD",
              "&.Mui-checked": {
                color: "#82DAAB",
              },
            }}
          />
          <span className="checkbox-label">Select all CAWS NFTs</span>
        </div>
      </div>
      <div className="row modal-scroll position-relative mt-3">
        <span className="vertical-stake-divider"></span>
        <div className="col-12 col-lg-6">
          <div className="nft-modal-grid">
            <div className="nft-modal-card">
              <div className="d-flex flex-column">
                {/* <div className="empty-img-wrapper d-flex align-items-center justify-content-center p-4 w-100"> */}
                <div className="position-relative">
                  <img src={fullWod} className="full-image" alt="" />
                </div>
                {/* </div> */}
                <div className="full-card-info p-2 w-100">
                  <div className="d-flex align-items-center w-100 h-100 justify-content-between">
                    <span className="modal-nft-title">Genesis #652</span>
                    <Checkbox
                      sx={{
                        color: "#8E97CD",
                        "&.Mui-checked": {
                          color: "#82DAAB",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <EmptyWodCard />
            <EmptyWodCard />
            <EmptyWodCard />
            <EmptyWodCard />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="nft-modal-grid">
            <EmptyCawsCard />
            <EmptyCawsCard />
            <EmptyCawsCard />
            <EmptyCawsCard />
          </div>
        </div>
      </div>
      <div className="w-100 p-2 d-flex align-items-center gap-2 mt-3 info-span">
        <img src={greenInfo} alt="" />
        <span className="info-span-text">
          Please choose the NFTs that you wish to stake. Once you have made your
          selection, you will be required to approve the process before
          depositing the NFTs.
        </span>
      </div>
      <div className="mt-3 d-flex align-items-end justify-content-between">
        <div className="selected-nfts-wrapper w-25 p-3">
          <div className="d-flex align-items-center justify-content-between">
            <span className="selected-nfts-span mb-2">Selected NFTs:</span>
            <img src={greenInfo} alt="" />
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-1">
              <img src={wodTag} alt="" />
              <span className="selected-nfts-amount">5 Wod Land</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <img src={cawsTag} alt="" />
              <span className="selected-nfts-amount">5 CAWS</span>
            </div>
          </div>
        </div>
        <button className="btn disabled-approve-btn px-4">Approve</button>
      </div>
    </div>
  );
};

export default StakeModal;
