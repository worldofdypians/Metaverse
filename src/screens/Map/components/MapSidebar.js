import React, { useEffect, useState } from "react";
import wodLogo from "../assets/wodLogo.svg";
import CheckboxDropdown from "./CheckboxDropdown";
import { Checkbox } from "@mui/material";
import { allAreas } from "../mapdata/areas";

const Sidebar = ({
  switches,
  setSwitches,
  setChainsVisible,
  chainAreas,
  handleMarkerClick,
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
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("mySidebar").style.paddingLeft = "12px";
    document.getElementById("mySidebar").style.paddingRight = "12px";
    document.getElementById("main").style.marginLeft = "300px";
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
    openNav();
  }, []);

  return (
    <div style={{marginTop: "90px"}}>
      <div id="mySidebar" class="sidebar">
        <div className="d-flex align-items-center justify-content-end">
          <a href="javascript:void(0)" class="closebtn" onClick={closeNav}>
            ×
          </a>
        </div>
        <div className="position-relative" style={{ zIndex: 6 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="map-search my-2"
            placeholder="Search..."
          />
         {search !== "" && 
          <span class="closebtn-2" onClick={() => {setSearch(""); setSearchBox(false)}}>
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
              .map((item) => (
                <h6
                  className="search-item mb-0 p-3"
                  onClick={() => {
                    handleMarkerClick(item);
                  }}
                >
                  {item.title}
                </h6>
              ))}
          </div>
        </div>
        <div className="d-flex flex-column gap-2" style={{ zIndex: 2 }}>
         
          <CheckboxDropdown
            parent={"Dypians City"}
            handleParentEvent={setChainsVisible}
            options={chainAreas}
            onZoomIn={handleMarkerClick}
          />
          <div>
            <Checkbox
              checked={switches.areas}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  areas: !switches.areas,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Areas</span>
          </div>
          <div>
            <Checkbox
              checked={switches.cities}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  cities: !switches.cities,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Cities</span>
          </div>
          <div>
            <Checkbox
              checked={switches.borders}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  borders: !switches.borders,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Borders</span>
          </div>
          <div>
            <Checkbox
              checked={switches.quests}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  quests: !switches.quests,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Quests</span>
          </div>
          <div>
            <Checkbox
              checked={switches.bosses}
              onChange={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  bosses: !switches.bosses,
                }))
              }
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "white",
                },
              }}
            />
            <span style={{ marginLeft: 8, color: "white" }}>Game Bosses</span>
          </div>
        </div>
      </div>
      <div id="main">
        <button
          class="openbtn"
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
