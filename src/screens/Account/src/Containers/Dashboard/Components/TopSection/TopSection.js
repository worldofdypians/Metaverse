import React from 'react'
import './_topsection.scss'
import globe from './assets/globe.png'
import leaderboardIcon from './assets/leaderboardIcon.svg'

const TopSection = () => {
  return (
      <div className="row">
        <div className="col-12 col-lg-4">
        <h6
              className="new-bundle-title"
            >
              Leaderboards
            </h6>
          <div className="diagonal-button-wrapper  d-flex align-items-center">
              <div className="first-diagonal-btn purple-container p-3 d-flex align-items-start justify-content-start">
                <div className='d-flex flex-column align-items-center justify-content-start ms-5 mt-3'>
                <h6 className="mb-0 leaderboard-title-span font-oxanium" style={{fontSize: "16px"}}>Game Leaderboard</h6>
                <img src={leaderboardIcon} width={80} height={80} alt="" />
                </div>
              </div>
              <div className="second-diagonal-btn purple-container d-flex align-items-end justify-content-end">
                <div className="d-flex flex-column align-items-center justify-content-end me-5 mb-3">
                  <img src={globe} width={80} height={80} alt="" />
                <h6 className="mb-0 p-3 leaderboard-title-span font-oxanium" style={{fontSize: "16px"}}>Genesis Leaderboard</h6>

                </div>
              </div>
          </div>
        </div>
        <div className="col-12 col-lg-8 px-0">
        <h6
              className="new-bundle-title"
            >
              Promotions
            </h6>
          <div className="purple-container p-3" style={{height: "300px"}}>

          </div>
        </div>
      </div>
  )
}

export default TopSection