import React from "react";
import PropTypes from 'prop-types'
import { Divider } from "@mui/material";

import classes from "./PlayerList.module.css";

const PlayerList = ({ style, name, showDivider }) => {
  return (
    <>
      <div
        style={{ ...style }}
        className={classes.contentContainer}
      >
        <div className={classes.itemsContainer}>
          <p className={classes.text}>{name}</p>
        </div>
        {showDivider && <Divider sx={{
          width: "85%",
          height: '1px',
          fontWeight: 600,
          alignSelf: 'center',
          backgroundColor: '#080B2A',
          position: 'absolute',
          bottom: 0
        }} />}
      </div>
    </>
  );
};



PlayerList.propTypes = {
  name: PropTypes.any,
  style: PropTypes.object,
  showDivider: PropTypes.bool
}

PlayerList.defaultProps = {
  showDivider: false
}

export default PlayerList;
