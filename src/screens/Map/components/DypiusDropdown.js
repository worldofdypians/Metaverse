import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material";


const DypiusDropdown = ({
  options,
  parent,
  onZoomIn,
  switches,
  setSwitches,
  activeMarker,
  setActiveMarker,
}) => {
  return (
    <div className="d-flex px-3 flex-column gap-2">
      <div
        className="d-flex py-1 w-100 align-items-center"
        style={{ borderBottom: "1px solid #828FBB" }}
      >
        <h6 className="sidebar-section-title mb-0">Dypians City</h6>
      </div>
      <div className="dypians-areas-grid">
        <div
          className={`section-switch-btn ${
            switches.leaderboards && "section-switch-btn-active"
          } d-flex align-items-center gap-2 p-2 w-100`}
          onClick={() =>
            setSwitches((prev) => ({
              ...prev,
              leaderboards: !switches.leaderboards,
            }))
          }
        >
          <img src={"https://cdn.worldofdypians.com/wod/leaderboardsIcon.svg"} width={20} height={20} alt="" />
          <span>Leaderboards</span>
        </div>
        <div
          className={`section-switch-btn ${
            switches.teleports && "section-switch-btn-active"
          } d-flex align-items-center gap-2 p-2 w-100`}
          onClick={() =>
            setSwitches((prev) => ({
              ...prev,
              teleports: !switches.teleports,
            }))
          }
        >
          <img src={"https://cdn.worldofdypians.com/wod/teleportsIcon.svg"} width={20} height={20} alt="" />
          <span>Teleports</span>
        </div>
        <div
          className={`section-switch-btn inactive-switch ${
            switches.quests && "section-switch-btn-active"
          } d-flex align-items-center gap-2 p-2 w-100`}
          // onClick={() =>
          //   setSwitches((prev) => ({
          //     ...prev,
          //     quests: !switches.quests,
          //   }))
          // }
        >
          <img src={"https://cdn.worldofdypians.com/wod/questsIcon.svg"} width={20} height={20} alt="" />
          <span>Quests</span>
        </div>
      </div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls={`areas-content`}
          id={`areas-header`}
          sx={{
            background: "rgba(73, 71, 115, 0.70)",
            border: "1px solid #828FBB",
            borderRadius: "10px",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <img src={"https://cdn.worldofdypians.com/wod/areasIcon.svg"} alt="" />
            <span className="accordion-side-text">Areas</span>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, marginTop: "12px" }}>
         <div className="dypians-areas-grid">
         <div className={`section-switch-btn ${switches.chains && "section-switch-btn-active"} d-flex align-items-center mb-2`}  onClick={() =>
            setSwitches((prev) => ({
              ...prev,
              chains: !switches.chains,
            }))
          }>
            <Checkbox checked={switches.chains} 
             sx={{
              color: "#ff9800", // Default color
              "&.Mui-checked": {
                color: "#5690ff", // Checked color
              },
            }}
            />
            <span>Show All</span>
          </div>
         </div>
          <div className="dypians-areas-grid">
            {options.map((item, index) => (
              <div
                key={index}
                className={`areas-grid-item ${activeMarker === item.title && "areas-grid-item-active"} py-1 d-flex align-items-center gap-1 justify-content-start ps-1`}
                onClick={() => {onZoomIn(item, 18, "chain"); setActiveMarker(item.title)}}
              >
                <img src={item.icon} width={20} height={20} alt="" />
                <span>{item.title.slice(0, item.title.length - 5)}</span>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default DypiusDropdown;
