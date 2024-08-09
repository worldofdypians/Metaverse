import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import PropTypes from "prop-types";
import weth from "./assets/weth.svg";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import { formattedNum } from "../../screens/Caws/functions/formatUSD";

const CawsPremiumChecklist = ({
  modalId,
  nft,
  isStake,
  checked,
  checklistItemID,
  onChange,
  countDownLeft,
  checked2,
  coinbase,
  isConnected,
  width,
}) => {
  const [checkbtn, setCheckBtn] = useState(false);
  const [Unstakebtn, setUnstakeBtn] = useState(false);
  const [checkPassiveBtn, setcheckPassiveBtn] = useState(false);

  const [EthRewards, setEthRewards] = useState(0);

  const [ethToUSD, setethToUSD] = useState(0);
  const [loading, setloading] = useState(false);

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

    let calculateRewards;
 
    let  staking_contract = await new window.infuraweb3.eth.Contract(
      window.CAWSPREMIUM_ABI,
      window.config.nft_caws_premiumstake_address
    );

    if (address !== null && currentId) {
      calculateRewards = await staking_contract.methods
        .calculateReward(address, parseInt(currentId))
        .call()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          // window.alertify.error(err?.message);
        });
      const infuraWeb3 = new Web3(window.config.infura_endpoint);

      let a = infuraWeb3.utils.fromWei(calculateRewards, "ether");
  
      const ethprice = await convertEthToUsd();
      setethToUSD(Number(ethprice) * Number(a));
      setEthRewards(Number(a));
    }
  };

  const handleClaim = async (itemId) => {
    let staking_contract = await window.getContractCawsPremiumNFT(
      "CAWSPREMIUM"
    );

    await staking_contract.methods
      .claimRewards([itemId])
      .send()
      .then(() => {
        // setethToUSD(0);
        setEthRewards(0);
      })
      .catch((err) => {
        window.alertify.error(err?.message);
      });
  };

  const handleUnstake = async (itemId) => {
    let stake_contract = await window.getContractCawsPremiumNFT(
      "CAWSPREMIUM"
    );
    setloading(true);

    await stake_contract.methods
      .withdraw([itemId])
      .send()
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
    let  staking_contract = await new window.infuraweb3.eth.Contract(
      window.CAWSPREMIUM_ABI,
      window.config.nft_caws_premiumstake_address
    );
    
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
    if (isStake === false) {
      if (checked2 === true) {
        setCheckBtn(!checkbtn);
        onChange(checklistItemID);
      } else if (checked2 === false) {
        setCheckBtn(!checkbtn);
        onChange(checklistItemID);
      }
    } else if (isStake === true) {
      if (checked2 === true) {
        setUnstakeBtn(!Unstakebtn);
        onChange(checklistItemID);
      } else if (checked2 === false) {
        setUnstakeBtn(!Unstakebtn);
        onChange(checklistItemID);
      }
    }
  };
 
  return (
    <div className="d-flex flex-column gap-2">
      <div
        className="nft-caw-card sub-container p-0 m-0"
        data-toggle="modal"
        data-target={modalId}
        onClick={() => {
          handleCawClick(checklistItemID);
        }}
        style={{
          width: width,
          height: "auto",
          borderRadius: "20px",
          border: isStake
            ? checked === true
              ? Unstakebtn === true
                ? "2px solid #4ED5D2"
                : "2px solid transparent"
              : Unstakebtn === true
              ? "2px solid #4ED5D2"
              : "2px solid transparent"
            : checked === false && checkbtn === true && checked2 === true
            ? "2px solid #4ED5D2"
            : checked === true && checkbtn === true && checked2 === true
            ? "2px solid #4ED5D2"
            : "2px solid transparent",
        }}
      >
        <div
          className="elevated-stake-container p-0"
          style={{
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            className="sub-container p-0 position-relative"
            style={{ boxShadow: "none", borderRadius: "20px" }}
          >
            <img
              src={nft.image.replace("images", "thumbs")}
              className="nft-img"
              alt=""
              style={{ borderRadius: "20px 20px 0px 0px" }}
            />
            {!isStake && (
              <div
                className="name-wrapper d-flex justify-content-center p-2"
                style={{ bottom: "55px" }}
              >
                <span className="nft-card-name">{nft.name}</span>
              </div>
            )}
            <div className="d-flex flex-column py-3 px-2">
              <div className="d-flex w-100 justify-content-between align-baseline">
                <p
                  className="nft-id"
                  style={{
                    color: "#B8B8E0",
                  }}
                >
                {nft.name}
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
      {isStake && (
        <>
          <div
            className="earn-checklist-container2 d-block mb-0 py-2 px-3 w-100"
            style={{ boxShadow: "none", borderTop: "none" }}
          >
            <div className="d-flex flex-column justify-content-between">
              <p id="earnedText2" className="m-0">
                Earned
              </p>
              <div className="d-flex gap-2 align-items-center justify-content-between">
                <h6
                  className="rewardtxtCawswod d-flex align-items-center gap-2 m-0"
                  style={{ fontSize: 16 }}
                >
                  <img src={weth} alt="" style={{ height: 20, width: 20 }} />{" "}
                  {getFormattedNumber(EthRewards, 3)} ETH
                </h6>
                <span className="nft-price-usd">
                  {formattedNum(ethToUSD, true)}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-between">
            <button
              className={`pill-btn ${
                EthRewards == 0 && "disabled-approve-btn"
              } w-100 p-2`}
              onClick={(e) => {
                e.stopPropagation();
                handleClaim(checklistItemID);
              }}
              style={{
                pointerEvents: EthRewards == 0 ? "none" : "auto",
              }}
            >
              Claim
            </button>
            <button
              className={` ${
                Unstakebtn ? "withdrawbtn border-0" : "disabled-approve-btn"
              } w-100 p-2`}
              onClick={() => {
                handleUnstake(checklistItemID);
              }}
              style={{
                pointerEvents: checkPassiveBtn === true ? "auto" : "none",
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
        </>
      )}
    </div>
  );
};
CawsPremiumChecklist.propTypes = {
  modalId: PropTypes.string,
  nft: PropTypes.object,
  isStake: PropTypes.bool,
  checked: PropTypes.bool,
  checklistItemID: PropTypes.number,
  onChange: PropTypes.func,
  // onNftCheckListClick: PropTypes.func,
  countDownLeft: PropTypes.any,
  coinbase: PropTypes.string,
  isConnected: PropTypes.bool,
};

export default CawsPremiumChecklist;
