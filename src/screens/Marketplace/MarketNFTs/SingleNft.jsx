import React, { useState, useEffect, useRef } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { shortAddress } from "../../Caws/functions/shortAddress";
import Toast from "../../../components/Toast/Toast";
import axios from "axios";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import { useLocation } from "react-router-dom";
import getListedNFTS from "../../../actions/Marketplace";

import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { parseEther, formatEther } from "viem";

import { switchNetworkWagmi } from "../../../utils/wagmiSwitchChain";
import MakeOffer from "./MakeOffer";
import { useQuery as useReactQuery } from "@tanstack/react-query";
import {
  useMarketplace,
  useNFTApprovalStatus,
  useGetAllOffers,
} from "../../../hooks/useMarketplace";
import { readContract } from "@wagmi/core";
import { wagmiClient } from "../../../wagmiConnectors";

const fetchCurrentNft = async (nftId, nftAddress) => {
  try {
    const data = await getListedNFTS(
      0,
      "",
      "nftAddress_tokenId",
      nftId,
      nftAddress
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch listed NFTs");
  }
};

const useSharedDataCurrentNft = (nftId, nftAddress) => {
  return useReactQuery({
    queryKey: ["nftData", nftId, nftAddress],
    queryFn: () => fetchCurrentNft(nftId, nftAddress),
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 6 * 60 * 1000,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!nftId && !!nftAddress,
  });
};

const getLatest20BoughtNFTS = async (nftAddress, tokenId) => {
  let boughtItems = [];
  let finalboughtItems = [];

  const URL = `https://graphql.worldofdypians.com/subgraphs/name/wod`;

  const itemBoughtQuery = `
      {
          itemBoughts(first: 20, orderBy: blockTimestamp, orderDirection: desc, where: { nftAddress_in: ["${nftAddress}"], tokenId: "${tokenId}"  }) {
          nftAddress
          tokenId
          payment_priceType
          price
          buyer
          blockNumber
          blockTimestamp
          transactionHash
      }
      }
      `;

  await axios
    .post(URL, { query: itemBoughtQuery })
    .then(async (result) => {
      boughtItems = await result.data.data.itemBoughts;
    })
    .catch((error) => {
      console.log(error);
    });

  boughtItems &&
    boughtItems.map((nft) => {
      if (nft.nftAddress === window.config.nft_caws_address) {
        nft.type = "caws";
        nft.chain = 1;
        finalboughtItems.push(nft);
      } else if (nft.nftAddress === window.config.nft_land_address) {
        nft.type = "land";
        nft.chain = 1;
        finalboughtItems.push(nft);
      } else if (nft.nftAddress === window.config.nft_timepiece_address) {
        nft.type = "timepiece";
        nft.chain = 1;
        finalboughtItems.push(nft);
      }
    });

  // setsaleHistory(finalboughtItems);
  return finalboughtItems;
};

const useSharedDataLatest20BoughtNFTS = (nftId, nftAddress) => {
  return useReactQuery({
    queryKey: ["nftAddress_tokenId", nftId, nftAddress],
    queryFn: () => getLatest20BoughtNFTS(nftId, nftAddress),
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 6 * 60 * 1000,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: !!nftId && !!nftAddress,
  });
};

const SingleNft = ({
  isEOA,
  coinbase,
  showWalletConnect,
  chainId,
  isConnected,
  handleSwitchChain,
  nftCount,
  handleRefreshListing,
  favorites,
  handleSwitchChainGateWallet,
  handleSwitchChainBinanceWallet,
  userWallet,
  ethTokenData,
  authToken,
  lowestPriceNftListed,
  email,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();
  const { BigNumber } = window;
  const dataFetchedRef = useRef(false);
  const { nftId, nftAddress } = useParams();
  // Wagmi hooks for marketplace operations
  const {
    listNFT: listNFTContract,
    buyNFT: buyNFTContract,
    cancelListing: cancelListingContract,
    updateListing: updateListingContract,
    makeOffer: makeOfferContract,
    cancelOffer: cancelOfferContract,
    updateOffer: updateOfferContract,
    acceptOffer: acceptOfferContract,
    approveNFT: approveNFTContract,
  } = useMarketplace();

  // Get all offers for the current NFT
  const { offers, refetch: refetchOffers } = useGetAllOffers(nftAddress, nftId);

  const [nft, setNft] = useState(
    location.state?.nft ? location.state?.nft : []
  );

  const [type, setType] = useState(
    location.state?.type ? location.state?.type : false
  );

  const [IsListed, setIsListed] = useState(false);
  const [offerData, setofferData] = useState([]);

  const [buyloading, setbuyLoading] = useState(false); //buy
  const [sellLoading, setsellLoading] = useState(false); //sell
  const [updateLoading, setupdateLoading] = useState(false); //update
  const [cancelLoading, setcancelLoading] = useState(false); //cancel

  const [buyStatus, setbuyStatus] = useState(""); //buy
  const [sellStatus, setsellStatus] = useState(""); //sell
  const [updateStatus, setupdateStatus] = useState("update"); //update
  const [cancelStatus, setcancelStatus] = useState("cancel"); //cancel

  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [purchaseColor, setPurchaseColor] = useState("#00FECF");
  const [priceType, setPriceType] = useState(0);
  const [nftPrice, setNftPrice] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState("");

  const [metaData, setmetaData] = useState([]);

  const [isOwner, setisOwner] = useState(
    location.state?.isOwner ? location.state?.isOwner : false
  );
  const [viewCount, setViewCount] = useState(0);
  const [favCount, setfavCount] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);
  const [owner, setowner] = useState("");
  const [loadingNft, setloadingNft] = useState(false);
  const [showMakeOffer, setshowMakeOffer] = useState(false);
  const [offerStatus, setOfferStatus] = useState("initial");
  const [offerdeleteStatus, setOfferdeleteStatus] = useState("initial");
  const [offerupdateStatus, setOfferupdateStatus] = useState("initial");
  const [offeracceptStatus, setOfferacceptStatus] = useState("initial");
  const [lowestPriceNftListedDYP, setlowestPriceNftListedDYP] = useState([]);
  const [myOffers, setmyOffers] = useState([]);

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const switchNetwork = async (hexChainId, chain) => {
    // Extract chainId from hex or use chain number directly
    const chainId =
      typeof chain === "number" ? chain : parseInt(hexChainId, 16);

    try {
      await switchNetworkWagmi(chainId, chain, {
        handleSwitchNetwork: handleSwitchChain,
        handleSwitchChainGateWallet,
        handleSwitchChainBinanceWallet,
        network_matchain: null,
        coinbase,
      });
    } catch (error) {
      // Error handling is done in switchNetworkWagmi
      console.error("Network switch error:", error);
    }
  };

  const { data: currentNft } = useSharedDataCurrentNft(nftId, nftAddress);

  const getOffer = async () => {
    let finalArray = [];
    if (type === "caws" || type === "land" || type === "timepiece") {
      const result = offers || [];

      if (result && coinbase) {
        const my_offers = result.filter((object) => {
          return object.offer.buyer.toLowerCase() === coinbase.toLowerCase();
        });
        setmyOffers(my_offers[0] ? my_offers[0].offer : []);
      }

      await Promise.all(
        result.map(async (item) => {
          if (item.offer.payment.priceType === "0") {
            const balance = await readContract(wagmiClient, {
              address: window.config.weth2_address,
              abi: window.TOKEN_ABI,
              functionName: "balanceOf",
              args: [item.offer.buyer],
              chainId: 1,
            }).then((data) => {
              return formatEther(data);
            });

            const allowance = await readContract(wagmiClient, {
              address: window.config.weth2_address,
              abi: window.TOKEN_ABI,
              functionName: "allowance",
              args: [item.offer.buyer, window.config.nft_marketplace_address],
              chainId: 1,
            }).then((data) => {
              return formatEther(data);
            });

            const priceFormatted = item.offer.price / 1e18;
            return finalArray.push({
              offer: item.offer,
              index: item.index,
              isAllowed:
                balance >= priceFormatted && allowance >= priceFormatted,
            });
          }
        })
      );
      finalArray.reverse();
      setofferData(finalArray);
    }
  };

  const getNftOwner = async (nftType, Id) => {
    if (nftType === "timepiece") {
      const nftowner = await readContract(wagmiClient, {
        address: window.config.nft_timepiece_address,
        abi: window.TIMEPIECE_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 1,
      }).catch((e) => {
        console.log(e);
      });

      setowner(nftowner);
      return nftowner;
    } else if (nftType === "land") {
      const nftowner = await readContract(wagmiClient, {
        address: window.config.nft_land_address,
        abi: window.WOD_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 1,
      }).catch((e) => {
        console.log(e);
      });

      // console.log('nftowner',nftowner)
      setowner(nftowner);
      return nftowner;
    } else if (nftType === "caws") {
      const nftowner = await readContract(wagmiClient, {
        address: window.config.nft_caws_address,
        abi: window.CAWS_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 1,
      }).catch((e) => {
        console.log(e);
      });

      setowner(nftowner);
      return nftowner;
    } else if (nftType === "cawsbnb") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_caws_bnb_address,
        abi: window.CAWS_CCIP_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "cawsavax") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_caws_avax_address,
        abi: window.CAWS_CCIP_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 43114,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "cawsbase") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_caws_base_address,
        abi: window.CAWS_CCIP_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 8453,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "landbnb") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_land_bnb_address,
        abi: window.LAND_CCIP_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "landavax") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_caws_land_address,
        abi: window.LAND_CCIP_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 43114,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "landbase") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_land_base_address,
        abi: window.LAND_CCIP_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 8453,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "coingecko") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_coingecko_address,
        abi: window.COINGECKO_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "gate") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_gate_address,
        abi: window.GATE_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "conflux") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_conflux_address,
        abi: window.CONFLUX_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 1030,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "manta") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_manta_address,
        abi: window.MANTA_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 169,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "sei") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_sei_address,
        abi: window.SEI_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 1329,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "taiko") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_taiko_address,
        abi: window.TAIKO_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 167000,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "cookie3") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_cookie3_address,
        abi: window.COOKIE3_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "mat") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_mat_address,
        abi: window.COOKIE3_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "doge") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_doge_address,
        abi: window.DOGE_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "bnb") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_bnb_address,
        abi: window.BNB_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "5ya") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_bnb5ya_address,
        abi: window.OPBNB_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 204,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "opbnb") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_opbnb_address,
        abi: window.OPBNB_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 204,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "kucoin") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_kucoin_address,
        abi: window.OPBNB_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 204,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "vanar") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_vanar_address,
        abi: window.VANAR_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 204,
      }).catch((e) => {
        console.log(e);
      });

      console.log(owner);

      setowner(owner);
      return owner;
    } else if (nftType === "skale") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_skale_address,
        abi: window.SKALE_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 103454881,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "cmc") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_cmc_address,
        abi: window.CMC_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "core") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_core_address,
        abi: window.CORE_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 1116,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "viction") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_viction_address,
        abi: window.VICTION_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 89,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "multivers") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_multivers_address,
        abi: window.MULTIVERS_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "immutable") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_immutable_address,
        abi: window.IMMUTABLE_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 13371,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "base") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_base_address,
        abi: window.BASE_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 8453,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "tea-base") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_teabase_address,
        abi: window.BASE_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 8453,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "tea-bnb") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_teabnb_address,
        abi: window.BNB_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 56,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "tea-sei") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_teasei_address,
        abi: window.SEI_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 1329,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "tea-opbnb") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_teaopbnb_address,
        abi: window.OPBNB_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 204,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    } else if (nftType === "taraxa") {
      const owner = await readContract(wagmiClient, {
        address: window.config.nft_taraxa_address,
        abi: window.TARAXA_NFT_ABI,
        functionName: "ownerOf",
        args: [Id],
        chainId: 841,
      }).catch((e) => {
        console.log(e);
      });

      setowner(owner);
      return owner;
    }
  };

  const getMetaData = async (addr, tokenid) => {
    if (
      addr === window.config.nft_caws_address ||
      addr === window.config.nft_caws_bnb_address ||
      addr === window.config.nft_caws_avax_address ||
      addr === window.config.nft_caws_base_address
    ) {
      const result = await window.getNft(tokenid);
      setmetaData(result);
    } else if (
      addr === window.config.nft_land_address ||
      addr === window.config.nft_land_bnb_address ||
      addr === window.config.nft_land_avax_address ||
      addr === window.config.nft_land_base_address
    ) {
      const result = await window.getLandNft(tokenid);
      setmetaData(result);
    } else if (addr === window.config.nft_timepiece_address) {
      const result = await window.getTimepieceNft(tokenid);
      setmetaData(result);
    }
  };

  const isApprovedBuy = async (tokenType, amount) => {
    if (window.WALLET_TYPE !== "binance") {
      const result = await window
        .isApprovedBuy(tokenType, amount)
        .catch((e) => {
          console.error(e);
        });
      return result;
    } else if (window.WALLET_TYPE === "binance") {
      if (tokenType === "eth") {
        return true;
      }
    } else return false;
  };

  // Check if NFT is approved using wagmi
  const getNFTAddressForType = (type) => {
    const typeMap = {
      caws: window.config.nft_caws_address,
      land: window.config.nft_land_address,
      timepiece: window.config.nft_timepiece_address,
    };
    return typeMap[type] || window.config.nft_caws_address;
  };

  // Use wagmi hook for approval status
  const nftAddressForApproval = getNFTAddressForType(
    nftAddress === window.config.nft_caws_address
      ? "caws"
      : nftAddress === window.config.nft_timepiece_address
      ? "timepiece"
      : "land"
  );

  const isNFTApproved = useNFTApprovalStatus(nftAddressForApproval, coinbase);

  async function isApprovedNFT(nft, type, coinbase) {
     
    // Return the wagmi hook result
    return isNFTApproved;
  }

  const handleRefreshList = async (type, tokenId) => {
    if (type === "timepiece") {
      let nft_address = window.config.nft_timepiece_address;
      const listedNFT = currentNft;

      if (listedNFT && listedNFT.length > 0) {
        setNft(...listedNFT);
      }
    } else if (type === "land") {
      let nft_address = window.config.nft_land_address;
      const listedNFT = currentNft;
      if (listedNFT && listedNFT.length > 0) {
        setNft(...listedNFT);
      }
    } else {
      let nft_address = window.config.nft_caws_address;
      const listedNFT = currentNft;

      if (listedNFT && listedNFT.length > 0) {
        setNft(...listedNFT);
      }
    }
  };

  const getRelativeTime = (nftTimestamp) => {
    const date = new Date();
    const timestamp = date.getTime();

    const seconds = Math.floor(timestamp / 1000);
    const oldTimestamp = nftTimestamp;
    const difference = seconds - oldTimestamp;
    let output = ``;

    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor((difference / 60).toFixed())} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor((difference / 3600).toFixed())} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor((difference / 86400).toFixed())} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor((difference / 2620800).toFixed())} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor((difference / 31449600).toFixed())} years ago`;
    }
    return output;
  };

  const getLatestBoughtNFT = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL = `https://graphql.worldofdypians.com/subgraphs/name/wod`;

    const itemBoughtQuery = `
        {
            itemBoughts(first: 1, orderBy: blockTimestamp, orderDirection: desc) {
            nftAddress
            tokenId
            payment_priceType
            price
            buyer
            blockNumber
            blockTimestamp
        }
        }
        `;

    await axios
      .post(URL, { query: itemBoughtQuery })
      .then(async (result) => {
        boughtItems = await result.data.data.itemBoughts;
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log("boughtItems", boughtItems);

    boughtItems &&
      boughtItems.map((nft) => {
        if (nft.nftAddress === window.config.nft_caws_address) {
          nft.type = "caws";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_land_address) {
          nft.type = "land";
          nft.chain = 1;
          finalboughtItems.push(nft);
        } else if (nft.nftAddress === window.config.nft_timepiece_address) {
          nft.type = "timepiece";
          nft.chain = 1;
          finalboughtItems.push(nft);
        }
      });

    console.log("...finalboughtItems", finalboughtItems);
    setNft(...finalboughtItems);
    setIsListed(false);
    if (finalboughtItems[0].buyer.toLowerCase() !== coinbase.toLowerCase()) {
      setisOwner(false);
    }
  };

  // // Check if NFT is approved using wagmi
  // const getNFTAddressForType = (type) => {
  //   const typeMap = {
  //     'caws': window.config.nft_caws_address,
  //     'land': window.config.nft_land_address,
  //     'timepiece': window.config.nft_timepiece_address,
  //   };
  //   return typeMap[type] || window.config.nft_caws_address;
  // };

  // // Use wagmi hook for approval status
  // const nftAddressForApproval = getNFTAddressForType(
  //   nftAddress === window.config.nft_caws_address
  //     ? "caws"
  //     : nftAddress === window.config.nft_timepiece_address
  //     ? "timepiece"
  //     : "land"
  // );

  // const isNFTApproved = useNFTApprovalStatus(nftAddressForApproval, coinbase);

  async function isApprovedNFT(nft, type, coinbase) {
     
    // Return the wagmi hook result
    return isNFTApproved;
  }

  const handleSell = async (tokenId, nftPrice, priceType, type) => {
     
    const isApproved = await isApprovedNFT(
      nftId,
      nftAddress === window.config.nft_caws_address
        ? "caws"
        : nftAddress === window.config.nft_timepiece_address
        ? "timepiece"
        : "land",
      coinbase
    );

    const tokenAddress = "0x0000000000000000000000000000000000000000";

    if (isApproved) {
      console.log("selling");
      setsellLoading(true);
      setsellStatus("sell");
      setPurchaseStatus("Listing NFT in progress...");
      setPurchaseColor("#00FECF");

      try {
        // Use wagmi for all wallets
        const hash = await listNFTContract(
          nftAddress,
          nftId,
          nftPrice,
          priceType,
          tokenAddress
        );

        // Wait for transaction
        const receipt = await window.ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [hash],
        });

        setsellLoading(false);
        setsellStatus("success");
        setPurchaseStatus("NFT successfully listed!");
        setPurchaseColor("#00FECF");
        setShowToast(true);
        handleRefreshList(
          nftAddress === window.config.nft_caws_address
            ? "caws"
            : nftAddress === window.config.nft_timepiece_address
            ? "timepiece"
            : "land",
          nftId
        );
        setIsListed(true);
        handleRefreshListing();
        setTimeout(() => {
          setPurchaseStatus("");
          setPurchaseColor("#00FECF");
          setsellStatus("sell");
        }, 3000);
      } catch (e) {
        setsellLoading(false);
        setsellStatus("failed");
        setPurchaseStatus(e?.message || "Transaction failed");
        setPurchaseColor("#FF6232");
        setTimeout(() => {
          setPurchaseStatus("");
          setPurchaseColor("#00FECF");
          setsellStatus("sell");
        }, 3000);
        console.error(e);
      }
    } else {
      console.log("approve selling");
      setsellLoading(true);
      setsellStatus("approve");
      setPurchaseStatus("Approving NFT for listing in progress..");
      setPurchaseColor("#00FECF");

      try {
        // Use wagmi for approval - works for all wallets
        const hash = await approveNFTContract(nftAddress);

        setsellLoading(false);
        setsellStatus("success");
        setPurchaseStatus("Successfully approved! You can list your nft");
        setPurchaseColor("#00FECF");
        setTimeout(() => {
          setsellStatus("sell");
          setPurchaseStatus("");
          setPurchaseColor("#00FECF");
        }, 3000);
      } catch (e) {
        setsellLoading(false);
        setsellStatus("failed");
        setPurchaseStatus(e?.message || "Approval failed");
        setPurchaseColor("#FF6232");
        setTimeout(() => {
          setsellStatus("approve");
          setPurchaseStatus("");
          setPurchaseColor("#00FECF");
        }, 3000);
        console.log(e);
      }
    }
  };
  const { data: saleHistory } = useSharedDataLatest20BoughtNFTS();

  async function addNFTToUserFavorites(userId, tokenId, nftAddress) {
    try {
      const response = await fetch(
        `https://api.worldofdypians.com/user-favorites/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ tokenId, nftAddress }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Error adding NFT to user favorites");
      }
      const data = await response.json();
      getFavoritesCount(nftId, nftAddress);
      setIsFavorite(true);
      handleRefreshListing();
      return data.favorites;
    } catch (error) {
      console.log(error);

      console.error("Error adding NFT to user favorites:", error);
      throw error;
    }
  }

  async function deleteNFTFromUserFavorites(userId, tokenId, nftAddress) {
    fetch(
      `https://api.worldofdypians.com/user-favorites/${userId}/${tokenId}/${nftAddress}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
      .then((response) => {
        if (response.ok || response.status === 204 || response.status === 404) {
          // NFT removed successfully or was not found (404)
          console.log("NFT removed from favorites");
          getFavoritesCount(nftId, nftAddress);
          setIsFavorite(false);
          handleRefreshListing();
        } else {
          // Handle other status codes as errors
          console.error(
            "Failed to remove NFT from favorites. Status:",
            response.status
          );
        }
      })
      .catch((error) => {
        // Handle network or fetch error
        console.error("Error removing NFT from favorites:", error);
      });
  }

  const handleFavorite = async (nft) => {
    if (isConnected) {
      if (isFavorite === true) {
        await deleteNFTFromUserFavorites(coinbase, parseInt(nftId), nftAddress);
      }
      if (!isFavorite) {
        await addNFTToUserFavorites(coinbase, parseInt(nftId), nftAddress);
      }
    } else showWalletConnect();
  };

  async function handleBuy(nft) {
     

    console.log("buying", nft.price);
    setPurchaseColor("#00FECF");
    setbuyLoading(true);
    setbuyStatus("buy");
    setPurchaseStatus("Buying NFT in progress..");

    try {
      // Use wagmi for all wallets - works with MetaMask, Binance, Coinbase, etc.
      const hash = await buyNFTContract(
        nftAddress,
        nftId,
        nft.price,
        nft.payment_priceType,
        nft.payment_tokenAddress
      );

      setbuyLoading(false);
      setbuyStatus("success");
      setPurchaseStatus("Successfully purchased!");
      setShowToast(true);
      setToastTitle("Successfully purchased!");
      setPurchaseColor("#00FECF");

      setTimeout(() => {
        setPurchaseStatus("");
        setPurchaseColor("#00FECF");
        setbuyStatus("");
        handleRefreshList(
          nftAddress === window.config.nft_caws_address
            ? "caws"
            : nftAddress === window.config.nft_timepiece_address
            ? "timepiece"
            : "land",
          nftId
        );
        handleRefreshListing();
        getLatestBoughtNFT();
      }, 3000);
    } catch (e) {
      setbuyStatus("failed");
      setbuyLoading(false);
      setPurchaseStatus(e?.message || "Purchase failed");
      setPurchaseColor("#FF6232");
      setTimeout(() => {
        setPurchaseStatus("");
        setPurchaseColor("#00FECF");
        setbuyStatus("buy");
      }, 3000);
      console.error(e);
    }
  }

  const cancelNFT = async (nftAddress, tokenId, type, tokenType) => {
     
    setcancelLoading(true);
    setcancelStatus("cancel");
    setPurchaseColor("#00FECF");
    setPurchaseStatus("Unlisting your nft...");
    console.log("cancelling");

    try {
      const price_address = "0x0000000000000000000000000000000000000000";

      // Use wagmi for all wallets
      const hash = await cancelListingContract(
        nftAddress,
        tokenId,
        0, // priceType = 0 for ETH
        price_address
      );

      handleRefreshListing();
      setcancelLoading(false);
      setcancelStatus("success");
      setPurchaseColor("#00FECF");
      setPurchaseStatus("Nft successfully unlisted");

      setTimeout(() => {
        setcancelStatus("");
        setPurchaseColor("#00FECF");
        setPurchaseStatus("");
      }, 3000);
    } catch (e) {
      setcancelLoading(false);
      setcancelStatus("failed");
      setPurchaseColor("#FF6232");
      setPurchaseStatus(e?.message || "Unlisting failed");

      setTimeout(() => {
        setcancelStatus("");
        setPurchaseColor("");
        setPurchaseStatus("");
      }, 3000);
    }
  };

  async function updateListing(nft, price, priceType, type, tokenType) {
    

    setPurchaseColor("#00FECF");
    setPurchaseStatus("Price is being updated...");
    setupdateLoading(true);
    setupdateStatus("update");
    console.log("updating", nft, price, priceType, type, tokenType);

    try {
      const price_address = "0x0000000000000000000000000000000000000000";

      // Use wagmi for all wallets
      const hash = await updateListingContract(
        nftAddress,
        nft,
        price,
        priceType,
        price_address
      );

      setShowToast(true);
      setToastTitle("Successfully updated!");
      handleRefreshList(
        nftAddress === window.config.nft_caws_address
          ? "caws"
          : nftAddress === window.config.nft_timepiece_address
          ? "timepiece"
          : "land",
        nftId
      );
      handleRefreshListing();
      setPurchaseColor("#00FECF");
      setPurchaseStatus("Price updated successfully.");
      setupdateLoading(false);
      setupdateStatus("success");

      setTimeout(() => {
        setPurchaseColor("#00FECF");
        setPurchaseStatus("");
        setupdateStatus("");
      }, 3000);
    } catch (e) {
      setPurchaseColor("#FF6232");
      setPurchaseStatus(e?.message || "Update failed");
      setupdateLoading(false);
      setupdateStatus("failed");

      setTimeout(() => {
        setPurchaseColor("#00FECF");
        setPurchaseStatus("");
        setupdateStatus("");
      }, 3000);
    }
  }

  async function checkisListedNFT(tokenId, nftAddr) {
    setloadingNft(true);
    const listedNFTS = currentNft;
    const nftOwner = await getNftOwner(type, tokenId);

    if (listedNFTS && listedNFTS.length > 0) {
      if (listedNFTS[0].seller.toLowerCase() !== nftOwner.toLowerCase()) {
        setIsListed(false);
      } else if (
        listedNFTS[0].seller.toLowerCase() === nftOwner.toLowerCase()
      ) {
        setIsListed(true);
      }
      setNft(...listedNFTS);
      setloadingNft(false);
    } else {
      setNft([]);
      setloadingNft(false);
      setIsListed(false);
    }
  }
  //to get the favorites count
  async function getFavoritesCount(tokenId, nftAddress) {
    try {
      const data = await axios
        .get(
          `https://api.worldofdypians.com/nft-favorite/${tokenId}/${nftAddress}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .catch((e) => {
          console.error(e);
        });

      // if (!response.ok) {
      //   throw new Error("Error fetching NFT favorites");
      // }
      if (data.data && data.data.favoritesCount) {
        setfavCount(data.data.favoritesCount);
      }

      return data.data.favoritesCount;
    } catch (error) {
      console.error("Error fetching NFT favorites:", error);
    }
  }

  //to get the viewcount
  async function getViewCount(tokenId, nftAddress) {
    try {
      const response = await fetch(
        `https://api.worldofdypians.com/nft-view/${tokenId}/${nftAddress}`
      );
      const data = await response.json();
      setViewCount(data.count);

      console.log(`View count  ${data.count}`);
    } catch (error) {
      console.error("Error retrieving view count:", error);
    }
  }

  const handlepricechange = (newprice) => {
    if (Number(newprice) > 100 && priceType === 0) {
      setNftPrice(100);
    } else if (Number(newprice) <= 100 && priceType === 0) {
      setNftPrice(newprice);
    }
  };

  const handlepricechange2 = (newprice) => {
    //isdyp nft.payment_priceType === 1
    if (Number(newprice) > 100 && nft.payment_priceType === 0) {
      setNftPrice(100);
    } else if (Number(newprice) <= 100 && nft.payment_priceType === 0) {
      setNftPrice(newprice);
    }
  };

  const handleMakeOffer = async (price, pricetype, tokenType) => {
     
    if (price > 0) {
      setOfferStatus("loading");

      try {
        const price_address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // WETH address

        // Use wagmi for all wallets
        const hash = await makeOfferContract(
          nftAddress,
          nftId,
          price,
          pricetype,
          price_address
        );

        handleRefreshListing();
        setOfferStatus("success");
        setTimeout(() => {
          setOfferStatus("initial");
        }, 3000);
      } catch (e) {
        console.error(e);
        setOfferStatus("fail");
        setTimeout(() => {
          setOfferStatus("initial");
        }, 3000);
      }
    } else {
      window.alertify.error("Please enter a valid price");
    }
  };

  const handleDeleteOffer = async (offerIndex) => {
    

    setOfferdeleteStatus("loadingdelete");
    console.log(nftAddress, nftId, offerIndex);

    try {
      // Use wagmi for all wallets
      const hash = await cancelOfferContract(nftAddress, nftId, offerIndex);

      handleRefreshListing();
      setOfferdeleteStatus("successdelete");
      setTimeout(() => {
        setOfferdeleteStatus("initial");
      }, 3000);
    } catch (e) {
      console.error(e);
      setOfferdeleteStatus("faildelete");
      setTimeout(() => {
        setOfferdeleteStatus("initial");
      }, 3000);
    }
  };

  const handleUpdateOffer = async (price, pricetype, offerIndex, tokenType) => {
    
    setOfferupdateStatus("loadingupdate");

    try {
      const price_address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // WETH address

      // Use wagmi for all wallets
      const hash = await updateOfferContract(
        nftAddress,
        nftId,
        offerIndex,
        price,
        pricetype,
        price_address
      );

      handleRefreshListing();
      setOfferupdateStatus("successupdate");
      setTimeout(() => {
        setOfferupdateStatus("initial");
      }, 3000);
    } catch (e) {
      console.error(e);
      setOfferupdateStatus("failupdate");
      setTimeout(() => {
        setOfferupdateStatus("initial");
      }, 3000);
    }
  };

  const handleAcceptOffer = async (offerIndex) => {
     
    setOfferacceptStatus("loading");
    console.log(nftAddress, nftId, offerIndex);

    try {
      // Use wagmi for all wallets
      const hash = await acceptOfferContract(nftAddress, nftId, offerIndex);

      setOfferacceptStatus("success");
      setTimeout(() => {
        setOfferacceptStatus("initial");
        handleRefreshListing();
        getLatest20BoughtNFTS(nftAddress, nftId);
        getLatestBoughtNFT();
      }, 3000);
    } catch (e) {
      console.error(e);
      setOfferacceptStatus("fail");
      setTimeout(() => {
        setOfferacceptStatus("initial");
      }, 3000);
    }
  };

  useEffect(() => {
    if (coinbase) {
      if (!IsListed) {
        isApprovedNFT(
          nftId,
          nftAddress === window.config.nft_caws_address
            ? "caws"
            : nftAddress === window.config.nft_timepiece_address
            ? "timepiece"
            : "land",
          coinbase
        ).then((isApproved) => {
          console.log("isApproved", isApproved);
          if (isApproved === true) {
            setsellStatus("sell");
          } else if (isApproved === false) {
            setsellStatus("approve");
          }
        });
      } else {
        setbuyStatus("buy");
      }
    }
    // }
  }, [isConnected, coinbase, nftCount, IsListed]);

  useEffect(() => {
    if ((coinbase === undefined || !nft.price) && !owner) {
      setisOwner(false);
    } else if (coinbase) {
      if (nft.seller) {
        if (nft.seller && nft.seller.toLowerCase() === coinbase.toLowerCase()) {
          setisOwner(true);
        } else if (
          nft.seller &&
          nft.seller.toLowerCase() !== coinbase.toLowerCase()
        ) {
          setisOwner(false);
        }
      } else if (
        nft.buyer &&
        coinbase &&
        nft.buyer.toLowerCase() === coinbase.toLowerCase()
      ) {
        setisOwner(true);
      } else if (
        nft.buyer &&
        coinbase &&
        nft.buyer.toLowerCase() !== coinbase.toLowerCase()
      ) {
        setisOwner(false);
      } else if (owner.toLowerCase() === coinbase.toLowerCase()) {
        setisOwner(true);
      } else if (owner.toLowerCase() !== coinbase.toLowerCase()) {
        setisOwner(false);
      }
    }
  }, [isConnected, coinbase, nft, owner, nftCount]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    window.scrollTo(0, 0);

    // getLatest20BoughtNFTS(nftAddress, nftId);
  }, []);

  useEffect(() => {
    getViewCount(nftId, nftAddress);
  }, [nftId, nftAddress]);

  useEffect(() => {
    handleRefreshList(
      nftAddress === window.config.nft_caws_address
        ? "caws"
        : nftAddress === window.config.nft_timepiece_address
        ? "timepiece"
        : "land",
      nftId
    );

    if (
      nftAddress.toLowerCase() === window.config.nft_caws_address.toLowerCase()
    ) {
      setType("caws");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_timepiece_address.toLowerCase()
    ) {
      setType("timepiece");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_land_address.toLowerCase()
    ) {
      setType("land");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_coingecko_address.toLowerCase()
    ) {
      setType("coingecko");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_opbnb_address.toLowerCase()
    ) {
      setType("opbnb");
    } else if (nftAddress === window.config.nft_conflux_address) {
      setType("conflux");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_manta_address.toLowerCase()
    ) {
      setType("manta");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_taiko_address.toLowerCase()
    ) {
      setType("taiko");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_sei_address.toLowerCase()
    ) {
      setType("sei");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_cookie3_address.toLowerCase()
    ) {
      setType("cookie3");
    } else if (nftAddress === window.config.nft_mat_address) {
      setType("mat");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_doge_address.toLowerCase()
    ) {
      setType("doge");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_bnb_address.toLowerCase()
    ) {
      setType("bnb");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_bnb5ya_address.toLowerCase()
    ) {
      setType("5ya");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_skale_address.toLowerCase()
    ) {
      setType("skale");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_cmc_address.toLowerCase()
    ) {
      setType("cmc");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_core_address.toLowerCase()
    ) {
      setType("core");
    } else if (nftAddress === window.config.nft_viction_address) {
      setType("viction");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_immutable_address.toLowerCase()
    ) {
      setType("immutable");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_multivers_address.toLowerCase()
    ) {
      setType("multivers");
    } else if (nftAddress === window.config.nft_base_address.toLowerCase()) {
      setType("base");
    } else if (nftAddress === window.config.nft_taraxa_address) {
      setType("taraxa");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_gate_address.toLowerCase()
    ) {
      setType("gate");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_caws_bnb_address.toLowerCase()
    ) {
      setType("cawsbnb");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_caws_avax_address.toLowerCase()
    ) {
      setType("cawsavax");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_caws_base_address.toLowerCase()
    ) {
      setType("cawsbase");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_land_bnb_address.toLowerCase()
    ) {
      setType("landbnb");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_land_avax_address.toLowerCase()
    ) {
      setType("landavax");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_kucoin_address.toLowerCase()
    ) {
      setType("kucoin");
    } else if (
      nftAddress.toLowerCase() === window.config.nft_vanar_address.toLowerCase()
    ) {
      setType("vanar");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_teabnb_address.toLowerCase()
    ) {
      setType("tea-bnb");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_teasei_address.toLowerCase()
    ) {
      setType("tea-sei");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_teabase_address.toLowerCase()
    ) {
      setType("tea-base");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_teaopbnb_address.toLowerCase()
    ) {
      setType("tea-opbnb");
    } else if (
      nftAddress.toLowerCase() ===
      window.config.nft_land_base_address.toLowerCase()
    ) {
      setType("landbase");
    }

    getNftOwner(
      nftAddress.toLowerCase() ===
        window.config.nft_timepiece_address.toLowerCase()
        ? "timepiece"
        : nftAddress.toLowerCase() ===
          window.config.nft_land_address.toLowerCase()
        ? "land"
        : nftAddress.toLowerCase() ===
          window.config.nft_coingecko_address.toLowerCase()
        ? "coingecko"
        : nftAddress.toLowerCase() ===
          window.config.nft_opbnb_address.toLowerCase()
        ? "opbnb"
        : nftAddress.toLowerCase() ===
          window.config.nft_kucoin_address.toLowerCase()
        ? "kucoin"
        : nftAddress.toLowerCase() ===
          window.config.nft_vanar_address.toLowerCase()
        ? "vanar"
        : nftAddress.toLowerCase() ===
          window.config.nft_teabnb_address.toLowerCase()
        ? "tea-bnb"
        : nftAddress.toLowerCase() ===
          window.config.nft_teasei_address.toLowerCase()
        ? "tea-sei"
        : nftAddress.toLowerCase() ===
          window.config.nft_teabase_address.toLowerCase()
        ? "tea-base"
        : nftAddress.toLowerCase() ===
          window.config.nft_teaopbnb_address.toLowerCase()
        ? "tea-opbnb"
        : nftAddress.toLowerCase() ===
          window.config.nft_gate_address.toLowerCase()
        ? "gate"
        : nftAddress === window.config.nft_sei_address
        ? "sei"
        : nftAddress === window.config.nft_conflux_address
        ? "conflux"
        : nftAddress.toLowerCase() ===
          window.config.nft_manta_address.toLowerCase()
        ? "manta"
        : nftAddress.toLowerCase() ===
          window.config.nft_taiko_address.toLowerCase()
        ? "taiko"
        : nftAddress.toLowerCase() ===
          window.config.nft_cookie3_address.toLowerCase()
        ? "cookie3"
        : nftAddress === window.config.nft_mat_address
        ? "mat"
        : nftAddress.toLowerCase() ===
          window.config.nft_doge_address.toLowerCase()
        ? "doge"
        : nftAddress.toLowerCase() ===
          window.config.nft_bnb_address.toLowerCase()
        ? "bnb"
        : nftAddress.toLowerCase() ===
          window.config.nft_bnb5ya_address.toLowerCase()
        ? "5ya"
        : nftAddress.toLowerCase() ===
          window.config.nft_skale_address.toLowerCase()
        ? "skale"
        : nftAddress.toLowerCase() ===
          window.config.nft_cmc_address.toLowerCase()
        ? "cmc"
        : nftAddress.toLowerCase() ===
          window.config.nft_core_address.toLowerCase()
        ? "core"
        : nftAddress === window.config.nft_viction_address
        ? "viction"
        : nftAddress.toLowerCase() ===
          window.config.nft_immutable_address.toLowerCase()
        ? "immutable"
        : nftAddress.toLowerCase() ===
          window.config.nft_multivers_address.toLowerCase()
        ? "multivers"
        : nftAddress === window.config.nft_base_address.toLowerCase()
        ? "base"
        : nftAddress === window.config.nft_taraxa_address
        ? "taraxa"
        : nftAddress.toLowerCase() ===
          window.config.nft_caws_bnb_address.toLowerCase()
        ? "cawsbnb"
        : nftAddress.toLowerCase() ===
          window.config.nft_caws_avax_address.toLowerCase()
        ? "cawsavax"
        : nftAddress.toLowerCase() ===
          window.config.nft_caws_base_address.toLowerCase()
        ? "cawsbase"
        : nftAddress.toLowerCase() ===
          window.config.nft_land_bnb_address.toLowerCase()
        ? "landbnb"
        : nftAddress.toLowerCase() ===
          window.config.nft_land_avax_address.toLowerCase()
        ? "landavax"
        : nftAddress.toLowerCase() ===
          window.config.nft_land_base_address.toLowerCase()
        ? "landbase"
        : "caws",
      nftId
    );

    getMetaData(nftAddress, nftId);
  }, [nftId, nftAddress, nftCount]);

  useEffect(() => {
    checkisListedNFT(nftId, nftAddress);
  }, [nftId, nftAddress, owner, currentNft]);

  useEffect(() => {
    if ( offers && offers.length > 0) {
      getOffer();
    }
  }, [coinbase, nftCount, offers]);

  useEffect(() => {
    if (type === "caws" || type === "timepiece" || type === "land") {
      getFavoritesCount(nftId, nftAddress);
    }
  }, [nftId, nftAddress, type]);

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const favobj = favorites.find(
        (obj) =>
          obj.nftAddress?.toLowerCase() === nftAddress.toLowerCase() &&
          obj.tokenId === nftId
      );

      if (favobj !== undefined) {
        setIsFavorite(true);
      } else setIsFavorite(false);
    }
  }, [nftAddress, favorites, nftId]);

  useEffect(() => {
    if (
      purchaseStatus === "" &&
      userWallet &&
      coinbase &&
      email &&
      coinbase.toLowerCase() !== userWallet?.toLowerCase()
    ) {
      setPurchaseColor("#FF6232");
    }
  }, [purchaseStatus, userWallet]);

  useEffect(() => {
    if (!isEOA && isConnected && coinbase) {
      setPurchaseStatus(
        "Smart contract wallets are not supported for this action."
      );
      setPurchaseColor("#FF6232");
    } else if (isEOA && isConnected && coinbase) {
      setPurchaseStatus("");
      setPurchaseColor("#00FECF");
    }
  }, [isEOA, isConnected, coinbase]);
  return (
    <div
      className="container-fluid d-flex mt-lg-5 pt-lg-5 justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft2 d-flex align-items-start px-0 px-lg-4 position-relative">
        <Toast showToast={showToast} title={toastTitle} />
        <div className="container-lg mx-0">
          <div className="main-wrapper py-4 w-100 mt-5 mt-xxl-0 mt-lg-0">
            {type === "land" ||
            type === "landbnb" ||
            type === "landavax" ||
            type === "landbase" ? (
              <>
                <h6 className="market-banner-title d-flex align-items-xxl-center align-items-lg-center gap-2 px-3">
                  World of Dypians{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF" }}
                  >
                    Land
                  </h6>
                </h6>
              </>
            ) : type === "caws" ||
              type === "cawsbnb" ||
              type === "cawsavax" ||
              type === "cawsbase" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Cats and Watches Society{" "}
                </h6>
              </>
            ) : type === "tea-bnb" ||
              type === "tea-opbnb" ||
              type === "tea-sei" ||
              type === "tea-base" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Tea-Fi Beta{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "coingecko" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CoinGecko{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "taraxa" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Taraxa{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "gate" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Gate{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "base" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  BASE{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "conflux" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Conflux{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "manta" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Manta{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "taiko" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Taiko{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "sei" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Sei{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "cookie3" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Cookie3{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "mat" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Matchain{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "doge" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Dogecoin{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "bnb" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  BNB CHAIN{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "5ya" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  BNB CHAIN 5YA
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "opbnb" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  opBNB CHAIN{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "kucoin" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  KuCoin{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "vanar" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Vanar{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "immutable" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Immutable
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "skale" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  SKALE{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "cmc" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CoinMarketCap{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "core" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CORE{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "viction" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Viction{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : type === "multivers" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  MultiversX{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Beta Pass
                  </h6>
                </h6>
              </>
            ) : (
              <>
                <h6 className="market-banner-title d-flex align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CAWS{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF" }}
                  >
                    Timepiece
                  </h6>
                </h6>
              </>
            )}
            <div className="d-flex flex-column gap-4 flex-xxl-row flex-lg-row align-items-center justify-content-around mt-5 px-3">
              <div className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3 position-relative">
                <div className="position-relative package-blur">
                  <div className="first-box-blur first-bigbox-blur d-none d-lg-flex  align-items-end justify-content-center"></div>
                  <div className="second-box-blur d-none d-lg-flex second-bigbox-blur"></div>
                  {/* todo */}
                  <img
                    className="blur-img blur-img-big"
                    src={
                      nftAddress.toLowerCase() ===
                        window.config.nft_caws_address.toLowerCase() ||
                      nftAddress.toLowerCase() ===
                        window.config.nft_caws_bnb_address.toLowerCase() ||
                      nftAddress.toLowerCase() ===
                        window.config.nft_caws_avax_address.toLowerCase() ||
                      nftAddress.toLowerCase() ===
                        window.config.nft_caws_base_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/caws_400x400/${nftId}.png`
                        : nftAddress.toLowerCase() ===
                            window.config.nft_land_address.toLowerCase() ||
                          nftAddress.toLowerCase() ===
                            window.config.nft_land_bnb_address.toLowerCase() ||
                          nftAddress.toLowerCase() ===
                            window.config.nft_land_avax_address.toLowerCase() ||
                          nftAddress.toLowerCase() ===
                            window.config.nft_land_base_address.toLowerCase()
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/genesis_400x400/${nftId}.png`
                        : type === "coingecko"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/400x400_cg_pass.png`
                        : type === "gate"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/Gate400.png`
                        : type === "conflux"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/Conflux+nft+400px.png`
                        : type === "manta"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/manta+nft+400.png`
                        : type === "taiko"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/taiko+nft+400.png`
                        : type === "cookie3"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/C3+400.png`
                        : type === "mat"
                        ? `https://cdn.worldofdypians.com/media/matchbp400x400.png`
                        : type === "doge"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/doge+nft+400x400.png`
                        : type === "taraxa"
                        ? `https://cdn.worldofdypians.com/wod/taraxa-nft-400.png`
                        : type === "cmc"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/CMC+Beta+Pass+NFT+400x400px.png`
                        : type === "tea-bnb" ||
                          type === "tea-opbnb" ||
                          type === "tea-base" ||
                          type === "tea-sei"
                        ? `https://cdn.worldofdypians.com/wod/tea-fi-nft-400.webp`
                        : type === "core"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/CORE+400.png`
                        : type === "viction"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/Viction+400.png`
                        : type === "multivers"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/MultiversX+NFT+400.png`
                        : type === "base"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/base+400px.png`
                        : type === "skale"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/SKALE+Beta+Pass+400x400.png`
                        : type === "bnb"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/bnb+nft+400.png`
                        : type === "5ya"
                        ? `https://cdn.worldofdypians.com/wod/5ya-400.png`
                        : type === "opbnb"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/opBNB+NFT+400.png`
                        : type === "immutable"
                        ? `https://dypmeta.s3.us-east-2.amazonaws.com/immutable+400.png`
                        : type === "sei"
                        ? `https://cdn.worldofdypians.com/media/seibp400x400.png`
                        : type === "kucoin"
                        ? `https://cdn.worldofdypians.com/wod/kucoin-bp-400.png`
                        : type === "vanar"
                        ? `https://cdn.worldofdypians.com/wod/vanar-400.png`
                        : `https://dypmeta.s3.us-east-2.amazonaws.com/timepiece_400x400/${nftId}.png`
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="d-flex flex-column gap-2 col-12 col-lg-7">
                <div
                  className="d-flex align-items-center gap-2"
                  style={{
                    color: purchaseColor,
                  }}
                >
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img
                      src={
                        type === "coingecko" ||
                        type === "gate" ||
                        type === "doge" ||
                        type === "cmc" ||
                        type === "bnb" ||
                        type === "cawsbnb" ||
                        type === "landbnb" ||
                        type === "cookie3" ||
                        type === "tea-bnb"
                          ? "https://cdn.worldofdypians.com/wod/bnbIcon.svg"
                          : type === "conflux"
                          ? "https://cdn.worldofdypians.com/wod/confluxIcon.svg"
                          : type === "manta"
                          ? "https://cdn.worldofdypians.com/wod/manta.png"
                          : type === "taiko"
                          ? "https://cdn.worldofdypians.com/wod/taiko.svg"
                          : type === "base" ||
                            type === "cawsbase" ||
                            type === "landbase" ||
                            type === "tea-base"
                          ? "https://cdn.worldofdypians.com/wod/base.svg"
                          : type === "cawsavax" || type === "landavax"
                          ? "https://cdn.worldofdypians.com/wod/avaxIcon.svg"
                          : type === "opbnb" ||
                            type === "kucoin" ||
                            type === "tea-opbnb" ||
                            type === "5ya"
                          ? "https://cdn.worldofdypians.com/wod/opbnbChain.png"
                          : type === "skale"
                          ? "https://cdn.worldofdypians.com/wod/skaleIcon.svg"
                          : type === "core"
                          ? "https://cdn.worldofdypians.com/wod/core.svg"
                          : type === "viction"
                          ? "https://cdn.worldofdypians.com/wod/viction.svg"
                          : type === "mat"
                          ? "https://cdn.worldofdypians.com/wod/matchainIcon.svg"
                          : type === "multivers"
                          ? "https://cdn.worldofdypians.com/wod/multiversx.svg"
                          : type === "immutable"
                          ? "https://cdn.worldofdypians.com/wod/immutable.svg"
                          : type === "taraxa"
                          ? "https://cdn.worldofdypians.com/wod/taraxa.svg"
                          : type === "sei" || type === "tea-sei"
                          ? "https://cdn.worldofdypians.com/wod/seiLogo.svg"
                          : type === "vanar"
                          ? "https://cdn.worldofdypians.com/wod/vanar.svg"
                          : "https://cdn.worldofdypians.com/wod/eth.svg"
                      }
                      alt=""
                      style={{ width: 20, height: 20 }}
                    />{" "}
                    {type === "coingecko" ||
                    type === "gate" ||
                    type === "doge" ||
                    type === "bnb" ||
                    type === "cawsbnb" ||
                    type === "cmc" ||
                    type === "landbnb" ||
                    type === "cookie3" ||
                    type === "tea-bnb"
                      ? "BNB Chain"
                      : type === "conflux"
                      ? "Conflux"
                      : type === "conflux"
                      ? "Manta"
                      : type === "base" ||
                        type === "landbase" ||
                        type === "cawsbase" ||
                        type === "tea-base"
                      ? "BASE Network"
                      : type === "cawsavax" || type === "landavax"
                      ? "Avalanche"
                      : type === "skale"
                      ? "SKALE"
                      : type === "viction"
                      ? "Viction"
                      : type === "taraxa"
                      ? "Taraxa"
                      : type === "multivers"
                      ? "MultiversX"
                      : type === "core"
                      ? "CORE"
                      : type === "mat"
                      ? "Matchain"
                      : type === "taiko"
                      ? "Taiko"
                      : type === "vanar"
                      ? "Vanar"
                      : type === "opbnb" ||
                        type === "kucoin" ||
                        type === "tea-opbnb" ||
                        type === "5ya"
                      ? "opBNB Chain"
                      : type === "immutable"
                      ? "Immutable"
                      : type === "manta"
                      ? "Manta Network"
                      : type === "sei" || type === "tea-sei"
                      ? "SEI Network"
                      : "Ethereum"}
                  </span>
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/eye.svg"}
                      alt=""
                    />{" "}
                    {viewCount} views
                  </span>
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/heart.svg"}
                      alt=""
                    />{" "}
                    {favCount} favorites
                  </span>
                </div>
                <div className="d-flex align-items-center flex-column nft-outer-wrapper p-3 p-lg-4 gap-2 my-4 single-item-info">
                  <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                    <h3 className="nft-title d-flex align-items-center justify-content-between">
                      {type === "caws" ||
                      type === "cawsavax" ||
                      type === "cawsbase" ||
                      type === "cawsbnb"
                        ? "CAWS"
                        : type === "land" ||
                          type === "landavax" ||
                          type === "landbnb" ||
                          type === "landbase"
                        ? "Genesis Land"
                        : type === "coingecko"
                        ? "CoinGecko Beta Pass"
                        : type === "gate"
                        ? "Gate Beta Pass"
                        : type === "conflux"
                        ? "Conflux Beta Pass"
                        : type === "manta"
                        ? "Manta Beta Pass"
                        : type === "taiko"
                        ? "Taiko Beta Pass"
                        : type === "cookie3"
                        ? "Cookie3 Beta Pass"
                        : type === "mat"
                        ? "Matchain Beta Pass"
                        : type === "doge"
                        ? "Dogecoin Beta Pass"
                        : type === "bnb"
                        ? "BNB Chain Beta Pass"
                        : type === "5ya"
                        ? "BNB Chain 5YA Beta Pass"
                        : type === "skale"
                        ? "SKALE Beta Pass"
                        : type === "tea-bnb" ||
                          type === "tea-opbnb" ||
                          type === "tea-sei" ||
                          type === "tea-base"
                        ? "Tea-Fi Beta Pass"
                        : type === "cmc"
                        ? "CoinMarketCap Beta Pass"
                        : type === "core"
                        ? "CORE Beta Pass"
                        : type === "viction"
                        ? "Viction Beta Pass"
                        : type === "taraxa"
                        ? "Taraxa Beta Pass"
                        : type === "multivers"
                        ? "MultiversX Beta Pass"
                        : type === "immutable"
                        ? "Immutable Beta Pass"
                        : type === "base"
                        ? "Base Beta Pass"
                        : type === "opbnb"
                        ? "opBNB Chain Beta Pass"
                        : type === "sei"
                        ? "SEI Beta Pass"
                        : type === "kucoin"
                        ? "KuCoin Beta Pass"
                        : type === "vanar"
                        ? "Vanar Beta Pass"
                        : "CAWS Timepiece"}{" "}
                      {type === "immutable" ? "" : ` #${nftId}`}
                      <img
                        src={
                          isFavorite
                            ? "https://cdn.worldofdypians.com/wod/favActive.svg"
                            : "https://cdn.worldofdypians.com/wod/favInactive.svg"
                        }
                        onClick={() => {
                          handleFavorite(nft);
                        }}
                        alt=""
                        style={{ cursor: "pointer" }}
                      />
                    </h3>
                    {isOwner &&
                      IsListed &&
                      nft.price &&
                      loadingNft === false && (
                        <div className="d-flex gap-2 align-items-center">
                          <span className="currentprice-txt">
                            Current price
                          </span>
                          {/* <StyledTextField
                        error={nftPrice === "" ? true : false}
                        size="small"
                        id="price"
                        name="price"
                        value={nftPrice}
                        type="number"
                        required
                        onChange={(e) => {
                          setNftPrice(e.target.value);
                        }}
                        sx={{ width: "120px" }}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          max: 10,
                        }}
                      /> */}
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/topEth.svg"
                              }
                              alt=""
                              height={20}
                              width={20}
                            />
                            <span
                              className="nft-price-eth"
                              style={{ fontSize: 15, lineHeight: "20px" }}
                            >
                              {getFormattedNumber(nft?.price / 1e18, 3)} ETH
                            </span>
                            <span className="nft-price-usd">
                              $
                              {getFormattedNumber(
                                ethTokenData * (nft?.price / 1e18),
                                2
                              )}
                            </span>
                          </div>
                        </div>
                      )}
                    {!isOwner &&
                      IsListed &&
                      nft.price &&
                      loadingNft === false && (
                        <div className="price-wrapper p-3">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span className="currentprice-txt">
                              Current price
                            </span>
                            <div className="d-flex gap-2 align-items-center">
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/topEth.svg"
                                }
                                alt=""
                                height={30}
                                width={30}
                              />
                              <span className="nft-price-eth">
                                {getFormattedNumber(nft?.price / 1e18, 3)} ETH
                              </span>
                              <span className="nft-price-usd">
                                $
                                {getFormattedNumber(
                                  ethTokenData * (nft?.price / 1e18),
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    {loadingNft === true && (
                      <div className="price-wrapper p-3">
                        <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                          <HashLoader
                            color={"#554fd8"}
                            loading={loadingNft}
                            cssOverride={override}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </div>
                      </div>
                    )}

                    {!isOwner &&
                      !IsListed &&
                      (!nft.price || nft.price) &&
                      type !== "cawsbnb" &&
                      type !== "cawsavax" &&
                      type !== "cawsbase" &&
                      type !== "landavax" &&
                      type !== "landbnb" &&
                      type !== "landbase" &&
                      type !== "coingecko" &&
                      type !== "gate" &&
                      type !== "conflux" &&
                      type !== "manta" &&
                      type !== "taiko" &&
                      type !== "cookie3" &&
                      type !== "base" &&
                      type !== "doge" &&
                      type !== "bnb" &&
                      type !== "5ya" &&
                      type !== "opbnb" &&
                      type !== "cmc" &&
                      type !== "core" &&
                      type !== "viction" &&
                      type !== "multivers" &&
                      type !== "skale" &&
                      type !== "immutable" &&
                      type !== "mat" &&
                      type !== "sei" &&
                      type !== "kucoin" &&
                      type !== "vanar" &&
                      type !== "tea-bnb" &&
                      type !== "tea-opbnb" &&
                      type !== "tea-base" &&
                      type !== "tea-sei" &&
                      type !== "taraxa" &&
                      loadingNft === false && (
                        <div className="price-wrapper p-3">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span className="currentprice-txt">
                              This NFT is not listed
                            </span>
                            {/* <div className="d-flex gap-2 align-items-center">
                          <img
                            src={nft.payment_priceType === 0 ? topEth : topDyp}
                            alt=""
                            height={30}
                            width={30}
                          />
                          <span className="nft-price-eth">
                            {getFormattedNumber(nft.price / 1e18, 0)}{" "}
                            {nft.payment_priceType === 0 ? "ETH" : "DYP"}{" "}
                          </span>
                          <span className="nft-price-usd">
                            $
                            {getFormattedNumber(
                              nft.payment_priceType === 0
                                ? ethtokenData * (nft.price / 1e18)
                                : dyptokenData * (nft.price / 1e18),
                              2
                            )}
                          </span>
                        </div> */}
                          </div>
                        </div>
                      )}
                    {isOwner && IsListed && loadingNft === false && (
                      <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-2 justify-content-between">
                        <div className="price-wrapper p-3 col-xxl-6 col-lg-6">
                          <div className="d-flex w-100 justify-content-between flex-column gap-2">
                            <span
                              className="currentprice-txt"
                              style={{ alignSelf: "baseline" }}
                            >
                              Listing price
                            </span>
                            <div className="d-flex gap-2 align-items-center">
                              <input
                                required
                                className="single-nft-input"
                                type="number"
                                id="price"
                                name="price"
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                min={0}
                                value={nftPrice}
                                onChange={(e) => {
                                  handlepricechange2(e.target.value);
                                }}
                              />
                              <div className="d-flex flex-column gap-1">
                                <span className="nft-price-eth gap-3 d-flex">
                                  ETH
                                </span>
                                <span className="nft-price-usd">
                                  $
                                  {getFormattedNumber(
                                    ethTokenData * (nft?.price / 1e18),
                                    2
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                          <div className="d-flex w-100 justify-content-between flex-column gap-2">
                            {/* <span className="currentprice-txt">
                              Choose currency
                            </span> */}
                            <div className="d-flex flex-row justify-content-around w-100 gap-2">
                              <div
                                className={`d-flex gap-2 align-items-center position-relative `}
                                onClick={() => {
                                  setPriceType(0);
                                }}
                              >
                                <img
                                  src={
                                    priceType === 0 &&
                                    nft.payment_priceType === 0
                                      ? "https://cdn.worldofdypians.com/wod/checked.svg"
                                      : "https://cdn.worldofdypians.com/wod/empty.svg"
                                  }
                                  alt=""
                                  className={"position-absolute checkicons"}
                                />
                                <span className="nft-price-eth">
                                  <img
                                    src={
                                      "https://cdn.worldofdypians.com/wod/topEth.svg"
                                    }
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                  ETH
                                </span>
                              </div>

                              {/* <div
                                className={`d-flex gap-2 align-items-center position-relative ${
                                  nft.payment_priceType === 1
                                    ? "currencyWrapper"
                                    : "currencyWrapper-inactive"
                                } ${
                                  nft.payment_priceType === 0 &&
                                  "currency-wrapper-disabled"
                                }`}
                                onClick={() => {
                                  setPriceType(1);
                                }}
                              >
                                <img
                                  src={
                                    nft.payment_priceType === 1
                                  ? 'https://cdn.worldofdypians.com/wod/checked.svg'
                                      : 'https://cdn.worldofdypians.com/wod/empty.svg'
                                  }
                                  alt=""
                                  className={"position-absolute checkicons"}
                                />
                                <span className="nft-price-eth">
                                  <img
                                    src={topDyp}
                                    alt=""
                                    height={20}
                                    width={20}
                                  />
                                  {nft.payment_tokenAddress ===
                                  window.config.token_dypius_new_address
                                    ? "DYPv2"
                                    : "DYPv1"}
                                </span>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isOwner &&
                      !IsListed &&
                      loadingNft === false &&
                      type !== "coingecko" &&
                      type !== "gate" &&
                      type !== "conflux" &&
                      type !== "manta" &&
                      type !== "taiko" &&
                      type !== "cookie3" &&
                      type !== "base" &&
                      type !== "doge" &&
                      type !== "bnb" &&
                      type !== "5ya" &&
                      type !== "opbnb" &&
                      type !== "cmc" &&
                      type !== "core" &&
                      type !== "viction" &&
                      type !== "multivers" &&
                      type !== "cawsbnb" &&
                      type !== "cawsavax" &&
                      type !== "cawsbase" &&
                      type !== "landavax" &&
                      type !== "landbnb" &&
                      type !== "landbase" &&
                      type !== "skale" &&
                      type !== "immutable" &&
                      type !== "mat" &&
                      type !== "sei" &&
                      type !== "kucoin" &&
                      type !== "vanar" &&
                      type !== "tea-bnb" &&
                      type !== "tea-opbnb" &&
                      type !== "tea-base" &&
                      type !== "taraxa" &&
                      type !== "tea-sei" && (
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-2 justify-content-between">
                          <div className="price-wrapper p-3 col-xxl-6 col-lg-6">
                            <div className="d-flex w-100 justify-content-between flex-column ">
                              <span
                                className="currentprice-txt"
                                style={{ alignSelf: "baseline" }}
                              >
                                Listing price
                              </span>
                              <div className="d-flex gap-2 align-items-center">
                                <input
                                  required
                                  className="single-nft-input"
                                  type="number"
                                  id="price"
                                  name="price"
                                  pattern="^[0-9]*[.,]?[0-9]*$"
                                  min={0}
                                  value={nftPrice}
                                  onChange={(e) => {
                                    handlepricechange(e.target.value);
                                  }}
                                />
                                <div className="d-flex flex-column flex-xxl-row align-items-start align-items-lg-center gap-1 gap-xxl-3">
                                  <span className="nft-price-eth gap-3 d-flex">
                                    ETH
                                  </span>
                                  <span className="nft-price-usd">
                                    $
                                    {getFormattedNumber(
                                      ethTokenData * nftPrice,
                                      2
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                            <div className="d-flex w-100 justify-content-between flex-column gap-2">
                              <span className="currentprice-txt">
                                Choose currency
                              </span>
                              <div className="d-flex flex-row justify-content-start w-100 gap-2">
                                <div className="dropdown filters-dropdown2">
                                  <button
                                    className="btn btn-secondary currencyWrapper nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={() => {
                                      setPriceType(0);
                                    }}
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      <h6 className="filter-nav-title mb-0">
                                        <img
                                          src={
                                            "https://cdn.worldofdypians.com/wod/checked.svg"
                                          }
                                          alt=""
                                          style={{ top: "7px" }}
                                          className={
                                            "position-absolute checkicons"
                                          }
                                        />
                                        <span className="nft-price-eth2">
                                          <img
                                            src={
                                              "https://cdn.worldofdypians.com/wod/topEth.svg"
                                            }
                                            alt=""
                                            height={20}
                                            width={20}
                                          />
                                          ETH
                                        </span>
                                      </h6>
                                    </div>
                                    {/* <img src={dropdownIcon} alt="" /> */}
                                  </button>
                                  {/* <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                                    <li
                                      className="nft-dropdown-item"
                                      onClick={() => {
                                        setPriceType(0);
                                      }}
                                    >
                                      <span>ETH</span>
                                    </li>
                                    <li
                                      className="nft-dropdown-item"
                                      onClick={() => {
                                        setPriceType(1);
                                      }}
                                    >
                                      <span>DYPv1</span>
                                    </li>
                                    <li
                                      className="nft-dropdown-item"
                                      onClick={() => {
                                        setPriceType(2);
                                      }}
                                    >
                                      <span>DYPv2</span>
                                    </li>
                                  </ul> */}
                                </div>

                                {/* <div
                                  className={`d-flex gap-2 align-items-center position-relative ${
                                    priceType === 0
                                      ? "currencyWrapper"
                                      : "currencyWrapper-inactive"
                                  } `}
                                  onClick={() => {
                                    setPriceType(0);
                                  }}
                                >
                                  <img
                                    src={
                                      priceType === 0
                                        ? checkActive
                                        : checkPassive
                                    }
                                    alt=""
                                    className={"position-absolute checkicons"}
                                  />
                                  <span className="nft-price-eth">
                                    <img
                                      src={ 'https://cdn.worldofdypians.com/wod/topEth.svg'}
                                      alt=""
                                      height={20}
                                      width={20}
                                    />
                                    ETH
                                  </span>
                                </div>

                                <div
                                  className={`d-flex gap-2 align-items-center position-relative ${
                                    priceType === 1
                                      ? "currencyWrapper"
                                      : "currencyWrapper-inactive"
                                  } `}
                                  onClick={() => {
                                    setPriceType(1);
                                  }}
                                >
                                  <img
                                    src={
                                      priceType === 0
                                        ? checkPassive
                                        : priceType === 1
                                        ? checkActive
                                        : checkPassive
                                    }
                                    alt=""
                                    className={"position-absolute checkicons"}
                                  />
                                  <span className="nft-price-eth">
                                    <img
                                      src={topDyp}
                                      alt=""
                                      height={20}
                                      width={20}
                                    />
                                    DYP
                                  </span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {!IsListed &&
                      !loadingNft &&
                      (type === "coingecko" ||
                        type === "gate" ||
                        type === "conflux" ||
                        type === "manta" ||
                        type === "taiko" ||
                        type === "cookie3" ||
                        type === "base" ||
                        type === "doge" ||
                        type === "bnb" ||
                        type === "5ya" ||
                        type === "opbnb" ||
                        type === "skale" ||
                        type === "cmc" ||
                        type === "core" ||
                        type === "viction" ||
                        type === "multivers" ||
                        type === "immutable" ||
                        type === "cawsbnb" ||
                        type === "cawsavax" ||
                        type === "cawsbase" ||
                        type === "landavax" ||
                        type === "landbnb" ||
                        type === "landbase" ||
                        type === "mat" ||
                        type === "sei" ||
                        type === "kucoin" ||
                        type === "vanar" ||
                        type === "tea-bnb" ||
                        type === "tea-opbnb" ||
                        type === "tea-sei" ||
                        type === "tea-base" ||
                        type === "taraxa") && (
                        <div className="price-wrapper p-3">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span className="currentprice-txt">
                              This NFT is not available for listing.
                            </span>
                          </div>
                        </div>
                      )}
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between gap-2 align-items-center">
                      {type !== "immutable" && (
                        <div className="d-flex justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                          <span className="owner-txt">Owner:</span>
                          {
                            <a
                              href={
                                type === "coingecko" ||
                                type === "gate" ||
                                type === "cmc" ||
                                type === "doge" ||
                                type === "bnb" ||
                                type === "5ya" ||
                                type === "cawsbnb" ||
                                type === "landbnb" ||
                                type === "cookie3" ||
                                type === "multivers" ||
                                type === "tea-bnb"
                                  ? `https://bscscan.com/address/${owner}`
                                  : type === "conflux"
                                  ? `https://evm.confluxscan.net/address/${owner}`
                                  : type === "base" ||
                                    type === "cawsbase" ||
                                    type === "landbase" ||
                                    type === "tea-base"
                                  ? `https://basescan.org/address/${owner}`
                                  : type === "cawsavax" || type === "landavax"
                                  ? `https://snowtrace.io/address/${owner}`
                                  : type === "skale"
                                  ? `https://green-giddy-denebola.explorer.mainnet.skalenodes.com/address/${owner}`
                                  : type === "viction"
                                  ? `https://www.vicscan.xyz/address/${owner}`
                                  : type === "core"
                                  ? `https://scan.coredao.org/address/${owner}`
                                  : type === "manta"
                                  ? `https://pacific-explorer.manta.network/address/${owner}`
                                  : type === "taiko"
                                  ? `https://taikoscan.io/address/${owner}`
                                  : type === "opbnb" ||
                                    type === "kucoin" ||
                                    type === "tea-opbnb"
                                  ? `https://opbnbscan.com/address/${owner}`
                                  : type === "vanar"
                                  ? `https://explorer.vanarchain.com/address/${owner}`
                                  : type === "mat"
                                  ? `https://matchscan.io/address/${owner}`
                                  : type === "taraxa"
                                  ? `https://mainnet.explorer.taraxa.io/address/${owner}`
                                  : type === "sei" || type === "tea-sei"
                                  ? `https://seitrace.com/address/${owner}`
                                  : `https://etherscan.io/address/${owner}`
                              }
                              target="_blank"
                              style={{ textDecoration: "none" }}
                              className="seller-addr"
                              rel="noreferrer"
                            >
                              {shortAddress(owner)}
                            </a>
                          }
                        </div>
                      )}
                      {!isOwner && IsListed && coinbase && isConnected && (
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center">
                          <button
                            disabled={
                              buyloading === true ||
                              buyStatus === "failed" ||
                              !isEOA
                                ? true
                                : false
                            }
                            className={`btn  buyNftbtn px-4 d-flex justify-content-center ${
                              buyStatus === "success"
                                ? "successbtn"
                                : buyStatus === "failed" ||
                                  (chainId !== 5 && chainId !== 1) ||
                                  !isEOA
                                ? "errorbtn"
                                : null
                            } d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? switchNetwork("0x1", 1)
                                : handleBuy(nft);
                            }}
                          >
                            {buyloading && (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !buyloading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : buyStatus === "buy" ? (
                              "Buy"
                            ) : buyStatus === "approve" || buyStatus === "" ? (
                              "Approve buy"
                            ) : buyStatus === "success" ? (
                              "Success"
                            ) : (
                              "Failed"
                            )}
                          </button>
                          {chainId === 1 && (
                            <button
                              className="btn mint-now-btn gap-2"
                              onClick={() => {
                                setshowMakeOffer(true);
                              }}
                              disabled={!isEOA}
                            >
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/whiteTag.svg"
                                }
                                alt=""
                              />{" "}
                              {myOffers.length > 0
                                ? "View your offer"
                                : "Make offer"}
                            </button>
                          )}
                        </div>
                      )}
                      {isOwner && IsListed && coinbase && isConnected && (
                        <div className="d-flex gap-2 col-lg-5 col-xxl-5 align-items-center">
                          <button
                            disabled={
                              updateLoading === true ||
                              updateStatus === "failed" ||
                              !isEOA
                                ? true
                                : false
                            }
                            className={`btn buyNftbtn col-lg-6 col-xxl-6 d-flex justify-content-center ${
                              updateStatus === "success"
                                ? "successbtn"
                                : updateStatus === "failed" ||
                                  (chainId !== 5 && chainId !== 1) ||
                                  !isEOA
                                ? "errorbtn"
                                : null
                            } d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? switchNetwork("0x1", 1)
                                : updateListing(
                                    nft.tokenId,
                                    nftPrice,
                                    nft.payment_priceType,
                                    type,
                                    "eth"
                                  );
                            }}
                          >
                            {updateLoading &&
                            (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !updateLoading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : updateStatus === "update" ||
                              updateStatus === "" ? (
                              "Update"
                            ) : updateStatus === "success" ? (
                              "Success"
                            ) : (
                              "Failed"
                            )}
                          </button>

                          <button
                            disabled={!isEOA}
                            className={`unlistbtn col-lg-6 col-xxl-6 d-flex justify-content-center d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? switchNetwork("0x1", 1)
                                : cancelNFT(
                                    nft.nftAddress,
                                    nft.tokenId,
                                    nft.payment_priceType,
                                    "eth"
                                  );
                            }}
                          >
                            {cancelLoading &&
                            (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !cancelLoading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : cancelStatus === "cancel" ||
                              cancelStatus === "" ? (
                              "Unlist"
                            ) : cancelStatus === "success" ? (
                              "Success"
                            ) : (
                              "Failed"
                            )}
                          </button>
                        </div>
                      )}

                      {isOwner &&
                        !IsListed &&
                        coinbase &&
                        isConnected &&
                        type !== "coingecko" &&
                        type !== "gate" &&
                        type !== "conflux" &&
                        type !== "manta" &&
                        type !== "taiko" &&
                        type !== "cookie3" &&
                        type !== "base" &&
                        type !== "cmc" &&
                        type !== "viction" &&
                        type !== "multivers" &&
                        type !== "core" &&
                        type !== "doge" &&
                        type !== "bnb" &&
                        type !== "5ya" &&
                        type !== "opbnb" &&
                        type !== "skale" &&
                        type !== "immutable" &&
                        type !== "cawsbnb" &&
                        type !== "cawsavax" &&
                        type !== "cawsbase" &&
                        type !== "landavax" &&
                        type !== "landbnb" &&
                        type !== "landbase" &&
                        type !== "mat" &&
                        type !== "sei" &&
                        type !== "kucoin" &&
                        type !== "vanar" &&
                        type !== "taraxa" &&
                        type !== "tea-bnb" &&
                        type !== "tea-opbnb" &&
                        type !== "tea-base" &&
                        type !== "tea-sei" && (
                          <button
                            disabled={
                              sellLoading === true ||
                              sellStatus === "failed" ||
                              !isEOA
                                ? true
                                : false
                            }
                            className={`btn  buyNftbtn col-lg-3 col-xxl-3 d-flex justify-content-center ${
                              sellStatus === "success"
                                ? "successbtn"
                                : sellStatus === "failed" ||
                                  (chainId !== 5 && chainId !== 1) ||
                                  !isEOA
                                ? "errorbtn"
                                : null
                            } d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? switchNetwork("0x1", 1)
                                : handleSell(
                                    nft.tokenId,
                                    nftPrice,
                                    priceType,
                                    type
                                  );
                            }}
                          >
                            {sellLoading && (chainId === 1 || chainId === 5) ? (
                              <div
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : !sellLoading &&
                              chainId !== 1 &&
                              chainId !== 5 ? (
                              "Switch Network"
                            ) : sellStatus === "sell" ? (
                              "List NFT"
                            ) : sellStatus === "success" ? (
                              "Success"
                            ) : sellStatus === "approve" ||
                              sellStatus === "" ? (
                              "Approve list"
                            ) : (
                              "Failed"
                            )}
                          </button>
                        )}

                      {!isOwner &&
                        !IsListed &&
                        coinbase &&
                        isConnected &&
                        chainId === 1 &&
                        type !== "coingecko" &&
                        type !== "gate" &&
                        type !== "conflux" &&
                        type !== "manta" &&
                        type !== "taiko" &&
                        type !== "cookie3" &&
                        type !== "base" &&
                        type !== "doge" &&
                        type !== "bnb" &&
                        type !== "5ya" &&
                        type !== "opbnb" &&
                        type !== "skale" &&
                        type !== "cmc" &&
                        type !== "core" &&
                        type !== "viction" &&
                        type !== "multivers" &&
                        type !== "cawsbnb" &&
                        type !== "cawsavax" &&
                        type !== "cawsbase" &&
                        type !== "landavax" &&
                        type !== "landbnb" &&
                        type !== "immutable" &&
                        type !== "landbase" &&
                        type !== "mat" &&
                        type !== "sei" &&
                        type !== "kucoin" &&
                        type !== "taraxa" &&
                        type !== "vanar" &&
                        type !== "tea-bnb" &&
                        type !== "tea-opbnb" &&
                        type !== "tea-base" &&
                        type !== "tea-sei" && (
                          <button
                            className="btn mint-now-btn gap-2"
                            onClick={() => {
                              setshowMakeOffer(true);
                            }}
                            disabled={!isEOA}
                          >
                            <img
                              src={
                                "https://cdn.worldofdypians.com/wod/whiteTag.svg"
                              }
                              alt=""
                            />{" "}
                            {myOffers.length > 0
                              ? "View your offer"
                              : "Make offer"}
                          </button>
                        )}

                      {!isConnected &&
                        type !== "coingecko" &&
                        type !== "gate" &&
                        type !== "conflux" &&
                        type !== "manta" &&
                        type !== "taiko" &&
                        type !== "cookie3" &&
                        type !== "base" &&
                        type !== "doge" &&
                        type !== "bnb" &&
                        type !== "5ya" &&
                        type !== "opbnb" &&
                        type !== "skale" &&
                        type !== "cmc" &&
                        type !== "core" &&
                        type !== "viction" &&
                        type !== "multivers" &&
                        type !== "immutable" &&
                        type !== "cawsbnb" &&
                        type !== "cawsavax" &&
                        type !== "cawsbase" &&
                        type !== "landavax" &&
                        type !== "landbnb" &&
                        type !== "landbase" &&
                        type !== "mat" &&
                        type !== "sei" &&
                        type !== "kucoin" &&
                        type !== "vanar" &&
                        type !== "taraxa" &&
                        type !== "tea-bnb" &&
                        type !== "tea-opbnb" &&
                        type !== "tea-base" &&
                        type !== "tea-sei" && (
                          <button
                            className={`btn  buyNftbtn d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              showWalletConnect();
                            }}
                          >
                            Connect Wallet
                          </button>
                        )}
                    </div>
                  </div>
                </div>
                <span
                  className="statusText"
                  style={{
                    color: purchaseColor,
                  }}
                >
                  {purchaseStatus === "" &&
                  userWallet &&
                  email &&
                  coinbase &&
                  coinbase.toLowerCase() !== userWallet?.toLowerCase()
                    ? "By interacting with the NFTs I understand that I am not using the wallet associated to my game profile"
                    : purchaseStatus}
                </span>
              </div>
            </div>
          </div>
          {type !== "coingecko" &&
            type !== "gate" &&
            type !== "conflux" &&
            type !== "manta" &&
            type !== "taiko" &&
            type !== "cookie3" &&
            type !== "base" &&
            type !== "doge" &&
            type !== "bnb" &&
            type !== "5ya" &&
            type !== "opbnb" &&
            type !== "skale" &&
            type !== "cmc" &&
            type !== "core" &&
            type !== "viction" &&
            type !== "multivers" &&
            type !== "immutable" &&
            type !== "mat" &&
            type !== "sei" &&
            type !== "kucoin" &&
            type !== "vanar" &&
            type !== "taraxa" &&
            type !== "tea-bnb" &&
            type !== "tea-opbnb" &&
            type !== "tea-base" &&
            type !== "tea-sei" && (
              <div className="px-2">
                <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
                  <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                    <h3 className="traits-text">Traits</h3>
                    {type === "caws" ||
                    type === "cawsavax" ||
                    type === "cawsbase" ||
                    type === "cawsbnb" ? (
                      <>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex flex-row flex-xxl-column flex-lg-column gap-2 align-items-center justify-content-between w-100">
                            <span className="traittitle">Background</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[0]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Tail</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[1]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Ears</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[2]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Body</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[3]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Clothes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[4]?.value}
                            </span>
                          </div>
                        </div>
                        <div className="trait-separator"></div>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[6]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Mouth</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[7]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Hat</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[8]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyewear</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[9]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Watch</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[5]?.value}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : type === "timepiece" ? (
                      <>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex flex-row flex-xxl-column flex-lg-column gap-2 align-items-center justify-content-between w-100">
                            <span className="traittitle">Background</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[0]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Tail</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[1]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Ears</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[2]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Body</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[3]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Clothes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[4]?.value}
                            </span>
                          </div>
                        </div>
                        <div className="trait-separator"></div>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyes</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[5]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Mouth</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[6]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Hat</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[7]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Eyewear</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[8]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Watch</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[9]?.value}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Tier</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[0]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Size</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[1]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Building</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[3]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Workbench</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[4]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">NPC - Attire</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[8]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Gemstone</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[9]?.value}
                            </span>
                          </div>
                        </div>
                        <div className="trait-separator"></div>
                        <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Artifacts</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[5]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">NPC</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[6]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">NPC - AI Powered</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[7]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">Plot</span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[10]?.value}
                            </span>
                          </div>
                          <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                            <span className="traittitle">
                              Multi Functional Building
                            </span>
                            <span className="traitsubtitle">
                              {metaData.attributes &&
                                metaData?.attributes[2]?.value}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

          {(type === "coingecko" ||
            type === "gate" ||
            type === "conflux" ||
            type === "manta" ||
            type === "taiko" ||
            type === "cookie3" ||
            type === "base" ||
            type === "doge" ||
            type === "bnb" ||
            type === "5ya" ||
            type === "opbnb" ||
            type === "skale" ||
            type === "cmc" ||
            type === "core" ||
            type === "viction" ||
            type === "multivers" ||
            type === "immutable" ||
            type === "mat" ||
            type === "sei" ||
            type === "kucoin" ||
            type === "vanar" ||
            type === "taraxa" ||
            type === "tea-bnb" ||
            type === "tea-opbnb" ||
            type === "tea-base" ||
            type === "tea-sei") && (
            <div className="px-2">
              <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
                <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                  <h3 className="traits-text">Benefits</h3>

                  <>
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/inboxStar.svg"
                            }
                            alt=""
                          />{" "}
                          Exclusive Access
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img
                            src={"https://cdn.worldofdypians.com/wod/stars.svg"}
                            alt=""
                          />
                          Daily Rewards
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/dollarCircle.svg"
                            }
                            alt=""
                          />
                          Earn{" "}
                          {type === "conflux"
                            ? "CFX"
                            : type === "base" || type === "tea-base"
                            ? "ETH"
                            : type === "manta"
                            ? "MANTA"
                            : type === "taiko"
                            ? "TAIKO"
                            : type === "skale"
                            ? "SKL"
                            : type === "core"
                            ? "CORE"
                            : type === "viction"
                            ? "VIC"
                            : type === "multivers"
                            ? "EGLD"
                            : type === "immutable"
                            ? "IMX"
                            : type === "cookie3"
                            ? "COOKIE"
                            : type === "sei" || type === "tea-sei"
                            ? "SEI"
                            : type === "vanar"
                            ? "VANRY"
                            : type === "taraxa"
                            ? "TARA"
                            : "BNB"}{" "}
                          rewards
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          <img
                            src={"https://cdn.worldofdypians.com/wod/chart.svg"}
                            alt=""
                          />
                          Global Points
                        </span>
                      </div>
                    </div>
                    <div className="trait-separator"></div>
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row gap-3 align-items-center justify-content-between">
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img
                            src={"https://cdn.worldofdypians.com/wod/users.svg"}
                            alt=""
                          />
                          Community Engagement
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img
                            src={"https://cdn.worldofdypians.com/wod/star.svg"}
                            alt=""
                          />{" "}
                          Enhanced Interactions
                        </span>
                      </div>
                      <div className="d-flex w-100 justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="traittitle d-flex align-items-center gap-2">
                          {" "}
                          <img
                            src={
                              "https://cdn.worldofdypians.com/wod/expand.svg"
                            }
                            alt=""
                          />
                          Expanded Functionality
                        </span>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          )}

          {offerData &&
            offerData.length > 0 &&
            offerData.filter((items) => {
              return items.offer.price > 0;
            }).length > 0 && (
              <div className="px-2 mt-5">
                <div className="d-flex flex-column gap-3">
                  <span className="nftactivity">NFT Offers Activity </span>
                  <div className="tablesalewrapper">
                    <table className="pastsaleTable p-2">
                      <tbody>
                        <th className="saleHeader">Price</th>
                        <th className="saleHeader">USD Price</th>
                        <th className="saleHeader">Floor Difference</th>
                        <th className="saleHeader">From</th>
                        {isOwner && <th className="saleHeader">Action</th>}

                        {offerData
                          .filter((items) => {
                            return items.offer.price > 0;
                          })
                          .map((item, index) => {
                            return (
                              <tr className="saleRow" key={index}>
                                <td className="saledata">
                                  {getFormattedNumber(item.offer[0] / 1e18, 2)}{" "}
                                  {item.offer.payment.priceType === "0"
                                    ? "ETH"
                                    : "DYP"}
                                </td>
                                <td className="saleprice">
                                  $
                                  {getFormattedNumber(
                                    ethTokenData * (item.offer[0] / 1e18),
                                    item.offer.payment.priceType === "0" ? 3 : 0
                                  )}
                                </td>
                                <td className="greendata">
                                  {item.offer.payment.priceType === "0"
                                    ? lowestPriceNftListed / 1e18 >
                                      item.offer[0] / 1e18
                                      ? (lowestPriceNftListed / 1e18 -
                                          item.offer[0] / 1e18) /
                                        100
                                      : (item.offer[0] / 1e18 -
                                          lowestPriceNftListed / 1e18) /
                                        100
                                    : lowestPriceNftListedDYP / 1e18 >
                                      item.offer[0] / 1e18
                                    ? (lowestPriceNftListedDYP / 1e18 -
                                        item.offer[0] / 1e18) /
                                      100
                                    : (item.offer[0] / 1e18 -
                                        lowestPriceNftListedDYP / 1e18) /
                                      100}
                                  %
                                </td>
                                <td className="greendata">
                                  <a
                                    href={`https://etherscan.io/address/${item.offer.buyer}`}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                    className="greendata p-0"
                                    rel="noreferrer"
                                  >
                                    {shortAddress(item.offer.buyer)}{" "}
                                    <img
                                      src={
                                        "https://cdn.worldofdypians.com/wod/link.svg"
                                      }
                                      alt=""
                                    />
                                  </a>
                                </td>
                                {isOwner && (
                                  <td className="greendata">
                                    <button
                                      className={` ${
                                        offeracceptStatus === "fail"
                                          ? "errorbtn"
                                          : "acceptbtn"
                                      }  btn`}
                                      disabled={!item.isAllowed}
                                      onClick={() => {
                                        handleAcceptOffer(item.index);
                                      }}
                                    >
                                      {offeracceptStatus === "initial" ? (
                                        "Accept"
                                      ) : offeracceptStatus === "loading" ? (
                                        <>
                                          Accepting{" "}
                                          <div
                                            className="spinner-border mx-1"
                                            role="status"
                                            style={{ width: 16, height: 16 }}
                                          ></div>
                                        </>
                                      ) : offeracceptStatus === "success" ? (
                                        "Success"
                                      ) : (
                                        "Failed"
                                      )}
                                    </button>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          {saleHistory && saleHistory.length > 0 && (
            <div className="px-2 mt-5">
              <div className="d-flex flex-column gap-3">
                <span className="nftactivity">NFT Sale Activity </span>
                <div className="tablesalewrapper">
                  <table className="pastsaleTable p-2">
                    <tbody>
                      <th className="saleHeader">Event</th>
                      <th className="saleHeader">Price</th>
                      <th className="saleHeader">Owner</th>
                      <th className="saleHeader">Transaction</th>
                      <th className="saleHeader">Date</th>

                      {saleHistory.map((item, index) => {
                        return (
                          <tr className="saleRow" key={index}>
                            <td className="saledata">
                              <img
                                src={
                                  "https://cdn.worldofdypians.com/wod/cart.svg"
                                }
                                alt=""
                              />{" "}
                              Sale
                            </td>
                            <td className="saleprice">
                              {getFormattedNumber(
                                item.price / 1e18,
                                item.payment_priceType === 1 ? 0 : 2
                              )}{" "}
                              {item.payment_priceType === 1 ? "DYP" : "ETH"}
                            </td>
                            <td className="greendata">
                              <a
                                href={`https://etherscan.io/address/${item.buyer}`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                                className="greendata p-0"
                                rel="noreferrer"
                              >
                                {shortAddress(item.buyer)}{" "}
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/link.svg"
                                  }
                                  alt=""
                                />
                              </a>
                            </td>
                            <td className="greendata">
                              <a
                                href={`https://etherscan.io/tx/${item.transactionHash}`}
                                target="_blank"
                                style={{ textDecoration: "none" }}
                                className="greendata p-0"
                                rel="noreferrer"
                              >
                                {shortAddress(item.transactionHash)}{" "}
                                <img
                                  src={
                                    "https://cdn.worldofdypians.com/wod/link.svg"
                                  }
                                  alt=""
                                />
                              </a>
                            </td>
                            <td className="greendata">
                              {getRelativeTime(item.blockTimestamp)}{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showMakeOffer === true && (
        <MakeOffer
          open={showMakeOffer}
          onclose={() => {
            setshowMakeOffer(false);
          }}
          isCaws={type === "caws"}
          isTimepiece={type === "timepiece"}
          isWod={type === "land"}
          nft={nft}
          nftAddr={nftAddress}
          nftId={nftId}
          ethTokenData={ethTokenData}
          handleMakeOffer={handleMakeOffer}
          handleDeleteOffer={handleDeleteOffer}
          handleUpdateOffer={handleUpdateOffer}
          status={offerStatus}
          deletestatus={offerdeleteStatus}
          updatestatus={offerupdateStatus}
          coinbase={coinbase}
          nftCount={nftCount}
          lowestPriceNftListed={lowestPriceNftListed}
        />
      )}
    </div>
  );
};

export default SingleNft;
