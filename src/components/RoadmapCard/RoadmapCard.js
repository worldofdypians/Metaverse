import React from 'react'
import roadmapDummy from '../../screens/Roadmap/assets/roadmapDummy.png'
import roadmapIndicator from '../../screens/Roadmap/assets/roadmapIndicator.svg'
import completed from '../../screens/Roadmap/assets/completed.svg'
import uncompleted from '../../screens/Roadmap/assets/uncompleted.svg'
import quarterOne from '../../screens/Roadmap/assets/quarterOne.svg'
import { useState } from 'react'
import { useEffect } from 'react'

const RoadmapCard = ({quarter, content}) => {


const [activeCard, setActiveCard] = useState(false)




// const activate = () => {
//     setActiveCard(true)
//     console.log(activeCard);
// }

// const deactivate = () => {
//     setActiveCard(false)
//     console.log(activeCard);
    
// }


// const items = document.getElementById(quarter)


// useEffect(() => {
//     items?.addEventListener('mouseover', activate)
//     items?.addEventListener('mouseleave', deactivate)
// }, [])


    
  return (
    <div className="roadmap-card position-relative" id={quarter} onClick={() => setActiveCard(!activeCard)} style={{cursor: 'pointer'}}>
              <img
                src={roadmapDummy}
                alt="roadmap-image"
                className="roadmap-image"
              />
              <div className="roadmap-items position-relative">
                <div className="d-flex pt-3 ps-3 pe-3 flex-column align-items-center justify-content-start gap-2" style={{paddingBottom: '100px'}}>
                  <img src={roadmapIndicator} alt="indicator" style={{transform: activeCard && 'rotate(180deg)'}} />
                  
                 <div className="d-flex flex-column align-items-start gap-1">
                 {content.map((item, index) => (
                    <div className="d-flex flex-column gap-1" key={index}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={item?.completed === true ? completed : uncompleted} alt="completed" />
                      <span className="step-title">{item.title}</span>
                    </div>
                    {item.desc !== null &&
                      <p className={`step-content ms-4 ${!activeCard && 'd-none'}`}>
                      {item.desc}
                    </p>
                    }
                  </div>
                  ))}
                 </div>
                </div>
              </div>
              <img src={require(`../../screens/Roadmap/assets/${quarter}.svg`)} className="quarter" alt="quarter" />
            </div>
  )
}

export default RoadmapCard