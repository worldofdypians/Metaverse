import React from 'react'
import './_investors.scss'

const Investors = () => {

    const launchpads = [
        {
            title: "poolz",
            logo: "poolz.svg"
        },
        {
            title: "Ordify",
            logo: "ordify.svg"
        },
        {
            title: "WeWay",
            logo: "weway.svg"
        },
        {
            title: "Finceptor",
            logo: "finceptor.svg"
        },
    ]
    const investors = [
        {
            title: "Castrum Capital",
            logo: "castrum.png"
        },
        {
            title: "Financial Move",
            logo: "financialMove.svg"
        },
        {
            title: "MPC Education",
            logo: "mpcEducation.svg"
        },
        {
            title: "Crypto Adventure",
            logo: "cryptoAdventure.svg"
        },
    ]


  return (
   <div className="container-fluid px-5 py-4 investors-bg d-flex flex-column gap-3">
    <div className="d-flex flex-column gap-3">
        <h6 className="mb-0 investors-title">
            Launchpads
        </h6>
        <div className="investors-grid">
            {launchpads.map((item, index) => (
                <div className="investors-item py-2" key={index}>
                    <img src={require(`./assets/${item.logo}`)} className='investors-img' alt="" />
                </div>
            ))}
        </div>
    </div>
    <div className="d-flex flex-column gap-3">
        <h6 className="mb-0 investors-title">
            Investors
        </h6>
        <div className="investors-grid">
            {investors.map((item, index) => (
                <div className="investors-item py-2" key={index}>
                    <img src={require(`./assets/${item.logo}`)} className='investors-img' alt="" />
                </div>
            ))}
        </div>
    </div>
   </div>
  )
}

export default Investors