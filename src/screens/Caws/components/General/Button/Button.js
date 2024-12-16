import React from 'react'
import PropTypes from 'prop-types'
import './_button.scss'

const Button = ({ text, icon, action, className, rounded, type, bordered, ...props }) => {
    const classNames = ['cta-button', className]
    if (rounded) {
        classNames.push('btn-rounded')
    }
    if (bordered) {
        classNames.push('btn-bordered')
    }

    classNames.push(`btn-${type}`)
    // console.log(icon)

    return (
        <div className="cta-button-wrapper">
            <div className="blur-bg"></div>

            <button onClick={action} className={classNames.join(' ')} {...props}>
                <span>{text}</span>
                {icon && <img src={require('../../../../../assets/General/ArrowIcons/' + icon)} alt="arrow" className='button-arrow' />}

            </button>
        </div>
    )
}

Button.defaultProps = {
    rounded: true,
    type: 'primary-big'
}

Button.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    action: PropTypes.func,
    className: PropTypes.string,
    rounded: PropTypes.bool,
    bordered: PropTypes.bool,
    type: PropTypes.oneOf(['primary', 'secondary', 'primary-big'])
}

export default Button