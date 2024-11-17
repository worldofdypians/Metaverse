import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import landPopup from "./assets/landPopup.webp";
import cityMap from "./assets/cityMap.webp";
import islandMap from "./assets/islandMap.webp";
import epicblack from "../../assets/epicblack.svg";
import opensea from "../../assets/opensea.svg";
import { NavLink } from "react-router-dom";

const LandPopup = ({ onClosePopup }) => {
  const benefits = [
    { title: "Build & Develop" },
    { title: "Monetize Land" },
    { title: "Exclusive Events" },
    { title: "Special Rewards" },
    { title: "Creative Freedom" },
    { title: "Strategic Advantage" },
  ];

  const tiers = [
    {
      title: "WOD Land tier 1",
      icon: "tierOneLand.svg",
    },
    {
      title: "WOD Land tier 2",
      icon: "tierTwoLand.svg",
    },
    {
      title: "WOD Land tier 3",
      icon: "tierThreeLand.svg",
    },
    {
      title: "Genesis Land",
      icon: "dummyBadge.png",
    },
    {
      title: "WOD Land tier 4",
      icon: "tierFourLand.svg",
    },
  ];

  return (
    <div className="package-popup-wrapper">
      <div className="package-popup map-popup">
        <div className="position-relative mb-3 d-flex align-items-center justify-content-center popup-header-img">
          <div className="package-popup-title-wrapper-map position-absolute d-flex align-items-center justify-content-center w-100 m-0">
            <h6 className="package-popup-title-map m-0">
              WORLD OF DYPIANS
              <br />
              <mark
                className="p-0 package-popup-title-map"
                style={{
                  color: "#DCFB85",
                  background: "transparent",
                }}
              >
                LAND NFT COLLECTION
              </mark>
            </h6>
            <img
              src={popupXmark}
              className="popup-closer-map"
              onClick={onClosePopup}
              alt=""
            />
          </div>
        </div>

        <div className="package-popup-content-land mx-1 p-4 pt-0 d-flex flex-column gap-2">
          <p className="package-popup-desc-map">
            The World of Dypians Land NFT Collection offers a unique opportunity
            for players to own and develop virtual land within the game. Only a
            limited edition of 1,000 NFTs, called Genesis Lands, representing
            prime virtual areas with exclusive benefits, has been launched. The
            total Land NFT supply will be 100,000, where each NFT in the
            collection allows players to build and develop their land, customize
            the area, bring their business to the game, unlock special in-game
            features, participate in dedicated events, and earn different
            rewards. The entire Land NFT collection presents an exciting
            opportunity for players looking to leave their mark on the game
            world.
          </p>
          <h6 className="text-white game-popup-title">Benefits</h6>
          <div className="benefit-btn-wrapper">
            {benefits.map((item, index) => {
              return (
                <button className="benefit-btn p-2" key={index}>
                  {item.title}
                </button>
              );
            })}
          </div>

          <h6 className="text-white game-popup-title">Land Tiers</h6>
          <p className="package-popup-desc-map">
            World of Dypians offers 5 tiers of land NFTs. Each tier offers
            unique rewards and benefits within the metaverse.
          </p>
          <div className="tiers-grid-game mt-5">
            {tiers.map((tier, index) => (
              <div className="d-flex flex-column" key={index}>
                <div
                  className={`genesis-wrapper-game d-flex justify-content-center align-items-center p-3 position-relative ${
                    tier.title === "Genesis Land" && "genesis-land-game"
                  }`}
                >
                  <img
                    src={require(`../../assets/landAssets/${tier.icon}`)}
                    className={`genesis-badge ${
                      tier.title === "Genesis Land" && "d-none"
                    }`}
                    alt="badge"
                  />
                </div>
                <div
                  className="genesis-desc-game position-relative"
                  style={{ bottom: "5px" }}
                >
                  <h6
                    className="font-organetto land-desc-game w-100"
                    style={{ fontSize: 14 }}
                  >
                    {tier.title}
                  </h6>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-column flex-lg-row w-100 align-items-center gap-3 justify-content-center mt-2">
            <NavLink to={"/shop/land"} className="getpremium-btn col-lg-4 py-2">
              Buy on Shop
            </NavLink>
            <NavLink
              to={"https://opensea.io/collection/worldofdypians"}
              target="_blank"
              className="explore-btn d-flex align-items-center gap-2 col-lg-4 py-2"
            >
              <img src={opensea} alt="" />
              Buy on Opensea
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandPopup;
