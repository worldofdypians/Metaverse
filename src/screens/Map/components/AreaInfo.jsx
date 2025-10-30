import React from 'react'

const AreaInfo = ({show, onClose, content}) => {
  return (
    <div className={`marker-details-2 ${show && "marker-events-active"}`}>
    <div className="d-flex flex-column justify-content-between h-100">
      <div className="d-flex flex-column gap-2">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="text-white mb-0">{content}</h3>
          <a href="javascript:void(0)" className="closebtn-3" onClick={onClose}>
            ×
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AreaInfo