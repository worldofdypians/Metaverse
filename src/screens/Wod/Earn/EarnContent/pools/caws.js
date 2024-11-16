import React, { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import "../top-pools.css";
import "./_stakingWod.scss";
import arrowup from "../../assets/arrow-up.svg";
import moreinfo from "../../assets/more-info.svg";
import wallet from "../../assets/wallet.svg";
import { Tooltip } from "@mui/material";
import weth from "../../assets/tokens/weth.svg";
import NftStakeCheckListModal from "../../../../Caws/NftMinting/NftStakeChecklistModal/NftStakeChecklistModal";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import OutsideClickHandler from "react-outside-click-handler";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import { ethers } from "ethers";
import Modal from "../../../../../components/General/Modal";
import statsIcon from "../../assets/statsIcon.svg";

const CawsDetails = ({
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
  const [countDownLeft, setCountDownLeft] = useState(59000);
  const [totalStakes, settotalStakes] = useState(0);
  const [approvedNfts, setApprovedNfts] = useState([]);
  const [cawspopup, setCawspopup] = useState(false);
  const [popup, setpopup] = useState(false);
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [hide, setHide] = useState("");

  const showPopup = () => {
    setpopup(true);
  };

  const hidePopup = () => {
    setpopup(false);
  };

  const checkApproval = async () => {
    const address = coinbase;
    const stakeApr50 = await window.config.nftstaking_address50;

    if (address !== null) {
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
    let myNft = await window.myNftListContract(coinbase);

    let nfts = myNft.map((nft) => window.getNft(nft));

    nfts = await Promise.all(nfts);

    nfts.reverse();

    setMyNFTs(nfts);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractNFT("NFTSTAKING");
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
    let staking_contract = await window.getContractNFT("NFTSTAKING");
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
    const infuraWeb3 = new Web3(window.config.infura_endpoint);
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
      let staking_contract = await window.getContractNFT("NFTSTAKING");
      // setclaimAllStatus("Claiming all rewards, please wait...");
      await staking_contract.methods
        .claimRewards(myStakes)
        .send()
        .then(() => {
          setEthRewards(0);
          setclaimStatus("success");
          setclaimLoading(false);

          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
          // setclaimAllStatus("Claimed All Rewards!");
        })
        .catch((err) => {
          setclaimStatus("failed");
          setclaimLoading(false);
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      let staking_contract = new ethers.Contract(
        window.config.nftstaking_address,
        window.NFTSTAKING_ABI,
        binanceW3WProvider.getSigner()
      );

      let myStakes = await getStakesIds();
      // setclaimAllStatus("Claiming all rewards, please wait...");
      const txResponse = await staking_contract
        .claimRewards(myStakes)

        .catch((err) => {
          console.error(err);
          setclaimStatus("failed");
          setclaimLoading(false);
          setTimeout(() => {
            setclaimStatus("initial");
          }, 5000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setEthRewards(0);
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

  const setUSDPrice = async () => {
    const ethprice = await convertEthToUsd();
    setethToUSD(Number(ethprice) * Number(EthRewards));
  };

  const calculateCountdown = async () => {
    const address = coinbase;

    let staking_contract = await window.getContractNFT("NFTSTAKING");
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
    if (window.WALLET_TYPE !== "binance") {
      let myStakes = await getStakesIds();
      let stake_contract = await window.getContractNFT("NFTSTAKING");
      // setunstakeAllStatus("Unstaking all please wait...");

      await stake_contract.methods
        .emergencyWithdraw(myStakes)
        .send()
        .then(() => {
          window.alertify.message("*Unstaked successfully");
        })
        .catch((err) => {
          window.alertify.error(err?.message);
          // setunstakeAllStatus("An error occurred, please try again");
          setShowUnstakeModal(false);
        });
    } else if (window.WALLET_TYPE === "binance") {
      let staking_contract = new ethers.Contract(
        window.config.nftstaking_address,
        window.NFTSTAKING_ABI,
        binanceW3WProvider.getSigner()
      );
      let myStakes = await getStakesIds();
      const txResponse = await staking_contract
        .emergencyWithdraw(myStakes)
        .catch((err) => {
          window.alertify.error(err?.message);
          // setunstakeAllStatus("An error occurred, please try again");
          setShowUnstakeModal(false);
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        window.alertify.message("*Unstaked successfully");
      }
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

  const totalStakedNft = async () => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address,
      { from: undefined }
    );

    await staking_contract.methods
      .balanceOf(window.config.nftstaking_address)
      .call()
      .then((data) => {
        settotalStakes(data);
      });
  };

  const showCawsPopup = () => {
    setCawspopup(true);
  };

  useEffect(() => {
    totalStakedNft().then();
  }, []);

  useEffect(() => {
    if (isConnected && chainId === "1") {
      myNft().then();
      myStakes().then();
      checkApproval().then();
      handleClaimAll();
      calculateCountdown().then();
    }
  }, [isConnected, chainId]);

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
                  30 days
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
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Total NFTs staked</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  {totalStakes}/10000
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
                  <div
                    className="info-pool-wrapper p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPopup();
                    }}
                  >
                    <h6 className="m-0 mybalance-text d-flex align-items-center gap-1">
                      <img src={statsIcon} alt="" /> Details
                    </h6>
                  </div>

                  <div className="info-pool-wrapper p-2">
                    <h6 className="m-0 mybalance-text">
                      Balance:{" "}
                      <b>{isConnected === false ? 0 : myNFTs.length} CAWS</b>
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
            {mystakes.length > 0 && <div className="stake-separator"></div>}
            {mystakes.length > 0 && (
              <div
                className={`otherside-border ${
                  listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
                }  ${expired && "blurrypool"} `}
              >
                <div className="d-flex justify-content-between gap-2 flex-column flex-lg-row">
                  <h6
                    className={
                      listType === "list"
                        ? "m-0 withdraw-txt align-items-center d-flex gap-2"
                        : "m-0 withdraw-txt d-flex flex-column gap-2"
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
                    {/* Rewards are displayed in real-time */}
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
                  <h6 className={"m-0 mybalance-text d-flex"}>Rewards</h6>
                  <div className="form-row w-100 d-flex gap-2 align-items-end justify-content-between">
                    <h6 className="m-0 w-100 rewardstxtCaws d-flex align-items-center gap-2">
                      <img
                        src={weth}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />{" "}
                      {getFormattedNumber(EthRewards, 4)} WETH ($
                      {getFormattedNumber(ethToUSD, 4)})
                    </h6>
                    <button
                      className={`btn w-100 disabled-btn d-flex justify-content-center align-items-center gap-2`}
                      style={{ height: "fit-content" }}
                      onClick={claimRewards}
                      disabled={true}
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
                        setHide("");
                      }}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showChecklistModal === true && (
        <NftStakeCheckListModal
          onClose={() => {
            setshowChecklistModal(false);
            setamountToStake("");
          }}
          getApprovedNfts={getApprovedNfts}
          // nftItem={showStaked ? mystakes : showToStake ? myNFTs : showStaked}
          nftItem={mystakes}
          onshowStaked={() => {
            setshowStaked(true);
            setshowToStake(false);
            setHide("mystakes2");
          }}
          onshowToStake={() => {
            setshowStaked(false);
            setshowToStake(true);
            setHide("tostake2");
          }}
          onClaimAll={() => {
            claimRewards();
          }}
          onUnstake={() => handleUnstakeAll()}
          isConnected={isConnected}
          coinbase={coinbase}
          ETHrewards={EthRewards}
          countDownLeft={countDownLeft}
          open={openStakeChecklist ? true : false}
          hideItem={hide}
          showbutton={true}
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
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">My Stakes</span>
                    <h6 className="stats-card-content">
                      {mystakes.length} CAWS
                    </h6>
                  </div>
                  <div className="stats-card p-2 d-flex flex-column mx-auto w-100">
                    <span className="stats-card-title">Total NFTs staked</span>
                    <h6 className="stats-card-content">{totalStakes}/10,000</h6>
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
                      href={`https://etherscan.io/address/${window.config.nftstaking_address50}`}
                      className="stats-card-content text-decoration-underline"
                    >
                      {shortAddress(window.config.nftstaking_address50)}{" "}
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

export default CawsDetails;
