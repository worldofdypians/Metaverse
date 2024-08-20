import React from "react";
import "./_investors.scss";
import WodBuilders from "../../Home/WodBuilders/WodBuilders";

const Investors = () => {
  const investors = [
    {
      title: "Castrum Capital",
      logo: "castrum.png",
      link: "https://castrum.capital/",
    },
    {
      title: "Financial Move",
      logo: "financialMove.svg",
      link: "https://financialmove.com.br/",
    },
    {
      title: "MPC Education",
      logo: "mpcEducation.svg",
      link: "https://meuplanocrypto.com/",
    },
    {
      title: "Crypto Adventure",
      logo: "cryptoAdventure.svg",
      link: "https://cryptoadventure.com/",
    },
  ];

  return (
    <div className="container-fluid px-4 px-lg-5 py-4 investors-bg d-flex flex-column gap-5" id='backers&partners'>
      <div className="d-flex flex-column gap-3">
        <h6 className="mb-0 investors-title">Backers</h6>
        <div className="investors-grid">
          {investors.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              className="investors-item py-2"
              key={index}
            >
              <img
                src={require(`./assets/${item.logo}`)}
                className="investors-img"
                alt=""
              />
            </a>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column gap-3">
        <h6 className="mb-0 investors-title">Partners</h6>
        <WodBuilders page={"wod"} />
      </div>
    </div>
  );
};

export default Investors;
