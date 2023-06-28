import axios from "axios";

const URL =
  "https://api.studio.thegraph.com/query/46190/dypius-marketplace/version/latest";

const itemListedQuery = (
  sort = "",
  findBy = "",
  findValue = "",
  nft_address = ""
) => {
  if (sort === "price_asc") {
    return `{
      itemListeds(first: 1000, orderBy: price, orderDirection: asc) {
        seller
        nftAddress
        tokenId
        price
        payment_priceType
        payment_tokenAddress
        blockNumber
        blockTimestamp
      }
    }`;
  }

  if (sort === "price_desc") {
    return `{
      itemListeds(first: 1000, orderBy: price, orderDirection: desc) {
        seller
        nftAddress
        tokenId
        price
        payment_priceType
        payment_tokenAddress
        blockNumber
        blockTimestamp
      }
    }`;
  }

  if (sort === "time_asc") {
    return `{
      itemListeds(first: 1000, orderBy: blockTimestamp, orderDirection: asc) {
        seller
        nftAddress
        tokenId
        price
        payment_priceType
        payment_tokenAddress
        blockNumber
        blockTimestamp
        }
      }`;
  }

  if (sort === "time_desc") {
    return `{
      itemListeds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
        seller
        nftAddress
        tokenId
        price
        payment_priceType
        payment_tokenAddress
        blockNumber
        blockTimestamp
      }
      }
      `;
  }

  if (sort === "payment_priceType_asc") {
    return `{
      itemListeds(first: 1000, orderBy: payment_priceType, orderDirection: asc) {
        seller
        nftAddress
        tokenId
        price
        payment_priceType
        payment_tokenAddress
        blockNumber
        blockTimestamp
      }
      }
      
      `;
  }

  if (sort === "payment_priceType_desc") {
    return `{
        itemListeds(first: 1000, orderBy: payment_priceType, orderDirection: desc) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
            }
        }`;
  }

  if (findBy === "seller") {
    return `
        {
            itemListeds(where:{seller:"${findValue}"}) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
        }
        }
        `;
  }

  if (findBy === "nftAddress") {
    return `
        {
            itemListeds(where:{nftAddress:"${findValue}"}) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
        }
        }
        `;
  }

  // check if token id and nft address is already listed
  if (findBy === "nftAddress_tokenId") {
    return `
        {
            itemListeds(where:{nftAddress:"${nft_address}", tokenId:"${findValue}"}) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
        }
        }
        `;
  }

  // get latest 20 recent  listed NFTS in 24 hours
  if (findBy === "recentListedNFTS") {
    return `
        {
            itemListeds(first: 20, orderBy: blockTimestamp, orderDirection: desc) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
        }
        }
        `;
  }

  if (findBy === "payment_priceType") {
    if (findValue === "ETH") {
      return `
        {
            itemListeds(where:{payment_priceType:0}) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
        }
        }
        `;
    }

    if (findValue === "DYP") {
      return `
        {
            itemListeds(where:{payment_priceType:1}) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
        }
        }
        `;
    }
  }

  return `
        {
            itemListeds(first: 1000) {
            seller
            nftAddress
            tokenId
            price
            payment_priceType
            payment_tokenAddress
            blockNumber
            blockTimestamp
        }
        }
        `;
};

const itemCanceledQuery = `
        {
            itemCanceleds(first: 1000) {
            nftAddress
            tokenId
            blockNumber
            blockTimestamp
        }
        }
        `;

const itemBoughtQuery = `
        {
            itemBoughts(first: 1000) {
            nftAddress
            tokenId
            blockNumber
            blockTimestamp
        }
        }
        `;

const singleItemQuery = (block) => {
  return `
        {
            itemListeds(where:{blockTimestamp_in:[
            "${block}",
        ]}) {
            id
            seller
            nftAddress
            tokenId
            payment_priceType
            payment_tokenAddress
            blockTimestamp
        }
        }
        `;
};

const getListedNFTS = async (
  block = 0,
  sort = "",
  findBy = "",
  findValue = "",
  nft_address = ""
) => {
  let listedItems = [];

  if (block === 0) {
    await axios
      .post(URL, { query: itemCanceledQuery })
      .then(async (result1) => {
        const canceledItems = await result1.data.data.itemCanceleds.reduce(
          (acc, item) => {
            const key = `${item.nftAddress}_${item.tokenId}`;
            if (!acc[key] || acc[key].blockNumber < item.blockNumber) {
              acc[key] = {
                blockNumber: item.blockNumber,
                blockTimestamp: item.blockTimestamp,
              };
            }
            return acc;
          },
          {}
        );

        await axios
          .post(URL, { query: itemBoughtQuery })
          .then(async (result2) => {
            const boughtItems = await result2.data.data.itemBoughts.reduce(
              (acc, item) => {
                const key = `${item.nftAddress}_${item.tokenId}`;
                if (!acc[key] || acc[key].blockNumber < item.blockNumber) {
                  acc[key] = {
                    blockNumber: item.blockNumber,
                    blockTimestamp: item.blockTimestamp,
                  };
                }
                return acc;
              },
              {}
            );

            await axios
              .post(URL, {
                query: itemListedQuery(sort, findBy, findValue, nft_address),
              })
              .then(async (result3) => {
                const itemListed = await result3.data.data?.itemListeds;
                const latestStates = {};

                itemListed &&
                  itemListed.forEach((item) => {
                    const nftAddress = item.nftAddress;
                    const tokenId = item.tokenId;
                    const key = `${nftAddress}_${tokenId}`;

                    if (
                      !canceledItems[key] ||
                      canceledItems[key].blockNumber < item.blockNumber
                    ) {
                      if (
                        !boughtItems[key] ||
                        boughtItems[key].blockNumber < item.blockNumber
                      ) {
                        if (
                          !latestStates[key] ||
                          latestStates[key].blockNumber < item.blockNumber
                        ) {
                          latestStates[key] = {
                            seller: item.seller,
                            nftAddress: item.nftAddress,
                            tokenId: item.tokenId,
                            price: item.price,
                            payment_priceType: item.payment_priceType,
                            payment_tokenAddress: item.payment_tokenAddress,
                            blockNumber: item.blockNumber,
                            blockTimestamp: item.blockTimestamp,
                          };
                        }
                      }
                    }
                  });

                return (listedItems = Object.values(latestStates));
              });
          });
      });

    return listedItems;
  } else {
    await axios
      .post(URL, { query: singleItemQuery(block) })
      .then(async (result3) => {
        listedItems = Object.values(result3.data.data.itemListeds);
      });
  }

  return listedItems;
};

export default getListedNFTS;
