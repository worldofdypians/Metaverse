import React from 'react'
import './_titleWithParagraph.scss'

const TitleWithParagraph = ({ children, isMain, isCenter }) => {
    return (
        <div className={` ${isMain ? 'common-title-main' : ""} 
        ${isCenter ? "center-text" : ""} common-title-text`}>
            {children}
        </div>
    )
}


export default TitleWithParagraph;