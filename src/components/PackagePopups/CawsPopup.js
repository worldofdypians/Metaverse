import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import cawsPopup from "./assets/cawsPopup.webp";
import rarity from "./assets/rarity.svg";
import { NavLink } from "react-router-dom";
import opensea from '../../assets/opensea.svg'
import ChevronArrowSvg from "../../screens/Caws/assets/General/ChevronArrowSvg/ChevronArrowSvg";

const CawsPopup = ({ onClosePopup }) => {
  const benefits = [
    { title: "Player Assistance" },
    { title: "In-Game Mount" },
    { title: "Skill Power-ups" },
    { title: "Special Rewards" },
    { title: "Combat Abilities" },
    { title: "Unique Style" },
  ];

  const cawsinfo = [
    { title: "Total CAWS NFTs", value: "10,000" },
    { title: "Different Traits", value: "235" },
    { title: "Game Utility", value: "AI Powered" },
    { title: "In-Game Benefits", value: "Unlimited" },
    { title: "Blockchain", value: "Ethereum" },
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
                CAWS NFT COLLECTION
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
            The CAWS NFT Collection (Cats and Watches Society) brings a unique
            blend of style and functionality to the World of Dypians. These
            exclusive NFTs feature fashionable cats adorned with intricate
            watches, each offering distinct in-game benefits. Players can use
            CAWS NFTs to enhance their character abilities, power up their
            skills, use the cat as an in-game mount, and improve their chances
            of earning more rewards. Additionally, owning a CAWS NFT is a
            valuable asset for players looking to elevate their gameplay
            experience and showcase their unique sense of style within the game.
          </p>
          <h6 className="text-white game-popup-title">Benefits</h6>
          <div className="benefit-btn-wrapper">
            {benefits.map((item, index) => {
              return (
                <span className="benefit-btn p-2" key={index}>
                &#8226; {item.title}
              </span>
              );
            })}
          </div>

          <div className="caws-traits-wrapper p-3 mt-3">
            <div className="d-flex flex-column gap-3">
              <h6 className="text-white game-popup-title">All the Traits</h6>
              <p className="package-popup-desc-map">
                Discover all the little details that make each cat as smug, cute
                and adoptable as the other. You can easily discover their story
                and personality by checking out their outfit, their expression -
                and of course, what kind of watch they're into.
              </p>
              <p className="package-popup-desc-map">
                We love all of our cats, but some of their watches make them
                stand out a bit more than others. We'll let you be the judge of
                that.
              </p>
              <div className="d-flex justify-content-center align-items-center">
                <a
                  href="https://rarity.tools"
                  className="btn-rarity-tools d-flex align-items-center gap-2 px-2 py-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={rarity} alt="" /> Rarity tools{" "}
                  <ChevronArrowSvg color="white" />
                </a>
              </div>
            </div>
          </div>
          <h6 className="text-white game-popup-title">CAWS Information</h6>
          <div className="caws-btn-wrapper">
            {cawsinfo.map((item, index) => {
              return (
                <div className="caws-info-item p-2" key={index}>
                  <div className="d-flex flex-column gap-1 align-items-center justify-content-center">
                    <span className="caws-info-value">{item.value}</span>
                    <span className="caws-info-title">{item.title}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="d-flex w-100 flex-column flex-lg-row align-items-center gap-3 justify-content-center mt-2">
            <NavLink to={"/shop/caws"} className="getpremium-btn col-lg-4 py-2">
              Buy on Shop
            </NavLink>
            <NavLink
              to={"https://opensea.io/collection/catsandwatchessocietycaws"}
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

export default CawsPopup;
