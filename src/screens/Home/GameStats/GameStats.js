import React from 'react'
import './_gamestats.scss'
import transactionsBannerSmall from './assets/transactionsBannerSmall.webp'

const GameStats = () => {
  return (
  <>
  <div className="container-fluid d-flex d-md-none p-0">
    <img src={transactionsBannerSmall} className='small-transaction-banner' alt="" />
  </div>
    <div className="new-game-stats-wrapper d-flex align-items-center justify-content-center">
    <div className="custom-container">
     <div className="d-flex align-items-center justify-content-center justify-content-lg-end">
        <div className="game-stats-grid py-0 py-md-5">
            <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                38,841,100+
                </h6>
                <span className="game-stats-type">
                Total on-chain transactions
                </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                $9,693,600+
                </h6>
                <span className="game-stats-type">
                Total Volume (USD)
                </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                199,280+
                </h6>
                <span className="game-stats-type">
                Sold NFTs
                </span>
            </div>
            <div className="d-flex flex-column align-items-center gap-2 p-3">
                <h6 className="game-stats-value mb-0">
                565,300+
                </h6>
                <span className="game-stats-type">
                Monthly Players
                </span>
            </div>
        </div>
     </div>
    </div>
  </div>
  </>
  )
}

export default GameStats