import axios from "axios";
import {
  cawsContract,
  landNft_contract,
  cawsStakeContract,
  landNftStake_contract,
} from "../web3/index";
const PER_PAGE_DEFAULT = 25;

export const getWalletTokens = async (walletAddress, options = {}) => {
  let { limit = PER_PAGE_DEFAULT, page = 1, includeMetaData = true } = options;
  if (limit <= 0 || limit > PER_PAGE_DEFAULT) {
    limit = PER_PAGE_DEFAULT;
  }

  const numberOfTokens = +(await cawsContract.methods
    .balanceOf(walletAddress)
    .call());

  const stakeArray = await cawsStakeContract.methods
    .depositsOf(walletAddress)
    .call();
  const numberOfStakedTokens = stakeArray.length;
  const numberOfLandNftTokens = +(await landNft_contract.methods
    .balanceOf(walletAddress)
    .call());

  const stakeNFTLandArray = await landNftStake_contract.methods
    .depositsOf(walletAddress)
    .call();
  const numberOfLandNftStakedTokens = stakeNFTLandArray.length;

  if (
    numberOfTokens === 0 &&
    numberOfLandNftTokens === 0 &&
    numberOfStakedTokens === 0 &&
    numberOfLandNftStakedTokens === 0
  ) {
    const response = {
      items: [],
      landItems: [],
      metaData: {
        page,
        limit,
        hasMore: false,
        total: numberOfTokens,
        landTotal: numberOfLandNftTokens,
        landStakedTotal: numberOfLandNftStakedTokens,
        stakeTotal: numberOfStakedTokens,
        thisPage: 0,
      },
    };
    return response;
  }

  // if (options?.fetchAll) {
  //   const walletAddressTokensPromises = []
  //   for (let index: number = 0; index < numberOfTokens; index++) {
  //     walletAddressTokensPromises.push(getTokenMetaDataByIndex({ walletAddress, index }, { includeMetaData }))
  //   }
  //   const walletAddressTokensPromisesResult: object[] = await Promise.all(walletAddressTokensPromises)
  //   return {
  //     items: walletAddressTokensPromisesResult,
  //     metaData: { page: 1, limit: numberOfTokens, hasMore: false, total: numberOfTokens, thisPage: walletAddressTokensPromisesResult.length }
  //   }
  // }

  const startIndex = (page - 1) * limit;
  let endIndex = startIndex + limit;
  let hasMore = true;
  if (endIndex >= numberOfTokens) {
    endIndex = numberOfTokens;
    hasMore = false;
  }

  const startIndexLand = (page - 1) * limit;
  let endIndexLand = startIndexLand + limit;
  let hasMoreLand = true;
  if (endIndexLand >= numberOfLandNftTokens) {
    endIndexLand = numberOfLandNftTokens;
    hasMoreLand = false;
  }

  const startIndexStake = (page - 1) * limit;
  let endIndexStake = startIndexStake + limit;
  let hasMoreStake = true;
  if (endIndexStake >= numberOfStakedTokens) {
    endIndexStake = numberOfStakedTokens;
    hasMoreStake = false;
  }

  const startIndexLandStake = (page - 1) * limit;
  let endIndexLandStake = startIndexLandStake + limit;
  let hasMoreLandStake = true;
  if (endIndexLandStake >= numberOfLandNftStakedTokens) {
    endIndexLandStake = numberOfLandNftStakedTokens;
    hasMoreLandStake = false;
  }

  const walletAddressTokensPromises = [];
  const walletAddressLandNftTokensPromises = [];
  const walletAddressStakedNftTokensPromises = [];
  const walletAddressStakedLandNftTokensPromises = [];

  for (let index = startIndex; index < endIndex; index++) {
    walletAddressTokensPromises.push(
      getTokenMetaDataByIndex({ walletAddress, index }, { includeMetaData })
    );
  }
  walletAddressStakedNftTokensPromises.push(
    getTokenMetaDataByIndexStake({ walletAddress }, { includeMetaData })
  );

  walletAddressStakedLandNftTokensPromises.push(
    getTokenMetaDataByIndexLandStakeNft({ walletAddress }, { includeMetaData })
  );

  for (let index = startIndexLand; index < endIndexLand; index++) {
    walletAddressLandNftTokensPromises.push(
      getTokenMetaDataByIndexLandNft(
        { walletAddress, index },
        { includeMetaData }
      )
    );
  }
  const walletAddressTokensPromisesResult = await Promise.all(
    walletAddressTokensPromises
  );
  const walletAddressStakedNftTokensPromiseResult = await Promise.all(
    walletAddressStakedNftTokensPromises
  );

  const stakeDestruct = [...walletAddressStakedNftTokensPromiseResult];
  const finalStakeArray = stakeDestruct[0];
  const walletAddressStakedLandNftTokensPromiseResult = await Promise.all(
    walletAddressStakedLandNftTokensPromises
  );

  const landstakeDestruct = [...walletAddressStakedLandNftTokensPromiseResult];
  const finalLandStakeArray = landstakeDestruct[0];
  const allCaws = [...walletAddressTokensPromisesResult, ...finalStakeArray];
  const walletAddressLandNftTokensPromisesResult = await Promise.all(
    walletAddressLandNftTokensPromises
  );

  const allLands = [
    ...walletAddressLandNftTokensPromisesResult,
    ...finalLandStakeArray,
  ];
  const response = {
    items: allCaws,
    landItems: allLands,
    stakeItems: walletAddressStakedNftTokensPromises,
    metaData: {
      page,
      limit,
      hasMore,
      hasMoreLand,
      hasMoreStake,
      total: numberOfTokens,
      landTotal: numberOfLandNftTokens,
      stakeTotal: numberOfStakedTokens,
      thisPage: walletAddressTokensPromisesResult.length,
    },
  };
  return response;
};

