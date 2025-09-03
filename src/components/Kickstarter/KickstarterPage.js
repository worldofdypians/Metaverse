import React, { useEffect } from "react";
import "./_kickstarter.scss";
import KickstarterHero from "./components/KickstarterHero";
import KickstarterBenefits from "./components/KickstarterBenefits";
import KickstarterStats from "./components/KickstarterStats";
// import KickstarterOnboarding from "./components/KickstarterOnboarding";
import KickstarterApply from "./components/KickstarterApply";
import KickstarterPartners from "./components/KickStarterPartners";
import KickstarterVideoContent from "./components/KickstarterVideoContent";
import KickstarterMobile from "./components/KickstarterMobile";
import KickstarterGameplay from "./components/KickstarterGameplay";
import KickstarterLaunchpool from "./components/KickstarterLaunchpool";
import { useLocation } from "react-router-dom";

const KickstarterPage = ({ monthlyPlayers, totalVolumeNew, wodHolders }) => {
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
    document.title = "Keep Building Program";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="d-flex flex-column w-100">
      <KickstarterHero />
      <KickstarterStats
        monthlyPlayers={monthlyPlayers}
        totalVolumeNew={totalVolumeNew}
      />
      <KickstarterBenefits />
      <KickstarterPartners />
      <KickstarterVideoContent />
      <KickstarterGameplay />
      <KickstarterLaunchpool wodHolders={wodHolders} />
      <KickstarterMobile />
      <KickstarterApply />
    </div>
  );
};

export default KickstarterPage;
