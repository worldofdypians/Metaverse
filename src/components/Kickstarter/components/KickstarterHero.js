import React from 'react'
import '../_kickstarter.scss'

const KickstarterHero = () => {
  return (
       <div className='container-fluid kickstarter-hero-wrapper d-flex align-items-center justify-content-center'>
        <div className="custom-container">
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start">
                        <h6 className='main-hero-title font-montserrat text-start'>Kickstart Program</h6>
                        <p className="market-banner-desc font-montserrat">Join the World of Dypians Kickstarter, a gateway for bold creators, builders, and partners to launch exclusive experiences, boost brand visibility, and drive real engagement growth within the game.</p>
                        <a href='https://forms.gle/MUYyzKpS23yrzGcB7' target='_blank' rel='noreferrer' className="explore-btn px-3 py-2">Apply Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default KickstarterHero