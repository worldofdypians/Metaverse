import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { formattedNum } from "../Caws/functions/formatUSD";
import getFormattedNumber from "../Caws/functions/get-formatted-number";

const LandItem = ({
  modalId,
  nft,
  isStake,
  checked,
  checklistItemID,
  onChange,

  coinbase,
  isConnected,
}) => {
  const [checkbtn, setCheckBtn] = useState(false);
  const [Unstakebtn, setUnstakeBtn] = useState(false);
  const [checkPassiveBtn, setcheckPassiveBtn] = useState(true);
  const [EthRewards, setEthRewards] = useState(0);

  const [ethToUSD, setethToUSD] = useState(0);
  const [loading, setloading] = useState(false);
  const [loadingclaim, setloadingclaim] = useState(false);


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
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");

    calculateRewards = await staking_contract.methods
      .calculateReward(address, [parseInt(currentId)])
      .call()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
      });

    let a = await window.infuraWeb3.utils.fromWei(calculateRewards, "ether");
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(a));
    setEthRewards(Number(a));
  };

  const handleClaim = async (itemId) => {
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    setloadingclaim(true)
    await staking_contract.methods
      .claimRewards([itemId])
      .send()
      .then(() => {
        // setethToUSD(0);
        setEthRewards(0);
    setloadingclaim(false)

      })
      .catch((err) => {
        window.alertify.error(err?.message);
    setloadingclaim(false)

      });
  };

  const handleUnstake = async (itemId) => {
    let stake_contract = await window.getContractLandNFT("LANDNFTSTAKING");
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
    }
    const interval = setInterval(async () => {
      calculateReward(checklistItemID);
    }, 2000);
    return () => clearInterval(interval);
  }, [EthRewards, checklistItemID, isConnected, coinbase]);

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
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });
    return myStakes;
  };

  const handleCawClick = () => {
    if (isStake === false) {
      setCheckBtn(!checkbtn);
      onChange(checklistItemID);
    } else if (isStake === true) {
      setUnstakeBtn(!Unstakebtn);
      onChange(checklistItemID);
    }
  };
  return (
    <>
      <div
        className="nft-caw-card"
        data-toggle="modal"
        data-target={modalId}
        style={{ width: 195 }}
        onClick={() => {
          handleCawClick(checklistItemID);
        }}
      >
        <div
          className="elevated-stake-container"
          style={{
            background: "rgb(38, 38, 79)",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <div
            style={{
              background: "#26264F",
              border: isStake
                ? checked === true
                  ? Unstakebtn === true
                    ? "2px solid #4ED5D2"
                    : "none"
                  : Unstakebtn === true
                  ? "2px solid #4ED5D2"
                  : "none"
                : checked === true && checkbtn === true
                ? "2px solid #4ED5D2"
                : checked === false && checkbtn === true
                ? "2px solid #4ED5D2"
                : "none",
                padding: 0, boxShadow: 'none'
            }}
            className="sub-container"
          >
            <img
              src={nft.image.replace("images", "thumbs")}
              className="nft-img"
              alt=""
              // onClick={() => {
              //   onNftCheckListClick(nft);
              // }}
              // style={{ cursor: "pointer" }}
            />
            <p
              style={{
                color: "#C0CBF7",
              }}
            >
              LAND {checklistItemID}
            </p>
            <div className="footer" style={{ flexDirection: "column" }}>
              <div className="d-flex w-100 justify-content-between align-baseline">
                <p
                  className="nft-id"
                  style={{
                    color: "#F7F7FC",
                  }}
                >
                  #{String(nft.name).replace("CAWS #", "")}
                </p>
                {isStake ? (
                  <>
                    <input
                      type="checkbox"
                      id={checklistItemID}
                      name="AddtoUnstake"
                      checked={Unstakebtn}
                      onClick={() => {
                        setUnstakeBtn(!Unstakebtn);
                        // onChange(checklistItemID);
                      }}
                      // style={{
                      //   pointerEvents:
                      //     checkPassiveBtn === true ? "auto" : "none",
                      // }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      id={checklistItemID}
                      name="checkbtn"
                      checked={checkbtn && isStake === false}
                      onChange={(e) => {
                        setCheckBtn(!checkbtn);
                        // onChange(checklistItemID);
                        //console.log(e.target.id);
                      }}
                    />
                  </>
                )}
              </div>
              {/* <div className="img">
              <SvgEyeIcon />
            </div> */}
              {isStake && (
                <>
                  <div
                    className="earn-checklist-container d-block mb-0 p-0 w-100"
                    style={{ boxShadow: "none", borderTop: "none" }}
                  >
                    <div className="d-flex flex-column align-items-baseline justify-content-between">
                      <p id="earnedText" style={{ color: "#C0C9FF" }}>
                        Pending
                      </p>
                      <div className="d-flex gap-1 align-items-center justify-content-between w-100 mb-2">
                        <p class="eth-rewards">
                          {getFormattedNumber(EthRewards, 2)}ETH
                        </p>
                        <p class="eth-rewards">
                          {formattedNum(ethToUSD, true)}
                        </p>
                      </div>
                      {/* <img
                        src={EthLogo}
                        alt=""
                        style={{ width: 24, height: 24 }}
                      /> */}
                    </div>{" "}
                  </div>

                  <div
                    className={
                      EthRewards === 0
                        ? "linear-border-disabled"
                        : "linear-border"
                    }
                  >
                    <button
                      className={`btn ${
                        EthRewards === 0 ? "outline-btn-disabled" : "filled-btn"
                      } px-3`}
                      disabled={EthRewards === 0 ? true : false}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClaim(checklistItemID);
                      }}
                      style={{width: 147}}
                    >
                      {loadingclaim ? (
                  <>
                    <div
                      className="spinner-border "
                      role="status"
                      style={{ height: "1.5rem", width: "1.5rem" }}
                    ></div>
                  </>
                ) : (
                  "Claim reward"
                )}

                     
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {isStake ? (
            <>
               
              <div
              className={
                checkPassiveBtn === false
                  ? "linear-border-disabled"
                  : "linear-border"
              }
            >
              <button
                className={`btn ${
                  checkPassiveBtn === false ? "outline-btn-disabled" : "outline-btn"
                } px-5 w-100`}
                disabled={!checkPassiveBtn}
                onClick={() => {
                  handleUnstake(checklistItemID);
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
          ) : (
            <>
              {/* <button
                className="checkbox-button"
                // onClick={() => {
                //   setCheckBtn(!checkbtn);
                //   onChange(checklistItemID);
                // }}
                style={{
                  background:
                    (!checked && !checkbtn) || (checked && !checkbtn)
                      ? "linear-gradient(51.32deg, #e30613 -12.3%, #fa4a33 50.14%)"
                      : "#C4C4C4",
                }}
              >
                
                {(!checked && !checkbtn) || (checked && !checkbtn && !isStake)
                  ? "Add to Stake"
                  : "Remove Stake"}
              </button> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
LandItem.propTypes = {
  modalId: PropTypes.string,
  nft: PropTypes.object,
  isStake: PropTypes.bool,
  checked: PropTypes.bool,
  checklistItemID: PropTypes.number,
  onChange: PropTypes.func,
  // onNftCheckListClick: PropTypes.func,
  countDownLeft: PropTypes.any,
};

export default LandItem;
