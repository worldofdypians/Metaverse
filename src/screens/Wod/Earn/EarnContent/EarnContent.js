import React, { useState } from "react";
import "../_earn.scss";
import arrowUp from "../assets/arrowUp.svg";
import arrowUpActive from "../assets/arrowUpActive.svg";
import arrowDown from "../assets/arrowDown.svg";
import arrowDownActive from "../assets/arrowDownActive.svg";

import TopPoolsCard from "./TopPoolsCard";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import CawsDetails from "./pools/caws";
import LandDetails from "./pools/land";
import CawsWodDetails from "./pools/cawsWod";
import CawsDetailsPremium from "./pools/cawsPremium";
import LandDetailsPremium from "./pools/landPremium";
import TopPoolsListCard from "./TopPoolsListCard";

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
}) => {
  const [sorting, setSorting] = useState("");
  const [selectedPool, setselectedPool] = useState([]);

  const onShowDetailsClick = (item) => {
    setselectedPool((prevSelected) => [...prevSelected, item]);
  };

  // Handle hiding details
  const onHideDetailsClick = (item) => {
    setselectedPool((prevSelected) =>
      prevSelected.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-5 py-4 earncontent-bg">
      <div className="custom-container  mt-5 mt-lg-0 tokenomicsTablewrapper">
        <div className="d-flex flex-column gap-2 w-100 px-2">
          <span className="earn-filter-title">{selectedFilter}</span>
          {stakingPools && stakingPools.length === 0 && (
            <div className="new-stake-info-wrapper flex-column flex-lg-row gap-3 gap-lg-0 p-5 d-flex align-items-center justify-content-center">
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
                        className="accordion-button shadow-none p-0 bg-transparent collapsed d-flex flex-column position-relative "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${"collapse" + index}`}
                        aria-expanded="true"
                        aria-controls={"collapse" + index}
                      >
                        <TopPoolsCard
                          key={index}
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
                              : [item.pair_name?.toLowerCase()]
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
                          background: expired ? "#565891" : "#1e1c40",
                          top: "-10px",
                          border: "2px solid #7770df",
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
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {selectedViewStyle === "list" &&
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
                        background: expired ? "#565891" : "#1e1c40",
                        top: "-10px",
                        border: "2px solid #7770df",
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
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default EarnContent;
