import React from "react";
import "./_bridgecontent.scss";
import eth from '../../../../components/Header/assets/eth.svg'
import bnb from '../../../../components/Header/assets/bnb.svg'
import wallet from '../../../../assets/wodAssets/wallet.svg'
import copy from '../../../../assets/wodAssets/copy.svg'


const BridgeContent = () => {
  return (
    <div className="ecosystem-wrapper position-relative d-flex justify-content-center align-items-center">
      <div className="custom-container w-100">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="bridge-token-wrapper p-3">
              <div className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-4">
                  <button className="bridge-btn-active d-flex align-items-center gap-2 px-3 py-1">
                      <img src={eth} alt="" />
                      Ethereum
                  </button>
                  <button className="bridge-btn-inactive d-flex align-items-center gap-2 px-3 py-1">
                      <img src={bnb} alt="" />
                      BNB Chain
                  </button>
                </div>
                <button className="bridge-wallet-btn d-flex align-items-center gap-2 px-3 py-1">
                  <img src={wallet} width={20} height={20} alt="" />
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6"></div>
        </div>
      </div>
    </div>
  );
};

export default BridgeContent;
