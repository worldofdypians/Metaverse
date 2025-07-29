import React from "react";
import "./_kickstarter.scss";
import KickstarterHero from "./components/KickstarterHero";
import KickstarterBenefits from "./components/KickstarterBenefits";
import KickstarterStats from "./components/KickstarterStats";
import KickstarterOnboarding from "./components/KickstarterOnboarding";
import KickstarterApply from "./components/KickstarterApply";

const KickstarterPage = () => {
  return (
    <div className="d-flex flex-column w-100">
      <KickstarterHero />
      <KickstarterStats />
      <KickstarterBenefits />
      <KickstarterOnboarding />
      <KickstarterApply />
    </div>
  );
};

export default KickstarterPage;
