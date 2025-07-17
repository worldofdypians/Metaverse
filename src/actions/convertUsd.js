import getListedNFTS from "./Marketplace";
import axios from "axios";

let eth_Price;
let dyp_Price;
let all_listed_nfts;

const getEthPrice = async () => {
  await fetch("https://api.worldofdypians.com/api/price/ethereum")
    .then((response) => response.json())
    .then((data) => {
      eth_Price = data.price;
      eth_Price = eth_Price.toFixed(2);
      return eth_Price;
    })
    .catch((e) => {
      console.log(e);
      return 0;
    });
};

const getDypPrice = async () => {
  const dypprice = await axios
    .get(
      "https://api.geckoterminal.com/api/v2/networks/eth/pools/0x7c81087310a228470db28c1068f0663d6bf88679"
    )
    .then((res) => {
      return res.data.data.attributes.base_token_price_usd;
    })
    .catch((e) => {
      console.log(e);
    });

  return dypprice;
};

const getListedNftResult = async () => {
  const result = await getListedNFTS(0, "", "", "", "").catch((e) => {
    console.log(e);
  });

  if (result && result.length > 0) {
    let result2 = result.filter((item) => {
      return item.payment_priceType === 0;
    });
    return result2;
  } else return [];
};

getDypPrice();
getEthPrice();

const convertToUSD = async (price, payment_priceType) => {
  if (payment_priceType === 0) {
    const ethPrice = price * eth_Price;
    return ethPrice.toFixed(5);
  }

  // if (payment_priceType === 1) {
  //   const usdPrice = price * dyp_Price;
  //   return usdPrice.toFixed(2);
  // }

  return null;
};

const filterNFTsByAddress = (nfts, address) => {
  return nfts.filter(
    (nft) => nft.nftAddress.toLowerCase() === address.toLowerCase()
  );
};

const getAllNfts = async () => {
  const result = await getListedNftResult();
  // console.log('result',result.filter((item)=>{return item.nftAddress === window.config.nft_caws_address}))

  const convertedNFTs = [];
  if (result) {
    const conversionPromises = result.map(async (nft) => {
      nft.type =
        nft.nftAddress === window.config.nft_timepiece_address
          ? "timepiece"
          : nft.nftAddress === window.config.nft_land_address
          ? "land"
          : "caws";
      nft.chain = 1;
      convertedNFTs.push(nft);
    });
    await Promise.all(conversionPromises);
    all_listed_nfts = convertedNFTs;
    return convertedNFTs;
  }
};

const convertAndFilterNFTs = async (nfts, nftAddress) => {
  const convertedNFTs = [];
  const conversionPromises = nfts.map(async (nft) => {
    const convertedPrice = await convertToUSD(nft.price, nft.payment_priceType);
    if (convertedPrice != null) {
      nft.priceUSD = convertedPrice;
      convertedNFTs.push(nft);
    }
  });
  await Promise.all(conversionPromises);
  if (nftAddress) {
    return filterNFTsByAddress(convertedNFTs, nftAddress);
  }
  return convertedNFTs;
};

const getCawsNfts = async () => {
  const listed_caws_nfts = await getListedNFTS(
    0,
    "",
    "nftAddress",
    window.config.nft_caws_address,
    ""
  );

  // console.log('listed_caws_nfts', listed_caws_nfts)
  const cawsNFTs = await convertAndFilterNFTs(
    listed_caws_nfts,
    window.config.nft_caws_address
  );

  return cawsNFTs;
};

const getWodNfts = async () => {
  const listed_wods_nfts = await getListedNFTS(
    0,
    "",
    "nftAddress",
    window.config.nft_land_address,
    window.config.nft_land_address
  );
  const wodNFTs = await convertAndFilterNFTs(
    listed_wods_nfts,
    window.config.nft_land_address
  );
  return wodNFTs;
};

const getTimepieceNfts = async () => {
  const listed_timepiece_nfts = await getListedNFTS(
    0,
    "",
    "nftAddress",
    window.config.nft_timepiece_address,
    window.config.nft_timepiece_address
  );

  const tpNFTs = await convertAndFilterNFTs(
    listed_timepiece_nfts,
    window.config.nft_timepiece_address
  );
  return tpNFTs;
};

export { convertToUSD, getCawsNfts, getWodNfts, getTimepieceNfts, getAllNfts };
