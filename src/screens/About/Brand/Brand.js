import React from "react";
import "./_brand.scss";
import brandBanner from "../../../assets/brandBanner.webp";

const Brand = () => {
  return (
    <div
      className="d-flex justify-content-center w-100 mt-4"
      id="brand"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="d-flex flex-column align-items-center gap-4">
        <h2 className="font-montserrat builders-title explorer-grid-title px-2 px-lg-0">
          Brand Kit Assets
        </h2>
        <div className="brand-desc px-2 px-lg-0">
          Access the official World of Dypians Brand Kit, including logos, color
          palettes, typography, and guidelines. Use these assets to ensure
          consistency and professionalism in all your projects and
          communications.
        </div>
        <div className="position-relative">
          <img src={brandBanner} className="w-100 brandBanner" alt="" />
          {/* <div
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
          </div> */}
          <div
            className="d-flex w-100 justify-content-center position-relative"
            style={{ top: "-20px" }}
          >
            {" "}
            <a
              className="buy-wod-btn px-4 py-2 d-flex algin-items-center gap-1"
              style={{ width: "fit-content" }}
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
