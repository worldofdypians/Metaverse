import React from 'react'
import PropTypes from "prop-types"
import ChevronArrowSvg from '../ChevronArrowSvg/ChevronArrowSvg'
import NewBadge from './newbadge.svg'

const SubAssetCardWithButton = ({ action, children, buttonText, top_tick, link, new_badge }) => {

    return (
        <div className="subasset-card-with-button">
            {new_badge && (
                <img src={NewBadge} alt='' id='newbadge'/>
            )}
            <div className={`elevated-container ${top_tick ? "top-tick" : ""}`} style={{border: new_badge ? '2px solid var(--accent-purple)' : ''}}>
                {children}
                <div className="button-wrapper">

                    <a href = {link} target='blank' style={{color: 'white'}}><button onClick={action}>
                        
                        {buttonText}
                        <ChevronArrowSvg />
                       
                    </button> </a>
                </div>
            </div>
        </div>
    )
}
SubAssetCardWithButton.propTypes = {
    action: PropTypes.func,
    children: PropTypes.element,
    buttonText: PropTypes.string,
    top_tick: PropTypes.bool
}


export default SubAssetCardWithButton