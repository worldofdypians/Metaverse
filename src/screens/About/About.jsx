import React, { useEffect, Suspense } from "react";
import Brand from "./Brand/Brand";
import WodPartners from "../Home/WodBuilders/WodPartners";
import Tokenomics from "../Wod/Token/Tokenomics/Tokenomics";
import Roadmap from "../Roadmap/Roadmap";
import OurTeam from "../OurTeam/OurTeam";
import MainHero from "./MainHero/MainHero";
import { useLocation } from "react-router-dom";
import Security from "./Security/Security";

// Lazy load the Reserve component to prevent blocking the About page
const Reserve = React.lazy(() => import("../Reserve/Reserve"));

const About = ({wodPrice}) => {
  const location = useLocation();

  const scrollToElement = () => {
    const element = document.getElementById(
      location.hash.slice(1, location.hash.length)
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    scrollToElement();
  }, [location]);

  useEffect(() => {
    document.title = "About WOD";
    // window.scrollTo(0, 0);
  }, []);

  // Loading component for Reserve
  const ReserveLoading = () => (
    <div
      className="container-fluid bg-[#0a0d1f] py-5 bottom-border-divider position-relative"
      id="reserve"
    >
      <div className="d-flex flex-column">
        <div className="custom-container d-flex flex-column w-100 gap-3 mx-auto">
          <div className="d-flex flex-column align-items-center gap-2">
            <section className="w-100 mx-auto d-flex flex-column gap-5">
              <div className="d-flex flex-column flex-lg-row gap-2 align-items-center justify-content-center justify-content-lg-between">
                <div className="d-flex flex-column gap-3">
                  <h4 className="explorer-grid-title font-montserrat text-start mb-0">
                    World of Dypians Reserve
                  </h4>
                  <span className="tokenomics-wrapper-desc">
                    The World of Dypians Reserve is a strategic WOD fund powered
                    by continuous buybacks from on-chain and off-chain revenues,
                    driving long-term growth and stability.
                  </span>
                </div>
              </div>
              {/* Loading placeholder */}
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 mb-4 h-100">
                <div className="relative bg-[#0f1729]/90 backdrop-blur-xl bordertw border-cyan-500/20 rounded-xl d-flex flex-column col-lg-3">
                  <div className="p-4">
                    <div className="text-4xl font-semibold mb-0">
                      <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                        Loading...
                      </span>
                    </div>
                    <p className="text-slate-400/70 text-sm m-0">Loading reserve data</p>
                  </div>
                </div>
                <div className="bg-[#0f1729]/90 backdrop-blur-xl rounded-xl p-4 shadow-lg w-100">
                  <div className="d-flex align-items-center justify-content-center h-96">
                    <div className="text-center">
                      <div className="spinner-border text-cyan-500" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="text-slate-400/70 mt-3">Loading chart data...</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid token-wrapper px-0">
      <div className="d-flex flex-column">
        <MainHero />
        <Tokenomics />
        <Suspense fallback={<ReserveLoading />}>
          <Reserve wodPrice={wodPrice} />
        </Suspense>
        <Security />
        <Roadmap />
        <OurTeam />
        <WodPartners full={true} />
        <Brand />
      </div>
    </div>
  );
};

export default About;
