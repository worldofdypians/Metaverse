const OPENSEA_CONTRACTS = {
  caws: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
  land: "0xcd60d912655281908ee557ce1add61e983385a03",
  timepiece: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
};

export const getOpenSeaLink = (type, tokenId) =>
  `https://opensea.io/item/ethereum/${OPENSEA_CONTRACTS[type]}/${tokenId}`;
