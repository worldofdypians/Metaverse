import React from 'react'

const KickstarterOnboarding = () => {
  return (
    <div>
        <div className="container-fluid d-flex  p-0">
          <img
            src={"https://cdn.worldofdypians.com/wod/museumAiBannerSmall.webp"}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper museum-ai-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
            <div className="d-flex flex-column-reverse flex-lg-row align-items-center justify-content-end gap-3 gap-lg-5 mb-3 mb-lg-0">
              <img
                src={"https://cdn.worldofdypians.com/wodcawsAmplify.png"}
                className="d-none d-lg-flex"
                alt=""
              />
              <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-3 px-4 py-3 px-lg-3 align-items-center align-items-md-end">
                <span className="amp-benefits-desc text-center text-md-end">
                  Kickstart
                </span>
                <span className="ways-to-amplify-title text-center text-md-end">
                  Smart Onboarding for Web2 Users
                </span>
                <span className="ways-to-amplify-desc mb-2 text-center text-md-end">
                  Through the Cryptorium Museum & Academy, your project benefits
                  from an AI-powered onboarding engine that helps educate
                  millions of traditional users, introducing them to Web3 in an
                  immersive way. Your token and mission can be featured in this
                  educational zone, turning newcomers into engaged participants
                  .
                </span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default KickstarterOnboarding