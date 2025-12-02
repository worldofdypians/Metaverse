import React, { useMemo, useState } from "react";
import TwitterItem from "./TwitterItem";
import axios from "axios";
import "./_twitterrewards.scss";
import CompletedTwitterItem from "./CompletedTwitterItem";
import { NavLink } from "react-router-dom";
import useWindowSize from "../../../hooks/useWindowSize";
import { useCountUp } from "../../../hooks/useCountup";
import BlurredTwitterItem from "./BluredTwitterItem";
import Countdown from "react-countdown";
import { styled, Tooltip, tooltipClasses } from "@mui/material";


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#252743 !important",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "150px !important",
    minWidth: "90px !important",
    fontSize: "12px",
  },
}));



const renderer = ({ hours, minutes, completed }) => {
  if (completed) {
    return <span className="unlink-twitter-text mb-0">00:00</span>;
  }

  return (
    <span className="unlink-twitter-text mb-0">
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
    </span>
  );
};

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
  twitter,
  twitterCooldown,
  checkCooldown,
}) => {
  const windowSize = useWindowSize();


  const dummyCooldown = 100000;

  const completed = tasks.filter((item) =>
    item.tasks.every((t) => t.completed && t.verified)
  );

  const available = tasks.filter(
    (item) => !item.tasks.every((t) => t.completed && t.verified)
  );

  const [tab, setTab] = useState("available");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const [page, setPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const postsPerPage = 3;
  const { value, add } = useCountUp(0, 600); // duration 600ms

  // Reverse without mutating the original array
  const reversed = useMemo(() => [...available].reverse(), [available]);

  // Slice based on current page
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * postsPerPage;
    return reversed.slice(start, start + postsPerPage);
  }, [reversed, page]);

  const paginatedComplete = useMemo(() => {
    const start = (completedPage - 1) * postsPerPage;
    return completed.slice(start, start + postsPerPage);
  }, [completed, completedPage]);

  const totalPages = Math.ceil(available.length / postsPerPage);

  const totalCompletedPages = Math.ceil(completed.length / postsPerPage);

  // Handle page change
  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setPage(num);
  };
  const goToCompletedPage = (num) => {
    if (num < 1 || num > totalCompletedPages) return;
    setCompletedPage(num);
  };

  const handleDisconnect = async () => {
    await axios
      .post(`https://api.worldofdypians.com/auth/twitter/unlink`, {
        walletAddress: coinbase,
      })
      .then((res) => {
        checkTwitter();
        checkCooldown();
        onClose();
      });
  };

  console.log(twitterCooldown.remainingHours, "hours");

  return (
    <>
      <div
        className={`popup-wrapper popup-active twitter-popup p-3  d-flex flex-column ${
          popup && "pointer-none"
        }`}
      >
        <div className="d-flex w-100 justify-content-between align-items-start">
          <div className="d-flex flex-column align-items-start gap-2">
            <h6 className="mb-0 twitter-popup-title">Social Tasks</h6>
            <span className="twitter-popup-desc ">
              Complete social tasks to earn stars and improve your rankings.
            </span>
          </div>
          <img
            src="https://cdn.worldofdypians.com/wod/popupXmark.svg"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClose();
            }}
            alt=""
          />
        </div>
        <div className="col-12 ">
          <div className="row mt-3 gap-2 gap-md-0">
            <div className="col-12 col-md-6">
              <div className="twitter-tab-container-1 h-100 d-flex align-items-center  gap-2 gap-lg-0 justify-content-between  relative bg-gradient-to-br from-[#1a1640] to-[#0f0d28]   rounded-xl p-3  transition-all duration-200">
                <div className="d-flex align-items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 101 100"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g clip-path="url(#clip0_5976_1428)">
                      <path
                        d="M77.7784 0H22.6846C10.1563 0 0 10.1563 0 22.6846V77.3154C0 89.8437 10.1563 100 22.6846 100H77.7784C90.3068 100 100.463 89.8437 100.463 77.3154V22.6846C100.463 10.1563 90.3068 0 77.7784 0Z"
                        fill="black"
                      />
                      <path
                        d="M63.5272 29.1094H70.6145L55.131 46.8081L73.3459 70.8898H59.0829L47.9122 56.2854L35.1287 70.8898H28.0374L44.5981 51.9608L27.125 29.1094H41.749L51.8464 42.46L63.5272 29.1094ZM61.0391 66.6476H64.9674L39.6162 33.1299H35.4014L61.0391 66.6476Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5976_1428">
                        <rect width="100.463" height="100" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  {twitter && twitter.twitterUsername ? (
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
                  ) : (
                    <div className="d-flex flex-column">
                      <span
                        className="text-[#1E90FF] font-medium"
                        style={{ fontWeight: "600" }}
                      >
                        X Account
                      </span>
                      <span
                        className="mb-1"
                        style={{ color: "#a29993", fontSize: "13px" }}
                      >
                        Not Connected
                      </span>
                    </div>
                  )}
                </div>
                {!isConnected && coinbase && !email ? (
                  <NavLink
                    to={`/auth`}
                    onClick={onClose}
                    className="connect-twitter-btn d-flex align-items-center justify-content-center py-2 px-4 gap-2 "
                  >
                    Log In
                  </NavLink>
                ) : !isConnected && !coinbase ? (
                  <button
                    onClick={onConnectWallet}
                    className="connect-twitter-btn d-flex align-items-center justify-content-center py-2 px-4 gap-2"
                    style={{ width: "fit-content" }}
                  >
                    Connect Wallet
                  </button>
                ) : twitter && twitter.twitterUsername ? (
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

                  
                   
                ) : (
                  <>
                    {twitterCooldown.remainingHours === 0 ? (
                      <a
                        href={`https://api.worldofdypians.com/auth/twitter?walletAddress=${address}`}
                        className="connect-twitter-btn d-flex align-items-center justify-content-center py-2 px-4 gap-2"
                        style={{ width: "fit-content", cursor: "pointer" }}
                      >
                        Connect
                      </a>
                    ) : (
                   <HtmlTooltip
                              placement="top"
                              title={
                                <span className="unlink-twitter-text mb-0">You can link your account after the cooldown ends</span>
                              }
                            >
                             <button
                        className="unlink-twitter-button d-flex align-items-center justify-content-center gap-1 px-3 py-2"
                        style={{width: "150px"}}
                        disabled
                      >
                        <Countdown
                          date={twitterCooldown.remainingHours}
                          renderer={renderer}
                        />

                      </button>
                            </HtmlTooltip>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="twitter-tab-container-1 d-flex align-items-center justify-content-between relative bg-gradient-to-br from-[#1a1640] to-[#0f0d28]   rounded-xl p-3  transition-all duration-200">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src="https://cdn.worldofdypians.com/wod/lbStarLarge.png"
                    height={50}
                    width={50}
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <h6 className="text-white font-medium mb-1">Total Stars</h6>
                    <div className="d-flex align-items-end gap-1">
                      <span class="text-2xl font-bold text-[#FFD700]">
                        {value}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1">
                  <div className="available-rewards-wrapper p-1 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M1.33594 6.33043C1.33595 5.58882 1.56092 4.86467 1.98113 4.25361C2.40134 3.64254 2.99703 3.17332 3.68951 2.90791C4.38199 2.6425 5.13869 2.59338 5.85967 2.76706C6.58065 2.94073 7.23199 3.32901 7.72767 3.88063C7.76258 3.91796 7.80479 3.94772 7.85167 3.96807C7.89856 3.98841 7.94913 3.99891 8.00024 3.99891C8.05135 3.99891 8.10191 3.98841 8.1488 3.96807C8.19569 3.94772 8.23789 3.91796 8.27281 3.88063C8.76692 3.32543 9.41841 2.93388 10.1406 2.7581C10.8627 2.58232 11.6213 2.63064 12.3153 2.89664C13.0093 3.16263 13.6058 3.63369 14.0255 4.2471C14.4452 4.86052 14.6681 5.5872 14.6645 6.33043C14.6645 7.85655 13.6649 8.99615 12.6652 9.99579L9.00521 13.5365C8.88104 13.6792 8.72793 13.7937 8.55607 13.8726C8.38421 13.9515 8.19753 13.9929 8.00843 13.9941C7.81932 13.9953 7.63213 13.9563 7.45929 13.8796C7.28644 13.8028 7.1319 13.6902 7.00592 13.5492L3.33523 9.99579C2.33558 8.99615 1.33594 7.86322 1.33594 6.33043Z"
                          stroke="white"
                          stroke-opacity="0.6"
                          stroke-width="1.33286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span
                        className="available-rewards-text"
                        style={{
                          color: "#fff",
                        }}
                      >
                        Like
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span
                        className="available-rewards-text"
                        style={{
                          color: "gold",
                        }}
                      >
                        +10
                      </span>
                      <img
                        src="https://cdn.worldofdypians.com/wod/lbStar.png"
                        height={20}
                        width={20}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="available-rewards-wrapper p-1 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M11.3281 1.33203L13.9938 3.99775L11.3281 6.66347"
                          stroke="white"
                          stroke-opacity="0.6"
                          stroke-width="1.33286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M2 7.3302V6.66377C2 5.95677 2.28085 5.27874 2.78077 4.77882C3.28069 4.2789 3.95873 3.99805 4.66572 3.99805H13.9957"
                          stroke="white"
                          stroke-opacity="0.6"
                          stroke-width="1.33286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.66572 14.6615L2 11.9958L4.66572 9.33008"
                          stroke="white"
                          stroke-opacity="0.6"
                          stroke-width="1.33286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.9957 8.66406V9.33049C13.9957 10.0375 13.7149 10.7155 13.215 11.2154C12.715 11.7154 12.037 11.9962 11.33 11.9962H2"
                          stroke="white"
                          stroke-opacity="0.6"
                          stroke-width="1.33286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span
                        className="available-rewards-text"
                        style={{
                          color: "#fff",
                        }}
                      >
                        Repost
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span
                        className="available-rewards-text"
                        style={{
                          color: "gold",
                        }}
                      >
                        +20
                      </span>
                      <img
                        src="https://cdn.worldofdypians.com/wod/lbStar.png"
                        height={20}
                        width={20}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="available-rewards-wrapper p-1 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M1.99683 10.8917C2.09482 11.1389 2.11664 11.4098 2.05947 11.6694L1.34973 13.862C1.32686 13.9732 1.33277 14.0884 1.3669 14.1966C1.40104 14.3049 1.46226 14.4027 1.54477 14.4806C1.62728 14.5586 1.72833 14.6142 1.83835 14.6422C1.94837 14.6701 2.06371 14.6695 2.17343 14.6404L4.44796 13.9753C4.69302 13.9267 4.9468 13.9479 5.18037 14.0366C6.60345 14.7012 8.21553 14.8418 9.73218 14.4336C11.2488 14.0254 12.5726 13.0947 13.4699 11.8056C14.3672 10.5166 14.7804 8.95201 14.6365 7.388C14.4927 5.82398 13.8011 4.36102 12.6837 3.25723C11.5664 2.15344 10.0951 1.47975 8.52943 1.35504C6.96377 1.23032 5.40438 1.66258 4.12637 2.57556C2.84836 3.48854 1.93387 4.82357 1.54425 6.34509C1.15463 7.86661 1.31492 9.47686 1.99683 10.8917Z"
                          stroke="white"
                          stroke-opacity="0.6"
                          stroke-width="1.33286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span
                        className="available-rewards-text"
                        style={{
                          color: "#fff",
                        }}
                      >
                        Comment
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <span
                        className="available-rewards-text"
                        style={{
                          color: "gold",
                        }}
                      >
                        +30
                      </span>
                      <img
                        src="https://cdn.worldofdypians.com/wod/lbStar.png"
                        height={20}
                        width={20}
                        alt=""
                      />
                    </div>
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
                  Available ({taskCount})
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
            {twitter && twitter.twitterUsername ? (
              <div className="mt-3 d-flex flex-column gap-2 twitter-tasks-container">
                {!isConnected && coinbase && !email ? (
                  <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                    <NavLink
                      to={`/auth`}
                      onClick={onClose}
                      className="connect-twitter-btn d-flex align-items-center justify-content-center py-2 px-4 gap-2 "
                    >
                      Log In
                    </NavLink>
                  </div>
                ) : !isConnected && !coinbase ? (
                  <div className="d-flex align-items-center justify-content-center h-100 w-100">
                    <button
                      onClick={onConnectWallet}
                      className="connect-twitter-btn d-flex align-items-center justify-content-center py-2 px-4 gap-2"
                      style={{ width: "fit-content" }}
                    >
                      Connect Wallet
                    </button>
                  </div>
                ) : (
                  <>
                    {tab === "available" ? (
                      <>
                        {available.length > 0 ? (
                          <>
                            {windowSize.width > 786 ? (
                              <div className="d-flex align-items-center flex-column justify-content-between h-100">
                                <div className="d-flex flex-column align-items-center gap-3 w-100">
                                  {paginatedItems.map((item, index) => (
                                    <TwitterItem
                                      key={(page - 1) * postsPerPage + index}
                                      add={add}
                                      item={item}
                                      index={index}
                                      address={address}
                                      checkTwitter={checkTwitter}
                                      currentLength={available.length}
                                    />
                                  ))}

                                  {/* Custom Pagination */}
                                </div>
                                <div className="d-flex justify-content-center mt-1 gap-2">
                                  <button
                                    className={`page-button ${
                                      page === 1 && "disabled-page-button"
                                    } `}
                                    onClick={() => goToPage(page - 1)}
                                    disabled={page === 1}
                                  >
                                    {"<"}
                                  </button>

                                  {Array.from(
                                    { length: totalPages },
                                    (_, i) => (
                                      <button
                                        className={`page-button ${
                                          page === i + 1 && "active-page-button"
                                        }`}
                                        key={i + 1}
                                        onClick={() => goToPage(i + 1)}
                                      >
                                        {i + 1}
                                      </button>
                                    )
                                  )}

                                  <button
                                    className={`page-button ${
                                      page === totalPages &&
                                      "disabled-page-button"
                                    } `}
                                    onClick={() => goToPage(page + 1)}
                                    disabled={page === totalPages}
                                  >
                                    {">"}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center flex-column gap-3 w-100 h-100">
                                {available.reverse().map((item, index) => (
                                  <TwitterItem
                                    key={index}
                                    add={add}
                                    item={item}
                                    index={index}
                                    address={address}
                                    checkTwitter={checkTwitter}
                                    currentLength={available.length}
                                  />
                                ))}

                                {/* Custom Pagination */}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="d-flex w-100 h-100 justify-content-center align-items-center mt-5">
                            <h6 className="twitter-empty-message mb-0">
                              There are no tasks available. Check back soon.
                            </h6>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {completed.length > 0 ? (
                          <>
                            {windowSize.width > 786 ? (
                              <div className="d-flex align-items-center flex-column justify-content-between h-100">
                                <div className="d-flex flex-column align-items-center gap-3 w-100">
                                  {paginatedComplete.map((item, index) => (
                                    <CompletedTwitterItem
                                      item={item}
                                      index={index}
                                    />
                                  ))}

                                  {/* Custom Pagination */}
                                </div>
                                <div className="d-flex justify-content-center mt-1 gap-2">
                                  <button
                                    className={`page-button ${
                                      completedPage === 1 &&
                                      "disabled-page-button"
                                    } `}
                                    onClick={() =>
                                      goToCompletedPage(completedPage - 1)
                                    }
                                    disabled={completedPage === 1}
                                  >
                                    {"<"}
                                  </button>

                                  {Array.from(
                                    { length: totalCompletedPages },
                                    (_, i) => (
                                      <button
                                        className={`page-button ${
                                          completedPage === i + 1 &&
                                          "active-page-button"
                                        }`}
                                        key={i + 1}
                                        onClick={() => goToCompletedPage(i + 1)}
                                      >
                                        {i + 1}
                                      </button>
                                    )
                                  )}

                                  <button
                                    className={`page-button ${
                                      completedPage === totalCompletedPages &&
                                      "disabled-page-button"
                                    } `}
                                    onClick={() =>
                                      goToCompletedPage(completedPage + 1)
                                    }
                                    disabled={
                                      completedPage === totalCompletedPages
                                    }
                                  >
                                    {">"}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="d-flex align-items-center flex-column gap-3 w-100 h-100">
                                {completed.map((item, index) => (
                                  <CompletedTwitterItem
                                    item={item}
                                    index={index}
                                  />
                                ))}
                              </div>
                            )}
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
            ) : (
              <div className="mt-3 d-flex flex-column gap-2 twitter-tasks-container">
                <div className="d-flex align-items-center flex-column justify-content-between h-100">
                  <div className="d-flex flex-column align-items-center gap-3 w-100">
                    <BlurredTwitterItem />
                    <BlurredTwitterItem />
                    <BlurredTwitterItem />
                  </div>
                </div>
              </div>
            )}
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
