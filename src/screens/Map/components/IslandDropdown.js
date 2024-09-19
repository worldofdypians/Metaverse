import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import bearIcon from '../assets/bearIcon.svg';
import boarIcon from '../assets/boarIcon.svg';
import deerIcon from '../assets/deerIcon.svg';
import craftIcon from '../assets/sidebarIcons/craftIcon.svg';
import minesIcon from '../assets/sidebarIcons/minesIcon.svg';
import animalsIcon from '../assets/sidebarIcons/animalsIcon.svg';


const IslandDropdown = ({ options, parent, onZoomIn, switches, setSwitches }) => {

  return (
    <div className="d-flex px-3 flex-column gap-2">
    <div
      className="d-flex py-1 w-100 align-items-center"
      style={{ borderBottom: "1px solid #828FBB" }}
    >
      <h6 className="sidebar-section-title mb-0">Island Zero</h6>
    </div>
    <div
      className={`section-switch-btn ${
        switches.craftingTables && "section-switch-btn-active"
      } d-flex align-items-center gap-2 p-2 w-100`}
      onClick={() =>
        setSwitches((prev) => ({
          ...prev,
          craftingTables: !switches.craftingTables,
        }))
      }
    >
      <img src={craftIcon} alt="" />
      <span>Crafting Table</span>
    </div>
    <div
      className={`section-switch-btn ${
        switches.mines && "section-switch-btn-active"
      } d-flex align-items-center gap-2 p-2 w-100`}
      onClick={() =>
        setSwitches((prev) => ({
          ...prev,
          mines: !switches.mines,
        }))
      }
    >
      <img src={minesIcon} alt="" />
      <span>Mines</span>
    </div>

    <Accordion >
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
        <img src={animalsIcon} alt="" />
         <span className="accordion-side-text">Animals</span>
       </div>
      </AccordionSummary>
      <AccordionDetails sx={{padding: 0, marginTop: "12px"}}>
    
      </AccordionDetails>
    </Accordion>
  </div>
  );
};

export default IslandDropdown;
