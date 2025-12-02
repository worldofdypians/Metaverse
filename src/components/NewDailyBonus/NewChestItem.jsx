import React, { useState, useEffect } from "react";
import errorSound from "./assets/error.mp3";
import axios from "axios";
import {
  writeContract as wagmiWriteContract,
  waitForTransactionReceipt as wagmiWaitForTransactionReceipt,
  switchChain as wagmiSwitchChain,
  getAccount,
} from "@wagmi/core";
import { wagmiClient } from "../../wagmiConnectors";
import { getTransaction } from "@wagmi/core";

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

  openKickstarter,
  closeDaily,username
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


      const updateRewardApis = async(data)=>{
        const result = await axios.post('https://api.worldofdypians.com/api/post-event', data).catch((e)=>{console.error(e)})
        if(result && result.status === 200) {
          console.log(result)
        }
      }

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
  if (
          result.data.rewards.find((item) => {
            return item.rewardType === "Money";
          }) !== undefined
        ) {
          const data = {
            eventType: "daily",
            username: username,
            rewardUSD: result.data.rewards.find((item) => {
              return item.rewardType === "Money";
            }).reward,
          };
          updateRewardApis(data);
        }
         if (
          result.data.rewards.find((item) => {
            return item.rewardType === "Points" && item.reward >= 7950;
          }) !== undefined
        ) {
          const data = {
            eventType: "daily",
            username: username,
            points: result.data.rewards.find((item) => {
              return item.rewardType === "Points";
            }).reward,
          };
          updateRewardApis(data);
        }
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
        
         if (
          result.data.rewards.find((item) => {
            return item.rewardType === "Money";
          }) !== undefined
        ) {
          const data = {
            eventType: "daily",
            username: username,
            rewardUSD: result.data.rewards.find((item) => {
              return item.rewardType === "Money";
            }).reward,
          };
          updateRewardApis(data);
        }
         if (
          result.data.rewards.find((item) => {
            return item.rewardType === "Points" && item.reward >= 7950;;
          }) !== undefined
        ) {
          const data = {
            eventType: "daily",
            username: username,
            points: result.data.rewards.find((item) => {
              return item.rewardType === "Points";
            }).reward,
          };
          updateRewardApis(data);
        }
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
    if (window.WALLET_TYPE !== "matchId") {
      const txResult = getTransaction(wagmiClient, {
        hash: txHash,
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

  // Resolve contract config per chain for unified wagmi/viem flow
  const resolveChestContract = (cid) => {
    try {
      switch (cid) {
        case 204:
          return {
            address: window.config.daily_bonus_address,
            abi: window.DAILY_BONUS_ABI,
            chainText: "opbnb",
          };
        case 1116:
          return {
            address: window.config.daily_bonus_core_address,
            abi: window.DAILY_BONUS_CORE_ABI,
            chainText: "core",
          };
        case 88:
          return {
            address: window.config.daily_bonus_viction_address,
            abi: window.DAILY_BONUS_VICTION_ABI,
            chainText: "viction",
          };
        case 2040:
          // Vanar uses the same ABI as SEI in existing code
          return {
            address: window.config.daily_bonus_vanar_address,
            abi: window.DAILY_BONUS_SEI_ABI,
            chainText: "vanar",
          };
        case 169:
          return {
            address: window.config.daily_bonus_manta_address,
            abi: window.DAILY_BONUS_MANTA_ABI,
            chainText: "manta",
          };
        case 8453:
          return {
            address: window.config.daily_bonus_base_address,
            abi: window.DAILY_BONUS_BASE_ABI,
            chainText: "base",
          };
        case 167000:
          return {
            address: window.config.daily_bonus_taiko_address,
            abi: window.DAILY_BONUS_TAIKO_ABI,
            chainText: "taiko",
          };
        // case 841:
        //   return {
        //     address: window.config.daily_bonus_taraxa_address,
        //     abi: window.DAILY_BONUS_TARAXA_ABI,
        //     chainText: "taraxa",
        //   };
        case 1329:
          return {
            address: window.config.daily_bonus_sei_address,
            abi: window.DAILY_BONUS_SEI_ABI,
            chainText: "sei",
          };
        // case 698:
        //   return {
        //     address: window.config.daily_bonus_mat_address,
        //     abi: window.DAILY_BONUS_MAT_ABI,
        //     chainText: "matchain",
        //   };
        case 56:
          return {
            address: window.config.daily_bonus_bnb_address,
            abi: window.DAILY_BONUS_BNB_ABI,
            chainText: "bnb",
          };
        case 1482601649:
          return {
            address: window.config.daily_bonus_skale_address,
            abi: window.DAILY_BONUS_SKALE_ABI,
            chainText: "skale",
          };
        default:
          return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleOpenChest = async () => {
    onChestStatus("waiting");
    onLoadingChest(true);
    setLoading(true);
    setClaimingChest(true);

    // Unified wagmi/viem-first path for all wallets (MetaMask, Binance Wallet, Injected, etc.)
    try {
      const contractConfig = resolveChestContract(chainId);
      if (!contractConfig)
        throw new Error("Unsupported chain for chest contract.");

      const functionName =
        rewardTypes === "premium" && isPremium
          ? "openPremiumChest"
          : "openChest";

     

      // Default: use wagmi connected wallet via viem
      const account = getAccount(wagmiClient);

      if (account?.chainId && account.chainId !== chainId) {
        try {
          await wagmiSwitchChain(wagmiClient, { chainId });
        } catch (e) {
          console.error("switchChain failed or not supported", e);
        }
      }

      const txHash = await wagmiWriteContract(wagmiClient, {
        address: contractConfig.address,
        abi: contractConfig.abi,
        functionName,
        args: [],
        account: account?.address, // optional, connector will provide
        chainId,
      });
      
      let receipt;
      const maxRetries = 5;
      for (let i = 0; i < maxRetries; i++) {
        receipt = await wagmiWaitForTransactionReceipt(wagmiClient, { hash: txHash }).catch(
          () => null
        );
        if (receipt) break;
        // wait 2 seconds before retry
        await new Promise((res) => setTimeout(res, 2000));
      }
      
      if (!receipt) throw new Error("Failed to get transaction receipt after retries");
      
      console.log("Transaction confirmed in block:", receipt.blockNumber);

      if (receipt) {
        getUserRewardsByChest(
          email,
          txHash,
          chestIndex - 1,
          contractConfig.chainText
        );
      }

      return;
    } catch (unifiedError) {
      // Fallback to legacy paths below if unified flow fails (keeps backward compatibility)
      console.error(
        "Unified wagmi/viem flow failed, falling back",
        unifiedError
      );
      window.alertify.error(unifiedError?.message);
      onChestStatus("error");
      onLoadingChest(false);
      setLoading(false);
      setClaimingChest(false);

      // console.error(e);
      const timer = setTimeout(() => {
        onChestStatus("initial");
      }, 3000);
      return () => clearTimeout(timer);
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
          onClick={() => handleChestClick(chain)}
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
