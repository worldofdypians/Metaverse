import React, {useState, useEffect} from "react";
import "./_itemcard.scss";

function buy(nft) {
  return () => {
    console.log("buying nft", nft);
  };
}

const ItemCard = ({ nft, single, isConnected, showConnectWallet }) => {
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
    <div className="d-flex flex-column item-wrapper" style={{maxWidth: "100%"}}>
      {/* <div style={{ paddingLeft: "20px" }}>Seller: {nft.seller}</div> */}
      <a href={`/nft/${nft.blockTimestamp}`}>
        {" "}
        <div className="nftimg-bg">
          <img
            className="w-100 h-100 p-0 nft-img"
            src="https://mint.dyp.finance/thumbs/424.png"
            alt=""
          />
        </div>{" "}
      </a>
      <div className="d-flex flex-column gap-3 p-3">
        <span className="nft-name">CAWS #{nft.tokenId}</span>
        <span className="nft-price">
          Price: {nft.price}{" "}
          <span className="nft-desc">
            {nft.payment_priceType === 0 ? "ETH" : "DYP"}
          </span>
        </span>
      </div>
      <div className="buy-nft w-100">
        {/* <button
          className="buy-nft-btn w-100"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
          onClick={() => {
            isConnected === true ? handleBuy(nft) : showConnectWallet();
          }}
        >
          {" "}
          {isConnected === true
            ? nft.payment_priceType === 1
              ? !IsApprove
                ? "Approve"
                : "Buy"
              : "Buy"
            : "Connect wallet"}{" "}
        </button> */}
      </div>
    </div>
  );
};

export default ItemCard;
