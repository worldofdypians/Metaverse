import React, { useState } from 'react'
import PropType from "prop-types"
import SvgToggleSun from './SvgToggleSun'
import SvgToggleMoon from './SvgToggleMoon'

const DarkModeToggleButton = ({ onToggleDarkMode }) => {
    const [toggleState, setToggleState] = useState(false)
    return (
        <div className={`${toggleState ? "active-toggle" : ""} toggle-button-wrapper`} onClick={() => { onToggleDarkMode(); setToggleState(!toggleState) }} >
            <div>
            {/* <SvgToggleSun /> */}
            <div className="toggle-circle"></div>
            {/* <SvgToggleMoon /> */}
            </div>
        </div>
    )
}
DarkModeToggleButton.propTypes = {
    onToggleDarkMode: PropType.func
}
export default DarkModeToggleButton