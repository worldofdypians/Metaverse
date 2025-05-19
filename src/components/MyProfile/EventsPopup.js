import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink } from "react-router-dom";
import Countdown from "react-countdown";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-start popup-timer mt-4 mt-lg-0 gap-1">
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {days < 10 ? "0" + days : days}
          </h6>
          <span className="profile-time-desc-2 mb-0">Days</span>
        </div>
        <h6 className="profile-time-number-2 mb-0">:</h6>
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {hours < 10 ? "0" + hours : hours}
          </h6>
          <span className="profile-time-desc-2 mb-0">Hours</span>
        </div>
        <h6 className="profile-time-number-2 mb-0">:</h6>
        <div className="d-flex flex-column align-items-center gap-3">
          <h6 className="profile-time-number-2 mb-0">
            {minutes < 10 ? "0" + minutes : minutes}
          </h6>
          <span className="profile-time-desc-2 mb-0">Minutes</span>
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

const EventsPopup = ({ onClose, dummyEvent }) => {
  return (
    <OutsideClickHandler onOutsideClick={() => onClose()}>
      <div className="profile-event-popup p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <h6 className="event-popup-title mb-0">{dummyEvent?.title}</h6>
            <div
              className={`${
                dummyEvent.popupInfo?.status === "Live"
                  ? "event-popup-status-live"
                  : dummyEvent.popupInfo?.status === "Coming Soon"
                  ? "event-popup-status-upcoming"
                  : "event-popup-status-expired"
              }  d-flex align-items-center justify-content-center p-1`}
            >
              {dummyEvent.popupInfo.status === "Live" && (
                <div
                  className="pulsatingDot"
                  style={{ width: 7, height: 7, marginRight: 5 }}
                ></div>
              )}
              <span className="mb-0">{dummyEvent.popupInfo?.status}</span>
            </div>
          </div>
          <img
            src={"https://cdn.worldofdypians.com/wod/popupXmark.svg"}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div className="profile-event-popup-wrapper mb-3 p-2 p-lg-3 h-auto">
          <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
            <div className="d-flex gap-2">
              <img
                src={
                  dummyEvent.popupInfo?.id === "event5"
                    ? "https://cdn.worldofdypians.com/wod/dypEventImage.png"
                    : dummyEvent.popupInfo?.id === "event9"
                    ? "https://cdn.worldofdypians.com/wod/dypiuspopup2.png"
                    : dummyEvent.popupInfo?.linkState === "coingecko"
                    ? "https://cdn.worldofdypians.com/wod/eventPopupImageGecko.png"
                    : dummyEvent.popupInfo.linkState === "gate"
                    ? "https://cdn.worldofdypians.com/wod/gatePopupImage.png"
                    : dummyEvent.popupInfo.linkState === "base"
                    ? "https://cdn.worldofdypians.com/wod/eventPopupImageBase.png"
                    : dummyEvent.popupInfo.linkState === "doge"
                    ? "https://cdn.worldofdypians.com/wod/dogePopupImage.png"
                    : dummyEvent.popupInfo.linkState === "coinmarketcap"
                    ? "https://cdn.worldofdypians.com/wod/cmcPopupImage.png"
                    : dummyEvent.popupInfo.linkState === "skale"
                    ? "https://cdn.worldofdypians.com/wod/skalePopupImage.png"
                    : dummyEvent.popupInfo.linkState === "core"
                    ? "https://cdn.worldofdypians.com/wod/coreThumb.png"
                    : dummyEvent.popupInfo.linkState === "sei"
                    ? "https://cdn.worldofdypians.com/wod/seiThumb.png"
                    : dummyEvent.popupInfo.linkState === "immutable"
                    ? "https://cdn.worldofdypians.com/wod/immutableThumb.png"
                    : dummyEvent.popupInfo.linkState === "viction"
                    ? "https://cdn.worldofdypians.com/wod/victionThumb.png"
                    : dummyEvent.popupInfo.linkState === "multiversx"
                    ? "https://cdn.worldofdypians.com/wod/multiversThumb.png"
                    : dummyEvent.popupInfo.linkState === "bnb"
                    ? "https://cdn.worldofdypians.com/wod/bnbPopupImage.png"
                    : dummyEvent.popupInfo.linkState === "manta"
                    ? "https://cdn.worldofdypians.com/wod/mantaThumb.png"
                    : dummyEvent.popupInfo.linkState === "taiko"
                    ? "https://cdn.worldofdypians.com/wod/taikoThumb.webp"
                    : dummyEvent.popupInfo.linkState === "cookie3"
                    ? "https://cdn.worldofdypians.com/wod/cookie3Thumb.png"
                    : dummyEvent.popupInfo.linkState === "chainlink"
                    ? "https://cdn.worldofdypians.com/wod/chainlinkThumb.webp"
                    : dummyEvent.popupInfo.linkState === "matchain"
                    ? "https://cdn.worldofdypians.com/wod/eventPopupImageMatchain.webp"
                    : dummyEvent.popupInfo.linkState === "easy2stake"
                    ? "https://cdn.worldofdypians.com/wod/easy2stakeThumb.webp"
                    : dummyEvent.popupInfo.linkState === "midle"
                    ? "https://cdn.worldofdypians.com/wod/midleThumb.webp"
                    : dummyEvent.popupInfo.linkState === "kucoin"
                    ? "https://cdn.worldofdypians.com/wod/kucoinThumb.png"
                    : dummyEvent.popupInfo.linkState === "vanar"
                    ? "https://cdn.worldofdypians.com/wod/vanarThumb.webp"
                    : "https://cdn.worldofdypians.com/wod/eventPopupImage.png"
                }
                alt=""
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column">
                  <h6 className="popup-second-title m-0">
                    {dummyEvent?.title}
                  </h6>
                  <span className="popup-rewards">
                    {dummyEvent?.totalRewards}
                  </span>
                </div>
                <div className="d-flex">
                  <span className="event-popup-chain mb-0">
                    Gameplay: {dummyEvent?.eventType}
                  </span>
                </div>
                <div className="d-flex">
                  <span className="event-popup-chain mb-0">
                    Chain: {dummyEvent?.popupInfo.chain}
                  </span>
                </div>
              </div>
            </div>
            {dummyEvent.popupInfo?.status === "Live" && (
              <Countdown
                renderer={renderer}
                date={dummyEvent.popupInfo.eventDuration}
              />
            )}
            {dummyEvent.popupInfo?.status === "Coming Soon" && (
              <div className="d-flex flex-column">
                <span className="live-on">Live on</span>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={"https://cdn.worldofdypians.com/wod/greenCalendar.svg"}
                    className="green-calendar"
                    alt=""
                  />
                  <h6 className="live-on-date mb-0">
                    {dummyEvent.popupInfo.eventDate}
                  </h6>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="how-it-works mb-0">How it works?</h6>
          {dummyEvent.popupInfo.status === "Live" &&
            dummyEvent.popupInfo.learnMore !== "" &&
            dummyEvent.popupInfo.id !== "event15" && (
              <NavLink
                to={dummyEvent.popupInfo.learnMore}
                className="events-page-details d-flex align-items-center gap-2"
              >
                Learn more
                <img
                  src={"https://cdn.worldofdypians.com/wod/eventsArrow.svg"}
                  alt=""
                />
              </NavLink>
            )}
          {dummyEvent.popupInfo.status === "Live" &&
            dummyEvent.popupInfo.learnMore !== "" &&
            dummyEvent.popupInfo.id === "event15" && (
              <a
                href={dummyEvent.popupInfo.learnMore}
                target="_blank"
                rel="noreferrer"
                className="events-page-details d-flex align-items-center gap-2"
              >
                Learn more
                <img
                  src={"https://cdn.worldofdypians.com/wod/eventsArrow.svg"}
                  alt=""
                />
              </a>
            )}
        </div>
        <div className="row mb-3 gap-3 gap-lg-0">
          <div className="col-12 col-lg-6">
            <div className="profile-event-popup-wrapper p-3">
              <h6 className="popup-green-text">Details</h6>
              {dummyEvent.popupInfo.id === "event1" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Conflux Beta Pass NFT</b>. You can get the Conflux
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Conflux area,
                  players not only stand a chance to secure daily rewards in
                  CFX, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Conflux area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event2" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Vanar Beta Pass NFT</b>. You can get the Vanar Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Vanar area, players
                  not only stand a chance to secure daily rewards in VANRY, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Vanar area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event20" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the BNB
                  Chain area, players not only stand a chance to secure daily
                  rewards in BNB, but also earn points for their placement on
                  the global leaderboard. Remember to log in to the game daily
                  and venture into the BNB Chain area to uncover hidden
                  treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event26" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  Easy2Stake area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the Easy2Stake area to uncover hidden
                  treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event27" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the Midle
                  area, players not only stand a chance to secure daily rewards
                  in BNB, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Midle area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event21" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Manta Beta Pass NFT</b>. You can get the Manta Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Manta area, players
                  not only stand a chance to secure daily rewards in MANTA, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Manta area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event22" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Taiko Beta Pass NFT</b>. You can get the Taiko Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Taiko area, players
                  not only stand a chance to secure daily rewards in ETH, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Taiko area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event3" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a CoinGecko Beta Pass NFT</b>. You can get the
                  CoinGecko Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  CoinGecko area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the CoinGecko area to uncover hidden
                  treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event5" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to own at
                  least one of the Beta Pass NFTs (CoinGecko, Conflux, Gate, or
                  Base). By actively participating in the game on a daily basis
                  and exploring the downtown area, players have the opportunity
                  to secure daily rewards in DYP. Remember to log in to the game
                  daily and venture into the downtown area to uncover hidden
                  treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event6" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Gate Beta Pass NFT</b>. You can get the Gate Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the Gate.io area, players
                  not only stand a chance to secure daily rewards in BNB, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Gate.io area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event7" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Dogecoin Beta Pass NFT</b>. You can get the Dogecoin
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Dogecoin area,
                  players not only stand a chance to secure daily rewards in
                  DOGE, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Dogecoin area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event8" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a CoinMarketCap Beta Pass NFT</b>. You can get the
                  CoinMarketCap Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  CoinMarketCap area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the CoinMarketCap area to uncover
                  hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event9" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to be{" "}
                  <b>Prime Users.</b> By actively participating in the game on a
                  daily basis and exploring the downtown area, players have the
                  opportunity to secure daily rewards in WOD. Remember to log in
                  to the game daily and venture into the downtown area to
                  uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event11" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a SKALE Beta Pass NFT</b>. You can get the SKALE Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the SKALE area, players
                  not only stand a chance to secure daily rewards in SKL, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the SKALE area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event14" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Viction Beta Pass NFT</b>. You can get the Viction
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Viction area,
                  players not only stand a chance to secure daily rewards in
                  VIC, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Viction area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event15" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Immutable Beta Pass NFT</b>. You can get the
                  Immutable Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  Immutable area, players not only stand a chance to secure
                  daily rewards in IMX, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the Immutable area to uncover hidden
                  treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event13" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a SEI Beta Pass NFT</b>. You can get the SEI Beta Pass
                  NFT from the World of Dypians Shop. By engaging in the game on
                  a daily basis and exploring the SEI area, players not only
                  stand a chance to secure daily rewards in SEI, but also earn
                  points for their placement on the global leaderboard. Remember
                  to log in to the game daily and venture into the SEI area to
                  uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event12" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a CORE Beta Pass NFT</b>. You can get the CORE Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the CORE area, players not
                  only stand a chance to secure daily rewards in CORE, but also
                  earn points for their placement on the global leaderboard.
                  Remember to log in to the game daily and venture into the CORE
                  area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event16" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a MultiversX Beta Pass NFT</b>. You can get the
                  MultiversX Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  MultiversX area, players not only stand a chance to secure
                  daily rewards in EGLD, but also earn points for their
                  placement on the global leaderboard. Remember to log in to the
                  game daily and venture into the MultiversX area to uncover
                  hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event23" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Cookie3 Beta Pass NFT</b>. You can get the Cookie3
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Cookie3 area,
                  players not only stand a chance to secure daily rewards in
                  COOKIE, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Cookie3 area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event25" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Matchain Beta Pass NFT</b>. You can get the Matchain
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the Matchain area,
                  players not only stand a chance to secure daily rewards in
                  MAT, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the Matchain area to uncover hidden treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event28" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a BNB Chain Beta Pass NFT</b>. You can get the BNB
                  Chain Beta Pass NFT from the World of Dypians Shop. By
                  engaging in the game on a daily basis and exploring the
                  Chainlink area, players not only stand a chance to secure
                  daily rewards in BNB, but also earn points for their placement
                  on the global leaderboard. Remember to log in to the game
                  daily and venture into the Chainlink area to uncover hidden
                  treasures.
                </p>
              ) : dummyEvent.popupInfo.id === "event29" ? (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a KuCoin Beta Pass NFT</b>. You can get the KuCoin
                  Beta Pass NFT from the World of Dypians Shop. By engaging in
                  the game on a daily basis and exploring the KuCoin area,
                  players not only stand a chance to secure daily rewards in
                  KCS, but also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the KuCoin area to uncover hidden treasures.
                </p>
              ) : (
                <p className="popup-event-desc">
                  To participate in the event, players are required to&nbsp;
                  <b>hold a Base Beta Pass NFT</b>. You can get the Base Beta
                  Pass NFT from the World of Dypians Shop. By engaging in the
                  game on a daily basis and exploring the downtown area, players
                  not only stand a chance to secure daily rewards in ETH, but
                  also earn points for their placement on the global
                  leaderboard. Remember to log in to the game daily and venture
                  into the downtown area to uncover hidden treasures.
                </p>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="profile-event-popup-wrapper p-3">
              <h6 className="popup-green-text">Benefits</h6>
              <ul>
                <li className="popup-event-desc">Exclusive Event Access</li>
                <>
                  {dummyEvent.popupInfo.id !== "event5" ? (
                    <li className="popup-event-desc">
                      Daily Rewards range from $
                      {dummyEvent.popupInfo.minRewards} to $
                      {dummyEvent.popupInfo.maxRewards}
                    </li>
                  ) : (
                    <li className="popup-event-desc">Daily Rewards</li>
                  )}
                  {dummyEvent.popupInfo.id !== "event5" && (
                    <li className="popup-event-desc">
                      Daily Points range from {dummyEvent.popupInfo.minPoints}{" "}
                      to {dummyEvent.popupInfo.maxPoints}
                    </li>
                  )}
                </>
                {dummyEvent.popupInfo.id !== "event5" && (
                  <li className="popup-event-desc">
                    Earn {dummyEvent.popupInfo.rewards} rewards
                  </li>
                )}
                {dummyEvent.popupInfo.id !== "event5" &&
                  dummyEvent.popupInfo.id !== "event11" && (
                    <li className="popup-event-desc">
                      Get global leaderboard points
                    </li>
                  )}
                {dummyEvent.popupInfo.id === "event11" && (
                  <li className="popup-event-desc">
                    Get global SKALE leaderboard points
                  </li>
                )}
                <li className="popup-event-desc">Community Engagement</li>
                <li className="popup-event-desc">Exploration Adventures</li>
              </ul>
            </div>
          </div>
        </div>
        <h6 className="how-it-works">
          Learn more about {dummyEvent.popupInfo.title}
        </h6>
        {dummyEvent.popupInfo.id === "event1" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Conflux Network stands as a Layer 1 public blockchain solution,
            uniquely blending the advantages of both public and private
            blockchains within its hybrid architecture. It aims to establish a
            diverse multi-chain ecosystem, fostering seamless global
            connectivity for creators, communities, and markets across different
            borders and protocols.
          </p>
        ) : dummyEvent.popupInfo.id === "event2" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Vanar offers a suite of solutions for brands built on years of
            experience. From new engagement experiences to AI-driven IP
            tracking.
          </p>
        ) : dummyEvent.popupInfo.id === "event20" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            BNB Chain is a high-performance blockchain designed to support the
            expansive growth of decentralized applications. It offers a robust
            infrastructure that combines high throughput, low latency, and low
            fees, making it the ideal platform for DeFi, NFTs, and gaming. With
            BNB Chain, developers can leverage advanced functionalities such as
            cross-chain compatibility, on-chain governance, and scalable smart
            contracts. The ecosystem empowers projects to build and scale
            efficiently, ensuring fast, secure, and decentralized solutions
            without compromising on user experience or innovation.
          </p>
        ) : dummyEvent.popupInfo.id === "event21" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Manta is the multi-modular ecosystem for zero-knowledge (ZK)
            applications. Manta was created by a team of experienced founders
            from prestigious institutions, including Harvard, MIT, and Algorand.
            Manta has received investments from many top web3 investment funds,
            including Binance Labs and Polychain Capital. It has grown through
            participation in the best web3 accelerators, including Alliance DAO
            and Berkeley Blockchain Xcelerator. Manta is poised to bring the
            next generation of web3 users and usher in a new chapter of web3
            zkApp applications.
          </p>
        ) : dummyEvent.popupInfo.id === "event26" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Easy2Stake is a trusted staking service provider that enables secure
            and efficient staking for multiple blockchains, ensuring users can
            earn rewards while supporting web3 ecosystems.
          </p>
        ) : dummyEvent.popupInfo.id === "event27" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Midle is the web and mobile app that boosts user acquisition,
            retention and engagement.
          </p>
        ) : dummyEvent.popupInfo.id === "event28" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Chainlink connects existing systems to any public or private
            blockchain and enables secure cross-chain communication. World-class
            developer experience.
          </p>
        ) : dummyEvent.popupInfo.id === "event29" ? (
          <p className="popup-event-desc">
            Kucoin is a Seychelles-based cryptocurrency exchange. It was founded
            in China in 2017, but was later moved to Singapore following the
            Chinese government's restrictions on cryptocurrency companies, and
            subsequently to the Seychelles. Kucoin also operates its own crypto
            token known as Kucoin Shares.
          </p>
        ) : dummyEvent.popupInfo.id === "event22" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Taiko is an Ethereum-equivalent (Type 1) ZK-EVM, maximally
            compatible with Ethereum. No additional compiling, reaudits, or
            tooling needed. Everything works out of the box, guaranteed.
          </p>
        ) : dummyEvent.popupInfo.id === "event23" ? (
          <p className="popup-event-desc">
            Cookie3 is the first MarketingFi protocol and AI-powered data layer,
            built to revolutionize how users, creators, and businesses interact.
            By leveraging AI and blockchain, Cookie3 enhances marketing
            strategies and data insights, empowering everyone in the digital
            ecosystem to thrive with smarter, more efficient tools.
          </p>
        ) : dummyEvent.popupInfo.id === "event3" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            CoinGecko is the world's largest independent cryptocurrency data
            aggregator with over 10,000+ different cryptoassets tracked across
            more than 800+ exchanges worldwide. CoinGecko provides a fundamental
            analysis of the digital currency market. In addition to tracking
            price, volume, and market capitalization, CoinGecko tracks community
            growth, open source code development, major events, and on-chain
            metrics.
          </p>
        ) : dummyEvent.popupInfo.id === "event5" ||
          dummyEvent.popupInfo.id === "event9" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Dypius is a powerful, decentralized ecosystem with a focus on
            scalability, security, and global adoption through next-gen
            infrastructure. We offer a variety of products and services that
            cater to both beginners and advanced users in the crypto space
            including Earn solutions, analytical tools, NFTs, Metaverse and
            more!
          </p>
        ) : dummyEvent.popupInfo.id === "event6" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Gate.io is a full-service digital asset exchange platform covering
            millions of users around the world.The company prides itself on
            providing industry-leading security in addition to having been
            audited to show 100% proof of reserves. Gate.io operates in most
            countries across the world, and is always committed to complying
            with the applicable laws where it operates.
          </p>
        ) : dummyEvent.popupInfo.id === "event7" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            An open-source peer-to-peer digital currency, favoured by Shiba Inus
            worldwide.At its heart, Dogecoin is the accidental crypto movement
            that makes people smile! It is also an opensource peer-to-peer
            cryptocurrency that utilises blockchain technology, a highly secure
            decentralised system of storing information as a public ledger that
            is maintained by a network of computers called nodes.
          </p>
        ) : dummyEvent.popupInfo.id === "event8" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            CoinMarketCap provides cryptocurrency market cap rankings, charts,
            and more. We tracks capitalization of various cryptocurrencies by
            listing prices, available supply (amount of coins that is currently
            in circulation), trade volume over last 24 hours, or market
            capitalizations. CoinMarketCap was founded in May 2013 by Brandon
            Chez in Long Island City, Queens, New York.
          </p>
        ) : dummyEvent.popupInfo.id === "event11" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            SKALE stands as the world's fastest blockchain, meticulously
            engineered to enable secure Ethereum scaling. With SKALE AppChains,
            users enjoy ZERO gas fees and access advanced functionalities like
            AI/ML smart contracts, on-chain file storage, interchain messaging,
            and zero-cost minting. This empowers developers to swiftly deploy
            their own configurable EVM blockchains without compromising on
            speed, security, or decentralization.
          </p>
        ) : dummyEvent.popupInfo.id === "event14" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Viction, previously known as TomoChain, is a people-centric layer-1
            blockchain that provides zero-gas transactions and heightened
            security, making Web3 accessible and safe for everyone. With a
            design emphasis on user experience, Viction prioritizes zero-gas
            transactions through the innovative TRC25 token standard, alongside
            speed, security, and scalability, all contributing to a more secure
            and open world.
          </p>
        ) : dummyEvent.popupInfo.id === "event16" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            MultiversX is a distributed blockchain network for next-gen
            applications. Decentralized via 3000+ nodes, scalable through
            sharding, fast, secure & green.
          </p>
        ) : dummyEvent.popupInfo.id === "event15" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Immutable is a global leader in gaming on a mission to bring digital
            ownership to every player by making it safe and easy to build great
            web3 games.
          </p>
        ) : dummyEvent.popupInfo.id === "event13" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Sei is at the pinnacle of high-speed blockchain platforms, ideal for
            web2 like experiences, high-frequency trading and real-time digital
            exchanges.
          </p>
        ) : dummyEvent.popupInfo.id === "event12" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Core DAO started as a community looking for better solutions, and
            that's what it remains. With principles grounded in the premises of
            both Bitcoin and Ethereum, our power comes from embracing multiple
            ideas and communities. The opposite of a winner-take-all mentality -
            Core is focused instead on platform growth and driving the global
            adoption of blockchain technology.
          </p>
        ) : dummyEvent.popupInfo.id === "event25" ? (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Matchain is a decentralized AI blockchain focused on data and
            identity sovereignty, utilizing advanced AI for data aggregation,
            analytics, and user profiling to enhance decentralized identity
            solutions and data management.
          </p>
        ) : (
          <p
            className="popup-event-desc"
            // style={{ fontSize: "12px", fontWeight: "500" }}
          >
            Base is built as an Ethereum L2, with the security, stability, and
            scalability you need to power your dapps.Base is an easy way for
            decentralized apps to leverage Coinbase's products and distribution.
            Seamless Coinbase integrations, easy fiat onramps, and access to the
            $130B assets on platform in the Coinbase ecosystem.
          </p>
        )}

        <div className="d-flex gap-3 align-items-center">
          <a
            href={
              dummyEvent.popupInfo.id === "event1"
                ? "https://twitter.com/Conflux_Network"
                : dummyEvent.popupInfo.id === "event5" ||
                  dummyEvent.popupInfo.id === "event9"
                ? "https://twitter.com/dypius"
                : dummyEvent.popupInfo.id === "event3"
                ? "https://twitter.com/coingecko"
                : dummyEvent.popupInfo.id === "event6"
                ? "https://twitter.com/gate_io"
                : dummyEvent.popupInfo.id === "event7"
                ? "https://twitter.com/dogecoin"
                : dummyEvent.popupInfo.id === "event8"
                ? "https://twitter.com/CoinMarketCap"
                : dummyEvent.popupInfo.id === "event11"
                ? "https://twitter.com/SkaleNetwork"
                : dummyEvent.popupInfo.id === "event20"
                ? "https://x.com/BNBChain"
                : dummyEvent.popupInfo.id === "event14"
                ? "https://viction.link/twitter"
                : dummyEvent.popupInfo.id === "event15"
                ? "https://twitter.com/Immutable"
                : dummyEvent.id === "event13"
                ? "https://twitter.com/SeiNetwork"
                : dummyEvent.popupInfo.id === "event12"
                ? "https://twitter.com/Coredao_Org"
                : dummyEvent.popupInfo.id === "event16"
                ? "https://twitter.com/MultiversX"
                : dummyEvent.popupInfo.id === "event21"
                ? "https://x.com/mantanetwork"
                : dummyEvent.popupInfo.id === "event22"
                ? "https://x.com/taikoxyz"
                : dummyEvent.popupInfo.id === "event25"
                ? "https://x.com/matchain_io"
                : dummyEvent.popupInfo.id === "event23"
                ? "https://x.com/cookie3_com"
                : dummyEvent.popupInfo.id === "event13"
                ? "https://x.com/SeiNetwork"
                : dummyEvent.popupInfo.id === "event26"
                ? "https://x.com/easy2stake"
                : dummyEvent.popupInfo.id === "event27"
                ? "https://x.com/midle_official"
                : dummyEvent.popupInfo.id === "event28"
                ? "https://x.com/chainlink"
                : dummyEvent.popupInfo.id === "event29"
                ? "https://x.com/KuCoinCom"
                : dummyEvent.popupInfo.id === "event2"
                ? "https://x.com/vanarchain"
                : "https://twitter.com/buildonbase"
            }
            target="_blank"
            rel="noreferrer"
            className="d-flex gap-1 align-items-center greensocial"
          >
            <img
              alt=""
              width={16}
              height={16}
              src={"https://cdn.worldofdypians.com/wod/greenTwitter.svg"}
            />{" "}
            Twitter
          </a>

          <a
            href={
              dummyEvent.popupInfo.id === "event1"
                ? "https://t.me/Conflux_English"
                : dummyEvent.popupInfo.id === "event5" ||
                  dummyEvent.popupInfo.id === "event9"
                ? "https://t.me/worldofdypians"
                : dummyEvent.popupInfo.id === "event3"
                ? "https://t.me/coingecko"
                : dummyEvent.popupInfo.id === "event8"
                ? "https://t.me/CoinMarketCapAnnouncements"
                : dummyEvent.popupInfo.id === "event6"
                ? "https://t.me/gateio_en"
                : dummyEvent.popupInfo.id === "event7"
                ? "https://discord.gg/dogecoin"
                : dummyEvent.popupInfo.id === "event11"
                ? "https://t.me/skaleofficial"
                : dummyEvent.popupInfo.id === "event20"
                ? "https://t.me/bnbchain"
                : dummyEvent.popupInfo.id === "event14"
                ? "https://viction.link/telegram"
                : dummyEvent.popupInfo.id === "event15"
                ? "https://discord.gg/CYsjMdctsP"
                : dummyEvent.popupInfo.id === "event13"
                ? "https://t.me/seinetwork?ref=blog.sei.io"
                : dummyEvent.popupInfo.id === "event12"
                ? "https://t.me/CoreDAOTelegram"
                : dummyEvent.popupInfo.id === "event16"
                ? "https://t.me/MultiversX"
                : dummyEvent.popupInfo.id === "event21"
                ? "https://www.t.me/mantanetworkofficial"
                : dummyEvent.popupInfo.id === "event22"
                ? "https://t.me/TaikoEcosystem"
                : dummyEvent.popupInfo.id === "event23"
                ? "https://t.me/cookie3_co"
                : dummyEvent.popupInfo.id === "event25"
                ? "https://t.me/matchain_fam"
                : dummyEvent.popupInfo.id === "event26"
                ? "https://t.me/easy2stake"
                : dummyEvent.popupInfo.id === "event27"
                ? "https://t.me/midlecommunity"
                : dummyEvent.popupInfo.id === "event28"
                ? "https://t.me/chainlinkofficial"
                : dummyEvent.popupInfo.id === "event29"
                ? "https://t.me/Kucoin_Exchange"
                : dummyEvent.popupInfo.id === "event2"
                ? "https://t.me/vanarofficial"
                : "https://base.org/discord"
            }
            target="_blank"
            rel="noreferrer"
            className="d-flex gap-1 align-items-center greensocial"
          >
            <img
              alt=""
              src={
                dummyEvent.popupInfo.id !== "event4" &&
                dummyEvent.popupInfo.id !== "event24" &&
                dummyEvent.popupInfo.id !== "event7" &&
                dummyEvent.popupInfo.id !== "event15"
                  ? "https://cdn.worldofdypians.com/wod/greentg.svg"
                  : "https://cdn.worldofdypians.com/wod/greenDiscord.svg"
              }
            />
            {dummyEvent.popupInfo.id !== "event4" &&
            dummyEvent.popupInfo.id !== "event24" &&
            dummyEvent.popupInfo.id !== "event7" &&
            dummyEvent.popupInfo.id !== "event15"
              ? "Telegram"
              : "Discord"}
          </a>
          <a
            href={
              dummyEvent.popupInfo.id === "event1"
                ? "https://confluxnetwork.org/"
                : dummyEvent.popupInfo.id === "event5" ||
                  dummyEvent.popupInfo.id === "event9"
                ? "https://www.dypius.com/"
                : dummyEvent.popupInfo.id === "event3"
                ? "https://www.coingecko.com/"
                : dummyEvent.popupInfo.id === "event6"
                ? "https://www.gate.io/"
                : dummyEvent.popupInfo.id === "event7"
                ? "https://dogecoin.com/"
                : dummyEvent.popupInfo.id === "event8"
                ? "https://coinmarketcap.com/"
                : dummyEvent.popupInfo.id === "event11"
                ? "https://skale.space/"
                : dummyEvent.popupInfo.id === "event14"
                ? "https://www.viction.xyz/"
                : dummyEvent.popupInfo.id === "event15"
                ? "https://www.immutable.com/"
                : dummyEvent.popupInfo.id === "event13"
                ? "https://www.sei.io/"
                : dummyEvent.popupInfo.id === "event20"
                ? "https://www.bnbchain.org/en"
                : dummyEvent.popupInfo.id === "event12"
                ? "https://coredao.org/"
                : dummyEvent.popupInfo.id === "event16"
                ? "https://multiversx.com/"
                : dummyEvent.popupInfo.id === "event21"
                ? "https://manta.network/"
                : dummyEvent.popupInfo.id === "event22"
                ? "https://taiko.xyz/"
                : dummyEvent.popupInfo.id === "event23"
                ? "https://www.cookie3.com/"
                : dummyEvent.popupInfo.id === "event25"
                ? "https://www.matchain.io/"
                : dummyEvent.popupInfo.id === "event26"
                ? "https://www.easy2stake.com"
                : dummyEvent.popupInfo.id === "event27"
                ? "https://app.midle.io/"
                : dummyEvent.popupInfo.id === "event28"
                ? "https://chain.link/"
                : dummyEvent.popupInfo.id === "event29"
                ? "https://www.kucoin.com/"
                : dummyEvent.popupInfo.id === "event2"
                ? "https://vanarchain.com/"
                : "https://base.org/"
            }
            target="_blank"
            rel="noreferrer"
            className="d-flex gap-1 align-items-center greensocial"
          >
            <img
              alt=""
              src={"https://cdn.worldofdypians.com/wod/greenWebsite.svg"}
            />
            Website
          </a>
        </div>
        <div className="summaryseparator mt-3"></div>
        <div className="popup-red-wrapper mt-3 p-3 d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row align-items-xxl-center align-items-xl-center align-items-lg-center align-items-md-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <img
              src={"https://cdn.worldofdypians.com/wod/grayDollar.svg"}
              width={36}
              height={36}
              alt=""
            />
            <span className="event-my-earnings2 mb-0">My earnings</span>
          </div>
          <div className="d-flex align-items-center gap-3 gap-lg-5 justify-content-between mt-3 mt-lg-0">
            <div className="d-flex flex-column gap-2">
              <h6 className="mb-0 event-earnings-coin2">
                {getFormattedNumber(
                  dummyEvent.popupInfo?.status === "Coming Soon"
                    ? 0
                    : dummyEvent.userEarnPoints,
                  0
                )}
                {dummyEvent.popupInfo.id === "event5" && " DYP"}
              </h6>

              <span className="mb-0 event-earnings-usd">
                {dummyEvent.popupInfo.id === "event5"
                  ? "Amount"
                  : "Leaderboard Points"}
              </span>
            </div>
            <div className="d-flex flex-column gap-2">
              <h6
                className="mb-0 event-earnings-coin2 d-flex specialstyle-wrapper gap-1"
                style={{
                  left: dummyEvent.popupInfo.id === "event5" && "0px",
                }}
              >
                $
                {getFormattedNumber(
                  dummyEvent.popupInfo?.status === "Coming Soon"
                    ? 0
                    : dummyEvent.userEarnUsd,
                  2
                )}
                <span className="ethpricerewards specialstyle-wrapper-eth">
                  {dummyEvent.popupInfo.id !== "event5" && (
                    <>
                      {getFormattedNumber(
                        dummyEvent.popupInfo?.status === "Coming Soon"
                          ? 0
                          : dummyEvent.userEarnCrypto,
                        2
                      )}
                      {dummyEvent.popupInfo.rewards}
                    </>
                  )}
                </span>
              </h6>
              <span className="mb-0 event-earnings-usd">Rewards</span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2 mt-2">
          <img src={"https://cdn.worldofdypians.com/wod/tooltip.svg"} alt="" />
          <span className="popup-event-desc">
            The rewards will be distributed 2-3 days after the event ends.
          </span>
        </div>
        {/* {dummyEvent.status === "Coming Soon" &&
          dummyEvent.popupInfo.id !== "event15" &&
          dummyEvent.popupInfo.id !== "event22" && (
            <div className="w-100 d-flex justify-content-end mt-3">
              <NavLink to={`/shop/beta-pass/${dummyEvent.linkState}`}>
                <button className="btn get-beta-btn">Get Beta Pass</button>
              </NavLink>
            </div>
          )} */}
      </div>
    </OutsideClickHandler>
  );
};

export default EventsPopup;
