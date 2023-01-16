import React, { useState } from "react";
import purpleWallet from "../../assets/landAssets/purpleWallet.svg";
import greenWallet from "../../assets/landAssets/greenWallet.svg";
import dummyBadge from "../../assets/landAssets/dummyBadge.png";
import questionMark from "../../assets/landAssets/questionMark.svg";
import addActive from "../../assets/landAssets/addActive.svg";
import addInactive from "../../assets/landAssets/addInactive.svg";
import subtractActive from "../../assets/landAssets/subtractActive.svg";
import subtractInactive from "../../assets/landAssets/subtractInactive.svg";
import mintEthIcon from "../../assets/landAssets/mintEthIcon.svg";
import tooltipIcon from "../../assets/landAssets/tooltipIcon.svg";
import genesisBg from "../../assets/landAssets/genesisBg.svg";

const LandStaking = () => {

  const [nftCount, setNftCount] = useState(null)

  const addNft = () => {
    if(nftCount === null){
      setNftCount(1)
    }else if(nftCount < 10){
      setNftCount(nftCount + 1)
    }
    console.log(nftCount);
  }
  const subtractNft = () => {
    if(nftCount === null){
      setNftCount(1)
    }else if(nftCount > 1){
      setNftCount(nftCount - 1)
    }
    console.log(nftCount);
  }

  return (
    <>
      <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
        <div className="col-12 ps-2 ps-lg-0">
        <div className="d-flex align-items-end justify-content-between">
          <div className="d-flex flex-column gap-2">
          <span className="connect-wallet-title font-organetto">
            Connect{" "}
            <span className="connect-wallet-title" style={{ color: "#8c56ff" }}>
              wallet 
            </span>
          </span>
          <div className="p-4 connect-wallet-wrapper d-flex align-items-center justify-content-center gap-5">
            <div className="d-flex align-items-center gap-3">
              <img src={purpleWallet} alt="wallet" />
              <span className="connect-wallet-content">
                Please connect your wallet
              </span>
            </div>
            <button className="btn wallet-btn d-flex align-items-center justify-content-center gap-2">
              <img src={greenWallet} alt="wallet" />
              <span className="wallet-text">Connect wallet</span>
            </button>
          </div>
          </div>
          <div className="d-flex flex-column gap-2">
          <span className="connect-wallet-title font-organetto">
            Mint time{" "}
            <span className="connect-wallet-title" style={{ color: "#8c56ff" }}>
              remaining 
            </span>
          </span>
          <div className="timer-wrapper d-flex align-items-start gap-3">
            <div className="d-flex flex-column gap-1">
              <h6 className="mint-time">14</h6>
              <span className="days">Days</span>
            </div>
            <h6 className="mint-time">:</h6>
            <div className="d-flex flex-column gap-1">
              <h6 className="mint-time">23</h6>
              <span className="days">Hours</span>
            </div>
            <h6 className="mint-time">:</h6>
            <div className="d-flex flex-column gap-1">
              <h6 className="mint-time">46</h6>
              <span className="days">minutes</span>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
      <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
        <div className="col-2 ps-2 ps-lg-0">
          <div className="d-flex flex-column gap-5">
            <div className="genesis-wrapper position-relative">
            <img src={genesisBg} alt="genesis" className="w-100" />
            <img src={dummyBadge} className="genesis-badge" alt="badge" />
            <div className="genesis-desc">
              <h6 className="font-organetto land-desc w-75">Genesis Land</h6>
            </div>
            </div>
            <div className="linear-border">
              <button className="btn outline-btn px-5 w-100">
                View collection
              </button>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="p-3 mint-wrapper d-flex flex-column gap-5">
            <span className="font-organetto land-stake-title">
            <span className="font-organetto" style={{color: '#8c56ff'}}>Mint</span> Genesis Land NFT
            </span>
            <div className="d-flex align-items-center justify-content-between">
              <span className="create-land-title font-poppins">
                Create your NFT
              </span>
              <div className="d-flex align-items-center gap-2">
                <span className="more-info">More information</span>
                <img src={questionMark} alt="" />
              </div>
            </div>
            <div className="d-flex mt-3 align-items-center">
              <div className="d-flex flex-column gap-2 w-50">
                <span className="land-placeholder">Name</span>
                <h6 className="land-name">Land #2553</h6>
              </div>
              <div className="d-flex flex-column gap-2 w-50">
                <span className="land-placeholder">Description</span>
                <h6 className="land-name">Premium land tier 1</h6>
              </div>
            </div>
            <hr className="mint-divider m-0" />
            <div className="d-flex align-items-center justify-content-between pb-4">
              <div className="input-container position-relative w-50">
                <input
                  type="number"
                  placeholder="Nr. of Land NFT to create"
                  max={10}
                  min={1}
                  className="land-input w-100"
                  value={nftCount}
                  onChange={(e) => setNftCount(e.target.value)}
                />
                <span className="limit-span">*10 NFT limit per wallet</span>
              </div>
              <div className="d-flex align-items-center gap-5">
                <img src={nftCount > 1 ? subtractActive : subtractInactive} alt="subtract" onClick={subtractNft} style={{cursor: 'pointer'}} />
                <img src={nftCount < 10 ? addActive : addInactive} alt="add" onClick={addNft} style={{cursor: 'pointer'}} />
              </div>
            </div>
            <hr className="mint-divider m-0" />
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={mintEthIcon} alt="ethereum" />
                <span className="eth-price">Price: 0.08 ETH</span>
              </div>
              <div className="linear-border">
                <button className="btn filled-btn px-5 w-100">
                  Mint NFT
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 pe-2 pe-lg-0">
          <div className="p-3 mint-wrapper d-flex flex-column gap-3">
            <span className="font-organetto land-stake-title">
              Land NFT <span className="font-organetto" style={{color: '#8c56ff'}}>staking</span>
            </span>
            <div className="d-flex align-items-center justify-content-between">
              <span className="create-land-title font-poppins">
                Land NFT's staking
              </span>
              {/* <img src={tooltipIcon} alt="tooltip" /> */}
            </div>
            <hr className="mint-divider" />
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex flex-column gap-2">
                <h6 className="land-apr">25% <span className="land-apr" style={{color: '#8c56ff'}}>APR</span></h6>
                <span className="land-lock-time">No lock time</span>
              </div>
              <div className="linear-border">
                <button className="btn filled-btn px-5 w-100">Stake NFT</button>
              </div>
            </div>
            <hr className="mint-divider" />
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column gap-1">
                <h6 className="create-land-title">Total rewards</h6>
                <span className="earned-span">Earned</span>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={mintEthIcon}
                      width={20}
                      height={20}
                      alt="ethereum"
                    />
                    <span className="eth-rewards">0.74 ETH</span>
                  </div>
                  <span className="eth-rewards">($1,475.12)</span>
                </div>
              </div>
              <div className="linear-border">
                <button className="btn filled-btn px-5 w-100">Claim</button>
              </div>
            </div>
            <hr className="mint-divider" />
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex flex-column gap-2">
                <h6 className="create-land-title">Unstake</h6>
                <span className="land-lock-time w-50">
                  Withdraw your deposited NFTs from the staking pool
                </span>
              </div>
              <div className="linear-border">
                <button className="btn outline-btn px-5 w-100">Withdraw</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandStaking;
