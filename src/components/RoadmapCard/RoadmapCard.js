import React from 'react'
import roadmapDummy from '../../screens/Roadmap/assets/roadmapDummy.png'
import roadmapIndicator from '../../screens/Roadmap/assets/roadmapIndicator.svg'
import completed from '../../screens/Roadmap/assets/completed.svg'
import uncompleted from '../../screens/Roadmap/assets/uncompleted.svg'
import quarterOne from '../../screens/Roadmap/assets/quarterOne.svg'
import { useState } from 'react'
import { useEffect } from 'react'

const RoadmapCard = ({quarter, content, index, image}) => {


const [activeCard, setActiveCard] = useState(false)

const [desc, setDesc] = useState(null)

const showDesc = (index) => {
  if(desc === null || index !== desc){
    setDesc(index)
  }else{
    setDesc(null)
  }
}




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
    <div className="roadmap-card position-relative" id={quarter} onClick={() => setActiveCard(!activeCard)} >
              <img
                src={require(`../../screens/Roadmap/assets/${image}.png`)}
                alt="roadmap-image"
                className="roadmap-image"
              />
              <div className="roadmap-items position-relative">
                <div className="d-flex pt-3  flex-column align-items-center justify-content-start gap-2 roadmap-items-wrapper">
                  <img src={roadmapIndicator} alt="indicator" style={{transform: desc !== null ? 'rotate(0deg)' : 'rotate(180deg)', visibility: index === 4 ? 'hidden' : 'visible'}} />
                  
                 <div className="d-flex flex-column align-items-start gap-3 gap-lg-2 w-100">
                 {content.map((item, index) => (
                    <div className={`d-flex px-3 flex-column gap-1 ${desc === index && 'active-road-faq'}`} key={index} style={{cursor: 'pointer'}}>
                    <div className="d-flex align-items-start gap-2">
                      <img src={item?.completed === true ? completed : uncompleted} alt="completed" style={{position: 'relative', top : '2px'}} />
                      <span className="step-title" onClick={() => item.desc !== null && showDesc(index)}>{item.title}</span>
                    </div>
                    {item.desc !== null &&
                      <p className={`step-content ms-4 ${desc === index ? 'd-flex' : 'd-none'}`}>
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