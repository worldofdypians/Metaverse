import React from 'react'
import CircleButton from '../CircleButton'
import PropTypes from 'prop-types'
import ChevronArrowSvg from '../ChevronArrowSvg/ChevronArrowSvg'

const SocialCard = ({ icon, name, text, action }) => {

    return (
        <div className="social-card-wrapper">
            <div className="social-icon">
                <div className="red-circle"></div>
                <div className="image-circle">
                    {/* <div className="transparent-circle"></div> */}
                    <img src={require("../Icons/circle.png")} className="transparent-circle" alt="" />
                    <img src={require("../Icons/" + icon)} alt="" className='icon-image' />

                </div>
            </div>
            <div className="main-card">
                <p className='main-card-name'>
                    {name}
                </p>
                <p className="main-card-text">
                    {text}
                </p>
            </div>
            <div className="action-button">
                <CircleButton action={action} size={window.innerWidth > 768 ? "48" : "33"}>
                    <ChevronArrowSvg />
                </CircleButton>
            </div>
        </div>
    )
}
SocialCard.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.func,
}

export default SocialCard