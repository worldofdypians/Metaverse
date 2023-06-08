import React, { useState, useEffect } from "react";
import "./_itemcard.scss";
import topEth from "../../screens/Marketplace/assets/topEth.svg";
import topDyp from "../../screens/Marketplace/assets/dypIcon.svg";

function buy(nft) {
  return () => {
    console.log("buying nft", nft);
  };
}

const ItemCard = ({
  nft,
  single,
  isConnected,
  showConnectWallet,
  isCaws,
  isTimepiece,
  isWod,
}) => {
  const [IsApprove, setIsApprove] = useState(false);

  const isApprovedBuy = async (amount) => {
    return await window.isApprovedBuy(amount);
  };

  async function handleBuy(nft) {
    console.log("nft", nft);

    const isApproved = await isApprovedBuy(nft.price);

    if (isApproved) {
      await window
        .buyNFT(
          nft.price,
          nft.nftAddress,
          nft.tokenId,
          nft.payment_priceType,
          nft.payment_tokenAddress
        )
        .then((result) => {
          console.log("buyNFT", result);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      await window
        .approveBuy(nft.price)
        .then((result) => {
          console.log("approveBuy", result);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  useEffect(() => {
    if (isConnected === true && nft.payment_priceType === 1) {
      isApprovedBuy(nft.price).then((isApproved) => setIsApprove(isApproved));
    }
  }, [nft.price]);

  return (
    <div
      className="d-flex flex-column item-wrapper position-relative"
      style={{ maxWidth: "100%" }}
    >
      <a href={`/nft/${nft.blockTimestamp}`}>
        {" "}
        <div className="nftimg-bg position-relative">
          <div className="name-wrapper d-flex justify-content-center p-2">
            <span className="nft-card-name">
              {" "}
              {isCaws
                ? "Cats And Watches Society"
                : isWod
                ? "World of Dypians"
                : "CAWS Timepiece"}{" "}
            </span>
          </div>
          <img
            className="w-100 h-100 p-0 nft-img"
            src={
              isCaws
                ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                : isWod
                ? `https://mint.worldofdypians.com/thumbs/${nft.tokenId}.png`
                : `https://timepiece.worldofdypians.com/images/${nft.tokenId}.png`
            }
            alt=""
          />
        </div>{" "}
      </a>
      <div className="d-flex flex-column gap-2 position-relative p-3">
        <span className="nft-name">
          {isCaws ? "CAWS" : isWod ? "Land" : "Timepiece"} #{nft.tokenId}
        </span>
        <div className="d-flex align-items-center gap-1">
          {nft.payment_priceType === 0 ? (
            <img src={topEth} height={20} width={20} alt="" />
          ) : (
            <img src={topDyp} height={20} width={20} alt="" />
          )}
          <span className="nft-price">
            {nft.price.slice(0, 5)}{" "}
            {nft.payment_priceType === 0 ? "ETH" : "DYP"}
          </span>
        </div>
      </div>
      <span
        className="position-absolute top-sale-time"
        style={{ bottom: "-8%" }}
      >
        a few seconds ago
      </span>
    </div>
  );
};

export default ItemCard;
