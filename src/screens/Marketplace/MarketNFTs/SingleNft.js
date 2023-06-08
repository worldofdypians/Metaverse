import React, { useState, useEffect } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import topEth from "../assets/topEth.svg";
import topDyp from "../assets/topDyp.svg";
import { useLocation } from "react-router-dom";

const SingleNft = ({ coinbase, showWalletConnect, chainId, isConnected }) => {
  const windowSize = useWindowSize();
  const location = useLocation();

  const [nft, setNft] = useState(
    location.state?.nft ? location.state?.nft : []
  );

  const [isCaws, setisCaws] = useState(
    location.state?.isCaws ? location.state?.isCaws : false
  );
  const [isWod, setisWod] = useState(
    location.state?.isWod ? location.state?.isWod : false
  );
  const [isTimepiece, setisTimepiece] = useState(
    location.state?.isTimepiece ? location.state?.isTimepiece : false
  );

  console.log(nft, isCaws, isWod, isTimepiece);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 786 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft pe-5 position-relative">
        <div className="main-wrapper py-4 w-100">
          {isWod ? (
            <>
              <h6 className="market-banner-title">World of Dypians</h6>
              <h6
                className="market-banner-title"
                style={{ color: "#8C56FF", lineHeight: "80%" }}
              >
                Land
              </h6>
            </>
          ) : isCaws ? (
            <>
              <h6 className="market-banner-title">Cats and Watches Society</h6>
              <h6
                className="market-banner-title"
                style={{ color: "#8C56FF", lineHeight: "80%" }}
              >
                (CAWS)
              </h6>
            </>
          ) : (
            <>
              <h6 className="market-banner-title">CAWS</h6>
              <h6
                className="market-banner-title"
                style={{ color: "#8C56FF", lineHeight: "80%" }}
              >
                Timepiece
              </h6>
            </>
          )}
          <div className="d-flex align-items-center justify-content-between my-5">
          <div className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3 position-relative">
           
            <div className="position-relative package-blur">
                <div className="first-box-blur first-bigbox-blur d-flex align-items-end justify-content-center">
              
                </div>
                <div className="second-box-blur second-bigbox-blur"></div>
                <img
                className="blur-img blur-img-big"
                src={
                  isCaws
                    ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                    : isWod
                    ? `https://mint.worldofdypians.com/thumbs/${nft.tokenId}.png`
                    : `https://timepiece.worldofdypians.com/images/${nft.tokenId}.png`
                }
                alt=""
              />
              </div>

          </div>
          <div className="d-flex align-items-center flex-column nft-outer-wrapper col-lg-6  p-4 gap-2 my-4 single-item-info">
            <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
              <h3 className="nft-title">
                {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
                {nft.tokenId}
              </h3>
              <div className="price-wrapper p-3">
                <div className="d-flex flex-column gap-2">
                  <span className="currentprice-txt">Current price</span>
                  <div className="d-flex gap-2 align-items-baseline">
                    <img
                      src={nft.payment_priceType === 0 ? topEth : topDyp}
                      alt=""
                      height={30}
                      width={30}
                    />
                    <span className="nft-price-eth">
                      {nft.price} {nft.payment_priceType === 0 ? "ETH" : "DYP"}{" "}
                    </span>
                    <span className="nft-price-usd">$956.62</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <div className="d-flex flex-column gap-2">
                  <span className="owner-txt">Owner</span>
                  <a
                    href={`https://etherscan.io/address/${nft.seller}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                    className="seller-addr"
                  >
                    {nft.seller}
                  </a>
                </div>
                <button className="btn buyNftbtn col-3 d-flex justify-content-center">Buy</button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNft;
