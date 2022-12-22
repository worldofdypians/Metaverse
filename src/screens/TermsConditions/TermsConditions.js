import React, {useEffect} from "react";
import './_terms.scss';

const TermsConditions = () => {


  useEffect(()=>{
    window.scrollTo(0,0)
},[])


  return (
    <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
      <div className="d-flex w-100 flex-column news-main-wrapper">
        <div className="row w-100 px-3 px-lg-5 mx-0 news-container">
          <div className="update-title font-organetto">
            Terms AND CONDITIONS
          </div>
          <div className="news-card terms-container p-4 d-flex flex-column gap-3 mb-5">
            <p className="text-white m-0">Last Revised on December 27, 2022</p>
            <p className="text-white m-0">
              Welcome to the Terms of Service (these “Terms”) for the website
              https://worldofdypians.com (the “Website”), the World of Dypians
              game (the “Game”), and all content and functionalities accessible
              via our Website and the Game (the “Services”), in each case
              operated by or on behalf of Dypius (“Company,” “we,” or “us”).
            </p>
            <p className="text-white m-0">
              These Terms govern your access to and use of the Services. Please
              read these Terms carefully, as they include important information
              about your legal rights. By accessing and/or using the Services,
              you are agreeing to these Terms. If you do not understand or agree
              to these Terms, please do not use the Services.
            </p>
            <p className="text-white m-0">
              For purposes of these Terms, “you” and “your” means you as the
              user of the Services. If you use the Services on behalf of a
              company or other entity then “you” includes you and that entity,
              and you represent and warrant that (a) you are an authorized
              representative of the entity with the authority to bind the entity
              to these Terms, and (b) you agree to these Terms on the entity's
              behalf.
            </p>
            <b>
              <p className="text-white m-0"> TABLE OF CONTENTS</p>
            </b>
            <ol>
              <li className="text-white">SERVICES AND ACCOUNTS </li>
              <li className="text-white">LOCATION OF OUR PRIVACY POLICY ELIGIBILITY</li>
              <li className="text-white">RIGHTS WE GRANT YOU </li>
              <li className="text-white">USAGE LIMITATIONS OWNERSHIP AND CONTENT</li>
              <li className="text-white">THIRD-PARTY SERVICES AND MATERIALS </li>
              <li className="text-white">UPDATES AND PATCHES TERMINATION </li>
              <li className="text-white">
                DISCLAIMERS, LIMITATIONS OF LIABILITY, INDEMNIFICATION
                ADDITIONAL
              </li>
              <li className="text-white">INDEMNIFICATION ADDITIONAL</li>
            </ol>
            <p
              className="text-white m-0"
              style={{ textTransform: "capitalize" }}
            >
              1. SERVICES AND ACCOUNTS;
            </p>
            <p className="text-white m-0">
              1.1. Description of the Services. The Services offer a unique
              metaverse gaming experience via the Game and other related
              experiences through the combination of traditional core game and
              blockchain mechanics (the “World of Dypians”). The World of
              Dypians is driven by a dual token system — “DYP” and “iDYP”. DYP
              serves as the native in-Game currency used for in-Game economic
              interactions, such as purchasing resources, items, gear, skins,
              and other in-Game assets. iDYP is a multifunctional token, which
              has in-Game applications used for energy, stamina, and other
              in-Game functionalities. You acknowledge and agree that we cannot
              be held liable or responsible in any way for any damages or losses
              incurred by any person in connection with with any acts or
              omissions of the World of Dypians.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
