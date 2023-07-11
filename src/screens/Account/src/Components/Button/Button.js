import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({
    type,
    onPress,
    title,
    disabled,
    textStyles,
    loading,
    ...rest
}) => {
    return (
        <div className={`${type}Button`} onClick={loading || disabled ? () => { } : onPress}  {...rest}>
            {loading ?
                <div className="lds-dual-ring"></div>
                :
                <h1 className='titleButton' style={textStyles}>{title}</h1>
            }
        </div>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'title']),
    onPress: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    textStyles: PropTypes.object,
    loading: PropTypes.bool,
}

Button.defaultProps = {
    type: 'primary',
    disabled: false,
    textStyles: {}
}
export default Button