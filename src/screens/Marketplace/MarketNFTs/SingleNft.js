import React, { useState, useEffect } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import topEth from "../assets/topEth.svg";
import topDyp from "../assets/dypIcon.svg";
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
  const [IsApprove, setIsApprove] = useState(false);
  const [buttonText, setbuttonText] = useState("Approve");
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [metaData, setmetaData] = useState([]);

  const getMetaData = async () => {
    if (nft) {
      if (isCaws) {
        const result = await window.getNft(nft.tokenId);
        setmetaData(result);
      } else if (isWod) {
        const result = await window.getLandNft(nft.tokenId);
        setmetaData(result);
      } else if (isTimepiece) {
        const result = await window.getTimepieceNft(nft.tokenId);
        setmetaData(result);
      }
    }
    else console.log('no')
  };

  const isApprovedBuy = async (amount) => {
    return await window.isApprovedBuy(amount);
  };

  async function handleBuy(nft) {
    console.log("nft", nft);

    const isApproved = await isApprovedBuy(nft.price);

    if (isApproved) {
      setbuttonLoading(true);
      await window
        .buyNFT(
          nft.price,
          nft.nftAddress,
          nft.tokenId,
          nft.payment_priceType,
          nft.payment_tokenAddress
        )
        .then((result) => {
          console.log("buyNFT", result);
          setbuttonLoading(false);
          setbuttonText("Success");
        })
        .catch((e) => {
          setbuttonText("Failed");
          setbuttonLoading(false);

          console.error(e);
        });
    } else {
      setbuttonLoading(true);
      console.log("approveBuy");
      await window
        .approveBuy(nft.price)
        .then((result) => {
          console.log("approveBuy", result);
          setbuttonLoading(false);
          setbuttonText("Success");
        })
        .catch((e) => {
          console.error(e);
          setbuttonLoading(false);

          setbuttonText("Failed");
        });
    }
  }

  useEffect(() => {
    if (isConnected === true && nft.payment_priceType === 1) {
      isApprovedBuy(nft.price).then((isApproved) => {
        console.log(isApproved);
        setIsApprove(isApproved);
        if (isApproved === true) {
          setbuttonText("Buy");
        } else if (isApproved === false) {
          setbuttonText("Approve");
        }
      });
    }
  }, [nft.price]);

  useEffect(() => {
    // setTimeout(() => {
      getMetaData();
    // }, 3000);
  }, [nft, isCaws, isTimepiece, isWod]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // console.log(metaData)

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
                <div className="first-box-blur first-bigbox-blur d-flex align-items-end justify-content-center"></div>
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
                  {isCaws ? "CAWS" : isWod ? "Genesis Land" : "CAWS Timepiece"}{" "}
                  #{nft.tokenId}
                </h3>
                <div className="price-wrapper p-3">
                  <div className="d-flex flex-column gap-2 align-items-center">
                    <span className="currentprice-txt">Current price</span>
                    <div className="d-flex gap-2 align-items-center">
                      <img
                        src={nft.payment_priceType === 0 ? topEth : topDyp}
                        alt=""
                        height={30}
                        width={30}
                      />
                      <span className="nft-price-eth">
                        {nft.price}{" "}
                        {nft.payment_priceType === 0 ? "ETH" : "DYP"}{" "}
                      </span>
                      <span className="nft-price-usd">$956.62</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between gap-2 align-items-center">
                  <div className="d-flex flex-column gap-2 align-items-center">
                    <span className="owner-txt">Owner</span>
                    <a
                      href={`https://etherscan.io/address/${nft.seller}`}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                      className="seller-addr"
                      rel='noreferrer'
                    >
                      {nft.seller}
                    </a>
                  </div>
                  <button
                    className="btn buyNftbtn col-3 d-flex justify-content-center"
                    onClick={() => {
                      handleBuy(nft);
                    }}
                  >
                    {buttonLoading === true ? (
                      <div
                        class="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <>{buttonText}</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
            <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
              <h3 className="traits-text">Traits</h3>
              {isCaws || isTimepiece ? (
                <>
                  {" "}
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Background</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[0]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Tail</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[1]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Ears</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[2]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Body</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[3]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Clothes</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[4]?.value}</span>
                    </div>
                  </div>
                  <div className="trait-separator"></div>
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Eyes</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[5]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Mouth</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[6]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Hat</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[7]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Eyewear</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[8]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Watch</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[9]?.value}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Tier</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[0]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Size</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[1]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Building</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[3]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Workbench</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[4]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">NPC - Attire</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[8]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Gemstone</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[9]?.value}</span>
                    </div>
                  </div>
                  <div className="trait-separator"></div>

                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Artifacts</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[5]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">NPC</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[6]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">NPC - AI Powered</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[7]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Plot</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[10]?.value}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <span className="traittitle">Multi Functional Building</span>
                      <span className="traitsubtitle">{metaData.attributes && metaData?.attributes[2]?.value}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNft;
