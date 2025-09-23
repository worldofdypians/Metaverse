import React from "react";
import TwitterItem from "./TwitterItem";
import axios from "axios";

const TwitterRewards = ({ tasks, onClose, address }) => {


    
  const checkTask = async (tweetId, taskType) => {
    axios
      .post(`https://api.worldofdypians.com/api/twitter/verify-task`, {
        walletAddress: address,
        tweetId: tweetId,
        taskType: taskType,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="popup-wrapper popup-active booster-popup p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="booster-title mb-0">X Rewards</h6>
        <img
          src="https://cdn.worldofdypians.com/wod/popupXmark.svg"
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <div className="booster-desc text-center mt-3">
        Complete Tasks to earn special rewards. Tasks reset after 24 hours
      </div>
      <div className="mt-3 d-flex flex-column gap-2 w-100 p-3">
        {tasks.map((item, index) => (
          <TwitterItem item={item} index={index} checkTask={checkTask} />
        ))}
      </div>
    </div>
  );
};

export default TwitterRewards;
