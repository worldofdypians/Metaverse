import React from "react";
import Modal from "./Modal";
import OutsideClickHandler from "react-outside-click-handler";
import { Cart } from "../Cart";
import { Grid } from "@mui/material";
import EmptyCard from "../Cart/EmptyCard";

const ChecklistModal = ({ handleClose, show, cawsitem, stakes }) => {
  return (
    <Modal visible={show} onModalClose={handleClose} maxWidth={900}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className="d-flex m-0 p-4 pt-5 gap-3" style={{flexWrap: 'wrap'}}>
          {cawsitem.length > 0 &&
            cawsitem.map((item, index) => {
              return (
                <div className="nftGridItem" style={{top: 'auto'}} key={index}>
                  <Cart {...item} style={{height: '100%'}} stakes={stakes}/>
                </div>
              );
            })}
            {cawsitem.length > 0 && cawsitem.length < 12 &&(
                [...Array(12-cawsitem.length)].map((item, index)=>{
                    return(<div className="nftGridItem" style={{top: 'auto'}} key={index}>
                    <EmptyCard />
                  </div>)
                })
            )}
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default ChecklistModal;
