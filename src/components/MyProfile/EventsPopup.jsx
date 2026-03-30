import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink } from "react-router-dom";
import Countdown from "react-countdown";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import './_myprofile.scss'


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
                src={dummyEvent.popupInfo?.thumbImage}
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
        {/* {dummyEvent.title === "CMC" && (
          <a 
          href="https://coinmarketcap.com/account/rewards/"
          target="_blank"
          rel="noreferrer"
          className="cmc-diamond-event mb-2 d-flex w-100 align-items-center justify-content-between">
            <div className="d-flex flex-column gap-2 p-2">
              <img
                src={"https://cdn.worldofdypians.com/wod/cmcLarge.svg"}
                className="cmc-diamond-logo"
                alt=""
              />
              <span className="diamond-event-title">
                10,000 CMC Beta Pass NFTs
              </span>
           
            </div>
              <div className="d-flex align-items-center gap-2">
                
               <button className="cmc-diamond-btn px-2 py-1 d-flex align-items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    d="M22.9919 11.5V11.4786V11.4573C22.9702 5.14909 17.8 0 11.496 0C5.15935 0 0 5.14909 0 11.5C0 17.8295 5.15935 23 11.496 23C14.4201 23 17.1707 21.9104 19.3082 19.918C19.7368 19.5174 19.7639 18.8658 19.3462 18.4491C18.961 18.0272 18.2991 18.0005 17.876 18.3797C17.876 18.3797 17.876 18.3797 17.8543 18.4011C16.1399 20.0035 13.8234 20.9222 11.4471 20.9222C8.66401 20.9222 6.17385 19.7204 4.44865 17.8028L9.36386 10.0525V13.6419C9.36386 15.3618 10.042 15.912 10.6117 16.0722C11.1813 16.2325 12.033 16.1096 12.9662 14.6728L15.6571 10.373C15.7493 10.2448 15.8198 10.1006 15.9121 10.0151V12.1944C15.9121 13.7915 16.5739 15.0948 17.7024 15.7144C18.7169 16.2966 20.0081 16.2218 21.0714 15.5862C22.3843 14.7315 23.0841 13.2573 22.9919 11.5ZM20.0081 13.7487C19.6012 13.9998 19.1238 14.0372 18.7603 13.8395C18.3046 13.5671 18.0387 12.9689 18.0387 12.1516V9.63052C18.0387 8.42871 17.5613 7.55806 16.7475 7.32838C15.3641 6.92778 14.3225 8.59963 13.9319 9.22991L11.496 13.0811V8.33256C11.4634 7.24292 11.1108 6.60195 10.4326 6.40432C9.97691 6.27613 9.30418 6.33488 8.64231 7.31236L3.19001 15.9066C2.45761 14.5446 2.08327 13.0383 2.08327 11.4947C2.08327 6.30818 6.32033 2.08848 11.496 2.08848C16.677 2.08848 20.9086 6.30818 20.9086 11.4947V11.516V11.5374C20.952 12.5523 20.6374 13.3481 20.0081 13.7487Z"
                    fill="#3861FB"
                  />
                </svg>
                Get now
              </button>
            <img
              src={"https://cdn.worldofdypians.com/wod/diamondHand.svg"}
              className="cmc-diamond-hand d-none d-lg-flex"
              alt=""
             
            />
              </div>
          </a>
        )} */}
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
              <p
                className="popup-event-desc"
                dangerouslySetInnerHTML={{
                  __html: dummyEvent.popupInfo.detailsText,
                }}
              ></p>
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
        <p className="popup-event-desc">{dummyEvent.popupInfo.about}</p>

        <div className="d-flex gap-3 align-items-center">
          <a
            href={dummyEvent.popupInfo.twitterLink}
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
            X
          </a>

          <a
            href={dummyEvent.popupInfo.telegramLink}
            target="_blank"
            rel="noreferrer"
            className="d-flex gap-1 align-items-center greensocial"
          >
            <img
              alt=""
              src={
                dummyEvent.popupInfo.id !== "event24" &&
                dummyEvent.popupInfo.id !== "event7" &&
                dummyEvent.popupInfo.id !== "event15"
                  ? "https://cdn.worldofdypians.com/wod/greentg.svg"
                  : "https://cdn.worldofdypians.com/wod/greenDiscord.svg"
              }
            />
            {dummyEvent.popupInfo.id !== "event24" &&
            dummyEvent.popupInfo.id !== "event7" &&
            dummyEvent.popupInfo.id !== "event15"
              ? "Telegram"
              : "Discord"}
          </a>
          <a
            href={dummyEvent.popupInfo.websiteLink}
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
                  0,
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
                  left:
                    (dummyEvent.popupInfo.id === "event5" ||
                      dummyEvent.popupInfo.id === "event4") &&
                    "0px",
                }}
              >
                $
                {getFormattedNumber(
                  dummyEvent.popupInfo?.status === "Coming Soon"
                    ? 0
                    : dummyEvent.userEarnUsd,
                  2,
                )}
                <span className="ethpricerewards specialstyle-wrapper-eth">
                  {dummyEvent.popupInfo.id !== "event5" &&
                    dummyEvent.popupInfo.id !== "event4" && (
                      <>
                        {getFormattedNumber(
                          dummyEvent.popupInfo?.status === "Coming Soon"
                            ? 0
                            : dummyEvent.userEarnCrypto,
                          4,
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