const getTokenMetaDataByIndex = async (
  getTokenMetaDataByIndexInput,
  options
) => {
  const { walletAddress, index } = getTokenMetaDataByIndexInput;
  const { includeMetaData } = options;
  const tokenId = +(await cawsContract.methods
    .tokenOfOwnerByIndex(walletAddress, index)
    .call());
  if (!includeMetaData) {
    return tokenId;
  }
  const tokenMetaDataURI = await cawsContract.methods.tokenURI(tokenId).call();
  const { data: tokenMetaData } = await axios.get(tokenMetaDataURI);
  return { ...tokenMetaData };
};

const getTokenMetaDataByIndexStake = async (
  getTokenMetaDataByIndexInput,
  options
) => {
  const { walletAddress } = getTokenMetaDataByIndexInput;
  const { includeMetaData } = options;
  const stakeArray = await cawsStakeContract.methods
    .depositsOf(walletAddress)
    .call();
  var finalArray = [];
  for (let i = 0; i < stakeArray.length; i++) {
    const tokenId = parseInt(stakeArray[i]);

    if (!includeMetaData) {
      return tokenId;
    }
    const tokenMetaDataURI = `https://mint.dyp.finance/metadata/${tokenId}`;
    const { data: tokenMetaData } = await axios.get(tokenMetaDataURI);
    finalArray.push(tokenMetaData);
  }
  const final = [...finalArray];
  return final;
};

const getTokenMetaDataByIndexLandStakeNft = async (
  getTokenMetaDataByIndexInput,
  options
) => {
  const { walletAddress } = getTokenMetaDataByIndexInput;
  const { includeMetaData } = options;
  const stakeArray = await landNftStake_contract.methods
    .depositsOf(walletAddress)
    .call();
  var finalArray = [];
  for (let i = 0; i < stakeArray.length; i++) {
    const tokenId = parseInt(stakeArray[i]);

    if (!includeMetaData) {
      return tokenId;
    }
    const tokenMetaDataURI = `https://mint.worldofdypians.com/metadata/${tokenId}`;
    const { data: tokenMetaData } = await axios.get(tokenMetaDataURI);
    finalArray.push(tokenMetaData);
  }
  const final = [...finalArray];
  return final;
};

const getTokenMetaDataByIndexLandNft = async (
  getTokenMetaDataByIndexInput,
  options
) => {
  const { walletAddress, index } = getTokenMetaDataByIndexInput;
  const { includeMetaData } = options;
  const tokenId = +(await landNft_contract.methods
    .tokenOfOwnerByIndex(walletAddress, index)
    .call());
  if (!includeMetaData) {
    return tokenId;
  }
  const tokenMetaDataURI = `https://mint.worldofdypians.com/metadata/${tokenId}`;

  const { data: tokenMetaData } = await axios.get(tokenMetaDataURI);
  return { ...tokenMetaData };
};
