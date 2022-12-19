import React from "react";
import "./_discord.scss";

const Discord = () => {
  return (
    <div className="row w-100 px-5 mx-0 discord-wrapper py-5">
      <div className="col-6" style={{zIndex: '3'}}>
        <div className="d-flex flex-column gap-3">
          <h2 className="discord-title font-organetto">
            Connect with our immerse discord community
          </h2>
          <p className="discord-content font-poppins">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
            elit ut vulputate suscipit, nisi metus gravida justo, nec placerat
            massa est sed ex.
          </p>
          <div className="d-flex align-items-center justify-content-start gap-4">
            <div className="linear-border">
              <button className="btn filled-btn px-5">Join today</button>
            </div>
            <div className="linear-border">
              <button className="btn outline-btn px-5">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discord;
