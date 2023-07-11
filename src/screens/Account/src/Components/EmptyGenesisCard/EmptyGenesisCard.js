import React from 'react'
import './_emptygenesiscard.scss'
import genesisLand from './assets/emptyGenesis.png'

const EmptyGenesisCard = () => {
  return (
    <div className="d-flex flex-column">
    <div
      className={`genesis-wrapper d-flex justify-content-center align-items-center p-3 position-relative`}
    >
      {/* <img src={genesisBg} alt="genesis" className="w-100" /> */}
      <img
        src={genesisLand}
        className={`genesis-badge`}
        alt="badge"
      />
    </div>
    <div
      className="genesis-desc position-relative"
      style={{ bottom: "5px" }}
    >
      <h6 className="land-desc">Get your Genesis Land NFT and use it in WoD.</h6>
    </div>
  </div>
  )
}

export default EmptyGenesisCard