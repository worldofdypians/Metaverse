import React, { useEffect, useState } from "react";

import "react-tooltip/dist/react-tooltip.css";
import "./_profilecard.scss";
import defaultAvatar from "../../Images/userProfile/default-avatar.png";
import defaultAvatarAlert from "../../Images/userProfile/default-avatar-alert.png";
import defaultAvatarPremium from "../../Images/userProfile/defaultAvatarPremium.png";


// import Countdown from "react-countdown";
import dypMedal from "../../Images/userProfile/dyp-medal.svg";
import { shortAddress } from "../../Utils.js/hooks/shortAddress";
import Clipboard from "react-clipboard.js";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import copyIcon from "../WalletBalance/assets/copyIcon.svg";
import walletIcon from "../WalletBalance/assets/walletIcon.svg";
import greenarrow from "./assets/greenarrow.svg";
import logouticon from "./assets/logout.svg";
import player from "./assets/explorePlayer.png";
import triangle from "./assets/triangle.svg";
import sync from "./assets/sync.svg";
import walletImg from "../../Images/userProfile/wallet.svg";
import circleArrow from "../../Images/userProfile/arrow-circle.svg";
import blackWallet from "../../Images/userProfile/wallet-black.svg";
import starActive from "./assets/star-active.svg";
import starAlert from "./assets/star-alert.svg";

// const renderer = ({ hours, minutes, seconds }) => {
//   return (
//     <div className="timer-wrapper d-none align-items-start gap-3 justify-content-center">
//       <div className="d-flex flex-column gap-1">
//         <h6 className="mint-time">{hours < 10 ? "0" + hours : hours}</h6>
//         <span className="days">Hours</span>
//       </div>
//       <h6 className="mint-time">:</h6>
//       <div className="d-flex flex-column gap-1">
//         <h6 className="mint-time">{minutes < 10 ? "0" + minutes : minutes}</h6>
//         <span className="days">minutes</span>
//       </div>
//       <h6 className="mint-time">:</h6>
//       <div className="d-flex flex-column gap-1">
//         <h6 className="mint-time">{seconds < 10 ? "0" + seconds : seconds}</h6>
//         <span className="days">seconds</span>
//       </div>
//     </div>
//   );
// };

