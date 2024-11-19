import React from "react";
import "./_challenges.scss";
import pickaxe from "./assets/pickaxe.svg";
import calendar from "./assets/calendar.svg";
import totalEarningsIcon from "./assets/totalEarningsIcon.svg";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

const TreasureHunt = ({ events, eventDuration, onEventClick }) => {
  return (
    <div className="d-flex flex-column gap-3">
      {events
        .filter((obj) => {
          return obj.eventStatus === eventDuration;
        })
        .map((item, index) => {
          return (
            <div
              className="new-treasure-hunt-wrapper p-3 p-lg-0 upcoming-mint-wrapper2 d-flex align-items-center justify-content-between"
              key={index}
              onClick={()=>onEventClick(item)}
            >
              <div className="ps-lg-5 d-flex align-items-center gap-3">
                <img src={item.logo} height={36} width={36} alt="" />
                <div className="d-flex flex-column gap-2">
                  <h6 className="mb-0 new-treasure-hunt-title text-uppercase">{item.title}</h6>
                  <span className="mb-0 new-treasure-hunt-rewards">
                    {item.totalRewards}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2 gap-lg-4">
                <img src={totalEarningsIcon} alt="" />
                <div className="d-flex flex-column gap-2">
                  <span className="total-earnings-amount">${getFormattedNumber(item.userEarnUsd)}</span>
                  <span className="total-earnings-span">My Earnings</span>
                </div>
              </div>
              <div className="d-none d-lg-flex align-items-center position-relative">
                <div className="d-none d-lg-flex flex-column gap-3 treasure-type-date">
                  <div className="d-flex align-items-center gap-2">
                    <img src={pickaxe} alt="" />
                    <span className="treasure-hunt-type">{item.eventType}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <img src={calendar} alt="" />
                    <span className="treasure-hunt-type">{item.eventDate}</span>
                  </div>
                </div>
                <img src={item.backgroundImage} className="upcoming-mint-img-new d-none d-lg-flex" alt="" />
              </div>
            </div>
          );
        })}
      {/* <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={core} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">CORE</h6>
            <span className="mb-0 new-treasure-hunt-rewards">
              $20,000 in CORE rewards
            </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className="treasure-hunt-bg-img" alt="" />
        </div>
      </div>
      <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={viction} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">VICTION</h6>
            <span className="mb-0 new-treasure-hunt-rewards">
              $20,000 in VIC rewards
            </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className="treasure-hunt-bg-img" alt="" />
        </div>
      </div>
      <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={bnb} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">BNB CHAIN</h6>
            <span className="mb-0 new-treasure-hunt-rewards">
              $20,000 in BNB rewards
            </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className="treasure-hunt-bg-img" alt="" />
        </div>
      </div>
      <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={skale} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">SKALE</h6>
            <span className="mb-0 new-treasure-hunt-rewards">
              $20,000 in SKL rewards
            </span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className="treasure-hunt-bg-img" alt="" />
        </div>
      </div> */}
    </div>
  );
};

export default TreasureHunt;
