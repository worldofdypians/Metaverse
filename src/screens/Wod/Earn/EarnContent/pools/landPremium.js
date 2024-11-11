import React, { useState, useEffect } from "react";
import axios from "axios";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import "../top-pools.css";
import "./_stakingWod.scss";
import arrowup from "../../assets/arrow-up.svg";
import moreinfo from "../../assets/more-info.svg";
import wallet from "../../assets/wallet.svg";
import ellipse from "../../assets/ellipse.svg";

import { Tooltip } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";
import weth from "../../assets/tokens/weth.svg";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import LandPremiumStakeModal from "../../../../../components/StakeModal/LandPremiumModal";

const LandDetailsPremium = ({
  coinbase,
  isConnected,
  listType,
  handleSwitchNetwork,
  chainId,
  handleConnection,
  renderedPage,
  expired,
  isPremium,
  binanceW3WProvider,
}) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [amountToStake, setamountToStake] = useState("");
  const [mystakes, setMystakes] = useState([]);
  const [color, setColor] = useState("#F13227");
  const [status, setStatus] = useState("");
  const [showApprove, setshowApprove] = useState(true);
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [EthRewards, setEthRewards] = useState(0);
  const [showStaked, setshowStaked] = useState(true);
  const [showToStake, setshowToStake] = useState(false);
  const [ethToUSD, setethToUSD] = useState(0);
  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countDownLeft, setCountDownLeft] = useState(59000);
  const [totalStakes, settotalStakes] = useState(0);
  const [approvedNfts, setApprovedNfts] = useState([]);
  const [cawspopup, setCawspopup] = useState(false);
  const [count, setcount] = useState(0);
  const [count2, setcount2] = useState(0);
  const [newStakes, setnewStakes] = useState(0);

  const [hide, setHide] = useState("");
  const navigate = useNavigate();

  const checkApproval = async () => {
    const address = coinbase;
    const stakeAdr = await window.config.nft_land_premiumstake_address;

    if (address !== null) {
      const result = await window.landnft
        .checkapproveStake(address, stakeAdr)
        .then((data) => {
          return data;
        });

      if (result === true) {
        setshowApprove(false);
        setStatus("");
        setColor("#939393");
      } else if (result === false) {
        setStatus(" *Please approve before deposit");
        setshowApprove(true);
      }
    }
  };

  const myNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);

    let nfts = myNft.map((nft) => window.getLandNft(nft));

    nfts = await Promise.all(nfts);

    nfts.reverse();

    setMyNFTs(nfts);
  };

  const refreshStakes = () => {
    setnewStakes(newStakes + 1);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractLandPremiumNFT(
      "LANDPREMIUM"
    );
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

  const myStakes = async () => {
    let myStakes = await getStakesIds();

    let stakes = myStakes.map((stake) => window.getLandNft(stake));

    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakes(stakes);
  };

  const handleClaimAll = async () => {
    const address = coinbase;
    let myStakes = await getStakesIds();
    let calculateRewards = [];
    let result = 0;
    let staking_contract = await window.getContractLandPremiumNFT(
      "LANDPREMIUM"
    );
    if (address !== null) {
      if (myStakes && myStakes.length > 0) {
        calculateRewards = await staking_contract.methods
          .calculateRewards(address, myStakes)
          .call()
          .then((data) => {
            return data;
          });
      }
    }
    let a = 0;
    const infuraWeb3 = window.infuraWeb3;
    for (let i = 0; i < calculateRewards.length; i++) {
      a = infuraWeb3.utils.fromWei(calculateRewards[i], "ether");

      result = result + Number(a);
    }

    setEthRewards(result);
  };

  const claimRewards = async () => {
    let myStakes = await getStakesIds();
    let staking_contract = await window.getContractLandPremiumNFT(
      "LANDPREMIUM"
    );
    // setclaimAllStatus("Claiming all rewards, please wait...");
    await staking_contract.methods
      .claimRewards(myStakes)
      .send()
      .then(() => {
        setEthRewards(0);
        // setclaimAllStatus("Claimed All Rewards!");
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
        // setclaimAllStatus("An error occurred, please try again");
      });
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(EthRewards));
  };

  const calculateCountdown = async () => {
    const address = coinbase;

    let staking_contract = await window.getContractLandPremiumNFT(
      "LANDPREMIUM"
    );
    if (address !== null) {
      let finalDay = await staking_contract.methods
        .stakingTime(address)
        .call()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          // window.alertify.error(err?.message);
        });

      let lockup_time = await staking_contract.methods
        .LOCKUP_TIME()
        .call()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          // window.alertify.error(err?.message);
        });

      finalDay = parseInt(finalDay) + parseInt(lockup_time);

      setCountDownLeft(parseInt(finalDay * 1000) - Date.now());
    }
  };

  const handleUnstakeAll = async () => {
    let myStakes = await getStakesIds();
    let stake_contract = await window.getContractLandPremiumNFT("LANDPREMIUM");
    // setunstakeAllStatus("Unstaking all please wait...");

    await stake_contract.methods
      .withdraw(myStakes)
      .send()
      .then(() => {
        // setunstakeAllStatus("Successfully unstaked all!");
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        // setunstakeAllStatus("An error occurred, please try again");
        setShowUnstakeModal(false);
      });
  };

  const handleEthPool = async () => {
    await handleSwitchNetworkhook("0x1")
      .then(() => {
        handleSwitchNetwork("1");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNavigateToPlans = () => {
    navigate("/account/premium");
  };

  const totalStakedNft = async () => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDMINTING_ABI,
      window.config.landnft_address,
      { from: undefined }
    );

    await staking_contract.methods
      .balanceOf(window.config.nft_land_premiumstake_address)
      .call()
      .then((data) => {
        settotalStakes(data);
      });
  };

  const showCawsPopup = () => {
    setCawspopup(true);
  };

  useEffect(() => {
    totalStakedNft();
  }, [count, newStakes]);

  useEffect(() => {
    if (isConnected && chainId === "1") {
      myNft();
      myStakes();
      checkApproval();
      handleClaimAll();
    }
  }, [isConnected, chainId, count, newStakes]);

  useEffect(() => {
    if (isConnected && chainId === "1") {
      checkApproval();
      calculateCountdown();
    }
  }, [isConnected, chainId, count2]);

  const getApprovedNfts = (data) => {
    setApprovedNfts(data);
    return data;
  };

  useEffect(() => {
    if (isConnected) {
      setUSDPrice();
    }
  }, [isConnected, EthRewards]);

  return (
    <div className={`p-0 ${listType === "list" && "pt-4"} `}>
      <div className={`allwrappercaws allwrapper-active mb-2 `}>
        <div className="leftside2 mb-2 w-100">
          <div
            className={
              listType === "list"
                ? "activewrapper d-flex gap-4 justify-content-between position-relative flex-row-reverse flex-lg-row align-items-end align-items-lg-center"
                : "activewrapper position-relative flex-row-reverse flex-lg-row align-items-end align-items-lg-center"
            }
          >
            <div
              className={` ${
                listType === "list"
                  ? "d-flex align-items-center gap-3"
                  : "first-block-wrapper gap-2"
              } `}
            >
              <h6 className="m-0 activetxt">
                <img
                  src={ellipse}
                  alt=""
                  className="position-relative"
                  style={{ top: "-1px" }}
                />
                Active status
              </h6>
              {/* <div className="d-flex align-items-center justify-content-between gap-2">
                    <h6 className="earnrewards-text">Earn rewards in:</h6>
                    <h6 className="earnrewards-token d-flex align-items-center gap-1">
                      DYP
                    </h6>
                  </div> */}

              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Pool Cap:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  100 NFTs
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "The maximum amount of NFTs that can be staked in the pool."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Available Quota:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  {100 - totalStakes}
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {"The remaining capacity for staking in the pool."}
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              {/* <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="earnrewards-text">Maximum deposit:</h6>
                <h6 className="earnrewards-token d-flex align-items-center gap-1">
                  4 NFTs
                </h6>
              </div> */}
            </div>
            <div
              className={`d-flex ${
                listType === "table" && "mt-2"
              } align-items-center justify-content-between gap-3 position-relative`}
            >
              <div
                className="d-flex align-items-center justify-content-between gap-3 cursor-pointer"
                onClick={showCawsPopup}
              >
                <h6 className="m-0 bottomitems">Get Genesis NFT</h6>
              </div>
              {cawspopup === true && (
                <div className="position-absolute">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setCawspopup(false);
                    }}
                  >
                    <div
                      className="tooltip d-flex justify-content-center"
                      style={{ opacity: 1, width: 145 }}
                    >
                      <div className="d-flex flex-column gap-2 align-items-start">
                        <a
                          href="https://www.worldofdypians.com/marketplace/land"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setCawspopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            WoD Marketplace
                          </h6>
                        </a>
                        <a
                          href="https://nft.coinbase.com/collection/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setCawspopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            Coinbase
                          </h6>
                        </a>

                        <a
                          href="https://opensea.io/collection/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setCawspopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            OpenSea
                          </h6>
                        </a>
                      </div>
                    </div>
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pools-details-wrapper d-flex m-0 border-0 ">
          <div
            className={` ${
              listType === "list" ? "row" : "d-flex flex-column"
            } w-100 justify-content-between gap-4 gap-lg-0`}
          >
            <div
              className={`firstblockwrapper ${
                listType === "list" && "col-12 col-md-6 col-lg-2 py-2"
              }`}
            >
              <div
                className={`d-flex ${
                  listType === "table"
                    ? "flex-row align-items-center"
                    : "flex-column"
                } justify-content-between gap-4 h-100`}
              >
                <h6 className="m-0 start-title">Start Staking</h6>

                {coinbase === null ||
                coinbase === undefined ||
                isConnected === false ? (
                  <button
                    className="connectbtn btn"
                    onClick={() => {
                      handleConnection();
                    }}
                  >
                    <img src={wallet} alt="" /> Connect wallet
                  </button>
                ) : chainId === "1" && isPremium ? (
                  <div className="addressbtn btn">{shortAddress(coinbase)}</div>
                ) : chainId !== "1" && isPremium ? (
                  <button
                    className="connectbtn btn"
                    onClick={() => {
                      handleEthPool();
                    }}
                  >
                    Change Network
                  </button>
                ) : (
                  <button
                    className="connectbtn btn"
                    onClick={() => {
                      handleNavigateToPlans();
                    }}
                  >
                    Become Premium
                  </button>
                )}
              </div>
            </div>
            <div
              className={`otherside-border  ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${(chainId !== "1" || expired === true || !isPremium) &&
                "blurrypool"} `}
            >
              <div className="d-flex justify-content-between align-items-center gap-2">
                <h6 className="m-0 deposit-txt">Stake</h6>

                <h6 className="m-0 mybalance-text">
                  Avaliable NFTs:{" "}
                  <b>
                    {isConnected === false ? 0 : myNFTs.length} Genesis NFTs
                  </b>
                </h6>
                {/* <Tooltip
                  placement="top"
                  title={
                    <div className="tooltip-text">
                      {"Deposit your Genesis NFTs to the staking smart contract."}
                    </div>
                  }
                >
                  <img src={moreinfo} alt="" />
                </Tooltip> */}
              </div>
              <div className="d-flex flex-column gap-2 justify-content-between">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <button
                    className={`btn ${
                      !isPremium ? "disabled-btn" : "filledbtn"
                    } d-flex justify-content-center align-items-center`}
                    disabled={!isPremium || totalStakes === 100}
                    onClick={() => {
                      setshowChecklistModal(true);
                      setOpenStakeChecklist(true);
                      setApprovedNfts([]);
                      setHide("staked");
                    }}
                  >
                    Select NFTs
                  </button>
                  {/* <div className="available-nfts">
                    Selected NFTs:{" "}
                    <b>{isConnected === false ? 0 : approvedNfts.length}</b>
                  </div> */}
                </div>

                {/* {this.state.errorMsg && (
                  <h6 className="errormsg">{this.state.errorMsg}</h6>
                )} */}
              </div>
            </div>
            <div
              className={`otherside-border ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${(chainId !== "1" || expired === true || !isPremium) &&"blurrypool"} `}
            >
              <div className="d-flex justify-content-between gap-2 flex-column flex-lg-row">
                <h6
                  className={
                    listType === "list"
                      ? "m-0 withdraw-txt align-items-center d-flex gap-2"
                      : "m-0 withdraw-txt d-flex flex-column gap-2"
                  }
                >
                  REWARDS
                  <h6
                    className="m-0 mybalance-text"
                    style={{ textTransform: "capitalize" }}
                  >
                    NFTs Staked:{""}
                    <b>{isConnected === false ? 0 : mystakes.length} Genesis</b>
                  </h6>
                </h6>
                <h6 className="m-0 withdraw-littletxt d-flex align-items-center gap-2">
                  {/* Rewards are displayed in real-time */}
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "Rewards earned by your Genesis NFTs deposit to the staking smart contract are displayed in real-time."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="d-flex flex-column gap-2 justify-content-between">
                
                <div className="form-row d-flex gap-2 align-items-end justify-content-between">
                  <h6 className="m-0 rewardstxtCaws d-flex align-items-center gap-2">
                    <img src={weth} alt="" style={{ width: 18, height: 18 }} />{" "}
                    {getFormattedNumber(EthRewards, 6)} WETH ($
                    {getFormattedNumber(ethToUSD, 6)})
                  </h6>
                  <button
                    className={`btn ${
                      EthRewards === 0 ? "disabled-btn" : "filledbtn"
                    } d-flex justify-content-center align-items-center`}
                    style={{ height: "fit-content" }}
                    onClick={claimRewards}
                    disabled={!isPremium || EthRewards === 0}
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`otherside-border  ${
                listType === "list" ? "col-12 col-md-6 col-lg-2" : "px-0"
              } ${chainId !== "1" && "blurrypool"}`}
            >
              <h6 className="m-0 deposit-txt d-flex align-items-center gap-2 justify-content-between">
                Unstake
                <Tooltip
                  placement="top"
                  title={
                    <div className="tooltip-text">
                      {
                        "Withdraw your deposited NFTs from the staking smart contract."
                      }
                    </div>
                  }
                >
                  <img src={moreinfo} alt="" />
                </Tooltip>
              </h6>

              <button
                className="btn outline-btn-stake"
                onClick={() => {
                  setshowChecklistModal(true);
                  setOpenStakeChecklist(true);
                  setHide("");
                }}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
      {showChecklistModal === true && (
        <LandPremiumStakeModal
          onModalClose={() => {
            setshowChecklistModal(false);
          }}
          getApprovedLandPoolsNfts={getApprovedNfts}
          nftItem={
            hide === "" || hide === "tostake" || hide === "mystakes2"
              ? mystakes
              : myNFTs
          }
          isConnected={isConnected}
          coinbase={coinbase}
          onDepositComplete={refreshStakes}
          onClaimAll={() => {
            claimRewards();
          }}
          isStake={
            hide === "" || hide === "tostake" || hide === "mystakes2"
              ? true
              : false
          }
          handleConnect={handleConnection}
          myCawsstakes={mystakes}
          binanceW3WProvider={binanceW3WProvider}
          onUnstake={refreshStakes}
          ETHrewards={EthRewards}
          finalUsd={ethToUSD}
        />
      )}
    </div>
  );
};

export default LandDetailsPremium;
