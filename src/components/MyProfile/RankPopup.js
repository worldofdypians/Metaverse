import React, { useState, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Tooltip, tooltipClasses } from "@mui/material";
import styled from "styled-components";
import Slider from "react-slick";
import premiumOfferTag from "../../screens/Account/src/Components/ProfileCard/assets/premiumOfferTag2.png";
import premiumExclusive from "../../screens/Account/src/Components/ProfileCard/assets/premiumExclusive2.svg";
import pointerArrow from "../../screens/Account/src/Components/ProfileCard/assets/pointerArrow.svg";
import tooltipIcon from "../../screens/Account/src/Components/ProfileCard/assets/tooltipIcon.svg";
import useWindowSize from "../../hooks/useWindowSize";
import xMark from "../../screens/Account/src/Components/WalletBalance/newAssets/xMark.svg";
import starterBust from "../../screens/Account/src/Components/ProfileCard/assets/starterBust.png";
import rookieBust from "../../screens/Account/src/Components/ProfileCard/assets/rookieBust.png";
import underdogBust from "../../screens/Account/src/Components/ProfileCard/assets/underdogBust.png";
import championBust from "../../screens/Account/src/Components/ProfileCard/assets/championBust.png";
import unstoppableBust from "../../screens/Account/src/Components/ProfileCard/assets/unstoppableBust.png";
import x4rounded from "../../screens/Account/src/Components/ProfileCard/assets/x4Rounded.svg";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1b1c3a",
    color: "#fff",
    maxWidth: 220,
    fontFamily: "Poppins",
  },
}));

