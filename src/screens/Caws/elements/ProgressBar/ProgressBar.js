import * as React from "react";
import { PropTypes } from "prop-types";
import "./ProgressBar.css";

const ProgressBar = ({ width, percent, status, height }) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent * width);
  });

  return (
    <div className={"progressComp"}>
      <span className="percent-number">{status}</span>
      <div className="progress-div" style={{ width: width, height: height }}>
        <div style={{ width: `${value}px` }} className="progress" />
      </div>
    </div>
  );
};


ProgressBar.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  percent: PropTypes.any,
  status: PropTypes.any,
};

export default ProgressBar;
