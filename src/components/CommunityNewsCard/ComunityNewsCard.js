import React, { useState } from "react";

import useWindowSize from "../../hooks/useWindowSize";

const ComunityNewsCard = ({ image, link, content, date, video, id }) => {
  var options = { year: "numeric", month: "short", day: "numeric" };
  const windowSize = useWindowSize();

  const player = (id) => {
    let video = document.getElementById(id);
    setPlayButton(false);
    setCount(1);

    setControls(true);
    const timer = setTimeout(() => {
      if (count === 0) {
        video.play();
      }
    }, 1000);
    return () => clearTimeout(timer);
    video.addEventListener("ended", function () {
      video.load();
    });
  };

  const [controls, setControls] = useState(false);
  const [count, setCount] = useState(0);

  const [playButton, setPlayButton] = useState(true);

  return (
    <div className="community-card d-flex flex-column justify-content-between p-3">
      <div className="d-flex flex-column gap-3">
        <div className="position-relative">
          {video ? (
            <video
              src={video}
              poster={image}
              id={id}
              onClick={() => player(id)}
              alt=""
              autoPlay=""
              loop=""
              muted="muted"
              playsInline={true}
              controlsList="nodownload"
              className="community-image w-100"
              controls={controls}
            />
          ) : (
            <img src={image} className="community-image w-100" />
          )}
          <img
            src={"https://cdn.worldofdypians.com/wod/twitterTag.svg"}
            alt="twitter"
            className="twitter-tag"
          />
          {/* <div className="play-button-wrapper d-flex align-items-center justify-content-center"> */}
          <img
            src={"https://cdn.worldofdypians.com/wod/communityPlay.svg"}
            className={`play-button ${!playButton && "d-none"}`}
            alt="play button"
          />
          {/* </div> */}
        </div>

        <a
          href={link}
          target="_blank"
          className="community-desc  font-poppins d-flex flex-column justify-content-center"
          dangerouslySetInnerHTML={{
            __html:
              content.slice(0, windowSize.width > 786 ? 180 : 100) + "...",
          }}
        ></a>
      </div>
      <a
        href={link}
        target="_blank"
        className="d-flex align-items-center justify-content-between"
        style={{ textDecoration: "none" }}
      >
        <div className="d-flex align-items-center gap-2">
          <img
            src={"https://cdn.worldofdypians.com/wod/calendarIcon.svg"}
            alt="calendar"
            width={24}
            height={24}
          />
          <span className="community-date">
            {" "}
            {date.toLocaleDateString("en-US", options)}
          </span>
        </div>
        <img
          src={"https://cdn.worldofdypians.com/wod/halfArrow.svg"}
          alt="arrow"
        />
      </a>
    </div>
  );
};

export default ComunityNewsCard;
