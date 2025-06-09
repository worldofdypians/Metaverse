export const handleSwitchNetworkhook = async (chainID) => {
  const { ethereum } = window;
  let error;

  const ETHPARAMS = {
    chainId: "0x1", // A 0x-prefixed hexadecimal string
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io"],
  };

  const AVAXPARAMS = {
    chainId: "0xa86a", // A 0x-prefixed hexadecimal string
    chainName: "Avalanche Network",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io/"],
  };

  const BNBPARAMS = {
    chainId: "0x38", // A 0x-prefixed hexadecimal string
    chainName: "Smart Chain",
    nativeCurrency: {
      name: "Smart Chain",
      symbol: "BNB", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  };

  const OPBNBPARAMS = {
    chainId: "0xcc", // A 0x-prefixed hexadecimal string
    rpcUrls: ["https://opbnb.publicnode.com"],
    chainName: "opBNB Mainnet",
    nativeCurrency: {
      name: "opBNB",
      symbol: "BNB", // 2-6 characters long
      decimals: 18,
    },

    blockExplorerUrls: ["https://mainnet.opbnbscan.com"],
  };

  const BNB_TEST = {
    chainId: "0x61", // A 0x-prefixed hexadecimal string
    rpcUrls: [window.config.bsc_testnet_endpoint],
    chainName: "BNB Testnet",
    nativeCurrency: {
      name: "BNB Testnet",
      symbol: "BNB", // 2-6 characters long
      decimals: 18,
    },

    blockExplorerUrls: ["https://mainnet.opbnbscan.com"],
  };

  const BASEPARAMS = {
    chainId: "0x2105", // A 0x-prefixed hexadecimal string
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"],
  };

  const MATPARAMS = {
    chainId: "0x2ba", // A 0x-prefixed hexadecimal string
    chainName: "Matchain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://rpc.matchain.io"],
    blockExplorerUrls: ["https://matchscan.io"],
  };

  const CONFLUXPARAMS = {
    chainId: "0x406", // A 0x-prefixed hexadecimal string
    chainName: "Conflux eSpace",
    nativeCurrency: {
      name: "CFX",
      symbol: "CFX", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://evm.confluxrpc.com"],
    blockExplorerUrls: ["https://evm.confluxscan.net"],
  };

  const SKALE_MAINNET = {
    chainId: "0x585eb4b1", // A 0x-prefixed hexadecimal string
    chainName: "SKALE Nebula Hub",
    nativeCurrency: {
      name: "sFUEL",
      symbol: "sFUEL", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.skalenodes.com/v1/green-giddy-denebola"],
    blockExplorerUrls: [
      "https://green-giddy-denebola.explorer.mainnet.skalenodes.com",
    ],
  };
  const COREPARAMS = {
    chainId: "0x45c", // A 0x-prefixed hexadecimal string
    chainName: "CORE",
    nativeCurrency: {
      name: "CORE",
      symbol: "CORE", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://core.drpc.org"],
    blockExplorerUrls: ["https://scan.coredao.org"],
  };
  const VICTIONPARAMS = {
    chainId: "0x58", // A 0x-prefixed hexadecimal string
    chainName: "Viction",
    nativeCurrency: {
      name: "Viction",
      symbol: "VIC", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://rpc.viction.xyz"],
    blockExplorerUrls: ["https:/vicscan.xyz"],
  };
  const SEIPARAMS = {
    chainId: "0x531", // A 0x-prefixed hexadecimal string
    chainName: "Sei Network",
    nativeCurrency: {
      name: "Sei",
      symbol: "SEI", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://evm-rpc.sei-apis.com"],
    blockExplorerUrls: ["https://seitrace.com"],
  };

  const TAIKOPARAMS = {
    chainId: "0x28c58", // A 0x-prefixed hexadecimal string
    chainName: "Taiko Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://rpc.mainnet.taiko.xyz"],
    blockExplorerUrls: ["https://taikoscan.io"],
  };

  const IMMUTABLEPARAMS = {
    chainId: "0x343b", // A 0x-prefixed hexadecimal string
    chainName: "Immutable zkEVM",
    nativeCurrency: {
      name: "IMX",
      symbol: "IMX", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://rpc.immutable.com"],
    blockExplorerUrls: ["https://explorer.immutable.com"],
  };
  const MANTAPARAMS = {
    chainId: "0xa9", // A 0x-prefixed hexadecimal string
    chainName: "Manta Pacific Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://pacific-rpc.manta.network/http"],
    blockExplorerUrls: ["https://pacific-explorer.manta.network/"],
  };

  const VANARPARAMS = {
    chainId: "0x7f8", // A 0x-prefixed hexadecimal string
    chainName: "Vanar Mainnet",
    nativeCurrency: {
      symbol: "VANRY", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://rpc.vanarchain.com"],
    blockExplorerUrls: ["https://explorer.vanarchain.com/"],
  };

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainID }],
    });
    if (window.ethereum && window.ethereum.isTrust === true) {
      window.location.reload();
    }
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    console.log(switchError, "switch");
    if (
      switchError.code === 4902 ||
      (chainID === "0x406" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x2105" && switchError.code.toString().includes("32603")) ||
      (chainID === "0xcc" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x61" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x45c" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x28c58" &&
        switchError.code.toString().includes("32603")) ||
      (chainID === "0x58" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x531" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x343b" && switchError.code.toString().includes("32603")) ||
      (chainID === "0xa9" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x7f8" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x2ba" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x585eb4b1" &&
        switchError.code.toString().includes("32603")) ||
      (switchError.code === 4902 &&
        switchError.message.includes("Unrecognized chainID"))
    ) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params:
            chainID === "0x1"
              ? [ETHPARAMS]
              : chainID === "0xa86a"
              ? [AVAXPARAMS]
              : chainID === "0x38"
              ? [BNBPARAMS]
              : chainID === "0x61"
              ? [BNB_TEST]
              : chainID === "0xcc"
              ? [OPBNBPARAMS]
              : chainID === "0x2105"
              ? [BASEPARAMS]
              : chainID === "0x2ba"
              ? [MATPARAMS]
              : chainID === "0x406"
              ? [CONFLUXPARAMS]
              : chainID === "0x585eb4b1"
              ? [SKALE_MAINNET]
              : chainID === "0x45c"
              ? [COREPARAMS]
              : chainID === "0x28c58"
              ? [TAIKOPARAMS]
              : chainID === "0x58"
              ? [VICTIONPARAMS]
              : chainID === "0x531"
              ? [SEIPARAMS]
              : chainID === "0x343b"
              ? [IMMUTABLEPARAMS]
              : chainID === "0xa9"
              ? [MANTAPARAMS]
              : chainID === "0x7f8"
              ? [VANARPARAMS]
              : "",
        });
        if (window.ethereum && window.ethereum.isTrust === true) {
          window.location.reload();
        }
      } catch (addError) {
        console.log(addError);
      }
    }
    // handle other "switch" errors
  }
};
