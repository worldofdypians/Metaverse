/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { dashboardBackground } from "../../Themes/Images";
import { GENERATE_NONCE, GET_PLAYER, VERIFY_WALLET } from "./Dashboard.schema";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import { getWalletTokens } from "../../web3/tmp";
import { Grid } from "@mui/material";
import { HashLoader } from "react-spinners";
import { Cart, LoginWrapper, ErrorAlert, Button } from "../../Components";
import LandCart from "../../Components/Cart/LandCart";
import EmptyCard from "../../Components/Cart/EmptyCard";
import classes from "./Dashboard.module.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import LeaderBoard from "../../Components/LeaderBoard/LeaderBoard";
import WalletBalance from "../../Components/WalletBalance/WalletBalance";
import useWindowSize from "../../Utils.js/hooks/useWindowSize";
import ChecklistModal from "../../Components/ChecklistModal/ChecklistModal";
import ChecklistLandNftModal from "../../Components/ChecklistModal/ChecklistLandNftModal";
import EmptyGenesisCard from "../../Components/EmptyGenesisCard/EmptyGenesisCard";
import Web3 from "web3";
import { ERC20_ABI } from "../../web3/abis";
import _, { chain } from "lodash";
import WalletModal from "../../../../../components/WalletModal/WalletModal";
import MobileNav from "../../../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../../../components/MarketSidebar/MarketSidebar";
import getListedNFTS from "../../../../../actions/Marketplace";
import axios from "axios";
import SyncModal from "../../../../Marketplace/MarketNFTs/SyncModal";
import NewWalletBalance from "../../Components/WalletBalance/NewWalletBalance";
import DailyBonusPopup from "../../Components/WalletBalance/DailyBonusPopup";
import rewardPopup from "../../Components/WalletBalance/assets/rewardspopup3.webp";
import OutsideClickHandler from "react-outside-click-handler";
import xMark from "../../Components/WalletBalance/newAssets/xMark.svg";
import MyRewardsPopup from "../../Components/WalletBalance/MyRewardsPopup";
import coinStackIcon from "../../Images/premium/coinStackIcon.svg";
import launchpadIndicator from "../../Images/premium/launchpadIndicator.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import MyBalance from "../../Components/WalletBalance/MyBalance";

