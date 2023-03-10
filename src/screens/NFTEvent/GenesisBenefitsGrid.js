import React from "react";

const GenesisBenefitsGrid = ({flag}) => {
  const benefits = [
    {
      icon: "stakeIcon.svg",
      whiteText: "Stake & Earn",
      purpleText: "ETH rewards",
      desc: "Access to a dedicated staking pool that offers 25% fixed APR in ETH rewards with no lock period requirements.",
    },
    {
      icon: "playIcon.svg",
      whiteText: "Play & Earn",
      purpleText: "BNB Token",
      desc: "Access to a dedicated campaign that offers variety of BNB rewards and prizes.",
    },
    {
      icon: "tradeIcon.svg",
      whiteText: "Trade your",
      purpleText: "Land NFT",
      desc: "Trade your NFT on OpenSea marketplace and have the opportunity to potentially increase its value and earn a higher profit.",
    },
    {
      icon: "developIcon.svg",
      whiteText: "Develop your",
      purpleText: "business",
      desc: "Bring your business into the metaverse. Advertise your solutions, onboard new customers, and integrate APIs to fully utilize the virtual environment.",
    },
    {
      icon: "vipIcon.svg",
      whiteText: "VIP",
      purpleText: "Access",
      desc: "Early access to all rewarding events. Participate in exclusive events and be one of the first to reap the rewards.",
    },
  ];

  const philippineBenefits = [
    {
      icon: "stakeIcon.svg",
      whiteText: "Mag-stake at Kumita ng",
      purpleText: "ETH rewards",
      desc: "Pribilehiyo para magamit ang isang nakalaang staking pool na nag-aalok ng 25% fixed APR sa ETH na papremyo na walang kinakailangang lock period.",
    },
    {
      icon: "playIcon.svg",
      whiteText: "Maglaro at Kumita ng",
      purpleText: "BNB Token",
      desc: "Pribilehiyo para sa isang dedicated campaign na nag-aalok ng iba`t ibang gantimpala at papremyo sa BNB.",
    },
    {
      icon: "tradeIcon.svg",
      whiteText: "I-trade ang iyong",
      purpleText: "Land NFT",
      desc: "I-trade ang iyong NFT sa OpenSea marketplace at magkaroon ng pagkakataong mapataas ang halaga nito at makakuha ng mas mataas na kita.",
    },
    {
      icon: "developIcon.svg",
      whiteText: "Paunlarin ang iyong",
      purpleText: "negosyo",
      desc: "Dalhin ang iyong negosyo sa metaverse. I-advertise ang iyong mga solusyon, umakay ng mga bagong kustomer, at isama ang APIs upang ganap na magamit ang birtwal na kapaligiran.",
    },
    {
      icon: "vipIcon.svg",
      whiteText: "VIP",
      purpleText: "Access",
      desc: "Pribilehiyo para mauna sa lahat ng kapaki-pakinabang na kaganapan. Makilahok sa mga eksklusibong kaganapan at maging isa sa mga unang aani ng mga gantimpala.",
    },
  ]

  return (
    <div className="row w-100 justify-content-center" id="how-to-earn">
      <h6 className="genesis-benefits-title font-organetto d-flex flex-column flex-lg-row gap-0 gap-lg-2">
    

        {flag === "ph"
                      ? `PAANO KUMITA GAMIT ANG`
                      : `How to earn with`}
        <h6 className="genesis-benefits-title" style={{ color: "#8c56ff" }}>
          Genesis Land?
        </h6>
      </h6>
      <div className="row genesis-benefits-grid mt-2">
       {flag === "ph" ? 
       philippineBenefits.map((item, index) => (
        <div className="col-12 col-lg-4" key={index}>
          <div className="genesis-benefits-wrapper p-4 d-flex flex-column align-items-center justify-content-center gap-3">
            <img src={require(`./assets/${item.icon}`)} alt="" />
            <h6 className="benefit-title d-flex flex-column flex-lg-row gap-0 gap-lg-2">
              {item.whiteText}{" "}
              <h6 className="benefit-title mb-0" style={{ color: "#8c56ff" }}>
                {item.purpleText}
              </h6>
            </h6>
            <p className="benefit-desc">{item.desc}</p>
          </div>
        </div>
      ))
      
      :

      benefits.map((item, index) => (
        <div className="col-12 col-lg-4" key={index}>
          <div className="genesis-benefits-wrapper p-4 d-flex flex-column align-items-center justify-content-center gap-3">
            <img src={require(`./assets/${item.icon}`)} alt="" />
            <h6 className="benefit-title d-flex flex-column flex-lg-row gap-0 gap-lg-2">
              {item.whiteText}{" "}
              <h6 className="benefit-title mb-0" style={{ color: "#8c56ff" }}>
                {item.purpleText}
              </h6>
            </h6>
            <p className="benefit-desc">{item.desc}</p>
          </div>
        </div>
      ))
      }
      </div>
    </div>
  );
};

export default GenesisBenefitsGrid;
