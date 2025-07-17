import React from "react";    
 
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number" ;

const ExpiredProfileEvent = ({ onOpenEvent, data, event, userEarnedUsd }) => {
  return (
    <div
      className="profile-event-item d-flex flex-column position-relative"
      style={{
        background: "rgba(184, 184, 224, 0.10)",
        borderBottom: "1px solid #B8B8E0",
      }}
      onClick={onOpenEvent}
    >
      <div className="profile-event-top d-flex align-items-center justify-content-between ">
        <div className="d-flex align-items-center p-2 gap-2">
          <img
            src={
              event.title === "CoinGecko"
                ? 'https://cdn.worldofdypians.com/wod/coingeckoIcon.svg'
                : event.title === "Conflux"
                ? 'https://cdn.worldofdypians.com/wod/confluxIcon.svg'
                : event.title === "Base"
                ? 'https://cdn.worldofdypians.com/wod/base.svg'
                : event.title === "Dypius"
                ? 'https://cdn.worldofdypians.com/wod/dypius.svg'
                : event.title === "Dogecoin"
                ? 'https://cdn.worldofdypians.com/wod/dogecoinIcon.svg'
                : event.title === "Dypius" || event.title === "Dypius Premium"
                ? 'https://cdn.worldofdypians.com/wod/dypiusPremium16.svg'
                : event.title === "CoinMarketCap"
                ? 'https://cdn.worldofdypians.com/wod/cmcIcon.svg'
                : event.title === "SKALE"
                ? 'https://cdn.worldofdypians.com/wod/skaleIcon.svg'
                : event.logo
            }
            height={16}
            width={16}
            alt=""
            className="profilebannerimg"
          />
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-1">
              <h6 className="profile-event-title mb-0">{event.title}</h6>
              <div
                className="profile-event-tag position-relative d-flex align-items-center justify-content-center px-1"
                style={{ background: "#B8B8E0", top: 0, right: 0 }}
              >
                <span
                  className="profile-event-tag-text mb-0"
                  style={{ color: "#404040" }}
                >
                  Expired
                </span>
              </div>
            </div>
            <span className="profile-event-rewards mb-0">
              {event.totalRewards}
            </span>
          </div>
        </div>
        {/* <img src={dypiusProfileBanner} alt="" className="dypiusprofile-banner"/> */}
      </div>
      <div className="profile-event-bottom p-2 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-1">
          {event.title === "Dogecoin" || event.title === "CoinMarketCap" ? (
            <img src={'https://cdn.worldofdypians.com/wod/grayExplore.svg'} height={15} width={15} alt="" />
          ) : (
            <img src={'https://cdn.worldofdypians.com/wod/grayFind.svg'} height={15} width={15} alt="" />
          )}

          <span className="mb-0 event-bottom-text" style={{ color: "#B8B8E0" }}>
            {event.title === "Dogecoin" || event.title === "CoinMarketCap"
              ? "Explore & Mine"
              : "Explore & Find"}
          </span>
        </div>
        {userEarnedUsd  != undefined &&
        <div className="d-flex align-items-center gap-1">
        {event.title === "Dypius" ? (
          <img src={'https://cdn.worldofdypians.com/wod/dypius.svg'} height={15} width={15} alt="" />
        ) : (
          <img src={'https://cdn.worldofdypians.com/wod/grayDollar.svg'} height={15} width={15} alt="" />
        )}

        <span className="mb-0 event-bottom-text" style={{ color: "#B8B8E0" }}>
          {event.title === "Dypius" ? (
            <>{getFormattedNumber(userEarnedUsd, 0)} DYP</>
          ) : (
            <>${getFormattedNumber(userEarnedUsd, 2)}</>
          )}
        </span>
      </div>
        }

        <img src={'https://cdn.worldofdypians.com/wod/grayArrow.svg'} height={15} width={15} alt="" />
      </div>
    </div>
  );
};

export default ExpiredProfileEvent;
