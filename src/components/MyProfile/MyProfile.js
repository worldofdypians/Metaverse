import React, { useEffect, useState } from "react";
import "./_myprofile.scss";

import domainIcon from "./assets/domainIcon.svg";
import errordomainIcon from "./assets/errordomainIcon.svg";

import chainsFlag from "./assets/chainsFlag2.svg";
import chainsIcon from "./assets/chainsIcon.svg";
import globalFlag from "./assets/globalFlag2.svg";
import globalIcon from "./assets/globalIcon2.png";
import landFlag from "./assets/landFlag2.svg";
import landIcon from "./assets/landIcon.svg";

import redArrow from "./assets/redArrow.svg";
import cyanArrow from "./assets/cyanArrow.svg";
import pinkArrow from "./assets/pinkArrow.svg";

import mageStarter from "../../screens/Account/src/Components/WalletBalance/assets/mageStarter.png";
import mageGoing from "../../screens/Account/src/Components/WalletBalance/assets/mageGoing.png";
import mageFinish from "../../screens/Account/src/Components/WalletBalance/assets/mageFinish.png";
import readyBorder from "../../screens/Account/src/Components/WalletBalance/newAssets/readyBorder2.svg";
import sync from "../../screens/Account/src/Components/ProfileCard/assets/sync.svg";

import stakeNft from "./assets/stakeNft.png";
import myRewardsMiner from "./assets/myRewardsMiner.png";
import Countdown from "react-countdown";
import treasureHuntInactive from "./assets/treasureHuntInactive.png";
import treasureHuntActive from "./assets/treasureHuntActive.png";
import dragonRuinsInactive from "./assets/dragonRuinsInactive.png";
import dragonRuinsActive from "./assets/dragonRuinsActive.png";
import goldenPassInactive from "./assets/goldenPassInactive.png";
import goldenPassActive from "./assets/goldenPassActive.png";
import dailyBonusInactive from "./assets/dailyBonusInactive.png";
import dailyBonusActive from "./assets/dailyBonusActive.png";
import scorpionKingInactive from "./assets/scorpionKingInactive.png";
import scorpionKingActive from "./assets/scorpionKingActive.png";
import criticalHitInactive from "./assets/criticalHitInactive.png";
import criticalHitActive from "./assets/criticalHitActive.png";
import puzzleMadnessInactive from "./assets/puzzleMadnessInactive.png";
import puzzleMadnessActive from "./assets/puzzleMadnessActive.png";
import mazeGardenInactive from "./assets/mazeGardenInactive.png";
import mazeGardenActive from "./assets/mazeGardenActive.png";
import premiumDummy from "./assets/premiumDummy.png";
import dummyDragon from "./assets/dummyDragon.png";
import dummyCaws from "./assets/dummyCaws.png";
import doneTag from "./assets/doneTag.svg";
import emptyTag from "./assets/emptyTag.svg";
import portfolio from "./assets/portfolio.svg";
import starterProfile from "./assets/starterProfile.png";
import rookieProfile from "./assets/rookieProfile.png";
import underdogProfile from "./assets/underdogProfile.png";
import championProfile from "./assets/championProfile.png";
import unstoppableProfile from "./assets/unstoppableProfile.png";

import starterProfilePremium from "./assets/starterProfilePremium.png";
import rookieProfilePremium from "./assets/rookieProfilePremium.png";
import underdogProfilePremium from "./assets/underdogProfilePremium.png";
import championProfilePremium from "./assets/championProfilePremium.png";
import unstoppableProfilePremium from "./assets/unstoppableProfilePremium.png";
import errorChain from "./assets/errorchain.svg";

import { shortAddress } from "../../screens/Caws/functions/shortAddress";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { NavLink } from "react-router-dom";

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-center gap-1">
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0" style={{ fontSize: "10px" }}>
            {days < 10 ? "0" + days : days}
          </h6>
          <span className="profile-time-desc mb-0" style={{ fontSize: "8px" }}>
            Days
          </span>
        </div>
        <h6 className="profile-time-number mb-0" style={{ fontSize: "10px" }}>
          :
        </h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0" style={{ fontSize: "10px" }}>
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span className="profile-time-desc mb-0" style={{ fontSize: "8px" }}>
            Hours
          </span>
        </div>
        <h6 className="profile-time-number mb-0" style={{ fontSize: "10px" }}>
          :
        </h6>
        <div className="d-flex flex-column align-items-center">
          <h6 className="profile-time-number mb-0" style={{ fontSize: "10px" }}>
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span className="profile-time-desc mb-0" style={{ fontSize: "8px" }}>
            Minutes
          </span>
        </div>
      </div>
    </>
  );
};

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m (UTC)
    </h6>
  );
};

