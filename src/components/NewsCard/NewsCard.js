import React, { useEffect, useState } from 'react'
import calendarIcon from "../../assets/newsAssets/calendarIcon.svg";
import plusIcon from "../../assets/newsAssets/plusIcon.svg";
import minusIcon from "../../assets/newsAssets/minusIcon.svg";

const NewsCard = ({type, image, title, content, date}) => {

const [showContent, setShowContent] = useState(false)
const [contentLength, setContentLength] = useState(280)
const [dots, setDots] = useState('...')




useEffect(() => {
  
  if(showContent === true){
    setContentLength(content.length)
    setDots('')
  }else{
    setContentLength(280)
    setDots('...')

  }
 
}, [showContent])

var options = { year: "numeric", month: "short", day: "numeric" };



    const paragraph = "Fixed Hoodwink Decoy not casting Sharpshooter due to insufficient mana Fixed Io's tethered movespeed able to go below minimum movement speed Fixed Monkey King's Tree Dance sometimes not correctly highlighting all trees in jump range Fixed Batrider's Sticky Napalm cast range being 550 instead of 600 Fixed Razor's Damage Stolen Static Link talent giving extra damage stolen"

  return (
    <div className="news-card-wrapper">
    <div className="news-card p-3 d-flex flex-column gap-3">
      <div className="d-flex flex-column flex-lg-row align-items-start justify-content-between gap-3">
        <div className="d-flex align-items-start">
          <img
            src={image}
            alt="news image"
            className="news-image"z
          />
          
        </div>
          <div className="d-flex flex-column gap-3 w-100">
            <div className="d-flex  align-items-center justify-content-between">
            <div className={`${type === "announcement" ? 'announcement-tag' : 'new-release-tag'} `}>{type === "announcement" ? 'Announcements' : 'New Releases'}</div>
            <div className="d-flex align-items-center gap-2">
          <img src={calendarIcon} alt="calendar" />
          <span className="news-date font-poppins">{date.toLocaleDateString("en-US", options)}</span>
        </div>
            </div>
            <div className="update-title font-organetto m-0">
              {title}
            </div>
          </div>
       
       
      </div>
      <p className="news-content font-poppins" dangerouslySetInnerHTML={{__html: content.slice(0, contentLength) + dots}}>
      </p>
      <div className="d-flex align-items-center gap-2" style={{cursor: 'pointer'}} onClick={() => setShowContent(!showContent)}>
        <span className="read-more font-poppins">{showContent ? 'Read less' : 'Read more'}</span>
        <img src={showContent ? minusIcon : plusIcon} alt="plus" />
      </div>
    </div>
  </div>
  )
}

export default NewsCard