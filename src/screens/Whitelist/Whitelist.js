import React, { useState, useEffect } from "react";
import "./whitelist.css";
import dyp from "./assets/dyp.svg";
import idyp from "./assets/idyp.svg";
import premium from "./assets/premium.png";
import tooltipIcon from "./assets/tooltipIcon.svg";
import usdt from "./assets/usdt.svg";
import eth from "./assets/eth.svg";
import bnb from "./assets/bnb.svg";
import dropArrow from "./assets/dropArrow.svg";
import { shortAddress } from "../Caws/functions/shortAddress";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import { Tooltip } from "@material-ui/core";
import checkIcon from "./assets/checkIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import buyToken from "./assets/buyToken.svg";
import { handleSwitchNetworkhook } from "../../hooks/hooks";
import Web3 from "web3";
// import wallet from "../FARMINNG/assets/wallet.svg";
import moment from "moment";
import axios from "axios";
import { TOKEN_LOCK_ABI, VESTING_ABI } from "./abis";
import Countdown from "react-countdown";
import WhitelistHero from "./WhitelistHero/WhitelistHero";
import WhitelistContent from "./WhitelistContent/WhitelistContent";

const renderer2 = ({ hours, minutes }) => {
  return (
    <h6 className="timer-text mb-0">
      {hours}h:{minutes}m
    </h6>
  );
};

