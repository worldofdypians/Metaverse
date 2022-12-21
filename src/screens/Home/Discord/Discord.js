import React from "react";
import "./_discord.scss";

const Discord = () => {
  return (
    <div className="row w-100 px-3 px-lg-5 mx-0 discord-wrapper py-5">
      <div className="col-12 col-lg-6 px-0" style={{zIndex: '3'}}>
        <div className="d-flex flex-column gap-3">
          <h2 className="discord-title font-organetto">
            Connect with our immerse discord community
          </h2>
          <p className="discord-content font-poppins">
          Join the World of Dypians community on discord. connect with other players and receive the latest news and updates.
          </p>
          <div className="d-flex flex-column flex-lg-row w-100 align-items-center justify-content-start gap-4 gap-lg-0">
           <div className="d-flex w-100 justify-content-start">
           <div className="linear-border">
              <button className="btn filled-btn px-5">Join today</button>
            </div>
           </div>
           <div className="d-flex w-100 justify-content-end justify-content-lg-start">
           <div className="linear-border">
              <button className="btn outline-btn px-5">Contact Us</button>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discord;