const ProfileCard = ({
  email,
  username,
  balance,
  address,
  handleConnect,
  userId,
  availableTime,
  isVerified,
  handleShowWalletPopup,
  coinbase,
  onSigninClick,
  onLogoutClick,
  onSyncClick,
  syncStatus,
  onLinkWallet,
  isPremium,
}) => {
  // const [dailyrecords, setRecords] = useState([]);

  // const [userRank, setUserRank] = useState("");
  // const [genesisRank, setGenesisRank] = useState("");
  // const [countdown, setcountdown] = useState();
  // const [isactive, setisActive] = useState(false);
  // const [remainingTime, setRemainingTime] = useState("");

  // const fetchMonthlyRecordsAroundPlayer = async () => {
  //   const data = {
  //     StatisticName: "MonthlyLeaderboard",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   const result = await axios.post(
  //     `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
  //     data
  //   );
  //   setRecords(result.data.data.leaderboard);
  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === username
  //   );

  //   setUserRank(testArray[0].position);
  // };

  // const fetchGenesisAroundPlayer = async () => {
  //   const data = {
  //     StatisticName: "GenesisLandRewards",
  //     MaxResultsCount: 6,
  //     PlayerId: userId,
  //   };
  //   const result = await axios.post(
  //     `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
  //     data
  //   );

  //   var testArray = result.data.data.leaderboard.filter(
  //     (item) => item.displayName === username
  //   );

  //   setGenesisRank(testArray[0].position);
  // };

  // const setlastDay = async () => {
  //   const timeofDeposit_Date = new Intl.DateTimeFormat("en-UK", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   }).format(availableTime);

  //   setRemainingTime(timeofDeposit_Date);
  // };

  // useEffect(() => {
  // fetchMonthlyRecordsAroundPlayer();
  // fetchGenesisAroundPlayer();
  // }, []);

  // useEffect(() => {
  //   if (
  //     !availableTime ||
  //     availableTime === undefined ||
  //     availableTime === "0"
  //   ) {
  //     setisActive(false);
  //   } else {
  //     setisActive(true);
  //     setlastDay();
  //   }
  // }, [availableTime]);

  let id = Math.random().toString(36);

  const windowSize = useWindowSize();
  const [tooltip, setTooltip] = useState(false);
  const [tooltip2, setTooltip2] = useState(false);

  return (
    <div className="main-wrapper py-4 w-100">
      <div className="row justify-content-center gap-3 gap-lg-0">
        <div className="position-relative px-0 px-lg-3 col-12">
          <div
            className={` ${
              isVerified &&
              email &&
              address?.toLowerCase() === coinbase?.toLowerCase() && !isPremium &&
              "user-cardImg-active"
            } ${
              isVerified &&
              email &&
              address?.toLowerCase() === coinbase?.toLowerCase() && isPremium &&
              "user-cardImg-active-premium"
            } ${
              address &&
              email &&
              coinbase &&
              syncStatus !== "" &&
              address?.toLowerCase() !== coinbase?.toLowerCase() &&
              "user-cardImg-alert"
            }  user-cardImg`}
          >
            <div
              className={`bordereddiv ${
                email && coinbase && username ? "" : "border-bottom-0"
              }`}
            >
              <div className="d-flex flex-column flex-xxl-row flex-lg-row justify-content-between gap-2 align-items-start align-items-lg-center align-items-md-center">
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    {(coinbase && !email) ||
                    (!coinbase && !email) ||
                    (coinbase && email && !address && !username) ||
                    !address ? (
                      <img src={defaultAvatar} alt="" className="userAvatar" />
                    ) : null}
                    {address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address?.toLowerCase() === coinbase?.toLowerCase() && !isPremium && (
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="userAvatar"
                        />
                      )}
                         {address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address?.toLowerCase() === coinbase?.toLowerCase() && isPremium && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}
                    {address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address?.toLowerCase() !== coinbase?.toLowerCase() && (
                        <img
                          src={defaultAvatarAlert}
                          alt=""
                          className="userAvatar-alert"
                        />
                      )}

                    {isVerified && email ? (
                      <div className="d-flex flex-column gap-1">
                        <span className="usernametext font-organetto d-flex flex-column flex-lg-row flex-md-row align-items-start align-items-lg-center align-items-md-center gap-2">
                          {username}
                          {isPremium && (
                            <span
                              className={`${
                                address &&
                                email &&
                                coinbase &&
                                syncStatus !== "" &&
                                address?.toLowerCase() ===
                                  coinbase?.toLowerCase() &&
                                "premiumtext-active"
                              } ${
                                address &&
                                email &&
                                coinbase &&
                                syncStatus !== "" &&
                                address?.toLowerCase() !==
                                  coinbase?.toLowerCase() &&
                                "premiumtext-alert"
                              } d-flex align-items-center gap-1`}
                            >
                              {address &&
                                email &&
                                coinbase &&
                                syncStatus !== "" &&
                                address?.toLowerCase() ===
                                  coinbase?.toLowerCase() && (
                                  <img src={starActive} />
                                )}
                              {address &&
                                email &&
                                coinbase &&
                                syncStatus !== "" &&
                                address?.toLowerCase() !==
                                  coinbase?.toLowerCase() && (
                                  <img src={starAlert} />
                                )}
                              Premium
                            </span>
                          )}
                        </span>
                        <span className="emailtext">{email}</span>
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-1 col-lg-7">
                        <span className="usernametext font-organetto">
                          Start your journey now!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="wallet-balance d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-3 position-relative">
                  <>
                    <Clipboard
                      component="div"
                      data-event="click"
                      data-for={id}
                      data-tip="Copied To Clipboard!"
                      data-clipboard-text={address}
                      className={`${
                        isVerified &&
                        email &&
                        address?.toLowerCase() === coinbase?.toLowerCase() && !isPremium &&
                        "wallet-wrapper-active d-flex"
                      } ${
                        isVerified &&
                        email &&
                        address?.toLowerCase() === coinbase?.toLowerCase() && isPremium &&
                        "wallet-wrapper-active-premium d-flex"
                      } ${
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase() &&
                        "wallet-wrapper-alert d-flex"
                      } ${
                        (coinbase && email && !address && !username) ||
                        (coinbase && email && !address && username) ||
                        (!email && !coinbase && "d-none")
                      }  wallet-wrapper align-items-center gap-2 position-relative`}
                    >
                      {(coinbase || address) && (
                        <img src={walletIcon} alt="" className="wallet-icon" />
                      )}
                      <div className="d-flex flex-column">
                        <span className="wallet-span d-flex align-items-center gap-2">
                          {coinbase && address && email
                            ? "Game Wallet address"
                            : coinbase && !email
                            ? "Wallet address"
                            : !coinbase && address && email
                            ? "Game Wallet address"
                            : ""}
                          {coinbase && (
                            <img
                              src={copyIcon}
                              alt="copy"
                              className="copy-icon"
                            />
                          )}
                        </span>

                        <div
                          className="d-flex align-items-center gap-2"
                          onClick={() => {
                            setTooltip(true);
                            setTimeout(() => setTooltip(false), 1000);
                          }}
                        >
                          <span className="wallet-address">
                            {windowSize.width > 991
                              ? isVerified && email
                                ? address
                                : coinbase
                              : isVerified && email
                              ? shortAddress(address)
                              : shortAddress(coinbase)}
                          </span>
                        </div>
                      </div>
                    </Clipboard>

                    <div
                      className={`tooltip-wrapper p-2 ${
                        tooltip && "tooltip-active"
                      }`}
                      style={{ top: "auto", right: 0 }}
                    >
                      <p className="tooltip-content m-0">Copied!</p>
                    </div>
                  </>
                  {!coinbase && (
                    <button
                      className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                      onClick={() => {
                        handleShowWalletPopup();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      <img src={blackWallet} alt="" style={{ width: 18 }} />
                      Connect wallet
                    </button>
                  )}

                  {coinbase && address && !email && (
                    <button
                      className="d-flex px-3 py-1 align-items-center gap-2 signinbtn"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      Sign in
                      <img src={greenarrow} alt="" />
                    </button>
                  )}

                  {coinbase && !email && !address && !username && (
                    <button
                      className="d-flex px-3 py-1 align-items-center gap-2 signinbtn"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      Sign in
                      <img src={greenarrow} alt="" />
                    </button>
                  )}

                  {coinbase && email && !address && !username && (
                    <button
                      className="d-flex px-3 py-1 align-items-center signinbtn"
                      onClick={() => {
                        onSigninClick();
                      }}
                      style={{ width: "fit-content", fontSize: 14 }}
                    >
                      Create player
                      <img src={greenarrow} alt="" />
                    </button>
                  )}

                  {coinbase && email && username && !address && (
                    <div
                      className="walletconnectBtn w-100"
                      onClick={onLinkWallet}
                    >
                      <div className="d-flex gap-2 justify-content-between align-items-center">
                        <div className="d-flex gap-2 align-items-center">
                          <img src={walletImg} alt="" />
                          <div className="d-flex flex-column">
                            <span className="secondTitle">Connect wallet</span>

                            <span className="firsttitle">Link your wallet</span>
                          </div>
                        </div>
                        <img src={circleArrow} alt="" />
                      </div>
                    </div>
                  )}

                  {/* : 
                 (
                  <>
                     <Clipboard
                  //     component="div"
                  //     data-event="click"
                  //     data-for={id}
                  //     data-tip="Copied To Clipboard!"
                  //     data-clipboard-text={address}
                  //     className="wallet-wrapper d-flex align-items-center gap-2"
                  //     onClick={() => {
                  //       setTooltip(true);
                  //       setTimeout(() => setTooltip(false), 1000);
                  //     }}
                  //   >
                  //     <img src={walletIcon} alt="" className="wallet-icon" />
                  //     <div className="d-flex flex-column">
                  //       <span className="wallet-span">Wallet address</span>
                  //       <div className="d-flex align-items-center gap-2">
                  //         <span className="wallet-address">
                  //           {shortAddress(address)}
                  //         </span>
                  //         <img
                  //           src={copyIcon}
                  //           alt="copy"
                  //           className="copy-icon"
                  //         />
                  //       </div>
                  //     </div>
                    </Clipboard>
                    <div
                      className={`tooltip-wrapper p-2 ${
                        tooltip && "tooltip-active"
                      }`}
                      style={{ top: "auto", right: 0 }}
                    >
                      <p className="tooltip-content m-0">Copied!</p>
                    </div>
                  </>
                ) */}

                  {/* {!address ? (
                  <span className="walletinfo">
                    *Note that once you link a wallet to your profile, it cannot
                    be changed.
                  </span>
                ) : (
                  <span className="walletinfo">
                    *This wallet is associated to your profile and cannot be
                    changed.
                  </span>
                )} */}
                </div>
                {/* {availableTime !== "0" && availableTime && availableTime!==undefined &&  (
            <div className="d-flex flex-column">
            <span className="emailtext" style={{color: '#ffbf00'}}>*Golden Pass</span>
            <span className="emailtext" style={{color: '#00FECF'}}>{remainingTime} (GMT + 2)</span>

            </div>
          )} */}
              </div>
            </div>
            <div
              className={`bordereddiv border-0 ${
                email && coinbase && username ? "py-2" : "p-0"
              }`}
            >
              <div className="d-flex flex-column flex-xxl-row flex-lg-row  align-items-center justify-content-between gap-2">
                {address &&
                  email &&
                  coinbase &&
                  syncStatus !== "" &&
                  address.toLowerCase() !== coinbase.toLowerCase() && (
                    <div className="sync-wrapper">
                      <div className="d-flex gap-2 align-items-center">
                        <img
                          src={triangle}
                          alt=""
                          style={{ width: "21px", height: "20px" }}
                        />
                        <span className="sync-txt">
                          Your gaming account is not linked to the wallet you
                          connected. To update the game wallet address, press
                          the synchronize button.
                        </span>
                      </div>
                    </div>
                  )}
                {address &&
                  coinbase &&
                  email &&
                  address?.toLowerCase() === coinbase?.toLowerCase() && (
                    <p className="walletassoc-txt m-0">
                      *This wallet is associated to your game account.
                    </p>
                  )}

                {!address && coinbase && email && username && (
                  <p className="walletassoc-txt m-0">
                    *There is no wallet address associated with your game
                    account.
                    <br /> Link your wallet to finish setup.
                  </p>
                )}

                <div
                  className="d-flex align-items-center gap-2"
                  style={{
                    width: "fit-content",
                    justifyContent:
                      address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address.toLowerCase() !== coinbase.toLowerCase()
                        ? "space-between"
                        : "",
                  }}
                >
                  {address &&
                    email &&
                    coinbase &&
                    syncStatus !== "" &&
                    address.toLowerCase() !== coinbase.toLowerCase() && (
                      <button
                        className="d-flex align-items-center gap-1 syncbtn"
                        onClick={onSyncClick}
                      >
                        <img
                          src={sync}
                          alt=""
                          className={syncStatus === "loading" && "syncicon"}
                        />{" "}
                        {syncStatus === "initial"
                          ? "Synchronize"
                          : syncStatus === "loading"
                          ? "Synchronising..."
                          : syncStatus === "success"
                          ? "Success"
                          : "Error"}
                      </button>
                    )}
                  {address && email && coinbase && (
                    <button
                      className="logoutbtn px-3 py-1"
                      onClick={onLogoutClick}
                    >
                      <img src={logouticon} alt="" /> Log Out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="explorebanner col-12 col-lg-7 col-xxl-7 position-relative">
          <div className="d-flex flex-column gap-2 justify-content-center h-100">
            <div className="orangesection">
              <span>World of Dypians</span>
            </div>
            <div className="col-lg-7 col-xxl-7">
              <h5 className="explore-title">
                Explore an exciting digital world
              </h5>
            </div>
          </div>
          <img
            src={player}
            alt=""
            className="position-absolute playerimg"
            style={{
              height:
                address &&
                email &&
                coinbase &&
                syncStatus !== "" &&
                address.toLowerCase() !== coinbase.toLowerCase()
                  ? "450px"
                  : "",
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
