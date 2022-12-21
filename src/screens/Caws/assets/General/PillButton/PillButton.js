import React from 'react'
import { PropTypes } from "prop-types"
import SvgEthIcon from '../ListDataItem/SvgEthIcon'
import SvgBscIcon from '../ListDataItem/SvgBscIcon'
import SvgAvaxIcon from '../ListDataItem/SvgAvaxIcon'

const ChainButton = ({ icon, text, active, type, ...props }) => {
    const renderSvgIcon = (item) => {
        const name = item.split(" ")[0].toLowerCase()
        if (name === "eth") {
            return <SvgEthIcon />
        } else if (name === "bsc") {
            return <SvgBscIcon />
        } else {
            return <SvgAvaxIcon />

        }
    }
    return (
        <button className={`${active.text == text && `active-${type} ${type == "chain" && `active-chain-${text.split(" ")[0].toLowerCase()}`}`}  ${type}-pill-button `}  {...props}>
            {icon && renderSvgIcon(text)}

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