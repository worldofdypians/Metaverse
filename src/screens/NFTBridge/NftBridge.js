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
import Web3 from "web3";
import { ethers } from "ethers";

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
  const [finalNftType, setfinalNftType] = useState("");
  const [buttonText, setbuttonText] = useState("Approve");


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
            // sourceBridge()
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

  const getMessageState = (status) => {
    const messageExecutionState = {
      0: "UNTOUCHED",
      1: "IN_PROGRESS",
      2: "SUCCESS",
      3: "FAILURE",
    };

    if (status in messageExecutionState) {
      return messageExecutionState[status];
    }
    return "unknown";
  };

  const handleArguments = () => {
    // Check if the correct number of arguments are passed
    if (process.argv.length !== 5) {
      throw new Error("Wrong number of arguments");
    }

    // Extract the arguments from the command line

    const messageId = process.argv[4];

    // Return the arguments in an object
    return {
      messageId,
    };
  };

  const getStatus = async (filterTitle, destinationFilterTitle) => {
    // Parse command-line arguments
    const { messageId } = handleArguments();

    const allChainsArray = {
      Ethereum: {
        rpcUrl: window.config.infura_endpoint,
        srcSelector: window.config.destination_chain_selector_eth,
        address: "0xE561d5E02207fb5eB32cca20a699E0d8919a1476",
      },
      "BNB Chain": {
        rpcUrl: window.config.bsc_endpoint,
        srcSelector: window.config.destination_chain_selector_bnb,
        address: "0x536d7E53D0aDeB1F20E7c81fea45d02eC9dBD698",
      },
      Avalanche: {
        rpcUrl: window.config.avax_endpoint,
        srcSelector: window.config.destination_chain_selector_avax,
        address: "0x27F39D0af3303703750D4001fCc1844c6491563c",
      },
      "Base Network": {
        rpcUrl: window.config.base_endpoint,
        srcSelector: window.config.destination_chain_selector_base,
        address: "0x673AA85efd75080031d44fcA061575d1dA427A28",
      },
    };

    // Get the RPC URLs for both the source and destination chains
    const destinationRpcUrl = allChainsArray[destinationFilterTitle].rpcUrl;

    const sourceRpcUrl = allChainsArray[filterTitle].rpcUrl;

    // // Initialize providers for interacting with the blockchains
    const destinationProvider = new ethers.providers.JsonRpcProvider(
      destinationRpcUrl
    );
    const sourceProvider = new ethers.providers.JsonRpcProvider(sourceRpcUrl);

    // // Retrieve router configuration for the source and destination chains
    const sourceRouterAddress = allChainsArray[filterTitle].address;
    const sourceChainSelector = allChainsArray[filterTitle].srcSelector;
    const destinationRouterAddress =
      allChainsArray[destinationFilterTitle].address;
    const destinationChainSelector =
      allChainsArray[destinationFilterTitle].srcSelector;

    // // Instantiate the router contract on the source chain
    const sourceRouterContract = new ethers.Contract(
      sourceRouterAddress,
      window.CCIP_ROUTER_ABI,
      sourceProvider
    );

    // // Fetch the OnRamp contract address on the source chain
    const onRamp = await sourceRouterContract.getOnRamp(
      destinationChainSelector
    );
    const onRampContract = new ethers.Contract(
      onRamp,
      window.CCIP_ONRAMP_ABI,
      sourceProvider
    );

    // // Check if the messageId exists in the OnRamp contract
    const events = await onRampContract.queryFilter("CCIPSendRequested");
    let messageFound = false;
    for (const event of events) {
      if (
        event.args &&
        event.args.message &&
        event.args.message.messageId === messageId
      ) {
        messageFound = true;
        break;
      }
    }

    // // If the messageId doesn't exist, log an error and exit
    if (!messageFound) {
      console.error(`Message ${messageId} does not exist on this lane`);
      return;
    }

    // // Instantiate the router contract on the destination chain
    const destinationRouterContract = new ethers.Contract(
      destinationRouterAddress,
      window.CCIP_ROUTER_ABI,
      destinationProvider
    );

    // // Fetch the OffRamp contract addresses on the destination chain
    const offRamps = await destinationRouterContract.getOffRamps();

    // // Iterate through OffRamps to find the one linked to the source chain and check message status
    for (const offRamp of offRamps) {
      if (offRamp.sourceChainSelector.toString() === sourceChainSelector) {
        const offRampContract = new ethers.Contract(
          offRamp.offRamp,
          window.CCIP_ROUTER_ABI,
          destinationProvider
        );
        const events = await offRampContract.queryFilter(
          "ExecutionStateChanged"
        );

        // Check if an event with the specific messageId exists and log its status
        for (let event of events) {
          if (event.args && event.args.messageId === messageId) {
            const state = event.args.state;
            const status = getMessageState(state);
            console.log(`Status of message ${messageId} is ${status}`);
            return;
          }
        }
      }
    }
    // If no event found, the message has not yet been processed on the destination chain
    console.log(
      `Message ${messageId} is not processed yet on destination chain`
    );
  };

  const handleTransferNft = async () => {
    if (destinationFilterTitle === "Select") {
      window.alertify.error("Please choose destination chain!");
      return;
    } else if (destinationFilterTitle !== "Select") {
      if (filterTitle === "Ethereum") {
        if (destinationFilterTitle === "BNB Chain") {
          if (finalNftType === "land") {
            const web3 = new Web3(window.ethereum);
            const sourceBridge_address = window.config.ccip_eth_wod_address;
            const destinationBridge_address =
              window.config.ccip_bnb_wod_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_bnb;
            // const landContract = new web3.eth.Contract(
            //   window.WOD_ABI,
            //   window.config.nft_land_address
            // );

            // await landContract.methods
            //   .approve(sourceBridge_address, selectNftId)
            //   .then((data) => {
            //     console.log("success");
            //   });

            const contract = new web3.eth.Contract(
              window.CCIP_ABI,
              sourceBridge_address
            );
            console.log(
              "eth to bsc",
              destinationChainSelector,
              destinationBridge_address,
              selectNftId
            );
            await contract.methods
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                1,
                selectNftId
              )
              .send({ from: coinbase })
              .then((data) => {
                getStatus(filterTitle, destinationFilterTitle);
                console.log(data);
              })
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
              });
          } else if (finalNftType === "caws") {
            const sourceBridge_address = window.config.ccip_eth_caws_address;
            const destinationBridge_address =
              window.config.ccip_bnb_caws_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_bnb;
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
              window.CCIP_ABI,
              sourceBridge_address
            );

            await contract.methods
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                1,
                selectNftId
              )
              .send({ from: coinbase })
              .then((data) => {
                getStatus(filterTitle, destinationFilterTitle);
                console.log(data);
              })
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
              });
          }
        } else if (destinationFilterTitle === "Avalanche") {
          if (finalNftType === "land") {
            const sourceBridge_address = window.config.ccip_eth_wod_address;
            const destinationBridge_address =
              window.config.ccip_bnb_wod_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_bnb;
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
              window.CCIP_ABI,
              sourceBridge_address
            );

            await contract.methods
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                1,
                selectNftId
              )
              .send({ from: coinbase })
              .then((data) => {
                getStatus(filterTitle, destinationFilterTitle);
                console.log(data);
              })
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
              });
          } else if (finalNftType === "caws") {
            const sourceBridge_address = window.config.ccip_eth_caws_address;
            const destinationBridge_address =
              window.config.ccip_avax_caws_address;
            const destinationChainSelector =
              window.config.destination_chain_selector_avax;
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
              window.CCIP_ABI,
              sourceBridge_address
            );

            await contract.methods
              .BridgeNFT(
                destinationChainSelector,
                destinationBridge_address,
                1,
                selectNftId
              )
              .send({ from: coinbase })
              .then((data) => {
                getStatus(filterTitle, destinationFilterTitle);
                console.log(data);
              })
              .catch((e) => {
                window.alertify.error(e?.message);
                console.error(e);
              });
          }
        } else if (destinationFilterTitle === "Base Network") {
          if (finalNftType === "land") {
          } else if (finalNftType === "caws") {
          }
        }
      } else if (filterTitle === "BNB Chain") {
        if (finalNftType === "land") {
        } else if (finalNftType === "caws") {
        }
      } else if (filterTitle === "Avalanche") {
        if (finalNftType === "land") {
        } else if (finalNftType === "caws") {
        }
      } else if (filterTitle === "Base Network") {
        if (finalNftType === "land") {
        } else if (finalNftType === "caws") {
        }
      }
    }
  };

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
                            : finalNftType === "land"
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
                        {buttonText} NFT{" "}
                        {finalNftType === "caws" ? "CAWS" : "Genesis"} #
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
            setnftType("land");
          }}
          nftItem={nftType === "land" ? myNFTSLand : myNFTSCaws}
          onTabSelect={(value) => {
            setnftType(value);
          }}
          itemSelected={selectNftId}
          handleConfirmTransfer={(value, value2) => {
            setfinalNftType(value2);
            setSelectedNftId(value);
            setshowPopup(false);
          }}
          previousNftType={finalNftType}
        />
      )}
    </div>
  );
};

export default NFTBridge;
