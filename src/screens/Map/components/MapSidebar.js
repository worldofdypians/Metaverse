import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { allAreas } from "../mapdata/areas";
import DypiusDropdown from "./DypiusDropdown";
import IslandDropdown from "./IslandDropdown";
import regionIcon from '../assets/regionIcon.svg'
import cityIcon from '../assets/cityIcon.svg'
import challengeIcon from '../assets/challengeIcon.svg';
import landIcon from '../assets/landIcon.png'
const Sidebar = ({
  switches,
  setSwitches,
  chainAreas,
  handleMarkerClick,
  setContent,
setInfo,
}) => {


  const [search, setSearch] = useState("");
  const [sidebar, setSidebar] = useState(true);
  const [searchBox, setSearchBox] = useState(false);

  const handleSearch = (val) => {
    setSearch(val);
    if (val.length >= 2) {
      setSearchBox(true);
    } else {
      setSearchBox(false);
    }
  };

  function openNav() {
    document.getElementById("mySidebar").style.width = "400px";
    document.getElementById("mySidebar").style.paddingLeft = "12px";
    document.getElementById("mySidebar").style.paddingRight = "12px";
    document.getElementById("main").style.marginLeft = "0px";
    setSidebar(true);
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("mySidebar").style.paddingLeft = "0";
    document.getElementById("mySidebar").style.paddingRight = "0";


    setSidebar(false);
  }

  useEffect(() => {
    const leafletControls = document.querySelectorAll(".leaflet-left");
    leafletControls.forEach((control) => {
      control.style.left = sidebar ? "400px" : "65px";
      control.style.top = "10px";
    });
  }, [sidebar]);


const genesisLocation = {
    title: "Genesis Land",
    special: true,
    location: [-0.05965231771451968, 0.09518623352050783],
   
}

  useEffect(() => {
    openNav();
  }, []);

  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <div className="d-flex align-items-center justify-content-end">
        <div className="d-flex align-items-center gap-2 w-100">
        <div className="position-relative w-100" style={{ zIndex: 6 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="map-search my-2"
            placeholder="Search..."
          />
         {search !== "" && 
          <span className="closebtn-2" onClick={() => {setSearch(""); setSearchBox(false)}}>
          ×
        </span>
         }
          <div
            className={`search-box ${
              searchBox ? "d-flex" : "d-none"
            } flex-column py-2`}
          >
            {allAreas
              .filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
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
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
            ×
          </a>
        </div>
        </div>
       
        <div className="d-flex flex-column gap-3" style={{ zIndex: 2 }}>
          <div className="switches-grid mb-3">
          <div className="map-sidebar-btn p-2 d-flex align-items-center justify-content-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  regions: !switches.regions,
                }))}
                style={{opacity: switches.regions ? "1" : "0.6"}}
                >
            <img src={regionIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Regions
            </h6>
          </div>
          <div className="map-sidebar-btn p-2 d-flex align-items-center justify-content-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  areas: !switches.areas,
                }))}
                style={{opacity: switches.areas ? "1" : "0.6"}}
                >
            <img src={cityIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Areas
            </h6>
          </div>
          <div className="map-sidebar-btn p-2 d-flex align-items-center justify-content-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  challenges: !switches.challenges,
                }))}
                style={{opacity: switches.challenges ? "1" : "0.6"}}
                >
            <img src={challengeIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Challenges
            </h6>
          </div>
          </div>
          
          <DypiusDropdown
            parent={"Dypians City"}
            options={chainAreas}
            onZoomIn={handleMarkerClick}
            switches={switches}
            setSwitches={setSwitches}
          />
          <IslandDropdown
            parent={"Island Zero"}
            options={chainAreas}
            onZoomIn={handleMarkerClick}
            switches={switches}
            setSwitches={setSwitches}
          />
           <div className="map-sidebar-btn genesis-focus-btnodb p-2 d-flex align-items-center gap-2" onClick={() => {handleMarkerClick(genesisLocation, 15, "area"); setContent(genesisLocation.title)}}
                >
            <img src={landIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Genesis Land
            </h6>
          </div>
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
