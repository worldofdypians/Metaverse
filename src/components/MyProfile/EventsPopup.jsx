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
