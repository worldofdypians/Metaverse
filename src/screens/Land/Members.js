import React, { useState, useEffect } from "react";
import axios from "axios";
import landtop from "../../assets/landAssets/landtop.webp";
import membersTwitter from "../../assets/landAssets/membersTwitter.svg";
import membersDiscord from "../../assets/landAssets/membersDiscord.svg";
import membersPlaying from "../../assets/landAssets/membersPlaying.svg";
import getFormattedNumber from "../Caws/functions/get-formatted-number";

const Members = ({handleRegister}) => {
  const [seats, setSeats] = useState(0);

  const countSeats = async () => {
    await axios
      .get("https://api3.dyp.finance/api/whitelist/count")
      .then((data) => {
        setSeats(data.data.count);
      }).catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    countSeats();
  }, []);

  return (
    <div className="row flex-column justify-content-center align-items-center position-relative w-100 mx-0 px-3 px-lg-5">
      <h6 className="font-organetto members-title" style={{ color: "#85fbc9" }}>
      Registration for live beta testing open now!
      </h6>
      <h6 className="font-organetto members-title mb-5">
      Gain early access and provide valuable community feedback
      </h6>
      <img src={landtop} className="w-25 laptop" alt="land laptop" />
      <div className="first-bubble">
        <img src={membersPlaying} alt="" className="members-playing" />
        <div className="d-flex flex-column align-items-center justify-content-center gap-2 glass-bubble first-glass">
          <h6 className="pink-title font-organetto">300</h6>
          <span className="pink-content">Already playing</span>
        </div>
      </div>
      <div className="second-bubble">
        <div className="d-flex flex-column align-items-center justify-content-center gap-2 glass-bubble second-glass">
          <h6
            className="pink-title font-organetto"
            style={{ fontSize: "25px" }}
          >
            {getFormattedNumber(seats,0) }
          </h6>
          <span className="pink-content" style={{ fontSize: "15px" }}>
            Registered
          </span>
        </div>
      </div>
      <div className="third-bubble">
        <img src={membersDiscord} alt="" className="discord-members" />
        <div className="d-flex flex-column align-items-center justify-content-center gap-2 glass-bubble third-glass">
          <h6 className="blue-title font-organetto">13K</h6>
          <span className="blue-content">Members</span>
        </div>
      </div>
      <div className="fourth-bubble">
        <img src={membersTwitter} alt="" className="twitter-members" />
        <div className="d-flex flex-column align-items-center justify-content-center gap-2 glass-bubble fourth-glass">
          <h6
            className="blue-title font-organetto"
            style={{ fontSize: "25px" }}
          >
            122K
          </h6>
          <span className="blue-content" style={{ fontSize: "15px" }}>
            Followers
          </span>
        </div>
      </div>
      <div className="linear-border" style={{ width: "fit-content" }}>
        <button className="btn filled-btn px-5 w-100" onClick={handleRegister}>Join whitelist</button>
      </div>
    </div>
  );
};

export default Members;
