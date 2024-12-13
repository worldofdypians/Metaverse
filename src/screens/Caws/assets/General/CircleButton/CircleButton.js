import React from 'react'
import PropTypes from "prop-types"

const CircleButton = ({ children, action, size,
    activeCard, text, transform }) => {
    const style = {
        width: size + "px",
        height: size + "px",
        transform :transform
    }
    return (
        <button className={` circle-button ${activeCard && activeCard == text
            ? 'circle-button-active' : 'circle-button-inactive'} `} onClick={action} style={style}>
            {children}
        </button>
    )
}
CircleButton.propTypes = {
    children: PropTypes.element,
    action: PropTypes.func,
    size: PropTypes.string,
    activeCard: PropTypes.string,
    text: PropTypes.string,
    transform: PropTypes.string,


}

export default CircleButton