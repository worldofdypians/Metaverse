import axios from "axios";
import React, { useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";

const BlurredTwitterItem = () => {


  return (
    <div
      className="twitter-task-item blurred-twitter-item d-flex flex-column flex-lg-row align-items-center justify-content-between  w-100  p-2 position-relative"
    >
      
      <div className="d-flex flex-column gap-3 twitter-item-width">
        <div
        
          className="tweet-title-holder p-3 d-flex align-items-center gap-2"
        >
          <img
            src="https://cdn.worldofdypians.com/wod/wodToken.svg"
            width={32}
            height={32}
            alt=""
          />
          <div
            target="_blank"
            className="overall-link d-flex flex-column gap-1"
          >
            <span className="twitter-post">Market dumped but our community stayed unbothered like true diamond hands warriors</span>
            <span className="twitter-post">00:00</span>
          </div>
        </div>
     
      </div>
           <div className="d-flex align-items-end align-items-lg-center flex-row flex-lg-column gap-2 mt-3 mt-lg-0">
            <button
              className={`twitter-action-btn d-flex align-items-center gap-2 p-1`}
            >
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class={`lucide lucide-heart icon-color`}
                    aria-hidden="true"
                  >
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                  </svg>

                  <span className="twitter-action-text">Check</span>
                </>
            </button>

            <button
              className={`twitter-action-btn  d-flex align-items-center gap-2 p-1`}
            >
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class={`lucide lucide-repeat icon-color`}
                    aria-hidden="true"
                  >
                    <path d="m17 2 4 4-4 4"></path>
                    <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                    <path d="m7 22-4-4 4-4"></path>
                    <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                  </svg>
                  <span className="twitter-action-text">Check</span>
                </>
            </button>

            <button
              className={`twitter-action-btn  d-flex align-items-center gap-2 p-1`}
            >
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class={`lucide lucide-message-circle icon-color`}
                    aria-hidden="true"
                  >
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                  </svg>
                  <span className="twitter-action-text">Check</span>
                </>
            </button>
          </div>
    </div>
  );
};

export default BlurredTwitterItem;
