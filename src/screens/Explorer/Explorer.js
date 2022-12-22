import React from "react";
import CawsSociety from "../Home/CawsSociety/CawsSociety";
import Characters from "./Characters";
import GameModes from "./GameModes";
import GamePillars from "./GamePillars";
import Skills from "./Skills";
import "./_explorer.scss";

const Explorer = () => {
  return (
    <div className="container-fluid d-flex px-0 align-items-center justify-content-center" style={{overflowX: 'hidden'}}>
      <div className="explorer-main-wrapper px-0 w-100 mt-5 d-flex flex-column">
        <Characters />
        <GameModes />
        <GamePillars />
        <CawsSociety />
        <Skills />
      </div>
    </div>
  );
};

export default Explorer;
