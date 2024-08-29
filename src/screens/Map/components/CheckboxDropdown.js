import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CheckboxDropdown = ({options, parent, handleParentEvent, onZoomIn}) => {
    const [parentChecked, setParentChecked] = useState(false);

    const handleParentCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setParentChecked(isChecked);
        if (isChecked) {
            handleParentEvent(true)
          
        } else {
            handleParentEvent(false)
       

        }
    };

 

    return (
        <FormControl>
            <Accordion>
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon sx={{color: "white"}} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        color: 'white',
                        padding: 0,
                        '& .MuiAccordionSummary-content': {
                            margin: 0,
                        },
                    }}
                >
                    {/* Wrapper to prevent label click from toggling checkbox */}
                   
                    {/* Label text, separated from the checkbox */}
                    <span style={{ marginLeft: 8 }}>{parent}</span>
                </AccordionSummary>
                <AccordionDetails>
                     <div className="d-flex flex-column gap-3">
                     {options.map(option => (
                          <div className="d-flex align-items-start gap-2" style={{cursor: "pointer"}} onClick={() => onZoomIn(option.location, true)}>
                            <img src={require(`../assets/${option.icon}`)} width={24} height={24} alt="" />
                            <h6 className="chain-sidebar-title mb-0 text-white">
                                {option.title}
                            </h6>
                          </div>
                        ))}
                     </div>
                </AccordionDetails>
            </Accordion>
        </FormControl>
    );
}

export default CheckboxDropdown