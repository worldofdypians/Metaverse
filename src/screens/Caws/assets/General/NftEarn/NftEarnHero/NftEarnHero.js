import React from "react";
import ListDataItem from "../../ListDataItem/ListDataItem";
import SvgAvaxIcon from "../../ListDataItem/SvgAvaxIcon";
import SvgBscIcon from "../../ListDataItem/SvgBscIcon";
import SvgEthIcon from "../../ListDataItem/SvgEthIcon";
import TitleWithParagraph from "../../TitleWithParagraph/TitleWithParagraph";
import CountUp from "react-countup";

import PropTypes from "prop-types";
const devicewidth = window.innerWidth;

const NftEarnHero = ({
  eth,
  bnb,
  avax,
  rewardsValue,
  rewardsLabel,
  mainTitle,
  subTitle,
}) => {
  return (
    <div className="nft-earn-hero">
      <div
        className="container-fluid"
        style={{ padding: devicewidth < 500 ? "0px 15px" : "0px 80px" }}
      >
        <div className="row">
          <div className=" col-sm-9 col-md-9 col-lg-6 order-2 order-sm-1 ">
            <div className="earn-data-section">
              <div className="main-data">
                <div className="div">
                  <p className="price">
                    {" "}
                    <CountUp
                      style={{fontWeight: 700 }}
                      start={rewardsValue - 400.0}
                      end={rewardsValue}
                      duration={120}
                      separator=","
                      decimals={2}
                      prefix="$"
                    />
                  </p>
                  <p className="text">{rewardsLabel}</p>
                </div>
                <img
                  src={
                    require("../../ArrowIcons/arrow-trending-up.svg").default
                  }
                  alt=""
                />
              </div>
              <div className="list-items">
                <div className="blur-circle"></div>
                <div className="blur-circle small"></div>
                <ListDataItem text={eth} icon={<SvgEthIcon />} />
                <ListDataItem text={bnb} icon={<SvgBscIcon />} />
                <ListDataItem text={avax} icon={<SvgAvaxIcon />} />
              </div>
            </div>
          </div>
          <div className=" col-sm-3 col-md-3 col-lg-6 d-flex align-items-center order-1 order-sm-2 mb-2 md-sm-0">
            <TitleWithParagraph>
              <h1>{mainTitle}</h1>
              <p style={{ fontSize: 14 }}>{subTitle}</p>
            </TitleWithParagraph>
          </div>
        </div>
      </div>
    </div>
  );
};

NftEarnHero.propTypes = {
  eth: PropTypes.string,
  bnb: PropTypes.string,
  avax: PropTypes.string,
  rewardsValue: PropTypes.string,
  rewardsLabel: PropTypes.string,
  mainTitle: PropTypes.string,
  subTitle: PropTypes.string,
};

export default NftEarnHero;
