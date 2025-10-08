import React, { useState } from "react";
import TwitterItem from "./TwitterItem";
import axios from "axios";
import "./_twitterrewards.scss";
import CompletedTwitterItem from "./CompletedTwitterItem";
import { NavLink } from "react-router-dom";

const TwitterRewards = ({
  tasks,
  onClose,
  address,
  checkTwitter,
  username,
  isConnected,
  coinbase,
  email,
  onConnectWallet,
}) => {
  const completed = tasks.filter((item) =>
    item.tasks.every((t) => t.completed && t.verified)
  );

  const available = tasks.filter(
    (item) => !item.tasks.every((t) => t.completed && t.verified)
  );

  const [tab, setTab] = useState("available");

  return (
    <div className="popup-wrapper popup-active twitter-popup p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 twitter-popup-title">Social Tasks</h6>

        <img
          src="https://cdn.worldofdypians.com/wod/popupXmark.svg"
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <div className="d-flex flex-column align-items-center gap-3 mt-2">
        <span className="twitter-popup-desc">
          Complete social media tasks to earn stars and boost your reputation
        </span>
      </div>
      <div className="row mt-3 gap-2 gap-lg-0">
        <div className="col-12 col-lg-6">
          <div className="twitter-tab-container-1 h-100 d-flex align-items-center  gap-2 gap-lg-0 justify-content-between  relative bg-gradient-to-br from-[#1a1640] to-[#0f0d28]   rounded-xl p-3  transition-all duration-200">
            <div className="d-flex align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <rect
                  width="50"
                  height="50"
                  rx="8"
                  fill="url(#paint0_linear_5642_1311)"
                />
                <path
                  d="M33.9922 11H38.7439L28.3107 22.8819L40.5 39H30.9345L23.4454 29.2052L14.8715 39H10.1198L21.1728 26.2915L9.5 11H19.3031L26.0691 19.9476L33.9922 11ZM32.3291 36.2103H34.9632L17.9189 13.6863H15.0885L32.3291 36.2103Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5642_1311"
                    x1="0"
                    y1="0"
                    x2="50"
                    y2="50"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#1B8CFA" />
                    <stop offset="1" stop-color="#036AD1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="d-flex flex-column">
                <h6 className="text-white font-medium mb-1">
                  Account Connected
                </h6>
                <span className="text-[#1E90FF] font-medium">@{username}</span>
              </div>
            </div>
            <button className="unlink-twitter-button px-3 py-2">
              Disconnect
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="twitter-tab-container-1 d-flex align-items-center justify-content-between relative bg-gradient-to-br from-[#1a1640] to-[#0f0d28]   rounded-xl p-3  transition-all duration-200">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://cdn.worldofdypians.com/wod/lbStar.png"
                height={50}
                width={50}
                alt=""
              />
              <div className="d-flex flex-column">
                <h6 className="text-white font-medium mb-1">Total Rewards</h6>
                <div className="d-flex align-items-end gap-1">
                  <span class="text-2xl font-bold text-[#FFD700]">34</span>
                  <span class="text-white/50">stars</span>
                </div>
              </div>
            </div>
            <h6 className="twitter-todays-date text-white mb-0">
              {new Date().toLocaleDateString("en-GB")}
            </h6>
          </div>
        </div>
      </div>
      <div className="twitter-tab-container-1 mt-3 relative bg-gradient-to-br from-[#1a1640] to-[#0f0d28]   rounded-xl p-3  transition-all duration-200">
        <div className="twitter-task-tab-container w-100 position-relative d-flex align-items-center">
          <div
            className={`task-tab-bg w-50 p-2 ${
              tab === "completed" && "tab-move"
            }`}
          ></div>
          <div
            className="twitter-task-tab w-50 p-2 d-flex justify-content-center align-items-center"
            onClick={() => setTab("available")}
          >
            <span
              className={`twitter-task-tab-title ${
                tab === "available" && "text-white"
              }`}
            >
              Available ({available.length})
            </span>
          </div>
          <div
            className="twitter-task-tab w-50 p-2 d-flex justify-content-center align-items-center"
            onClick={() => setTab("completed")}
          >
            <span
              className={`twitter-task-tab-title ${
                tab === "completed" && "text-white"
              }`}
            >
              Completed ({completed.length})
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 d-flex flex-column gap-2 twitter-tasks-container">
        {!isConnected && coinbase && !email ? (
          <NavLink
            to={`/auth`}
            onClick={onClose}
            className="connect-twitter-btn d-flex align-items-center justify-content-center p-2 gap-2 mt-5"
          >
            Log In
          </NavLink>
        ) : !isConnected && !coinbase ? (
          <button
            onClick={onConnectWallet}
            className="connect-twitter-btn d-flex align-items-center justify-content-center p-2 gap-2 mt-5"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            {tab === "available" ? (
              <>
                {available.length > 0 ? (
                  <>
                    {available.map((item, index) => (
                      <TwitterItem
                        item={item}
                        index={index}
                        address={address}
                        checkTwitter={checkTwitter}
                      />
                    ))}
                  </>
                ) : (
                  <div className="d-flex w-100 h-100 justify-content-center align-items-center mt-5">
                    <h6 className="twitter-empty-message mb-0">
                      You have finished all available tasks. Stay tuned for more
                    </h6>
                  </div>
                )}
              </>
            ) : (
              <>
                {completed.length > 0 ? (
                  <>
                    {completed.map((item, index) => (
                      <CompletedTwitterItem item={item} index={index} />
                    ))}
                  </>
                ) : (
                  <div className="d-flex w-100 h-100 justify-content-center align-items-center mt-5">
                    <h6 className="twitter-empty-message mb-0">
                      You have not completed any tasks yet.
                    </h6>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TwitterRewards;
