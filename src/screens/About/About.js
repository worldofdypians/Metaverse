import React, { useEffect } from "react";
import Brand from "./Brand/Brand";
import WodPartners from "../Home/WodBuilders/WodPartners";
import Tokenomics from "../Wod/Token/Tokenomics/Tokenomics";
import Roadmap from "../Roadmap/Roadmap";
import OurTeam from "../OurTeam/OurTeam";
import MainHero from "./MainHero/MainHero";
import { useLocation } from "react-router-dom";

const About = () => {
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

  return (
    <div className="container-fluid token-wrapper px-0">
      <div className="d-flex flex-column gap-5">
        <MainHero/>
        <WodPartners full={true} />
        <Roadmap />
        <Tokenomics />
        <OurTeam />
        <Brand />
      </div>
    </div>
  );
};

export default About;
