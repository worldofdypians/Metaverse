import Home from "./screens/Home/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./fonts/Organetto.ttf";
import { Amplify } from "aws-amplify";
import { ApolloProvider } from "@apollo/client";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./screens/Account/src/aws-exports";
import "./screens/Account/src/App.css";

import AuthProvider, {
  useAuth,
} from "./screens/Account/src/Utils.js/Auth/AuthDetails.js";
import {
  Auth,
  ForgotPassword,
  ResetPassword,
} from "./screens/Account/src/Containers";
import PlayerCreation from "./screens/Account/src/Containers/PlayerCreation/PlayerCreation.js";
import client from "./screens/Account/src/apolloConfig.js";
import Dashboard from "./screens/Account/src/Containers/Dashboard/Dashboard.js";
import LandingScreen from "./screens/Account/src/Containers/LandingScreen/LandingScreen.js";
import Web3Provider from "./screens/Account/src/Utils.js/Web3/Web3Provider.js";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Caws from "./screens/Caws/Caws";
import NftMinting from "./screens/Caws/NftMinting/NftMinting";
import News from "./screens/News/News";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import CheckWhitelistModal from "./components/CheckWhitelistModal/CheckWhitelistModal";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./screens/TermsConditions/TermsConditions";
import Explorer from "./screens/Explorer/Explorer";
import Land from "./screens/Land/Land";
import LandPopup from "./components/LandPopup/LandPopup";
import Roadmap from "./screens/Roadmap/Roadmap";
import scrollToTop from "./assets/scrollToTop.svg";
import ScrollTop from "./components/ScrollTop";
import JoinBeta from "./screens/JoinBeta/JoinBeta";
import JoinBetaModal from "./components/JoinBetaModal/JoinBetaModal";
import PartnerForm from "./screens/PartnerForm/PartnerForm";
import NFTEvent from "./screens/NFTEvent/NFTEvent";
import WalletModal from "./components/WalletModal/WalletModal";
import TimePiece from "./screens/Timepiece/Timepiece";
import axios from "axios";
import Unsubscribe from "./screens/Unsubscribe/Unsubscribe";
import Marketplace from "./screens/Marketplace/Marketplace";
import getListedNFTS from "./actions/Marketplace";
import Nft from "./screens/nft/index";
import CawsNFT from "./screens/Marketplace/MarketNFTs/CawsNFT";
import WoDNFT from "./screens/Marketplace/MarketNFTs/WoDNFT";
import TimepieceNFT from "./screens/Marketplace/MarketNFTs/TimepieceNFT";
import MarketStake from "./screens/Marketplace/MarketStake";
import MarketEvents from "./screens/Marketplace/MarketEvents";
import SingleNft from "./screens/Marketplace/MarketNFTs/SingleNft";

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletModalDownload, setShowWalletModalDownload] = useState(false);
  const [showWalletModalRegister, setShowWalletModalRegister] = useState(false);
  const [betaModal, setBetaModal] = useState(false);
  const [donwloadSelected, setdownloadSelected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [coinbase, setCoinbase] = useState();
  const [chainId, setChainId] = useState();
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [showForms2, setShowForms2] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myCAWNFTs, setMyCAWNFTs] = useState([]);
  const [cawsToUse, setcawsToUse] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [mystakes, setMystakes] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [listedNFTS, setListedNFTS] = useState([]);
  const [myCAWstakes, setCAWMystakes] = useState([]);
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);
  const [myCAWSNFTsCreated, setMyCAWSNFTsCreated] = useState([]);
  const [myCAWSNFTsTotalStaked, setMyCAWSNFTsTotalStaked] = useState([]);
  const [walletModal, setwalletModal] = useState(false);
  const [mintloading, setmintloading] = useState("initial");
  const [mintStatus, setmintStatus] = useState("");
  const [textColor, settextColor] = useState("#fff");
  const [finalCaws, setFinalCaws] = useState([]);
  const [limit, setLimit] = useState(0);
  const [allCawsForTimepieceMint, setAllCawsForTimepieceMint] = useState([]);
  const [timepieceMetadata, settimepieceMetadata] = useState([]);
  const [username, setUsername] = useState("");
  const [totalTimepieceCreated, setTotalTimepieceCreated] = useState(0);
  const [fireAppcontent, setFireAppContent] = useState(false);
  const [activeUser, setactiveUser] = useState(false);
  const [listedNFTSCount, setListedNFTSCount] = useState(0);
  const [latest20RecentListedNFTS, setLatest20RecentListedNFTS] = useState([]);
  const [totalBoughtNFTS, setTotalBoughtNFTS] = useState([]);
  const [totalBoughtNFTSCount, setTotalBoughtNFTSCount] = useState(0);
  const [totalBoughtNFTSinETH, setTotalBoughtNFTSinETH] = useState(0);
  const [totalBoughtNFTSinDYP, setTotalBoughtNFTSinDYP] = useState(0);
  const [latest20BoughtNFTS, setLatest20BoughtNFTS] = useState([]);
  const [
    top20BoughtByPriceAndPriceTypeETHNFTS,
    settop20BoughtByPriceAndPriceTypeETHNFTS,
  ] = useState([]);
  const [
    top20BoughtByPriceAndPriceTypeDYPNFTS,
    settop20BoughtByPriceAndPriceTypeDYPNFTS,
  ] = useState([]);
  const [cawsNFTS, setCawsNFTS] = useState([]);
  const [timepiecesNFTS, setTimepiecesNFTS] = useState([]);
  const [wodNFTS, setWodNFTS] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);
  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);

  const handleSwitchChain = async () => {
    const { ethereum } = window;
    const ETHPARAMS = {
      chainId: "0x1", // A 0x-prefixed hexadecimal string
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io"],
    };

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log(switchError, "switch");
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [ETHPARAMS],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
      // handle other "switch" errors
    }
  };

  const filter = async (filter, value) => {
    console.log("filtering", filter, value);

    if (value === "") {
      setListedNFTS([]);

      await getListedNFTS(0).then((NFTS) => setListedNFTS(NFTS));
    } else if (value === "0") {
      setListedNFTS([]);

      await getListedNFTS(0, "", filter, "ETH").then((NFTS) =>
        setListedNFTS(NFTS)
      );
    } else {
      setListedNFTS([]);

      await getListedNFTS(0, "", filter, "DYP").then((NFTS) =>
        setListedNFTS(NFTS)
      );
    }
  };

  const sort = async (sort) => {
    console.log("sorting", sort);

    if (sort === "") {
      setListedNFTS([]);

      await getListedNFTS(0).then((NFTS) => setListedNFTS(NFTS));
    } else {
      setListedNFTS([]);

      await getListedNFTS(0, sort).then((NFTS) => setListedNFTS(NFTS));
    }
  };

  const fetchAvatar = async (coinbase) => {
    const response = await fetch(
      `https://api-image.dyp.finance/api/v1/avatar/${coinbase}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.avatar) {
          setAvatar(data.avatar);
        } else {
          setAvatar(null);
        }
      })
      .catch(console.error);

    return response;
  };

  const checkConnection = async () => {
    await window.getCoinbase().then((data) => {
      setCoinbase(data);

      fetchAvatar(data);
      axios
        .get(`https://api-image.dyp.finance/api/v1/username/${data}`)
        .then((res) => {
          if (res.data?.username) {
            setUsername(res.data?.username);
          } else {
            setUsername("");
          }
        });
    });
  };

  const handleRegister = () => {
    setShowWalletModal(true);
  };

  const handleBetaRegister = () => {
    setBetaModal(true);
  };

  const handleDownload = () => {
    setdownloadSelected(true);
    setShowWalletModalDownload(true);
  };

  const handleSignUp = () => {
    if (activeUser === true) {
      setFireAppContent(true);
    } else {
      setShowWalletModalRegister(true);
    }
  };

  const handleConnection = async () => {
    try {
      localStorage.setItem("logout", "false");
      await window.connectWallet().then((data) => {
        setIsConnected(data);
      });
      await window.getCoinbase().then((data) => {
        setCoinbase(data);
      });
      setShowForms(true);
    } catch (e) {
      setShowWalletModal(false);
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }

    return isConnected;
  };

  const checkNetworkId = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch(console.error);
    } else {
      setChainId(1);
    }
  };

  const getEthBalance = async () => {
    const ethereum = window.ethereum;
    if (isConnected === true) {
      if (coinbase) {
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [coinbase, "latest"],
        });

        // if (balance) {
        if (chainId === 1) {
          const stringBalance =
            window.infuraWeb3.utils.hexToNumberString(balance);
          const amount = window.infuraWeb3.utils.fromWei(
            stringBalance,
            "ether"
          );

          setCurrencyAmount(Number(amount));
        }
        // }
      }
    }
  };

  const handleConnectWallet = async () => {
    try {
      await window.connectWallet().then((data) => {
        setIsConnected(data);
      });
      checkConnection();

      await window.getCoinbase().then((data) => {
        setCoinbase(data);
      });
      setShowForms2(true);
      setwalletModal(false);
    } catch (e) {
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }
    return isConnected;
  };

  const myNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);
    let nfts = myNft.map((nft) => window.getLandNft(nft));
    nfts = await Promise.all(nfts);
    setMyNFTsCreated(nfts);

    nfts.reverse();
    setMyNFTs(nfts);
  };

  const myCAWNft = async () => {
    let myNft = await window.myNftListContract(coinbase);
    let nfts = myNft.map((nft) => window.getNft(nft));
    nfts = await Promise.all(nfts);
    setMyCAWSNFTsCreated(nfts);

    nfts.reverse();
    setMyCAWNFTs(nfts);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
  };

  const getStakesCAWIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractNFT("NFTSTAKING");
    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();
    let stakes = myStakes.map((stake) => window.getLandNft(stake));
    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakes(stakes);
  };

  const myCAWStakes = async () => {
    let myStakes = await getStakesCAWIds();
    let stakes = myStakes.map((stake) => window.getNft(stake));

    stakes = await Promise.all(stakes);
    setMyCAWSNFTsTotalStaked(stakes);
    stakes.reverse();
    setCAWMystakes(stakes);
  };

  const getStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const allCawsStakes = await window.wod_caws
      .depositsOf(address)
      .then((result) => {
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++)
            stakenft_cawsWod.push(parseInt(result[i]));
          return stakenft_cawsWod;
        }
      });

    return allCawsStakes;
  };

  const getmyCawsWodStakes = async () => {
    let myStakes = await getStakesIdsCawsWod();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);
      stakes.reverse();
      setMyCawsWodStakes(stakes);
    } else setMyCawsWodStakes([]);
  };

  const checkCawsToUse = async () => {
    const testArray = [];
    const cawsArray = [...myCAWNFTs, ...myCAWstakes, ...myCawsWodStakesAll];
    const nft_contract = await window.getContractCawsTimepieceNFT(
      "CAWS_TIMEPIECE"
    );

    if (cawsArray.length > 0) {
      for (let i = 0; i < cawsArray.length; i++) {
        const cawsId = parseInt(
          cawsArray[i].name.slice(6, cawsArray[i].name.length)
        );

        const result = await nft_contract.methods.cawsUsed(cawsId).call();

        if (result === false) {
          testArray.push(cawsId);
        }
      }

      setcawsToUse(testArray);
      setAllCawsForTimepieceMint(testArray);
    } else if (cawsArray.length === 0) {
      setcawsToUse([]);
      setAllCawsForTimepieceMint([]);
    }
  };

  const calculateCaws = (data) => {
    if (data.numberOfTokens === cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse);
    } else if (
      data.numberOfTokens >= cawsToUse.length &&
      cawsToUse.length > 0
    ) {
      setLimit(cawsToUse.length);
      setFinalCaws(cawsToUse);
    } else if (cawsToUse.length === 0) {
      setLimit(0);
      setFinalCaws([]);
    } else if (data.numberOfTokens <= cawsToUse.length) {
      setLimit(data.numberOfTokens);
      setFinalCaws(cawsToUse.slice(0, data.numberOfTokens));
    }
  };

  const getTimepieceNftMinted = async () => {
    const result = await window.caws_timepiece.calculateTimepieceBalance(
      coinbase
    );
    setTotalTimepieceCreated(result);
    let metadataArray = [];
    if (result && result > 0) {
      for (let index = 0; index < result; index++) {
        const tokenId =
          +(await window.caws_timepiece.getCawsTimepieceTokenByIndex(
            coinbase,
            index
          ));

        const tokenMetaDataURI =
          await window.caws_timepiece.getCawsTimepieceURI(tokenId);

        const dataURI = await axios.get(tokenMetaDataURI);
        metadataArray.push(dataURI.data);
      }
      settimepieceMetadata(metadataArray);
    } else {
      settimepieceMetadata(metadataArray);
      setTotalTimepieceCreated(0);
    }
  };

  const handleTimepieceMint = async (data) => {
    if (isConnected) {
      try {
        //Check Whitelist
        let whitelist = 1;

        if (parseInt(whitelist) === 1) {
          setmintloading("mint");
          setmintStatus("Minting in progress...");
          settextColor("rgb(123, 216, 176)");
          // console.log(data,finalCaws, totalCawsDiscount);
          let tokenId = await window.caws_timepiece
            .claimTimepiece(finalCaws)
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              settextColor("rgb(123, 216, 176)");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
              checkCawsToUse();
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              settextColor("#d87b7b");

              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });

          if (tokenId) {
            let getNftData = await window.getNft(tokenId);
            setMyNFTsCreated(getNftData);
          }
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    } else {
      try {
        handleConnectWallet();
      } catch (e) {
        window.alertify.error("No web3 detected! Please Install MetaMask!");
      }
    }
  };

  const getBoughtNFTS = async () => {
    let boughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/marketplace-dypius/v0.0.1";

    const itemBoughtQuery = `
        {
            itemBoughts {
            nftAddress
            tokenId
            payment_priceType
            price
            buyer
            blockNumber
            blockTimestamp
        }
        }
        `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("boughtItems", boughtItems);

    return boughtItems;
  };

  const getLatest20BoughtNFTS = async () => {
    let boughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/marketplace-dypius/v0.0.1";

    const itemBoughtQuery = `
        {
            itemBoughts(first: 20, orderBy: blockTimestamp, orderDirection: desc) {
            nftAddress
            tokenId
            payment_priceType
            price
            buyer
            blockNumber
            blockTimestamp
        }
        }
        `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("boughtItems", boughtItems);

    return boughtItems;
  };

  const getTop20BoughtByPriceAndPriceTypeNFTS = async (type) => {
    let boughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/marketplace-dypius/v0.0.1";

    const itemBoughtQuery = `
      {
          itemBoughts(first: 20, orderBy: price, orderDirection: desc, where: {payment_priceType: ${type}}) {
          nftAddress
          tokenId
          payment_priceType
          price
          buyer
          blockNumber
          blockTimestamp
      }
      }
      `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("boughtItems", boughtItems);

    return boughtItems;
  };

  Amplify.configure(awsExports);

  function UnAuthenticatedContent() {
    setFireAppContent(false);

    return (
      <React.Fragment>
        <Navigate to="/auth" />
      </React.Fragment>
    );
  }

  const AppContent = () => {
    const { isLoading, isAuthenticated, playerId } = useAuth();

    useEffect(() => {
      if (!isLoading || !isAuthenticated || !playerId) {
        setFireAppContent(false);
      }
    }, [isLoading, isAuthenticated, playerId]);

    if (isLoading) {
      return <LandingScreen />;
    }

    if (isAuthenticated) {
      if (!playerId) {
        return (
          <React.Fragment>
            <Navigate to="/player" />
          </React.Fragment>
        );
      }

      return (
        <React.Fragment>
          <Navigate to="/account" />
        </React.Fragment>
      );
    }

    return <UnAuthenticatedContent />;
  };

  const { ethereum } = window;

  if (ethereum) {
    ethereum.on("chainChanged", checkNetworkId);
    ethereum.on("accountsChanged", handleConnectWallet);
  }

  // const fetchAllMyNfts = async () => {
  //   if (isConnected && coinbase) {
  //     const cawsNew = await getMyNFTSCaws(
  //       coinbase,
  //       window.config.nft_caws_address
  //     ).catch((e) => {
  //       console.error(e);
  //     });

  //     const cawsOld = await getMyNFTSCaws(
  //       coinbase,
  //       window.config.nft_cawsold_address
  //     ).catch((e) => {
  //       console.error(e);
  //     });

  //     let mytotalCaws = [...cawsOld, ...cawsNew];
  //     setMyNFTSCaws(mytotalCaws);
  //    getMyNFTSTimepiece(
  //       coinbase,
  //       window.config.nft_timepiece_address
  //     ).then((NFTS) => {
  //       setMyNFTSTimepiece(NFTS);
  //       console.log(NFTS, "timepiece");
  //     }).catch((e) => {
  //       console.error(e);
  //     });

  //     const land_nft = await getMyNFTSLAND(
  //       coinbase,
  //       window.config.nft_land_address
  //     ).then((NFTS) => {
  //       setMyNFTSLand(NFTS);
  //       console.log(NFTS, "land");
  //     }).catch((e) => {
  //       console.error(e);
  //     });
  //   }
  // };

  const getMyNFTS = async (coinbase, type) => {
    return await window.getMyNFTs(coinbase, type);
  };

  const fetchAllMyNfts = async () => {
    if (isConnected && coinbase) {
      getMyNFTS(coinbase, "caws").then((NFTS) => setMyNFTSCaws(NFTS));

      getMyNFTS(coinbase, "timepiece").then((NFTS) => setMyNFTSTimepiece(NFTS));

      getMyNFTS(coinbase, "land").then((NFTS) => setMyNFTSLand(NFTS));
    }
  };

  useEffect(() => {
    checkNetworkId();
    getEthBalance();
    fetchAllMyNfts();
  }, [isConnected, coinbase, currencyAmount, chainId]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      myCAWStakes();
      myStakes();
      getmyCawsWodStakes();
      myCAWNft();
      myNft();
    }
  }, [isConnected, chainId, currencyAmount, coinbase]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      checkCawsToUse();
      getTimepieceNftMinted();
    }
  }, [
    myCAWNFTs.length,
    myCAWstakes.length,
    myCawsWodStakesAll.length,
    allCawsForTimepieceMint.length,
    isConnected,
    chainId,
    coinbase,
  ]);

  const handleShowWalletModal = () => {
    setwalletModal(true);
  };

  const getallNfts = async () => {
    const cawsNew = await getListedNFTS(
      0,
      "",
      "nftAddress",
      window.config.nft_caws_address
    ).catch((e) => {
      console.error(e);
    });
    
    const cawsOld = await getListedNFTS(
      0,
      "",
      "nftAddress",
      window.config.nft_cawsold_address
    ).catch((e) => {
      console.error(e);
    });

    if (cawsOld.length === 0 && cawsNew.length === 0) {
      setCawsNFTS([]);
    }
    if (cawsOld.length !== 0 && cawsNew.length === 0) {
      let totalCaws = [...cawsOld];
      setCawsNFTS(totalCaws);
    }

    if (cawsOld.length === 0 && cawsNew.length !== 0) {
      let totalCaws = [...cawsNew];
      setCawsNFTS(totalCaws);
    }

    if (cawsOld.length !== 0 && cawsNew.length !== 0) {
      let totalCaws = [...cawsOld, ...cawsNew];
      setCawsNFTS(totalCaws);
    }

    getListedNFTS(
      0,
      "",
      "nftAddress",
      window.config.nft_timepiece_address
    ).then((NFTS) => {
      setTimepiecesNFTS(NFTS);
    });

    getListedNFTS(0, "", "nftAddress", window.config.nft_land_address).then(
      (NFTS) => setWodNFTS(NFTS)
    );

    getListedNFTS(0).then((NFTS) => {
      setListedNFTS(NFTS);
      setListedNFTSCount(NFTS.length);
    });

    getListedNFTS(0, "", "recentListedNFTS").then((NFTS) =>
      setLatest20RecentListedNFTS(NFTS)
    );

    getBoughtNFTS().then((NFTS) => {
      setTotalBoughtNFTS(NFTS);
      setTotalBoughtNFTSCount(NFTS.length);

      let totalBoughtNFTSinETH = 0;

      let totalBoughtNFTSinDYP = 0;

      for (let i = 0; i < NFTS.length; i++) {
        if (NFTS[i].payment_priceType === 0) {
          totalBoughtNFTSinETH += parseFloat(NFTS[i].price);
        } else {
          totalBoughtNFTSinETH += parseFloat(NFTS[i].price);
        }
      }

      setTotalBoughtNFTSinETH(totalBoughtNFTSinETH);

      setTotalBoughtNFTSinDYP(totalBoughtNFTSinDYP);
    });

    getLatest20BoughtNFTS().then((NFTS) => setLatest20BoughtNFTS(NFTS));

    getTop20BoughtByPriceAndPriceTypeNFTS(0).then((NFTS) =>
      settop20BoughtByPriceAndPriceTypeETHNFTS(NFTS)
    );
    getTop20BoughtByPriceAndPriceTypeNFTS(1).then((NFTS) =>
      settop20BoughtByPriceAndPriceTypeDYPNFTS(NFTS)
    );
  };

  useEffect(() => {
    getallNfts();
  }, []);


  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Web3Provider>
            <div className="container-fluid p-0 main-wrapper position-relative">
              <Header
                handleSignUp={handleShowWalletModal}
                coinbase={coinbase}
                avatar={avatar}
                handleRedirect={() => {
                  setFireAppContent(true);
                }}
              />
              <MobileNavbar handleSignUp={handleSignUp} />
              <Routes>
                <Route path="/news/:newsId?/:titleId?" element={<News />} />
                <Route
                  path="marketplace/nft/:nftId"
                  element={
                    <SingleNft
                      coinbase={coinbase}
                      showWalletConnect={() => {
                        setwalletModal(true);
                      }}
                      isConnected={isConnected}
                      chainId={chainId}
                      handleSwitchChain={handleSwitchChain}
                    />
                  }
                />

                <Route
                  exact
                  path="/"
                  element={
                    <Home
                      handleRegister={handleRegister}
                      handleDownload={handleDownload}
                    />
                  }
                />
                <Route exact path="/caws" element={<Caws />} />
                <Route exact path="/roadmap" element={<Roadmap />} />
                <Route exact path="/explorer" element={<Explorer />} />
                <Route exact path="/stake" element={<NftMinting />} />
                <Route exact path="/contact-us" element={<PartnerForm />} />
                <Route
                  exact
                  path="/unsubscribe/:email"
                  element={<Unsubscribe />}
                />
                <Route
                  exact
                  path="/caws-timepiece"
                  element={
                    <TimePiece
                      coinbase={coinbase}
                      showWalletConnect={() => {
                        setwalletModal(true);
                      }}
                      cawsArray={allCawsForTimepieceMint}
                      mintloading={mintloading}
                      isConnected={isConnected}
                      chainId={chainId}
                      handleMint={handleTimepieceMint}
                      mintStatus={mintStatus}
                      textColor={textColor}
                      calculateCaws={calculateCaws}
                      totalCreated={totalTimepieceCreated}
                      timepieceMetadata={timepieceMetadata}
                    />
                  }
                />

                <Route
                  exact
                  path="/join-beta"
                  element={
                    <JoinBeta
                      coinbase={coinbase}
                      handleRegister={handleBetaRegister}
                    />
                  }
                />

                <Route exact path="/auth" element={<Auth />} />
                <Route
                  exact
                  path="/forgotPassword"
                  element={<ForgotPassword />}
                />
                <Route
                  exact
                  path="/ResetPassword"
                  element={<ResetPassword />}
                />
                <Route exact path="/player" element={<PlayerCreation />} />
                <Route
                  exact
                  path="/account"
                  element={
                    <Dashboard
                      MyNFTSCaws={MyNFTSCaws}
                      MyNFTSTimepiece={MyNFTSTimepiece}
                      MyNFTSLand={MyNFTSLand}
                    />
                  }
                />

                <Route
                  exact
                  path="/land"
                  element={
                    <Land
                      handleConnectWallet={handleConnectWallet}
                      coinbase={coinbase}
                      isConnected={isConnected}
                      handleRegister={handleRegister}
                      chainId={chainId}
                      showForms={showForms2}
                      balance={currencyAmount}
                    />
                  }
                />
                <Route
                  exact
                  path="/terms-conditions"
                  element={<TermsConditions />}
                />
                <Route
                  exact
                  path="/privacy-policy"
                  element={<PrivacyPolicy />}
                />
                <Route
                  exact
                  path="/marketplace"
                  element={
                    <Marketplace
                      coinbase={coinbase}
                      isConnected={isConnected}
                      handleConnect={handleShowWalletModal}
                      listedNFTS={listedNFTS}
                      totalListed={listedNFTSCount}
                      totalBoughtNFTSinETH={totalBoughtNFTSinETH / 1e18}
                      totalBoughtNFTSinDYP={totalBoughtNFTSinDYP / 1e18}
                      latest20RecentListedNFTS={latest20RecentListedNFTS}
                      totalBoughtNFTSCount={totalBoughtNFTSCount}
                      recentSales={latest20BoughtNFTS}
                      topSales={top20BoughtByPriceAndPriceTypeETHNFTS}
                      MyNFTSCaws={MyNFTSCaws}
                      MyNFTSTimepiece={MyNFTSTimepiece}
                      MyNFTSLand={MyNFTSLand}
                    />
                  }
                />
                <Route
                  exact
                  path="/marketplace/caws"
                  element={
                    <CawsNFT
                      isConnected={isConnected}
                      handleConnect={handleShowWalletModal}
                      listedNFTS={listedNFTS}
                      cawsNFTS={cawsNFTS}
                      coinbase={coinbase}
                    />
                  }
                />
                <Route
                  exact
                  path="/marketplace/wod"
                  element={
                    <WoDNFT
                      isConnected={isConnected}
                      handleConnect={handleShowWalletModal}
                      listedNFTS={listedNFTS}
                      wodNFTS={wodNFTS}
                      coinbase={coinbase}
                    />
                  }
                />
                <Route
                  exact
                  path="/marketplace/timepiece"
                  element={
                    <TimepieceNFT
                      isConnected={isConnected}
                      handleConnect={handleShowWalletModal}
                      listedNFTS={listedNFTS}
                      timepieceNFTS={timepiecesNFTS}
                      coinbase={coinbase}
                    />
                  }
                />
                <Route
                  exact
                  path="/marketplace/events"
                  element={
                    <MarketEvents
                      isConnected={isConnected}
                      handleConnect={handleShowWalletModal}
                      listedNFTS={listedNFTS}
                      account={coinbase}
                      chainId={chainId}
                    />
                  }
                />
                <Route
                  exact
                  path="/marketplace/stake"
                  element={
                    <MarketStake
                      isConnected={isConnected}
                      handleConnect={handleShowWalletModal}
                      listedNFTS={listedNFTS}
                    />
                  }
                />
              </Routes>
              {/* <img src={scrollToTop} alt="scroll top" onClick={() => window.scrollTo(0, 0)} className="scroll-to-top" /> */}
              <ScrollTop />
              <Footer />
            </div>
            {showWalletModal === true && (
              <RegisterModal
                open={showWalletModal}
                onClose={() => {
                  setShowWalletModal(false);
                }}
                handleConnect={handleConnection}
                coinbase={coinbase}
                showForms={showForms}
              />
            )}
            {betaModal === true && (
              <JoinBetaModal
                open={betaModal}
                onClose={() => {
                  setBetaModal(false);
                }}
                handleConnect={handleConnection}
                coinbase={coinbase}
                showForms={showForms}
              />
            )}

            {walletModal === true && (
              <WalletModal
                show={walletModal}
                handleClose={() => {
                  setwalletModal(false);
                }}
                handleConnection={() => {
                  handleConnectWallet();
                }}
              />
            )}

            {showWalletModalDownload === true && (
              <CheckWhitelistModal
                open={showWalletModalDownload}
                onClose={() => {
                  setdownloadSelected(false);
                  setShowWalletModalDownload(false);
                }}
                handleConnect={handleConnection}
                coinbase={coinbase}
                showForms={showForms}
                openRegister={handleRegister}
                donwloadSelected={donwloadSelected}
                cawsMinted={myCAWSNFTsCreated.length}
                cawsStaked={myCAWSNFTsTotalStaked.length}
                landMinted={myNFTs.length}
                landStaked={mystakes.length}
                handleActiveUser={(value) => {
                  setactiveUser(value);
                }}
              />
            )}

            {fireAppcontent === true && <AppContent />}

            {showWalletModalRegister === true && (
              <CheckWhitelistModal
                open={showWalletModalRegister}
                onClose={() => {
                  setShowWalletModalRegister(false);
                }}
                handleConnect={handleConnection}
                coinbase={coinbase}
                showForms={showForms}
                openRegister={handleRegister}
                donwloadSelected={donwloadSelected}
                cawsMinted={myCAWSNFTsCreated.length}
                cawsStaked={myCAWSNFTsTotalStaked.length}
                landMinted={myNFTs.length}
                landStaked={mystakes.length}
                handleRedirect={() => {
                  setFireAppContent(true);
                }}
                handleActiveUser={(value) => {
                  setactiveUser(value);
                }}
              />
            )}
          </Web3Provider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
