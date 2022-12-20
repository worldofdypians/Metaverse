import React, { useEffect, useRef, useState } from 'react'
import { PropTypes } from "prop-types"

const PillsSlider = ({ pillsNames, getActivePill, initialActivePill }) => {
    const [activePill, setActivePill] = useState(initialActivePill)
    const pillRef = useRef([])
    const [offset, setOffset] = useState(0)
    const [clientWidth, setClientWidth] = useState(0)

    useEffect(() => {
        if (pillRef.current) {
            const pills = pillRef.current;
            const activePillIndex = pills.find(el => el.className.includes("active-color"))
            setOffset(activePillIndex && activePillIndex.offsetLeft)
            setClientWidth(activePillIndex && activePillIndex.clientWidth)

            // console.log("actve pill  ", activePillIndex && activePillIndex.offsetLeft)
            // console.log(pillRef.current)
        }
    }, [activePill])



    return (
        <div className='pills-container'>
            <div className="active" style={{ left: offset, width: clientWidth }}></div>
            {pillsNames && pillsNames.length > 0 && pillsNames.map((item, id) => (
                <p key={id} onClick={() => { setActivePill(item); getActivePill(item) }} className={`pill-item ${activePill == item ? "active-color" : ""}`} ref={el => pillRef.current[id] = el}>
                    {item}
                </p>
            ))}

        </div>
    )
}

PillsSlider.propTypes = {
    pillsNames: PropTypes.array,
    getActivePill: PropTypes.func,
    initialActivePill: PropTypes.string
}

export default PillsSlider