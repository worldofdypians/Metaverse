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
const wod_token_address = "0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8";
const idyptoken_address = "0xBD100d061E120b2c67A24453CF6368E63f1Be056";

const dragonRuins_address = "0xA9D3c4f11C9a9eb4ea47E30d3210EEbF939d71De";
const coldBite_address = "0x6fDB783a9102961B9Ea62D40C69C067e93Ac170b";
const furyBeast_address = "0xEceF913121D299f7D962A7887C11bf60F3338a63";
const wingStorm_address = "0x5990a2e7c895A5A5F35787E81bC7BF5cFF085688";
const scorpionKing_address = "0x6fC8de0936d45071aFF7918137a436148107574C";
const stoneEye_address = "0x736F553A3eA9af11C5966A056064572c03737b5A";
const goldenPass_address = "0x64D519666D67F95124C3ac755F731ad6e15786DF";
const puzzleMadness_address = "0xE44E483486d38DADC77bBF968B55F39bBDACE80d";
const landNft_address = "0xcd60d912655281908ee557ce1add61e983385a03";
const landNftStake_address = "0x6821710b0d6e9e10acfd8433ad023f874ed782f1";
const dyp700_address = "0xd16DAad6bEd59a2c6806868855A05f4abF3b2ac9";
const dyp700v1_address = "0x6493e45F0D9B81355035f07d6FAf59309B2e2f89";

const idyp3500_address = "0x54ad1fAaf2781E58Fcb58b7D02E25c8289a08b06";

export const web3 = new Web3();
web3.setProvider(window.ethereum);

export const cawsContractWeb3 = new Web3();
export const bscWeb3 = window.bscWeb3;

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

export const wod_token = new bscWeb3.eth.Contract(
  TOKEN_ABI,
  wod_token_address
);

export const wod_token_abi = new cawsContractWeb3.eth.Contract(
  TOKEN_ABI,
  wod_token_address
);

export const usdt_token_abi = new cawsContractWeb3.eth.Contract(
  TOKEN_ABI,
  window.config.usdt_token_address
);

export const token_abi_old = new cawsContractWeb3.eth.Contract(
  TOKEN_ABI,
  erc20Address
);

export const idyptoken_abi = new cawsContractWeb3.eth.Contract(
    TOKEN_ABI,
    idyptoken_address
  ); 
export const wod_abi = new cawsContractWeb3.eth.Contract(WOD_ABI, dragonRuins_address);
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

export const dragonRuinsAddress = dragonRuins_address;
export const coldBiteAddress = coldBite_address;
export const furyBeastAddress = furyBeast_address;
export const wingStormAddress = wingStorm_address;
export const scorpionKingAddress = scorpionKing_address;
export const stoneEyeAddress = stoneEye_address;
export const goldenPassAddress = goldenPass_address;
export const puzzleMadnessAddress = puzzleMadness_address;
export const dyp700Address = dyp700_address;
export const dyp700v1Address = dyp700v1_address;

export const idyp3500Address = idyp3500_address;

