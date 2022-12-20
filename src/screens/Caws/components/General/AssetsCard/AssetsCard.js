import React from 'react'
import { PropTypes } from 'prop-types'
import SingleAsset from '../SingleAsset'
import './_assetsCard.scss'

const AssetsCard = ({ assets, action }) => {

    return (
        <div className='asset-card-wrapper'>
            <div className="slider-button-row">
                <span>By Chain</span><button onClick={action}>slider</button> <span>Top APR</span>
            </div>
            {assets && assets.length > 0 && assets.map((asset, id) => (
                <SingleAsset key={id} action={() => console.log("asset", asset.text)} icon={asset.icon} percentage={asset.percentage} text={asset.text} />
            ))}
        </div>
    )
}
AssetsCard.propTypes = {
    assets: PropTypes.array,
    action: PropTypes.func
}

export default AssetsCard