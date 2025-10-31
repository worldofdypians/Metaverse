import React, { useEffect, useState } from "react";
import { allAreas } from "../mapdata/areas";
import DypiusDropdown from "./DypiusDropdown";
import IslandDropdown from "./IslandDropdown";
import useWindowSize from "../../../hooks/useWindowSize";

const Sidebar = ({
  switches,
  setSwitches,
  chainAreas,
  handleMarkerClick,
  setContent,
  activeMarker,
  setActiveMarker,
  museumLocation,
  onClose
}) => {
  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState(true);
  const [searchBox, setSearchBox] = useState(false);
  const windowSize = useWindowSize();

  const handleSearch = (val) => {
    setSearch(val);
    if (val.length >= 2) {
      setSearchBox(true);
    } else {
      setSearchBox(false);
    }
  };

  function openNav() {
    setSidebar(true);
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    setSidebar(false);
  }

  useEffect(() => {
    const leafletControls = document.querySelectorAll(".leaflet-left");
    leafletControls.forEach((control) => {
      control.style.left = sidebar ? "400px" : "65px";
      control.style.top = "10px";
    });
  }, [sidebar]);

  useEffect(() => {
    if (windowSize.width < 786) {
      setSidebar(false);
    }
  }, [windowSize]);

  const genesisLocation = {
    title: "Genesis Land",
    special: true,
    type: "genesis",
    location: [-0.05965231771451968, 0.09518623352050783],
    image: "https://cdn.worldofdypians.com/wod/genesisPopup.webp",
    link: "/shop/land",
    popupDesc:
      "The World of Dypians Land NFT Collection offers a unique opportunity for players to own and develop virtual land within the game. Only a limited edition of 1,000 NFTs, called Genesis Lands, representing prime virtual areas with exclusive benefits, has been launched. The total Land NFT supply will be 100,000, where each NFT in the collection allows players to build and develop their land, customize the area, bring their business to the game, unlock special in-game features, participate in dedicated events, and earn different rewards. The entire Land NFT collection presents an exciting opportunity for players looking to leave their mark on the game world.",
    benefits: [
      "Build and Develop",
      "Monetize Land",
      "Exclusive Events",
      "Special Rewards",
      "Creative Freedom",
      "Strategic Advantage",
    ],
    landInfo: [
      "Total WOD Area: 2,000 km2",
      "Total Land NFTs: 100,000",
      "Parcel size: 15,625 m2",
      "Land Tiers: 5",
      "Blockchain: Ethereum",
    ],
  };

 

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${sidebar ? "" : "closed"}`}>
        <div className="d-flex map-sidebar-title-wrapper align-items-center justify-content-between p-3">
          <h6 className="map-sidebar-title mb-0">Map</h6>
          <img
            src={"https://cdn.worldofdypians.com/wod/minimize.svg"}
            className="ps-2 py-2"
            style={{ cursor: "pointer" }}
            alt=""
            onClick={closeNav}
          />
        </div>
        <div className="d-flex align-items-center justify-content-end px-3">
          <div className="d-flex align-items-center gap-2 w-100">
            <div className="position-relative w-100" style={{ zIndex: 6 }}>
              <img
                src={"https://cdn.worldofdypians.com/wod/searchIcon.svg"}
                className="search-icon"
                alt=""
              />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="map-search my-2"
                placeholder="Search..."
              />
              {search !== "" && (
                <span
                  className="closebtn-2"
                  onClick={() => {
                    setSearch("");
                    setSearchBox(false);
                  }}
                >
                  ×
                </span>
              )}
              <div
                className={`search-box ${
                  searchBox ? "d-flex" : "d-none"
                } flex-column py-2`}
              >
                {allAreas
                  .filter((item) => {
                    return item.title
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .map((item, index) => (
                    <h6
                      key={index}
                      className="search-item mb-0 p-3"
                      onClick={() => {
                        handleMarkerClick(item, 18);
                      }}
                    >
                      {item.title}
                    </h6>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="map-sidebar-scroll">
          <div className="d-flex flex-column gap-3" style={{ zIndex: 2 }}>
            {/* <div className="map-sidebar-btn p-2 d-flex align-items-center justify-content-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  regions: false,
                  areas: false,
                  borders: false,
                  bosses: false,
                  quests: false,
                  teleports: false,
                  craftingTables: false,
                  leaderboards: false,
                  mines: false,
                  deer: false,
                  boar: false,
                  bear: false,
                  challenges: false,
                }))}
                >
            <h6 className="chain-sidebar-title mb-0 text-white">
              Clear All 
            </h6>
          </div> */}
            <div className="switches-grid my-3 px-3">
              <div
                className={`switch-btn ${
                  switches.regions && "switch-btn-active"
                } d-flex flex-column align-items-center py-2`}
                onClick={() =>
                  setSwitches((prev) => ({
                    ...prev,
                    regions: !switches.regions,
                  }))
                }
              >
                <img
                  width={24}
                  height={24}
                  src={
                    switches.regions
                      ? "https://cdn.worldofdypians.com/wod/regionIconActive.svg"
                      : "https://cdn.worldofdypians.com/wod/regionIcon.svg"
                  }
                  alt=""
                />
                <span>Regions</span>
              </div>
              <div
                className={`switch-btn ${
                  switches.areas && "switch-btn-active"
                } d-flex flex-column align-items-center py-2`}
                onClick={() =>
                  setSwitches((prev) => ({
                    ...prev,
                    areas: !switches.areas,
                  }))
                }
              >
                <img
                  width={24}
                  height={24}
                  src={
                    switches.areas
                      ? "https://cdn.worldofdypians.com/wod/cityIconActive.svg"
                      : "https://cdn.worldofdypians.com/wod/cityIcon.svg"
                  }
                  alt=""
                />
                <span>Cities</span>
              </div>
              <div
                className={`switch-btn ${
                  switches.challenges && "switch-btn-active"
                } d-flex flex-column align-items-center py-2`}
                onClick={() =>
                  setSwitches((prev) => ({
                    ...prev,
                    challenges: !switches.challenges,
                  }))
                }
              >
                <img
                  width={24}
                  height={24}
                  src={
                    switches.challenges
                      ? "https://cdn.worldofdypians.com/wod/challengeIconActive.svg"
                      : "https://cdn.worldofdypians.com/wod/challengeIcon.svg"
                  }
                  alt=""
                />
                <span>Challenges</span>
              </div>
              <div
                className="switch-btn d-flex flex-column align-items-center py-2"
                onClick={() => {
                  handleMarkerClick(genesisLocation, 15, "genesis");
                  setContent(genesisLocation.title);
                }}
              >
                <img
                  width={24}
                  height={24}
                  src={"https://cdn.worldofdypians.com/wod/genesisIcon.svg"}
                  alt=""
                />
                <span>Genesis Land</span>
              </div>
            </div>

            <DypiusDropdown
              parent={"Dypians City"}
              options={chainAreas}
              onZoomIn={handleMarkerClick}
              switches={switches}
              setSwitches={setSwitches}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
              setContent={setContent}
              museumLocation={museumLocation}
              onClose={onClose}
            />
            <IslandDropdown
              parent={"Island Zero"}
              options={chainAreas}
              onZoomIn={handleMarkerClick}
              switches={switches}
              setSwitches={setSwitches}
            />
          </div>
        </div>
        <div className="d-flex w-100 justify-content-center mt-2">
          <span
            className="clear-all-span"
            onClick={() =>
              setSwitches({
                regions: false,
                areas: false,
                borders: false,
                bosses: false,
                quests: false,
                teleports: false,
                craftingTables: false,
                leaderboards: false,
                mines: false,
                deer: false,
                boar: false,
                bear: false,
                challenges: false,
                museum: false,
              })
            }
          >
            Clear All
          </span>
        </div>
      </div>
      <div id="main">
        <button
          className="openbtn"
          onClick={openNav}
          style={{ display: sidebar ? "none" : "flex" }}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
