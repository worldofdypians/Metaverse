import React, { useState, useEffect } from "react";
import "./_nftbridge.scss";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import dropdownIcon from "./assets/dropdownIcon.svg";

const NFTBridge = ({
  coinbase,
  showWalletConnect,
  chainId,
  isConnected,
  myNFTSLand,
  myNFTSCaws,
}) => {
  const windowSize = useWindowSize();
  const [filterTitle, setFilterTitle] = useState("");
  const [destinationFilterTitle, setDestinationFilterTitle] = useState("");
  const [showPopup, setshowPopup] = useState(false);

  const showNftSelectionPopup = () => {
    setshowPopup(true);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div
        className="container-nft  d-flex  align-items-start px-3 px-lg-5 position-relative"
        style={{ backgroundSize: "cover" }}
      >
        <div className="container-lg mt-5 mt-lg-4 mx-0 position-relative">
          <div className="nft-bridge-hero-wrapper p-3 mt-5 mt-lg-0">
            <div className="row mx-0 align-items-center justify-content-between m-0 gap-4 gap-lg-0">
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-3">
                  <h6 className="nft-page-title pt-4 pt-lg-0 mt-0">
                    NFT <span style={{ color: "#8c56ff" }}>Bridge</span>
                  </h6>

                  <p className="collection-desc">
                    NFT Bridge ensures a smooth and secure transfer of digital
                    assets, providing users with a seamless experience in
                    navigating and trading CAWS and Genesis Land NFTs across
                    Ethereum, BNB Chain, Avalanche, and Base Network.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <img
                  src={require("./assets/bridgenft.webp")}
                  className="w-100"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="nft-bridge-page-wrapper d-flex flex-column gap-3 p-3">
            <div className="d-flex align-items-center gap-4 justify-content-between">
              <span className="nft-bridge-select-route">
                Select Bridge Route
              </span>
              <div className="d-flex gap-4 align-items-center justify-content-between">
                <div className="d-flex gap-2 align-items-center">
                  <span className="nft-bridge-label">From</span>
                  <div className="dropdown filters-dropdown">
                    <button
                      className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="filter-nav-title mb-0">{filterTitle}</h6>
                      </div>
                      <img src={dropdownIcon} alt="" />
                    </button>
                    <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Ethereum");
                          //   sortNfts("all");
                        }}
                      >
                        <span>Ethereum</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("BNB Chain");
                          //   sortNfts("lto");
                        }}
                      >
                        <span>BNB Chain</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Avalanche");
                          //   sortNfts("lso");
                        }}
                      >
                        <span>Avalanche</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Base Network");
                          //   sortNfts("lso");
                        }}
                      >
                        <span>Base Network</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <span className="nft-bridge-label">To</span>
                  <div className="dropdown filters-dropdown">
                    <button
                      className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="filter-nav-title mb-0">
                          {destinationFilterTitle}
                        </h6>
                      </div>
                      <img src={dropdownIcon} alt="" />
                    </button>
                    <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setDestinationFilterTitle("Ethereum");
                          //   sortNfts("all");
                        }}
                      >
                        <span>Ethereum</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setDestinationFilterTitle("BNB Chain");
                          //   sortNfts("lto");
                        }}
                      >
                        <span>BNB Chain</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setDestinationFilterTitle("Avalanche");
                          //   sortNfts("lso");
                        }}
                      >
                        <span>Avalanche</span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setDestinationFilterTitle("Base Network");
                          //   sortNfts("lso");
                        }}
                      >
                        <span>Base Network</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <span className="w-100 new-stake-divider mt-3 mb-5"></span>
            <div className="row mx-0 gap-3 align-items-start">
              <div className="col-lg-6 col-12">
                <div className="d-flex flex-column gap-3">
                  <div
                    className="d-flex flex-column align-items-center gap-2 position-relative tooltipicon"
                    style={{ textDecoration: "none" }}
                    onClick={showNftSelectionPopup}
                  >
                    <div className="position-relative package-blur">
                      <div className="first-box-blur first-bigbox-blur d-none d-lg-flex align-items-end justify-content-center"></div>
                      <div className="second-box-blur d-none d-lg-flex second-bigbox-blur"></div>
                      <img
                        src={require("./assets/emptyCawsWod.svg").default}
                        alt=""
                        className="blur-img blur-img-big"
                      />
                    </div>
                  </div>
                  <button
                    className="btn pill-btn px-4 py-2 mt-4 mx-auto w-50"
                    onClick={showNftSelectionPopup}
                  >
                    Select NFT
                  </button>
                </div>
              </div>
              <div className="col-lg-5 col-12">
                <div className="d-flex flex-column gap-2">
                  <span className="bridge-guide-text">
                    Bridge Process Guide
                  </span>
                  <div>
                    <div>
                      <ul class="timeline-bridge mt-2" id="timeline">
                        <li class="li complete">
                          <div class="status">
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item">
                              <h4 className="listtext"> Connect Wallet </h4>
                              <span className="status-desc">
                                Connect your wallet in order to start migration
                                process. Your wallet chain will be associated as
                                default.
                              </span>
                            </div>
                          </div>
                        </li>
                        <li class={` li  `}>
                          <div class="status">
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item">
                              <h4 className="listtext">
                                {" "}
                                Select the bridge route{" "}
                              </h4>
                              <span className="status-desc">
                                Choose your preferred bridge route between
                                Ethereum, BNB Chain, Avalanche, and Base
                                Network.
                              </span>
                            </div>
                          </div>
                        </li>
                        <li class={` li  `}>
                          <div class="status">
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item">
                              <h4 className="listtext">
                                Select NFT and Transfer
                              </h4>
                              <span className="status-desc">
                                Select the NFT you wish to bridge, whether from
                                CAWS or WoD Genesis Land NFTs. After selection,
                                use the transfer button and approve the
                                transaction in your wallet.
                              </span>
                            </div>
                          </div>
                        </li>
                        <li class={` li `} style={{ height: 0 }}>
                          <div class="status p-0" style={{ height: 0 }}>
                            <div className="gap-1 d-flex flex-column gap-2 align-items-start timeline-wrapper-item2">
                              <h4
                                className="listtext"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Wait timer
                              </h4>
                              <span className="status-desc">
                                Wait for the timer, and the NFT will be
                                automatically added to your wallet.
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
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

export default NFTBridge;
