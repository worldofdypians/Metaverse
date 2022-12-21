import React from 'react'
import PropTypes from 'prop-types'
import './_singleAsset.scss'


const SingleAsset = ({ icon, text, percentage, action }) => {
    return (
        <div className='single-asset'>
            <img src={require(`../../../Assets/General/${icon}`)} alt={icon} />
            <div className="single-asset-body">
                <p>{text}</p>
                <p>{percentage}</p>
            </div>
            <button className="action-button" onClick={action}>
                <img src={require("../../../Assets/General/ArrowIcons/arrow.svg").default} alt="" />
            </button>
        </div>
    )
}
SingleAsset.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    percentage: PropTypes.string,
    action: PropTypes.func
}

export default SingleAsset