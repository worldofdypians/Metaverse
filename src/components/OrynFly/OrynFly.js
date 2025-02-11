import React, { useState } from "react";
import "./_orynfly.scss";
import orynWebp from "./orynGif.webp";
import { NavLink } from "react-router-dom";

const OrynFly = ({onClose}) => {

  const [chat, setChat] = useState(false)

 



  return (
    <div  className="oryn-gif-holder d-flex align-items-center justify-content-end">
      <div className={`oryn-chat-title ${chat && "oryn-chat-active"} p-2 d-flex align-items-center justify-content-between`}>
        <div className="chat-fang"></div>
        <NavLink to={"/ai-agent"}>
        <h6 className="oryn-chat-text mb-0">Hello, I am Oryn</h6>
        </NavLink>
        <img src={'https://cdn.worldofdypians.com/wod/xMark.svg'} width={20} height={20} style={{cursor: "pointer"}} alt="" onClick={onClose} />

      </div>
      <NavLink to={"/ai-agent"} className={"d-flex justify-content-end"}> 
      <img src={orynWebp} alt="" className='oryn-gif' />
      </NavLink>
    
    </div>
  );
};

export default OrynFly;
