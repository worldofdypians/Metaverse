import {
  useReadContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseEther, formatEther, encodeFunctionData } from "viem";
import { useState, useCallback } from "react";
import { writeContract, getAccount } from "@wagmi/core";
import { wagmiClient } from "../wagmiConnectors";
// Marketplace ABI - extracted from setup.js
const MARKETPLACE_ABI = [
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
        name: "payment",
        type: "tuple",
      },
    ],
    name: "updateOffer",
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
    name: "acceptOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "nftAddress", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "getAllOffers",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "buyer", type: "address" },
              { internalType: "uint256", name: "price", type: "uint256" },
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
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        internalType: "struct Marketplace.OfferWithIndex[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// NFT ABIs
const ERC721_ABI = [
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
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

// ERC20 ABI for WETH/Token approvals
const ERC20_ABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const useMarketplace = () => {
  const account = getAccount(wagmiClient);

  const address = account.address;
  const isConnected = account.isConnected;
  const status = account.status;
  const [txHash, setTxHash] = useState(null);

  // Get marketplace address from window.config
  const getMarketplaceAddress = () => {
    return (
      window.config?.nft_marketplace_address ||
      "0x0000000000000000000000000000000000000000"
    );
  };

  // Check if wallet is connected before transaction
  const ensureConnected = (status, address, isConnected) => {
    if (!isConnected || !address) {
      throw new Error(
        "Wallet not connected. Please connect your wallet to continue."
      );
    }

    // Check if wallet is in reconnecting state
    if (status === "reconnecting") {
      throw new Error(
        "Wallet is reconnecting. Please wait a moment and try again."
      );
    }

    // Check if wallet is disconnected
    if (status === "disconnected") {
      throw new Error("Wallet disconnected. Please reconnect your wallet.");
    }
  };

  // List NFT
  const listNFT = useCallback(
    async (
      nftAddress,
      tokenId,
      price,
      priceType = 0,
      tokenAddress = "0x0000000000000000000000000000000000000000"
    ) => {
      try {
        const accountState = getAccount(wagmiClient);
        ensureConnected(
          accountState.status,
          accountState.address,
          accountState.isConnected
        );
        const priceInWei = parseEther(price.toString());

        const hash = await writeContract(wagmiClient, {
          address: getMarketplaceAddress(),
          abi: MARKETPLACE_ABI,
          functionName: "listItem",
          args: [
            nftAddress,
            BigInt(tokenId),
            priceInWei,
            {
              priceType: priceType,
              tokenAddress: tokenAddress,
            },
          ],
        });

        setTxHash(hash);
        return hash;
      } catch (error) {
        console.error("Error listing NFT:", error);
        throw error;
      }
    },
    []
  );

  // Buy NFT
  const buyNFT = useCallback(
    async (
      nftAddress,
      tokenId,
      price,
      priceType = 0,
      tokenAddress = "0x0000000000000000000000000000000000000000"
    ) => {
      try {
        const accountState = getAccount(wagmiClient);
        console.log(
          accountState.status,
          accountState.address,
          accountState.isConnected
        );
        ensureConnected(
          accountState.status,
          accountState.address,
          accountState.isConnected
        );
        const hash = await writeContract(wagmiClient, {
          address: getMarketplaceAddress(),
          abi: MARKETPLACE_ABI,
          functionName: "buyItem",
          args: [
            nftAddress,
            BigInt(tokenId),
            {
              priceType: priceType,
              tokenAddress: tokenAddress,
            },
          ],
          value: priceType === 0 ? BigInt(price) : BigInt(0),
        });

        setTxHash(hash);
        return hash;
      } catch (error) {
        console.error("Error buying NFT:", error);
        throw error;
      }
    },
    []
  );

  // Cancel Listing
  const cancelListing = useCallback(
    async (
      nftAddress,
      tokenId,
      priceType = 0,
      tokenAddress = "0x0000000000000000000000000000000000000000"
    ) => {
      try {
        const accountState = getAccount(wagmiClient);

        ensureConnected(
          accountState.status,
          accountState.address,
          accountState.isConnected
        );
        const hash = await writeContract(wagmiClient, {
          address: getMarketplaceAddress(),
          abi: MARKETPLACE_ABI,
          functionName: "cancelListing",
          args: [
            nftAddress,
            BigInt(tokenId),
            {
              priceType: priceType,
              tokenAddress: tokenAddress,
            },
          ],
        });

        setTxHash(hash);
        return hash;
      } catch (error) {
        console.error("Error canceling listing:", error);
        throw error;
      }
    },
    []
  );

  // Update Listing
  const updateListing = useCallback(
    async (
      nftAddress,
      tokenId,
      newPrice,
      priceType = 0,
      tokenAddress = "0x0000000000000000000000000000000000000000"
    ) => {
      try {
        const accountState = getAccount(wagmiClient);

        ensureConnected(
          accountState.status,
          accountState.address,
          accountState.isConnected
        );
        const priceInWei = parseEther(newPrice.toString());

        const hash = await writeContract(wagmiClient, {
          address: getMarketplaceAddress(),
          abi: MARKETPLACE_ABI,
          functionName: "updateListing",
          args: [
            nftAddress,
            BigInt(tokenId),
            priceInWei,
            {
              priceType: priceType,
              tokenAddress: tokenAddress,
            },
          ],
        });

        setTxHash(hash);
        return hash;
      } catch (error) {
        console.error("Error updating listing:", error);
        throw error;
      }
    },
    []
  );

  // Make Offer
  const makeOffer = useCallback(
    async (
      nftAddress,
      tokenId,
      price,
      priceType = 0,
      tokenAddress = "0x0000000000000000000000000000000000000000"
    ) => {
      try {
        const accountState = getAccount(wagmiClient);

        ensureConnected(
          accountState.status,
          accountState.address,
          accountState.isConnected
        );
        const priceInWei = parseEther(price.toString());

        const hash = await writeContract(wagmiClient, {
          address: getMarketplaceAddress(),
          abi: MARKETPLACE_ABI,
          functionName: "makeOffer",
          args: [
            nftAddress,
            BigInt(tokenId),
            priceInWei,
            {
              priceType: priceType,
              tokenAddress: tokenAddress,
            },
          ],
        });

        setTxHash(hash);
        return hash;
      } catch (error) {
        console.error("Error making offer:", error);
        throw error;
      }
    },
    []
  );

  // Cancel Offer
  const cancelOffer = useCallback(async (nftAddress, tokenId, offerIndex) => {
    try {
      const accountState = getAccount(wagmiClient);

      ensureConnected(
        accountState.status,
        accountState.address,
        accountState.isConnected
      );
      const hash = await writeContract(wagmiClient, {
        address: getMarketplaceAddress(),
        abi: MARKETPLACE_ABI,
        functionName: "cancelOffer",
        args: [nftAddress, BigInt(tokenId), BigInt(offerIndex)],
      });

      setTxHash(hash);
      return hash;
    } catch (error) {
      console.error("Error canceling offer:", error);
      throw error;
    }
  }, []);

  // Update Offer
  const updateOffer = useCallback(
    async (
      nftAddress,
      tokenId,
      offerIndex,
      newPrice,
      priceType = 0,
      tokenAddress = "0x0000000000000000000000000000000000000000"
    ) => {
      try {
        const accountState = getAccount(wagmiClient);

        ensureConnected(
          accountState.status,
          accountState.address,
          accountState.isConnected
        );
        const priceInWei = parseEther(newPrice.toString());

        const hash = await writeContract(wagmiClient, {
          address: getMarketplaceAddress(),
          abi: MARKETPLACE_ABI,
          functionName: "updateOffer",
          args: [
            nftAddress,
            BigInt(tokenId),
            BigInt(offerIndex),
            priceInWei,
            {
              priceType: priceType,
              tokenAddress: tokenAddress,
            },
          ],
        });

        setTxHash(hash);
        return hash;
      } catch (error) {
        console.error("Error updating offer:", error);
        throw error;
      }
    },
    []
  );

  // Accept Offer
  const acceptOffer = useCallback(async (nftAddress, tokenId, offerIndex) => {
    try {
      const accountState = getAccount(wagmiClient);

      ensureConnected(
        accountState.status,
        accountState.address,
        accountState.isConnected
      );
      const hash = await writeContract(wagmiClient, {
        address: getMarketplaceAddress(),
        abi: MARKETPLACE_ABI,
        functionName: "acceptOffer",
        args: [nftAddress, BigInt(tokenId), BigInt(offerIndex)],
      });

      setTxHash(hash);
      return hash;
    } catch (error) {
      console.error("Error accepting offer:", error);
      throw error;
    }
  }, []);

  // Approve NFT for marketplace
  const approveNFT = useCallback(async (nftAddress) => {
    try {
      const accountState = getAccount(wagmiClient);

      ensureConnected(
        accountState.status,
        accountState.address,
        accountState.isConnected
      );
      const hash = await writeContract(wagmiClient, {
        address: nftAddress,
        abi: ERC721_ABI,
        functionName: "setApprovalForAll",
        args: [getMarketplaceAddress(), true],
      });

      setTxHash(hash);
      return hash;
    } catch (error) {
      console.error("Error approving NFT:", error);
      throw error;
    }
  }, []);

  // Approve Token (WETH/DYP) for marketplace
  const approveToken = useCallback(async (tokenAddress, amount) => {
    try {
      const accountState = getAccount(wagmiClient);

      ensureConnected(
        accountState.status,
        accountState.address,
        accountState.isConnected
      );
      const amountInWei = parseEther(amount.toString());

      const hash = await writeContract(wagmiClient, {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [getMarketplaceAddress(), amountInWei],
      });

      setTxHash(hash);
      return hash;
    } catch (error) {
      console.error("Error approving token:", error);
      throw error;
    }
  }, []);

  return {
    listNFT,
    buyNFT,
    cancelListing,
    updateListing,
    makeOffer,
    cancelOffer,
    updateOffer,
    acceptOffer,
    approveNFT,
    approveToken,
    txHash,
    isConnected,
    address,
    status,
  };
};

// Hook to check NFT approval status
export const useNFTApprovalStatus = (nftAddress, ownerAddress) => {
  const getMarketplaceAddress = () => {
    return (
      window.config?.nft_marketplace_address ||
      "0x0000000000000000000000000000000000000000"
    );
  };

  const { data: isApproved } = useReadContract({
    address: nftAddress,
    abi: ERC721_ABI,
    functionName: "isApprovedForAll",
    args: [ownerAddress, getMarketplaceAddress()],
    enabled: !!nftAddress && !!ownerAddress,
  });

  return isApproved || false;
};

// Hook to check token approval status
export const useTokenApprovalStatus = (tokenAddress, ownerAddress, amount) => {
  const getMarketplaceAddress = () => {
    return (
      window.config?.nft_marketplace_address ||
      "0x0000000000000000000000000000000000000000"
    );
  };

  const { data: allowance } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [ownerAddress, getMarketplaceAddress()],
    enabled: !!tokenAddress && !!ownerAddress,
  });

  if (!allowance || !amount) return false;

  try {
    const amountInWei = parseEther(amount.toString());
    return BigInt(allowance) >= BigInt(amountInWei);
  } catch {
    return false;
  }
};

// Hook to get all offers for an NFT
export const useGetAllOffers = (nftAddress, tokenId) => {
  const getMarketplaceAddress = () => {
    return (
      window.config?.nft_marketplace_address ||
      "0x0000000000000000000000000000000000000000"
    );
  };

  const { data: offers, refetch } = useReadContract({
    address: getMarketplaceAddress(),
    abi: MARKETPLACE_ABI,
    functionName: "getAllOffers",
    args: [nftAddress, BigInt(tokenId || 0)],
    enabled: !!nftAddress && !!tokenId,
  });

  return { offers: offers || [], refetch };
};

// Hook to get NFT owner
export const useNFTOwner = (nftAddress, tokenId) => {
  const { data: owner } = useReadContract({
    address: nftAddress,
    abi: ERC721_ABI,
    functionName: "ownerOf",
    args: [BigInt(tokenId || 0)],
    enabled: !!nftAddress && !!tokenId,
  });

  return owner;
};

export { MARKETPLACE_ABI, ERC721_ABI, ERC20_ABI };
