import React, { useState, useEffect } from "react";
import "./_nftbridge.scss";
import useWindowSize from "../../hooks/useWindowSize";
import MobileNav from "../../components/MobileNav/MobileNav";
import MarketSidebar from "../../components/MarketSidebar/MarketSidebar";
import dropdownIcon from "./assets/dropdownIcon.svg";
import NftPopup from "./NftPopup";
import avax from "./assets/avax.svg";
import bnb from "./assets/bnb.svg";
import eth from "./assets/eth.svg";
import base from "./assets/base.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";

const NFTBridge = ({
  coinbase,
  showWalletConnect,
  chainId,
  isConnected,
  myNFTSLand,
  myNFTSCaws,
  handleSwitchNetwork,
}) => {
  const windowSize = useWindowSize();
  const [filterTitle, setFilterTitle] = useState("");
  const [destinationFilterTitle, setDestinationFilterTitle] =
    useState("Select");
  const [destinationFilterArray, setDestinationFilterArray] = useState([]);
  const [selectNftId, setSelectedNftId] = useState(0);

  const [showPopup, setshowPopup] = useState(false);
  const [nftType, setnftType] = useState("land");

  const showNftSelectionPopup = () => {
    setshowPopup(true);
  };

  const handleEthPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x1")
          .then(() => {
            handleSwitchNetwork(1);
            updateDestinationFilterTitle("Ethereum");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };
  // console.log(avatar);
  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
            updateDestinationFilterTitle("BNB Chain");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleAvaxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0xa86a")
          .then(() => {
            handleSwitchNetwork(43114);
            updateDestinationFilterTitle("Avalanche");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBasePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x2105")
          .then(() => {
            handleSwitchNetwork(8453);
            updateDestinationFilterTitle("Base Network");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const updateDestinationFilterTitle = (filterText) => {
    const allChainArray = [
      { title: "Ethereum", logo: "eth" },
      { title: "BNB Chain", logo: "bnb" },
      { title: "Avalanche", logo: "avax" },
      { title: "Base Network", logo: "base" },
    ];
    if (filterText === "Ethereum") {
      setDestinationFilterArray(allChainArray.slice(1, 4));
      setDestinationFilterTitle("Select");
    } else {
      setDestinationFilterArray(allChainArray.slice(0, 1));
      setDestinationFilterTitle("Ethereum");
    }
  };

  const handleTransferNft = () => {};

  useEffect(() => {
    if (chainId === 1) {
      setFilterTitle("Ethereum");
      updateDestinationFilterTitle("Ethereum");
    } else if (chainId === 56) {
      setFilterTitle("BNB Chain");
      updateDestinationFilterTitle("BNB Chain");
    } else if (chainId === 43114) {
      setFilterTitle("Avalanche");
      updateDestinationFilterTitle("Avalanche");
    } else if (chainId === 8453) {
      setFilterTitle("Base Network");
      updateDestinationFilterTitle("Base Network");
    }
  }, [chainId]);

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
                        <h6 className="filter-nav-title mb-0 d-flex align-items-center gap-2">
                          <img
                            src={
                              filterTitle === "Ethereum"
                                ? eth
                                : filterTitle === "BNB Chain"
                                ? bnb
                                : filterTitle === "Avalanche"
                                ? avax
                                : base
                            }
                            alt=""
                          />
                          {filterTitle}
                        </h6>
                      </div>
                      <img src={dropdownIcon} alt="" />
                    </button>
                    <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Ethereum");
                          handleEthPool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={eth} alt="" />
                          Ethereum
                        </span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("BNB Chain");
                          handleBnbPool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={bnb} alt="" />
                          BNB Chain
                        </span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Avalanche");
                          handleAvaxPool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={avax} alt="" />
                          Avalanche
                        </span>
                      </li>
                      <li
                        className="nft-dropdown-item"
                        onClick={() => {
                          setFilterTitle("Base Network");
                          handleBasePool();
                        }}
                      >
                        <span className="d-flex align-items-center gap-2">
                          <img src={base} alt="" /> Base Network
                        </span>
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
                        <h6 className="filter-nav-title mb-0 d-flex align-items-center gap-2">
                          {destinationFilterTitle !== "Select" && (
                            <img
                              src={
                                destinationFilterTitle === "Ethereum"
                                  ? eth
                                  : destinationFilterTitle === "BNB Chain"
                                  ? bnb
                                  : destinationFilterTitle === "Avalanche"
                                  ? avax
                                  : base
                              }
                              alt=""
                            />
                          )}
                          {destinationFilterTitle}
                        </h6>
                      </div>
                      <img src={dropdownIcon} alt="" />
                    </button>
                    <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                      {destinationFilterArray &&
                        destinationFilterArray.length > 0 &&
                        destinationFilterArray.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="nft-dropdown-item"
                              onClick={() => {
                                setDestinationFilterTitle(item.title);
                                //   sortNfts("all");
                              }}
                            >
                              <span className="d-flex align-items-center gap-2">
                                <img
                                  src={require(`./assets/${item.logo}.svg`)}
                                  alt=""
                                />{" "}
                                {item.title}
                              </span>
                            </li>
                          );
                        })}
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
                        src={
                          selectNftId === 0
                            ? require("./assets/emptyCawsWod.svg").default
                            : nftType === "land"
                            ? `https://mint.worldofdypians.com/thumbs/${selectNftId}.png`
                            : `https://mint.dyp.finance/thumbs/${selectNftId}.png`
                        }
                        alt=""
                        className="blur-img blur-img-big"
                      />
                    </div>
                  </div>
                  <button
                    className={`btn ${
                      isConnected && selectNftId === 0
                        ? "pill-btn"
                        : isConnected && selectNftId !== 0
                        ? "conflux-btn"
                        : "pill-btn"
                    } px-4 py-2 mt-4 mx-auto w-50`}
                    onClick={() => {
                      !isConnected
                        ? showWalletConnect()
                        : selectNftId === 0
                        ? showNftSelectionPopup()
                        : handleTransferNft();
                    }}
                  >
                    {!isConnected ? (
                      "Connect wallet"
                    ) : selectNftId === 0 ? (
                      "Select NFT"
                    ) : (
                      <>
                        Transfer NFT {nftType === "caws" ? "CAWS" : "Genesis"} #
                        {selectNftId}{" "}
                      </>
                    )}
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
                        <li
                          class={`li ${isConnected && coinbase && "complete"} `}
                        >
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
                        <li
                          class={` li ${
                            destinationFilterTitle !== "Select" &&
                            isConnected &&
                            "complete"
                          } `}
                        >
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
                        <li
                          class={` li ${
                            destinationFilterTitle !== "Select" &&
                            isConnected &&
                            selectNftId !== 0 &&
                            "complete"
                          } `}
                        >
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
      {showPopup && (
        <NftPopup
          onModalClose={() => {
            setshowPopup(false);
          }}
          nftItem={nftType === "land" ? myNFTSLand : myNFTSCaws}
          onTabSelect={(value) => {
            setnftType(value);
          }}
          handleConfirmTransfer={(value) => {
            setSelectedNftId(value);
            setshowPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default NFTBridge;
