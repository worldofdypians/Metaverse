import React from "react";
import "./_twitterrewards.scss";

const ConnectTwitterPopup = ({ onClose, address }) => {
  return (
    <div className="popup-wrapper popup-active connect-twitter-popup p-3 d-flex flex-column align-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="mt-3"
        fill="none"
      >
        <circle cx="25" cy="25" r="25" fill="url(#paint0_linear_5642_1310)" />
        <g clip-path="url(#clip0_5642_1310)">
          <path
            d="M34.2533 11H39.1755L28.3681 23.3054L40.9946 39.9979H31.086L23.3283 29.854L14.447 39.9979H9.52483L20.9742 26.8365L8.88281 11H19.0374L26.0462 20.2665L34.2533 11ZM32.5306 37.1088H35.2592L17.6036 13.7821H14.6717L32.5306 37.1088Z"
            fill="white"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_5642_1310"
            x1="0"
            y1="0"
            x2="50"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1B8CFA" />
            <stop offset="1" stop-color="#036AD1" />
          </linearGradient>
          <clipPath id="clip0_5642_1310">
            <rect
              width="32.101"
              height="28.9979"
              fill="white"
              transform="translate(9 11)"
            />
          </clipPath>
        </defs>
      </svg>
      <h6 className="twitter-popup-title mt-3">Connect X Account</h6>
      <span className="twitter-popup-desc text-center mt-3">
        Link your X account to start earning rewards through social engagement
        tasks.
      </span>
      <a 
                    href={`https://api.worldofdypians.com/auth/twitter?walletAddress=${address}`}
      
      className="connect-twitter-btn d-flex align-items-center justify-content-center p-2 gap-2 mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="14"
          viewBox="0 0 31 28"
          fill="none"
        >
          <path
            d="M24.4922 0H29.2439L18.8107 11.8819L31 28H21.4345L13.9454 18.2052L5.37154 28H0.619793L11.6728 15.2915L0 0H9.80307L16.5691 8.9476L24.4922 0ZM22.8291 25.2103H25.4632L8.41886 2.68635H5.58847L22.8291 25.2103Z"
            fill="white"
          />
        </svg>
        Connect Your Account
      </a>
    </div>
  );
};

export default ConnectTwitterPopup;
