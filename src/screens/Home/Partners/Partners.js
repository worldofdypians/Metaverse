import React from 'react'
import './_partners.scss'
import chainlinkIcon from '../../../assets/partnerIcons/chainlinkIcon.svg'

const Partners = () => {

  const partners = [
    {
      title: 'Chainlink',
      icon: 'chainlinkIcon',
    },
    {
      title: 'Coinbase',
      icon: 'coinbaseIcon',
    },
    {
      title: 'Huobi',
      icon: 'huobiIcon',
    },
    {
      title: 'KuCoin',
      icon: 'kucoinIcon',
    },
    {
      title: 'Avalanche',
      icon: 'avalancheIcon',
    },
    {
      title: 'Pangolin',
      icon: 'pangolinIcon',
    },
    {
      title: 'MEXC Global',
      icon: 'mexcIcon',
    },
    {
      title: 'Kyber Network',
      icon: 'kyberIcon',
    },

  ]


  return (
    <div className="row p-3 py-5 p-lg-5 mx-0 w-100 partners-wrapper position-relative align-items-center justify-content-center" style={{bottom: '80px', marginBottom: '-80px'}}>
      <div className="d-flex flex-column align-items-center justify-content-center gap-5 px-0">
        <h2 className="partners-title font-organetto">Our Partners</h2>
        <div className="d-flex align-items-center justify-content-between w-100 partners-grid">
        {partners.map((item) => (
            <div className="d-flex align-items-center justify-content-center flex-column gap-4">
            <img src={require(`../../../assets/partnerIcons/${item.icon}.svg`)} height={90} width={90} alt="" />
            <span className="partner-name font-poppins">{item.title}</span>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Partners