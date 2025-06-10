import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const WodBitGet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "WoD x Bitget";
  }, []);

  return (
    <div className="container-fluid d-flex flex-column w-100 mt-5 align-items-center justify-content-center px-2 px-lg-0">
      <div className="custom-container  my-5 py-0 py-lg-5">
        <div className="row mb-5 pb-5">
          <div className="col-12 col-lg-6 d-flex flex-column gap-2">
            <img
              src={"https://cdn.worldofdypians.com/wod/wodBitgetBanner.webp"}
              alt="Campaign Banner"
              className="campaign-banner w-100 h-100"
            />
            <div className="d-flex align-items-center gap-2 mt-3">
              <img
                src={"https://cdn.worldofdypians.com/wod/calendar-turqoise.png"}
                alt=""
                className="turqoise-calendar-icon"
              />
              <span className="campaign-banner-date-turqoise">
                Jun 10, 2025 - Jun 13, 2025
              </span>
            </div>
            <hr className="campaign-banner-divider m-0" />
          </div>
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column gap-3 justify-content-between h-100">
              <div className="d-flex align-items-center justify-content-between mt-3 mt-lg-0">
                <h6 className="campaign-banner-title mb-0">
                  First 5,000 new users share $50,000
                </h6>
                <div
                  className={`position-relative py-1 ${"events-page-status-tag-live"} px-2 d-flex align-items-center justify-content-center gap-0`}
                  style={{ top: 0 }}
                >
                  <div
                    className="pulsatingDot"
                    style={{
                      width: 7,
                      height: 7,
                      marginRight: 5,
                    }}
                  ></div>

                  <span>Live</span>
                </div>
              </div>
              <hr className="campaign-banner-divider" />
              <span className="yellow-campaign-title">Complete Tasks</span>
              <NavLink
                to={"https://partner.bitget.com/bg/WODxBITGET"}
                target="_blank"
              >
                <div
                  class="accordion wod-bitget-accordion"
                  id="accordionPanelsStayOpenExample"
                >
                  <div className="accordion-item wod-bitget-accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button wod-bitget-accordion-header"
                        type="button"
                        //   data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Register and Verify on Bitget
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse  show"
                    >
                      <div className="accordion-body">
                        <span className="wod-bitget-accordion-body-text">
                          *The UID needs to be submitted and will be verified.
                          Only new users will be eligible and invalid entries
                          will be disqualified.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
              <NavLink
                to={
                  "https://www.bitget.com/on-chain/bnb/0xb994882a1b9bd98a71dd6ea5f61577c42848b0e8"
                }
                target="_blank"
              >
                <div
                  class="accordion wod-bitget-accordion"
                  id="accordionPanelsStayOpenExample2"
                >
                  <div className="accordion-item wod-bitget-accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button wod-bitget-accordion-header"
                        type="button"
                        //   data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Trade at least $2 of WOD on Bitget
                      </button>
                    </h2>
                  </div>
                </div>
              </NavLink>
              <div className="d-flex w-100 justify-content-center justify-content-lg-start">
                <NavLink
                  to={
                    "https://docs.google.com/forms/d/e/1FAIpQLSfHHjKh3OquTuyA16zUo2A6-ae9M-xIDKtI4ryJpMZK_0xTlQ/viewform"
                  }
                  target={"_blank"}
                  className="explore-btn px-4 py-2 mt-4"
                  style={{ width: "fit-content" }}
                >
                  Submit UID
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WodBitGet;
