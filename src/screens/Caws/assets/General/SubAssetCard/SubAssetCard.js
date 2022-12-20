import React from "react";
import { PropTypes } from "prop-types";
import CircleButton from "../CircleButton";
import ChevronArrowSvg from "../ChevronArrowSvg/ChevronArrowSvg";

const SubAssetCard = ({
  icons,
  percentage,
  total_value_locked,
  lock_time,
  big_icon,
  action,
  hasCircleButton,
  name,
  link,
}) => {
  return (
  <a href={link} target="_blank">
    <div className="sub-asset-card-wrapper">
      <div className="data-section">
        <div className="data-section-top">
          <div className="icons-name">
            <div className="icons">
              {icons?.length > 0 &&
                icons.map((icon, id) => (
                  <img
                    key={id}
                    style={{ marginRight: 6, width: 35 }}
                    src={require("../Icons/" + icon)}
                    alt=""
                    className={`${icons.length == 1 ? "one-image" : ""}`}
                  />
                ))}
            </div>

            <p>{name && name}</p>
          </div>
          <p>{percentage} APR</p>
        </div>
        {total_value_locked && (
          <div className="data-section-middle">
            <p style={{color: 'var(--black)'}}>Total Value Locked</p> <p style={{color: 'var(--black)'}}>{total_value_locked}</p>
          </div>
        )}
        <div className="data-section-bottom">
          <p style={{color: 'var(--black)'}}>Lock Time</p> <p style={{color: 'var(--black)'}}>{lock_time}</p>
        </div>
      </div>
      {hasCircleButton && (
        
          <div
            className={`button-icon-section d-flex flex-column ${
              big_icon
                ? "justify-content-between align-items-center"
                : "justify-content-center"
            }`}
          >
            {big_icon && (
              <img
                style={{ marginRight: 6, width: 35 }}
                src={require("../Icons/" + big_icon)}
                alt=""
                className="big_icon"
              />
            )}

            <CircleButton action={action} size="30">
              <ChevronArrowSvg />
            </CircleButton>
          </div>
        
      )}
    </div>
    </a>
   
  );
};
SubAssetCard.defaultProps = {
  hasCircleButton: true,
};
SubAssetCard.propTypes = {
  icons: PropTypes.array,
  percentage: PropTypes.string,
  total_value_locked: PropTypes.string,
  lock_time: PropTypes.string,
  big_icon: PropTypes.string,
  action: PropTypes.func,
  hasCircleButton: PropTypes.bool,
  name: PropTypes.string,
};

export default SubAssetCard;
