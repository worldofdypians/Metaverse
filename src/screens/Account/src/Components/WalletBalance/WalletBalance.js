import React, { useState, useEffect } from "react";
import "./_walletbalance.scss";
import walletIcon from "./assets/walletIcon.svg";
import ethIcon from "./assets/ethIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import avaxIcon from "./assets/avaxIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import copyIcon from "./assets/copyIcon.svg";
import Clipboard from "react-clipboard.js";
import { shortAddress } from "../../Utils.js/hooks/shortAddress";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import walletImg from "../../Images/userProfile/wallet.svg";
import circleArrow from "../../Images/userProfile/arrow-circle.svg";
import idyp from "../../Images/userProfile/idyp.svg";


const WalletBalance = ({
  dypBalance,
  address,
  coinbase,
  dypBalancebnb,
  dypBalanceavax,
  isVerified,
  // handleConnectWallet,
  handleShowWalletPopup,
  idypBalance,
  idypBalancebnb,
  idypBalanceavax
}) => {
  let id = Math.random().toString(36);

  const windowSize = useWindowSize();
  const [tooltip, setTooltip] = useState(false);




  return (
    <div className="wallet-balance d-flex flex-column gap-2 p-3 position-relative">
      {isVerified === false || !address ? (
        <div className="walletconnectBtn w-100" onClick={handleShowWalletPopup}>
          <div className="d-flex gap-2 justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
              <img src={walletImg} alt="" />
              <div className="d-flex flex-column">
                <span className="firsttitle">Connect wallet</span>
                <span className="secondTitle">Link your wallet</span>
              </div>
            </div>
            <img src={circleArrow} alt="" />
          </div>
        </div>
      ) : (
        <>
          <Clipboard
            component="div"
            data-event="click"
            data-for={id}
            data-tip="Copied To Clipboard!"
            data-clipboard-text={address}
            className="wallet-wrapper p-3 d-flex align-items-center gap-2"
            onClick={() => {setTooltip(true);
              setTimeout(() => setTooltip(false), 1000);
            }}
          >
            <img src={walletIcon} alt="" className="wallet-icon" />
            <div className="d-flex flex-column">
              <span className="wallet-span">Wallet address</span>
              <div className="d-flex align-items-center gap-2">
                <span className="wallet-address">
                  {windowSize.width < 500 ? shortAddress(address) : address}
                </span>
                <img src={copyIcon} alt="copy" className="copy-icon" />
              </div>
            </div>
          </Clipboard>
          <div className={`tooltip-wrapper p-2 ${tooltip && "tooltip-active"}`} style={{top: 'auto', right: 0}}>
            <p className="tooltip-content m-0">Copied!</p>
          </div>
        </>
      )}
      {!address ? (
        <span className="walletinfo">
          *Note that once you link a wallet to your profile, it cannot be
          changed.
        </span>
      ) : (
        <span className="walletinfo">
          *This wallet is associated to your profile and cannot be changed.
        </span>
      )}
<div className="separator"></div>

      <div className="d-flex flex-column gap-2">
        <span className="multipe-wallet">Multi-chain DYP balance</span>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative">
          <img src={ethIcon} alt="" className="chain-icon" />
          <span className="chain-title">Ethereum</span>
          <div className="d-flex align-items-center gap-2">
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(dypBalance, 2)} DYP
            </h6>
            <img src={dypIcon} alt="dyp" className="dyp-icon" />
          </div>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative">
          <img src={bnbIcon} alt="" className="chain-icon" />
          <span className="chain-title">BNB Chain</span>
          <div className="d-flex align-items-center gap-2">
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(dypBalancebnb, 2)} DYP
            </h6>
            <img src={dypIcon} alt="dyp" className="dyp-icon" />
          </div>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative">
          <img src={avaxIcon} alt="" className="chain-icon" />
          <span className="chain-title">Avalanche</span>
          <div className="d-flex align-items-center gap-2">
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(dypBalanceavax, 2)} DYP
            </h6>
            <img src={dypIcon} alt="dyp" className="dyp-icon" />
          </div>
        </div>
      </div>
<div className="separator"></div>
      <div className="d-flex flex-column gap-2">
        <span className="multipe-wallet">Multi-chain iDYP balance</span>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative">
          <img src={ethIcon} alt="" className="chain-icon" />
          <span className="chain-title">Ethereum</span>
          <div className="d-flex align-items-center gap-2">
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(idypBalance, 2)} iDYP
            </h6>
            <img src={idyp} alt="dyp" className="dyp-icon" style={{height: 16, width: 16}}/>
          </div>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative">
          <img src={bnbIcon} alt="" className="chain-icon" />
          <span className="chain-title">BNB Chain</span>
          <div className="d-flex align-items-center gap-2">
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(idypBalancebnb, 2)} iDYP
            </h6>
            <img src={idyp} alt="dyp" className="dyp-icon"  style={{height: 16, width: 16}}/>
          </div>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative">
          <img src={avaxIcon} alt="" className="chain-icon" />
          <span className="chain-title">Avalanche</span>
          <div className="d-flex align-items-center gap-2">
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(idypBalanceavax, 2)} iDYP
            </h6>
            <img src={idyp} alt="dyp" className="dyp-icon"  style={{height: 16, width: 16}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
