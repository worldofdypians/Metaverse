import React, { useState } from "react";
import TwitterItem from "./TwitterItem";
import axios from "axios";
import "./_twitterrewards.scss";
import CompletedTwitterItem from "./CompletedTwitterItem";
import { NavLink } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";

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
  taskCount,
}) => {
  const completed = tasks.filter((item) =>
    item.tasks.every((t) => t.completed && t.verified)
  );

  const available = tasks.filter(
    (item) => !item.tasks.every((t) => t.completed && t.verified)
  );


  const [tab, setTab] = useState("available");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const handleDisconnect = async () => {
    setLoading(true);
    await axios
      .post(`https://api.worldofdypians.com/auth/twitter/unlink`, {
        walletAddress: coinbase,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        checkTwitter();
        onClose();
      });
  };

  return (
    <>
      <div
        className={`popup-wrapper popup-active twitter-popup p-3  d-flex flex-column ${
          popup && "pointer-none"
        }`}
      >
        <div className="d-flex w-100 justify-content-end">
          <img
            src="https://cdn.worldofdypians.com/wod/popupXmark.svg"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClose();
            }}
            alt=""
          />
        </div>
        <div className="col-12 col-lg-9">
          <div className="d-flex justify-content-center align-items-center">
            <h6 className="mb-0 twitter-popup-title text-center">
              Social Tasks
            </h6>
          </div>
          <div className="d-flex flex-column align-items-center gap-3 mt-2">
            <span className="twitter-popup-desc ">
              Complete social media tasks to earn stars and boost your
              reputation
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
                    <span
                      className="text-[#1E90FF] font-medium"
                      style={{ fontWeight: "600" }}
                    >
                      @{username}
                    </span>
                    <span
                      className="mb-1"
                      style={{ color: "#a29993", fontSize: "13px" }}
                    >
                      X Connected
                    </span>
                  </div>
                </div>
                <button
                  className="unlink-twitter-button d-flex align-items-center gap-1 px-3 py-2"
                  onClick={() => setPopup(true)}
                  // onClick={handleDisconnect}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-log-out w-4 h-4 mr-1"
                    aria-hidden="true"
                  >
                    <path d="m16 17 5-5-5-5"></path>
                    <path d="M21 12H9"></path>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  </svg>
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
                    <h6 className="text-white font-medium mb-1">
                      Total Rewards
                    </h6>
                    <div className="d-flex align-items-end gap-1">
                      <span class="text-2xl font-bold text-[#FFD700]">34</span>
                      <span class="text-white/50">stars</span>
                    </div>
                  </div>
                </div>
                <div className="available-rewards-wrapper p-2 d-flex flex-column gap-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="available-rewards-text">Available</span>
                    <span
                      className="available-rewards-value"
                      style={{ color: "#1E90FF" }}
                    >
                      {taskCount}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="available-rewards-text">Completed</span>
                    <span
                      className="available-rewards-value"
                      style={{ color: "#22C55E" }}
                    >
                      {completed.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="twitter-tab-container-1 p-3 d-flex flex-column gap-3 mt-3">
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
                  Available
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
                  Completed
                </span>
              </div>
            </div>
            <div className="mt-3 d-flex flex-column gap-2 twitter-tasks-container t">
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
                              currentLength={available.length}
                            />
                          ))}
                        </>
                      ) : (
                        <div className="d-flex w-100 h-100 justify-content-center align-items-center mt-5">
                          <h6 className="twitter-empty-message mb-0">
                            You have finished all available tasks. Stay tuned
                            for more
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
        </div>
      </div>
      {popup && (
        // <OutsideClickHandler onOutsideClick={() => setPopup(false)}>
        <div className="disconnect-popup p-3 d-flex flex-column align-items-center gap-3">
          <div className="disconnect-icon-holder p-2 d-flex align-items-center justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14.0014 25.6649C20.4441 25.6649 25.6669 20.4421 25.6669 13.9995C25.6669 7.5568 20.4441 2.33398 14.0014 2.33398C7.55875 2.33398 2.33594 7.5568 2.33594 13.9995C2.33594 20.4421 7.55875 25.6649 14.0014 25.6649Z"
                stroke="#FFD700"
                stroke-width="2.3331"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 18.6642V13.998"
                stroke="#FFD700"
                stroke-width="2.3331"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 9.33203H14.0117"
                stroke="#FFD700"
                stroke-width="2.3331"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h6 className="disconnect-title">Disconnect Account</h6>
          <span className="disconnect-desc text-center">
            You will not be able to assign a new X account for the next{" "}
            <b style={{ color: "#FFD700" }}>24 Hours</b> after disconnecting.
          </span>
          <div className="d-flex align-items-center gap-2">
            <button
              className="cancel-btn px-3 py-2"
              onClick={() => setPopup(false)}
            >
              Cancel
            </button>
            <button
              className="disconnect-btn px-3 py-2"
              onClick={() => {
                handleDisconnect();
                setPopup(false);
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
        // </OutsideClickHandler>
      )}
    </>
  );
};

export default TwitterRewards;
