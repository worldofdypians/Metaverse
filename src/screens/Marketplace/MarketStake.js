import React from "react";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import marketStakeBanner from "./assets/marketStakeBanner2.webp";
import StakeModal from "../../components/StakeModal/StakeModal";
import { useState } from "react";
import { useEffect } from "react";

const MarketStake = ({ coinbase, chainId, handleConnect, isConnected }) => {
  const windowSize = useWindowSize();
  const [mystakes, setMystakes] = useState([]);
  const [myLandstakes, setMyLandstakes] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myLandNFTs, setMyLandNFTs] = useState([]);
  const [nftModal, setNftModal] = useState(false);
  const [newStakes, setnewStakes] = useState(0);
  const [approvedNfts, setApprovedNfts] = useState([]);
  const [approvedLandNfts, setApprovedLandNfts] = useState([]);

  const html = document.querySelector("html");

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

  useEffect(() => {
    myNft();
    myStakes();
    myLandNft();
    myLandStakes();
  }, [isConnected, coinbase, newStakes]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (nftModal) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [nftModal]);

  return (
    <div
      className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}
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
            <h6 className="nft-page-title font-raleway mt-5 mt-lg-4">
              NFT Staking <span style={{ color: "#8c56ff" }}>Pools</span>
            </h6>
            <div className="row w-100 m-0 mt-4">
              <div className="col-12 px-0">
                <div className="market-stake-banner-wrapper d-flex flex-column flex-lg-row align-items-center gap-3 gap-lg-0 justify-content-around p-4">
                  <div className="d-flex flex-column align-items-center gap-0 gap-lg-1">
                    <h6 className="market-stake-stat mb-0">$432K+</h6>
                    <span className="market-stake-stat-desc">
                      Total Value Locked (TVL)
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-0 gap-lg-1">
                    <h6 className="market-stake-stat mb-0">$1.2K+</h6>
                    <span className="market-stake-stat-desc">
                      Total Staked NFTs
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-0 gap-lg-1">
                    <h6 className="market-stake-stat mb-0">$18.5M+</h6>
                    <span className="market-stake-stat-desc">Paid Rewards</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row w-100  m-0 mt-5">
              <div className="col-12 px-0">
                <div className="caws-wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                  <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                    <div className="d-flex flex-column gap-4">
                      <h6 className="market-stake-title">
                        World of Dypians Land and Caws
                      </h6>
                      <span className="market-stake-desc">
                        Make the most of your Land assets with WoD Staking.
                        Start earning now!
                      </span>
                      <div className="d-flex align-items-center gap-3">
                        <button
                          className="btn pill-btn px-4 py-2"
                          onClick={() => setNftModal(true)}
                        >
                          Deposit
                        </button>
                        <button className="btn rewards-btn px-4 py-2 text-white">
                          Rewards
                        </button>
                      </div>
                    </div>
                    <div className="tvl-wrapper">
                      <h6 className="market-stake-tvl">$38.6K+</h6>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row w-100 m-0 mt-5">
              <div className="col-12 px-0">
                <div className="wod-stake-wrapper d-flex align-items-center w-100 p-4 p-lg-5">
                  <div className="d-flex align-items-start align-items-lg-center justify-content-between h-100 w-100 position-relative">
                    <div className="d-flex flex-column gap-4">
                      <h6 className="market-stake-title">
                        World of Dypians Land
                      </h6>
                      <span className="market-stake-desc">
                        Make the most of your Land assets with WoD Staking.
                        Start earning now!
                      </span>
                      <div className="d-flex align-items-center gap-3">
                        <button className="btn pill-btn px-4 py-2">
                          Deposit
                        </button>
                        <button className="btn rewards-btn px-4 py-2 text-white">
                          Rewards
                        </button>
                      </div>
                    </div>
                    <div className="tvl-wrapper">
                      <h6 className="market-stake-tvl">$38.6K+</h6>
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
