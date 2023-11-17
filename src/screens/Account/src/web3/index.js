import {
  cawsContractAbi,
  TopUpContractAbi,
  ERC20_ABI,
  TOKEN_ABI,
  WOD_ABI,
  LANDNFT_ABI,
  CAWSSTAKE_ABI,
  LANDSTAKING_ABI,
  DYP_700_ABI,DYP_700V1_ABI,
  iDYP_3500_ABI,
} from "./abis";
import Web3 from "web3";

const cawsContractAddress = "0xd06cF9e1189FEAb09c844C597abc3767BC12608c";
const cawsStakeContractAddress = "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A";
const TopUpContractAddress = "0xAdD0F01275080E18975bf1C70ce213ad48DE24bf";
const erc20Address = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
const token_address = "0x1a3264F2e7b1CFC6220ec9348d33cCF02Af7aaa4";
const idyptoken_address = "0xBD100d061E120b2c67A24453CF6368E63f1Be056";

const wod_address = "0xc40bE3A801A39bdC151BF6b3468B4035F8A4d440";
const landNft_address = "0xcd60d912655281908ee557ce1add61e983385a03";
const landNftStake_address = "0x6821710b0d6e9e10acfd8433ad023f874ed782f1";
const dyp700_address = "0xc394E6A94460d4453dcC74eFd1c1653D2f640073";
const dyp700v1_address = "0x856b233e6B9a5BF5c210A6c28a8B064eD5d6e246";

const idyp3500_address = "0xc31311ba17ad370bf4a1be09f7f8f99a68355224";

export const web3 = new Web3();
web3.setProvider(window.ethereum);

export const cawsContractWeb3 = new Web3();
export const caws_Contract = new Web3(
  "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
);

cawsContractWeb3.setProvider(window.ethereum);
export const cawsContract = new caws_Contract.eth.Contract(
  cawsContractAbi,
  cawsContractAddress
);
export const cawsStakeContract = new caws_Contract.eth.Contract(
  CAWSSTAKE_ABI,
  cawsStakeContractAddress
);

export const topUpContract = new cawsContractWeb3.eth.Contract(
  TopUpContractAbi,
  TopUpContractAddress
);
export const erc20_abi = new cawsContractWeb3.eth.Contract(
  ERC20_ABI,
  erc20Address
);
export const token_abi = new cawsContractWeb3.eth.Contract(
  TOKEN_ABI,
  token_address
);

export const token_abi_old = new cawsContractWeb3.eth.Contract(
  TOKEN_ABI,
  erc20Address
);

export const idyptoken_abi = new cawsContractWeb3.eth.Contract(
    TOKEN_ABI,
    idyptoken_address
  ); 
export const wod_abi = new cawsContractWeb3.eth.Contract(WOD_ABI, wod_address);
export const landNft_contract = new caws_Contract.eth.Contract(
  LANDNFT_ABI,
  landNft_address
);
export const landNftStake_contract = new caws_Contract.eth.Contract(
  LANDSTAKING_ABI,
  landNftStake_address
);

export const dyp700_abi = new cawsContractWeb3.eth.Contract(
  DYP_700_ABI,
  dyp700_address
);

export const dyp700v1_abi = new cawsContractWeb3.eth.Contract(
  DYP_700V1_ABI,
  dyp700v1_address
);

export const idyp3500_abi = new cawsContractWeb3.eth.Contract(
  iDYP_3500_ABI,
  idyp3500_address
);

export const wodAddress = wod_address;
export const dyp700Address = dyp700_address;
export const dyp700v1Address = dyp700v1_address;

export const idyp3500Address = idyp3500_address;