const MyProfile = ({
  claimedChests,
  claimedPremiumChests,
  openedSkaleChests,
  openedCoreChests,
  openedVictionChests,
  canBuy,
  email,
  isPremium,
  username,
  address,
  coinbase,
  totalScore,
  openChainsLeaderboard,
  openGlobalLeaderboard,
  openGenesisLeaderboard,
  openMyRewards,
  openDailyBonus,
  openPortfolio,
  openSpecialRewards,
  userRankName,
  isConnected,
  onConnectWallet,
  onOpenRankPopup,
  onDomainClick,
  domainName,
  liveRewards,
  openedChests,
  specialRewards,
  syncStatus,
  onSyncClick,
}) => {
  const totalClaimedChests =
    claimedChests +
    claimedPremiumChests +
    openedSkaleChests.length +
    openedCoreChests.length +
    openedVictionChests.length;

  const chestPercentage = (totalClaimedChests / 80) * 100;

  let now = new Date().getTime();
  const midnight = new Date(now).setUTCHours(24, 0, 0, 0);

  const [allEvents, setAllEvents] = useState(false);
  const [finished, setFinished] = useState(false);
  const [treasureRewardMoney, setTreasureRewardMoney] = useState(0);

  const getTreasureChestsInfo = async () => {
    var moneyResult = 0;

    if (openedChests && openedChests.length > 0) {
      openedChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedSkaleChests && openedSkaleChests.length > 0) {
      openedSkaleChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedCoreChests && openedCoreChests.length > 0) {
      openedCoreChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    if (openedVictionChests && openedVictionChests.length > 0) {
      openedCoreChests.forEach((chest) => {
        if (chest.isOpened === true) {
          if (chest.rewards.length > 1) {
            chest.rewards.forEach((innerChest) => {
              if (
                innerChest.rewardType === "Money" &&
                innerChest.status !== "Unclaimed" &&
                innerChest.status !== "Unclaimable" &&
                innerChest.status === "Claimed"
              ) {
                moneyResult += Number(innerChest.reward);
              }
            });
          }
        }
      });
    }

    setTreasureRewardMoney(moneyResult);
  };

  useEffect(() => {
    if (canBuy && email) {
      setFinished(false);
    } else if (!canBuy && email) {
      setFinished(true);
    } else if (!email) {
      setFinished(false);
    }
  }, [claimedChests, claimedPremiumChests, isPremium, canBuy, email]);

  useEffect(() => {
    getTreasureChestsInfo();
  }, [openedChests, openedSkaleChests, openedCoreChests, openedVictionChests]);

  return (
    <div className="custom-container mt-5">
      <div className="row mt-4 mt-lg-0">
        <div className="col-12 col-lg-4">
          <div className="profile-card-wrapper p-3 d-flex flex-column justify-content-between h-100">
            <div className="d-flex align-items-center gap-2">
              <div
                className="position-relative"
                style={{ cursor: "pointer" }}
                onClick={onOpenRankPopup}
              >
                <img
                  className="new-profile-img"
                  src={
                    userRankName.name === "starter"
                      ? isPremium
                        ? starterProfilePremium
                        : starterProfile
                      : userRankName.name === "rookie"
                      ? isPremium
                        ? rookieProfilePremium
                        : rookieProfile
                      : userRankName.name === "underdog"
                      ? isPremium
                        ? underdogProfilePremium
                        : underdogProfile
                      : userRankName.name === "champion"
                      ? isPremium
                        ? championProfilePremium
                        : championProfile
                      : userRankName.name === "unstoppable"
                      ? isPremium
                        ? unstoppableProfilePremium
                        : unstoppableProfile
                      : starterProfile
                  }
                  alt=""
                />
                <div className="score-text-wrapper d-flex flex-column align-items-center">
                  <h6 className="mb-0">{getFormattedNumber(totalScore, 0)}</h6>
                  <span>Score</span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2 w-100">
                <div className="d-flex align-items-center gap-0">
                  <div
                    className={`d-flex flex-column flex-lg-row align-items-lg-center ${
                      !email
                        ? "justify-content-between w-100"
                        : "justify-content-start"
                    }  gap-2`}
                  >
                    <h6 className="my-profile-username mb-0">
                      {email ? username : "GUEST"}
                    </h6>
                    {!email && coinbase && (
                      <NavLink
                        className="loginbtn-profile px-5 py-2"
                        to="/auth"
                      >
                        Log in
                      </NavLink>
                    )}
                  </div>

                  <span className="current-rank-text text-capitalize">
                    {email ? userRankName.name : ""}
                  </span>
                </div>
                <span className="my-profile-email mb-2">{email}</span>
                <div className="d-flex flex-column flex-lg-row gap-2">
                  <div
                    className={` ${
                      isConnected &&
                      address &&
                      email &&
                      coinbase &&
                      syncStatus !== "" &&
                      address.toLowerCase() !== coinbase.toLowerCase()
                        ? "wallet-address-wrapper-error"
                        : "wallet-address-wrapper"
                    }  w-100 d-flex align-items-center justify-content-between gap-4 p-2`}
                  >
                    <div className="d-flex align-items-center w-100 justify-content-between">
                      <div className="d-flex flex-column">
                        <span className={`profile-wallet-span mb-2`}>
                          Wallet Address
                        </span>
                        <span
                          className={`${
                            isConnected &&
                            address &&
                            email &&
                            coinbase &&
                            syncStatus !== "" &&
                            address.toLowerCase() !== coinbase.toLowerCase()
                              ? "wallet-addr-error"
                              : "wallet-addr"
                          } `}
                        >
                          {email !== undefined
                            ? shortAddress(address)
                            : coinbase
                            ? shortAddress(coinbase)
                            : "--"}
                        </span>
                      </div>
                      { isConnected &&
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase() && <img src={errorChain} alt="" />}
                      {!domainName &&
                        isConnected &&
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() === coinbase.toLowerCase() && (
                          <img
                            src={domainIcon}
                            width={30}
                            height={30}
                            alt=""
                            style={{ cursor: "pointer" }}
                            onClick={onDomainClick}
                          />
                        )}
                      {!domainName &&
                        isConnected &&
                        address &&
                        email &&
                        coinbase &&
                        syncStatus !== "" &&
                        address.toLowerCase() !== coinbase.toLowerCase() && (
                          <img
                            src={errordomainIcon}
                            width={30}
                            height={30}
                            alt=""
                            style={{ cursor: "pointer" }}
                            onClick={onDomainClick}
                          />
                        )}
                    </div>
                  </div>
                  {(isConnected &&
                    address &&
                    email &&
                    coinbase &&
                    syncStatus !== "" &&
                    address.toLowerCase() === coinbase.toLowerCase()) ||
                  (isConnected && !email && coinbase) ? (
                    <div
                      className="portfolio-wrapper d-flex w-100 align-items-center gap-2 p-2"
                      onClick={openPortfolio}
                    >
                      <img src={portfolio} width={25} height={25} alt="" />
                      <h6 className="mb-0">My Portfolio</h6>
                    </div>
                  ) : !isConnected ? (
                    <button
                      className="loginbtn-profile px-5 py-2"
                      onClick={onConnectWallet}
                    >
                      Log in
                    </button>
                  ) : (
                    <button
                      className="d-flex align-items-center gap-1 syncbtn px-3 py-2"
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
                </div>
              </div>
            </div>
            <hr className="sidebar-separator my-2" />
            <div className="daily-progress-wrapper p-3 d-flex flex-column gap-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="progress-line"></div>
                <span className="daily-progress-span">Daily Progress</span>
                <div className="progress-line-2"></div>
              </div>
              <div className="daily-progress-grid">
                <div className="daily-progress-item position-relative">
                  <img src={goldenPassActive} alt="" />
                  <div className="daily-progress-value-golden">
                    <span>25d:12h</span>
                  </div>
                  <img src={doneTag} alt="" className="daily-progress-status" />
                </div>
                <div className="daily-progress-item position-relative">
                  <img src={treasureHuntActive} alt="" />
                  <div className="daily-progress-value">
                    <span>4</span>
                  </div>
                  <img src={doneTag} alt="" className="daily-progress-status" />
                </div>
                <div className="daily-progress-item position-relative">
                  <img src={dragonRuinsActive} alt="" />
                  <div className="daily-progress-value">
                    <span>22</span>
                  </div>
                  <img src={doneTag} alt="" className="daily-progress-status" />
                </div>
                <div className="daily-progress-item position-relative">
                  <img src={scorpionKingInactive} alt="" />
                  <div className="daily-progress-value">
                    <span>0</span>
                  </div>
                  <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  />
                </div>
                <div className="daily-progress-item position-relative">
                  <img src={puzzleMadnessActive} alt="" />
                  <div className="daily-progress-value">
                    <span>13</span>
                  </div>
                  <img src={doneTag} alt="" className="daily-progress-status" />
                </div>

                <div className="daily-progress-item position-relative">
                  <img src={dailyBonusActive} alt="" />
                  <div className="daily-progress-value">
                    <span>54</span>
                  </div>
                  <img src={doneTag} alt="" className="daily-progress-status" />
                </div>
                <div className="daily-progress-item position-relative">
                  <img src={criticalHitInactive} alt="" />
                  <div className="daily-progress-value">
                    <span>0</span>
                  </div>
                  <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  />
                </div>
                <div className="daily-progress-item position-relative">
                  <img src={mazeGardenInactive} alt="" />
                  <div className="daily-progress-value-golden">
                    <span>Sunday</span>
                  </div>
                  <img
                    src={emptyTag}
                    alt=""
                    className="daily-progress-status"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="row ">
            <div className="col-12 col-lg-4">
              {/* <div className="new-special-rewards-wrapper d-flex flex-column gap-4 p-3">
                <h6 className="special-rewards-title">Special Rewards</h6>
                <div className="d-flex align-items-center gap-1">
                  <span className="special-rewards-span">Submit</span>
                  <img src={redArrow} alt="" />
                </div>
              </div> */}
              <div
                className="daily-bonus-wrapper mt-4 mb-5 mt-lg-0 mb-lg-0"
                onClick={openDailyBonus}
              >
                <div className="red-div"></div>
                <img
                  // src={finished ? mageFinish : mageGoing}
                  src={
                    chestPercentage >= 50 && chestPercentage < 100
                      ? mageGoing
                      : chestPercentage === 100
                      ? mageFinish
                      : mageStarter
                  }
                  className={`${"daily-rewards-img"}`}
                  alt=""
                />
                <div className="progress-bar-group d-flex flex-column align-items-start">
                  {!finished && (
                    <span className="progress-bar-title">Progress</span>
                  )}

                  <div className="yellow-progress-outer">
                    <span className="mb-0 chest-progress">
                      {/* {claimedPremiumChests}/10 */}
                      {parseInt(chestPercentage)}%
                    </span>
                    <div
                      className="yellow-progress-inner"
                      style={{ width: `${chestPercentage}%` }}
                      // style={{ width: `35%` }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-between h-100 p-3">
                  <div
                    className="d-flex align-items-center justify-content-between position-relative gap-1"
                    style={{ width: "fit-content" }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="leaderboards-title mb-0">Daily</h6>
                      <h6
                        className="leaderboards-title mb-0"
                        style={{ color: "#FF5EA0" }}
                      >
                        Bonus
                      </h6>
                    </div>
                  </div>

                  <div
                    className="d-flex flex-column align-items-center"
                    style={{ width: "fit-content" }}
                  >
                    <div
                      className="position-relative"
                      style={{
                        width: "96px",
                        height: "40px",
                        right: "0px",
                        bottom: "15px",
                      }}
                    >
                      <span className="ready-to-claim mb-0">
                        {finished ? "Reset Time" : "Ready to Claim"}
                      </span>
                      <img
                        src={readyBorder}
                        alt=""
                        className={`${
                          finished ? "ready-border-2" : "ready-border"
                        }`}
                      />
                    </div>
                    {finished && (
                      <span className="timer-text mb-0">
                        <Countdown date={midnight} renderer={renderer2} />
                      </span>
                    )}
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="game-leaderboards-wrapper position-relative h-100 d-flex align-items-end  align-items-lg-center justify-content-center justify-content-lg-between p-3">
                <div className="d-flex flex-row flex-lg-column gap-2 gap-lg-0">
                  <h6 className="leaderboards-title">Game</h6>
                  <h6
                    className="leaderboards-title mb-0"
                    style={{ color: "#8C56FF" }}
                  >
                    Leaderboards
                  </h6>
                </div>
                <div className="d-flex align-items-center leaderboards-flag-wrapper gap-3">
                  <div
                    className="new-flag-wrapper global-flag"
                    onClick={openGlobalLeaderboard}
                  >
                    <img src={globalFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Global</span>
                      <img src={globalIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                  <div
                    className="new-flag-wrapper chains-flag"
                    onClick={openChainsLeaderboard}
                  >
                    <img src={chainsFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Chains</span>
                      <img src={chainsIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                  <div
                    className="new-flag-wrapper land-flag"
                    onClick={openGenesisLeaderboard}
                  >
                    <img src={landFlag} className="w-100" alt="" />
                    <div className="flag-content d-flex flex-column gap-2 align-items-center">
                      <span className="flag-title">Genesis</span>
                      <img src={landIcon} height={50} width={50} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-3">
              <div
                className="my-rewards-wrapper-new position-relative d-flex flex-column justify-content-between gap-2 p-3"
                onClick={openMyRewards}
              >
                <img src={myRewardsMiner} className="miner-img" alt="" />
                <div className="d-flex align-items-center gap-2">
                  <h6
                    className="special-rewards-title"
                    style={{ color: "#FFF", width: "fit-content" }}
                  >
                    My
                  </h6>
                  <h6
                    className="special-rewards-title"
                    style={{ color: "#35F3FF", width: "fit-content" }}
                  >
                    Rewards
                  </h6>
                </div>
                <div className="d-flex flex-column">
                  <h6
                    className="special-rewards-total mb-0"
                    style={{ color: "#FFE8D2" }}
                  >
                    $
                    {getFormattedNumber(
                      liveRewards + Number(treasureRewardMoney)
                    )}
                  </h6>
                  <span
                    className="special-rewards-total-span"
                    style={{ color: "#FFE8D2" }}
                  >
                    Rewards
                  </span>
                </div>
                <img src={cyanArrow} width={20} height={20} alt="" />
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-3">
              <div
                className="new-special-rewards-wrapper d-flex flex-column justify-content-between gap-2 p-3"
                onClick={openSpecialRewards}
              >
                <h6 className="special-rewards-title">Special Rewards</h6>
                <div className="d-flex flex-column">
                  <h6 className="special-rewards-total mb-0">
                    ${getFormattedNumber(specialRewards)}
                  </h6>
                  <span className="special-rewards-total-span">Rewards</span>
                </div>
                <img src={redArrow} width={20} height={20} alt="" />
              </div>
            </div>
            <div className="col-12 col-lg-8 mt-3">
              <div className="limited-offers-wrapper  d-flex align-items-center justify-content-between gap-3 p-3">
                <div className="d-flex flex-column gap-2">
                  <h6 className="leaderboards-title mb-0">Limited</h6>
                  <h6
                    className="leaderboards-title mb-0"
                    style={{ color: "#00B6FF" }}
                  >
                    Offers
                  </h6>
                </div>
                <div
                  className="d-flex align-items-center justify-content-between gap-4"
                  style={{ height: "140px" }}
                >
                  <div className="limited-offer-card d-flex flex-column justify-content-between">
                    <div className="d-flex w-100 py-1 align-items-center justify-content-center gap-1">
                      <span className="limited-offer-reward">Extra</span>
                      <span
                        className="limited-offer-reward"
                        style={{ color: "#F3C009" }}
                      >
                        200 Stars
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <img
                        src={premiumDummy}
                        className="limited-offer-img"
                        alt=""
                      />
                      <div
                        className="d-flex w-100 py-1 align-items-center justify-content-center gap-1"
                        style={{ background: "#061F33" }}
                      >
                        <span className="limited-offer-purchase">
                          Get Premium
                        </span>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-center">
                      {/* <Countdown renderer={renderer} date={bnbLastDay} /> */}
                    </div>
                  </div>
                  <div className="limited-offer-card d-flex flex-column justify-content-between">
                    <div className="d-flex w-100 py-1 align-items-center justify-content-center gap-1">
                      <span className="limited-offer-reward">Extra</span>
                      <span
                        className="limited-offer-reward"
                        style={{ color: "#F3C009" }}
                      >
                        700 Stars
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <img
                        src={dummyDragon}
                        className="limited-offer-img"
                        alt=""
                      />
                      <div
                        className="d-flex w-100 py-1 align-items-center justify-content-center gap-1"
                        style={{ background: "#061F33" }}
                      >
                        <span className="limited-offer-purchase">
                          Get Dragon Ruins
                        </span>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-center">
                      {/* <Countdown renderer={renderer} date={bnbLastDay} /> */}
                    </div>
                  </div>
                  <div className="limited-offer-card d-flex flex-column justify-content-between">
                    <div className="d-flex w-100 py-1 align-items-center justify-content-center gap-1">
                      <span className="limited-offer-reward">Extra</span>
                      <span
                        className="limited-offer-reward"
                        style={{ color: "#F3C009" }}
                      >
                        1,200 Stars
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <img
                        src={dummyCaws}
                        className="limited-offer-img"
                        alt=""
                      />
                      <div
                        className="d-flex w-100 py-1 align-items-center justify-content-center gap-1"
                        style={{ background: "#061F33" }}
                      >
                        <span className="limited-offer-purchase">Get CAWS</span>
                      </div>
                    </div>
                    <div className="d-flex w-100 justify-content-center">
                      {/* <Countdown renderer={renderer} date={bnbLastDay} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-3">
              <NavLink
                className="new-stake-nft-wrapper d-flex align-items-center justify-content-between p-3"
                to={"/marketplace/stake"}
              >
                <div className="d-flex flex-column justify-content-between h-100">
                  <div className="d-flex flex-column">
                    <h6 className="leaderboards-title">Stake</h6>
                    <h6
                      className="leaderboards-title mb-0"
                      style={{ color: "#FFA1E5" }}
                    >
                      NFT
                    </h6>
                  </div>
                  <img src={pinkArrow} height={20} width={20} alt="" />
                </div>
                <img src={stakeNft} className="new-stake-nft-img" alt="" />
              </NavLink>
            </div>
          </div>
        </div>
        {/* {allEvents &&
        <div className="col-12">
          <div className="all-treasure-wrapper p-3 d-flex align-items-center justify-content-between mt-3">
            <div className="d-flex align-items-center justify-content-between w-100">
              {dummyBetaPassData2.slice(0, 5).map((item, index) => (
                 <div className={` ${item.status === "Expired" ? "new-treasure-hunt-card-expired" : "new-treasure-hunt-card"} p-0 d-flex flex-column`} style={{width: "19%"}}>
                   <div className={`p-2 ${item.status === "Expired" ? "treasure-hunt-top-expired" : "treasure-hunt-top"} d-flex align-items-center justify-content-between`}>
                     <div className="d-flex align-items-center gap-2">
                       <img
                         src={item.logo}
                         width={20}
                         height={20}
                         alt=""
                       />
                       <div className="d-flex flex-column">
                         <span className="treasure-hunt-title">
                           {item.title}
                         </span>
                         <span className="treasure-hunt-rewards">
                           {item.rewards}
                         </span>
                       </div>
                     </div>
                     <div
                       className={`position-relative ${
                         item.eventStatus === "Live"
                           ? "events-page-status-tag-live"
                           : item.eventStatus === "Coming Soon"
                           ? "events-page-status-tag-upcoming"
                           : "events-page-status-tag-expired"
                       } px-2 d-flex align-items-center justify-content-center gap-0`}
                       style={{ top: 0 }}
                     >
                     {item.eventStatus === "Live" &&
                       <div
                       className="pulsatingDot"
                       style={{ width: 7, height: 7, marginRight: 5 }}
                     ></div>
                     }
                       <span>{item.eventStatus}</span>
                     </div>
                   </div>
                   <div className="treasure-hunt-bottom p-2">
                     <div className="treasure-hunt-info d-flex flex-column p-1 gap-1">
                       <div className="d-flex align-items-center justify-content-between">
                         <span className="treasure-hunt-info-span">
                           Type
                         </span>
                         <span
                           className="treasure-hunt-info-span"
                           style={{ color: "#18FFFF" }}
                         >
                           {item.eventType}
                         </span>
                       </div>
                       <div className="d-flex align-items-center justify-content-between">
                         <span className="treasure-hunt-info-span">
                           Total Earnings
                         </span>
                         <span
                           className="treasure-hunt-info-span"
                           style={{ color: "#18FFFF" }}
                         >
                           $253.67
                         </span>
                       </div>
                     </div>
                     <hr className="sidebar-separator my-2" />
                     <div className="d-flex align-items-center justify-content-between">
                       <Countdown renderer={renderer} date={item.eventDate} />
                       <img
                         src={greenArrow}
                         width={14}
                         height={14}
                         alt=""
                       />
                     </div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
        } */}
      </div>
    </div>
  );
};

export default MyProfile;
