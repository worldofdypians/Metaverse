import React, { useEffect, useState } from "react";
import "./_nftEvent.scss";
import NftCard from "../../components/NewsCard/NftCard";
import NftCardSoldOut from "../../components/NewsCard/NftCardSoldOut";
import arrowBlack from "../../assets/arrow-black.svg";
import arrowWhite from "../../assets/arrow-white.svg";
import Countdown from "react-countdown";
import limitedOfferBadge from '../../assets/limitedoffer.svg'

const renderer = ({ days, hours, minutes }) => {
  return (
    <>
      <div className="d-flex align-items-center gap-3" style={{width: 'fit-content'}}>
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "40px" }}
        >
          <span className="countdown-sup mb-0">{days}</span>
          <span className="countdown-sub" style={{ fontWeight: 300 }}>
            days
          </span>
        </div>
        <span
          className="countdown-sup"
          style={{ position: "relative", bottom: "13px" }}
        >
          :
        </span>
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "40px" }}
        >
          <span className="countdown-sup mb-0">{hours}</span>
          <span className="countdown-sub" style={{ fontWeight: 300 }}>
            hours
          </span>
        </div>
        <span
          className="countdown-sup"
          style={{ position: "relative", bottom: "13px" }}
        >
          :
        </span>
        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "40px" }}
        >
          <span className="countdown-sup mb-0">{minutes}</span>
          <span className="countdown-sub" style={{ fontWeight: 300 }}>
            minutes
          </span>
        </div>
      </div>
    </>
  );
};

const NFTEvent = ({ coinbase }) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [myNFTIds, setMyNFTIds] = useState([]);
  const [activeArrow, setactiveArrow] = useState(false);

  const myNft = async () => {
    let myNft = await window.myNftLandListContract(
      "0xd7f4929731639ce05a31b931d00e58c8cfb5e766"
    );
    let idArray = [];
    let nfts = myNft.map((nft) => window.getLandNft(nft));
    nfts = await Promise.all(nfts);

    nfts.reverse();
    for (let i = 0; i < nfts.length; i++) {
      const id = nfts[i].name.slice(1, nfts[i].name.length);
      idArray.push(id);
    }

    setMyNFTIds(idArray.slice(0, 6));
    setMyNFTs(nfts.slice(0, 6));
  };

  const [inactiveArray, setInactiveArray] = useState([]);
  const NftArray = [
    "918",
    "917",
    "916",
    "915",
    "914",
    "913",
    "912",
    "911",
    "910",
    "909",
  ];

  const checkIds = () => {
    var array3 = NftArray.filter(function (obj) {
      return myNFTIds.indexOf(obj) == -1;
    });
    setInactiveArray(array3);
  };

  useEffect(() => {
    checkIds();
  }, [myNFTIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NFT Event";
  }, []);

  useEffect(() => {
    myNft();
  }, []);

  return (
    <>
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
        <div className="d-flex w-100 flex-column news-main-wrapper">
          <div className="row w-100 px-3 px-lg-5 mx-0 news-container gap-5 mb-3">
            <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center justify-content-between">
              <div className="col-12 col-lg-8 col-xxl-8">
                <h2 className="news-header font-organetto px-0 pt-3 pt-lg-5 pb-0 align-items-center gap-2">
                  Philippines Community Exclusive:{" "}
                  <h2 className="mb-0" style={{ color: "#8c56ff" }}>
                    Unlock Your Piece of the Metaverse!
                  </h2>
                </h2>
                <p className="land-hero-content font-poppins text-white px-0 col-8">
                  The customization options in WoD allow you to express your
                  creativity and make a mark on the virtual world. With endless
                  possibilities for personalization, each player's experience in
                  the WoD is truly one-of-a-kind.
                </p>
                <div
                  className="linear-border"
                  style={{
                    width: "fit-content",
                  }}
                  onMouseEnter={() => {
                    setactiveArrow(true);
                  }}
                  onMouseLeave={() => {
                    setactiveArrow(false);
                  }}
                >
                  <button className="btn filled-btn px-5">
                    Earn with Genesis{" "}
                    <img
                      src={activeArrow === true ? arrowWhite : arrowBlack}
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-xxl-3">
                <div className="d-flex flex-column justify-content-between">
                  <div className="timerwrapper position-relative">
                    <img src={limitedOfferBadge} alt='' className="limitedbadge"/>
                    <Countdown
                      renderer={renderer}
                      date={"2023-03-08T13:00:00.000+00:00"}
                    />
                  </div>
                </div>
              </div>
            </div>
            {myNFTs.length > 0 && myNFTs.length === 10 ? (
              <div className="d-grid nft-grid px-0">
                {myNFTs.map((nftItem, index) => (
                  <NftCard
                    title={nftItem.name}
                    content={nftItem.content}
                    image={nftItem.image}
                    id={nftItem.name.slice(1, nftItem.name.length)}
                    key={index}
                  />
                ))}
              </div>
            ) : myNFTs.length > 0 && myNFTs.length < 10 ? (
              <div className="d-grid nft-grid px-0">
                {myNFTs.map((nftItem, index) => (
                  <NftCard
                    title={nftItem.name}
                    content={nftItem.content}
                    image={nftItem.image}
                    id={nftItem.name.slice(1, nftItem.name.length)}
                    key={index}
                  />
                ))}
                {inactiveArray.map((nftItem, index) => (
                  <NftCardSoldOut
                    title={"#" + nftItem}
                    id={nftItem}
                    key={index}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTEvent;