const Whitelist = ({
  chainId,
  isConnected,
  handleConnection,
  coinbase,
  handleSwitchNetwork,
  isPremium,
  userPools,
  hasDypBalance,
  hasiDypBalance,
}) => {
  const [coinDropdown, setCoinDropdown] = useState(false);
  const [chainDropdown, setChainDropdown] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({
    coin: "USDT",
    icon: usdt,
    address: "",
  });
  const [selectedChain, setSelectedChain] = useState({
    chain: "BNB Chain",
    icon: bnb,
  });

  const [slice, setSlice] = useState(5);
  const [loading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState();
  const [canDeposit, setCanDeposit] = useState(true);
  const [hasDypStaked, sethasDypStaked] = useState(false);
  const [hasiDypStaked, sethasiDypStaked] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [totalDeposited, setTotalDeposited] = useState(0);
  const [depositLoading, setdepositLoading] = useState(false);
  const [depositStatus, setdepositStatus] = useState("initial");
  const [selectedToken, setselectedToken] = useState();
  const [totalCommitmentValue, settotalCommitmentValue] = useState(0);
  const [cliffTime, setcliffTime] = useState(0);
  const [timerFinished, settimerFinished] = useState(false);

  const [releaseProcent, setreleaseProcent] = useState(0);
  const [pendingTokens, setpendingTokens] = useState(0);
  const [startedVesting, setstartedVesting] = useState(false);
  const [canClaim, setcanClaim] = useState(false);
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [allUserCommitments, setAllUserCommitments] = useState([]);

  let expireDay = new Date("2024-10-16T14:00:00.000+02:00");

  const poolCap = 20000;

  const idyp_pools = [
    "0x41b8a58f4307ea722ad0a964966caa18a6011d93",
    "0xf6DC9E51D4E0FCc19ca6426fB5422f1E9a24F2eE",
    "0xFBe84Af34CdC22455f82e18B76Ca50D21d3aBF84",
    "0x525cb0f6b5dae73965046bcb4c6f45ce74fb1b5d",
    "0x8cee06119fffecdd560ee83b26cccfe8e2fe6603",
    "0xe026fb242d9523dc8e8d8833f7309dbdbed59d3d",
  ];

  const dyp_pools = [
    "0x92A84052Fe6945949A295AF14a7506e3dc085492",
    "0xbE030A667d9ee75a9FCdF2162A2C14ccCAB573dD",
    "0x0fafe78e471b52bc4003984a337948ed55284573",
    "0xC9075092Cc46E176B1F3c0D0EB8223F1e46555B0",
    "0x998A9F0DF7DAF20c2B0Bb379Dcae394636926a96",
    "0x8cee06119fffecdd560ee83b26cccfe8e2fe6603",
    "0x9845a667b1A603FF21596FDdec51968a2bccAc11",
    "0x8cee06119fffecdd560ee83b26cccfe8e2fe6603",
    "0xFdD3CFF22CF846208E3B37b47Bc36b2c61D2cA8b",
  ];

  const getInfo = async (startIndex, endIndex) => {
    const vestingSc = new window.bscTestWeb3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address
    );

    //  releaseProcent -> Procent (%) of the Amount Vested which will be available at TGE -> after 'cliff' has passed;
    const releaseProcent = await vestingSc.methods
      .releaseProcent()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setreleaseProcent(releaseProcent / 100);

    const isstartVesting = await vestingSc.methods
      .startVesting()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setstartedVesting(isstartVesting);
    //lockDuration -> Vesting period, this will start and release tokens, once 'cliff' has passed;
    const lockDuration = await vestingSc.methods
      .lockDuration()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    //availableTGE -> If 1, he has to claim 'releaseProcent' at TGE (end of 'cliff'), if 0, he has already claimed 'releaseProcent';
    let availableTGE = 0;
    if (coinbase) {
      availableTGE = await vestingSc.methods
        .availableTGE(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    setcanClaim(Number(availableTGE) === 1 ? true : false);
    //getPendingUnlocked(address _holder) -> It will give you the pending tokens that are available to Claim;
    let tokensToClaimAmount = 0;
    if (coinbase) {
      tokensToClaimAmount = await vestingSc.methods
        .getPendingUnlocked(coinbase)
        .call()
        .catch((e) => {
          console.error(e);
          return 0;
        });
    }

    const tokensToClaimAmount_formatted = new window.BigNumber(
      tokensToClaimAmount / 1e18
    ).toFixed(0);

    setpendingTokens(tokensToClaimAmount_formatted);

    //getTotalClaimedTokens() -> Return total WOD tokens Claimed in general by ppl;

    const totalWodTokensClaimed = await vestingSc.methods
      .getTotalClaimedTokens()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    //getStakersList(uint startIndex, uint endIndex) -> Return list of Adress that are in the Vesting including info as 'lastClaimed', 'VestedTokens', 'ClaimedTokens so far'.;

    // const stakersList = await vestingSc.methods
    //   .getStakersList(startIndex, endIndex)
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });

    //getNumberOfWallets() -> Return the number of Adresses that are in the vesting;

    // const addressesInVesting = await vestingSc.methods
    //   .getNumberOfWallets(startIndex, endIndex)
    //   .call()
    //   .catch((e) => {
    //     console.error(e);
    //     return 0;
    //   });
  };

  const getInfoTimer = async () => {
    const vestingSc = new window.bscTestWeb3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address
    );

    const tokenLockSc = new window.bscTestWeb3.eth.Contract(
      TOKEN_LOCK_ABI,
      window.config.token_lock_address
    );
    //  cliff -> Lock time until TGE release.
    //  When cliff will pass (deployTime + cliff) it will be available to claim the vested tokens - 'releaseProcent';

    const amountCliffTime = await vestingSc.methods
      .cliff()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    const deployTime = await tokenLockSc.methods
      .unlockTime()
      .call()
      .catch((e) => {
        console.error(e);
        return 0;
      });

    setcliffTime(Number(deployTime) + Number(amountCliffTime));
  };

  const handleClaim = async () => {
    setclaimLoading(true);
    let web3 = new Web3(window.ethereum);
    const vestingSc = new web3.eth.Contract(
      VESTING_ABI,
      window.config.vesting_address,
      { from: await window.getCoinbase() }
    );

    await vestingSc.methods
      .claim()
      .send({ from: await window.getCoinbase() })
      .then(() => {
        setclaimStatus("success");
        setclaimLoading(false);

        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
      })
      .catch((e) => {
        console.error(e);
        window.alertify.error(e?.message);
        console.log(window.getCoinbase());
        setclaimStatus("failed");
        setclaimLoading(false);
        setTimeout(() => {
          setclaimStatus("initial");
        }, 5000);
      });
  };

  const checkStakedPools = () => {
    const dypResult = userPools.filter((item) => {
      return dyp_pools.includes(item.contract_address.toLowerCase());
    });
    const idypResult = userPools.filter((item) => {
      return idyp_pools.includes(item.contract_address.toLowerCase());
    });
    if (idypResult.length > 0) {
      sethasiDypStaked(true);
    }
    if (dypResult.length > 0) {
      sethasDypStaked(true);
    }
  };

  const getTotalCommitment = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/latest-commitments")
      .catch((e) => {
        console.error(e);
        return 0;
      });

    if (result && result.status === 200) {
      const total = result.data.total;
      settotalCommitmentValue(total);
    }
  };

  const requirements = [
    {
      icon: dyp,
      coin: "DYP Token",
      value: "Holder/Staker",
      active: hasDypStaked || hasDypBalance,
    },
    {
      icon: idyp,
      coin: "iDYP Token",
      value: "Holder/Staker",
      active: hasiDypStaked || hasiDypBalance,
    },
    {
      icon: premium,
      coin: "Premium",
      value: "Subscriber",
      active: isPremium,
    },
  ];

  const handleViewMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (slice >= allUserCommitments.length) {
        setSlice(5);
      } else {
        setSlice(slice + 3);
      }
    }, 2000);
  };

  const handleChangeChain = async (hexChain, chain) => {
    await handleSwitchNetworkhook(hexChain)
      .then(() => {
        handleSwitchNetwork(chain);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUserBalanceForToken = async (token) => {
    if (coinbase) {
      //1 is for eth chain, 2 for avax and 3 for bnb chain
      let tokenBalance = await window.getTokenHolderBalanceAll(
        coinbase,
        token.address,
        chainId === 1 ? 1 : chainId === 56 ? 3 : 1
      );

      const balance_formatted = new window.BigNumber(tokenBalance)
        .div(10 ** token.decimals)
        .toString(10);
      setTokenBalance(balance_formatted);
    } else setTokenBalance(0);
  };

  const getUserCommitment = async () => {
    let commitment_contract = new window.bscWeb3.eth.Contract(
      window.COMMITMENT_ABI,
      window.config.commitment_address
    );

    let commitment_contract_eth = new window.infuraWeb3.eth.Contract(
      window.COMMITMENT_ETH_ABI,
      window.config.commitment_eth_address
    );

    const total_commitments = await commitment_contract.methods
      .commitmentCountForUser(
        coinbase,
        window.config.commitmentbnb_tokens[0].address
      )
      .call()
      .catch((e) => {
        console.error(e);
        return [];
      });

    const total_commitments_eth_usdt = await commitment_contract_eth.methods
      .commitmentCountForUser(
        coinbase,
        window.config.commitmenteth_tokens[0].address
      )
      .call()
      .catch((e) => {
        console.error(e);
        return [];
      });

    const total_commitments_eth_usdc = await commitment_contract_eth.methods
      .commitmentCountForUser(
        coinbase,
        window.config.commitmenteth_tokens[1].address
      )
      .call()
      .catch((e) => {
        console.error(e);
        return [];
      });
    let totalTokenDeposited = 0;
    let totalCommitmentArray_bnb = [];
    let totalCommitmentArray_eth_usdt = [];
    let totalCommitmentArray_eth_usdc = [];

    if (total_commitments && total_commitments > 0) {
      const finalResult = await Promise.all(
        window.range(0, total_commitments - 1).map(async (i) => {
          const commitment_list = await commitment_contract.methods
            .commitments(
              coinbase,
              window.config.commitmentbnb_tokens[0].address,
              i
            )
            .call()
            .catch((e) => {
              console.error(e);
              return [];
            });
          if (commitment_list) {
            totalTokenDeposited += commitment_list.amount / 1e18;
            return {
              commitment_list,
              network: "BNB Chain",
              token: "USDT",
            };
          }
        })
      );
      const finalResult_sorted = finalResult.sort(function (a, b) {
        return a.commitment_list.timestamp - b.commitment_list.timestamp;
      });
      totalCommitmentArray_bnb = finalResult_sorted;
    }
    if (total_commitments_eth_usdt && total_commitments_eth_usdt > 0) {
      const finalResult = await Promise.all(
        window.range(0, total_commitments_eth_usdt - 1).map(async (i) => {
          const commitment_list = await commitment_contract_eth.methods
            .commitments(
              coinbase,
              window.config.commitmenteth_tokens[0].address,
              i
            )
            .call()
            .catch((e) => {
              console.error(e);
              return [];
            });
          if (commitment_list) {
            totalTokenDeposited += commitment_list.amount / 1e6;
            return {
              commitment_list,
              network: "Ethereum",
              token: "USDT",
            };
          }
        })
      );
      const finalResult_sorted = finalResult.sort(function (a, b) {
        return a.commitment_list.timestamp - b.commitment_list.timestamp;
      });

      totalCommitmentArray_eth_usdt = finalResult_sorted;
    }
    if (total_commitments_eth_usdc && total_commitments_eth_usdc > 0) {
      const finalResult = await Promise.all(
        window.range(0, total_commitments_eth_usdc - 1).map(async (i) => {
          const commitment_list = await commitment_contract_eth.methods
            .commitments(
              coinbase,
              window.config.commitmenteth_tokens[1].address,
              i
            )
            .call()
            .catch((e) => {
              console.error(e);
              return [];
            });
          if (commitment_list) {
            totalTokenDeposited += commitment_list.amount / 1e6;
            return {
              commitment_list,
              network: "Ethereum",
              token: "USDC",
            };
          }
        })
      );
      const finalResult_sorted = finalResult.sort(function (a, b) {
        return a.commitment_list.timestamp - b.commitment_list.timestamp;
      });
      totalCommitmentArray_eth_usdc = finalResult_sorted;
    } else if (
      total_commitments &&
      total_commitments === 0 &&
      total_commitments_eth_usdt &&
      total_commitments_eth_usdt === 0 &&
      total_commitments_eth_usdc &&
      total_commitments_eth_usdc === 0
    ) {
      setAllUserCommitments([]);
      setTotalDeposited(0);
    }
    const finalCommitmentArray = [
      ...totalCommitmentArray_bnb,
      ...totalCommitmentArray_eth_usdc,
      ...totalCommitmentArray_eth_usdt,
    ];
    if (finalCommitmentArray && finalCommitmentArray.length > 0) {
      const finalResult_sorted = finalCommitmentArray.sort(function (a, b) {
        return a.commitment_list.timestamp - b.commitment_list.timestamp;
      });
      setAllUserCommitments(finalResult_sorted);
      setTotalDeposited(totalTokenDeposited);
    } else setAllUserCommitments([]);
  };
  // console.log("userPools", userPools);
  const checkApproval = async (amount) => {
    if (chainId === 56) {
      const result = await window
        .checkapproveStakePool(
          coinbase,
          selectedCoin.address,
          window.config.commitment_address
        )
        .then((data) => {
          return data;
        });

      let result_formatted = new window.BigNumber(result)
        .div(10 ** selectedToken.decimals)
        .toFixed(6);

      if (
        Number(result_formatted) >= Number(amount) &&
        Number(result_formatted) !== 0 &&
        Number(amount) >= 100
      ) {
        setdepositStatus("deposit");
      } else {
        setdepositStatus("initial");
      }
    } else if (chainId === 1) {
      const result = await window
        .checkapproveStakePool(
          coinbase,
          selectedCoin.address,
          window.config.commitment_eth_address
        )
        .then((data) => {
          return data;
        });

      let result_formatted = new window.BigNumber(result)
        .div(10 ** selectedToken.decimals)
        .toFixed(6);
      console.log(Number(result_formatted), result, Number(amount));
      if (
        Number(result_formatted) >= Number(amount) &&
        Number(result_formatted) !== 0 &&
        Number(amount) >= 100
      ) {
        setdepositStatus("deposit");
      } else {
        setdepositStatus("initial");
      }
    }
  };

  const handleUserMaxDeposit = () => {
    const depositAmount = tokenBalance;
    if (depositAmount >= poolCap) {
      setDepositAmount(poolCap);
      checkApproval(poolCap);

      seterrorMsg(
        "Maximum amount allowed to commit is" + poolCap + selectedCoin.coin
      );
      setCanDeposit(true);
    } else if (depositAmount < poolCap && depositAmount >= 100) {
      setDepositAmount(tokenBalance);
      checkApproval(tokenBalance);
      setCanDeposit(true);
    } else if (depositAmount < 100 && depositAmount >= 0) {
      checkApproval(tokenBalance);
      setDepositAmount(tokenBalance);
      seterrorMsg("Deposit amount is lower than minimum amount required.");
      setCanDeposit(false);
    }
  };

  const handleStake = async () => {
    if (chainId === 56) {
      setdepositLoading(true);

      let amount = depositAmount;
      amount = new window.BigNumber(amount)
        .times(10 ** selectedToken.decimals)
        .toFixed(0);

      window.web3 = new Web3(window.ethereum);
      let commitment_contract = new window.web3.eth.Contract(
        window.COMMITMENT_ABI,
        window.config.commitment_address
      );

      const gasPrice = await window.web3.eth.getGasPrice();
      console.log("gasPrice", gasPrice);
      const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");

      const transactionParameters = {
        gasPrice: window.web3.utils.toWei(currentGwei.toString(), "gwei"),
      };

      await commitment_contract.methods
        .commit(selectedToken.address, amount)
        .estimateGas({ from: coinbase })
        .then((gas) => {
          transactionParameters.gas = window.web3.utils.toHex(gas);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(transactionParameters);

      await commitment_contract.methods
        .commit(selectedToken.address, amount)
        .send({ from: coinbase, ...transactionParameters })
        .then(() => {
          setdepositLoading(false);
          setdepositStatus("success");
          getUserBalanceForToken(selectedToken);
          getUserCommitment();
          setTimeout(() => {
            setdepositStatus("initial");
            setDepositAmount("");
          }, 5000);
        })
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          setTimeout(() => {
            setDepositAmount("");
            setdepositStatus("initial");
            seterrorMsg("");
          }, 10000);
        });
    } else if (chainId === 1) {
      setdepositLoading(true);

      let amount = depositAmount;
      amount = new window.BigNumber(amount)
        .times(10 ** selectedToken.decimals)
        .toFixed(0);

      window.web3 = new Web3(window.ethereum);
      let commitment_contract = new window.web3.eth.Contract(
        window.COMMITMENT_ETH_ABI,
        window.config.commitment_eth_address
      );

      const gasPrice = await window.web3.eth.getGasPrice();
      console.log("gasPrice", gasPrice);
      const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");

      const transactionParameters = {
        gasPrice: window.web3.utils.toWei(currentGwei.toString(), "gwei"),
      };

      await commitment_contract.methods
        .commit(selectedToken.address, amount)
        .estimateGas({ from: coinbase })
        .then((gas) => {
          transactionParameters.gas = window.web3.utils.toHex(gas);
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(transactionParameters);

      await commitment_contract.methods
        .commit(selectedToken.address, amount)
        .send({ from: coinbase, ...transactionParameters })
        .then(() => {
          setdepositLoading(false);
          setdepositStatus("success");
          getUserBalanceForToken(selectedToken);
          getUserCommitment();
          setTimeout(() => {
            setdepositStatus("initial");
            setDepositAmount("");
          }, 5000);
        })
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          setTimeout(() => {
            setDepositAmount("");
            setdepositStatus("initial");
            seterrorMsg("");
          }, 10000);
        });
    }
  };

  const handleApprove = async () => {
    setdepositLoading(true);
    window.web3 = new Web3(window.ethereum);
    let token_contract = new window.web3.eth.Contract(
      window.TOKEN_ABI,
      selectedCoin.address
    );

    let amount = depositAmount;
    amount = new window.BigNumber(amount)
      .times(10 ** selectedToken.decimals)
      .toFixed(0);
    await token_contract.methods
      .approve(
        chainId === 56
          ? window.config.commitment_address
          : window.config.commitment_eth_address,
        amount
      )
      .send({ from: coinbase })
      .then(() => {
        setdepositLoading(false);
        setdepositStatus("deposit");
      })
      .catch((e) => {
        setdepositLoading(false);
        setdepositStatus("fail");
        seterrorMsg(e?.message);
        setTimeout(() => {
          setDepositAmount("");
          setdepositStatus("initial");
          seterrorMsg("");
        }, 10000);
      });
  };

  useEffect(() => {
    if (depositAmount > 0) {
      const result = Number(depositAmount) + Number(totalDeposited);
      if (result > poolCap) {
        seterrorMsg(
          "Deposit amount is greater than available quota. Please add another amount."
        );
        setCanDeposit(false);
      } else if (depositAmount < 100) {
        setCanDeposit(false);
        seterrorMsg("Minimum deposit amount is 100" + " " + selectedCoin.coin);
      } else {
        seterrorMsg("");
        setCanDeposit(true);
      }
    } else if (depositAmount === 0) {
      setCanDeposit(false);
    }
  }, [depositAmount, totalDeposited, poolCap]);

  useEffect(() => {
    if (chainId === 1) {
      setSelectedChain({
        icon: eth,
        chain: "Ethereum",
      });
      setSelectedCoin({
        icon: require(`./assets/${window.config.commitmenteth_tokens[0].symbol.toLowerCase()}.svg`),
        coin: window.config.commitmenteth_tokens[0].symbol,
        address: window.config.commitmenteth_tokens[0].address,
      });
      getUserBalanceForToken(window.config.commitmenteth_tokens[0]);
      setselectedToken(window.config.commitmenteth_tokens[0]);
    } else if (chainId === 56) {
      setSelectedChain({
        icon: bnb,
        chain: "BNB Chain",
      });

      setSelectedCoin({
        icon: require(`./assets/${window.config.commitmentbnb_tokens[0].symbol.toLowerCase()}.svg`),
        coin: window.config.commitmentbnb_tokens[0].symbol,
        address: window.config.commitmentbnb_tokens[0].address,
      });
      getUserBalanceForToken(window.config.commitmentbnb_tokens[0]);
      setselectedToken(window.config.commitmentbnb_tokens[0]);
    } else {
      setSelectedChain({
        icon: eth,
        chain: "Ethereum",
      });

      setSelectedCoin({
        icon: require(`./assets/${window.config.commitmenteth_tokens[0].symbol.toLowerCase()}.svg`),
        coin: window.config.commitmenteth_tokens[0].symbol,
        address: window.config.commitmenteth_tokens[0].address,
      });
      setTokenBalance(0);
      setselectedToken(window.config.commitmenteth_tokens[0]);
    }
  }, [isConnected, chainId, coinbase]);

  // useEffect(() => {
  //   if (isConnected && coinbase) {
  //     getUserCommitment();
  //   } else {
  //     setAllUserCommitments([]);
  //   }
  // }, [isConnected, coinbase]);

  const handleEthPool = async () => {
    await handleSwitchNetworkhook("0x61")
      .then(() => {
        handleSwitchNetwork("97");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (userPools && userPools.length > 0) {
      checkStakedPools();
    } else {
      sethasDypStaked(false);
      sethasiDypStaked(false);
    }
  }, [userPools]);

  // useEffect(() => {
  //   getTotalCommitment();
  // }, []);

  useEffect(() => {
    getInfo();
    getInfoTimer();
  }, [coinbase]);

  return (
    <div className="container-fluid whitelist-mainhero-wrapper token-wrapper px-0">
      <div className="d-flex flex-column">
        <WhitelistHero />
        <WhitelistContent
          isConnected={isConnected}
          chainId={chainId}
          coinbase={coinbase}
          onConnect={handleConnection}
          handleSwitchChain={handleEthPool}
          wodBalance={pendingTokens}
        />
        <div className="container-lg p-0">
          {allUserCommitments && allUserCommitments.length > 0 && (
            <div className="row mt-4">
              <div className="col-12">
                <div className="whitelist-info-item-2 d-flex flex-column">
                  <div className="d-flex align-items-center p-3 justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="mb-0 whitelist-deposit-title">
                        Commitment History
                      </h6>
                    </div>
                    <Tooltip
                      title={
                        <>
                          <div className="d-flex flex-column gap-2">
                            <span className="whitelist-tooltip-content-text">
                              After making a commitment, your status will
                              initially be set to <b>Successful.</b>
                            </span>
                            <span className="whitelist-tooltip-content-text">
                              Once the team reviews your commitment, there are
                              two possible outcomes:
                            </span>
                            <ul>
                              <li className="whitelist-tooltip-content-text mb-2">
                                <b>Approved:</b> You are eligible to receive the
                                WOD token.
                              </li>
                              <li className="whitelist-tooltip-content-text mb-2">
                                <b>Refund:</b> Committed funds are automatically
                                refunded.
                              </li>
                            </ul>
                          </div>
                        </>
                      }
                      enterDelay={0}
                      leaveDelay={0}
                    >
                      <img src={tooltipIcon} alt="" />
                    </Tooltip>
                  </div>
                  <div className="outer-table-wrapper p-3">
                    <table
                      border={0}
                      className="table item-history-table"
                      style={{ borderSpacing: "10px" }}
                    >
                      <thead className="item-history-table-thead">
                        <th className="item-history-table-th text-center">
                          No.
                        </th>
                        <th className="item-history-table-th text-center">
                          Date
                        </th>
                        <th className="item-history-table-th text-center">
                          Network
                        </th>
                        <th className="item-history-table-th text-center">
                          Wallet
                        </th>
                        <th className="item-history-table-th text-center">
                          Commited
                        </th>
                        <th className="item-history-table-th text-center">
                          WOD Amount
                        </th>
                        <th className="item-history-table-th text-center">
                          Status
                        </th>
                      </thead>
                      <tbody>
                        {allUserCommitments
                          .slice(0, slice)
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="item-history-table-td first-td left-border text-center">
                                  #{index + 1}
                                </td>
                                <td className="item-history-table-td text-center">
                                  {new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                  }).format(
                                    item.commitment_list.timestamp * 1000
                                  )}
                                </td>
                                <td className="item-history-table-td text-center">
                                  <div className="d-flex align-items-center justify-content-center gap-2">
                                    <img
                                      src={
                                        item.network === "BNB Chain" ? bnb : eth
                                      }
                                      alt=""
                                    />
                                    {item.network}
                                  </div>
                                </td>
                                <td className="item-history-table-td table-greentext text-center">
                                  <a
                                    className="table-greentext"
                                    href={
                                      item.network === "BNB Chain"
                                        ? `https://bscscan.com/address/${coinbase}`
                                        : `https://etherscan.io/address/${coinbase}`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {shortAddress(coinbase)}
                                  </a>
                                </td>
                                <td className="item-history-table-td text-center">
                                  {item.commitment_list.refunded === true
                                    ? "Refunded"
                                    : getFormattedNumber(
                                        item.network === "BNB Chain"
                                          ? item.commitment_list.amount / 1e18
                                          : item.commitment_list.amount / 1e6,
                                        2
                                      )}{" "}
                                  {item.token}
                                </td>
                                <td className="item-history-table-td right-border text-center">
                                  {item.commitment_list.refunded === true
                                    ? "Refunded"
                                    : getFormattedNumber(
                                        item.network === "BNB Chain"
                                          ? item.commitment_list.amount /
                                              1e18 /
                                              0.0325
                                          : item.commitment_list.amount /
                                              1e6 /
                                              0.0325,

                                        0
                                      )}{" "}
                                  WOD
                                </td>
                                <td className="item-history-table-td last-td table-greentext right-border text-center">
                                  {/* {item.commitment_list.refunded === true ? (
                              <button className="refund-btn">
                                {item.status}
                              </button>
                            ) : (
                              <> */}
                                  {item.commitment_list.accepted === false &&
                                  item.commitment_list.refunded === false
                                    ? "Successful"
                                    : item.commitment_list.accepted === true
                                    ? "Approved"
                                    : "Refund"}
                                  {/* </> */}
                                  {/* )} */}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  {loading && (
                    <div className="d-flex w-100 justify-content-center">
                      <div class="spinner-border text-info" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  {allUserCommitments && allUserCommitments.length > 5 && (
                    <div className="d-flex my-3 w-100 align-items-center justify-content-center">
                      <button
                        className="btn filledbtn"
                        onClick={handleViewMore}
                      >
                        {slice >= allUserCommitments.length
                          ? "View Less"
                          : "View More"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
