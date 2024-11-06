import React, { useState } from "react";
import "./_tokenomics.scss";
import chart from "../assets/dyp-chart2.svg";
import copy from "../assets/copy.svg";
import check from "../assets/check.svg";
import Clipboard from "react-clipboard.js";
import copyIcon from "../assets/copyIcon.svg";
import tokenomicsChart from "../assets/tokenomicsChart.svg";
import { shortAddress } from "../../Caws/functions/shortAddress";
import useWindowSize from "../../../hooks/useWindowSize";
import bnb from "../../../components/Header/assets/bnb.svg";

const Tokenomics = () => {
  const [tooltip, setTooltip] = useState(false);

  const tokenomicsData = [
    {
      category: "Seed",
      tokens: "80,000,000",
      allocation: 8,
      tge: 4,
      cliff: 6,
      vesting: 19,
      color: "#8303AE",
    },
    {
      category: "Private",
      tokens: "85,000,000",
      allocation: 8.5,

      tge: 6,
      cliff: 3,
      vesting: 16,
      color: "#D83EE0",
    },
    {
      category: "KOL",
      tokens: "15,000,000",
      allocation: 1.5,

      tge: 15,
      cliff: 1,
      vesting: 8,
      color: "#F3A8E2",
    },
    {
      category: "Public",
      tokens: "20,000,000",
      allocation: 2,

      tge: 20,
      cliff: 0,
      vesting: 6,
      color: "#34609E",
    },
    {
      category: "Team",
      tokens: "120,000,000",
      allocation: 12,

      tge: 0,
      cliff: 12,
      vesting: 36,
      color: "#B711AE",
    },
    {
      category: "Advisors",
      tokens: "50,000,000",
      allocation: 5,

      tge: 0,
      cliff: 9,
      vesting: 30,
      color: "#5690FF",
    },
    {
      category: "Community",
      tokens: "300,000,000",
      allocation: 30,

      tge: 2,
      cliff: 0,
      vesting: 48,
      color: "#8303AE",
    },
    {
      category: "Ecosystem",
      tokens: "250,000,000",
      allocation: 25,

      tge: 0,
      cliff: 1,
      vesting: 36,
      color: "#6A07C7",
    },
    {
      category: "Liquidity",
      tokens: "80,000,000",
      allocation: 8,

      tge: 50,
      cliff: 0,
      vesting: 3,
      color: "#5A8BFF",
    },
  ];

  const windowSize = useWindowSize();

  return (
    <div
      className="d-flex  flex-column align-items-center gap-4"
      id="tokenomics"
    >
      <div className="custom-container  d-flex flex-column w-100 gap-3">
        <h4
          className="explorer-grid-title font-montserrat text-start mb-0"
        >
          WoD Tokenomics
        </h4>
        <span className="tokenomics-wrapper-desc">
          The total token supply is 1B $WOD and is designed to fuel the World of
          Dypians ecosystem and help it grow.
        </span>
      </div>
      <div className="w-100 px-lg-5 py-5 d-flex justify-content-center new-tokenomics-bg">
        <div className="custom-container w-100">
          <div className="row mx-0 align-items-end">
            <div className="col-12 col-lg-6 tablesalewrapper h-100">
              <div className="tokenomicsTablewrapper">
                <div className="row mx-0 mb-1 flex-nowrap">
                  <div className="col-2 d-flex justify-content-start">
                    <h6 className="tokenomics-table-title mb-0">CATEGORY</h6>
                  </div>
                  <div className="col-2 d-flex justify-content-center">
                    <h6 className="tokenomics-table-title mb-0">ALLOCATION</h6>
                  </div>
                  <div className="col-2 d-flex justify-content-center">
                    <h6 className="tokenomics-table-title mb-0">TOKENS</h6>
                  </div>
                  <div className="col-2 d-flex justify-content-lg-center justify-content-end">
                    <h6 className="tokenomics-table-title mb-0">
                      CLIFF {windowSize.width > 767 && "(MONTHS)"}
                    </h6>
                  </div>
                  <div className="col-2 d-flex justify-content-center">
                    <h6 className="tokenomics-table-title mb-0">
                      VESTING {windowSize.width > 767 && "(MONTHS)"}
                    </h6>
                  </div>
                  <div className="col-2 d-flex justify-content-center">
                    <h6 className="tokenomics-table-title mb-0">
                      UNLOCKED TGE
                    </h6>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1">
                  {tokenomicsData.map((item, index) => (
                    <div
                      className="tokenomics-table-row mx-0 row d-flex align-items-center justify-content-between justify-content-lg-center p-2"
                      key={index}
                    >
                      <h6 className="tokenomics-table-head d-flex align-items-center gap-lg-2 gap-1 col-2 mb-0">
                        <div
                          className="tokenomics-dot"
                          style={{ background: item.color }}
                        ></div>
                        {item.category}
                      </h6>
                      <h6 className="tokenomics-table-item col-2 mb-0">
                        {item.allocation}%
                      </h6>
                      <h6 className="tokenomics-table-item col-2 mb-0">
                        {item.tokens}
                      </h6>
                      <h6 className="tokenomics-table-item col-2 mb-0 text-end text-lg-center">
                        {item.cliff}
                      </h6>
                      <h6 className="tokenomics-table-item col-2 mb-0">
                        {item.vesting}
                      </h6>
                      <h6 className="tokenomics-table-item col-2 mb-0">
                        {item.tge}%
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              <div className="d-flex flex-column align-items-center align-items-lg-end gap-2">
                <div className="d-flex align-items-center gap-2">
                  <img src={bnb} alt="" />
                  <div className="d-flex flex-column">
                    <span className="wod-copy-span">WOD Contract Address</span>
                    <div className="d-flex align-items-center gap-2">
                      <a
                        href="https://bscscan.com/token/0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8"
                        target="_blank"
                        className="wod-address"
                      >
                        {windowSize.width > 991
                          ? "0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8"
                          : shortAddress(
                              "0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8"
                            )}
                      </a>
                      <Clipboard
                        component="div"
                        data-event="click"
                        data-tip="Copied To Clipboard!"
                        data-clipboard-text={
                          "0xb994882a1b9bd98A71Dd6ea5F61577c42848B0E8"
                        }
                        className="wallet-wrapper p-0 d-flex align-items-center gap-2 position-relative"
                      >
                        <span
                          className="menuitem2"
                          onClick={() => {
                            setTooltip(true);
                            setTimeout(() => setTooltip(false), 2000);
                          }}
                        >
                          <img src={tooltip ? check : copy} alt="" />{" "}
                        </span>
                      </Clipboard>
                    </div>
                  </div>
                </div>
                <div className="wod-chart-wrapper w-100 d-flex justify-content-center align-items-center ">
                  <img
                    src={tokenomicsChart}
                    alt=""
                    className="tokenomics-chart"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="py-5 mint-wrappernew container-fluid justify-content-center position-relative d-flex align-items-center">
    //   <div className="custom-container w-100">
    //     <h4 className="main-hero-title font-montserrat text-center mb-3">
    //       WoD{" "}
    //       <mark className="font-montserrat main-hero-title explore-tag pe-2">
    //         Tokenomics
    //       </mark>
    //     </h4>
    //     <div className="p-2 tokenomics-table-wrapper">
    //       <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
    //         <div className="d-flex flex-column gap-2">
    //           <div className="d-flex flex-column gap-2 align-items-start">
    //             <span className="token-sc-text marketplace-desc text-start">
    //               WOD Contract Address:
    //             </span>
    //             <div className="d-flex align-items-center gap-2">
    //               <a
    //                 href="https://etherscan.io/token/0x39b46b212bdf15b42b166779b9d1787a68b9d0c3"
    //                 target="_blank"
    //                 rel="noreferrer"
    //                 className="token-sc-link"
    //               >
    //                 0x39b46b212bdf15b42b166779b9d1787a68b9d0c3
    //               </a>
    //               <Clipboard
    //                 component="div"
    //                 data-event="click"
    //                 data-tip="Copied To Clipboard!"
    //                 data-clipboard-text={
    //                   "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3"
    //                 }
    //                 className="wallet-wrapper p-0 d-flex align-items-center gap-2 position-relative"
    //               >
    //                 <span
    //                   className="menuitem2"
    //                   onClick={() => {
    //                     setTooltip(true);
    //                     setTimeout(() => setTooltip(false), 2000);
    //                   }}
    //                 >
    //                   <img src={tooltip ? check : copy} alt="" />{" "}
    //                   {tooltip ? "Copied" : "Copy"}
    //                 </span>
    //               </Clipboard>
    //             </div>
    //           </div>
    //           <div className="allocation-wrapper p-2 col-lg-7">
    //             <span className="marketplace-desc text-secondary">
    //               30,000,000 WOD have been minted at Genesis and will become
    //               accessible over the course of 2 years. The 2-year allocation
    //               is as follows:
    //             </span>
    //           </div>
    //           <div className="d-flex flex-column gap-2">
    //             <span className="circulating-supply-title text-start">
    //               Community
    //             </span>

    //             <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
    //               <div className="d-flex flex-column gap-2">
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">
    //                     Distributed for pool rewards over the next 12 months
    //                   </span>
    //                   <span className="marketplace-desc text-start">
    //                     12,000,000.00 WOD
    //                   </span>
    //                 </div>
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">
    //                     Distributed to Avalanche Chain
    //                   </span>
    //                   <span className="marketplace-desc text-start">
    //                     12,000,000.00 WOD
    //                   </span>
    //                 </div>
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">
    //                     Locked for one year to Uniswap liquidity on token launch
    //                   </span>
    //                   <span className="marketplace-desc text-start">
    //                     200,000.00 WOD
    //                   </span>
    //                 </div>
    //               </div>
    //               <div className="d-flex flex-column gap-2">
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">
    //                     Distributed to BNB Chain
    //                   </span>
    //                   <span className="marketplace-desc text-start">
    //                     12,000,000.00 WOD
    //                   </span>
    //                 </div>
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">
    //                     Distributed for providing liquidity to CEX and Marketing
    //                   </span>
    //                   <span className="marketplace-desc text-start">
    //                     12,000,000.00 WOD
    //                   </span>
    //                 </div>
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">
    //                     Reserved for other pools or chains
    //                   </span>
    //                   <span className="marketplace-desc text-start">
    //                     200,000.00 WOD
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="d-flex flex-column gap-2">
    //             <span className="circulating-supply-title text-start">
    //               Users
    //             </span>
    //             <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
    //               <div className="d-flex flex-column gap-2 w-100">
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">Public Sale</span>
    //                   <span className="marketplace-desc text-start">
    //                     12,000,000.00 WOD
    //                   </span>
    //                 </div>
    //               </div>
    //               <div className="d-flex flex-column gap-2 w-100">
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">Burned</span>
    //                   <span className="marketplace-desc text-start">
    //                     12,000,000.00 WOD
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="d-flex flex-column gap-2">
    //             <span className="circulating-supply-title text-start">
    //               Team
    //             </span>
    //             <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
    //               <div className="d-flex flex-column gap-2">
    //                 <div className="d-flex flex-column gap-1">
    //                   <span className="text-muted text-start">
    //                     Vested for 24 months, released monthly
    //                   </span>
    //                   <span className="marketplace-desc text-start">
    //                     12,000,000.00 WOD
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="d-flex flex-column justify-content-between align-items-center gap-3">
    //           <div className="circulating-supply-wrapper p-3">
    //             <div className="d-flex flex-column gap-2 align-items-center">
    //               <span className="circulating-supply-title">
    //                 Circulating supply
    //               </span>
    //               <span className="circulating-supply-amount">
    //                 19,367,163.739875 WOD
    //               </span>
    //             </div>
    //           </div>
    //           <img src={chart} alt="" />
    //           <div className="circulating-supply-wrapper p-2">
    //             <span className="circulating-supply-title d-flex justify-content-center">
    //               No additional tokens can be minted
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Tokenomics;
