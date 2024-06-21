import React from "react";
import "./_governance.scss";
import GovernanceContent from "./GovernanceContent/GovernanceContent";
import GovernanceHero from "./GovernanceHero/GovernanceHero";
const Governance = () => {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex flex-column gap-5"> 
      <GovernanceHero/>
      <GovernanceContent/>
    </div>
    </div>
  );
};

export default Governance;
