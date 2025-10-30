import { formatUnits } from "viem";
import { wagmiClient } from "../../wagmiConnectors";

/**
 * Helper to read contract data using viem publicClient
 */
export const readContractData = async (
  publicClient,
  address,
  abi,
  functionName,
  args = []
) => {
  if (!publicClient) return 0n;

  try {
    return await publicClient.readContract({
      address,
      abi,
      functionName,
      args,
      chainId: 56,
    });
  } catch (error) {
    console.error(`Error reading ${functionName}:`, error);
    return 0n;
  }
};

/**
 * Helper to format token amounts from wei to readable format
 */
export const formatTokenAmount = (amount, decimals = 18, fixed = 6) => {
  try {
    return Number(formatUnits(BigInt(amount), decimals)).toFixed(fixed);
  } catch (error) {
    console.error("Error formatting token amount:", error);
    return "0.000000";
  }
};

/**
 * Batch read multiple contract functions
 */
export const batchReadContracts = async (publicClient, reads) => {
  if (!publicClient) return reads.map(() => 0n);

  try {
    const promises = reads.map(({ address, abi, functionName, args }) =>
      readContractData(publicClient, address, abi, functionName, args)
    );
    return await Promise.all(promises);
  } catch (error) {
    console.error("Error in batch read:", error);
    return reads.map(() => 0n);
  }
};

/**
 * Generic claim transaction handler using viem walletClient
 */
export const handleClaimTransaction = async ({
  walletClient,
  publicClient,
  address,
  abi,
  onSuccess,
  onError,
}) => {
  if (!walletClient || !publicClient) {
    throw new Error("Wallet not connected");
  }

  try {
    const hash = await walletClient.writeContract({
      address,
      abi,
      functionName: "claim",
      args: [],
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    if (receipt.status === "success") {
      onSuccess?.();
      return { success: true, receipt };
    } else {
      throw new Error("Transaction failed");
    }
  } catch (error) {
    onError?.(error);
    throw error;
  }
};
