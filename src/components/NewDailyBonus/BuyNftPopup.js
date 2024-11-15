import React, { useEffect, useState } from "react";
import xMark from "../../screens/Account/src/Components/WalletBalance/assets/closeMark.svg";
import ethIcon from "../../screens/Marketplace/assets/ethIcon.svg";
import bnbLogo from "../../screens/Marketplace/assets/bnbLogo.svg";
import confluxLogo from "../../screens/Marketplace/assets/confluxLogo.svg";
import baseLogo from "../../screens/Marketplace/assets/baseLogo.svg";
import avaxLogo from "../../screens/Marketplace/assets/avaxLogo.svg";
import topEth from "../../screens/Marketplace/assets/topEth.svg";
import topDyp from "../../screens/Marketplace/assets/topDyp.svg";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import axios from "axios";
import { ethers } from "ethers";

const BuyNftPopup = ({
  nft,
  onClose,
  dypTokenData,
  dyptokenData_old,
  ethTokenData,
  chainId,
  handleSwitchChain,
  chestIndex,
  chain,
  email,
  onSuccessPurchase,
  coinbase,
  binanceW3WProvider,
}) => {
  const [type, setType] = useState("");
  const [buyloading, setbuyLoading] = useState(false); //buy
  const [purchaseColor, setPurchaseColor] = useState("#00FECF");
  const [buyStatus, setbuyStatus] = useState(""); //buy
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [buyTxHash, setBuyTxHash] = useState("");

  const isApprovedBuy = async (tokenType, amount) => {
    if (window.WALLET_TYPE !== "binance") {
      const result = await window
        .isApprovedBuy(tokenType, amount)
        .catch((e) => {
          console.error(e);
        });
      return result;
    } else if (window.WALLET_TYPE === "binance") {
      // const contract_old = new ethers.Contract(
      //   window.config.dyp_token_address,
      //   window.DYP_ABI,
      //   binanceW3WProvider.getSigner()
      // );

      // const contract = new ethers.Contract(
      //   window.config.token_dypius_new_address,
      //   window.DYP_ABI,
      //   binanceW3WProvider.getSigner()
      // );

      // if (tokenType === "dypv2") {
      //   const allowance = await contract.allowance(
      //     coinbase,
      //     window.config.nft_marketplace_address
      //   );

      //   return Number(allowance) >= Number(amount);
      // } else if (tokenType === "dypv1") {
      //   const allowance = await contract_old.allowance(
      //     coinbase,
      //     window.config.nft_marketplace_address
      //   );

      //   return Number(allowance) >= Number(amount);
      // } else
       if (tokenType === "eth") {
        return true;
      }
    }
  };

  const handleCollectReward = async (txHash) => {
    // const body_skale = {
    //   transactionHash:
    //     "0xc3f97b4994e6ef6b1b17c08104022f00010b94d3aa7d1df5359c07dc57cb8dd7",
    //   emailAddress: email,
    //   chestIndex: chestIndex - 1,
    //   chainId: "skale",
    // };

    // const body = {
    //   transactionHash:
    //     "0xc3f97b4994e6ef6b1b17c08104022f00010b94d3aa7d1df5359c07dc57cb8dd7",
    //   emailAddress: email,
    //   chestIndex: chestIndex - 1,
    // };

    // const finalBody = chain === "skale" ? body_skale : body;

    // // if(chain === "skale"){
    // //   body.chainId = chain
    // // }

    // const result = await axios
    //   .post(
    //     `https://dyp-chest-test.azurewebsites.net/api/ClaimNftReward?code=wcdvJ3PTF9eB0mZOu25FNxSuUZLWiubCQNG8oljEy88fAzFufLdFSw%3D%3D`,
    //     finalBody
    //   )
    //   .catch((e) => {
    //     console.error(e);
    //   });

    // if (result && result.status === 200) {
    //   onSuccessPurchase();
    // }
    console.log("txHash", txHash);
    const body_skale = {
      transactionHash: txHash,
      emailAddress: email,
      chestIndex: chestIndex - 1,
      chainId: chain,
    };

    const body = {
      transactionHash: txHash,
      emailAddress: email,
      chestIndex: chestIndex - 1,
    };

    const resultBuy = await axios
      .post(
        `https://worldofdypiansdailybonus.azurewebsites.net/api/ClaimNftReward`,
        body_skale
      )
      .catch((e) => {
        console.error(e);
        setbuyLoading(false);
        setbuyStatus("failed");
        window.alertify.error(e?.message);
      });

    if (resultBuy && resultBuy.status === 200) {
      setbuyLoading(false);
      setbuyStatus("success");

      setTimeout(() => {
        onSuccessPurchase();
      }, 2000);
    }

    setPurchaseStatus("Successfully purchased!");
    setShowToast(true);
    setToastTitle("Successfully purchased!");
    setPurchaseColor("#00FECF");
    // setIsListed(false)
  };

  async function handleBuy(nft) {
    const tokenType = "eth";

    const isApproved = await isApprovedBuy(tokenType, nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      console.log("buying", nft.price);
      setPurchaseColor("#00FECF");
      setbuyLoading(true);
      setbuyStatus("buy");
      setPurchaseStatus("Buying NFT in progress..");

   
   

      if (window.WALLET_TYPE !== "binance") {
           const marketplace = new window.web3.eth.Contract(
        window.MARKETPLACE_ABI,
        window.config.nft_marketplace_address
      );

        const gasPrice = await window.web3.eth.getGasPrice();
        console.log("gasPrice", gasPrice);
        const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
        const increasedGwei = parseInt(currentGwei) + 3;
        console.log("increasedGwei", increasedGwei);

        const transactionParameters = {
          gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
        };

        await marketplace.methods
          .buyItem(nft.nftAddress, nft.tokenId, [
            nft.payment_priceType,
            nft.payment_tokenAddress,
          ])
          .estimateGas({ from: await window.getCoinbase(), value: nft.price })
          .then((gas) => {
            transactionParameters.gas = window.web3.utils.toHex(gas);
          })
          .catch(function (error) {
            console.log(error);
          });

        if (nft.payment_priceType === 1) {
          await marketplace.methods
            .buyItem(nft.nftAddress, nft.tokenId, [
              nft.payment_priceType,
              nft.payment_tokenAddress,
            ])
            .send({
              from: await window.getCoinbase(),
              value: 0,
              ...transactionParameters,
            })
            .then((data) => {
              console.log("buyTxHash", data.transactionHash);
              handleCollectReward(data.transactionHash);
            })
            .catch((e) => {
              setbuyStatus("failed");
              setbuyLoading(false);
              setPurchaseStatus(e?.message);
              setPurchaseColor("#FF6232");
              setTimeout(() => {
                setPurchaseStatus("");
                setPurchaseColor("#00FECF");
                setbuyStatus("");
              }, 3000);
              console.error(e);
            });
        } else if (nft.payment_priceType === 0) {
          await marketplace.methods
            .buyItem(nft.nftAddress, nft.tokenId, [
              nft.payment_priceType,
              nft.payment_tokenAddress,
            ])
            .send({
              from: await window.getCoinbase(),
              value: nft.price,
              ...transactionParameters,
            })
            .then((data) => {
              console.log("buyTxHash", data.transactionHash);
              handleCollectReward(data.transactionHash);
            })
            .catch((e) => {
              setbuyStatus("failed");
              setbuyLoading(false);
              setPurchaseStatus(e?.message);
              setPurchaseColor("#FF6232");
              setTimeout(() => {
                setPurchaseStatus("");
                setPurchaseColor("#00FECF");
                setbuyStatus("");
              }, 3000);
              console.error(e);
            });
        }
      } else if (window.WALLET_TYPE === "binance") {
           const marketplace_binance = new window.web3.eth.Contract(
        window.config.nft_marketplace_address,
        window.MARKETPLACE_ABI,
        binanceW3WProvider.getSigner()
      );
        const gasPrice = await binanceW3WProvider.getGasPrice();
        console.log("gasPrice", gasPrice.toString());
        const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
        const increasedGwei = parseFloat(currentGwei) + 0;
        console.log("increasedGwei", increasedGwei);
        console.log(nft.payment_priceType, "test");
        // Convert increased Gwei to Wei
        const gasPriceInWei = ethers.utils.parseUnits(
          increasedGwei.toString().slice(0, 16),
          "gwei"
        );

        const transactionParameters = {
          gasPrice: gasPriceInWei,
        };

        const balance = await binanceW3WProvider.getSigner().getBalance();
        const balanceInEth = ethers.utils.formatEther(balance);
        console.log("Account Balance:", balanceInEth);

        // Estimate gas limit
        let gasLimit;
        try {
          gasLimit = await marketplace_binance.estimateGas.buyItem(
            nft.nftAddress,
            nft.tokenId,
            [nft.payment_priceType, nft.payment_tokenAddress],
            {
              value: nft.price,
              from: coinbase,
            }
          );
          transactionParameters.gasLimit = gasLimit;
          console.log("transactionParameters", transactionParameters);
        } catch (error) {
          console.error(error);
        }

        if (nft.payment_priceType === 1) {
         const txResponse = await marketplace_binance
            .buyItem(
              nft.nftAddress,
              nft.tokenId,
              [nft.payment_priceType, nft.payment_tokenAddress],
              {
                from: await window.getCoinbase(),
                value: 0,
                ...transactionParameters,
              }
            )
            .catch((e) => {
              setbuyStatus("failed");
              setbuyLoading(false);
              setPurchaseStatus(e?.message);
              setPurchaseColor("#FF6232");
              setTimeout(() => {
                setPurchaseStatus("");
                setPurchaseColor("#00FECF");
                setbuyStatus("");
              }, 3000);
              console.error(e);
            });

          const txReceipt = await txResponse.wait();
          if (txReceipt) {
            handleCollectReward(txResponse.hash);
          }

        } else if (nft.payment_priceType === 0) {
         const txResponse =  await marketplace_binance
            .buyItem(
              nft.nftAddress,
              nft.tokenId,
              [nft.payment_priceType, nft.payment_tokenAddress],
              {
                from: await window.getCoinbase(),
                value: nft.price,
                ...transactionParameters,
              }
            )
            .catch((e) => {
              setbuyStatus("failed");
              setbuyLoading(false);
              setPurchaseStatus(e?.message);
              setPurchaseColor("#FF6232");
              setTimeout(() => {
                setPurchaseStatus("");
                setPurchaseColor("#00FECF");
                setbuyStatus("");
              }, 3000);
              console.error(e);
            });

            const txReceipt = await txResponse.wait();
          if (txReceipt) {
            handleCollectReward(txResponse.hash);
          }

        }
      }
    } 
    // else {
    //   console.log("approve buying");

    //   setbuyStatus("approve");
    //   setbuyLoading(true);
    //   setPurchaseStatus("Approving in progress...");
    //   setPurchaseColor("#00FECF");
    //   if(window.WALLET_TYPE !=='binance')
    //  { await window
    //     .approveBuy(tokenType, nft.price)
    //     .then(() => {
    //       setTimeout(() => {
    //         setbuyStatus("buy");
    //         setPurchaseStatus("");
    //         setPurchaseColor("#00FECF");
    //       }, 3000);
    //       setbuyStatus("success");
    //       setbuyLoading(false);
    //       setPurchaseStatus("Successfully approved");
    //       setPurchaseColor("#00FECF");
    //     })
    //     .catch((e) => {
    //       console.error(e);
    //       setbuyStatus("failed");
    //       setTimeout(() => {
    //         setbuyStatus("approve");
    //         setPurchaseStatus("");
    //         setPurchaseColor("#00FECF");
    //       }, 3000);
    //       setbuyLoading(false);
    //       setPurchaseStatus(e?.message);
    //       setPurchaseColor("#FF6232");
    //     });} else if (window.WALLET_TYPE === "binance") {
    //       const contract_old = new ethers.Contract(
    //         window.config.dyp_token_address,
    //         window.DYP_ABI,
    //         binanceW3WProvider.getSigner()
    //       );
  
    //       const contract = new ethers.Contract(
    //         window.config.token_dypius_new_address,
    //         window.DYP_ABI,
    //         binanceW3WProvider.getSigner()
    //       );
  
    //       if (tokenType === "dypv2") {
    //        const txResponse = await contract
    //           .approve(window.config.nft_marketplace_address, nft.price, {
    //             from: coinbase,
    //           })
    //           .catch((e) => {
    //             console.error(e);
    //             setbuyStatus("failed");
    //             setTimeout(() => {
    //               setbuyStatus("approve");
    //               setPurchaseStatus("");
    //               setPurchaseColor("#00FECF");
    //             }, 3000);
    //             setbuyLoading(false);
    //             setPurchaseStatus(e?.message);
    //             setPurchaseColor("#FF6232");
    //           });

    //         const txReceipt = await txResponse.wait();
    //       if (txReceipt) {
    //         setTimeout(() => {
    //           setbuyStatus("buy");
    //           setPurchaseStatus("");
    //           setPurchaseColor("#00FECF");
    //         }, 3000);
    //         setbuyStatus("success");
    //         setbuyLoading(false);
    //         setPurchaseStatus("Successfully approved");
    //         setPurchaseColor("#00FECF");
    //       }

    //       } else if (tokenType === "dypv1") {
    //        const txResponse = await contract_old
    //           .approve(window.config.nft_marketplace_address, nft.price, {
    //             from: coinbase,
    //           })
    //           .catch((e) => {
    //             console.error(e);
    //             setbuyStatus("failed");
    //             setTimeout(() => {
    //               setbuyStatus("approve");
    //               setPurchaseStatus("");
    //               setPurchaseColor("#00FECF");
    //             }, 3000);
    //             setbuyLoading(false);
    //             setPurchaseStatus(e?.message);
    //             setPurchaseColor("#FF6232");
    //           });

    //           const txReceipt = await txResponse.wait();
    //       if (txReceipt) {
    //         setTimeout(() => {
    //           setbuyStatus("buy");
    //           setPurchaseStatus("");
    //           setPurchaseColor("#00FECF");
    //         }, 3000);
    //         setbuyStatus("success");
    //         setbuyLoading(false);
    //         setPurchaseStatus("Successfully approved");
    //         setPurchaseColor("#00FECF");
    //       }

    //       }
    //     }
    // }
  }

  useEffect(() => {
    if (nft.nftAddress === window.config.nft_caws_address) {
      setType("caws");
    } else if (nft.nftAddress === window.config.nft_caws_bnb_address) {
      setType("cawsbnb");
    } else if (nft.nftAddress === window.config.nft_caws_avax_address) {
      setType("cawsavax");
    } else if (nft.nftAddress === window.config.nft_caws_base_address) {
      setType("cawsbase");
    } else if (nft.nftAddress === window.config.nft_land_bnb_address) {
      setType("landbnb");
    } else if (nft.nftAddress === window.config.nft_land_avax_address) {
      setType("landavax");
    } else if (nft.nftAddress === window.config.nft_land_base_address) {
      setType("landbase");
    }
  }, [nft]);

  useEffect(() => {
    isApprovedBuy(
      "eth",
      nft.price
    ).then((isApproved) => {
      console.log(isApproved);
      if (isApproved === true) {
        setbuyStatus("buy");
      } else if (isApproved === false) {
        setbuyStatus("approve");
      }
    });
  }, [nft, chainId]);

  return (
    <div className="buy-nft-popup-wrapper d-flex flex-column gap-2 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="nft-title mb-0">
          {nft.type === "caws" ? "CAWS" : "Genesis Land"} #{nft.tokenId}
        </h6>
        <img
          src={xMark}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <img
        className="popup-nft-img"
        src={
          nft.nftAddress === window.config.nft_caws_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/caws_400x400/${nft.tokenId}.png`
            : nft.nftAddress === window.config.nft_land_address
            ? `https://dypmeta.s3.us-east-2.amazonaws.com/genesis_400x400/${nft.tokenId}.png`
            : `https://dypmeta.s3.us-east-2.amazonaws.com/timepiece_400x400/${nft.tokenId}.png`
        }
        alt=""
      />

      <span className="seller-addr d-flex gap-1 align-items-center">
        <img src={ethIcon} alt="" style={{ width: 20, height: 20 }} /> Ethereum
      </span>

      <div className="d-flex justify-content-between align-items-center">
        <span className="currentprice-txt">Current price</span>

        <div className="d-flex gap-2 align-items-center">
          <img
            src={topEth}
            alt=""
            height={20}
            width={20}
          />
          <span
            className="nft-price-eth"
            style={{ fontSize: 15, lineHeight: "20px" }}
          >
            {getFormattedNumber(
              nft?.price / 1e18,
              3
            )}{" "}
             ETH 
          </span>
          <span className="nft-price-usd">
            $
            {getFormattedNumber(
                ethTokenData * (nft?.price / 1e18)
                 ,
              2
            )}
          </span>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-center mt-2">
        <button
          disabled={
            buyloading === true || buyStatus === "failed" ? true : false
          }
          style={{ width: "180px", height: "42px" }}
          className={`btn  buyNftbtn px-4 d-flex justify-content-center ${
            buyStatus === "success"
              ? "successbtn"
              : buyStatus === "failed" || (chainId !== 5 && chainId !== 1)
              ? "errorbtn"
              : null
          } d-flex justify-content-center align-items-center gap-2`}
          onClick={() => {
            chainId !== 1 && chainId !== 5
              ? handleSwitchChain()
              : handleBuy(nft);
            // handlebuy2()
          }}
        >
          {buyloading && (chainId === 1 || chainId === 5) ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : !buyloading && chainId !== 1 && chainId !== 5 ? (
            "Switch Network"
          ) : buyStatus === "buy" ? (
            "Buy"
          ) : buyStatus === "approve" || buyStatus === "" ? (
            "Approve buy"
          ) : buyStatus === "success" ? (
            "Success"
          ) : (
            "Failed"
          )}
          {/* Buy */}
        </button>
      </div>
    </div>
  );
};

export default BuyNftPopup;
