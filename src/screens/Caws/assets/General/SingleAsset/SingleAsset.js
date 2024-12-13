import React from 'react'
import PropTypes from 'prop-types'
import CircleButton from '../CircleButton'
import ChevronArrowSvg from '../ChevronArrowSvg/ChevronArrowSvg'

const SingleAsset = ({ icon, text, percentage,
    setActiveCard, activeCard }) => {

    const handleClick = () => {
        if (activeCard !== "" && activeCard == text) {
            setActiveCard("")

        } else {

            setActiveCard(text)
        }
    }

    return (
        <div className='single-asset-wrapper'>
            <div className="single-asset">
                <img src={require(`../Icons/${icon}`)} alt={icon} className="single-asset-icon"/>
                <div className="single-asset-body">
                    <p>{text}</p>
                    <p>{percentage} APR</p>
                </div>
                <div className="action-button" >
                    <CircleButton action={() => handleClick()} size="48"
                        activeCard={activeCard} text={text}>
                        {activeCard && activeCard == text
                            ?
                            <img src={require("../Icons/cross.svg").default} alt="" />
                            :
                            <ChevronArrowSvg />
                        }
                    </CircleButton>
                </div>
            </div>
        </div>
    )
}
SingleAsset.propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    percentage: PropTypes.string,
    activeCard: PropTypes.string,
    setActiveCard: PropTypes.func,
}

export default SingleAsset