const RankPopup = ({
  rankData,
  onClose,
  isPremium,
  onPremiumClick,
  userRankName,
  userTotalScore,
}) => {
  const [exclusivePremium, setExclusivePremium] = useState(false);
  const [rankTooltip, setRankTooltip] = useState(false);
  const windowSize = useWindowSize();
  const sliderRef = useRef(null);

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <OutsideClickHandler onOutsideClick={() => onClose()}>
      <div
        className="popup-wrapper leaderboard-popup rank-popup popup-active p-3"
        id="leaderboard"
        style={{ width: "70%", pointerEvents: "auto" }}
      >
        {rankData?.multiplier === "no" && !isPremium ? (
          <>
            <img
              src={premiumOfferTag}
              className={`premium-offer-tag ${
                exclusivePremium ? "premium-shadow-active" : ""
              }`}
              onClick={() =>
                exclusivePremium
                  ? setExclusivePremium(false)
                  : setExclusivePremium(true)
              }
              alt=""
            />
            <OutsideClickHandler
              onOutsideClick={() => setExclusivePremium(false)}
            >
              <img
                src={premiumExclusive}
                onClick={() => {
                  onPremiumClick();
                  onClose();
                  setExclusivePremium(false);
                }}
                className={`premium-exclusive ${
                  exclusivePremium ? "premium-exclusive-active" : ""
                }`}
                alt=""
              />
            </OutsideClickHandler>
          </>
        ) : (
          <></>
        )}
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              <h2
                className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle rankingsPopupTitle gap-2`}
              >
                Rankings and Rewards
              </h2>
              <OutsideClickHandler onOutsideClick={() => setRankTooltip(false)}>
                <HtmlTooltip
                  open={rankTooltip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    <React.Fragment>
                      Rankings and Rewards offer players a way to track their
                      game progress and see the rewards they've earned for each
                      rank. These ranks are determined by the accumulation of
                      in-game points from both the BNB Chain and SKALE Network.
                      <br />
                      <br />
                      Each month, the ranks and points reset, giving everyone a
                      chance for a fresh start. As you climb the ranks, you'll
                      unlock rewards based on your final rank at the end of the
                      cycle.
                      <br />
                      <br />
                      <b>
                        The reward is not accumulative, meaning you only get the
                        reward for the rank you have
                      </b>
                    </React.Fragment>
                  }
                >
                  {" "}
                  <img
                    style={{ cursor: "pointer" }}
                    src={tooltipIcon}
                    width={25}
                    height={25}
                    onClick={() => setRankTooltip(true)}
                    alt=""
                  />
                </HtmlTooltip>
              </OutsideClickHandler>
            </div>
            <div
              className={` ${
                rankData?.multiplier === "yes" ? "activated-user-score" : ""
              } d-flex align-items-center gap-2 mt-2`}
            >
              <span
                className="your-score-span"
                style={{
                  marginLeft: rankData?.multiplier === "yes" ? "10px" : "0",
                }}
              >
                My points
              </span>
              <h6
                className="mb-0 your-score-text"
                style={{
                  color: rankData?.multiplier === "yes" ? "#FFC700" : "#1BF5FF",
                }}
              >
                {rankData?.multiplier === "yes"
                  ? getFormattedNumber(userTotalScore * 4, 0)
                  : getFormattedNumber(userTotalScore, 0)}
              </h6>
              {rankData?.multiplier === "yes" ? (
                <img src={x4rounded} width={30} alt="" />
              ) : (
                <></>
              )}
            </div>
          </div>
          <img
            src={xMark}
            onClick={() => onClose()}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>

        {windowSize.width > 991 ? (
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={starterBust}
                  className={`${
                    userRankName.name === "starter"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "starter"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  STARTER
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">0 - 11,999,999</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "starter"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$0</h6>
              </div>
            </div>
            <img src={pointerArrow} className="rank-pointer-arrow" alt="" />
            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={rookieBust}
                  className={`${
                    userRankName.name === "rookie"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "rookie"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  ROOKIE
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">12,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "rookie"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$5</h6>
              </div>
            </div>
            <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={underdogBust}
                  className={`${
                    userRankName.name === "underdog"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "underdog"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  UNDERDOG
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">24,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "underdog"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$10</h6>
              </div>
            </div>
            <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={championBust}
                  className={`${
                    userRankName.name === "champion"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "champion"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  CHAMPION
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">37,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "champion"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$25</h6>
              </div>
            </div>
            <img src={pointerArrow} className="rank-pointer-arrow" alt="" />

            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={unstoppableBust}
                  className={`${
                    userRankName.name === "unstoppable"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "unstoppable"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  UNSTOPPABLE
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">62,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "unstoppable"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$100</h6>
              </div>
            </div>
          </div>
        ) : (
          <Slider {...settings} ref={(c) => (sliderRef.current = c)}>
            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={starterBust}
                  className={`${
                    userRankName.name === "starter"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "starter"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  STARTER
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">0 - 11,999,999</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "starter"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$0</h6>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={rookieBust}
                  className={`${
                    userRankName.name === "rookie"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "rookie"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  ROOKIE
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">12,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "rookie"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$5</h6>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={underdogBust}
                  className={`${
                    userRankName.name === "underdog"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "underdog"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  UNDERDOG
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">24,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "underdog"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$10</h6>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={championBust}
                  className={`${
                    userRankName.name === "champion"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "champion"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  CHAMPION
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">37,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "champion"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$25</h6>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 single-rank-wrapper">
              <div className="d-flex flex-column align-items-center gap-0">
                <img
                  src={unstoppableBust}
                  className={`${
                    userRankName.name === "unstoppable"
                      ? "rank-img-active"
                      : "rank-img-inactive"
                  }`}
                  alt=""
                />
                <h6
                  className={`rank-title ${
                    userRankName.name === "unstoppable"
                      ? "rank-title-active"
                      : "rank-title-inactive"
                  } font-oxanium text-white mb-0`}
                >
                  UNSTOPPABLE
                </h6>
              </div>
              <div className="d-flex flex-column align-items-center gap-1">
                <span className="needed-points-span mb-0">Points Required</span>
                <span className="needed-points mb-0">62,000,000</span>
              </div>
              <div
                className={` ${
                  userRankName.name === "unstoppable"
                    ? "rank-active-div"
                    : "rank-inactive-div"
                }  d-flex align-items-center justify-content-center`}
              >
                <h6>$100</h6>
              </div>
            </div>
          </Slider>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default RankPopup;
