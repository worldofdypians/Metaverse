import React from 'react'
import PropTypes from "prop-types"

const SquarePill = ({ text }) => {
    return (
        <div className='square-pill'>{text}</div>
    )
}
SquarePill.propTypes = {
    text: PropTypes.string
}
export default SquarePill
