import React, { useEffect, useState } from "react";
import "./_governance.scss";
import GovernanceContent from "./GovernanceContent/GovernanceContent";
import GovernanceHero from "./GovernanceHero/GovernanceHero";
import CreateProposal from "./CreateProposal/CreateProposal";

const Governance = () => {
  const [createProposalPopup, setCreateProposalPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Governance";

  }, []);

  return (
    <>
      <div className="container-fluid governance-mainhero-wrapper px-0">
        <div className="d-flex flex-column">
          <GovernanceHero
            onCreateProposal={() => {
              setCreateProposalPopup(true);
            }}
          />
          {/* <GovernanceContent /> */}
        </div>
      </div>
      {createProposalPopup && (
        <CreateProposal
          onClose={() => {
            setCreateProposalPopup(false);
          }}
          open={createProposalPopup}
        />
      )}
    </>
  );
};

export default Governance;
