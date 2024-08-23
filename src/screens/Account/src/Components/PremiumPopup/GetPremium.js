import React, { useState, useEffect } from "react";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import launchpadIndicator from "../../Images/premium/launchpadIndicator.svg";
import dappsIcon from "../../Images/premium/dappsIcon.svg";
import metaverseIcon from "../../Images/premium/metaverseIcon.svg";
import greenCheck from "../../Images/premium/greenCheck.svg";
import premiumIcon from "../../Images/premium/premiumIcon.svg";
import Web3 from "web3";
import skaleIcon from "../../../../../components/NewDailyBonus/assets/skaleIcon.svg";
import baseLogo from "../../Components/WalletBalance/assets/baseLogo.svg";
import { handleSwitchNetworkhook } from "../../../../../hooks/hooks";
import xMark from "../../Components/WalletBalance/newAssets/xMark.svg";
import conflux from "../../Components/WalletBalance/assets/conflux.svg";
import coreIcon from "../../Components/WalletBalance/assets/coreLogo.svg";
import vicitonIcon from "../../Components/WalletBalance/assets/victionLogo.svg";

import axios from "axios";
import premiumRedTag from "../../../../../assets/redPremiumTag.svg";

const GetPremiumPopup = ({
  coinbase,
  chainId,
  onClose,
  handleSwitchNetwork,
  onSuccessDeposit,
}) => {
  const chainDropdowns = [
    {
      name: "Ethereum",
      symbol: "eth",
    },
    {
      name: "BNB Chain",
      symbol: "bnb",
    },
    {
      name: "Avalanche",
      symbol: "wavax",
    },
    {
      name: "Conflux",
      symbol: "conflux",
    },
    {
      name: "Base",
      symbol: "base",
    },
    {
      name: "SKALE",
      symbol: "skale",
    },
    {
      name: "CORE",
      symbol: "core",
    },
    {
      name: "Viction",
      symbol: "viction",
    },
    {
      name: "Manta",
      symbol: "manta",
    },
    {
      name: "Taiko",
      symbol: "taiko",
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
  let wcoreAddress = "0x900101d06a7426441ae63e9ab3b9b0f63be145f1";
  let wmantaddress = "0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f";
  let wtaikoddress = "0x2DEF195713CF4a606B49D07E520e22C17899a736";


  const metaverseBenefits = [
    "Exclusive access to World of Dypians",
    "Access to Daily Bonus Event",
    "Access every Treasure Hunt Event without the need to hold a Beta Pass NFT",
    "Early access to upcoming features and updates",
  ];

  const dappsBenefits = [
    "DYP Tools administrative dashboard",
    "Voting capabilities in the News section",
    "Priority access to dedicated DeFi pools",
    "Early access to upcoming features and updates",
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
  const [discountPercentage, setdiscountPercentage] = useState(0);
  const [nftPremium_tokenId, setnftPremium_tokenId] = useState(0);
  const [nftPremium_total, setnftPremium_total] = useState(0);
  const [nftDiscountObject, setnftDiscountObject] = useState([]);

  const [discountPercentageViction, setdiscountPercentageViction] = useState(0);
  const [nftPremium_tokenIdViction, setnftPremium_tokenIdViction] = useState(0);
  const [nftPremium_totalViction, setnftPremium_totalViction] = useState(0);
  const [nftDiscountObjectViction, setnftDiscountObjectViction] = useState([]);

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

    const nftContract = new window.bscWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_ABI,
      window.config.nft_dypius_premium_address
    );

    const nftContract_viction = new window.victionWeb3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
      window.config.nft_dypius_premium_viction_address
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
      } else {
        setnftPremium_tokenId(0);
        setnftPremium_total(0);
        setnftPremium_tokenIdViction(0);
        setnftPremium_totalViction(0);
        if (discount) {
          setdiscountPercentage(parseInt(discount));
        } else if (discount_viction) {
          setdiscountPercentageViction(parseInt(discount_viction));
        }
      }
    } else {
      setnftPremium_tokenId(0);
      setnftPremium_total(0);
      setnftPremium_tokenIdViction(0);
      setnftPremium_totalViction(0);
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

  const handleEthPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x1")
          .then(() => {
            handleSwitchNetwork(1);
            setChainDropdown(chainDropdowns[0]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleBnbPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x38")
          .then(() => {
            handleSwitchNetwork(56);
            setChainDropdown(chainDropdowns[1]);
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
            setChainDropdown(chainDropdowns[2]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleMantaPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0xa9")
          .then(() => {
            handleSwitchNetwork(169);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleTaikoPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x28c58")
          .then(() => {
            handleSwitchNetwork(167000);
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
    if (!window.gatewallet) {
      await handleSwitchNetworkhook("0x2105")
        .then(() => {
          handleSwitchNetwork(8453);
          setChainDropdown(chainDropdowns[4]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleConfluxPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x406")
          .then(() => {
            handleSwitchNetwork(1030);
            setChainDropdown(chainDropdowns[3]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleSkalePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x585eb4b1")
          .then(() => {
            handleSwitchNetwork(1482601649);
            setChainDropdown(chainDropdowns[5]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleCorePool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x45c")
          .then(() => {
            handleSwitchNetwork(1116);
            setChainDropdown(chainDropdowns[6]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
    }
  };

  const handleVictionPool = async () => {
    if (window.ethereum) {
      if (!window.gatewallet) {
        await handleSwitchNetworkhook("0x58")
          .then(() => {
            handleSwitchNetwork(88);
            setChainDropdown(chainDropdowns[7]);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      window.alertify.error("No web3 detected. Please install Metamask!");
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
        : chainId === 713715
        ? window.config.subscriptionsei_tokens[token]?.decimals
        : chainId === 88
        ? window.config.subscriptionviction_tokens[token]?.decimals
        : chainId === 169
        ? window.config.subscriptionmanta_tokens[token]?.decimals
        : chainId === 167000
        ? window.config.subscriptiontaiko_tokens[token]?.decimals
        : window.config.subscriptioncfx_tokens[token]?.decimals;
    setprice("");
    setformattedPrice("");
    setTokenBalance("");
    setselectedSubscriptionToken(token);

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
        : chainId === 169
        ? await window.getEstimatedTokenSubscriptionAmountManta(token)
        : chainId === 167000
        ? await window.getEstimatedTokenSubscriptionAmountTaiko(token)
        : chainId === 713715
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

    tokenprice = new BigNumber(tokenprice).toFixed(0);

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
    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const cfxsubscribeAddress = window.config.subscription_cfx_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb2_address;

    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;
    const seisubscribeAddress = window.config.subscription_sei_address;
    const victionsubscribeAddress = window.config.subscription_viction_address;
    const mantasubscribeAddress = window.config.subscription_manta_address;
    const taikosubscribeAddress = window.config.subscription_taiko_address;

    const coresubscribeAddress = window.config.subscription_core_address;

    const web3 = new Web3(window.ethereum);

    let tokenContract = new web3.eth.Contract(
      window.ERC20_ABI,
      selectedSubscriptionToken
    );
    setloadspinner(true);

    let nftContract = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_ABI,
      window.config.nft_dypius_premium_address
    );

    let nftContract_viction = new window.web3.eth.Contract(
      window.NFT_DYPIUS_PREMIUM_VICTION_ABI,
      window.config.nft_dypius_premium_viction_address
    );

    if (chainId === 56 && nftPremium_total > 0) {
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
    }
    if (chainId === 88 && nftPremium_totalViction > 0) {
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
    } else {
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
            : chainId === 169
            ? mantasubscribeAddress
            : chainId === 167000
            ? taikosubscribeAddress
            : chainId === 1116
            ? coresubscribeAddress
            : chainId === 713715
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
    const mantaWeb3 = new Web3(window.config.manta_endpoint);
    const taikoWeb3 = new Web3(window.config.taiko_endpoint);

    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const confluxsubscribeAddress = window.config.subscription_cfx_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb2_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const basesubscribeAddress = window.config.subscription_base_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;
    const seisubscribeAddress = window.config.subscription_sei_address;
    const coresubscribeAddress = window.config.subscription_core_address;
    const victionsubscribeAddress = window.config.subscription_viction_address;
    const mantasubscribeAddress = window.config.subscription_manta_address;
    const taikosubscribeAddress = window.config.subscription_taiko_address;

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

    const subscribeTokencontractmanta = new mantaWeb3.eth.Contract(
      window.ERC20_ABI,
      subscribeToken
    );
    const subscribeTokencontracttaiko = new taikoWeb3.eth.Contract(
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
        : chainId === 169
        ? await window.getEstimatedTokenSubscriptionAmountManta(token)
        : chainId === 167000
        ? await window.getEstimatedTokenSubscriptionAmountTaiko(token)
        : chainId === 1116
        ? await window.getEstimatedTokenSubscriptionAmountCore(token)
        : chainId === 713715
        ? await window.getEstimatedTokenSubscriptionAmountSei(token)
        : await window.getEstimatedTokenSubscriptionAmount(token);

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
      } else if (chainId === 167000) {
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
      } else if (chainId === 713715) {
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
              (approved.toLowerCase() === victionsubscribeAddress.toLowerCase()) ||
              approvedAll === true
            ) {
           
              if(discountPercentageViction === 100) {
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
  };

  const handleSubscribe = async (e) => {
    // e.preventDefault();
    let subscriptionContract = await window.getContract({
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
          : chainId === 169
          ? "SUBSCRIPTION_MANTA"
          : chainId === 167000
          ? "SUBSCRIPTION_TAIKO"
          : chainId === 1116
          ? "SUBSCRIPTION_CORE"
          : chainId === 713715
          ? "SUBSCRIPTION_SKALE"
          : "",
    });

    setloadspinnerSub(true);
    if (chainId === 56 && nftPremium_total > 0) {
      await window
        .subscribeNFT(
          nftDiscountObject.nftAddress,
          nftPremium_tokenId,
          selectedSubscriptionToken,
          price
        )
        .then(async (data) => {
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
        })
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
    } else if (
      chainId === 56 &&
      selectedSubscriptionToken.toLowerCase() ===
        "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c".toLowerCase()
    ) {
      await subscriptionContract.methods
        .subscribeWithBNB()
        .send({ from: await window.getCoinbase(), value: price })
        .then(async (data) => {
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
        })
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
    } else if (chainId === 88 && nftPremium_totalViction > 0) {
      await window
        .subscribeNFTViction(
          nftDiscountObjectViction.nftAddress,
          nftPremium_tokenIdViction,
          selectedSubscriptionToken,
          price
        )
        .then(async (data) => {
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
        })
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
    } else {
      await subscriptionContract.methods
        .subscribe(selectedSubscriptionToken, price)
        .send({ from: await window.getCoinbase() })
        .then((data) => {
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
        })
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
    }
  };

  useEffect(() => {
    if (chainId === 1) {
      setChainDropdown(chainDropdowns[0]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    } else if (chainId === 56) {
      setChainDropdown(chainDropdowns[1]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbnb_tokens)[0]
      );
      handleSubscriptionTokenChange(wbnbAddress);
      handleCheckIfAlreadyApproved(wbnbAddress);
    } else if (chainId === 1030) {
      setChainDropdown(chainDropdowns[3]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncfx_tokens)[0]
      );
      handleSubscriptionTokenChange(wcfx);
      handleCheckIfAlreadyApproved(wcfx);
    } else if (chainId === 8453) {
      setChainDropdown(chainDropdowns[4]);
      setdropdownIcon("weth");
      setdropdownTitle("WETH");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionbase_tokens)[0]
      );
      handleSubscriptionTokenChange(wbase);
      handleCheckIfAlreadyApproved(wbase);
    } else if (chainId === 43114) {
      setChainDropdown(chainDropdowns[2]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscription_tokens)[0]
      );
      handleSubscriptionTokenChange(wavaxAddress);
    } else if (chainId === 1482601649) {
      setChainDropdown(chainDropdowns[5]);
      setdropdownIcon("usdc");
      setdropdownTitle("USDC");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionskale_tokens)[0]
      );
      handleSubscriptionTokenChange(wskaleAddress);
    } else if (chainId === 88) {
      setChainDropdown(chainDropdowns[7]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionviction_tokens)[0]
      );
      handleSubscriptionTokenChange(wvictionAddress);
      handleCheckIfAlreadyApproved(wvictionAddress);
    } else if (chainId === 169) {
      setChainDropdown(chainDropdowns[8]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptionmanta_tokens)[0]
      );
      handleSubscriptionTokenChange(wmantaddress);
      handleCheckIfAlreadyApproved(wmantaddress);
    } else if (chainId === 167000) {
      setChainDropdown(chainDropdowns[9]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptiontaiko_tokens)[0]
      );
      handleSubscriptionTokenChange(wtaikoddress);
      handleCheckIfAlreadyApproved(wtaikoddress);
    } else if (chainId === 1116) {
      setChainDropdown(chainDropdowns[6]);
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioncore_tokens)[0]
      );
      handleSubscriptionTokenChange(wcoreAddress);
      handleCheckIfAlreadyApproved(wcoreAddress);
    }
    //else if (chainId === 713715) {
    //   setChainDropdown(chainDropdowns[8]);
    //   setdropdownIcon("usdt");
    //   setdropdownTitle("usdt");
    //   setselectedSubscriptionToken(
    //     Object.keys(window.config.subscriptionsei_tokens)[0]
    //   );
    //   handleSubscriptionTokenChange(wseiAddress);
    //   handleCheckIfAlreadyApproved(wseiAddress);
    // }
    else {
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
    }
  }, [chainId, nftPremium_total, nftPremium_totalViction, discountPercentage, discountPercentageViction, nftPremium_tokenId, nftPremium_tokenIdViction]);

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
    }
  }, [chainId, selectedSubscriptionToken]);

  useEffect(() => {
    calculatePremiumDiscount(coinbase);
  }, [chainId, coinbase]);

  return (
    <div
      className="popup-wrapper popup-active p-4"
      id="subscribe"
      style={{ width: "40%", pointerEvents: "auto" }}
    >
      <div className="subscribe-container p-2 position-relative">
        <div className="" style={{ background: "#8E97CD" }}></div>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="free-plan-title">Premium Subscription</h6>
          <img
            src={xMark}
            onClick={onClose}
            alt=""
            style={{ cursor: "pointer" }}
          />
        </div>
        {(discountPercentage > 0 || discountPercentageViction > 0) || (nftPremium_total > 0 || nftPremium_totalViction > 0) ? (
           <div className="premium-discount-bg mt-3 p-4 position-relative">
           <div className="premiumRedTag position-absolute">
             <div className="position-relative d-flex flex-column">
               <img src={premiumRedTag} alt="" />
               <div className="d-flex flex-column position-absolute discountwrap">
                 <span className="discount-price2 font-oxanium">
                   {discountPercentage}%
                 </span>
                 <span className="discount-price-bottom">
                   Discount
                 </span>
               </div>
             </div>
           </div>
           <div className="d-flex flex-row gap-2 gap-lg-0 justify-content-between mt-2 mt-lg-0 justify-content-lg-start flex-lg-column flex-md-column flex-sm-column align-items-center align-items-lg-start align-items-md-start align-items-sm-start">
             <div className="d-flex flex-column">
               <h6 className="lifetime-plan-text m-0">
                 Lifetime plan
               </h6>
               {nftPremium_total > 0 ||
                 (nftPremium_totalViction > 0 && (
                   <h6 className="token-amount-placeholder m-0 d-block d-lg-none d-md-none d-sm-none">
                     Valid until:{" "}
                     {new Date(
                       nftPremium_total > 0
                         ? nftDiscountObject.expiration *
                           1000
                         : nftDiscountObjectViction.expiration *
                           1000
                     )
                       .toDateString()
                       .slice(
                         3,
                         new Date(
                           nftPremium_total > 0
                             ? nftDiscountObject.expiration *
                               1000
                             : nftDiscountObjectViction.expiration *
                               1000
                         ).toDateString().length
                       )}
                   </h6>
                 ))}
             </div>
             <div className="d-flex align-items-end gap-2">
               <h6 className="discount-price">
                 {discountPercentage == 100 ||
                 discountPercentageViction == 100
                   ? "FREE"
                   : "$" +
                     (100 -
                       Number(
                         discountPercentage > 0
                           ? discountPercentage
                           : discountPercentageViction > 0
                           ? discountPercentageViction
                           : discountPercentage
                       ))}
               </h6>
               <h6 className="old-price-text">$100</h6>
             </div>
             {nftPremium_total > 0 ||
               (nftPremium_totalViction > 0 && (
                 <h6 className="token-amount-placeholder m-0 premium-custom-text">
                   Valid until:{" "}
                   {new Date(
                     nftPremium_total > 0
                       ? nftDiscountObject.expiration *
                         1000
                       : nftDiscountObjectViction.expiration *
                         1000
                   )
                     .toDateString()
                     .slice(
                       3,
                       new Date(
                         nftPremium_total > 0
                           ? nftDiscountObject.expiration *
                             1000
                           : nftDiscountObjectViction.expiration *
                             1000
                       ).toDateString().length
                     )}
                 </h6>
               ))}
           </div>
         </div>
        ) : (
          <div className="premium-gold-bg d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
            <div className="d-flex flex-column gap-2">
              <span className="lifetime-plan mb-0">Lifetime plan</span>
              <h6 className="plan-cost mb-0">$100</h6>
            </div>
            <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
              <div className="premium-chains-wrapper">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={
                      require(`../../Images/premium/tokens/ethIcon.svg`).default
                    }
                    style={{ width: 18, height: 18 }}
                    alt=""
                  />
                  <span className="subscription-chain mb-0">Ethereum</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={
                      require(`../../Images/premium/tokens/wbnbIcon.svg`)
                        .default
                    }
                    style={{ width: 18, height: 18 }}
                    alt=""
                  />
                  <span className="subscription-chain mb-0">BNB Chain</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <img
                    src={require(`../../../../../components/Header/assets/manta.png`)}
                    alt=""
                    style={{ width: 18, height: 18 }}
                  />
                  <span className="subscription-chain mb-0">Manta</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={require(`../../../../../components/Header/assets/taiko.svg`).default}
                    alt=""
                    style={{ width: 18, height: 18 }}
                  />
                  <span className="subscription-chain mb-0">Taiko</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={
                      require(`../../Images/premium/tokens/wavaxIcon.svg`)
                        .default
                    }
                    style={{ width: 18, height: 18 }}
                    alt=""
                  />
                  <span className="subscription-chain mb-0">Avalanche</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <img
                    src={baseLogo}
                    alt=""
                    style={{ width: 18, height: 18 }}
                  />
                  <span className="subscription-chain mb-0">Base</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <img src={conflux} alt="" style={{ width: 18, height: 18 }} />
                  <span className="subscription-chain mb-0">Conflux</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={skaleIcon}
                    alt=""
                    style={{ width: 18, height: 18 }}
                  />
                  <span className="subscription-chain mb-0">SKALE</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <img
                    src={coreIcon}
                    alt=""
                    style={{ width: 18, height: 18 }}
                  />
                  <span className="subscription-chain mb-0">CORE</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={vicitonIcon}
                    alt=""
                    style={{ width: 18, height: 18 }}
                  />
                  <span className="subscription-chain mb-0">Viction</span>
                </div>
                {/*   <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={seiIcon}
                                      alt=""
                                      style={{ width: 18, height: 18 }}
                                    />
                                    <span className="subscription-chain mb-0">
                                      SEI
                                    </span>
                                  </div> */}
              </div>
              <img src={premiumIcon} alt="" />
            </div>
          </div>
        )}
        <div className="my-3">
          <h6 className="popup-subtitle mb-0">Benefits</h6>
        </div>
        <div className="premium-benefits-wrapper d-flex flex-column flex-lg-row gap-3 gap-lg-0 align-items-center justify-content-between p-3">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <img src={metaverseIcon} alt="" />
              <h6 className="premium-benefits-title mb-0">Metaverse</h6>
            </div>
            {metaverseBenefits.map((item, index) => (
              <div className="d-flex align-items-center gap-2">
                <img src={greenCheck} alt="" />
                <span className="premium-benefits-item mb-0">{item}</span>
              </div>
            ))}
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <img src={dappsIcon} alt="" />
              <h6 className="premium-benefits-title mb-0">Dapps</h6>
            </div>
            {dappsBenefits.map((item, index) => (
              <div className="d-flex align-items-center gap-2">
                <img src={greenCheck} alt="" />
                <span className="premium-benefits-item mb-0">{item}</span>
              </div>
            ))}
          </div>
        </div>{" "}
        <hr className="form-divider my-4" />
        <div className="d-flex mt-4 mb-4 align-items-end justify-content-between flex-column-reverse flex-lg-row w-100">
          <div className="d-flex flex-column gap-3 subscribe-input-container">
            <span className="token-amount-placeholder">Select chain</span>
            <div class="dropdown position relative">
              <button
                class={`btn launchpad-dropdown d-flex justify-content-between align-items-center dropdown-toggle`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ color: "#fff" }}
                >
                  <img
                    src={require(`../../Images/premium/tokens/${chainDropdown.symbol}Icon.svg`)}
                    alt=""
                  />
                  {chainDropdown.name}
                </div>
                <img src={launchpadIndicator} alt="" />
              </button>
              <ul class="dropdown-menu w-100">
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleEthPool}
                >
                  <img
                    src={
                      require(`../../Images/premium/tokens/ethIcon.svg`).default
                    }
                    alt=""
                  />
                  Ethereum
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleBnbPool}
                >
                  <img
                    src={
                      require(`../../Images/premium/tokens/wbnbIcon.svg`)
                        .default
                    }
                    alt=""
                  />
                  BNB Chain
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleMantaPool}
                >
                  <img
                    src={
                      require(`../../Images/premium/tokens/mantaIcon.svg`)
                        .default
                    }
                    style={{ width: 18, height: 18 }}
                    alt=""
                  />
                  Manta
                </li>

                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleTaikoPool}
                >
                  <img
                    src={
                      require(`../../Images/premium/tokens/taikoIcon.svg`)
                        .default
                    }
                    style={{ width: 18, height: 18 }}
                    alt=""
                  />
                  Taiko
                </li>

                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleAvaxPool}
                >
                  <img
                    src={
                      require(`../../Images/premium/tokens/wavaxIcon.svg`)
                        .default
                    }
                    alt=""
                  />
                  Avalanche
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleBasePool}
                >
                  <img
                    src={baseLogo}
                    alt=""
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  Base Network
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleConfluxPool}
                >
                  <img
                    src={conflux}
                    alt=""
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  Conflux Network
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleSkalePool}
                >
                  <img
                    src={skaleIcon}
                    alt=""
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  SKALE
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleCorePool}
                >
                  <img
                    src={coreIcon}
                    alt=""
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  CORE
                </li>
                <li
                  className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                  onClick={handleVictionPool}
                >
                  <img
                    src={vicitonIcon}
                    alt=""
                    style={{
                      width: "18px",
                      height: "18px",
                    }}
                  />
                  Viction
                </li>
                {/*     <li
                                      className="dropdown-item launchpad-item d-flex align-items-center gap-2"
                                      onClick={handleSeiPool}
                                    >
                                      <img
                                        src={seiIcon}
                                        alt=""
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                        }}
                                      />
                                      SEI
                                    </li> */}
              </ul>
            </div>
          </div>
          <div className="d-flex flex-column gap-3 subscribe-input-container"></div>
          {discountPercentage < 100 || discountPercentageViction  < 100 && (
            <div className="d-flex flex-column align-items-end gap-3">
              <span className="my-premium-balance-text mb-0">
                My balance:{" "}
                {getFormattedNumber(tokenBalance / 10 ** tokenDecimals, 5)}{" "}
                {dropdownIcon.toUpperCase()}
              </span>
              <div
                className="premium-benefits-wrapper p-2 d-flex align-items-center gap-4"
                style={{ height: "34px" }}
              >
                <span className="subscription-price-text mb-0">
                  Subscription Price:
                </span>

                <div className="d-flex align-items-center gap-2">
                  <div class="dropdown position relative">
                    <button
                      class={`btn launchpad-dropdown d-flex gap-1 justify-content-between align-items-center dropdown-toggle2 w-100`}
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
                            src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                            alt=""
                            style={{ width: 20, height: 20 }}
                          />
                        )}
                        {/* {dropdownTitle} */}
                      </div>
                      <img src={launchpadIndicator} alt="" />
                    </button>
                    <ul class="dropdown-menu w-100">
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
                          : chainId === 169
                          ? window.config.subscriptionmanta_tokens
                          : chainId === 167000
                          ? window.config.subscriptiontaiko_tokens
                          : chainId === 1116
                          ? window.config.subscriptioncore_tokens
                          : chainId === 713715
                          ? window.config.subscriptionsei_tokens
                          : window.config.subscription_tokens
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
                                  ? window.config.subscription_tokens[t]?.symbol
                                  : chainId === 8453
                                  ? window.config.subscriptionbase_tokens[t]
                                      ?.symbol
                                  : chainId === 1030
                                  ? window.config.subscriptioncfx_tokens[t]
                                      ?.symbol
                                  : chainId === 1482601649
                                  ? window.config.subscriptionskale_tokens[t]
                                      ?.symbol
                                  : chainId === 88
                                  ? window.config.subscriptionviction_tokens[t]
                                      ?.symbol
                                  : chainId === 169
                                  ? window.config.subscriptionmanta_tokens[t]
                                      ?.symbol
                                      : chainId === 167000
                                      ? window.config.subscriptiontaiko_tokens[t]
                                          ?.symbol
                                  : chainId === 1116
                                  ? window.config.subscriptioncore_tokens[t]
                                      ?.symbol
                                  : chainId === 713715
                                  ? window.config.subscriptionsei_tokens[t]
                                      ?.symbol
                                  : window.config.subscription_tokens[t]?.symbol
                              );
                              setdropdownTitle(
                                chainId === 1
                                  ? window.config.subscriptioneth_tokens[t]
                                      ?.symbol
                                  : chainId === 56
                                  ? window.config.subscriptionbnb_tokens[t]
                                      ?.symbol
                                  : chainId === 43114
                                  ? window.config.subscription_tokens[t]?.symbol
                                  : chainId === 8453
                                  ? window.config.subscriptionbase_tokens[t]
                                      ?.symbol
                                  : chainId === 1030
                                  ? window.config.subscriptioncfx_tokens[t]
                                      ?.symbol
                                  : chainId === 1482601649
                                  ? window.config.subscriptionskale_tokens[t]
                                      ?.symbol
                                  : chainId === 88
                                  ? window.config.subscriptionviction_tokens[t]
                                      ?.symbol
                                  : chainId === 169
                                  ? window.config.subscriptionmanta_tokens[t]
                                      ?.symbol
                                      : chainId === 167000
                                  ? window.config.subscriptiontaiko_tokens[t]
                                      ?.symbol
                                  : chainId === 713715
                                  ? window.config.subscriptionsei_tokens[t]
                                      ?.symbol
                                  : chainId === 1116
                                  ? window.config.subscriptionsei_tokens[t]
                                      ?.symbol
                                  : window.config.subscription_tokens[t]?.symbol
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
                                : chainId === 43114
                                ? require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : chainId === 1030
                                ? require(`../../Images/premium/tokens/${window.config.subscriptioncfx_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : chainId === 8453
                                ? require(`../../Images/premium/tokens/${window.config.subscriptionbase_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : chainId === 1482601649
                                ? require(`../../Images/premium/tokens/${window.config.subscriptionskale_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : chainId === 1116
                                ? require(`../../Images/premium/tokens/${window.config.subscriptioncore_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : chainId === 88
                                ? require(`../../Images/premium/tokens/${window.config.subscriptionviction_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : chainId === 169
                                ? require(`../../Images/premium/tokens/${window.config.subscriptionmanta_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                  : chainId === 167000
                                ? require(`../../Images/premium/tokens/${window.config.subscriptiontaiko_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : chainId === 713715
                                ? require(`../../Images/premium/tokens/${window.config.subscriptionsei_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                                : require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                    t
                                  ]?.symbol.toLowerCase()}Icon.svg`)
                            }
                            alt=""
                            style={{
                              width: 20,
                              height: 20,
                            }}
                          />
                          {chainId === 1
                            ? window.config.subscriptioneth_tokens[t]?.symbol
                            : chainId === 56
                            ? window.config.subscriptionbnb_tokens[t]?.symbol
                            : chainId === 43114
                            ? window.config.subscription_tokens[t]?.symbol
                            : chainId === 1030
                            ? window.config.subscriptioncfx_tokens[t]?.symbol
                            : chainId === 8453
                            ? window.config.subscriptionbase_tokens[t]?.symbol
                            : chainId === 1482601649
                            ? window.config.subscriptionskale_tokens[t]?.symbol
                            : chainId === 1116
                            ? window.config.subscriptioncore_tokens[t]?.symbol
                            : chainId === 88
                            ? window.config.subscriptionviction_tokens[t]
                                ?.symbol
                            : chainId === 169
                            ? window.config.subscriptionmanta_tokens[t]?.symbol
                            : chainId === 167000
                            ? window.config.subscriptiontaiko_tokens[t]?.symbol
                            : chainId === 713715
                            ? window.config.subscriptionsei_tokens[t]?.symbol
                            : window.config.subscription_tokens[t]?.symbol}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <img
                    src={require(`../../Images/premium/tokens/${dropdownIcon.toLowerCase()}Icon.svg`)}
                    height={16}
                    width={16}
                    alt="usdt"
                  /> */}
                  <span className="subscription-price-token mb-0">
                    {formattedPrice.slice(0, 7)}
                  </span>
                </div>
                <span className="subscription-price-usd mb-0">
                  {" "}
                  ${100 - Number(discountPercentage!= 0  ? discountPercentage : discountPercentageViction != 0 ? discountPercentageViction : discountPercentage) }
                </span>
              </div>
            </div>
          )}

          {/* <div className="d-flex flex-column align-items-end justify-content-lg-end">
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
            </div> */}
        </div>
        {/* <div
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
          </div> */}
        {chainId === 1482601649 && (
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
        {discountPercentage > 0 && chainId === 56 ? (
          <div className="d-flex align-items-center gap-3 justify-content-center">
            <div
              className={` ${
                approveStatus === "fail" || !coinbase || isApproved
                  ? "linear-border-disabled"
                  : "linear-border"
              }`}
            >
              <button
                className={`btn ${
                  approveStatus === "fail" || !coinbase || isApproved
                    ? "outline-btn-disabled"
                    : "filled-btn"
                } px-4`}
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
                  approveStatus === "approveAmount" ||
                  approveStatus === "failsubscribe" ||
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
            </div>
            <div
              className={` ${
                isApproved === false
                  ? "linear-border-disabled"
                  : "linear-border"
              }`}
            >
              <button
                className={`btn ${
                  isApproved === false ? "outline-btn-disabled" : "filled-btn"
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
          </div>
        ) : discountPercentage > 0 && chainId !== 56 ? (
          <div
            className={`d-flex align-items-center justify-content-center mb-2`}
          >
            <button
              className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
              onClick={() => {
                handleBnbPool();
              }}
              style={{
                width: "fit-content",
                whiteSpace: "nowrap",
                fontSize: 14,
              }}
            >
              Switch to BNB Chain
            </button>{" "}
          </div>
        ) : discountPercentageViction > 0 && chainId === 88 ? (
          <div className="d-flex align-items-center gap-3 justify-content-center">
            <div
              className={` ${
                approveStatus === "fail" || !coinbase || isApproved
                  ? "linear-border-disabled"
                  : "linear-border"
              }`}
            >
              <button
                className={`btn ${
                  approveStatus === "fail" || !coinbase || isApproved
                    ? "outline-btn-disabled"
                    : "filled-btn"
                } px-4`}
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
                  approveStatus === "approveAmount" ||
                  approveStatus === "failsubscribe" ||
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
            </div>
            <div
              className={` ${
                isApproved === false
                  ? "linear-border-disabled"
                  : "linear-border"
              }`}
            >
              <button
                className={`btn ${
                  isApproved === false ? "outline-btn-disabled" : "filled-btn"
                } px-4`}
                onClick={() => handleSubscribe()}
              >
                {loadspinnerSub === false &&
                (approveStatus === "initial" ||
                  approveStatus === "fail" ||
                  approveStatus === "deposit") ? (
                  <>
                    {discountPercentageViction > 0 || nftPremium_totalViction > 0
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
          </div>
        ) : discountPercentageViction > 0 && chainId !== 88 ? (
          <div
            className={`d-flex align-items-center justify-content-center mb-2`}
          >
            <button
              className="d-flex gap-2 px-3 py-1 align-items-center pill-btn"
              onClick={() => {
                handleVictionPool();
              }}
              style={{
                width: "fit-content",
                whiteSpace: "nowrap",
                fontSize: 14,
              }}
            >
              Switch to Viction
            </button>{" "}
          </div>
        ) : (
          <div className="d-flex align-items-center gap-3 justify-content-center">
            <div
              className={` ${
                approveStatus === "fail" || !coinbase || isApproved
                  ? "linear-border-disabled"
                  : "linear-border"
              }`}
            >
              <button
                className={`btn ${
                  approveStatus === "fail" || !coinbase || isApproved
                    ? "outline-btn-disabled"
                    : "filled-btn"
                } px-4`}
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
                  approveStatus === "approveAmount" ||
                  approveStatus === "failsubscribe" ||
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
            </div>
            <div
              className={` ${
                isApproved === false
                  ? "linear-border-disabled"
                  : "linear-border"
              }`}
            >
              <button
                className={`btn ${
                  isApproved === false ? "outline-btn-disabled" : "filled-btn"
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
        </div>
      </div>
    </div>
  );
};

export default GetPremiumPopup;
