import React, { useState, useEffect } from "react";
import axios from "axios";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import "../top-pools.css";
import "./_stakingWod.scss";
import moreinfo from "../../assets/more-info.svg";
import statsIcon from "../../assets/statsIcon.svg";

import { Tooltip } from "@mui/material";
import weth from "../../assets/tokens/weth.svg";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import CawsStakeModal from "../../../../../components/StakeModal/CawsStakeModal";
import Modal from "../../../../../components/General/Modal";

const CawsDetailsPremium = ({
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
  tvl_usd,
}) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [mystakes, setMystakes] = useState([]);
  const [color, setColor] = useState("#F13227");
  const [status, setStatus] = useState("");
  const [showApprove, setshowApprove] = useState(true);
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [EthRewards, setEthRewards] = useState(0);
  const [ethToUSD, setethToUSD] = useState(0);
  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [countDownLeft, setCountDownLeft] = useState(59000);
  const [totalStakes, settotalStakes] = useState(0);
  const [approvedNfts, setApprovedNfts] = useState([]);
  const [cawspopup, setCawspopup] = useState(false);
  const [count, setcount] = useState(0);
  const [count2, setcount2] = useState(0);
  const [newStakes, setnewStakes] = useState(0);
  const [popup, setpopup] = useState(false);
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [hide, setHide] = useState("");
  const navigate = useNavigate();

  const refreshStakes = () => {
    setnewStakes(newStakes + 1);
  };

  const showPopup = () => {
    setpopup(true);
  };

  const hidePopup = () => {
    setpopup(false);
  };

  const checkApproval = async () => {
    const address = coinbase;
    const stakeAdr = await window.config.nft_caws_premiumstake_address;

    if (address !== null) {
      const result = await window.nft
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
    let myNft = await window.myNftListContract(coinbase);

    let nfts = myNft.map((nft) => window.getNft(nft));

    nfts = await Promise.all(nfts);

    nfts.reverse();

    setMyNFTs(nfts);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractCawsPremiumNFT(
      "CAWSPREMIUM"
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

    let stakes = myStakes.map((stake) => window.getNft(stake));

    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakes(stakes);
  };

  const handleClaimAll = async () => {
    const address = coinbase;
    let myStakes = await getStakesIds();
    let calculateRewards = [];
    let result = 0;
    let staking_contract = await window.getContractCawsPremiumNFT(
      "CAWSPREMIUM"
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
    setclaimLoading(true);

    if (window.WALLET_TYPE !== "binance") {
      let myStakes = await getStakesIds();
      let staking_contract = await window.getContractCawsPremiumNFT(
        "CAWSPREMIUM"
      );
      // setclaimAllStatus("Claiming all rewards, please wait...");
      await staking_contract.methods
        .claimRewards(myStakes)
        .send()
        .then(() => {
          setEthRewards(0);
          window.alertify.message("Claimed All Rewards!");
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
        window.config.nft_caws_premiumstake_address,
        window.CAWSPREMIUM_ABI,
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
        setclaimStatus("success");
        setclaimLoading(false);

        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
        setEthRewards(0);
        window.alertify.message("Claimed All Rewards!");
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

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(EthRewards));
  };

  const calculateCountdown = async () => {
    const address = coinbase;

    let staking_contract = await window.getContractCawsPremiumNFT(
      "CAWSPREMIUM"
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
    navigate("/account/prime");
  };

  const totalStakedNft = async () => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_address
    );

    await staking_contract.methods
      .balanceOf(window.config.nft_caws_premiumstake_address)
      .call()
      .then((data) => {
        settotalStakes(data);
      });
  };

  const manageState = () => {
    if (isConnected && chainId === "1" && isPremium) {
      setshowChecklistModal(true);
      setOpenStakeChecklist(true);
      setApprovedNfts([]);
      setHide("staked");
    } else if (!isConnected) {
      handleConnection();
    } else if (isConnected && chainId !== "1") {
      handleEthPool();
    } else if (isConnected && !isPremium && chainId === "1") {
      handleNavigateToPlans();
    }
  };

  useEffect(() => {
    totalStakedNft();
  }, [count, newStakes]);

  useEffect(() => {
    if (isConnected && chainId === "1") {
      myNft().then();
      myStakes().then();
      checkApproval().then();
      handleClaimAll();
    }
  }, [isConnected, chainId, newStakes, count]);

  useEffect(() => {
    if (isConnected && chainId === "1") {
      checkApproval().then();
      calculateCountdown().then();
    }
  }, [isConnected, chainId, count2]);

  const getApprovedNfts = (data) => {
    setApprovedNfts(data);
    return data;
  };

  useEffect(() => {
    if (isConnected) {
      setUSDPrice().then();
    }
  }, [isConnected, EthRewards]);

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
              <h6 className="m-0 activetxt">
                <img
                  src={ellipse}
                  alt=""
                  className="position-relative"
                  style={{ top: "-1px" }}
                />
                Active status
              </h6>
      
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Pool Cap:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  200 NFTs
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
                  {200 - totalStakes}
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
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Maximum deposit:</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  4 NFTs
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
            </div>
          </div>
        </div> */}
        <div className="pools-details-wrapper d-flex m-0 border-0 ">
          <div
            className={` ${
              listType === "list" ? "row" : "d-flex flex-column"
            } w-100 justify-content-between gap-4 gap-lg-0`}
          >
            <div
              className={`otherside-border  ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${expired === true && "blurrypool"} `}
            >
              <div className="d-flex justify-content-between align-items-center gap-2">
                <h6 className="m-0 deposit-txt">Deposit</h6>
                <div className="d-flex align-items-center gap-1">
                  {/* <div
                    className="info-pool-wrapper p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPopup();
                    }}
                  >
                    <h6 className="m-0 mybalance-text d-flex align-items-center gap-1">
                      <img src={statsIcon} alt="" /> Details
                    </h6>
                  </div> */}

                  <div className="info-pool-wrapper p-2">
                    <h6 className="m-0 mybalance-text">
                      Balance:{" "}
                      <b>
                        {isConnected === false ? 0 : myNFTs.length} CAWS NFTs
                      </b>
                    </h6>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 justify-content-between">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <button
                    className={`btn w-100 connectbtn  ${
                      (mystakes.length === 4 || totalStakes === 200) &&
                      "disabled-btn"
                    }
                    ${
                      (!isPremium || chainId !== "1") && isConnected
                        ? "fail-button"
                        : "connectbtn"
                    } d-flex justify-content-center align-items-center`}
                    disabled={
                     isConnected && (!isPremium || mystakes.length === 4 || totalStakes === 200)
                    }
                    onClick={() => {
                      manageState();
                    }}
                  >
                    {isConnected && chainId === "1" && isPremium
                      ? "Select NFTs"
                      : !isConnected
                      ? "Connect Wallet"
                      : isConnected && isPremium && chainId !== "1"
                      ? "Switch to Ethereum"
                      : "Become Prime"}
                  </button>
                </div>
              </div>
            </div>
            {mystakes.length > 0 && 
            <div className="stake-separator"></div>
             }
            {mystakes.length > 0 && (
            <div
              className={`otherside-border ${
                listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
              }  ${
                (chainId !== "1" || expired === true || !isPremium) &&
                "blurrypool"
              } `}
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
                    <b>{isConnected === false ? 0 : mystakes.length} CAWS</b>
                  </h6>
                </h6>
                <h6 className="m-0 withdraw-littletxt d-flex align-items-center gap-2">
                  <Tooltip
                    placement="top"
                    title={
                      <div className="tooltip-text">
                        {
                          "Rewards earned by your CAWS NFTs deposit to the staking smart contract are displayed in real-time."
                        }
                      </div>
                    }
                  >
                    <img src={moreinfo} alt="" />
                  </Tooltip>
                </h6>
              </div>
              <div className="info-pool-wrapper p-2 d-flex flex-column gap-2 justify-content-between">
                {/* <h6 className={"m-0 mybalance-text d-flex"}>Rewards</h6> */}

                <div className="form-row d-flex gap-2 align-items-center justify-content-between">
                  <h6 className="m-0 w-100 rewardstxtCaws d-flex align-items-center gap-2">
                    {/* <img
                        src={weth}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />{" "} */}
                    {getFormattedNumber(EthRewards, 4)} WETH ($
                    {getFormattedNumber(ethToUSD, 4)})
                  </h6>
                  <button
                    className={`btn w-100 outline-btn-stake ${
                      (claimStatus === "claimed" &&
                        claimStatus === "initial") ||
                      EthRewards === 0
                        ? "disabled-btn"
                        : claimStatus === "failed"
                        ? "fail-button"
                        : claimStatus === "success"
                        ? "success-button"
                        : null
                    } d-flex justify-content-center align-items-center gap-2`}
                    style={{ height: "fit-content" }}
                    onClick={claimRewards}
                    disabled={!isPremium || EthRewards === 0}
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
              {mystakes.length > 0 && 
              <div className="stake-separator"></div>
             }
            {mystakes.length > 0 && (
            <div
              className={`otherside-border  ${
                listType === "list" ? "col-12 col-md-6 col-lg-2" : "px-0"
              } ${chainId !== "1" && "blurrypool"}`}
            >
              <div className="d-flex flex-column gap-2">
                <h6 className="m-0 deposit-txt d-flex align-items-center gap-2 justify-content-between">
                  My Deposit
                </h6>
                <div className="info-pool-wrapper p-2 d-flex flex-column justify-content-between">
                  <div className="d-flex align-items-center gap-2 justify-content-between">
                    <div className="d-flex flex-column w-100">
                      <h6 className={"m-0 mybalance-text d-flex"}>
                        Unlocks in
                      </h6>
                      <h6 className="m-0 rewardstxtwod text-white d-flex align-items-center gap-2">
                        Anytime
                      </h6>
                    </div>
                    <button
                      disabled={false}
                      className={"outline-btn-stake btn"}
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
            )}
            <div
              className={`info-pool-wrapper2 p-1 d-flex ${ mystakes.length > 0 ?  'justify-content-center' : 'justify-content-center'} `}
              style={{
                cursor: "pointer",
                width: mystakes.length > 0 ? 'auto' : 'fit-content'
              }}
              onClick={() => {
                showPopup();
              }}
            >
              <h6
                className="m-0 mybalance-text d-flex align-items-center gap-1"
                style={{ color: "#4ed5d2" }}
              >
                <img src={statsIcon} alt="" /> Details
              </h6>
            </div>
          </div>
        </div>
      </div>
      {showChecklistModal === true && (
        <CawsStakeModal
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
                      {mystakes.length} WOD
                    </h6>
                  </div> */}
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Pool Cap</span>
                    <h6 className="stats-card-content">200 NFTs</h6>
                  </div>

                  {/* <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Available Quota:</span>
                    <h6 className="stats-card-content">
                      {100 - totalStakes} NFTs
                    </h6>
                  </div> */}
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Maximum deposit:</span>
                    <h6 className="stats-card-content">N/A</h6>
                  </div>
                  {/* <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">TVL USD</span>
                    <h6 className="stats-card-content">
                      ${getFormattedNumber(tvl_usd)} USD
                    </h6>
                  </div> */}

                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">
                      Contract Start date:
                    </span>
                    <h6 className="stats-card-content">09 Sep 2024</h6>
                  </div>
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Contract End date:</span>
                    <h6 className="stats-card-content">25 Feb 2025</h6>
                  </div>
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Contract Address:</span>

                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://etherscan.io/address/${window.config.nft_caws_premiumstake_address}`}
                      className="stats-card-content text-decoration-underline"
                    >
                      {shortAddress(
                        window.config.nft_caws_premiumstake_address
                      )}{" "}
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

export default CawsDetailsPremium;
