import React,  { useState } from 'react'
import './_notifications.scss'
import MobileNav from '../../../components/MobileNav/MobileNav'
import MarketSidebar from '../../../components/MarketSidebar/MarketSidebar'
import useWindowSize from '../../../hooks/useWindowSize'
import allIcon from './assets/allIcon.svg'
import allIconActive from './assets/allIconActive.svg'
import cartIcon from './assets/cartIcon.svg'
import cartIconActive from './assets/cartIconActive.svg'
import eventIcon from './assets/eventIcon.svg'
import eventIconActive from './assets/eventIconActive.svg'
import markReadIcon from './assets/markReadIcon.svg'
import markReadIconActive from './assets/markReadIconActive.svg'
import newsIcon from './assets/newsIcon.svg'
import newsIconActive from './assets/newsIconActive.svg'
import offerIcon from './assets/offerIcon.svg'
import offerIconActive from './assets/offerIconActive.svg'
import transferIcon from './assets/transferIcon.svg'
import transferIconActive from './assets/transferIconActive.svg'
import updateIcon from './assets/updateIcon.svg'
import updateIconActive from './assets/updateIconActive.svg'
import deleteIcon from './assets/deleteIcon.svg'
import deleteIconActive from './assets/deleteIconActive.svg'

const Notifications = () => {

    const windowSize = useWindowSize();
    const [activeBar, setActiveBar] = useState("all")


  return (
    <>
    <div
      className="container-fluid d-flex justify-content-end mt-5 mt-lg-0 p-0"
      style={{ minHeight: "72vh", maxWidth: "2400px" }}
    >
      {windowSize.width < 992 ? <MobileNav /> : <MarketSidebar />}

      <div
        className="container-nft align-items-start justify-content-start d-flex flex-column gap-2 px-3 px-lg-5 my-4"
        style={{ minHeight: "72vh", backgroundSize: "cover" }}
      >
        <div className="container-lg mx-0">
        <h6 className="nft-page-title font-raleway mt-3 mb-4 mb-lg-4 mt-lg-4">
                Notification
                <span style={{ color: "#8c56ff" }}> Center</span>
              </h6>
              <div className={`notification-bar p-3 d-flex align-items-center justify-content-between`}>
                  <div className="d-flex align-items-center gap-3">
                    <div className={`${activeBar === "all" && "notification-bar-item-active"} notification-bar-item p-2 d-flex align-items-center gap-2`} onClick={() => setActiveBar("all")}>
                      <img src={activeBar === "all" ? allIconActive : allIcon} alt="" />
                      <h6 className="notification-item-text mb-0">All</h6>
                    </div>
                    <div className={`${activeBar === "activities" && "notification-bar-item-active"} notification-bar-item p-2 d-flex align-items-center gap-2`} onClick={() => setActiveBar("activities")}>
                      <img src={activeBar === "activities" ? updateIconActive : updateIcon} alt="" />
                      <h6 className="notification-item-text mb-0">Activities</h6>
                    </div>
                    <div className={` ${activeBar === "news" && "notification-bar-item-active"} notification-bar-item p-2 d-flex align-items-center gap-2`} onClick={() => setActiveBar("news")}>
                      <img src={activeBar === "news" ? newsIconActive : newsIcon} alt="" />
                      <h6 className="notification-item-text mb-0">News</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="notification-bar-item p-2 d-flex align-items-center gap-2">
                      <img src={markReadIcon} alt="" />
                      <h6 className="notification-item-text mb-0">Mark all as read</h6>
                    </div>
                    <div className="notification-bar-item p-2 d-flex align-items-center gap-2">
                      <img src={deleteIcon} alt="" />
                      <h6 className="notification-item-text mb-0">Clear all</h6>
                    </div>
                    
                  </div>
              </div>
              <div className="notifications-list">
                <div className="list-notification d-flex align-items-end justify-content-between">
                  <div className="d-flex-flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <img src={cartIcon} alt="" />
                      <h6 className="notification-title mb-0">NFT Sale</h6>
                    </div>
                    <p className="notification-desc mb-0">Your CAWS #234 has been successfully sold. The new owner of the CAWS is registered with the address: 0x375...2b5E.</p>
                  </div>
                  <div className="d-flex flex-column align-items-end gap-2">
                    <span className="notification-hour mb-0">10:25 AM</span>
                    <span className="notifcation-date mb-0">July 23, 2023</span>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
   
  </>
  )
}

export default Notifications