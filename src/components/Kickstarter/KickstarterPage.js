import React from "react";
import "./_kickstarter.scss";
import KickstarterHero from "./components/KickstarterHero";
import KickstarterBenefits from "./components/KickstarterBenefits";
import KickstarterStats from "./components/KickstarterStats";
import KickstarterOnboarding from "./components/KickstarterOnboarding";
import KickstarterApply from "./components/KickstarterApply";
import WodPartners from "../../screens/Home/WodBuilders/WodPartners";

const KickstarterPage = ({monthlyPlayers, totalVolumeNew}) => {
  return (
    <div className="d-flex flex-column w-100">
      <KickstarterHero />
      <KickstarterStats monthlyPlayers={monthlyPlayers} totalVolumeNew={totalVolumeNew} />
      <KickstarterBenefits />
      <KickstarterOnboarding />
      <WodPartners full={true} />

      <KickstarterApply />
    </div>
  );
};

export default KickstarterPage;
