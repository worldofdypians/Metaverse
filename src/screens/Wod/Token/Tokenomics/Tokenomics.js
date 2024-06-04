import React from "react";
import "./_tokenomics.scss";
import chart from "../../../../assets/wodAssets/dyp-chart2.svg";

const Tokenomics = () => {
  return (
    <div className="tokenomics-wrapper py-5 mint-wrappernew container-fluid position-relative d-flex align-items-center">
      <div className="container-lg">
        <h4 className="main-hero-title font-montserrat text-center">
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
                <a
                  href="https://etherscan.io/token/0x39b46b212bdf15b42b166779b9d1787a68b9d0c3"
                  target="_blank"
                  rel="noreferrer"
                  className="token-sc-link"
                >
                  0x39b46b212bdf15b42b166779b9d1787a68b9d0c3
                </a>
              </div>
              <div className="allocation-wrapper p-2">
                <span className="marketplace-desc">
                  30,000,000 WOD have been minted at Genesis and will become
                  accessible over the course of 2 years. The 2-year allocation
                  is as follows:
                </span>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="circulating-supply-title">Community</span>

                <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Distributed for pool rewards over the next 12 months
                      </span>
                      <span>12,000,000.00 WOD</span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Distributed to Avalanche Chain
                      </span>
                      <span>12,000,000.00 WOD</span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Locked for one year to Uniswap liquidity on token launch
                      </span>
                      <span>200,000.00 WOD</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Distributed to BNB Chain
                      </span>
                      <span>12,000,000.00 WOD</span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Distributed for providing liquidity to CEX and Marketing
                      </span>
                      <span>12,000,000.00 WOD</span>
                    </div>
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Reserved for other pools or chains
                      </span>
                      <span>200,000.00 WOD</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="circulating-supply-title">Users</span>
                <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Public Sale
                      </span>
                      <span>12,000,000.00 WOD</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Burned
                      </span>
                      <span>12,000,000.00 WOD</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <span className="circulating-supply-title">Team</span>
                <div className="d-flex flex-column flex-lg-row gap-2 justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column gap-1">
                      <span className="marketplace-desc text-start">
                        Vested for 24 months, released monthly
                      </span>
                      <span>12,000,000.00 WOD</span>
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
                <span className="circulating-supply-title">
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
