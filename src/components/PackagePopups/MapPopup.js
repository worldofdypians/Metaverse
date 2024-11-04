import React from "react";
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import mapPopup from "./assets/mapPopup.webp";
import cityMap from "./assets/cityMap.webp";
import islandMap from "./assets/islandMap.webp";
import epicblack from "../../assets/epicblack.svg";

const MapPopup = ({ onClosePopup }) => {
  return (
    <div className="package-popup-wrapper">
      <div className="package-popup map-popup">
        <div className="position-relative mb-3 d-flex align-items-center justify-content-center">
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
                MAPS
              </mark>
            </h6>
            <img
              src={popupXmark}
              className="popup-closer-map"
              onClick={onClosePopup}
              alt=""
            />
          </div>
          <img src={mapPopup} alt="" className="w-100 popup-header-img" />
        </div>

        <div className="package-popup-content-map mx-1 p-4 pt-0 d-flex flex-column gap-2">
          <p className="package-popup-desc-map">
            The World of Dypians offers two distinct maps for players to
            explore: the City Map and the Island. Each map offers unique
            gameplay experiences tailored to different aspects of the game,
            including the Campaign, Multiplayer, and Open World modes.
          </p>
          <h6 className="text-white">City Map</h6>
          <p className="package-popup-desc-map">
            The City map is an expansive open-world environment where players
            can build their land, develop their properties, advertise their
            businesses, participate in events, and interact with other players.
            The city is home to various game utilities, including the Shopping
            Mall, the Museum, partner areas in the downtown district, and more.
            It serves as the central hub for players to engage with the game
            world and each other, offering a bustling and dynamic environment to
            explore.
          </p>
          <img src={cityMap} alt="" className="w-100" />

          <h6 className="text-white">Island Map</h6>
          <p className="package-popup-desc-map">
            The Island map offers a more adventurous experience, where players
            can level up their characters by fighting different animals,
            collecting materials, forging items, looting treasure, participating
            in events, teaming up with friends, and more. The Island provides a
            rich and diverse landscape for players to explore and discover, with
            challenges and rewards awaiting those who dare to venture into its
            depths.
          </p>
          <img src={islandMap} alt="" className="w-100" />

          <div
            className="linear-border p-0"
            style={{
              width: "fit-content",
              zIndex: 5,
              position: "relative",
              textDecoration: "none",
              margin: '10px auto auto auto'
            }}
          >
            <div className="opacitywrapper5 filled-btn m-0 px-3">
              <a
                className="game-event-download py-1 d-flex align-items-center gap-2"
                href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                target="_blank"
              >
                <img src={epicblack} alt="icon" className="epicgame2 w-auto h-auto" />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
