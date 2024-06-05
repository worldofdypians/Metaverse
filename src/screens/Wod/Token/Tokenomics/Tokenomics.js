import React, { useState } from "react";
import "./_tokenomics.scss";
import chart from "../../../../assets/wodAssets/dyp-chart2.svg";
import copy from "../../../../components/Header/assets/copy.svg";
import check from "../../../../components/Header/assets/check.svg";
import Clipboard from "react-clipboard.js";

const Tokenomics = () => {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="tokenomics-wrapper py-5 mint-wrappernew container-fluid position-relative d-flex align-items-center">
      <div className="container-lg">
        <h4 className="main-hero-title font-montserrat text-center mb-3">
          WoD{" "}
          <mark className="font-montserrat main-hero-title explore-tag pe-2">
            Tokenomics
          </mark>
        </h4>
        <div className="p-2 tokenomics-table-wrapper">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-column gap-2 align-items-start">
                <span className="token-sc-text marketplace-desc text-start">
                  WOD Contract Address:
                </span>
                <div className="d-flex align-items-center gap-2">
                  <a
                    href="https://etherscan.io/token/0x39b46b212bdf15b42b166779b9d1787a68b9d0c3"
                    target="_blank"
                    rel="noreferrer"
                    className="token-sc-link"
                  >
                    0x39b46b212bdf15b42b166779b9d1787a68b9d0c3
                  </a>
                  <Clipboard
                    component="div"
                    data-event="click"
                    data-tip="Copied To Clipboard!"
                    data-clipboard-text={
                      "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3"
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
                      {tooltip ? "Copied" : "Copy"}
                    </span>
                  </Clipboard>
                </div>
              </div>
              <div className="allocation-wrapper p-2">
                <span className="marketplace-desc text-secondary">
                  30,000,000 WOD have been minted at Genesis and will become
                  accessible over the course of 2 years. The 2-year allocation
                  is as follows:
                </span>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="circulating-supply-title text-start">
                  Community
                </span>

                <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">
                        Distributed for pool rewards over the next 12 months
                      </span>
                      <span className="marketplace-desc text-start">
                        12,000,000.00 WOD
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">
                        Distributed to Avalanche Chain
                      </span>
                      <span className="marketplace-desc text-start">
                        12,000,000.00 WOD
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">
                        Locked for one year to Uniswap liquidity on token launch
                      </span>
                      <span className="marketplace-desc text-start">
                        200,000.00 WOD
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">
                        Distributed to BNB Chain
                      </span>
                      <span className="marketplace-desc text-start">
                        12,000,000.00 WOD
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">
                        Distributed for providing liquidity to CEX and Marketing
                      </span>
                      <span className="marketplace-desc text-start">
                        12,000,000.00 WOD
                      </span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">
                        Reserved for other pools or chains
                      </span>
                      <span className="marketplace-desc text-start">
                        200,000.00 WOD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="circulating-supply-title text-start">
                  Users
                </span>
                <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                  <div className="d-flex flex-column gap-2 w-100">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">Public Sale</span>
                      <span className="marketplace-desc text-start">
                        12,000,000.00 WOD
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2 w-100">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">Burned</span>
                      <span className="marketplace-desc text-start">
                        12,000,000.00 WOD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <span className="circulating-supply-title text-start">
                  Team
                </span>
                <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="text-muted text-start">
                        Vested for 24 months, released monthly
                      </span>
                      <span className="marketplace-desc text-start">
                        12,000,000.00 WOD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-between align-items-center gap-3">
              <div className="circulating-supply-wrapper p-3">
                <div className="d-flex flex-column gap-2 align-items-center">
                  <span className="circulating-supply-title">
                    Circulating supply
                  </span>
                  <span className="circulating-supply-amount">
                    19,367,163.739875 WOD
                  </span>
                </div>
              </div>
              <img src={chart} alt="" />
              <div className="circulating-supply-wrapper p-2">
                <span className="circulating-supply-title d-flex justify-content-center">
                  No additional tokens can be minted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
