import React from 'react'
import { PropTypes } from "prop-types"

const ClickToVideoCard = ({ img, action }) => {
    return (
        <div className='video-card-wrapper'>
            <div className="image-wrapper">
                <img src={require("../../Home/" + img)} alt="" />
            </div>
            <button className="action-button" onClick={action}>
                <img src={require("../ArrowIcons/play-arrow.svg").default} alt="play-arrow" />
            </button>
        </div>
    )
}
ClickToVideoCard.propTypes = {
    img: PropTypes.string,
    action: PropTypes.func
}

export default ClickToVideoCard