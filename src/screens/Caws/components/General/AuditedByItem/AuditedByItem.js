import React from 'react'
import PropTypes from 'prop-types'
import './_auditedByItem.scss'


const AuditedByItem = ({ imgName, text }) => {
    return (
        <div className="audited-by-section-item">
            <img src={require(`../../../../../assets/General/${imgName}.png`)} alt="" />
            <p className="audited-by-section-item-text">{text}</p>

        </div>
    )
}
AuditedByItem.propTypes = {
    imgName: PropTypes.string,
    text: PropTypes.string,
}

export default AuditedByItem
