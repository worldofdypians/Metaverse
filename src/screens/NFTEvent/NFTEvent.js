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
  const [flag, setFlag] = useState("ph");

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
    if (coinbase) {
      myNft();
    }
  }, [coinbase]);

  return (
    <>
      <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
        <div className="d-flex w-100 flex-column news-main-wrapper">
          <div className="row w-100 px-3 px-lg-5 mx-0 news-container gap-5 mb-3 mt-5 mt-lg-0">
            <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-start justify-content-between mt-5 mt-lg-0 gap-3">
              <div className="col-12 col-lg-8 col-xxl-8 d-flex flex-column order-2 order-lg-1">
                <h2 className="newsevent-header font-organetto px-0 pt-3 pt-lg-5 pb-0 align-items-center gap-2">
                  {flag === "ph"
                    ? "Ekslusibo para sa Philippine Community:"
                    : "Philippines Community Exclusive:"}
                  <h2 className="mb-0" style={{ color: "#8c56ff" }}>
                    {flag === "ph"
                      ? "Magmay-ari ng piraso ng lupain sa loob ng World of Dypians metavese."
                      : "Unlock Your Piece of the Metaverse!"}
                  </h2>
                </h2>
                <p className="land-hero-content font-poppins text-white px-0 col-12 col-lg-8 col-xxl-8">
                  {flag === "ph"
                    ? "Humanda upang maging bahagi ng World of Dypians metaverse sa pamamagitan ng pagmamay-ari ng Genesis Land NFT at tumatanggap ng 30% reimbursement sa halaga nito. Ngunit magmadali, ang alok na ito ay magtatagal lamang sa loob ng 5 araw, kaya huwag palampasin ang pagkakataong magkaroon ng isang piraso ng ating kakaiba at kapana-panabik na mundo."
                    : `Get ready to become part of World of Dypians metaverse by
                    owning a Genesis Land NFT and receiving a 30% reimbursement of
                    its value. But hurry, this offer is only valid for 5 days, so
                    don't miss out on the chance to own a piece of our unique and
                    exciting world.`}
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
                  <a
                    href="#how-to-earn"
                    className="text-decoration-none btn filled-btn px-5"
                  >
                    {flag === "ph"
                      ? `Kumita gamit ang Genesis`
                      : `Earn with Genesis`}
                 
                    <img
                      src={activeArrow === true ? arrowWhite : arrowBlack}
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div className="col-12 col-lg-2 user-select-none pe-none col-xxl-2 d-flex order-3 order-lg-2 justify-content-center discountwrapper">
                <img
                  src={require("./assets/discounthero.svg").default}
                  alt=""
                  className="discount30"
                />
              </div>
              <div className="col-12 col-lg-1 col-xxl-1 d-flex order-1 order-lg-3 justify-content-end mt-0 mt-lg-4">
                <div className="d-flex flex-column justify-content-between gap-4">
                  <div className="flagWrapper" style={{ alignSelf: "end" }}>
                    <div className="d-flex flex-column gap-2 justify-content-between align-items-center">
                      <div className="d-flex gap-4">
                        <img
                          className={`flag ${flag === "ph" && "flag-active"}`}
                          src={PhFlag}
                          alt=""
                          onClick={() => {
                            setFlag("ph");
                          }}
                        />
                        <img
                          className={`flag ${flag === "us" && "flag-active"}`}
                          src={UsFlag}
                          alt=""
                          onClick={() => {
                            setFlag("us");
                          }}
                        />
                      </div>
                      <div>
                        <span className="selectlang">
                        {flag === "ph"
                      ? `Piliin ang Lengguwahe`
                      : `Select Language`}
                          
                          
                          </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <EventForm
              showWalletConnect={showWalletConnect}
              coinbase={coinbase}
              flag={flag}
            />
            <GenesisBenefitsGrid flag={flag} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTEvent;
