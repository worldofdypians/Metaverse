import React from "react";
import "./_security.scss";
import github from "../assets/github.svg";
import certik from "../assets/certik.svg";
import certikBig from "../assets/certikBig.svg";

const Security = () => {
  return (
    <div
      className="security-wrapper container-fluid py-5 py-lg-0 d-flex align-items-center"
      id="security"
    >
      <div className="d-flex flex-column w-100 justify-content-center align-items-center">
        <div className="custom-container">
          <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-center">
            <div className="d-flex flex-column gap-3 col-lg-4">
              <h4 className="explorer-grid-title font-montserrat text-start mb-0">
                Smart Contracts Security
              </h4>
              <span className="tokenomics-wrapper-desc">
                At World of Dypians, we prioritize your security. That's why
                we've partnered with CertiK for comprehensive security audits,
                ensuring our smart contracts are free from vulnerabilities.
              </span>
              <span className="tokenomics-wrapper-desc">
                Additionally, all smart contracts are monitored 24/7 by a
                Security Oracle, powered by CertiK, to provide continuous
                protection.
              </span>
              <div className="d-flex align-items-center gap-3">
                <a
                  className="explore-btn px-4 py-2 d-flex algin-items-center gap-1"
                  href="https://github.com/worldofdypians"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={github} alt="" /> Github
                </a>
                <a
                  className="explore-btn px-4 py-2 d-flex algin-items-center gap-1"
                  href="https://skynet.certik.com/projects/world-of-dypians"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={certik} alt="" />
                  CertiK Score
                </a>
              </div>
            </div>
            <div className="circlewrapper d-none d-lg-flex align-items-center justify-content-center">
              <div className="d-flex flex-column px-5">
                <span className="text-position fw-light">Audited by</span>
                <img src={certikBig} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
