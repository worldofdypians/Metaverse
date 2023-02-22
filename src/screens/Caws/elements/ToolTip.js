import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { PropTypes } from "prop-types";

const ToolTip = ({ title, icon, borderColor, color, padding }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={title}
          placement={'bottom-end'}
        >
          <p
            onClick={handleTooltipOpen}
            className='m-0'
            style={{
              cursor: "pointer",
              color: color,
              backgroundColor: borderColor,
              padding: padding,
              borderRadius: "50%",
              fontSize: 14,
            }}
            id="tooltip-icon"
          >
            {icon}
          </p>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};

ToolTip.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
};

export default ToolTip;
