import React, { useState } from "react";
import chestOpen from "./assets/chestOpen.png";
import chestClosed from "./assets/chestClosed.png";

const ChestItem = ({ chestId, chestTitle, open }) => {
  const [ischestOpen, setIsChestOpen] = useState(false);
  const [chestStatus, setchestStatus] = useState('initial');
  const handleOpenChest = () => {
    setchestStatus('loading');
    setTimeout(() => {
        setchestStatus('success');
        setIsChestOpen(true)
    }, 3000);
  };


  return (
    <div
      className={` reward-chest ${
        open  || ischestOpen ? "reward-chest-open" : "reward-chest-closed"
      } position-relative d-flex flex-column align-items-center justify-content-center gap-2`}
      onClick={handleOpenChest}
    >
      <div
        className={`chest-number ${
          open  || ischestOpen ? "number-open" : "number-closed"
        } d-flex align-items-center justify-content-center`}
      >
        <span className="chest-number-text mb-0">{chestId}</span>
      </div>
      <img
        src={ open || ischestOpen ? chestOpen : chestClosed}
        className={`chest-image ${chestStatus === 'loading' && 'shake-bottom-animation'} ${chestStatus === 'success' && 'fade-in-animation'} `}
        alt=""
      />
      <h6 className="chest-title mb-0">{chestTitle}</h6>
    </div>
  );
};

export default ChestItem;
