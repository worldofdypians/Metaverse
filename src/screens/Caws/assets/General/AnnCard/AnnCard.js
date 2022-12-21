import React from 'react'
import PropTypes from "prop-types"
import logo from '../Icons/logo-for-card.svg'

const AnnCard = ({ title, image, text, date, action }) => {
    return (
        <div className="ann-card-wrapper">

            <div className='elevated-container'>
                <a href={action} target="_blank">
                <div className="ann-card">
                    <div className="ann-card-header">
                        <img src={logo} alt="" className='logo' />
                        <p>DeFi Yield Protocol</p>
                    </div>
                    <div className="ann-card-image">
                        <img src={require("../../../assets/Home/" + image)} alt={image} />
                    </div>
                    <div className="ann-card-title">
                        <h2>{title}</h2>
                    </div>
                    <div className="ann-card-body">
                        <p>{text}...</p>
                    </div>
                    <div className="ann-card-footer">
                        <p>{date}</p>
                    </div>
                </div>
                </a>
            </div>
        </div>
    )
}
AnnCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    action: PropTypes.string,

}

export default AnnCard