function Dashboard({
  account,
  isConnected,
  chainId,
  coinbase,
  handleConnect,
  myCawsWodStakes,
  landStaked,
  ethTokenData,
  dypTokenData,
  onSigninClick,
  onLogoutClick,
  availableTime,
  success,
}) {
  const { email, logout } = useAuth();

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const [tokensState, setTokensState] = useState({});
  const [showChecklistModal, setshowChecklistModal] = useState(false);
  const [showChecklistLandNftModal, setshowChecklistLandNftModal] =
    useState(false);
  const firstSlider = useRef();
  const [loading, setLoading] = useState(true);

  const [dypBalance, setDypBalance] = useState();
  const [dypBalancebnb, setDypBalanceBnb] = useState();
  const [dypBalanceavax, setDypBalanceAvax] = useState();
  const [idypBalance, setiDypBalance] = useState();
  const [idypBalancebnb, setiDypBalanceBnb] = useState();
  const [idypBalanceavax, setiDypBalanceAvax] = useState();
  const [showNfts, setShowNfts] = useState(false);
  const [showWalletModal, setshowWalletModal] = useState(false);
  const [stakes, setStakes] = useState([]);
  const [landstakes, setLandStakes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [MyNFTSTimepiece, setMyNFTSTimepiece] = useState([]);
  const [MyNFTSLand, setMyNFTSLand] = useState([]);
  const [MyNFTSCaws, setMyNFTSCaws] = useState([]);
  const [MyNFTSCoingecko, setMyNFTSCoingecko] = useState([]);
  const [myGateNfts, setmyGateNfts] = useState([]);
  const [myConfluxNfts, setmyConfluxNfts] = useState([]);
  const [myBaseNfts, setmyBaseNfts] = useState([]);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [cfxPrice, setCfxPrice] = useState(0);

  const [dailyBonusPopup, setdailyBonusPopup] = useState(false);
  const [MyNFTSCawsOld, setMyNFTSCawsOld] = useState([]);
  const [myCawsWodStakesAll, setMyCawsWodStakes] = useState([]);
  const [myWodWodStakesAll, setmyWodWodStakesAll] = useState([]);

  const [listedNFTS, setListedNFTS] = useState([]);
  const [myBoughtNfts, setmyBoughtNfts] = useState([]);
  const [latest20BoughtNFTS, setLatest20BoughtNFTS] = useState([]);
  const [leaderboard, setLeaderboard] = useState(false);
  const [syncStatus, setsyncStatus] = useState("initial");
  const [myOffers, setmyOffers] = useState([]);
  const [allActiveOffers, setallOffers] = useState([]);
  const [showSyncModal, setshowSyncModal] = useState(false);
  const [isonlink, setIsOnLink] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [myRewardsPopup, setmyRewardsPopup] = useState(false);
  const [getPremiumPopup, setgetPremiumPopup] = useState(false);
  const [balancePopup, setBalancePopup] = useState(false);
  const [dropdownIcon, setdropdownIcon] = useState("");
  const [dropdownTitle, setdropdownTitle] = useState("");
  const [status, setstatus] = useState("");
  const [approveStatus, setapproveStatus] = useState("initial");
  const [isApproved, setisApproved] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [price, setprice] = useState(0);
  const [formattedPrice, setformattedPrice] = useState("0");
  const [loadspinner, setloadspinner] = useState(false);
  const [loadspinnerSub, setloadspinnerSub] = useState(false);
  const [selectedSubscriptionToken, setselectedSubscriptionToken] = useState(
    Object.keys(window.config.subscription_tokens)[0]
  );
  const [tokenDecimals, settokenDecimals] = useState(1);

  const dailyrewardpopup = document.querySelector("#dailyrewardpopup");
  const html = document.querySelector("html");
  const leaderboardId = document.querySelector("#leaderboard");
  const { BigNumber } = window;

  let wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  let wavaxAddress = "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7";
  let wbnbAddress = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";

  const override2 = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
    top: "30%",
    left: "40%",
    position: "absolute",
  };

  const onOpenNfts = () => {
    setShowNfts(!showNfts);
  };

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);
  //land only stakes
  const getStakesIdsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.LANDSTAKING_ABI,
      window.config.landnftstake_address
    );

    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getmyWodStakes = async () => {
    let myStakes = await getStakesIdsWod();
    if (myStakes && myStakes.length > 0) {
      let stakes = myStakes.map((stake) => window.getNft(stake));

      stakes = await Promise.all(stakes);

      stakes.reverse();
      setLandStakes(stakes);
    } else setLandStakes([]);
  };

  const getCawsStakesIdsCawsWod = async () => {
    const address = coinbase;

    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );

    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getWodStakesIdsCawsWod = async () => {
    const address = coinbase;
    let stakenft_cawsWod = [];
    const infura_web3 = window.infuraWeb3;
    let staking_contract = new infura_web3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address
    );

    let myStakes = await staking_contract.methods
      .depositsOfWoD(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft_cawsWod.push(parseInt(result[i]));
        return stakenft_cawsWod;
      });

    return myStakes;
  };

  const getmyCawsWodStakes = async () => {
    let myCawsStakes = await getCawsStakesIdsCawsWod();

    let myWodStakes = await getWodStakesIdsCawsWod();

    if (myCawsStakes && myCawsStakes.length > 0) {
      let stakes = myCawsStakes.map((stake) => window.getNft(stake));
      let landstakes = myWodStakes.map((stake) => window.getLandNft(stake));

      stakes = await Promise.all(stakes);
      landstakes = await Promise.all(landstakes);

      stakes.reverse();
      landstakes.reverse();

      setMyCawsWodStakes(stakes);
      setmyWodWodStakesAll(landstakes);
    } else {
      setMyCawsWodStakes([]);
      setmyWodWodStakesAll([]);
    }
  };

  async function connectWallet() {
    setIsOnLink(true);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum?.enable();
        console.log("Connected!");
        if (window.ethereum.isCoin98) {
          window.WALLET_TYPE = "coin98";
        }
        if (window.ethereum.isMetaMask) {
          window.WALLET_TYPE = "metamask";
        }
        let coinbase_address;
        await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((data) => {
            coinbase_address = data[0];
          });
        // window.coinbase_address = coinbase_address.pop();
        await generateNonce({
          variables: {
            publicAddress: coinbase_address,
          },
        }).then(() => {
          setshowWalletModal(false);
        });
        return true;
      } catch (e) {
        console.error(e);
        console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", e);
        throw new Error("User denied wallet connection!");
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("connected to old web3");
      // onConnect();
      return true;
    } else {
      throw new Error("No web3 detected!");
    }
  }

  const signWalletPublicAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(account);
      const signature = await signer.signMessage(
        `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
      );
      verifyWallet({
        variables: {
          publicAddress: account,
          signature: signature,
        },
      }).then(() => {
        setsyncStatus("success");
        setTimeout(() => {
          setshowSyncModal(false);
          setsyncStatus("initial");
        }, 1000);

        setTimeout(() => {
          if (isonlink) {
            window.location.reload();
          }
        }, 2000);
      });
    } catch (error) {
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
      }, 3000);

      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  const refreshSubscription = async (userAddr, email) => {
    let subscribedPlatformTokenAmountETH;
    let subscribedPlatformTokenAmountAvax;
    let subscribedPlatformTokenAmountBNB;

    const web3eth = window.infuraWeb3;
    const web3avax = window.avaxWeb3;
    const web3bnb = window.bscWeb3;

    const AvaxABI = window.SUBSCRIPTION_ABI;
    const EthABI = window.SUBSCRIPTIONETH_ABI;
    const BnbABI = window.SUBSCRIPTIONBNB_ABI;

    const ethsubscribeAddress = window.config.subscriptioneth_address;
    const avaxsubscribeAddress = window.config.subscription_address;
    const bnbsubscribeAddress = window.config.subscriptionbnb_address;

    const ethcontract = new web3eth.eth.Contract(EthABI, ethsubscribeAddress);
    const avaxcontract = new web3avax.eth.Contract(
      AvaxABI,
      avaxsubscribeAddress
    );

    const bnbcontract = new web3bnb.eth.Contract(BnbABI, bnbsubscribeAddress);

    if (userAddr && email) {
      subscribedPlatformTokenAmountETH = await ethcontract.methods
        .subscriptionPlatformTokenAmount(userAddr)
        .call();

      subscribedPlatformTokenAmountAvax = await avaxcontract.methods
        .subscriptionPlatformTokenAmount(userAddr)
        .call();

      subscribedPlatformTokenAmountBNB = await bnbcontract.methods
        .subscriptionPlatformTokenAmount(userAddr)
        .call();

      if (
        subscribedPlatformTokenAmountAvax === "0" &&
        subscribedPlatformTokenAmountETH === "0" &&
        subscribedPlatformTokenAmountBNB === "0"
      ) {
        setIsPremium(false);
      }
      if (
        subscribedPlatformTokenAmountAvax !== "0" ||
        subscribedPlatformTokenAmountETH !== "0" ||
        subscribedPlatformTokenAmountBNB !== "0"
      ) {
        setIsPremium(true);
      }
    } else {
      setIsPremium(false);
    }
  };

  const handleShowSyncModal = () => {
    setshowSyncModal(true);
  };

  const handleSync = async () => {
    setsyncStatus("loading");

    try {
      await generateNonce({
        variables: {
          publicAddress: account,
        },
      });
    } catch (error) {
      setsyncStatus("error");
      setTimeout(() => {
        setsyncStatus("initial");
        setshowSyncModal(false);
      }, 3000);
      console.log("🚀 ~ file: Dashboard.js:30 ~ getTokens ~ error", error);
    }
  };

  const getMyNFTS = async (coinbase, type) => {
    return await window.getMyNFTs(coinbase, type);
  };

  //todo
  const fetchAllMyNfts = async () => {
    getMyNFTS(coinbase, "caws").then((NFTS) => setMyNFTSCaws(NFTS));

    getMyNFTS(coinbase, "timepiece").then((NFTS) => setMyNFTSTimepiece(NFTS));

    getMyNFTS(coinbase, "land").then((NFTS) => setMyNFTSLand(NFTS));
    getMyNFTS(coinbase, "coingecko").then((NFTS) => setMyNFTSCoingecko(NFTS));
    getMyNFTS(coinbase, "gate").then((NFTS) => setmyGateNfts(NFTS));
    getMyNFTS(coinbase, "conflux").then((NFTS) => setmyConfluxNfts(NFTS));
    getMyNFTS(coinbase, "base").then((NFTS) => setmyBaseNfts(NFTS));
  };

  const getOtherNfts = async () => {
    let finalboughtItems1 = [];

    const listedNFTS = await getListedNFTS(0, "", "buyer", coinbase, "");
    listedNFTS &&
      listedNFTS.length > 0 &&
      listedNFTS.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems1.push(nft);
        }
      });
    setmyBoughtNfts(finalboughtItems1);
    setListedNFTS(finalboughtItems1);
  };

  const windowSize = useWindowSize();

  const getDypBalance = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    const web3bsc = new Web3("https://bsc-dataseed.binance.org/");

    const web3avax = new Web3("https://api.avax.network/ext/bc/C/rpc");

    if (account !== undefined) {
      const token_address = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
      const token_addressIDYP = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

      const contract1 = new web3eth.eth.Contract(ERC20_ABI, token_address);
      const contract2 = new web3bsc.eth.Contract(ERC20_ABI, token_address);
      const contract3 = new web3avax.eth.Contract(ERC20_ABI, token_address);

      const contract1_idyp = new web3eth.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract2_idyp = new web3bsc.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const contract3_idyp = new web3avax.eth.Contract(
        ERC20_ABI,
        token_addressIDYP
      );
      const bal1 = await contract1.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal2 = await contract2.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setDypBalanceBnb(bal2);

      const bal3 = await contract3.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setDypBalanceAvax(bal3);

      const bal1_idyp = await contract1_idyp.methods
        .balanceOf(account)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setiDypBalance(bal1_idyp);

      const bal2_idyp = await contract2_idyp.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3bsc.utils.fromWei(data, "ether");
        });
      setiDypBalanceBnb(bal2_idyp);

      const bal3_idyp = await contract3_idyp.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3avax.utils.fromWei(data, "ether");
        });
      setiDypBalanceAvax(bal3_idyp);
    } else {
      setDypBalance(0);
      setDypBalanceBnb(0);
      setDypBalanceAvax(0);
      setiDypBalance(0);
      setiDypBalanceBnb(0);
      setiDypBalanceAvax(0);
    }
  };

  async function fetchUserFavorites(userId) {
    if (userId !== undefined && userId !== null) {
      try {
        const response = await fetch(
          `https://api.worldofdypians.com/user-favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching user favorites");
        }
        const data = await response.json();
        // console.log(data.favorites);

        setFavorites(data.favorites);
        return data.favorites;
      } catch (error) {
        console.error("Error fetching user favorites:", error);
        throw error;
      }
    } else {
      setFavorites([]);
    }
  }

  const getLatest20BoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

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

    // console.log("boughtItems", boughtItems);

    boughtItems &&
      boughtItems.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems.push(nft);
        }
      });
    return finalboughtItems;
  };

  const getMyOffers = async () => {
    //setmyOffers

    let allOffers = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/worldofdypians-marketplace/version/latest";

    const offersQuery = `
    {
      offerMades(first: 100) {
        id
        buyer
        nftAddress
        tokenId
      }
    }
    `;

    await axios
      .post(URL, { query: offersQuery })
      .then(async (result) => {
        allOffers = await result.data.data.offerMades;
        setallOffers(result.data.data.offerMades);
      })
      .catch((error) => {
        console.log(error);
      });

    if (allOffers.length > 0) {
      let finalArray = [];
      await Promise.all(
        allOffers.map(async (nft) => {
          const result = await window
            .getAllOffers(nft.nftAddress, nft.tokenId)
            .catch((e) => {
              console.error(e);
            });

          if (result && result.length > 0) {
            if (coinbase) {
              result.map((item) => {
                if (
                  item.offer.buyer?.toLowerCase() === coinbase.toLowerCase()
                ) {
                  return finalArray.push({
                    offer: item.offer,
                    index: item.index,
                    nftAddress: nft.nftAddress,
                    tokenId: nft.tokenId,
                    type:
                      nft.nftAddress === window.config.nft_caws_address
                        ? "caws"
                        : nft.nftAddress === window.config.nft_timepiece_address
                        ? "timepiece"
                        : "land",
                  });
                }
              });
            }
          }
        })
      );
      let uniqueOffers = finalArray.filter(
        (v, i, a) =>
          a.findIndex(
            (v2) => v2.tokenId === v.tokenId && v2.nftAddress === v.nftAddress
          ) === i
      );

      setmyOffers(uniqueOffers);
    }
  };

  const handleSubscriptionTokenChange = async (tokenAddress) => {
    const token = tokenAddress;
    let tokenDecimals =
      chainId === 1
        ? window.config.subscriptioneth_tokens[token]?.decimals
        : chainId === 56
        ? window.config.subscriptionbnb_tokens[token]?.decimals
        : window.config.subscription_tokens[token]?.decimals;
    setprice("");
    setformattedPrice("");
    setTokenBalance("");
    setselectedSubscriptionToken(token);

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? await window.getEstimatedTokenSubscriptionAmountBNB(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);
    tokenprice = new BigNumber(tokenprice).times(1.1).toFixed(0);

    let formattedTokenPrice = getFormattedNumber(
      tokenprice / 10 ** tokenDecimals,
      tokenDecimals
    );
    let tokenBalance2 = await window.getTokenHolderBalance(token, coinbase);
    setprice(tokenprice);
    setformattedPrice(formattedTokenPrice);
    setTokenBalance(tokenBalance2);
  };

  const handleApprove = async (e) => {
    // e.preventDefault();

    let tokenContract = await window.getContract({
      address: selectedSubscriptionToken,
      ABI: window.ERC20_ABI,
    });
    setloadspinner(true);

    await tokenContract.methods
      .approve(selectedSubscriptionToken, price)
      .send()
      .then(() => {
        setloadspinner(false);
        setisApproved(true);
        setapproveStatus("deposit");
      })
      .catch((e) => {
        setstatus(e?.message);
        setloadspinner(false);
        setapproveStatus("fail");

        setTimeout(() => {
          setstatus("");
          setloadspinner(false);
          setapproveStatus("initial");
        }, 5000);
      });
  };

  const handleCheckIfAlreadyApproved = async (token) => {
    const web3eth = new Web3(window.config.infura_endpoint);
    const bscWeb3 = new Web3(window.config.bsc_endpoint);
    const avaxWeb3 = new Web3(window.config.avax_endpoint);

    const ethsubscribeAddress = window.config.subscriptioneth_address;
    const avaxsubscribeAddress = window.config.subscription_address;
    const bnbsubscribeAddress = window.config.subscriptionbnb_address;

    const subscribeToken = token;
    const subscribeTokencontract = new web3eth.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractbnb = new bscWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractavax = new avaxWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    if (coinbase) {
      if (chainId === 1) {
        const result = await subscribeTokencontract.methods
          .allowance(coinbase, ethsubscribeAddress)
          .call()
          .then();

        if (result != 0) {
          setloadspinner(false);
          setisApproved(true);
        } else if (result == 0) {
          setloadspinner(false);
          setisApproved(false);
        }
      }
      if (chainId === 56) {
        const result = await subscribeTokencontractbnb.methods
          .allowance(coinbase, bnbsubscribeAddress)
          .call()
          .then();
        if (result != 0) {
          setloadspinner(false);
          setisApproved(true);
        } else if (result == 0) {
          setloadspinner(false);
          setisApproved(false);
        }
      } else {
        const result = await subscribeTokencontractavax.methods
          .allowance(coinbase, avaxsubscribeAddress)
          .call()
          .then();

        if (result != 0) {
          setloadspinner(false);
          setisApproved(true);
        } else if (result == 0) {
          setloadspinner(false);
          setisApproved(false);
        }
      }
    }
  };

  const handleSubscribe = async (e) => {
    // e.preventDefault();
    let subscriptionContract = await window.getContract({
      key:
        chainId === 1
          ? "SUBSCRIPTIONETH"
          : chainId === 56
          ? "SUBSCRIPTIONBNB"
          : "SUBSCRIPTION",
    });

    setloadspinnerSub(true);

    await subscriptionContract.methods
      .subscribe(selectedSubscriptionToken, price)
      .send({ from: await window.getCoinbase() })
      .then(() => {
        setloadspinnerSub(false);
        setapproveStatus("success");

        // this.props.onSubscribe();
        // window.location.href = "https://app.dypius.com/account";
      })
      .catch((e) => {
        setloadspinnerSub(false);
        setloadspinner(false);
        setapproveStatus("fail");
        setstatus(e?.message);

        setTimeout(() => {
          setloadspinnerSub(false);
          setloadspinner(false);
          setapproveStatus("initial");
          setstatus("");
        }, 5000);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
      });
  };

  const fetchCFXPrice = async () => {
    await axios
      .get(
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=conflux-token&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
      )
      .then((obj) => {
        if (obj.data["conflux-token"] && obj.data["conflux-token"] !== NaN) {
          setCfxPrice(obj.data["conflux-token"].usd);
        }
      });
  };


  useEffect(() => {
    if (chainId === 1) {
      setdropdownIcon("weth");
      setdropdownTitle("WETH");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
    } else if (chainId === 56) {
      setdropdownIcon("wbnb");
      setdropdownTitle("WBNB");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbnb_tokens)[0]
      );
      handleSubscriptionTokenChange(wbnbAddress);
    } else if (chainId === 43114) {
      setdropdownIcon("wavax");
      setdropdownTitle("WAVAX");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbnb_tokens)[0]
      );
      handleSubscriptionTokenChange(wavaxAddress);
    } else {
      setdropdownIcon("weth");
      setdropdownTitle("WETH");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
    }
  }, [chainId]);

  useEffect(() => {
    if (chainId === 1 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioneth_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 56 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionbnb_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 43114 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscription_tokens[selectedSubscriptionToken]?.decimals
      );
    }
  }, [chainId, selectedSubscriptionToken]);

  useEffect(() => {
    if (dataVerify?.verifyWallet) {
      refetchPlayer();
    }
  }, [dataVerify]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress &&
      email
    ) {
      refreshSubscription(data.getPlayer.wallet.publicAddress, email);
    }
  }, [data, email]);

  useEffect(() => {
    if (coinbase) {
      setsyncStatus("initial");
      fetchAllMyNfts();
      getmyCawsWodStakes();
      getmyWodStakes();
    }
  }, [email, data?.getPlayer?.wallet?.publicAddress, coinbase, chainId]);

  useEffect(() => {
    getOtherNfts();
    getDypBalance();
    fetchUserFavorites(coinbase);
  }, [account, email, data?.getPlayer?.wallet]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTokenDatabnb()
    fetchCFXPrice()
  }, []);

  useEffect(() => {
    if (
      (dailyBonusPopup === true && dailyrewardpopup) ||
      leaderboard === true
    ) {
      html.classList.add("hidescroll");
      // dailyrewardpopup.style.pointerEvents = "auto";
      // leaderboardId.style.pointerEvents = "auto";
    } else {
      html.classList.remove("hidescroll");
    }
  }, [dailyBonusPopup, dailyrewardpopup, leaderboard]);

  useEffect(() => {
    // if (coinbase) {
    getLatest20BoughtNFTS().then((NFTS) => setLatest20BoughtNFTS(NFTS));
    getMyOffers();
    // }
  }, [coinbase, isConnected]);

  const logoutItem = localStorage.getItem("logout");

  // useEffect(() => {
  //   if (window.ethereum && !window.coin98) {
  //     if (window.ethereum.isConnected() === true) {
  //       localStorage.setItem("logout", "false");
  //     } else {
  //       localStorage.setItem("logout", "true");
  //     }
  //   }
  // }, [coinbase, chainId]);

  const onOpenLeaderboard = () => {
    setLeaderboard(true);
    console.log("true");
  };

  useEffect(() => {
    if (success === true) {
      setshowWalletModal(false);
    }
  }, [success]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px", overflow: "hidden" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}
      <div className="container-nft d-flex align-items-start px-3 px-lg-5 position-relative">
        <div className="container-lg mx-0">
          <LoginWrapper
            style={{
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              justifyContent: "normal",
              alignItems: "normal",
              flexDirection: "column",
              gap: "30px",
              height: "auto",
              minHeight: "100%",
            }}
            img={dashboardBackground}
          >
            {loadingPlayer ? (
              <>
                <HashLoader
                  color={"#554fd8"}
                  loading={loading}
                  cssOverride={override2}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </>
            ) : (
              <div className="container-fluid px-0 px-lg-3">
                <div className={""}>
                  <div
                    className={
                      "d-flex flex-column gap-4 justify-content-center align-items-center"
                    }
                    style={{
                      marginTop: 80,
                    }}
                  >
                    <div
                      className={`col-12 d-flex flex-column gap-3  mt-5 mt-lg-0 ${classes.containerPlayer}`}
                    >
                      <ProfileCard
                        email={email}
                        username={data?.getPlayer?.displayName}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        userId={data?.getPlayer?.playerId}
                        balance={dypBalancebnb}
                        availableTime={availableTime}
                        isVerified={data?.getPlayer?.wallet}
                        coinbase={account}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        onLinkWallet={connectWallet}
                        onSigninClick={onSigninClick}
                        onLogoutClick={logout}
                        onSyncClick={handleShowSyncModal}
                        syncStatus={syncStatus}
                        isPremium={isPremium}
                        isConnected={isConnected}
                        onOpenLeaderboard={() => {
                          setLeaderboard(true);
                        }}
                        onPremiumClick={() => {
                          setgetPremiumPopup(true);
                        }}
                      />

                      <NewWalletBalance
                        onDailyRewardsPopupOpen={() => {
                          setdailyBonusPopup(true);
                        }}
                        ethTokenData={ethTokenData}
                        dypTokenData={dypTokenData}
                        onOpenNfts={onOpenNfts}
                        listedNFTS={listedNFTS}
                        myBoughtNfts={myBoughtNfts}
                        address={data?.getPlayer?.wallet?.publicAddress}
                        coinbase={account}
                        isVerified={data?.getPlayer?.wallet}
                        favoritesArray={favorites}
                        dypBalance={dypBalance}
                        dypBalancebnb={dypBalancebnb}
                        dypBalanceavax={dypBalanceavax}
                        idypBalance={idypBalance}
                        idypBalancebnb={idypBalancebnb}
                        idypBalanceavax={idypBalanceavax}
                        showNfts={showNfts}
                        handleShowWalletPopup={() => {
                          setshowWalletModal(true);
                        }}
                        email={email}
                        userId={data?.getPlayer?.playerId}
                        username={data?.getPlayer?.displayName}
                        myCawsCollected={MyNFTSCaws}
                        myCawsOldCollected={MyNFTSCawsOld}
                        myLandCollected={MyNFTSLand}
                        myTimepieceCollected={MyNFTSTimepiece}
                        landStaked={landstakes}
                        myCawsWodStakes={myCawsWodStakesAll}
                        myWodWodStakes={myWodWodStakesAll}
                        myNFTSCoingecko={MyNFTSCoingecko}
                        myGateNfts={myGateNfts}
                        myConfluxNfts={myConfluxNfts}
                        myBaseNfts={myBaseNfts}
                        latestBoughtNFTS={latest20BoughtNFTS}
                        myOffers={myOffers}
                        allActiveOffers={allActiveOffers}
                        isPremium={isPremium}
                        onRewardsClick={() => {
                          setmyRewardsPopup(true);
                        }}
                        onBalanceClick={() => {
                          setBalancePopup(true);
                        }}
                      />
                    </div>
                    <WalletBalance
                      ethTokenData={ethTokenData}
                      dypTokenData={dypTokenData}
                      onOpenNfts={onOpenNfts}
                      listedNFTS={listedNFTS}
                      myBoughtNfts={myBoughtNfts}
                      address={data?.getPlayer?.wallet?.publicAddress}
                      coinbase={account}
                      isVerified={data?.getPlayer?.wallet}
                      favoritesArray={favorites}
                      dypBalance={dypBalance}
                      dypBalancebnb={dypBalancebnb}
                      dypBalanceavax={dypBalanceavax}
                      idypBalance={idypBalance}
                      idypBalancebnb={idypBalancebnb}
                      idypBalanceavax={idypBalanceavax}
                      showNfts={showNfts}
                      handleShowWalletPopup={() => {
                        setshowWalletModal(true);
                      }}
                      email={email}
                      userId={data?.getPlayer?.playerId}
                      username={data?.getPlayer?.displayName}
                      myCawsCollected={MyNFTSCaws}
                      myCawsOldCollected={MyNFTSCawsOld}
                      myLandCollected={MyNFTSLand}
                      myTimepieceCollected={MyNFTSTimepiece}
                      landStaked={landstakes}
                      myCawsWodStakes={myCawsWodStakesAll}
                      myWodWodStakes={myWodWodStakesAll}
                      myNFTSCoingecko={MyNFTSCoingecko}
                      myGateNfts={myGateNfts}
                      myConfluxNfts={myConfluxNfts}
                      latestBoughtNFTS={latest20BoughtNFTS}
                      myOffers={myOffers}
                      allActiveOffers={allActiveOffers}
                    />
                    {/* <div className="d-flex flex-column align-items-center w-100">
                <div className="d-flex flex-column gap-2 w-100 mb-4">
                  <h2
                    className={`font-organetto d-flex flex-column flex-xl-row gap-1 align-items-center m-0 bundleTitle`}
                  >
                    Premium
                    <mark className={`font-organetto bundletag`}>events</mark>
                  </h2>
              
                </div>
                <div className="d-flex align-items-start align-items-lg-center gap-2 gap-lg-2 w-100 justify-content-start">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dyp-package ${
                        selectedPackage === "dyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dyp")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Golden Pass
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package ${classes.idypicon} ${
                        selectedPackage === "idyp" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("idyp")}
                    ></div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Puzzle Madness
                    </h6>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package dragon-package ${
                        selectedPackage === "dragon" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("dragon")}
                    >
                      <img
                        src={dragonIcon}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Dragon Ruins
                    </h6>
                  </div>

                  <div className="d-flex flex-column align-items-center gap-2">
                    <div
                      className={`premium-package criticalhit-package ${
                        selectedPackage === "criticalHit" && "selected-premium"
                      } p-3 gap-3 d-flex flex-column align-items-center justify-content-center`}
                      onClick={() => setSelectedPackage("criticalHit")}
                    >
                      <img
                        src={dypius}
                        width={40}
                        height={40}
                        alt="premium package icon"
                        className="premium-package-icon"
                      />
                    </div>
                    <h6
                      className="bundleTitle mb-0 fw-normal text-center"
                      style={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      Critical Hit
                    </h6>
                  </div>
                </div>
                <BundleCard
                  coinbase={account}
                  wallet={data?.getPlayer?.wallet?.publicAddress}
                  chainId={chainId}
                  username={data?.getPlayer?.displayName}
                  email={email}
                  getDypBalance={getDypBalance}
                  getiDypBalance={getDypBalance}
                  packageData={
                    selectedPackage === "dragon"
                      ? dragonData
                      : selectedPackage === "dyp"
                      ? dypPackageData
                      : selectedPackage === "criticalHit"
                      ? criticalHitPackageData
                      : iDypPackageData
                  }
                  handleSetAvailableTime={(value) => {
                    setAvailableTime(value);
                  }}
                  availableTime={availableTime}
                />
              </div> */}

                    {leaderboard && (
                      <OutsideClickHandler
                        onOutsideClick={() => setLeaderboard(false)}
                      >
                        <div
                          className="popup-wrapper popup-active p-3"
                          id="leaderboard"
                          style={{ width: "40%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`font-organetto mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              <mark className={`font-organetto bundletag`}>
                                WOD
                              </mark>{" "}
                              Leaderboard
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setLeaderboard(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <LeaderBoard
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            dypBalancebnb={dypBalancebnb}
                            address={data?.getPlayer?.wallet?.publicAddress}
                            availableTime={availableTime}
                            email={email}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}

                    {myRewardsPopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => setmyRewardsPopup(false)}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="leaderboard"
                          style={{
                            width: "40%",
                            pointerEvents: "auto",
                            overflowX: "auto",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              My Rewards
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setmyRewardsPopup(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <MyRewardsPopup
                            username={data?.getPlayer?.displayName}
                            userId={data?.getPlayer?.playerId}
                            address={data?.getPlayer?.wallet?.publicAddress}
                            email={email}
                            bnbPrice={bnbPrice}
                            cfxPrice={cfxPrice}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}

                    {getPremiumPopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setgetPremiumPopup(false);
                        }}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="subscribe"
                          style={{ width: "30%", pointerEvents: "auto" }}
                        >
                          <div className="subscribe-container p-2 position-relative">
                            <div
                              className=""
                              style={{ background: "#8E97CD" }}
                            ></div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center gap-2">
                                <img src={coinStackIcon} alt="coin stack" />
                                <h6 className="free-plan-title">
                                  Dypian Plan Subscription
                                </h6>
                              </div>
                              <img
                                src={xMark}
                                onClick={() => setgetPremiumPopup(false)}
                                alt=""
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            <div className="d-flex mt-4 align-items-end justify-content-between flex-column-reverse flex-lg-row w-100">
                              <div className="d-flex flex-column gap-3 subscribe-input-container">
                                <span className="token-amount-placeholder">
                                  Select Subscription Token
                                </span>

                                <div class="dropdown position relative">
                                  <button
                                    class={`btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle w-100`}
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <div
                                      className="d-flex align-items-center gap-2"
                                      style={{ color: "#fff" }}
                                    >
                                      <img
                                        src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                        alt=""
                                      />
                                      {dropdownTitle}
                                    </div>
                                    <img src={launchpadIndicator} alt="" />
                                  </button>
                                  <ul class="dropdown-menu w-100">
                                    {Object.keys(
                                      chainId === 1
                                        ? window.config.subscriptioneth_tokens
                                        : chainId === 56
                                        ? window.config.subscriptionbnb_tokens
                                        : window.config.subscription_tokens
                                    ).map((t, i) => (
                                      <li
                                        key={i}
                                        className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                        onClick={() => {
                                          window.cached_contracts =
                                            Object.create(null);
                                          setTimeout(() => {
                                            setdropdownIcon(
                                              chainId === 1
                                                ? window.config
                                                    .subscriptioneth_tokens[t]
                                                    ?.symbol
                                                : chainId === 56
                                                ? window.config
                                                    .subscriptionbnb_tokens[t]
                                                    ?.symbol
                                                : window.config
                                                    .subscription_tokens[t]
                                                    ?.symbol
                                            );
                                            setdropdownTitle(
                                              chainId === 1
                                                ? window.config
                                                    .subscriptioneth_tokens[t]
                                                    ?.symbol
                                                : chainId === 56
                                                ? window.config
                                                    .subscriptionbnb_tokens[t]
                                                    ?.symbol
                                                : window.config
                                                    .subscription_tokens[t]
                                                    ?.symbol
                                            );

                                            // console.log(t);
                                            handleSubscriptionTokenChange(t);
                                            handleCheckIfAlreadyApproved(t);
                                          }, 200);
                                        }}
                                      >
                                        <img
                                          src={
                                            chainId === 1
                                              ? require(`../../Images/premium/tokens/${window.config.subscriptioneth_tokens[
                                                  t
                                                ]?.symbol.toLowerCase()}Icon.svg`)
                                              : chainId === 56
                                              ? require(`../../Images/premium/tokens/${window.config.subscriptionbnb_tokens[
                                                  t
                                                ]?.symbol.toLowerCase()}Icon.svg`)
                                              : require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                                  t
                                                ]?.symbol.toLowerCase()}Icon.svg`)
                                          }
                                          alt=""
                                        />
                                        {chainId === 1
                                          ? window.config
                                              .subscriptioneth_tokens[t]?.symbol
                                          : chainId === 56
                                          ? window.config
                                              .subscriptionbnb_tokens[t]?.symbol
                                          : window.config.subscription_tokens[t]
                                              ?.symbol}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="d-flex flex-column align-items-end justify-content-lg-end">
                                <span className="token-balance-placeholder">
                                  Token Balance
                                </span>
                                <h6 className="account-token-amount">
                                  {" "}
                                  {getFormattedNumber(
                                    tokenBalance / 10 ** tokenDecimals,
                                    6
                                  )}
                                </h6>
                              </div>
                            </div>
                            <div
                              className="subscription-token-wrapper  p-2 d-flex align-items-center justify-content-between  mt-3"
                              style={{ width: "100%" }}
                            >
                              <span className="token-amount-placeholder">
                                Subscription price:
                              </span>
                              <div className="d-flex align-items-center gap-2">
                                <span className="usdt-text">
                                  {formattedPrice.slice(0, 9)}
                                </span>

                                <img
                                  src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                                  height={24}
                                  width={24}
                                  alt="usdt"
                                />
                              </div>
                            </div>
                            <hr className="form-divider my-4" />
                            <div
                              className={`d-flex align-items-center ${
                                !coinbase
                                  ? "justify-content-between"
                                  : "justify-content-end"
                              }`}
                            >
                              {!coinbase && (
                                <span style={{ color: "rgb(227, 6 ,19)" }}>
                                  Please connect your wallet first
                                </span>
                              )}
                              <div className="d-flex flex-column gap-2 justify-content-end align-items-center">
                                <button
                                  className={
                                    "btn success-btn px-4 align-self-end"
                                  }
                                  disabled={
                                    approveStatus === "fail" || !coinbase
                                      ? true
                                      : false
                                  }
                                  style={{
                                    background:
                                      approveStatus === "fail"
                                        ? "linear-gradient(90.74deg, #f8845b 0%, #f0603a 100%)"
                                        : "linear-gradient(90.74deg, #75CAC2 0%, #57B6AB 100%)",
                                  }}
                                  onClick={(e) =>
                                    isApproved === false
                                      ? handleApprove(e)
                                      : handleSubscribe()
                                  }
                                >
                                  {isApproved === true &&
                                  loadspinner === false &&
                                  loadspinnerSub === false &&
                                  (approveStatus === "deposit" ||
                                    approveStatus === "initial") ? (
                                    "Subscribe"
                                  ) : isApproved === false &&
                                    loadspinner === false &&
                                    approveStatus === "initial" &&
                                    loadspinnerSub === false ? (
                                    "Approve"
                                  ) : loadspinner === false &&
                                    approveStatus === "fail" &&
                                    loadspinnerSub === false ? (
                                    "Failed"
                                  ) : (
                                    <div
                                      className="spinner-border "
                                      role="status"
                                      style={{
                                        height: "1.5rem",
                                        width: "1.5rem",
                                      }}
                                    ></div>
                                  )}
                                </button>
                                <span style={{ color: "#E30613" }}>
                                  {status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </OutsideClickHandler>
                    )}

                    {balancePopup && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setBalancePopup(false);
                        }}
                      >
                        <div
                          className="popup-wrapper popup-active p-4"
                          id="subscribe"
                          style={{ width: "40%", pointerEvents: "auto" }}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <h2
                              className={`mb-0 d-flex flex-column flex-lg-row gap-1 align-items-start align-items-lg-center  leaderboardTitle gap-2`}
                            >
                              My Balance
                            </h2>
                            <img
                              src={xMark}
                              onClick={() => setBalancePopup(false)}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <MyBalance
                            dypBalance={dypBalance}
                            dypBalancebnb={dypBalancebnb}
                            dypBalanceavax={dypBalanceavax}
                            idypBalance={idypBalance}
                            idypBalancebnb={idypBalancebnb}
                            idypBalanceavax={idypBalanceavax}
                          />
                        </div>
                      </OutsideClickHandler>
                    )}
                  </div>
                  {/* <div className="d-flex flex-column flex-xxl-row gap-3 justify-content-between">
              <div className={"home-main-wrapper nftBigWrapper"}>
                <h2
                  className={`font-organetto d-flex gap-1 align-items-center m-0 bundleTitle`}
                >
                  Caws
                  <mark className={`font-organetto bundletag`}>Nft</mark>
                </h2>
                <div className="nftcontainer d-flex m-0 flex-column flex-xxl-row flex-lg-row flex-md-row align-items-center position-relative">
                  <div className="ethwrapper position-absolute d-none d-lg-flex">
                    <span className="ethText">
                      <img src={ethereum} alt="" className="ethlogo" /> Ethereum
                    </span>
                  </div>
                  <div className="d-flex gap-5 align-items-end flex-column flex-xxl-row flex-lg-row flex-md-row contentwrapper">
                    {renderItems()}
                    {tokensState?.items?.length > 0 ? (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <button
                          className={"btn filled-btn px-5"}
                          onClick={() => {
                            setshowChecklistModal(true);
                          }}
                        >
                          View all
                        </button>
                      </div>
                    ) : (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <a
                          href="https://opensea.io/collection/catsandwatchessocietycaws"
                          target="_blank"
                          rel="noreferrer"
                          className={"btn filled-btn px-5"}
                        >
                          Buy CAWS
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={
                  "home-main-wrapper d-flex justify-content-end nftBigWrapper"
                }
              >
                <h2
                  className={`font-organetto -flex flex-column flex-xxl-row flex-lg-row flex-md-row flex-sm-row gap-1 align-items-center m-0 bundleTitle`}
                >
                  Genesis Land
                  <mark className={`font-organetto bundletag`}>Nft</mark>
                </h2>
                <div className="nftcontainer d-flex m-0 flex-column flex-xxl-row flex-lg-row flex-md-row align-items-center position-relative">
                  <div className="ethwrapper position-absolute d-none d-lg-flex">
                    <span className="ethText">
                      <img src={ethereum} alt="" className="ethlogo" /> Ethereum
                    </span>
                  </div>
                  <div className="d-flex gap-5 align-items-end flex-column flex-xxl-row flex-lg-row flex-md-row contentwrapper">
                    {renderGenesisItems()}

               
                    {tokensState?.landItems?.length > 0 ? (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <button
                          className={"btn filled-btn px-5"}
                          onClick={() => {
                            setshowChecklistLandNftModal(true);
                          }}
                        >
                          View all
                        </button>
                      </div>
                    ) : (
                      <div
                        className={"linear-border nftGridItem"}
                        style={{ width: "fit-content" }}
                      >
                        <a
                          href="https://opensea.io/collection/worldofdypians"
                          target="_blank"
                          rel="noreferrer"
                          className={"btn filled-btn px-5"}
                        >
                          Buy WoD Land
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
                </div>
              </div>
            )}
            {dailyBonusPopup && (
              <OutsideClickHandler
                onOutsideClick={() => {
                  setdailyBonusPopup(false);
                }}
              >
                <div
                  className="package-popup-wrapper2"
                  id="dailyrewardpopup"
                  style={{ pointerEvents: "auto" }}
                >
                  <img src={rewardPopup} alt="" className="popup-linear2" />

                  <DailyBonusPopup
                    onclose={() => {
                      setdailyBonusPopup(false);
                    }}
                  />
                </div>
              </OutsideClickHandler>
            )}
            {showChecklistModal === true && (
              <ChecklistModal
                show={showChecklistModal}
                handleClose={() => {
                  setshowChecklistModal(false);
                }}
                cawsitem={tokensState?.items?.length > 0 && tokensState.items}
                stakes={stakes}
              />
            )}

            {showWalletModal === true && success === false && (
              <WalletModal
                show={showWalletModal}
                handleClose={() => {
                  setshowWalletModal(false);
                }}
                handleConnection={handleConnect}
              />
            )}

            {showSyncModal === true && (
              <SyncModal
                onCancel={() => {
                  setshowSyncModal(false);
                }}
                onclose={() => {
                  setshowSyncModal(false);
                }}
                open={showSyncModal}
                onConfirm={handleSync}
                syncStatus={syncStatus}
              />
            )}

            {showChecklistLandNftModal === true && (
              <ChecklistLandNftModal
                show={showChecklistLandNftModal}
                handleClose={() => {
                  setshowChecklistLandNftModal(false);
                }}
                cawsitem={
                  tokensState?.landItems?.length > 0 && tokensState.landItems
                }
                stakes={landstakes}
              />
            )}
            {/* <ErrorAlert error={connectedState?.error} /> */}
          </LoginWrapper>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
