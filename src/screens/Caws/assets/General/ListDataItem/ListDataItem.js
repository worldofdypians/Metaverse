
import React from 'react'
import PropTypes from "prop-types"

const ListDataItem = ({ icon, text }) => {
    return (
        <div className="list-item-wrapper">
            <div className="img-wrapper">
                <img src={require("../../images/gray-blur-circle-bg.png")} alt="" />
                {icon}
            </div>
            <p className="data">
                {text}
            </p>
        </div>
    )
}
ListDataItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
}

export default ListDataItem
