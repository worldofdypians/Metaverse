import React, { useState } from "react";
import chestOpen from "./assets/chestOpen.png";
import chestClosed from "./assets/chestClosed.png";
import chestLock from "./chestImages/chestLock.svg";
import Web3 from "web3";

const ChestItem = ({
  chestId,
  chestTitle,
  open,
  closedImg,
  rewardTypes,
  chestIndex,
  onOpenChest,
  isPremium,
  address,
}) => {
  const [ischestOpen, setIsChestOpen] = useState(false);
  const [chestStatus, setchestStatus] = useState("initial");
  const [openRandom, setOpenRandom] = useState(1);

  const handleOpenChest = async () => {
    setchestStatus("loading");
    window.web3 = new Web3(window.ethereum);
    // console.log(window.config.daily_bonus_address, address);
    const daily_bonus_contract = new window.web3.eth.Contract(
      window.DAILY_BONUS_ABI,
      window.config.daily_bonus_address
    );
    // console.log(daily_bonus_contract);

    if (rewardTypes === "premium" && isPremium) {
      await daily_bonus_contract.methods
        .openPremiumChest()
        .send({
          from: address,
        })
        .then(() => {
          setOpenRandom(Math.floor(Math.random() * 2) + 1);
          setTimeout(() => {
            onOpenChest();
            setchestStatus("success");
            setIsChestOpen(true);
          }, 3000);
        })
        .catch((e) => {
          window.alertify.error(e?.message);
          setchestStatus("initial");
          console.error(e);
        });
    } else if (rewardTypes === "standard") {
      // console.log("standard");
      await daily_bonus_contract.methods
        .openChest()
        .send({
          from: address,
        })
        .then(() => {
          setOpenRandom(Math.floor(Math.random() * 2) + 1);
          setTimeout(() => {
            onOpenChest();
            setchestStatus("success");
            setIsChestOpen(true);
          }, 3000);
        })
        .catch((e) => {
          console.error(e);
          window.alertify.error(e?.message);
          setchestStatus("initial");
        });
    }
  };

  return (
    <div
      className={` reward-chest ${
        open || ischestOpen ? "reward-chest-open" : "reward-chest-closed"
      } position-relative d-flex flex-column align-items-center justify-content-center gap-2`}
      style={{
        pointerEvents: rewardTypes === "premium" && !isPremium && "none",
      }}
    >
      <div
        className={`chest-number ${
          open || ischestOpen ? "number-open" : "number-closed"
        } d-flex align-items-center justify-content-center`}
      >
        <span className="chest-number-text mb-0">{chestIndex}</span>
      </div>
      <div className="position-relative">
        {rewardTypes === "premium" && !isPremium && (
          <img src={chestLock} alt="" className="chest-lock" />
        )}
        {rewardTypes === "premium" && isPremium ? (
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
              rewardTypes === "premium" && !isPremium && "chest-blur"
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
              rewardTypes === "premium" && !isPremium && "chest-blur"
            }`}
            alt=""
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <h6
          className="chest-title mb-0"
          style={{ opacity: rewardTypes === "premium" && !isPremium && "0.1" }}
        >
          {chestTitle.split(" ")[0]}
        </h6>
        <h6
          className="chest-title mb-0"
          style={{ opacity: rewardTypes === "premium" && !isPremium && "0.1" }}
        >
          {chestTitle.split(" ")[1]}
        </h6>
        <div className="d-flex w-100 justify-content-center">
          <button
            onClick={handleOpenChest}
            className="btn claim-chest-btn d-flex align-items-center justify-content-center"
          >
            <span className="mb-0">Claim</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChestItem;
