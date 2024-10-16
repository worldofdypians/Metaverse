import React from "react";
import "./_brand.scss";
import brandBanner from "../../../assets/brandBanner.webp";

const Brand = () => {
  return (
    <div className="d-flex justify-content-center w-100" id="brand">
      <div className="d-flex flex-column align-items-center gap-4">
        <h2 className="font-montserrat builders-title explorer-grid-title px-0">
          Brand Kit{" "}
          <mark className="font-montserrat explore-tag pe-2">Assets</mark>
        </h2>
        <div className="brand-desc">
          Access the official World of Dypians Brand Kit, including logos, color
          palettes, typography, and guidelines. Use these assets to ensure
          consistency and professionalism in all your projects and
          communications.
        </div>
        <div className="position-relative">
          <img src={brandBanner} className="w-100 brandBanner" alt=""/>
          <div
            className="multiplayer-linear-border download-brand"
            style={{
              zIndex: 5,
              position: "relative",
              textDecoration: "none",
            }}
          >
            <a
              className="btn multiplayer-btn py-1 px-5 d-flex align-items-center w-100 gap-2 justify-content-center"
              href="https://drive.google.com/drive/folders/1GvrV3iDooxFZhbiDGUMZcjNbi5TcR2i5?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
