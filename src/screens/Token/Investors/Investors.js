import React from 'react'
import './_investors.scss'

const Investors = () => {

    const launchpads = [
        {
            title: "poolz",
            logo: "poolz.svg",
            link: "https://www.poolz.finance/",
        },
        {
            title: "Ordify",
            logo: "ordify.svg",
            link: "https://ordify.world/",
        },
        {
            title: "WeWay",
            logo: "weway.svg",
            link: "https://weway.io/",
        },
        {
            title: "Finceptor",
            logo: "finceptor.svg",
            link: "https://finceptor.app/",
        },
    ]
    const investors = [
        {
            title: "Castrum Capital",
            logo: "castrum.png",
            link: "https://castrum.capital/"
        },
        {
            title: "Financial Move",
            logo: "financialMove.svg",
            link: "https://financialmove.com.br/"
        },
        {
            title: "MPC Education",
            logo: "mpcEducation.svg",
            link: "https://meuplanocrypto.com/"
        },
        {
            title: "Crypto Adventure",
            logo: "cryptoAdventure.svg",
            link: "https://cryptoadventure.com/"
        },
    ]


  return (
   <div className="container-fluid px-4 px-lg-5 py-4 investors-bg d-flex flex-column gap-3">
    <div className="d-flex flex-column gap-3">
        <h6 className="mb-0 investors-title">
            Launchpads
        </h6>
        <div className="investors-grid">
            {launchpads.map((item, index) => (
                <a href={item.link} target='_blank' className="investors-item py-2" key={index}>
                    <img src={require(`./assets/${item.logo}`)} className='investors-img' alt="" />
                </a>
            ))}
        </div>
    </div>
    <div className="d-flex flex-column gap-3">
        <h6 className="mb-0 investors-title">
            Investors
        </h6>
        <div className="investors-grid">
            {investors.map((item, index) => (
               <a href={item.link} target='_blank' className="investors-item py-2" key={index}>
               <img src={require(`./assets/${item.logo}`)} className='investors-img' alt="" />
           </a>
            ))}
        </div>
    </div>
   </div>
  )
}

export default Investors