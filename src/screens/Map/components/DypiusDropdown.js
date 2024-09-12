import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { dypiansTransport, leaderboards, quests } from "../mapdata/areas";
import teleportIcon from "../assets/teleportIcon.svg";
import questIcon from "../assets/questIcon.svg";
import leaderboardsIcon from "../assets/leaderboardsIcon.svg";

const DypiusDropdown = ({ options, parent, onZoomIn, switches, setSwitches }) => {
 
  return (
    <FormControl>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            color: "white",
            padding: 0,
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          }}
        >
          {/* Wrapper to prevent label click from toggling checkbox */}
          <span style={{ marginLeft: 8 }}>{parent}</span>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls={`areas-content`}
              id={`areas-header`}
            >
              <span>Areas</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="d-flex flex-column gap-3" style={{maxHeight: "300px", overflowY: "scroll"}}>
                {options?.map((option, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-start gap-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => onZoomIn(option, 18, "chain")}
                  >
                    <img
                      src={option.icon}
                      width={24}
                      height={24}
                      alt=""
                    />
                    <h6 className="chain-sidebar-title mb-0 text-white">
                      {option.title}
                    </h6>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
         <div className="d-flex flex-column gap-3">
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  leaderboards: !switches.leaderboards,
                }))}
                style={{opacity: switches.leaderboards ? "1" : "0.6"}}
                >
            <img src={leaderboardsIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Leaderboards
            </h6>
          </div>
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  teleports: !switches.teleports,
                }))}
                style={{opacity: switches.teleports ? "1" : "0.6"}}
                >
            <img src={teleportIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Teleports
            </h6>
          </div>
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  quests: !switches.quests,
                }))}
                style={{opacity: switches.quests ? "1" : "0.6"}}
                >
            <img src={questIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Quests
            </h6>
          </div>
         </div>
          
        </AccordionDetails>
      </Accordion>
    </FormControl>
  );
};

export default DypiusDropdown;
