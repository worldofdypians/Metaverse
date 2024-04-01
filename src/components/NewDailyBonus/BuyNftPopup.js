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
}) => {
  const [type, setType] = useState("");
  const [buyloading, setbuyLoading] = useState(false); //buy
  const [purchaseColor, setPurchaseColor] = useState("#00FECF");
  const [buyStatus, setbuyStatus] = useState(""); //buy
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");

  const isApprovedBuy = async (tokenType, amount) => {
    const result = await window.isApprovedBuy(tokenType, amount).catch((e) => {
      console.error(e);
    });

    return result;
  };

  const handlebuy2 = async () => {
    const body_skale = {
      transactionHash:
        "0xc3f97b4994e6ef6b1b17c08104022f00010b94d3aa7d1df5359c07dc57cb8dd7",
      emailAddress: email,
      chestIndex: chestIndex - 1,
      chainId: "skale",
    };

    const body = {
      transactionHash:
        "0xc3f97b4994e6ef6b1b17c08104022f00010b94d3aa7d1df5359c07dc57cb8dd7",
      emailAddress: email,
      chestIndex: chestIndex - 1,
    };

    const finalBody = chain === "skale" ? body_skale : body;

    // if(chain === "skale"){
    //   body.chainId = chain
    // }

    const result = await axios
      .post(
        `https://dyp-chest-test.azurewebsites.net/api/ClaimNftReward?code=wcdvJ3PTF9eB0mZOu25FNxSuUZLWiubCQNG8oljEy88fAzFufLdFSw%3D%3D`,
        finalBody
      )
      .catch((e) => {
        console.error(e);
      });

    if (result && result.status === 200) {
      onSuccessPurchase();
    }
  };

  async function handleBuy(nft) {
    const tokenType =
      nft.payment_tokenAddress === window.config.dyp_token_address
        ? "dypv1"
        : nft.payment_tokenAddress === window.config.token_dypius_new_address
        ? "dypv2"
        : "eth";

    const isApproved = await isApprovedBuy(tokenType, nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      console.log("buying", nft.price);
      setPurchaseColor("#00FECF");

      setbuyLoading(true);
      setbuyStatus("buy");
      setPurchaseStatus("Buying NFT in progress..");
      await window
        .buyNFT(
          nft.price,
          nft.nftAddress,
          nft.tokenId,
          nft.payment_priceType,
          nft.payment_tokenAddress
        )
        .then(async (result) => {
          console.log("buyNFT", result);

          const body_skale = {
            transactionHash: result.transactionHash,
            emailAddress: email,
            chestIndex: chestIndex - 1,
            chainId: "skale",
          };

          const body = {
            transactionHash: result.transactionHash,
            emailAddress: email,
            chestIndex: chestIndex - 1,
          };

          const finalBody = chain === "skale" ? body_skale : body;

          const resultBuy = await axios
            .post(
              `https://dyp-chest-test.azurewebsites.net/api/ClaimNftReward?code=wcdvJ3PTF9eB0mZOu25FNxSuUZLWiubCQNG8oljEy88fAzFufLdFSw%3D%3D`,
              finalBody
            )
            .catch((e) => {
              console.error(e);
              setbuyLoading(false);
              setbuyStatus("failed");
              window.alertify.error(e?.message)
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
    } else {
      console.log("approve buying");

      setbuyStatus("approve");
      setbuyLoading(true);
      setPurchaseStatus("Approving in progress...");
      setPurchaseColor("#00FECF");
      await window
        .approveBuy(tokenType, nft.price)
        .then(() => {
          setTimeout(() => {
            setbuyStatus("buy");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyStatus("success");
          setbuyLoading(false);
          setPurchaseStatus("Successfully approved");
          setPurchaseColor("#00FECF");
        })
        .catch((e) => {
          console.error(e);
          setbuyStatus("failed");
          setTimeout(() => {
            setbuyStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
        });
    }
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
      nft.payment_tokenAddress === window.config.dyp_token_address
        ? "dypv1"
        : nft.payment_tokenAddress === window.config.token_dypius_new_address
        ? "dypv2"
        : "eth",
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
        <img
          src={ ethIcon
          }
          alt=""
          style={{ width: 20, height: 20 }}
        />{" "}
        Ethereum
      </span>

      <div className="d-flex justify-content-between align-items-center">
        <span className="currentprice-txt">Current price</span>
        
        <div className="d-flex gap-2 align-items-center">
          <img
            src={nft?.payment_priceType === 0 ? topEth : topDyp}
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
              nft?.payment_priceType === 0 ? 3 : 0
            )}{" "}
            {nft?.payment_priceType === 0
              ? "ETH"
              : nft?.payment_tokenAddress === window.config.dyp_token_address
              ? "DYPv1"
              : "DYPv2"}
          </span>
          <span className="nft-price-usd">
            $
            {getFormattedNumber(
              nft?.payment_priceType === 0
                ? ethTokenData * (nft?.price / 1e18)
                : nft?.payment_tokenAddress === window.config.dyp_token_address
                ? dyptokenData_old * (nft?.price / 1e18)
                : dypTokenData * (nft?.price / 1e18),
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
