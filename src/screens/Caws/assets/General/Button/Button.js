import React from 'react'
import PropTypes from 'prop-types'



const Button = ({ text, icon, action, className, rounded, type, style, bordered, ...props }) => {
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
      <div className="cta-button-wrapper" style={style}>
        <button onClick={action} className={classNames.join(" ")} {...props}>
          <span style={{display: 'flex', alignItems: 'center', gap: 4}}>
            <span>{text}</span>
            {icon && icon}
          </span>
        </button>
      </div>
    );
}

Button.defaultProps = {
    rounded: true,
    type: 'primary-big'
}

Button.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.element,
    action: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.any,
    rounded: PropTypes.bool,
    bordered: PropTypes.bool,
    type: PropTypes.oneOf(['primary', 'secondary', 'primary-big'])
}

export default Button