import React, { useState } from "react";
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import halfArrow from "../../assets/newsAssets/halfArrow.svg";
import twitterTag from "../../assets/newsAssets/twitterTag.svg";

const ComunityNewsCard = ({ image, link, content, date, video, id }) => {
  var options = { year: "numeric", month: "short", day: "numeric" };

  const player = (id) => {
    let video = document.getElementById(id);

    video.play();

    video.addEventListener("ended", function () {
      video.load();
    });
  };

  const [controls, setControls] = useState(false)


  const showControls = () => {
    setControls(true)
  }
  const removeControls = () => {
    setControls(false)
  }
  let videoTag = document.getElementById(id);

videoTag?.addEventListener('mouseenter', showControls)
videoTag?.addEventListener('mouseleave', removeControls)

  return (
    <div
      className="community-card d-flex flex-column justify-content-between p-3"
    >
      <div className="d-flex flex-column gap-3">
      <div className="position-relative">
        <video
          src={video}
          poster={image}
          id={id}
          onClick={() => player(id)}
          alt=""
          autoPlay=""
          loop=""
          muted="muted"
          playsInline="true"
          controlsList="nodownload"
          className="community-image w-100"
          controls={controls}
        />
        <img src={twitterTag} alt="twitter" className="twitter-tag" />
      </div>
   
      <a
      href={link}
      target="_blank"
        className="community-desc  font-poppins d-flex flex-column justify-content-center"
        dangerouslySetInnerHTML={{ __html: content.slice(0, 180) + "..." }}
      ></a>
      </div>
      <a href={link} target="_blank" className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img src={calendarIcon} alt="calendar" width={24} height={24} />
          <span className="community-date">
            {" "}
            {date.toLocaleDateString("en-US", options)}
          </span>
        </div>
        <img src={halfArrow} alt="arrow" />
      </a>
    </div>
  );
};

export default ComunityNewsCard;
