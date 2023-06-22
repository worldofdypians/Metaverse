import React, { useState, useEffect } from "react";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import marketStakeBanner from "./assets/marketStakeBanner2.webp";
import StakeModal from "../../components/StakeModal/StakeModal";
import RewardsModal from "../../components/StakeModal/RewardsModal";
import axios from "axios";
import { abbreviateNumber } from "js-abbreviation-number";

const MarketStake = ({ coinbase, chainId, handleConnect, isConnected }) => {
  const windowSize = useWindowSize();
  const [mystakes, setMystakes] = useState([]);
  const [mystakesLandPool, setMystakesLandPool] = useState([]);
  const [myLandstakes, setMyLandstakes] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);
  const [nftModal, setNftModal] = useState(false);
  const [rewardModal, setRewardModal] = useState(false);

  const [newStakes, setnewStakes] = useState(0);
  const [approvedNfts, setApprovedNfts] = useState([]);
  const [approvedWodNfts, setApprovedWodNfts] = useState([]);
  const [approvedLandNfts, setApprovedLandNfts] = useState([]);
  const [EthRewards, setEthRewards] = useState(0);
  const [ethToUSD, setethToUSD] = useState(0);
  const [landtvl, setlandTvl] = useState(0);
  const [cawslandTvl, setCawsLandtvl] = useState(0);

  const html = document.querySelector("html");

  const fetchTvl = async () => {
    const result = await axios.get(
      `https://api.dyp.finance/api/get_staking_info_eth`
    );
    if (result) {
      const resultLand = result.data.stakingInfoLAND[0].tvl_usd;
      const resultcawsWod = result.data.stakinginfoCAWSLAND[0].tvl_usd;
      setlandTvl(resultLand);
      setCawsLandtvl(resultcawsWod);
    }
  };

  const myNft = async () => {
    let myNft = await window.myNftListContract(coinbase);
    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getNft(nft));

      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyNFTs(nfts);
    } else setMyNFTs([]);
  };

  const getStakesIds = async () => {
    let stakenft = [];

    if (coinbase && isConnected && chainId === 1) {
      const allCawsStakes = await window.wod_caws
        .depositsOf(coinbase)
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allCawsStakes;
    }
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

  const getLandStakesIds = async () => {
    let stakenft = [];
    if (coinbase && isConnected && chainId === 1) {
      const allLandStakes = await window.wod_caws
        .depositsOfWod(coinbase)
        .then((result) => {
          if (result.length > 0) {
            for (let i = 0; i < result.length; i++)
              stakenft.push(parseInt(result[i]));
            return stakenft;
          }
        });

      return allLandStakes;
    }
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

  const myLandNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);

    if (myNft && myNft.length > 0) {
      let nfts = myNft.map((nft) => window.getLandNft(nft));
      nfts = await Promise.all(nfts);

      nfts.reverse();

      setMyLandNFTs(nfts);
    } else setMyLandNFTs([]);
  };


  

  const getStakesIdsLandPool = async () => {
    if (coinbase && isConnected && chainId === 1) {
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(coinbase)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
    }
  };

  const myStakesLandPool = async () => {
    let myStakes = await getStakesIdsLandPool();
    let stakes = myStakes.map((stake) => window.getLandNft(stake));
    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakesLandPool(stakes);
  };



  const refreshStakes = () => {
    setnewStakes(newStakes + 1);
  };

  const handleUnstakeAll = async () => {
    await window.wod_caws
      .withdrawWodCaws()
      .then(() => {
        refreshStakes();
      })
      .catch((err) => {
        window.alertify.error(err?.message);
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

  const calculateAllRewards = async () => {
    let myStakes = await getStakesIds();
    let result = 0;

    if (coinbase !== null) {
      if (myStakes.length > 0) {
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
    let myStakes = await getStakesIds();
    // setclaimAllStatus("Claiming all rewards, please wait...");
    await window.wod_caws
      .claimRewardsWodCaws(myStakes)
      .then(() => {
        setEthRewards(0);
      })
      .catch((err) => {});
  };

  const getApprovedNfts = (data) => {
    setApprovedNfts(data);
    return data;
  };

  const getApprovedLandNfts = (data) => {
    setApprovedLandNfts(data);
    return data;
  };

  const onModalClose = () => {
    setNftModal(false);
  };

  const onRewardModalClose = () => {
    setRewardModal(false);
  };

  useEffect(() => {
    if (isConnected) {
      setUSDPrice();
    }
  }, [isConnected, EthRewards]);

  useEffect(() => {
    calculateAllRewards();
    myNft();
    myStakes();
    myLandNft();
    myLandStakes();
    myStakesLandPool()
  }, [isConnected, coinbase, newStakes]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Stake";
    fetchTvl();
  }, []);

  useEffect(() => {
    if (nftModal || rewardModal) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [nftModal, rewardModal]);

  return (
    <div
      className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div
        className="container-nft d-flex align-items-start flex-column gap-2 px-3 px-lg-5 my-4 position-relative"
        style={{ minHeight: "72vh", backgroundSize: "cover" }}
      >
        <div className="container-lg mx-0">
          {nftModal && (
            <StakeModal
              onModalClose={onModalClose}
              getApprovedNfts={getApprovedNfts}
              getApprovedLandNfts={getApprovedLandNfts}
              landItems={myLandNFTs}
              cawsItems={myNFTs}
              nftItem={myNFTs}
              isConnected={isConnected}
              coinbase={coinbase}
              onDepositComplete={() => refreshStakes()}
            />
          )}
          {rewardModal && (
            <RewardsModal
              onModalClose={onRewardModalClose}
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
              onClaimAll={() => {
                claimRewards();
              }}
            />
          )}
          <h6 className="nft-page-title font-raleway mt-5 mt-lg-4">
            World of Dypians{" "}
            <span style={{ color: "#8c56ff" }}>NFT Staking</span>
          </h6>
          <div className="row">
            <div className="col-12 ">
              <div className="market-stake-banner-wrapper d-flex align-items-center justify-content-center p-4">
                <img src={marketStakeBanner} className="w-50" alt="" />
              </div>
            </div>
          </div>
          <div className="row w-100  m-0 mt-5">
            <div className="col-12 px-0">
              <div className="caws-wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex flex-column gap-2">
                      <h6 className="market-stake-title">
                        World of Dypians Land & CAWS
                      </h6>
                      <span className="market-stake-desc">
                        Make the most of your Land assets with WoD Staking.
                        Start earning now!
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn pill-btn px-4 py-2"
                        onClick={() => setNftModal(true)}
                      >
                        Deposit
                      </button>
                      <button
                        className="btn rewards-btn px-4 py-2"
                        onClick={() => {
                          setRewardModal(true);
                        }}
                      >
                        Rewards
                      </button>
                    </div>
                  </div>
                  <div className="tvl-wrapper">
                    <h6 className="market-stake-tvl">
                      ${abbreviateNumber(cawslandTvl)}+
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row w-100 m-0 mt-5">
            <div className="col-12 px-0">
              <div className="wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex flex-column gap-2">
                      <h6 className="market-stake-title">
                        World of Dypians Land
                      </h6>
                      <span className="market-stake-desc">
                        Make the most of your Land assets with WoD Staking.
                        Start earning now!
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn pill-btn px-4 py-2">
                        Deposit
                      </button>
                      <button className="btn rewards-btn px-4 py-2">
                        Rewards
                      </button>
                    </div>
                    <div className="tvl-wrapper">
                      <h6 className="market-stake-tvl">
                        ${abbreviateNumber(landtvl)}+
                      </h6>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStake;
