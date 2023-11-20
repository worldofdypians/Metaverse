import React, { useEffect, useState } from "react";

import "react-tooltip/dist/react-tooltip.css";
import "./_profilecard.scss";
import defaultAvatar from "../../Images/userProfile/default-avatar.png";
import defaultAvatarAlert from "../../Images/userProfile/default-avatar-alert.png";
import defaultAvatarPremium from "../../Images/userProfile/defaultAvatarPremium.png";
import defaultAvatarPremiumAlert from "../../Images/userProfile/defaultAvatarPremiumAlert.png";

import genesisRankImg from "../WalletBalance/newAssets/genesisRank.svg";
import globalRank from "../WalletBalance/newAssets/globalRank.svg";
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
import axios from "axios";
import Countdown from "react-countdown";
import { dyp700Address } from "../../web3";
import { DYP_700_ABI } from "../../web3/abis";
import becomePremium from "./assets/becomePremium.svg";

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
  isConnected,
  onOpenLeaderboard,
  onPremiumClick,
  handleSetAvailableTime,
}) => {
  // const [dailyrecords, setRecords] = useState([]);

  const [userRank, setUserRank] = useState("");
  const [genesisRank, setGenesisRank] = useState("");
  // const [countdown, setcountdown] = useState();
  // const [isactive, setisActive] = useState(false);
  // const [remainingTime, setRemainingTime] = useState("");

  const fetchMonthlyRecordsAroundPlayer = async () => {
    const data = {
      StatisticName: "MonthlyLeaderboard",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    setUserRank(testArray[0].position);
  };

  const increaseBundle = async () => {
    const result = await axios.get(
      `https://api3.dyp.finance/api/bundles/count/${address}`
    );

    const result_formatted = result.data.count;
    if (result_formatted <= 4) {
      if (parseInt(result_formatted) === 0) {
        setbundlesBought(0);
      } else if (parseInt(result_formatted) === 1) {
        setbundlesBought(1);
      } else if (parseInt(result_formatted) === 2) {
        setbundlesBought(2);
      } else if (parseInt(result_formatted) === 3) {
        setbundlesBought(3);
      } else if (parseInt(result_formatted) === 4) {
        setbundlesBought(4);
      }
    }
  };

  const fetchGenesisAroundPlayer = async () => {
    const data = {
      StatisticName: "GenesisLandRewards",
      MaxResultsCount: 6,
      PlayerId: userId,
    };
    const result = await axios.post(
      `https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/GetLeaderboardAroundPlayer`,
      data
    );

    var testArray = result.data.data.leaderboard.filter(
      (item) => item.displayName === username
    );

    setGenesisRank(testArray[0].position);
  };

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

  useEffect(() => {
    fetchMonthlyRecordsAroundPlayer();
    fetchGenesisAroundPlayer();
  }, []);

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
  const [countdown700, setcountdown700] = useState();
  const [bundlesBought, setbundlesBought] = useState(0);
  const [dateofBundle, setdateofBundle] = useState(0);
  const [datewhenBundleBought, setdatewhenBundleBought] = useState(0);
  const [bundleExpireDay, setbundleExpireDay] = useState(0);
  const [bundleExpireMiliseconds, setbundleExpireMiliseconds] = useState(0);
  const [lastDayofBundleHours, setlastDayofBundleHours] = useState(0);
  const [lastDayofBundleMinutes, setlastDayofBundleMinutes] = useState(0);
  const [lastDayofBundleMilliseconds, setlastDayofBundleMilliseconds] =
    useState(0);
  const [lastDayofBundle, setlastDayofBundle] = useState(0);

  let oneNovember = new Date("2023-11-01 11:11:00 GMT+02:00");
  let oneDecember = new Date("2023-12-01 11:11:00 GMT+02:00");

  const handleRefreshCountdown700 = async () => {
    const goldenpassAbi = new window.bscWeb3.eth.Contract(
      DYP_700_ABI,
      dyp700Address
    );
    const remainingTime = await goldenpassAbi.methods
      .getTimeOfExpireBuff(address)
      .call();

    const remainingTime_miliseconds = remainingTime * 1000;
    const timeofDeposit = await goldenpassAbi.methods
      .getTimeOfDeposit(address)
      .call();
    if (timeofDeposit !== 0) {
      const timeofDeposit_miliseconds = timeofDeposit * 1000;

      const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(remainingTime_miliseconds);

      const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
      const timeofDeposit_day = timeofDeposit_Date_formatted.getDate();
      const timeofDeposit_Hours = timeofDeposit_Date_formatted.getHours();
      const timeofDeposit_Minutes = timeofDeposit_Date_formatted.getMinutes();
      const finalHours = timeofDeposit_Hours - 11;

      const finalMinutes = timeofDeposit_Minutes - 11;

      const result = remainingTime - finalHours * 60 * 60 - finalMinutes * 60;

      setcountdown700(result * 1000);
      handleSetAvailableTime(result * 1000);
    } else {
      setcountdown700();
      handleSetAvailableTime();
    }
  };

  const checkBundleDates = async () => {
    //you can check how many bundles the user has bought
    //he can buy until the 22 regular bundles (7days)
    //on the 23rd the bundle will be 7+4
    //last week rule: 32 - date => buy on 24rth=>7+1, 25=> 7+0, 26=> 7-1

    const week1 = ["1", "2", "3", "4", "5", "6", "7"];
    const week2 = ["8", "9", "10", "11", "12", "13", "14"];
    const week3 = ["15", "16", "17", "18", "19", "20", "21"];
    const week4 = ["22", "23", "24", "25"];
    const goldenpassAbi = new window.bscWeb3.eth.Contract(
      DYP_700_ABI,
      dyp700Address
    );

    const timeofDeposit = await goldenpassAbi.methods
      .getTimeOfDeposit(address)
      .call();
    const timeofDeposit_miliseconds = timeofDeposit * 1000;

    const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timeofDeposit_miliseconds);

    const today = new Date();
    const today_date = today.getDate();

    const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
    const timeofDeposit_date = timeofDeposit_Date_formatted
      .getDate()
      .toString();

    if (today_date <= 25) {
      if (week1.includes(today_date.toString()) && bundlesBought <= 3) {
        handleRefreshCountdown700();
      } else if (week1.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime_day = bundleExpireDay;
        // const remainingTime_miliseconds = bundleExpireMiliseconds;

        // if (parseInt(remainingTime_day) >= 25) {
        //   const additional_remainingTime_time = 31 - remainingTime_day;
        //   const additional_remaining_time_timestamp =
        //     additional_remainingTime_time * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;

        //   const final =
        //     Number(remainingTime_miliseconds) +
        //     Number(additional_remaining_time_timestamp * 1000);

        setcountdown700(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );
        handleSetAvailableTime(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );

        // }
      } else if (week2.includes(today_date.toString()) && bundlesBought <= 3) {
        handleRefreshCountdown700();
      } else if (week2.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime2 = lastDayofBundle;
        // if (parseInt(remainingTime2) >= 25) {
        //   const additional_remainingTime_time2 = 31 - remainingTime2;
        //   const additional_remaining_time_timestamp2 =
        //     additional_remainingTime_time2 * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;
        //   const remainingTime_miliseconds2 = bundleExpireMiliseconds;

        //   const final =
        //     Number(remainingTime_miliseconds2) +
        //     Number(additional_remaining_time_timestamp2 * 1000);

        setcountdown700(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );
        handleSetAvailableTime(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );

        // }
      } else if (week3.includes(today_date.toString()) && bundlesBought <= 3) {
        handleRefreshCountdown700();
      } else if (week3.includes(today_date.toString()) && bundlesBought > 3) {
        // const remainingTime3 = lastDayofBundle;
        // const remainingTime_miliseconds3 = bundleExpireMiliseconds;

        // if (parseInt(remainingTime3) >= 25) {
        //   const additional_remainingTime_time3 = 31 - remainingTime3;
        //   const additional_remaining_time_timestamp3 =
        //     additional_remainingTime_time3 * 24 * 60 * 60 -
        //     lastDayofBundleHours * 60 * 60 -
        //     lastDayofBundleMinutes * 60;

        //   const final =
        //     Number(remainingTime_miliseconds3) +
        //     Number(additional_remaining_time_timestamp3 * 1000);

        //   setcountdown700(final);
        //   handleSetAvailableTime(final);
        setcountdown700(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );
        handleSetAvailableTime(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );

        // }
      } else if (week4.includes(today_date.toString()) && today_date <= 22) {
        handleRefreshCountdown700();
      } else if (week4.includes(today_date.toString()) && today_date > 22) {
        if (today < dateofBundle) {
          if (bundlesBought <= 3 && datewhenBundleBought < today_date) {
            setcountdown700(dateofBundle);
            handleSetAvailableTime(dateofBundle);
          } else {
            setcountdown700(
              today < oneNovember
                ? oneNovember.getTime()
                : oneDecember.getTime()
            );
            handleSetAvailableTime(
              today < oneNovember
                ? oneNovember.getTime()
                : oneDecember.getTime()
            );
          }
        } else if (today > dateofBundle && bundlesBought > 0) {
          setcountdown700();
          handleSetAvailableTime();
        }
      }
    } else if (today_date > 25) {
      if (today < dateofBundle) {
        setcountdown700(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );
        handleSetAvailableTime(
          today < oneNovember ? oneNovember.getTime() : oneDecember.getTime()
        );
      } else {
        setcountdown700();
        handleSetAvailableTime();
      }
    }
  };
  const setlastDay = async () => {
    const goldenpassAbi = new window.bscWeb3.eth.Contract(
      DYP_700_ABI,
      dyp700Address
    );
    const timeofDeposit = await goldenpassAbi.methods
      .getTimeOfDeposit(address)
      .call();

    const expiringTime = await goldenpassAbi.methods
      .getTimeOfExpireBuff(address)
      .call();

    const expiringTime_miliseconds = expiringTime * 1000;

    const expiringTime_Date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(expiringTime_miliseconds);

    const expiringTime_Date_formatted = new Date(expiringTime_Date);
    const expiringTime_day = expiringTime_Date_formatted.getDate();
    setbundleExpireDay(expiringTime_day);
    setbundleExpireMiliseconds(expiringTime_miliseconds);
    const timeofDeposit_miliseconds = timeofDeposit * 1000;

    const timeofbundleBought_Date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timeofDeposit_miliseconds);

    const timeofDeposit_Date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(expiringTime_miliseconds);

    const timeofDeposit_Date_formatted = new Date(timeofDeposit_Date);
    const timeofbundleBought_Date_formatted = new Date(timeofbundleBought_Date);

    setdateofBundle(expiringTime_Date_formatted);

    const timeofDeposit_day = timeofDeposit_Date_formatted.getDate();
    const timeofbundleBought_day = timeofbundleBought_Date_formatted.getDate();
    setdatewhenBundleBought(timeofbundleBought_day);

    const timeofDeposit_Hours = timeofDeposit_Date_formatted.getHours();
    const timeofDeposit_Minutes = timeofDeposit_Date_formatted.getMinutes();
    const final = timeofDeposit_Hours - 11;
    setlastDayofBundleHours(final);

    const finalMinutes = timeofDeposit_Minutes - 11;

    setlastDayofBundleMinutes(finalMinutes);
    setlastDayofBundle(timeofDeposit_day);
    setlastDayofBundleMilliseconds(expiringTime_miliseconds);
  };

  useEffect(() => {
    checkBundleDates();
    setlastDay();
  }, []);

  return (
    <div className="main-wrapper py-4 w-100">
      {countdown700 !== 0 && countdown700 && (
        <Countdown
          date={Number(countdown700)}
          onComplete={() => {
            setcountdown700();
            handleSetAvailableTime();
          }}
        />
      )}
      <div className="row justify-content-center gap-3 gap-lg-0">
        <div className="position-relative px-lg-3 col-12">
          <div
            className={` ${
              isVerified &&
              email &&
              address?.toLowerCase() === coinbase?.toLowerCase() &&
              !isPremium &&
              "user-cardImg-active"
            } ${
              isVerified &&
              email &&
              syncStatus !== "" &&
              isPremium &&
              "user-cardImg-active-premium"
            }  user-cardImg`}
          >
            <div
              className={`bordereddiv ${
                email && coinbase && username ? "" : "border-bottom-0"
              }`}
            >
              <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row flex-sm-row  justify-content-between gap-2 align-items-start align-items-lg-center align-items-md-center">
                <div className="d-flex gap-2 justify-content-between align-items-center  w-100">
                  <div className="d-flex align-items-center gap-2 w-100">
                    {(coinbase && !email) ||
                    (!coinbase && !email) ||
                    (coinbase && email && !address && !username) ||
                    (!coinbase && email && address && username && !isPremium) ||
                    !address ? (
                      <img src={defaultAvatar} alt="" className="userAvatar" />
                    ) : null}
                    {address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address?.toLowerCase() === coinbase?.toLowerCase() &&
                      !isPremium && (
                        <img
                          src={defaultAvatar}
                          alt=""
                          className="userAvatar"
                        />
                      )}
                    {address &&
                      email &&
                      syncStatus !== "" &&
                      isPremium &&
                      !coinbase && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}
                    {address &&
                      email &&
                      syncStatus !== "" &&
                      isPremium &&
                      coinbase && (
                        <img
                          src={defaultAvatarPremium}
                          alt=""
                          className="userAvatarPremium"
                        />
                      )}

                    {isVerified && email ? (
                      <div className="d-flex flex-column gap-1 w-100">
                        <span className="usernametext font-organetto d-flex flex-column flex-lg-row flex-md-row align-items-start align-items-lg-center align-items-md-center gap-2">
                          {username}
                          {/* {isPremium && (
                            <span
                              className={`${
                                address && email && "premiumtext-active"
                              }  d-flex align-items-center gap-1`}
                            >
                              {address && email && isPremium && (
                                <img src={starActive} />
                              )}
                              Premium
                            </span>
                          )} */}
                          {/* {!isPremium && email && (
                            <span
                              className="profile-div-title mb-0 text-decoration-underline"
                              style={{
                                color:
                                  coinbase &&
                                  syncStatus !== "" &&
                                  address?.toLowerCase() !==
                                    coinbase?.toLowerCase()
                                    ? "#ED8225"
                                    : "#1BF5FF",
                                cursor: "pointer",
                              }}
                              onClick={onPremiumClick}
                            >
                              Upgrade to Premium
                            </span>
                          )} */}
                        </span>

                        <div className="wallet-balance d-flex flex-column flex-xxl-row flex-lg-row gap-3 position-relative">
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
                                address?.toLowerCase() ===
                                  coinbase?.toLowerCase() &&
                                !isPremium &&
                                "wallet-wrapper-active d-flex bg-transparent p-0"
                              } ${
                                isVerified &&
                                email &&
                                syncStatus === "initial" &&
                                isPremium &&
                                "wallet-wrapper-active-premium d-flex bg-transparent p-0"
                              } ${
                                address &&
                                email &&
                                coinbase &&
                                syncStatus !== "" &&
                                address.toLowerCase() !==
                                  coinbase.toLowerCase() &&
                                "wallet-wrapper-alert d-flex"
                              } ${
                                (coinbase && email && !address && !username) ||
                                (coinbase && email && !address && username) ||
                                (!email && !coinbase && "d-none")
                              }  d-flex wallet-wrapper align-items-center gap-2 position-relative`}
                            >
                              {/* {(coinbase || address) && (
                        <img src={walletIcon} alt="" className="wallet-icon" />
                      )} */}
                              <div className="d-flex flex-column">
                                {/* <span className="wallet-span d-flex align-items-center gap-2">
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
                        </span> */}

                                <div
                                  className="d-flex flex-column"
                                  onClick={() => {
                                    setTooltip(true);
                                    setTimeout(() => setTooltip(false), 1000);
                                  }}
                                >
                                  <span className="emailtext">{email}</span>
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
                        {!coinbase && email && (
                          <button
                            className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                            onClick={() => {
                              handleShowWalletPopup();
                            }}
                            style={{
                              width: "fit-content",
                              whiteSpace: "nowrap",
                              fontSize: 14,
                            }}
                          >
                            <img
                              src={blackWallet}
                              alt=""
                              style={{ width: 18 }}
                            />
                            Connect wallet
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="d-flex flex-column gap-1 col-lg-7">
                        <span className="usernametext font-organetto">
                          Start your journey now!
                        </span>
                      </div>
                    )}
                  </div>{" "}
                </div>
                {!coinbase && !email && (
                  <button
                    className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
                    onClick={() => {
                      handleShowWalletPopup();
                    }}
                    style={{
                      width: "fit-content",
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    <img src={blackWallet} alt="" style={{ width: 18 }} />
                    Connect wallet
                  </button>
                )}
                {coinbase && address && !email && (
                  <button
                    className="d-flex px-3 py-1 align-items-center gap-2 signinbtn text-nowrap"
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
                    className="d-flex px-3 py-1 align-items-center gap-2 signinbtn text-nowrap"
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

                {email && address && coinbase && !isPremium && (
                  <div
                    className={` wallet-wrapper-active2 hoveractive position-relative
                    d-flex align-items-center position-relative mt-3 mt-lg-0`}
                    onClick={onPremiumClick}
                  >
                    {/* <div className="table-separator position-absolute"></div> */}
                    <h6 className="become-premium-title mb-0">
                      Become a Premium Member
                    </h6>

                    <img
                      src={becomePremium}
                      alt=""
                      className="become-premium-img"
                    />
                  </div>
                )}
                {email && address && (
                  <div
                    className={`${
                      isPremium
                        ? "wallet-wrapper-active-premium hoverpremium"
                        : "wallet-wrapper-active hoveractive"
                    }
                    position-relative
                    d-flex flex-column align-items-center position-relative mt-3 mt-lg-0`}
                    onClick={onOpenLeaderboard}
                  >
                    {countdown700 && (
                      <div className="golden-pass-wrapper"></div>
                    )}
                    {countdown700 && (
                      <img
                        src={require("./assets/goldenPassTag.png")}
                        alt=""
                        className="golden-pass-tag d-flex d-lg-none"
                      />
                    )}
                    {/* <div className="table-separator position-absolute"></div> */}
                    <h6
                      className="profile-div-title mb-0"
                      style={{ fontSize: "10px" }}
                    >
                      Leaderboard
                    </h6>
                    <div className="d-flex align-items-center gap-4">
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={globalRank}
                          alt=""
                          style={{ width: 27, height: 27 }}
                        />
                        <span className="  profile-rank mb-0">
                          #{userRank + 1}
                        </span>
                        {/* <span className="font-iceland profile-rank mb-0">
                        Global
                      </span> */}
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={genesisRankImg}
                          alt=""
                          style={{ width: 27, height: 27 }}
                        />
                        <span className="  profile-rank mb-0">
                          #{genesisRank + 1}
                        </span>
                        {/* <span className="font-iceland profile-rank mb-0">
                        Genesis
                      </span> */}
                      </div>
                    </div>
                  </div>
                )}
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
                        <span className="premiumtext-alert">
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
