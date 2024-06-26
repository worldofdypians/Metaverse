import React from "react";
import Modal from "../General/Modal";
import OutsideClickHandler from "react-outside-click-handler";

const WalletModal = ({ handleClose, show, handleConnection }) => {
  return (
    <Modal visible={show} onModalClose={handleClose} maxWidth={500}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className="walletmodal-wrapper">
          <div className="sc-jwKygS bFQpTL">
            <h3 style={{ fontSize: 20, color: '#fff' }}>Connect to a wallet</h3>
          </div>
          <div>
            <div className="row flex-column" style={{ gap: 20 }}>
              <button
                onClick={handleConnection}
                id="connect-METAMASK"
                className="walletbutton"
              >
                <div
                  color="#E8831D"
                  className="justify-content-between d-flex w-100 align-items-center"
                >
                  <span style={{ color: '#fff' }}>MetaMask</span>
                  <img
                    src={require("./wallets/metamask.svg").default}
                    width={50}
                    height={50}
                    alt="Icon"
                  />
                </div>
              </button>
            
              <button
                onClick={handleConnection}
                id="connect-COIN98"
                className="walletbutton"
              >
                <div
                  color="#E8831D"
                  className="justify-content-between d-flex w-100 align-items-center"
                >
                  <span style={{ color: '#fff' }}>Coin98</span>
                  <img
                    src={require("./wallets/coin98.svg").default}
                    width={50}
                    height={50}
                    alt="Icon"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default WalletModal;
