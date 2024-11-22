import React from 'react'
import popupXmark from "../../screens/Marketplace/assets/popupXmark.svg";
import OutsideClickHandler from 'react-outside-click-handler';
import videoBorder from '../../assets/videoBorder.png'

const VideoPopup = ({videoLink, closeOverlay}) => {
  return (
    <div className="overlay">
    <div className="overlay-content">
        {/* <img src={videoBorder} alt="" className="video-border" /> */}
      <iframe
      className='video-player'
        src={`https://www.youtube.com/embed/${videoLink}`}
    
        style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
      ></iframe>
    </div>
        <img src={popupXmark} style={{cursor: "pointer"}} onClick={closeOverlay} className='youtube-close-button' alt="" />
  </div>
  )
}

export default VideoPopup