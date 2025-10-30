import React, { useState, useEffect } from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import axios from "axios";

import { switchNetworkWagmi } from "../../../../../utils/wagmiSwitchChain";
import "./_getpremium.scss";
import OutsideClickHandler from "react-outside-click-handler";
import ChainPopup from "../../../../../components/Header/ChainPopup";
import { useBinancePayPremium } from "../../../../../hooks/useBinancePayPremium";
import { motion } from "motion/react";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
  getAccount,
} from "@wagmi/core";
import { wagmiClient } from "../../../../../wagmiConnectors.js";

const GetPremiumPopup = ({
  isEOA,
  coinbase,
  chainId,
  handleSwitchNetwork,
  onSuccessDeposit,
  handleSwitchChainBinanceWallet,
  handleSwitchChainGateWallet,
  authToken,
  isPremium,
  isConnected,
  walletClient,
  publicClient,
  network_matchain,
}) => {
  const { statusPrime, txHash, createPremiumOrder, QRComponent } =
    useBinancePayPremium();

  let buttonText = "Binance Pay";
  if (statusPrime === "creating") buttonText = "Creating order...";
  if (statusPrime === "waitingPayment") buttonText = "Waiting for payment...";
  if (statusPrime === "validating") buttonText = "Validating bundle...";
  if (statusPrime === "activating") buttonText = "Activating on-chain...";
  if (statusPrime === "success") buttonText = "✅ Success!";
  if (statusPrime === "failed") buttonText = "❌ Failed";
  if (statusPrime === "idle") buttonText = "Activate";

  // Derive wallet capabilities from wagmi/viem (no window.WALLET_TYPE)
  const wagmiAccount = getAccount(wagmiClient);
  const activeConnectorName =
    wagmiAccount?.connector?.name?.toLowerCase?.() || "";
  const isBinanceWallet = activeConnectorName.includes("binance");
  const isMatchIdWallet = Boolean(walletClient && publicClient);

  // Unified on-chain helpers using wagmi/viem only
  const readOnChain = async ({
    address,
    abi,
    functionName,
    args = [],
    chain,
  }) => {
    const targetChainId = chain ?? chainId;
    if (isMatchIdWallet && publicClient) {
      return await publicClient.readContract({
        address,
        abi,
        functionName,
        args,
      });
    }
    return await readContract(wagmiClient, {
      address,
      abi,
      functionName,
      args,
      chainId: targetChainId,
    });
  };

  const writeOnChain = async ({
    address,
    abi,
    functionName,
    args = [],
    value,
  }) => {
    if (isMatchIdWallet && walletClient && publicClient) {
      const hash = await walletClient.writeContract({
        address,
        abi,
        functionName,
        args,
        value,
      });
      await publicClient.waitForTransactionReceipt({ hash });
      return hash;
    }
    const hash = await writeContract(wagmiClient, {
      address,
      abi,
      functionName,
      args,
      chainId,
      value,
    });
    await waitForTransactionReceipt(wagmiClient, { hash });
    return hash;
  };

  // Estimate price via subscription contract per chain using wagmi/viem
  const getEstimatedPrice = async (token) => {
    let address, abi, args;
    switch (chainId) {
      case 1:
        address = window.config.subscription_neweth_address;
        abi = window.SUBSCRIPTION_NEWETH_ABI;
        args = [token];
        break;
      case 56:
        address = window.config.subscription_newbnb2_address;
        abi = window.SUBSCRIPTION_NEWBNB2_ABI;
        args = [token, discountPercentage];
        break;
      case 43114:
        address = window.config.subscription_newavax_address;
        abi = window.SUBSCRIPTION_NEWAVAX_ABI;
        args = [token];
        break;
      case 1030:
        address = window.config.subscription_cfx_address;
        abi = window.SUBSCRIPTION_CFX_ABI;
        args = [token];
        break;
      case 8453:
        address = window.config.subscription_base_address;
        abi = window.SUBSCRIPTION_BASE_ABI;
        args = [token];
        break;
      case 1482601649:
        address = window.config.subscription_skale_address;
        abi = window.SUBSCRIPTION_SKALE_ABI;
        args = [token];
        break;
      case 1116:
        address = window.config.subscription_core_address;
        abi = window.SUBSCRIPTION_CORE_ABI;
        args = [token];
        break;
      case 88:
        address = window.config.subscription_viction_address;
        abi = window.SUBSCRIPTION_VICTION_ABI;
        args = [token, discountPercentageViction];
        break;
      case 2040:
        address = window.config.subscription_vanar_address;
        abi = window.SUBSCRIPTION_VANAR_ABI;
        args = [token, discountPercentageVanar];
        break;
      case 169:
        address = window.config.subscription_manta_address;
        abi = window.SUBSCRIPTION_MANTA_ABI;
        args = [token];
        break;
      case 167000:
        address = window.config.subscription_taiko_address;
        abi = window.SUBSCRIPTION_TAIKO_ABI;
        args = [token, discountPercentageTaiko];
        break;
      case 698:
        address = window.config.subscription_mat_address;
        abi = window.SUBSCRIPTION_MAT_ABI;
        args = [token, discountPercentageMat];
        break;
      case 841:
        address = window.config.subscription_taraxa_address;
        abi = window.SUBSCRIPTION_TARAXA_ABI;
        args = [token, discountPercentageTaraxa];
        break;
      case 1329:
        address = window.config.subscription_sei_address;
        abi = window.SUBSCRIPTION_SEI_ABI;
        args = [token];
        break;
      default:
        address = window.config.subscription_neweth_address;
        abi = window.SUBSCRIPTION_NEWETH_ABI;
        args = [token];
        break;
    }
    return await readOnChain({
      address,
      abi,
      functionName: "getEstimatedTokenSubscriptionAmount",
      args,
      chain: chainId,
    });
  };

  const handleUpdatePremiumUser = async (wallet) => {
    await axios
      .get(`https://api.worldofdypians.com/api/sub/${wallet}`)
      .catch((e) => {
        console.error(e);
      });
  };

  const handlePurchasePremium = (walletAddress, price) => {
    createPremiumOrder(walletAddress, price);
  };

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
    {
      name: "Taraxa",
      symbol: "taraxa",
      chainId: 841,
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
  let wtaraxaAddress = "0x8712796136Ac8e0EEeC123251ef93702f265aa80";

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
    {
      title: "Lifetime Plan",
      image: "https://cdn.worldofdypians.com/wod/lifetimePlanBg.webp",
    },
  ];

  const [binancePay, setbinancePay] = useState(false);

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

  const [nftDiscountObjectTaraxa, setnftDiscountObjectTaraxa] = useState([]);
  const [discountPercentageTaraxa, setdiscountPercentageTaraxa] = useState(0);
  const [nftPremium_tokenIdTaraxa, setnftPremium_tokenIdTaraxa] = useState(0);
  const [nftPremium_totalTaraxa, setnftPremium_totalTaraxa] = useState(0);

  const [chainState, setchainState] = useState("");

  const switchNetwork = async (hexChainId, chain) => {
    // Extract chainId from hex or use chain number directly
    const chainId = typeof chain === 'number' ? chain : parseInt(hexChainId, 16);
    
    try {
      await switchNetworkWagmi(chainId, chain, {
        handleSwitchNetwork,
        handleSwitchChainGateWallet,
        handleSwitchChainBinanceWallet,
        network_matchain,
        coinbase,
      });
    } catch (error) {
      // Error handling is done in switchNetworkWagmi
      console.error("Network switch error:", error);
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
      } else if (chainId === 841) {
        setchainState("taraxa");
      } else {
        setchainState("");
      }
    }
  };

  const calculatePremiumDiscount = async (wallet) => {
    const bnbSubscription = {
      address: window.config.subscription_newbnb2_address,
      abi: window.SUBSCRIPTION_NEWBNB2_ABI,
    };
    const victionSubscription = {
      address: window.config.subscription_viction_address,
      abi: window.SUBSCRIPTION_VICTION_ABI,
    };
    const vanarSubscription = {
      address: window.config.subscription_vanar_address,
      abi: window.SUBSCRIPTION_VANAR_ABI,
    };
    const taikoSubscription = {
      address: window.config.subscription_taiko_address,
      abi: window.SUBSCRIPTION_TAIKO_ABI,
    };
    const matSubscription = {
      address: window.config.subscription_mat_address,
      abi: window.SUBSCRIPTION_MAT_ABI,
    };
    const taraxaSubscription = {
      address: window.config.subscription_taraxa_address,
      abi: window.SUBSCRIPTION_TARAXA_ABI,
    };

    const nftBnb = {
      address: window.config.nft_dypius_premium_address,
      abi: window.NFT_DYPIUS_PREMIUM_ABI,
    };
    const nftViction = {
      address: window.config.nft_dypius_premium_viction_address,
      abi: window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
    };
    const nftVanar = {
      address: window.config.nft_dypius_premium_vanar_address,
      abi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
    };
    const nftTaiko = {
      address: window.config.nft_dypius_premium_taiko_address,
      abi: window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
    };
    const nftMat = {
      address: window.config.nft_dypius_premium_mat_address,
      abi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
    };
    const nftTaraxa = {
      address: window.config.nft_dypius_premium_taraxa_address,
      abi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
    };

    if (!wallet) {
      setnftPremium_tokenIdMat(0);
      setnftPremium_totalMat(0);
      setnftPremium_tokenIdTaraxa(0);
      setnftPremium_totalTaraxa(0);
      setnftPremium_tokenId(0);
      setnftPremium_total(0);
      setnftPremium_tokenIdViction(0);
      setnftPremium_totalViction(0);
      setnftPremium_tokenIdVanar(0);
      setnftPremium_totalVanar(0);
      setnftPremium_tokenIdTaiko(0);
      setnftPremium_totalTaiko(0);
      return;
    }

    // Read owned NFT counts in parallel via wagmi
    const [
      result,
      result_viction,
      result_vanar,
      result_taiko,
      result_mat,
      result_taraxa,
    ] = await Promise.all([
      readContract(wagmiClient, {
        ...nftBnb,
        functionName: "balanceOf",
        args: [wallet],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...nftViction,
        functionName: "balanceOf",
        args: [wallet],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...nftVanar,
        functionName: "balanceOf",
        args: [wallet],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...nftTaiko,
        functionName: "balanceOf",
        args: [wallet],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...nftMat,
        functionName: "balanceOf",
        args: [wallet],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...nftTaraxa,
        functionName: "balanceOf",
        args: [wallet],
      }).catch(() => 0),
    ]);

    const [
      discount,
      discount_viction,
      discount_vanar,
      discount_taiko,
      discount_mat,
      discount_taraxa,
    ] = await Promise.all([
      readContract(wagmiClient, {
        ...bnbSubscription,
        functionName: "discountPercentageGlobal",
        args: [],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...victionSubscription,
        functionName: "discountPercentageGlobal",
        args: [],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...vanarSubscription,
        functionName: "discountPercentageGlobal",
        args: [],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...taikoSubscription,
        functionName: "discountPercentageGlobal",
        args: [],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...matSubscription,
        functionName: "discountPercentageGlobal",
        args: [],
      }).catch(() => 0),
      readContract(wagmiClient, {
        ...taraxaSubscription,
        functionName: "discountPercentageGlobal",
        args: [],
      }).catch(() => 0),
    ]);

    const [
      nftObject,
      nftObject_viction,
      nftObject_vanar,
      nftObject_taiko,
      nftObject_mat,
      nftObject_taraxa,
    ] = await Promise.all([
      readContract(wagmiClient, {
        ...bnbSubscription,
        functionName: "nftDiscounts",
        args: [nftBnb.address],
      }).catch(() => undefined),
      readContract(wagmiClient, {
        ...victionSubscription,
        functionName: "nftDiscounts",
        args: [nftViction.address],
      }).catch(() => undefined),
      readContract(wagmiClient, {
        ...vanarSubscription,
        functionName: "nftDiscounts",
        args: [nftVanar.address],
      }).catch(() => undefined),
      readContract(wagmiClient, {
        ...taikoSubscription,
        functionName: "nftDiscounts",
        args: [nftTaiko.address],
      }).catch(() => undefined),
      readContract(wagmiClient, {
        ...matSubscription,
        functionName: "nftDiscounts",
        args: [nftMat.address],
      }).catch(() => undefined),
      readContract(wagmiClient, {
        ...taraxaSubscription,
        functionName: "nftDiscounts",
        args: [nftTaraxa.address],
      }).catch(() => undefined),
    ]);

    const getFirstTokenId = async (nft) =>
      readContract(wagmiClient, {
        ...nft,
        functionName: "tokenOfOwnerByIndex",
        args: [wallet, 0],
      }).catch(() => 0);

    if (result && parseInt(result) > 0) {
      const tokenId = await getFirstTokenId(nftBnb);
      if (nftObject) {
        setnftDiscountObject(nftObject);
        if (discount)
          setdiscountPercentage(
            Math.max(parseInt(discount), parseInt(nftObject.discountPercentage))
          );
      }
      setnftPremium_tokenId(tokenId);
      setnftPremium_total(parseInt(result));
    } else if (result_viction && parseInt(result_viction) > 0) {
      const tokenId = await getFirstTokenId(nftViction);
      if (nftObject_viction) {
        setnftDiscountObjectViction(nftObject_viction);
        if (discount_viction)
          setdiscountPercentageViction(
            Math.max(
              parseInt(discount_viction),
              parseInt(nftObject_viction.discountPercentage)
            )
          );
      }
      setnftPremium_tokenIdViction(tokenId);
      setnftPremium_totalViction(parseInt(result_viction));
    } else if (result_vanar && parseInt(result_vanar) > 0) {
      const tokenId = await getFirstTokenId(nftVanar);
      if (nftObject_vanar) {
        setnftDiscountObjectVanar(nftObject_vanar);
        if (discount_vanar)
          setdiscountPercentageVanar(
            Math.max(
              parseInt(discount_vanar),
              parseInt(nftObject_vanar.discountPercentage)
            )
          );
      }
      setnftPremium_tokenIdVanar(tokenId);
      setnftPremium_totalVanar(parseInt(result_vanar));
    } else if (result_taiko && parseInt(result_taiko) > 0) {
      const tokenId = await getFirstTokenId(nftTaiko);
      if (nftObject_taiko) {
        setnftDiscountObjectTaiko(nftObject_taiko);
        if (discount_taiko)
          setdiscountPercentageTaiko(
            Math.max(
              parseInt(discount_taiko),
              parseInt(nftObject_taiko.discountPercentage)
            )
          );
      }
      setnftPremium_tokenIdTaiko(tokenId);
      setnftPremium_totalTaiko(parseInt(result_taiko));
    } else if (result_mat && parseInt(result_mat) > 0) {
      const tokenId = await getFirstTokenId(nftMat);
      if (nftObject_mat) {
        setnftDiscountObjectMat(nftObject_mat);
        if (discount_mat)
          setdiscountPercentageMat(
            Math.max(
              parseInt(discount_mat),
              parseInt(nftObject_mat.discountPercentage)
            )
          );
      }
      setnftPremium_tokenIdMat(tokenId);
      setnftPremium_totalMat(parseInt(result_mat));
    } else if (result_taraxa && parseInt(result_taraxa) > 0) {
      const tokenId = await getFirstTokenId(nftTaraxa);
      if (nftObject_taraxa) {
        setnftDiscountObjectTaraxa(nftObject_taraxa);
        if (discount_taraxa)
          setdiscountPercentageTaraxa(
            Math.max(
              parseInt(discount_taraxa),
              parseInt(nftObject_taraxa.discountPercentage)
            )
          );
      }
      setnftPremium_tokenIdTaraxa(tokenId);
      setnftPremium_totalTaraxa(parseInt(result_taraxa));
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
      setnftPremium_tokenIdTaraxa(0);
      setnftPremium_totalTaraxa(0);

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
      } else if (discount_taraxa) {
        setdiscountPercentageTaraxa(parseInt(discount_taraxa));
      }
    }
  };

  const resolvePremiumContract = (cid, token) => {
    try {
      switch (cid) {
        case 1116:
          return {
            address: window.config.subscription_core_address,
            abi: window.SUBSCRIPTION_CORE_ABI,
            chainText: "core",
            args: [token],
          };
        case 88:
          return {
            address: window.config.subscription_viction_address,
            abi: window.SUBSCRIPTION_VICTION_ABI,
            chainText: "viction",
            args: [token, discountPercentageViction],
            nftAddress: window.config.nft_dypius_premium_viction_address,
            nftAbi: window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
            nftTotal: nftPremium_totalViction,
            nftTokenId: nftPremium_tokenIdViction,
            discountPercentage: discountPercentageViction,
          };
        case 2040:
          // Vanar uses the same ABI as SEI in existing code
          return {
            address: window.config.subscription_vanar_address,
            abi: window.SUBSCRIPTION_VANAR_ABI,
            chainText: "vanar",
            args: [token, discountPercentageVanar],
            nftAddress: window.config.nft_dypius_premium_vanar_address,
            nftAbi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
            nftTotal: nftPremium_totalVanar,
            nftTokenId: nftPremium_tokenIdVanar,
            discountPercentage: discountPercentageVanar,
          };
        case 169:
          return {
            address: window.config.subscription_manta_address,
            abi: window.SUBSCRIPTION_MANTA_ABI,
            chainText: "manta",
            args: [token, 0],
            nftAddress: undefined,
            nftAbi: undefined,
          };
        case 8453:
          return {
            address: window.config.subscription_base_address,
            abi: window.SUBSCRIPTION_BASE_ABI,
            chainText: "base",
            args: [token],
          };
        case 167000:
          return {
            address: window.config.subscription_taiko_address,
            abi: window.SUBSCRIPTION_TAIKO_ABI,
            chainText: "taiko",
            args: [token, discountPercentageTaiko],
            nftAddress: window.config.nft_dypius_premium_taiko_address,
            nftAbi: window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
            nftTotal: nftPremium_totalTaiko,
            nftTokenId: nftPremium_tokenIdTaiko,
            discountPercentage: discountPercentageTaiko,
          };
        case 841:
          return {
            address: window.config.subscription_taraxa_address,
            abi: window.SUBSCRIPTION_TARAXA_ABI,
            chainText: "taraxa",
            args: [token, discountPercentageTaraxa],
            nftAddress: window.config.nft_dypius_premium_taraxa_address,
            nftAbi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
            nftTotal: nftPremium_totalTaraxa,
            nftTokenId: nftPremium_tokenIdTaraxa,
            discountPercentage: discountPercentageTaraxa,
          };
        case 1329:
          return {
            address: window.config.subscription_sei_address,
            abi: window.SUBSCRIPTION_SEI_ABI,
            chainText: "sei",
            args: [token],
          };
        case 698:
          return {
            address: window.config.subscription_mat_address,
            abi: window.SUBSCRIPTION_MAT_ABI,
            chainText: "matchain",
            args: [token, discountPercentageMat],
            nftAddress: window.config.nft_dypius_premium_mat_address,
            nftAbi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
            nftTotal: nftPremium_totalMat,
            nftTokenId: nftPremium_tokenIdMat,
            discountPercentage: discountPercentageMat,
          };
        case 56:
          return {
            address: window.config.subscription_newbnb2_address,
            abi: window.SUBSCRIPTION_NEWBNB2_ABI,
            chainText: "bnb",
            args: [token, discountPercentage],
            nftAddress: window.config.nft_dypius_premium_address,
            nftAbi: window.NFT_DYPIUS_PREMIUM_ABI,
            nftTotal: nftPremium_total,
            nftTokenId: nftPremium_tokenId,
            discountPercentage: discountPercentage,
          };
        case 1482601649:
          return {
            address: window.config.subscription_skale_address,
            abi: window.SUBSCRIPTION_SKALE_ABI,
            chainText: "skale",
            args: [token],
          };
        case 1:
          return {
            address: window.config.subscription_neweth_address,
            abi: window.SUBSCRIPTION_NEWETH_ABI,
            chainText: "ethereum",
            args: [token],
          };
        case 43114:
          return {
            address: window.config.subscription_newavax_address,
            abi: window.SUBSCRIPTION_NEWAVAX_ABI,
            chainText: "avax",
            args: [token],
          };
        case 1030:
          return {
            address: window.config.subscription_cfx_address,
            abi: window.SUBSCRIPTION_CFX_ABI,
            chainText: "cfx",
            args: [token],
          };

        default:
          return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
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
        : chainId === 841
        ? window.config.subscriptiontaraxa_tokens[token]?.decimals
        : window.config.subscriptioneth_tokens[token]?.decimals;
    setprice("");
    setformattedPrice("");
    setTokenBalance("");
    setselectedSubscriptionToken(token);

    let tokenprice = await getEstimatedPrice(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    let formattedTokenPrice = getFormattedNumber(
      tokenprice / 10 ** tokenDecimals,
      tokenDecimals
    );

    if (coinbase) {
      const balance = await readOnChain({
        address: token,
        abi: window.ERC20_ABI,
        functionName: "balanceOf",
        args: [coinbase],
      }).catch(() => 0);
      setTokenBalance(Number(balance));
    }
    setprice(tokenprice);
    setformattedPrice(formattedTokenPrice);
  };

  // ==================== HELPER FUNCTIONS ====================
  
  // Subscription address mapping for efficient lookups
  const getSubscribeAddressByChain = (chainId) => {
    const addressMap = {
      1: window.config.subscription_neweth_address,
      56: window.config.subscription_newbnb2_address,
      88: window.config.subscription_viction_address,
      698: window.config.subscription_mat_address,
      841: window.config.subscription_taraxa_address,
      1030: window.config.subscription_cfx_address,
      1116: window.config.subscription_core_address,
      1329: window.config.subscription_sei_address,
      2040: window.config.subscription_vanar_address,
      8453: window.config.subscription_base_address,
      43114: window.config.subscription_newavax_address,
      169: window.config.subscription_manta_address,
      167000: window.config.subscription_taiko_address,
      1482601649: window.config.subscription_skale_address,
    };
    return addressMap[chainId] || window.config.subscription_cfx_address;
  };

  // Extract clean error message from transaction errors
  const extractErrorMessage = (error) => {
    const fullMessage = error?.reason || error?.message || error?.shortMessage || "";
    const match = fullMessage.match(/execution reverted: ([^"]+)/);
    return match ? match[1] : fullMessage || "Transaction failed";
  };

  // Unified error handler with timeout
  const handleTransactionError = (error, setters) => {
    const { setloadspinner, setloadspinnerSub, setapproveStatus, setstatus } = setters;
    const cleanReason = extractErrorMessage(error);
    
    if (setloadspinnerSub) setloadspinnerSub(false);
    if (setloadspinner) setloadspinner(false);
    setapproveStatus(setloadspinnerSub ? "failsubscribe" : "fail");
    setstatus(cleanReason);
    window.alertify.error(cleanReason);

    setTimeout(() => {
      if (setloadspinnerSub) setloadspinnerSub(false);
      if (setloadspinner) setloadspinner(false);
      setapproveStatus("initial");
      setstatus("");
    }, 5000);
  };

  // Get NFT contract configuration based on chainId
  const getNFTContractConfig = (chainId) => {
    const nftConfigs = {
      56: {
        address: window.config.nft_dypius_premium_address,
        abi: window.NFT_DYPIUS_PREMIUM_ABI,
        tokenId: nftPremium_tokenId,
        total: nftPremium_total,
        discount: discountPercentage,
        discountObject: nftDiscountObject,
      },
      88: {
        address: window.config.nft_dypius_premium_viction_address,
        abi: window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
        tokenId: nftPremium_tokenIdViction,
        total: nftPremium_totalViction,
        discount: discountPercentageViction,
        discountObject: nftDiscountObjectViction,
      },
      841: {
        address: window.config.nft_dypius_premium_taraxa_address,
        abi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
        tokenId: nftPremium_tokenIdTaraxa,
        total: nftPremium_totalTaraxa,
        discount: discountPercentageViction,
        discountObject: nftDiscountObjectTaraxa,
      },
      2040: {
        address: window.config.nft_dypius_premium_vanar_address,
        abi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
        tokenId: nftPremium_tokenIdVanar,
        total: nftPremium_totalVanar,
        discount: discountPercentageVanar,
        discountObject: nftDiscountObjectVanar,
      },
      167000: {
        address: window.config.nft_dypius_premium_taiko_address,
        abi: window.NFT_DYPIUS_PREMIUM_TAIKO_ABI,
        tokenId: nftPremium_tokenIdTaiko,
        total: nftPremium_totalTaiko,
        discount: discountPercentageTaiko,
        discountObject: nftDiscountObjectTaiko,
      },
      698: {
        address: window.config.nft_dypius_premium_mat_address,
        abi: window.NFT_DYPIUS_PREMIUM_MAT_ABI,
        tokenId: nftPremium_tokenIdMat,
        total: nftPremium_totalMat,
        discount: discountPercentageMat,
        discountObject: nftDiscountObjectMat,
      },
    };
    return nftConfigs[chainId] || null;
  };

  // Get subscription contract key based on chainId
  const getSubscriptionContractKey = (chainId) => {
    const keyMap = {
      1: "SUBSCRIPTION_NEWETH",
      56: "SUBSCRIPTION_NEWBNB2",
      43114: "SUBSCRIPTION_NEWAVAX",
      1030: "SUBSCRIPTION_CFX",
      8453: "SUBSCRIPTION_BASE",
      1482601649: "SUBSCRIPTION_SKALE",
      88: "SUBSCRIPTION_VICTION",
      2040: "SUBSCRIPTION_VANAR",
      169: "SUBSCRIPTION_MANTA",
      1116: "SUBSCRIPTION_CORE",
      1329: "SUBSCRIPTION_SEI",
      841: "SUBSCRIPTION_TARAXA",
      167000: "SUBSCRIPTION_TAIKO",
      698: "SUBSCRIPTION_MAT",
    };
    return keyMap[chainId] || "";
  };

  // ==================== MAIN FUNCTIONS ====================
  
  const handleApprove = async (e) => {
    // e.preventDefault();
    const subscribeAddress = getSubscribeAddressByChain(chainId);
    const nftConfig = getNFTContractConfig(chainId);
    const setters = { setloadspinner, setapproveStatus, setstatus, setisApproved };
    
    setloadspinner(true);

    try {
      // Handle NFT approval scenarios
      if (nftConfig && nftConfig.total > 0) {
        if (approveStatus === "initial") {
          await writeOnChain({
            address: nftConfig.address,
            abi: nftConfig.abi,
            functionName: "approve",
            args: [subscribeAddress, nftConfig.tokenId],
          });

          setloadspinner(false);
          setisApproved(true);
          
          // Determine next status based on discount and token type
          if (nftConfig.discount < 100) {
            const isNativeBNB = selectedSubscriptionToken.toLowerCase() === 
              "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase();
            setapproveStatus(isNativeBNB ? "deposit" : "approveAmount");
          } else {
            setapproveStatus("deposit");
          }
          return;
        }
        
        // Handle token approval after NFT approval
        if (approveStatus === "approveAmount") {
          await writeOnChain({
            address: selectedSubscriptionToken,
            abi: window.ERC20_ABI,
            functionName: "approve",
            args: [subscribeAddress, price],
          });

          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
          return;
        }
      }

      // Handle standard token approval (no NFT)
      await writeOnChain({
        address: selectedSubscriptionToken,
        abi: window.ERC20_ABI,
        functionName: "approve",
        args: [subscribeAddress, price],
      });

      setloadspinner(false);
      setisApproved(true);
      setapproveStatus("deposit");
      
    } catch (error) {
      handleTransactionError(error, setters);
    }
  };

  const handleCheckIfAlreadyApproved = async (token) => {
    const subscribeToken = token;

    const contractConfig = resolvePremiumContract(chainId, token);

    if (!contractConfig)
      throw new Error("Unsupported chain for chest contract.");
    const functionName = "getEstimatedTokenSubscriptionAmount";

    let tokenprice = await readOnChain({
      address: contractConfig.address,
      abi: contractConfig.abi,
      functionName: functionName,
      args: contractConfig.args,
    }).catch(() => 0);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

    if (coinbase) {
      const nftTotal = contractConfig.nftTotal;
      const nftTokenId = contractConfig.nftTokenId;
      if (contractConfig.args.length === 1 || nftTotal === 0) {
        let result = await readOnChain({
          address: subscribeToken,
          abi: window.ERC20_ABI,
          functionName: "allowance",
          args: [coinbase, contractConfig.address],
        }).catch(() => 0);
        if (
          token.toLowerCase() === window.config.native_bnb_address.toLowerCase()
        ) {
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result != 0 && Number(result) >= Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(true);
          setapproveStatus("deposit");
        } else if (result == 0 || Number(result) < Number(tokenprice)) {
          setloadspinner(false);
          setisApproved(false);
          setapproveStatus("initial");
        }
      } else if (contractConfig.args.length === 2) {
        if (
          contractConfig.nftAbi !== undefined &&
          contractConfig.nftAddress !== undefined
        ) {
          if (nftTotal > 0) {
            let approved = await readOnChain({
              address: contractConfig.nftAddress,
              abi: contractConfig.nftAbi,
              functionName: "getApproved",
              args: [nftTokenId],
            }).catch(() => "false");

            let approvedAll = await readOnChain({
              address: contractConfig.nftAddress,
              abi: contractConfig.nftAbi,
              functionName: "isApprovedForAll",
              args: [coinbase, contractConfig.address],
            }).catch(() => false);

            const isApproved =
              approved?.toLowerCase() ===
                contractConfig.address.toLowerCase() || approvedAll === true;
            if (isApproved) {
              if (contractConfig.discountPercentage === 100) {
                setisApproved(true);
                setapproveStatus("deposit");
              } else {
                setisApproved(true);
                setapproveStatus("approveAmount");
              }
            } else {
              setisApproved(false);
              setapproveStatus("initial");
            }

            setloadspinner(false);
            return;
          }
        }
      }
    }
  };


  const handleSubscribe = async (e) => {
    const nftConfig = getNFTContractConfig(chainId);
    const subscribeAddress = getSubscribeAddressByChain(chainId);
    const subscriptionAbiKey = getSubscriptionContractKey(chainId);
    const setters = { setloadspinnerSub, setloadspinner, setapproveStatus, setstatus };
    
    setloadspinnerSub(true);

    try {
      const isNativeBNB = selectedSubscriptionToken.toLowerCase() === 
        "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase();

      let functionName, args, value;

      // Determine which subscription function to call
      if (nftConfig && nftConfig.total > 0) {
        // Subscribe with NFT
        functionName = "subscribeNFT";
        args = [
          nftConfig.discountObject.nftAddress,
          nftConfig.tokenId,
          selectedSubscriptionToken,
          price,
        ];
        value = undefined;
      } else if (chainId === 56 && isNativeBNB) {
        // Subscribe with BNB
        functionName = "subscribeWithBNB";
        args = [];
        value = price;
      } else {
        // Standard token subscription
        functionName = "subscribe";
        args = [selectedSubscriptionToken, price];
        value = undefined;
      }

      // Execute subscription transaction
      await writeOnChain({
        address: subscribeAddress,
        abi: window[subscriptionAbiKey + "_ABI"],
        functionName,
        args,
        value,
      });

      // Handle success
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

    } catch (error) {
      handleTransactionError(error, setters);
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
        Object.keys(window.config.subscriptionsei_tokens)[0]
      );
      handleSubscriptionTokenChange(wseiAddress);
      handleCheckIfAlreadyApproved(wseiAddress);
    } else if (chainId === 841) {
      setChainDropdown(
        chainDropdowns.find((item) => {
          return item.chainId === chainId;
        })
      );
      setdropdownIcon("usdt");
      setdropdownTitle("usdt");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptiontaraxa_tokens)[0]
      );
      handleSubscriptionTokenChange(wtaraxaAddress);
      handleCheckIfAlreadyApproved(wtaraxaAddress);
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
    nftPremium_totalTaraxa,

    discountPercentage,
    discountPercentageViction,
    discountPercentageVanar,
    discountPercentageTaiko,
    discountPercentageMat,
    discountPercentageTaraxa,
    nftPremium_tokenId,
    nftPremium_tokenIdViction,
    nftPremium_tokenIdVanar,
    nftPremium_tokenIdTaiko,
    nftPremium_tokenIdMat,
    nftPremium_tokenIdTaraxa,
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
    } else if (chainId === 841 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptiontaraxa_tokens[selectedSubscriptionToken]
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

  useEffect(() => {
    if (statusPrime === "success" && coinbase) {
      onSuccessDeposit();
      handleUpdatePremiumUser(coinbase);
    }
  }, [statusPrime, coinbase]);

  return (
    <>
      <div className="custom-container mt-5 mt-lg-0">
        {isPremium ? (
          <div className="px-0 pt-5 position-relative">
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
          <div className="px-0 pt-5 position-relative">
            <div className="" style={{ background: "#8E97CD" }}></div>
            {discountPercentage > 0 ||
            discountPercentageViction > 0 ||
            discountPercentageVanar > 0 ||
            discountPercentageTaiko > 0 ||
            discountPercentageMat > 0 ||
            discountPercentageTaraxa > 0 ||
            nftPremium_total > 0 ||
            nftPremium_totalViction ||
            nftPremium_totalVanar ||
            nftPremium_totalTaiko > 0 ||
            nftPremium_totalMat > 0 ||
            nftPremium_totalTaraxa > 0 ? (
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
                          : discountPercentageTaraxa > 0
                          ? discountPercentageTaraxa
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
                      nftPremium_totalMat > 0 ||
                      nftPremium_totalTaraxa > 0) && (
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
                            : nftPremium_totalTaraxa > 0
                            ? nftDiscountObjectTaraxa.expiration * 1000
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
                                : nftPremium_totalTaraxa > 0
                                ? nftDiscountObjectTaraxa.expiration * 1000
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
                      discountPercentageMat == 100 ||
                      discountPercentageTaraxa == 100
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
                                : discountPercentageTaraxa > 0
                                ? discountPercentageTaraxa
                                : discountPercentage
                            ))}
                    </h6>
                    <h6 className="old-price-text">$100</h6>
                  </div>
                  {(nftPremium_total > 0 ||
                    nftPremium_totalViction > 0 ||
                    nftPremium_totalVanar > 0 ||
                    nftPremium_totalTaiko > 0 ||
                    nftPremium_totalMat > 0 ||
                    nftPremium_totalTaraxa > 0) && (
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
                          : nftPremium_totalTaraxa > 0
                          ? nftDiscountObjectTaraxa.expiration * 1000
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
                              : nftPremium_totalTaraxa > 0
                              ? nftDiscountObjectTaraxa.expiration * 1000
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
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={"https://cdn.worldofdypians.com/wod/taraxa.svg"}
                        alt=""
                        style={{ width: 18, height: 18 }}
                      />
                      <span className="subscription-chain mb-0">Taraxa</span>
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
            <div className="d-flex gap-2 flex-column flex-xl-row">
              <div className="d-flex flex-column w-100">
                <div className="mt-3 p-3 benefits-title-wrapper justify-content-center">
                  <h6 className="premium-benefits-popup-title mb-0">
                    Benefits
                  </h6>
                </div>
                <div className="sidebar-separator2 m-0"></div>
                <div className="premium-benefits-wrapper-std d-flex gap-3 justify-content-between p-3">
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
              <div className="mt-3 p-3 benefits-title-wrapper w-100 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column w-100">
                  <div className="pb-3 benefits-title-wrapper justify-content-center">
                    <h6 className="premium-benefits-popup-title mb-0">
                      SUBSCRIBE
                    </h6>
                  </div>
                  <div className="sidebar-separator2 m-0"></div>

                  <div className="premium-benefits-wrapper d-flex p-3 align-items-lg-center align-items-lg-end justify-content-between flex-column w-100 gap-4">
                    <div className="d-flex flex-column prime-subs-container w-100">
                      <div className="prime-subs-firsthalf p-3">
                        <div className="d-flex align-items-center gap-3 w-100 justify-content-between">
                          <div className="d-flex flex-column">
                            <h3 className="prime-subs-txt">
                              Prime Subscription
                            </h3>
                            <span className="prime-subs-desc">
                              Lifetime Plan
                            </span>
                          </div>
                          <h3 className="plan-cost2 mb-0">$100</h3>
                        </div>
                      </div>
                      <div className="prime-subs-secondhalf p-3">
                        <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
                          <span className="text-white w-100">
                            Payment Method
                          </span>
                          <div className="d-flex gap-2 align-items-center w-100">
                            <motion.div
                              // whileTap={{ scale: 0.98 }}
                              className={` flex w-100 min-w-122 items-center justify-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                                !binancePay
                                  ? "bg-gradient-to-r from-blue-500/40 to-blue-500/30 border-cyan-400/50 bordertw"
                                  : "bg-slate-800/50 bordertw border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                              }`}
                              onClick={() => setbinancePay(false)}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  style={{ height: 20 }}
                                  src={
                                    "https://cdn.worldofdypians.com/wod/walletRound.svg"
                                  }
                                  alt=""
                                />
                                <div>
                                  <p
                                    className={`text-base font-medium m-0 ${
                                      !binancePay
                                        ? "text-white"
                                        : "text-gray-200"
                                    }`}
                                  >
                                    Wallet
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                            <motion.div
                              // whileTap={{ scale: 0.98 }}
                              className={` w-100 min-w-122 flex items-center justify-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                                binancePay
                                  ? "bg-gradient-to-r from-blue-500/40 to-blue-500/30 border-cyan-400/50 bordertw"
                                  : "bg-slate-800/50 bordertw border-white/20 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                              }`}
                              onClick={() => setbinancePay(true)}
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  style={{ height: 20 }}
                                  src={
                                    "https://cdn.worldofdypians.com/wod/b-pay.svg"
                                  }
                                  alt=""
                                />
                                <div>
                                  <p
                                    className={`text-base font-medium m-0 ${
                                      binancePay
                                        ? "text-white"
                                        : "text-gray-200"
                                    }`}
                                  >
                                    Binance Pay
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {binancePay === false && (
                      <div className="border-0 prime-subs-container w-100 p-3">
                        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2">
                          <div className="d-flex flex-column gap-lg-3">
                            <span className="token-amount-placeholder2">
                              Select chain
                            </span>
                            <div className=" position relative">
                              <button
                                className={`btn launchpad-dropdown dropdown-toggle d-flex justify-content-between align-items-center`}
                                type="button"
                                // data-bs-toggle="dropdown"
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
                                {/* <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/launchpadIndicator.svg"
                                  }
                                  alt=""
                                /> */}
                              </button>
                            </div>
                          </div>
                          <div className="d-flex flex-column gap-lg-3">
                            <span className="token-amount-placeholder2">
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
                                        ? window.config
                                            .subscriptionviction_tokens
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
                                        : chainId === 841
                                        ? window.config
                                            .subscriptiontaraxa_tokens
                                        : chainId === 1329
                                        ? window.config.subscriptionsei_tokens
                                        : window.config.subscriptioneth_tokens
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
                                                : chainId === 43114
                                                ? window.config
                                                    .subscription_tokens[t]
                                                    ?.symbol
                                                : chainId === 8453
                                                ? window.config
                                                    .subscriptionbase_tokens[t]
                                                    ?.symbol
                                                : chainId === 1030
                                                ? window.config
                                                    .subscriptioncfx_tokens[t]
                                                    ?.symbol
                                                : chainId === 1482601649
                                                ? window.config
                                                    .subscriptionskale_tokens[t]
                                                    ?.symbol
                                                : chainId === 88
                                                ? window.config
                                                    .subscriptionviction_tokens[
                                                    t
                                                  ]?.symbol
                                                : chainId === 2040
                                                ? window.config
                                                    .subscriptionvanar_tokens[t]
                                                    ?.symbol
                                                : chainId === 169
                                                ? window.config
                                                    .subscriptionmanta_tokens[t]
                                                    ?.symbol
                                                : chainId === 167000
                                                ? window.config
                                                    .subscriptiontaiko_tokens[t]
                                                    ?.symbol
                                                : chainId === 698
                                                ? window.config
                                                    .subscriptionmat_tokens[t]
                                                    ?.symbol
                                                : chainId === 841
                                                ? window.config
                                                    .subscriptiontaraxa_tokens[
                                                    t
                                                  ]?.symbol
                                                : chainId === 1116
                                                ? window.config
                                                    .subscriptioncore_tokens[t]
                                                    ?.symbol
                                                : chainId === 1329
                                                ? window.config
                                                    .subscriptionsei_tokens[t]
                                                    ?.symbol
                                                : window.config
                                                    .subscriptioneth_tokens[t]
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
                                                : chainId === 43114
                                                ? window.config
                                                    .subscription_tokens[t]
                                                    ?.symbol
                                                : chainId === 8453
                                                ? window.config
                                                    .subscriptionbase_tokens[t]
                                                    ?.symbol
                                                : chainId === 1030
                                                ? window.config
                                                    .subscriptioncfx_tokens[t]
                                                    ?.symbol
                                                : chainId === 1482601649
                                                ? window.config
                                                    .subscriptionskale_tokens[t]
                                                    ?.symbol
                                                : chainId === 88
                                                ? window.config
                                                    .subscriptionviction_tokens[
                                                    t
                                                  ]?.symbol
                                                : chainId === 841
                                                ? window.config
                                                    .subscriptiontaraxa_tokens[
                                                    t
                                                  ]?.symbol
                                                : chainId === 2040
                                                ? window.config
                                                    .subscriptionvanar_tokens[t]
                                                    ?.symbol
                                                : chainId === 169
                                                ? window.config
                                                    .subscriptionmanta_tokens[t]
                                                    ?.symbol
                                                : chainId === 167000
                                                ? window.config
                                                    .subscriptiontaiko_tokens[t]
                                                    ?.symbol
                                                : chainId === 698
                                                ? window.config
                                                    .subscriptionmat_tokens[t]
                                                    ?.symbol
                                                : chainId === 1329
                                                ? window.config
                                                    .subscriptionsei_tokens[t]
                                                    ?.symbol
                                                : chainId === 1116
                                                ? window.config
                                                    .subscriptionsei_tokens[t]
                                                    ?.symbol
                                                : window.config
                                                    .subscriptioneth_tokens[t]
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
                                              : chainId === 841
                                              ? `https://cdn.worldofdypians.com/wod/${window.config.subscriptiontaraxa_tokens[
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
                                          ? window.config
                                              .subscriptioneth_tokens[t]?.symbol
                                          : chainId === 56
                                          ? window.config
                                              .subscriptionbnb_tokens[t]?.symbol
                                          : chainId === 43114
                                          ? window.config.subscription_tokens[t]
                                              ?.symbol
                                          : chainId === 1030
                                          ? window.config
                                              .subscriptioncfx_tokens[t]?.symbol
                                          : chainId === 8453
                                          ? window.config
                                              .subscriptionbase_tokens[t]
                                              ?.symbol
                                          : chainId === 1482601649
                                          ? window.config
                                              .subscriptionskale_tokens[t]
                                              ?.symbol
                                          : chainId === 1116
                                          ? window.config
                                              .subscriptioncore_tokens[t]
                                              ?.symbol
                                          : chainId === 88
                                          ? window.config
                                              .subscriptionviction_tokens[t]
                                              ?.symbol
                                          : chainId === 2040
                                          ? window.config
                                              .subscriptionvanar_tokens[t]
                                              ?.symbol
                                          : chainId === 169
                                          ? window.config
                                              .subscriptionmanta_tokens[t]
                                              ?.symbol
                                          : chainId === 167000
                                          ? window.config
                                              .subscriptiontaiko_tokens[t]
                                              ?.symbol
                                          : chainId === 698
                                          ? window.config
                                              .subscriptionmat_tokens[t]?.symbol
                                          : chainId === 841
                                          ? window.config
                                              .subscriptiontaraxa_tokens[t]
                                              ?.symbol
                                          : chainId === 1329
                                          ? window.config
                                              .subscriptionsei_tokens[t]?.symbol
                                          : window.config
                                              .subscriptioneth_tokens[t]
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
                                      : discountPercentageTaraxa != 0
                                      ? discountPercentageTaraxa
                                      : discountPercentage
                                  )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {isConnected && discountPercentage > 0 && chainId === 56 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    {binancePay === false ? (
                      <>
                        <button
                          className={`btn ${
                            approveStatus === "fail" || !coinbase || !isEOA
                              ? "stake-wod-btn-inactive px-4"
                              : isApproved
                              ? "d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                          ) : loadspinner === false &&
                            approveStatus === "fail" ? (
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
                              ? "stake-wod-btn-inactive px-4 d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                      </>
                    ) : binancePay === true &&
                      window.WALLET_TYPE === "binance" ? (
                      <button
                        className={`btn ${"explore-btn px-3 py-2"}`}
                        disabled={
                          statusPrime !== "idle" &&
                          statusPrime !== "failed" &&
                          statusPrime !== "success"
                        }
                        onClick={() => {
                          handlePurchasePremium(coinbase, price);
                        }}
                      >
                        {buttonText}
                      </button>
                    ) : binancePay === true &&
                      window.WALLET_TYPE !== "binance" ? (
                      <div className="w-100 relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit overflow-hidden">
                        {/* Background image */}

                        {/* Glow effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                        ></div>

                        <div className="relative">
                          <div className="d-flex flex-column gap-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                                alt=""
                                className="w-5 h-5 text-yellow-400"
                              />
                              <span className="font-medium text-yellow-400">
                                Binance Pay Setup
                              </span>
                            </div>
                            <span className="challenge-popup-desc text-white">
                              Import your game wallet into Binance Wallet app or
                              connect your existing Binance Wallet.
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                ) : isConnected &&
                  discountPercentageViction > 0 &&
                  chainId === 88 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    {binancePay === false ? (
                      <>
                        <button
                          className={`btn ${
                            approveStatus === "fail" || !coinbase || !isEOA
                              ? "stake-wod-btn-inactive px-4"
                              : isApproved
                              ? "d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                          ) : loadspinner === false &&
                            approveStatus === "fail" ? (
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
                              ? "stake-wod-btn-inactive px-4 d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                      </>
                    ) : binancePay === true &&
                      window.WALLET_TYPE === "binance" ? (
                      <button
                        className={`btn ${"explore-btn px-3 py-2"}`}
                        disabled={
                          statusPrime !== "idle" &&
                          statusPrime !== "failed" &&
                          statusPrime !== "success"
                        }
                        onClick={() => {
                          handlePurchasePremium(coinbase, price);
                        }}
                      >
                        {buttonText}
                      </button>
                    ) : binancePay === true &&
                      window.WALLET_TYPE !== "binance" ? (
                      <div className="w-100 relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit overflow-hidden">
                        {/* Background image */}

                        {/* Glow effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                        ></div>

                        <div className="relative">
                          <div className="d-flex flex-column gap-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                                alt=""
                                className="w-5 h-5 text-yellow-400"
                              />
                              <span className="font-medium text-yellow-400">
                                Binance Pay Setup
                              </span>
                            </div>
                            <span className="challenge-popup-desc text-white">
                              Import your game wallet into Binance Wallet app or
                              connect your existing Binance Wallet.
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                ) : isConnected &&
                  discountPercentageTaraxa > 0 &&
                  chainId === 841 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    {binancePay === false ? (
                      <>
                        <button
                          className={`btn ${
                            approveStatus === "fail" || !coinbase
                              ? "stake-wod-btn-inactive px-4"
                              : isApproved
                              ? "d-none"
                              : "explore-btn px-3 py-2"
                          }`}
                          disabled={
                            approveStatus === "fail" || !coinbase || isApproved
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
                                : nftPremium_totalTaraxa > 0
                                ? "NFT"
                                : ""}
                            </>
                          ) : loadspinner === false &&
                            approveStatus === "fail" ? (
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
                            isApproved === false
                              ? "stake-wod-btn-inactive px-4 d-none"
                              : "explore-btn px-3 py-2"
                          } `}
                          onClick={() => handleSubscribe()}
                        >
                          {loadspinnerSub === false &&
                          (approveStatus === "initial" ||
                            approveStatus === "fail" ||
                            approveStatus === "deposit") ? (
                            <>
                              {discountPercentageTaraxa > 0 ||
                              nftPremium_totalTaraxa > 0
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
                      </>
                    ) : binancePay === true &&
                      window.WALLET_TYPE === "binance" ? (
                      <button
                        className={`btn ${"explore-btn px-3 py-2"}`}
                        disabled={
                          statusPrime !== "idle" &&
                          statusPrime !== "failed" &&
                          statusPrime !== "success"
                        }
                        onClick={() => {
                          handlePurchasePremium(coinbase, price);
                        }}
                      >
                        {buttonText}
                      </button>
                    ) : binancePay === true &&
                      window.WALLET_TYPE !== "binance" ? (
                      <div className="w-100 relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit overflow-hidden">
                        {/* Background image */}

                        {/* Glow effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                        ></div>

                        <div className="relative">
                          <div className="d-flex flex-column gap-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                                alt=""
                                className="w-5 h-5 text-yellow-400"
                              />
                              <span className="font-medium text-yellow-400">
                                Binance Pay Setup
                              </span>
                            </div>
                            <span className="challenge-popup-desc text-white">
                              Import your game wallet into Binance Wallet app or
                              connect your existing Binance Wallet.
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                ) : isConnected &&
                  discountPercentageVanar > 0 &&
                  chainId === 2040 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    {binancePay === false ? (
                      <>
                        <button
                          className={`btn ${
                            approveStatus === "fail" || !coinbase || !isEOA
                              ? "stake-wod-btn-inactive px-4"
                              : isApproved
                              ? "d-none"
                              : "explore-btn px-3 py-2"
                          } `}
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
                          ) : loadspinner === false &&
                            approveStatus === "fail" ? (
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
                              ? "stake-wod-btn-inactive px-4 d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                      </>
                    ) : binancePay === true &&
                      window.WALLET_TYPE === "binance" ? (
                      <button
                        className={`btn ${"explore-btn px-3 py-2"}`}
                        disabled={
                          statusPrime !== "idle" &&
                          statusPrime !== "failed" &&
                          statusPrime !== "success"
                        }
                        onClick={() => {
                          handlePurchasePremium(coinbase, price);
                        }}
                      >
                        {buttonText}
                      </button>
                    ) : binancePay === true &&
                      window.WALLET_TYPE !== "binance" ? (
                      <div className="w-100 relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit overflow-hidden">
                        {/* Background image */}

                        {/* Glow effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                        ></div>

                        <div className="relative">
                          <div className="d-flex flex-column gap-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                                alt=""
                                className="w-5 h-5 text-yellow-400"
                              />
                              <span className="font-medium text-yellow-400">
                                Binance Pay Setup
                              </span>
                            </div>
                            <span className="challenge-popup-desc text-white">
                              Import your game wallet into Binance Wallet app or
                              connect your existing Binance Wallet.
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                ) : isConnected &&
                  discountPercentageTaiko > 0 &&
                  chainId === 167000 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    {binancePay === false ? (
                      <>
                        <button
                          className={`btn ${
                            approveStatus === "fail" || !coinbase || !isEOA
                              ? "stake-wod-btn-inactive px-4"
                              : isApproved
                              ? "d-none"
                              : "explore-btn px-3 py-2"
                          } `}
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
                          ) : loadspinner === false &&
                            approveStatus === "fail" ? (
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
                              ? "stake-wod-btn-inactive px-4 d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                      </>
                    ) : binancePay === true &&
                      window.WALLET_TYPE === "binance" ? (
                      <button
                        className={`btn ${"explore-btn px-3 py-2"}`}
                        disabled={
                          statusPrime !== "idle" &&
                          statusPrime !== "failed" &&
                          statusPrime !== "success"
                        }
                        onClick={() => {
                          handlePurchasePremium(coinbase, price);
                        }}
                      >
                        {buttonText}
                      </button>
                    ) : binancePay === true &&
                      window.WALLET_TYPE !== "binance" ? (
                      <div className="w-100 relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit overflow-hidden">
                        {/* Background image */}

                        {/* Glow effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                        ></div>

                        <div className="relative">
                          <div className="d-flex flex-column gap-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                                alt=""
                                className="w-5 h-5 text-yellow-400"
                              />
                              <span className="font-medium text-yellow-400">
                                Binance Pay Setup
                              </span>
                            </div>
                            <span className="challenge-popup-desc text-white">
                              Import your game wallet into Binance Wallet app or
                              connect your existing Binance Wallet.
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                ) : isConnected &&
                  discountPercentageMat > 0 &&
                  chainId === 698 ? (
                  <div className="d-flex align-items-center gap-3 justify-content-center">
                    {binancePay === false ? (
                      <>
                        <button
                          className={`btn ${
                            approveStatus === "fail" || !coinbase || !isEOA
                              ? "stake-wod-btn-inactive px-4"
                              : isApproved
                              ? "d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                          ) : loadspinner === false &&
                            approveStatus === "fail" ? (
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
                              ? "stake-wod-btn-inactive px-4 d-none"
                              : "explore-btn px-3 py-2"
                          } `}
                          onClick={() => handleSubscribe()}
                        >
                          {loadspinnerSub === false &&
                          (approveStatus === "initial" ||
                            approveStatus === "fail" ||
                            approveStatus === "deposit") ? (
                            <>
                              {discountPercentageMat > 0 ||
                              nftPremium_totalMat > 0
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
                      </>
                    ) : binancePay === true &&
                      window.WALLET_TYPE === "binance" ? (
                      <button
                        className={`btn ${"explore-btn px-3 py-2"}`}
                        disabled={
                          statusPrime !== "idle" &&
                          statusPrime !== "failed" &&
                          statusPrime !== "success"
                        }
                        onClick={() => {
                          handlePurchasePremium(coinbase, price);
                        }}
                      >
                        {buttonText}
                      </button>
                    ) : binancePay === true &&
                      window.WALLET_TYPE !== "binance" ? (
                      <div className="w-100 relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit overflow-hidden">
                        {/* Background image */}

                        {/* Glow effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                        ></div>

                        <div className="relative">
                          <div className="d-flex flex-column gap-2">
                            <div className="flex items-center space-x-3">
                              <img
                                src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                                alt=""
                                className="w-5 h-5 text-yellow-400"
                              />
                              <span className="font-medium text-yellow-400">
                                Binance Pay Setup
                              </span>
                            </div>
                            <span className="challenge-popup-desc text-white">
                              Import your game wallet into Binance Wallet app or
                              connect your existing Binance Wallet.
                            </span>
                          </div>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                ) : isConnected && discountPercentage > 0 && chainId !== 56 ? (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 reverse-btn px-3 py-2 align-items-center"
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
                      className="d-flex gap-2 reverse-btn px-3 py-2 align-items-center"
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
                  discountPercentageTaraxa > 0 &&
                  chainId !== 841 ? (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 reverse-btn px-3 py-2 align-items-center"
                      onClick={() => {
                        switchNetwork("0x349", 841);
                      }}
                      style={{
                        width: "fit-content",
                        whiteSpace: "nowrap",
                        fontSize: 14,
                      }}
                    >
                      Switch to Taraxa
                    </button>
                  </div>
                ) : isConnected &&
                  discountPercentageVanar > 0 &&
                  chainId !== 2040 ? (
                  <div
                    className={`d-flex align-items-center justify-content-center mb-2`}
                  >
                    <button
                      className="d-flex gap-2 reverse-btn px-3 py-2 align-items-center"
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
                      className="d-flex gap-2 reverse-btn px-3 py-2 align-items-center"
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
                      className="d-flex gap-2 reverse-btn px-3 py-2 align-items-center"
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
                  <div className="d-flex align-items-center gap-3 justify-content-center w-100">
                    <>
                      {window.WALLET_TYPE !== "binance" &&
                        binancePay === true && (
                          <div className="w-100 relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 bordertw border-white/20 hover:border-white/40 transition-all duration-500  h-fit overflow-hidden">
                            {/* Background image */}

                            {/* Glow effect */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl`}
                            ></div>

                            <div className="relative">
                              <div className="d-flex flex-column gap-2">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                                    alt=""
                                    className="w-5 h-5 text-yellow-400"
                                  />
                                  <span className="font-medium text-yellow-400">
                                    Binance Pay Setup
                                  </span>
                                </div>
                                <span className="challenge-popup-desc text-white">
                                  Import your game wallet into Binance Wallet
                                  app or connect your existing Binance Wallet.
                                </span>
                              </div>
                            </div>
                            <div
                              className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 animate-pulse`}
                            ></div>
                          </div>
                        )}
                    </>
                    {binancePay === true &&
                      window.WALLET_TYPE === "binance" && (
                        <button
                          className={`btn ${"explore-btn px-3 py-2"}`}
                          disabled={
                            statusPrime !== "idle" &&
                            statusPrime !== "failed" &&
                            statusPrime !== "success"
                          }
                          onClick={() => {
                            handlePurchasePremium(coinbase, price);
                          }}
                        >
                          {buttonText}
                        </button>
                      )}

                    {binancePay === false && (
                      <>
                        <button
                          className={`btn ${
                            approveStatus === "fail" || !isEOA || !coinbase
                              ? "stake-wod-btn-inactive px-4"
                              : isApproved
                              ? "d-none"
                              : "explore-btn px-3 py-2"
                          }`}
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
                          ) : loadspinner === false &&
                            approveStatus === "fail" ? (
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
                              ? "stake-wod-btn-inactive px-4 d-none"
                              : "explore-btn px-3 py-2"
                          }`}
                          disabled={
                            approveStatus === "fail" ||
                            !coinbase ||
                            !isApproved ||
                            !isEOA
                              ? true
                              : false
                          }
                          onClick={() => {
                            handleSubscribe();
                          }}
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
                      </>
                    )}

                    {/* {window.WALLET_TYPE === "binance" && (
                      <div>
                        <button
                          onClick={() => handlePurchasePremium(coinbase, price)}
                          className="bg-yellow-400 text-black px-6 py-2 font-semibold rounded-lg hover:bg-yellow-300 transition d-flex align-items-center gap-2"
                          disabled={
                            approveStatus === "fail" ||
                            !coinbase ||
                            !isApproved ||
                            !isEOA
                          }
                        >
                          <img
                            style={{ height: 18 }}
                            src={"https://cdn.worldofdypians.com/wod/b-pay.svg"}
                            alt=""
                          />
                          {buttonText}
                        </button>
                      </div>
                    )} */}
                  </div>
                )}

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

                  {isConnected && coinbase && !isEOA && (
                    <span className="text-danger">
                      Smart contract wallets are not supported for this action.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* <hr className="form-divider my-4" /> */}
          </div>
        )}
      </div>
      <QRComponent />
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
