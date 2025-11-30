import { switchChain as wagmiSwitchChain, getAccount } from "@wagmi/core";
import { wagmiClient } from "../wagmiConnectors";
import {
  mainnet,
  matchain,
  opBNB,
  bsc,
  manta,
  taiko,
  coreDao,
  base,
  sei,
  viction,
  avalanche,
  skaleNebula,
  immutableZkEvm,
  confluxESpace,
  vanar,
  taraxa,
} from "wagmi/chains";

/**
 * Maps chain ID (number) to wagmi chain object
 */
const getChainById = (chainId) => {
  const chainMap = {
    1: mainnet,
    56: bsc,
    204: opBNB,
    43114: avalanche,
    8453: base,
    698: matchain,
    1030: confluxESpace,
    1482601649: skaleNebula,
    1116: coreDao,
    88: viction,
    13371: immutableZkEvm,
    169: manta,
    167000: taiko,
    1329: sei,
    2040: vanar,
    841: taraxa,
  };
  return chainMap[chainId];
};

/**
 * Unified function to switch networks using wagmi
 * Handles all wallet types (MetaMask, GateWallet, Binance, MatchId)
 */
export const switchNetworkWagmi = async (chainId, chain, options = {}) => {
  const {
    handleSwitchNetwork,
    handleSwitchChainGateWallet,
    handleSwitchChainBinanceWallet,
    coinbase,
  } = options;

  // Handle MatchId wallet
 

  // Get wagmi chain object
  const wagmiChain = getChainById(chainId);
  if (!wagmiChain) {
    console.error(`Unsupported chain ID: ${chainId}`);
    if (window.alertify) {
      window.alertify.error(`Unsupported chain ID: ${chainId}`);
    }
    return;
  }

  // Handle Binance wallet
  // if (window.WALLET_TYPE === "binance" && coinbase) {
  //   if (handleSwitchChainBinanceWallet) {
  //     handleSwitchChainBinanceWallet(chain);
  //     return;
  //   }
  // }

  // Handle GateWallet (special case - may need direct ethereum requests)
  if (
    window.gatewallet &&
    window.WALLET_TYPE !== "binance"
  ) {
    if (handleSwitchChainGateWallet) {
      handleSwitchChainGateWallet(chain);
      return;
    }
  }

  // Default: Use wagmi switchChain for standard wallets (MetaMask, etc.)
  try {
    const account = getAccount(wagmiClient);

    // If already on the correct chain, just update state
    if (account?.chainId === chainId) {
      if (handleSwitchNetwork) {
        handleSwitchNetwork(chain);
      }
      return;
    }

    // Switch chain using wagmi
    await wagmiSwitchChain(wagmiClient, { chainId: wagmiChain.id });

    // Update local state after successful switch
    if (handleSwitchNetwork) {
      handleSwitchNetwork(chain);
    }
  } catch (error) {
    console.error("Failed to switch chain:", error);

    // Handle error codes
    if (window.alertify) {
      if (error.code === 4902 || error.code === -32603) {
        // Chain not added to wallet - wagmi should handle this automatically
        // but we'll show a message
        window.alertify.error("Please add this network to your wallet first.");
      } else if (error.code === 4001) {
        // User rejected the request
        window.alertify.error("Network switch was rejected.");
      } else {
        window.alertify.error("Failed to switch network. Please try again.");
      }
    }

    throw error;
  }
};
