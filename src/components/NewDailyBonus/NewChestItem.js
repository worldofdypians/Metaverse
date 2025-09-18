import React, { useState, useEffect } from "react";
import errorSound from "./assets/error.mp3";
import axios from "axios";
import Web3 from "web3";
import { ethers } from "ethers";

const NewChestItem = ({
  item,
  selectedChest,
  chainId,
  chain,
  isPremium,
  onClaimRewards,
  onLoadingChest,
  onChestStatus,
  handleShowRewards,
  address,
  email,
  rewardTypes,
  chestId,
  chestIndex,
  open,
  disableBtn,
  isActive,
  isActiveIndex,
  buyNftPopup,
  dummypremiumChests,
  claimingChest,
  setClaimingChest,
  image,
  coinbase,
  binanceW3WProvider,
  walletClient,
  publicClient,
  openKickstarter,
  closeDaily,
}) => {
  const [shake, setShake] = useState(false);
  const [ischestOpen, setIsChestOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const premiumImages = [
    "blueCrystal",
    "purpleCrystal",
    "cyanCrystal",
    "greenCrystal",
    "yellowCrystal",
    "greenCrystal",
    "cyanCrystal",
    "blueCrystal",
    "yellowCrystal",
    "purpleCrystal",
  ];

  const getUserRewardsByChest2 = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData_bnb
        )
        .catch((e) => {
          onLoadingChest(false);
          setLoading(false);
          setClaimingChest(false);

          setIsChestOpen(false);
          window.alertify.error(e?.message);
          onChestStatus("error");
          const timer = setTimeout(() => {
            onChestStatus("initial");
          }, 3000);
          return () => clearTimeout(timer);
        });
      if (result && result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);

        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      }
    } else {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData
        )
        .catch((e) => {
          onLoadingChest(false);
          setLoading(false);
          setClaimingChest(false);

          setIsChestOpen(false);
          window.alertify.error(e?.message);
          onChestStatus("error");
          const timer = setTimeout(() => {
            onChestStatus("initial");
          }, 3000);
          return () => clearTimeout(timer);
        });
      if (result && result.status === 200) {
        // if (chainText === "opbnb" || chainText === "bnb") {
        //   handleSecondTask(coinbase);
        // }
        onClaimRewards(result.data);
        setIsChestOpen(true);
        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      }
    }
  };

  const getUserRewardsByChest = async (
    userEmail,
    txHash,
    chestId,
    chainText
  ) => {
    const userData = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
    };

    const userData_bnb = {
      transactionHash: txHash,
      emailAddress: userEmail,
      chestIndex: chestId,
      chainId: chainText,
    };

    if (chainText) {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData_bnb
        )
        .catch((e) => {
          if (
            e.response.status === 400 ||
            (e.response.status === 500 && e.response.data.description === "")
          ) {
            const timer = setTimeout(() => {
              getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
            }, 2000);
            return () => clearTimeout(timer);
          } else {
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            setIsChestOpen(false);
            window.alertify.error(e?.message);
            console.error(e);
            onChestStatus("error");
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          }
        });
      if (result && result.status === 200) {
        // if (chainText === "opbnb" || chainText === "bnb") {
        //   handleSecondTask(coinbase);
        // }
        onClaimRewards(result.data);
        setIsChestOpen(true);
        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      }
    } else {
      const result = await axios
        .post(
          "https://worldofdypiansdailybonus.azurewebsites.net/api/CollectChest",
          userData
        )
        .catch((e) => {
          if (
            e.response.status === 400 ||
            (e.response.status === 500 && e.response.data.description === "")
          ) {
            const timer = setTimeout(() => {
              getUserRewardsByChest2(userEmail, txHash, chestId, chainText);
            }, 2000);
            return () => clearTimeout(timer);
          } else {
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            setIsChestOpen(false);
            window.alertify.error(e?.message);
            console.error(e);
            onChestStatus("error");
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          }
        });
      if (result && result.status === 200) {
        onClaimRewards(result.data);
        setIsChestOpen(true);
        // onChestStatus("success");
        onLoadingChest(false);
        setLoading(false);
        setClaimingChest(false);
      }
      //  else {
      //   onLoadingChest(false);
      //   setLoading(false);
      //   setClaimingChest(false);

      //   setIsChestOpen(false);
      //   window.alertify.error(result?.message);
      //   onChestStatus("error");
      //   setTimeout(() => {
      //     onChestStatus("initial");
      //   }, 3000);
      // }
    }
  };

  let count = 1;
  const handleCheckIfTxExists = async (
    email,
    txHash,
    chestIndex,
    chainText
  ) => {
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      window.web3 = new Web3(window.ethereum);
      const txResult = await window.web3.eth
        .getTransaction(txHash)
        .catch((e) => {
          console.error(e);
        });

      console.log(txResult);

      if (txResult) {
        getUserRewardsByChest(email, txHash, chestIndex, chainText);
      } else {
        if (count < 10) {
          const timer = setTimeout(
            () => {
              handleCheckIfTxExists(txHash);
            },
            count === 9 ? 5000 : 2000
          );
          return () => clearTimeout(timer);
        } else {
          window.alertify.error("Something went wrong.");
          onChestStatus("error");
          onLoadingChest(false);
          setLoading(false);
          setClaimingChest(false);
          const timer = setTimeout(() => {
            onChestStatus("initial");
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
      count = count + 1;
    } else if (window.WALLET_TYPE === "binance") {
      const txResult_binance = await binanceW3WProvider
        .getTransaction(txHash)
        .catch((e) => {
          console.error(e);
        });
      console.log(txResult_binance);

      if (txResult_binance) {
        getUserRewardsByChest(email, txHash, chestIndex, chainText);
      } else {
        if (count < 10) {
          const timer = setTimeout(
            () => {
              handleCheckIfTxExists(txHash);
            },
            count === 9 ? 5000 : 2000
          );
          return () => clearTimeout(timer);
        } else {
          window.alertify.error("Something went wrong.");
          onChestStatus("error");
          onLoadingChest(false);
          setLoading(false);
          setClaimingChest(false);
          const timer = setTimeout(() => {
            onChestStatus("initial");
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
      count = count + 1;
    } else if (window.WALLET_TYPE === "matchId") {
      console.log(txHash);
      const txResult_matchain = await publicClient
        .getTransaction({ hash: txHash })
        .catch((e) => {
          console.error(e);
        });
      console.log(txResult_matchain, txHash);

      if (txResult_matchain) {
        getUserRewardsByChest(email, txHash, chestIndex, chainText);
      } else {
        if (count < 10) {
          const timer = setTimeout(
            () => {
              handleCheckIfTxExists(txHash);
            },
            count === 9 ? 5000 : 2000
          );
          return () => clearTimeout(timer);
        } else {
          window.alertify.error("Something went wrong.");
          onChestStatus("error");
          onLoadingChest(false);
          setLoading(false);
          setClaimingChest(false);
          const timer = setTimeout(() => {
            onChestStatus("initial");
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
      count = count + 1;
    }
  };

  const handleThirdTask = async (wallet) => {
    const result2 = await axios
      .get(`https://api.worldofdypians.com/api/dappbay/task1/${wallet}`)
      .catch((e) => {
        console.error(e);
      });
    if (result2 && result2.status === 200) {
      console.log(result2);
    }
  };

  const handleOpenChest = async () => {
    onChestStatus("waiting");
    onLoadingChest(true);
    setLoading(true);
    setClaimingChest(true);

    window.web3 = new Web3(window.ethereum);
    // console.log(window.config.daily_bonus_address, address);
    const daily_bonus_contract = new window.web3.eth.Contract(
      window.DAILY_BONUS_ABI,
      window.config.daily_bonus_address
    );

    const daily_bonus_contract_bnb = new window.web3.eth.Contract(
      window.DAILY_BONUS_BNB_ABI,
      window.config.daily_bonus_bnb_address
    );

    const daily_bonus_contract_skale = new window.web3.eth.Contract(
      window.DAILY_BONUS_SKALE_ABI,
      window.config.daily_bonus_skale_address
    );

    const daily_bonus_contract_core = new window.web3.eth.Contract(
      window.DAILY_BONUS_CORE_ABI,
      window.config.daily_bonus_core_address
    );

    const daily_bonus_contract_viction = new window.web3.eth.Contract(
      window.DAILY_BONUS_VICTION_ABI,
      window.config.daily_bonus_viction_address
    );

    const daily_bonus_contract_manta = new window.web3.eth.Contract(
      window.DAILY_BONUS_MANTA_ABI,
      window.config.daily_bonus_manta_address
    );

    const daily_bonus_contract_base = new window.web3.eth.Contract(
      window.DAILY_BONUS_BASE_ABI,
      window.config.daily_bonus_base_address
    );

    const daily_bonus_contract_taiko = new window.web3.eth.Contract(
      window.DAILY_BONUS_TAIKO_ABI,
      window.config.daily_bonus_taiko_address
    );
    const daily_bonus_contract_taraxa = new window.web3.eth.Contract(
      window.DAILY_BONUS_TARAXA_ABI,
      window.config.daily_bonus_taraxa_address
    );

    const daily_bonus_contract_mat = new window.web3.eth.Contract(
      window.DAILY_BONUS_MAT_ABI,
      window.config.daily_bonus_mat_address
    );

    const daily_bonus_contract_sei = new window.web3.eth.Contract(
      window.DAILY_BONUS_SEI_ABI,
      window.config.daily_bonus_sei_address
    );
    const daily_bonus_contract_vanar = new window.web3.eth.Contract(
      window.DAILY_BONUS_SEI_ABI,
      window.config.daily_bonus_vanar_address
    );

    // console.log(daily_bonus_contract);
    if (chainId === 204) {
      if (window.WALLET_TYPE !== "binance") {
        if (rewardTypes === "premium" && isPremium) {
          await daily_bonus_contract.methods
            .openPremiumChest()
            .send({
              from: address,
            })
            .then((data) => {
              getUserRewardsByChest(
                email,
                data.transactionHash,
                chestIndex - 1,
                "opbnb"
              );
              // handleThirdTask(coinbase);
            })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);

              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        } else if (rewardTypes === "standard") {
          await daily_bonus_contract.methods
            .openChest()
            .send({
              from: address,
            })
            .then((data) => {
              getUserRewardsByChest(
                email,
                data.transactionHash,
                chestIndex - 1,
                "opbnb"
              );
              // handleThirdTask(coinbase);
            })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        }
      } else if (window.WALLET_TYPE === "binance") {
        const daily_bonus_contract_opbnb_binance = new ethers.Contract(
          window.config.daily_bonus_address,
          window.DAILY_BONUS_ABI,
          binanceW3WProvider.getSigner()
        );
        if (rewardTypes === "premium" && isPremium) {
          const txResponse = await daily_bonus_contract_opbnb_binance
            .openPremiumChest()
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "opbnb"
            );
            // handleThirdTask(coinbase);
          }
        } else if (rewardTypes === "standard") {
          const txResponse = await daily_bonus_contract_opbnb_binance
            .openChest()
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "opbnb"
            );
            // handleThirdTask(coinbase);
          }
        }
      }
    } else if (chainId === 1116) {
      if (rewardTypes === "premium" && isPremium) {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.coreWeb3.eth.getGasPrice().catch((e) => {
          console.error(e);
        });
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 1.3;
        console.log("increasedGwei", increasedGwei);
        let transactionHash = null;
        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };
        await daily_bonus_contract_core.methods
          .openPremiumChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_core.methods
          .openPremiumChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .once("transactionHash", (hash) => {
            transactionHash = hash;
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "core"
            );
          })
          .catch(async (e) => {
            console.log(e);
            if (
              e?.message &&
              e.message.includes("Failed to check for transaction receipt")
            ) {
              // Poll for the receipt
              let receipt = null;
              const web3 = new Web3(window.ethereum);
              const interval = setInterval(async () => {
                receipt = await web3.eth
                  .getTransactionReceipt(transactionHash)
                  .catch((error) => {
                    console.log(error);
                  });
                if (receipt) {
                  clearInterval(interval);
                  if (receipt.status) {
                    // Transaction succeeded
                    handleCheckIfTxExists(
                      email,
                      transactionHash,
                      chestIndex - 1,
                      "core"
                    );
                  } else {
                    // Transaction failed on-chain
                    window.alertify.error("Transaction failed on-chain.");
                    onChestStatus("error");
                    onLoadingChest(false);
                    setLoading(false);
                    setClaimingChest(false);
                    const timer = setTimeout(() => {
                      onChestStatus("initial");
                    }, 3000);
                    return () => clearTimeout(timer);
                  }
                }
              }, 5000); // Poll every 2 seconds
            } else {
              // Handle other errors normally
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            }
          });
        // .catch((e) => {
        //   window.alertify.error(e?.message);
        //   onChestStatus("error");
        //   setTimeout(() => {
        //     onChestStatus("initial");
        //   }, 3000);
        //   onLoadingChest(false);
        //   setLoading(false);
        //   setClaimingChest(false);
        //   console.error(e);
        // });
      } else if (rewardTypes === "standard") {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.coreWeb3.eth.getGasPrice().catch((e) => {
          console.error(e);
        });
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 2;
        console.log("increasedGwei", increasedGwei);
        let transactionHash = null;
        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_core.methods
          .openChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_core.methods
          .openChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .once("transactionHash", (hash) => {
            transactionHash = hash;
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "core"
            );
          })
          .catch(async (e) => {
            // Check if the error is related to transaction receipt
            console.log(e, typeof e);
            if (
              e?.message &&
              e.message.includes("Failed to check for transaction receipt")
            ) {
              // Poll for the receipt
              let receipt = null;
              const web3 = new Web3(window.ethereum);
              const interval = setInterval(async () => {
                receipt = await web3.eth
                  .getTransactionReceipt(transactionHash)
                  .catch((error) => {
                    console.log(error);
                  });
                if (receipt) {
                  clearInterval(interval);
                  if (receipt.status) {
                    // Transaction succeeded
                    handleCheckIfTxExists(
                      email,
                      transactionHash,
                      chestIndex - 1,
                      "core"
                    );
                  } else {
                    // Transaction failed on-chain
                    window.alertify.error("Transaction failed on-chain.");
                    onChestStatus("error");
                    onLoadingChest(false);
                    setLoading(false);
                    setClaimingChest(false);
                    const timer = setTimeout(() => {
                      onChestStatus("initial");
                    }, 3000);
                    return () => clearTimeout(timer);
                  }
                }
              }, 5000);
            } else {
              // Handle other errors normally
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            }
          });
        // .catch((e) => {
        //   window.alertify.error(e?.message);
        //   onChestStatus("error");
        //   setTimeout(() => {
        //     onChestStatus("initial");
        //   }, 3000);
        //   onLoadingChest(false);
        //   setLoading(false);
        //   setClaimingChest(false);
        //   console.error(e);
        // });
      }
    } else if (chainId === 88) {
      if (rewardTypes === "premium" && isPremium) {
        let transactionHash = null;
        await daily_bonus_contract_viction.methods
          .openPremiumChest()
          .send({
            from: address,
          })
          .once("transactionHash", (hash) => {
            transactionHash = hash;
          })

          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "viction"
            );
          })
          .catch((e) => {
            console.log(e);
            if (
              e?.message &&
              e.message.includes("Failed to check for transaction receipt")
            ) {
              // Poll for the receipt
              let receipt = null;
              const web3 = new Web3(window.ethereum);
              const interval = setInterval(async () => {
                receipt = await web3.eth
                  .getTransactionReceipt(transactionHash)
                  .catch((error) => {
                    console.log(error);
                  });
                if (receipt) {
                  clearInterval(interval);
                  if (receipt.status) {
                    // Transaction succeeded
                    handleCheckIfTxExists(
                      email,
                      transactionHash,
                      chestIndex - 1,
                      "viction"
                    );
                  } else {
                    // Transaction failed on-chain
                    window.alertify.error("Transaction failed on-chain.");
                    onChestStatus("error");
                    onLoadingChest(false);
                    setLoading(false);
                    setClaimingChest(false);
                    const timer = setTimeout(() => {
                      onChestStatus("initial");
                    }, 3000);
                    return () => clearTimeout(timer);
                  }
                }
              }, 5000); // Poll every 2 seconds
            } else {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            }
          });
      } else if (rewardTypes === "standard") {
        let transactionHash = null;
        await daily_bonus_contract_viction.methods
          .openChest()
          .send({
            from: address,
          })
          .once("transactionHash", (hash) => {
            transactionHash = hash;
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "viction"
            );
          })
          .catch((e) => {
            if (
              e?.message &&
              e.message.includes("Failed to check for transaction receipt")
            ) {
              // Poll for the receipt
              let receipt = null;
              const web3 = new Web3(window.ethereum);
              const interval = setInterval(async () => {
                receipt = await web3.eth
                  .getTransactionReceipt(transactionHash)
                  .catch((error) => {
                    console.log(error);
                  });
                if (receipt) {
                  clearInterval(interval);
                  if (receipt.status) {
                    // Transaction succeeded
                    handleCheckIfTxExists(
                      email,
                      transactionHash,
                      chestIndex - 1,
                      "viction"
                    );
                  } else {
                    // Transaction failed on-chain
                    window.alertify.error("Transaction failed on-chain.");
                    onChestStatus("error");
                    onLoadingChest(false);
                    setLoading(false);
                    setClaimingChest(false);
                    const timer = setTimeout(() => {
                      onChestStatus("initial");
                    }, 3000);
                    return () => clearTimeout(timer);
                  }
                }
              }, 5000); // Poll every 2 seconds
            } else {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            }
          });
      }
    } else if (chainId === 2040) {
      if (rewardTypes === "premium" && isPremium) {
        let transactionHash = null;
        await daily_bonus_contract_vanar.methods
          .openPremiumChest()
          .send({
            from: address,
          })
          .once("transactionHash", (hash) => {
            transactionHash = hash;
          })

          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "vanar"
            );
          })
          .catch((e) => {
            console.log(e);
            if (
              e?.message &&
              e.message.includes("Failed to check for transaction receipt")
            ) {
              // Poll for the receipt
              let receipt = null;
              const web3 = new Web3(window.ethereum);
              const interval = setInterval(async () => {
                receipt = await web3.eth
                  .getTransactionReceipt(transactionHash)
                  .catch((error) => {
                    console.log(error);
                  });
                if (receipt) {
                  clearInterval(interval);
                  if (receipt.status) {
                    // Transaction succeeded
                    handleCheckIfTxExists(
                      email,
                      transactionHash,
                      chestIndex - 1,
                      "vanar"
                    );
                  } else {
                    // Transaction failed on-chain
                    window.alertify.error("Transaction failed on-chain.");
                    onChestStatus("error");
                    onLoadingChest(false);
                    setLoading(false);
                    setClaimingChest(false);
                    const timer = setTimeout(() => {
                      onChestStatus("initial");
                    }, 3000);
                    return () => clearTimeout(timer);
                  }
                }
              }, 5000); // Poll every 2 seconds
            } else {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            }
          });
      } else if (rewardTypes === "standard") {
        let transactionHash = null;
        await daily_bonus_contract_vanar.methods
          .openChest()
          .send({
            from: address,
          })
          .once("transactionHash", (hash) => {
            transactionHash = hash;
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "vanar"
            );
          })
          .catch((e) => {
            if (
              e?.message &&
              e.message.includes("Failed to check for transaction receipt")
            ) {
              // Poll for the receipt
              let receipt = null;
              const web3 = new Web3(window.ethereum);
              const interval = setInterval(async () => {
                receipt = await web3.eth
                  .getTransactionReceipt(transactionHash)
                  .catch((error) => {
                    console.log(error);
                  });
                if (receipt) {
                  clearInterval(interval);
                  if (receipt.status) {
                    // Transaction succeeded
                    handleCheckIfTxExists(
                      email,
                      transactionHash,
                      chestIndex - 1,
                      "vanar"
                    );
                  } else {
                    // Transaction failed on-chain
                    window.alertify.error("Transaction failed on-chain.");
                    onChestStatus("error");
                    onLoadingChest(false);
                    setLoading(false);
                    setClaimingChest(false);
                    const timer = setTimeout(() => {
                      onChestStatus("initial");
                    }, 3000);
                    return () => clearTimeout(timer);
                  }
                }
              }, 5000); // Poll every 2 seconds
            } else {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            }
          });
      }
    } else if (chainId === 169) {
      if (window.WALLET_TYPE !== "binance") {
        if (rewardTypes === "premium" && isPremium) {
          const web3 = new Web3(window.ethereum);
          const gasPrice = await window.mantaWeb3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          // const increasedGwei = parseInt(currentGwei) + 0.01;
          // console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_manta.methods
            .openPremiumChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_manta.methods
            .openPremiumChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            .then((data) => {
              handleCheckIfTxExists(
                email,
                data.transactionHash,
                chestIndex - 1,
                "manta"
              );
            })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        } else if (rewardTypes === "standard") {
          const web3 = new Web3(window.ethereum);
          const gasPrice = await window.mantaWeb3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          // const increasedGwei = parseInt(currentGwei) + 0.01;
          // console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_manta.methods
            .openChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_manta.methods
            .openChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            .then((data) => {
              handleCheckIfTxExists(
                email,
                data.transactionHash,
                chestIndex - 1,
                "manta"
              );
            })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        }
      } else if (window.WALLET_TYPE === "binance") {
        const daily_bonus_contract_manta_binance = new ethers.Contract(
          window.config.daily_bonus_manta_address,
          window.DAILY_BONUS_MANTA_ABI,
          binanceW3WProvider.getSigner()
        );
        if (rewardTypes === "premium" && isPremium) {
          // const web3 = new Web3(window.ethereum);
          const gasPrice = await binanceW3WProvider.getGasPrice();
          const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
          const gasPriceInWei = ethers.utils.parseUnits(
            currentGwei.toString().slice(0, 14),
            "gwei"
          );

          const transactionParameters = {
            gasPrice: gasPriceInWei,
          };

          let gasLimit;
          try {
            gasLimit =
              await daily_bonus_contract_manta_binance.estimateGas.openPremiumChest();
            transactionParameters.gasLimit = gasLimit;
            console.log("transactionParameters", transactionParameters);
          } catch (error) {
            console.error(error);
          }

          // await daily_bonus_contract_manta.methods
          //   .openPremiumChest()
          //   .estimateGas({ from: address })
          //   .then((gas) => {
          //     transactionParameters.gas = web3.utils.toHex(gas);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          // console.log(transactionParameters);

          const txResponse = await daily_bonus_contract_manta_binance
            .openPremiumChest({ ...transactionParameters })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "manta"
            );
          }
        } else if (rewardTypes === "standard") {
          const gasPrice = await binanceW3WProvider.getGasPrice();
          const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
          const gasPriceInWei = ethers.utils.parseUnits(
            currentGwei.toString().slice(0, 14),
            "gwei"
          );

          const transactionParameters = {
            gasPrice: gasPriceInWei,
          };

          let gasLimit;
          try {
            gasLimit =
              await daily_bonus_contract_manta_binance.estimateGas.openChest();
            transactionParameters.gasLimit = gasLimit;
            console.log("transactionParameters", transactionParameters);
          } catch (error) {
            console.error(error);
          }

          const txResponse = await daily_bonus_contract_manta_binance
            .openChest({ ...transactionParameters })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "manta"
            );
          }
        }
      }
    } else if (chainId === 8453) {
      if (window.WALLET_TYPE !== "binance") {
        if (rewardTypes === "premium" && isPremium) {
          const web3 = new Web3(window.ethereum);
          const gasPrice = await window.baseWeb3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          // const increasedGwei = parseInt(currentGwei) + 0.01;
          // console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_base.methods
            .openPremiumChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_base.methods
            .openPremiumChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            .then((data) => {
              handleCheckIfTxExists(
                email,
                data.transactionHash,
                chestIndex - 1,
                "base"
              );
            })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        } else if (rewardTypes === "standard") {
          const web3 = new Web3(window.ethereum);
          const gasPrice = await window.baseWeb3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          // const increasedGwei = parseInt(currentGwei) + 0.01;
          // console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_base.methods
            .openChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_base.methods
            .openChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            .then((data) => {
              handleCheckIfTxExists(
                email,
                data.transactionHash,
                chestIndex - 1,
                "base"
              );
            })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        }
      } else if (window.WALLET_TYPE === "binance") {
        const daily_bonus_contract_base_binance = new ethers.Contract(
          window.config.daily_bonus_base_address,
          window.DAILY_BONUS_BASE_ABI,
          binanceW3WProvider.getSigner()
        );
        if (rewardTypes === "premium" && isPremium) {
          // const web3 = new Web3(window.ethereum);
          const gasPrice = await binanceW3WProvider.getGasPrice();
          const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
          const gasPriceInWei = ethers.utils.parseUnits(
            currentGwei.toString().slice(0, 14),
            "gwei"
          );

          const transactionParameters = {
            gasPrice: gasPriceInWei,
          };

          let gasLimit;
          try {
            gasLimit =
              await daily_bonus_contract_base_binance.estimateGas.openPremiumChest();
            transactionParameters.gasLimit = gasLimit;
            console.log("transactionParameters", transactionParameters);
          } catch (error) {
            console.error(error);
          }

          // await daily_bonus_contract_manta.methods
          //   .openPremiumChest()
          //   .estimateGas({ from: address })
          //   .then((gas) => {
          //     transactionParameters.gas = web3.utils.toHex(gas);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          // console.log(transactionParameters);

          const txResponse = await daily_bonus_contract_base_binance
            .openPremiumChest({ ...transactionParameters })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "base"
            );
          }
        } else if (rewardTypes === "standard") {
          const gasPrice = await binanceW3WProvider.getGasPrice();
          const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
          const gasPriceInWei = ethers.utils.parseUnits(
            currentGwei.toString().slice(0, 14),
            "gwei"
          );

          const transactionParameters = {
            gasPrice: gasPriceInWei,
          };

          let gasLimit;
          try {
            gasLimit =
              await daily_bonus_contract_base_binance.estimateGas.openChest();
            transactionParameters.gasLimit = gasLimit;
            console.log("transactionParameters", transactionParameters);
          } catch (error) {
            console.error(error);
          }

          const txResponse = await daily_bonus_contract_base_binance
            .openChest({ ...transactionParameters })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "base"
            );
          }
        }
      }
    } else if (chainId === 167000) {
      if (rewardTypes === "premium" && isPremium) {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.taikoWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        // const increasedGwei = parseInt(currentGwei) + 0.01;
        // console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_taiko.methods
          .openPremiumChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_taiko.methods
          .openPremiumChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "taiko"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            onChestStatus("error");
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            console.error(e);
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          });
      } else if (rewardTypes === "standard") {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.taikoWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        // const increasedGwei = parseInt(currentGwei) + 0.01;
        // console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_taiko.methods
          .openChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_taiko.methods
          .openChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "taiko"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            onChestStatus("error");
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          });
      }
    } else if (chainId === 841) {
      if (rewardTypes === "premium" && isPremium) {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.taraxaWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        // const increasedGwei = parseInt(currentGwei) + 0.01;
        // console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_taraxa.methods
          .openPremiumChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_taraxa.methods
          .openPremiumChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "taraxa"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            console.error(e);
          });
      } else if (rewardTypes === "standard") {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.taraxaWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        // const increasedGwei = parseInt(currentGwei) + 0.01;
        // console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_taraxa.methods
          .openChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_taraxa.methods
          .openChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "taraxa"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            onChestStatus("error");
            setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
          });
      }
    } else if (chainId === 1329) {
      if (rewardTypes === "premium" && isPremium) {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.seiWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        // const increasedGwei = parseInt(currentGwei) + 0.01;
        // console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_sei.methods
          .openPremiumChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_sei.methods
          .openPremiumChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "sei"
            );
          })
          .catch((e) => {
            window.alertify.error(e?.message);
            onChestStatus("error");
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            console.error(e);
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          });
      } else if (rewardTypes === "standard") {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.seiWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        // const increasedGwei = parseInt(currentGwei) + 0.01;
        // console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_sei.methods
          .openChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_sei.methods
          .openChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "sei"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e?.message);
            onChestStatus("error");
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          });
      }
    } else if (chainId === 698) {
      if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          if (rewardTypes === "premium" && isPremium) {
            const result = await walletClient
              .writeContract({
                address: window.config.daily_bonus_mat_address,
                abi: window.DAILY_BONUS_MAT_ABI,
                functionName: "openPremiumChest",
                args: [],
              })
              .catch((e) => {
                window.alertify.error(e?.shortMessage);
                onChestStatus("error");
                onLoadingChest(false);
                setLoading(false);
                setClaimingChest(false);
                console.error(e);
                const timer = setTimeout(() => {
                  onChestStatus("initial");
                }, 3000);
                return () => clearTimeout(timer);
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
                console.log("Transaction confirmed:", receipt);
                handleCheckIfTxExists(
                  email,
                  result,
                  chestIndex - 1,
                  "matchain"
                );
              }
            }
          } else if (rewardTypes === "standard") {
            const result = await walletClient
              .writeContract({
                address: window.config.daily_bonus_mat_address,
                abi: window.DAILY_BONUS_MAT_ABI,
                functionName: "openChest",
                args: [],
              })
              .catch((e) => {
                window.alertify.error(e?.shortMessage);
                onChestStatus("error");
                onLoadingChest(false);
                setLoading(false);
                setClaimingChest(false);
                console.error(e);
                const timer = setTimeout(() => {
                  onChestStatus("initial");
                }, 3000);
                return () => clearTimeout(timer);
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
                console.log("Transaction confirmed:", receipt);
                handleCheckIfTxExists(
                  email,
                  result,
                  chestIndex - 1,
                  "matchain"
                );
              }
            }
          }
        }
      } else {
        if (rewardTypes === "premium" && isPremium) {
          const web3 = new Web3(window.ethereum);
          const gasPrice = await window.matWeb3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          // const increasedGwei = parseInt(currentGwei) + 0.01;
          // console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_mat.methods
            .openPremiumChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_mat.methods
            .openPremiumChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            .then((data) => {
              handleCheckIfTxExists(
                email,
                data.transactionHash,
                chestIndex - 1,
                "matchain"
              );
            })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        } else if (rewardTypes === "standard") {
          const web3 = new Web3(window.ethereum);
          const gasPrice = await window.matWeb3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          // const increasedGwei = parseInt(currentGwei) + 0.01;
          // console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(currentGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_mat.methods
            .openChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_mat.methods
            .openChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            .then((data) => {
              handleCheckIfTxExists(
                email,
                data.transactionHash,
                chestIndex - 1,
                "matchain"
              );
            })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        }
      }
    } else if (chainId === 56) {
      if (
        window.WALLET_TYPE !== "binance" &&
        window.WALLET_TYPE !== "matchId"
      ) {
        if (rewardTypes === "premium" && isPremium) {
          const web3 = new Web3(window.ethereum);
          const gasPrice = await web3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          const increasedGwei = parseInt(currentGwei) + 1;
          console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_bnb.methods
            .openPremiumChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_bnb.methods
            .openPremiumChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            // .then(() => {
            //
            //   setTimeout(() => {
            //     onOpenChest();
            // onChestStatus("success");
            //     // setIsChestOpen(true);
            //     onLoadingChest(false);
            //   }, 3000);
            // })
            .then((data) => {
              getUserRewardsByChest(
                email,
                data.transactionHash,
                chestIndex - 1,
                "bnb"
              );
              // handleThirdTask(coinbase);
            })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);

              console.error(e);
            });
        } else if (rewardTypes === "standard") {
          // console.log("standard");

          const web3 = new Web3(window.ethereum);
          const gasPrice = await web3.eth.getGasPrice();
          console.log("gasPrice", gasPrice);
          const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
          const increasedGwei = parseInt(currentGwei) + 1;
          console.log("increasedGwei", increasedGwei);

          const transactionParameters = {
            gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
          };

          await daily_bonus_contract_bnb.methods
            .openChest()
            .estimateGas({ from: address })
            .then((gas) => {
              transactionParameters.gas = web3.utils.toHex(gas);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(transactionParameters);

          await daily_bonus_contract_bnb.methods
            .openChest()
            .send({
              from: address,
              ...transactionParameters,
            })
            .then((data) => {
              getUserRewardsByChest(
                email,
                data.transactionHash,
                chestIndex - 1,
                "bnb"
              );
              // handleThirdTask(coinbase);
            })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });
        }
      } else if (window.WALLET_TYPE === "matchId") {
        if (walletClient) {
          if (rewardTypes === "premium" && isPremium) {
            const result = await walletClient
              .writeContract({
                address: window.config.daily_bonus_bnb_address,
                abi: window.DAILY_BONUS_BNB_ABI,
                functionName: "openPremiumChest",
                args: [],
              })
              .catch((e) => {
                window.alertify.error(e?.shortMessage);
                onChestStatus("error");
                onLoadingChest(false);
                setLoading(false);
                setClaimingChest(false);
                console.error(e);
                const timer = setTimeout(() => {
                  onChestStatus("initial");
                }, 3000);
                return () => clearTimeout(timer);
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
                console.log("Transaction confirmed:", receipt);
                handleCheckIfTxExists(email, result, chestIndex - 1, "bnb");
              }
            }
          } else if (rewardTypes === "standard") {
            const result = await walletClient
              .writeContract({
                address: window.config.daily_bonus_bnb_address,
                abi: window.DAILY_BONUS_BNB_ABI,
                functionName: "openChest",
                args: [],
              })
              .catch((e) => {
                window.alertify.error(e?.shortMessage);
                onChestStatus("error");
                onLoadingChest(false);
                setLoading(false);
                setClaimingChest(false);
                console.error(e);
                const timer = setTimeout(() => {
                  onChestStatus("initial");
                }, 3000);
                return () => clearTimeout(timer);
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
                console.log("Transaction confirmed:", receipt);
                handleCheckIfTxExists(email, result, chestIndex - 1, "bnb");
              }
            }
          }
        }
      } else if (window.WALLET_TYPE === "binance") {
        const daily_bonus_contract_bnb_binance = new ethers.Contract(
          window.config.daily_bonus_bnb_address,
          window.DAILY_BONUS_BNB_ABI,
          binanceW3WProvider.getSigner()
        );
        if (rewardTypes === "premium" && isPremium) {
          const gasPrice = await binanceW3WProvider.getGasPrice();
          const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
          const gasPriceInWei = ethers.utils.parseUnits(
            currentGwei.toString().slice(0, 14),
            "gwei"
          );

          const transactionParameters = {
            gasPrice: gasPriceInWei,
          };

          let gasLimit;
          try {
            gasLimit =
              await daily_bonus_contract_bnb_binance.estimateGas.openPremiumChest();
            transactionParameters.gasLimit = gasLimit;
            console.log("transactionParameters", transactionParameters);
          } catch (error) {
            console.error(error);
          }

          const txResponse = await daily_bonus_contract_bnb_binance
            .openPremiumChest({ ...transactionParameters })
            // .send({
            //   from: address,
            //   ...transactionParameters,
            // })
            // .then(() => {
            //
            //   setTimeout(() => {
            //     onOpenChest();
            // onChestStatus("success");
            //     // setIsChestOpen(true);
            //     onLoadingChest(false);
            //   }, 3000);
            // })
            .catch((e) => {
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);

              console.error(e);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "bnb"
            );
            // handleThirdTask(coinbase);
          }
        } else if (rewardTypes === "standard") {
          const gasPrice = await binanceW3WProvider.getGasPrice();
          const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
          const gasPriceInWei = ethers.utils.parseUnits(
            currentGwei.toString().slice(0, 14),
            "gwei"
          );

          const transactionParameters = {
            gasPrice: gasPriceInWei,
          };

          let gasLimit;
          try {
            gasLimit =
              await daily_bonus_contract_bnb_binance.estimateGas.openPremiumChest();
            transactionParameters.gasLimit = gasLimit;
            console.log("transactionParameters", transactionParameters);
          } catch (error) {
            console.error(error);
          }

          const txResponse = await daily_bonus_contract_bnb_binance
            .openChest({ ...transactionParameters })
            // .send({
            //   from: address,
            //   ...transactionParameters,
            // })
            .catch((e) => {
              console.error(e);
              window.alertify.error(e?.message);
              onChestStatus("error");
              onLoadingChest(false);
              setLoading(false);
              setClaimingChest(false);
              const timer = setTimeout(() => {
                onChestStatus("initial");
              }, 3000);
              return () => clearTimeout(timer);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            getUserRewardsByChest(
              email,
              txResponse.hash,
              chestIndex - 1,
              "bnb"
            );
            // handleThirdTask(coinbase);
          }
        }
      }
    } else if (chainId === 1482601649) {
      if (rewardTypes === "premium" && isPremium) {
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.skaleWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 0.0001;
        console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_skale.methods
          .openPremiumChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_skale.methods
          .openPremiumChest()
          .send({
            from: address,
            ...transactionParameters,
          })

          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "skale"
            );
          })
          .catch((e) => {
            window.alertify.error(e.revertReason ?? e?.message);
            onChestStatus("error");
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);

            console.error(e);
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          });
      } else if (rewardTypes === "standard") {
        // console.log("standard");
        const web3 = new Web3(window.ethereum);
        const gasPrice = await window.skaleWeb3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 0.0001;
        console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await daily_bonus_contract_skale.methods
          .openChest()
          .estimateGas({ from: address })
          .then((gas) => {
            transactionParameters.gas = web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(transactionParameters);

        await daily_bonus_contract_skale.methods
          .openChest()
          .send({
            from: address,
            ...transactionParameters,
          })
          .then((data) => {
            handleCheckIfTxExists(
              email,
              data.transactionHash,
              chestIndex - 1,
              "skale"
            );
          })
          .catch((e) => {
            console.error(e);
            window.alertify.error(e.revertReason ?? e?.message);
            onChestStatus("error");
            onLoadingChest(false);
            setLoading(false);
            setClaimingChest(false);
            const timer = setTimeout(() => {
              onChestStatus("initial");
            }, 3000);
            return () => clearTimeout(timer);
          });
      }
    }
  };

  const handleChestClick = () => {
    if (!isPremium && rewardTypes === "premium") {
      onShake();
      return;
    }
    if (!disableBtn || open) {
      if (!open && !ischestOpen) {
        handleOpenChest();
        handleShowRewards(100, 100);
      } else {
        handleShowRewards(chestId, chestIndex - 1);
        console.log();
      }
    }
  };

  useEffect(() => {
    if (!isPremium && rewardTypes === "premium") {
      setIsChestOpen(false);
    }
  }, [isPremium, rewardTypes]);

  useEffect(() => {
    setIsChestOpen(false);
  }, [isPremium, rewardTypes]);

  const onShake = () => {
    setShake(true);
    new Audio(errorSound).play();
    const timer = setTimeout(() => {
      setShake(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      {chestId === 99 && (chain === "bnb" || chain === "taiko") ? (
        <div
          className={` ${
            open && chestId === 99 && chain === "bnb"
              ? "new-chest-item-open-premium"
              : open && chestId === 99 && chain === "taiko"
              ? "new-chest-item-open-premium-taiko"
              : open
              ? "new-chest-item-open"
              : ""
          }  ${
            isActive === chestId &&
            isActiveIndex === chestIndex &&
            "chest-item-active"
          } ${selectedChest === chestId ? "selected-new-chest" : ""} 
      ${claimingChest === true ? "disable-chest" : ""}
      ${chestId === 99 ? "premium-chest-item" : "new-chest-item"}
      d-flex align-items-center justify-content-center position-relative`}
          onClick={() => {
            // if (!open) {
            closeDaily();
            openKickstarter();
            // }
          }}
          style={{
            pointerEvents: !disableBtn && !buyNftPopup ? "auto" : "none",
          }}
        >
          {/* <img
    className='new-chest-item-img'
      src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/premium/blueCrystal${
        !open ? "" :  "OpenGems"
      }.png`)}
      
      alt=""
      style={{ position: "relative", bottom: "5px", filter: item.premium && "blur(5px)" }}
    /> */}
          {rewardTypes !== "premium" ? (
            <img
              className={` ${
                chestId === 99 && chain === "bnb"
                  ? "premium-chest-item-img"
                  : chestId === 99 && chain === "taiko"
                  ? "premium-chest-item-img-taiko"
                  : chain !== "skale"
                  ? "new-chest-item-img"
                  : "new-chest-item-img-skale"
              } ${
                loading
                  ? chain === "skale"
                    ? "chest-pulsate"
                    : "chest-shake"
                  : ""
              }`}
              src={
                chestId === 99 && chain === "bnb"
                  ? `https://cdn.worldofdypians.com/wod/${
                      open ? "premiumChestOpenFront" : "premiumChest"
                    }.png`
                  : chestId === 99 && chain === "taiko"
                  ? `https://cdn.worldofdypians.com/wod/${
                      open ? "premiumChestOpenFrontTaiko2" : "premiumChestTaiko"
                    }.png`
                  : chain !== "skale"
                  ? `https://cdn.worldofdypians.com/wod/${
                      open ? image + "open" : image
                    }.png`
                  : `https://cdn.worldofdypians.com/wod/${
                      open ? chestIndex + "openskale" : chestIndex + "skale"
                    }.png`
              }
              alt=""
              style={{
                position: "relative",
                bottom: "5px",
                filter: rewardTypes === "premium" && !isPremium && "blur(5px)",
              }}
            />
          ) : rewardTypes === "premium" && dummypremiumChests ? (
            <img
              className={`new-chest-item-img ${
                loading
                  ? chain === "skale"
                    ? "chest-pulsate"
                    : "chest-shake"
                  : ""
              }`}
              src={
                chain !== "skale"
                  ? `https://cdn.worldofdypians.com/wod/${
                      open
                        ? chestIndex % 2 === 1
                          ? dummypremiumChests + "OpenCoins"
                          : dummypremiumChests + "OpenGems"
                        : dummypremiumChests
                    }.png`
                  : `https://cdn.worldofdypians.com/wod/${
                      open
                        ? chestIndex - 10 + "openskalepremium"
                        : chestIndex - 10 + "skalepremium"
                    }.png`
              }
              alt=""
              style={{
                position: "relative",
                bottom: "5px",
                filter: rewardTypes === "premium" && !isPremium && "blur(5px)",
              }}
            />
          ) : (
            <></>
          )}
          {rewardTypes === "premium" && !isPremium && (
            <img
              src={"https://cdn.worldofdypians.com/wod/premiumLock.png"}
              className={`premium-lock ${shake && "shake-lock"}`}
              alt=""
            />
          )}
          <div className="new-claim-chest-btn d-flex align-items-center justify-content-center">
            {open ? "Claimed" : rewardTypes === "premium" ? "Prime" : "Claim "}
          </div>
        </div>
      ) : (
        <div
          className={` ${open ? "new-chest-item-open" : ""}  ${
            isActive === chestId &&
            isActiveIndex === chestIndex &&
            "chest-item-active"
          } ${selectedChest === chestId ? "selected-new-chest" : ""} 
      ${claimingChest === true ? "disable-chest" : ""}
      ${"new-chest-item"}
      d-flex align-items-center justify-content-center position-relative`}
          onClick={() => handleChestClick()}
          style={{
            pointerEvents: !disableBtn && !buyNftPopup ? "auto" : "none",
          }}
        >
          {/* <img
    className='new-chest-item-img'
      src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/premium/blueCrystal${
        !open ? "" :  "OpenGems"
      }.png`)}
      
      alt=""
      style={{ position: "relative", bottom: "5px", filter: item.premium && "blur(5px)" }}
    /> */}
          {rewardTypes !== "premium" ? (
            <img
              className={` ${
                chain !== "skale"
                  ? "new-chest-item-img"
                  : "new-chest-item-img-skale"
              } ${
                loading
                  ? chain === "skale"
                    ? "chest-pulsate"
                    : "chest-shake"
                  : ""
              }`}
              src={
                chain !== "skale"
                  ? `https://cdn.worldofdypians.com/wod/${
                      open ? image + "open" : image
                    }.png`
                  : `https://cdn.worldofdypians.com/wod/${
                      open ? chestIndex + "openskale" : chestIndex + "skale"
                    }.png`
              }
              alt=""
              style={{
                position: "relative",
                bottom: "5px",
                filter: rewardTypes === "premium" && !isPremium && "blur(5px)",
              }}
            />
          ) : rewardTypes === "premium" && dummypremiumChests ? (
            <img
              className={`${
                chain !== "skale"
                  ? "new-chest-item-img"
                  : "new-chest-item-img-skale"
              } ${
                loading
                  ? chain === "skale"
                    ? "chest-pulsate"
                    : "chest-shake"
                  : ""
              }`}
              src={
                chain !== "skale"
                  ? `https://cdn.worldofdypians.com/wod/${
                      open
                        ? chestIndex % 2 === 1
                          ? dummypremiumChests + "OpenCoins"
                          : dummypremiumChests + "OpenGems"
                        : dummypremiumChests
                    }.png`
                  : `https://cdn.worldofdypians.com/wod/${
                      open
                        ? chestIndex - 10 + "openskalepremium"
                        : chestIndex - 10 + "skalepremium"
                    }.png`
              }
              alt=""
              style={{
                position: "relative",
                bottom: "5px",
                filter: rewardTypes === "premium" && !isPremium && "blur(5px)",
              }}
            />
          ) : (
            <></>
          )}
          {rewardTypes === "premium" && !isPremium && (
            <img
              src={"https://cdn.worldofdypians.com/wod/premiumLock.png"}
              className={`premium-lock ${shake && "shake-lock"}`}
              alt=""
            />
          )}
          <div className="new-claim-chest-btn d-flex align-items-center justify-content-center">
            {open ? "Claimed" : rewardTypes === "premium" ? "Prime" : "Claim "}
          </div>
        </div>
      )}
    </>
  );
};

export default NewChestItem;
