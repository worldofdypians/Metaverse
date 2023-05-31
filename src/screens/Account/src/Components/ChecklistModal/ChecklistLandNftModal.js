import React from "react";
import Modal from "./Modal";
import OutsideClickHandler from "react-outside-click-handler";
import LandCart from "../Cart/LandCart";
import { Grid } from "@mui/material";
import LandEmptyCard from "../Cart/LandEmptyCard";

const ChecklistLandNftModal = ({ handleClose, show, cawsitem, stakes }) => {
  return (
    <Modal visible={show} onModalClose={handleClose} maxWidth={900}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className="d-flex m-0 p-4 pt-5 gap-3" style={{flexWrap: 'wrap'}}>
          {cawsitem.length > 0 &&
            cawsitem.map((item, index) => {
              return (
                <div className="nftGridItem" style={{top: 'auto'}} key={index}>
                  <LandCart {...item} style={{height: '100%'}} stakes={stakes}/>
                </div>
              );
            })}
            {cawsitem.length > 0 && cawsitem.length < 12 &&(
                [...Array(12-cawsitem.length)].map((item, index)=>{
                    return(<div className="nftGridItem" style={{top: 'auto'}} key={index}>
                    <LandEmptyCard />
                  </div>)
                })
            )}
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default ChecklistLandNftModal;
