import React, { useState, useEffect } from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import Web3 from "web3";
import axios from "axios";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import { ethers } from "ethers";
import "./_getpremium.scss";
import OutsideClickHandler from "react-outside-click-handler";
import ChainPopup from "../../../../../components/Header/ChainPopup";

const GetPremiumPopup = ({
  isEOA,
  coinbase,
  chainId,
  onClose,
  handleSwitchNetwork,
  onSuccessDeposit,
  binanceW3WProvider,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
  binanceWallet,
  authToken,
  isPremium,
  isConnected,
  walletClient,
  publicClient,
  network_matchain,
}) => {
  const chainDropdowns = [
    {
      name: "Ethereum",
      symbol: "eth",
      chainId: 1,
    },
    {
      name: "BNB Chain",
      symbol: "bnb",
      chainId: 56,
    },
    {
      name: "Avalanche",
      symbol: "wavax",
      chainId: 43114,
    },
    {
      name: "Conflux",
      symbol: "conflux",
      chainId: 1030,
    },
    {
      name: "Base",
      symbol: "base",
      chainId: 8453,
    },
    {
      name: "SKALE",
      symbol: "skale",
      chainId: 1482601649,
    },
    {
      name: "CORE",
      symbol: "core",
      chainId: 1116,
    },
    {
      name: "Viction",
      symbol: "viction",
      chainId: 88,
    },
    {
      name: "Manta",
      symbol: "manta",
      chainId: 169,
    },
    {
      name: "Taiko",
      symbol: "taiko",
      chainId: 167000,
    },
    {
      name: "Matchain",
      symbol: "matchain",
      chainId: 698,
    },
    {
      name: "SEI",
      symbol: "sei",
      chainId: 1329,
    },
    {
      name: "Vanar",
      symbol: "vanar",
      chainId: 2040,
    },
  ];

  const { BigNumber } = window;

  let wethAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  let wcfx = "0xfe97E85d13ABD9c1c33384E796F10B73905637cE";
  let wbase = "0x4200000000000000000000000000000000000006";
  let wbnbAddress = "0x55d398326f99059fF775485246999027B3197955";
  let wavaxAddress = "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7";
  let wskaleAddress = "0xCC205196288B7A26f6D43bBD68AaA98dde97276d";
  let wvictionAddress = "0x381B31409e4D220919B2cFF012ED94d70135A59e";
  let wvanarAddress = "0x97eec1c29f745dC7c267F90292AA663d997a601D";
  let wcoreAddress = "0x900101d06a7426441ae63e9ab3b9b0f63be145f1";
  let wmantaddress = "0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f";
  let wtaikoaddress = "0x2DEF195713CF4a606B49D07E520e22C17899a736";
  let wmataddress = "0xB6dc6C8b71e88642cEAD3be1025565A9eE74d1C6";
  let wseiAddress = "0xB75D0B03c06A926e488e2659DF1A861F860bD3d1";

  const allBenefits = [
    {
      title: "Exclusive access to the game",
      image: "https://cdn.worldofdypians.com/wod/exclusiveBg.webp",
    },
    {
      title: "Unlock All Daily Bonus Chests",
      image: "https://cdn.worldofdypians.com/wod/dailyChestsBg.webp",
    },
    {
      title: "Unlimited Treasure Hunts",
      image: "https://cdn.worldofdypians.com/wod/treasureHuntBg.webp",
    },
    {
      title: "Increased Rewards",
      image: "https://cdn.worldofdypians.com/wod/increasedRewardsBg.webp",
    },
    {
      title: "Earn Extra Daily Stars",
      image: "https://cdn.worldofdypians.com/wod/extraDailyStarsBg.webp",
    },
    {
      title: "Access to Private Events",
      image: "https://cdn.worldofdypians.com/wod/privateEventsBg.webp",
    },
    {
      title: "Priority Support",
      image: "https://cdn.worldofdypians.com/wod/prioritySupportBg.webp",
    },
  ];

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
  const [chainDropdown, setChainDropdown] = useState(chainDropdowns[0]);
  const [selectedSubscriptionToken, setselectedSubscriptionToken] = useState(
    Object.keys(window.config.subscription_tokens)[0]
  );
  const [tokenDecimals, settokenDecimals] = useState(1);
  const [showChainDropdown, setshowChainDropdown] = useState(false);

  const [discountPercentage, setdiscountPercentage] = useState(0);
  const [nftPremium_tokenId, setnftPremium_tokenId] = useState(0);
  const [nftPremium_total, setnftPremium_total] = useState(0);
  const [nftDiscountObject, setnftDiscountObject] = useState([]);

  const [discountPercentageViction, setdiscountPercentageViction] = useState(0);
  const [nftPremium_tokenIdViction, setnftPremium_tokenIdViction] = useState(0);
  const [nftPremium_totalViction, setnftPremium_totalViction] = useState(0);
  const [nftDiscountObjectViction, setnftDiscountObjectViction] = useState([]);

  const [nftPremium_tokenIdVanar, setnftPremium_tokenIdVanar] = useState(0);
  const [nftPremium_totalVanar, setnftPremium_totalVanar] = useState(0);
  const [nftDiscountObjectVanar, setnftDiscountObjectVanar] = useState([]);
  const [discountPercentageVanar, setdiscountPercentageVanar] = useState(0);

  const [discountPercentageTaiko, setdiscountPercentageTaiko] = useState(0);
  const [nftPremium_tokenIdTaiko, setnftPremium_tokenIdTaiko] = useState(0);
  const [nftPremium_totalTaiko, setnftPremium_totalTaiko] = useState(0);
  const [nftDiscountObjectTaiko, setnftDiscountObjectTaiko] = useState([]);

  const [discountPercentageMat, setdiscountPercentageMat] = useState(0);
  const [nftPremium_tokenIdMat, setnftPremium_tokenIdMat] = useState(0);
  const [nftPremium_totalMat, setnftPremium_totalMat] = useState(0);
  const [nftDiscountObjectMat, setnftDiscountObjectMat] = useState([]);
  const [chainState, setchainState] = useState("");

  const switchNetwork = async (hexChainId, chain) => {
    if (window.ethereum) {
      if (
        !window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        await handleSwitchNetworkhook(hexChainId)
          .then(() => {
            handleSwitchNetwork(chain);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (
        window.gatewallet &&
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        handleSwitchChainGateWallet(chain);
      } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
        network_matchain?.showChangeNetwork();
      } else if (binanceWallet && window.WALLET_TYPE === "binance") {
        handleSwitchChainBinanceWallet(chain);
      }
    } else if (!window.gatewallet && window.WALLET_TYPE === "matchId") {
      network_matchain?.showChangeNetwork();
    } else if (binanceWallet && window.WALLET_TYPE === "binance") {
      handleSwitchChainBinanceWallet(chain);
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const setActiveChain = () => {
    if (chainId) {
      if (chainId === 1) {
        setchainState("eth");
      } else if (chainId === 43114) {
        setchainState("avax");
      } else if (chainId === 8453) {
        setchainState("base");
      } else if (chainId === 56) {
        setchainState("bnb");
      } else if (chainId === 698) {
        setchainState("mat");
      } else if (chainId === 204) {
        setchainState("opbnb");
      } else if (chainId === 1030) {
        setchainState("conflux");
      } else if (chainId === 1482601649) {
        setchainState("skale");
      } else if (chainId === 1116) {
        setchainState("core");
      } else if (chainId === 88) {
        setchainState("viction");
      } else if (chainId === 13371) {
        setchainState("immutable");
      } else if (chainId === 169) {
        setchainState("manta");
      } else if (chainId === 167000) {
        setchainState("taiko");
      } else if (chainId === 1329) {
        setchainState("sei");
      } else if (chainId === 2040) {
        setchainState("vanar");
      } else {
        setchainState("");
      }
    }
  };

  const calculatePremiumDiscount = async (wallet) => {
    // if (chainId === 56) {
    const premiumSc = new window.bscWeb3.eth.Contract(
      window.SUBSCRIPTION_NEWBNB2_ABI,
      window.config.subscription_newbnb2_address
    );

    const premiumSc_viction = new window.victionWeb3.eth.Contract(
      window.SUBSCRIPTION_VICTION_ABI,
      window.config.subscription_viction_address
    );
    const premiumSc_vanar = new window.vanarWeb3.eth.Contract(
      window.SUBSCRIPTION_VANAR_ABI,
      window.config.subscription_vanar_address
    );

    const premiumSc_taiko = new window.taikoWeb3.eth.Contract(
      window.SUBSCRIPTION_TAIKO_ABI,
      window.config.subscription_taiko_address
    );

    const premiumSc_mat = new window.matWeb3.eth.Contract(
      window.SUBSCRIPTION_MAT_ABI,
      window.config.subscription_mat_address
    );

    const nftContract = new window.bscWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_ABI,
      window.config.nft_dypius_premium_address
    );

    const nftContract_viction = new window.victionWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
      window.config.nft_dypius_premium_viction_address
    );
    const nftContract_vanar = new window.vanarWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_MAT_ABI,
      window.config.nft_dypius_premium_vanar_address
    );

    const nftContract_taiko = new window.taikoWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
      window.config.nft_dypius_premium_taiko_address
    );

    const nftContract_mat = new window.matWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_MAT_ABI,
      window.config.nft_dypius_premium_mat_address
    );

    if (wallet) {
      const result = await nftContract.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const result_viction = await nftContract_viction.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const result_vanar = await nftContract_vanar.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const result_taiko = await nftContract_taiko.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const result_mat = await nftContract_mat.methods
        .balanceOf(wallet)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount = await premiumSc.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount_viction = await premiumSc_viction.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
      const discount_vanar = await premiumSc_vanar.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount_taiko = await premiumSc_taiko.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const discount_mat = await premiumSc_mat.methods
        .discountPercentageGlobal()
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });

      const nftObject = await premiumSc.methods
        .nftDiscounts(window.config.nft_dypius_premium_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const nftObject_viction = await premiumSc_viction.methods
        .nftDiscounts(window.config.nft_dypius_premium_viction_address)
        .call()
        .catch((e) => {
          console.error(e);
        });
      const nftObject_vanar = await premiumSc_vanar.methods
        .nftDiscounts(window.config.nft_dypius_premium_vanar_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const nftObject_taiko = await premiumSc_taiko.methods
        .nftDiscounts(window.config.nft_dypius_premium_taiko_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      const nftObject_mat = await premiumSc_mat.methods
        .nftDiscounts(window.config.nft_dypius_premium_mat_address)
        .call()
        .catch((e) => {
          console.error(e);
        });

      if (result && parseInt(result) > 0) {
        const tokenId = await nftContract.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject) {
          setnftDiscountObject(nftObject);
          if (discount) {
            setdiscountPercentage(
              Math.max(
                parseInt(discount),
                parseInt(nftObject.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenId(tokenId);
        setnftPremium_total(parseInt(result));
      } else if (result_viction && parseInt(result_viction) > 0) {
        const tokenId = await nftContract_viction.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject_viction) {
          setnftDiscountObjectViction(nftObject_viction);
          if (discount_viction) {
            setdiscountPercentageViction(
              Math.max(
                parseInt(discount_viction),
                parseInt(nftObject_viction.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenIdViction(tokenId);
        setnftPremium_totalViction(parseInt(result_viction));
      } else if (result_vanar && parseInt(result_vanar) > 0) {
        const tokenId = await nftContract_vanar.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject_vanar) {
          setnftDiscountObjectVanar(nftObject_vanar);
          if (discount_vanar) {
            setdiscountPercentageVanar(
              Math.max(
                parseInt(discount_vanar),
                parseInt(nftObject_vanar.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenIdVanar(tokenId);
        setnftPremium_totalVanar(parseInt(result_vanar));
      } else if (result_taiko && parseInt(result_taiko) > 0) {
        const tokenId = await nftContract_taiko.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject_taiko) {
          setnftDiscountObjectTaiko(nftObject_taiko);
          if (discount_taiko) {
            setdiscountPercentageTaiko(
              Math.max(
                parseInt(discount_taiko),
                parseInt(nftObject_taiko.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenIdTaiko(tokenId);
        setnftPremium_totalTaiko(parseInt(result_taiko));
      } else if (result_mat && parseInt(result_mat) > 0) {
        const tokenId = await nftContract_mat.methods
          .tokenOfOwnerByIndex(wallet, 0)
          .call()
          .catch((e) => {
            console.error(e);
            return 0;
          });

        if (nftObject_mat) {
          setnftDiscountObjectMat(nftObject_mat);
          if (discount_mat) {
            setdiscountPercentageMat(
              Math.max(
                parseInt(discount_mat),
                parseInt(nftObject_mat.discountPercentage)
              )
            );
          }
        }

        setnftPremium_tokenIdMat(tokenId);
        setnftPremium_totalMat(parseInt(result_mat));
      } else {
        setnftPremium_tokenId(0);
        setnftPremium_total(0);
        setnftPremium_tokenIdViction(0);
        setnftPremium_totalViction(0);
        setnftPremium_tokenIdVanar(0);
        setnftPremium_totalVanar(0);
        setnftPremium_tokenIdTaiko(0);
        setnftPremium_totalTaiko(0);
        setnftPremium_tokenIdMat(0);
        setnftPremium_totalMat(0);

        if (discount) {
          setdiscountPercentage(parseInt(discount));
        } else if (discount_viction) {
          setdiscountPercentageViction(parseInt(discount_viction));
        } else if (discount_vanar) {
          setdiscountPercentageVanar(parseInt(discount_vanar));
        } else if (discount_taiko) {
          setdiscountPercentageTaiko(parseInt(discount_taiko));
        } else if (discount_mat) {
          setdiscountPercentageMat(parseInt(discount_mat));
        }
      }
    } else {
      setnftPremium_tokenIdMat(0);
      setnftPremium_totalMat(0);
      setnftPremium_tokenId(0);
      setnftPremium_total(0);
      setnftPremium_tokenIdViction(0);
      setnftPremium_totalViction(0);
      setnftPremium_tokenIdVanar(0);
      setnftPremium_totalVanar(0);
      setnftPremium_tokenIdTaiko(0);
      setnftPremium_totalTaiko(0);
    }
    // } else setdiscountPercentage(0);
  };

  const handleUpdatePremiumUser = async (wallet) => {
    await axios
      .get(`https://api.worldofdypians.com/api/sub/${wallet}`)
      .catch((e) => {
        console.error(e);
      });
  };

  const handleSubscriptionTokenChange = async (tokenAddress) => {
    const token = tokenAddress;
    if (
      token.toLowerCase() ===
      "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
    ) {
      if (nftPremium_total > 0) {
        setapproveStatus("initial");
      } else {
        setapproveStatus("deposit");
      }
    }
    let tokenDecimals =
      chainId === 1
        ? window.config.subscriptioneth_tokens[token]?.decimals
        : chainId === 56
        ? window.config.subscriptionbnb_tokens[token]?.decimals
        : chainId === 1030
        ? window.config.subscriptioncfx_tokens[token]?.decimals
        : chainId === 8453
        ? window.config.subscriptionbase_tokens[token]?.decimals
        : chainId === 43114
        ? window.config.subscription_tokens[token]?.decimals
        : chainId === 1482601649
        ? window.config.subscriptionskale_tokens[token]?.decimals
        : chainId === 1116
        ? window.config.subscriptioncore_tokens[token]?.decimals
        : chainId === 1329
        ? window.config.subscriptionsei_tokens[token]?.decimals
        : chainId === 88
        ? window.config.subscriptionviction_tokens[token]?.decimals
        : chainId === 2040
        ? window.config.subscriptionvanar_tokens[token]?.decimals
        : // : chainId === 169
        // ? window.config.subscriptionmanta_tokens[token]?.decimals
        chainId === 167000
        ? window.config.subscriptiontaiko_tokens[token]?.decimals
        : chainId === 698
        ? window.config.subscriptionmat_tokens[token]?.decimals
        : chainId === 1030
        ? window.config.subscriptioncfx_tokens[token]?.decimals
        : window.config.subscriptioneth_tokens[token]?.decimals;
    setprice("");
    setformattedPrice("");
    setTokenBalance("");
    setselectedSubscriptionToken(token);

    window.web3 = new Web3(window.ethereum);

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? // ? await window.getEstimatedTokenSubscriptionAmountBNB(token)
          await window.getEstimatedTokenSubscriptionAmountBNB2(
            token,
            discountPercentage
          )
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
        : chainId === 1116
        ? await window.getEstimatedTokenSubscriptionAmountCore(token)
        : chainId === 88
        ? await window.getEstimatedTokenSubscriptionAmountViction(
            token,
            discountPercentageViction
          )
        : chainId === 2040
        ? await window.getEstimatedTokenSubscriptionAmountVanar(
            token,
            discountPercentageVanar
          )
        : chainId === 169
        ? await window.getEstimatedTokenSubscriptionAmountManta(token)
        : chainId === 167000
        ? await window.getEstimatedTokenSubscriptionAmountTaiko(
            token,
            discountPercentageTaiko
          )
        : chainId === 698
        ? await window.getEstimatedTokenSubscriptionAmountMat(
            token,
            discountPercentageMat
          )
        : chainId === 1329
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmountETH(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    let formattedTokenPrice = getFormattedNumber(
      tokenprice / 10 ** tokenDecimals,
      tokenDecimals
    );

    if (coinbase && window.WALLET_TYPE === "binance") {
      let token_Sc = new ethers.Contract(
        token,
        window.ERC20_ABI,
        binanceW3WProvider.getSigner()
      );
      let tokenBalance2 = await token_Sc.balanceOf(coinbase);
      setTokenBalance(tokenBalance2);
    }
    if (coinbase && window.WALLET_TYPE === "matchId") {
      await publicClient
        .readContract({
          abi: window.ERC20_ABI,
          address: token,
          functionName: "balanceOf",
          args: [coinbase],
        })
        .then((data) => {
          let tokenBalance2 = Number(data);
          setTokenBalance(tokenBalance2);
        });
    }
    if (
      coinbase &&
      window.WALLET_TYPE !== "binance" &&
      window.WALLET_TYPE !== "matchId"
    ) {
      let token_Sc = new window.web3.eth.Contract(window.ERC20_ABI, token);
      let tokenBalance2 = await token_Sc.methods
        .balanceOf(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
        });
      setTokenBalance(tokenBalance2);
    }
    setprice(tokenprice);
    setformattedPrice(formattedTokenPrice);
  };

  const handleApprove = async (e) => {
    // e.preventDefault();
    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const cfxsubscribeAddress = window.config.subscription_cfx_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb2_address;

    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;
    const seisubscribeAddress = window.config.subscription_sei_address;
    const victionsubscribeAddress = window.config.subscription_viction_address;
    const vanarsubscribeAddress = window.config.subscription_vanar_address;
    const mantasubscribeAddress = window.config.subscription_manta_address;
    const taikosubscribeAddress = window.config.subscription_taiko_address;
    const matsubscribeAddress = window.config.subscription_mat_address;

    const coresubscribeAddress = window.config.subscription_core_address;

    window.web3 = new Web3(window.ethereum);

    setloadspinner(true);

    let nftContract_viction = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
      window.config.nft_dypius_premium_viction_address
    );
    let nftContract_vanar = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_MAT_ABI,
      window.config.nft_dypius_premium_vanar_address
    );

    let nftContract_taiko = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
      window.config.nft_dypius_premium_taiko_address
    );

    let nftContract_mat = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_MAT_ABI,
      window.config.nft_dypius_premium_mat_address
    );

    if (chainId === 56 && nftPremium_total > 0) {
      if (
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        let nftContract = new window.web3.eth.Contract(
          window.NFT_DYPIUS_PREMIUM_ABI,
          window.config.nft_dypius_premium_address
        );

        if (approveStatus === "initial") {
          await nftContract.methods
            .approve(
              window.config.subscription_newbnb2_address,
              nftPremium_tokenId
            )
            .send({ from: coinbase })
            .then(() => {
              setloadspinner(false);
              setisApproved(true);
              if (discountPercentage < 100) {
                if (
                  selectedSubscriptionToken.toLowerCase() ===
                  "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
                ) {
                  setapproveStatus("deposit");
                } else setapproveStatus("approveAmount");
              } else {
                setapproveStatus("deposit");
              }
            })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });
        } else if (approveStatus === "approveAmount") {
          await tokenContract.methods
            .approve(bnbsubscribeAddress, price)
            .send({ from: coinbase })
            .then(() => {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });
        }
      } else if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          if (approveStatus === "initial") {
            const result = await walletClient
              .writeContract({
                address: window.config.nft_dypius_premium_address,
                abi: window.NFT_DYPIUS_PREMIUM_ABI,
                functionName: "approve",
                args: [
                  window.config.subscription_newbnb2_address,
                  nftPremium_tokenId,
                ],
              })
              .catch((e) => {
                setstatus(e?.shortMessage);
                setloadspinner(false);
                setapproveStatus("fail");
                window.alertify.error(e?.shortMessage);
                setTimeout(() => {
                  setstatus("");
                  setloadspinner(false);
                  setapproveStatus("initial");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinner(false);
                setisApproved(true);
                if (discountPercentage < 100) {
                  if (
                    selectedSubscriptionToken.toLowerCase() ===
                    "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
                  ) {
                    setapproveStatus("deposit");
                  } else setapproveStatus("approveAmount");
                } else {
                  setapproveStatus("deposit");
                }
              }
            }
          } else if (approveStatus === "approveAmount") {
            const result = await walletClient
              .writeContract({
                address: selectedSubscriptionToken,
                abi: window.ERC20_ABI,
                functionName: "approve",
                args: [bnbsubscribeAddress, price],
              })
              .catch((e) => {
                setstatus(e?.shortMessage);
                setloadspinner(false);
                setapproveStatus("fail");
                window.alertify.error(e?.shortMessage);
                setTimeout(() => {
                  setstatus("");
                  setloadspinner(false);
                  setapproveStatus("initial");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinner(false);
                setisApproved(true);
                setapproveStatus("deposit");
              }
            }
          }
        }
      } else if (window.WALLET_TYPE === "binance") {
        let tokenContract_binance = new ethers.Contract(
          selectedSubscriptionToken,
          window.ERC20_ABI,
          binanceW3WProvider.getSigner()
        );

        let nftContract_binance = new ethers.Contract(
          window.config.nft_dypius_premium_address,
          window.NFT_DYPIUS_PREMIUM_ABI,
          binanceW3WProvider.getSigner()
        );

        if (approveStatus === "initial") {
          const txResponse = await nftContract_binance
            .approve(
              window.config.subscription_newbnb2_address,
              nftPremium_tokenId,
              { from: coinbase }
            )
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentage < 100) {
              if (
                selectedSubscriptionToken.toLowerCase() ===
                "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
              ) {
                setapproveStatus("deposit");
              } else setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          }
        } else if (approveStatus === "approveAmount") {
          const txResponse = await tokenContract_binance
            .approve(bnbsubscribeAddress, price, { from: coinbase })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          }
        }
      }
    } else if (
      chainId === 88 &&
      nftPremium_totalViction > 0 &&
      window.WALLET_TYPE !== "binance"
    ) {
      if (approveStatus === "initial") {
        await nftContract_viction.methods
          .approve(
            window.config.subscription_viction_address,
            nftPremium_tokenIdViction
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentageViction < 100) {
              setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (approveStatus === "approveAmount") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods
          .approve(victionsubscribeAddress, price)
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      }
    } else if (
      chainId === 2040 &&
      nftPremium_totalVanar > 0 &&
      window.WALLET_TYPE !== "binance"
    ) {
      if (approveStatus === "initial") {
        await nftContract_vanar.methods
          .approve(
            window.config.subscription_vanar_address,
            nftPremium_tokenIdVanar
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentageVanar < 100) {
              setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (approveStatus === "approveAmount") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods
          .approve(vanarsubscribeAddress, price)
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      }
    } else if (
      chainId === 167000 &&
      nftPremium_totalTaiko > 0 &&
      window.WALLET_TYPE !== "binance"
    ) {
      if (approveStatus === "initial") {
        await nftContract_taiko.methods
          .approve(
            window.config.subscription_taiko_address,
            nftPremium_tokenIdTaiko
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            if (discountPercentageTaiko < 100) {
              setapproveStatus("approveAmount");
            } else {
              setapproveStatus("deposit");
            }
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (approveStatus === "approveAmount") {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods
          .approve(taikosubscribeAddress, price)
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      }
    } else if (
      chainId === 698 &&
      nftPremium_totalMat > 0 &&
      window.WALLET_TYPE !== "binance"
    ) {
      if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          if (approveStatus === "initial") {
            const result = await walletClient
              .writeContract({
                address: window.config.nft_dypius_premium_mat_address,
                abi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
                functionName: "approve",
                args: [
                  window.config.subscription_mat_address,
                  nftPremium_tokenIdMat,
                ],
              })
              .catch((e) => {
                setstatus(e?.shortMessage);
                setloadspinner(false);
                setapproveStatus("fail");
                window.alertify.error(e?.shortMessage);
                setTimeout(() => {
                  setstatus("");
                  setloadspinner(false);
                  setapproveStatus("initial");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinner(false);
                setisApproved(true);
                if (discountPercentageMat < 100) {
                  setapproveStatus("approveAmount");
                } else {
                  setapproveStatus("deposit");
                }
              }
            }
          } else if (approveStatus === "approveAmount") {
            const result = await walletClient
              .writeContract({
                address: selectedSubscriptionToken,
                abi: window.ERC20_ABI,
                functionName: "approve",
                args: [matsubscribeAddress, price],
              })
              .catch((e) => {
                setstatus(e?.shortMessage);
                setloadspinner(false);
                setapproveStatus("fail");
                window.alertify.error(e?.shortMessage);
                setTimeout(() => {
                  setstatus("");
                  setloadspinner(false);
                  setapproveStatus("initial");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinner(false);
                setisApproved(true);
                setapproveStatus("deposit");
              }
            }
          }
        }
      } else {
        if (approveStatus === "initial") {
          await nftContract_mat.methods
            .approve(
              window.config.subscription_mat_address,
              nftPremium_tokenIdMat
            )
            .send({ from: coinbase })
            .then(() => {
              setloadspinner(false);
              setisApproved(true);
              if (discountPercentageMat < 100) {
                setapproveStatus("approveAmount");
              } else {
                setapproveStatus("deposit");
              }
            })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });
        } else if (approveStatus === "approveAmount") {
          let tokenContract = new window.web3.eth.Contract(
            window.ERC20_ABI,
            selectedSubscriptionToken
          );
          await tokenContract.methods
            .approve(matsubscribeAddress, price)
            .send({ from: coinbase })
            .then(() => {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            })
            .catch((e) => {
              setstatus(e?.message);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.message);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });
        }
      }
    } else {
      if (
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        let tokenContract = new window.web3.eth.Contract(
          window.ERC20_ABI,
          selectedSubscriptionToken
        );
        await tokenContract.methods

          .approve(
            chainId === 1
              ? ethsubscribeAddress
              : chainId === 56
              ? bnbsubscribeAddress
              : chainId === 1030
              ? cfxsubscribeAddress
              : chainId === 8453
              ? basesubscribeAddress
              : chainId === 43114
              ? avaxsubscribeAddress
              : chainId === 1482601649
              ? skalesubscribeAddress
              : chainId === 88
              ? victionsubscribeAddress
              : chainId === 2040
              ? vanarsubscribeAddress
              : chainId === 169
              ? mantasubscribeAddress
              : chainId === 167000
              ? taikosubscribeAddress
              : chainId === 698
              ? matsubscribeAddress
              : chainId === 1116
              ? coresubscribeAddress
              : chainId === 1329
              ? seisubscribeAddress
              : cfxsubscribeAddress,
            price
          )
          .send({ from: coinbase })
          .then(() => {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          })
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });
      } else if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          const result = await walletClient
            .writeContract({
              address: selectedSubscriptionToken,
              abi: window.ERC20_ABI,
              functionName: "approve",
              args: [
                chainId === 56
                  ? bnbsubscribeAddress
                  : chainId === 698
                  ? matsubscribeAddress
                  : bnbsubscribeAddress,
                price,
              ],
            })
            .catch((e) => {
              setstatus(e?.shortMessage);
              setloadspinner(false);
              setapproveStatus("fail");
              window.alertify.error(e?.shortMessage);
              setTimeout(() => {
                setstatus("");
                setloadspinner(false);
                setapproveStatus("initial");
              }, 5000);
            });

          if (result) {
            const receipt = await publicClient
              .waitForTransactionReceipt({
                hash: result,
              })
              .catch((e) => {
                console.error(e);
              });

            if (receipt) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
          }
        }
      } else if (window.WALLET_TYPE === "binance") {
        let tokenContract_binance = new ethers.Contract(
          selectedSubscriptionToken,
          window.ERC20_ABI,
          binanceW3WProvider.getSigner()
        );

        const txResponse = await tokenContract_binance
          .approve(
            chainId === 1
              ? ethsubscribeAddress
              : chainId === 56
              ? bnbsubscribeAddress
              : chainId === 1030
              ? cfxsubscribeAddress
              : chainId === 8453
              ? basesubscribeAddress
              : chainId === 43114
              ? avaxsubscribeAddress
              : chainId === 1482601649
              ? skalesubscribeAddress
              : chainId === 88
              ? victionsubscribeAddress
              : chainId === 2040
              ? vanarsubscribeAddress
              : chainId === 169
              ? mantasubscribeAddress
              : chainId === 167000
              ? taikosubscribeAddress
              : chainId === 1116
              ? coresubscribeAddress
              : chainId === 1329
              ? seisubscribeAddress
              : cfxsubscribeAddress,
            price,
            { from: coinbase }
          )
          .catch((e) => {
            setstatus(e?.message);
            setloadspinner(false);
            setapproveStatus("fail");
            window.alertify.error(e?.message);
            setTimeout(() => {
              setstatus("");
              setloadspinner(false);
              setapproveStatus("initial");
            }, 5000);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        }
      }
    }
  };

  const handleCheckIfAlreadyApproved = async (token) => {
    const web3eth = new Web3(window.config.infura_endpoint);
    const bscWeb3 = new Web3(window.config.bsc_endpoint);
    const avaxWeb3 = new Web3(window.config.avax_endpoint);

    const cfxWeb3 = new Web3(window.config.conflux_endpoint);
    const baseWeb3 = new Web3(window.config.base_endpoint);
    const skaleWeb3 = new Web3(window.config.skale_endpoint);
    const seiWeb3 = new Web3(window.config.sei_endpoint);
    const coreWeb3 = new Web3(window.config.core_endpoint);
    const victionWeb3 = new Web3(window.config.viction_endpoint);
    const vanarWeb3 = new Web3(window.config.vanar_endpoint);
    const mantaWeb3 = new Web3(window.config.manta_endpoint);
    const taikoWeb3 = new Web3(window.config.taiko_endpoint);
    const matWeb3 = new Web3(window.config.mat_endpoint);

    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const confluxsubscribeAddress = window.config.subscription_cfx_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb2_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;
    const seisubscribeAddress = window.config.subscription_sei_address;
    const coresubscribeAddress = window.config.subscription_core_address;
    const victionsubscribeAddress = window.config.subscription_viction_address;
    const vanarsubscribeAddress = window.config.subscription_vanar_address;
    const mantasubscribeAddress = window.config.subscription_manta_address;
    const taikosubscribeAddress = window.config.subscription_taiko_address;
    const matsubscribeAddress = window.config.subscription_mat_address;

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

    const subscribeTokencontractcfx = new cfxWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractbase = new baseWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractskale = new skaleWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractsei = new seiWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractcore = new coreWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractviction = new victionWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );
    const subscribeTokencontractvanar = new vanarWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractmanta = new mantaWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );
    const subscribeTokencontracttaiko = new taikoWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    const subscribeTokencontractmat = new matWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? await window.getEstimatedTokenSubscriptionAmountBNB2(
            token,
            discountPercentage
          )
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
        : chainId === 88
        ? await window.getEstimatedTokenSubscriptionAmountViction(
            token,
            discountPercentageViction
          )
        : chainId === 2040
        ? await window.getEstimatedTokenSubscriptionAmountVanar(
            token,
            discountPercentageVanar
          )
        : chainId === 169
        ? await window.getEstimatedTokenSubscriptionAmountManta(token)
        : chainId === 167000
        ? await window.getEstimatedTokenSubscriptionAmountTaiko(
            token,
            discountPercentageTaiko
          )
        : chainId === 698
        ? await window.getEstimatedTokenSubscriptionAmountMat(
            token,
            discountPercentageMat
          )
        : chainId === 1116
        ? await window.getEstimatedTokenSubscriptionAmountCore(token)
        : chainId === 1329
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmountETH(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    if (coinbase) {
      if (chainId === 1) {
        const result = await subscribeTokencontract.methods
          .allowance(coinbase, ethsubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 169) {
        const result = await subscribeTokencontractmanta.methods
          .allowance(coinbase, mantasubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1116) {
        const result = await subscribeTokencontractcore.methods
          .allowance(coinbase, coresubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1329) {
        const result = await subscribeTokencontractsei.methods
          .allowance(coinbase, seisubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 56) {
        if (nftPremium_total > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_ABI,
            window.config.nft_dypius_premium_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenId)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, bnbsubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === bnbsubscribeAddress.toLowerCase() ||
            approvedAll
          ) {
            if (discountPercentage < 100) {
              if (
                token.toLowerCase() ===
                "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
              ) {
                setloadspinner(false);
                setisApproved(true);
                setapproveStatus("deposit");
              } else {
                setloadspinner(false);
                setisApproved(true);
                setapproveStatus("approveAmount");
              }
            } else if (discountPercentage === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            } else {
              setloadspinner(false);
              setisApproved(false);
              setapproveStatus("initial");
            }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          if (
            token.toLowerCase() ===
            "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
          ) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else {
            const result = await subscribeTokencontractbnb.methods
              .allowance(coinbase, bnbsubscribeAddress)
              .call()
              .then();

            if (result != 0 && Number(result) >= Number(tokenprice)) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            } else if (result == 0 || Number(result) < Number(tokenprice)) {
              setloadspinner(false);
              setisApproved(false);
              setapproveStatus("initial");
            }
          }
        }
      } else if (chainId === 88) {
        if (nftPremium_totalViction > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
            window.config.nft_dypius_premium_viction_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenIdViction)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, victionsubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === victionsubscribeAddress.toLowerCase() ||
            approvedAll === true
          ) {
            if (discountPercentageViction === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
            // if (discountPercentageViction < 100) {
            //   setloadspinner(false);
            //   setisApproved(true);
            //   setapproveStatus("approveAmount");
            // } else {
            //   setloadspinner(false);
            //   setisApproved(false);
            //   setapproveStatus("initial");
            // }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          const result = await subscribeTokencontractviction.methods
            .allowance(coinbase, victionsubscribeAddress)
            .call()
            .then();

          if (result != 0 && Number(result) >= Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else if (result == 0 || Number(result) < Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        }
      } else if (chainId === 2040) {
        if (nftPremium_totalVanar > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_MAT_ABI,
            window.config.nft_dypius_premium_vanar_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenIdVanar)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, vanarsubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === vanarsubscribeAddress.toLowerCase() ||
            approvedAll === true
          ) {
            if (discountPercentageVanar === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
            // if (discountPercentageViction < 100) {
            //   setloadspinner(false);
            //   setisApproved(true);
            //   setapproveStatus("approveAmount");
            // } else {
            //   setloadspinner(false);
            //   setisApproved(false);
            //   setapproveStatus("initial");
            // }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          const result = await subscribeTokencontractvanar.methods
            .allowance(coinbase, vanarsubscribeAddress)
            .call()
            .then()
            .catch((e) => {
              console.error(e);
              return 0;
            });

          if (result != 0 && Number(result) >= Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else if (result == 0 || Number(result) < Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        }
      } else if (chainId === 167000) {
        if (nftPremium_totalTaiko > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
            window.config.nft_dypius_premium_taiko_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenIdTaiko)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, taikosubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === taikosubscribeAddress.toLowerCase() ||
            approvedAll === true
          ) {
            if (discountPercentageTaiko === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
            // if (discountPercentageTaiko < 100) {
            //   setloadspinner(false);
            //   setisApproved(true);
            //   setapproveStatus("approveAmount");
            // } else {
            //   setloadspinner(false);
            //   setisApproved(false);
            //   setapproveStatus("initial");
            // }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          const result = await subscribeTokencontracttaiko.methods
            .allowance(coinbase, taikosubscribeAddress)
            .call()
            .then();

          if (result != 0 && Number(result) >= Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else if (result == 0 || Number(result) < Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        }
      } else if (chainId === 698) {
        if (nftPremium_totalMat > 0) {
          let contract = new window.web3.eth.Contract(
            window.NFT_DYPIUS_PREMIUM_MAT_ABI,
            window.config.nft_dypius_premium_mat_address
          );

          let approved = await contract.methods
            .getApproved(nftPremium_tokenIdMat)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          let approvedAll = await contract.methods
            .isApprovedForAll(coinbase, matsubscribeAddress)
            .call()
            .catch((e) => {
              console.error(e);
              return false;
            });

          if (
            approved.toLowerCase() === matsubscribeAddress.toLowerCase() ||
            approvedAll === true
          ) {
            if (discountPercentageMat === 100) {
              setloadspinner(false);
              setisApproved(true);
              setapproveStatus("deposit");
            }
          } else {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        } else {
          const result = await subscribeTokencontractmat.methods
            .allowance(coinbase, matsubscribeAddress)
            .call()
            .then();

          if (result != 0 && Number(result) >= Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(true);
            setapproveStatus("deposit");
          } else if (result == 0 || Number(result) < Number(tokenprice)) {
            setloadspinner(false);
            setisApproved(false);
            setapproveStatus("initial");
          }
        }
      } else if (chainId === 43114) {
        const result = await subscribeTokencontractavax.methods
          .allowance(coinbase, avaxsubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1482601649) {
        const result = await subscribeTokencontractskale.methods
          .allowance(coinbase, skalesubscribeAddress)
          .call()
          .then();
        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 1030) {
        const result = await subscribeTokencontractcfx.methods
          .allowance(coinbase, confluxsubscribeAddress)
          .call()
          .then();

        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (chainId === 8453) {
        const result = await subscribeTokencontractbase.methods
          .allowance(coinbase, basesubscribeAddress)
          .call()
          .then()
          .catch(async (e) => {
            for (let i = 0; i < 3; i++) {
              try {
                let web3 = new Web3(window.config.all_base_endpoints[i]);

                let base_contract = new web3.eth.Contract(
                  window.ERC20_ABI,
                  subscribeToken
                );

                let result_base = await base_contract.methods
                  .allowance(coinbase, basesubscribeAddress)
                  .call()
                  .catch((e) => {
                    console.error(e);
                    return 0;
                  });
                if (
                  result_base != 0 &&
                  Number(result_base) >= Number(tokenprice)
                ) {
                  setloadspinner(false);
                  setisApproved(true);
                  setapproveStatus("deposit");
                } else if (
                  result_base == 0 ||
                  Number(result_base) < Number(tokenprice)
                ) {
                  setloadspinner(false);
                  setisApproved(false);
                  setapproveStatus("initial");
                }
              } catch (err) {
                const message = err?.message || "";

                console.warn(
                  `Error with ${window.config.all_base_endpoints[i]}: ${message}`
                );

                const isRateLimited =
                  message.toLowerCase().includes("rate limit") ||
                  message.toLowerCase().includes("too many requests") ||
                  message.toLowerCase().includes("over rate limit");

                if (isRateLimited) {
                  console.log(
                    `Rate limited on subscribeTokencontractbase ${window.config.all_base_endpoints[i]}. Trying next...`
                  );
                }
              }
            }
          });

        if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else {
        setloadspinner(false);
        setisApproved(false);
        setapproveStatus("initial");
      }
    }
  };

  const getContractBinance = async ({ key, address = null, ABI = null }) => {
    ABI = window[key + "_ABI"];
    address = window.config[key.toLowerCase() + "_address"];
    if (!window.cached_contracts[key + "-" + address.toLowerCase()]) {
      window.cached_contracts[key + "-" + address?.toLowerCase()] =
        new ethers.Contract(address, ABI, binanceW3WProvider.getSigner());
    }
    return window.cached_contracts[key + "-" + address.toLowerCase()];
  };

  const getContractEVM = async ({ key, address = null, ABI = null }) => {
    ABI = window[key + "_ABI"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    address = window.config[key.toLowerCase() + "_address"];
    if (!window.cached_contracts[key + "-" + address.toLowerCase()]) {
      window.cached_contracts[key + "-" + address?.toLowerCase()] =
        new ethers.Contract(address, ABI, signer);
    }
    return window.cached_contracts[key + "-" + address.toLowerCase()];
  };

  const handleSubscribe = async (e) => {
    const today = Date.now();
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      let subscriptionContract = await getContractEVM({
        key:
          chainId === 1
            ? "SUBSCRIPTION_NEWETH"
            : chainId === 56
            ? "SUBSCRIPTION_NEWBNB2"
            : chainId === 43114
            ? "SUBSCRIPTION_NEWAVAX"
            : chainId === 1030
            ? "SUBSCRIPTION_CFX"
            : chainId === 8453
            ? "SUBSCRIPTION_BASE"
            : chainId === 1482601649
            ? "SUBSCRIPTION_SKALE"
            : chainId === 88
            ? "SUBSCRIPTION_VICTION"
            : chainId === 2040
            ? "SUBSCRIPTION_VANAR"
            : chainId === 169
            ? "SUBSCRIPTION_MANTA"
            : chainId === 1116
            ? "SUBSCRIPTION_CORE"
            : chainId === 1329
            ? "SUBSCRIPTION_SEI"
            : "",
      });

      setloadspinnerSub(true);
      if (chainId === 56 && nftPremium_total > 0) {
        const txResponse = await subscriptionContract
          .subscribeNFT(
            nftDiscountObject.nftAddress,
            nftPremium_tokenId,
            selectedSubscriptionToken,
            price,
            { from: coinbase }
          )
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            let cleanReason = "Transaction failed";

            const fullMessage = e?.reason || e?.message || "";

            const match = fullMessage.match(/execution reverted: ([^"]+)/);
            if (match) {
              cleanReason = match[1];
            } else {
              cleanReason = fullMessage;
            }

            setstatus(cleanReason);
            window.alertify.error(cleanReason);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
        if (txResponse) {
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");

            onSuccessDeposit();
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          }
        }
      } else if (
        chainId === 56 &&
        selectedSubscriptionToken.toLowerCase() ===
          "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
      ) {
        // await subscriptionContract.methods
        //   .subscribeWithBNB()
        //   .send({ from: await window.getCoinbase(), value: price })
        //   .then(() => {
        //     setloadspinnerSub(false);
        //     onSuccessDeposit();
        //     handleUpdatePremiumUser(coinbase);
        //     setapproveStatus("successsubscribe");
        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   })
        //   .catch((e) => {
        //     setloadspinnerSub(false);
        //     setapproveStatus("failsubscribe");
        //     setstatus(e?.message);
        //     window.alertify.error(e?.message);
        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   });
        const txResponse = await subscriptionContract
          .subscribeWithBNB({ from: coinbase, value: price })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            let cleanReason = "Transaction failed";

            const fullMessage = e?.reason || e?.message || "";

            const match = fullMessage.match(/execution reverted: ([^"]+)/);
            if (match) {
              cleanReason = match[1];
            } else {
              cleanReason = fullMessage;
            }

            setstatus(cleanReason);
            window.alertify.error(cleanReason);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        if (txResponse) {
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");

            onSuccessDeposit();
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          }
        }
      } else if (chainId === 88 && nftPremium_totalViction > 0) {
        const txResponse = await subscriptionContract
          .subscribeNFT(
            nftDiscountObjectViction.nftAddress,
            nftPremium_tokenIdViction,
            selectedSubscriptionToken,
            price,
            { from: coinbase }
          )
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            let cleanReason = "Transaction failed";

            const fullMessage = e?.reason || e?.message || "";

            const match = fullMessage.match(/execution reverted: ([^"]+)/);
            if (match) {
              cleanReason = match[1];
            } else {
              cleanReason = fullMessage;
            }

            setstatus(cleanReason);
            window.alertify.error(cleanReason);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        if (txResponse) {
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");

            onSuccessDeposit();
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          }
        }

        // await window
        //   .subscribeNFTViction(
        //     nftDiscountObjectViction.nftAddress,
        //     nftPremium_tokenIdViction,
        //     selectedSubscriptionToken,
        //     price
        //   )
        //   .then(() => {
        //     setloadspinnerSub(false);
        //     handleUpdatePremiumUser(coinbase);
        //     setapproveStatus("successsubscribe");
        //     onSuccessDeposit();

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   })
        //   .catch(() => {
        //     setloadspinnerSub(false);
        //     setapproveStatus("failsubscribe");
        //     setstatus(e?.message);
        //     window.alertify.error(e?.message);

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   });
      } else if (chainId === 2040 && nftPremium_totalVanar > 0) {
        const txResponse = await subscriptionContract
          .subscribeNFT(
            nftDiscountObjectVanar.nftAddress,
            nftPremium_tokenIdVanar,
            selectedSubscriptionToken,
            price,
            { from: coinbase }
          )
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            let cleanReason = "Transaction failed";

            const fullMessage = e?.reason || e?.message || "";

            const match = fullMessage.match(/execution reverted: ([^"]+)/);
            if (match) {
              cleanReason = match[1];
            } else {
              cleanReason = fullMessage;
            }

            setstatus(cleanReason);
            window.alertify.error(cleanReason);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        if (txResponse) {
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");

            onSuccessDeposit();
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          }
        }

        // await window
        //   .subscribeNFTVanar(
        //     nftDiscountObjectVanar.nftAddress,
        //     nftPremium_tokenIdVanar,
        //     selectedSubscriptionToken,
        //     price
        //   )
        //   .then(() => {
        //     setloadspinnerSub(false);
        //     handleUpdatePremiumUser(coinbase);
        //     setapproveStatus("successsubscribe");
        //     onSuccessDeposit();

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   })
        //   .catch(() => {
        //     setloadspinnerSub(false);
        //     setapproveStatus("failsubscribe");
        //     setstatus(e?.message);
        //     window.alertify.error(e?.message);

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   });
      } else if (chainId === 167000 && nftPremium_totalTaiko > 0) {
        const txResponse = await subscriptionContract
          .subscribeNFT(
            nftDiscountObjectTaiko.nftAddress,
            nftPremium_tokenIdTaiko,
            selectedSubscriptionToken,
            price,
            { from: coinbase }
          )
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            let cleanReason = "Transaction failed";

            const fullMessage = e?.reason || e?.message || "";

            const match = fullMessage.match(/execution reverted: ([^"]+)/);
            if (match) {
              cleanReason = match[1];
            } else {
              cleanReason = fullMessage;
            }

            setstatus(cleanReason);
            window.alertify.error(cleanReason);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        if (txResponse) {
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");

            onSuccessDeposit();
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          }
        }

        // await window
        //   .subscribeNFTTaiko(
        //     nftDiscountObjectTaiko.nftAddress,
        //     nftPremium_tokenIdTaiko,
        //     selectedSubscriptionToken,
        //     price
        //   )
        //   .then(() => {
        //     setloadspinnerSub(false);
        //     handleUpdatePremiumUser(coinbase);
        //     setapproveStatus("successsubscribe");
        //     onSuccessDeposit();

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   })
        //   .catch(() => {
        //     setloadspinnerSub(false);
        //     setapproveStatus("failsubscribe");
        //     setstatus(e?.message);
        //     window.alertify.error(e?.message);

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   });
      } else if (chainId === 698 && nftPremium_totalMat > 0) {
        const txResponse = await subscriptionContract
          .subscribeNFT(
            nftDiscountObjectMat.nftAddress,
            nftPremium_tokenIdMat,
            selectedSubscriptionToken,
            price,
            { from: coinbase }
          )
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            let cleanReason = "Transaction failed";

            const fullMessage = e?.reason || e?.message || "";

            const match = fullMessage.match(/execution reverted: ([^"]+)/);
            if (match) {
              cleanReason = match[1];
            } else {
              cleanReason = fullMessage;
            }

            setstatus(cleanReason);
            window.alertify.error(cleanReason);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        if (txResponse) {
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinnerSub(false);
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");

            onSuccessDeposit();
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          }
        }
        // await window
        //   .subscribeNFTMat(
        //     nftDiscountObjectMat.nftAddress,
        //     nftPremium_tokenIdMat,
        //     selectedSubscriptionToken,
        //     price
        //   )
        //   .then(() => {
        //     setloadspinnerSub(false);
        //     handleUpdatePremiumUser(coinbase);
        //     setapproveStatus("successsubscribe");
        //     onSuccessDeposit();
        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   })
        //   .catch(() => {
        //     setloadspinnerSub(false);
        //     setapproveStatus("failsubscribe");
        //     setstatus(e?.message);
        //     window.alertify.error(e?.message);

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   });
      } else {
        const txResponse = await subscriptionContract
          .subscribe(selectedSubscriptionToken, price, { from: coinbase })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");

            let cleanReason = "Transaction failed";

            const fullMessage = e?.reason || e?.message || "";

            const match = fullMessage.match(/execution reverted: ([^"]+)/);
            if (match) {
              cleanReason = match[1];
            } else {
              cleanReason = fullMessage;
            }

            setstatus(cleanReason);
            window.alertify.error(cleanReason);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });
        if (txResponse) {
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            setloadspinnerSub(false);
            onSuccessDeposit();
            handleUpdatePremiumUser(coinbase);
            setapproveStatus("successsubscribe");

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          }
        }
        // await subscriptionContract.methods
        //   .subscribe(selectedSubscriptionToken, price)
        //   .send({ from: await window.getCoinbase() })
        //   .then(() => {
        //     setloadspinnerSub(false);
        //     onSuccessDeposit();
        //     handleUpdatePremiumUser(coinbase);
        //     setapproveStatus("successsubscribe");

        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   })
        //   .catch((e) => {
        //     setloadspinnerSub(false);
        //     setapproveStatus("failsubscribe");
        //     setstatus(e?.message);
        //     window.alertify.error(e?.message);
        //     setTimeout(() => {
        //       setloadspinnerSub(false);
        //       setloadspinner(false);
        //       setapproveStatus("initial");
        //       setstatus("");
        //     }, 5000);
        //   });
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        setloadspinnerSub(true);
        if (chainId === 56) {
          if (chainId === 56 && nftPremium_total > 0) {
            const result = await walletClient
              .writeContract({
                address: window.config.subscription_newbnb2_address,
                abi: window.SUBSCRIPTION_NEWBNB2_ABI,
                functionName: "subscribeNFT",
                args: [
                  nftDiscountObject.nftAddress,
                  nftPremium_tokenId,
                  selectedSubscriptionToken,
                  price,
                ],
              })
              .catch((e) => {
                setloadspinnerSub(false);
                setapproveStatus("failsubscribe");
                setstatus(e?.shortMessage);
                window.alertify.error(e?.shortMessage);

                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinnerSub(false);
                handleUpdatePremiumUser(coinbase);
                setapproveStatus("successsubscribe");

                onSuccessDeposit();
                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              }
            }
          } else if (
            chainId === 56 &&
            selectedSubscriptionToken.toLowerCase() ===
              "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
          ) {
            const result = await walletClient
              .writeContract({
                address: window.config.subscription_newbnb2_address,
                abi: window.SUBSCRIPTION_NEWBNB2_ABI,
                functionName: "subscribeWithBNB",
                args: [],
                overrides: {
                  value: price,
                  from: coinbase,
                },
              })
              .catch((e) => {
                setloadspinnerSub(false);
                setapproveStatus("failsubscribe");
                setstatus(e?.shortMessage);
                window.alertify.error(e?.shortMessage);
                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinnerSub(false);
                onSuccessDeposit();
                handleUpdatePremiumUser(coinbase);
                setapproveStatus("successsubscribe");
                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              }
            }
          } else {
            const result = await walletClient
              .writeContract({
                address: window.config.subscription_newbnb2_address,
                abi: window.SUBSCRIPTION_NEWBNB2_ABI,
                functionName: "subscribe",
                args: [selectedSubscriptionToken, price],
              })
              .catch((e) => {
                setloadspinnerSub(false);
                setapproveStatus("failsubscribe");
                setstatus(e?.shortMessage);
                window.alertify.error(e?.shortMessage);
                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              });
            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinnerSub(false);
                onSuccessDeposit();
                handleUpdatePremiumUser(coinbase);
                setapproveStatus("successsubscribe");

                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              }
            }
          }
        } else if (chainId === 698) {
          if (chainId === 698 && nftPremium_totalMat > 0) {
            const result = await walletClient
              .writeContract({
                address: window.config.subscription_mat_address,
                abi: window.SUBSCRIPTION_MAT_ABI,
                functionName: "subscribeNFT",
                args: [
                  nftDiscountObjectMat.nftAddress,
                  nftPremium_tokenIdMat,
                  selectedSubscriptionToken,
                  price,
                ],
              })
              .catch(() => {
                setloadspinnerSub(false);
                setapproveStatus("failsubscribe");
                setstatus(e?.shortMessage);
                window.alertify.error(e?.shortMessage);

                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinnerSub(false);
                handleUpdatePremiumUser(coinbase);
                setapproveStatus("successsubscribe");
                onSuccessDeposit();
                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              }
            }
          } else {
            const result = await walletClient
              .writeContract({
                address: window.config.subscription_mat_address,
                abi: window.SUBSCRIPTION_MAT_ABI,
                functionName: "subscribe",
                args: [selectedSubscriptionToken, price],
              })
              .catch(() => {
                setloadspinnerSub(false);
                setapproveStatus("failsubscribe");
                setstatus(e?.shortMessage);
                window.alertify.error(e?.shortMessage);
                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              });

            if (result) {
              const receipt = await publicClient
                .waitForTransactionReceipt({
                  hash: result,
                })
                .catch((e) => {
                  console.error(e);
                });

              if (receipt) {
                setloadspinnerSub(false);
                onSuccessDeposit();
                handleUpdatePremiumUser(coinbase);
                setapproveStatus("successsubscribe");

                setTimeout(() => {
                  setloadspinnerSub(false);
                  setloadspinner(false);
                  setapproveStatus("initial");
                  setstatus("");
                }, 5000);
              }
            }
          }
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      let subscriptionContract = await getContractBinance({
        key:
          chainId === 1
            ? "SUBSCRIPTION_NEWETH"
            : chainId === 56
            ? "SUBSCRIPTION_NEWBNB2"
            : chainId === 43114
            ? "SUBSCRIPTION_NEWAVAX"
            : chainId === 1030
            ? "SUBSCRIPTION_CFX"
            : chainId === 8453
            ? "SUBSCRIPTION_BASE"
            : chainId === 1482601649
            ? "SUBSCRIPTION_SKALE"
            : chainId === 88
            ? "SUBSCRIPTION_VICTION"
            : chainId === 2040
            ? "SUBSCRIPTION_VANAR"
            : chainId === 169
            ? "SUBSCRIPTION_MANTA"
            : chainId === 1116
            ? "SUBSCRIPTION_CORE"
            : chainId === 1329
            ? "SUBSCRIPTION_SEI"
            : "",
      });

      setloadspinnerSub(true);
      if (chainId === 56 && nftPremium_total > 0) {
        let subscriptionContract = await getContractBinance({
          key: "SUBSCRIPTION_NEWBNB2",
        });
        const txResponse = await subscriptionContract
          .subscribeNFT(
            nftDiscountObject.nftAddress,
            nftPremium_tokenId,
            selectedSubscriptionToken,
            price,
            { from: coinbase }
          )
          .catch(() => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);

            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setloadspinnerSub(false);
          handleUpdatePremiumUser(coinbase);
          setapproveStatus("successsubscribe");
          onSuccessDeposit();
          // await axios
          //   .patch(
          //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
          //     {
          //       multiplier: "yes",
          //       chain: "bnb subscribeNFT BinanceWallet",
          //       premiumTimestamp: today.toString(),
          //     },
          //     {
          //       headers: { Authorization: `Bearer ${authToken}` },
          //     }
          //   )
          //   .then(() => {
          //     getRankData();
          //   })
          //   .catch((e) => {
          //     console.error(e);
          //   });

          setTimeout(() => {
            setloadspinnerSub(false);
            setloadspinner(false);
            setapproveStatus("initial");
            setstatus("");
          }, 5000);
        }
      } else if (
        chainId === 56 &&
        selectedSubscriptionToken.toLowerCase() ===
          "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
      ) {
        const txResponse = await subscriptionContract
          .subscribeWithBNB({ from: coinbase, value: price })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setloadspinnerSub(false);
          onSuccessDeposit();
          handleUpdatePremiumUser(coinbase);
          setapproveStatus("successsubscribe");
          // await axios
          //   .patch(
          //     `https://api.worldofdypians.com/api/userRanks/multiplier/${coinbase}`,
          //     {
          //       multiplier: "yes",
          //       chain: "bnb subscribeBNB BinanceWallet",
          //       premiumTimestamp: today.toString(),
          //     },
          //     {
          //       headers: { Authorization: `Bearer ${authToken}` },
          //     }
          //   )
          //   .then(() => {
          //     getRankData();
          //   })
          //   .catch((e) => {
          //     console.error(e);
          //   });

          setTimeout(() => {
            setloadspinnerSub(false);
            setloadspinner(false);
            setapproveStatus("initial");
            setstatus("");
          }, 5000);
        }
      } else {
        const txResponse = await subscriptionContract
          .subscribe(selectedSubscriptionToken, price, { from: coinbase })
          .catch((e) => {
            setloadspinnerSub(false);
            setapproveStatus("failsubscribe");
            setstatus(e?.message);
            window.alertify.error(e?.message);
            setTimeout(() => {
              setloadspinnerSub(false);
              setloadspinner(false);
              setapproveStatus("initial");
              setstatus("");
            }, 5000);
          });

        const txReceipt = await txResponse.wait();
        if (txReceipt) {
          setloadspinnerSub(false);
          onSuccessDeposit();
          handleUpdatePremiumUser(coinbase);
          setapproveStatus("successsubscribe");

          setTimeout(() => {
            setloadspinnerSub(false);
            setloadspinner(false);
            setapproveStatus("initial");
            setstatus("");
          }, 5000);
        }
      }
    }
  };

  useEffect(() => {
    if (chainId === 1) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    } else if (chainId === 56) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbnb_tokens)[0]
      );
      handleSubscriptionTokenChange(wbnbAddress);
      handleCheckIfAlreadyApproved(wbnbAddress);
    } else if (chainId === 1030) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncfx_tokens)[0]
      );
      handleSubscriptionTokenChange(wcfx);
      handleCheckIfAlreadyApproved(wcfx);
    } else if (chainId === 8453) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("weth");
      setdropdownTitle("WETH");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbase_tokens)[0]
      );
      handleSubscriptionTokenChange(wbase);
      handleCheckIfAlreadyApproved(wbase);
    } else if (chainId === 43114) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscription_tokens)[0]
      );
      handleSubscriptionTokenChange(wavaxAddress);
    } else if (chainId === 1482601649) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdc");
      setdropdownTitle("USDC");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionskale_tokens)[0]
      );
      handleSubscriptionTokenChange(wskaleAddress);
    } else if (chainId === 88) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionviction_tokens)[0]
      );
      handleSubscriptionTokenChange(wvictionAddress);
      handleCheckIfAlreadyApproved(wvictionAddress);
    } else if (chainId === 2040) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdc");
      setdropdownTitle("USDC");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionvanar_tokens)[0]
      );
      handleSubscriptionTokenChange(wvanarAddress);
      handleCheckIfAlreadyApproved(wvanarAddress);
    } else if (chainId === 169) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionmanta_tokens)[0]
      );
      handleSubscriptionTokenChange(wmantaddress);
      handleCheckIfAlreadyApproved(wmantaddress);
    } else if (chainId === 167000) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptiontaiko_tokens)[0]
      );
      handleSubscriptionTokenChange(wtaikoaddress);
      handleCheckIfAlreadyApproved(wtaikoaddress);
    } else if (chainId === 698) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionmat_tokens)[0]
      );
      handleSubscriptionTokenChange(wmataddress);
      handleCheckIfAlreadyApproved(wmataddress);
    } else if (chainId === 1116) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncore_tokens)[0]
      );
      handleSubscriptionTokenChange(wcoreAddress);
      handleCheckIfAlreadyApproved(wcoreAddress);
    } else if (chainId === 1329) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("usdt");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionsei_tokens)[11]
      );
      handleSubscriptionTokenChange(wseiAddress);
      handleCheckIfAlreadyApproved(wseiAddress);
    } else {
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    }
  }, [
    chainId,
    nftPremium_total,
    nftPremium_totalViction,
    nftPremium_totalVanar,
    nftPremium_totalTaiko,
    nftPremium_totalMat,
    discountPercentage,
    discountPercentageViction,
    discountPercentageVanar,
    discountPercentageTaiko,
    discountPercentageMat,
    nftPremium_tokenId,
    nftPremium_tokenIdViction,
    nftPremium_tokenIdVanar,
    nftPremium_tokenIdTaiko,
    nftPremium_tokenIdMat,
  ]);

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
    } else if (chainId === 1030 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioncfx_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 88 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionviction_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 2040 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionvanar_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 169 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionmanta_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 167000 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptiontaiko_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 698 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionmat_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 1116 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioncore_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 8453 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionbase_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 1482601649 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionskale_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else if (chainId === 1329 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptionsei_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    } else {
      settokenDecimals(
        window.config.subscriptioneth_tokens[selectedSubscriptionToken]
          ?.decimals
      );
    }
  }, [chainId, selectedSubscriptionToken]);

  useEffect(() => {
    calculatePremiumDiscount(coinbase);
  }, [chainId, coinbase]);

  useEffect(() => {
    setActiveChain();
  }, [chainId]);

  useEffect(() => {
    document.title = "WOD Prime";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="custom-container mt-5 mt-lg-0">
        {isPremium ? (
          <div className="px-0 pt-5 pt-lg-2 position-relative">
            <div className="position-relative is-premium-gold-bg d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between">
              <div className="d-flex flex-column w-100 justify-content-center gap-2 align-items-center bgwrapper p-3">
                <h6 className="mb-0 already-premium-title">PRIME ENABLED</h6>
                <img
                  src={"https://cdn.worldofdypians.com/wod/premiumIcon.webp"}
                  className="already-preium-badge"
                  alt=""
                />
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="mt-3 p-3 benefits-title-wrapper justify-content-center">
                <h6 className="premium-benefits-popup-title mb-0">Benefits</h6>
              </div>
              <div className="sidebar-separator2 m-0"></div>
              <div className="row w-100 premium-benefits-wrapper p-3 align-items-center justify-content-center mx-0">
                {allBenefits.map((item, index) => {
                  return (
                    <div key={index} className="col-12 col-lg-3 mb-3">
                      <div className="benefit-item">
                        <div className="d-flex flex-column gap-3">
                          <img src={item.image} alt="" className="benefitimg" />
                          <span className="benefittitle p-3">{item.title}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-0 pt-5 pt-lg-2 position-relative">
            <div className="" style={{ background: "#8E97CD" }}></div>
            {discountPercentage > 0 ||
            discountPercentageViction > 0 ||
            discountPercentageVanar > 0 ||
            discountPercentageTaiko > 0 ||
            discountPercentageMat > 0 ||
            nftPremium_total > 0 ||
            nftPremium_totalViction ||
            nftPremium_totalVanar ||
            nftPremium_totalTaiko > 0 ||
            nftPremium_totalMat > 0 ? (
              <div className="premium-gold-bg mt-3 p-4 position-relative d-flex align-items-center justify-content-between">
                <div className="premiumRedTag position-absolute">
                  <div className="position-relative d-flex flex-column">
                    <img
                      src={
                        "https://cdn.worldofdypians.com/wod/redPremiumTag.svg"
                      }
                      alt=""
                    />
                    <div className="d-flex flex-column position-absolute discountwrap">
                      <span className="discount-price2 font-oxanium">
                        {discountPercentage > 0
                          ? discountPercentage
                          : discountPercentageViction > 0
                          ? discountPercentageViction
                          : discountPercentageVanar > 0
                          ? discountPercentageVanar
                          : discountPercentageTaiko > 0
                          ? discountPercentageTaiko
                          : discountPercentageMat > 0
                          ? discountPercentageMat
                          : discountPercentage}
                        %
                      </span>
                      <span className="discount-price-bottom">Discount</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row gap-2 gap-lg-0 justify-content-between mt-2 mt-lg-0 justify-content-lg-start flex-lg-column flex-md-column flex-sm-column align-items-center align-items-lg-start align-items-md-start align-items-sm-start">
                  <div className="d-flex flex-column">
                    <h6 className="lifetime-plan-text m-0">Lifetime plan</h6>
                    {(nftPremium_total > 0 ||
                      nftPremium_totalViction > 0 ||
                      nftPremium_totalVanar > 0 ||
                      nftPremium_totalTaiko > 0 ||
                      nftPremium_totalMat > 0) && (
                      <h6 className="token-amount-placeholder m-0 d-block d-lg-none d-md-none d-sm-none">
                        Valid until:{" "}
                        {new Date(
                          nftPremium_total > 0
                            ? nftDiscountObject.expiration * 1000
                            : nftPremium_totalTaiko > 0
                            ? nftDiscountObjectTaiko.expiration * 1000
                            : nftPremium_totalMat > 0
                            ? nftDiscountObjectMat.expiration * 1000
                            : nftPremium_totalVanar > 0
                            ? nftDiscountObjectVanar.expiration * 1000
                            : nftDiscountObjectViction.expiration * 1000
                        )
                          .toDateString()
                          .slice(
                            3,
                            new Date(
                              nftPremium_total > 0
                                ? nftDiscountObject.expiration * 1000
                                : nftPremium_totalTaiko > 0
                                ? nftDiscountObjectTaiko.expiration * 1000
                                : nftPremium_totalMat > 0
                                ? nftDiscountObjectMat.expiration * 1000
                                : nftPremium_totalVanar > 0
                                ? nftDiscountObjectVanar.expiration * 1000
                                : nftDiscountObjectViction.expiration * 1000
                            ).toDateString().length
                          )}
                      </h6>
                    )}
                  </div>
                  <div className="d-flex align-items-end gap-2">
                    <h6 className="discount-price">
                      {discountPercentage == 100 ||
                      discountPercentageViction == 100 ||
                      discountPercentageVanar == 100 ||
                      discountPercentageTaiko == 100 ||
                      discountPercentageMat == 100
                        ? "FREE"
                        : "$" +
                          (100 -
                            Number(
                              discountPercentage > 0
                                ? discountPercentage
                                : discountPercentageViction > 0
                                ? discountPercentageViction
                                : discountPercentageVanar > 0
                                ? discountPercentageVanar
                                : discountPercentageTaiko > 0
                                ? discountPercentageTaiko
                                : discountPercentageMat > 0
                                ? discountPercentageMat
                                : discountPercentage
                            ))}
                    </h6>
                    <h6 className="old-price-text">$100</h6>
                  </div>
                  {(nftPremium_total > 0 ||
                    nftPremium_totalViction > 0 ||
                    nftPremium_totalVanar > 0 ||
                    nftPremium_totalTaiko > 0 ||
                    nftPremium_totalMat > 0) && (
                    <h6 className="token-amount-placeholder m-0 premium-custom-text">
                      Valid until:{" "}
                      {new Date(
                        nftPremium_total > 0
                          ? nftDiscountObject.expiration * 1000
                          : nftPremium_totalTaiko > 0
                          ? nftDiscountObjectTaiko.expiration * 1000
                          : nftPremium_totalMat > 0
                          ? nftDiscountObjectMat.expiration * 1000
                          : nftPremium_totalVanar > 0
                          ? nftDiscountObjectVanar.expiration * 1000
                          : nftDiscountObjectViction.expiration * 1000
                      )
                        .toDateString()
                        .slice(
                          3,
                          new Date(
                            nftPremium_total > 0
                              ? nftDiscountObject.expiration * 1000
                              : nftPremium_totalTaiko > 0
                              ? nftDiscountObjectTaiko.expiration * 1000
                              : nftPremium_totalMat > 0
                              ? nftDiscountObjectMat.expiration * 1000
                              : nftPremium_totalVanar > 0
                              ? nftDiscountObjectVanar.expiration * 1000
                              : nftDiscountObjectViction.expiration * 1000
                          ).toDateString().length
                        )}
                    </h6>
                  )}
                </div>
                <img
                  src={"https://cdn.worldofdypians.com/wod/premiumIcon.webp"}
                  alt=""
                  className="already-preium-badge"
                />
              </div>
            ) : (
              <div className="premium-gold-bg d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
                <div className="d-flex flex-column gap-2">
                  <span className="lifetime-plan mb-0">Lifetime plan</span>
                  <h6 className="plan-cost mb-0">$100</h6>
                </div>
                <div className="d-flex flex-row align-items-center gap-3">
                  <div className="premium-chains-wrapper">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/eth.svg"}
                        style={{ width: 18, height: 18 }}
                        alt=""
                      />
                      <span className="subscription-chain mb-0">Ethereum</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                        style={{ width: 18, height: 18 }}
                        alt=""
                      />
                      <span className="subscription-chain mb-0">BNB Chain</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                        }
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Matchain</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/seiLogo.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">SEI</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/manta.png"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Manta</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/taiko.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Taiko</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/avaxIcon.svg"}
                        style={{ width: 18, height: 18 }}
                        alt=""
                      />
                      <span className="subscription-chain mb-0">Avalanche</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/base.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Base</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                        }
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Conflux</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/skaleIcon.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">SKALE</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/core.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">CORE</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/viction.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Viction</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/vanar.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Vanar</span>
                    </div>
                  </div>
                  <img
                    src={"https://cdn.worldofdypians.com/wod/premiumIcon.webp"}
                    alt=""
                    className="already-preium-badge"
                  />
                </div>
              </div>
            )}
            <div className="d-flex flex-column">
              <div className="mt-3 p-3 benefits-title-wrapper justify-content-center">
                <h6 className="premium-benefits-popup-title mb-0">Benefits</h6>
              </div>
              <div className="sidebar-separator2 m-0"></div>
              <div className="premium-benefits-wrapper d-flex gap-3 justify-content-between p-3">
                {allBenefits.map((item, index) => {
                  return (
                    <div key={index} className="benefit-item">
                      <div className="d-flex flex-column gap-3">
                        <img src={item.image} alt="" className="benefitimg" />
                        <span className="benefittitle p-3">{item.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <hr className="form-divider my-4" /> */}
            <div className="d-flex align-items-lg-end align-items-start flex-column flex-lg-row justify-content-between mt-3">
              <h6 className="become-premium-new-title mb-0">
                Become Prime User
              </h6>
              <span className="my-premium-balance">
                My Balance:{" "}
                {getFormattedNumber(tokenBalance / 10 ** tokenDecimals, 5)}{" "}
                {dropdownIcon?.toUpperCase()}
              </span>
            </div>
            <div
              className="premium-benefits-wrapper mt-3 d-flex p-3 align-items-lg-center align-items-lg-end justify-content-between flex-column flex-lg-row w-100 gap-4 gap-lg-0"
              style={{ overflowX: "clip" }}
            >
              <div className="d-flex flex-column flex-lg-row align-items-lg-end gap-lg-4">
                <div className="d-flex flex-column gap-lg-3">
                  <span className="token-amount-placeholder">Select chain</span>
                  <div className="dropdown position relative">
                    <button
                      className={`btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle`}
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => {
                        setshowChainDropdown(true);
                      }}
                    >
                      <div
                        className="d-flex align-items-center gap-2 pe-3"
                        style={{ color: "#fff" }}
                      >
                        <img
                          src={`https://cdn.worldofdypians.com/wod/${chainDropdown.symbol}IconPremium.svg`}
                          alt=""
                          style={{ width: 18, height: 18 }}
                        />
                        {chainDropdown.name}
                      </div>
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/launchpadIndicator.svg"
                        }
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column gap-lg-3">
                  <span className="token-amount-placeholder">
                    Subscription Price
                  </span>
                  <div className="launchpad-dropdown dropdown-toggle d-flex align-items-center ps-0 gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="dropdown position relative">
                        <button
                          className={`btn launchpad-dropdown d-flex gap-1 justify-content-between dropdown-toggle-game align-items-center  w-100`}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div
                            className="d-flex align-items-center gap-2"
                            style={{ color: "#fff" }}
                          >
                            {dropdownIcon !== "" && (
                              <img
                                src={`https://cdn.worldofdypians.com/wod/${dropdownIcon.toLowerCase()}IconPremium.svg`}
                                alt=""
                                style={{ width: 20, height: 20 }}
                              />
                            )}
                            {/* {dropdownTitle} */}
                          </div>
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/launchpadIndicator.svg"
                            }
                            alt=""
                          />
                        </button>
                        <ul className="dropdown-menu w-100">
                          {Object.keys(
                            chainId === 1
                              ? window.config.subscriptioneth_tokens
                              : chainId === 56
                              ? window.config.subscriptionbnb_tokens
                              : chainId === 1030
                              ? window.config.subscriptioncfx_tokens
                              : chainId === 43114
                              ? window.config.subscription_tokens
                              : chainId === 8453
                              ? window.config.subscriptionbase_tokens
                              : chainId === 1482601649
                              ? window.config.subscriptionskale_tokens
                              : chainId === 88
                              ? window.config.subscriptionviction_tokens
                              : chainId === 2040
                              ? window.config.subscriptionvanar_tokens
                              : chainId === 169
                              ? window.config.subscriptionmanta_tokens
                              : chainId === 167000
                              ? window.config.subscriptiontaiko_tokens
                              : chainId === 698
                              ? window.config.subscriptionmat_tokens
                              : chainId === 1116
                              ? window.config.subscriptioncore_tokens
                              : chainId === 1329
                              ? window.config.subscriptionsei_tokens
                              : window.config.subscriptioneth_tokens
                          ).map((t, i) => (
                            <li
                              key={i}
                              className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                              onClick={() => {
                                window.cached_contracts = Object.create(null);
                                setTimeout(() => {
                                  setdropdownIcon(
                                    chainId === 1
                                      ? window.config.subscriptioneth_tokens[t]
                                          ?.symbol
                                      : chainId === 56
                                      ? window.config.subscriptionbnb_tokens[t]
                                          ?.symbol
                                      : chainId === 43114
                                      ? window.config.subscription_tokens[t]
                                          ?.symbol
                                      : chainId === 8453
                                      ? window.config.subscriptionbase_tokens[t]
                                          ?.symbol
                                      : chainId === 1030
                                      ? window.config.subscriptioncfx_tokens[t]
                                          ?.symbol
                                      : chainId === 1482601649
                                      ? window.config.subscriptionskale_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 88
                                      ? window.config
                                          .subscriptionviction_tokens[t]?.symbol
                                      : chainId === 2040
                                      ? window.config.subscriptionvanar_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 169
                                      ? window.config.subscriptionmanta_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 167000
                                      ? window.config.subscriptiontaiko_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 698
                                      ? window.config.subscriptionmat_tokens[t]
                                          ?.symbol
                                      : chainId === 1116
                                      ? window.config.subscriptioncore_tokens[t]
                                          ?.symbol
                                      : chainId === 1329
                                      ? window.config.subscriptionsei_tokens[t]
                                          ?.symbol
                                      : window.config.subscriptioneth_tokens[t]
                                          ?.symbol
                                  );
                                  setdropdownTitle(
                                    chainId === 1
                                      ? window.config.subscriptioneth_tokens[t]
                                          ?.symbol
                                      : chainId === 56
                                      ? window.config.subscriptionbnb_tokens[t]
                                          ?.symbol
                                      : chainId === 43114
                                      ? window.config.subscription_tokens[t]
                                          ?.symbol
                                      : chainId === 8453
                                      ? window.config.subscriptionbase_tokens[t]
                                          ?.symbol
                                      : chainId === 1030
                                      ? window.config.subscriptioncfx_tokens[t]
                                          ?.symbol
                                      : chainId === 1482601649
                                      ? window.config.subscriptionskale_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 88
                                      ? window.config
                                          .subscriptionviction_tokens[t]?.symbol
                                      : chainId === 2040
                                      ? window.config.subscriptionvanar_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 169
                                      ? window.config.subscriptionmanta_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 167000
                                      ? window.config.subscriptiontaiko_tokens[
                                          t
                                        ]?.symbol
                                      : chainId === 698
                                      ? window.config.subscriptionmat_tokens[t]
                                          ?.symbol
                                      : chainId === 1329
                                      ? window.config.subscriptionsei_tokens[t]
                                          ?.symbol
                                      : chainId === 1116
                                      ? window.config.subscriptionsei_tokens[t]
                                          ?.symbol
                                      : window.config.subscriptioneth_tokens[t]
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
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptioneth_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 56
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionbnb_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 43114
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscription_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 1030
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptioncfx_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 8453
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionbase_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 1482601649
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionskale_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 1116
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptioncore_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 88
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionviction_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 2040
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionvanar_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 169
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionmanta_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 167000
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptiontaiko_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 698
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionmat_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : chainId === 1329
                                    ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptionsei_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                    : `https://cdn.worldofdypians.com/wod/${window.config.subscriptioneth_tokens[
                                        t
                                      ]?.symbol.toLowerCase()}IconPremium.svg`
                                }
                                alt=""
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              />
                              {chainId === 1
                                ? window.config.subscriptioneth_tokens[t]
                                    ?.symbol
                                : chainId === 56
                                ? window.config.subscriptionbnb_tokens[t]
                                    ?.symbol
                                : chainId === 43114
                                ? window.config.subscription_tokens[t]?.symbol
                                : chainId === 1030
                                ? window.config.subscriptioncfx_tokens[t]
                                    ?.symbol
                                : chainId === 8453
                                ? window.config.subscriptionbase_tokens[t]
                                    ?.symbol
                                : chainId === 1482601649
                                ? window.config.subscriptionskale_tokens[t]
                                    ?.symbol
                                : chainId === 1116
                                ? window.config.subscriptioncore_tokens[t]
                                    ?.symbol
                                : chainId === 88
                                ? window.config.subscriptionviction_tokens[t]
                                    ?.symbol
                                : chainId === 2040
                                ? window.config.subscriptionvanar_tokens[t]
                                    ?.symbol
                                : chainId === 169
                                ? window.config.subscriptionmanta_tokens[t]
                                    ?.symbol
                                : chainId === 167000
                                ? window.config.subscriptiontaiko_tokens[t]
                                    ?.symbol
                                : chainId === 698
                                ? window.config.subscriptionmat_tokens[t]
                                    ?.symbol
                                : chainId === 1329
                                ? window.config.subscriptionsei_tokens[t]
                                    ?.symbol
                                : window.config.subscriptioneth_tokens[t]
                                    ?.symbol}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <span className="subscription-price-token mb-0 text-uppercase">
                        {formattedPrice !== ""
                          ? formattedPrice.slice(0, 7)
                          : getFormattedNumber(100, 4)}{" "}
                        {dropdownTitle}
                      </span>
                    </div>
                    <span className="subscription-price-usd-game mb-0">
                      {" "}
                      $
                      {100 -
                        Number(
                          discountPercentage != 0
                            ? discountPercentage
                            : discountPercentageViction != 0
                            ? discountPercentageViction
                            : discountPercentageVanar != 0
                            ? discountPercentageVanar
                            : discountPercentageTaiko != 0
                            ? discountPercentageTaiko
                            : discountPercentageMat != 0
                            ? discountPercentageMat
                            : discountPercentage
                        )}
                    </span>
                  </div>
                </div>
              </div>
              {isConnected && discountPercentage > 0 && chainId === 56 ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <button
                    className={`btn ${
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    disabled={
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? true
                        : false
                    }
                    onClick={(e) => handleApprove(e)}
                  >
                    {loadspinner === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "deposit" ||
                      approveStatus === "failsubscribe" ||
                      approveStatus === "approveAmount" ||
                      approveStatus === "successsubscribe") ? (
                      <>
                        Approve{" "}
                        {approveStatus === "approveAmount"
                          ? "token"
                          : nftPremium_total > 0
                          ? "NFT"
                          : ""}
                      </>
                    ) : loadspinner === false && approveStatus === "fail" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>

                  <button
                    className={`btn ${
                      isApproved === false || !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    onClick={() => handleSubscribe()}
                  >
                    {loadspinnerSub === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "fail" ||
                      approveStatus === "deposit") ? (
                      <>
                        {discountPercentage > 0 || nftPremium_total > 0
                          ? "Redeem"
                          : "Buy"}
                      </>
                    ) : loadspinnerSub === false &&
                      approveStatus === "successsubscribe" ? (
                      "Success"
                    ) : loadspinnerSub === false &&
                      approveStatus === "failsubscribe" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageViction > 0 &&
                chainId === 88 ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <button
                    className={`btn ${
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    disabled={
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? true
                        : false
                    }
                    onClick={(e) => handleApprove(e)}
                  >
                    {loadspinner === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "deposit" ||
                      approveStatus === "failsubscribe" ||
                      approveStatus === "approveAmount" ||
                      approveStatus === "successsubscribe") ? (
                      <>
                        Approve{" "}
                        {approveStatus === "approveAmount"
                          ? "token"
                          : nftPremium_totalViction > 0
                          ? "NFT"
                          : ""}
                      </>
                    ) : loadspinner === false && approveStatus === "fail" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>

                  <button
                    className={`btn ${
                      isApproved === false || !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    onClick={() => handleSubscribe()}
                  >
                    {loadspinnerSub === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "fail" ||
                      approveStatus === "deposit") ? (
                      <>
                        {discountPercentageViction > 0 ||
                        nftPremium_totalViction > 0
                          ? "Redeem"
                          : "Buy"}
                      </>
                    ) : loadspinnerSub === false &&
                      approveStatus === "successsubscribe" ? (
                      "Success"
                    ) : loadspinnerSub === false &&
                      approveStatus === "failsubscribe" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageVanar > 0 &&
                chainId === 2040 ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <button
                    className={`btn ${
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    disabled={
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? true
                        : false
                    }
                    onClick={(e) => handleApprove(e)}
                  >
                    {loadspinner === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "deposit" ||
                      approveStatus === "failsubscribe" ||
                      approveStatus === "approveAmount" ||
                      approveStatus === "successsubscribe") ? (
                      <>
                        Approve{" "}
                        {approveStatus === "approveAmount"
                          ? "token"
                          : nftPremium_totalVanar > 0
                          ? "NFT"
                          : ""}
                      </>
                    ) : loadspinner === false && approveStatus === "fail" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>

                  <button
                    className={`btn ${
                      isApproved === false || !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    onClick={() => handleSubscribe()}
                  >
                    {loadspinnerSub === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "fail" ||
                      approveStatus === "deposit") ? (
                      <>
                        {discountPercentageVanar > 0 ||
                        nftPremium_totalVanar > 0
                          ? "Redeem"
                          : "Buy"}
                      </>
                    ) : loadspinnerSub === false &&
                      approveStatus === "successsubscribe" ? (
                      "Success"
                    ) : loadspinnerSub === false &&
                      approveStatus === "failsubscribe" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageTaiko > 0 &&
                chainId === 167000 ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <button
                    className={`btn ${
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    disabled={
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? true
                        : false
                    }
                    onClick={(e) => handleApprove(e)}
                  >
                    {loadspinner === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "deposit" ||
                      approveStatus === "failsubscribe" ||
                      approveStatus === "approveAmount" ||
                      approveStatus === "successsubscribe") ? (
                      <>
                        Approve{" "}
                        {approveStatus === "approveAmount"
                          ? "token"
                          : nftPremium_totalTaiko > 0
                          ? "NFT"
                          : ""}
                      </>
                    ) : loadspinner === false && approveStatus === "fail" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>

                  <button
                    className={`btn ${
                      isApproved === false || !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    onClick={() => handleSubscribe()}
                  >
                    {loadspinnerSub === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "fail" ||
                      approveStatus === "deposit") ? (
                      <>
                        {discountPercentageTaiko > 0 ||
                        nftPremium_totalTaiko > 0
                          ? "Redeem"
                          : "Buy"}
                      </>
                    ) : loadspinnerSub === false &&
                      approveStatus === "successsubscribe" ? (
                      "Success"
                    ) : loadspinnerSub === false &&
                      approveStatus === "failsubscribe" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageMat > 0 &&
                chainId === 698 ? (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <button
                    className={`btn ${
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    disabled={
                      approveStatus === "fail" ||
                      !coinbase ||
                      isApproved ||
                      !isEOA
                        ? true
                        : false
                    }
                    onClick={(e) => handleApprove(e)}
                  >
                    {loadspinner === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "deposit" ||
                      approveStatus === "failsubscribe" ||
                      approveStatus === "approveAmount" ||
                      approveStatus === "successsubscribe") ? (
                      <>
                        Approve{" "}
                        {approveStatus === "approveAmount"
                          ? "token"
                          : nftPremium_totalMat > 0
                          ? "NFT"
                          : ""}
                      </>
                    ) : loadspinner === false && approveStatus === "fail" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>

                  <button
                    className={`btn ${
                      isApproved === false || !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    onClick={() => handleSubscribe()}
                  >
                    {loadspinnerSub === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "fail" ||
                      approveStatus === "deposit") ? (
                      <>
                        {discountPercentageMat > 0 || nftPremium_totalMat > 0
                          ? "Redeem"
                          : "Buy"}
                      </>
                    ) : loadspinnerSub === false &&
                      approveStatus === "successsubscribe" ? (
                      "Success"
                    ) : loadspinnerSub === false &&
                      approveStatus === "failsubscribe" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>
                </div>
              ) : isConnected && discountPercentage > 0 && chainId !== 56 ? (
                <div
                  className={`d-flex align-items-center justify-content-center mb-2`}
                >
                  <button
                    className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                    onClick={() => {
                      switchNetwork("0x38", 56);
                    }}
                    style={{
                      width: "fit-content",
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    Switch to BNB Chain
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageViction > 0 &&
                chainId !== 88 ? (
                <div
                  className={`d-flex align-items-center justify-content-center mb-2`}
                >
                  <button
                    className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                    onClick={() => {
                      switchNetwork("0x58", 88);
                    }}
                    style={{
                      width: "fit-content",
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    Switch to Viction
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageVanar > 0 &&
                chainId !== 88 ? (
                <div
                  className={`d-flex align-items-center justify-content-center mb-2`}
                >
                  <button
                    className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                    onClick={() => {
                      switchNetwork("0x7f8", 2040);
                    }}
                    style={{
                      width: "fit-content",
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    Switch to Vanar
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageTaiko > 0 &&
                chainId !== 167000 ? (
                <div
                  className={`d-flex align-items-center justify-content-center mb-2`}
                >
                  <button
                    className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                    onClick={() => {
                      switchNetwork("0x28c58", 167000);
                    }}
                    style={{
                      width: "fit-content",
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    Switch to Taiko
                  </button>
                </div>
              ) : isConnected &&
                discountPercentageMat > 0 &&
                chainId !== 698 ? (
                <div
                  className={`d-flex align-items-center justify-content-center mb-2`}
                >
                  <button
                    className="d-flex gap-2 px-3 py-1 align-items-center connectbtn"
                    onClick={() => {
                      switchNetwork("0x2ba", 698);
                    }}
                    style={{
                      width: "fit-content",
                      whiteSpace: "nowrap",
                      fontSize: 14,
                    }}
                  >
                    Switch to Matchain
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3 justify-content-center">
                  <button
                    className={`btn ${
                      approveStatus === "fail" ||
                      !isEOA ||
                      !coinbase ||
                      isApproved
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    disabled={
                      approveStatus === "fail" ||
                      !isEOA ||
                      !coinbase ||
                      isApproved
                        ? true
                        : false
                    }
                    onClick={(e) => handleApprove(e)}
                  >
                    {loadspinner === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "deposit" ||
                      approveStatus === "approveAmount" ||
                      approveStatus === "failsubscribe" ||
                      approveStatus === "successsubscribe") ? (
                      <>Approve token</>
                    ) : loadspinner === false && approveStatus === "fail" ? (
                      "Failed"
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        Processing
                        <div
                          className="spinner-border "
                          role="status"
                          style={{
                            height: "1rem",
                            width: "1rem",
                          }}
                        ></div>{" "}
                      </div>
                    )}
                  </button>

                  <button
                    className={`btn ${
                      isApproved === false || !isEOA
                        ? "disabled-btn"
                        : "connectbtn"
                    } px-4`}
                    disabled={
                      approveStatus === "fail" ||
                      !coinbase ||
                      !isApproved ||
                      !isEOA
                        ? true
                        : false
                    }
                    onClick={() => handleSubscribe()}
                  >
                    {loadspinnerSub === false &&
                    (approveStatus === "initial" ||
                      approveStatus === "fail" ||
                      approveStatus === "deposit") ? (
                      <>Buy</>
                    ) : loadspinnerSub === false &&
                      approveStatus === "successsubscribe" ? (
                      "Success"
                    ) : loadspinnerSub === false &&
                      approveStatus === "failsubscribe" ? (
                      "Failed"
                    ) : (
                      <div
                        className="spinner-border "
                        role="status"
                        style={{
                          height: "1rem",
                          width: "1rem",
                        }}
                      ></div>
                    )}
                  </button>
                </div>
              )}
            </div>

            {chainId === 1482601649 && isConnected && (
              <div className="gotoNebula-wrapper p-3 mb-3">
                <div className="d-flex w-100 justify-content-between gap-2">
                  <span className="nebula-wrapper-text">
                    Bridge your USDC to Nebula now!
                  </span>
                  <a
                    className="nebula-bridgebtn"
                    href="https://portal.skale.space/bridge?from=mainnet&to=green-giddy-denebola&token=usdc&type=erc20"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Nebula Bridge
                  </a>
                </div>
              </div>
            )}
            <div
              className={`d-flex align-items-center ${
                !coinbase ? "justify-content-between" : "justify-content-end"
              }`}
            >
              {!coinbase && (
                <span style={{ color: "rgb(227, 6 ,19)" }}>
                  Please connect your wallet first
                </span>
              )}

              {isConnected && coinbase && !isEOA && (
                <span className="text-danger">
                  Smart contract wallets are not supported for this action.
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {showChainDropdown && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setshowChainDropdown(false);
          }}
        >
          <ChainPopup
            onClose={() => {
              setshowChainDropdown(false);
            }}
            onSwitchNetwork={(hexchain, chain) => {
              switchNetwork(hexchain, chain);
            }}
            activeChain={chainState}
            isMobile={true}
            isPremium={true}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default GetPremiumPopup;
