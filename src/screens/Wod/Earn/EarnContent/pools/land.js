import React, { useState, useEffect } from "react";
import axios from "axios";
import getFormattedNumber from "../../../../Caws/functions/get-formatted-number";
import "../top-pools.css";
import "./_stakingWod.scss";
import arrowup from "../../assets/arrow-up.svg";
import moreinfo from "../../assets/more-info.svg";
import wallet from "../../assets/wallet.svg";
import { Tooltip } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";
import weth from "../../assets/tokens/weth.svg";
import StakeLandModal from "../../../../../components/StakeModal/StakeLandModal";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import { shortAddress } from "../../../../Caws/functions/shortAddress";
import { ethers } from "ethers";
import Modal from "../../../../../components/General/Modal";
import statsIcon from "../../assets/statsIcon.svg";

const LandDetails = ({
  coinbase,
  isConnected,
  listType,
  handleSwitchNetwork,
  chainId,
  handleConnection,
  renderedPage,
  apr,
  binanceW3WProvider,
  expired,
  tvl_usd
}) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [amountToStake, setamountToStake] = useState("");
  const [mystakes, setMystakes] = useState([]);
  const [color, setColor] = useState("#F13227");
  const [status, setStatus] = useState("");
  const [showApprove, setshowApprove] = useState(true);
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [EthRewards, setEthRewards] = useState(0);
  const [ethToUSD, setethToUSD] = useState(0);
  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [totalStakes, settotalStakes] = useState(0);
  const [approvedNfts, setApprovedNfts] = useState([]);
  const [landpopup, setLandpopup] = useState(false);
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
    const stake25 = await window.config.landnftstake_address;
    if (address) {
      const result = await window.landnft
        .checkapproveStake(address, stake25)
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
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    if (myStakes.length > 0) {
      calculateRewards = await staking_contract.methods
        .calculateRewards(address, myStakes)
        .call()
        .then((data) => {
          return data;
        });
    }
    let a = 0;

    for (let i = 0; i < calculateRewards.length; i++) {
      a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");

      result = result + Number(a);
    }

    setEthRewards(result);
  };
  const claimRewards = async () => {
    setclaimLoading(true);

    if (window.WALLET_TYPE !== "binance") {
      let myStakes = await getStakesIds();
      let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
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
          window.alertify.message("Claimed All Rewards!");
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
      let staking_contract = new ethers.Contract(
        window.config.landnftstake_address,
        window.LANDSTAKING_ABI,
        binanceW3WProvider.getSigner()
      );

      let myStakes = await getStakesIds();

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
        setclaimStatus("success");
        setclaimLoading(false);

        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
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

  const handleEthPool = async () => {
    await handleSwitchNetworkhook("0x1")
      .then(() => {
        handleSwitchNetwork("1");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getApprovedNfts = (data) => {
    setApprovedNfts(data);
    return data;
  };

  const totalStakedNft = async () => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDMINTING_ABI,
      window.config.landnft_address,
      { from: undefined }
    );

    await staking_contract.methods
      .balanceOf(window.config.landnftstake_address)
      .call()
      .then((data) => {
        settotalStakes(data);
      });
  };

  const showLandPopup = () => {
    setLandpopup(true);
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
    }
  }, [isConnected]);

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
                  25%
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
              <div className="d-flex align-items-center justify-content-between gap-2">
                <h6 className="m-0 earnrewards-text">Total NFTs staked</h6>
                <h6 className="m-0 earnrewards-token d-flex align-items-center gap-1">
                  {totalStakes}/1000
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
                onClick={showLandPopup}
              >
                <h6 className="m-0 bottomitems"> Get Land NFT</h6>
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
                      style={{ opacity: 1, width: 145 }}
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
              }  ${chainId !== "1" && "blurrypool"} ${
                expired === true && "blurrypool"
              } `}
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
                      <b>
                        {isConnected === false ? 0 : myNFTs.length} Genesis NFTs
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
            {mystakes.length > 0 && <div className="stake-separator"></div>}
            {mystakes.length > 0 && (
              <div
                className={`otherside-border ${
                  listType === "list" ? "col-12 col-md-6 col-lg-4" : "px-0"
                }  ${chainId !== "1" && "blurrypool"} `}
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
                      <b>{isConnected === false ? 0 : mystakes.length}</b>
                    </h6>
                  </h6>
                  <h6 className="m-0 withdraw-littletxt d-flex align-items-center gap-2">
                    <Tooltip
                      placement="top"
                      title={
                        <div className="tooltip-text">
                          {
                            "Rewards earned by your Genesis Land NFTs deposit to the staking smart contract are displayed in real-time."
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
                      className={`btn w-100 claim-inner-btn ${
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
        <StakeLandModal
          onModalClose={() => {
            setshowChecklistModal(false);
          }}
          getApprovedLandPoolsNfts={getApprovedNfts}
          nftItem={mystakes}
          isConnected={isConnected}
          coinbase={coinbase}
          onDepositComplete={() => myStakes()}
          ETHrewards={EthRewards}
          finalUsd={ethToUSD}
          onClaimAll={() => {
            claimRewards();
          }}
          isStake={true}
          handleConnect={handleConnection}
          binanceW3WProvider={binanceW3WProvider}
        />
      )}
    </div>
  );
};

export default LandDetails;
