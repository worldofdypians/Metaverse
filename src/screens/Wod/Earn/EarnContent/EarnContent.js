import React, { useEffect, useState } from "react";
import "../_earn.scss";
import arrowUp from "../assets/arrowUp.svg";
import arrowUpActive from "../assets/arrowUpActive.svg";
import arrowDown from "../assets/arrowDown.svg";
import arrowDownActive from "../assets/arrowDownActive.svg";
import wodToken from "../assets/tokens/wodToken.png";
import TopPoolsCard from "./TopPoolsCard";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import CawsDetails from "./pools/caws";
import LandDetails from "./pools/land";
import CawsWodDetails from "./pools/cawsWod";
import CawsDetailsPremium from "./pools/cawsPremium";
import LandDetailsPremium from "./pools/landPremium";
import TopPoolsListCard from "./TopPoolsListCard";
import StakeWodDetails from "./pools/stakingWod";
import StakeWodDetails2 from "./pools/stakingWod2";

const EarnContent = ({
  isConnected,
  coinbase,
  chainId,
  handleSwitchNetwork,
  onConnectWallet,
  selectedFilter,
  stakingPools,
  onPoolSelect,
  selectedViewStyle,
  expired,
  binanceW3WProvider,
  isPremium,
  onSelectFilter,
  onSelectViewStyle,
  onViewPastPools,
  onViewStakedOnlyPools,
  tvl,
  wodBalance
}) => {
  const [sorting, setSorting] = useState("");
  const [selectedPool, setselectedPool] = useState([]);
  const [filterTitle, setFilterTitle] = useState("All");
  // const [listStyle, setListStyle] = useState("table");
  const [pastPools, setpastPools] = useState(false);
  const [stakedOnly, setstakedOnly] = useState(false);
  const [isHover, setisHover] = useState(false);
  const [totalStakesLandPremium, settotalStakesLandPremium] = useState(0);
  const [totalStakesCawsPremium, settotalStakesCawsPremium] = useState(0);

  const onShowDetailsClick = (item) => {
    setselectedPool([item]);
  };

  // Handle hiding details
  const onHideDetailsClick = (item) => {
    setselectedPool((prevSelected) =>
      prevSelected.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  const getTotalStakedNfts = async () => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.LANDMINTING_ABI,
      window.config.landnft_address,
      { from: undefined }
    );

    await staking_contract.methods
      .balanceOf(window.config.nft_land_premiumstake_address)
      .call()
      .then((data) => {
        settotalStakesLandPremium(data);
      });

    let staking_contractCaws = await new window.infuraWeb3.eth.Contract(
      window.CAWS_ABI,
      window.config.nft_address
    );

    await staking_contractCaws.methods
      .balanceOf(window.config.nft_caws_premiumstake_address)
      .call()
      .then((data) => {
        settotalStakesCawsPremium(data);
      });
  };

  useEffect(() => {
    setselectedPool([]);
  }, [expired, selectedFilter]);

  useEffect(() => {
    getTotalStakedNfts();
  }, []);

  const tvlUsd = localStorage.getItem("tvl");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-5 pb-4 earncontent-bg">
      <div
        className="opacitywrapper position-relative bottom-0"
        style={{ borderBottom: "3px solid black", cursor: 'default' }}
      >
        <div className="d-flex flex-column gap-4 position-relative">
          <div className="d-flex flex-column mx-0 align-items-center justify-content-between gap-2 buy-items-all-wrapper pt-2">
            <div className="container-fluid py-3 staking-pools-bg">
              <div className="custom-container p-0">
                <div className="d-flex flex-column flex-lg-row align-items-center gap-4">
                  <div className="d-flex flex-column flex-lg-row gap-3 w-100 mx-0 align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center gap-3">
                      <div className="d-flex align-items-center gap-3">
                        {/* <div className="d-flex justify-content-start align-items-center gap-3">
                          <div
                            className={`list-style ${
                              listStyle === "table" && "list-style-active"
                            }`}
                            onClick={() => {
                              setListStyle("table");
                              onSelectViewStyle("table");
                            }}
                          >
                            <img
                              src={
                                listStyle === "table"
                                  ? tableIconActive
                                  : tableIcon
                              }
                              alt=""
                            />
                          </div>
                          <div
                            className={`list-style ${
                              listStyle === "list" && "list-style-active"
                            }`}
                            onClick={() => {
                              setListStyle("list");
                              onSelectViewStyle("list");
                            }}
                          >
                            <img
                              src={
                                listStyle === "list" ? listIconActive : listIcon
                              }
                              alt=""
                            />
                          </div>
                        </div> */}
                        <div className=" d-flex align-items-center pools-toggle-wrapper">
                          <button
                            onClick={() => {
                              setpastPools(!pastPools);
                              onViewPastPools(filterTitle, !pastPools);
                            }}
                            className={`px-4 py-2 ${
                              pastPools === false
                                ? "active-toggle"
                                : "inactive-toggle"
                            }`}
                          >
                            Live
                          </button>
                          <button
                            onClick={() => {
                              setpastPools(!pastPools);
                              onViewPastPools(filterTitle, !pastPools);
                            }}
                            className={`px-4 py-2 ${
                              pastPools === true
                                ? "active-toggle"
                                : "inactive-toggle"
                            }`}
                          >
                            Past
                          </button>
                        </div>
                      </div>
                      {/* <div className=" d-flex justify-content-end align-items-center gap-1 gap-lg-3">
                        <div
                          className={`pill-box ${
                            stakedOnly && "pill-box-active"
                          }`}
                          onClick={() => {
                            setstakedOnly(!stakedOnly);
                            onViewStakedOnlyPools(
                              filterTitle,
                              pastPools,
                              stakedOnly
                            );
                          }}
                        >
                          <div className="pill"></div>
                        </div>
                        <h5 className="text-white inactive-pools m-0">
                          Staked only
                        </h5>
                      </div> */}
                    </div>
                    {isConnected && (
                      <div className="pools-toggle-wrapper py-2 px-3">
                        <div className="d-flex align-items-center gap-2">
                          <span
                            className="tvl-earn-title "
                            style={{ color: "#c0c9ff" }}
                          >
                            My Balance:
                          </span>
                          <span
                            className="tvl-earn-title d-flex align-items-center gap-2"
                            style={{ color: "#4ed5d2" }}
                          >
                            <img
                              src={wodToken}
                              alt=""
                              style={{ width: 20, height: 20 }}
                            />
                            {getFormattedNumber(wodBalance)}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* <div className="d-flex flex-column flex-lg-row flex-md-row align-items-center gap-3">
                      <div className=" d-flex align-items-center pools-toggle-wrapper">
                        <button
                          onClick={() => {
                            setFilterTitle("All");
                            onSelectFilter("All", pastPools);
                          }}
                          className={`px-4 py-2 ${
                            filterTitle === "All"
                              ? "active-toggle"
                              : "inactive-toggle"
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => {
                            setFilterTitle("WOD");
                            onSelectFilter("WOD", pastPools);
                          }}
                          className={`px-4 py-2 ${
                            filterTitle === "WOD"
                              ? "active-toggle"
                              : "inactive-toggle"
                          }`}
                        >
                          WOD
                        </button>
                        <button
                          onClick={() => {
                            setFilterTitle("NFT");
                            onSelectFilter("NFT", pastPools);
                          }}
                          className={`px-4 py-2 ${
                            filterTitle === "NFT"
                              ? "active-toggle"
                              : "inactive-toggle"
                          }`}
                        >
                          NFTs
                        </button>
                      </div>
                      <div className="tvl-earn-wrapper py-2 px-4">
                        <div className="d-flex align-items-center gap-2">
                          <span className="tvl-earn-title">TVL</span>
                          <span className="tvl-earn-amount">${getFormattedNumber(tvlUsd)}</span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-container  mt-5 tokenomicsTablewrapper">
        <div className="d-flex flex-column gap-2 w-100 px-2 px-lg-0">
          {/* <span className="earn-filter-title mt-0 mt-lg-4">{selectedFilter}</span> */}
          {stakingPools && stakingPools.length === 0 && (
            <div className=" flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center gap-2">
                <h6 className="upcoming-stake">Staking pools are coming...</h6>
                <span className="upcoming-stake-desc">Check back soon!</span>
              </div>
            </div>
          )}

          {selectedViewStyle === "list" &&
            stakingPools &&
            stakingPools.length > 0 && (
              <div className="row mx-0 justify-content-between align-items-center px-2 py-2 w-100 options-container">
                <table className="earnother-table">
                  <thead className="d-flex w-100 align-items-center justify-content-between justify-content-lg-around">
                    <th className="earnother-th col-lg-2">
                      <div className="d-flex justify-content-start w-75">
                        Pool
                      </div>
                    </th>
                    <th
                      className="earnother-th col-lg-2 d-flex justify-content-center gap-1 align-items-center arrowBtns"
                      // onClick={handleSorting}
                    >
                      APR
                      <div className="d-flex flex-column">
                        <img
                          src={sorting === true ? arrowUpActive : arrowUp}
                          alt=""
                          className=""
                        />
                        <img
                          src={sorting === false ? arrowDownActive : arrowDown}
                          alt=""
                          className="arrowBtns"
                          onClick={() => {
                            // setSorting("lth");
                          }}
                        />
                      </div>
                    </th>
                    <th className="earnother-th col-lg-2">Locktime</th>
                    <th className="earnother-th col-lg-2">Chain</th>
                    <th className="earnother-th col-lg-2">
                      <div className="d-flex justify-content-end w-75">
                        Action
                      </div>
                    </th>
                  </thead>
                </table>
              </div>
            )}
          <div
            className={
              selectedViewStyle === "table"
                ? "accordion top-picks-container"
                : "d-none"
            }
          >
            {selectedViewStyle === "table" &&
              stakingPools &&
              stakingPools.length > 0 &&
              stakingPools.map((item, index) => {
                return (
                  <div
                    className="accordion-item border-0 bg-transparent"
                    key={index}
                  >
                    <div
                      className="accordion-header position-relative"
                      id="headingOne"
                      style={{ zIndex: "2" }}
                    >
                      <button
                        className="accordion-button shadow-none p-0 bg-transparent d-flex flex-column position-relative"
                        type="button"
                        // data-bs-toggle="collapse"
                        // // data-bs-target={`#${"collapse" }`}
                        aria-expanded="true"
                        // aria-controls={"collapse"}
                        onMouseEnter={() => {
                          setisHover(index);
                        }}
                        onMouseLeave={() => {
                          setisHover();
                        }}
                      >
                        <TopPoolsCard
                          key={index}
                          chain={chainId}
                          top_pick={false}
                          tokenName={item.pair_name}
                          apr={item.apy_percent + "%"}
                          tvl={` ${
                            item.type === "nft" ? "$" : ""
                          }${getFormattedNumber(item.tvl_usd, 0)} ${
                            item.type !== "nft" ? " WOD" : ""
                          }`}
                          lockTime={item.lock_time ? item.lock_time : "No Lock"}
                          tokenLogo={
                            item.tokenURL
                              ? item.tokenURL
                              : item.pair_name === "WoD + CAWS"
                              ? ["caws", "wod"]
                              : item.pair_name === "Genesis Land"
                              ? ["wod"]
                              : [item.pair_name?.toLowerCase()]
                          }
                          availableQuota={
                            item.type === "token"
                              ? "TBA"
                              : item.expired === "Yes"
                              ? "--"
                              : item.pair_name === "Genesis Land"
                              ? 100 - totalStakesLandPremium
                              : 200 - totalStakesCawsPremium
                          }
                          onShowDetailsClick={() => {
                            onShowDetailsClick(item);
                          }}
                          onHideDetailsClick={() => {
                            onHideDetailsClick(item);
                          }}
                          cardType={"table"}
                          details={
                            selectedPool.find((obj) => {
                              return (
                                obj.id.toLowerCase() === item.id.toLowerCase()
                              );
                            })
                              ? true
                              : false
                          }
                          isNewPool={item.new_pool === "Yes" ? true : false}
                          isStaked={false}
                          isAccount={true}
                          expired={item.expired === "Yes" ? true : false}
                          isHover={isHover === index}
                        />
                      </button>
                    </div>
                    <div
                      // id={"collapse"}
                      className={`accordion-collapse show`}
                      // aria-labelledby={"collapsed"}
                      data-bs-parent="#accordionExample"
                      style={{ zIndex: "1" }}
                    >
                      <div
                        className={`${
                          isHover === index ||
                          selectedPool.find((obj) => {
                            return (
                              obj.id.toLowerCase() === item.id.toLowerCase()
                            );
                          }) !== undefined
                            ? "accHeaderBorder"
                            : "accHeaderBorder2"
                        } px-0 py-0 text-white position-relative`}
                        style={{
                          background: expired ? "#403E6B" : "#242556",
                          borderBottomRightRadius: "12px",
                          borderBottomLeftRadius: "12px",
                        }}
                        onMouseEnter={() => {
                          setisHover(index);
                        }}
                        onMouseLeave={() => {
                          setisHover();
                        }}
                      >
                        {item?.id ===
                          "0xee425bbbec5e9bf4a59a1c19efff522ad8b7a47a" && (
                          <div
                            onClick={() => {
                              isHover !== undefined
                                ? onShowDetailsClick(item)
                                : onHideDetailsClick(item);
                            }}
                          >
                            <CawsDetails
                              coinbase={coinbase}
                              isConnected={isConnected}
                              chainId={chainId?.toString()}
                              handleConnection={onConnectWallet}
                              expired={true}
                              binanceW3WProvider={binanceW3WProvider}
                              handleSwitchNetwork={handleSwitchNetwork}
                              listType={selectedViewStyle}
                              tvl_usd={
                                selectedPool.find((obj) => {
                                  return (
                                    obj.id.toLowerCase() ===
                                    item.id.toLowerCase()
                                  );
                                })?.tvl_usd
                              }
                            />
                          </div>
                        )}

                        {item?.id ===
                          "0x6821710B0D6E9e10ACfd8433aD023f874ed782F1" && (
                          <div
                            onClick={() => {
                              isHover !== undefined
                                ? onShowDetailsClick(item)
                                : onHideDetailsClick(item);
                            }}
                          >
                            <LandDetails
                              coinbase={coinbase}
                              isConnected={isConnected}
                              chainId={chainId?.toString()}
                              handleConnection={onConnectWallet}
                              expired={true}
                              binanceW3WProvider={binanceW3WProvider}
                              handleSwitchNetwork={handleSwitchNetwork}
                              listType={selectedViewStyle}
                              tvl_usd={
                                selectedPool.find((obj) => {
                                  return (
                                    obj.id.toLowerCase() ===
                                    item.id.toLowerCase()
                                  );
                                })?.tvl_usd
                              }
                            />
                          </div>
                        )}

                        {item?.id ===
                          "0xD324A03BF17Eee8D34A8843D094a76FF8f561e38" && (
                          <div
                            onClick={() => {
                              isHover !== undefined
                                ? onShowDetailsClick(item)
                                : onHideDetailsClick(item);
                            }}
                          >
                            <CawsWodDetails
                              coinbase={coinbase}
                              isConnected={isConnected}
                              chainId={chainId?.toString()}
                              handleConnection={onConnectWallet}
                              expired={true}
                              binanceW3WProvider={binanceW3WProvider}
                              handleSwitchNetwork={handleSwitchNetwork}
                              listType={selectedViewStyle}
                              tvl_usd={
                                selectedPool.find((obj) => {
                                  return (
                                    obj.id.toLowerCase() ===
                                    item.id.toLowerCase()
                                  );
                                })?.tvl_usd
                              }
                            />
                          </div>
                        )}
                        {item?.id ===
                          "0x097bB1679AC734E90907Ff4173bA966c694428Fc" && (
                          <div
                            onClick={() => {
                              isHover !== undefined
                                ? onShowDetailsClick(item)
                                : onHideDetailsClick(item);
                            }}
                          >
                            <CawsDetailsPremium
                              coinbase={coinbase}
                              isConnected={isConnected}
                              chainId={chainId?.toString()}
                              handleConnection={onConnectWallet}
                              expired={false}
                              binanceW3WProvider={binanceW3WProvider}
                              handleSwitchNetwork={handleSwitchNetwork}
                              isPremium={isPremium}
                              listType={selectedViewStyle}
                              tvl_usd={
                                selectedPool.find((obj) => {
                                  return (
                                    obj.id.toLowerCase() ===
                                    item.id.toLowerCase()
                                  );
                                })?.tvl_usd
                              }
                            />
                          </div>
                        )}

                        {item?.id ===
                          "0x3E0c0443A6a5382B2Ef20ECfe3bdbE84F1436523" && (
                          <div
                            onClick={() => {
                              isHover !== undefined
                                ? onShowDetailsClick(item)
                                : onHideDetailsClick(item);
                            }}
                          >
                            <LandDetailsPremium
                              coinbase={coinbase}
                              isConnected={isConnected}
                              chainId={chainId?.toString()}
                              handleConnection={onConnectWallet}
                              expired={false}
                              binanceW3WProvider={binanceW3WProvider}
                              handleSwitchNetwork={handleSwitchNetwork}
                              isPremium={isPremium}
                              listType={selectedViewStyle}
                              tvl_usd={
                                selectedPool.find((obj) => {
                                  return (
                                    obj.id.toLowerCase() ===
                                    item.id.toLowerCase()
                                  );
                                })?.tvl_usd
                              }
                            />
                          </div>
                        )}

                        {(item?.id === "one" || item?.id === "three") && (
                          <div
                            onClick={() => {
                              isHover !== undefined
                                ? onShowDetailsClick(item)
                                : onHideDetailsClick(item);
                            }}
                          >
                            <StakeWodDetails
                              coinbase={coinbase}
                              isConnected={isConnected}
                              chainId={chainId?.toString()}
                              handleConnection={onConnectWallet}
                              expired={false}
                              staking={window.constant_staking_wod}
                              apr={20}
                              expiration_time={"07 Jun 2025"}
                              poolCap={1000000}
                              start_date={"28 Nov 2024"}
                              fee={0}
                              binanceW3WProvider={binanceW3WProvider}
                              handleSwitchNetwork={handleSwitchNetwork}
                              listType={selectedViewStyle}
                              lockTime={"30 days"}
                            />
                          </div>
                        )}

                        {item?.id === "two" && (
                          <div
                            onClick={() => {
                              isHover !== undefined
                                ? onShowDetailsClick(item)
                                : onHideDetailsClick(item);
                            }}
                          >
                            <StakeWodDetails2
                              coinbase={coinbase}
                              isConnected={isConnected}
                              chainId={chainId?.toString()}
                              handleConnection={onConnectWallet}
                              expired={false}
                              staking={window.constant_staking_wod}
                              apr={20}
                              expiration_time={"07 Jun 2025"}
                              poolCap={1000000}
                              start_date={"28 Nov 2024"}
                              fee={0}
                              binanceW3WProvider={binanceW3WProvider}
                              handleSwitchNetwork={handleSwitchNetwork}
                              listType={selectedViewStyle}
                              lockTime={"30 days"}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* {selectedViewStyle === "list" &&
            stakingPools &&
            stakingPools.length > 0 &&
            stakingPools.map((item, index) => {
              return (
                <div
                  className="accordion-item border-0 bg-transparent"
                  key={index}
                >
                  <div
                    className="accordion-header position-relative"
                    id="headingOne"
                    style={{ zIndex: "2" }}
                  >
                    <button
                      className="accordion-button shadow-none p-0 bg-transparent collapsed d-flex flex-column position-relative "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${"collapse" + index}`}
                      aria-expanded="true"
                      aria-controls={"collapse" + index}
                    >
                      <TopPoolsListCard
                        chain={chainId}
                        top_pick={false}
                        tokenName={item.pair_name}
                        apr={item.apy_percent + "%"}
                        tvl={"$" + getFormattedNumber(item.tvl_usd)}
                        lockTime={item.lock_time ? item.lock_time : "No Lock"}
                        tokenLogo={
                          item.tokenURL
                            ? item.tokenURL
                            : item.pair_name === "WoD + CAWS"
                            ? ["caws", "wod"]
                            : item.pair_name === "Genesis Land"
                            ? ["wod"]
                            : [item.pair_name?.toLowerCase()]
                        }
                        onShowDetailsClick={() => {}}
                        onHideDetailsClick={() => {}}
                        cardType={"table"}
                        details={false}
                        isNewPool={item.new_pool === "Yes" ? true : false}
                        isStaked={false}
                        isAccount={true}
                        expired={item.expired === "Yes" ? true : false}
                      />
                    </button>
                  </div>
                  <div
                    id={"collapse" + index}
                    className="accordion-collapse collapse"
                    aria-labelledby={"collapsed" + index}
                    data-bs-parent="#accordionExample"
                    style={{ zIndex: "1" }}
                  >
                    <div
                      className="accordion-body px-2 text-white position-relative"
                      style={{
                        background: expired ? "#403E6B" : "#1e1c40",
                        top: "-10px",
                        border: "2px solid #00B7CC",
                      }}
                    >
                      {item?.id ===
                        "0xee425bbbec5e9bf4a59a1c19efff522ad8b7a47a" && (
                        <CawsDetails
                          coinbase={coinbase}
                          isConnected={isConnected}
                          chainId={chainId?.toString()}
                          handleConnection={onConnectWallet}
                          expired={true}
                          binanceW3WProvider={binanceW3WProvider}
                          handleSwitchNetwork={handleSwitchNetwork}
                          listType={selectedViewStyle}
                        />
                      )}

                      {item?.id ===
                        "0x6821710B0D6E9e10ACfd8433aD023f874ed782F1" && (
                        <LandDetails
                          coinbase={coinbase}
                          isConnected={isConnected}
                          chainId={chainId?.toString()}
                          handleConnection={onConnectWallet}
                          expired={true}
                          binanceW3WProvider={binanceW3WProvider}
                          handleSwitchNetwork={handleSwitchNetwork}
                          listType={selectedViewStyle}
                        />
                      )}

                      {item?.id ===
                        "0xD324A03BF17Eee8D34A8843D094a76FF8f561e38" && (
                        <CawsWodDetails
                          coinbase={coinbase}
                          isConnected={isConnected}
                          chainId={chainId?.toString()}
                          handleConnection={onConnectWallet}
                          expired={true}
                          binanceW3WProvider={binanceW3WProvider}
                          handleSwitchNetwork={handleSwitchNetwork}
                          listType={selectedViewStyle}
                        />
                      )}
                      {item?.id ===
                        "0x097bB1679AC734E90907Ff4173bA966c694428Fc" && (
                        <CawsDetailsPremium
                          coinbase={coinbase}
                          isConnected={isConnected}
                          chainId={chainId?.toString()}
                          handleConnection={onConnectWallet}
                          expired={false}
                          binanceW3WProvider={binanceW3WProvider}
                          handleSwitchNetwork={handleSwitchNetwork}
                          isPremium={isPremium}
                          listType={selectedViewStyle}
                        />
                      )}

                      {item?.id ===
                        "0x3E0c0443A6a5382B2Ef20ECfe3bdbE84F1436523" && (
                        <LandDetailsPremium
                          coinbase={coinbase}
                          isConnected={isConnected}
                          chainId={chainId?.toString()}
                          handleConnection={onConnectWallet}
                          expired={false}
                          binanceW3WProvider={binanceW3WProvider}
                          handleSwitchNetwork={handleSwitchNetwork}
                          isPremium={isPremium}
                          listType={selectedViewStyle}
                        />
                      )}

                      {(item?.id === "one" ||
                        item?.id === "two" ||
                        item?.id === "three") && (
                        <StakeWodDetails
                          coinbase={coinbase}
                          isConnected={isConnected}
                          chainId={chainId?.toString()}
                          handleConnection={onConnectWallet}
                          expired={false}
                          staking={window.constant_staking_wod}
                          apr={20}
                          expiration_time={"07 Jun 2025"}
                          poolCap={1000000}
                          start_date={"28 Nov 2024"}
                          fee={0}
                          binanceW3WProvider={binanceW3WProvider}
                          handleSwitchNetwork={handleSwitchNetwork}
                          listType={selectedViewStyle}
                          lockTime={"30 days"}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export default EarnContent;
