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
import axios from "axios";

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
      symbol: "wbnb",
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
  ];

  const { BigNumber } = window;

  let wethAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
  let wcfx = "0xfe97E85d13ABD9c1c33384E796F10B73905637cE";
  let wbase = "0x4200000000000000000000000000000000000006";
  let wbnbAddress = "0x55d398326f99059fF775485246999027B3197955";
  let wavaxAddress = "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7";
  let wskaleAddress = "0xCC205196288B7A26f6D43bBD68AaA98dde97276d";

  const metaverseBenefits = [
    "Exclusive access to World of Dypians",
    "Access to Daily Bonus Event",
    "Access every Treasure Hunt Event without the need to hold a Beta Pass NFT",
    "Early access to upcoming features and updates",
  ];

  const dappsBenefits = [
    "DYP Tools administrative dashboard",
    "Voting capabilities in the News section",
    "Priority allocation to presales of new projects through Dypius Launchpad",
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

  const handleSubscriptionTokenChange = async (tokenAddress) => {
    const token = tokenAddress;
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
        : window.config.subscriptioncfx_tokens[token]?.decimals;
    setprice("");
    setformattedPrice("");
    setTokenBalance("");
    setselectedSubscriptionToken(token);

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? await window.getEstimatedTokenSubscriptionAmountBNB(token)
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
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
    const bnbsubscribeAddress = window.config.subscription_newbnb_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;

    const web3 = new Web3(window.ethereum);

    let tokenContract = new web3.eth.Contract(
      window.ERC20_ABI,
      selectedSubscriptionToken
    );
    setloadspinner(true);

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
  };

  const handleCheckIfAlreadyApproved = async (token) => {
    const web3eth = new Web3(window.config.infura_endpoint);
    const bscWeb3 = new Web3(window.config.bsc_endpoint);
    const avaxWeb3 = new Web3(window.config.avax_endpoint);

    const cfxWeb3 = new Web3(window.config.conflux_endpoint);
    const baseWeb3 = new Web3(window.config.base_endpoint);
    const skaleWeb3 = new Web3(window.config.skale_endpoint);

    const ethsubscribeAddress = window.config.subscription_neweth_address;
    const confluxsubscribeAddress = window.config.subscription_cfx_address;
    const bnbsubscribeAddress = window.config.subscription_newbnb_address;
    const avaxsubscribeAddress = window.config.subscription_newavax_address;

    const basesubscribeAddress = window.config.subscription_base_address;
    const skalesubscribeAddress = window.config.subscription_skale_address;

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

    let tokenprice =
      chainId === 1
        ? await window.getEstimatedTokenSubscriptionAmountETH(token)
        : chainId === 56
        ? await window.getEstimatedTokenSubscriptionAmountBNB(token)
        : chainId === 1030
        ? await window.getEstimatedTokenSubscriptionAmountCFX(token)
        : chainId === 43114
        ? await window.getEstimatedTokenSubscriptionAmount(token)
        : chainId === 8453
        ? await window.getEstimatedTokenSubscriptionAmountBase(token)
        : chainId === 1482601649
        ? await window.getEstimatedTokenSubscriptionAmountSkale(token)
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
      }
      if (chainId === 56) {
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
          ? "SUBSCRIPTION_NEWBNB"
          : chainId === 43114
          ? "SUBSCRIPTION_NEWAVAX"
          : chainId === 1030
          ? "SUBSCRIPTION_CFX"
          : chainId === 8453
          ? "SUBSCRIPTION_BASE"
          : chainId === 1482601649
          ? "SUBSCRIPTION_SKALE"
          : "",
    });

    setloadspinnerSub(true);

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
        // this.props.onSubscribe();
        // window.location.href = "https://app.dypius.com/account";
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
  };

  console.log(chainId, chainDropdowns, dropdownIcon);

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
    } else {
      setdropdownIcon("usdt");
      setdropdownTitle("USDT");
      setselectedSubscriptionToken(
        Object.keys(window.config.subscriptioneth_tokens)[0]
      );
      handleSubscriptionTokenChange(wethAddress);
      handleCheckIfAlreadyApproved(wethAddress);
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
    } else if (chainId === 1030 && selectedSubscriptionToken !== "") {
      settokenDecimals(
        window.config.subscriptioncfx_tokens[selectedSubscriptionToken]
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
                  alt=""
                />
                <span className="subscription-chain mb-0">Ethereum</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <img
                  src={
                    require(`../../Images/premium/tokens/wbnbIcon.svg`).default
                  }
                  alt=""
                />
                <span className="subscription-chain mb-0">BNB Chain</span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <img
                  src={
                    require(`../../Images/premium/tokens/wavaxIcon.svg`).default
                  }
                  alt=""
                />
                <span className="subscription-chain mb-0">Avalanche</span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <img src={baseLogo} alt="" style={{ width: 18, height: 18 }} />
                <span className="subscription-chain mb-0">Base</span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <img src={conflux} alt="" style={{ width: 18, height: 18 }} />
                <span className="subscription-chain mb-0">Conflux</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <img src={skaleIcon} alt="" style={{ width: 18, height: 18 }} />
                <span className="subscription-chain mb-0">SKALE</span>
              </div>
            </div>
            <img src={premiumIcon} alt="" />
          </div>
        </div>
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
              </ul>
            </div>
          </div>
          <div className="d-flex flex-column gap-3 subscribe-input-container"></div>
          <div className="d-flex flex-column align-items-end gap-3">
            <span className="my-premium-balance-text mb-0">
              My balance:{" "}
              {getFormattedNumber(tokenBalance / 10 ** tokenDecimals, 3)}{" "}
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
                              : require(`../../Images/premium/tokens/${window.config.subscription_tokens[
                                  t
                                ]?.symbol.toLowerCase()}Icon.svg`)
                          }
                          alt=""
                          style={{ width: 20, height: 20 }}
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
                  {formattedPrice.slice(0, 5)}
                </span>
              </div>
              <span className="subscription-price-usd mb-0">$100</span>
            </div>
          </div>

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
                approveStatus === "failsubscribe" ||
                approveStatus === "successsubscribe") ? (
                "Approve"
              ) : loadspinner === false && approveStatus === "fail" ? (
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
          <div
            className={` ${
              isApproved === false ? "linear-border-disabled" : "linear-border"
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
                "Buy"
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
