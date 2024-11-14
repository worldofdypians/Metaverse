import React from 'react'
import emptyCaws from './assets/emptyCaws.svg'


const EmptyCawsCard = () => {
  return (
    <div className="nft-modal-card">
    <div className="d-flex flex-column">
        <div className="empty-img-wrapper d-flex align-items-center justify-content-center p-4 w-100">
            <img src={emptyCaws} className='empty-image' alt="" />
        </div>
        <div className="empty-card-info text-wrap p-2 w-100">
            <span className="info-text">Get your CAWS NFT from the WOD Game Shop</span>
        </div>
    </div>
</div>
  )
}

export default EmptyCawsCard