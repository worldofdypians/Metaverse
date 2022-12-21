import React from 'react'
import './_footer.scss'
import metaverse from '../../assets/navbarAssets/metaverse.svg'

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <div className="footer-container flex-column px-3 px-lg-5">
        <div className="d-flex pt-5 pb-4 w-100 flex-column flex-lg-row align-items-start align-items-lg-center gap-4 gap-lg-0 justify-content-between">
          <img src={metaverse} alt="" />
          <span className="footer-link font-poppins">Dypius</span>
          <span className="footer-link font-poppins">Whitepaper</span>
          <span className="footer-link font-poppins">Terms & Conditions</span>
          <span className="footer-link font-poppins">Privacy Policy</span>
          <span className="footer-link font-poppins">Contact Us</span>
        </div>
        <hr className="footer-divider mt-0 mb-4" />
        <div className="d-flex w-100 align-items-center justify-content-center mb-4">
          <span className="footer-link font-poppins">
            Metaverse {year}. We love our users
          </span>
        </div>
    </div>
  )
}

export default Footer