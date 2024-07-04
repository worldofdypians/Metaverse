import React, { useState } from "react";
import StakingWod from "../stakingpools/StakingWod";
import stakingIcon from "../assets/stakingIcon.svg";
import farmingIcon from "../assets/farmingIcon.svg";
import moreinfo from "../assets/more-info.svg";
import { ClickAwayListener } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import "../_earn.scss";
import arrowUp from "../assets/arrowUp.svg";
import arrowUpActive from "../assets/arrowUpActive.svg";
import arrowDown from "../assets/arrowDown.svg";
import arrowDownActive from "../assets/arrowDownActive.svg";

const EarnContent = ({
  isConnected,
  coinbase,
  chainId,
  handleSwitchNetwork,
  onConnectWallet,
  selectedFilter,
  stakingPools,
  onPoolSelect,
}) => {
  const [sorting, setSorting] = useState("");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mb-5 py-4 earncontent-bg">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column gap-2 w-100 px-2">
          <span className="earn-filter-title">{selectedFilter}</span>
          <div className="row mx-0 justify-content-between align-items-center px-2 py-2 w-100 options-container">
            <table className="earnother-table">
              <thead className="d-flex w-100 align-items-center justify-content-around">
                <th className="earnother-th col-2">
                  <div className="d-flex justify-content-center w-75">Pool</div>
                </th>
                <th
                  className="earnother-th col-2 d-flex justify-content-center gap-1 align-items-center arrowBtns"
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
                        console.log("down");
                        // setSorting("lth");
                      }}
                    />
                  </div>
                </th>
                <th className="earnother-th col-2">Locktime</th>
                <th className="earnother-th col-2">Chain</th>
                <th className="earnother-th col-2">Action</th>
              </thead>
            </table>
          </div>
          {stakingPools &&
            stakingPools.length > 0 &&
            stakingPools.map((item, index) => {
              return (
                <div
                  className="p-3 staking-wrapper"
                  key={index}
                  onClick={onPoolSelect}
                >
                  <table className="earnother-table w-100">
                    <tbody>
                      <tr className="d-flex w-100 align-items-center justify-content-between">
                        <td className="earnother-td col-2">
                          <div
                            className={`col-12 d-flex align-items-center gap-2 justify-content-start`}
                          >
                            {item.tokenURL.map((obj, index2) => {
                              return (
                                <img
                                  src={require(`../assets/tokens/${obj}.png`)}
                                  style={{ width: 36, height: 36 }}
                                  alt=""
                                  key={index2}
                                  className="pool-coins"
                                />
                              );
                            })}

                            <h5
                              className="text-white m-0"
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              {item.tokenName}
                            </h5>
                          </div>
                        </td>
                        <td className="earnother-td col-2">
                          <div className="d-flex align-items-center gap-2">
                            <h5
                              style={{
                                fontSize: "16px",
                                fontWeight: "300",
                                color: "#F7F7FC",
                              }}
                              className="m-0"
                            >
                              {item.apr}%
                            </h5>
                          </div>
                        </td>

                        <td className="earnother-td col-2">
                          <h5
                            style={{
                              fontSize: "16px",
                              fontWeight: "300",
                              color: "#F7F7FC",
                            }}
                            className="m-0"
                          >
                            {item.locktime}
                          </h5>
                        </td>
                        <td className="earnother-td col-2">
                          <h5
                            className="text-white d-flex align-items-center gap-1 m-0"
                            style={{
                              fontSize: "12px",
                              fontWeight: "300",
                              color: "#F7F7FC",
                            }}
                          >
                            <img
                              src={require(`../assets/tokens/${item.chainLogo}`)}
                              width={24}
                              height={24}
                              alt=""
                            />
                            {item.chain}
                          </h5>
                        </td>
                        <td className="earnother-td col-2 justify-content-end">
                          <h6 className="details-text2 py-2 gap-1 d-flex align-items-center w-75 cursor-pointer justify-content-center m-0">
                            Stake
                          </h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default EarnContent;
