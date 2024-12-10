import React, { useEffect, useState } from "react";
import "./_marketplace.scss";
import useWindowSize from "../../../hooks/useWindowSize";
import Marquee from "react-fast-marquee";
import playIcon from "../../../assets/gameAssets/playIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import VideoPopup from "../../Game/VideoPopup";

const MarketPlace = () => {
  const [videoPopup, setVideoPopup] = useState(false);
  const [videoLink, setVideoLink] = useState(null);
  const html = document.querySelector("html");

  useEffect(() => {
    if (videoPopup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [videoPopup]);


  const videoGallery = [
    {
      videoLink: "https://www.youtube.com/watch?v=v5Um-Q8l9z8&t",
      imageLink: "https://img.youtube.com/vi/v5Um-Q8l9z8/maxresdefault.jpg",
      id: "v5Um-Q8l9z8"
    },
    {
      videoLink: "https://www.youtube.com/watch?v=szTyRNXuIN8",
      imageLink: "https://img.youtube.com/vi/szTyRNXuIN8/maxresdefault.jpg",
      id: "szTyRNXuIN8",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=4HRMvr2jtbE",
      imageLink: "https://img.youtube.com/vi/4HRMvr2jtbE/maxresdefault.jpg",
      id: "4HRMvr2jtbE",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=FSWRWFMYKNs",
      imageLink: "https://img.youtube.com/vi/FSWRWFMYKNs/maxresdefault.jpg",
      id: "FSWRWFMYKNs",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=xUAARbS2fqA",
      imageLink: "https://img.youtube.com/vi/xUAARbS2fqA/maxresdefault.jpg",
      id: "xUAARbS2fqA",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=M3U3JMDonos",
      imageLink: "https://img.youtube.com/vi/M3U3JMDonos/maxresdefault.jpg",
      id: "M3U3JMDonos",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=GRyXtyoFHAk",
      imageLink: "https://img.youtube.com/vi/GRyXtyoFHAk/maxresdefault.jpg",
      id: "GRyXtyoFHAk",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=tduGtPza4ik",
      imageLink: "https://img.youtube.com/vi/tduGtPza4ik/maxresdefault.jpg",
      id: "tduGtPza4ik",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=KOLiuDtF7CU",
      imageLink: "https://img.youtube.com/vi/KOLiuDtF7CU/maxresdefault.jpg",
      id: "KOLiuDtF7CU",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=2n9Y5lpxZ-g",
      imageLink: "https://img.youtube.com/vi/2n9Y5lpxZ-g/maxresdefault.jpg",
      id: "2n9Y5lpxZ-g",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=4VQTBHCS100",
      imageLink: "https://img.youtube.com/vi/4VQTBHCS100/maxresdefault.jpg",
      id: "4VQTBHCS100",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=eSdzwIpc2z8",
      imageLink: "https://img.youtube.com/vi/eSdzwIpc2z8/maxresdefault.jpg",
      id: "eSdzwIpc2z8",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=h9r6Y2KBwnI",
      imageLink: "https://img.youtube.com/vi/h9r6Y2KBwnI/maxresdefault.jpg",
      id: "h9r6Y2KBwnI",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=fdjbUswaHXo",
      imageLink: "https://img.youtube.com/vi/fdjbUswaHXo/maxresdefault.jpg",
      id: "fdjbUswaHXo",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=vhLI8E1eXto",
      imageLink: "https://img.youtube.com/vi/vhLI8E1eXto/maxresdefault.jpg",
      id: "vhLI8E1eXto",
    },
    {
      videoLink: "https://www.youtube.com/watch?v=NQpxySZUXn8",
      imageLink: "https://img.youtube.com/vi/NQpxySZUXn8/maxresdefault.jpg",
      id: "NQpxySZUXn8",
    },
  
  ];

  return (
    <>
      <div
        className="d-flex container-fluid justify-content-center mt-4"
        id="marketplace"
      >
        <div className="custom-container">
          <div className="flex-column justify-content-center text-white gap-4 mx-2">
            <div className="d-flex justify-content-start align-items-center  gap-2">
              <h2 className=" builders-title explorer-grid-title px-0 mb-4">
                Gallery
              </h2>
            </div>
            <>
              <Marquee gradient={false} className="mb-4">
                {/* {shuffledMedia
                  .slice(0, shuffledMedia.length / 2)
                  .map((item, index) => (
                    <div className="px-4" key={index}>
                      <img
                        src={require(`../../../assets/mediaAssets/${item}`)}
                        alt=""
                      />
                    </div>
                  ))} */}
                {videoGallery.slice(0, 8).map((item, index) => (
                 <div
                 className="video-gallery-item mx-3"
                 key={index}
                 onClick={() => {
                   setVideoPopup(true);
                   setVideoLink(item.id); // This is now the clean ID
                 }}
               >
                 <div className="gallery-play-icon-wrapper d-flex justify-content-center align-items-center">
                   <img src={playIcon} width={32} height={32} alt="Play Icon" />
                 </div>
                 <img
                   src={`https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`}
                   className="gallery-video-thumb"
                   alt="Thumbnail"
                 />
               </div>
                ))}
              </Marquee>
              <Marquee gradient={false} direction="right">
                {videoGallery
                  .slice(9, videoGallery.length)
                  .map((item, index) => (
                    <div
                    className="video-gallery-item mx-3"
                    key={index}
                    onClick={() => {
                      setVideoPopup(true);
                      setVideoLink(item.id); // This is now the clean ID
                    }}
                  >
                    <div className="gallery-play-icon-wrapper d-flex justify-content-center align-items-center">
                      <img src={playIcon} width={32} height={32} alt="Play Icon" />
                    </div>
                    <img
                      src={`https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`}
                      className="gallery-video-thumb"
                      alt="Thumbnail"
                    />
                  </div>
                  ))}
              </Marquee>
            </>

            {/* <div className="video-gallery-grid">
          {videoGallery.map((item, index) => (
            <div className="video-gallery-item" key={index}>
              <div className="gallery-play-icon-wrapper d-flex justify-content-center align-items-center">
                <img src={playIcon} width={32} height={32} alt="" />
              </div>
              <img src={item.imageLink} className="gallery-video-thumb" alt="" />
            </div>
          ))}
        </div> */}
          </div>
        </div>
      </div>
      {videoPopup && (
        <OutsideClickHandler onOutsideClick={() => setVideoPopup(false)}>
          <VideoPopup
            videoLink={videoLink}
            closeOverlay={() => setVideoPopup(false)}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default MarketPlace;
