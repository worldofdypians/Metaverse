import React, { useEffect, useRef, useState } from "react";
import "./_orynfly.scss";
import orynGif from "./orynGif.gif";
import orynWebp from "./orynGif.webp";

const OrynFly = () => {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);

 
// useEffect(() => {
//     setTimeout(() => {
//         setIsPaused(true)
//     }, 1000);
//     if (videoRef.current) {
//         isPaused ? videoRef.current.play() : videoRef.current.pause();
//       }
// }, [])


  return (
    <div className="oryn-gif-holder d-flex align-items-center justify-content-end">
      <img src={orynWebp} alt="" className='oryn-gif' />
      {/* <video
        // ref={videoRef}
        src={orynWebp}
        autoPlay
        loop
        muted
        playsInline
        className="oryn-gif"
      /> */}
    </div>
  );
};

export default OrynFly;
