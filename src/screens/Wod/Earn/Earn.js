import React, { useState, useEffect } from "react";
import "./_earn.scss";
import EarnHero from "./EarnHero/EarnHero";
import EarnContent from "./EarnContent/EarnContent";
// import useWindowSize from "../../../hooks/useWindowSize";

const Earn = ({
  isConnected,
  coinbase,
  chainId,
  handleSwitchNetwork,
  onConnectWallet,
  nftPools,
  binanceW3WProvider,
  isPremium,
}) => {
  const tokenPools = [
    {
      pair_name: "WOD",
      apy_percent: 20,
      lock_time: "30 days",
      chain: "BNB Chain",
      tokenURL: ["wodToken"],
      chainLogo: "bnbLogo.svg",
      tvl_usd: 12220,
      type: 'token',
      expired: 'No',
      id: 'one'
    },
    {
      pair_name: "WOD",
      apy_percent: 15,
      lock_time: "60 days",
      chain: "BNB Chain",
      tokenURL: ["wodToken"],
      chainLogo: "bnbLogo.svg",
      tvl_usd: 12220,
      type: 'token',
      expired: 'No',
      id: 'two'


    },
    {
      pair_name: "WOD",
      apy_percent: 5,
      lock_time: "No lock",
      chain: "Ethereum",
      tokenURL: ["wodToken"],
      chainLogo: "ethIcon.svg",
      tvl_usd: 12220,
      type: 'token',
      expired: 'No',
      id: 'three'
    },
  ];

  // const nftPools = [
  //   {
  //     tokenName: "CAWS NFT",
  //     apr: 5,
  //     locktime: "No lock",
  //     chain: "Ethereum",
  //     tokenURL: ["caws"],
  //     chainLogo: "ethIcon.svg",
  //   },
  //   {
  //     tokenName: "LAND NFT",
  //     apr: 5,
  //     locktime: "No lock",
  //     chain: "Ethereum",
  //     tokenURL: ["land"],
  //     chainLogo: "ethIcon.svg",
  //   },
  // ];

  const nftTokenPools = [
    {
      tokenName: "WOD + CAWS NFT",
      apr: 5,
      locktime: "No lock",
      chain: "Ethereum",
      tokenURL: ["wod", "caws"],
      chainLogo: "ethIcon.svg",
    },
    {
      tokenName: "WOD + LAND NFT",
      apr: 5,
      locktime: "No lock",
      chain: "Ethereum",
      tokenURL: ["wod", "land"],
      chainLogo: "ethIcon.svg",
    },
  ];

  const allPools = [...tokenPools, ...nftPools, ...nftTokenPools];

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [stakingPools, setStakingPools] = useState([...tokenPools, ...nftPools]);
  const [showPopup, setshowPopup] = useState(false);
  const [aprTooltip, setaprTooltip] = useState(false);
  const [selectedViewStyle, setselectedViewStyle] = useState("table");
  const [expired, setExpired] = useState(false);

  const handleSetPools = (poolFilter, isExpired) => {
    if (poolFilter === "All") {
      const allPools = [...tokenPools, ...nftPools]
      if (isExpired === false) {
        let poolsActive = allPools.filter((item) => {
          return item.expired === "No";
        });
        setStakingPools(poolsActive);
      } else if (isExpired === true) {
        let nftPoolsExpired = nftPools.filter((item) => {
          return item.expired === "Yes";
        });
        setStakingPools(nftPoolsExpired);
      }
    } else if (poolFilter === "WOD") {
      if (isExpired === false) {
        setStakingPools(tokenPools);
      } else if (isExpired === true) {
        setStakingPools([]);
      }
    } else if (poolFilter === "NFT") {
      if (isExpired === false) {
        let nftPoolsActive = nftPools.filter((item) => {
          return item.expired === "No";
        });
        setStakingPools(nftPoolsActive);
      } else if (isExpired === true) {
        let nftPoolsExpired = nftPools.filter((item) => {
          return item.expired === "Yes";
        });
        setStakingPools(nftPoolsExpired);
      }
    } 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Earn";
  }, []);

  useEffect(() => {
    if (nftPools && nftPools.length > 0) {
      handleSetPools("All", false);
    }
  }, [nftPools]);

  return (
    <>
      <div className="container-fluid earn-mainhero-wrapper token-wrapper px-0">
        <div className="d-flex flex-column gap-3">
          <EarnHero
           
          />
          <EarnContent
           onSelectFilter={(value, expirevalue) => {
            setSelectedFilter(value);
            handleSetPools(value, expirevalue);
          }}
          onSelectViewStyle={(value) => {
            setselectedViewStyle(value);
          }}
          onViewPastPools={(filterValue, value) => {
            setExpired(value);
            handleSetPools(filterValue, value);
          }}
            isConnected={isConnected}
            coinbase={coinbase}
            chainId={chainId}
            handleSwitchNetwork={handleSwitchNetwork}
            onConnectWallet={onConnectWallet}
            selectedFilter={selectedFilter}
            stakingPools={stakingPools}
            onPoolSelect={() => {
              setshowPopup(true);
            }}
            selectedViewStyle={selectedViewStyle}
            nftPools={nftPools}
            expired={expired}
            binanceW3WProvider={binanceW3WProvider}
            isPremium={isPremium}
          />
        </div>
      </div>
    </>
  );
};

export default Earn;
