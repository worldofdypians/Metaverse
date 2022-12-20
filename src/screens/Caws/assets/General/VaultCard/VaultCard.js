import React from "react";
import { PropTypes } from "prop-types";
import CircleButton from "../CircleButton";
import ChevronArrowSvg from "../ChevronArrowSvg/ChevronArrowSvg";

const VaultCard = ({ icon, text, min_lock_time, percentage, action, link }) => {
  return (
    <div className="vault-card">
      <a href={link} target="_blank">
        <div className="vault-card-top">
          {icon && (
            <img
              src={require("../Icons/" + icon)}
              alt=""
              className="coin-icon"
              width={40}
            />
          )}
          <p className="accent-text" style={{color: 'var(--black)'}}>{text}</p>
          <div className="action-button">
            <CircleButton size="30" action={action}>
              <ChevronArrowSvg />
            </CircleButton>
          </div>
        </div>
        <div className="vault-card-middle">
          <p className="accent-text" style={{color: 'var(--black)'}}>Minimum Lock time</p>{" "}
          <p style={{color: 'var(--black)'}}>{min_lock_time}</p>
        </div>
        <div className="vault-card-bottom">
          <p className="accent-text" style={{color: 'var(--black)'}}>APR</p>{" "}
          <p className="accent-text" style={{color: 'var(--accent-green-nft)'}}>{percentage}</p>
        </div>
      </a>
    </div>
  );
};
VaultCard.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  min_lock_time: PropTypes.string,
  percentage: PropTypes.string,
  action: PropTypes.func,
};

export default VaultCard;
