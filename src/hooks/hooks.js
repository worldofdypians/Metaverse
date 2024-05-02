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

  const BASEPARAMS = {
    chainId: "0x2105", // A 0x-prefixed hexadecimal string
    chainName: "Base Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH", // 2-6 characters long
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ankr.com/base"],
    blockExplorerUrls: ["https://basescan.org"],
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
    rpcUrls: ["https://rpc.coredao.org/"],
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
      (chainID === "0x45c" && switchError.code.toString().includes("32603")) ||
      (chainID === "0x58" && switchError.code.toString().includes("32603")) ||
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
              : chainID === "0xcc"
              ? [OPBNBPARAMS]
              : chainID === "0x2105"
              ? [BASEPARAMS]
              : chainID === "0x406"
              ? [CONFLUXPARAMS]
              : chainID === "0x585eb4b1"
              ? [SKALE_MAINNET]
              : chainID === "0x45c"
              ? [COREPARAMS]
              : chainID === "0x58"
              ? [VICTIONPARAMS]
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
