import getListedNFTS from "./Marketplace";
import axios from "axios";

let eth_Price;
let dyp_Price;
let all_listed_nfts;

const getEthPrice = async () => {
  await fetch(
    "https://pro-api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
  )
    .then((response) => response.json())
    .then((data) => {
      eth_Price = data["ethereum"].usd;
      eth_Price = eth_Price.toFixed(2);
      return dyp_Price;
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

  return result;
};

getDypPrice();
getEthPrice();

const convertToUSD = async (price, payment_priceType) => {
  if (payment_priceType === 0) {
    const ethPrice = price * eth_Price;
    return ethPrice.toFixed(5);
  }

  if (payment_priceType === 1) {
    const usdPrice = price * dyp_Price;
    return usdPrice.toFixed(2);
  }

  return null;
};

//   const a = await getListedNFTS(0, "", "", "", "");

const filterNFTsByAddress = (nfts, address) => {
  return nfts.filter(
    (nft) => nft.nftAddress.toLowerCase() === address.toLowerCase()
  );
};

const getAllNfts = async () => {
  const result = await getListedNftResult();
  const convertedNFTs = [];
  if (result) {
    const conversionPromises = result.map(async (nft) => {
      if (nft.nftAddress === window.config.nft_caws_address) {
        nft.type = "caws";
        nft.chain = 1;
        convertedNFTs.push(nft);
      } else if (nft.nftAddress === window.config.nft_land_address) {
        nft.type = "land";
        nft.chain = 1;
        convertedNFTs.push(nft);
      } else if (nft.nftAddress === window.config.nft_timepiece_address) {
        nft.type = "timepiece";
        nft.chain = 1;
        convertedNFTs.push(nft);
      }
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
  await getAllNfts();
  const cawsNFTs = await convertAndFilterNFTs(
    all_listed_nfts,
    window.config.nft_caws_address
  );
  return cawsNFTs;
};

const getCawsOldNfts = async () => {
  await getAllNfts();
  const cawsNFTs = await convertAndFilterNFTs(
    all_listed_nfts,
    window.config.nft_cawsold_address
  );
  return cawsNFTs;
};

const getWodNfts = async () => {
  await getAllNfts();
  const wodNFTs = await convertAndFilterNFTs(
    all_listed_nfts,
    window.config.nft_land_address
  );
  return wodNFTs;
};

const getTimepieceNfts = async () => {
  await getAllNfts();
  const tpNFTs = await convertAndFilterNFTs(
    all_listed_nfts,
    window.config.nft_timepiece_address
  );
  return tpNFTs;
};

export {
  convertToUSD,
  getCawsNfts,
  getCawsOldNfts,
  getWodNfts,
  getTimepieceNfts,
  getAllNfts,
};
