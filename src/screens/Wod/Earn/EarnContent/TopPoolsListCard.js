import React, { useState } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";
import arrowFilled from "../assets/arrow-filled.svg";

const TopPoolsListCard = ({
  isAccount,
  tokenLogo,
  tokenName,
  apr,
  lockTime,
  tvl,
  onShowDetailsClick,
  onHideDetailsClick,
  cardType,
  renderedPage,
  details,
  isStaked,
  isNewPool,
  tag,
  display,
  expired,
  network,
  isPremium,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const windowSize = useWindowSize();

  const handleDetails = () => {
    if (details === false) {
      onShowDetailsClick();
    } else if (details === true) {
      onHideDetailsClick();
    }
  };

  return (
    <div
      className={`w-100 p-lg-3 p-2 ${
        expired === true
          ? "poolscardwrapperexpired"
          : network === "0"
          ? "blurryCard"
          : "poolscardwrapper"
      } cursor-pointer position-relative ${details && "pools-card-open"} ${
        showDetails && "pools-card-hover"
      } ${renderedPage === "dashboard" && !details ? "pools-card-hover" : ""}`}
      onClick={() => handleDetails()}
      style={{ display: display }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <table className="earnother-table w-100">
        <tbody>
          <tr className="d-flex w-100 align-items-center justify-content-between">
            <td className="earnother-td col-lg-2">
              <div
                className={`col-12 d-flex align-items-center gap-2 justify-content-start`}
              >
                {tokenLogo !== undefined &&
                  tokenLogo.map((obj, index) => {
                    return (
                      <img
                        src={require(`../assets/tokens/${obj}.png`)}
                        alt=""
                        className="pool-coins"
                        style={{ width: windowSize && windowSize.width > 991 ? 40 : '', height: windowSize && windowSize.width > 991 ? 40 : '' }}
                      />
                    );
                  })}

                <h5
                  className="text-white m-0 tokeninfotxt"
                  style={{ fontWeight: "600" }}
                >
                  {tokenName}
                </h5>
              </div>
            </td>
            <td className="earnother-td col-1 col-lg-2 col-md-2">
              <div className="d-flex align-items-center gap-2">
                <h5
                  style={{
                    fontWeight: "300",
                    color: "#F7F7FC",
                  }}
                  className="m-0 tokeninfotxt"
                >
                  {apr}
                </h5>
              </div>
            </td>

            <td className="earnother-td col-lg-2">
              <h5
                style={{
                  fontWeight: "300",
                  color: "#F7F7FC",
                }}
                className="m-0 tokeninfotxt"
              >
                {lockTime}
              </h5>
            </td>
            <td className="earnother-td col-lg-2">
              <h5
                className="text-white d-flex align-items-center gap-1 m-0"
                style={{
                  fontSize: "12px",
                  fontWeight: "300",
                  color: "#F7F7FC",
                }}
              >
                <img
                  src={require(`../assets/tokens/ethIcon.svg`).default}
                  alt=""
                  className="token-chain-logo"
                />
                Ethereum
              </h5>
            </td>
            {windowSize && windowSize.width > 991 ? (
              <td className="earnother-td col-lg-2 justify-content-end">
                <h6 className="details-text2 py-2 gap-1 d-flex align-items-center w-75 cursor-pointer justify-content-center m-0">
                  Stake
                </h6>
              </td>
            ) : (
              <td className="earnother-td col-lg-1 justify-content-end">
                <img src={arrowFilled} alt="" className="earn-filled-arrow" />
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopPoolsListCard;
