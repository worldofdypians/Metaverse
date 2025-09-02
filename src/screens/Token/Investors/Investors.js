import React, { useEffect, useState } from "react";
import "./_investors.scss";
import NewBuilders from "../../Home/WodBuilders/NewBuilders";
 

const Investors = ({ page }) => {
  const investors = [
    {
      title: "BNB Chain",
      logo: "bnbBackers.svg",
      link: "https://www.bnbchain.org/en",
    },
    {
      title: "Trust Wallet",
      logo: "trustBackers.svg",
      link: "https://trustwallet.com/",
    },
    {
      title: "Matchain",
      logo: "matchainBackers.svg",
      link: "https://www.matchain.io/",
    },
    {
      title: "CORE",
      logo: "coreBackers.svg",
      link: "https://coredao.org/",
    },
    {
      title: "SKALE",
      logo: "skaleBackers.svg",
      link: "https://skale.space/",
    },
    {
      title: "Manta Network",
      logo: "mantaBackers.svg",
      link: "https://manta.network/",
    },
    {
      title: "Castrum Capital",
      logo: "castrum.png",
      link: "https://castrum.capital/",
    },
    {
      title: "Financial Move",
      logo: "financialmove.svg",
      link: "https://financialmove.com.br/",
    },
    {
      title: "MPC Education",
      logo: "mpcEducation.svg",
      link: "https://meuplanocrypto.com/",
    },
    {
      title: "Conflux",
      logo: "confluxBackers.svg",
      link: "https://confluxnetwork.org/",
    },
    {
      title: "Taiko",
      logo: "taikoBackers.svg",
      link: "https://taiko.xyz/",
    },
    {
      title: "IBC Group",
      logo: "ibcBacker.svg",
      link: "https://www.ibcgroup.io/",
    },
    {
      title: "Easy2Stake",
      logo: "easy2stakeBackers.svg",
      link: "https://www.easy2stake.com/",
    },
    {
      title: "Immutable",
      logo: "immutableBackers.svg",
      link: "https://www.immutable.com/",
    },
  ];

  const [show, setShow] = useState(false);

  useEffect(() => {
    if(page !== "home"){
      setShow(true)
    }
  }, [])
  

  return (
    <div
      className="container-fluid px-3 px-lg-5 py-4 investors-bg d-flex align-items-center flex-column gap-5"
      id="backers&partners"
    >
      <div
        className={`d-flex ${
          page === "home" || page === "token" ? "custom-container" : ""
        } flex-column gap-3`}
      >
        <h6 className={`mb-0 explorer-grid-title`}>Backers</h6>
        <div className="new-investors-grid">
          {investors.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              className="investors-item py-2"
              key={index}
            >
              <img
                src={(`https://cdn.worldofdypians.com/wod/${item.logo}`)}
                className="investors-img"
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
      {show && (
        <div
          className={`d-flex custom-container flex-column gap-3`}
        >
          <h6
            className={`mb-0 explorer-grid-title`}
          >
            Partners
          </h6>
          <NewBuilders />
        </div>
      )}
      {page === "home" && (
        <div className="d-flex justify-content-center mt-3">
          <div
            className="d-flex align-items-center gap-2 view-more-partners position-relative"
            onClick={() => setShow(!show)}
            style={{ bottom: "0" }}
          >
            <span className="view-all-partners ">
              {" "}
              {!show ? "View Partners" : "View Less"}
            </span>
            <img
              src={"https://cdn.worldofdypians.com/wod/partnersDropdown.svg"}
              width={20}
              height={20}
              style={{ transform: !show ? "none" : "rotate(180deg)" }}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Investors;
