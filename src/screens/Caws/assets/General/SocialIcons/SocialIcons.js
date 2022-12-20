import React from 'react'
import PropTypes from 'prop-types'

const SocialIcons = ({name, className}) => {
    return (
        <img className={className} src={require(`../Social/${name}.svg`)} />
    )
}

SocialIcons.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
}

export default SocialIcons
