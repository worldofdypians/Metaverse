import React from "react";
import './_timepiecebenefits.scss'

const TimepieceBenefits = () => {
  const benefits = [
    {
      title: "Exclusive Access",
      icon: "draft",
      content:
        "Enjoy exclusive access to new and exciting events within the World of Dypians Metaverse platform that are only accessible to Timepiece NFT holders.",
    },
    {
      title: "Enhanced Interactions",
      icon: "user",
      content:
        "Experience enhanced interactions in the World of Dypians Metaverse platform by unlocking unique and exclusive activities that are only available to Timepiece NFT holders. Connect with other Dypians in new and exciting ways, and take your Metaverse experience to the next level.",
    },
    {
      title: "Special Rewards",
      icon: "star",
      content:
        "Get rewarded for your participation in the World of Dypians Metaverse platform as a Timepiece NFT holder. Receive special rewards that may include tokens, collectibles, or other digital assets.",
    },
    {
      title: "Expanded Functionality",
      icon: "expand",
      content:
        "Timepiece NFTs will provide expanded functionality within the World of Dypians Metaverse platform. As a holder, you will be able to perform new actions and interactions that were previously unavailable.",
    },
  ];

  return (
    <div className="caws-benefits-wrapper py-5  d-flex flex-column gap-5">
      <div className="row justify-content-between align-items-center w-100 mx-0 px-3 px-lg-5">
          <div className="col-12 ps-2 ps-lg-0">
            <h6 className="land-hero-title font-organetto d-flex flex-column flex-lg-row gap-2">
            Caws timepiece
              <h6 className="land-hero-title font-organetto" style={{ color: "#8c56ff" }}>
                Benefits
              </h6>
            </h6>
            <div className="row m-0 flex-column flex-xxl-row flex-lg-row justify-content-between">
            <div className="caws-benefits-wrapper2 py-4 col-xxl-7 col-lg-7 col-12">
              {benefits.map((benefit, index) => (
                <div className="d-flex align-items-start flex-column gap-2" key={index}>
                  <img
                    src={require(`./assets/${benefit.icon}.png`)}
                    alt=""
                    style={{height: 56}}
                  />
                  <div className="d-flex flex-column gap-2">
                    <span className="benefits-title font-poppins">
                      {benefit.title}
                    </span>
                    <p className="benefits-content">{benefit.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-xxl-4 col-lg-4 col-12 d-flex justify-content-center">
            <img
              src={require("./assets/scene2.gif")}
              className="timepiece-graphic timepiecewhite-gif"
              alt="phone-graphics"
            />
            </div></div>
          </div>
        </div>
    </div>
  );
};

export default TimepieceBenefits;
