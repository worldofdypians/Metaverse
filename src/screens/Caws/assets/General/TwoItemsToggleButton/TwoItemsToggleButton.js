import React, { useEffect } from 'react'
import PropTypes from "prop-types"

const TwoItemsToggleButton = ({ leftItem, rightItem, toggleItem, setToggleItem }) => {
    useEffect(() => {
        // console.log("TOGGLE FROM CHILD", toggleItem)
    }, [toggleItem])

    return (
        <div className="toggle-row">
            <span className={`${toggleItem ? 'active' : ""}`} onClick={() => setToggleItem(true)}>{leftItem}</span>
            <div className={`${!toggleItem ? "active-toggle" : ""} toggle-button-wrapper`} onClick={() => setToggleItem(!toggleItem)} >
                <div className="toggle-circle"></div>
            </div>
            <span className={`${!toggleItem ? 'active' : ""}`} onClick={() => setToggleItem(false)}>{rightItem}</span>
        </div>
    )
}
TwoItemsToggleButton.propTypes = {
    leftItem: PropTypes.string,
    rightItem: PropTypes.string,
    toggleItem: PropTypes.bool,
    setToggleItem: PropTypes.func,

}

export default TwoItemsToggleButton