import { useState } from "react";
import "./_tokenomics.scss";

import Clipboard from "react-clipboard.js";
import { shortAddress } from "../../Caws/functions/shortAddress";
import useWindowSize from "../../../hooks/useWindowSize";
import Reserve from "../../Reserve/Reserve";

const Tokenomics = ({ wodPrice }) => {
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
      className="d-flex  flex-column align-items-center mt-4"
      id="tokenomics"
    >
      <div className="custom-container  d-flex flex-column w-100 gap-3 ">
        <h4 className="explorer-grid-title font-montserrat text-start mb-0">
          WOD Tokenomics
        </h4>
        <span className="tokenomics-wrapper-desc">
          The total token supply is 1B $WOD and is designed to fuel the World of
          Dypians ecosystem and help it grow.
        </span>
      </div>
      <div className="w-100  py-5 d-flex justify-content-center new-tokenomics-bg">
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
                  <img
                    src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                    alt=""
                  />
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
                          <img
                            src={
                              tooltip
                                ? "https://cdn.worldofdypians.com/wod/check.svg"
                                : "https://cdn.worldofdypians.com/wod/copy.svg"
                            }
                            alt=""
                          />{" "}
                        </span>
                      </Clipboard>
                    </div>
                  </div>
                </div>
                <div className="wod-chart-wrapper w-100 d-flex justify-content-center align-items-center ">
                  <img
                    src={
                      "https://cdn.worldofdypians.com/wod/tokenomicsChart.svg"
                    }
                    alt=""
                    className="tokenomics-chart"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reserve wodPrice={wodPrice}/>
    </div>
  );
};

export default Tokenomics;
