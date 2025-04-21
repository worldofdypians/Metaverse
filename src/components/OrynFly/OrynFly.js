import React, { useState, useEffect } from "react";
import "./_orynfly.scss";
import orynGif from "./orynGif.webp"; // Walking animation (~10s)
import orynGifIdle from "./newOrynGifIdle.webp"; // Idle animation
import { NavLink } from "react-router-dom";

const OrynFly = ({ onClose }) => {
  const [chat, setChat] = useState(false);
  const [showIdle, setShowIdle] = useState(false);

  useEffect(() => {
    // Preload images
    const img1 = new Image();
    img1.src = orynGif;
    const img2 = new Image();
    img2.src = orynGifIdle;

    // Show chat after 8s
    const chatTimeout = setTimeout(() => setChat(true), 8000);
    
    // Switch GIF after 10s
    const gifTimeout = setTimeout(() => setShowIdle(true), 10400);

    return () => {
      clearTimeout(chatTimeout);
      clearTimeout(gifTimeout);
    };
  }, []);

  return (
    <div className="oryn-gif-holder d-flex align-items-center justify-content-end">
      <div
        className={`oryn-chat-title ${
          chat ? "oryn-chat-active" : ""
        } p-2 d-flex align-items-center justify-content-between`}
      >
        <div className="chat-fang"></div>
        <NavLink to={"/ai-agent"}>
          <h6 className="oryn-chat-text mb-0">Hello, I am Oryn</h6>
        </NavLink>
        <img
          src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
          width={20}
          height={20}
          style={{ cursor: "pointer", opacity: 0.8, zIndex: 11 }}
          alt="Close"
          onClick={onClose}
        />
      </div>
      <NavLink to={"/ai-agent"} className="d-flex justify-content-end">
        <img
          src={showIdle ? orynGifIdle : orynGif}
          alt="Oryn Animation"
          className={`oryn-gif ${showIdle ? "fade-in" : ""}`}
        />
      </NavLink>
    </div>
  );
};

export default OrynFly;
