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
import craftingIcon from '../assets/craftingIcon.svg';
import mineIcon from '../assets/minerIcon.svg';

const IslandDropdown = ({ options, parent, onZoomIn, switches, setSwitches }) => {

  return (
    <FormControl>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel2a-header"
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
              aria-controls={`animals-content`}
              id={`animals-header`}
            >
            <div className="d-flex align-items-center gap-2">
              <img src={bearIcon} width={24} height={24} alt="" />
            <span className='text-white'>Animals</span>
            </div>
            </AccordionSummary>
            <AccordionDetails>
            <div className="d-flex flex-column gap-3">
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  bear: !switches.bear,
                }))}
                style={{opacity: switches.bear ? "1" : "0.6"}}
                >
            <img src={bearIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Bears
            </h6>
          </div>
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  deer: !switches.deer,
                }))}
                style={{opacity: switches.deer ? "1" : "0.6"}}
                >
            <img src={deerIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Deer
            </h6>
          </div>
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  boar: !switches.boar,
                }))}
                style={{opacity: switches.boar ? "1" : "0.6"}}
                >
            <img src={boarIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Boars
            </h6>
          </div>
         </div>
          
            </AccordionDetails>
          </Accordion>
          <div className="d-flex flex-column gap-3">
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  craftingTables: !switches.craftingTables,
                }))}
                style={{opacity: switches.craftingTables ? "1" : "0.6"}}
                >
            <img src={craftingIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Crafting Table
            </h6>
          </div>
          <div className="map-sidebar-btn p-2 d-flex align-items-center gap-2" onClick={() =>
                setSwitches((prevState) => ({
                  ...prevState,
                  mines: !switches.mines,
                }))}
                style={{opacity: switches.mines ? "1" : "0.6"}}
                >
            <img src={mineIcon} alt="" width={24} height={24} />
            <h6 className="chain-sidebar-title mb-0 text-white">
              Mines
            </h6>
          </div>
         
         </div>
        </AccordionDetails>
      </Accordion>
    </FormControl>
  );
};

export default IslandDropdown;
