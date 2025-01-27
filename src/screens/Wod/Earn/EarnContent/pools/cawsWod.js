import React, { useState, useEffect } from "react";
import axios from "axios";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import "../top-pools.css";
import "./_stakingWod.scss";
// import arrowup from "../../assets/arrow-up.svg";

// import wallet from "../../assets/wallet.svg";
import { Tooltip } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";

import RewardsModal from "../../../../../components/StakeModal/RewardsModal";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import { ethers } from "ethers";
import Modal from "../../../../../components/General/Modal";
import Web3 from "web3";

const CawsWodDetails = ({
  coinbase,
  isConnected,
  listType,
  handleSwitchNetwork,
  chainId,
  handleConnection,
  renderedPage,
  expired,
  binanceW3WProvider,
  tvl_usd,
}) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);

  const [mystakes, setMystakes] = useState([]);
  const [myLandstakes, setMyLandstakes] = useState([]);

  const [color, setColor] = useState("#F13227");
  const [status, setStatus] = useState("");
  const [showApprove, setshowApprove] = useState(true);
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [EthRewards, setEthRewards] = useState(0);
  const [ethToUSD, setethToUSD] = useState(0);
  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [countDownLeft, setCountDownLeft] = useState(59000);

  const [approvedNfts, setApprovedNfts] = useState([]);
  const [approvedLandNfts, setApprovedLandNfts] = useState([]);

  const [newStakes, setnewStakes] = useState(0);
  const [hide, setHide] = useState("");
  const [screenName, setScreenName] = useState("land");
  const [cawspopup, setCawspopup] = useState(false);
  const [landpopup, setLandpopup] = useState(false);
  const [popup, setpopup] = useState(false);
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [totalStakes, settotalStakes] = useState(0);

  const showPopup = () => {
    setpopup(true);
  };

  const hidePopup = () => {
    setpopup(false);
  };

  const totalStakedNft = async () => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address,
      { from: undefined }
    );

    await staking_contract.methods
      .balanceOf(window.config.wod_caws_address)
      .call()
      .then((data) => {
        settotalStakes(data);
      });
  };

  const checkApproval = async () => {
    const address = coinbase;
    const stakeApr50 = await window.config.wod_caws_address;
    let web3 = new Web3(window.ethereum);

    if (address !== null && web3.utils.isAddress(address)) {
      const result = await window.nft
        .checkapproveStake(address, stakeApr50)
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
    let web3 = new Web3(window.ethereum);

    if (coinbase !== null && web3.utils.isAddress(coinbase)) {
      let myNft = await window.myNftListContract(coinbase);
      if (myNft && myNft.length > 0) {
        let nfts = myNft.map((nft) => window.getNft(nft));

        nfts = await Promise.all(nfts);

        nfts.reverse();

        setMyNFTs(nfts);
      } else setMyNFTs([]);
    }
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let stakenft = [];
    let web3 = new Web3(window.ethereum);
    if (address !== null && web3.utils.isAddress(address)) {
      const allCawsStakes = await window.wod_caws
        .depositsOf(address)
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allCawsStakes;
    } else return [];
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMystakes(stakes);
    } else setMystakes([]);
  };

  const myLandNft = async () => {
    let web3 = new Web3(window.ethereum);
    if (coinbase !== null && web3.utils.isAddress(coinbase)) {
      let myNft = await window.myNftLandListContract(coinbase);

      if (myNft && myNft.length > 0) {
        let nfts = myNft.map((nft) => window.getLandNft(nft));
        nfts = await Promise.all(nfts);

        nfts.reverse();

        setMyLandNFTs(nfts);
      } else setMyLandNFTs([]);
    } else setMyLandNFTs([]);
  };

  const getLandStakesIds = async () => {
    const address = coinbase;
    let stakenft = [];
    let web3 = new Web3(window.ethereum);
    if (address !== null && web3.utils.isAddress(address)) {
      const allLandStakes = await window.wod_caws
        .depositsOfWod(address)
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allLandStakes;
    } else return [];
  };

  const myLandStakes = async () => {
    let myStakes = await getLandStakesIds();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getLandNft(stake));
      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyLandstakes(stakes);
    } else setMyLandstakes([]);
  };

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(EthRewards));
  };

  const calculateAllRewards = async () => {
    let myStakes = await getStakesIds();
    let result = 0;

    if (coinbase !== null) {
      if (myStakes && myStakes.length > 0) {
        let rewards = await window.wod_caws
          .calculateRewardsWodCaws(coinbase, myStakes)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          });
        let finalReward = 0;
        for (let i = 0; i < rewards.length; i++) {
          finalReward = rewards[i] / 1e18;
          result = result + Number(finalReward);
        }
      }
    }
    setEthRewards(result);
  };

  const claimRewards = async () => {
    setclaimLoading(true);

    if (window.WALLET_TYPE !== "binance") {
      let myStakes = await getStakesIds();
      await window.wod_caws
        .claimRewardsWodCaws(myStakes)
        .then(() => {
          setEthRewards(0);
          setclaimStatus("success");
          setclaimLoading(false);

          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        })
        .catch((err) => {
          window.alertify.error(err?.message);
          setclaimStatus("failed");
          setclaimLoading(false);
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      let myStakes = await getStakesIds();

      let staking_contract = new ethers.Contract(
        window.config.wod_caws_address,
        window.WOD_CAWS_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await staking_contract
        .claimRewards(myStakes)
        .catch((err) => {
          window.alertify.error(err?.message);
          setclaimStatus("failed");
          setclaimLoading(false);
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setEthRewards(0);
        window.alertify.message("Claimed All Rewards!");
        setclaimStatus("success");
        setclaimLoading(false);

        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
      }
    }
  };

  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const refreshStakes = () => {
    setnewStakes(newStakes + 1);
  };

  const calculateCountdown = async () => {
    const address = coinbase;
    let finalDay = await window.wod_caws
      .checkStakingTimeWodCaws(address)
      .then((data) => {
        return data;
      });

    let lockup_time = await window.wod_caws
      .checkLockupTimeWodCaws()
      .then((data) => {
        return data;
      });

    finalDay = parseInt(finalDay) + parseInt(lockup_time);
    setCountDownLeft(parseInt(finalDay * 1000) - Date.now());
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

  useEffect(() => {
    if (coinbase && chainId === "1") {
      getStakesIds();
      getLandStakesIds();
      myNft();
      myStakes();
      myLandNft();
      myLandStakes();
      checkApproval();
      calculateAllRewards();
      // calculateCountdown();
    }
  }, [isConnected, coinbase, screenName, newStakes, chainId]);

  const getApprovedNfts = (data) => {
    setApprovedNfts(data);
    return data;
  };

  const getApprovedLandNfts = (data) => {
    setApprovedLandNfts(data);
    return data;
  };

  const showCawsPopup = () => {
    setCawspopup(true);
  };

  const showLandPopup = () => {
    setLandpopup(true);
  };

  useEffect(() => {
    if (isConnected) {
      setUSDPrice();
    }
  }, [isConnected, EthRewards]);

  useEffect(() => {
    totalStakedNft();
  }, []);

  return (
    <div className={`p-0 ${listType === "list" && "pt-4"} `}>
      <div className={`allwrappercaws allwrapper-active mb-0 `}>
        {/* <div className="leftside2 mb-2 w-100">
          <div
            className={
              listType === "list"
                ? "activewrapper d-flex gap-4 justify-content-between position-relative flex-row flex-lg-row align-items-end align-items-lg-center"
                : "activewrapper position-relative flex-row-reverse flex-lg-row align-items-end align-items-lg-center"
            }
          >
            <div
              className={` ${
                listType === "list"
                  ? "d-flex flex-column flex-lg-row align-items-lg-center gap-3"
                  : "first-block-wrapper gap-2"
              } `}
            >
              <h6 className="m-0 expiredtxt caws-active-txt">Expired Pool</h6>
              

              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">APR:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  50%
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "APR reflects the interest rate of earnings on an account over the course of one year. "
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Lock time:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  No Lock
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "The amount of time your deposited assets will be locked."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              
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
                <h6 className="m-0 bottomitems">Get CAWS</h6>
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
                          href="https://www.worldofdypians.com/marketplace/caws"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setCawspopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            WOD Marketplace
                          </h6>
                        </a>
                        <a
                          href="https://nft.coinbase.com/collection/catsandwatches"
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
                          href="https://opensea.io/collection/catsandwatchessocietycaws"
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
              <div
                className="d-flex align-items-center justify-content-between gap-3 cursor-pointer"
                onClick={showLandPopup}
              >
                <h6 className="m-0 bottomitems">Get WOD</h6>
              </div>
              {landpopup === true && (
                <div className="position-absolute">
                  <OutsideClickHandler
                    onOutsideClick={() => {
                      setLandpopup(false);
                    }}
                  >
                    <div
                      className="tooltip d-flex justify-content-center"
                      style={{ opacity: 1, width: 145, left: 90 }}
                    >
                      <div className="d-flex flex-column gap-2 align-items-start">
                        <a
                          href="https://www.worldofdypians.com/marketplace/land"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setLandpopup(false);
                          }}
                        >
                          <h6 className="m-0 bottomitems">
                            <img src={arrowup} alt="" />
                            WOD Marketplace
                          </h6>
                        </a>
                        <a
                          href="https://nft.coinbase.com/collection/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => {
                            setLandpopup(false);
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
                            setLandpopup(false);
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
        </div> */}
        <div className="pools-details-wrapper d-flex m-0 border-0 ">
          <div
            className={` ${
              listType === "list" ? "row" : "d-flex flex-column"
            } w-100 justify-content-between gap-4 gap-lg-0`}
          >
            {/* <div
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
               <h6 className="m-0 deposit-txt">Deposit</h6>

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
                ) : chainId === "1" ? (
                  <div className="addressbtn btn">{shortAddress(coinbase)}</div>
                ) : (
                  <button
                    className="connectbtn btn"
                    onClick={() => {
                      handleEthPool();
                    }}
                  >
                    Change Network
                  </button>
                )}
              </div>
            </div> */}
            <div
              className={`otherside-border  ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${expired && "blurrypool"}  `}
            >
              <div className="d-flex justify-content-between align-items-center gap-2">
                <h6 className="m-0 deposit-txt">Deposit</h6>
                <div className="d-flex align-items-center gap-1">
                  <div className="info-pool-wrapper p-2">
                    <h6 className="m-0 mybalance-text">
                      Balance:{" "}
                      <b>
                        {isConnected === false ? 0 : myNFTs.length} CAWS &{" "}
                        {isConnected === false ? 0 : myLandNFTs.length} WOD
                      </b>
                    </h6>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 justify-content-between">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <button
                    className={`btn w-100 disabled-btn 
                     d-flex justify-content-center align-items-center`}
                    disabled={true}
                  >
                    Select NFTs
                  </button>
                </div>
              </div>
            </div>
            {!isConnected && (
              <button
                className={`btn w-100 connectbtn  d-flex justify-content-center align-items-center`}
                onClick={() => {
                  handleConnection();
                }}
              >
                Connect Wallet
              </button>
            )}

            {isConnected && chainId !== "1" && (
              <button
                className={`btn w-100 fail-button  d-flex justify-content-center align-items-center`}
                onClick={() => {
                  handleEthPool();
                }}
              >
                Switch to Ethereum
              </button>
            )}
            {mystakes.length > 0 && <div className="stake-separator"></div>}
            {mystakes.length > 0 && (
              <div
                className={`otherside-border ${
                  listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
                }  ${chainId !== "1" && "blurrypool"}`}
              >
                <div className="d-flex justify-content-between gap-2 flex-column flex-lg-row">
                  <h6
                    className={
                      listType === "list"
                        ? "m-0 withdraw-txt align-items-center d-flex gap-2"
                        : "m-0 deposit-txt d-flex flex-column gap-2"
                    }
                  >
                    Earnings
                    <h6
                      className="m-0 mybalance-text"
                      style={{ textTransform: "capitalize" }}
                    >
                      NFTs Staked:{" "}
                      <b>
                        {isConnected === false ? 0 : mystakes.length} CAWS &{" "}
                        {isConnected === false ? 0 : myLandstakes.length}{" "}
                        Genesis
                      </b>
                    </h6>
                  </h6>
                  <h6 className="m-0 withdraw-littletxt d-flex align-items-center gap-2">
                    <Tooltip
                      placement="top"
                      title={
                        <div className="tooltip-text">
                          {
                            "Rewards earned by your CAWS & Genesis NFTs deposit to the staking smart contract are displayed in real-time."
                          }
                        </div>
                      }
                    >
                      <img
                        src={"https://cdn.worldofdypians.com/wod/more-info.svg"}
                        alt=""
                      />
                    </Tooltip>
                  </h6>
                </div>
                <div className="info-pool-wrapper p-2 d-flex flex-column gap-2 justify-content-between">
                  {/* <h6 className={"m-0 mybalance-text d-flex"}>Rewards</h6> */}
                  <div className="form-row w-100 d-flex gap-2 align-items-center justify-content-between">
                    <h6 className="m-0 w-100 rewardstxtCaws d-flex align-items-center gap-2">
                      {/* <img src={weth} alt="" style={{ width: 18, height: 18 }} />{" "} */}
                      {getFormattedNumber(EthRewards, 4)} WETH ($
                      {getFormattedNumber(ethToUSD, 4)})
                    </h6>
                    <button
                      className={`btn w-100 outline-btn-stake ${
                        (claimStatus === "claimed" &&
                          claimStatus === "initial") ||
                        EthRewards === 0
                          ? //
                            "disabled-btn"
                          : claimStatus === "failed"
                          ? "fail-button"
                          : claimStatus === "success"
                          ? "success-button"
                          : null
                      } d-flex justify-content-center align-items-center gap-2`}
                      style={{ height: "fit-content" }}
                      onClick={claimRewards}
                      disabled={EthRewards === 0}
                    >
                      {claimLoading ? (
                        <div
                          class="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      ) : claimStatus === "failed" ? (
                        <>Failed</>
                      ) : claimStatus === "success" ? (
                        <>Success</>
                      ) : (
                        <>Claim</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {mystakes.length > 0 && <div className="stake-separator"></div>}
            {mystakes.length > 0 && (
              <div
                className={`otherside-border  ${
                  listType === "list" ? "col-12 col-md-6 col-lg-2" : "px-0"
                } ${chainId !== "1" && "blurrypool"}`}
              >
                <h6 className="m-0 deposit-txt d-flex align-items-center gap-2 justify-content-between">
                  My Deposit
                </h6>

                <div className="info-pool-wrapper p-2 d-flex flex-column justify-content-between">
                  <h6 className={"m-0 mybalance-text d-flex"}>Unlocks in</h6>
                  <div className="form-row d-flex gap-2 align-items-center justify-content-between">
                    <h6 className="m-0 rewardstxtwod text-white d-flex align-items-center gap-2">
                      Anytime
                    </h6>
                    <button
                      disabled={false}
                      className={"outline-btn-stake btn"}
                      onClick={() => {
                        setshowChecklistModal(true);
                        setOpenStakeChecklist(true);
                        setHide("tostake");
                      }}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div
              className={`info-pool-wrapper2 mt-2 p-1 d-flex ${
                mystakes.length > 0
                  ? "justify-content-center"
                  : "justify-content-center"
              } `}
              style={{
                cursor: "pointer",
                width: mystakes.length > 0 ? "auto" : "fit-content",
              }}
              onClick={() => {
                showPopup();
              }}
            >
              <h6
                className="m-0 mybalance-text d-flex align-items-center gap-1"
                style={{ color: "#4ed5d2" }}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/statsIcon.svg"}
                  alt=""
                />{" "}
                Details
              </h6>
            </div>
          </div>
        </div>
      </div>
      {showChecklistModal === true && (
        <RewardsModal
          onModalClose={() => {
            setshowChecklistModal(false);
          }}
          getApprovedNfts={getApprovedNfts}
          getApprovedLandNfts={getApprovedLandNfts}
          landStakes={myLandstakes}
          cawsStakes={mystakes}
          nftItem={mystakes}
          isConnected={isConnected}
          coinbase={coinbase}
          onDepositComplete={() => refreshStakes()}
          ETHrewards={EthRewards}
          finalUsd={ethToUSD}
          handleConnect={handleConnection}
          onClaimAll={() => {
            claimRewards();
          }}
          binanceW3WProvider={binanceW3WProvider}
        />
      )}
      {popup && (
        <Modal
          visible={popup}
          modalId="tymodal"
          title="stats"
          onModalClose={() => {
            hidePopup();
          }}
          maxWidth={560}
        >
          <div className="earn-hero-content px-4 pb-4 token-wrapper">
            <div className="l-box pl-3 pr-3">
              <div className="container px-0">
                <div className="stats-container my-4">
                  {/* <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">My Stakes</span>
                    <h6 className="stats-card-content">
                      {mystakes.length} CAWS
                    </h6>
                  </div> */}
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Total NFTs staked</span>
                    <h6 className="stats-card-content">
                      {totalStakes * 2} (CAWS + Genesis)
                    </h6>
                  </div>

                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">TVL USD</span>
                    <h6 className="stats-card-content">
                      ${getFormattedNumber(tvl_usd)} USD
                    </h6>
                  </div>

                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Contract Address:</span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://etherscan.io/address/${window.config.wod_caws_address}`}
                      className="stats-card-content text-decoration-underline"
                    >
                      {shortAddress(window.config.wod_caws_address)}{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CawsWodDetails;
