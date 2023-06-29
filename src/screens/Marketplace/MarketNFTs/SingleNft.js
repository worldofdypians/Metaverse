import React, { useState, useEffect } from "react";
import MobileNav from "../../../components/MobileNav/MobileNav";
import MarketSidebar from "../../../components/MarketSidebar/MarketSidebar";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import topEth from "../assets/topEth.svg";
import topDyp from "../assets/dypIcon.svg";
import { useLocation } from "react-router-dom";
import getListedNFTS from "../../../actions/Marketplace";
import checkActive from "../assets/checked.svg";
import checkPassive from "../assets/empty.svg";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { shortAddress } from "../../Caws/functions/shortAddress";
import Toast from "../../../components/Toast/Toast";
import axios from "axios";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import eye from "../assets/eye.svg";
import heart from "../assets/heart.svg";
import ethIcon from "../assets/ethIcon.svg";
import { GET_PLAYER } from "../../Account/src/Containers/Dashboard/Dashboard.schema";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../Account/src/Utils.js/Auth/AuthDetails";
import favActive from "./assets/favActive.svg";
import favInactive from "./assets/favInactive.svg";
import cart from "./assets/cart.svg";
import link from "./assets/link.svg";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#272450",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const SingleNft = ({
  coinbase,
  showWalletConnect,
  chainId,
  isConnected,
  handleSwitchChain,
  nftCount,
  handleRefreshListing,
  favorites,
}) => {
  const windowSize = useWindowSize();
  const location = useLocation();
  const { BigNumber } = window;

  const [nft, setNft] = useState(
    location.state?.nft ? location.state?.nft : []
  );

  const [type, setType] = useState(
    location.state?.type ? location.state?.type : false
  );

  const [IsApprove, setIsApprove] = useState(false);
  const [buttonText, setbuttonText] = useState("Approve");
  const [IsListed, setIsListed] = useState(false);

  const [buttonLoading, setbuttonLoading] = useState(false);
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
  const [dyptokenData, setDypTokenData] = useState(0);
  const [ethtokenData, setEthTokenData] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [favCount, setfavCount] = useState(0);
  const { email, logout } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);

  // console.log("IsListed isOwner", IsListed, isOwner);

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

        const propertyETH = data.data.the_graph_eth_v2.usd_per_eth;

        setEthTokenData(propertyETH);
      });
  };

  const getMetaData = async () => {
    if (nft) {
      if (type === "caws") {
        const result = await window.getNft(nft.tokenId);
        console.log(result);

        setmetaData(result);
      } else if (type === "land") {
        const result = await window.getLandNft(nft.tokenId);
        setmetaData(result);
      } else if (type === "timepiece") {
        const result = await window.getTimepieceNft(nft.tokenId);
        setmetaData(result);
      }
    } else console.log("no");
  };

  const isApprovedBuy = async (amount) => {
    const result = await window.isApprovedBuy(amount).catch((e) => {
      console.error(e);
    });

    return result;
  };

  async function isApprovedNFT(nft, type) {
    console.log("isapprovednft", nft, type);
    const result = window.isApproved(nft, type).catch((e) => {
      console.error(e);
    });
    return result;
  }

  const handleRefreshList = async (type, tokenId) => {
    let nft_address;

    if (type === "timepiece") {
      nft_address = window.config.nft_timepiece_address;
    } else if (type === "land") {
      nft_address = window.config.nft_land_address;
    } else {
      nft_address = window.config.nft_caws_address;
    }

    const listedNFT = await getListedNFTS(
      0,
      "",
      "nftAddress_tokenId",
      tokenId,
      nft_address
    );

    console.log("test", listedNFT);

    if (listedNFT && listedNFT.length > 0) {
      setNft(...listedNFT);
    }
  };

  const getLatestBoughtNFT = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/dypius-marketplace/version/latest";

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
    console.log("boughtItems", boughtItems);

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

    const test = [...finalboughtItems];
    console.log(test);

    setNft(...finalboughtItems);
  };

  const handleSell = async (tokenId, nftPrice, priceType, type) => {
    const isApproved = await isApprovedNFT(tokenId, type);
    const newPrice = new BigNumber(nftPrice * 1e18).toFixed();
    console.log(newPrice);
    if (isApproved) {
      console.log("selling");
      setsellLoading(true);
      setsellStatus("sell");
      setPurchaseStatus("Listing NFT in progress...");
      setPurchaseColor("#00FECF");

      await window
        .listNFT(tokenId, newPrice, priceType, type)
        .then((result) => {
          setsellLoading(false);
          setsellStatus("success");
          setPurchaseStatus("NFT successfully listed!");
          setPurchaseColor("#00FECF");
          setShowToast(true);
          handleRefreshList(type, tokenId);
          handleRefreshListing();
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setsellStatus("sell");
          }, 3000);
        })
        .catch((e) => {
          setsellLoading(false);
          setsellStatus("failed");
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setsellStatus("sell");
          }, 3000);
          console.error(e);
        });
    } else {
      console.log("approve selling");

      setsellLoading(true);
      setsellStatus("approve");
      setPurchaseStatus("Approving NFT for listing in progress..");
      setPurchaseColor("#00FECF");

      await window
        .approveNFT(tokenId, type)
        .then((result) => {
          setTimeout(() => {
            setsellStatus("sell");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);

          setsellLoading(false);
          setsellStatus("success");
          setPurchaseStatus("Successfully approved! You can sell your nft");
          setPurchaseColor("#00FECF");
        })
        .catch((e) => {
          setTimeout(() => {
            setsellStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);

          setsellLoading(false);
          setsellStatus("failed");
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          console.log(e);
        });
    }
  };

  const getLatest20BoughtNFTS = async () => {
    let boughtItems = [];
    let finalboughtItems = [];

    const URL =
      "https://api.studio.thegraph.com/query/46190/dypius-marketplace/version/latest";

    const itemBoughtQuery = `
        {
            itemBoughts(first: 20, orderBy: blockTimestamp, orderDirection: desc) {
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
    return finalboughtItems;
  };

  async function addNFTToUserFavorites(userId, tokenId, nftAddress) {
    try {
      const response = await fetch(
        `https://api.worldofdypians.com/user-favorites/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId, nftAddress }),
        }
      );
      if (!response.ok) {
        console.log(response);
        throw new Error("Error adding NFT to user favorites");
      }
      const data = await response.json();
      getFavoritesCount(nft.tokenId, nft.nftAddress);
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
      }
    )
      .then((response) => {
        if (response.ok || response.status === 204 || response.status === 404) {
          // NFT removed successfully or was not found (404)
          console.log("NFT removed from favorites");
          getFavoritesCount(nft.tokenId, nft.nftAddress);
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
        await deleteNFTFromUserFavorites(
          coinbase,
          parseInt(nft.tokenId),
          nft.nftAddress
        );
      }
      if (!isFavorite) {
        await addNFTToUserFavorites(
          coinbase,
          parseInt(nft.tokenId),
          nft.nftAddress
        );
      }
    } else showWalletConnect();
  };

  async function handleBuy(nft) {
    const isApproved = await isApprovedBuy(nft.price);

    if (isApproved || nft.payment_priceType === 0) {
      console.log("buying", nft.price);
      setPurchaseColor("#00FECF");

      setbuyLoading(true);
      setbuyStatus("buy");
      setPurchaseStatus("Buying NFT in progress..");
      await window
        .buyNFT(
          nft.price,
          nft.nftAddress,
          nft.tokenId,
          nft.payment_priceType,
          nft.payment_tokenAddress
        )
        .then((result) => {
          console.log("buyNFT", result);
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
            handleRefreshList(type, nft);
            handleRefreshListing();
            getLatestBoughtNFT();
          }, 3000);
        })
        .catch((e) => {
          setbuyStatus("failed");
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
          setTimeout(() => {
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
            setbuyStatus("");
          }, 3000);
          console.error(e);
        });
    } else {
      console.log("approve buying");

      setbuyStatus("approve");
      setbuyLoading(true);
      setPurchaseStatus("Approving in progress...");
      setPurchaseColor("#00FECF");
      await window
        .approveBuy(nft.price)
        .then(() => {
          setTimeout(() => {
            setbuyStatus("buy");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyStatus("success");
          setbuyLoading(false);
          setPurchaseStatus("Successfully approved");
          setPurchaseColor("#00FECF");
        })
        .catch((e) => {
          console.error(e);
          setbuyStatus("failed");
          setTimeout(() => {
            setbuyStatus("approve");
            setPurchaseStatus("");
            setPurchaseColor("#00FECF");
          }, 3000);
          setbuyLoading(false);
          setPurchaseStatus(e?.message);
          setPurchaseColor("#FF6232");
        });
    }
  }

  const cancelNFT = (nftAddress, tokenId, type) => {
    setcancelLoading(true);
    setcancelStatus("cancel");
    setPurchaseColor("#00FECF");
    setPurchaseStatus("Unlisting your nft...");
    console.log("cancelling");

    return window
      .cancelListNFT(nftAddress, tokenId, type)
      .then((result) => {
        setTimeout(() => {
          setcancelStatus("");
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
        }, 3000);
        // handleRefreshList(type, tokenId);
        handleRefreshListing();
        setcancelLoading(false);
        setcancelStatus("success");
        setPurchaseColor("#00FECF");
        setPurchaseStatus("Nft successfully unlisted");
      })
      .catch((e) => {
        setTimeout(() => {
          setcancelStatus("");
          setPurchaseColor("");
          setPurchaseStatus("");
        }, 3000);

        setcancelLoading(false);
        setcancelStatus("failed");
        setPurchaseColor("#FF6232");
        setPurchaseStatus(e?.message);
      });
  };

  async function updateListing(nft, price, priceType, type) {
    const newPrice = new BigNumber(price * 1e18).toFixed();

    setPurchaseColor("#00FECF");
    setPurchaseStatus("Price is being updated...");
    setupdateLoading(true);
    setupdateStatus("update");
    console.log("updating", nft, newPrice, priceType, type);

    return await window
      .updateListingNFT(nft, newPrice, priceType, type)
      .then((result) => {
        setTimeout(() => {
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
          setupdateStatus("");
        }, 3000);
        setShowToast(true);
        setToastTitle("Successfully updated!");
        handleRefreshList(type, nft);
        handleRefreshListing();
        setPurchaseColor("#00FECF");
        setPurchaseStatus("Price updated successfully.");
        setupdateLoading(false);
        setupdateStatus("success");
      })
      .catch((e) => {
        setTimeout(() => {
          setPurchaseColor("#00FECF");
          setPurchaseStatus("");
          setupdateStatus("");
        }, 3000);

        setPurchaseColor("#FF6232");
        setPurchaseStatus(e?.message);
        setupdateLoading(false);
        setupdateStatus("failed");
      });
  }

  async function isListedNFT(nft, type, details = false) {
    const listedNFTS = await getListedNFTS(
      0,
      "",
      "nftAddress_tokenId",
      nft.tokenId,
      nft.nftAddress
    );

    return listedNFTS.length > 0;
  }

  //to get the favorites count
  async function getFavoritesCount(tokenId, nftAddress) {
    try {
      const data = await axios.get(
        `https://api.worldofdypians.com/nft-favorite/${tokenId}/${nftAddress}`
      );

      // if (!response.ok) {
      //   throw new Error("Error fetching NFT favorites");
      // }
      if (data.data && data.data.favoritesCount) {
        setfavCount(data.data.favoritesCount);
      }

      return data.data.favoritesCount;
    } catch (error) {
      console.error("Error fetching NFT favorites:", error);
      throw error;
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
    } else if (Number(newprice) > 100000 && priceType === 1) {
      setNftPrice(100000);
    } else if (Number(newprice) <= 100000 && priceType === 1) {
      setNftPrice(newprice);
    }
  };

  useEffect(() => {
    // if (isOwner === false) {
    if (isConnected === true && nft.payment_priceType === 1 && IsListed) {
      isApprovedBuy(nft.price).then((isApproved) => {
        console.log(isApproved);
        if (isApproved === true) {
          setbuyStatus("buy");
        } else if (isApproved === false) {
          setbuyStatus("approve");
        }
        setIsApprove(isApproved);
      });
    } else if (!IsListed) {
      console.log(nft);
      isApprovedNFT(nft.tokenId, type).then((isApproved) => {
        if (isApproved === true) {
          setsellStatus("sell");
        } else if (isApproved === false) {
          setsellStatus("approve");
        }
      });
    } else {
      setbuyStatus("buy");
    }
    // }
  }, [nft.price, isConnected, IsListed, isOwner, coinbase, nftCount]);

  useEffect(() => {
    if (isConnected === true && nft.payment_priceType === 1) {
      isApprovedBuy(nft.price).then((isApproved) => {
        // console.log(isApproved);
        setIsApprove(isApproved);
      });
    }

    if (coinbase === undefined) {
      setisOwner(false);
    } else if (coinbase) {
      if (nft.seller && nft.seller.toLowerCase() === coinbase.toLowerCase()) {
        setisOwner(true);
      } else if (
        nft.buyer &&
        coinbase &&
        nft.buyer.toLowerCase() === coinbase.toLowerCase()
      ) {
        setisOwner(true);
      }
    }

    // else if (data?.getPlayer?.wallet && email && coinbase) {
    //   if (
    //     nft.seller &&
    //     nft.seller.toLowerCase() ===
    //       data?.getPlayer?.wallet?.publicAddress?.toLowerCase()
    //   ) {
    //     setisOwner(true);
    //   } else

    //   if (
    //     nft.buyer &&
    //     nft.buyer.toLowerCase() ===
    //       data?.getPlayer?.wallet?.publicAddress?.toLowerCase()
    //   ) {
    //     setisOwner(true);
    //   }
    // }
    // else if (coinbase && !data?.getPlayer?.wallet && !email) {
    //   if (nft.seller && nft.seller.toLowerCase() === coinbase.toLowerCase()) {
    //     setisOwner(true);
    //   } else if (
    //     nft.buyer &&
    //     nft.buyer.toLowerCase() === coinbase.toLowerCase()
    //   ) {
    //     setisOwner(true);
    //   } else setisOwner(false);
    // }
  }, [nft.price, isConnected, isOwner, IsListed, coinbase]);

  useEffect(() => {
    if (type) {
      getMetaData();
      isListedNFT(nft, type).then((isListed) => {
        setIsListed(isListed);
      });
      handleRefreshList(type, nft.tokenId);
    }
  }, [type, nftCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTokenData();
    getViewCount(nft.tokenId, nft.nftAddress);
  }, []);

  useEffect(() => {
    if (nft) {
      getFavoritesCount(nft.tokenId, nft.nftAddress);
      setNft(nft);
    }
  }, [nft]);

  // useEffect(() => {
  //   if (buyStatus === "success") {
  //     getLatestBoughtNFT();
  //   }
  // }, [buyStatus]);

  useEffect(() => {
    if (nft) {
      if (favorites && favorites.length > 0) {
        const favobj = favorites.find(
          (obj) =>
            obj.nftAddress === nft.nftAddress && obj.tokenId === nft.tokenId
        );

        if (favobj !== undefined) {
          setIsFavorite(true);
        } else setIsFavorite(false);
      }
    }
  }, [nft]);

  useEffect(() => {
    if (
      purchaseStatus === "" &&
      data?.getPlayer?.wallet &&
      coinbase &&
      email &&
      coinbase.toLowerCase() !==
        data?.getPlayer?.wallet?.publicAddress?.toLowerCase()
    ) {
      setPurchaseColor("#FF6232");
    }
  }, [purchaseStatus, data]);

  return (
    <div
      className="container-fluid d-flex justify-content-end p-0"
      style={{ minHeight: "72vh" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div className="container-nft pe-xxl-5 pe-lg-5 position-relative">
        <Toast showToast={showToast} title={toastTitle} />
        <div className="container-lg mx-0">
          <div className="main-wrapper py-4 w-100 mt-5 mt-xxl-0 mt-lg-0">
            {type === "land" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  World of Dypians{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Land
                  </h6>
                </h6>
              </>
            ) : type === "caws" ? (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  Cats and Watches Society{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    (CAWS)
                  </h6>
                </h6>
              </>
            ) : (
              <>
                <h6 className="market-banner-title d-flex flex-column flex-xxl-row flex-lg-row align-items-xxl-center align-items-lg-center gap-2 px-3">
                  CAWS{" "}
                  <h6
                    className="market-banner-title m-0"
                    style={{ color: "#8C56FF", lineHeight: "80%" }}
                  >
                    Timepiece
                  </h6>
                </h6>
              </>
            )}
            <div className="d-flex flex-column gap-4 flex-xxl-row flex-lg-row align-items-center justify-content-around mt-5 px-3">
              <div className="d-flex flex-column align-items-center gap-2 col-6 col-lg-3 position-relative">
                <div className="position-relative package-blur">
                  <div className="first-box-blur first-bigbox-blur d-flex align-items-end justify-content-center"></div>
                  <div className="second-box-blur second-bigbox-blur"></div>
                  <img
                    className="blur-img blur-img-big"
                    src={
                      type === "caws"
                        ? `https://mint.dyp.finance/thumbs/${nft.tokenId}.png`
                        : type === "land"
                        ? `https://mint.worldofdypians.com/thumbs/${nft.tokenId}.png`
                        : `https://timepiece.worldofdypians.com/images/${nft.tokenId}.png`
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="d-flex flex-column gap-2 col-lg-7">
                <div
                  className="d-flex align-items-center gap-2 px-4"
                  style={{
                    color: purchaseColor,
                  }}
                >
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img src={ethIcon} alt="" /> Ethereum
                  </span>
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img src={eye} alt="" /> {viewCount} views
                  </span>
                  <span className="seller-addr d-flex gap-1 align-items-center">
                    <img src={heart} alt="" /> {favCount} favorites
                  </span>
                </div>
                <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
                  <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                    <h3 className="nft-title d-flex align-items-center justify-content-between">
                      {type === "caws"
                        ? "CAWS"
                        : type === "land"
                        ? "Genesis Land"
                        : "CAWS Timepiece"}{" "}
                      #{nft.tokenId}
                      <img
                        src={isFavorite ? favActive : favInactive}
                        onClick={() => {
                          handleFavorite(nft);
                        }}
                        alt=""
                      />
                    </h3>
                    {isOwner && IsListed && (
                      <div className="d-flex gap-2 align-items-center">
                        <span className="currentprice-txt">Current price</span>
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
                            src={nft.payment_priceType === 0 ? topEth : topDyp}
                            alt=""
                            height={20}
                            width={20}
                          />
                          <span
                            className="nft-price-eth"
                            style={{ fontSize: 15, lineHeight: "20px" }}
                          >
                            {getFormattedNumber(
                              nft.price / 1e18,
                              nft.payment_priceType === 0 ? 3 : 0
                            )}
                            {nft.payment_priceType === 0 ? "ETH" : "DYP"}
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
                        </div>
                      </div>
                    )}
                    {!isOwner && IsListed && (
                      <div className="price-wrapper p-3">
                        <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                          <span className="currentprice-txt">
                            Current price
                          </span>
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={
                                nft.payment_priceType === 0 ? topEth : topDyp
                              }
                              alt=""
                              height={30}
                              width={30}
                            />
                            <span className="nft-price-eth">
                              {getFormattedNumber(
                                nft.price / 1e18,
                                nft.payment_priceType === 0 ? 3 : 0
                              )}{" "}
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
                          </div>
                        </div>
                      </div>
                    )}
                    {!isOwner && !IsListed && nft.price && (
                      <div className="price-wrapper p-3">
                        <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                          <span className="currentprice-txt">
                            Current price
                          </span>
                          <div className="d-flex gap-2 align-items-center">
                            <img
                              src={
                                nft.payment_priceType === 0 ? topEth : topDyp
                              }
                              alt=""
                              height={30}
                              width={30}
                            />
                            <span className="nft-price-eth">
                              {getFormattedNumber(
                                nft.price / 1e18,
                                nft.payment_priceType === 0 ? 3 : 0
                              )}{" "}
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
                          </div>
                        </div>
                      </div>
                    )}
                    {!isOwner && !IsListed && !nft.price && (
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
                    {isOwner && IsListed && (
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
                              <img
                                src={priceType === 0 ? topEth : topDyp}
                                alt=""
                                height={30}
                                width={30}
                              />
                              <span className="nft-price-eth gap-3 d-flex">
                                <StyledTextField
                                  error={nftPrice === "" ? true : false}
                                  size="small"
                                  // label="Price"
                                  id="price"
                                  name="price"
                                  value={nftPrice}
                                  type="number"
                                  required
                                  onChange={(e) => {
                                    handlepricechange(e.target.value);
                                  }}
                                  sx={{ width: "120px" }}
                                  inputProps={{
                                    inputMode: "numeric",
                                  }}
                                />
                                {priceType === 0 ? "ETH" : "DYP"}{" "}
                              </span>
                              <span className="nft-price-usd">
                                $
                                {getFormattedNumber(
                                  priceType === 0
                                    ? ethtokenData * nftPrice
                                    : dyptokenData * nftPrice,
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                          <div className="d-flex w-100 justify-content-between flex-column gap-2 align-items-center">
                            <span className="currentprice-txt">
                              Choose currency
                            </span>
                            <div className="d-flex flex-row justify-content-around w-100 gap-2">
                              <div
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
                                    priceType === 0 ? checkActive : checkPassive
                                  }
                                  alt=""
                                  className={"position-absolute checkicons"}
                                />
                                <span className="nft-price-eth">
                                  <img
                                    src={topEth}
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {isOwner && !IsListed && (
                      <div className="d-flex flex-column flex-xxl-row flex-lg-row align-items-center gap-2 justify-content-between">
                        <div className="price-wrapper p-3 col-xxl-6 col-lg-6">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span
                              className="currentprice-txt"
                              style={{ alignSelf: "baseline" }}
                            >
                              Listing price
                            </span>
                            <div className="d-flex gap-2 align-items-center">
                              <img
                                src={priceType === 0 ? topEth : topDyp}
                                alt=""
                                height={30}
                                width={30}
                              />
                              <span className="nft-price-eth gap-3 d-flex">
                                <StyledTextField
                                  error={nftPrice === "" ? true : false}
                                  size="small"
                                  id="price"
                                  name="price"
                                  value={nftPrice}
                                  type="number"
                                  required
                                  onChange={(e) => {
                                    handlepricechange(e.target.value);
                                  }}
                                  sx={{ width: "120px" }}
                                  inputProps={{
                                    inputMode: "numeric",
                                  }}
                                />
                                {priceType === 0 ? "ETH" : "DYP"}{" "}
                              </span>
                              <span className="nft-price-usd">
                                $
                                {getFormattedNumber(
                                  priceType === 0
                                    ? ethtokenData * nftPrice
                                    : dyptokenData * nftPrice,
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="price-wrapper p-3 col-xxl-5 col-lg-5">
                          <div className="d-flex w-100 justify-content-between flex-column flex-xxl-row flex-lg-row gap-2 align-items-center">
                            <span className="currentprice-txt">
                              Choose currency
                            </span>
                            <div className="d-flex flex-row justify-content-around w-100 gap-2">
                              <div
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
                                    priceType === 0 ? checkActive : checkPassive
                                  }
                                  alt=""
                                  className={"position-absolute checkicons"}
                                />
                                <span className="nft-price-eth">
                                  <img
                                    src={topEth}
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between gap-2 align-items-center">
                      <div className="d-flex justify-content-between flex-row flex-xxl-column flex-lg-column gap-2 align-items-center">
                        <span className="owner-txt">Owner:</span>
                        {nft.seller ? (
                          <a
                            href={`https://etherscan.io/address/${nft.seller}`}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                            className="seller-addr"
                            rel="noreferrer"
                          >
                            {shortAddress(nft.seller)}
                          </a>
                        ) : (
                          <a
                            href={`https://etherscan.io/address/${nft.buyer}`}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                            className="seller-addr"
                            rel="noreferrer"
                          >
                            {shortAddress(nft.buyer)}
                          </a>
                        )}
                      </div>
                      {!isOwner && IsListed && coinbase && isConnected && (
                        <button
                          disabled={
                            buyloading === true || buyStatus === "failed"
                              ? true
                              : false
                          }
                          className={`btn  buyNftbtn col-lg-3 col-xxl-3 d-flex justify-content-center ${
                            buyStatus === "success"
                              ? "successbtn"
                              : buyStatus === "failed" ||
                                (chainId !== 5 && chainId !== 1)
                              ? "errorbtn"
                              : null
                          } d-flex justify-content-center align-items-center gap-2`}
                          onClick={() => {
                            chainId !== 1 && chainId !== 5
                              ? handleSwitchChain()
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
                          ) : !buyloading && chainId !== 1 && chainId !== 5 ? (
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
                      )}
                      {isOwner && IsListed && coinbase && isConnected && (
                        <div className="d-flex gap-2 col-lg-5 col-xxl-5 align-items-center">
                          <button
                            disabled={
                              updateLoading === true ||
                              updateStatus === "failed"
                                ? true
                                : false
                            }
                            className={`btn buyNftbtn col-lg-6 col-xxl-6 d-flex justify-content-center ${
                              updateStatus === "success"
                                ? "successbtn"
                                : updateStatus === "failed" ||
                                  (chainId !== 5 && chainId !== 1)
                                ? "errorbtn"
                                : null
                            } d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? handleSwitchChain()
                                : updateListing(
                                    nft.tokenId,
                                    nftPrice,
                                    priceType,
                                    type
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
                            // disabled={
                            //   cancelLoading === true || cancelStatus === "failed"
                            //     ? true
                            //     : false
                            // }
                            className={`unlistbtn col-lg-6 col-xxl-6 d-flex justify-content-center d-flex justify-content-center align-items-center gap-2`}
                            onClick={() => {
                              chainId !== 1 && chainId !== 5
                                ? handleSwitchChain()
                                : cancelNFT(
                                    nft.nftAddress,
                                    nft.tokenId,
                                    nft.payment_priceType
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

                      {isOwner && !IsListed && coinbase && isConnected && (
                        <button
                          disabled={
                            sellLoading === true || sellStatus === "failed"
                              ? true
                              : false
                          }
                          className={`btn  buyNftbtn col-lg-3 col-xxl-3 d-flex justify-content-center ${
                            sellStatus === "success"
                              ? "successbtn"
                              : sellStatus === "failed" ||
                                (chainId !== 5 && chainId !== 1)
                              ? "errorbtn"
                              : null
                          } d-flex justify-content-center align-items-center gap-2`}
                          onClick={() => {
                            chainId !== 1 && chainId !== 5
                              ? handleSwitchChain()
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
                          ) : !sellLoading && chainId !== 1 && chainId !== 5 ? (
                            "Switch Network"
                          ) : sellStatus === "sell" ? (
                            "Sell Nft"
                          ) : sellStatus === "success" ? (
                            "Success"
                          ) : sellStatus === "approve" || sellStatus === "" ? (
                            "Approve sell"
                          ) : (
                            "Failed"
                          )}
                        </button>
                      )}

                      {!isConnected && nft.price && (
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
                  data?.getPlayer?.wallet &&
                  email &&
                  coinbase &&
                  coinbase.toLowerCase() !==
                    data?.getPlayer?.wallet?.publicAddress?.toLowerCase()
                    ? "By interacting with the NFTs I understand that I am not using the wallet associated to my game profile"
                    : purchaseStatus}
                </span>
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="d-flex align-items-center flex-column nft-outer-wrapper p-4 gap-2 my-4 single-item-info">
              <div className="position-relative d-flex flex-column gap-3 px-3 col-12">
                <h3 className="traits-text">Traits</h3>
                {type === "caws" ? (
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

          <div className="px-2 mt-5">
            <div className="d-flex flex-column gap-3">
              <span className="nftactivity">NFT Activity </span>
              <table className="pastsaleTable p-2">
                <tbody>
                  <th className="saleHeader">Event</th>
                  <th className="saleHeader">Price</th>
                  <th className="saleHeader">From</th>
                  <th className="saleHeader">To</th>
                  <th className="saleHeader">Date</th>
                  <tr className="saleRow">
                    <td className="saledata">
                      {" "}
                      <img src={cart} alt="" /> Sale
                    </td>
                    <td className="saleprice">0.0218 ETH</td>
                    <td className="greendata">0xat...beef</td>
                    <td className="greendata">0x2ab...a4e2</td>
                    <td className="greendata">
                      1 day ago <img src={link} alt="" />
                    </td>
                  </tr>
                  <tr className="saleRow">
                    <td className="saledata">
                      {" "}
                      <img src={cart} alt="" /> Sale
                    </td>
                    <td className="saleprice">0.0218 ETH</td>
                    <td className="greendata">0xat...beef</td>
                    <td className="greendata">0x2ab...a4e2</td>
                    <td className="greendata">
                      1 day ago <img src={link} alt="" />
                    </td>
                  </tr>

                  <tr className="saleRow">
                    <td className="saledata">
                      {" "}
                      <img src={cart} alt="" /> Sale
                    </td>
                    <td className="saleprice">0.0218 ETH</td>
                    <td className="greendata">0xat...beef</td>
                    <td className="greendata">0x2ab...a4e2</td>
                    <td className="greendata">
                      1 day ago <img src={link} alt="" />
                    </td>
                  </tr>
                  <tr className="saleRow">
                    <td className="saledata">
                      {" "}
                      <img src={cart} alt="" /> Sale
                    </td>
                    <td className="saleprice">0.0218 ETH</td>
                    <td className="greendata">0xat...beef</td>
                    <td className="greendata">0x2ab...a4e2</td>
                    <td className="greendata">
                      1 day ago <img src={link} alt="" />
                    </td>
                  </tr>
                  <tr className="saleRow">
                    <td className="saledata">
                      {" "}
                      <img src={cart} alt="" /> Sale
                    </td>
                    <td className="saleprice">0.0218 ETH</td>
                    <td className="greendata">0xat...beef</td>
                    <td className="greendata">0x2ab...a4e2</td>
                    <td className="greendata">
                      1 day ago <img src={link} alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNft;
