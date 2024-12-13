import React from 'react'
import { PropTypes } from "prop-types"
import './_pillButton.scss'

const ChainButton = ({ icon, text, active, type, ...props }) => {
    // if (text == active.text && type == "chain") {

    //     console.log("ACTIVE chain", text, active.text)
    // } else if (text == active.text && type == "time") {
    //     console.log("ACTIVE time", text, active.text)

    // }
    return (
        <button className={`${active.text == text && `active-${type}`}  ${type}-pill-button `}  {...props}>
            {icon && <img src={require('../../../../../assets/General/' + icon)} alt="" />}

            <p>
                {text}
            </p>
        </button>
    )
}
ChainButton.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    active: PropTypes.object,
    type: PropTypes.string

}

export default ChainButton