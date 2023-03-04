import React, { useEffect, useState } from "react";
import "./_nftEvent.scss";
import arrowBlack from "../../assets/arrow-black.svg";
import arrowWhite from "../../assets/arrow-white.svg";
import GenesisBenefitsGrid from "./GenesisBenefitsGrid";
import PhFlag from "../../assets/phFlag.svg";
import UsFlag from "../../assets/enFlag.svg";
import EventForm from "./EventForm";

const NFTEvent = ({ coinbase, showWalletConnect }) => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [myNFTIds, setMyNFTIds] = useState([]);
  const [activeArrow, setactiveArrow] = useState(false);
  const [flag, setFlag] = useState("us");

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
                  Get ready to own a limited edition Genesis Land in World of
                  Dypians and experience the most exciting virtual world. This
                  is an amazing chance for you to become part of World of
                  Dypians metaverse by owning a Genesis Land NFT and receiving a
                  30% reimbursement of its value. But hurry, this offer is only
                  valid for 5 days, so don't miss out on the chance to own a
                  piece of our unique and exciting world.
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
                <div className="d-flex flex-column justify-content-between gap-4">
                  <div className="flagWrapper" style={{ alignSelf: "end" }}>
                    <div className="d-flex flex-column gap-2 justify-content-between align-items-center">
                      <div className="d-flex gap-4">
                        <img
                          className={`flag ${flag === "us" && "flag-active"}`}
                          src={PhFlag}
                          alt=""
                          onClick={() => {
                            setFlag("us");
                          }}
                        />
                        <img
                          className={`flag ${flag === "ph" && "flag-active"}`}
                          src={UsFlag}
                          alt=""
                          onClick={() => {
                            setFlag("ph");
                          }}
                        />
                      </div>
                      <div>
                        <span className="selectlang">Select Language</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            <EventForm showWalletConnect={showWalletConnect} coinbase={coinbase}/>
            <GenesisBenefitsGrid />
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTEvent;
