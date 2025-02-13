import React from 'react'

const AgentHero = ({openPopup}) => {
  return (
    <div className="bridge-hero-wrapper  position-relative d-flex align-items-center flex-column justify-content-center gap-5">
      <div className="custom-container  mt-5 mt-lg-0">
        <div className="d-flex flex-column w-100">
          <div className="row mx-0 align-items-center justify-content-center gap-2 mt-5 mt-lg-0">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center" style={{position: "relative", bottom: "30px"}}>
                <h6 className="market-banner-title text-center">AI Agent Oryn</h6>
                <span className="market-banner-desc font-montserrat text-center">
                Oryn is an AI Agent in World of Dypians, offering strategic insights, mission support, and deep lore from the tech-magic world.

                </span>
                <button className="getpremium-btn px-3 py-2" onClick={openPopup}>Get Premium</button>
              </div>
            </div>
            {/* <div className="col-12 col-lg-5 pe-0 d-flex justify-content-center">
              <img src={bridgeIcon} className="w-100" alt="" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentHero