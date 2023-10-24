import React, { useState } from "react";
import chestOpen from "./assets/chestOpen.png";
import chestClosed from "./assets/chestClosed.png";
import chestLock from "./chestImages/chestLock.svg";

const ChestItem = ({
  chestId,
  chestTitle,
  open,
  closedImg,
  rewardTypes,
  chestIndex,
  onOpenChest
}) => {
  const [ischestOpen, setIsChestOpen] = useState(false);
  const [chestStatus, setchestStatus] = useState("initial");
  const [openRandom, setOpenRandom] = useState(1);
  const handleOpenChest = () => {
    setchestStatus("loading");
    setOpenRandom(Math.floor(Math.random() * 2) + 1);
    setTimeout(() => {
      onOpenChest();
      setchestStatus("success");
      setIsChestOpen(true);
    }, 3000);
  };

  return (
    <div
      className={` reward-chest ${
        open || ischestOpen ? "reward-chest-open" : "reward-chest-closed"
      } position-relative d-flex flex-column align-items-center justify-content-center gap-2`}
      onClick={handleOpenChest}
      style={{ pointerEvents: rewardTypes === "premium" && "none" }}
    >
      <div
        className={`chest-number ${
          open || ischestOpen ? "number-open" : "number-closed"
        } d-flex align-items-center justify-content-center`}
      >
        <span className="chest-number-text mb-0">{chestIndex}</span>
      </div>
      <div className="position-relative">
        {rewardTypes === "premium" && (
          <img src={chestLock} alt="" className="chest-lock" />
        )}
        {rewardTypes === "premium" ? (
          <img
            src={
              open || (ischestOpen && openRandom === 1)
                ? require(`./chestImages/${closedImg}OpenCoins.png`)
                : ischestOpen && openRandom === 2
                ? require(`./chestImages/${closedImg}OpenGems.png`)
                : require(`./chestImages/${closedImg}.png`)
            }
            className={`chest-image ${
              chestStatus === "loading" && "shake-bottom-animation"
            } ${chestStatus === "success" && "fade-in-animation"} ${
              rewardTypes === "premium" && "chest-blur"
            }`}
            alt=""
          />
        ) : (
          <img
            src={
              open || ischestOpen
                ? require(`./chestImages/${closedImg}Open.png`)
                : require(`./chestImages/${closedImg}.png`)
            }
            className={`chest-image ${
              chestStatus === "loading" && "shake-bottom-animation"
            } ${chestStatus === "success" && "fade-in-animation"} ${
              rewardTypes === "premium" && "chest-blur"
            }`}
            alt=""
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <h6
          className="chest-title mb-0"
          style={{ opacity: rewardTypes === "premium" && "0.1" }}
        >
          {chestTitle.split(" ")[0]}
        </h6>
        <h6
          className="chest-title mb-0"
          style={{ opacity: rewardTypes === "premium" && "0.1" }}
        >
          {chestTitle.split(" ")[1]}
        </h6>
      </div>
    </div>
  );
};

export default ChestItem;
