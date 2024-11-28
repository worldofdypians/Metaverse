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
  if (result && result.length > 0) {
    let result2 = result.filter((item) => {
      return item.payment_priceType === 0;
    });
    return result2;
  }
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
    const nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );

    const nft_contract_land = new window.infuraWeb3.eth.Contract(
      window.WOD_ABI,
      window.config.nft_land_address
    );

    const nft_contract_timepiece = new window.infuraWeb3.eth.Contract(
      window.TIMEPIECE_ABI,
      window.config.nft_timepiece_address
    );

    const conversionPromises = result.map(async (nft) => {
      if (nft.nftAddress === window.config.nft_caws_address) {
        const nftowner = await nft_contract.methods
          .ownerOf(nft.tokenId)
          .call()
          .catch((e) => {
            console.log(e);
          });
        if (nftowner && nftowner.toLowerCase() === nft.seller.toLowerCase()) {
          nft.type = "caws";
          nft.chain = 1;
          convertedNFTs.push(nft);
        }
      } else if (nft.nftAddress === window.config.nft_land_address) {
        const nftowner_land = await nft_contract_land.methods
          .ownerOf(nft.tokenId)
          .call()
          .catch((e) => {
            console.log(e);
          });
        if (
          nftowner_land &&
          nftowner_land.toLowerCase() === nft.seller.toLowerCase()
        ) {
          nft.type = "land";
          nft.chain = 1;
          convertedNFTs.push(nft);
        }
      } else if (nft.nftAddress === window.config.nft_timepiece_address) {
        const nftowner_timepiece = await nft_contract_timepiece.methods
          .ownerOf(nft.tokenId)
          .call()
          .catch((e) => {
            console.log(e);
          });
        if (
          nftowner_timepiece &&
          nftowner_timepiece.toLowerCase() === nft.seller.toLowerCase()
        ) {
          nft.type = "timepiece";
          nft.chain = 1;
          convertedNFTs.push(nft);
        }
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
