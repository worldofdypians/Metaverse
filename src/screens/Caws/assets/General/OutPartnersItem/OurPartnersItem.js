import React from 'react'
import PropTypes from 'prop-types'


const OurPartnersItem = ({ image, text, href }) => {
    return (
        <div className="partners-item-wrapper">
            <a href={href} target='_blank'>
            {image && <img src={require("../PartnerIcons/" + image)} alt={text} />}
            </a>
            <p>{text}</p>
        </div>
    )
}
OurPartnersItem.propTypes = {
    image: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string

}

export default OurPartnersItem