const BigNumber = window.BigNumber;
window.IS_CONNECTED = false;
window.WALLET_TYPE = "";
const TOKEN_ADDRESS = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
const TOKEN_IDYP_ADDRESS = "0xbd100d061e120b2c67a24453cf6368e63f1be056";

function getTokenContract(address) {
  return getContract({ address, ABI: window.TOKEN_ABI });
}

// ALL THE ADDRESSES IN CONFIG MUST BE LOWERCASE
window.config = {
  beta_test: "WorldOfDypians Beta Tester Application",
  dyp_token_address: "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17",
  token_dypius_new_address: "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3", //new dypius token on eth
  nft_marketplace_address: "0xF55D96735Fa22ba1C119bA37aF76C2c4E3BeC224",
  nft_caws_address: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
  nft_cawsold_address: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
  nft_caws_premiumstake_address: "0x097bB1679AC734E90907Ff4173bA966c694428Fc",
  nft_land_premiumstake_address: "0x3E0c0443A6a5382B2Ef20ECfe3bdbE84F1436523",

  nft_timepiece_address: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",
  nft_coingecko_address: "0x9b7c2B05367A729e0E671a24B8a143C0d4F6A90D",
  nft_gate_address: "0x2FED6783AdA5eA6B2D7cE9aE749c76B9f4858526",
  nft_conflux_address: "0x2deecf2a05f735890eb3ea085d55cec8f1a93895",
  nft_base_address: "0x2dEeCF2a05F735890Eb3eA085d55CEc8F1a93895",
  nft_doge_address: "0x317538113E19dE1567A4b05357BAA2534353e9B2",
  nft_cmc_address: "0x05e2Efe472176f17167c93eCdEe324eF3da57Db8",
  nft_skale_address: "0x5C3581fDB05E3A20fb109864DaE75A5665A7F92d",
  nft_core_address: "0xdbE31B4f2a5921Ec2d0d739E3c9bcA985C5A18b0",
  nft_viction_address: "0x8E4917c1Ba9598fBbF66934CB17AC28c3b5849Ab",
  nft_sei_address: "0x5C3581fDB05E3A20fb109864DaE75A5665A7F92d",
  nft_immutable_address: "0x49ce073Ce717425f1E0cB894C02A583a12cb0F90",
  nft_bnb_address: "0xe468df1606650452b2c08c36F79eaA8B78848E9C",
  nft_opbnb_address: "0x4e4A3f047fA8Fe69cB1a79a0452121ED6fca95ba",
  nft_multivers_address: "0x96A3F313679f2F5Ce098091BFf271bF4e848178B",
  nft_manta_address: "0xf894eBD7c4c850687D208246c42036EB951CE324",
  nft_taiko_address: "0xCb2Eb4ba62346751F36bA652010b553759141AEE",
  nft_cookie3_address: "0xC46EF880A2670a00392d3d3fDa9C65A81e8b505b",

  nft_dypius_premium_address: "0x803cEFB7DFF9b92d7f8cAd6522AB6A70dEac983B",
  nft_dypius_premium_viction_address:
    "0x3216574908Fe5B4fF523c3E6d2edFfb7bBc066E0",
    nft_dypius_premium_taiko_address:
    "0xBd651c4b282bbAD9f2317b06EfeD9f120C199B17",

  ccip_eth_caws_address: "0x2824Ac0Eab15744396E763A698b55F4Fe983a757",
  ccip_bnb_caws_address: "0x0C5E19B9147c39d196bC6c88D087A7A84f99563E",
  ccip_avax_caws_address: "0x8e99Eae11a1423e9ea27638C85648c702C818961",
  ccip_base_caws_address: "0x81Dd9ac0886D77e219ce32476808d76ba609768c",

  ccip_eth_wod_address: "0xec0E656E2Dcd53f1BCdD6e68D42328f5c76652c0",
  ccip_bnb_wod_address: "0x108e599592c4e8114f5C72800767264d835c8340",
  ccip_avax_wod_address: "0x5390F1cD564b23c4594247B3577da439ACB0B228",
  ccip_base_wod_address: "0xB7433695Cc98f9BC799Ac9a090c45357f25F463f",

  nft_caws_bnb_address: "0x3e5a3aD0B94DF3A9d5d4Fa54c539216B08636Df7",
  nft_caws_avax_address: "0xd8000D7933165E2a621443b42BCb5D85A30Bd2f0",
  nft_caws_base_address: "0x32F0884321D2Bd1eA36Bfa6d728A5E52f8bCEd4A",

  nft_land_bnb_address: "0xf40674A628832eB9d3929f14AB6D9B5705BDD130",
  nft_land_avax_address: "0x2BD540961f44F1cd593F901697d9F8b1e5471EB8",
  nft_land_base_address: "0x57F6fFe512ef48e3FB169E48f6D4c5551688Be7D",
  nftSeller_address: "0x65C3d0F9438644945dF5BF321c9F0fCf333302b8",

  destination_chain_selector_eth: "5009297550715157269",
  destination_chain_selector_bnb: "11344663589394136015",
  destination_chain_selector_avax: "6433500567565415381",
  destination_chain_selector_base: "15971525489660198786",

  nft_land_address: "0xcd60d912655281908ee557ce1add61e983385a03",

  daily_bonus_address: "0xd600fBcF64Da43CcBB4ab6Da61007F5b1f8Fe455",
  daily_bonus_bnb_address: "0xF4435c244A292a8E8D56767bf6DF9b9c4D59aEED",
  daily_bonus_skale_address: "0x620655Ee8320bA51cf4cc06bf6a7C14022271764",
  daily_bonus_core_address: "0x5c3581fdb05e3a20fb109864dae75a5665a7f92d",
  daily_bonus_viction_address: "0xaf33f679be47733bD3aBb5b0b977B6ba3eD8d01E",
  daily_bonus_manta_address: "0x6041dC62b74e28596b4917693f6B0F5baA61A13F",
  daily_bonus_base_address: "0xB3ae054CB8017eCc54B35075f2F4Da8Eb21d214D",

  daily_bonus_taiko_address: "0xaf33f679be47733bD3aBb5b0b977B6ba3eD8d01E",

  admin_address: "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",

  weth_address: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", // LOWERCASE! avax
  weth2_address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // ethereum
  token_dypius_new_address: "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3", //new dypius token on eth

  infura_endpoint:
    "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e",
  bsc_endpoint: "https://bsc-dataseed.bnbchain.org",
  manta_endpoint: "https://pacific-rpc.manta.network/http",
  taiko_endpoint: "https://rpc.taiko.xyz",

  skale_endpoint: "https://mainnet.skalenodes.com/v1/green-giddy-denebola",

  avax_endpoint: "https://api.avax.network/ext/bc/C/rpc",
  conflux_endpoint: "https://evm.confluxrpc.com/",
  base_endpoint: "https://mainnet.base.org",
  opbnb_endpoint: "https://opbnb.publicnode.com",
  core_endpoint: "https://rpc.coredao.org",
  viction_endpoint: "https://rpc.viction.xyz",
  sei_endpoint: "https://evm-rpc-arctic-1.sei-apis.com",
  immutable_endpoint: "https://rpc.immutable.com",

  subscription_address: "0x5078a4912f6e0d74dcf99482ac5910df123e9b4b",
  subscription_newavax_address: "0xef3819fc5bb5a5468cac4d47e2a1ee6905b8cc7d",

  subscriptioneth_address: "0x6cc47d895aa6da6012c2b6bfd2f6af3ebbf1d2e4",
  subscription_neweth_address: "0x29c90c6a1243455266afd7f92649e384213d45b0",

  subscriptionbnb_address: "0x0ec59a2d18e1e83ab393b3ac9d7d6d28cbff0d35",
  subscription_newbnb_address: "0xA297c8c8094354c49E93e072DaDCa846a00148d0",
  subscription_newbnb1_address: "0xc8adbef45b75ee4f3b5c9d4da2e1a1af408378a2",

  //new premium contract with discount + nft
  subscription_newbnb2_address: "0x0C41A7Dd013B9062Ef38B48E905a985c262B248b",

  subscription_cfx_address: "0x56c83c9308b066627866bba9cd2322f3e01b16bf",
  subscription_base_address: "0x9c13Dbc8f0fA8ceD8C1B53c4237A08445eca32fe",

  subscription_skale_address: "0x6041dC62b74e28596b4917693f6B0F5baA61A13F",
  subscription_core_address: "0x2deecf2a05f735890eb3ea085d55cec8f1a93895",
  subscription_viction_address: "0x128a60F2F359D11C2C768C6a9880223e98342634",

  subscription_sei_address: "0x6041dC62b74e28596b4917693f6B0F5baA61A13F",
  subscription_manta_address: "0xF943437f92519e3AdE18f16cb045453B7a92e6D5",
  subscription_taiko_address: "0x0570cb2bb014d0eda8dfffffdeb07906a5b40aa3",

  // default_gasprice_gwei: 60,
  default_gas_amount: 1200000,

  ZERO_ADDRESS: "0x0000000000000000000000000000000000000000",

  pangolin_router_address: "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106",
  pancakeswap_router_address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  uniswap_router_address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",

  metamask_message: "I want to login, let me in!",
  metamask_message2: "I want to login to DYP TOOLS, let me in!",
  metamask_admin_account: "0x471ad9812b2537ffc66eba4d474cc55c32dec4f8",

  // add supported subscription tokens here, lowercase
  // THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
  subscription_tokens: {
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7": {
      symbol: "WAVAX",
      decimals: 18,
    },
    "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7": {
      symbol: "USDT",
      decimals: 6,
    },
    "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70": {
      symbol: "DAI",
      decimals: 18,
    },
    "0x1a3264F2e7b1CFC6220ec9348d33cCF02Af7aaa4": {
      symbol: "DYPv2",
      decimals: 18,
    },
  },

  // add supported subscription tokens here, lowercase
  // THESE TOKENS MUST HAVE BEEN ALREADY ADDED TO SMART CONTRACT!
  subscriptioneth_tokens: {
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
      symbol: "WETH",
      decimals: 18,
    },
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
      symbol: "USDC",
      decimals: 6,
    },
    "0xdac17f958d2ee523a2206206994597c13d831ec7": {
      symbol: "USDT",
      decimals: 6,
    },
    "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3": {
      symbol: "DYPv2",
      decimals: 18,
    },
    "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17": {
      symbol: "DYPv1",
      decimals: 18,
    },
  },
  subscriptionbnb_tokens: {
    "0x55d398326f99059fF775485246999027B3197955": {
      symbol: "USDT",
      decimals: 18,
    },
    "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": {
      symbol: "BNB",
      decimals: 18,
    },
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
      symbol: "BUSD",
      decimals: 18,
    },

    "0x1a3264F2e7b1CFC6220ec9348d33cCF02Af7aaa4": {
      symbol: "DYPv2",
      decimals: 18,
    },
  },

  subscriptioncfx_tokens: {
    "0xfe97E85d13ABD9c1c33384E796F10B73905637cE": {
      symbol: "USDT",
      decimals: 18,
    },
    "0x6963EfED0aB40F6C3d7BdA44A05dcf1437C44372": {
      symbol: "USDC",
      decimals: 18,
    },
    "0x14b2D3bC65e74DAE1030EAFd8ac30c533c976A9b": {
      symbol: "WCFX",
      decimals: 18,
    },
  },

  subscriptionbase_tokens: {
    "0x4200000000000000000000000000000000000006": {
      symbol: "WETH",
      decimals: 18,
    },
    "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb": {
      symbol: "DAI",
      decimals: 18,
    },
  },

  subscriptionskale_tokens: {
    "0xCC205196288B7A26f6D43bBD68AaA98dde97276d": {
      symbol: "USDC",
      decimals: 6,
    },
  },

  subscriptionviction_tokens: {
    "0x381B31409e4D220919B2cFF012ED94d70135A59e": {
      symbol: "USDT",
      decimals: 6,
    },
  },

  subscriptionmanta_tokens: {
    "0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f": {
      symbol: "USDT",
      decimals: 6,
    },
    "0xb73603C5d87fA094B7314C74ACE2e64D165016fb": {
      symbol: "USDC",
      decimals: 6,
    },
    "0x0Dc808adcE2099A9F62AA87D9670745AbA741746": {
      symbol: "WETH",
      decimals: 18,
    },
    "0x95CeF13441Be50d20cA4558CC0a27B601aC544E5": {
      symbol: "MANTA",
      decimals: 18,
    },
  },

  subscriptiontaiko_tokens: {
    "0x2DEF195713CF4a606B49D07E520e22C17899a736": {
      symbol: "USDT",
      decimals: 6,
    },
    "0x07d83526730c7438048D55A4fc0b850e2aaB6f0b": {
      symbol: "USDC",
      decimals: 6,
    },
    "0x7d02A3E0180451B17e5D7f29eF78d06F8117106C": {
      symbol: "DAI",
      decimals: 18,
    },
  },

  subscriptioncore_tokens: {
    "0x900101d06a7426441ae63e9ab3b9b0f63be145f1": {
      symbol: "USDT",
      decimals: 6,
    },
    "0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f": {
      symbol: "WCORE",
      decimals: 18,
    },
  },

  subscriptionsei_tokens: {
    "0xCC205196288B7A26f6D43bBD68AaA98dde97276d": {
      symbol: "USDC",
      decimals: 6,
    },
  },

  /* MINT NFT */
  nft_address: "0xd06cf9e1189feab09c844c597abc3767bc12608c",
  nftstaking_address: "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A",
  nftstaking_address50: "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A",

  /* MINT LANDNFT */
  landnft_address: "0xcd60d912655281908ee557ce1add61e983385a03",
  landnftstake_address: "0x6821710b0d6e9e10acfd8433ad023f874ed782f1",

  /* WOD CAWS NFT */
  wod_caws_address: "0xd324a03bf17eee8d34a8843d094a76ff8f561e38",

  /* CAWS TIMEPIECE NFT */
  caws_timepiece_address: "0x29c13273cf56dac69cfae173c73fde2cd75b5ede",

  /* MINT LANDNFT GOERLI */
  // landnft_address: "0x1a6101ec1364cc1bb671a2be2a6c2fd0764b3dfc",
  // landnftstake_address: "0x428d702b625dc2a917d087679e5cf99bddbcdd13",
};

window.infuraWeb3 = new Web3(window.config.infura_endpoint);
window.bscWeb3 = new Web3(window.config.bsc_endpoint);
window.mantaWeb3 = new Web3(window.config.manta_endpoint);
window.taikoWeb3 = new Web3(window.config.taiko_endpoint);
window.skaleWeb3 = new Web3(window.config.skale_endpoint);

window.avaxWeb3 = new Web3(window.config.avax_endpoint);
window.confluxWeb3 = new Web3(window.config.conflux_endpoint);
window.baseWeb3 = new Web3(window.config.base_endpoint);
window.opBnbWeb3 = new Web3(window.config.opbnb_endpoint);
window.coreWeb3 = new Web3(window.config.core_endpoint);
window.immutableWeb3 = new Web3(window.config.immutable_endpoint);

window.victionWeb3 = new Web3(window.config.viction_endpoint);
window.seiWeb3 = new Web3(window.config.sei_endpoint);

/**
 *
 * @param {"TOKEN" | "STAKING" | "NFTSTAKING" | "NFTSTAKING50" } key
 */
async function getContractNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      key === "NFTSTAKING50" || key === "NFTSTAKING"
        ? window.NFTSTAKING_ABI
        : ABI,
      key === "NFTSTAKING" || key === "NFTSTAKING50"
        ? "0xEe425BbbEC5e9Bf4a59a1c19eFff522AD8b7A47A"
        : address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class NFT {
  constructor(key = "NFT") {
    this.key = key;
    [
      "MAX_CAWS",
      "balanceOf",
      "baseURI",
      "cawsPrice",
      "maxCawsPurchase",
      "ownerOf",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.infuraWeb3.eth.Contract(
          this.key === "NFTSTAKING50" ? window.NFTSTAKING_ABI : window.CAWS_ABI,

          this.key === "NFTSTAKING" || this.key === "NFTSTAKING50"
            ? window.config.nftstaking_address
            : window.config.nft_caws_address,
          {
            from: await getCoinbase(),
          }
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["mintCaws"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });
  }

  async mintNFT(amount) {
    let nft_contract = await getContractNFT("CAWS_NFT");
    let priceCaws = await nft_contract.methods.cawsPrice().call();
    let value = new BigNumber(priceCaws).times(amount);

    let second = nft_contract.methods
      .mintCaws(amount)
      .send({ value, from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }

  async approveStake(addr) {
    window.web3 = new Web3(window.ethereum);
    let nft_contract = new window.web3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );

    let staking_addr = addr;
    return await nft_contract.methods
      .setApprovalForAll(staking_addr, true)
      .send({ from: await getCoinbase() });
  }

  async checkapproveStake(useraddr, addr) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );
    return await nft_contract.methods.isApprovedForAll(useraddr, addr).call();
  }

  async depositStake() {
    let nft_contract = await getContractNFT("CAWS_NFT");
    return await nft_contract.methods.deposit([]).send();
  }

  async checkLockoutTime() {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.NFTSTAKING_ABI,
      window.config.nftstaking_address
    );

    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }

  async checkLockoutTime50() {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.NFTSTAKING_ABI,
      window.config.nftstaking_address
    );
    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }
}

window.nft = new NFT();

/*===================CAWS PREMIUM STAKING POOL*/

/**
 *
 * @param {"TOKEN" | "CAWSPREMIUM" } key
 */
async function getContractCawsPremiumNFT(key) {
  let address = window.config.nft_caws_premiumstake_address;

  window.web3 = new Web3(window.ethereum);
  window.cached_contracts[key] = new window.web3.eth.Contract(
    window.CAWSPREMIUM_ABI,
    address,
    {
      from: await getCoinbase(),
    }
  );

  return window.cached_contracts[key];
}

class CAWSPREMIUM {
  constructor(key = "CAWSPREMIUM") {
    this.key = key;
    [
      "LOCKUP_TIME",
      "MAX_DEPOSIT",
      "MAX_POOL",
      "depositsOf",
      "expiration",
      "stakingTime",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await new window.infuraWeb3.eth.Contract(
          window.CAWSPREMIUM_ABI,
          window.config.nft_caws_premiumstake_address
        );
        return await contract.methods[fn_name](...args).call();
      };
    });
  }

  async approveStakeCawsPremium(addr) {
    let nft_contract = await getContractCawsPremiumNFT("CAWSPREMIUM");
    return await nft_contract.methods.setApprovalForAll(addr, true).send();
  }

  async checkapproveStakeCawsPremium(useraddr, addr) {
    let nft_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWSPREMIUM_ABI,
      window.config.nft_caws_premiumstake_address
    );
    return await nft_contract.methods.isApprovedForAll(useraddr, addr).call();
  }

  async depositStakeCawsPremium() {
    let nft_contract = await getContractCawsPremiumNFT("CAWSPREMIUM");
    return await nft_contract.methods.deposit([]).send();
  }

  async checkLockoutTimeCawsPremium() {
    let nft_contract = await new window.infuraWeb3.eth.Contract(
      window.CAWSPREMIUM_ABI,
      window.config.nft_caws_premiumstake_address
    );
    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }
}

window.cawsPremium = new CAWSPREMIUM();

/*===================LAND PREMIUM STAKING POOL*/

/**
 *
 * @param {"TOKEN" | "LANDPREMIUM" } key
 */
async function getContractLandPremiumNFT(key) {
  let address = window.config.nft_land_premiumstake_address;

  window.web3 = new Web3(window.ethereum);
  window.cached_contracts[key] = new window.web3.eth.Contract(
    window.LANDPREMIUM_ABI,
    address,
    {
      from: await getCoinbase(),
    }
  );

  return window.cached_contracts[key];
}

class LANDPREMIUM {
  constructor(key = "LANDPREMIUM") {
    this.key = key;
    [
      "LOCKUP_TIME",
      "MAX_DEPOSIT",
      "MAX_POOL",
      "depositsOf",
      "expiration",
      "stakingTime",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await new window.infuraWeb3.eth.Contract(
          window.LANDPREMIUM_ABI,
          window.config.nft_land_premiumstake_address
        );
        return await contract.methods[fn_name](...args).call();
      };
    });
  }

  async approveStakeLandPremium(addr) {
    let nft_contract = await getContractLandPremiumNFT("LANDPREMIUM");
    return await nft_contract.methods.setApprovalForAll(addr, true).send();
  }

  async checkapproveStakeLandPremium(useraddr, addr) {
    let nft_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDPREMIUM_ABI,
      window.config.nft_land_premiumstake_address
    );
    return await nft_contract.methods.isApprovedForAll(useraddr, addr).call();
  }

  async depositStakeLandPremium() {
    let nft_contract = await getContractLandPremiumNFT("LANDPREMIUM");
    return await nft_contract.methods.deposit([]).send();
  }

  async checkLockoutTimeLandPremium() {
    let nft_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDPREMIUM_ABI,
      window.config.nft_land_premiumstake_address
    );
    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }
}

window.landPremium = new LANDPREMIUM();

/**
 *
 * @param {"TOKEN" | "LANDNFTSTAKE" } key
 */
async function getContractLandNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      key === "LANDNFTSTAKE"
        ? window.LANDMINTING_ABI
        : key === "LANDNFTSTAKING"
        ? window.LANDSTAKING_ABI
        : ABI,

      key === "LANDNFTSTAKE"
        ? window.config.nft_land_address
        : key === "LANDNFTSTAKING"
        ? window.config.landnftstake_address
        : address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class LANDNFT {
  constructor(key = "LANDNFTSTAKE") {
    this.key = key;
    [
      "MAX_MINT",
      "balanceOf",
      "baseURI",
      "landPrice",
      "maxLandPurchase",
      "ownerOf",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await new window.infuraWeb3.eth.Contract(
          key === "LANDNFTSTAKE"
            ? window.LANDMINTING_ABI
            : key === "LANDNFTSTAKING"
            ? window.LANDSTAKING_ABI
            : ABI,

          key === "LANDNFTSTAKE"
            ? window.config.nft_land_address
            : key === "LANDNFTSTAKING"
            ? window.config.landnftstake_address
            : address
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["mintWodGenesis"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractLandNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });
  }

  async mintNFT(amount, cawsArray) {
    const nft_contract = await getContractLandNFT("LANDNFTSTAKE");
    // const cawsContract = await getContractNFT("NFT");
    // const cawsStakeContract = await getContractNFT("NFTSTAKING");
    let countDiscount = cawsArray.length;
    // const coinbase = await getCoinbase();
    let newPrice = 0;
    let landnft = await nft_contract.methods.landPrice().call();
    const landPriceDiscount = await nft_contract.methods
      .LandPriceDiscount()
      .call();
    // if (cawsArray.length !== 0) {
    //   for (let i = 0; i < cawsArray.length; i++) {
    //     const result = await nft_contract.methods.cawsUsed(cawsArray[i]).call();
    //     if (result === false) {
    //       const cawsResult = await cawsContract.methods
    //         .ownerOf(cawsArray[i])
    //         .call();
    //       //Check if user is ownerOf Caws
    //       if (cawsResult === coinbase) {
    //         countDiscount++;
    //         continue;
    //       }
    //       //Check if user has deposited Caws in Staking
    //       const stakeResult = await cawsStakeContract.methods
    //         .calculateReward(coinbase, cawsArray[i])
    //         .call();
    //       if (stakeResult > 0) {
    //         countDiscount++;
    //       }
    //     }
    //   }
    // }

    if (countDiscount != 0) {
      newPrice =
        (landPriceDiscount * countDiscount +
          landnft * (amount - countDiscount)) /
        1e18;
    } else newPrice = (landnft * amount) / 1e18;

    const value = newPrice * 1e18;
    console.log(cawsArray, newPrice);
    let second = nft_contract.methods
      .mintWodGenesis(amount, cawsArray)
      .send({ value, from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }

  async approveStake(addr) {
    let nft_contract = await getContractLandNFT("LANDNFTSTAKE");
    let staking_addr = addr;
    return await nft_contract.methods
      .setApprovalForAll(staking_addr, true)
      .send();
  }

  async checkapproveStake(useraddr, addr) {
    let nft_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDMINTING_ABI,
      window.config.nft_land_address
    );

    return await nft_contract.methods.isApprovedForAll(useraddr, addr).call();
  }

  async depositStake() {
    let nft_contract = await getContractLandNFT("LANDNFTSTAKING");
    return await nft_contract.methods.deposit([]).send();
  }

  async checkLockoutTime() {
    let nft_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDSTAKING_ABI,
      windnow.config.landnftstake_address
    );

    const time = await nft_contract.methods.LOCKUP_TIME().call();
    return time;
  }
}

/**
 *
 * @param {"TOKEN" | "WOD_CAWS" } key
 */
async function getContractWodCawsNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.WOD_CAWS_ABI,
      address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class WOD_CAWS {
  constructor(key = "WOD_CAWS") {
    this.key = key;
    [
      "LOCKUP_TIME",
      "WoDcontractaddress",
      "calculateReward",
      "calculateRewards",
      "depositsOf",
      "depositsOfWoD",
      "erc20Address",
      "expiration",
      "onERC721Received",
      "owner",
      "paused",
      "rate",
      "stakingDestinationAddress",
      "stakingTime",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.infuraWeb3.eth.Contract(
          window.WOD_CAWS_ABI,
          window.config.wod_caws_address,
          {
            from: await getCoinbase(),
          }
        );

        return await contract.methods[fn_name](...args).call();
      };
    });

    ["deposit"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractWodCawsNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });

    ["claimRewards"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractWodCawsNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });

    ["withdraw"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractWodCawsNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });

    ["withdrawTokens"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractWodCawsNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });
  }

  async depositWodCaws(cawsArray, landArray) {
    const nft_contract = await getContractWodCawsNFT("WOD_CAWS");
    let second = await nft_contract.methods.deposit(cawsArray, landArray).send({
      from: await getCoinbase(),
    });
  }

  async claimRewardsWodCaws(cawsArray) {
    let nft_contract = await getContractWodCawsNFT("WOD_CAWS");
    return await nft_contract.methods
      .claimRewards(cawsArray)
      .send({ from: await getCoinbase() });
  }

  async withdrawWodCaws(cawsArray, landArray) {
    let nft_contract = await getContractWodCawsNFT("WOD_CAWS");
    console.log(cawsArray, landArray, "Caws and Land");
    return await nft_contract.methods
      .withdraw(cawsArray, landArray)
      .send({ from: await getCoinbase() });
  }

  async calculateRewardWodCaws(address, tokenId) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address,
      {
        from: await getCoinbase(),
      }
    );

    return await nft_contract.methods.calculateReward(address, tokenId).call();
  }

  async calculateRewardsWodCaws(address, tokenArray) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address,
      {
        from: await getCoinbase(),
      }
    );
    return await nft_contract.methods
      .calculateRewards(address, tokenArray)
      .call();
  }

  async depositsOfCaws(address) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address,
      {
        from: await getCoinbase(),
      }
    );
    return await nft_contract.methods.depositsOf(address).call();
  }

  async depositsOfWod(address) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address,
      {
        from: await getCoinbase(),
      }
    );
    return await nft_contract.methods.depositsOfWoD(address).call();
  }

  async checkLockupTimeWodCaws() {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address,
      {
        from: await getCoinbase(),
      }
    );
    const time = await nft_contract.methods.LOCKUP_TIME().call();

    return time;
  }

  async checkStakingTimeWodCaws(address) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.WOD_CAWS_ABI,
      window.config.wod_caws_address,
      {
        from: await getCoinbase(),
      }
    );
    const stakingTime = await nft_contract.methods.stakingTime(address).call();

    return stakingTime;
  }
}

window.wod_caws = new WOD_CAWS();

/**
 *
 * @param {"TOKEN" | "CAWS_TIMEPIECE" } key
 */
async function getContractCawsTimepieceNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class CAWS_TIMEPIECE {
  constructor(key = "CAWS_TIMEPIECE") {
    this.key = key;
    [
      "MAX_TIMEPIECE",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "cawsContract",
      "cawsUsed",
      "getApproved",
      "isApprovedForAll",
      "maxTimepieceClaim",
      "name",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.infuraWeb3.eth.Contract(
          window.CAWS_TIMEPIECE_ABI,
          window.config.caws_timepiece_address,
          {
            from: await getCoinbase(),
          }
        );

        return await contract.methods[fn_name](...args).call();
      };
    });

    ["claimTimepiece"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractCawsTimepieceNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });
  }

  async claimTimepiece(cawsArray) {
    const nft_contract = await getContractCawsTimepieceNFT("CAWS_TIMEPIECE");
    let second = await nft_contract.methods.claimTimepiece(cawsArray).send({
      from: await getCoinbase(),
    });
  }

  async calculateTimepieceBalance(address) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.caws_timepiece_address,
      {
        from: await getCoinbase(),
      }
    );

    return await nft_contract.methods.balanceOf(address).call();
  }

  async getTimepieceLatestMint() {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.caws_timepiece_address,
      {
        from: await getCoinbase(),
      }
    );
    return await nft_contract.methods.totalSupply().call();
  }

  async getCawsUsedinTimepiece(address) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.caws_timepiece_address,
      {
        from: await getCoinbase(),
      }
    );

    return await nft_contract.methods.cawsUsed(address).call();
  }

  async getCawsTimepieceURI(tokenId) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.caws_timepiece_address,
      {
        from: await getCoinbase(),
      }
    );

    return await nft_contract.methods.tokenURI(tokenId).call();
  }

  async getCawsTimepieceTokenByIndex(address, tokenId) {
    let nft_contract = new window.infuraWeb3.eth.Contract(
      window.CAWS_TIMEPIECE_ABI,
      window.config.caws_timepiece_address,
      {
        from: await getCoinbase(),
      }
    );

    return await nft_contract.methods
      .tokenOfOwnerByIndex(address, tokenId)
      .call();
  }
}

window.caws_timepiece = new CAWS_TIMEPIECE();

/**
 *
 * @param {"TOKEN" | "COINGECKO_NFT" } key
 */

async function getContractCoingeckoNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.COINGECKO_NFT_ABI,
      address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class COINGECKO_NFT {
  constructor(key = "COINGECKO_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.bscWeb3.eth.Contract(
          window.COINGECKO_NFT_ABI,
          window.config.nft_coingecko_address,
          {
            from: await getCoinbase(),
          }
        );

        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
}

window.coingecko_nft = new COINGECKO_NFT();

/**
 *
 * @param {"TOKEN" | "BASE_NFT" } key
 */

async function getContractBaseNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.BASE_NFT_ABI,
      window.config.nft_base_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class BASE_NFT {
  constructor(key = "BASE_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.baseWeb3.eth.Contract(
          window.BASE_NFT_ABI,
          window.config.nft_base_address,
          {
            from: await getCoinbase(),
          }
        );

        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintBaseNFT() {
    let nft_contract = await getContractBaseNFT("BASE_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.base_nft = new BASE_NFT();

/**
 *
 * @param {"TOKEN" | "SKALE_NFT" } key
 */

async function getContractSkaleNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.SKALE_NFT_ABI,
      window.config.nft_skale_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class SKALE_NFT {
  constructor(key = "SKALE_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.skaleWeb3.eth.Contract(
          window.SKALE_NFT_ABI,
          window.config.nft_skale_address,
          {
            from: await getCoinbase(),
          }
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintSkaleNFT() {
    let nft_contract = await getContractSkaleNFT("SKALE_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.skale_nft = new SKALE_NFT();

/**
 *
 * @param {"TOKEN" | "CORE_NFT" } key
 */

async function getContractCoreNFT(key) {
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.CORE_NFT_ABI,
      window.config.nft_core_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class CORE_NFT {
  constructor(key = "CORE_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.coreWeb3.eth.Contract(
          window.CORE_NFT_ABI,
          window.config.nft_core_address,
          {
            from: await getCoinbase(),
          }
        );

        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintCoreNFT() {
    let nft_contract = await getContractCoreNFT("CORE_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.core_nft = new CORE_NFT();
/**
 *
 * @param {"TOKEN" | "CORE_NFT" } key
 */

async function getContractBNBNFT(key) {
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.BNB_NFT_ABI,
      window.config.nft_bnb_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class BNB_NFT {
  constructor(key = "BNB_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.bscWeb3.eth.Contract(
          window.BNB_NFT_ABI,
          window.config.nft_bnb_address,
          {
            from: await getCoinbase(),
          }
        );

        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintBNBNFT() {
    let nft_contract = await getContractBNBNFT("BNB_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.bnb_nft = new BNB_NFT();

async function getContractOPBNBNFT(key) {
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.OPBNB_NFT_ABI,
      window.config.nft_opbnb_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class OPBNB_NFT {
  constructor(key = "OPBNB_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.opBnbWeb3.eth.Contract(
          window.OPBNB_NFT_ABI,
          window.config.nft_opbnb_address,
          {
            from: await getCoinbase(),
          }
        );

        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintOPBNBNFT() {
    let nft_contract = await getContractOPBNBNFT("OPBNB_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.opbnb_nft = new OPBNB_NFT();

/**
 *
 * @param {"TOKEN" | "VICTION_NFT" } key
 */

async function getContractVictionNFT(key) {
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.VICTION_NFT_ABI,
      window.config.nft_viction_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class VICTION_NFT {
  constructor(key = "VICTION_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.victionWeb3.eth.Contract(
          window.VICTION_NFT_ABI,
          window.config.nft_viction_address,
          {
            from: await getCoinbase(),
          }
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintVictionNFT() {
    let nft_contract = await getContractVictionNFT("VICTION_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.viction_nft = new VICTION_NFT();

async function getContractMantaNFT(key) {
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.MANTA_NFT_ABI,
      window.config.nft_manta_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class MANTA_NFT {
  constructor(key = "MANTA_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.mantaWeb3.eth.Contract(
          window.MANTA_NFT_ABI,
          window.config.nft_manta_address,
          {
            from: await getCoinbase(),
          }
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintMantaNFT() {
    let nft_contract = await getContractMantaNFT("MANTA_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}
window.manta_nft = new MANTA_NFT();

async function getContractTaikoNFT(key) {
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.TAIKO_NFT_ABI,
      window.config.nft_taiko_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class TAIKO_NFT {
  constructor(key = "TAIKO_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractTaikoNFT(this.key);
        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintTaikoNFT() {
    let nft_contract = await getContractTaikoNFT("TAIKO_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}
window.taiko_nft = new TAIKO_NFT();

/**
 *
 * @param {"TOKEN" | "IMMUTABLE_NFT" } key
 */

async function getContractImmutableNFT(key) {
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.IMMUTABLE_NFT_ABI,
      window.config.nft_immutable_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class IMMUTABLE_NFT {
  constructor(key = "IMMUTABLE_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.immutableWeb3.eth.Contract(
          window.IMMUTABLE_NFT_ABI,
          window.config.nft_immutable_address,
          {
            from: await getCoinbase(),
          }
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async mintImmutableNFT() {
    let nft_contract = await getContractImmutableNFT("VICTION_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.immutable_nft = new IMMUTABLE_NFT();

/**
 *
 * @param {"TOKEN" | "GATE_NFT" } key
 */

async function getContractGateNFT(key) {
  let ABI = window[key + "_ABI"];
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);
    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.GATE_NFT_ABI,
      window.config.nft_gate_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class GATE_NFT {
  constructor(key = "GATE_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "betaPassPrice",
      "costSaleIsActive",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "nextOwnerToExplicitlySet",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.bscWeb3.eth.Contract(
          window.GATE_NFT_ABI,
          window.config.nft_gate_address,
          {
            from: await getCoinbase(),
          }
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    // ["approve, costSaleState, flipSaleState, mintBetaPass, mintBetaPassCost, renounceOwnership, reserveBetaPass, safeTransferFrom, setApprovalForAll, setBaseURI, setBetaPassPrice, setProvernanceHash, setRevealTimestamp, transferFrom, withdraw "].forEach((fn_name) => {
    //   this[fn_name] = async function (...args) {
    //     let contract = await getContractCoingeckoNFT(this.key);
    //     return await contract.methods[fn_name](...args).send({
    //       from: await getCoinbase(),
    //     });
    //   };
    // });
  }
  async getGateLatestMint() {
    let nft_contract = new window.bscWeb3.eth.Contract(
      window.GATE_NFT_ABI,
      window.config.nft_gate_address,
      {
        from: await getCoinbase(),
      }
    );
    return await nft_contract.methods.totalSupply().call();
  }
}

window.gate_nft = new GATE_NFT();

/**
 *
 * @param {"TOKEN" | "CONFLUX_NFT" } key
 */

async function getContractConfluxNFT(key) {
  let address = window.config[key.toLowerCase() + "_address"];
  if (!window.cached_contracts[key]) {
    window.web3 = new Web3(window.ethereum);

    window.cached_contracts[key] = new window.web3.eth.Contract(
      window.CONFLUX_NFT_ABI,
      window.config.nft_conflux_address,
      {
        from: await getCoinbase(),
      }
    );
  }

  return window.cached_contracts[key];
}

class CONFLUX_NFT {
  constructor(key = "CONFLUX_NFT") {
    this.key = key;
    [
      "REVEAL_TIMESTAMP",
      "balanceOf",
      "baseURI",
      "ownerOf",
      "getApproved",
      "isApprovedForAll",
      "maxBetaPassPurchase",
      "name",
      "owner",
      "ownerOf",
      "saleIsActive",
      "startingIndex",
      "startingIndexBlock",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = new window.confluxWeb3.eth.Contract(
          window.CONFLUX_NFT_ABI,
          window.config.nft_conflux_address,
          {
            from: await getCoinbase(),
          }
        );
        return await contract.methods[fn_name](...args).call();
      };
    });

    ["mintBetaPass"].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContractConfluxNFT(this.key);
        return await contract.methods[fn_name](...args).send({
          from: await getCoinbase(),
        });
      };
    });
  }
  async getConfluxLatestMint() {
    let nft_contract = new window.confluxWeb3.eth.Contract(
      window.CONFLUX_NFT_ABI,
      window.config.nft_conflux_address,
      {
        from: await getCoinbase(),
      }
    );
    return await nft_contract.methods.totalSupply().call();
  }
  async mintConfluxNFT() {
    let nft_contract = await getContractConfluxNFT("CONFLUX_NFT");

    let second = nft_contract.methods
      .mintBetaPass()
      .send({ from: await getCoinbase() });
    // batch.execute()
    let result = await second;
    let sizeResult = Object.keys(result.events["Transfer"]).length;
    if (result.events["Transfer"].blockNumber > 0) sizeResult = 101;
    if (result.status == true) {
      let nftId = 0;
      if (sizeResult != 101) {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"][sizeResult - 1].raw.topics[3])
          .toString(10);
      } else {
        nftId = window.web3.utils
          .toBN(result.events["Transfer"].raw.topics[3])
          .toString(10);
      }
      return nftId;
    } else {
      throw new Error("Minting failed!");
    }
  }
}

window.conflux_nft = new CONFLUX_NFT();

window.landnft = new LANDNFT();

window.buyNFT = async (
  price,
  nft_address,
  tokenId,
  priceType,
  priceAddress
) => {
  console.log("priceType", price, nft_address, tokenId, [
    priceType,
    priceAddress,
  ]);

  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );

  const gasPrice = await window.web3.eth.getGasPrice();
  console.log("gasPrice", gasPrice);
  const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
  const increasedGwei = parseInt(currentGwei) + 1.5;
  console.log("increasedGwei", increasedGwei);

  const transactionParameters = {
    gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
  };
  console.log(getCoinbase());

  await marketplace.methods
    .buyItem(nft_address, tokenId, [priceType, priceAddress])
    .estimateGas({ from: await getCoinbase(), value: price })
    .then((gas) => {
      transactionParameters.gas = window.web3.utils.toHex(gas);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log("transactionParameters", transactionParameters);

  if (priceType === 1) {
    await marketplace.methods
      .buyItem(nft_address, tokenId, [priceType, priceAddress])
      .send({ from: await getCoinbase(), value: 0, ...transactionParameters });
  } else if (priceType === 0) {
    await marketplace.methods
      .buyItem(nft_address, tokenId, [priceType, priceAddress])
      .send({
        from: await getCoinbase(),
        value: price,
        ...transactionParameters,
      });
  }
};

window.buyNFT2 = async (
  price,
  nft_address,
  tokenId,
  priceType,
  priceAddress
) => {
  console.log("priceType", price, nft_address, tokenId, [
    priceType,
    priceAddress,
  ]);

  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );
  console.log(marketplace);
  const gasPrice = await window.web3.eth.getGasPrice();
  console.log("gasPrice", gasPrice);
  const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
  const increasedGwei = parseInt(currentGwei) + 1.5;
  console.log("increasedGwei", increasedGwei);

  const transactionParameters = {
    gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
  };
  // console.log( transactionParameters )

  await marketplace.methods
    .buyItem(nft_address, tokenId, [priceType, priceAddress])
    .estimateGas({ from: await getCoinbase(), value: price })
    .then((gas) => {
      transactionParameters.gas = window.web3.utils.toHex(gas);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log("transactionParameters", transactionParameters);

  if (priceType === 1) {
    await marketplace.methods
      .buyItem(nft_address, tokenId, [priceType, priceAddress])
      .send({ from: await getCoinbase(), value: 0, ...transactionParameters })
      .on("transactionHash", (hash) => {
        console.log(`Transaction hash: ${hash}`);
        return hash;
      });
  } else if (priceType === 0) {
    await marketplace.methods
      .buyItem(nft_address, tokenId, [priceType, priceAddress])
      .send({
        from: await getCoinbase(),
        value: price,
        ...transactionParameters,
      })
      .on("transactionHash", (hash) => {
        console.log(`Transaction hash: ${hash}`);
        return hash;
      });
  }
};

window.approveBuy = async (tokenType, amount) => {
  const contract = new window.web3.eth.Contract(
    window.DYP_ABI,
    window.config.token_dypius_new_address
  );

  const contract_old = new window.web3.eth.Contract(
    window.DYP_ABI,
    window.config.dyp_token_address
  );

  console.log("amount", amount);
  console.log(
    "window.config.nft_marketplace_address",
    window.config.nft_marketplace_address
  );

  if (tokenType === "dypv2") {
    await contract.methods
      .approve(window.config.nft_marketplace_address, amount)
      .send({ from: await getCoinbase() });
  } else if (tokenType === "dypv1") {
    await contract_old.methods
      .approve(window.config.nft_marketplace_address, amount)
      .send({ from: await getCoinbase() });
  }
};

window.isApprovedBuy = async (tokenType, amount) => {
  window.web3 = new Web3(window.ethereum);
  const contract_old = new window.web3.eth.Contract(
    window.DYP_ABI,
    window.config.dyp_token_address
  );

  const contract = new window.web3.eth.Contract(
    window.DYP_ABI,
    window.config.token_dypius_new_address
  );

  const coinbase = await getCoinbase();

  if (tokenType === "dypv2") {
    const allowance = await contract.methods
      .allowance(coinbase, window.config.nft_marketplace_address)
      .call({ from: await getCoinbase() });
    return Number(allowance) >= Number(amount);
  } else if (tokenType === "dypv1") {
    const allowance = await contract_old.methods
      .allowance(coinbase, window.config.nft_marketplace_address)
      .call({ from: await getCoinbase() });
    return Number(allowance) >= Number(amount);
  } else if (tokenType === "eth") {
    return true;
  }

  // console.log(
  //   Number(allowance) >= Number(amount),
  //   Number(allowance),
  //   Number(amount)
  // );
};

window.isApprovedNFT = async (token, type, address) => {
  if (type === "timepiece") {
    window.web3 = new Web3(window.config.infura_endpoint);
    let contract = new window.web3.eth.Contract(
      window.TIMEPIECE_ABI,
      window.config.nft_timepiece_address
    );

    let approved = await contract.methods.getApproved(token).call();

    let approvedAll = await contract.methods
      .isApprovedForAll(address, window.config.nft_marketplace_address)
      .call();

    console.log(approvedAll, "approvedAll");
    approved = approved.toLowerCase();

    if (approved === window.config.nft_marketplace_address || approvedAll) {
      return true;
    } else return false;
  } else if (type === "land") {
    window.web3 = new Web3(window.config.infura_endpoint);
    let contract = new window.web3.eth.Contract(
      window.WOD_ABI,
      window.config.nft_land_address
    );

    let approved = await contract.methods.getApproved(token).call();
    let approvedAll = await contract.methods
      .isApprovedForAll(address, window.config.nft_marketplace_address)
      .call();

    approved = approved.toLowerCase();
    if (approved === window.config.nft_marketplace_address || approvedAll) {
      return true;
    } else return false;
  } else {
    window.web3 = new Web3(window.config.infura_endpoint);
    let contract = new window.web3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );

    let approved = await contract.methods.getApproved(token).call();
    let approvedAll = await contract.methods
      .isApprovedForAll(address, window.config.nft_marketplace_address)
      .call();

    approved = approved.toLowerCase();

    if (approved === window.config.nft_marketplace_address || approvedAll) {
      return true;
    } else return false;
  }
};

window.approveNFT = async (type) => {
  const coinbase = await getCoinbase();
  window.web3 = new Web3(window.ethereum);
  if (type === "timepiece") {
    let contract = new window.web3.eth.Contract(
      window.TIMEPIECE_ABI,
      window.config.nft_timepiece_address
    );

    await contract.methods
      .setApprovalForAll(window.config.nft_marketplace_address, true)
      .send({ from: coinbase });
  } else if (type === "land") {
    console.log("land");
    let contract = new window.web3.eth.Contract(
      window.WOD_ABI,
      window.config.nft_land_address
    );

    await contract.methods
      .setApprovalForAll(window.config.nft_marketplace_address, true)
      .send({ from: coinbase });
  } else {
    let contract = new window.web3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );
    await contract.methods
      .setApprovalForAll(window.config.nft_marketplace_address, true)
      .send({ from: coinbase });
  }
};

window.cancelListNFT = async (nftAddress, tokenId, priceType, tokenType) => {
  let price_address;
  const coinbase = await getCoinbase();
  window.web3 = new Web3(window.ethereum);

  if (priceType === 0) {
    price_address = "0x0000000000000000000000000000000000000000";
  }

  if (priceType === 1) {
    price_address =
      tokenType === "dypv2"
        ? window.config.token_dypius_new_address
        : window.config.dyp_token_address;
  }

  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );

  await marketplace.methods
    .cancelListing(nftAddress, tokenId, [priceType, price_address])
    .send({ from: coinbase });
};

window.updateListingNFT = async (token, price, priceType, type, tokenType) => {
  let nft_address, price_nft, price_address;
  window.web3 = new Web3(window.ethereum);
  if (type === "timepiece") {
    nft_address = window.config.nft_timepiece_address;
  } else if (type === "land") {
    nft_address = window.config.nft_land_address;
  } else {
    nft_address = window.config.nft_caws_address;
  }

  if (priceType === 0) {
    price_nft = 0;
    price_address = "0x0000000000000000000000000000000000000000";
  }

  if (priceType === 1) {
    price_nft = 1;
    price_address =
      tokenType === "dypv2"
        ? window.config.token_dypius_new_address
        : window.config.dyp_token_address;
  }

  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );
  const coinbase = await getCoinbase();

  console.log(nft_address, token, price, [price_nft, price_address]);

  await marketplace.methods
    .updateListing(nft_address, token, price, [price_nft, price_address])
    .send({ from: coinbase });
};

window.listNFT = async (token, price, priceType, type = "", tokenType) => {
  let nft_address, price_nft, price_address;
  console.log(token, price, priceType, type, tokenType);
  window.web3 = new Web3(window.ethereum);
  if (type === "timepiece") {
    nft_address = window.config.nft_timepiece_address;
  } else if (type === "land") {
    nft_address = window.config.nft_land_address;
  } else {
    nft_address = window.config.nft_caws_address;
  }

  if (priceType === 0) {
    price_nft = 0;
    price_address = "0x0000000000000000000000000000000000000000";
  }

  if (priceType === 1) {
    price_nft = 1;
    price_address =
      tokenType === "dypv2"
        ? window.config.token_dypius_new_address
        : window.config.dyp_token_address;
  }

  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );
  const coinbase = await getCoinbase();

  const gasPrice = await window.web3.eth.getGasPrice();
  const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
  const increasedGwei = parseInt(currentGwei) + 1.5;

  const transactionParameters = {
    gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
  };

  await marketplace.methods
    .listItem(nft_address, token, price, [price_nft, price_address])
    .estimateGas({ from: await getCoinbase() })
    .then((gas) => {
      transactionParameters.gas = window.web3.utils.toHex(gas);
    })
    .catch(function (error) {
      console.log(error);
    });

  await marketplace.methods
    .listItem(nft_address, token, price, [price_nft, price_address])
    .send({ from: coinbase, ...transactionParameters });
};

window.isApproved = async (token, type) => {
  window.web3 = new Web3(window.ethereum);
  if (type === "timepiece") {
    let contract = new window.web3.eth.Contract(
      window.TIMEPIECE_ABI,
      window.config.nft_timepiece_address
    );

    let approved = await contract.methods.getApproved(token).call();

    approved = approved.toLowerCase();

    return approved === window.config.nft_marketplace_address.toLowerCase();
  } else if (type === "land") {
    let contract = new window.web3.eth.Contract(
      window.WOD_ABI,
      window.config.nft_land_address
    );

    let approved = await contract.methods.getApproved(token).call();

    approved = approved.toLowerCase();

    return approved === window.config.nft_marketplace_address.toLowerCase();
  } else {
    let contract = new window.web3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );
    let approved = await contract.methods.getApproved(token).call();

    approved = approved.toLowerCase();

    return approved === window.config.nft_marketplace_address.toLowerCase();
  }
};

window.makeOffer = async (nftAddress, tokenId, price, priceType, tokenType) => {
  let price_address;
  window.web3 = new Web3(window.ethereum);
  if (priceType === 0) {
    price_address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  }

  if (priceType === 1) {
    price_address =
      tokenType === "dypv2"
        ? window.config.token_dypius_new_address
        : window.config.dyp_token_address;
  }

  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );

  const gasPrice = await window.web3.eth.getGasPrice();
  const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
  const increasedGwei = parseInt(currentGwei) + 1.5;

  const transactionParameters = {
    gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
  };

  await marketplace.methods
    .makeOffer(nftAddress, tokenId, price, [priceType, price_address])
    .estimateGas({ from: await getCoinbase() })
    .then((gas) => {
      transactionParameters.gas = window.web3.utils.toHex(gas);
    })
    .catch(function (error) {
      console.log(error);
    });

  await marketplace.methods
    .makeOffer(nftAddress, tokenId, price, [priceType, price_address])
    .send({ from: await getCoinbase(), ...transactionParameters });
};

window.cancelOffer = async (nftAddress, tokenId, offerIndex) => {
  window.web3 = new Web3(window.ethereum);
  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );

  const gasPrice = await window.web3.eth.getGasPrice();
  const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
  const increasedGwei = parseInt(currentGwei) + 1.5;

  const transactionParameters = {
    gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
  };

  await marketplace.methods
    .cancelOffer(nftAddress, tokenId, offerIndex)
    .estimateGas({ from: await getCoinbase() })
    .then((gas) => {
      transactionParameters.gas = window.web3.utils.toHex(gas);
    })
    .catch(function (error) {
      console.log(error);
    });

  await marketplace.methods
    .cancelOffer(nftAddress, tokenId, offerIndex)
    .send({ from: await getCoinbase(), ...transactionParameters });
};

window.updateOffer = async (
  nftAddress,
  tokenId,
  offerIndex,
  newPrice,
  priceType,
  tokenType
) => {
  let price_address;
  window.web3 = new Web3(window.ethereum);
  if (priceType === 0) {
    price_address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  }

  if (priceType === 1) {
    price_address =
      tokenType === "dypv2"
        ? window.config.token_dypius_new_address
        : window.config.dyp_token_address;
  }

  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );

  const gasPrice = await window.web3.eth.getGasPrice();
  const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
  const increasedGwei = parseInt(currentGwei) + 1.5;

  const transactionParameters = {
    gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
  };

  await marketplace.methods
    .updateOffer(nftAddress, tokenId, offerIndex, newPrice, [
      priceType,
      price_address,
    ])
    .estimateGas({ from: await getCoinbase() })
    .then((gas) => {
      transactionParameters.gas = window.web3.utils.toHex(gas);
    })
    .catch(function (error) {
      console.log(error);
    });

  await marketplace.methods
    .updateOffer(nftAddress, tokenId, offerIndex, newPrice, [
      priceType,
      price_address,
    ])
    .send({ from: await getCoinbase(), ...transactionParameters });
};

window.approveOffer = async (amount, priceType, tokenType) => {
  console.log(amount, priceType, tokenType);
  const web3 = new Web3(window.ethereum);
  if (priceType === 1) {
    const contract = new web3.eth.Contract(
      window.DYP_ABI,
      tokenType === "dypv2"
        ? window.config.token_dypius_new_address
        : window.config.dyp_token_address
    );

    console.log("amount", amount);
    console.log(
      "window.config.nft_marketplace_address",
      window.config.nft_marketplace_address
    );

    await contract.methods
      .approve(window.config.nft_marketplace_address, amount)
      .send({ from: await getCoinbase() });
  } else if (priceType === 0) {
    const contract = new window.web3.eth.Contract(
      window.TOKEN_ABI,
      window.config.weth2_address
    );

    console.log("amount", amount);
    console.log(
      "window.config.nft_marketplace_address",
      window.config.nft_marketplace_address
    );

    await contract.methods
      .approve(window.config.nft_marketplace_address, amount)
      .send({ from: await getCoinbase() });
  }
};

window.acceptOffer = async (nftAddress, tokenId, offerIndex) => {
  window.web3 = new Web3(window.ethereum);
  const marketplace = new window.web3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );

  const gasPrice = await window.web3.eth.getGasPrice();
  const currentGwei = window.web3.utils.fromWei(gasPrice, "gwei");
  const increasedGwei = parseInt(currentGwei) + 1.5;

  const transactionParameters = {
    gasPrice: window.web3.utils.toWei(increasedGwei.toString(), "gwei"),
  };

  await marketplace.methods;
  acceptOffer(nftAddress, tokenId, offerIndex)
    .estimateGas({ from: await getCoinbase() })
    .then((gas) => {
      transactionParameters.gas = window.web3.utils.toHex(gas);
    })
    .catch(function (error) {
      console.log(error);
    });

  await marketplace.methods
    .acceptOffer(nftAddress, tokenId, offerIndex)
    .send({ from: await getCoinbase(), ...transactionParameters });
};

window.isApprovedOffer = async (amount, priceType, tokenType) => {
  window.web3 = new Web3(window.config.infura_endpoint);
  console.log(amount, priceType, tokenType);
  if (priceType === 1) {
    const contract = new window.web3.eth.Contract(
      window.DYP_ABI,
      tokenType === "dypv2"
        ? window.config.token_dypius_new_address
        : window.config.dyp_token_address
    );

    const coinbase = await getCoinbase();

    const allowance = await contract.methods
      .allowance(coinbase, window.config.nft_marketplace_address)
      .call({ from: await getCoinbase() });
    console.log(
      "appr makeoffer",
      Number(allowance) >= Number(amount),
      Number(allowance),
      Number(amount)
    );

    return Number(allowance) >= Number(amount);
  } else if (priceType === 0) {
    const contract = new window.web3.eth.Contract(
      window.TOKEN_ABI,
      window.config.weth2_address
    );

    const coinbase = await getCoinbase();

    const allowance = await contract.methods
      .allowance(coinbase, window.config.nft_marketplace_address)
      .call({ from: await getCoinbase() });
    console.log(
      Number(allowance) >= Number(amount),
      Number(allowance),
      Number(amount)
    );

    return Number(allowance) >= Number(amount);
  }
};

window.getAllOffers = async (nftAddress, tokenId) => {
  //getActiveOffers
  window.web3 = new Web3(window.ethereum);
  const marketplace = new window.infuraWeb3.eth.Contract(
    window.MARKETPLACE_ABI,
    window.config.nft_marketplace_address
  );

  const result = await marketplace.methods
    .getActiveOffers(nftAddress, tokenId)
    .call();

  return result;
};

//mint

async function latestMint() {
  return await window.$.get("https://mint.dyp.finance/api/v1/latest/mint").then(
    (result) => {
      return parseInt(result.total);
    }
  );
}

function range(start, end, step = 1) {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
}

async function getNft(id) {
  return await window.$.get(`https://mint.dyp.finance/metadata/${id}`).then(
    (result) => {
      return result;
    }
  );
}

async function getLandNft(id) {
  return await window.$.get(
    `https://mint.worldofdypians.com/metadata/${id}`
  ).then((result) => {
    return result;
  });
}

async function getTimepieceNft(id) {
  return await window.$.get(
    `https://timepiece.worldofdypians.com/metadata/${id}`
  ).then((result) => {
    return result;
  });
}

async function getMyNFTs(address, type = "") {
  let contract;
  const infuraweb3 = window.infuraWeb3;
  // window.web3 = new Web3(window.ethereum);
  if (type === "timepiece") {
    contract = await new infuraweb3.eth.Contract(
      window.TIMEPIECE_ABI,
      window.config.nft_timepiece_address
    );
    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "land") {
    contract = await new infuraweb3.eth.Contract(
      window.WOD_ABI,
      window.config.nft_land_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "landbnb") {
    contract = new window.bscWeb3.eth.Contract(
      window.LAND_CCIP_ABI,
      window.config.nft_land_bnb_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "landavax") {
    contract = new window.avaxWeb3.eth.Contract(
      window.LAND_CCIP_ABI,
      window.config.nft_land_avax_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "landbase") {
    contract = new window.baseWeb3.eth.Contract(
      window.LAND_CCIP_ABI,
      window.config.nft_land_base_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "coingecko") {
    contract = new window.bscWeb3.eth.Contract(
      window.COINGECKO_NFT_ABI,
      window.config.nft_coingecko_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "doge") {
    contract = new window.bscWeb3.eth.Contract(
      window.DOGE_NFT_ABI,
      window.config.nft_doge_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "cmc") {
    contract = new window.bscWeb3.eth.Contract(
      window.CMC_NFT_ABI,
      window.config.nft_cmc_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "bnb") {
    contract = new window.bscWeb3.eth.Contract(
      window.BNB_NFT_ABI,
      window.config.nft_bnb_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "cookie3") {
    contract = new window.bscWeb3.eth.Contract(
      window.COOKIE3_NFT_ABI,
      window.config.nft_cookie3_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "opbnb") {
    contract = new window.opBnbWeb3.eth.Contract(
      window.OPBNB_NFT_ABI,
      window.config.nft_opbnb_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "skale") {
    contract = new window.skaleWeb3.eth.Contract(
      window.SKALE_NFT_ABI,
      window.config.nft_skale_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "base") {
    contract = new window.baseWeb3.eth.Contract(
      window.BASE_NFT_ABI,
      window.config.nft_base_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "gate") {
    contract = new window.bscWeb3.eth.Contract(
      window.GATE_NFT_ABI,
      window.config.nft_gate_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "conflux") {
    contract = new window.confluxWeb3.eth.Contract(
      window.CONFLUX_NFT_ABI,
      window.config.nft_conflux_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "caws") {
    contract = await new infuraweb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_caws_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "cawsbnb") {
    contract = new window.bscWeb3.eth.Contract(
      window.CAWS_CCIP_ABI,
      window.config.nft_caws_bnb_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "cawsavax") {
    contract = new window.avaxWeb3.eth.Contract(
      window.CAWS_CCIP_ABI,
      window.config.nft_caws_avax_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "cawsbase") {
    contract = new window.baseWeb3.eth.Contract(
      window.CAWS_CCIP_ABI,
      window.config.nft_caws_base_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "core") {
    contract = new window.coreWeb3.eth.Contract(
      window.CORE_NFT_ABI,
      window.config.nft_core_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "viction") {
    contract = new window.victionWeb3.eth.Contract(
      window.VICTION_NFT_ABI,
      window.config.nft_viction_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "immutable") {
    contract = new window.immutableWeb3.eth.Contract(
      window.IMMUTABLE_NFT_ABI,
      window.config.nft_immutable_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    // const tokens = await Promise.all(
    //   range(0, balance - 1).map((i) =>
    //     contract.methods.tokenOfOwnerByIndex(address, i).call()
    //   )
    // );

    return balance;
  } else if (type === "multivers") {
    contract = new window.bscWeb3.eth.Contract(
      window.MULTIVERS_NFT_ABI,
      window.config.nft_multivers_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "manta") {
    contract = new window.mantaWeb3.eth.Contract(
      window.MANTA_NFT_ABI,
      window.config.nft_manta_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  } else if (type === "taiko") {
    contract = new window.taikoWeb3.eth.Contract(
      window.TAIKO_NFT_ABI,
      window.config.nft_taiko_address
    );

    const balance = await contract.methods.balanceOf(address).call();

    const tokens = await Promise.all(
      range(0, balance - 1).map((i) =>
        contract.methods.tokenOfOwnerByIndex(address, i).call()
      )
    );

    return tokens;
  }
}

async function myNftListContract(address) {
  let nft_contract = new window.infuraWeb3.eth.Contract(
    window.CAWS_ABI,
    window.config.nft_caws_address,
    {
      from: await getCoinbase(),
    }
  );

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];
  if (getBalanceOf && getBalanceOf > 0) {
    for (let i = 0; i < getBalanceOf; i++)
      nftList.push(
        await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
      );

    return nftList;
  } else return [];
}

async function myNftListContractCCIP(address, nftAddress) {
  window.web3 = new Web3(window.ethereum);
  let nft_contract = new window.web3.eth.Contract(
    window.CAWS_CCIP_ABI,
    nftAddress
  );

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftListContractCCIPBase(address, nftAddress) {
  baseweb3 = window.baseWeb3;
  let nft_contract = new baseweb3.eth.Contract(
    window.CAWS_CCIP_ABI,
    nftAddress
  );

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftLandListContract(address) {
  let nft_contract = new window.infuraWeb3.eth.Contract(
    window.LANDMINTING_ABI,
    window.config.landnft_address,
    {
      from: await getCoinbase(),
    }
  );

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftLandListContractCCIP(address, nftAddress) {
  let nft_contract = new window.bscWeb3.eth.Contract(
    window.LAND_CCIP_ABI,
    nftAddress
  );

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftLandListContractCCIPAvax(address, nftAddress) {
  let nft_contract = new window.avaxWeb3.eth.Contract(
    window.LAND_CCIP_ABI,
    nftAddress
  );

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftLandListContractCCIPBase(address, nftAddress) {
  baseweb3 = window.baseWeb3;
  let nft_contract = new baseweb3.eth.Contract(
    window.LAND_CCIP_ABI,
    nftAddress
  );

  let getBalanceOf = await nft_contract.methods.balanceOf(address).call();

  let nftList = [];

  for (let i = 0; i < getBalanceOf; i++)
    nftList.push(
      await nft_contract.methods.tokenOfOwnerByIndex(address, i).call()
    );

  return nftList;
}

async function myNftList(address) {
  return await window.$.get(
    `https://mint.dyp.finance/api/v1/my/${address}`
  ).then((result) => {
    return result;
  });
}

window.NFT_DYPIUS_PREMIUM_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.NFT_DYPIUS_PREMIUM_VICTION_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.NFT_DYPIUS_PREMIUM_TAIKO_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CAWSPREMIUM_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingDestinationAddress",
        type: "address",
      },
      { internalType: "uint256", name: "_rate", type: "uint256" },
      { internalType: "uint256", name: "_expiration", type: "uint256" },
      { internalType: "address", name: "_erc20Address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
    ],
    name: "ExpirationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLockTime",
        type: "uint256",
      },
    ],
    name: "LockTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_DEPOSIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_POOL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "_depositBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "calculateRewards",
    outputs: [
      { internalType: "uint256[]", name: "rewards", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Address",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_expiration", type: "uint256" }],
    name: "setExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockTime", type: "uint256" }],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_maxDeposit", type: "uint256" }],
    name: "setMaxDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_maxPool", type: "uint256" }],
    name: "setPoolCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rate", type: "uint256" }],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingDestinationAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LANDPREMIUM_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingDestinationAddress",
        type: "address",
      },
      { internalType: "uint256", name: "_rate", type: "uint256" },
      { internalType: "uint256", name: "_expiration", type: "uint256" },
      { internalType: "address", name: "_erc20Address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
    ],
    name: "ExpirationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLockTime",
        type: "uint256",
      },
    ],
    name: "LockTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_POOL",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "_depositBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "calculateRewards",
    outputs: [
      { internalType: "uint256[]", name: "rewards", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Address",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_expiration", type: "uint256" }],
    name: "setExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockTime", type: "uint256" }],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_maxPool", type: "uint256" }],
    name: "setPoolCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rate", type: "uint256" }],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingDestinationAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CCIP_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        internalType: "address",
        name: "link",
        type: "address",
      },
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "FailedToWithdrawEth",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "CCIPTransferCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "CCIPTransferFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "CCIPTransferInitiated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "enum BASEBridgeWOD.PayFeesIn",
        name: "payFeesIn",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "tokenIdToLock",
        type: "uint256",
      },
    ],
    name: "BridgeNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "S_router",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allowedSenders",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newLink",
        type: "address",
      },
    ],
    name: "changeLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftAddress",
        type: "address",
      },
    ],
    name: "changeNFTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newRouter",
        type: "address",
      },
    ],
    name: "changeRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_link",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nft",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_allowedSenders",
        type: "address[]",
      },
    ],
    name: "setAllowedSenders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "setRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "transferAnyNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

window.CCIP_ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "wrappedNative",
        type: "address",
      },
      {
        internalType: "address",
        name: "armProxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BadARMSignal",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedToSendValue",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientFeeTokenAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMsgValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "InvalidRecipientAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "OffRampMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyOffRamp",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destChainSelector",
        type: "uint64",
      },
    ],
    name: "UnsupportedDestinationChain",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "sourceChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "offRamp",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "calldataHash",
        type: "bytes32",
      },
    ],
    name: "MessageExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "sourceChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "offRamp",
        type: "address",
      },
    ],
    name: "OffRampAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "sourceChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "offRamp",
        type: "address",
      },
    ],
    name: "OffRampRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "destChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "onRamp",
        type: "address",
      },
    ],
    name: "OnRampSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_RET_BYTES",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "destChainSelector",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "onRamp",
            type: "address",
          },
        ],
        internalType: "struct Router.OnRamp[]",
        name: "onRampUpdates",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "offRamp",
            type: "address",
          },
        ],
        internalType: "struct Router.OffRamp[]",
        name: "offRampRemoves",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "offRamp",
            type: "address",
          },
        ],
        internalType: "struct Router.OffRamp[]",
        name: "offRampAdds",
        type: "tuple[]",
      },
    ],
    name: "applyRampUpdates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "receiver",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "tokenAmounts",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "extraArgs",
            type: "bytes",
          },
        ],
        internalType: "struct Client.EVM2AnyMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipSend",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getArmProxy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "receiver",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "tokenAmounts",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "extraArgs",
            type: "bytes",
          },
        ],
        internalType: "struct Client.EVM2AnyMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "getFee",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOffRamps",
    outputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "offRamp",
            type: "address",
          },
        ],
        internalType: "struct Router.OffRamp[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destChainSelector",
        type: "uint64",
      },
    ],
    name: "getOnRamp",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "chainSelector",
        type: "uint64",
      },
    ],
    name: "getSupportedTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWrappedNative",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "chainSelector",
        type: "uint64",
      },
    ],
    name: "isChainSupported",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "offRamp",
        type: "address",
      },
    ],
    name: "isOffRamp",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "recoverTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
      {
        internalType: "uint16",
        name: "gasForCallExactCheck",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "routeMessage",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "retData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "wrappedNative",
        type: "address",
      },
    ],
    name: "setWrappedNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "typeAndVersion",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

window.CCIP_ONRAMP_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "linkToken",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "chainSelector",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "destChainSelector",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "defaultTxGasLimit",
            type: "uint64",
          },
          {
            internalType: "uint96",
            name: "maxNopFeesJuels",
            type: "uint96",
          },
          {
            internalType: "address",
            name: "prevOnRamp",
            type: "address",
          },
          {
            internalType: "address",
            name: "armProxy",
            type: "address",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.StaticConfig",
        name: "staticConfig",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "maxTokensLength",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "priceRegistry",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "maxDataSize",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "maxGasLimit",
            type: "uint64",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.DynamicConfig",
        name: "dynamicConfig",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
        ],
        internalType: "struct Internal.PoolUpdate[]",
        name: "tokensAndPools",
        type: "tuple[]",
      },
      {
        internalType: "address[]",
        name: "allowlist",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "capacity",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "rate",
            type: "uint128",
          },
        ],
        internalType: "struct RateLimiter.Config",
        name: "rateLimiterConfig",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "gasMultiplier",
            type: "uint64",
          },
          {
            internalType: "uint96",
            name: "networkFeeAmountUSD",
            type: "uint96",
          },
          {
            internalType: "uint32",
            name: "destGasOverhead",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "destGasPerPayloadByte",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.FeeTokenConfigArgs[]",
        name: "feeTokenConfigs",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "minFee",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxFee",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "ratio",
            type: "uint16",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.TokenTransferFeeConfigArgs[]",
        name: "tokenTransferFeeConfigArgs",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "nop",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "weight",
            type: "uint16",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.NopAndWeight[]",
        name: "nopsAndWeights",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "capacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requested",
        type: "uint256",
      },
    ],
    name: "AggregateValueMaxCapacityExceeded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minWaitInSeconds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "available",
        type: "uint256",
      },
    ],
    name: "AggregateValueRateLimitReached",
    type: "error",
  },
  {
    inputs: [],
    name: "BadARMSignal",
    type: "error",
  },
  {
    inputs: [],
    name: "BucketOverfilled",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedAddress",
        type: "bytes",
      },
    ],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidConfig",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidExtraArgsTag",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nop",
        type: "address",
      },
    ],
    name: "InvalidNopAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTokenPoolConfig",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidWithdrawParams",
    type: "error",
  },
  {
    inputs: [],
    name: "LinkBalanceNotSettled",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxFeeBalanceReached",
    type: "error",
  },
  {
    inputs: [],
    name: "MessageGasLimitTooHigh",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxSize",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "actualSize",
        type: "uint256",
      },
    ],
    name: "MessageTooLarge",
    type: "error",
  },
  {
    inputs: [],
    name: "MustBeCalledByRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "NoFeesToPay",
    type: "error",
  },
  {
    inputs: [],
    name: "NoNopsToPay",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "NotAFeeToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyCallableByAdminOrOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyCallableByOwnerOrAdmin",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyCallableByOwnerOrAdminOrNop",
    type: "error",
  },
  {
    inputs: [],
    name: "PoolAlreadyAdded",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "PoolDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "PriceNotFoundForToken",
    type: "error",
  },
  {
    inputs: [],
    name: "RouterMustSetOriginalSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "SenderNotAllowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "capacity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requested",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "TokenMaxCapacityExceeded",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenPoolMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minWaitInSeconds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "available",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "TokenRateLimitReached",
    type: "error",
  },
  {
    inputs: [],
    name: "TooManyNops",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsupportedNumberOfTokens",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "UnsupportedToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "AllowListAdd",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "AllowListEnabledSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "AllowListRemove",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "sequenceNumber",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "feeTokenAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "nonce",
            type: "uint64",
          },
          {
            internalType: "uint256",
            name: "gasLimit",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "strict",
            type: "bool",
          },
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "tokenAmounts",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
        ],
        indexed: false,
        internalType: "struct Internal.EVM2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "CCIPSendRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "linkToken",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "chainSelector",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "destChainSelector",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "defaultTxGasLimit",
            type: "uint64",
          },
          {
            internalType: "uint96",
            name: "maxNopFeesJuels",
            type: "uint96",
          },
          {
            internalType: "address",
            name: "prevOnRamp",
            type: "address",
          },
          {
            internalType: "address",
            name: "armProxy",
            type: "address",
          },
        ],
        indexed: false,
        internalType: "struct EVM2EVMOnRamp.StaticConfig",
        name: "staticConfig",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "maxTokensLength",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "priceRegistry",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "maxDataSize",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "maxGasLimit",
            type: "uint64",
          },
        ],
        indexed: false,
        internalType: "struct EVM2EVMOnRamp.DynamicConfig",
        name: "dynamicConfig",
        type: "tuple",
      },
    ],
    name: "ConfigSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "gasMultiplier",
            type: "uint64",
          },
          {
            internalType: "uint96",
            name: "networkFeeAmountUSD",
            type: "uint96",
          },
          {
            internalType: "uint32",
            name: "destGasOverhead",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "destGasPerPayloadByte",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct EVM2EVMOnRamp.FeeTokenConfigArgs[]",
        name: "feeConfig",
        type: "tuple[]",
      },
    ],
    name: "FeeConfigSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nop",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "NopPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nopWeightsTotal",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "nop",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "weight",
            type: "uint16",
          },
        ],
        indexed: false,
        internalType: "struct EVM2EVMOnRamp.NopAndWeight[]",
        name: "nopsAndWeights",
        type: "tuple[]",
      },
    ],
    name: "NopsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "minFee",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxFee",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "ratio",
            type: "uint16",
          },
        ],
        indexed: false,
        internalType: "struct EVM2EVMOnRamp.TokenTransferFeeConfigArgs[]",
        name: "transferFeeConfig",
        type: "tuple[]",
      },
    ],
    name: "TokenTransferFeeConfigSet",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "removes",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "adds",
        type: "address[]",
      },
    ],
    name: "applyAllowListUpdates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
        ],
        internalType: "struct Internal.PoolUpdate[]",
        name: "removes",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
        ],
        internalType: "struct Internal.PoolUpdate[]",
        name: "adds",
        type: "tuple[]",
      },
    ],
    name: "applyPoolUpdates",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentRateLimiterState",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "tokens",
            type: "uint128",
          },
          {
            internalType: "uint32",
            name: "lastUpdated",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "capacity",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "rate",
            type: "uint128",
          },
        ],
        internalType: "struct RateLimiter.TokenBucket",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "receiver",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "tokenAmounts",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "extraArgs",
            type: "bytes",
          },
        ],
        internalType: "struct Client.EVM2AnyMessage",
        name: "message",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "feeTokenAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "originalSender",
        type: "address",
      },
    ],
    name: "forwardFromRouter",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllowList",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllowListEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDynamicConfig",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "maxTokensLength",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "priceRegistry",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "maxDataSize",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "maxGasLimit",
            type: "uint64",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.DynamicConfig",
        name: "dynamicConfig",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getExpectedNextSequenceNumber",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "receiver",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "tokenAmounts",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "extraArgs",
            type: "bytes",
          },
        ],
        internalType: "struct Client.EVM2AnyMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "getFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getFeeTokenConfig",
    outputs: [
      {
        components: [
          {
            internalType: "uint96",
            name: "networkFeeAmountUSD",
            type: "uint96",
          },
          {
            internalType: "uint64",
            name: "gasMultiplier",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "destGasOverhead",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "destGasPerPayloadByte",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.FeeTokenConfig",
        name: "feeTokenConfig",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNopFeesJuels",
    outputs: [
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNops",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "nop",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "weight",
            type: "uint16",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.NopAndWeight[]",
        name: "nopsAndWeights",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "weightsTotal",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "sourceToken",
        type: "address",
      },
    ],
    name: "getPoolBySourceToken",
    outputs: [
      {
        internalType: "contract IPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "getSenderNonce",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStaticConfig",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "linkToken",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "chainSelector",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "destChainSelector",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "defaultTxGasLimit",
            type: "uint64",
          },
          {
            internalType: "uint96",
            name: "maxNopFeesJuels",
            type: "uint96",
          },
          {
            internalType: "address",
            name: "prevOnRamp",
            type: "address",
          },
          {
            internalType: "address",
            name: "armProxy",
            type: "address",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.StaticConfig",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSupportedTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenLimitAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getTokenTransferFeeConfig",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "minFee",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxFee",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "ratio",
            type: "uint16",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.TokenTransferFeeConfig",
        name: "tokenTransferFeeConfig",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "linkAvailableForPayment",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payNops",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setAllowListEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "router",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "maxTokensLength",
            type: "uint16",
          },
          {
            internalType: "address",
            name: "priceRegistry",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "maxDataSize",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "maxGasLimit",
            type: "uint64",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.DynamicConfig",
        name: "dynamicConfig",
        type: "tuple",
      },
    ],
    name: "setDynamicConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "gasMultiplier",
            type: "uint64",
          },
          {
            internalType: "uint96",
            name: "networkFeeAmountUSD",
            type: "uint96",
          },
          {
            internalType: "uint32",
            name: "destGasOverhead",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "destGasPerPayloadByte",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "enabled",
            type: "bool",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.FeeTokenConfigArgs[]",
        name: "feeTokenConfigArgs",
        type: "tuple[]",
      },
    ],
    name: "setFeeTokenConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "nop",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "weight",
            type: "uint16",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.NopAndWeight[]",
        name: "nopsAndWeights",
        type: "tuple[]",
      },
    ],
    name: "setNops",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "isEnabled",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "capacity",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "rate",
            type: "uint128",
          },
        ],
        internalType: "struct RateLimiter.Config",
        name: "config",
        type: "tuple",
      },
    ],
    name: "setRateLimiterConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "minFee",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxFee",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "ratio",
            type: "uint16",
          },
        ],
        internalType: "struct EVM2EVMOnRamp.TokenTransferFeeConfigArgs[]",
        name: "tokenTransferFeeConfigArgs",
        type: "tuple[]",
      },
    ],
    name: "setTokenTransferFeeConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "typeAndVersion",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "withdrawNonLinkFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DAILY_BONUS_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "initialPremiumUsers",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "PremiumChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserRemoved",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "addPremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isPremiumUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimeChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimePremiumChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "openPremiumChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "premiumUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "removePremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DAILY_BONUS_BNB_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "initialPremiumUsers",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "PremiumChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserRemoved",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "addPremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isPremiumUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimeChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimePremiumChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "openPremiumChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "premiumUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "removePremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DAILY_BONUS_SKALE_ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      {
        type: "address[]",
        name: "initialPremiumUsers",
        internalType: "address[]",
      },
    ],
  },
  {
    type: "event",
    name: "ChestOpened",
    inputs: [
      { type: "address", name: "user", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "timestamp",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PremiumChestOpened",
    inputs: [
      { type: "address", name: "user", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "timestamp",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PremiumUserAdded",
    inputs: [
      {
        type: "address",
        name: "user",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PremiumUserRemoved",
    inputs: [
      {
        type: "address",
        name: "user",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addPremiumUser",
    inputs: [{ type: "address", name: "user", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isPremiumUser",
    inputs: [{ type: "address", name: "user", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "lifetimeChestCount",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "lifetimePremiumChestCount",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "openChest",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "openPremiumChest",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "premiumUsers",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removePremiumUser",
    inputs: [{ type: "address", name: "user", internalType: "address" }],
  },
];

window.DAILY_BONUS_CORE_ABI = [
  {
    inputs: [
      {
        name: "initialPremiumUsers",
        internalType: "address[]",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      { indexed: true, name: "user", internalType: "address", type: "address" },
      {
        indexed: false,
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "ChestOpened",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: true,
        name: "previousOwner",
        internalType: "address",
        type: "address",
      },
      {
        indexed: true,
        name: "newOwner",
        internalType: "address",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      { indexed: true, name: "user", internalType: "address", type: "address" },
      {
        indexed: false,
        name: "timestamp",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "PremiumChestOpened",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
    ],
    name: "PremiumUserAdded",
    anonymous: false,
    type: "event",
  },
  {
    inputs: [
      {
        indexed: false,
        name: "user",
        internalType: "address",
        type: "address",
      },
    ],
    name: "PremiumUserRemoved",
    anonymous: false,
    type: "event",
  },
  {
    outputs: [],
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "addPremiumUser",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "isPremiumUser",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "lifetimeChestCount",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "lifetimePremiumChestCount",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "openChest",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "openPremiumChest",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "address", type: "address" }],
    inputs: [],
    name: "owner",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "premiumUsers",
    stateMutability: "view",
    type: "function",
  },
  {
    outputs: [],
    inputs: [{ name: "user", internalType: "address", type: "address" }],
    name: "removePremiumUser",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [],
    name: "renounceOwnership",
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    outputs: [],
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DAILY_BONUS_VICTION_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "initialPremiumUsers",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "PremiumChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserRemoved",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "addPremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isPremiumUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimeChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimePremiumChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "openPremiumChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "premiumUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "removePremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DAILY_BONUS_MANTA_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "initialPremiumUsers",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "PremiumChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserRemoved",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "addPremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isPremiumUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimeChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimePremiumChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "openPremiumChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "premiumUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "removePremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DAILY_BONUS_BASE_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "initialPremiumUsers",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "PremiumChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserRemoved",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "addPremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isPremiumUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimeChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimePremiumChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "openPremiumChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "premiumUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "removePremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DAILY_BONUS_TAIKO_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "initialPremiumUsers",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "PremiumChestOpened",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PremiumUserRemoved",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "addPremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "users", type: "address[]" }],
    name: "addPremiumUsersInBulk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isPremiumUser",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimeChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lifetimePremiumChestCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "openPremiumChest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "premiumUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "removePremiumUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.WETH_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "guy", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "src", type: "address" },
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "wad", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "dst", type: "address" },
      { name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "deposit",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "guy", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "dst", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "src", type: "address" },
      { indexed: false, name: "wad", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
];

window.SUBSCRIPTION_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTION_NEWETH_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTION_NEWBNB_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTION_NEWBNB2_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WBNB_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "discountPercentage", type: "uint256" },
      { internalType: "uint256", name: "durationInDays", type: "uint256" },
    ],
    name: "addOrUpdateNFTDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "subscribers", type: "address[]" },
    ],
    name: "addSubscribersInBulk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "discountPercentageGlobal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "discountPercentage", type: "uint256" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nftDiscounts",
    outputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "discountPercentage", type: "uint256" },
      { internalType: "uint256", name: "expiration", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "nftAddress", type: "address" }],
    name: "removeNFTDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newDiscount", type: "uint256" },
    ],
    name: "setDiscountPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenID", type: "uint256" },
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "tokenAmount", type: "uint256" },
    ],
    name: "subscribeNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscribeWithBNB",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.SUBSCRIPTION_CFX_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTION_SKALE_ABI = [
  { type: "constructor", stateMutability: "nonpayable", inputs: [] },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Subscribe",
    inputs: [
      {
        type: "address",
        name: "account",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "platformTokenAmount",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SubscriptionFeeSet",
    inputs: [
      {
        type: "uint256",
        name: "amountDai",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SupportedTokenAdded",
    inputs: [
      {
        type: "address",
        name: "tokenAddress",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SupportedTokenRemoved",
    inputs: [
      {
        type: "address",
        name: "tokenAddress",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UnsubscribeAddress",
    inputs: [
      {
        type: "address",
        name: "accountAddress",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "TRUSTED_DAI_ADDRESS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addSupportedToken",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getEstimatedTokenSubscriptionAmount",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isTokenSupported",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removeSupportedToken",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setSubscriptionFee",
    inputs: [
      {
        type: "uint256",
        name: "newSubscriptionFeeInDai",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "subscribe",
    inputs: [
      { type: "address", name: "tokenAddress", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "subscriptionFeeInDai",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "subscriptionPlatformTokenAmount",
    inputs: [{ type: "address", name: "", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferAnyERC20Token",
    inputs: [
      { type: "address", name: "token", internalType: "address" },
      { type: "address", name: "recipient", internalType: "address" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "unsubscribeAddress",
    inputs: [
      { type: "address", name: "accountAddress", internalType: "address" },
    ],
  },
];

window.SUBSCRIPTION_CORE_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTION_VICTION_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "discountPercentage", type: "uint256" },
      { internalType: "uint256", name: "durationInDays", type: "uint256" },
    ],
    name: "addOrUpdateNFTDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "subscribers", type: "address[]" },
    ],
    name: "addSubscribersInBulk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "discountPercentageGlobal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "discountPercentage", type: "uint256" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nftDiscounts",
    outputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "discountPercentage", type: "uint256" },
      { internalType: "uint256", name: "expiration", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "nftAddress", type: "address" }],
    name: "removeNFTDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newDiscount", type: "uint256" },
    ],
    name: "setDiscountPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenID", type: "uint256" },
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "tokenAmount", type: "uint256" },
    ],
    name: "subscribeNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.SUBSCRIPTION_MANTA_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WBNB_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "discountPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "durationInDays",
        type: "uint256",
      },
    ],
    name: "addOrUpdateNFTDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "subscribers",
        type: "address[]",
      },
    ],
    name: "addSubscribersInBulk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "discountPercentageGlobal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "discountPercentage",
        type: "uint256",
      },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isTokenSupported",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nftDiscounts",
    outputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "discountPercentage",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
    ],
    name: "removeNFTDiscount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newDiscount",
        type: "uint256",
      },
    ],
    name: "setDiscountPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "subscribeNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscribeWithBNB",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "subscriptionPlatformTokenAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      {
        internalType: "contract IUniswapV2Router",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

window.SUBSCRIPTION_TAIKO_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"platformTokenAmount","type":"uint256"}],"name":"Subscribe","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountDai","type":"uint256"}],"name":"SubscriptionFeeSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"SupportedTokenAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"SupportedTokenRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"accountAddress","type":"address"}],"name":"UnsubscribeAddress","type":"event"},{"inputs":[],"name":"ONE_HUNDRED_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLIPPAGE_TOLERANCE_X_100","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_DAI_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_USDC_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TRUSTED_USDT_ADDRESS","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"discountPercentage","type":"uint256"},{"internalType":"uint256","name":"durationInDays","type":"uint256"}],"name":"addOrUpdateNFTDiscount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"subscribers","type":"address[]"}],"name":"addSubscribersInBulk","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"addSupportedToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"discountPercentageGlobal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"discountPercentage","type":"uint256"}],"name":"getEstimatedTokenSubscriptionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isTokenSupported","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nftDiscounts","outputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"discountPercentage","type":"uint256"},{"internalType":"uint256","name":"expiration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"}],"name":"removeNFTDiscount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"}],"name":"removeSupportedToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newDiscount","type":"uint256"}],"name":"setDiscountPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSubscriptionFeeInDai","type":"uint256"}],"name":"setSubscriptionFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"subscribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"tokenID","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"subscribeNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"subscriptionFeeInDai","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"subscriptionFeeInUSDC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"subscriptionPlatformTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapRouterV2","outputs":[{"internalType":"contract IUniswapV2Router","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"accountAddress","type":"address"}],"name":"unsubscribeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

window.SUBSCRIPTION_BASE_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTION_NEWAVAX_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DYP_WAVAX_PAIR",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_USDT_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_USDT_WAVAX_PAIR",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_WAVAX_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "newSubscriptionFeeInUSDT",
        type: "uint128",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInUSDT",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTIONETH_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Unsubscribe",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unsubscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SUBSCRIPTIONBNB_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformTokenAmount",
        type: "uint256",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDai",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "SupportedTokenRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "UnsubscribeAddress",
    type: "event",
  },
  {
    inputs: [],
    name: "ONE_HUNDRED_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SLIPPAGE_TOLERANCE_X_100",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_DAI_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TRUSTED_PLATFORM_TOKEN_ADDRESS",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "addSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "getEstimatedTokenSubscriptionAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "isTokenSupported",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "removeSupportedToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSubscriptionFeeInDai",
        type: "uint256",
      },
    ],
    name: "setSubscriptionFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeInDai",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionPlatformTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uniswapRouterV2",
    outputs: [
      { internalType: "contract IUniswapV2Router", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "accountAddress", type: "address" },
    ],
    name: "unsubscribeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.NFTSTAKING_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingDestinationAddress",
        type: "address",
      },
      { internalType: "uint256", name: "_rate", type: "uint256" },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
      { internalType: "address", name: "_erc20Address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
    ],
    name: "ExpirationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLockTime",
        type: "uint256",
      },
    ],
    name: "LockTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_depositBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "calculateRewards",
    outputs: [
      { internalType: "uint256[]", name: "rewards", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Address",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      { internalType: "uint256", name: "", type: "uint256" },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_expiration", type: "uint256" }],
    name: "setExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockTime", type: "uint256" }],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rate", type: "uint256" }],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingDestinationAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LANDMINTING_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "LandPriceDiscount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_MINT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_WOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WOD_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsContract",
    outputs: [
      { internalType: "contract CawsContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "cawsUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "landPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLandPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "mintWodGenesis",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "reserveWod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeContract",
    outputs: [
      { internalType: "contract StakeContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LAND_CCIP_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_MINT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_WOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WOD_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "initialWODTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "landPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLandPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "restWOD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CAWS_CCIP_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "CAWS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_CAWS",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "initialCAWSTest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxCawsPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "restCAWS",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.LANDSTAKING_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingDestinationAddress",
        type: "address",
      },
      { internalType: "uint256", name: "_rate", type: "uint256" },
      { internalType: "uint256", name: "_expiration", type: "uint256" },
      { internalType: "address", name: "_erc20Address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
    ],
    name: "ExpirationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLockTime",
        type: "uint256",
      },
    ],
    name: "LockTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "_depositBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "calculateRewards",
    outputs: [
      { internalType: "uint256[]", name: "rewards", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Address",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_expiration", type: "uint256" }],
    name: "setExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockTime", type: "uint256" }],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rate", type: "uint256" }],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingDestinationAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.WOD_CAWS_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingDestinationAddress",
        type: "address",
      },
      { internalType: "address", name: "_WoDcontractaddress", type: "address" },
      { internalType: "uint256", name: "_rate", type: "uint256" },
      { internalType: "uint256", name: "_expiration", type: "uint256" },
      { internalType: "address", name: "_erc20Address", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
    ],
    name: "ExpirationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newLockTime",
        type: "uint256",
      },
    ],
    name: "LockTimeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "RateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "LOCKUP_TIME",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WoDcontractaddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "_depositBlocks",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "calculateReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "calculateRewards",
    outputs: [
      { internalType: "uint256[]", name: "rewards", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "uint256[]", name: "tokenIdsWoD", type: "uint256[]" },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOf",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "depositsOfWoD",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "uint256[]", name: "tokenIdsWoD", type: "uint256[]" },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc20Address",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_expiration", type: "uint256" }],
    name: "setExpiration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_lockTime", type: "uint256" }],
    name: "setLockTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rate", type: "uint256" }],
    name: "setRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingDestinationAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "stakingTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      { internalType: "uint256[]", name: "tokenIdsWoD", type: "uint256[]" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CAWS_TIMEPIECE_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_TIMEPIECE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Timepiece_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsContract",
    outputs: [
      { internalType: "contract CawsContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "cawsUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimTimepiece",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxTimepieceClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeContractCAWS",
    outputs: [
      { internalType: "contract StakeContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeContractWoD",
    outputs: [
      { internalType: "contract StakeContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CAWS_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "CAWS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_CAWS",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxCawsPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintCaws",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveCaws",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.WOD_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "LandPriceDiscount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_MINT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_WOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WOD_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsContract",
    outputs: [
      { internalType: "contract CawsContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "cawsUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "landPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLandPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "mintWodGenesis",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "reserveWod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeContract",
    outputs: [
      { internalType: "contract StakeContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.TIMEPIECE_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_TIMEPIECE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Timepiece_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cawsContract",
    outputs: [
      { internalType: "contract CawsContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "cawsUsed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
    ],
    name: "claimTimepiece",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencySetStartingIndexBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxTimepieceClaim",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setStartingIndex",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeContractCAWS",
    outputs: [
      { internalType: "contract StakeContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeContractWoD",
    outputs: [
      { internalType: "contract StakeContract", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.COINGECKO_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DOGE_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CMC_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.SKALE_NFT_ABI = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "string", name: "name", internalType: "string" },
      { type: "string", name: "symbol", internalType: "string" },
      { type: "uint256", name: "maxNftSupply", internalType: "uint256" },
      { type: "uint256", name: "saleStart", internalType: "uint256" },
    ],
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "approved",
        internalType: "address",
        indexed: true,
      },
      {
        type: "uint256",
        name: "tokenId",
        internalType: "uint256",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        type: "address",
        name: "owner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "operator",
        internalType: "address",
        indexed: true,
      },
      { type: "bool", name: "approved", internalType: "bool", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        internalType: "address",
        indexed: true,
      },
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", internalType: "address", indexed: true },
      { type: "address", name: "to", internalType: "address", indexed: true },
      {
        type: "uint256",
        name: "tokenId",
        internalType: "uint256",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "BETA_PASS_PROVENANCE",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "REVEAL_TIMESTAMP",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "approve",
    inputs: [
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "balanceOf",
    inputs: [{ type: "address", name: "owner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "baseURI",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "betaPassPrice",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "costSaleIsActive",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "costSaleState",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "flipSaleState",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "getApproved",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "isApprovedForAll",
    inputs: [
      { type: "address", name: "owner", internalType: "address" },
      { type: "address", name: "operator", internalType: "address" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "maxBetaPassPurchase",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "mintBetaPass",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "mintBetaPassCost",
    inputs: [
      { type: "uint256", name: "numberOfTokens", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "name",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "nextOwnerToExplicitlySet",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "owner",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "ownerOf",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "renounceOwnership",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "reserveBetaPass",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "safeTransferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "safeTransferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
      { type: "bytes", name: "_data", internalType: "bytes" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "saleIsActive",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setApprovalForAll",
    inputs: [
      { type: "address", name: "operator", internalType: "address" },
      { type: "bool", name: "approved", internalType: "bool" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setBaseURI",
    inputs: [{ type: "string", name: "tokenURI", internalType: "string" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setBetaPassPrice",
    inputs: [{ type: "uint256", name: "newPrice", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setProvenanceHash",
    inputs: [
      { type: "string", name: "provenanceHash", internalType: "string" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setRevealTimestamp",
    inputs: [
      { type: "uint256", name: "revealTimeStamp", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "startingIndex",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "startingIndexBlock",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "supportsInterface",
    inputs: [{ type: "bytes4", name: "interfaceId", internalType: "bytes4" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "symbol",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "tokenByIndex",
    inputs: [{ type: "uint256", name: "index", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "tokenOfOwnerByIndex",
    inputs: [
      { type: "address", name: "owner", internalType: "address" },
      { type: "uint256", name: "index", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "tokenURI",
    inputs: [{ type: "uint256", name: "tokenId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "totalSupply",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferFrom",
    inputs: [
      { type: "address", name: "from", internalType: "address" },
      { type: "address", name: "to", internalType: "address" },
      { type: "uint256", name: "tokenId", internalType: "uint256" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "transferOwnership",
    inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "withdraw",
    inputs: [],
  },
];

window.CORE_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BNB_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.COOKIE3_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.OPBNB_NFT_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "maxNftSupply", type: "uint256", internalType: "uint256" },
      { name: "saleStart", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    name: "Approval",
    type: "event",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
    signature:
      "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
  },
  {
    name: "ApprovalForAll",
    type: "event",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "approved", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
    signature:
      "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31",
  },
  {
    name: "OwnershipTransferred",
    type: "event",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
    signature:
      "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
  },
  {
    name: "Transfer",
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
    signature:
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  },
  {
    name: "BETA_PASS_PROVENANCE",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "string", value: "", internalType: "string" }],
    constant: true,
    signature: "0x998599f5",
    stateMutability: "view",
  },
  {
    name: "REVEAL_TIMESTAMP",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        value: "10000000001123199",
        internalType: "uint256",
      },
    ],
    constant: true,
    signature: "0x18e20a38",
    stateMutability: "view",
  },
  {
    name: "approve",
    type: "function",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    signature: "0x095ea7b3",
    stateMutability: "nonpayable",
  },
  {
    name: "balanceOf",
    type: "function",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    constant: true,
    signature: "0x70a08231",
    stateMutability: "view",
  },
  {
    name: "baseURI",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "string", value: "", internalType: "string" }],
    constant: true,
    signature: "0x6c0360eb",
    stateMutability: "view",
  },
  {
    name: "betaPassPrice",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        value: "80000000000000000",
        internalType: "uint256",
      },
    ],
    constant: true,
    signature: "0xe55e359d",
    stateMutability: "view",
  },
  {
    name: "costSaleIsActive",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bool", value: false, internalType: "bool" }],
    constant: true,
    signature: "0xd27c9945",
    stateMutability: "view",
  },
  {
    name: "costSaleState",
    type: "function",
    inputs: [],
    outputs: [],
    signature: "0xfd9fa702",
    stateMutability: "nonpayable",
  },
  {
    name: "flipSaleState",
    type: "function",
    inputs: [],
    outputs: [],
    signature: "0x34918dfd",
    stateMutability: "nonpayable",
  },
  {
    name: "getApproved",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    constant: true,
    signature: "0x081812fc",
    stateMutability: "view",
  },
  {
    name: "isApprovedForAll",
    type: "function",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "operator", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    constant: true,
    signature: "0xe985e9c5",
    stateMutability: "view",
  },
  {
    name: "maxBetaPassPurchase",
    type: "function",
    inputs: [],
    outputs: [
      { name: "", type: "uint256", value: "500", internalType: "uint256" },
    ],
    constant: true,
    signature: "0x3233639c",
    stateMutability: "view",
  },
  {
    name: "mintBetaPass",
    type: "function",
    inputs: [],
    outputs: [],
    signature: "0x6a229ba3",
    stateMutability: "nonpayable",
  },
  {
    name: "mintBetaPassCost",
    type: "function",
    inputs: [
      { name: "numberOfTokens", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    payable: true,
    signature: "0x1f51ff58",
    stateMutability: "payable",
  },
  {
    name: "name",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        value: "opBNB Beta Pass",
        internalType: "string",
      },
    ],
    constant: true,
    signature: "0x06fdde03",
    stateMutability: "view",
  },
  {
    name: "nextOwnerToExplicitlySet",
    type: "function",
    inputs: [],
    outputs: [
      { name: "", type: "uint256", value: "0", internalType: "uint256" },
    ],
    constant: true,
    signature: "0xd7224ba0",
    stateMutability: "view",
  },
  {
    name: "owner",
    type: "function",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        value: "0x65C3d0F9438644945dF5BF321c9F0fCf333302b8",
        internalType: "address",
      },
    ],
    constant: true,
    signature: "0x8da5cb5b",
    stateMutability: "view",
  },
  {
    name: "ownerOf",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    constant: true,
    signature: "0x6352211e",
    stateMutability: "view",
  },
  {
    name: "renounceOwnership",
    type: "function",
    inputs: [],
    outputs: [],
    signature: "0x715018a6",
    stateMutability: "nonpayable",
  },
  {
    name: "reserveBetaPass",
    type: "function",
    inputs: [],
    outputs: [],
    signature: "0x0ac0a181",
    stateMutability: "nonpayable",
  },
  {
    name: "safeTransferFrom",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    signature: "0x42842e0e",
    stateMutability: "nonpayable",
  },
  {
    name: "safeTransferFrom",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "_data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    signature: "0xb88d4fde",
    stateMutability: "nonpayable",
  },
  {
    name: "saleIsActive",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bool", value: false, internalType: "bool" }],
    constant: true,
    signature: "0xeb8d2444",
    stateMutability: "view",
  },
  {
    name: "setApprovalForAll",
    type: "function",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "approved", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    signature: "0xa22cb465",
    stateMutability: "nonpayable",
  },
  {
    name: "setBaseURI",
    type: "function",
    inputs: [{ name: "tokenURI", type: "string", internalType: "string" }],
    outputs: [],
    signature: "0x55f804b3",
    stateMutability: "nonpayable",
  },
  {
    name: "setBetaPassPrice",
    type: "function",
    inputs: [{ name: "newPrice", type: "uint256", internalType: "uint256" }],
    outputs: [],
    signature: "0xde309bf2",
    stateMutability: "nonpayable",
  },
  {
    name: "setProvenanceHash",
    type: "function",
    inputs: [
      { name: "provenanceHash", type: "string", internalType: "string" },
    ],
    outputs: [],
    signature: "0x10969523",
    stateMutability: "nonpayable",
  },
  {
    name: "setRevealTimestamp",
    type: "function",
    inputs: [
      { name: "revealTimeStamp", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    signature: "0x018a2c37",
    stateMutability: "nonpayable",
  },
  {
    name: "startingIndex",
    type: "function",
    inputs: [],
    outputs: [
      { name: "", type: "uint256", value: "0", internalType: "uint256" },
    ],
    constant: true,
    signature: "0xcb774d47",
    stateMutability: "view",
  },
  {
    name: "startingIndexBlock",
    type: "function",
    inputs: [],
    outputs: [
      { name: "", type: "uint256", value: "0", internalType: "uint256" },
    ],
    constant: true,
    signature: "0xe36d6498",
    stateMutability: "view",
  },
  {
    name: "supportsInterface",
    type: "function",
    inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    constant: true,
    signature: "0x01ffc9a7",
    stateMutability: "view",
  },
  {
    name: "symbol",
    type: "function",
    inputs: [],
    outputs: [
      { name: "", type: "string", value: "opBNBBP", internalType: "string" },
    ],
    constant: true,
    signature: "0x95d89b41",
    stateMutability: "view",
  },
  {
    name: "tokenByIndex",
    type: "function",
    inputs: [{ name: "index", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    constant: true,
    signature: "0x4f6ccce7",
    stateMutability: "view",
  },
  {
    name: "tokenOfOwnerByIndex",
    type: "function",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "index", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    constant: true,
    signature: "0x2f745c59",
    stateMutability: "view",
  },
  {
    name: "tokenURI",
    type: "function",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    constant: true,
    signature: "0xc87b56dd",
    stateMutability: "view",
  },
  {
    name: "totalSupply",
    type: "function",
    inputs: [],
    outputs: [
      { name: "", type: "uint256", value: "0", internalType: "uint256" },
    ],
    constant: true,
    signature: "0x18160ddd",
    stateMutability: "view",
  },
  {
    name: "transferFrom",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    signature: "0x23b872dd",
    stateMutability: "nonpayable",
  },
  {
    name: "transferOwnership",
    type: "function",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    signature: "0xf2fde38b",
    stateMutability: "nonpayable",
  },
  {
    name: "withdraw",
    type: "function",
    inputs: [],
    outputs: [],
    signature: "0x3ccfd60b",
    stateMutability: "nonpayable",
  },
];

window.MANTA_NFT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "maxNftSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "saleStart",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "numberOfTokens",
        type: "uint256",
      },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "provenanceHash",
        type: "string",
      },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "revealTimeStamp",
        type: "uint256",
      },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.TAIKO_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.VICTION_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.IMMUTABLE_NFT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "string",
        name: "baseURI_",
        type: "string",
      },
      {
        internalType: "string",
        name: "contractURI_",
        type: "string",
      },
      {
        internalType: "address",
        name: "operatorAllowlist_",
        type: "address",
      },
      {
        internalType: "address",
        name: "royaltyReceiver_",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "feeNumerator_",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AllowlistDoesNotImplementIOperatorAllowlist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "ApproveTargetNotInAllowlist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ApproverNotInAllowlist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "CallerNotInAllowlist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "IImmutableERC721IDAboveThreshold",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "currentOwner",
        type: "address",
      },
    ],
    name: "IImmutableERC721MismatchedTokenOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "IImmutableERC721MismatchedTransferLengths",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "IImmutableERC721NotOwnerOrOperator",
    type: "error",
  },
  {
    inputs: [],
    name: "IImmutableERC721SendingToZerothAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "IImmutableERC721TokenAlreadyBurned",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "PermitExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "SignerCannotBeZerothAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
    ],
    name: "StringTooLong",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "TransferFromNotInAllowlist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "TransferToNotInAllowlist",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldRegistry",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newRegistry",
        type: "address",
      },
    ],
    name: "OperatorAllowlistRegistryUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIDs",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdmins",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "grantMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "tokenIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct ERC721Hybrid.IDMint[]",
        name: "mints",
        type: "tuple[]",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
        ],
        internalType: "struct ERC721Hybrid.Mint[]",
        name: "mints",
        type: "tuple[]",
      },
    ],
    name: "mintBatchByQuantity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBatchByQuantityThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "mintByQuantity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "operatorAllowlist",
    outputs: [
      {
        internalType: "contract IOperatorAllowlist",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "sig",
        type: "bytes",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "revokeMinterRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "tokenIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct ERC721Hybrid.IDBurn[]",
        name: "burns",
        type: "tuple[]",
      },
    ],
    name: "safeBurnBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "tokenIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct ERC721Hybrid.IDMint[]",
        name: "mints",
        type: "tuple[]",
      },
    ],
    name: "safeMintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
        ],
        internalType: "struct ERC721Hybrid.Mint[]",
        name: "mints",
        type: "tuple[]",
      },
    ],
    name: "safeMintBatchByQuantity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "safeMintByQuantity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "tos",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "tokenIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct ERC721Hybrid.TransferRequest",
        name: "tr",
        type: "tuple",
      },
    ],
    name: "safeTransferFromBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "baseURI_",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_contractURI",
        type: "string",
      },
    ],
    name: "setContractURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "feeNumerator",
        type: "uint96",
      },
    ],
    name: "setDefaultRoyaltyReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "feeNumerator",
        type: "uint96",
      },
    ],
    name: "setNFTRoyaltyReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "feeNumerator",
        type: "uint96",
      },
    ],
    name: "setNFTRoyaltyReceiverBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.MULTIVERS_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.BASE_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.GATE_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.CONFLUX_NFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "maxNftSupply", type: "uint256" },
      { internalType: "uint256", name: "saleStart", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "BETA_PASS_PROVENANCE",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVEAL_TIMESTAMP",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betaPassPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "costSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxBetaPassPurchase",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "numberOfTokens", type: "uint256" },
    ],
    name: "mintBetaPassCost",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextOwnerToExplicitlySet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveBetaPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleIsActive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
    name: "setBetaPassPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "provenanceHash", type: "string" },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "revealTimeStamp", type: "uint256" },
    ],
    name: "setRevealTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startingIndexBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.MARKETPLACE_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        indexed: false,
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "ItemBought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        indexed: false,
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "ItemCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        indexed: false,
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "ItemListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        indexed: false,
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerIndex",
        type: "uint256",
      },
    ],
    name: "OfferCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        indexed: false,
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerIndex",
        type: "uint256",
      },
    ],
    name: "OfferMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        indexed: false,
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerIndex",
        type: "uint256",
      },
    ],
    name: "OfferUpdated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "offerIndex", type: "uint256" },
    ],
    name: "acceptOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "buyItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "cancelAnyListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "offerIndex", type: "uint256" },
    ],
    name: "cancelOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "getActiveOffers",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "index", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "price", type: "uint256" },
              { internalType: "address", name: "buyer", type: "address" },
              {
                components: [
                  {
                    internalType: "enum Marketplace.PriceType",
                    name: "priceType",
                    type: "uint8",
                  },
                  {
                    internalType: "address",
                    name: "tokenAddress",
                    type: "address",
                  },
                ],
                internalType: "struct Marketplace.Payment",
                name: "payment",
                type: "tuple",
              },
            ],
            internalType: "struct Marketplace.Offer",
            name: "offer",
            type: "tuple",
          },
        ],
        internalType: "struct Marketplace.OfferWithIndex[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "makeOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "newPrice", type: "uint256" },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct Marketplace.Payment",
        name: "payment",
        type: "tuple",
      },
    ],
    name: "updateListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "offerIndex", type: "uint256" },
      { internalType: "uint256", name: "newPrice", type: "uint256" },
      {
        components: [
          {
            internalType: "enum Marketplace.PriceType",
            name: "priceType",
            type: "uint8",
          },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct Marketplace.Payment",
        name: "newPayment",
        type: "tuple",
      },
    ],
    name: "updateOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.DYP_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DELEGATION_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "checkpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "fromBlock",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegator",
        type: "address",
      },
    ],
    name: "delegates",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getCurrentVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPriorVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "numCheckpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.ERC20_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "remaining", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_spender", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_newOwner", type: "address" },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

window.TOKEN_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "remaining",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "approveAndCall",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_addedValue",
        type: "uint256",
      },
    ],
    name: "increaseApproval",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "initialSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferAnyERC20Token",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

window.isConnectedOneTime = false;
window.oneTimeConnectionEvents = [];
function addOneTimeWalletConnectionListener(fn) {
  oneTimeConnectionEvents.push(fn);
  console.log({ oneTimeConnectionEvents });
}
function removeOneTimeWalletConnectionListener(fn) {
  oneTimeConnectionEvents = oneTimeConnectionEvents.filter((e) => e != fn);
  console.log({ oneTimeConnectionEvents });
}

function getData(ajaxurl) {
  return $.ajax({
    url: ajaxurl,
    type: "GET",
  });
}

// function to connect metamask
async function connectWallet() {
  function onConnect() {
    if (!isConnectedOneTime) {
      window.isConnectedOneTime = true;
      window.oneTimeConnectionEvents.forEach((fn) => fn());
    }
  }
  if (window.ethereum && !window.gatewallet) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum?.enable();
      console.log("Connected!");
      if (window.ethereum.isCoin98) {
        window.WALLET_TYPE = "coin98";
      }
      if (window.ethereum.isMetaMask) {
        window.WALLET_TYPE = "metamask";
      }
      let coinbase_address = await window.ethereum?.request({
        method: "eth_accounts",
      });

      window.coinbase_address = coinbase_address[0];
      onConnect();
      return true;
    } catch (e) {
      console.error(e);
      throw new Error("User denied wallet connection!");
    }
  } else if (window.gatewallet) {
    try {
      console.log("yes");
      await window.gatewallet.enable();
      console.log("Connected2!");
      let coinbase_address = await window.gatewallet?.request({
        method: "eth_accounts",
      });

      window.coinbase_address = coinbase_address[0];
      onConnect();
      return true;
    } catch (e) {
      console.error(e);
      throw new Error("User denied wallet connection!");
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    console.log("connected to old web3");
    onConnect();
    return true;
  } else {
    throw new Error("No web3 detected! Please Install MetaMask!");
  }
}

window.cached_contracts = Object.create(null);

async function getCoinbase() {
  if (
    window.ethereum &&
    window.WALLET_TYPE !== "binance" &&
    window.WALLET_TYPE !== ""
  ) {
    if (window.WALLET_TYPE == "coin98") {
      return window.coinbase_address.toLowerCase();
    } else if (window.gatewallet) {
      try {
        let coinbase_address = await window.gatewallet?.request({
          method: "eth_accounts",
        });

        window.coinbase_address = coinbase_address[0];

        return window.coinbase_address.toLowerCase();
      } catch (e) {
        console.error(e);
        throw new Error("User denied wallet connection!");
      }
    } else {
      const coinbase = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (coinbase && coinbase.length > 0) {
        window.coinbase_address = coinbase[0];

        return window.coinbase_address.toLowerCase();
      }
    }
  } else if (window.WALLET_TYPE === "binance") {
    return window.coinbase_address;
  }
}

async function disconnectWallet() {
  window.coinbase_address = "0x0000000000000000000000000000000000000000";
  return window.coinbase_addres;
}
async function getContract({ key, address = null, ABI = null }) {
  if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "") {
    ABI = ABI || window[key + "_ABI"];
    address = address || window.config[key.toLowerCase() + "_address"];
    if (!window.cached_contracts[key + "-" + address.toLowerCase()]) {
      window.web3 = new Web3(window.ethereum);
      window.cached_contracts[key + "-" + address?.toLowerCase()] =
        new window.web3.eth.Contract(ABI, address, {
          from: await getCoinbase(),
        });
    }
    return window.cached_contracts[key + "-" + address.toLowerCase()];
  }
}

function wait(ms) {
  console.log("Waiting " + ms + "ms");
  return new Promise((r) =>
    setTimeout(() => {
      r(true);
      console.log("Wait over!");
    }, ms)
  );
}

async function getTokenHolderBalance(token, holder) {
  let tokenContract = await getContract({ address: token, ABI: ERC20_ABI });
  if (tokenContract) {
    return await tokenContract.methods.balanceOf(holder).call();
  }
}

// ======================== subscription contract functions ================================

async function subscriptionPlatformTokenAmount(account) {
  if (account) {
    let subscriptionContract = await getContract({ key: "SUBSCRIPTION" });
    return await subscriptionContract.methods
      .subscriptionPlatformTokenAmount(account)
      .call()
      .then();
  }
}

async function subscriptionPlatformTokenAmountNew(account) {
  if (account) {
    let subscriptionContract = await getContract({
      key: "SUBSCRIPTION_NEWAVAX",
    });
    return await subscriptionContract.methods
      .subscriptionPlatformTokenAmount(account)
      .call()
      .then();
  }
}

async function subscriptionPlatformTokenAmountETH(account) {
  if (account) {
    let subscriptionContract = await getContract({ key: "SUBSCRIPTIONETH" });
    return await subscriptionContract.methods
      .subscriptionPlatformTokenAmount(account)
      .call()
      .then();
  }
}

async function subscribe(tokenAddress, amount) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION_NEWAVAX" });
  return await subscriptionContract.methods
    .subscribe(tokenAddress, amount)
    .send({ from: await getCoinbase() });
}

async function subscribeNFT(nftAddress, tokenId, tokenAddress, tokenAmount) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION_NEWBNB2" });
  return await subscriptionContract.methods
    .subscribeNFT(nftAddress, tokenId, tokenAddress, tokenAmount)
    .send({ from: await getCoinbase() });
}

async function subscribeNFTViction(
  nftAddress,
  tokenId,
  tokenAddress,
  tokenAmount
) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION_VICTION" });
  return await subscriptionContract.methods
    .subscribeNFT(nftAddress, tokenId, tokenAddress, tokenAmount)
    .send({ from: await getCoinbase() });
}

async function subscribeNFTTaiko(
  nftAddress,
  tokenId,
  tokenAddress,
  tokenAmount
) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION_TAIKO" });
  return await subscriptionContract.methods
    .subscribeNFT(nftAddress, tokenId, tokenAddress, tokenAmount)
    .send({ from: await getCoinbase() });
}

async function subscribeBNB(amount) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION_NEWBNB2" });
  return await subscriptionContract.methods
    .subscribeWithBNB(amount)
    .send({ from: await getCoinbase() });
}

async function unsubscribe() {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION_NEWAVAX" });
  return await subscriptionContract.methods
    .unsubscribe()
    .send({ from: await getCoinbase() });
}

async function getEstimatedTokenSubscriptionAmount(tokenAddress) {
  let subscriptionContract = new window.avaxWeb3.eth.Contract(
    window.SUBSCRIPTION_NEWAVAX_ABI,
    window.config.subscription_newavax_address
  );

  if (subscriptionContract) {
    return await subscriptionContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountETH(tokenAddress) {
  let subscriptionContract = new window.infuraWeb3.eth.Contract(
    window.SUBSCRIPTION_NEWETH_ABI,
    window.config.subscription_neweth_address
  );
  if (subscriptionContract) {
    return await subscriptionContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountBNB(tokenAddress) {
  let subscriptionContract = await getContract({ key: "SUBSCRIPTION_NEWBNB" });

  if (subscriptionContract) {
    return await subscriptionContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountBNB2(
  tokenAddress,
  discountPercentage
) {
  let subscriptionContract = new window.bscWeb3.eth.Contract(
    window.SUBSCRIPTION_NEWBNB2_ABI,
    window.config.subscription_newbnb2_address
  );

  if (subscriptionContract) {
    return await subscriptionContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress, discountPercentage)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountCFX(tokenAddress) {
  let subscriptionContract = new window.confluxWeb3.eth.Contract(
    window.SUBSCRIPTION_CFX_ABI,
    window.config.subscription_cfx_address
  );
  if (subscriptionContract) {
    return await subscriptionContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountBase(tokenAddress) {
  const baseContract = new window.baseWeb3.eth.Contract(
    window.SUBSCRIPTION_BASE_ABI,
    window.config.subscription_base_address
  );
  if (baseContract) {
    return await baseContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountSkale(tokenAddress) {
  const skaleContract = new window.skaleWeb3.eth.Contract(
    window.SUBSCRIPTION_SKALE_ABI,
    window.config.subscription_skale_address
  );
  if (skaleContract) {
    return await skaleContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountSei(tokenAddress) {
  const seiContract = new window.seiWeb3.eth.Contract(
    window.SUBSCRIPTION_SKALE_ABI,
    window.config.subscription_sei_address
  );
  if (seiContract) {
    return await seiContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

async function getEstimatedTokenSubscriptionAmountViction(
  tokenAddress,
  discountPercentage
) {
  const vicitonContract = new window.victionWeb3.eth.Contract(
    window.SUBSCRIPTION_VICTION_ABI,
    window.config.subscription_viction_address
  );

  return await vicitonContract.methods
    .getEstimatedTokenSubscriptionAmount(tokenAddress, discountPercentage)
    .call()
    .catch((e) => {
      return 100000000;
    });
}

async function getEstimatedTokenSubscriptionAmountTaiko(
  tokenAddress,
  discountPercentage
) {
  const vicitonContract = new window.taikoWeb3.eth.Contract(
    window.SUBSCRIPTION_TAIKO_ABI,
    window.config.subscription_taiko_address
  );

  return await vicitonContract.methods
    .getEstimatedTokenSubscriptionAmount(tokenAddress, discountPercentage)
    .call()
    .catch((e) => {
      return 100000000;
    });
}
async function getEstimatedTokenSubscriptionAmountManta(tokenAddress) {
  const mantaContract = new window.mantaWeb3.eth.Contract(
    window.SUBSCRIPTION_MANTA_ABI,
    window.config.subscription_manta_address
  );
  return await mantaContract.methods
    .getEstimatedTokenSubscriptionAmount(tokenAddress, 0)
    .call();
}

 

async function getEstimatedTokenSubscriptionAmountCore(tokenAddress) {
  const coreContract = new window.coreWeb3.eth.Contract(
    window.SUBSCRIPTION_CORE_ABI,
    window.config.subscription_core_address
  );

  if (coreContract) {
    return await coreContract.methods
      .getEstimatedTokenSubscriptionAmount(tokenAddress)
      .call();
  }
}

// ===================== end subscription contract functions ================================

// -----------------

// helper functions for csv json and file reading
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    var strMatchedValue;

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}

function csvToJSON(csv) {
  csv = csv.trim();
  let arr = CSVToArray(csv);
  return arr.slice(1).map((a) => {
    let res = {};
    arr[0].forEach((field, i) => (res[field] = a[i]));
    return res;
  });
}

function readAsText(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsText(file);
  });
}

window.sign = async function (msg, account) {
  window.web3 = new Web3(window.ethereum);
  let signature = await window.web3.eth.personal.sign(msg, account);
  return signature;
};

//Check If Whitelist
const whitelistWod = [
  "0xf7Daa481cA09B2818552C9C5d56d5cC88Cf18047",
  "0xbfa3b43b735971b7f1a92028a975b44e1dfc157a",
  "0xb4bd860f00df73559fa73df86ddb644f1a1c4ff3",
  "0x73b679f48dfa71e044b8eee478d22622dbdcb806",
  "0x503e291591bcb6eb2e049151bbd1a7a288dfd76b",
  "0x920add42a7a9436ad4dffae0e7b391790662c284",
  "0x1bad546fa916d4a6405127e448b81ee3e829f9fa",
  "0x92851633192abe05b58fb27f1199d26d208e1dcb",
  "0x47a0a70225edd77eaf79eadf4f15732e19862bc6",
  "0x9f12e8f4cac299963d7ac249d4d0084297896107",
  "0xb50930f5be47d5b585b0b2ca27086c7f28468b5b",
  "0x8f123e882570baa36f9642b8bd4fcf4e5315a4d2",
  "0xf1b4d55cf1d309e3c1914aa6025d90ffd24910f9",
  "0x81cdc5fc29a3bb4396afa87631cf4337b2c1284a",
  "0x37f9c04ef8cdff17f2d68711a5c4ad41869af5f7",
  "0x8c999b813a7b5ca3852f814a63ea5621f2255da9",
  "0x828471c2cee64a8b146d82c46f39c1889810ab1d",
  "0xbb504f45adb368da44ccbb50f5142faa648c755b",
  "0x0291a10ff53fedf62100c1051e93aa52544be85a",
  "0x13b8dacbed3be5709d6ff9639f185585b5258c9c",
  "0x3d4c4cfe87c2df38f810df1c27fd0859ac7fd740",
  "0xf72131e357295ddbed1c478096bb81d90eff0c19",
  "0x1d252a8fa5c7d43ecbc4f2b93cc7b2ab8991d781",
  "0x9bd215c2530df574657510b2f991d5c326df7c50",
  "0x9bd215c2530df574657510b2f991d5c326df7c50",
  "0xe28ab3d49c26545cf08796d93fd5ee02dc49c1b7",
  "0xeedadfae3c9bbdabf5578c45aaa8cf10e80d6e92",
  "0x979a033cf8e31c6498ae1a6e6be9109fa7a72ee7",
  "0x4d028ada9d9ba5afed3208a799701eeda9ae4bff",
  "0xc2cb073425e020fd827c81ae67b681f660df9f9a",
  "0xa1f1b0daa0710b30f05194b12d0e1c47955032fe",
  "0xd791c5de7f4b75b5f2dd3d5248ed26341461c09c",
  "0x234774d577cb9a1467a1ab31a06b1bbff03f84b8",
  "0x21ee40a8b02119b029e4b9ff5551213004b5bcdb",
  "0x2d9226d88bab5c6e415be3eb93a067c063fc5c19",
  "0x6529770a5c58ca859558670cf98171f600c48783",
  "0xd77a670cf55d8b8f2791beb96ac47eed2c413241",
  "0x76bdbe477255820df76d000262f1b9773f5d922a",
  "0x60665bd249ba71d1cb75da5b6ecbfdc3703b3950",
  "0xc0251e954e67017ab5fde7bd2facd925e6778406",
  "0xb8cbd2896a27cea37bfc39acef8811d75585572b",
  "0xced44fb4d0f9cacef76cdfa6edc78dc11284b4b2",
  "0x75c88d2149e00a36dddb997faf674ec9b57aeb73",
  "0x8ce5c2b49089bbeb6173137019ddcbabfa8276f0",
  "0x49d4baf8465ce72da405458f5635619a21022b22",
  "0xf15ee7b396475de1229cf92a212bcb250fff1ccc",
  "0x2ba243ef5cff72ea821e9109d68286adddfe0279",
  "0x6f28e5b5a55bbd7be2a1c17f4ea32ed9c7d73b4b",
  "0x19787048eb08de0c1d0fb7a51752c8fa1d3814b9",
  "0x2a80c4be3b962b8db3d5a519d56f04edce5a8dfd",
  "0xb177088734dda47416eb30aec84fbd8f3177b515",
  "0xe657c3e26fd319acac6273abbfb4dc3eb0e2c49b",
  "0x97be1f96f08d5af265eab898e4c2dd076ec8ccdd",
  "0xc1da2e6dec41e2bc8b34422e1e59723059657066",
  "0x622372558a8d49a227938f7cd2b5c581a042964e",
  "0xcf1728d1fbed97e4e15d0a6af71bf9dcb8f46654",
  "0xb2a59e64d94e43d789b62c673acdeaf5c6e70a5e",
  "0x12d4904805b9eda9cb577c099fed72ca47c46d95",
  "0x64f24a7dee68ccec0fdeaf79eb327539a7576634",
  "0x08abd50a1979f58a65c0966bba8927505aebbf57",
  "0xc9381c06059cad8b6c7860cd116ca41e16a0f73d",
  "0xb7573910c7479960ea498f7e61911229817c5bd3",
  "0x3e769d1b5d29a83afaa7eca0e028249e9c174e2b",
  "0x42a59a666c53558dfa793e6fe06237598f891ee9",
  "0x03a64c9412284e7f6102eb67a9eac6c780a81032",
  "0x0c071f47eb96c3e31e8e01290b2dc4d905eef433",
  "0x429ec7235f923c067e07d7eb93bd650a81775748",
  "0x39d82367cc29ff6840e1d56ade946b955a705e7c",
  "0x21babda7c3002042e059387db06bc2a10f93d39b",
  "0xe1f456ea28d8dca19bfff0c0cc43f4db4b3f3ba4",
  "0x4a672eb72eaba39d45e98d2e336e9ae2002166ef",
  "0xbaaeb8d1846cf8d1fa29d616deeb5cc45181658c",
  "0x347cf753824146e26cbb6cfee169086b3f27b921",
  "0xc2442976d2d6de1c9588181d60e2bf72fffc472f",
  "0xb4e6a7e57b4153d74a64c02d63e840d430675dbd",
  "0xa0fa292f4ad1b0083804c06b1d78b116a7731cde",
  "0x9413935b832319c0275a36b7988dc93857ae777c",
  "0xe05bc0f8ce96b65dc319c855958e216b63cfdc72",
  "0x5bb35886f7ec42c9873b2836d2dff00bb06fad45",
  "0x7324abfacdc816d9e06172cbd79ada05c07b5dbf",
  "0x11256234244fb6bbdee711c9107e547caab91851",
  "0x392561fc3183480822dec998113d576efbec9839",
  "0xf616a6be7c0130014ea0dce60289c58cc94e00e1",
  "0x2a69edeb31dcc5ad2e4da6d648401a4552b69906",
  "0xe7d295c06ae892758885426edcc1cd0b0ce122a5",
  "0x9ffeaa0c610c4339556bf88d748f989fe316c943",
  "0xbd4a14aa8c27927f19950335b49ddfe82ab7bc54",
  "0xb262844a841c5a3fde9a962bd8996c3814896a65",
  "0x6caa65efd794163141f7a0a44d6f93f3146e4dff",
  "0x8bad14e9f9010814aa50310dc934e78b3bd9ca1a",
  "0xfc43cba5c7bb78d565079a8e76971fb2fc4dccd4",
  "0xb774200df2b6d617d193178cdfb2b5115855dd68",
  "0xe4d01165c34e7d207e50b673f9ad38bffd00f517",
  "0x4a5c32b9dbba6e32babf2ff13a08fa162924b401",
  "0x73c126c293a88d0a4e9c017e0a777517d48bd5be",
  "0xb2578c02826e883b7b1fe6c55963f40fed8ae079",
  "0xca98a7db93e53aa7381461f728a481a941a590b5",
  "0x170ff9ce71675ce4a1a6cbe72ba4431eedf71cd5",
  "0x172e991b2c0bc4e905654eec9d04d9604303c2c0",
  "0x6ea0e36beeb42641e2e3b4a88219e77fe54e0712",
  "0x49b2de680b7a83545f3f5d15c8d95df11b9f26fc",
  "0x6e2c266a5fd854373ede37cdcb1bf3eb06900b07",
  "0x59547d1673f04609dba8cb9d9d3102abec4317af",
  "0x5db8f919587c9f1d868a5994231e9fefc4700f7e",
  "0xa943c7d3b199334183d65469d2972372e5ac7f8a",
  "0xfceb7a8207e8759963765f733bfca1a3a82e24c6",
  "0x8c57d1fab10d4b78f49ef5c6abaeb76a63710f61",
  "0xd270c803abeb4d1f35bb5697f9172e4d044e2051",
  "0x265ac6c4033f7a63d9c89c88610dbdb083135cc2",
  "0x8da949296edda669dae40be005512a6b5298135f",
  "0x54bd473c26579a968fdb5d64daeadd7b4c8bae29",
  "0x4f778a23c55283fe2e9dabaee9ab1cf2fa11dcf6",
  "0x178173627aa2f703e1a4adb549791acee019b283",
  "0xc59ec8c7ff8956548faa70107b0782e4d483ed7d",
  "0xf6f5551ee425b92789cfff72e1dffa70c6d63cf5",
  "0x9da87927cef8e7549030f55a42acce9a46753acd",
  "0x35778b3fd55fe9369fd4d50dd33d69c8afc42ef4",
  "0xd7a9b931e2e2534ec6d6079e6f57912e909d3e50",
  "0x9496ca407ffa02a124bac9d7c2c937a4cb89d62f",
  "0xad28156b17e658a4d7b1cbef01bee22abc0ebdb1",
  "0x59547d1673f04609dba8cb9d9d3102abec4317af",
  "0x14f2faade4a6eefae6307a9a1ce19738aba325dc",
  "0x5e69c396dc34e444db2a19f5458a69308d678ce8",
  "0x2b36cb9b3f00e1bda4aade7153e656cdf7c873c2",
  "0x1d900608c195f76f746e793cea49394913400168",
  "0xefd763902f9e303c24890d4e9f3fc615f0afebe1",
  "0x4d3b5ebf6eae495a140db8992d7715c056dc95a8",
  "0x941e806fdb94ebac7cd02dd63252e7c327379e8a",
  "0x8d19ed8e4f501a54979cafdd90cd0ddde3336722",
  "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
  "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
  "0x13b8fd026872d7808997758bdabb2a5a3d39cbfe",
  "0xa2d2ed6f0c672be216c03982f4ea61d5e0e4d1df",
  "0x1ffa5ef4b180e7b64e21d891a2aba5891fd85aa8",
  "0xd4a4f83c30ba91b0a969c8e3811233ed30a4b05d",
  "0x6a9ad3289ad6bc4ad0945e51629064d3bbdb3d48",
  "0x51aad148488d9ec7ebea8c4deec9bde15194106b",
  "0xd920af54662e86f329da602873fd0dfe6d86982a",
  "0x960eda0d16f4d70df60629117ad6e5f1e13b8f44",
  "0x8d50ad9de85255401129d81a06e4049f32821e24",
  "0xb6d7e6628a6d0d706b5e7e3b078ba2b9c214fcde",
  "0xb5dc04cff504fd506a3a21b0baf4df5de0211d2f",
  "0x671770eaa4b019393f67cef2cc843b9c5f286304",
  "0xd66472c25d7ccc0b814180407640f36a706ad3e5",
  "0x94443aed6c67c4201e7eb46ade63d5cc40eb7fb9",
  "0xebefa67c8e68c9573d4f1933ffeab17182284ec1",
  "0x0af2f3d482001c5199701bfc4cb63fc775d6f689",
  "0x24174fd426a8beee90b78169a4b00d1a2d3e571c",
  "0x28b536a579e16b647f14a7c54f97adc0f594b475",
  "0x23d38ff3e9d41ed3c50a6b008298ae1be1eda297",
  "0x0d62d1133c2ae1785176eea30690759256a07c66",
  "0x6200a100946552f6942da822e995b586ba51204a",
  "0x6b0132a0f4662723004c293e832a2466db61b06d",
  "0x9489390a4c8376db845fcda9bfa759ccb710a37b",
  "0x147ea850d6f23181f6f80fdb5a2bc299df1868ac",
  "0x6c5f4f77c58772b8d5bb0407a934e75e3947a669",
  "0x9e7fe97f839e87f07275626bd5a03b6444dad3f7",
  "0xf5a3f1bb59ae817e161dc97e47ffab9107eeafe4",
  "0x77bae3e8d71689fcb35b9e0376079702a5d1915e",
  "0xbb7a8487a05be848bc62d1e0036f64a5496abfea",
  "0xfef0c1d91a2dde8dd6002b9fbc3e403b2cf88884",
  "0x30c7d0aa435ca2c414fb3e5f31fd8f7651beb8fc",
  "0x33f8976a3488902ccba35a9197117a9b856fb143",
  "0x7401d3124baa16656efe01b6a7122b2ff9e96cc8",
  "0x414999d576ff131ccf1dbf76bb175563166d6476",
  "0x559455e9ae1a86b0840685cf92addf4a5b32bce2",
  "0x2d36d2658b46c509ecc9bb68d7844bb3ef9d337a",
  "0xd83469ff289a0fd7a98c26689943c0ca8de03d7e",
  "0x5e1906899ac4b454e840290faa96bd0f9e3a88cf",
  "0xbe1c4a5a25992dc8ac41f9b4de3c1c799639221c",
  "0xdd73df015f3b712a6932fae799e51ac917fecb54",
  "0xf3d820fc48e80f1a318d946cf3faecc9b3d80599",
  "0x67ee75827371638321c9ea81dea27e3370a7ba0d",
  "0xc968bb73e0999e604b4b410da6c585d58d28e221",
  "0xd2db5c04d2a527f6f9897b7a9d0379b263e6007f",
  "0x600967f935524f808a624fe3a3a2593500dad3fa",
  "0xa8517fd6063c55256f9afbdbd3aa4e472ad1ac3c",
  "0xb4a6e29df57d98b66e1ea26232700bd47b7c57c4",
  "0x8010b39a468fc2a05b7f213bdbdec8ac1b3cb24f",
  "0x7bc43c0bb798f84de89a0a98f52a57b9efa0c15b",
  "0xcb1bed7aad114ac09905690e307b53b6441efba7",
  "0x84d00bb2d24841114ec2b9687c8b9fbce7b6ac1c",
  "0xc0d5ca5c9a43668a0c85ab939b63fd6e0875a997",
  "0xdb2b2055ef195d8c778f282b49a115fe46c9e8f0",
  "0x743bb8871ca88eb46cb87508ceaf9163e0633dd4",
  "0xe042fa4fe111faaf2b213b1e247bf5814c19a718",
  "0xf0b40915a330ce3d4a966e4b7973541ada5ea6ab",
  "0x00f08f13f8a066f48034dbd908e29978fccdb9f5",
  "0x29b70f604a87ac4cfa91b90132ccee9ef5893dc3",
  "0xcf24651bb1902c365cafbd2a9aef6391df017f72",
  "0xbfa3b43b735971b7f1a92028a975b44e1dfc157a",
  "0xbf8bc0660f96b1068e21e0f28614148dfa758cec",
  "0xb4bd860f00df73559fa73df86ddb644f1a1c4ff3",
  "0x2ae08a25d49d4d57fff9a15e7bce6dbb1789e2e6",
  "0x99b96b1905aa5ae769a20d8e41c9b5738a13e73b",
  "0x73b679f48dfa71e044b8eee478d22622dbdcb806",
  "0xea50109b21802b3d4867cf52f690a1bb1d7fb3e5",
  "0x503e291591bcb6eb2e049151bbd1a7a288dfd76b",
  "0xc8422b5a4a51031699e075a12513f6f5df41e00c",
  "0x920add42a7a9436ad4dffae0e7b391790662c284",
  "0x1bad546fa916d4a6405127e448b81ee3e829f9fa",
  "0x47a0a70225edd77eaf79eadf4f15732e19862bc6",
  "0xcab7842b75d02a5ac9bcf779a849a6bcab6a9664",
  "0x9f12e8f4cac299963d7ac249d4d0084297896107",
  "0xb50930f5be47d5b585b0b2ca27086c7f28468b5b",
  "0xf1b4d55cf1d309e3c1914aa6025d90ffd24910f9",
  "0x81cdc5fc29a3bb4396afa87631cf4337b2c1284a",
  "0x37f9c04ef8cdff17f2d68711a5c4ad41869af5f7",
  "0x8c999b813a7b5ca3852f814a63ea5621f2255da9",
  "0x828471c2cee64a8b146d82c46f39c1889810ab1d",
  "0xbb504f45adb368da44ccbb50f5142faa648c755b",
  "0x0291a10ff53fedf62100c1051e93aa52544be85a",
  "0x13b8dacbed3be5709d6ff9639f185585b5258c9c",
  "0x629798e85666c5b0c7b315e6a5906273def876ad",
  "0x2c17e456422eb2ac9e2c264b15bab7767c4f5246",
  "0xf72131e357295ddbed1c478096bb81d90eff0c19",
  "0x1d252a8fa5c7d43ecbc4f2b93cc7b2ab8991d781",
  "0x9bd215c2530df574657510b2f991d5c326df7c50",
  "0x9feac18007e38c8fba5d5bf07ff04746f64d169e",
  "0xeedadfae3c9bbdabf5578c45aaa8cf10e80d6e92",
  "0x05b67957d6e29823f7b1321f6160a6b092ba7e6a",
  "0x979a033cf8e31c6498ae1a6e6be9109fa7a72ee7",
  "0xfc0cce2655a2c5d2b9514930cc6d2cabec57b0f3",
  "0xc2cb073425e020fd827c81ae67b681f660df9f9a",
  "0x703ca7ac43aba29f05ce50073d3ad176a8cede6f",
  "0xf8b67cb149daa87998ac0fc42a6861945b985aed",
  "0x5b0ddbae8c169a853a8814094ba24875431a1000",
  "0xa1f1b0daa0710b30f05194b12d0e1c47955032fe",
  "0xd791c5de7f4b75b5f2dd3d5248ed26341461c09c",
  "0x4e81fb3af1c818591434cc8506a4fbe002349972",
  "0x234774d577cb9a1467a1ab31a06b1bbff03f84b8",
  "0x21ee40a8b02119b029e4b9ff5551213004b5bcdb",
  "0x6529770a5c58ca859558670cf98171f600c48783",
  "0xd77a670cf55d8b8f2791beb96ac47eed2c413241",
  "0x17cb130926d59317117957d8a30156a079636535",
  "0x76bdbe477255820df76d000262f1b9773f5d922a",
  "0x60665bd249ba71d1cb75da5b6ecbfdc3703b3950",
  "0xf59d2be7d73a83e9a0389bb550ba648786f12114",
  "0x7988ee000eb39eaaee84155316bfcd266398fb9e",
  "0xf690cdbfb7546deedd96fa937526ddfc87a3003f",
  "0x44daf7505ebb2f73537867b8fffa30d8eb582c4a",
  "0xedac8a8365add6ad21dbb443c42d5007309b2934",
  "0xc0251e954e67017ab5fde7bd2facd925e6778406",
  "0xb8cbd2896a27cea37bfc39acef8811d75585572b",
  "0x8463967042bb2bb2528002f73aca94a5b2b3dccb",
  "0x5ac5acba1935802bdc18343f71d9b7b73cf84a31",
  "0x1d017c971f32f8ae87e7cce8e31d90dec2dd46c6",
  "0x4a27bfd91b30efaf08706d2105e5d8a1ad09ff0c",
  "0x656e9b3ddfa1f5acc885e19ee706a461c0ee589e",
  "0xbc9a6ea3e32b05e87f3e3e0ddbb23fc0c62c61f3",
  "0x2ba50bb445549c3c7976eca67a60887e0b7b660a",
  "0x76f0f370916b8fa80d1ff132a1ad0e2a7a6c5265",
  "0xced44fb4d0f9cacef76cdfa6edc78dc11284b4b2",
  "0x75c88d2149e00a36dddb997faf674ec9b57aeb73",
  "0xc2d1369b3d2d9c4261f8bc6b406e18c0c722bd7a",
  "0x49d4baf8465ce72da405458f5635619a21022b22",
  "0xf15ee7b396475de1229cf92a212bcb250fff1ccc",
  "0x2ba243ef5cff72ea821e9109d68286adddfe0279",
  "0xd1918ff68722e322dec234d99c4bb2280a563209",
  "0x6f28e5b5a55bbd7be2a1c17f4ea32ed9c7d73b4b",
  "0xcef9a7b6a7fcff94252a13f2234348a2b97b6b0f",
  "0x19787048eb08de0c1d0fb7a51752c8fa1d3814b9",
  "0x2a80c4be3b962b8db3d5a519d56f04edce5a8dfd",
  "0x39dd00a51f2e09003ada326cc34309d800a5b275",
  "0x6d27416c463189adf9434c085013c0b20166938d",
  "0x5e3d12fc5e0eda07f33fd6becf5c07915e96022e",
  "0xaa72ede49e3feda4bd7901b4a7eb99e14267af84",
  "0xb177088734dda47416eb30aec84fbd8f3177b515",
  "0xe657c3e26fd319acac6273abbfb4dc3eb0e2c49b",
  "0x89ccc78ef8bfcead5351ebaa1fa59e7fb48e9549",
  "0xc1da2e6dec41e2bc8b34422e1e59723059657066",
  "0x416907b94b2550491495083048bc4872e8b12593",
  "0x4e53313f575acb89788e455299fe0686cde941e5",
  "0x350061d5b3b09fd44691f22fd9ded9a5693ed41f",
  "0x3f12cdefef0568c8ab6df6f02513713b2bc125e2",
  "0x235594f2dd98d224fcf2b0dcbb02936aa9e1c38f",
  "0x12d4904805b9eda9cb577c099fed72ca47c46d95",
  "0xacb2a1e9e3f7f690b41d2430152fba5f3e2212ba",
  "0xf8af3737c88c98691b664943dca84967aeab1e41",
  "0xc0a3fc33d046860b59e61f4fa65b18af31e1433a",
  "0x64f24a7dee68ccec0fdeaf79eb327539a7576634",
  "0x08abd50a1979f58a65c0966bba8927505aebbf57",
  "0xc9381c06059cad8b6c7860cd116ca41e16a0f73d",
  "0x327113a4db6f7501730470ff24a31ae2902d3cdf",
  "0x1060100673d8f9cbedebf7562d6ca5d4ba54b63e",
  "0x3e769d1b5d29a83afaa7eca0e028249e9c174e2b",
  "0x1c4e8e9dea29f6f38ef1c2fbea1185942f94c65d",
  "0x9cf4dbab25fd916d09f73217b6852cc2347d14ba",
  "0xa93f416e8452b131a3b5f235be8790af2b3fec57",
  "0x41db5400de1f16276eac64f1136f0e9fe676445f",
  "0xd2f015427658c510abc0bf9073db9f69782752b7",
  "0xd1c1fca07c6a2dfca4bf07a273324c8837d00a6a",
  "0x03a64c9412284e7f6102eb67a9eac6c780a81032",
  "0x35fc77ab8f5e9be49a181e2d7cdd5c08cf52c8a8",
  "0x0c071f47eb96c3e31e8e01290b2dc4d905eef433",
  "0x59ae48ed57e94bcf9b1d5cf13a9bd01eced5ba94",
  "0x429ec7235f923c067e07d7eb93bd650a81775748",
  "0xa3b4bc9f9c6fea15a6d5bc8f59f7e210065e8b3a",
  "0x39d82367cc29ff6840e1d56ade946b955a705e7c",
  "0xdf17764870cabf8fbaad998492c9f12fc260b6fc",
  "0x21babda7c3002042e059387db06bc2a10f93d39b",
  "0x30c98ab8fb66212634bf284f3c13b1e1fe61b3ce",
  "0xe1f456ea28d8dca19bfff0c0cc43f4db4b3f3ba4",
  "0x347cf753824146e26cbb6cfee169086b3f27b921",
  "0xc2442976d2d6de1c9588181d60e2bf72fffc472f",
  "0x8639e50d0eeed386949331cc3b48b7a12baf541d",
  "0xddfcd222fdaeda31c8bfb673866d4c20b2622d3a",
  "0x77d5ec1a7978a1d54273e92a673dc2259e7756c2",
  "0x38304b46ff309bc524fc0c90bca03db9ff9afad9",
  "0x153619c8bf47bdbc411302ea72487b32bb95d2cb",
  "0xd9e037169451fa8d7dbf514203f0dbf067765693",
  "0xe972b09e8f2448a79f12ab2c984eb6117985a9da",
  "0x5c3e16ed75138ca7021ea8f24f755b9de89b3b9c",
  "0x5bb35886f7ec42c9873b2836d2dff00bb06fad45",
  "0x07dd60985db175c7ecd44331a2c48119cf8f6a03",
  "0x11256234244fb6bbdee711c9107e547caab91851",
  "0x34de24418718269fc370fa673e262a921fb6f75f",
  "0x392561fc3183480822dec998113d576efbec9839",
  "0x000007cdf16e8173c035ec44e4d8a407d214f0f3",
  "0xf824793cf1ae271a22e3d20614e7f3041cce043f",
  "0xe06b33aacf760e52a8b837f7addef7519a8b8371",
  "0x987178f3752a80487cdb5ff172d492fe3be80144",
  "0xf57c18d5836241342a12d1e935e151a7e130e44f",
  "0x2a69edeb31dcc5ad2e4da6d648401a4552b69906",
  "0x61aaf45fdb4f181fe646cb82212df49575e71b9d",
  "0xe7d295c06ae892758885426edcc1cd0b0ce122a5",
  "0xaf8952de32d5f2e173e163776945265d52531c75",
  "0x4481473812b323d4bc7cefd17118e3973209f5c4",
  "0xf423f82af87ca2d3f335be1daff376e3a431fced",
  "0x6caa65efd794163141f7a0a44d6f93f3146e4dff",
  "0x0000001089167600c25258da29d2e2c857ec1689",
  "0x80ec7cafd05866b9f52e9b373d2579473db58d60",
  "0x550ebde054c56688c949593a4796221583953b0e",
  "0xfc43cba5c7bb78d565079a8e76971fb2fc4dccd4",
  "0xd23696c6fce464f32334a12fe2434b5a92d02f99",
  "0x5fa69d29fe6f3e8f2cf567a8d990747b09432cbb",
  "0x483a305f1827ed8b3e141a5abad714891c17db89",
  "0x73da5694d059ab08250f94d3c205fb4d1df3c040",
  "0x03e6b39c028806f69d911000aa44f389a89e4f31",
  "0x59e634af73c8390320e32652ad9830bf116d8ec5",
  "0xb774200df2b6d617d193178cdfb2b5115855dd68",
  "0xe4d01165c34e7d207e50b673f9ad38bffd00f517",
  "0x02d4d4b5837975d730468a46a51d2ece70427793",
  "0x777e794f0d907d712c0ba2d08ed364111aefe860",
  "0xa5b509313d1391a796dcbb440d099e8fdb96535c",
  "0x73c126c293a88d0a4e9c017e0a777517d48bd5be",
  "0xb2578c02826e883b7b1fe6c55963f40fed8ae079",
  "0xca98a7db93e53aa7381461f728a481a941a590b5",
  "0x170ff9ce71675ce4a1a6cbe72ba4431eedf71cd5",
  "0x172e991b2c0bc4e905654eec9d04d9604303c2c0",
  "0xc4bc4dc7feb7852ee9ae92fe9f7dd003aaf396ca",
  "0x2497011dcea9b19a04b0272e6b5b062ed0aa10c3",
  "0x6ea0e36beeb42641e2e3b4a88219e77fe54e0712",
  "0x49b2de680b7a83545f3f5d15c8d95df11b9f26fc",
  "0x51e5b3f9b136d6a9c290ec8d6bae63a34a2dd256",
  "0xe046bc92e3d407d3bd740cfb78be9c4830f9e5a0",
  "0x71e6bd2972a0e3a6eb1c41ef2e0114ea9cd8f584",
  "0xff3921c0df759c33807a84af52c2ad8e42314d9a",
  "0xc7b3601cd694cd40333b791dad0a4f10c4cf0bf5",
  "0x8eb2f059b952f331b912327d8b5ad84f6f4c0638",
  "0x55ef459cb71cbffe9f5d5d40648c976d75325460",
  "0x5a6132d05557ee3fcc6dc769d59b302dd8e0c4ed",
  "0x48f0bf27793aa0f02f1170f46e08d493a17251e1",
  "0x43b891e7357b36A4158c5d3b0e814400824bbc1C",
  "0x0A26b9f3471731ccA421F7ed595706063DeFF136",
  "0x31b224e82A31f56825632Aef88C34B7d289ec431",
  "0x3d0A87a9C3A31291E6952d4Cb7b154F38a4Bd63F",
  "0x50C5E0d5E1dBa3f0BbDe83eFe9dB39DfC2E3DA65",
  "0x33859cF8182D57D9b517Aa9dE44E6110494e6614",
  "0x834Fa8a973BAf614DDd72E0758ab3A5807156B5c",
  "0xf3c928532d4c326eA8e61FD275313982C7298Ce3",
  "0xF2581125A69Afb1991a7982802C94AeadDACB84f",
  "0x5e8cc763efbdbab79bb1bd2b40abe9a34630a438",
  "0x33b760214603f624ed08c6ca1baf87c5650acc31",
  "0x1dcde321a8a773b2c77c0566b9e3ade34909cbc3",
  "0xfb0042ed4d17735987b9ce26796cdc46756ff1e4",
  "0x763811db838c56a11a22fa162ab5b4dd30b7fe64",
  "0xb105b2c73bc465839464de2383ea90459f4802b9",
  "0xaf9b223eef42012215500add339ed02a56557255",
  "0x05f12a9ae9557956cff342984ffb4ddc7c243980",
  "0x2B838A5a2B8A2E80E965f1Fc9dFED63F1cC269Fd",
  "0xcd161c4e7567add6b4594f5376aa963a8c7e0b3b",
  "0x69a7d39362642ce919c3827303e85776ecaea58b",
  "0x5fe75faea604a7fb95a38362406a28055012c2fe",
  "0x61fab3b691dc0c100a183d5cdfc97b31ed37b732",
  "0xd0a1e82c2ef5fa2b3f94869f572968d5b27b71ea",
  "0xd74e3cf5890a476a49620d2f78fd1b3a1d7dff34",
  "0x7891166124259cf22e66fc49f383fdfad20431d9",
  "0x894809a6bcce62b673f490975fb5208419e61357",
  "0x5edbfda8b21f29d05782264152ba9f52cd0e5c15",
  "0x3f6a41c868fcafb3dfefdaa1dcd9ad022c88a936",
  "0xfdf382e10d233e2152b8e42b2f1e3445a1cef112",
  "0x11099143ed181a04220633d2ace95f1079dd24b6",
  "0x3398455171e9316a7fbf585824aebc9406bc01f3",
  "0xfcf2178704ddb5929b19d98f1f32ee97066f3f72",
  "0x4a70dfd0ccb99ff276724764131c1d5f510c12fd",
  "0xba9d8d97fcd0cdfb04897b397d6ce8f7c75298f7",
  "0x30d1b325af40863b5a8c1b3f24c82325b9103154",
  "0x00c95c475847e71e89b8356d746408226b4fdb55",
  "0x9ec52840f69d410e0753d4b70ffa5ebad722a3db",
  "0x51f84881d2ca9a2e7acb063294843e6b696d793b",
  "0x3241ec0d2e161bf52378e839f30e37eb64dbb135",
  "0xf766698fbfc3cded2417b5244550a4293274e0f8",
  "0x1383a43b1de7dded71165a191b95b0c7ae290f7a",
  "0xf0e590a616ddf287fcc5518418e934206fad4d65",
  "0xf58c3bfd4588d133eefa425761ea3f559050e2b3",
  "0x52938fc48543e216ca452199996685616e5eaa48",
  "0xc70c5488bd2eca4cd345007e14fa2e1cd45da711",
  "0xbfc5f47f2a7751ba39fd798120d814cf73881c62",
  "0x0f9c9d7d064d9fd53ca16beaaf78651a7b292780",
  "0xf987941a8a9697dab01492b15d62c97dcffe2a2f",
  "0xb6ce3cddaba4b0975ddd641120f93c631f6234fa",
  "0xd3e784b15e209704dce023288317c4ff4e955a14",
  "0x442feea58ed534d15b6773322567f8e954563b44",
  "0x70b90fb0083b6ad50c7f816a4914ed3a80d26113",
  "0x7e9c720968a4584ffbf61e45a14560461e042cf6",
  "0xca0970fb71d14672c63bd589065498810b2d18e3",
  "0xedb316b9b8604a456e7a1e03d6587195fbd94860",
  "0xab0e2aada1c0a0b126a9a002f77ebb3d99b45ecb",
  "0xedf301e9a5502537f121c5fb6fef4a8bd76951fa",
  "0x8db178897c0775e9e5ca32785dc391677c82a25a",
  "0x9c5152a0db34048c80457adf02da5d73f9ff6110",
  "0xecddf5398dc6b42ed678efc24813b9868da5ccbb",
  "0xfce4b17065e42f679bcc92e255fe93988cf7a106",
  "0x00f09e8589b6d30c475b6230f627e279cf4eb018",
  "0x3df31c12473775c4685639722612bd330cc8d135",
  "0x2ef11b6d6f6e5d1f1b08406a4c306448d53ff672",
  "0x92d754eb39676da307ca0f55ad9916a1106d8b1e",
  "0xbb6aa5615a16175c0a5d6d169e66a8858992f6f5",
  "0xcca65ea3449566d7cc2f6589ba126adc0c151eb7",
  "0xe4cdb47c790e8c51f94393872505d373b68d6e84",
  "0xf559be9d3b4795c5e585d8c3d92ab6c1376d0ecd",
  "0x481d21b69ead7a6608a88a7b6fb15ef165bd1b0e",
  "0x1920a2f2368a6d9b4e20ee4f26ee42c40b4182d9",
  "0xc3c6fd2f0ff728d1acb999eea2ad56302e333021",
  "0xb16ad69c851cc006c501f6a6b0dd2bf823156cc0",
  "0x092da42945340c8c61b9b9af917ac0071683091e",
  "0x1929a135235b638a9fc0cca4aeb3a200ce3dc184",
  "0xa3922fad57ef839dccb2d2990a393ec61042509e",
  "0xa4e65b2414d107b2e19d1c9af5f49ced33bc97c2",
  "0x9b4c0be7e5d75a99c60786457ec6a7aa3a745d96",
  "0x3711d55efff1f5efc390651a9085d0f05a49082f",
  "0x6911d30cb341d2b4dce5a23e8ec5054c08c7595a",
  "0x863624512c283cf04f73e1d1c5294f1c6d3e4e7a",
  "0x5b982c9edb2a46c82e28164ff57e7e481f2bb204",
  "0xd3d5b98885f912e833b4e3f544ee4f76b074f5f3",
  "0x9dde7ca07ce138916a685323a3b6b4a2c84a6e8c",
  "0x9290b6f554837bd583380e2d157f77a85ac7a68f",
  "0x4703b83a85f65684b24c076d02fedf7c12a3d77c",
  "0x6db1a3dbb95874b1840f37f1844729b6d4872b75",
  "0xcf4d11423fb2e75d92b704f678b6be1fa427c022",
  "0xbe1a25dcabb150b620fea228d33732ebd195397b",
  "0xbf2f831dc1d6f2e5b0d4cd4277b57f14e7bc1e2e",
  "0x6ad10e82bcba1eea0bd82a4bebf2b2152c3f8cde",
  "0x8891a297a58055fc44d7843c0d6d729eb79ef9ef",
  "0x8033f8628be2f688399eed64a6cd8d127e96693a",
  "0xa822ceb9a24bb573c6778b62a5ffcf89a47cfdb7",
  "0x8ca0a0c5a72f6766f70214cf8ca123a283be6a14",
  "0x9a8d4b0f5ba089a03e89da86fc4d4de7baec40f1",
  "0xf091754f55b23fe742dc5bb79bd6569e9465059d",
  "0x30a37889e50d288d8c0d9019162e8ca207d110f0",
  "0x0977a40674e24929296ffc707942a7dbb5a94fd2",
  "0xc2e66c963438e86ccbf68043745a58d8f667440f",
  "0x4689bbc2dce68ab627df8526a4fbd2379a360f34",
  "0x117191fd9bfb0c53d7f01e583621dc7498da7232",
  "0x69df90679638988d1593d2c7773d07d716750f4a",
  "0x78cb8f3c9a36ef2bcd2ab064204bd69190100229",
  "0x7e4371ca3fecc8ee1edefd9c7bb9d65405a9d88d",
  "0xd2b3fca9e20e7ff4189d35f59a3b15ce8c9f65a1",
  "0xc5de997a4809c15b64560b04e1141416b1a2a71e",
  "0x8db293b1707adac247a9b99991a570a8cf690a70",
  "0x7e59c2e03a87cf422b862bce00cc76ab2c4e8a2c",
  "0xf525dbba0cd525170bfb703f705f7b6065c6b640",
  "0xb98fecabd335700e3aca6b246a238a55cfa1db2e",
  "0xcc36d3aeac8c28250dc8d0adcec22b3076a1758e",
  "0xcbed75a2dbf32860d6f86808de986982d2058032",
  "0xa120cc0b555b7d914e487b1e892c714569023ce4",
  "0xb16b05525921fa7351e1fbe22f56be68df76edfd",
  "0x9f5e349e396d51a2ce3f137b3d9edb5f8863785d",
  "0x2c382aa6d22181440ff2f948db1e00515d95df9f",
  "0x0964bad0077a1091d244c323e34000781835609b",
  "0xc8ed6d535d08fc4435fea832c78b866e7ed1f40a",
  "0xafcb71933d8691090c9ddeee61d383a49da724db",
  "0x3e32625ab07181d6aeb583b277b5708df8f198ef",
  "0xd54c0c5ad92984f6c3a4e357d3693e4b8c9408da",
  "0xb4fa80e7e2b9be04a7a3682ff697e364fc19f704",
  "0x939d8f09e002eaf17e10acab804164bece5b8e3c",
  "0x657adeb2ad65b179acf0be673ef4a43b300cf624",
  "0xccf995f644137f787e5a7d74f7cc0b32a5bfe2d5",
  "0xee78697017c5cf0a648afb30da8f271481bf5c9b",
  "0xddd391d02f25a287a6c321dbc9ef43097328f8f7",
  "0xfb408fa20c6f6da099a7492107bc3531911896e3",
  "0x3eb3886f9394ea2eca51ad421423cec159d6356f",
  "0x4b75f755e19ab4e913c995aea4476e4454f05c8e",
  "0x254fc3950474e3bc7b8be0b463fc28ce557af0eb",
  "0xabf67ff824d10d5a91a0493c95b8583b345cd12c",
  "0xa39daa3af0cb4f19cb9f0fe721e4e8fb343d97cb",
  "0x0c745eebefdf11fcd9fd2cafcc6162167167d922",
  "0xdd5ae96db35709ae9762becb357150c3a5e4a57f",
  "0xabfb8f5bacc4312a201bb25e788a7764532b6c23",
  "0x9bdc595eba206bc2ef75b956a69d4de7894f718d",
  "0x264ad6ff3a35df096f473de3ea25cb585a5a9003",
  "0x4b162dd4f93945a64178abeff3c13083e20ee359",
  "0xc12880185407447b3ee0b04e37fd5f075e986a27",
  "0x00000002f32c0886ee65d68059fbdb76ef6a6996",
  "0xebec35d949acc66c833d578aa17948860a53257f",
  "0x425d2ad56ebdad9f2b91bb3f1506ce9198e4c513",
  "0x91a9a1fcbd15809650bdf49c289068aa270e1db7",
  "0x288a6f913ae5178929f731651bda34380a5383d1",
  "0xc1fbe0b38658953df5558db3a6acf88c78a6ced6",
  "0x3acef25922d667b6c516aa71735cb858f535fe4e",
  "0xf0254e2657896cacbde972ea53939d91bee7e6db",
  "0x3ec17d725eeb4c8a7a6e2ac28be62ae3af6ae09e",
  "0xc262047cad44b1468674240c76fd267e3b1e9a4c",
  "0xccabb78215d6e00ce5be8d549edfd9d9ddb78624",
  "0xf5c8034885b10ab81a08cf85a0dbb9a430028712",
  "0xc8d78baa93ff8d4fdd960f13f350b9c5b0728189",
  "0x41d4a1444b457d211fa8e58e51f819d6c2a4fa82",
  "0xe82d5993bf405919b079cfaf9a9dae2368798685",
  "0xc2e89d216e3162e0f8aabef9014cab7a03c5966b",
  "0x4b5ce31dce36e1dab6500366a55a1f4a139dafad",
  "0x73bb1bb3f5f6e0062f99ce37318949528d1a0c43",
  "0xc25f1c2319c34b6978f7be30d585ffd1568f86e2",
  "0x97db9af1397dbdeed5c51788937689756a269141",
  "0xace9a92ee017bb3b01e37da624a2196328e57e15",
  "0xf1deb1ae0b1cfd5c6dc1f0bf726043a4248f048d",
  "0x01d7d9acbdae489c21341c04a8519fa281da1bad",
  "0x85e4dc00f4cd70aff6b03e68fb8bdc2501f8dcf3",
  "0xcc47b1afcd22f6fa1ef36b21579eaf73fc400f00",
  "0x19565268653bce3fd8d05b8919a4c23caff2aff2",
  "0x992f842d526abd8ef8781eba6e669fbfe0148a15",
  "0x701405023439d0e3997a6f6c3be04ce85859be1d",
  "0xe8debde21ba8cf49b481b50bff6f9a9b39bb2f1c",
  "0x535b5254eaf436603d1ffb61beff61cb8b17772a",
  "0x25fabc61eae6286b7b4aac3a61915be833f1e78f",
  "0x9d17c22d5cf9b91b6795ec2973f882c79d5274ba",
  "0xd940a2667713fec51a310f02a4be0e8dd9e0e219",
  "0xda2c3c5027464903bde8e6e2450ed30168ddd73b",
  "0xdbd61deb41386fbd6748a8648a8cc6ae28a00905",
  "0x9133be63fd60fa0318816f78a5437418d96dafc8",
  "0x0a56e17e0e80343b28bff03efb5968d9ff2fd615",
  "0xe851c847e4f1523b9425d786f39c74392e8b4020",
  "0x13091531c478bbf81ac2d7ea4e42f63b9db2385c",
  "0xa997f3ec8d0d695fbc72c0c017da07719cf1df9d",
  "0x22f79923c929d1db364369ce79a1799c9e3102d3",
  "0x797e4b24d364be0143669f15a22336981f3a8c33",
  "0xcaace4308960dd937c1297e1a4859762a5bab274",
  "0x89ff951e24d8af4530771adb3772ce90ee7908a5",
  "0xa2ffe2dc2cd832ae4fb1c847a7faebc9156a61da",
  "0xded508384abda737c527fc15612d14c3194db1db",
  "0xd1ee30158bab2a9898126a62282d29c8ef73493e",
  "0x259331c2188f2fde46d382d23fed9a4e08fd4183",
  "0x192003899f31ba54e062f311548b94077b5ffc6c",
  "0x83884182ccec18102ef975a808783d1241daf879",
  "0x328a921413d9f797a31b5792a7e485da21cba494",
  "0x7d123ce695110d77acf45c48a3581ec2b5e24305",
  "0x23effaa0abac138af64be4d02426bb58848f5acb",
  "0x26fa7b9c29079bd3d73271abf19993454383ecdd",
  "0x34cd626ead2b597c7b89a233d3e03028fb8c0286",
  "0xc3bc89e8f80b69534e8adceadc35fe9ca1064270",
  "0x54e801f18b21c4ebd18114f5f5fb06695246a9c8",
  "0x81a7bda3c549a9246400e412835c7ac2fe62b55d",
  "0x139dfe83d4025fdd6d152b3c42592fd6e732d457",
  "0x564af06c6e074311e6966e649a089b4bfba1f1b3",
  "0x3e2e0e7ad6958330f7762ca345984cd99310d53b",
  "0x396b87fd8bf3e4e39d6e587cf71e258fce477ba1",
  "0xb106cd2a9ea901934e6c98f41376f1ae3c2df8cc",
  "0xa965769a912eebe083dd7de1ef009adbb2cf6eef",
  "0x8fe90e1618b97f30e043107ace36af91acd1a1a3",
  "0x6e53cedd1eea65c6dbd04376c1c047fe1ff2039c",
  "0x3244c514fccee1394817a6132a6f76f9fe1e9321",
  "0x1699071396b7363333c46514938aefe4004fa713",
  "0xa84cddcbdd83d2aeeb38a9f87b08bbb4551fbe2b",
  "0xf7275aeaca2a4c35c88c93f4dce3b45e814d5678",
  "0x0f7254dda822ee373aed2bce88bf38937cf55a77",
  "0x9cd2a6bfc29b0cf13a0fed07c20ad996c6eea557",
  "0xa1e28c7bd083ae215e92392375d98f70d947db3c",
  "0x5355e735a4e92d4b7b4af9cae303346075e7d71b",
  "0xec43d8e6433e1bb63e2d03bf5bc997f3bfe80ccd",
  "0x55f15b65ace1e2e1460968e5e64dbaaac845c4aa",
  "0x50ea491d54893720b0f816746d1b4ae7c6601733",
  "0x594f49b52400db1d87c7db3f784be20d50972ae0",
  "0xf63d7dbe24ca439ebc699311001a661555a93040",
  "0x2617b610f7ae449339720f71058170e46ed3ff2d",
  "0x1a204040bbd6eaaf3ae6ada7f2d0a77c033fc862",
  "0xf606118fe3a90a6bae7e996e68a7dc131739691b",
  "0x23631b12402fe1b2404fccfab01557269b0df108",
  "0x53ce838d63763cf6272b22ebb8c56feff775d983",
  "0x3a830ede877ea80144f605b0bfa0a2e101ee37f8",
  "0xf1d63e272025b09c58faf6822bb2679397b83579",
  "0x103eeb2776a9ad7a8e6c6d39b2dbb2540d13cdbc",
  "0x5120244caf6eab04e815ae2b7ea03dd6c36979c8",
  "0x54a331d363a4e352506bc9813356955cc88c055f",
  "0xb4f253819c7e30025f3c7e2ab41c59d1173470f9",
  "0x42f1dc24dd3bbea5d9f10b29873bf660b4336944",
  "0x336bee0e2dcdd4f9f292f4ed175aa9264e2690e4",
  "0x2a91ef328b250d72d2529e4da94b68cb6c252f57",
  "0xbafa8668b54b8931813915913edfe08f75d7ed17",
  "0x8ed65095ee88776f611321d7ddfd36e8ad688c2f",
  "0x6634cee5ba0b365df766151afe2afdba1299d5f5",
  "0x72a45709ec5d27bbd9577e01699ba755b8b11f79",
  "0x0ce65063741383adae966bb29dbb6b1ae2e9930c",
  "0x93e467635826200f350ff4f8be092278479e721b",
  "0xe6e1413a350d2a5ea58791d328d77f4a003f4b73",
  "0xd0abac5ac34e004990a549a769e0cd33d69274fa",
  "0x0c03e139c7d96633a079034d394c5395e45931ac",
  "0x51896bbc516053487df6268a200541bb4b4cbe3a",
  "0xfed4a3ded63c2a89c2f58ee2cb3028a1e284d799",
  "0x5bb993f7cb0821a29a2810c5d5fc2ed77bbbe720",
  "0xc3e4c1833814caada0620196ae3384b29371d94e",
  "0xbfea5db828656563592fde179468a142ab29bbcf",
  "0xe5be2fc8bd63da6c71733d28069516a43a00b4c1",
  "0xf7544d9828183e6718a1997c8d39556fad9e42c1",
  "0x13e493982cb6240a1e7335d2b7534e2e7782eb49",
  "0x189fa6fbd58b2c13af98785512e40e0ae79d2196",
  "0x015f0cc47eF8B3872dB1F3f7BaBbc0bDC215999f",
  "0x31327eFFEA4cB7b103e4762e8ba995159a148044",
  "0x92A76b0C8Af74FfbcB7E5917469F68bF5a33Fa0F",
  "0xDEE9B19019f6a5Da266a7450911aa4aa6de485aa",
  "0xA620451cd9e6b0c25B2c5e232E65d80bF94E24b0",
  "0xcAc67cf89B81f8dA81Add6e8b3361587B52FF0aB",
  "0x4a437b6078Cfb41bC599C4379A9D27259F1948dF",
  "0x4b94702542cfb029492506c176edea4c7576c4d1",
  "0xab48de856930c018238c226d166feaed3541ec7d",
  "0x68fa11d6e7c1f3b342d480621f72e9ae632a9999",
  "0x5f70c301d3d1d15c9f6e91ce67ce77d48689c6a7",
  "0x6551d21efb501bc3b82a8adff7737402b298c4fd",
  "0xb425e651d1d8c2bddeb9e4c594a9e4af2e4c1329",
  "0x8750c7ee7554142aafaaa254bc4877cb96881863",
  "0xd890d844d05840548ccc8e76d7cbcbf109d33d03",
  "0x81de1b9e4951a9506bd9d2d6a52530075f5d1725",
  "0x1f175b78b2bf62a5ce3caf4e062399aba6228f2a",
  "0xce76de147b735f7f49f1e752aa24f6022860e54f",
  "0x6fb5ba2bd0d499a11234fa050ec17ec2a9b338b2",
  "0xf5c10a05c93254c658fb69756e31124b6dd8ac4d",
  "0x9c2734f019103bb9376d1aac5dbba077e32d2e6d",
  "0xb7742f460a53b98d651ffccb7bfd8d0c684c4815",
  "0xd17608e9b9acdd399983888ac6d64c45e5fc6f9d",
  "0x8dd0eb4ac9b49e2193a73d0f77f431acc0af1b37",
  "0xc6e163105856112343450d1a0aa4578392f5dc07",
  "0x0c180a3ef506d9a2a914ab4fde9a8d3c3d0c9f45",
  "0x99b82b1cd52ee82b455acd549cc2a2a8374fc946",
  "0xfdffb6506821456bc3136b0fbdf20ef0918d5f5c",
  "0x065828453ab06b0e276b261f51f4b0840f0f0d3a",
  "0x97cc3a4a59c4bb55a5d36b90d8a5bbfbe86bd1fe",
  "0x181da0f7459ef1ad5247997d37b2ba545f7d5eee",
  "0x3b0c9bcf2e4f54fff1996b99bcc63ac953567e55",
  "0xe1782b766b47ce6ad9915e843d7ee8ba195de263",
  "0x2ce99f178daa9c3ac5a3ac86e22800c5bb011739",
  "0x708fdf3f53b49f0a781178e470210b6b49481cc0",
  "0xf946112ca6e83872e112be6f8e55b6824428f8f8",
  "0x4ea58393ffed8af72e3c0188de8fda3f8774fff6",
  "0x1e89b9f51057e7f5041aaeba64bf696a53fe4904",
  "0xaa959fff27337ae4e4e2af16ce353061b3e9f5e2",
  "0xf72a4eb9da7e1361069f726b2a605cdf98b76006",
  "0xb437a90e59785740a67fc5376180acc3b705edc4",
  "0xe46d16a85fb3162c16c9d1be28d24c4f7263145a",
  "0xd5e602342754b14d8777f48ab418f6977e18f745",
  "0xa2b3bac969f034cc5df5a517a7f3660ae5c15bed",
  "0x4c42e1578bac82e434c211a36d40bdc8d4b3e750",
  "0xca8529e6b7fa6b99c51321b950b831d228a77ebe",
  "0xc62e803f31c240c384aee9874e1566558c3c962d",
  "0x214fdd39774f0c4df20f1bbcd4cef5a7691bb163",
  "0x2a3bdbf89e70598ebb59e30b65f05c55b476aeb3",
  "0x3febc94818fb7aeb5e44708e6e3d1c11fe7b893a",
  "0x54c82a9b250891fdedcee5025c3ce519efd14908",
  "0x90c2865dc6a5b104f671b4ee23c8a1f2e984c06c",
  "0xecc01fc7ae3641121c9e152765aa6e85e5fa4e38",
  "0xfe8a4fc7f1497c3f9dbd7fb5a570d1ec47ec51d7",
  "0x9912a0a767e06566b356cb17521b3e3c13ecb4ed",
  "0xfe38bc02b35b58dfefce4525a45cac282d8217cd",
  "0x39a25fa6fef736fd2d0b00f75a84959ee28ccab6",
  "0xa92ebc1a8856e938ddafa03d76b8ca1ca37a5b59",
  "0x942692273838d1a2ce69b527d1576dca0ebb318f",
  "0xe0d5d69bb7588fb7a558e54b4d5cd1e3cc5ffe68",
  "0x6e0bce6076604c3940dfcee10fb339f80b388601",
  "0x677e230f0949107867cca9274d303bbaaca9c7d1",
  "0x1e2b49fd53ba48f7a20a0e4af4d700caa325fdd1",
  "0x6659b6a2019b49547d59ac2c7ecf6e635e3d8475",
  "0x45d152df423c8cbe3772665788c02ce8c99fa3e1",
  "0x1f748e30f06db21c0498ec19a3e23c46b9609333",
  "0x2286d8d8799291d2535cc52611ed1b39d9da8457",
  "0x08b8674a33206d826af63319ff889b0e8052d34d",
  "0x23c4c916d9908b84b64bd33b479fdc5578e6f636",
  "0xf2030109c83a0db1e5763be37326825dc8727b9d",
  "0x76f0ea777e302b463018e56e589df347e4c6604f",
  "0xe59455b7d61dba7d70db666a8930d4152400e9a6",
  "0x29c8f19c2e546364ed1164c1f35badc3924de278",
  "0x3fd2e1d8874a0fa3c199827d2e907a245bd27f35",
  "0x77a3a208bb414e681091e76f406ad3aadb808ff2",
  "0x8a328b51b718a2c8fa846118bd2fb141b034aa86",
  "0xeaa5184c13d208500ae678bd3b50068701096222",
  "0xeaf3262d52237244116f6b47c70412e934345414",
  "0xf73a1f96defdbf32b6065373f3cf88eb334e234f",
  "0x770f3f5e832cd7b8dcd86b01533c7d40105412ae",
  "0x3a5c3daf1e495cf61aa3b146e04a7d170022a85c",
  "0x64f56c581eecd11c27e5ab454ddfcd7cec9fb37f",
  "0x769d99c2c1e8c9e83ddcdd8ab1a7cee4b211af04",
  "0xbd94fef81f1aee361adcaeac035c7eacbb8866fc",
  "0xdc0d0589b4b1c125ba721306288a550b8040f3b5",
  "0x9db6f7d5c313b8c8356a46cc045ce896870cf752",
  "0xd6fee0333328074f75a5c08672bc598961b6441a",
  "0x3c060c316cc4c4b41960b75b2e6f8a6853a5972f",
  "0x99eb2f3e0d60fe1860cb09295db1b6672e4e7aff",
  "0x4dc763c4591521b8d26852431ccf985e993b32b9",
  "0xb878f4275aa660ecf2c468b550930fdc4cd24f2e",
  "0xc4353664515d7b98279a172f9305a81c5bd5893c",
  "0xbf1a30e8788193ad1fd3f2436fc71d1438604c71",
  "0x90c330bc3a86ed29823a77849859775685054dc7",
  "0x8fdf9a7cf1f761edd912eeddf8a0dccab6ae63d5",
  "0x09e62eb71e29e11a21e1f541750580e45d3ab7e0",
  "0x391f047acfb94bc8b935628a875baa086c5a53c6",
  "0xf49b41be92bb9fc7f985abe6a50f522ec171fcfe",
  "0x8830b1b28f7334ee018f1acbb7bd4a450be5aaac",
  "0xc38784135da92a33e0a915d940a32ac0c5a5f5bc",
  "0x61195d916b8c1cf1b8e9f81b1fee8f8cf4bdbbd8",
  "0x5d75661dbdcf880c89847c9b672a3d4ac5cc5cb7",
  "0x188e0ca53fcea80a234012e27a22111b59988888",
  "0x1233c6744a8732345b7feb2136ca6dee8e3b226e",
  "0xa4f806d0cb7b36e55973578e2b786ebc681483ee",
  "0xd60904f58fb67c1d469ab5607100b79877d8350d",
  "0x6d2e374df4a1fd48478c0bf13c1a1aa3fc773fb9",
  "0x089920a4a315bb8ecb9e426d26341f6c5a63e3f4",
  "0xadb75b07a6fbf1bc6de7455cf353cc71f20782aa",
  "0x20b9cb47fc8c374702e3aaa113c51520a2cc6f15",
  "0xd732d553192277f48d591932d3f4ec7a405db191",
  "0x4ae29df63d7047238cb91fa03c76ec38c4e1a623",
  "0x000009ff30036658300e2abcedde1020d5e662cc",
  "0x2b2b6026dd5df981d6f111a83d1b5698cb4788f4",
  "0x298afed99cef993ef5f5915a76f363120f1e8307",
  "0xa1de09624ae4d371e4ed5506fd8b12a3754953c2",
  "0x51154545c3c256c59e4ca250a71a3b200a3551b8",
  "0x23fbd55350aeae184d71a44f08756a6a9e8039c2",
  "0x5b70e4587a5fc8e35ebfe6548f2b3adb1724f02f",
  "0x2dc4ad4679bad50ce054796cb44b170b3adfe9f2",
  "0x153f21fd6e5633b9faa35a2aeaba65edc728d9e0",
  "0x46f631f2e3954e4732142fc2ce18598304d32b69",
  "0x09d1a13f60b8833d304b24f462b86a56b0c3e616",
  "0x5abf0e028ddf4e3a04cbc98b86084a28c1d200c7",
  "0xff42fe1f748efd319bcdda48eaa9bad9b3ddfdc8",
  "0xe688a9de74d049c1dc580ac9a8fc1b6dc4106983",
  "0x9a7fda076b0d371aadecadc0c3be315e12eea0bd",
  "0x866bf13d87ef42845f6715acf8f62f8321381364",
  "0xf102985071d60689e3c3ed676d506e4c20a6beaf",
  "0x289615c5c4d1c603396754420fead78f78b17874",
  "0x6CE9D57FEB61CbBe2E4F69De0485cE096BC3Bde4",
  "0x8694b1eed5e83ebdd06d82babd2c84b7944b5e45",
  "0xa36e5ebce35ad6e60b1ea2bfebe19df8e9ff2aa9",
  "0x99563ce4cbe681777adc2fb7a58f00e308e25b42",
  "0x440f85ce11bbb56f8dac766100d9d239b19fc064",
  "0x3403b4de3947b3b44e6feca581994f89308d98ab",
  "0x8f3f94e32b3058f925494bde2ed42ee7735af592",
  "0x0bf4db19f4eac2b929f36a9ad23a675cc9bdd410",
  "0x2ce87085edbb3350b1b2416aa2d6fcaf9850b1d6",
  "0x834e1009f2442cbdf227746a798ebd882d692212",
  "0x2ee9f5ef675e3c95b5e54cf271bd9a707a395f8d",
  "0x6fc4121565a29e1597a6060523466c5e7899000b",
  "0xb7eb60cdfedfbedeac02ebf7bb572ef27d5aa1c8",
  "0x76387f3603ee5c45c70c28983f42cd7289a1f6d4",
  "0x524cee97e7e4ad3f5f1bcc502f6d9b39c8204b4e",
  "0x099e123a5272533507ff398b3bb2f99dc9915e33",
  "0x74d17bdd287487ecde0f6df19a6b3805fe4f6a25",
  "0xbb809ad7a6a14d4447d9ab43eb1f6a374c0f90d3",
  "0xebd0f973d199ee5f9c4dc7ee800233f1f1987ad2",
  "0xdbc04f708802bbf7cc5cce1e35f6652ddfba418e",
  "0x32cc8e176e4a65cec4e4c50fb2e72d9c022e76e5",
  "0x2e7f4405ab6f7a151f092b9b9561c7d319450948",
  "0xc931ebffce5fdaeacd4bad4aa328a21321000661",
  "0x1b730429b429fa4745ddfec0c5c17d05fb152a76",
  "0x8d773846e2fb8485c781e363376021c1e089290f",
  "0x7b45b0452b1764cd4c71d272d11f02c0eef6ea5c",
  "0xf06ffec08cc488992f11466035a0f6da4940856e",
  "0x3fe019f3ed2a1361a29553f10f50f78cb82c71be",
  "0x217ba06dc8f2dec12a974a41ed654fc80426fd6e",
  "0x0df13bdd90340dc622866b7e5d9acc8c2fa1cea8",
  "0xc3690c919d250d5c424e2737681616c93295cdd2",
  "0xc082169c0a0544ac3df82b6d2609686caccc5da4",
  "0x13192b1056ed57eaa06bb7e49d70964a668e8604",
  "0x6081f129e21b0d26155ffd6719a9265705e4b4cd",
  "0xef76c50a8d85fc9e8063daa77fc65f03ef4a12cb",
  "0x61306196c8cef2ebf19baadb771a501de86fa6c9",
  "0x0cee7e4a57af81b067d044d657f095f4b132415a",
  "0x2db347b7dc44d72f6be817b13abe367ff80cfcb0",
  "0x62fd0e9a06a4a11073bdc90ae865490968ee30b6",
  "0xc3e8e6103f37ab34222ae020e8a42eeb6ce36c74",
  "0x8e276f7c55b536c06f9925d73493f41b736f733c",
  "0xc889fce92f9a29b29f8bd28050beca87afe594b9",
  "0x3d82178d6a9fd057ed23290eb7b0c09594e8080e",
  "0xc32438f7e4d3444acb88c23ecdadbc9989acc344",
  "0x86f73b25dbc873bdc458cf83d7e8154c3322290c",
  "0xd012b337919d7e85fc615de7805fd5b27a07d8ac",
  "0x75c9f57c0efd5d4fce675dff31743b64ee798773",
  "0x541dde5453324be302d7deb1748c23cfcca555c9",
  "0x6b108549b6738d20d181d5e643eef297f0980032",
  "0xe343fc77eff7cb5371ddcea5c1c1cf733b34e11c",
  "0xa4fd9c62c3dcfc0b865ec2383d69b3df64f7f6ed",
  "0xb6b86383831056c16b996cbfb3a6424e7438c6fd",
  "0xc3686667391ad353f5916b0a75cefc3012b2b012",
  "0x97e1c0d2055121dc5ca54151968e56d1ac56306c",
  "0xedd22d51b5cfae903cd28451e341205ea76a73fa",
  "0x2dfcdbf35e5b39b0be847beaf15ed61c3d20cf1c",
  "0xf0348ceecc7e825a962b2a3831c517a91031f72a",
  "0xdf35f6356d868e89f142d54a5197e3813d3e6011",
  "0x50bf1df7f530eb3f6bbd2479c792162f204df1e3",
  "0x8443a695cd3dff8f558e1f40d486a2e13da0ed37",
  "0xf1aef25c4fe23941dd7145eb88ef24e2572ee0ec",
  "0xb31e0f6d16e55f543c68ab430695526b25e209d8",
  "0x19c927dfa825f9c5ff8353252d38daba36de3215",
  "0xf921ab1fe45d70f47d592d373bda2fb738b9cf84",
  "0x0174f45a2f2506ce9cec3580bfcd24a493e50a12",
  "0xa8928227a411d13ca6cef679f7bd2c539e5db00b",
  "0x019e1d9407ab07d1e470540deca1a254be68d0aa",
  "0xfce5a8e6208e4e846f6dd89ff261da2d1541bb38",
  "0xf0dff3a6ac38931ac55a7828b32be10336bf8994",
  "0x97be21d1f50a3b314040f1a58f6023e4f99cc132",
  "0x0973bfa5e2fbfe632d5bb6c6aaf31cc10ff5676e",
  "0xfc211d4527be60bbc557c26c004efb2dec672a50",
  "0xfb4caa1acbb9ca7ddbcd176c53ea748d2fdcb204",
  "0x6a4d7250034e412a74d73ea7638ffbf8ef5d090d",
  "0xa226b2b5b4841819391137efa6e709b084500a5c",
  "0xdf6ed369a5533242d01f13ba632c8ab91bf76f2d",
  "0x339af243f6de5537f171c32df869f4ebc356635d",
  "0xabcd71d32982c984417785ae18041d8f4712e585",
  "0x5f7a774974434b4f2e9996e459b8f335b6544dda",
  "0x99e5c192752dd8997e272a92b56f0a0c9773c67d",
  "0x27ec077c7bd4b3bd4c317bcc6355be7386601f94",
  "0xbe428e7eeb353798ae0186196982ddf6ae022b3c",
  "0x3b1bfa50a45b35340fe59f0008c513d4c6675720",
  "0x2c82389e8c200093ed021ffcd639bc5198173a77",
  "0x35559efd3bc506ea37985a2ae8b3051b9ecc91e0",
  "0xdb9787a3c60d6c87f443d5a54f2de041902735fa",
  "0x6545e1777c42dc3363f674b75abab36c05602ea6",
  "0x65b0424d7c56f19be0dfd2c9c5bc6a3afb0d3e4a",
  "0x48c254ceda9753684c2dfc057b8b3b7414a85fa9",
  "0x8f426cea7d2f167773c31873152317a7f897b5dc",
  "0x5b0005f236cf28524d4bce07a545cb157bd64d86",
  "0x22febed9072c0f648b34742b3f6c2d9fd527a8a4",
  "0xd8821657ec2ff38d5eb7fe3688184bb0da4b4b40",
  "0x6c21409e563d984369d2bc3e9509906d2a777db2",
  "0x40fdc3dd0bdfb5146d63263b0280150ca61d2b1f",
  "0xa01746ae759663148766bb2d1025ad40d9b5a510",
  "0xbd18d7095eedf31137bc04671a2328ba2f141e9f",
  "0x8cde3eb3ec0d56bd8989c83129b224f931acdda8",
  "0xc36f061773b4ebbdd8392bb2b39cecdde3ffe29a",
  "0x43e1bbcf16cbbeee213efeeabe3a155174348e42",
  "0xcf9cab092ab6bf960d7ae4177f0f9a9ce14fb2c2",
  "0x4b6ba3a1fef3bc017a8c941616a71886b597258e",
  "0xdeb381dc91752235e22123bdd40b096e5389b918",
  "0x18855b681a2fb4bcca821bde693e68507725c3f1",
  "0x21a935910390db5d72d31ec577bc62596a02e1bb",
  "0xb1a75ae2560cca8c8c1e5b9fe826ab7325e197b9",
  "0xc2da7c457b3ed27f9fb822e672eb2335ecff46ed",
  "0x1d7a05e034a20f80eeeebaf8c8dc3c2a00288c9c",
  "0x69351f409298af6b229b2d632c0236c06009ebd4",
  "0x0126272754430ac70104e8ae54c8b0302aadd3ed",
  "0xe043baf984b69d1cb3e336eccf86a988843413be",
  "0xe5c6f1c10af2c6c545f60c447e08de4aa3da4237",
  "0x4775ece875f98b7b76f6340d31c176ded89e6751",
  "0xf41ec7f4082782a67fa641b5c8a60fcec7d082a8",
  "0xffd51e3ea3629e0493fa01664dbdacddad3d283d",
  "0x59813bfbdccd9f117c66eb8ce8c63b9bef4f6390",
  "0x7fb8d9881cf3de50cd66aaa88e950aa98a7a208a",
  "0xb772980e2d22bd02988109b50345605ff75983b3",
  "0xba3654d14477f42d0ec14896f0ffffe01abe0d1a",
  "0x09de263e04b948e2bef108936778fc1e89fc272d",
  "0x855d1eec6b8370fcaa7f9d6f7f82397670700ee0",
  "0xac55f7e64add6a0c9fe668e2b3d25dce85f81484",
  "0xb5317b49e68c316c6722b875195580e4f68e7e7c",
  "0x331d6cd78272131ef15b24b0a64da3a7a1233a2d",
  "0x18c51e94d7b1475ec745c8136870a8daa58c9db7",
  "0x2d00c8cd4d941b9b6467b19e3c03c2445ae3a5c7",
  "0x0b49621caccc771d8a197ad3a4cecc7561f957d1",
  "0xd62eb7847d29b413c328c4f3cf730cc84e980ba8",
  "0x8fdb12c76e68d2b2869b246f67dd10795f3bb37a",
  "0x4bee039b8081ebf03fac126b76cc28745a802f1c",
  "0x3c5a902058adf56001a84408d44a499208bb2613",
  "0xc196cbba35c8a568ac14d3afc1f26986d7266337",
  "0x58ded9be7f447ea3f5737adfda3948ba208ecd4e",
  "0x9fda2cb758983cbdaf891056e6cf7410d271b461",
  "0x603d06dcb13fb5ae2c7bb38b0034f63f736a740d",
  "0xfa4453b1d6995944959681319b94aabe86b1255f",
  "0x7f29ab9c153072cbf6b101f8c79230b80ad19412",
  "0xc05d8f8855f4c7bb17f5aee85ac45f88120ee936",
  "0xb7af638a765b35c1ebd5a7a90a7155209921028d",
  "0xbc11389a833cb67e42d1cba648efa25917dfcede",
  "0x3b98df607682cbb1c7adbca6049a40980104d817",
  "0x1a6625f712963b483d91b676ebfec5efa6710409",
  "0xbb38cb13ebcd93b6eb9ca9261de4c439072b1fc4",
  "0x346abad91b7970aa9e14821ff3cf12bf0caec74d",
  "0x38704955b0b8d6772ae5ca278dc6725e4c5d8022",
  "0x850d8bba36a0a6a69005ccdfb36eafe1219ce9fe",
  "0xe6022eec1106c8aaa147a85f2a7e80f8f570ddbc",
  "0x89389314ca8c231affe394c92fc7abaeb9cf386f",
  "0x8c2164a39e22990c4bb38638f02636d811ebac6b",
  "0xbe530d269770d0e1429e259f7cf51ec6da50f67c",
  "0x4c15868e85ab13efc18203f2df883f363ea3b958",
  "0xc4863ebd54ed653b038583ec95760cd570041f44",
  "0x566eff8847f8375b3fd0316fdfcd608a53e2aa17",
  "0x4c1b933698a361e061ce6a46206447de6a3e2f5f",
  "0xa9bdbdfca9bb34cd1023b21de2acacb6c5081236",
  "0x60a9827b3fbdff260d0296f5b97f2851d5166eba",
  "0x680553284af877e0da1869cc9f066e75fa7c0916",
  "0x2d312498a93253b78e85ac212822f33c502fb503",
  "0xb5a09b804812bf3b02e005159dd6ed1dbfd1e826",
  "0x56bdf029d03edbc8bbc7c7933000ed1556b5445a",
  "0x03eaf4acb156fb5a83ddf006fda4b72c6e9a01b9",
  "0x8d7c77fb34469056124f1a36c5d323ea6773bad7",
  "0xbff3c8c2e2e0d94c8cb487cc8ab9a2c620350279",
  "0xd0bb59a04ef5a4c639f52af4c797e2b5713331c2",
  "0x91a8dfd8713d2dc6cc97a733e7dd55d5dde8f619",
  "0xb0f24272f67d5ef9c093e8c14f7620752b26a2cb",
  "0x110b8c2a97e5030998675dfc3e2621c57d566a2d",
  "0x164517fdd4fb50f0a1e8100b5b231c9c93e2ebe1",
  "0x16a5afe4d700551bd86d89d3903900c216cd3f84",
  "0x0ec8b5640448efb95da60f54a8ad7b9938840583",
  "0xe7448d09ac439d3735a162c937de5ac7f998e7de",
  "0xe3ffb58c912d948f278b67b595a5d09b4dc89e10",
  "0xdf5d71e15c9d0cadfe4aa4efcf5107036c68d202",
  "0x7f8d6e3bdf484b1dffced3dd72116cd3e4302d8f",
  "0x8ed9a7989d14e480243b9f03d5a3046492ef60de",
  "0xdff8ba45eb9a34074c1b2e14d4002add0fd61a18",
  "0xe5adf62843d76514d861aa224e677d1971b4df68",
  "0x9e04af2102bfb4c7a6da7cd592161fc7db90e92e",
  "0x52c7329011822b8a73d930279c5c71c0fdae9fc6",
  "0xb2e7fac93a1b55b7e0a78c12ee987b4cf3f7b83b",
  "0x9f91d5f514fdd8ed7cd86bdfe226e8f8b277fbc8",
  "0xc00bc8a06efbe836f671fc56e7accb85fd57a9a2",
  "0xf2ea00904fdbfece0b0922437b2f433cee07a625",
  "0x97d0305d1d788768ffadf964c665d10bd11333ff",
  "0x16f610963685142e3090dc7408f2c7a187a85419",
  "0x5de6a36a59ebd7b01ba4f820a0349e62485c0070",
  "0xd26f12753603d78d0c16ee3e30887bc5e622fb9e",
  "0x0c31095ed00a65604649237e8df180adc8f81dda",
  "0xaeb8d54c846610e7fde3b75b49c9a9e84b45da4d",
  "0x30bea732635084d3013cef764379b1fcb7b09a1c",
  "0x41a66316528c9ba0b89e2b118e02189e3fb7f184",
  "0x333a89021b97eb618e7b3d76d0ce7f89e224f88a",
  "0xbd6a593b9cf47af74782db131bd97e70894551ed",
  "0x647f26328517e355b64dc4a2338c493baaf9878c",
  "0x3c61ea50a08a696ad452159543a692347bfd6830",
  "0x007f08b76a0ce33d105a796f30f91c98add9496a",
  "0x30efa8eb7bc4f17fef4b02189330a5631b75574a",
  "0xd4a509490b0328a556a30b96c916b3bb3db2554b",
  "0x7786562849e2184f2f19bda6d73d7516b6a97318",
  "0xefdbd2caa333fcbf63c0586720ca4849657dc005",
  "0xaec24b9350646e9089250c8316f3dcea9d9dff9b",
  "0xbbb13547a7686d00945e2b92c45dca302a07ea9a",
  "0xd7a42111b76c829242b3b849f4ba4e015086414c",
  "0xa8413d15c3f0644ffc9d1701aa6b4d2cafa50b94",
  "0xc761f75e63d4904b6782287cb4b1ae5f5ce839ee",
  "0x8c2357f19a070c747616ed9e112ba74618745ded",
  "0x0433f1eeed93d7cd38d34f86f39cd3aefa1633bf",
  "0x8edcde53246001a82f68fab21705ddbf73829860",
  "0xbda0e2f1c7cb2d70a3ae8877b4a9f6e4caf57ea4",
  "0x791faffa8beca825d0b81ab567935f2dad503d21",
  "0xab18a4368df6b09236839ce10af1f86181dd58c7",
  "0x645939dd7b8dbf4486f8859644234d4b2460c959",
  "0xb61327771866a65a3ea927ce1e43d092a2dd2eaa",
  "0xf0bc5dd658185523671aea1a59022976d55677fd",
  "0x7f26199c184ab43ac297b5e48ec445d6eb3c2828",
  "0x6ea8233d0ff9ace7191017878ee77dcd7c6022e1",
  "0x157564022e9c518d6163d075a18359a6e976fd12",
  "0xb9d5c643b3537915762a619e4480bc87a0402d4f",
  "0x3416e6b21d6a2d1911aaa34c544237d7692e6cfa",
  "0x6edfa04b8a174a777118aaa81e95fe8a7dcce014",
  "0x68b24992f1ceba8be954166b48aecf4eda8e4099",
  "0x18be4a099545f15007c38ec2c195649a52b9d828",
  "0x3d53209ed55265a765259f00b6b9ce1ebb7c0583",
  "0x63efd67074eaa2447f7a2af7b7f0a5bb434753d2",
  "0x99f33527688bf8bc60935140cbfe31633c6fe997",
  "0xc69751dcdc504ff6447bef3b76ad2fb79719e216",
  "0x5237c5bbe109cc23858fff6c6d7a7d13f3137ede",
  "0xb611bc7f6f070a0d766c47c9c08121851fbbc009",
  "0x8Ec6507202854a74cC8Dad07c9bEa9cb1BADAb87",
  "0x18be4A099545F15007c38ec2C195649A52b9d828",
  "0x97BE21d1F50a3B314040f1A58F6023E4F99cc132",
  "0x9859D26730B47406Bf034e9216634336EF0fD84d",
  "0x331d6CD78272131Ef15b24b0a64DA3A7A1233A2d",
  "0x92B8260899aCcb00A8094aBa038EF48b17D42D31",
  "0x3D53209ED55265A765259F00B6B9cE1eBb7c0583",
  "0x18855B681A2FB4bCcA821bDe693E68507725c3f1",
  "0xAF6a58AdEd7d46167957F071dD647519f1b3c964",
  "0x13b8daCBED3be5709d6fF9639F185585B5258C9c",
  "0xEeEff169dB2b69D530e7B912BA079B77D9145B3f",
  "0x2dC4aD4679bAD50CE054796Cb44b170b3AdFe9f2",
  "0xadadCC82683dFaE2622Df86900f9c004bDc64CED",
  "0x824F971261e922588F6c0eA3D19fA38F993d3e65",
  "0xD89544d9f8b40a92590D4f27ad68Aa3322128960",
  "0x30aa88da42006e499863329a857c0b3812a9dc1a",
  "0x8f80bcfb60775f92a293d1a309d5cce6a3a211e6",
  "0xfe075135c630b3599483907cd95ec3ad5d0b9a67",
  "0x263bf65791200f62ddb4ffa4b7fb8fdccdb1694c",
  "0xe73ea9ebe0543c28606ef7b4ebc35bb60980c1ee",
  "0x77ad888809227a4aa4fcd2eca1fe75d1162b39ed",
  "0xcf1dd1cf76d8fbd7dc5a209443812909c9823b79",
  "0x2862439166acc0f6c47a5d3c7c07a8d4e3eb5faa",
  "0xd82e5be41d21002d8e1f85dd74c976d6528f48c4",
  "0x979a0e1e98eebcb5cb8a008fa47f91459e820129",
  "0x44c577671ebc29b5308828f6ff6f29874be01b1c",
  "0xced9d6a1935dfbeadf741a44f07317abe9e5cb6f",
  "0xfffbc996737fb3e30b95dea9979ac9d28bac480b",
  "0x88e2b965618cff0ddccaff70864accdbc1c769a7",
  "0x537d266203e8e9e864cbebb4fa5bbf4a973e9760",
  "0x5ea46525f5eebc0dd2ca876afa3fe88835e4351b",
  "0x3455ebe9c67596cdc80f8a3009903a7c4b9761bc",
  "0xfa52083627050fe69b3d1f917837fb4037172017",
  "0x2dd3fd2f5e0a7e1481431e567835a261c3a3b53b",
  "0x44e2d735f7ff51bdbac5719a0ef44ccc9530bcd9",
  "0x711d58d28c0d6755fa69277bfba3c2a2b0b1f570",
  "0x75b44cfa737b642895381db781ae476f396971a1",
  "0x29167e2e54b62f936a18c685cfad2838287baa2b",
  "0xc9aabcddbf8483e805005e560fe2aca10baffac9",
  "0xe4094bd7227958c7ab3390282ac0f0b88ce4f334",
  "0x200880ae9b8c9e030698ac884962f16fbf044bc8",
  "0x7e97cd33eecfdb9cf51e4b74a2aa8cc0aec8d616",
  "0x5d53775066e7faa81fe8968bb1e91f12ba9002c8",
  "0xefa29c7f6f4ce8e442666e68760dfc14a3db7315",
  "0x2999586db2dc55177715b804d92dee31d82c3bf2",
  "0xaf970c264993f68582e9db0a3c11f59077c9b8f7",
  "0x610e723452f13f6293701bb83a8ff39d2d94d7b3",
  "0x060991d75e17ebfc6cc52e42aab271abf2f8b888",
  "0x5cb923973f1eee983a88729b19a4a2bda3a43d5a",
  "0x18460e2560fc28ee875335382b250d385f457e33",
  "0xda3ea1cb1c026fb93622248f914243f4214024fe",
  "0x5fc710eed2bc61f1d729f3bcee5d84f38e1cbabc",
  "0x8c44a19e9ebf010e122ff9af3f9cfedcf243cc6e",
  "0x80b388f07705a7f5fd3a7b8436a49f02e987e796",
  "0x608d41604e796adbd95435e06388de37553197c3",
  "0xd912ece0c5e4f2625e89618e645ec718ce187e6b",
  "0x7dd9829ac138eb9d13c58e188682956da621e38b",
  "0x67238bb14a450e50ab909aa6642520d0cfa3b465",
  "0x4b6caba8f15327b33876fa7489364521bee49e07",
  "0x9995a71d3ca7584487736644a4785c59e7eb7e3b",
  "0x357a1ef429cab377bc111bfd0d66f3daa19f0278",
  "0x2e1848acaf8adcd3be1db5ba655f161a4eb5cc40",
  "0x8270e5cc61ec7176656b132765586797027cac97",
  "0xd38efed51f92598b3422be7399bc744995fd08db",
  "0xb18e3444b9754a56b10261ccfa0824ccb2b46367",
  "0x1d728068f97863db51b5328a88d1f9d03b864e14",
  "0x01370d3a262cab1c42f07695a6f4bb5d8248e4fd",
  "0xad60c52ab20a5268e26b52bd73c0b0ad352fa31d",
  "0xf3663b762f74994c12ab04e2f508285e1669ef6b",
  "0xa44b928015c82819270161004a3499838e701f93",
  "0x51a216c5e2e67ee1ea1ac7677e4da33ff161d21d",
  "0x9f96d3b217ccc7bb67c7be4d018a3de896e89736",
  "0x3ae06f2488ab961aa08224041ce6d49ebf313f71",
  "0x163a5eef5961190808389b41769b5431aeb05d42",
  "0xf9f0a676ab591f24a79e7b71b16fac4f011378f9",
  "0x9410350d3e0b5f18510d2f23d5ae040972def2d0",
  "0xf1288b5b14f438c97c0a9227202d501360f3004f",
  "0xd9b26554f9cafe198c121c77fef196923640ed7c",
  "0x6a4dd46ceeba95a068b026d6ad5638d02467c19c",
  "0xfc324dce1dc49ce5680b5b28a5ef7d951835dec4",
  "0xd1293f52ac54d580ce628258c08026cdeff5e307",
  "0x7bbff0d18052b855eb0caf8fe657f927fa3ff880",
  "0x60823dcd5d8b2f9b5d9af57007567e503175f5e6",
  "0x442d4f0ca6c5e3173b3717e829b391e3adcea261",
  "0x67fac9d281051b52ec8a728a2727219da4d029b4",
  "0x633164429b4795ecd6801d503772401d9b2ff06d",
  "0xecf51baf0b7a0bc0193d51fb64aa6aefff03a1a6",
  "0xbc6da9519e048f1cbdc8f84a0ad9e9a31e60128d",
  "0x6df24cbd8874676812231afb6d43e8ef05fc7ba2",
  "0x9fbe416baab4a041d84076552605846708e3563a",
  "0xdb9622e1b2630897a54cdd1d195321efe3737193",
  "0xe038aa3033155e5c898fdda7d1659eee9fb9f635",
  "0xbbd1c5cee1504e6f55bcc95b167138bfd60e4c34",
  "0x8604f60b02ef8a27d05efda63a6975af2a68884b",
  "0x7a1b9d51418b274ab392472405559cce9f22e63f",
  "0x7dd97c7fcf8379b5e575eeff3b187c9f3fa1f625",
  "0xf346879e1e1c2ff46d81532e233f12f746fb8ecb",
  "0x4ac5b3e8813861010f8740811bcc2fe06cba5855",
  "0x840eb8a59ed8c9ced4ace4c9287d5780bcc54f8c",
  "0xb40636c060adaaa2ea2968b45b971941c58ef5c6",
  "0xf6c577a769535c82eea3fbae1aeba0375de8a9d4",
  "0x09c52b117e9075757e3562984d4960fb96e6a995",
  "0x67b2a34e62d6eb135f8a1356dc3b01ac4c010bb0",
  "0x2ee68b9e576cd21c7a5b3ac4f212facef491f768",
  "0x4c7e99825b6c0cfc49226993020ab414c0b93dbc",
  "0xf98db5bc4f270486bd86d7df4bed8644e853307b",
  "0x604d62356c5cfead7c338b0ecbac4a3888935066",
  "0xde653faafc3d6877945597ff79cbb25ca8b702ab",
  "0x72eaabc3c5bc8b3573654a896258e6c01ae29d60",
  "0x4dd67e6ec8a943de7a5d96d7372c9f476bca30be",
  "0xc63167c33719ad49b14506c33f6698bf53160418",
  "0x0dc8f1d9ddfa5e758ad090be6a2aaef0b55f0135",
  "0xac7c7944b6b0a2de5ef3ac68edd8938c0aba97cf",
  "0x58c582e4ee9a8c0106de455fb59205e3fbbde3b3",
  "0x7a315f0f68e94e7f6943cdcb326175b61b31f25a",
  "0x16d18cb9910a8f60328f8b67f2890a11a16cad49",
  "0x1e8ad7a622d79c105e1e58811e00c333db5cfa1d",
  "0xdfa381ae02f1e1fdf1472d7f0845bad0324a13a8",
  "0x649bcd31cf7745b8be81f0d6e8fad80f6eac9211",
  "0x0a4689cc520b6076c2dad6d838782f2a15d7a3c4",
  "0x58db14cda9fa7413c300376308ea0387a3e34d83",
  "0xaa5342ff4366b62d97602bbf8729e6149f06af2c",
  "0x47eaf03d3265247eee651ef1ab5c877b9db38eb1",
  "0x0d9ecf95e9c2f5c7b0832a7b21b9fbf0c579975d",
  "0x8d7601600d1eb570880dd20eede8e93105eee1bf",
  "0xa6e956d71e9f0ab635a1cdcf11702caa72081b3d",
  "0x3c3601553022a3ac1bf95b30f1c6df36045ceeef",
  "0xf04497532f56f92a243b2930ce863c9e2a9607bd",
  "0xb364d0ac706488444cc29f8352b2ed2bb4f156fb",
  "0xbb632fee12b876b17563d84496e52c1aa3a36409",
  "0xad3f3fac137afee90e4912df33bd82bd46f4578b",
  "0x84545e9761d1030d30d3fee4deb9aaaacfa7b78a",
  "0x929136634cb5d441a9a9bb3d343ec53984358262",
  "0x8a1aebc05f87a31dcf909339e99b52c54a00b6a6",
  "0x3987247ef2856e1de3449969e3d88006dc48c661",
  "0xe9e26a29a9d8580e386a58e68a1dbc58cfb26bf3",
  "0x61b11660b9394880c22df61030a59fb34f4de418",
  "0x395bb7896becf1f1eaccdb57c590cbec170cc520",
  "0x4393b77a22a2308943844b78421016bfd3740dcc",
  "0xc925ff28ff8ca175a4ab0387697429d3f9e21775",
  "0x136fe17b03404e455060e27131fc798d3e83c52b",
  "0xe411015a6ddf7b5e150928faad6eb63a35ce6b00",
  "0xaf5d54a44d4fda48c2dc2479dae22fb73e0fb611",
  "0x646b03dae788cd1f5f664854f38c7f352956d8d1",
  "0x97953a5656ddc9bb1627e5cd80043fd754eaa5d1",
  "0xa9c1d20a36b4100aad94f7478d1c08593f5bc93e",
  "0xd7592f2d2dfeca1465327e17dd19c96aa9da63ae",
  "0x624094957499cb0030e4910be41dc05c3af5c918",
  "0x1cdb767a313db1d09d865411ca5861a198dab6b5",
  "0x8119df775267e058bdda71a23b1cad5b9a82c28e",
  "0xd6616f0187e72a4894d8d4f7d28a818f7aea6ced",
  "0x64a2eb119a04bf77c32a725b6b73dab77a991142",
  "0x237cf003b5c761e5977488e1164c09b5cfead57b",
  "0x954d3c7f83ea04e4480a8adbfdc2d348154bdc48",
  "0xc2d5bff8b4a159b7e4d80c2c794d62c5409d11e9",
  "0xd263deb9cf9da8c5de1847c4f07ecd1c29e2896a",
  "0xc2e0477866c1ed00a16d9c2509300fe005b994c3",
  "0x7e46ea01739087cec4fb07b630c67a753b365a73",
  "0x081dd264794426568101d48a1d3144726f823ace",
  "0x71a18789446447db060af3140f5e8fc3e9c4bb3f",
  "0xf55c3ab0cc40fca481a5a06cc665f788fd0a7329",
  "0x8657e5ae5c0ac9a9cfa963ff1242ddcefa701510",
  "0xb72bccf58b6bde6d5582e2ff69d6bfef7ebfcf36",
  "0xe525ff88a5cc754fb75bfc2ca57e3225feffc1dd",
  "0xf7861c0efebe8a0f8ba2f465f392168d4a3b0a56",
  "0xb1a15dd75af3b6a90a61fea03a98eccbddabafc6",
  "0xe3f87a031ddfb36c7eb3aa49ee5f21e1bb90e0fb",
  "0x2e8e962237fa9835bb6af4254b39bd1e03b06a14",
  "0x2a002d5872a0202714b0782e0e44bed4a915d0a1",
  "0xa79ffcf36aaca3d9db24f3ddd14c192b4aeee264",
  "0xd7eecdbad0dd8b603c905d6fe27c93d8d0f3a8b9",
  "0xd076a1d7f868bd7d79b875612500c6b9a27cb2a4",
  "0xb1c8830cbb0653640318cc6fda474a1618e324f8",
  "0xd5ffc9db6426281c1a46d8356e90d996b2abd619",
  "0xbca34271a5613903f7c575123d38bdd51f18dbfa",
  "0x6a72cc5e4cb8e6b6b1371eda77acaa2bf594c5d4",
  "0xc2c28b65c7c766e9c62fbdcede502b5fb5dd9699",
  "0xa8b58264d2e0475064b612cc094f829a62ef360c",
  "0x177ee07ebf21d56d44c9447901c938a80e7d55c8",
  "0xa719257e666a39c65db8a1e1d69ac491b0cb2ef8",
  "0xad92607170944ffd8fa015e40dc72e8b0b2b49d9",
  "0x04fe31f5b6b95afcda85e1de002fb3361f6f055d",
  "0x97025410a0867d75ad40fec2112c6c6bb2d0177a",
  "0x0180baa3cca07402f3d2b09b2f2437c677e56d06",
  "0xc58dc765bde146d3a8b21164bb90169970c2483a",
  "0xda276f3b6d38131eaf21e8a2afa902c8354b92ab",
  "0x446bf0cc68a1df14fab70af8b1dcd8d3375710c5",
  "0x15d5f959c77b201c5deb6ae11031ff40b393a2e2",
  "0x7fa5a161f630440a7b68dd9c150eefa069581500",
  "0xfb11269b0180ae8840e6d0a2f4f0322997f230b7",
  "0xbdbddd5edae256e37f78985ca1f7d42205098cdf",
  "0x7e2004a8e9635d5ac00625911d1699f9e5999cc4",
  "0xecb9eed706dae99d35ec3624d0e9fbb120739649",
  "0x4527aabd17ed512aa2110a5969cf9adf89de26cb",
  "0x7a27482c919d4bd77c8e4ffcf36ffebcaf84cec4",
  "0x1436563022e4f4388efb5eecdeb5ca405c39b120",
  "0x8da8a8a209ba151e2907549b6aa642cbb443ec70",
  "0x12e9b23e7cca4d23b5f021fb9ebd6877aa185840",
  "0x7bb3c7ecfdcede2bb2dae1b41b2923be0800f35d",
  "0x67de67f51df9ee240917e46958dc89a5ab4215e3",
  "0xe6f582d72d85c022e2889531cc9fb8b0c8053aca",
  "0x7890c2c30df287075293131ca666d6cd7c915f3d",
  "0x86e3697aaddd91f9b52588a4e9cc038b4564aa3a",
  "0x73a8e698734d22af9e72ea29e5a9783a54050364",
  "0x330a85dba7d173e5cfc7b93ca222f568393f786b",
  "0x63ba5a59d898b6b6aaefd533e3366252638ffc5a",
  "0x36fa563b5383367dd63d27024d90180ec975f1f9",
  "0x35bafa036f69ddbbe2076cb92a852e7988721a1d",
  "0x8b1f109827e35f9c271c106f000d3803a20df5a7",
  "0xaa4ba59a66db4c58faf8f3946523d6f405331319",
  "0x399e7fe41a3a2812a9734366ab5ee63e732c5758",
  "0xc4570c83d1457a9706756921ff9a1d34317ca155",
  "0xc3d1eafb0310cf019012649d21d54be14ccdf5fe",
  "0x201e6d9a8e2feb84106d0ab67d90e44793c50b0e",
  "0x91541646966d42bebe0bce74d98775d72a9c3844",
  "0x1a7dd262569cdb732f7c2644fdfafe85caa9b3aa",
  "0x30e55bdf1c28160731982e321dd0ac6de4e29401",
  "0x828c9063af4536800d07e1b1f818fcb059399e4c",
  "0x5ecd6b3bd8a96d665f3aa478b9dce48bfc8f411b",
  "0xe53f8ccdbc4f8ed621fbd3a693fc548e4dfc8fc3",
  "0xa48c6f50ebd8a540e08a4582dad12f3456fde6e8",
  "0x178ee0406eda52162efde5e36e66f05ae63c8edb",
  "0x91636f9abd93ebb1e5c41fc9665d01596dc996af",
  "0x82e4882fe8be8d52f5f366262ba21954bdc81457",
  "0x814a05edf3d7d52f8548d255c71daaa8ec27b2fc",
  "0x4e4e34d2314c40fdcce5266ff2d69a1fb5c4c9c3",
  "0x6c0cf0f76ff68dfbeb2b5f6afcda1839ac2d34c2",
  "0x06c45efdb3329d3fa0a49833d6b64dfe966286eb",
  "0x737ccb20bdb7ade7c1da141051db0a810f339963",
  "0x13d9b23a4b69131ad72192ad7bf5179403156168",
  "0x5a01a21cf8830c93a94d08be164d7130d9dec617",
  "0x619f51a09a571802d159df95996c31e3afbf32ac",
  "0xf105279dd3e6ebc7ff9a0ef236a9d6f829c103a7",
  "0xde1836768153dd6300c96e1410615d92fa8263f5",
  "0x41dabdcdd53c902a6d316d30f30b76b4129dc228",
  "0xb851bd1c01732c23d687865dfbff5d95fec4a48a",
  "0x0d014eb8fe1e938f793f20515b80a0ac018b362b",
  "0x149f6b579faa857b21ed77c3e2e7933ffbbe1d02",
  "0x92402636fc03e72ffec4bbc0a15a1211c6e5e919",
  "0x2546b4d19e4dd300dcc56efa419c0b388de85dec",
  "0xbd8104fb375e9f3a291a4c689e932efb2cd89402",
  "0x68f91384e08c800bbf81d650deab48cd90f4e696",
  "0xf7151e003193db642f91f316909a431872c51cd5",
  "0xf9edf5c98b6c927d34363cd4366ffa2290e8ef6e",
  "0x521304540988c3bfded80d2e19f9ddbd5845599c",
  "0x696fe188daa95588f69b709dc23b882f7fe69598",
  "0x41034b75a74d5aeabed88bc48eccea006dac1d4f",
  "0xb354737b8c119b6f7318caaa631723c2f4b1ef33",
  "0x12fea6c422d0d9e90f45f655bc87832d1ea5c6a8",
  "0xaf41e6e43d496a41511e8f72edf7ca68c4ba5eaa",
  "0xe64b2361dd85c63b48655b15ca9b2174401d3faf",
  "0xab41e6c37499005237d01087f542a284b68060a2",
  "0x6fc37c76da4c58176ae04126dc49a992a2f76d6c",
  "0x3724daa0df6bf7b6eb9cf4d42aa9fcd125dfb3f4",
  "0x9cc2862ae044bee866e90c822c6e5ff9e349969e",
  "0x2d104cc9db395d5bc1d0043f7be3f8f5c1cffc88",
  "0xb261c48ad3fb5a64bc9c0cda7d93064e7e416354",
  "0x958cb13ffba07a615ef7ac3dbe11ccf0bffda960",
  "0x26ccbbf03a0e6034691f310aa50f0b03d2735299",
  "0x9c854bf81c81cb5038ff3dd702e9e552f20fe1b5",
  "0xd6bf398dfa4f6ad952cfd5bb75388eaef3a8193e",
  "0x708af483e0a49b2f3d755925a0fbaeddc7975eb3",
  "0x014b21ef1a6527e7e7986840f51504f0dd63bdf3",
  "0x076d34f749a5565a0c6951e5c52a71de326f3114",
  "0x6bf5173149359d55358791e742ea210e4fff6ead",
  "0x64ae2db6db61d7cf995ac38798bd9af8f2fe593f",
  "0x15c2f471cd38c244a88db4b87944468083a70fee",
  "0x60803eb77776169e4ef1c4b12b55e26d87944bda",
  "0x10b3e13822a6255fa5a3b767c6f201ac37c43340",
  "0x427695810f032edf4ed9f1bdbdeb0dd426c5fe1f",
  "0x4239a51ad63d193efb7e03726457d2a7b5e8a29f",
  "0xb6caaae95b2674d2aacce20d0b8e7a43418c56f9",
  "0x37a1455e780deeb8a69ca800bd712549297f7e28",
  "0x079e4dff0c3d3b7a53d4a78427851a3f74587564",
  "0x0cfdf555083f13c27e6799112c3eba6c4b1c1ece",
  "0xef43cc63437c46ad12bf2ea9076be65d5ebe151f",
  "0xcb0934701d2ed83fc06f7c2350751e62fec1e04c",
  "0x31af146650feedb8dce8f1968a16e5f7535bebe6",
  "0xa06bbc7ff6df8e32b1e615977d9188ff67917da2",
  "0x061f7bfea41bf6c4db938f090be9354901c704fd",
  "0x772ccfa679ee7b4f07a1ccde815fe958975ae4cb",
  "0xcc6d1d153c5fc38fb168a19795cc83a5117cbf3d",
  "0xbe2273339ea2c783c749184496dd02e2296f4a21",
  "0x9d5cb5156face50a3a2a2d69f94223671f581f25",
  "0x669978049e216834a4aa6df0665c531dcdf6ed99",
  "0x4831982925f7d4c28e7f3bb354a06dc683a40734",
  "0x621e1cd90b568e243e35502cba68e40a8b0496ab",
  "0xdd3f2a91357f6c90d7a688fcb1500f088cac2be6",
  "0xfbfd94a31948bdda5aa7559558eac35b8fa9cdb6",
  "0x43e4a228af9690dd260b162d08a2102eff771163",
  "0xd7931b739c85659c638acb031b7070185541b1d1",
  "0x555f644bf29bb21a8f02724fbc759ed170810478",
  "0x396b040f6f65dd0e70644aeef88b0518f10f810c",
  "0x2739b27a2b7da09e57e209f41753df6089da1b7e",
  "0x6526bcfef151be7aa1d36af6d56e928ba8bed1e0",
  "0x55ca3e987132d3dafca9154d0b3a334ae1501653",
  "0x22a6bad88b557f1b3f4baede421ec9e221763f89",
  "0x69e565fedc6ab6c674ed7648df19860fb03fef8f",
  "0xc16884e86ff12b4164192d5642aeabe0703e3507",
  "0x07c9964ce9ad4fc959bc95041d5729a445c87e2d",
  "0xb668dacd97ead97f94ff792041330bd14ae817dc",
  "0xb5881822775a81381fd2227cc36bb03516ea843b",
  "0x1d0c93e9d79f28dad9b44c01fabf8fa864226863",
  "0x67006901ade686731a3d5e9869f9ea11e856ada5",
  "0xe0eac7dc782537b47b5962c13642dac3235ceb66",
  "0xdd9f1f68e7827f73ae1c91abc722524ffe22292d",
  "0xa184af1efdc7a22788490488a3dbde14e2d5bddc",
  "0x41eb8d9025ae079255c69180af36911e65c900e5",
  "0x954a3c2f0f7ea6753bf3dee2660f43360946b75e",
  "0xb80ba399584d9b32f59884121da3fa35042b9fdc",
  "0xc824466f8d4f115141495a7ec24c93633f8e56ac",
  "0xfbcf271dd94df3116a3ecf9d35024432fba90137",
  "0xa3ce6d0d710ff0c30af68045fbc94eb83a71f0c7",
  "0x5a702a4de300ebc45c67e11470607fb9b17d230d",
  "0xb053fe7c8b05e77cc17cd4af688ab769f945b792",
  "0xc9feb64f42926aa49961c8c0f40b26f42e462939",
  "0xd206ca5a3a67de029562cbc090104ea03e186757",
  "0x9ccf76f5ddbe114a706deb3d17e550391a2771fe",
  "0xc31c41c1c040e1b682d1bba162f5be8c7e76e796",
  "0x02ca189f949e1db64f199682d0f17c22abed9dac",
  "0x7f6ca8d860270e712c69254cce0656ad464a9b60",
  "0x5ddf83eb197ac6641e2fe7694d28b57ab2c3c4ac",
  "0xaf308a0c6b0fe1b49443dfab0791828191336b47",
  "0x4a073238c69adc59bd318b9068074c9989c40e69",
  "0x0d5a3240446e22790d0ef1e80ea6b3dffd905dad",
  "0x68681aa3da00dec89010c21ebf8d4dab14c7a13b",
  "0xce7a3c87061b551808e26e1194ba8f740394ff41",
  "0xd1ea06854e43af26f86cf92bc450d7f019609993",
  "0xfb5245c586b0f18fd05add89f59dc50308ad5f5b",
  "0xf123d1d46bb3789b4a24d3c656acd36c4c4a370a",
  "0xf700fba2c4e005a841ef4761febc63b81d4eb617",
  "0x54a4f55a3f4c0c365b57d965d9d5a806877abb51",
  "0xc001572213fd2735253576d3c96e82a93d8412b2",
  "0x2e482df563a0dad19b24f2b14579361ffdca2f32",
  "0x590e1505b95e24cb62ad8847123b2362ae93487d",
  "0xc692e35d9f11a1fd07cf9f63f3e517aa86734e8b",
  "0xf8520063fb024970596aa3f615b4309288f28f8d",
  "0xc6faf0724f090385ffb2fb45b8a802577c46ff8a",
  "0x37a22f69b63cc1aebedb6399ec7048e26ad5e5a7",
  "0x491b0e50ff66d302945e3f593ff3f32b70254150",
  "0xa2c5393cf474850766f37d9267b8991dc27c1af1",
  "0xa2ec5b41fc09d7091df34378567a7ebe62530f7f",
  "0xf13920be4f7d0524fe0c8037d2831faba84b06e2",
  "0x76f546f20a518497c2150a33dd896c4f84e18b40",
  "0xaace4bbd2efdf6d2f00957f95d019dba713f821c",
  "0xe9062742512405fac0b081a2c1e1f72adfec6293",
  "0x440decce3b525903e6e24f2182b1655bdd3b003c",
  "0xde3e2890c18dfb2eeba76fa17587930be4ac6f1c",
  "0x8a5855f78962c5c6620fca7a40691b39ab291fd7",
  "0xba258d6ec1002c3622a988e035e4fea537d1fe98",
  "0x7cf46f66020bafcd15815ec1f4fc89510db6fc23",
  "0xda9251b8e5edffef29d3c74ddae6cd41ba0a79cc",
  "0x6b298836d5ce0f8f3865e8e116438532c3c4b35d",
  "0x5d0071e792eeec77fe6010d0383cff6fdce9fdc4",
  "0x25dd967e222452896e5ff97aa8c0f46b8c3905c4",
  "0x7e2b285c3ee314f931ee3238010990782ba4145f",
  "0xe96b36f23f72b430a3f1e670231b911af45aee46",
  "0xc31b828ad29358b285fc9ea14545c8fba875608d",
  "0xb8b52603be4203953f7932e5bd10b234e56d7a1e",
  "0xc9cba55793df0fcd831d8f2b89643559f48f1c9e",
  "0x89dfd9600b54d97b1cfc43750923a8f31ad7cbda",
  "0x5fb445fc652ea6a912425ffecec4aa091b8fa977",
  "0xa895c7c8fda511a34b8cfdc35144bf70cb599168",
  "0x65932493b375915265347b5c4a00424956a3c0c8",
  "0x87dfc97bdc9d3be654ec46004cc709f04ac3a10c",
  "0xf92831799f2611bc9d02c16e5d962bfccb0638c3",
  "0x244e5629084e66b87ddd4577e3457079763a60c1",
  "0x63865bd4a3c5035f9f7b306943e048c21f81c61c",
  "0x90b96267e4f3800823cc6b4479120cbf7f24f951",
  "0xe053302561925c50cd551ef25efbd07d7716d321",
  "0xc1e845559550a376af2c7e836dbb6ce0aa044043",
  "0xb390b25ab38f1e3396b5ca69a01b3b0c477073bd",
  "0x224a1f52a8f402b90598a7f2c1b3b8a406675351",
  "0x6683162543a7b33c6c3406a4d32ab1e8d2cbce27",
  "0x117f7f3937e364bd77f4c75c7df10d1cb4e41d57",
  "0xca5362ac4b374947e6ab89f29bc43df94ea3ca38",
  "0xf65ffb117506b327c66b13c0521e54c306acaa2d",
  "0x95146d827a776f95bf5fe6e846594102e9537e57",
  "0x187704f1230699ec903dc2c46c8d283525213e53",
  "0xf4b62a55ba2b57611e85cda704580ad22ad92206",
  "0x7a5d0e1ab1fb75dd5176ea9d647bc99496eb6885",
  "0x1048a111adbbf5fade3ceae373c45eae5e6f177a",
  "0x15d7490702b2543859ff699f062526a2c80cf749",
  "0x9ac904eb5e885e2026d48f6cfd1669e106608a8d",
  "0xaa508413a479d8b7708fed82727a7f9d357e2f69",
  "0x8824d8ba85b4168a8a231a10588d7d74f220f799",
  "0x8b05be9f76b5d83b335d765ae056d70d28c8b00f",
  "0x963e1b23e90ff15cb63cf79676da6e8a25647dbb",
  "0x52703d47f4d27217bdce1307fa8bac7a09dbe9a6",
  "0xe3585c7ee9f20b5efd623307570dfd9cfc361add",
  "0x86939bbaa202746b7d4c52d9dc0f176568539cc6",
  "0x47917d88185f888d9a45aae9ce108a4ef9bb433e",
  "0x041abe2b1c3780540016a1e0857745dc161994e3",
  "0x60879ff9a3e890f8adf6c47327ede590d51a1b1d",
  "0xc676aee1278bbb09427cb1452b4acabd02c1aabc",
  "0xebc91eb4fb691c513575926fb4d0c58a422d1d4d",
  "0x372f0e8cd3b6fda60dc2a07972e01cf5cd52a52a",
  "0x5412e3c4832b01281a34ed3c76098acead3fefb7",
  "0x97bef64e374ffc63cac83150dc96627d94013132",
  "0x61928537abd6007d6a6559274892a57138c4099e",
  "0x0b7197e02612a1aa4bdc962ccd5893a1ffed7d6f",
  "0x705ad6fa90d14fe46594022e166a6e6c94563e5a",
  "0xe513abeba6e428b3203645a723d7cae38f748d88",
  "0x0ca24831d7d2c92db25da26fb5ad17af3ac9ca36",
  "0x1fa3ef02919a69916c6fd998cd9a0feda06646f5",
  "0x35db5245fece8f1f2221309cc56c418f28fdb69d",
  "0xdcff890b54c14879be6567e204b05201b1828718",
  "0x9f1a1f20c9c89cb033307e145bcc5ed740699981",
  "0x76a3d73056d18e6a1eb91c428a23fa3959635cdf",
  "0x315e811b58bf61e23f5ae7bf2062059884433ecf",
  "0x4ca6811f29219b6c4072399af4d6f8b00c72b8fa",
  "0x35877c9087e1d4522edf567936d13a61ffa57fd0",
  "0x29c82d957f8448e2e3653b15254671a1793adf31",
  "0xf4891f12fb71cff79d098813ac7f0a551ab857cf",
  "0xc133ae940ec5c494897fb834b8cfdf6e9b6b88c0",
  "0x10453cc4244e756fcd8e6e6e8747ef6fe28381c3",
  "0xa6f46e236227b08c1a1a48baa76a37c52bc15355",
  "0x1cb28d8bb73f62116d2d654ef05ac1fd04a625be",
  "0x3954292652ef1771b73329b601d3aa2f7029189f",
  "0x0f1e829b620f9c65820ed091f722031b7e315d04",
  "0x3a131895c74313cc67057252f3d4ae3931a0d577",
  "0x0ce4c5d02f5f919c659170e41fea228bab12b05d",
  "0x4c61d1fe4fa94917d5c3ea1bf6a274ff0becd725",
  "0x3c6ce96e3f4f07f9cee2371077e3bc74842fb39b",
  "0x369e7e266043843f8b6876aee9c56af0757fa214",
  "0xe8f384b1c6148d4d2ace86f39f0e4db3a7baa53d",
  "0x7ca784539d71daa1a9406a182524d2dd272bbb46",
  "0x4b2a6827dc4645e6edf3785a6983d7074fac6ff7",
  "0x771f6cb3f6664d5ba3ee78c37a8d4176ae784732",
  "0x819c7c04fbc6e242bde7c129be03982d800a9dee",
  "0xb3a163b8aa58d9a77fa53b1d89a6aeb61f8b6354",
  "0xe61b45ea7ccf98d8e5da058fb703482a6e98986e",
  "0x08fe6ff0803ed4b70b028f597e01f0580ab36daf",
  "0x0135a8f0ab15fb96a6bd5715f0d45257f410d832",
  "0x517964c15c87fc68faef1f6dfb60e39541845de9",
  "0x146781030ab38500a47608bc869862bb296148ad",
  "0x98eee6b0b9c41361c6097dc4e73a0475e359402e",
  "0x0655a132ffbd0637bfc71fa6b6a986cd3fde39a1",
  "0x3fff7b718732078123480c8d81a0e70a6a71ce47",
  "0x907ba9bcae4a8dcd71b4a831584f0f1bd87a4692",
  "0x826899061280d4df3c342547ee2c6014293bc154",
  "0x0020ad6ce40eabc75bc011d232f6cf9bebd9745b",
  "0xb688af3f6d0949ea85783fc47353057d4bd81e2a",
  "0x6a5949501dd21f57819643881781fe49222b4be3",
  "0xc038b7016e25459e100a04ddd667cefba7060427",
  "0xc69225bc5155c2008c6fa3350483ed2a6d16e217",
  "0x1e6c24b03e3df70dfd44fe44ea19154c5ca91b47",
  "0xd7d7c7c48d1fe539bef18b9d18c8719c93a41bb0",
  "0xaadab750afd87f6cee6e66c950c7d10c4b87ad99",
  "0x50b8c1e6e250a070200155544f34b8cb352be3e4",
  "0x9bcdd2aa9386838e408e86cddcb978bd55176af3",
  "0x15fa6fa39e8d3dd0d0c62575d39945677b4316a2",
  "0xbae3e865e0fa2e5c4bca504e9ad94d77f8b69eb7",
  "0x0829089dfa8a725a23c9952101552e2cf3e5ab4e",
  "0x118df4d6619473164871cedc07df2c79a1b76b78",
  "0x76bcd761f163d0228ef2722500ccb9c8b406aca8",
  "0x004629a1bbbf303990081d0999e485313f5aa434",
  "0x4495fc071ebe1fe129828ff207291eb69c3190a9",
  "0x00bafbbe6f19675e261ed374a8a2e30ef111c1f8",
  "0x30a359c3f0335e4ca5106414cfd79779e0f8102a",
  "0xf54f4f5ce215aa5212507e5e60d4b27ce6269d91",
  "0x696c68ae2317d5bb361215ea854ff4498cb1b5b3",
  "0xe5eedbdaff03bc72a2108888626f17d151cad95c",
  "0x292eab5da194017912cfdf5f02cfc2c8abc83700",
  "0x6f80fb2ebdc7d380b04159fb46e8e9da78a7cff8",
  "0x881b14e01a43a7637fabed96512d4da011084f1d",
  "0xb13b404a0430674c3f63edfcc90134704bd706cd",
  "0x76a3a9311b619463fe19d8714e80866da677e092",
  "0x5162a2050cd060c9f4c58c4c2e3697c4fc7806d1",
  "0xec05ad31f8f599cc2e200a5529d66ffb9aef32d9",
  "0x1b9f79cac18c88297d3cae8c9053f050119b9f5e",
  "0x6ed77b989f62164408b0e351b75b229a300babec",
  "0x7d1c853543103ce0fdb625bce1a0b5211bf0ff77",
  "0x816e24cf309f2b4c650cc36dbfa16129c410949f",
  "0x7c354333de027e9e851d92ee1e97edc2fd294f92",
  "0x8c73982d56113e246a14c2f4acf6e515ce833310",
  "0xf00ce6212f3bfd28335a58aa220cc1c9885c39cf",
  "0x7c3c1dbe4457e6be42a1d6c800a3474461b7c9ef",
  "0xbe236b156768801ccaf59d3aee864f51133aeeee",
  "0x05519e4242febbc07560bb6a987386ebd5fccd0b",
  "0xab66a9225ea6051a8f358c054ac8dfc9f39eae8a",
  "0x414cbff954d5b70a4157dab14fd1c134eb49d12c",
  "0xa8cda15a87cfd5471a540af029e48217a0971434",
  "0x235f5e80ef57cbfee2992698ce9160bc4bb9f2eb",
  "0xa3eab88c232e3d6e9e066970e80cdfef286e1978",
  "0xd7fde13c9602bbd6e32f7aa3bf035c8c3f5cceff",
  "0xbb1a611a21487628fb8526419114a66119006c24",
  "0xdebbe1934185a1739208f8bb5886e0afe4c0d8da",
  "0x0851f96d5f876245a27f38b751545b55dff81b0e",
  "0xccbe5287acd01672e82428e0c4eaf8eba456362c",
  "0x4d2cd4d5bc39a68865b0cca10cc86e802ccd5e1d",
  "0x1b9388a7cb1cc560c8f2cb4ffea1b1c63f6733ec",
  "0xa975e551c3eacf89ab96420dbb1b63947f1bc282",
  "0xf594c4dde99d9017cebbe4b90f37f0facf7a70cf",
  "0x2dbc295a2711f4f05622c85703c432c6e7d162dd",
  "0x7bd1a895ada29a350d2507bf2a5acaea075b7c0a",
  "0x4798cd3d6a4883792a6ee38853d0adc59391fa4e",
  "0xe06cff77fbcd05696844af7397b5218d8e72286f",
  "0xad9107ce6e77db2d0aa3cd2c3ee8a8eb16ce7cb2",
  "0x2a1743f5ae1fc8d78ef1206f3acba48b27259a7e",
  "0x1356e7efb18cc1b0ad9d8400dd4955a63de1df14",
  "0xdcd04a5fc4b168dbb0e4432cbf9d8799bb4a0521",
  "0xa8702fbfa45178a018a5ec0bf9148e2c3ad57fc3",
  "0xc7a9e1cd9d76f6832e9e5078bedc7120b31e1a76",
  "0xce3cafd800ac29e34e85d7b266152749c849b574",
  "0x629b517b5aff5475f5035650a834478758db5358",
  "0xb7955e785bae4cc5d6119a0d2b8b0113032ee8ee",
  "0x507f77f6c2a11fe1618bb43c93cd4cf332d80827",
  "0x3e1e9ad3a45d284baf0f204cbb4e17ad95de18a2",
  "0x850cd83406889d75f3d1f708d2451c07959916d1",
  "0x1d4a20287a9a85fbfea47982c4515b281fe83515",
  "0x13f3f44aad51749d6fa74073e256acfbfd8a2021",
  "0xb5bc87f0b51545f1ec8bc8a858fc32560303a42d",
  "0x0037fa577e547a7616e4b01d15553a0c7e980c63",
  "0xe7674b190def5a82730f5d6ab8125e277f10414f",
  "0xF4914F025b45798F634fBE638d33701FBff3274A",
  "0x8052a398480b5B80D52d3DAd6fA842e5B671baae",
  "0x97C05103C3E714AB36B2Cc509cbAfFef4E93BDc0",
  "0xd086F7C6448e7f10051317892DD243F7193C4C6F",
  "0x5aCBd0c898d850d9Ad2531Eede8ce3C860426403",
  "0xe87601c9902fa22e454443f967a9eff291780ac0",
];

window.checkWhitelistWod = function (address) {
  let found = 0;
  for (let i of whitelistWod) {
    if (address.toLowerCase() == i.toLowerCase()) {
      found = 1;
    }
  }
  return found;
};

const landWhitelist = [
  "0xb437a90e59785740a67fc5376180acc3b705edc4",
  "0xb4bd860f00df73559fa73df86ddb644f1a1c4ff3",
  "0xbd94fef81f1aee361adcaeac035c7eacbb8866fc",
  "0x0291a10ff53fedf62100c1051e93aa52544be85a",
  "0x6caa65efd794163141f7a0a44d6f93f3146e4dff",
  "0x13b8dacbed3be5709d6ff9639f185585b5258c9c",
  "0xe59455b7d61dba7d70db666a8930d4152400e9a6",
  "0xf1b4d55cf1d309e3c1914aa6025d90ffd24910f9",
  "0xa2b3bac969f034cc5df5a517a7f3660ae5c15bed",
  "0xc889fce92f9a29b29f8bd28050beca87afe594b9",
  "0x9912a0a767e06566b356cb17521b3e3c13ecb4ed",
  "0x2ce99f178daa9c3ac5a3ac86e22800c5bb011739",
  "0x2739b27a2b7da09e57e209f41753df6089da1b7e",
  "0xbfa3b43b735971b7f1a92028a975b44e1dfc157a",
  "0x3d0a87a9c3a31291e6952d4cb7b154f38a4bd63f",
  "0x8010b39a468fc2a05b7f213bdbdec8ac1b3cb24f",
  "0x9bd215c2530df574657510b2f991d5c326df7c50",
  "0x888147e9c6d943fc33ef8ac65d042c22c0a9ebf2",
  "0xa1f1b0daa0710b30f05194b12d0e1c47955032fe",
  "0xbb504f45adb368da44ccbb50f5142faa648c755b",
  "0xa8517fd6063c55256f9afbdbd3aa4e472ad1ac3c",
  "0xd732d553192277f48d591932d3f4ec7a405db191",
  "0x7990b8405160155d8e9cf27442680aea48b94747",
  "0x92a76b0c8af74ffbcb7e5917469f68bf5a33fa0f",
  "0xc2f2aa353e02b9590829319289556bdb3f02dee4",
  "0xfd7fef4c21fe27d06c419c126302051066a76b6a",
  "0x73b679f48dfa71e044b8eee478d22622dbdcb806",
  "0xc70c5488bd2eca4cd345007e14fa2e1cd45da711",
  "0x971560fe12837755b6ecb2c8c21effe8442325f3",
  "0x38c006dc41f3c2cd004b79c31bcd194b1c0e273d",
  "0x9a366ab27ca08138b7a73e47222b1cad29f5c783",
  "0x840e22d01aaea97b7bfad7089a994e427646ad2d",
  "0x827fb1efb4b247bf5297c25161920e77630954b6",
  "0x11a9550ae67fc85554933d26eec9715d01483018",
  "0x743bb8871ca88eb46cb87508ceaf9163e0633dd4",
  "0xf7daa481ca09b2818552c9c5d56d5cc88cf18047",
  "0x6310d0ad15c12a42d278e1234d3b087e140aeaa0",
  "0x5b70e4587a5fc8e35ebfe6548f2b3adb1724f02f",
  "0x5a3a549aea8be363d0cf797c53fb1d0932e2d17a",
  "0x4a437b6078cfb41bc599c4379a9d27259f1948df",
  "0xfb3cd59bc2f9d68c97a6e823cb1fc75ea96ead64",
  "0xfacfbb40f154b650206415163c401f3174febbc4",
  "0x4ea58393ffed8af72e3c0188de8fda3f8774fff6",
  "0x0ef5633ccf06ea7dd4d2031d4d2e958d6f97305f",
  "0x5dcff15a0e3ed0ffa1d143e0bc773af017834f56",
  "0x037237b1f278cf7e2c94ae93e9770d7aa8e3499b",
  "0x6d31ddc5fba308b3f4678c5e377ae10dfec8c5e1",
  "0x8fdf9a7cf1f761edd912eeddf8a0dccab6ae63d5",
  "0x5285638aa28e0c9e65807a80cd6e29f9427c25f4",
  "0x08bfde32b96088c9905582ff9e26af3452a4c3a3",
  "0xbc5e4b002af645d4790e6c5a358f865d89d97073",
  "0x8c999b813a7b5ca3852f814a63ea5621f2255da9",
  "0x4535f7043f42faf785c8deed1ef46b170eabc9f2",
  "0x3fdc5c80b0d5146c0911652806d7f9a4fa65c6ee",
  "0x293f89d437e0e076a01d15a6718d6d5d66223193",
  "0x9785e7b42e9d08c1e2e17f21c9c110576d520a09",
  "0x0ce02d3a89efa218cd0f486514cae77d74b88bee",
  "0x440cd0a093aad60b77ee56965cc60c2381652726",
  "0xa44AdcFeD2B09Cd13b97134Bc37dCC3Fe6964e5e",
  "0x0438331A6fb1ef9ac41cb80c896658Ee572F364C",
  "0xF4914F025b45798F634fBE638d33701FBff3274A",
  "0x170ff9ce71675ce4a1a6cbe72ba4431eedf71cd5",
  "0x781424EE37831c0693334Dd3CB5CB90a1A77E279",
  "0x3918bD07A8351eEfb46D8b3F5BC1CD3352363068",
  "0x2312D7126a0a87114D018E762dc6CAf8A74f04a8",
  "0x910090Ea889B64B4e722ea4b8fF6D5e734dFb38F",
  "0xAF6a58AdEd7d46167957F071dD647519f1b3c964",
  "0xd732D553192277F48D591932D3f4Ec7A405db191",
  "0x2B838A5a2B8A2E80E965f1Fc9dFED63F1cC269Fd",
  "0x44601Ec1949110ae6ED02104f6a3eB327C8443C8",
  "0x92b8260899accb00a8094aba038ef48b17d42d31",
  "0xf4a7ff0b26d619c2a4f7a24549634198f147ecbc",
  "0x2dfecfb542983171b7b0f7466f74d4ad1e5e2072",
  "0x75945d229309602a450e0ec3d8cb09ba24271cd2",
  "0x710d5cd5aa21fd01215d70e190135440d06bf3ec",
  "0x750d93955fb5c14bf5568d81a9db3480212afe75",
  "0xf210579ff67e8418843c31466657064937f38d1e",
  "0x3a42c1af22efc2045ac826546b04d8148020fc9b",
  "0x58d949d7802145c6e253a9dbd3c6ea1dddab6dbe",
  "0x3e193c8719de67053412dd1317815acc5b17b611",
  "0x6213fd5a700d1a059e2fb05077c5bd1e626ed9f3",
  "0xfd5eacde8d00dd48f2993581ccd302441666f938",
  "0xe42c37f8f382fe2f2e042b518c5e72d3247100e8",
  "0x78e741110b22de0d83dd9c317996997d4463c4ea",
  "0x19cd02ea624ba69953bfa13e5ae339dfecfe09fd",
  "0xbba803d2e476167dfd1d78bd43dfa829e38ba9e3",
  "0xd508128639cd947b1397d0fd877e8db1d921266c",
  "0x57088edbb65ecc79a4973d652aeea57df9bf2fe7",
  "0x63a50484d8298997e9a67f1c09d9d8d8c1064216",
  "0x26d1e741d609baf126093b2c5494c7e98a3f23e6",
  "0xb0db8f67cf34e681e17aa0f618c9fc7a0746e042",
  "0x7911670881a81f8410d06053d7b3c237ce77b9b4",
  "0xb8609e56fe051c39cb38da3b17718a9150cfa8e4",
  "0x23e66a52e4f4478ca014406e427472e5711fc7b4",
  "0x04f43c60985d0de00d3d7d7ba8b0db2169f5b5a8",
  "0x9743397eb437be64e25c41a1e94a80308dfb84d6",
  "0xd599235564830cd7bae08855572915b9a9038e6e",
  "0xb110c28ab97ca96a6d98448973a7f6cf19c40a2b",
  "0xfab0eb31c29c756f9d77b2092173eaf2cd5f5869",
  "0x3e072dfac61f2a2cb570fc4f17f92535f0192b69",
  "0x0c0828654f0563a1d4aa31e17c9704b9ba496927",
  "0x791d29fdcf6ae46cc1015e1c9557e2b5a56c90b7",
  "0xcc9c2aaf22fd9634dfd7685e2223fa3e6279d79e",
  "0xadadcc82683dfae2622df86900f9c004bdc64ced",
  "0x07b5cdfefec4cd6d38705ca2c0163bb3d9e81e53",
  "0x60b1708e496f33efb9198fe5219656f31665d16c",
  "0x1e39df0d0f7cd2054e45282c18a19825ed942d1f",
  "0x547d7d856a69253e1bc47f5901e667341579c76b",
  "0x2705e58ab258cd01fba98d24f92b8334c323cbfa",
  "0x3986794609b7f598c6ec643fb5b5adcd2ff6fcce",
  "0x1c308bcdffa3cdafd2d2eaa740ae5402c44f2448",
  "0xe4e7048d40e2c83dc1da4dec2a52c7b7d0dd57e8",
  "0x10547c966a351b725191769bed44e8ed91f7b4b0",
  "0xa15ef336ba55dd6a70549f1e57389cbeb76d5a10",
  "0x5399906c8a73c6489fc6e58f983519763ec15f84",
  "0x113283d47430ce2d6a80b023d181800b51199781",
  "0x3b0332e1dc000d7ec784d9aaf7f19d37787e0c94",
  "0xda346e71d8ef3d54fbda6902f0ed1cb26155d6aa",
  "0x1b3c3ebc11a39d15ca36bbf3d68922284dfc6753",
  "0x3d7f5e64f5ce7b9602dd028c76cd4ed229d31372",
  "0xb1d1dad1460531f957c68425e5b2afe7cb015000",
  "0x6be15c881205ef234be74feeffa5b082a428b39f",
  "0x57f3a17eca242e270e97b3054339e1591eadfab5",
  "0x507c0dbe98945154db51c2b828db01a1eaf7b856",
  "0x5c69ee0ef4701dd3aec67851edbb8700c53e9cd0",
  "0x4c1066f0bdac0c05f099be1db98b36b6a4a63ba9",
  "0x4731cd32adbf2625ffd5a58957897c2c5fd649d1",
  "0x7380648a3c23d78aaa924530c2799c3f30858030",
  "0x0658d1287e32f8b45aceb7a3b4e3f9fdd431d1b2",
  "0xeffdd514912970a085f65f4f32d9c667d26445b5",
  "0x97edeb90e6882c552587f1afc4dba61a8c5fd8ab",
  "0x9169655dcdc03946be6d706533ab1cf6d66342f3",
  "0x60ce66b0d1c268447edd82487b97f02c3168963c",
  "0x7b07f77f84f29cf5f8d70faccba261b06945d34d",
  "0xf4ab9c471012a97a7891cfec8a42720fabd2fa2e",
  "0xe8220848ffffbc86d3c8efa03d5ec82a61b678e3",
  "0xd4acb74340eca0e086461be2ff5456a80e386a54",
  "0x92916ec0bbe52bc58ec1ad2bef338a8fe7399708",
  "0xbf4ad765ed59af33ccdb9e94c2aafe4ab3439b88",
  "0xae3dfcddee17942b0c24aa42501d8771fafe386f",
  "0x6d935f6ebe0b21ce62bde35111f849ee5b25fc79",
  "0x473bf1b1c8bc6f8f51a511ebea01983533393bce",
  "0x8f81a669e920400eedfbbf0c106183fe5479e965",
  "0xd34f2f775018af7f1cd69f907486d31dfa48e860",
  "0x2dee72a560ff4d16f2fda79a2285b95f976a344d",
  "0x6a2fe929ae32e03cab1594eb2f9d254dfaff5592",
  "0x47e435bd4e265e21a775d69ab26a17e4dc716c26",
  "0x6aa3e0e6e89549554dd0c83e2166da567dda6258",
  "0xdfc31a52143325237d8053d93d1299163c6d4576",
  "0x89107367ec98502241ba3716aab730aa0a28db15",
  "0xd3f70b32d96274a532997272efa7de71124cd536",
  "0x234ec5a19b9114b17cd7540b2971cf8ae1f4250b",
  "0x4aa2341a9fdead38ab48fd78a9358b0365674229",
  "0x3ae052086f90b8f5359e543b0fc5700f60afee91",
  "0xb584db55b3f8c7ae31d9f19e4c724a386012d2e8",
  "0x004be1301440e6faa824de3eb2eda103e720d69c",
  "0x114ef6422c64379cae0f7a7c15f9fcd909252420",
  "0x5b73170cb8cb8ddeb100c1e889919861af445a81",
  "0xc26a52c006ff644dc52dbc0a5e3d91da31ec6da4",
  "0xc2426753dcaad2174c81e40ca31b50156fbec4d6",
  "0x4c77ff39a722a2d314b4f201d29f9b760dca6c90",
  "0x88ddbbe05767d2db0bd766fc22340c4e91312489",
  "0x79292ae80bcc1da24083caf904189555ffe9e68f",
  "0x729033d6d74352793d83b6e8c1ececda9fa97db4",
  "0x7459792875c2037f94aacd0d95a928d8172e3f5a",
  "0x7abcc7a7b4fb76f5bbca829bf49f67a4aa95d8aa",
  "0xb9ce9529627024fcaeb1a6365dffeeff5f52d573",
  "0x4161e82828ef56ec05938607f646cb23f221ec8a",
  "0x6ec0b01893bc2508106351baf403bac6f819feb3",
  "0x8ec9421c8c675d2caa2e8573badee5e40c1b5fb2",
  "0x956a3963febec0c7682d86b00080afbd7cba0cec",
  "0x6a80789240408afbc5d6a1ab26e3142db634b088",
  "0x82faf731f8194ae5fe065c8ea982ff8ef9cfc9ca",
  "0xbc2af0659a12b497376f4d7d7d08f3e25de15ce3",
  "0x5ea917200742fdf492960abb701b2fc213d05f45",
  "0x4a1d6b8596bc65aaa4a51c6a276e02e90292afbb",
  "0x0f19a512fe46f2ed2c0fe1ac926e4f52723b0824",
  "0x242fce2f05f6d71d25745b0f7921115f7cba9674",
  "0x6b03cfb59052b3729c12ddc48508604ffce89495",
  "0x24867f3586148a9ca8a354b7fbd32254f2776ac5",
  "0x729ab043d9535dc9b2bd6c29d2dc2224cc54a514",
  "0xbe63fbadb5537302c3608e9007f179b52b7913ec",
  "0x5c3a3a2f5c0864075e2065dbd4c703762d240883",
  "0x9bd91f0a652df2fde9a90195b2b698b784ee9c76",
  "0xed5396db12af331c820c3b58a9255a78f6050254",
  "0xcd84dd3313d5fcd55f420346b15b7b33e791f0e5",
  "0x1b0ee1e3a63ddb908e0b5997e11116a577bd083e",
  "0x4fac752d5800f5e11541ab909c43cad3f2a27a1f",
  "0x1b11ecf3d36291c0ed97efa5f12e809dd18b8aa9",
  "0xad4fe44a3987a1f37a738a2044a78a9a0e18af31",
  "0x033adf72c1ffff7966095ae9727101e29ff53437",
  "0xb567adae96f96f86c29a879c665a2160cf4273b7",
  "0x0072b0715454fe4702c67dd07e239f234cf0deda",
  "0x423363acf28760ba8700d427cdd7252733157464",
  "0x1a3de3693a1c9ac60ac098edd287a98ddd4d3be3",
  "0x4fdb72c30615c64df89949182d5d2a60cfe8ab84",
  "0xb90ca4ca55f8290557ac7bc58b92e9b54b89563e",
  "0xe0290c2cd56ca577b701a1067c470ccced9a5af0",
  "0xfd4c075a629793f281fae305b19802df4b00899d",
  "0x14a42b9062a1fc4c2c2ae8adae93d88b9784c26d",
  "0xed5c6ee508cda345ff3103265d39f1e537df24f8",
  "0x482cd06e04ba4ebe1c1d4845e96429486981812a",
  "0x564a821d55576675999fa99cf481a012dc8f2aac",
  "0x7c8ab8483b2cd49a04bd02757c04dd6d2f781b97",
  "0x5d62d6e587dd35dbccf68f1560ef6b87abc14439",
  "0xd4fc68afc51623c0a26396c2107a3684ac3e00e3",
  "0x6458dff1da024941e77a85fd1038cf985baf9d7b",
  "0xf8dcd113fd41b2ab0e73896ccf79ccdc467bb7a3",
  "0x90dd7edb9d30a612e4e7bebebdbc25c025e9a862",
  "0xf808ab6f4db2bbf5d1837b51283a5de5e8724edb",
  "0x64d6f7f285e213a9f1e3b9614d3bc164dcba789a",
  "0xf8fc3630988b4f1d33540daa9d8d4125d7b7935b",
  "0xc41bed8dfb9c44f80740cca2c1d05b47c2dc12fc",
  "0x82b9b5be72725b264d1fc4ea045d8bcc1bcaf205",
  "0xecc2f0aaa5b8bd6e7c75b9741294bb4da52af5ae",
  "0x2c9f55f071d2fe5e7649f22e14472dd15c589765",
  "0x50505ecd5d7ed52e9763287e8b2fa0e724731265",
  "0x058a6a063cf0c6b3d06c41d6f3bbedd366fef593",
  "0xbae22b1f071e86de944a9906ad5fd6ddab08cfd4",
  "0xf8a505edf6c626219ff5e1b5ab8799e7fee8970a",
  "0xf923fb2edcbfda1abe28a5be2375e74fb96a80c0",
  "0x01bf87d76339c258c5e420f4f1fd52e49be6f929",
  "0xa4ce87fbff84ddfc797bddb2541183070126758e",
  "0x913bcec2791689f1a329fc2999dff1e12ed54200",
  "0x17f97e132cc8db841608c6dffb365510bb5ab5a9",
  "0x7729421ba351072768da8fd1ceb9bdbca95160ef",
  "0xa928f20295089fb7b03f14fc43a6b207a7fa4622",
  "0x00df3b37ed7302ee504f61747ed38dc13bd165e4",
  "0x2c4a6752755870f63c7400fef82e9e053e47b579",
  "0x6a9b756297cdfaa6bc76f79bdfe52943f2ef75e7",
  "0x03caf3d7f3ab920bf4a521fa13f833aab6790533",
  "0x2fa07798cbbfa24c5d96920065690e66239c1dd7",
  "0x38abf24b3b911ba1766e2b871af54a7115d83b1f",
  "0x44ed589e1ba1a7059363cccac35319daae10c6a9",
  "0x4b4fc7eb594a727bfb5f33ecbf900826f5a966f7",
  "0x22c6b50203fd8225c2f9766845bbc72787edc04a",
  "0x700f17678e222cab349a8812286b879925a9fd90",
  "0xfbfe41837f7ac4d67e673d5f218f649623c2fcff",
  "0x13e404c1e6ed76c2ee902e89d2cfba1ee1204e65",
  "0x392a083d0fb31d31cdd850da4dbd88a84a2d22c3",
  "0x5911baa5a06b481696079cdcc0701d41f587c4e5",
  "0xef5f80516b03201c91bafa36ae5db4bebb5ef71b",
  "0x85d7c427bd833fe3d06b36e8d136fc95a109dd56",
  "0x49a01eaa567f055dade770a7457cec5123cacf6b",
  "0x6adc44d8412e939fd36584da3d84fd0cc9116a30",
  "0x07cb6b65863d0dbc11044901a7b7d80b96a3599f",
  "0xce5286a583d12fd07e63917631ddcf9e4926d4ef",
  "0x76f26be81510e628d38b9d7b16811849a3e983b9",
  "0x56a16710166d72f5e7a330a221a45198c8ec7156",
  "0x6575266b588ccff2774745f1d63a592df0f0ad8b",
  "0x80833a97f52db2a7272c55f09b6bcd9a84f1ddcb",
  "0x02876ae2652497d53172b7a524d72dd4ea86f4cb",
  "0xd09d5423374fc13b5a43bec5cc7dd58fde063420",
  "0xd2c8ff2e94c990be91a4df41e4fb20f032a97ce5",
  "0x94a92b242d8c78189e5c7499025534ab5c449c84",
  "0xb9db89dc838602ec3144f988705d9ee05c9a629b",
  "0x3b02b9339cc00939d0b40eb42b0d4c1aadd1ecec",
  "0x4e8eb23479bc2aaa4c331109164528df21f23c7d",
  "0x48c363b1e3ae5054b87d4550c9cd7fb0ff27f43d",
  "0x6930043a23796039137435a7d36cda3123256a86",
  "0xd6dc9b14c635ad5d77e9dcb780906f32d4f6b996",
  "0x1a9bb80224602cd9e5e944be325feb54903cad46",
  "0x64b181c6385a7d50ec9ed9cba9e432d2ee5afbfe",
  "0x474b710410db98a87c201ad7048b7fe55dac41f8",
  "0xad73c617e4acf9896be905ba9e2f3b017d9990d7",
  "0xc6ea98c4fc7f731346815ba1e5ea337caf1cbcf0",
  "0x81b35c8c046ccbe10a83e6d2aebd8e606b8acbd7",
  "0x824f971261e922588f6c0ea3d19fa38f993d3e65",
  "0x375eed0933c2ae6bc3d4e5baa03138f7e33a6fd8",
  "0x186c341913c2daf5ef45962186866aa69e8536f1",
  "0xc2cddb516a5cfeed6fcd3d97a76bc9d3ce929c8d",
  "0xf8ee7222e195c7813f8040e6374ea61f4278af9b",
  "0xb2e11aca7c22d24c7035b4dcd786958faddcd002",
  "0x2a4ea867f7892d22528a4c14456c98621c505a4b",
  "0xfdc9e8732dcb3596e42f9dc2f4b3d5c7d8ea2bef",
  "0x2be83fa10dd2eeb591d4e45c7f9c96a890b662f9",
  "0x88390c236b3dc438734e4b6d2584e5136d10d51e",
  "0x14e24775cdb13c6014af82e82957de320f3d6b1b",
  "0x31151215926636ec8d4f411e0158f7c4182989cd",
  "0xd9a8a0fb784e689da100e6ced30444a65026a6fa",
  "0x5bbc9dd4b081a1abc140ccece156e3cab556d2dc",
  "0x42f306a2b5ad5de95f3f341381287e5b44e80e61",
  "0xc8294eba7ebaf5064c62a9a5cd8a349790a6dba3",
  "0xd3cb8cca8f40aec9238db25b266699b3973cac52",
  "0x623ca3dbf0b379be121d45df20fe9e0094e46111",
  "0xe951ae38003fbd35dfc0300bc34a59f6810f329a",
  "0x8b9c0620d814e13b5b330237ad1fc131ec735782",
  "0x189db2793a1ffc263e7f8d86b3975c0e3e28b146",
  "0xcd79e2a11940483ddb4337319a6b95df96436990",
  "0xeeeff169db2b69d530e7b912ba079b77d9145b3f",
  "0x5043a7b5812376190d4744ff6cea18b5198ceb24",
  "0xb9736e36c27ec7010190ad5d9a3602b2f5d74262",
  "0x3c8256ce9cb9d4f9194982ae409db196636613da",
  "0x3d78643f18a612e0a2c9e45491c8142522028c8c",
  "0xa441f6b7b240df8bf5cefcb83726cec563a74de3",
  "0xfc6dfe0406f89b175d7f8ebac8db6e5880744ecc",
  "0xebbe15457bedc2c74603d95aca99f80141765a32",
  "0xde0de93cab36cc6da92ba668a828f48647363fba",
  "0xf0cfd321d3d4f8bdefc9f81fc532c4087e349d92",
  "0x8d3b4cb6442a3fb4bc21b308df059b878e4490f3",
  "0xe42f5022d353fab44c25a221c3340353c623bb76",
  "0xd39791e175970f5dfff3333ae244571f95367853",
  "0x590b3d610de254ae16a2c2d8a1052a5591a32b45",
  "0x4038c92e548a7d3fe5fb7e095c6bf3d849af7bd8",
  "0x92236bf1a99b08106c51571d981e6c608419fca6",
  "0xb11dbe6fa9d7da9f33fdaa4e27c7460cb82e03ed",
  "0x9d251fa4bf9792aea4d759edb9b712ef35b89240",
  "0xb1c612ca9e2a64785f35f7a16b6a14422ccf0102",
  "0x3686a6a7417db906fd2e56556d13e18fb24c98c7",
  "0x6f56c42e0a38623fcc246aa03a171b913be08906",
  "0x097a03ba41660ad8382c59bbd6ca7b14b66617c2",
  "0x6665b0f2e208bfd5ec6af4c1bb84013d6758322c",
  "0x226058638dcdfc1885c773b93ff0612f764397f1",
  "0x02e399b2eddf716fde8e9c1086d1a8d34de01011",
  "0xdeaea7cbe675f80343a590facb4549a995d46bc1",
  "0xd83032cc0b0468aaac6c1ca1d1e447997a39a531",
  "0x789efd337c17d124ec312f4a9f59e135439792a5",
  "0x72b4f933826d282c38ba63c914e83630d85326b7",
  "0x6b172fb540c1e7ff24a245e3de5eed28b638fa3e",
  "0xbeb6d98967ab52e5bd7362f3519ca1de2bb05ef1",
  "0x67a0c1e4ddfec46d3e3456f6b9ccc50198acd5e8",
  "0x68d04be9ff8ba9972049bef837ac1592eb21fce5",
  "0x3a32b2c4f396f837a49f0632865335956bbc68b0",
  "0x1f3a3a5f2bb44797c9ca889d50dc3dc1a1cc1fc2",
  "0x1fe6f581f9f9411d30a1a1dc89144eaab34135f6",
  "0xe0affacc943ad8a45c19306fcf1053b4c103bd48",
  "0x0c3cdfbdb80c74ecf9ed2eb0db41ae2c7177e5b0",
  "0x79d9116c5ea4433e13f003012c085d40265ca58c",
  "0x85e4c4aed490fe46b400abeb30e2eb8a1feb66e3",
  "0xae1a2dd06e3d6b8d1deec71c160c7697a379f93a",
  "0x789fa5cb1edab78b5cb80e5b654af5919bbea6d6",
  "0x9ecd6748c08486eba2d17fede3b484b93e364e8d",
  "0x0151f0a56057829c124b02e9818746e5423d7f24",
  "0x7cf6ad76c852abbdc918fa637773e54944297fed",
  "0x4e19e8c7fc35ebc6a6156ef61c10fd0b705d9a41",
  "0x390def5050dd6e526d22d26f90352105c194d476",
  "0xab4f002cfe1a3694377c4acda400180c176cceb4",
  "0xc0cece95166859989155bf071c49815c240004df",
  "0xae9137b6709363ddd7c0c5e289b08e4483b2d982",
  "0x8e522ba3da3369b3f54e8c350fcde3a3b669fbfb",
  "0xe70c0c3aab4e8ba3bf5d11014b9ff998d9ddc821",
  "0xa072f83a91162d63e3cd681eeebe9a339ffe555e",
  "0x3d0fceb8c90c2c8700b695824cfe753fecd8b934",
  "0xb85f17ed941fd0c46ee5c7897208a7fbfd94d792",
  "0x1cfec78168fb84441302bd3aaf057650857cdf5f",
  "0x76ae6899e37f44fa08f7a746c69795ccc8b9cdb4",
  "0x28b3ec9b4ddd3fb9bef2375eab9180856c32ceec",
  "0x62d081361d2d9cd4b1d6373c8d97ead38510c2b8",
  "0x24a6518e097c6c9c9d8908dc6d72fe9c61f4beee",
  "0xae1ac376f98827272c41e170171a8ce8c021ebfc",
  "0x3f06fc4e524114cbfa3c63393b8f55f373494413",
  "0x7a7f158fd52d3e499b0a29bd57f416aab94ca947",
  "0xcb5a1d45eeb40b2f481c4d9341ea6f821dbdbfa3",
  "0x5106178372f804a566c9ced6f677437ab23e4e9e",
  "0x9407b6e32cd2d0dfdbe09c7602419c0825b0d079",
  "0x754c2b70af75f4f04a8838af60306558c2df51b0",
  "0x64f8817abe78d1811fd41f9909208152d34c24ce",
  "0xacaf6dd5aac811d06c45a105aed016ce38f2a72e",
  "0x644513f4c6ff2b451f1c244ee705c66e7f18628f",
  "0xf275c4e7b0e4c6e80c8bb041c83a52a8ac2124d0",
  "0x2c188cc6ea68e128487517932dc7b1cf0ac9def5",
  "0x3c8ab210d46d0a033cd00459be9e69c22f0ec860",
  "0xda26dedb9c9acc191a533f67a850963a17287a7a",
  "0x4da3201f9ed001dfdd8292d7f33d189f54a41c2d",
  "0xa0adf6fd9649ee77cb9dbc221ec6fee279a4dc2e",
  "0xff1c92ecd1cb72d8ea3c32b415b7fa07aaba175f",
  "0xfcc2de165e0edca659b021370efdefe3d8f25a89",
  "0x4c5d0741aeff4707cbd15f66b4b001d7301ce547",
  "0xa9818cc5c1372721ef2026c9d3663dddb7d4398c",
  "0xd68bec405a593f620cd59f02bc64b5cb88b69d42",
  "0x1d6d96b9c954193b87d7e6009998a2390daab1ad",
  "0x092c2c9590e863d97686a914dcb8d4d152a5a5b7",
  "0x08a45ecfa381496b42133fb579ac6e012eca7310",
  "0xf1314d7ebe61974cb2c53784e227d26be0fdc181",
  "0x41890ddaed0e9846800b074a7243c2ccea4706a3",
  "0x913b6593aa300214fcac1b41f8b87bc78624e392",
  "0x766954c8e75a99067ff5455a803c8f5023d1f08b",
  "0xafeafe67e4f6f27e18a9ffe41122c5d9d0174a83",
  "0x0ff303163ff9bf990ede3d736999c7bcb42c43f0",
  "0x501913718b2dc7acfb7ef8d4815199f9c2b308f6",
  "0x5fe66ada564d420b25f93adc2a0b85922f14eb0b",
  "0xfec63b79ac3a1f4dbddb71efc52455cf26dd3078",
  "0xb60ba801bf544a20cbfcaef7dece4652d814cca1",
  "0xc184c7595496b9b3e45cf8932a99d9e42e20c53e",
  "0x579b8bc306a73981f9bee59baf0f42cac8151138",
  "0x0f730a8474f9171a0fe1b1cc58fae23d74b8ebf1",
  "0xce7fa44e60aaf696fc552fdf07fdb282c73b4246",
  "0x7f74c51760f3a9d4dd93dd774c92daa040cced3a",
  "0xfc158c26afc43fd662ca6352cdf7f77ca83324d3",
  "0x250e7a4943bee210894dcf448a343b3c05c0e27b",
  "0xb27692ab696f8ca3fc79e0616806ea2c99c37d83",
  "0x427b699190958be0b2485356b45c113471880363",
  "0x5b23903407b8030d8774600812e162b50bf86cb7",
  "0xc9ebece2f7f3d5102622c4797d34794adead71c5",
  "0x8bfad43cc79ef898fa12b5a9730152963a5cb885",
  "0xa7bb926d4907538cfb6a509cee7d563c84825ffa",
  "0xb980a4c132e9e47856f6e9de3a9bf88b2fabf705",
  "0x19261c61520212b7d92708de7f57f0e356b0fa09",
  "0xa0b1555035f9133adeee82ac2628f52d35c3e2f7",
  "0xd0584325ba53e27050494a2883a76a7ac4163de6",
  "0x5ffd1a9e9e47e5ae4bfa1d2bf9be573a91c4881b",
  "0x0a7aeb6807e55e44189b54c983e606fa1fb38960",
  "0x1961251cc556cf293473130a58d8c468c314e498",
  "0xc31fd827c9abf0443a8f6a0c2264633989da1c14",
  "0x342b48497170fcef705bf7a1cef7e2992c430c9a",
  "0x96faad3b63263c530bb31ab5b8c1d51671506ae5",
  "0x26f55eee397e6485ad91a54569907b04bd353934",
  "0x5f285167da6e562b1a5b91d47d81270f96431c95",
  "0xc6b7b0408014900ac9fd688917d996191cad2926",
  "0x1cdd19de27cbbd5a3c4360e68db3ca00aa706b98",
  "0x56b9ea87e1beef99e648380ec93a5136fabe4f05",
  "0x75b3328870b0ee1b5cd2c9228672a22f1bf09784",
  "0x723634c9102899242373c0d108337c32ed8e018c",
  "0x4e26e81e579a91a8646b8c008453621f867a32eb",
  "0x50955d05eba9cb2fac92f0e09d9a74f74fbfa69e",
  "0x3a8509ad4a175cb6534bda1399358dd46a0e592f",
  "0xf4694726e0d715c5a132dba94c794f33cb887220",
  "0x5ce4972823b89091acd492b754ce7ea59b22c97a",
  "0x4898a3c96eba7dbd195ca8346b7fa051305a8c1f",
  "0x1c203499121c1c65f713d6c6f76d18588d88131b",
  "0x236458ddb9a8e1b01347042b54403dcd3bc5b4b3",
  "0x4828cf4f5e521937939e5565d89b8c3b2aa10a36",
  "0x5e26e83ae1c2e39a98eb0c1952e46552cf5190cd",
  "0x888880d396b385d371281718940dad136119c6c9",
  "0x5c7b8aea7d0da540efebc835129180242387f5c6",
  "0x140063a309fa9cab5f50c55ffd4fae592177a263",
  "0x27b05cbd0cb46205723b59c0e1ef5f310087e86f",
  "0x470ebb611657d4ec550f417c952547f35d835f0a",
  "0x8ddd3c104f48de88d9ecfc80e61ca60aa092bfb8",
  "0x32c266dd2fac6269af4a03617e73397865b3f7ad",
  "0xb86064ae481935fcad43ad2832dbb588f06ce934",
  "0x7bcd7a26283cd3ce2229206667923e912ec70d86",
  "0x780cae18fa6a450416382d15c5811b3aa0b9d5c9",
  "0x69a708d9340cb6dc1e90fa334c548a20cf80d864",
  "0x054ecbf04f10926e8d0eed8f376bfadb9065b237",
  "0x728788e3bb15bd1da3f373be7cfea47eeb90c44e",
  "0xc52c8731a43bd0bbf593075e9d704cb44a1f5fa0",
  "0xbfc7c69c5cbfeeb4a1887dba1622c5f96aac09f5",
  "0x3ebe2dbf88c0973ad17d010fcb5a85828a1d36d3",
  "0x1c40bd892eb3ed547b5519ae3b60faac0ddbd0b6",
  "0xcc235c4768d3296b0e4e2b79d8ec25200324c78a",
  "0x1b30c1d67333b5c3dacc649876bf09b6702ab8e8",
  "0x66c5ec661bf3efacc24d61bd188f05208135a4d3",
  "0x84576e575fc2f9f0211a4a06b8895f1867af2f80",
  "0x8795e36d4845a21524f5d67d750f657e3de9a2ff",
  "0xf67e06d74d769cffb35364563c76e5138987af9e",
  "0x7906fbe48352bb08b5b3b398c44850ca65959d36",
  "0xa04bdf6183f0f128052825ef316496476f535077",
  "0xf261fcab20fb90ff11d420bdb25287e420790227",
  "0x21c319ef2c957e8a9e23af5e1c66134659183dcd",
  "0x495c04292b85f84b69a99d625de30d646a042fa5",
  "0x8d3d6234c75cc99b4053d354757fb4e7f4633744",
  "0xe02b9751b07e619e8eef8216c93198d3f885e608",
  "0x1ee9edf3bbe36987df13cb76b174b74319ee31dd",
  "0x5da93f1641bc417d1210b2a0f864b4eed241d39a",
  "0xdaafe8b9efd3d1c3e3f2d54d219740d3b37d1327",
  "0x65be804c0a544f194994c2f3d0951ad55d6e05b1",
  "0xbcb3af70965c5412fe92ccad9f478ebd65991f09",
  "0x9a9010b7ffb63baf672c36b0f2a343b127c5b1fd",
  "0x6a6d41a6350eb9662550dc7252132658eac90653",
  "0x1f79d93688575337132c7529624e343e7990a124",
  "0xf76908bf4ef5ed8acb091c9e41152fd4367115e2",
  "0xd15b8065134b4b875e7d3974ee59106cec170add",
  "0x014d6fb3d4eb85ee83a8619a403c1732c3b5933a",
  "0x7bfe1ddea8e066eafce3f20a2c23f3ac8db075dd",
  "0xfc19bb2b251d71ca023a37d3c281fa6879a51d02",
  "0x329e5624b461128d3469b833f18a24036738b83e",
  "0xcb504a16daa231e00c6c9862cfc61cf5fd76df76",
  "0x4e3b43222dad5c9095fe3e16b5f84c0699804a3c",
  "0x92a624ab8ab8865aa7e2f721ef5e93ed3685872a",
  "0x0a5ef2d3fa3167a9beb1878fa37cf15dbc1cf7b2",
  "0x377d95fcd4356f2e37799c0d3b7ea3d6d468e62d",
  "0x7cc6434a8876638d042e51d0320e6188d3fe693a",
  "0x05298cc9f0c9176852774e9f7f43a5ec07083817",
  "0x6ead3d0c2966c3bb66aec5d66dd6310fd1368b60",
  "0x5f0e6117c1a7c4cac61b763497333b4076a03186",
  "0xcf01dd94448c5190583a13ecf4db30d82b47c5e3",
  "0xf35403269b1d3b6cd4906b14375f4e6953665bec",
  "0x6b8d5ad1b5d6a0ea7e161ffcaf0e940bb2a0695c",
  "0x6bfc63276d711c4594ae9950b7fb56002968c2cd",
  "0x4bc40b69fec7e79cd67d16fdad51b123773cc1b3",
  "0x53ca6efb9245b3210f5b357ea0de81bc086c360d",
  "0xad80a189ecd82b22262a3dac2cda15dd6e12a6ef",
  "0xc930dc591f87ffa37845a7bea6f3b5e59a8341f3",
  "0xc32b83d6e008a305ce5ab8d22f7b43db14d076a7",
  "0x164156822c39ce5bca37a57fb626db3770f3e6ac",
  "0x30aa88da42006e499863329a857c0b3812a9dc1a",
  "0x8f80bcfb60775f92a293d1a309d5cce6a3a211e6",
  "0xfe075135c630b3599483907cd95ec3ad5d0b9a67",
  "0x263bf65791200f62ddb4ffa4b7fb8fdccdb1694c",
  "0xe73ea9ebe0543c28606ef7b4ebc35bb60980c1ee",
  "0x77ad888809227a4aa4fcd2eca1fe75d1162b39ed",
  "0xcf1dd1cf76d8fbd7dc5a209443812909c9823b79",
  "0x2862439166acc0f6c47a5d3c7c07a8d4e3eb5faa",
  "0xd82e5be41d21002d8e1f85dd74c976d6528f48c4",
  "0x979a0e1e98eebcb5cb8a008fa47f91459e820129",
  "0x44c577671ebc29b5308828f6ff6f29874be01b1c",
  "0xced9d6a1935dfbeadf741a44f07317abe9e5cb6f",
  "0xfffbc996737fb3e30b95dea9979ac9d28bac480b",
  "0x88e2b965618cff0ddccaff70864accdbc1c769a7",
  "0x537d266203e8e9e864cbebb4fa5bbf4a973e9760",
  "0x5ea46525f5eebc0dd2ca876afa3fe88835e4351b",
  "0x3455ebe9c67596cdc80f8a3009903a7c4b9761bc",
  "0xfa52083627050fe69b3d1f917837fb4037172017",
  "0x2dd3fd2f5e0a7e1481431e567835a261c3a3b53b",
  "0x44e2d735f7ff51bdbac5719a0ef44ccc9530bcd9",
  "0x711d58d28c0d6755fa69277bfba3c2a2b0b1f570",
  "0x75b44cfa737b642895381db781ae476f396971a1",
  "0x29167e2e54b62f936a18c685cfad2838287baa2b",
  "0xc9aabcddbf8483e805005e560fe2aca10baffac9",
  "0xe4094bd7227958c7ab3390282ac0f0b88ce4f334",
  "0x200880ae9b8c9e030698ac884962f16fbf044bc8",
  "0x7e97cd33eecfdb9cf51e4b74a2aa8cc0aec8d616",
  "0x5d53775066e7faa81fe8968bb1e91f12ba9002c8",
  "0xefa29c7f6f4ce8e442666e68760dfc14a3db7315",
  "0x2999586db2dc55177715b804d92dee31d82c3bf2",
  "0xaf970c264993f68582e9db0a3c11f59077c9b8f7",
  "0x610e723452f13f6293701bb83a8ff39d2d94d7b3",
  "0x060991d75e17ebfc6cc52e42aab271abf2f8b888",
  "0x5cb923973f1eee983a88729b19a4a2bda3a43d5a",
  "0x18460e2560fc28ee875335382b250d385f457e33",
  "0xda3ea1cb1c026fb93622248f914243f4214024fe",
  "0x5fc710eed2bc61f1d729f3bcee5d84f38e1cbabc",
  "0x8c44a19e9ebf010e122ff9af3f9cfedcf243cc6e",
  "0x80b388f07705a7f5fd3a7b8436a49f02e987e796",
  "0x608d41604e796adbd95435e06388de37553197c3",
  "0xd912ece0c5e4f2625e89618e645ec718ce187e6b",
  "0x7dd9829ac138eb9d13c58e188682956da621e38b",
  "0x67238bb14a450e50ab909aa6642520d0cfa3b465",
  "0x4b6caba8f15327b33876fa7489364521bee49e07",
  "0x9995a71d3ca7584487736644a4785c59e7eb7e3b",
  "0x357a1ef429cab377bc111bfd0d66f3daa19f0278",
  "0x2e1848acaf8adcd3be1db5ba655f161a4eb5cc40",
  "0x8270e5cc61ec7176656b132765586797027cac97",
  "0xd38efed51f92598b3422be7399bc744995fd08db",
  "0xb18e3444b9754a56b10261ccfa0824ccb2b46367",
  "0x1d728068f97863db51b5328a88d1f9d03b864e14",
  "0x01370d3a262cab1c42f07695a6f4bb5d8248e4fd",
  "0xad60c52ab20a5268e26b52bd73c0b0ad352fa31d",
  "0xf3663b762f74994c12ab04e2f508285e1669ef6b",
  "0xa44b928015c82819270161004a3499838e701f93",
  "0x51a216c5e2e67ee1ea1ac7677e4da33ff161d21d",
  "0x9f96d3b217ccc7bb67c7be4d018a3de896e89736",
  "0x3ae06f2488ab961aa08224041ce6d49ebf313f71",
  "0x163a5eef5961190808389b41769b5431aeb05d42",
  "0xf9f0a676ab591f24a79e7b71b16fac4f011378f9",
  "0x9410350d3e0b5f18510d2f23d5ae040972def2d0",
  "0xf1288b5b14f438c97c0a9227202d501360f3004f",
  "0xd9b26554f9cafe198c121c77fef196923640ed7c",
  "0x6a4dd46ceeba95a068b026d6ad5638d02467c19c",
  "0xfc324dce1dc49ce5680b5b28a5ef7d951835dec4",
  "0xd1293f52ac54d580ce628258c08026cdeff5e307",
  "0x7bbff0d18052b855eb0caf8fe657f927fa3ff880",
  "0x60823dcd5d8b2f9b5d9af57007567e503175f5e6",
  "0x442d4f0ca6c5e3173b3717e829b391e3adcea261",
  "0x67fac9d281051b52ec8a728a2727219da4d029b4",
  "0x633164429b4795ecd6801d503772401d9b2ff06d",
  "0xecf51baf0b7a0bc0193d51fb64aa6aefff03a1a6",
  "0xbc6da9519e048f1cbdc8f84a0ad9e9a31e60128d",
  "0x6df24cbd8874676812231afb6d43e8ef05fc7ba2",
  "0x9fbe416baab4a041d84076552605846708e3563a",
  "0xdb9622e1b2630897a54cdd1d195321efe3737193",
  "0xe038aa3033155e5c898fdda7d1659eee9fb9f635",
  "0xbbd1c5cee1504e6f55bcc95b167138bfd60e4c34",
  "0x8604f60b02ef8a27d05efda63a6975af2a68884b",
  "0x7a1b9d51418b274ab392472405559cce9f22e63f",
  "0x7dd97c7fcf8379b5e575eeff3b187c9f3fa1f625",
  "0xf346879e1e1c2ff46d81532e233f12f746fb8ecb",
  "0x4ac5b3e8813861010f8740811bcc2fe06cba5855",
  "0x840eb8a59ed8c9ced4ace4c9287d5780bcc54f8c",
  "0xb40636c060adaaa2ea2968b45b971941c58ef5c6",
  "0xf6c577a769535c82eea3fbae1aeba0375de8a9d4",
  "0x09c52b117e9075757e3562984d4960fb96e6a995",
  "0x67b2a34e62d6eb135f8a1356dc3b01ac4c010bb0",
  "0x2ee68b9e576cd21c7a5b3ac4f212facef491f768",
  "0x4c7e99825b6c0cfc49226993020ab414c0b93dbc",
  "0xf98db5bc4f270486bd86d7df4bed8644e853307b",
  "0x604d62356c5cfead7c338b0ecbac4a3888935066",
  "0xde653faafc3d6877945597ff79cbb25ca8b702ab",
  "0x72eaabc3c5bc8b3573654a896258e6c01ae29d60",
  "0x4dd67e6ec8a943de7a5d96d7372c9f476bca30be",
  "0xc63167c33719ad49b14506c33f6698bf53160418",
  "0x0dc8f1d9ddfa5e758ad090be6a2aaef0b55f0135",
  "0xac7c7944b6b0a2de5ef3ac68edd8938c0aba97cf",
  "0x58c582e4ee9a8c0106de455fb59205e3fbbde3b3",
  "0x7a315f0f68e94e7f6943cdcb326175b61b31f25a",
  "0x16d18cb9910a8f60328f8b67f2890a11a16cad49",
  "0x1e8ad7a622d79c105e1e58811e00c333db5cfa1d",
  "0xdfa381ae02f1e1fdf1472d7f0845bad0324a13a8",
  "0x649bcd31cf7745b8be81f0d6e8fad80f6eac9211",
  "0x0a4689cc520b6076c2dad6d838782f2a15d7a3c4",
  "0x58db14cda9fa7413c300376308ea0387a3e34d83",
  "0xaa5342ff4366b62d97602bbf8729e6149f06af2c",
  "0x47eaf03d3265247eee651ef1ab5c877b9db38eb1",
  "0x0d9ecf95e9c2f5c7b0832a7b21b9fbf0c579975d",
  "0x8d7601600d1eb570880dd20eede8e93105eee1bf",
  "0xa6e956d71e9f0ab635a1cdcf11702caa72081b3d",
  "0x3c3601553022a3ac1bf95b30f1c6df36045ceeef",
  "0xf04497532f56f92a243b2930ce863c9e2a9607bd",
  "0xb364d0ac706488444cc29f8352b2ed2bb4f156fb",
  "0xbb632fee12b876b17563d84496e52c1aa3a36409",
  "0xad3f3fac137afee90e4912df33bd82bd46f4578b",
  "0x84545e9761d1030d30d3fee4deb9aaaacfa7b78a",
  "0x929136634cb5d441a9a9bb3d343ec53984358262",
  "0x8a1aebc05f87a31dcf909339e99b52c54a00b6a6",
  "0x3987247ef2856e1de3449969e3d88006dc48c661",
  "0xe9e26a29a9d8580e386a58e68a1dbc58cfb26bf3",
  "0x61b11660b9394880c22df61030a59fb34f4de418",
  "0x395bb7896becf1f1eaccdb57c590cbec170cc520",
  "0x4393b77a22a2308943844b78421016bfd3740dcc",
  "0xc925ff28ff8ca175a4ab0387697429d3f9e21775",
  "0x136fe17b03404e455060e27131fc798d3e83c52b",
  "0xe411015a6ddf7b5e150928faad6eb63a35ce6b00",
  "0xaf5d54a44d4fda48c2dc2479dae22fb73e0fb611",
  "0x646b03dae788cd1f5f664854f38c7f352956d8d1",
  "0x97953a5656ddc9bb1627e5cd80043fd754eaa5d1",
  "0xa9c1d20a36b4100aad94f7478d1c08593f5bc93e",
  "0xd7592f2d2dfeca1465327e17dd19c96aa9da63ae",
  "0x624094957499cb0030e4910be41dc05c3af5c918",
  "0x1cdb767a313db1d09d865411ca5861a198dab6b5",
  "0x8119df775267e058bdda71a23b1cad5b9a82c28e",
  "0xd6616f0187e72a4894d8d4f7d28a818f7aea6ced",
  "0x64a2eb119a04bf77c32a725b6b73dab77a991142",
  "0x237cf003b5c761e5977488e1164c09b5cfead57b",
  "0x954d3c7f83ea04e4480a8adbfdc2d348154bdc48",
  "0xc2d5bff8b4a159b7e4d80c2c794d62c5409d11e9",
  "0xd263deb9cf9da8c5de1847c4f07ecd1c29e2896a",
  "0xc2e0477866c1ed00a16d9c2509300fe005b994c3",
  "0x7e46ea01739087cec4fb07b630c67a753b365a73",
  "0x081dd264794426568101d48a1d3144726f823ace",
  "0x71a18789446447db060af3140f5e8fc3e9c4bb3f",
  "0xf55c3ab0cc40fca481a5a06cc665f788fd0a7329",
  "0x8657e5ae5c0ac9a9cfa963ff1242ddcefa701510",
  "0xb72bccf58b6bde6d5582e2ff69d6bfef7ebfcf36",
  "0xe525ff88a5cc754fb75bfc2ca57e3225feffc1dd",
  "0xf7861c0efebe8a0f8ba2f465f392168d4a3b0a56",
  "0xb1a15dd75af3b6a90a61fea03a98eccbddabafc6",
  "0xe3f87a031ddfb36c7eb3aa49ee5f21e1bb90e0fb",
  "0x2e8e962237fa9835bb6af4254b39bd1e03b06a14",
  "0x2a002d5872a0202714b0782e0e44bed4a915d0a1",
  "0xa79ffcf36aaca3d9db24f3ddd14c192b4aeee264",
  "0xd7eecdbad0dd8b603c905d6fe27c93d8d0f3a8b9",
  "0xd076a1d7f868bd7d79b875612500c6b9a27cb2a4",
  "0xb1c8830cbb0653640318cc6fda474a1618e324f8",
  "0xd5ffc9db6426281c1a46d8356e90d996b2abd619",
  "0xbca34271a5613903f7c575123d38bdd51f18dbfa",
  "0x6a72cc5e4cb8e6b6b1371eda77acaa2bf594c5d4",
  "0xc2c28b65c7c766e9c62fbdcede502b5fb5dd9699",
  "0xa8b58264d2e0475064b612cc094f829a62ef360c",
  "0x177ee07ebf21d56d44c9447901c938a80e7d55c8",
  "0xa719257e666a39c65db8a1e1d69ac491b0cb2ef8",
  "0xad92607170944ffd8fa015e40dc72e8b0b2b49d9",
  "0x04fe31f5b6b95afcda85e1de002fb3361f6f055d",
  "0x97025410a0867d75ad40fec2112c6c6bb2d0177a",
  "0x0180baa3cca07402f3d2b09b2f2437c677e56d06",
  "0xc58dc765bde146d3a8b21164bb90169970c2483a",
  "0xda276f3b6d38131eaf21e8a2afa902c8354b92ab",
  "0x446bf0cc68a1df14fab70af8b1dcd8d3375710c5",
  "0x15d5f959c77b201c5deb6ae11031ff40b393a2e2",
  "0x7fa5a161f630440a7b68dd9c150eefa069581500",
  "0xfb11269b0180ae8840e6d0a2f4f0322997f230b7",
  "0xbdbddd5edae256e37f78985ca1f7d42205098cdf",
  "0x7e2004a8e9635d5ac00625911d1699f9e5999cc4",
  "0xecb9eed706dae99d35ec3624d0e9fbb120739649",
  "0x4527aabd17ed512aa2110a5969cf9adf89de26cb",
  "0x7a27482c919d4bd77c8e4ffcf36ffebcaf84cec4",
  "0x1436563022e4f4388efb5eecdeb5ca405c39b120",
  "0x8da8a8a209ba151e2907549b6aa642cbb443ec70",
  "0x12e9b23e7cca4d23b5f021fb9ebd6877aa185840",
  "0x7bb3c7ecfdcede2bb2dae1b41b2923be0800f35d",
  "0x67de67f51df9ee240917e46958dc89a5ab4215e3",
  "0xe6f582d72d85c022e2889531cc9fb8b0c8053aca",
  "0x7890c2c30df287075293131ca666d6cd7c915f3d",
  "0x86e3697aaddd91f9b52588a4e9cc038b4564aa3a",
  "0x73a8e698734d22af9e72ea29e5a9783a54050364",
  "0x330a85dba7d173e5cfc7b93ca222f568393f786b",
  "0x63ba5a59d898b6b6aaefd533e3366252638ffc5a",
  "0x36fa563b5383367dd63d27024d90180ec975f1f9",
  "0x35bafa036f69ddbbe2076cb92a852e7988721a1d",
  "0x8b1f109827e35f9c271c106f000d3803a20df5a7",
  "0xaa4ba59a66db4c58faf8f3946523d6f405331319",
  "0x399e7fe41a3a2812a9734366ab5ee63e732c5758",
  "0xc4570c83d1457a9706756921ff9a1d34317ca155",
  "0xc3d1eafb0310cf019012649d21d54be14ccdf5fe",
  "0x201e6d9a8e2feb84106d0ab67d90e44793c50b0e",
  "0x91541646966d42bebe0bce74d98775d72a9c3844",
  "0x1a7dd262569cdb732f7c2644fdfafe85caa9b3aa",
  "0x30e55bdf1c28160731982e321dd0ac6de4e29401",
  "0x828c9063af4536800d07e1b1f818fcb059399e4c",
  "0x5ecd6b3bd8a96d665f3aa478b9dce48bfc8f411b",
  "0xe53f8ccdbc4f8ed621fbd3a693fc548e4dfc8fc3",
  "0xa48c6f50ebd8a540e08a4582dad12f3456fde6e8",
  "0x178ee0406eda52162efde5e36e66f05ae63c8edb",
  "0x91636f9abd93ebb1e5c41fc9665d01596dc996af",
  "0x82e4882fe8be8d52f5f366262ba21954bdc81457",
  "0x814a05edf3d7d52f8548d255c71daaa8ec27b2fc",
  "0x4e4e34d2314c40fdcce5266ff2d69a1fb5c4c9c3",
  "0x6c0cf0f76ff68dfbeb2b5f6afcda1839ac2d34c2",
  "0x06c45efdb3329d3fa0a49833d6b64dfe966286eb",
  "0x737ccb20bdb7ade7c1da141051db0a810f339963",
  "0x13d9b23a4b69131ad72192ad7bf5179403156168",
  "0x5a01a21cf8830c93a94d08be164d7130d9dec617",
  "0x619f51a09a571802d159df95996c31e3afbf32ac",
  "0xf105279dd3e6ebc7ff9a0ef236a9d6f829c103a7",
  "0xde1836768153dd6300c96e1410615d92fa8263f5",
  "0x41dabdcdd53c902a6d316d30f30b76b4129dc228",
  "0xb851bd1c01732c23d687865dfbff5d95fec4a48a",
  "0x0d014eb8fe1e938f793f20515b80a0ac018b362b",
  "0x149f6b579faa857b21ed77c3e2e7933ffbbe1d02",
  "0x92402636fc03e72ffec4bbc0a15a1211c6e5e919",
  "0x2546b4d19e4dd300dcc56efa419c0b388de85dec",
  "0xbd8104fb375e9f3a291a4c689e932efb2cd89402",
  "0x68f91384e08c800bbf81d650deab48cd90f4e696",
  "0xf7151e003193db642f91f316909a431872c51cd5",
  "0xf9edf5c98b6c927d34363cd4366ffa2290e8ef6e",
  "0x521304540988c3bfded80d2e19f9ddbd5845599c",
  "0x696fe188daa95588f69b709dc23b882f7fe69598",
  "0x41034b75a74d5aeabed88bc48eccea006dac1d4f",
  "0xb354737b8c119b6f7318caaa631723c2f4b1ef33",
  "0x12fea6c422d0d9e90f45f655bc87832d1ea5c6a8",
  "0xaf41e6e43d496a41511e8f72edf7ca68c4ba5eaa",
  "0xe64b2361dd85c63b48655b15ca9b2174401d3faf",
  "0xab41e6c37499005237d01087f542a284b68060a2",
  "0x6fc37c76da4c58176ae04126dc49a992a2f76d6c",
  "0x3724daa0df6bf7b6eb9cf4d42aa9fcd125dfb3f4",
  "0x9cc2862ae044bee866e90c822c6e5ff9e349969e",
  "0x2d104cc9db395d5bc1d0043f7be3f8f5c1cffc88",
  "0xb261c48ad3fb5a64bc9c0cda7d93064e7e416354",
  "0x958cb13ffba07a615ef7ac3dbe11ccf0bffda960",
  "0x26ccbbf03a0e6034691f310aa50f0b03d2735299",
  "0x9c854bf81c81cb5038ff3dd702e9e552f20fe1b5",
  "0xd6bf398dfa4f6ad952cfd5bb75388eaef3a8193e",
  "0x708af483e0a49b2f3d755925a0fbaeddc7975eb3",
  "0x014b21ef1a6527e7e7986840f51504f0dd63bdf3",
  "0x076d34f749a5565a0c6951e5c52a71de326f3114",
  "0x6bf5173149359d55358791e742ea210e4fff6ead",
  "0x64ae2db6db61d7cf995ac38798bd9af8f2fe593f",
  "0x15c2f471cd38c244a88db4b87944468083a70fee",
  "0x60803eb77776169e4ef1c4b12b55e26d87944bda",
  "0x10b3e13822a6255fa5a3b767c6f201ac37c43340",
  "0x427695810f032edf4ed9f1bdbdeb0dd426c5fe1f",
  "0x4239a51ad63d193efb7e03726457d2a7b5e8a29f",
  "0xb6caaae95b2674d2aacce20d0b8e7a43418c56f9",
  "0x37a1455e780deeb8a69ca800bd712549297f7e28",
  "0x079e4dff0c3d3b7a53d4a78427851a3f74587564",
  "0x0cfdf555083f13c27e6799112c3eba6c4b1c1ece",
  "0xef43cc63437c46ad12bf2ea9076be65d5ebe151f",
  "0xcb0934701d2ed83fc06f7c2350751e62fec1e04c",
  "0x31af146650feedb8dce8f1968a16e5f7535bebe6",
  "0xa06bbc7ff6df8e32b1e615977d9188ff67917da2",
  "0x061f7bfea41bf6c4db938f090be9354901c704fd",
  "0x772ccfa679ee7b4f07a1ccde815fe958975ae4cb",
  "0xcc6d1d153c5fc38fb168a19795cc83a5117cbf3d",
  "0xbe2273339ea2c783c749184496dd02e2296f4a21",
  "0x9d5cb5156face50a3a2a2d69f94223671f581f25",
  "0x669978049e216834a4aa6df0665c531dcdf6ed99",
  "0x4831982925f7d4c28e7f3bb354a06dc683a40734",
  "0x621e1cd90b568e243e35502cba68e40a8b0496ab",
  "0xdd3f2a91357f6c90d7a688fcb1500f088cac2be6",
  "0xfbfd94a31948bdda5aa7559558eac35b8fa9cdb6",
  "0x43e4a228af9690dd260b162d08a2102eff771163",
  "0xd7931b739c85659c638acb031b7070185541b1d1",
  "0x555f644bf29bb21a8f02724fbc759ed170810478",
  "0x396b040f6f65dd0e70644aeef88b0518f10f810c",
  "0x2739b27a2b7da09e57e209f41753df6089da1b7e",
  "0x6526bcfef151be7aa1d36af6d56e928ba8bed1e0",
  "0x55ca3e987132d3dafca9154d0b3a334ae1501653",
  "0x22a6bad88b557f1b3f4baede421ec9e221763f89",
  "0x69e565fedc6ab6c674ed7648df19860fb03fef8f",
  "0xc16884e86ff12b4164192d5642aeabe0703e3507",
  "0x07c9964ce9ad4fc959bc95041d5729a445c87e2d",
  "0xb668dacd97ead97f94ff792041330bd14ae817dc",
  "0xb5881822775a81381fd2227cc36bb03516ea843b",
  "0x1d0c93e9d79f28dad9b44c01fabf8fa864226863",
  "0x67006901ade686731a3d5e9869f9ea11e856ada5",
  "0xe0eac7dc782537b47b5962c13642dac3235ceb66",
  "0xdd9f1f68e7827f73ae1c91abc722524ffe22292d",
  "0xa184af1efdc7a22788490488a3dbde14e2d5bddc",
  "0x41eb8d9025ae079255c69180af36911e65c900e5",
  "0x954a3c2f0f7ea6753bf3dee2660f43360946b75e",
  "0xb80ba399584d9b32f59884121da3fa35042b9fdc",
  "0xc824466f8d4f115141495a7ec24c93633f8e56ac",
  "0xfbcf271dd94df3116a3ecf9d35024432fba90137",
  "0xa3ce6d0d710ff0c30af68045fbc94eb83a71f0c7",
  "0x5a702a4de300ebc45c67e11470607fb9b17d230d",
  "0xb053fe7c8b05e77cc17cd4af688ab769f945b792",
  "0xc9feb64f42926aa49961c8c0f40b26f42e462939",
  "0xd206ca5a3a67de029562cbc090104ea03e186757",
  "0x9ccf76f5ddbe114a706deb3d17e550391a2771fe",
  "0xc31c41c1c040e1b682d1bba162f5be8c7e76e796",
  "0x02ca189f949e1db64f199682d0f17c22abed9dac",
  "0x7f6ca8d860270e712c69254cce0656ad464a9b60",
  "0x5ddf83eb197ac6641e2fe7694d28b57ab2c3c4ac",
  "0xaf308a0c6b0fe1b49443dfab0791828191336b47",
  "0x4a073238c69adc59bd318b9068074c9989c40e69",
  "0x0d5a3240446e22790d0ef1e80ea6b3dffd905dad",
  "0x68681aa3da00dec89010c21ebf8d4dab14c7a13b",
  "0xce7a3c87061b551808e26e1194ba8f740394ff41",
  "0xd1ea06854e43af26f86cf92bc450d7f019609993",
  "0xfb5245c586b0f18fd05add89f59dc50308ad5f5b",
  "0xf123d1d46bb3789b4a24d3c656acd36c4c4a370a",
  "0xf700fba2c4e005a841ef4761febc63b81d4eb617",
  "0x54a4f55a3f4c0c365b57d965d9d5a806877abb51",
  "0xc001572213fd2735253576d3c96e82a93d8412b2",
  "0x2e482df563a0dad19b24f2b14579361ffdca2f32",
  "0x590e1505b95e24cb62ad8847123b2362ae93487d",
  "0xc692e35d9f11a1fd07cf9f63f3e517aa86734e8b",
  "0xf8520063fb024970596aa3f615b4309288f28f8d",
  "0xc6faf0724f090385ffb2fb45b8a802577c46ff8a",
  "0x37a22f69b63cc1aebedb6399ec7048e26ad5e5a7",
  "0x491b0e50ff66d302945e3f593ff3f32b70254150",
  "0xa2c5393cf474850766f37d9267b8991dc27c1af1",
  "0xa2ec5b41fc09d7091df34378567a7ebe62530f7f",
  "0xf13920be4f7d0524fe0c8037d2831faba84b06e2",
  "0x76f546f20a518497c2150a33dd896c4f84e18b40",
  "0xaace4bbd2efdf6d2f00957f95d019dba713f821c",
  "0xe9062742512405fac0b081a2c1e1f72adfec6293",
  "0x440decce3b525903e6e24f2182b1655bdd3b003c",
  "0xde3e2890c18dfb2eeba76fa17587930be4ac6f1c",
  "0x8a5855f78962c5c6620fca7a40691b39ab291fd7",
  "0xba258d6ec1002c3622a988e035e4fea537d1fe98",
  "0x7cf46f66020bafcd15815ec1f4fc89510db6fc23",
  "0xda9251b8e5edffef29d3c74ddae6cd41ba0a79cc",
  "0x6b298836d5ce0f8f3865e8e116438532c3c4b35d",
  "0x5d0071e792eeec77fe6010d0383cff6fdce9fdc4",
  "0x25dd967e222452896e5ff97aa8c0f46b8c3905c4",
  "0x7e2b285c3ee314f931ee3238010990782ba4145f",
  "0xe96b36f23f72b430a3f1e670231b911af45aee46",
  "0xc31b828ad29358b285fc9ea14545c8fba875608d",
  "0xb8b52603be4203953f7932e5bd10b234e56d7a1e",
  "0xc9cba55793df0fcd831d8f2b89643559f48f1c9e",
  "0x89dfd9600b54d97b1cfc43750923a8f31ad7cbda",
  "0x5fb445fc652ea6a912425ffecec4aa091b8fa977",
  "0xa895c7c8fda511a34b8cfdc35144bf70cb599168",
  "0x65932493b375915265347b5c4a00424956a3c0c8",
  "0x87dfc97bdc9d3be654ec46004cc709f04ac3a10c",
  "0xf92831799f2611bc9d02c16e5d962bfccb0638c3",
  "0x244e5629084e66b87ddd4577e3457079763a60c1",
  "0x63865bd4a3c5035f9f7b306943e048c21f81c61c",
  "0x90b96267e4f3800823cc6b4479120cbf7f24f951",
  "0xe053302561925c50cd551ef25efbd07d7716d321",
  "0xc1e845559550a376af2c7e836dbb6ce0aa044043",
  "0xb390b25ab38f1e3396b5ca69a01b3b0c477073bd",
  "0x224a1f52a8f402b90598a7f2c1b3b8a406675351",
  "0x6683162543a7b33c6c3406a4d32ab1e8d2cbce27",
  "0x117f7f3937e364bd77f4c75c7df10d1cb4e41d57",
  "0xca5362ac4b374947e6ab89f29bc43df94ea3ca38",
  "0xf65ffb117506b327c66b13c0521e54c306acaa2d",
  "0x95146d827a776f95bf5fe6e846594102e9537e57",
  "0x187704f1230699ec903dc2c46c8d283525213e53",
  "0xf4b62a55ba2b57611e85cda704580ad22ad92206",
  "0x7a5d0e1ab1fb75dd5176ea9d647bc99496eb6885",
  "0x1048a111adbbf5fade3ceae373c45eae5e6f177a",
  "0x15d7490702b2543859ff699f062526a2c80cf749",
  "0x9ac904eb5e885e2026d48f6cfd1669e106608a8d",
  "0xaa508413a479d8b7708fed82727a7f9d357e2f69",
  "0x8824d8ba85b4168a8a231a10588d7d74f220f799",
  "0x8b05be9f76b5d83b335d765ae056d70d28c8b00f",
  "0x963e1b23e90ff15cb63cf79676da6e8a25647dbb",
  "0x52703d47f4d27217bdce1307fa8bac7a09dbe9a6",
  "0xe3585c7ee9f20b5efd623307570dfd9cfc361add",
  "0x86939bbaa202746b7d4c52d9dc0f176568539cc6",
  "0x47917d88185f888d9a45aae9ce108a4ef9bb433e",
  "0x041abe2b1c3780540016a1e0857745dc161994e3",
  "0x60879ff9a3e890f8adf6c47327ede590d51a1b1d",
  "0xc676aee1278bbb09427cb1452b4acabd02c1aabc",
  "0xebc91eb4fb691c513575926fb4d0c58a422d1d4d",
  "0x372f0e8cd3b6fda60dc2a07972e01cf5cd52a52a",
  "0x5412e3c4832b01281a34ed3c76098acead3fefb7",
  "0x97bef64e374ffc63cac83150dc96627d94013132",
  "0x61928537abd6007d6a6559274892a57138c4099e",
  "0x0b7197e02612a1aa4bdc962ccd5893a1ffed7d6f",
  "0x705ad6fa90d14fe46594022e166a6e6c94563e5a",
  "0xe513abeba6e428b3203645a723d7cae38f748d88",
  "0x0ca24831d7d2c92db25da26fb5ad17af3ac9ca36",
  "0x1fa3ef02919a69916c6fd998cd9a0feda06646f5",
  "0x35db5245fece8f1f2221309cc56c418f28fdb69d",
  "0xdcff890b54c14879be6567e204b05201b1828718",
  "0x9f1a1f20c9c89cb033307e145bcc5ed740699981",
  "0x76a3d73056d18e6a1eb91c428a23fa3959635cdf",
  "0x315e811b58bf61e23f5ae7bf2062059884433ecf",
  "0x4ca6811f29219b6c4072399af4d6f8b00c72b8fa",
  "0x35877c9087e1d4522edf567936d13a61ffa57fd0",
  "0x29c82d957f8448e2e3653b15254671a1793adf31",
  "0xf4891f12fb71cff79d098813ac7f0a551ab857cf",
  "0xc133ae940ec5c494897fb834b8cfdf6e9b6b88c0",
  "0x10453cc4244e756fcd8e6e6e8747ef6fe28381c3",
  "0xa6f46e236227b08c1a1a48baa76a37c52bc15355",
  "0x1cb28d8bb73f62116d2d654ef05ac1fd04a625be",
  "0x3954292652ef1771b73329b601d3aa2f7029189f",
  "0x0f1e829b620f9c65820ed091f722031b7e315d04",
  "0x3a131895c74313cc67057252f3d4ae3931a0d577",
  "0x0ce4c5d02f5f919c659170e41fea228bab12b05d",
  "0x4c61d1fe4fa94917d5c3ea1bf6a274ff0becd725",
  "0x3c6ce96e3f4f07f9cee2371077e3bc74842fb39b",
  "0x369e7e266043843f8b6876aee9c56af0757fa214",
  "0xe8f384b1c6148d4d2ace86f39f0e4db3a7baa53d",
  "0x7ca784539d71daa1a9406a182524d2dd272bbb46",
  "0x4b2a6827dc4645e6edf3785a6983d7074fac6ff7",
  "0x771f6cb3f6664d5ba3ee78c37a8d4176ae784732",
  "0x819c7c04fbc6e242bde7c129be03982d800a9dee",
  "0xb3a163b8aa58d9a77fa53b1d89a6aeb61f8b6354",
  "0xe61b45ea7ccf98d8e5da058fb703482a6e98986e",
  "0x08fe6ff0803ed4b70b028f597e01f0580ab36daf",
  "0x0135a8f0ab15fb96a6bd5715f0d45257f410d832",
  "0x517964c15c87fc68faef1f6dfb60e39541845de9",
  "0x146781030ab38500a47608bc869862bb296148ad",
  "0x98eee6b0b9c41361c6097dc4e73a0475e359402e",
  "0x0655a132ffbd0637bfc71fa6b6a986cd3fde39a1",
  "0x3fff7b718732078123480c8d81a0e70a6a71ce47",
  "0x907ba9bcae4a8dcd71b4a831584f0f1bd87a4692",
  "0x826899061280d4df3c342547ee2c6014293bc154",
  "0x0020ad6ce40eabc75bc011d232f6cf9bebd9745b",
  "0xb688af3f6d0949ea85783fc47353057d4bd81e2a",
  "0x6a5949501dd21f57819643881781fe49222b4be3",
  "0xc038b7016e25459e100a04ddd667cefba7060427",
  "0xc69225bc5155c2008c6fa3350483ed2a6d16e217",
  "0x1e6c24b03e3df70dfd44fe44ea19154c5ca91b47",
  "0xd7d7c7c48d1fe539bef18b9d18c8719c93a41bb0",
  "0xaadab750afd87f6cee6e66c950c7d10c4b87ad99",
  "0x50b8c1e6e250a070200155544f34b8cb352be3e4",
  "0x9bcdd2aa9386838e408e86cddcb978bd55176af3",
  "0x15fa6fa39e8d3dd0d0c62575d39945677b4316a2",
  "0xbae3e865e0fa2e5c4bca504e9ad94d77f8b69eb7",
  "0x0829089dfa8a725a23c9952101552e2cf3e5ab4e",
  "0x118df4d6619473164871cedc07df2c79a1b76b78",
  "0x76bcd761f163d0228ef2722500ccb9c8b406aca8",
  "0x004629a1bbbf303990081d0999e485313f5aa434",
  "0x4495fc071ebe1fe129828ff207291eb69c3190a9",
  "0x00bafbbe6f19675e261ed374a8a2e30ef111c1f8",
  "0x30a359c3f0335e4ca5106414cfd79779e0f8102a",
  "0xf54f4f5ce215aa5212507e5e60d4b27ce6269d91",
  "0x696c68ae2317d5bb361215ea854ff4498cb1b5b3",
  "0xe5eedbdaff03bc72a2108888626f17d151cad95c",
  "0x292eab5da194017912cfdf5f02cfc2c8abc83700",
  "0x6f80fb2ebdc7d380b04159fb46e8e9da78a7cff8",
  "0x881b14e01a43a7637fabed96512d4da011084f1d",
  "0xb13b404a0430674c3f63edfcc90134704bd706cd",
  "0x76a3a9311b619463fe19d8714e80866da677e092",
  "0x5162a2050cd060c9f4c58c4c2e3697c4fc7806d1",
  "0xec05ad31f8f599cc2e200a5529d66ffb9aef32d9",
  "0x1b9f79cac18c88297d3cae8c9053f050119b9f5e",
  "0x6ed77b989f62164408b0e351b75b229a300babec",
  "0x7d1c853543103ce0fdb625bce1a0b5211bf0ff77",
  "0x816e24cf309f2b4c650cc36dbfa16129c410949f",
  "0x7c354333de027e9e851d92ee1e97edc2fd294f92",
  "0x8c73982d56113e246a14c2f4acf6e515ce833310",
  "0xf00ce6212f3bfd28335a58aa220cc1c9885c39cf",
  "0x7c3c1dbe4457e6be42a1d6c800a3474461b7c9ef",
  "0xbe236b156768801ccaf59d3aee864f51133aeeee",
  "0x05519e4242febbc07560bb6a987386ebd5fccd0b",
  "0xab66a9225ea6051a8f358c054ac8dfc9f39eae8a",
  "0x414cbff954d5b70a4157dab14fd1c134eb49d12c",
  "0xa8cda15a87cfd5471a540af029e48217a0971434",
  "0x235f5e80ef57cbfee2992698ce9160bc4bb9f2eb",
  "0xa3eab88c232e3d6e9e066970e80cdfef286e1978",
  "0xd7fde13c9602bbd6e32f7aa3bf035c8c3f5cceff",
  "0xbb1a611a21487628fb8526419114a66119006c24",
  "0xdebbe1934185a1739208f8bb5886e0afe4c0d8da",
  "0x0851f96d5f876245a27f38b751545b55dff81b0e",
  "0xccbe5287acd01672e82428e0c4eaf8eba456362c",
  "0x4d2cd4d5bc39a68865b0cca10cc86e802ccd5e1d",
  "0x1b9388a7cb1cc560c8f2cb4ffea1b1c63f6733ec",
  "0xa975e551c3eacf89ab96420dbb1b63947f1bc282",
  "0xf594c4dde99d9017cebbe4b90f37f0facf7a70cf",
  "0x2dbc295a2711f4f05622c85703c432c6e7d162dd",
  "0x7bd1a895ada29a350d2507bf2a5acaea075b7c0a",
  "0x4798cd3d6a4883792a6ee38853d0adc59391fa4e",
  "0xe06cff77fbcd05696844af7397b5218d8e72286f",
  "0xad9107ce6e77db2d0aa3cd2c3ee8a8eb16ce7cb2",
  "0x2a1743f5ae1fc8d78ef1206f3acba48b27259a7e",
  "0x1356e7efb18cc1b0ad9d8400dd4955a63de1df14",
  "0xdcd04a5fc4b168dbb0e4432cbf9d8799bb4a0521",
  "0xa8702fbfa45178a018a5ec0bf9148e2c3ad57fc3",
  "0xc7a9e1cd9d76f6832e9e5078bedc7120b31e1a76",
  "0xce3cafd800ac29e34e85d7b266152749c849b574",
  "0x629b517b5aff5475f5035650a834478758db5358",
  "0xb7955e785bae4cc5d6119a0d2b8b0113032ee8ee",
  "0x507f77f6c2a11fe1618bb43c93cd4cf332d80827",
  "0x3e1e9ad3a45d284baf0f204cbb4e17ad95de18a2",
  "0x850cd83406889d75f3d1f708d2451c07959916d1",
  "0x1d4a20287a9a85fbfea47982c4515b281fe83515",
  "0x13f3f44aad51749d6fa74073e256acfbfd8a2021",
  "0xb5bc87f0b51545f1ec8bc8a858fc32560303a42d",
  "0x0037fa577e547a7616e4b01d15553a0c7e980c63",
  "0xe7674b190def5a82730f5d6ab8125e277f10414f",
  "0xD89544d9f8b40a92590D4f27ad68Aa3322128960",
  "0x30aa88da42006e499863329a857c0b3812a9dc1a",
  "0x8f80bcfb60775f92a293d1a309d5cce6a3a211e6",
  "0xfe075135c630b3599483907cd95ec3ad5d0b9a67",
  "0x263bf65791200f62ddb4ffa4b7fb8fdccdb1694c",
  "0xe73ea9ebe0543c28606ef7b4ebc35bb60980c1ee",
  "0x77ad888809227a4aa4fcd2eca1fe75d1162b39ed",
  "0xcf1dd1cf76d8fbd7dc5a209443812909c9823b79",
  "0x2862439166acc0f6c47a5d3c7c07a8d4e3eb5faa",
  "0xd82e5be41d21002d8e1f85dd74c976d6528f48c4",
  "0x979a0e1e98eebcb5cb8a008fa47f91459e820129",
  "0x44c577671ebc29b5308828f6ff6f29874be01b1c",
  "0xced9d6a1935dfbeadf741a44f07317abe9e5cb6f",
  "0xfffbc996737fb3e30b95dea9979ac9d28bac480b",
  "0x88e2b965618cff0ddccaff70864accdbc1c769a7",
  "0x537d266203e8e9e864cbebb4fa5bbf4a973e9760",
  "0x5ea46525f5eebc0dd2ca876afa3fe88835e4351b",
  "0x3455ebe9c67596cdc80f8a3009903a7c4b9761bc",
  "0xfa52083627050fe69b3d1f917837fb4037172017",
  "0x2dd3fd2f5e0a7e1481431e567835a261c3a3b53b",
  "0x44e2d735f7ff51bdbac5719a0ef44ccc9530bcd9",
  "0x711d58d28c0d6755fa69277bfba3c2a2b0b1f570",
  "0x75b44cfa737b642895381db781ae476f396971a1",
  "0x29167e2e54b62f936a18c685cfad2838287baa2b",
  "0xc9aabcddbf8483e805005e560fe2aca10baffac9",
  "0xe4094bd7227958c7ab3390282ac0f0b88ce4f334",
  "0x200880ae9b8c9e030698ac884962f16fbf044bc8",
  "0x7e97cd33eecfdb9cf51e4b74a2aa8cc0aec8d616",
  "0x5d53775066e7faa81fe8968bb1e91f12ba9002c8",
  "0xefa29c7f6f4ce8e442666e68760dfc14a3db7315",
  "0x2999586db2dc55177715b804d92dee31d82c3bf2",
  "0xaf970c264993f68582e9db0a3c11f59077c9b8f7",
  "0x610e723452f13f6293701bb83a8ff39d2d94d7b3",
  "0x060991d75e17ebfc6cc52e42aab271abf2f8b888",
  "0x5cb923973f1eee983a88729b19a4a2bda3a43d5a",
  "0x18460e2560fc28ee875335382b250d385f457e33",
  "0xda3ea1cb1c026fb93622248f914243f4214024fe",
  "0x5fc710eed2bc61f1d729f3bcee5d84f38e1cbabc",
  "0x8c44a19e9ebf010e122ff9af3f9cfedcf243cc6e",
  "0x80b388f07705a7f5fd3a7b8436a49f02e987e796",
  "0x608d41604e796adbd95435e06388de37553197c3",
  "0xd912ece0c5e4f2625e89618e645ec718ce187e6b",
  "0x7dd9829ac138eb9d13c58e188682956da621e38b",
  "0x67238bb14a450e50ab909aa6642520d0cfa3b465",
  "0x4b6caba8f15327b33876fa7489364521bee49e07",
  "0x9995a71d3ca7584487736644a4785c59e7eb7e3b",
  "0x357a1ef429cab377bc111bfd0d66f3daa19f0278",
  "0x2e1848acaf8adcd3be1db5ba655f161a4eb5cc40",
  "0x8270e5cc61ec7176656b132765586797027cac97",
  "0xd38efed51f92598b3422be7399bc744995fd08db",
  "0xb18e3444b9754a56b10261ccfa0824ccb2b46367",
  "0x1d728068f97863db51b5328a88d1f9d03b864e14",
  "0x01370d3a262cab1c42f07695a6f4bb5d8248e4fd",
  "0xad60c52ab20a5268e26b52bd73c0b0ad352fa31d",
  "0xf3663b762f74994c12ab04e2f508285e1669ef6b",
  "0xa44b928015c82819270161004a3499838e701f93",
  "0x51a216c5e2e67ee1ea1ac7677e4da33ff161d21d",
  "0x9f96d3b217ccc7bb67c7be4d018a3de896e89736",
  "0x3ae06f2488ab961aa08224041ce6d49ebf313f71",
  "0x163a5eef5961190808389b41769b5431aeb05d42",
  "0xf9f0a676ab591f24a79e7b71b16fac4f011378f9",
  "0x9410350d3e0b5f18510d2f23d5ae040972def2d0",
  "0xf1288b5b14f438c97c0a9227202d501360f3004f",
  "0xd9b26554f9cafe198c121c77fef196923640ed7c",
  "0x6a4dd46ceeba95a068b026d6ad5638d02467c19c",
  "0xfc324dce1dc49ce5680b5b28a5ef7d951835dec4",
  "0xd1293f52ac54d580ce628258c08026cdeff5e307",
  "0x7bbff0d18052b855eb0caf8fe657f927fa3ff880",
  "0x60823dcd5d8b2f9b5d9af57007567e503175f5e6",
  "0x442d4f0ca6c5e3173b3717e829b391e3adcea261",
  "0x67fac9d281051b52ec8a728a2727219da4d029b4",
  "0x633164429b4795ecd6801d503772401d9b2ff06d",
  "0xecf51baf0b7a0bc0193d51fb64aa6aefff03a1a6",
  "0xbc6da9519e048f1cbdc8f84a0ad9e9a31e60128d",
  "0x6df24cbd8874676812231afb6d43e8ef05fc7ba2",
  "0x9fbe416baab4a041d84076552605846708e3563a",
  "0xdb9622e1b2630897a54cdd1d195321efe3737193",
  "0xe038aa3033155e5c898fdda7d1659eee9fb9f635",
  "0xbbd1c5cee1504e6f55bcc95b167138bfd60e4c34",
  "0x8604f60b02ef8a27d05efda63a6975af2a68884b",
  "0x7a1b9d51418b274ab392472405559cce9f22e63f",
  "0x7dd97c7fcf8379b5e575eeff3b187c9f3fa1f625",
  "0xf346879e1e1c2ff46d81532e233f12f746fb8ecb",
  "0x4ac5b3e8813861010f8740811bcc2fe06cba5855",
  "0x840eb8a59ed8c9ced4ace4c9287d5780bcc54f8c",
  "0xb40636c060adaaa2ea2968b45b971941c58ef5c6",
  "0xf6c577a769535c82eea3fbae1aeba0375de8a9d4",
  "0x09c52b117e9075757e3562984d4960fb96e6a995",
  "0x67b2a34e62d6eb135f8a1356dc3b01ac4c010bb0",
  "0x2ee68b9e576cd21c7a5b3ac4f212facef491f768",
  "0x4c7e99825b6c0cfc49226993020ab414c0b93dbc",
  "0xf98db5bc4f270486bd86d7df4bed8644e853307b",
  "0x604d62356c5cfead7c338b0ecbac4a3888935066",
  "0xde653faafc3d6877945597ff79cbb25ca8b702ab",
  "0x72eaabc3c5bc8b3573654a896258e6c01ae29d60",
  "0x4dd67e6ec8a943de7a5d96d7372c9f476bca30be",
  "0xc63167c33719ad49b14506c33f6698bf53160418",
  "0x0dc8f1d9ddfa5e758ad090be6a2aaef0b55f0135",
  "0xac7c7944b6b0a2de5ef3ac68edd8938c0aba97cf",
  "0x58c582e4ee9a8c0106de455fb59205e3fbbde3b3",
  "0x7a315f0f68e94e7f6943cdcb326175b61b31f25a",
  "0x16d18cb9910a8f60328f8b67f2890a11a16cad49",
  "0x1e8ad7a622d79c105e1e58811e00c333db5cfa1d",
  "0xdfa381ae02f1e1fdf1472d7f0845bad0324a13a8",
  "0x649bcd31cf7745b8be81f0d6e8fad80f6eac9211",
  "0x0a4689cc520b6076c2dad6d838782f2a15d7a3c4",
  "0x58db14cda9fa7413c300376308ea0387a3e34d83",
  "0xaa5342ff4366b62d97602bbf8729e6149f06af2c",
  "0x47eaf03d3265247eee651ef1ab5c877b9db38eb1",
  "0x0d9ecf95e9c2f5c7b0832a7b21b9fbf0c579975d",
  "0x8d7601600d1eb570880dd20eede8e93105eee1bf",
  "0xa6e956d71e9f0ab635a1cdcf11702caa72081b3d",
  "0x3c3601553022a3ac1bf95b30f1c6df36045ceeef",
  "0xf04497532f56f92a243b2930ce863c9e2a9607bd",
  "0xb364d0ac706488444cc29f8352b2ed2bb4f156fb",
  "0xbb632fee12b876b17563d84496e52c1aa3a36409",
  "0xad3f3fac137afee90e4912df33bd82bd46f4578b",
  "0x84545e9761d1030d30d3fee4deb9aaaacfa7b78a",
  "0x929136634cb5d441a9a9bb3d343ec53984358262",
  "0x8a1aebc05f87a31dcf909339e99b52c54a00b6a6",
  "0x3987247ef2856e1de3449969e3d88006dc48c661",
  "0xe9e26a29a9d8580e386a58e68a1dbc58cfb26bf3",
  "0x61b11660b9394880c22df61030a59fb34f4de418",
  "0x395bb7896becf1f1eaccdb57c590cbec170cc520",
  "0x4393b77a22a2308943844b78421016bfd3740dcc",
  "0xc925ff28ff8ca175a4ab0387697429d3f9e21775",
  "0x136fe17b03404e455060e27131fc798d3e83c52b",
  "0xe411015a6ddf7b5e150928faad6eb63a35ce6b00",
  "0xaf5d54a44d4fda48c2dc2479dae22fb73e0fb611",
  "0x646b03dae788cd1f5f664854f38c7f352956d8d1",
  "0x97953a5656ddc9bb1627e5cd80043fd754eaa5d1",
  "0xa9c1d20a36b4100aad94f7478d1c08593f5bc93e",
  "0xd7592f2d2dfeca1465327e17dd19c96aa9da63ae",
  "0x624094957499cb0030e4910be41dc05c3af5c918",
  "0x1cdb767a313db1d09d865411ca5861a198dab6b5",
  "0x8119df775267e058bdda71a23b1cad5b9a82c28e",
  "0xd6616f0187e72a4894d8d4f7d28a818f7aea6ced",
  "0x64a2eb119a04bf77c32a725b6b73dab77a991142",
  "0x237cf003b5c761e5977488e1164c09b5cfead57b",
  "0x954d3c7f83ea04e4480a8adbfdc2d348154bdc48",
  "0xc2d5bff8b4a159b7e4d80c2c794d62c5409d11e9",
  "0xd263deb9cf9da8c5de1847c4f07ecd1c29e2896a",
  "0xc2e0477866c1ed00a16d9c2509300fe005b994c3",
  "0x7e46ea01739087cec4fb07b630c67a753b365a73",
  "0x081dd264794426568101d48a1d3144726f823ace",
  "0x71a18789446447db060af3140f5e8fc3e9c4bb3f",
  "0xf55c3ab0cc40fca481a5a06cc665f788fd0a7329",
  "0x8657e5ae5c0ac9a9cfa963ff1242ddcefa701510",
  "0xb72bccf58b6bde6d5582e2ff69d6bfef7ebfcf36",
  "0xe525ff88a5cc754fb75bfc2ca57e3225feffc1dd",
  "0xf7861c0efebe8a0f8ba2f465f392168d4a3b0a56",
  "0xb1a15dd75af3b6a90a61fea03a98eccbddabafc6",
  "0xe3f87a031ddfb36c7eb3aa49ee5f21e1bb90e0fb",
  "0x2e8e962237fa9835bb6af4254b39bd1e03b06a14",
  "0x2a002d5872a0202714b0782e0e44bed4a915d0a1",
  "0xa79ffcf36aaca3d9db24f3ddd14c192b4aeee264",
  "0xd7eecdbad0dd8b603c905d6fe27c93d8d0f3a8b9",
  "0xd076a1d7f868bd7d79b875612500c6b9a27cb2a4",
  "0xb1c8830cbb0653640318cc6fda474a1618e324f8",
  "0xd5ffc9db6426281c1a46d8356e90d996b2abd619",
  "0xbca34271a5613903f7c575123d38bdd51f18dbfa",
  "0x6a72cc5e4cb8e6b6b1371eda77acaa2bf594c5d4",
  "0xc2c28b65c7c766e9c62fbdcede502b5fb5dd9699",
  "0xa8b58264d2e0475064b612cc094f829a62ef360c",
  "0x177ee07ebf21d56d44c9447901c938a80e7d55c8",
  "0xa719257e666a39c65db8a1e1d69ac491b0cb2ef8",
  "0xad92607170944ffd8fa015e40dc72e8b0b2b49d9",
  "0x04fe31f5b6b95afcda85e1de002fb3361f6f055d",
  "0x97025410a0867d75ad40fec2112c6c6bb2d0177a",
  "0x0180baa3cca07402f3d2b09b2f2437c677e56d06",
  "0xc58dc765bde146d3a8b21164bb90169970c2483a",
  "0xda276f3b6d38131eaf21e8a2afa902c8354b92ab",
  "0x446bf0cc68a1df14fab70af8b1dcd8d3375710c5",
  "0x15d5f959c77b201c5deb6ae11031ff40b393a2e2",
  "0x7fa5a161f630440a7b68dd9c150eefa069581500",
  "0xfb11269b0180ae8840e6d0a2f4f0322997f230b7",
  "0xbdbddd5edae256e37f78985ca1f7d42205098cdf",
  "0x7e2004a8e9635d5ac00625911d1699f9e5999cc4",
  "0xecb9eed706dae99d35ec3624d0e9fbb120739649",
  "0x4527aabd17ed512aa2110a5969cf9adf89de26cb",
  "0x7a27482c919d4bd77c8e4ffcf36ffebcaf84cec4",
  "0x1436563022e4f4388efb5eecdeb5ca405c39b120",
  "0x8da8a8a209ba151e2907549b6aa642cbb443ec70",
  "0x12e9b23e7cca4d23b5f021fb9ebd6877aa185840",
  "0x7bb3c7ecfdcede2bb2dae1b41b2923be0800f35d",
  "0x67de67f51df9ee240917e46958dc89a5ab4215e3",
  "0xe6f582d72d85c022e2889531cc9fb8b0c8053aca",
  "0x7890c2c30df287075293131ca666d6cd7c915f3d",
  "0x86e3697aaddd91f9b52588a4e9cc038b4564aa3a",
  "0x73a8e698734d22af9e72ea29e5a9783a54050364",
  "0x330a85dba7d173e5cfc7b93ca222f568393f786b",
  "0x63ba5a59d898b6b6aaefd533e3366252638ffc5a",
  "0x36fa563b5383367dd63d27024d90180ec975f1f9",
  "0x35bafa036f69ddbbe2076cb92a852e7988721a1d",
  "0x8b1f109827e35f9c271c106f000d3803a20df5a7",
  "0xaa4ba59a66db4c58faf8f3946523d6f405331319",
  "0x399e7fe41a3a2812a9734366ab5ee63e732c5758",
  "0xc4570c83d1457a9706756921ff9a1d34317ca155",
  "0xc3d1eafb0310cf019012649d21d54be14ccdf5fe",
  "0x201e6d9a8e2feb84106d0ab67d90e44793c50b0e",
  "0x91541646966d42bebe0bce74d98775d72a9c3844",
  "0x1a7dd262569cdb732f7c2644fdfafe85caa9b3aa",
  "0x30e55bdf1c28160731982e321dd0ac6de4e29401",
  "0x828c9063af4536800d07e1b1f818fcb059399e4c",
  "0x5ecd6b3bd8a96d665f3aa478b9dce48bfc8f411b",
  "0xe53f8ccdbc4f8ed621fbd3a693fc548e4dfc8fc3",
  "0xa48c6f50ebd8a540e08a4582dad12f3456fde6e8",
  "0x178ee0406eda52162efde5e36e66f05ae63c8edb",
  "0x91636f9abd93ebb1e5c41fc9665d01596dc996af",
  "0x82e4882fe8be8d52f5f366262ba21954bdc81457",
  "0x814a05edf3d7d52f8548d255c71daaa8ec27b2fc",
  "0x4e4e34d2314c40fdcce5266ff2d69a1fb5c4c9c3",
  "0x6c0cf0f76ff68dfbeb2b5f6afcda1839ac2d34c2",
  "0x06c45efdb3329d3fa0a49833d6b64dfe966286eb",
  "0x737ccb20bdb7ade7c1da141051db0a810f339963",
  "0x13d9b23a4b69131ad72192ad7bf5179403156168",
  "0x5a01a21cf8830c93a94d08be164d7130d9dec617",
  "0x619f51a09a571802d159df95996c31e3afbf32ac",
  "0xf105279dd3e6ebc7ff9a0ef236a9d6f829c103a7",
  "0xde1836768153dd6300c96e1410615d92fa8263f5",
  "0x41dabdcdd53c902a6d316d30f30b76b4129dc228",
  "0xb851bd1c01732c23d687865dfbff5d95fec4a48a",
  "0x0d014eb8fe1e938f793f20515b80a0ac018b362b",
  "0x149f6b579faa857b21ed77c3e2e7933ffbbe1d02",
  "0x92402636fc03e72ffec4bbc0a15a1211c6e5e919",
  "0x2546b4d19e4dd300dcc56efa419c0b388de85dec",
  "0xbd8104fb375e9f3a291a4c689e932efb2cd89402",
  "0x68f91384e08c800bbf81d650deab48cd90f4e696",
  "0xf7151e003193db642f91f316909a431872c51cd5",
  "0xf9edf5c98b6c927d34363cd4366ffa2290e8ef6e",
  "0x521304540988c3bfded80d2e19f9ddbd5845599c",
  "0x696fe188daa95588f69b709dc23b882f7fe69598",
  "0x41034b75a74d5aeabed88bc48eccea006dac1d4f",
  "0xb354737b8c119b6f7318caaa631723c2f4b1ef33",
  "0x12fea6c422d0d9e90f45f655bc87832d1ea5c6a8",
  "0xaf41e6e43d496a41511e8f72edf7ca68c4ba5eaa",
  "0xe64b2361dd85c63b48655b15ca9b2174401d3faf",
  "0xab41e6c37499005237d01087f542a284b68060a2",
  "0x6fc37c76da4c58176ae04126dc49a992a2f76d6c",
  "0x3724daa0df6bf7b6eb9cf4d42aa9fcd125dfb3f4",
  "0x9cc2862ae044bee866e90c822c6e5ff9e349969e",
  "0x2d104cc9db395d5bc1d0043f7be3f8f5c1cffc88",
  "0xb261c48ad3fb5a64bc9c0cda7d93064e7e416354",
  "0x958cb13ffba07a615ef7ac3dbe11ccf0bffda960",
  "0x26ccbbf03a0e6034691f310aa50f0b03d2735299",
  "0x9c854bf81c81cb5038ff3dd702e9e552f20fe1b5",
  "0xd6bf398dfa4f6ad952cfd5bb75388eaef3a8193e",
  "0x708af483e0a49b2f3d755925a0fbaeddc7975eb3",
  "0x014b21ef1a6527e7e7986840f51504f0dd63bdf3",
  "0x076d34f749a5565a0c6951e5c52a71de326f3114",
  "0x6bf5173149359d55358791e742ea210e4fff6ead",
  "0x64ae2db6db61d7cf995ac38798bd9af8f2fe593f",
  "0x15c2f471cd38c244a88db4b87944468083a70fee",
  "0x60803eb77776169e4ef1c4b12b55e26d87944bda",
  "0x10b3e13822a6255fa5a3b767c6f201ac37c43340",
  "0x427695810f032edf4ed9f1bdbdeb0dd426c5fe1f",
  "0x4239a51ad63d193efb7e03726457d2a7b5e8a29f",
  "0xb6caaae95b2674d2aacce20d0b8e7a43418c56f9",
  "0x37a1455e780deeb8a69ca800bd712549297f7e28",
  "0x079e4dff0c3d3b7a53d4a78427851a3f74587564",
  "0x0cfdf555083f13c27e6799112c3eba6c4b1c1ece",
  "0xef43cc63437c46ad12bf2ea9076be65d5ebe151f",
  "0xcb0934701d2ed83fc06f7c2350751e62fec1e04c",
  "0x31af146650feedb8dce8f1968a16e5f7535bebe6",
  "0xa06bbc7ff6df8e32b1e615977d9188ff67917da2",
  "0x061f7bfea41bf6c4db938f090be9354901c704fd",
  "0x772ccfa679ee7b4f07a1ccde815fe958975ae4cb",
  "0xcc6d1d153c5fc38fb168a19795cc83a5117cbf3d",
  "0xbe2273339ea2c783c749184496dd02e2296f4a21",
  "0x9d5cb5156face50a3a2a2d69f94223671f581f25",
  "0x669978049e216834a4aa6df0665c531dcdf6ed99",
  "0x4831982925f7d4c28e7f3bb354a06dc683a40734",
  "0x621e1cd90b568e243e35502cba68e40a8b0496ab",
  "0xdd3f2a91357f6c90d7a688fcb1500f088cac2be6",
  "0xfbfd94a31948bdda5aa7559558eac35b8fa9cdb6",
  "0x43e4a228af9690dd260b162d08a2102eff771163",
  "0xd7931b739c85659c638acb031b7070185541b1d1",
  "0x555f644bf29bb21a8f02724fbc759ed170810478",
  "0x396b040f6f65dd0e70644aeef88b0518f10f810c",
  "0x2739b27a2b7da09e57e209f41753df6089da1b7e",
  "0x6526bcfef151be7aa1d36af6d56e928ba8bed1e0",
  "0x55ca3e987132d3dafca9154d0b3a334ae1501653",
  "0x22a6bad88b557f1b3f4baede421ec9e221763f89",
  "0x69e565fedc6ab6c674ed7648df19860fb03fef8f",
  "0xc16884e86ff12b4164192d5642aeabe0703e3507",
  "0x07c9964ce9ad4fc959bc95041d5729a445c87e2d",
  "0xb668dacd97ead97f94ff792041330bd14ae817dc",
  "0xb5881822775a81381fd2227cc36bb03516ea843b",
  "0x1d0c93e9d79f28dad9b44c01fabf8fa864226863",
  "0x67006901ade686731a3d5e9869f9ea11e856ada5",
  "0xe0eac7dc782537b47b5962c13642dac3235ceb66",
  "0xdd9f1f68e7827f73ae1c91abc722524ffe22292d",
  "0xa184af1efdc7a22788490488a3dbde14e2d5bddc",
  "0x41eb8d9025ae079255c69180af36911e65c900e5",
  "0x954a3c2f0f7ea6753bf3dee2660f43360946b75e",
  "0xb80ba399584d9b32f59884121da3fa35042b9fdc",
  "0xc824466f8d4f115141495a7ec24c93633f8e56ac",
  "0xfbcf271dd94df3116a3ecf9d35024432fba90137",
  "0xa3ce6d0d710ff0c30af68045fbc94eb83a71f0c7",
  "0x5a702a4de300ebc45c67e11470607fb9b17d230d",
  "0xb053fe7c8b05e77cc17cd4af688ab769f945b792",
  "0xc9feb64f42926aa49961c8c0f40b26f42e462939",
  "0xd206ca5a3a67de029562cbc090104ea03e186757",
  "0x9ccf76f5ddbe114a706deb3d17e550391a2771fe",
  "0xc31c41c1c040e1b682d1bba162f5be8c7e76e796",
  "0x02ca189f949e1db64f199682d0f17c22abed9dac",
  "0x7f6ca8d860270e712c69254cce0656ad464a9b60",
  "0x5ddf83eb197ac6641e2fe7694d28b57ab2c3c4ac",
  "0xaf308a0c6b0fe1b49443dfab0791828191336b47",
  "0x4a073238c69adc59bd318b9068074c9989c40e69",
  "0x0d5a3240446e22790d0ef1e80ea6b3dffd905dad",
  "0x68681aa3da00dec89010c21ebf8d4dab14c7a13b",
  "0xce7a3c87061b551808e26e1194ba8f740394ff41",
  "0xd1ea06854e43af26f86cf92bc450d7f019609993",
  "0xfb5245c586b0f18fd05add89f59dc50308ad5f5b",
  "0xf123d1d46bb3789b4a24d3c656acd36c4c4a370a",
  "0xf700fba2c4e005a841ef4761febc63b81d4eb617",
  "0x54a4f55a3f4c0c365b57d965d9d5a806877abb51",
  "0xc001572213fd2735253576d3c96e82a93d8412b2",
  "0x2e482df563a0dad19b24f2b14579361ffdca2f32",
  "0x590e1505b95e24cb62ad8847123b2362ae93487d",
  "0xc692e35d9f11a1fd07cf9f63f3e517aa86734e8b",
  "0xf8520063fb024970596aa3f615b4309288f28f8d",
  "0xc6faf0724f090385ffb2fb45b8a802577c46ff8a",
  "0x37a22f69b63cc1aebedb6399ec7048e26ad5e5a7",
  "0x491b0e50ff66d302945e3f593ff3f32b70254150",
  "0xa2c5393cf474850766f37d9267b8991dc27c1af1",
  "0xa2ec5b41fc09d7091df34378567a7ebe62530f7f",
  "0xf13920be4f7d0524fe0c8037d2831faba84b06e2",
  "0x76f546f20a518497c2150a33dd896c4f84e18b40",
  "0xaace4bbd2efdf6d2f00957f95d019dba713f821c",
  "0xe9062742512405fac0b081a2c1e1f72adfec6293",
  "0x440decce3b525903e6e24f2182b1655bdd3b003c",
  "0xde3e2890c18dfb2eeba76fa17587930be4ac6f1c",
  "0x8a5855f78962c5c6620fca7a40691b39ab291fd7",
  "0xba258d6ec1002c3622a988e035e4fea537d1fe98",
  "0x7cf46f66020bafcd15815ec1f4fc89510db6fc23",
  "0xda9251b8e5edffef29d3c74ddae6cd41ba0a79cc",
  "0x6b298836d5ce0f8f3865e8e116438532c3c4b35d",
  "0x5d0071e792eeec77fe6010d0383cff6fdce9fdc4",
  "0x25dd967e222452896e5ff97aa8c0f46b8c3905c4",
  "0x7e2b285c3ee314f931ee3238010990782ba4145f",
  "0xe96b36f23f72b430a3f1e670231b911af45aee46",
  "0xc31b828ad29358b285fc9ea14545c8fba875608d",
  "0xb8b52603be4203953f7932e5bd10b234e56d7a1e",
  "0xc9cba55793df0fcd831d8f2b89643559f48f1c9e",
  "0x89dfd9600b54d97b1cfc43750923a8f31ad7cbda",
  "0x5fb445fc652ea6a912425ffecec4aa091b8fa977",
  "0xa895c7c8fda511a34b8cfdc35144bf70cb599168",
  "0x65932493b375915265347b5c4a00424956a3c0c8",
  "0x87dfc97bdc9d3be654ec46004cc709f04ac3a10c",
  "0xf92831799f2611bc9d02c16e5d962bfccb0638c3",
  "0x244e5629084e66b87ddd4577e3457079763a60c1",
  "0x63865bd4a3c5035f9f7b306943e048c21f81c61c",
  "0x90b96267e4f3800823cc6b4479120cbf7f24f951",
  "0xe053302561925c50cd551ef25efbd07d7716d321",
  "0xc1e845559550a376af2c7e836dbb6ce0aa044043",
  "0xb390b25ab38f1e3396b5ca69a01b3b0c477073bd",
  "0x224a1f52a8f402b90598a7f2c1b3b8a406675351",
  "0x6683162543a7b33c6c3406a4d32ab1e8d2cbce27",
  "0x117f7f3937e364bd77f4c75c7df10d1cb4e41d57",
  "0xca5362ac4b374947e6ab89f29bc43df94ea3ca38",
  "0xf65ffb117506b327c66b13c0521e54c306acaa2d",
  "0x95146d827a776f95bf5fe6e846594102e9537e57",
  "0x187704f1230699ec903dc2c46c8d283525213e53",
  "0xf4b62a55ba2b57611e85cda704580ad22ad92206",
  "0x7a5d0e1ab1fb75dd5176ea9d647bc99496eb6885",
  "0x1048a111adbbf5fade3ceae373c45eae5e6f177a",
  "0x15d7490702b2543859ff699f062526a2c80cf749",
  "0x9ac904eb5e885e2026d48f6cfd1669e106608a8d",
  "0xaa508413a479d8b7708fed82727a7f9d357e2f69",
  "0x8824d8ba85b4168a8a231a10588d7d74f220f799",
  "0x8b05be9f76b5d83b335d765ae056d70d28c8b00f",
  "0x963e1b23e90ff15cb63cf79676da6e8a25647dbb",
  "0x52703d47f4d27217bdce1307fa8bac7a09dbe9a6",
  "0xe3585c7ee9f20b5efd623307570dfd9cfc361add",
  "0x86939bbaa202746b7d4c52d9dc0f176568539cc6",
  "0x47917d88185f888d9a45aae9ce108a4ef9bb433e",
  "0x041abe2b1c3780540016a1e0857745dc161994e3",
  "0x60879ff9a3e890f8adf6c47327ede590d51a1b1d",
  "0xc676aee1278bbb09427cb1452b4acabd02c1aabc",
  "0xebc91eb4fb691c513575926fb4d0c58a422d1d4d",
  "0x372f0e8cd3b6fda60dc2a07972e01cf5cd52a52a",
  "0x5412e3c4832b01281a34ed3c76098acead3fefb7",
  "0x97bef64e374ffc63cac83150dc96627d94013132",
  "0x61928537abd6007d6a6559274892a57138c4099e",
  "0x0b7197e02612a1aa4bdc962ccd5893a1ffed7d6f",
  "0x705ad6fa90d14fe46594022e166a6e6c94563e5a",
  "0xe513abeba6e428b3203645a723d7cae38f748d88",
  "0x0ca24831d7d2c92db25da26fb5ad17af3ac9ca36",
  "0x1fa3ef02919a69916c6fd998cd9a0feda06646f5",
  "0x35db5245fece8f1f2221309cc56c418f28fdb69d",
  "0xdcff890b54c14879be6567e204b05201b1828718",
  "0x9f1a1f20c9c89cb033307e145bcc5ed740699981",
  "0x76a3d73056d18e6a1eb91c428a23fa3959635cdf",
  "0x315e811b58bf61e23f5ae7bf2062059884433ecf",
  "0x4ca6811f29219b6c4072399af4d6f8b00c72b8fa",
  "0x35877c9087e1d4522edf567936d13a61ffa57fd0",
  "0x29c82d957f8448e2e3653b15254671a1793adf31",
  "0xf4891f12fb71cff79d098813ac7f0a551ab857cf",
  "0xc133ae940ec5c494897fb834b8cfdf6e9b6b88c0",
  "0x10453cc4244e756fcd8e6e6e8747ef6fe28381c3",
  "0xa6f46e236227b08c1a1a48baa76a37c52bc15355",
  "0x1cb28d8bb73f62116d2d654ef05ac1fd04a625be",
  "0x3954292652ef1771b73329b601d3aa2f7029189f",
  "0x0f1e829b620f9c65820ed091f722031b7e315d04",
  "0x3a131895c74313cc67057252f3d4ae3931a0d577",
  "0x0ce4c5d02f5f919c659170e41fea228bab12b05d",
  "0x4c61d1fe4fa94917d5c3ea1bf6a274ff0becd725",
  "0x3c6ce96e3f4f07f9cee2371077e3bc74842fb39b",
  "0x369e7e266043843f8b6876aee9c56af0757fa214",
  "0xe8f384b1c6148d4d2ace86f39f0e4db3a7baa53d",
  "0x7ca784539d71daa1a9406a182524d2dd272bbb46",
  "0x4b2a6827dc4645e6edf3785a6983d7074fac6ff7",
  "0x771f6cb3f6664d5ba3ee78c37a8d4176ae784732",
  "0x819c7c04fbc6e242bde7c129be03982d800a9dee",
  "0xb3a163b8aa58d9a77fa53b1d89a6aeb61f8b6354",
  "0xe61b45ea7ccf98d8e5da058fb703482a6e98986e",
  "0x08fe6ff0803ed4b70b028f597e01f0580ab36daf",
  "0x0135a8f0ab15fb96a6bd5715f0d45257f410d832",
  "0x517964c15c87fc68faef1f6dfb60e39541845de9",
  "0x146781030ab38500a47608bc869862bb296148ad",
  "0x98eee6b0b9c41361c6097dc4e73a0475e359402e",
  "0x0655a132ffbd0637bfc71fa6b6a986cd3fde39a1",
  "0x3fff7b718732078123480c8d81a0e70a6a71ce47",
  "0x907ba9bcae4a8dcd71b4a831584f0f1bd87a4692",
  "0x826899061280d4df3c342547ee2c6014293bc154",
  "0x0020ad6ce40eabc75bc011d232f6cf9bebd9745b",
  "0xb688af3f6d0949ea85783fc47353057d4bd81e2a",
  "0x6a5949501dd21f57819643881781fe49222b4be3",
  "0xc038b7016e25459e100a04ddd667cefba7060427",
  "0xc69225bc5155c2008c6fa3350483ed2a6d16e217",
  "0x1e6c24b03e3df70dfd44fe44ea19154c5ca91b47",
  "0xd7d7c7c48d1fe539bef18b9d18c8719c93a41bb0",
  "0xaadab750afd87f6cee6e66c950c7d10c4b87ad99",
  "0x50b8c1e6e250a070200155544f34b8cb352be3e4",
  "0x9bcdd2aa9386838e408e86cddcb978bd55176af3",
  "0x15fa6fa39e8d3dd0d0c62575d39945677b4316a2",
  "0xbae3e865e0fa2e5c4bca504e9ad94d77f8b69eb7",
  "0x0829089dfa8a725a23c9952101552e2cf3e5ab4e",
  "0x118df4d6619473164871cedc07df2c79a1b76b78",
  "0x76bcd761f163d0228ef2722500ccb9c8b406aca8",
  "0x004629a1bbbf303990081d0999e485313f5aa434",
  "0x4495fc071ebe1fe129828ff207291eb69c3190a9",
  "0x00bafbbe6f19675e261ed374a8a2e30ef111c1f8",
  "0x30a359c3f0335e4ca5106414cfd79779e0f8102a",
  "0xf54f4f5ce215aa5212507e5e60d4b27ce6269d91",
  "0x696c68ae2317d5bb361215ea854ff4498cb1b5b3",
  "0xe5eedbdaff03bc72a2108888626f17d151cad95c",
  "0x292eab5da194017912cfdf5f02cfc2c8abc83700",
  "0x6f80fb2ebdc7d380b04159fb46e8e9da78a7cff8",
  "0x881b14e01a43a7637fabed96512d4da011084f1d",
  "0xb13b404a0430674c3f63edfcc90134704bd706cd",
  "0x76a3a9311b619463fe19d8714e80866da677e092",
  "0x5162a2050cd060c9f4c58c4c2e3697c4fc7806d1",
  "0xec05ad31f8f599cc2e200a5529d66ffb9aef32d9",
  "0x1b9f79cac18c88297d3cae8c9053f050119b9f5e",
  "0x6ed77b989f62164408b0e351b75b229a300babec",
  "0x7d1c853543103ce0fdb625bce1a0b5211bf0ff77",
  "0x816e24cf309f2b4c650cc36dbfa16129c410949f",
  "0x7c354333de027e9e851d92ee1e97edc2fd294f92",
  "0x8c73982d56113e246a14c2f4acf6e515ce833310",
  "0xf00ce6212f3bfd28335a58aa220cc1c9885c39cf",
  "0x7c3c1dbe4457e6be42a1d6c800a3474461b7c9ef",
  "0xbe236b156768801ccaf59d3aee864f51133aeeee",
  "0x05519e4242febbc07560bb6a987386ebd5fccd0b",
  "0xab66a9225ea6051a8f358c054ac8dfc9f39eae8a",
  "0x414cbff954d5b70a4157dab14fd1c134eb49d12c",
  "0xa8cda15a87cfd5471a540af029e48217a0971434",
  "0x235f5e80ef57cbfee2992698ce9160bc4bb9f2eb",
  "0xa3eab88c232e3d6e9e066970e80cdfef286e1978",
  "0xd7fde13c9602bbd6e32f7aa3bf035c8c3f5cceff",
  "0xbb1a611a21487628fb8526419114a66119006c24",
  "0xdebbe1934185a1739208f8bb5886e0afe4c0d8da",
  "0x0851f96d5f876245a27f38b751545b55dff81b0e",
  "0xccbe5287acd01672e82428e0c4eaf8eba456362c",
  "0x4d2cd4d5bc39a68865b0cca10cc86e802ccd5e1d",
  "0x1b9388a7cb1cc560c8f2cb4ffea1b1c63f6733ec",
  "0xa975e551c3eacf89ab96420dbb1b63947f1bc282",
  "0xf594c4dde99d9017cebbe4b90f37f0facf7a70cf",
  "0x2dbc295a2711f4f05622c85703c432c6e7d162dd",
  "0x7bd1a895ada29a350d2507bf2a5acaea075b7c0a",
  "0x4798cd3d6a4883792a6ee38853d0adc59391fa4e",
  "0xe06cff77fbcd05696844af7397b5218d8e72286f",
  "0xad9107ce6e77db2d0aa3cd2c3ee8a8eb16ce7cb2",
  "0x2a1743f5ae1fc8d78ef1206f3acba48b27259a7e",
  "0x1356e7efb18cc1b0ad9d8400dd4955a63de1df14",
  "0xdcd04a5fc4b168dbb0e4432cbf9d8799bb4a0521",
  "0xa8702fbfa45178a018a5ec0bf9148e2c3ad57fc3",
  "0xc7a9e1cd9d76f6832e9e5078bedc7120b31e1a76",
  "0xce3cafd800ac29e34e85d7b266152749c849b574",
  "0x629b517b5aff5475f5035650a834478758db5358",
  "0xb7955e785bae4cc5d6119a0d2b8b0113032ee8ee",
  "0x507f77f6c2a11fe1618bb43c93cd4cf332d80827",
  "0x3e1e9ad3a45d284baf0f204cbb4e17ad95de18a2",
  "0x850cd83406889d75f3d1f708d2451c07959916d1",
  "0x1d4a20287a9a85fbfea47982c4515b281fe83515",
  "0x13f3f44aad51749d6fa74073e256acfbfd8a2021",
  "0xb5bc87f0b51545f1ec8bc8a858fc32560303a42d",
  "0x0037fa577e547a7616e4b01d15553a0c7e980c63",
  "0xe7674b190def5a82730f5d6ab8125e277f10414f",
  "0x5be7160d0176069fdc4ed916d73f9287164a14ef",
  "0x7e7c2f9d4dfd4d82f47ab706567bf6171d69df9c",
  "0x4c7989a0ee8c4f690e085a7a0dc83a01cb4e7716",
  "0x95500a606da11af42d82703bbc415f4435559a77",
  "0xce1a57ad6f0f33d235a55b99fcf08d079bc7f286",
  "0xa37f902e940fba0133541733f6e4fb2e340e5cb5",
  "0xf80be82a42935395f73f42fadc6370286c10596c",
  "0x887316260690bb4e4788b16736c748f0d77e5e5d",
  "0x32e7a899c31597a78fa3d17cba88ac02540c474c",
  "0x4c061db48db3352bf79daff0914ef73ec514da9a",
  "0xeb6e084794768ab0fd539d4031071d0a273b68c8",
  "0xea0ea4f7086b787fe39a9c81ba920bf70078df89",
  "0x2c7f5818f8cad031371c2d1d74ba7d654f614221",
  "0x8aa61e388219f789fe65e023b602fdc2862af580",
  "0x2f1fbd2ac7a01e4fc6e207eeaac0c875a464dc7d",
  "0xe0295e7d7c69f91bc30a57514d7b6371b39946c3",
  "0x7c4b00455fa77eb7d74631d1e15abd102a82d743",
  "0xc49a5e0f5a756d6058f7d39d24f0a6c814be16aa",
  "0x7282319d6c3e3d939248234519f1ae118264b23b",
  "0xdecea7f21ca79019412e953a6dca09cc42220a39",
  "0x85ea0fd73d92f45578dceb3396c90c0dd84f7a55",
  "0xa04b194618efe84000eed9fdb11a34d41be1b883",
  "0xde8bffb87fd7085474ffedc4c932a4271fd6078e",
  "0x48b18dd111f2438d14af9f2a1a318279f87c16af",
  "0x694e524931356fdc6f6435578b0fa63c0730f991",
  "0x0b44353d3df4fac936bdfe5e93f2ca15f0a2870b",
  "0x9cf08dd3c37a7ebeb159ece23ddc4d547241e96a",
  "0x49c3a9bee92aab461646d998f298961e5ebf2467",
  "0x07b8df8ead9b2f0b6760651321e742639ce6cc9b",
  "0x82d67b868fd94cc948bdb24be7373b052876d8ed",
  "0x1876147689f200117d4c99408064643e9c940c8b",
  "0x1d52cf1213a17f9d45e678464fe63a061d0b36f3",
  "0x8d86f7ba83b38558f8c4fc45daa80c987e72b8e8",
  "0x3e506abf6081897794ae2e49ce93e861f00ba7e8",
  "0x43dc0066e21851f5f48adeb24baad7adc39dd897",
  "0x4d17d61b2abc275b21b30ecb21b779ab901f1279",
  "0x37d7024b7eedcfc96005f9a3a4161cbb97c4984f",
  "0xa77e389d365f8b120baa4c8615b2e705bfb7e10c",
  "0xf70e542e03a05ec4654028ec1e972d41b0cd92cf",
  "0xf6bd90bcb224c85e2739b7422f606a8e5a7069a6",
  "0xb540c3fb68d91f514728236010862a7fa4e43bb8",
  "0x5a2d4e1d7c1079c37b12c582d8ecc5143aa4e268",
  "0x5084d40fd4b0824527fb1438ac3670ed6319ab29",
  "0x727920d9a807d0662575c4a2247bb86027d71fe2",
  "0x3bbd31ce6c97993529c8d34ad75f7bf923a6618b",
  "0xb526534116d9c311d748560ffbde0627dd53d895",
  "0x2bb9ae0d0d417035c1009fad5149bf72c158ad28",
  "0x9cf686df6d6f19494f39edc1d806aeb8d3f46d6b",
  "0x7f8a0c65bfbec85e80622bc9e985c9f01633c6c7",
  "0x4cc1a6ea4f5a554213976c9a72d32a8f7ce6d965",
  "0x02d961c0ceb9641dbd5ad86705c5f911b40084ee",
  "0xd0286107724153740782b6da4e63a3b4d2aeb1f1",
  "0x9e32ab849032a069c3a5f9e62efa0bcfd23fb557",
  "0x6f97da9d7cc6e336f9244b1d91eafd0cab1a33e1",
  "0x85091771a389cbbbe777200f8e36bddff2107a31",
  "0x3e8194b7f3eda25b92bcb453d41d2aec58f8881b",
  "0xa688b533a69c53f05417000a8dc5fd27d0efe131",
  "0xeb4876a0dbd70b9563476315e5bd9f9e0a6280b9",
  "0xbe7121df1d761963ddd67c9cab18c80a34b1e88a",
  "0xd750af704872303b365becff56ae570f7434c68a",
  "0x73dcfb9419d0857799d47f1c0c364ee4704dfc32",
  "0x5efee0c80f931cfd9dd54150f7fb81ab8a7d25c7",
  "0x0aeff217039f443fa94a81742607cbcd5120672f",
  "0x5e170baab5f97f8ca8973de51970d172202f3bec",
  "0x8c8dd7e3cc4e0b555463d524c2ab4eef326d4c8f",
  "0xb6a683908c1979f268a7b3fb0c15fd1252c520bf",
  "0x6263a12c3d8ad2f7bac221b460408496b9c9f0ab",
  "0x674d6064dd8d2aa5cf40922c674c4eb627dcad9a",
  "0x8c2afd910b76b5a56cb5ea472819275a2a03f91d",
  "0x05c2334821dd2c2399e601ec880f8cd91984dcc4",
  "0x853c1ff40bb0467941a8a84680ec04fb3859b808",
  "0x6f93e991cd89d5f193126be4ad84c2de934ad619",
  "0xdca171b591327447a2344cbd27749f182f4f109b",
  "0xf4396dc5bbac6f4bd39c27a76927df099c00860f",
  "0xdd9c9e4a1131c707f98ab280aae878833c5d1b00",
  "0x50b31942fa558224b3c4cbffad3910c1e6d44faa",
  "0x9813502d0613041ddea65cdb51c61e2a060c70b0",
  "0x550ea48e05d6c947d6392fd2f20067cfbb28e272",
  "0xafa3944bee0f2dda42438ac8deae7e78549fa582",
  "0xdc2e3ea43d7158ec4cbfd592d7fc9096d394cb39",
  "0x81ac33adb31b1763fd6e84307f4c61bcad229769",
  "0xa2ac0c58d049ffa7de78e5c80ea156fae3a12cc1",
  "0xea0011f20e6b0468dac652fcde0eb68537bca72a",
  "0x92953c95cbe748f5013da5f6057dbe7cb49773a1",
  "0x2d377494fa3d5b3635a8f9a398785b404992e218",
  "0x08222494e4cb5004d53db0b398167bac42c43c75",
  "0xce4e878d8f9e7e50489498b21f53099ba5cd86dc",
  "0xc1b6e4514825cb1555b60b1b9e2d0563db1a79fe",
  "0xa5521252a4b49f47704e86f0086e40a235bb8fb7",
  "0x0963fdabcb9170d7fc8a6439814326d36faa4380",
  "0x0000095053b95baa96275567f70f4bacf460490e",
  "0xa8237989a81fbfdbddd0cc39ecd296dc99542c76",
  "0x78894748c02d5a39ca8f229298f65511c8c7df57",
  "0xf920d367737bb5aa01df64787a944f4da7d3bf54",
  "0xc54d099e1a23f46ef335c9340dfd8bc4b915993b",
  "0x810ec7c6b33a7f6bdbfa82310ee6d341f943ea45",
  "0x5e88547e98462631b0d222fb6e13048b46a184aa",
  "0x3aa5a545910784efd9492b618a4d854ba7c7b060",
  "0x0078f96a53c9061e19fca4a380a21e2f6df71b64",
  "0x52c0bbe8bde77e0d9cb16162e5b49fdd759c1d81",
  "0xf9ed1add37a4721f2afe36dcffcd940659966eda",
  "0xc00f059e9a822bb13d5d6a1cedf97325c27d3b75",
  "0x48d06d8c89023dad6f37bc09d0c7b52145c4b3d3",
  "0xd5f652068f02a91d0ee5cbc8c226af61cb76efbc",
  "0x70427553d8b7ac45a4f4854af19aaf36fd73d2f9",
  "0x2c2b13f8ffe829f05c561fdb58c696702d019eff",
  "0x4fed287454e0710a1430cd340a056ee56210ba69",
  "0x72c4abf27e244445e87ce193fb090ee6418452b9",
  "0x3a833912e339fac3fdd38f2dda189005c4e3079d",
  "0xf697dabdeea9e78ff27b3d7dfd8192b16d7b2bd6",
  "0x5b26196305a77b398689eb30cc25913605240836",
  "0xba788deb953ce006e6e5d23ab716eed9521adec6",
  "0x7e3700579a3e7b7c580ed2f2a52da8b1fd7bd837",
  "0x95854e60ebd2a93d735a4524e60e05dc762a0f7a",
  "0x8f54fce2c62fd4539964e24b9028f4ef76b7fa10",
  "0xfa5e71b0b5e91fcc21c3094a1d7e1997f39066f3",
  "0x6491aefa426a086443aa60c58edc34a6500fa8db",
  "0xa4b0ea6c6fb1c921b954f1a4300ef752a59d9026",
  "0xe1ce4ea8412db26d5c770715c2199a5a1d28872b",
  "0x6be8ceb192d0123e8c73591104a7b320834fe1d5",
  "0x8881497bfe6f0fadbcc44cbefc7e80c1f47e2db9",
  "0xc90ae6d684aa398650957962c22b9d22ad77cf30",
  "0x61acadc5ddd8245500b6c7b4237416c7920c3360",
  "0x26f336a70935847a0aa655e11d54578a1bba7bb0",
  "0xc244c19e891eb90672fafe84aa32bcd97e092a37",
  "0xabe6be10eb3cba7c9f73d5870adfb990041902c1",
  "0xc17379483914d220f499314df1cbaccacf6c4145",
  "0xc9ac1428b94b664be531a65f5eb891d41423e23e",
  "0x89c96ff762996cdd78e4cc104b2dccb20a80fa03",
  "0x5b60c204ad4db853330e100840cc41b35f7ca3a1",
  "0x2b9d27ee4ac65b5392796ae034a064c6c80ede0d",
  "0x49d96dcde4d25d5e0e8251566e768f572949cff6",
  "0x9a1813b213fcbcef315fdb484d0f5e56136d041d",
  "0x94d5f4fdc088906382011bdf42f27ceb17825947",
  "0xa1ada6afdd1f4e1021208b83f4225fa9e6a4b838",
  "0x8e5fed2335350dc37e61f911730da05b6a5f58f2",
  "0xd0fe9603d85a220ef4ba8ec2d7296d1319f5bf79",
  "0x89bab21efc42a894ce438ca976b79b86d661db63",
  "0x1fd7cad533831f4bdc4d245e45b0bb5710e2508a",
  "0x7fa53a1d0b65111a6ab9ff7afc7aab9e011cf9b9",
  "0xa1430d53a8a67c2e274b4d0f76c1c2ce29f45536",
  "0x5a0574339caf1ba0aca0a2846e0b213632d11922",
  "0x254fd6d01206409dae918da3e758a053032c8145",
  "0x24eda1190472b427d4a0434943d440d7f820a5ac",
  "0x142137a7641eddbbb8dbaba04ecf0e366a32453a",
  "0xaadc04f385e384b9670187e48feda8925ece749f",
  "0x16b5d21c55c9b8c5d19a61c3fc84bab298487f9e",
  "0xaed562fd5a30e3c583e9984aeb5f3f80b1f6204e",
  "0x4990daaff67c4cbc22c8eebc321916cee319d737",
  "0x8236fb9f8171aa9c410550e4ae054d5a0a06d17a",
  "0xf086d30a5afdcb76427dd72c9f3a1865f8b8d675",
  "0xa112cee2c9ad71b2c76f9d650072b9725e1d9b62",
  "0x901818c541e660201577319aeafc9a153cb536a6",
  "0x8779159adc49960c5fcd6dd5292c119b24c0eb5e",
  "0x5116150f2337af11d6389cf93a429c84f330265e",
  "0x2e359cc99a7ee2adec0c32b7fe4a97506cf26cfe",
  "0x22d84c6e7981d4fadbe3adffa04df55b6a563edd",
  "0x3e55175c0efe0abfa3f14591895f290a358e6f6c",
  "0x5b13df44a1b1f596aa4ef62233511e94d74b0428",
  "0xccb89ba821832af781191da24ca3554cff668127",
  "0xaf3d292c7ffcee298806c457b25e4ab323afddcf",
  "0x13bb7a9131034177c135333f770de32319382e33",
  "0x7dd9f51742d4c42e77e70f92ad21d7de143437dc",
  "0x6eb875b89bb0c5c4dd4158cf279bb34e2f915ef8",
  "0x3d3cbedac5d37fb8ee131e63f06c2ac7d56b28c1",
  "0x2b92192d14758b68dafc7bfc2666b5b4e7358cda",
  "0x58343b8aafd220e1b3bc06dadf09bd61fd15828c",
  "0xc6ff3e2cbd016ec0c5415ade7d2be97875ac6308",
  "0xa8312b350348344650d0101ec26f25dd9afdfe13",
  "0x76a0d1da7e210b3fe0d7c4e41272c3fd6083d95b",
  "0xc2d3072114201973b0d5c1d880ab20b4ca922381",
  "0x210d8471c12d110bd2db2d3f1609665ca8a14ea3",
  "0xe6cb7b30f8b3f8e5d983e20f437f2f060bb4baad",
  "0xc4fe622cfa010f051a708080a545e72472e42ad0",
  "0xeb0404f706a8662d8b02772ab9d8c915f17f0d4c",
  "0x9f24a094e25024239e8f1427214416efec051d2b",
  "0x4c779ea29b583a43e13ce06dcdbfacd46b8dddb1",
  "0xef55fb20fa0881b6f7c4277ce7561e5c6a4b6a6d",
  "0x561477cbb6e15eac7c361f7290b76a6ecd94f373",
  "0x351a224f6597a5b8e5af71d9a6500ede88757ea4",
  "0x96d93d4eff3843ee0f150a9fb4d168e27419ba78",
  "0x5caa00f069d2776567ce09920173be8a0716dcd1",
  "0xbe4cd300c8009e8b3a59024ab8eb609471614b2f",
  "0xb3522729d08e6eeafb502467f86d0d3f97cdbe86",
  "0xef6bebaa76826f2ab20290da92f87e71ebdf0f8e",
  "0x2a28d3f2da6cfed6bff84886b20ee5ab3aba1b82",
  "0x31fb95c363c1ec2363ee5113cf083d7eac1984f7",
  "0x3cf16cec209cb4da236e7d7141279c707b3fa964",
  "0x9e7159b5f39539880e473ead84d0010608d66dcc",
  "0x49bb78cbcf317d214f9828c0d1e95c1e41f7eb10",
  "0x69c489bbec568882aefb199254cbf11dde6f0f12",
  "0xa56ccba11669895110d7d74cd03dff4fa1ab1a85",
  "0x0f9cde926dcc1bd1ca6cb51efc8f68cb144a649e",
  "0x3fc99d0e5829cb829230f8ed2b9882b49ebeb50b",
  "0x71a274251abc8ecbff5ebd01e73c8a376d332a67",
  "0x1bdfacf7a2a44c9ef38dee85c6f6651b1fe8faab",
  "0x0ad83a5061d32e9cd1319db2f1d44ff5c0c4e0db",
  "0x2ec28cb88fc8edd1db790023a06971dd7c779aac",
  "0xaef4c36af1523f00afd43dd76581fee659c529ad",
  "0x8b967bba5996556180e4ec1ffae048df00c03582",
  "0x812A2F2843c590a80E1c505F3d15520C5FBaeF04",
  "0x09c9f4acd209bb388ee4dfae9f71d31d35f92cde",
  "0x97decd205cd3a6a2dc16e1c09c72ddb175aa0e25",
  "0xa5e444fa95bbb2f6b713b75e7f02d4b4ba7583b9",
  "0xf9dbda38491a535d43f5746912e7f3910617bd51",
  "0xd4a1c2da1874df56efe5c62aeee8238cc7d319ce",
  "0xaf9733852960912e711ca743e732f06e7b0416ff",
  "0xfb2e13bb012b510b86a282699b76845530e284da",
  "0x946ba8faba45d4d5f5b65fe74d5044ce3ecf62ae",
  "0xf00317a5cfcf5efa42fafd7997cb6a8faf92769e",
  "0x4d5ff19ff221a27af25079d23379ebc1aa732974",
  "0x7c58f9a1d4b3a1cac10bd30d9d1032d6c158fea0",
  "0x2d04555ba8ff64a763c94338a6c4fbab17e3d8d0",
  "0x9921fb9c16e55c983dbf7cc344728727e916d69f",
  "0x7c14bb31a31d63a3d28fcc11d10507208e98bd96",
  "0xd5dac5d0f5f8f936c8758710138b7a34dc258335",
  "0xefc60ab92888720f998f4fd79426c1a962b09114",
  "0xd404497e3f678eee7365d52824a61efbd6eb143b",
  "0x36168753e71fedf619c4cf0db59643fa9e511c2a",
  "0x6dd9d1e0ace2bc5802e13d1bcca2016c8161f219",
  "0x571b0a7531d5858dd8a7c32c97399ada8c2d4673",
  "0x66d782694d0c3ddb8868abec5337833870f2e1de",
  "0xab528f3bdf4fc06042a92c9718fe504909938b82",
  "0xa5a2c960c09b2f23df02f8aa307fc7c025d847cd",
  "0x69fadaa5a16d93003724f1fa8ccd1e9e74de414d",
  "0x0937d9297bc7915adcb0abb2f8ef236805e743d3",
  "0xa856438e184a4d4336d6d33db51be67977ac64fc",
  "0x4ca8cd48b4af703f4a7fde199fb8bf798d6d3e17",
  "0xa103fa2d608bd220ba26d1c8258e6162136676b9",
  "0xcf9bb7c77543cdc62162d3458f3acf0df92fdbc2",
  "0x568fd3434f2be3edd1454de76b4a7b2fe5d8d717",
  "0xb154ff0ca13372fbdc817129cef2cf33a1ca5daf",
  "0x4acc290a701ff39da78cde151176dee141b70656",
  "0x6986038bf86ba79eba2342385f4b798af7f2f263",
  "0x0e9d09627834c1fd60156431ef7e448df7d6e06a",
  "0xe93337d18d175f515459d9135c275edff58df88c",
  "0x2f5b307163dffb9f623b0b906e6941ef8e7ed72b",
  "0x6632e81b5a0b697db27ff1c66583a3e9a638a06d",
  "0x8b16b157ba7ca4caaff147af82c0e3d9e6716e8d",
  "0xb75ea67b0e45f3c8a1da0604d7a6b903a87ef05a",
  "0xde8e739e1fd17d59e1189773068c868fa33017f9",
  "0xd5bf8927628c8075ba7ac3ca16367f44c7861e8e",
  "0x7d62b87fb561aa18810f811586f8047b608d83eb",
  "0x563a3f8968d5dee03e77d845d8462db9f37f57b5",
  "0xaf8bb34363231dd404abe4106ae11839231c1ff9",
  "0xe825087109534743cc10d27f82e159fcc023efc1",
  "0x6f92af65bc4f9161882e8bb1b0fb99e9535b102a",
  "0x7b2e94ad97c09a09eb8ffc7155cc15f8d52203d5",
  "0xd835520affbff0e30a9a6b152c9ee158065c1e3e",
  "0x4f565778b35e627b00b6b4dd5c0234d4cd41e365",
  "0xcaf5cef7be65817c097d647a5d5e1bb42222778e",
  "0x8f1d8725ec04584cc3ea76825577d5a4bdfb0443",
  "0x69019b396226b976ee36d8a1a3309680c295bc51",
  "0x67751faeefc983917bcc2a7fdfeeeea1137e4e72",
  "0xf32fbcf957debee213e89b7d58b1238bfed52776",
  "0x9291c7dd19ad1f5a710b83dfe738a31b61e2eea5",
  "0xb2ef2538dbd852bf004dc15f8e35dd8d9d1617d4",
  "0x49e3560b295a61b4d1c2a86d1ea2aa2bf5d73613",
  "0x72a901836e0ce2812af063b1dec0a2317e9aa4a9",
  "0x5c63b28e3ef6e96f874447c1914f6c52157c9822",
  "0xceff4235b93b2cc2060a61323971e6ee3fc6f202",
  "0xe35349770eb62bee7085c4cb5e134223ecfc9115",
  "0x1a46c7b8e761e2f81e1fd7e8fbd9f7814f7b380c",
  "0x932fa90a2edc000e9633b556d0e759b75e6d1fd1",
  "0x96dcd4871fbeb740b0e8ef16dffa4712936df78c",
  "0x0fd90124e2ba3107908bb2df22d9e733c5dc81ca",
  "0x2a36f8897dfef3bf79fcab97301a7ae6ba3d8a52",
  "0x553ae530a8d116ed4d79e2bdc854646577131a77",
  "0x61fa7139e1765c19252ec6e46a2cca35aacc0654",
  "0xd7b2d8f7c8eef4d87d3241f5ddf306601de3e774",
  "0xf8c0a4b80ed2b7a2c2ed3c1148a68567af597d42",
  "0xa4c9007e5bea16485345c1593ce0cb9f4fabd28f",
  "0xd2a29a98de084f59ac3532d661b767cd34d0fb41",
  "0x8eb599c10794f296645e2ae4ccd2efee0a7f37f3",
  "0x6f7c4e57ba9f3f440e7e391d5773c772e3fa123d",
  "0x66a8be595d8b540074157627e959a0c8cbae7702",
  "0x462115f4cdfec4a7739a1fb6463b074a36c03504",
  "0x9395f04a6ab9003c8d3e6597524c65234037139b",
  "0xc9a946ebcc35ac47724944354573c65ccef7208b",
  "0xe52f681afe97991745a4093254d411ef98e84453",
  "0x7d277031d241b779ae52076738d8fe236d8a1662",
  "0x6decc867f52436bed6581efc4f483b6b48b7e6cd",
  "0x1bff3e5a7fe2f27dcd01478d3e40043575fbc4c2",
  "0x0f30b240876078a4fd5b5fe5bc3817cdd8fc6897",
  "0x523d2b79cfb0052102d645d8d6bafb3de4d2edd0",
  "0xb58cb09c98fe4d0c4e255c6e2bc50aac5ac668cd",
  "0x3fa5cf620cca82956c5a54805f46795e6fd5f4d3",
  "0x41d132edcf493ef5297f0657151abc270b6a94fc",
  "0x6c9ba4b7f5558ba57a493cbee477acb6685dc33b",
  "0x7a184e53e98a7dbfae01e4b46d9e24ade020974c",
  "0xfe3ce0568b9c226402e017e5aaeb1b2b6bcf4099",
  "0xc997a1ea1f0b613abb7919e4d0b5396e15b9b1f9",
  "0xd329e9e6130a66ded06b8bf91684b88ca28cc3b9",
  "0x79a4655859a10420dc771a598f0d945bcc7a5f15",
  "0xaf99a4581cd0e90d667383c9bda48939c722d59c",
  "0xaf271f45deee9838d8d82845d97de5b461e8b14a",
  "0x2f6f110c670961a0e2d6941483cbc5a750801709",
  "0x6a20c1e23e2535754f6935307057967a0a02c72f",
  "0x2db6ed41bf50d423b18049952c10dce0e202b7b0",
  "0x01daede4ec4faa6ebcee787441f8c450aa78c56d",
  "0x0c85fc7089e48af639625c12631e862fd27d942c",
  "0x742db2325749b23c2d538389a5d387d87172ed70",
  "0xafd0533db9de8320e4f5de2d0ca2f4c59a921ff6",
  "0xaacabc8926026d78f8530588e82514f910754f10",
  "0x83acc704db661037a2fc201d4b318bf4c4bd9265",
  "0x99b6d461588e0f9439201c15d4b57a9027edd503",
  "0x2564b952ada7d0d3b440f438f1be659c001f25c4",
  "0xa9af01ba3b28b60a66f9887edb2befb1c61963c6",
  "0x3e5388826c8f9da1c269f636a004a92c020df96e",
  "0x8e2318667c1c70c70cf5070b80f62ec7f7d14d0f",
  "0x61fab3b691dc0c100a183d5cdfc97b31ed37b732",
  "0x73cf416f706128da9722f6f938943f97ef01d1d7",
  "0xba64c20c5b36151952247286783a6b5d8cb1d88f",
  "0x0e27f6fb0c1f019012b3f55d9c218767616d103a",
  "0xde6150e4f25f596733639342b7e0fc789455ce22",
  "0xff2ee5cd53355f366e2495d8382ac2c95235a7a3",
  "0x7132681a825b080ded0a271c3b2c7cebd2dda70c",
  "0x7a0e42be5ffe3af4e390daddfd0ebc5f09328663",
  "0x25ab9dda33dd8d2abd2f1f27654e0565da54b35b",
  "0x28978e3fd3f1ebd1f1e45492cdd9e91c19542cb9",
  "0x9d50b1e075c3fed575dc5a7354f1c69d2d031f6d",
  "0x11b3dd9db2d838696bf9ebdff204f79fc10b972e",
  "0xf8de3ea7b2c9822d49d66410aba1419a751f0ee2",
  "0x80563c387a4a915c621e137043767a4821147ca9",
  "0xd7f9948be46a5a30154527bdad78f77259482da1",
  "0x739b71d11c072e83f019847941b3582fcdf88539",
  "0xf1a432974fbf42784535eed099b97e83546afc87",
  "0xd07ecd2f858ab61b28d6cd23a441033b4dea6015",
  "0xc8909cf515f91840ed6e724e48204bfb6ca9aae6",
  "0x8652209d48331c0cf3ee284a2dce429abe8e908e",
  "0x5fdedc0170f0438b2d0ea94ce6c547d9e91854fd",
  "0x6d4524291732299e217437b909730aa1e53a4c17",
  "0x6c0cbdc677fdeea5007ce2dbf8d087e1618a4078",
  "0x1171ee517a402f732fe168617be74cca9618c5ff",
  "0xe8c725e6d57e765b1cf9a30af909bee1297bd321",
  "0x8a9a0609837543d6d3554459876cdce2ed80f2b8",
  "0xd634063805ceaeb81877fd069caeb548590ebf4f",
  "0x87b56bac2774218d2ee86211987f8993a3437e79",
  "0xbc225896986ce596240ce523c317c7a8d633d985",
  "0x118799c49e716066c4c2ab8750b1b050daad9970",
  "0x26ca8dac0560a236fe32d2981ea867e9b789b502",
  "0x8dc304ab022c8d8968c211d2106ae59350cb5953",
  "0x3fb5f05bc81b5bd2f227a2dbee0a60018b2d9938",
  "0xa84327a1a61b430b1614a7b0d30b0eb3e6c316b3",
  "0xb41e9df8245d410abab9d4251bf014a34776f325",
  "0xc26449537f12e4f596d8bbbd2c593fe21cb5ea02",
  "0xa7c7dc522323ee8e4d27241e435d6b3a39b113a1",
  "0x65aac0bb0dd030755483fca6deec61719d59faed",
  "0x8649c7ee0e5b167e214381358470e6370fd5ff3a",
  "0x28075a53bc765c22667092d8cb7195ddee93cdc2",
  "0xfeef928b43a0f93365f5c9e21ca053c074a8e1d6",
  "0x884f391560a8f98efa531e5cf78dab4acf0cf7df",
  "0x5d187ee44d82fd69d4ec878ef0d3a5de77e6404f",
  "0x0f68c46c221b56be5a654feefbbc164999af422d",
  "0xa17e0990cdaf93d376445ccd7b0a8a3287c1be8d",
  "0xc328184f3e5383ab28b933de8b49a2bbbefc9f85",
  "0x92f1e49a024a5357f81c36f49062ea14033446b6",
  "0x5cc06ab1a524b8d18429889a97d72aba14110587",
  "0xa0a05e137139836c124625dcfa8b3d7e6f685415",
  "0x755900c2966b2e3ab4fd4eb9470ef612cfab8643",
  "0xccfa16b97f1371b08196ccfa79a228d4bc75786a",
  "0xd54082af7fbf2d82eb7c3783eab86ce900109c9a",
  "0x4b2636866f245c49a5d0c2316a7ab94bbec5223b",
  "0x79b37ef9cd222f8f78bfeda73633a376e5afe1d8",
  "0x1692f6ffe385f1ca31c58006cd3769c1b996a6d3",
  "0xfc3332e58df18c399856e05d0b3ce90c33a1dd86",
  "0xc1143b02f64df99e98b32aa5cd15815c17901e53",
  "0x0cb836bdba2523ee43c095c53154528b77988da4",
  "0xc6fd94dc52a2df59edeb9e3c84946094d24ff357",
  "0x413c0b6cf92893ed1cde250787dc12032e5a6dec",
  "0x304f7038cd216028dbb7f5a050e014d5a93a034a",
  "0xae5aae7d8563f59d82ccd98322fc3d51d7aa26f8",
  "0x56cc483797e7d158016f9b817ac2ed31b0af6332",
  "0x58a4e01b4dca2da71439fc4b243c1ab7b88106ad",
  "0xfa3c455f5253dd4108074bf313db7d70d06c92e2",
  "0xe6b2591841108b9f602b5f1a88cdef0424844a6b",
  "0x94a05cb4baa915454acedb51663d1b2fc516a565",
  "0x35e9a4d6224bd9dc310733589b6448089a86c954",
  "0xf7c7caea3456deb5646a8b23089d4c7d30397cd0",
  "0xbdec63f951d07ac2ecf820fad3212b7cc123cd47",
  "0xb384b0e1f22f99e9d68548855bfdc570f5241271",
  "0x16b266541ab166af31693e19bea524dabfa0bc60",
  "0x7d083fa2c0a2f891d690c348abb9dd2509fb5f50",
  "0x2789fd937cae3daaaba609dd9884775a3c086e99",
  "0x319a4d1a842229a76a1eaf8b8297fbd399ccc7ae",
  "0xe24fe02c84ffb598a93f26760c9535f0b9169aa8",
  "0x94ce47601fa8f8c2e3e1e807d129d13af045c131",
  "0x14ed63d96b60d4a0a6ac1f5e846f916dfb3366e1",
  "0x8dec148011de5adcccd4436d902a323d99d0a106",
  "0x58924370b6480f200a75f06673a3936367824551",
  "0x9ba4a36d2e863f99fcce6d49ec6a609ef4a389f5",
  "0xf69031fbe7a446956126320bbb9b582b2ae451a2",
  "0x59b1e92839f20302fcda0d0633d9541155f9aec3",
  "0x67ea3d8a3c9a2bdd65401e2422b85d54c85b4227",
  "0x66783954a64b6269c66115440a69ca91b69cf23e",
  "0x478fbc2d8402a34765866c5eaf2858b63c352baa",
  "0xd5134fc32a1c26919b2291690eb59c9834afac48",
  "0x235a31462d09fb8fbd07f71877ab5d903f763360",
  "0x8052a398480b5b80d52d3dad6fa842e5b671baae",
  "0x63d8654618eace1bbf3313b08599ad7f745e9854",
  "0x3699ede0adee19d327c440cd344c11909bdd3d72",
  "0xedec276709e9bc26a7f3eb5d744b1d67143ea830",
  "0xa6669aa1b0464cfbf1ba48c68a8685258b29f578",
  "0x93dbc2e636b6385aabb6761f33584e612c8e7fba",
  "0xb594c8020e133d3c3127e92c6a221ab737891845",
  "0xf58085ad2437372560e7ed1757cf68d373863e3c",
  "0x4bba9dae0a063eb1b54214d7b78acef1dbad4c1a",
  "0xfa5998478b13490c00d2d685e4863a3b33cb28fa",
  "0x6940c6a5803b042e7b0dfcf1bde68c43d151c0e4",
  "0xa3c3baf1e0d9f12e23d315222f7fb8ccd65984e5",
  "0x31a793397e45b00e5e8cec97941abc02ab1b543b",
  "0xceee758c360437e6401488d015ec5c1318580617",
  "0x092da42945340c8c61b9b9af917ac0071683091e",
  "0x3b4855c49a8cc05f7200321f0b48623babaae71c",
  "0xa0d459206cb9d82124c93d333222cc97c49f686a",
  "0x51be1bb7fd7d1b194d479fd14fd0f58205fb1fd7",
  "0x54ffe2a67e6eebbfbdaaf3685f41d79811e7b698",
  "0xdd9064d1ee78695b0a532f8f17935603438e74ee",
  "0xc89c1b2ec62e6708a4f4f46949a6e6ce33904562",
  "0x7755c8eeb928d2ac0d14f3ed1df3d0ddd6b54dd4",
  "0x6125150c0670b6e55cb56afcf561fdd5a374b97a",
  "0xeac6f6db8347937a4489f9ae2fb8597df38e6e1f",
  "0x28f32f56a1c993d66da13ef8e41dddea27ab6960",
  "0xfbd90a5643a246e9d1b075688171bb65f59f5f7d",
  "0xa516e2255106a06d7bff89e21d3269f4e6bb2cc5",
  "0xe740d30ba39453e34363f43c6a96164e8b34d9e8",
  "0x49a6fc4ec3aa099e4239f2b2b04b7623701a6097",
  "0xde67b82e38c1ff2792012d1b479ffe9168e16722",
  "0x98524d0001d7718e7dfda84f570a1209b9b8f716",
  "0x46c8a3afe7a4cf0a7903e4fcdc5f2288c2a7abe4",
  "0xbb4685a046d26ea1987ab040d065819b9b2e5005",
  "0x014b5de331e0160c70a366720bdbe695c8b206e3",
  "0xbb80c7edba510a4941cacb726e7781252b162d7e",
  "0x56e816bff3abf02b61f903c4316e2883aeb5ba7f",
  "0x3f365b6603e1564b05de0249819bfd24c31b9483",
  "0xf519bdbbf6ae794d53cf79afc6f03ffdae957986",
  "0x44140143ac3912a29e98119180e04c15a02d4629",
  "0x797d4d9be739dc5709c3f9b33431c6ad1fe89e94",
  "0xa8a95e9ac1c639e4eb56c92ad6435422ffeae49e",
  "0x22163b3c0cd1a45abc18156288b4f131351fa584",
  "0x2811f5f0f0cc75f38b5093ea9bc5db30a4a5fb70",
  "0xb9226d8d36d5e30fb4713d1d4a60cf03e627ccd5",
  "0x437cbc3c8b954ccef90d477fb09742f404d81b29",
  "0xfefc5cb275c1c8d3600c5b2644a8fe22014b7e5e",
  "0x1d3fd411175e61f7d8b77c7fd3dfc286cb0c249d",
  "0x019fd3e76865afe0b95f0132425606fc816ddf63",
  "0xf870c8cc36978935fa296b565f6ee0e0a2bd314b",
  "0x6fa3fe4062d8fd997c7007511bdcbcb211520890",
  "0x198b8de8ed7e548558dd6bdb5d1cd83272fdd096",
  "0x6bf96a4c237f9d38436818b11ecb390488722ca6",
  "0x9ecb43d8892d11e95c8e47777aff13fb7b565591",
  "0x49ae31a7830740ba32af4d7cdd38f09b24636854",
  "0x818be0a38e17d78332628eae82611b698b55d949",
  "0x5a09a10436106cad057b95dcd278a4016639391d",
  "0x5375859f7209e66ff3d53edb76f1d05597aff9c0",
  "0xdff4b8113b0bfe265c266b1cfe92bda9ea43a5f7",
  "0xbdbaa584209fd07691955da474ae359300fa1d76",
  "0x9e864049b6693ecb83d74dfc3a89eabd90ecdf2b",
  "0xbe5f23b62372b8e3eba6e29d5bd7b5da5953c932",
  "0xec09d577a2781188a3c2a386662eac7fb3667dac",
  "0xa887e83793c3505c4480698478a9d9ea88dfc5c6",
  "0x7bd7df73ff587782c91d8739789a9af1248f2574",
  "0xb12f95a2c9a3f730b6820e7f1ff86726e68b3803",
  "0x5ffe38dd6aba41a3f39b456c5bde4953e6811ca9",
  "0x5b533c7401535012ccc08338637858af8a024fa9",
  "0x6ac069e7eff2bc3fe25419d7e80aa2cb9908b925",
  "0x1109fd6421701e85f50864d980996232499849e4",
  "0x844765f7984395baf443fe2299ba4d9784db847e",
  "0x69e0bf6e355cd478497b69cd81ad665a733f9f8b",
  "0x2a76715ca5e325664ab97e8c14ca8556801cc8b8",
  "0x94b7f5500d0cab8afb94be3deb686dd10c0f77e9",
  "0xc59b04e3da7f303b34f27bea63bbc52d0bc927a6",
  "0x80aa76fab13fdf472602f0597a31c131af865390",
  "0xba43209fa2022a4090edb462cb0e0bce2f8c854d",
  "0xca5b1f24daa5470c63014146f4d8ba6070ec7a62",
  "0x2c144b4a15b31d3c487ef3da3d52234966b11120",
  "0x34dc821a968bfb90986a9e06ca932a7596e4cc9f",
  "0xd1f5fd9f54f74c60f3f4e14d11f70011ca3ced5c",
  "0xd545cef062a2c92e398f646703fff2a8b7fbf95b",
  "0x58938c37cb8b02de79af45f02ff54d486bf1413e",
  "0x0a0bc92981a631b1388279a7a1563ea42fb6dd69",
  "0x76104a3777793c923ea61691a4e382db900d2594",
  "0xff9b5da6f3d576bc145d886bcc49ac295e5d9edd",
  "0x7905f1107cc6448b4dca8db325640b8d1f4fda04",
  "0xcdf0e5557c2b2ba694b497ef1b511a0e5cd35f27",
  "0x72bed5866057e80f0e4c1b379ab677b4cfe23d90",
  "0x72ee8330bc77a34ecf3b8cf8bb08d1e8cf243543",
  "0xa7589519ea68e58d7b3b4ca0979e4ff68d862f17",
  "0x21e38fd42681c8b391fb9af7bcc5f0fb92c50604",
  "0x3d299807d4d056185e6871191331749b0254628a",
  "0x3865196544b60ca48d2728093bfc058218602090",
  "0x775180ecfeb06a04b6b3915efdc864558dc3db0c",
  "0x3b867477582f99b58f5e91864b44ad652407c25b",
  "0xd45b7c0f9977127d30e58ca72be6868a344f8bcf",
  "0x76297cee6ba4f3851966e7745a5da813087b85ef",
  "0xf14bc1d6a24d91c18bf6682485ca67e29537d4b2",
  "0x7ec92aebcbfef90672e306a80d6ce649a8887cb9",
  "0xd2e85c52a84180fc1dad3c56b02ed96a9999a610",
  "0x99f5dbe355b1802fd420edfbdbce1cb207d4c70f",
  "0xb0490c819a75aa2c495bc84e835a89fb91abc571",
  "0xef9769d1f381c7ab8306203ec2a3a9cc3b4c28fe",
  "0xf0766769677ba51565cb5843ebe55fe92e11ae77",
  "0xa895bc024a0fdb8d3135ff23c81514ec8b9c37b5",
  "0xe9a90d6cb6ac4662cdaee152f1e1d6b81c8610ce",
  "0x6865212e97015d34aba63a5179b148e992619d54",
  "0x150439ec6472270bca74e8d5a24c5d1a8260caaf",
  "0xd0256c0211aa78a55b49a90a35d5c99a516febad",
  "0x9e8fa5ce0cff9e39a35fc7484ade04b8f42c9a69",
  "0xc351819e178a756bcfb5a15c048f9345e8dee155",
  "0x9287ce26940ab7f48e37f5128c184c16c673c9f8",
  "0x963546acd5c9d306b22ed48d75e642590bc7bf85",
  "0xbee79665e0061ede772576ecde41447c272d84af",
  "0xc87d73fbeb914eadf599e5a06d637633e5e9beb5",
  "0x2a787175fe3944318230143e2e6e9ad35ed3e0b8",
  "0xdbe76a2f36e759464e742ba9ff02d4160c81edbc",
  "0xfdcbc72d4d7c4ade7256712088daa706d70c3377",
  "0xc6226baef476d438af12b68ef8352b4d77099323",
  "0x67592b1ddd8a313b8b229b960111c714d4f1adeb",
  "0x76cd40a82b5238cb73a9d5b7f9c9300bb6faaa0d",
  "0xe52a86a354a505a50f45b14bced9d173050af3fc",
  "0x13796b4423cf5abf59f9da9694c4a67200dd1118",
  "0x6acf5bda0db6dd20ab11fb8d2a3b536de32f6a15",
  "0xf1d863287236ea6fb9d7d18337d272c830715687",
  "0x439ce11ca1741594cace40c3fb3cf2aeaaa15ef0",
  "0x6e977a02cb1189dff8917d435a19853375b655f0",
  "0xaec55cf8314d0f9adbe97e52883684a47a3e04da",
  "0xcf7bde5ca515732a66e810b9785663789947ba30",
  "0x54b53b5aa7560657a776b02f6f9f8a5ceac22353",
  "0x76debca02d901a7b467855e4f198ea2fdc99c9e6",
  "0x00000076c7c7c99ff91472942c7c3a7d60f9b16f",
  "0x394f6b3e7f444470cd795865c9bb1123cfaa6b5d",
  "0xcabc655d1778d5a072f7de26995b9ca63fd490ba",
  "0xbf41f2a9f9142c613facd4396e81c458778227ed",
  "0x8f657f250ba5636572e3fda57dd378d077b524e1",
  "0xfd50abb5aeb0ebff0b76e7bfc8c6d069fd9fdc4b",
  "0x00000f25a1f88caeeec521d85d4955e95f3160fe",
  "0x5aa5cce5bbb136bd412088370aa3f8a5197c2239",
  "0xf9bc40738393bef2eb028deeb14d2732e866965e",
  "0xf27d3cc78a015808a4ce53838352687b7b7b7f29",
  "0xdbc472c20e9552f5f97dfe4355a4252380b6eda9",
  "0x1b5219888243854a9985a9b4c3a4fa7403f39344",
  "0xd27f6b632eb96a921d741db90466df5b12d12cda",
  "0xf4d910a8e785181f170d1f2369d5476cd79d7fd5",
  "0xc6a1fcc6bdf24306af100250a192997c2d140312",
  "0x08c43b6ede29e95ddcabbcaf9817ff50dbee13eb",
  "0xe149dd41ef2471799e0d0f98e69ae5ecc785089f",
  "0x9d5b55528fc144a1822d6690dcb7a2d6789ca4ab",
  "0xb84e898950b8bba15347c6832a5e8e2fad90c5d3",
  "0xc246d56e17d4eaec2f0079db04d5dc258b9ac052",
  "0x4605b4b3d3b8b9ef370a6b96dd6e9caa4c140b6f",
  "0x9d36e860bd6fc2ba04cb22d6e92ea6828989dc40",
  "0x5d27baa1db107d7d0c7aa5dcbc79b11a74c53670",
  "0x2ed027ca1eaa38bed90460d3695070ec96a0e17f",
  "0xc10580e61ebcabd7d6705341f96f7666f33c0ea2",
  "0xdb931cda8b830f07e3d1e75e4a36ad39df2fcc55",
  "0xf10fbc0b159ca089be879c137ac278edcd53a592",
  "0xc53c6870000f843a8b077a7649f84c72e9a25c1f",
  "0xbbcd630e4f99c0ec4434cd4a1b5c30aa698524f0",
  "0xe333cb0034e703028a1b559e8b78393d3ecd4428",
  "0xa8c4492d2d2bf03c5a54361955f3a720f73b34cb",
  "0x89f73a1e844593321ba0776283bed9304db726bc",
  "0xfe5b1411ac9c87117878d4376776fc7cc8b49034",
  "0x5f81bca9390c6cf7e4078fd31c20a06ac2331f99",
  "0xdb799291894099b01e8f919e603a2bb89040c88c",
  "0x0168416094096885ebd6f3c01fb59552ca08419d",
  "0x3e5551d54163745d73b84a124c6f80f063048114",
  "0xffe52c5e9cfddd7a538c430880d7778531eb0d01",
  "0xe2a2c00bd0f136addefe47349465e7e2b405b0f0",
  "0xab76b757113554d5526962a9424a21d2311b972b",
  "0xa2ebc9d85924cd97f421783881156fae17a7e3b0",
  "0x7dfe3a3d8facb1cb51d677fb29a374fd6cd4c661",
  "0x626ea263c614bcc5fe854d2a49037a189280c287",
  "0xd386af7ca83948c6c53eab0a39535a8558095b77",
  "0x66573ad3a59c25ec8dc48c59674d5f446cc12123",
  "0xe4a964e36a3ae5f30ab8c4b8392fc65f771c2566",
  "0xdbb63e7d55d47bf2c41835b13570466327ed3263",
  "0x048687ef7ef056b0a27286e35a08c31ec655f318",
  "0xef9eb78def01e8709ad7c6792e865a64529ed7e4",
  "0x87bc901b92275a5c4bbd645eaca50cde2539c197",
  "0xf4a68f6bd90091c8081d9cd00333433b0135da3b",
  "0xfe70e6e089422de5fc2647cdf32392b00f61c140",
  "0x5bebe8d424c2ebe4d78a7db0595ea912eda2571c",
  "0x15f99abee8e047afe03a031b5eb12d07383ecf2f",
  "0xc5eb53a63c06fbd29d2393ee486142641e34449e",
  "0x7f3e165c4b3951796ff7d8d05d8c656f1d9b48d3",
  "0x0ffb30c91e74aa959a46652e6ade24aa09880b4a",
  "0x7cd7c4a0d8eeb48e4eca86b3cf1f0f4c63a556be",
  "0xc6cdc3d80e0a5c65987e1782dc299be370c5f38a",
  "0x428a0fe9a63ccf5d2ceac4603965da287d7a1b74",
  "0x436047dcc63893c3ebf497259269dd1c70ecabb1",
  "0x3b115d63540ee208b9f4192d9109e44867b17387",
  "0x4ff0df4009a89f387c6915b2d49db605e2d25b60",
  "0xc05b35d5b59795ed718b3b17d5761a3a4eff1c7d",
  "0xbbacc3587a49d8b9296a5f5d587a8db8aad7f241",
  "0x2b9d534d8fce6daec11be7315e6c6af5eaf948e9",
  "0x208133353dc0d92b1d8a784190d59a5082de48d5",
  "0xe9190a92ed9f9f854fa8edbeff067ca424b7dd6a",
  "0x2a650e224cd5c488ff5a9d2fe7769f0d5033afbc",
  "0x2c68e6edd9bb7a27c11c82586fc6162e47d0c65e",
  "0x389ad3700e5bccab1f90fbc0b60f6ee7558952b9",
  "0x7476d4f4cb2f8e1262be377feaced711f8765ea3",
];

const premiumUsers = ["0x2b838a5a2b8a2e80e965f1fc9dfed63f1cc269fd"];

window.checkWhitelistLand = function (address) {
  // console.log("CHECKCK")
  let found = 0;
  for (let i of landWhitelist) {
    if (address.toLowerCase() == i.toLowerCase()) found = 1;
  }
  return found;
};

window.checkPremium = function (address) {
  // console.log("CHECKCK")
  let found = false;
  for (let i of premiumUsers) {
    if (address.toLowerCase() == i.toLowerCase()) found = true;
  }
  return found;
};
