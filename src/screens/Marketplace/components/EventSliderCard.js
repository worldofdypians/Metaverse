import React from 'react'
import { NavLink } from 'react-router-dom'

const EventSliderCard = ({data, mintTitle, onSelectCard}) => {
  return (
    <NavLink to={`/marketplace/mint/${data.eventId}`} className={` ${mintTitle === data.eventId && "active-mint-selected"}  active-mint ${data.class} justify-content-between d-flex flex-column`} onClick={onSelectCard}>
    <div className="first-half h-50 p-3 d-flex flex-column justify-content-center gap-2">
      <h6 className="active-mint-title mb-0">
        {data.title}
      </h6>
      <p className="active-mint-desc mb-0">
        {data.desc}
      </p>
    </div>
    <div className="second-half h-50 w-100">
      <img
        src={data.img}
        className="w-100 h-100"
        alt=""
        style={{borderRadius: "0 0 28px 28px"}}
      />
    </div>
  </NavLink>
  )
}

export default EventSliderCard