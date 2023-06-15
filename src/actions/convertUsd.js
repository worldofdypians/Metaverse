import getListedNFTS from "./Marketplace";

let eth_Price;
let dyp_Price;

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
  await fetch(
    "https://pro-api.coingecko.com/api/v3/simple/price?ids=defi-yield-protocol&vs_currencies=usd&x_cg_pro_api_key=CG-4cvtCNDCA4oLfmxagFJ84qev"
  )
    .then((response) => response.json())
    .then((data) => {
      dyp_Price = data["defi-yield-protocol"].usd;
      dyp_Price = dyp_Price.toFixed(2);
      return dyp_Price;
    });
};

const convertToUSD = async (price, payment_priceType) => {
  await getDypPrice();
  await getEthPrice();

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

let all_listed_nfts;
const getAllNfts = async () => {
 const result =  await getListedNFTS(0, "", "", "", "");
 const convertedNFTs = [];

 if(result) {
  const conversionPromises = result.map(async (nft) => {
    if (nft.nftAddress === window.config.nft_caws_address) {
      nft.type = "caws";
      nft.chain = 1;
      convertedNFTs.push(nft);
    }
    else if (nft.nftAddress === window.config.nft_cawsold_address) {
      nft.type = "cawsold";
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
    "0xef7223b8177b34083bc6fc32055402b3255d03c6"
  );
  return cawsNFTs;
};

const getWodNfts = async () => {
  await getAllNfts();
  const wodNFTs = await convertAndFilterNFTs(
    all_listed_nfts,
    "0x2519ab0e0a73e2108c1d6ba5af550ac3a220d8ab"
  );
  return wodNFTs;
};

const getTimepieceNfts = async () => {
  await getAllNfts();
  const tpNFTs = await convertAndFilterNFTs(
    all_listed_nfts,
    "0x6917d34310a03704727169451ca66307dad62a23"
  );
  return tpNFTs;
};

export { getCawsNfts, getWodNfts, getTimepieceNfts };
