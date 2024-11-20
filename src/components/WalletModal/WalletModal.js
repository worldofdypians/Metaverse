import React from "react";
import Modal from "../General/Modal";
import OutsideClickHandler from "react-outside-click-handler";
import { isMobile } from "react-device-detect";

const WalletModal = ({
  handleClose,
  show,
  handleConnection,
  handleConnectionPassport,
  handleConnectBinance,
}) => {
  return (
    <Modal visible={show} onModalClose={handleClose} maxWidth={500}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className="walletmodal-wrapper px-3 py-4" id={"connect"}>
          <div className="sc-jwKygS bFQpTL">
            <h3 style={{ fontSize: 20 }} className="text-white mx-2 mx-lg-3">
              Connect to a wallet
            </h3>
          </div>
          <div className="wallet-items-wrapper">
            <div className="row flex-column mx-2 mx-lg-3 align-items-center gap-3">
              {(!isMobile ||
                (isMobile &&
                  (window.ethereum?.isMetaMask === true ||
                    window.ethereum?.isSafePal === true ||
                    !window.ethereum))) && (
                <button
                  onClick={handleConnection}
                  id="connect-METAMASK"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">
                      MetaMask
                    </span>
                    <img
                      src={require("./wallets/metamask.svg").default}
                      className="wallet-item-icon"
                      alt="Icon"
                    />
                  </div>
                </button>
              )}
              {(!isMobile ||
                (isMobile && window.ethereum?.isBinance === true) ||
                !window.ethereum) && (
                <button
                  onClick={handleConnectBinance}
                  id="connect-METAMASK"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">
                      Binance SDK Wallet
                    </span>
                    <img
                      src={require("./wallets/binanceWallet.png")}
                      className="wallet-item-icon"
                      alt="Icon"
                    />
                  </div>
                </button>
              )}
              {(!isMobile ||
                (isMobile &&
                  !window.ethereum?.isBinance &&
                  window.ethereum?.isMetaMask === true) ||
                !window.ethereum) && (
                <button
                  onClick={handleConnectionPassport}
                  id="connect-METAMASK"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">
                      Immutable Passport
                    </span>
                    <img
                      src={require("./wallets/immutableLogo.svg").default}
                      className="wallet-item-icon"
                      alt="Icon"
                    />
                  </div>
                </button>
              )}
              {(!isMobile ||
                (isMobile && window.gatewallet) ||
                !window.ethereum) && (
                <button
                  onClick={handleConnection}
                  id="connect-METAMASK"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">
                      Gate wallet
                    </span>
                    <img
                      src={require("./wallets/gate.jpg")}
                      className="wallet-item-icon"
                      alt="Icon"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                </button>
              )}
              {(!isMobile ||
                (isMobile && window.ethereum?.isCoinbaseWallet) ||
                !window.ethereum) && (
                <button
                  onClick={handleConnection}
                  id="connect-METAMASK"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">
                      Coinbase
                    </span>
                    <img
                      src={require("./wallets/coinbase.svg").default}
                      className="wallet-item-icon"
                      alt="Icon"
                    />
                  </div>
                </button>
              )}
              {(!isMobile ||
                (isMobile && window.coin98) ||
                !window.ethereum) && (
                <button
                  onClick={handleConnection}
                  id="connect-COIN98"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">Coin98</span>
                    <img
                      src={require("./wallets/coin98.svg").default}
                      className="wallet-item-icon"
                      alt="Icon"
                    />
                  </div>
                </button>
              )}
              {(!isMobile ||
                (isMobile &&
                  (window.ethereum?.isTrust === true ||
                    window.ethereum?.isSafePal === true ||
                    window.ethereum?.isBinance ||
                    !window.ethereum))) && (
                <button
                  onClick={handleConnection}
                  id="connect-COIN98"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">
                      Trust Wallet
                    </span>
                    <img
                      src={require("./wallets/trustwallet.svg").default}
                      className="wallet-item-icon"
                      alt="Icon"
                    />
                  </div>
                </button>
              )}
              {(!isMobile ||
                (isMobile && window.ethereum?.isSafePal === true) ||
                !window.ethereum) && (
                <button
                  onClick={handleConnection}
                  id="connect-COIN98"
                  className="walletbutton"
                >
                  <div
                    color="#E8831D"
                    className="justify-content-between d-flex w-100 align-items-center"
                  >
                    <span className="text-white wallet-item-name">SafePal</span>
                    <img
                      src={require("./wallets/safepal.svg").default}
                      className="wallet-item-icon"
                      alt="Icon"
                    />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default WalletModal;
