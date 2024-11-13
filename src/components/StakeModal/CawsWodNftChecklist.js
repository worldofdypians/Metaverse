import React, { useState, useEffect } from "react";
import axios from "axios";
import { formattedNum } from "../../screens/Caws/functions/formatUSD";
import PropTypes from "prop-types";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import weth from "./assets/weth.svg";
import "./_stakemodal.scss";

const CawsWodNftChecklist = ({
  modalId,
  nft,
  landNft,
  isStake,
  checked,
  checklistItemID,
  landlistItemID,
  onChange,
  onChangeLand,
  countDownLeft,
  checked2,
  coinbase,
  isConnected,
}) => {
  const [checkbtn, setCheckBtn] = useState(false);
  const [Unstakebtn, setUnstakeBtn] = useState(false);
  const [checkPassiveBtn, setcheckPassiveBtn] = useState(false);

  const [EthRewards, setEthRewards] = useState(0);

  const [ethToUSD, setethToUSD] = useState(0);
  const [loading, setloading] = useState(false);
  const [loadingClaim, setloadingClaim] = useState(false);

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const calculateReward = async (currentId) => {
    const address = coinbase;

    let reward = await window.wod_caws
      .calculateRewardWodCaws(address, currentId)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
      });
    let finalReward = reward / 1e18;
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(finalReward));
    setEthRewards(Number(finalReward));
  };

  const handleClaim = async (itemId) => {
    setloadingClaim(true);
    await window.wod_caws
      .claimRewardsWodCaws([itemId])
      .then(() => {
        setloadingClaim(false);
        setEthRewards(0);
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        setloadingClaim(false);
      });
  };

  const handleUnstake = async (itemId, landId) => {
    setloading(true);

    await window.wod_caws
      .withdrawWodCaws([itemId], [landId])
      .then(() => {
        setcheckPassiveBtn(false);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    if (isConnected) {
      getStakesIds().then();
      calculateReward(checklistItemID).then();

      if (countDownLeft <= 0 && countDownLeft !== undefined) {
        setcheckPassiveBtn(true);
      }
    }
  }, [EthRewards, checklistItemID, isConnected, countDownLeft]);

  useEffect(() => {
    setCheckBtn(checked);
    setUnstakeBtn(checked);
  }, [checked, isStake]);

  if (!nft) {
    return null;
  }

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    let stakenft = [];
    if (address !== null) {
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });
      return myStakes;
    }
  };

  const handleCawClick = () => {
    if (isStake === true) {
      if (checked2 === true) {
        setUnstakeBtn(!Unstakebtn);
        onChange(checklistItemID);
        onChangeLand(landlistItemID);
      } else if (checked2 === false) {
        setUnstakeBtn(!Unstakebtn);
        onChange(checklistItemID);
        onChangeLand(landlistItemID);
      }
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      <div
        className="nft-caw-card sub-container p-0 container2 m-0"
        data-toggle="modal"
        data-target={modalId}
        onClick={() => {
          handleCawClick(checklistItemID);
        }}
        style={{
          width: 243,
          border: isStake
            ? checked === true
              ? Unstakebtn === true
                ? "2px solid #4ED5D2"
                : "none"
              : Unstakebtn === true
              ? "2px solid #4ED5D2"
              : "none"
            : checked === false && checkbtn === true && checked2 === true
            ? "2px solid #4ED5D2"
            : "none",
        }}
      >
        <div
          className="elevated-stake-container d-flex flex-column gap-1 p-0"
          style={{
            background: "transparent",
          }}
        >
          <div
            className="sub-container p-0 container2 "
            style={{ boxShadow: "none" }}
          >
            <div className="d-flex align-items-center imgcontainer">
              <img
                src={landNft?.image?.replace("images", "thumbs")}
                className="p-0 nft-img  w-100 h-100 landimg2"
                alt=""
              />
              <img
                src={nft.image.replace("images", "thumbs")}
                className="p-0 nft-img  w-100 h-100 cawsimg2"
                alt=""
              />
            </div>
            <p
              style={{
                color: "var(--light-gray-99-nft)",
              }}
            >
              {/* {nft.name} x WoD {landNft.name} */}
            </p>
            <div className="d-flex flex-column">
              <div className="d-flex w-100 justify-content-between align-baseline p-2">
                <p
                  className="nft-id"
                  style={{
                    color: "#B8B8E0",
                  }}
                >
                  WOD Land {landNft?.name} <br />
                  {nft?.name}
                </p>
                {isStake ? (
                  <>
                    <input
                      type="checkbox"
                      id={checklistItemID}
                      name="AddtoUnstake"
                      checked={Unstakebtn && checked2 === true}
                      onClick={() => {
                        setUnstakeBtn(!Unstakebtn);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      id={checklistItemID}
                      name="checkbtn"
                      checked={
                        checkbtn && isStake === false && checked2 === true
                      }
                      onChange={(e) => {
                        setCheckBtn(!checkbtn);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="earn-checklist-container2 d-block mb-0 py-2 px-3 w-100">
        <div className="d-flex flex-column justify-content-between">
          <p id="earnedText2" className="m-0">Earned</p>
          <div className="d-flex gap-2 align-items-center justify-content-between">
            <h6
              className="rewardtxtCawswod d-flex align-items-center gap-2 m-0"
              style={{ fontSize: 16 }}
            >
              <img src={weth} alt="" style={{ height: 20, width: 20 }} />{" "}
              {getFormattedNumber(EthRewards, 3)} ETH
            </h6>
            <span className="nft-price-usd">{formattedNum(ethToUSD, true)}</span>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 justify-content-between">
        <button
          className={ `pill-btn ${EthRewards == 0 && 'disabled-approve-btn'} mb-1 w-100 p-2`}
          onClick={(e) => {
            e.stopPropagation();
            handleClaim(checklistItemID);
          }}
          style={{
            pointerEvents: EthRewards == 0 ? "none" : "auto",
          }}
        >
          {loadingClaim ? (
            <>
              <div
                className="spinner-border "
                role="status"
                style={{ height: "1.5rem", width: "1.5rem" }}
              ></div>
            </>
          ) : (
            "Claim"
          )}
        </button>
        <button
          className={` ${Unstakebtn ? 'withdrawbtn' : 'disabled-approve-btn'} w-100 p-2`}
          onClick={() => {
            handleUnstake(checklistItemID, landlistItemID);
          }}
          style={{
            pointerEvents: Unstakebtn === true ? "auto" : "none",
          }}
        >
          {loading ? (
            <>
              <div
                className="spinner-border "
                role="status"
                style={{ height: "1.5rem", width: "1.5rem" }}
              ></div>
            </>
          ) : (
            "Unstake"
          )}
        </button>
      </div>
    </div>
  );
};
CawsWodNftChecklist.propTypes = {
  modalId: PropTypes.string,
  nft: PropTypes.object,
  landNft: PropTypes.object,
  isStake: PropTypes.bool,
  checked: PropTypes.bool,
  checklistItemID: PropTypes.number,
  landlistItemID: PropTypes.number,
  onChange: PropTypes.func,
  onChangeLand: PropTypes.func,
  countDownLeft: PropTypes.any,
  coinbase: PropTypes.string,
  isConnected: PropTypes.bool,
};

export default CawsWodNftChecklist;
