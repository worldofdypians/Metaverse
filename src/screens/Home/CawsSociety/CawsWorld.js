import React from 'react'
import './_cawssociety.scss'
import cawsHeroBanner from "../../../assets/cawsHeroBanner.webp";


const CawsWorld = () => {
  return (
    <div className="row px-5 mt-5 caws-world-wrapper py-5">
      
      <div className="col-6">
        <div className="d-flex flex-column gap-3">
          <h2 className="font-organetto caws-hero-title w-75">
          NEw world of caws 2
          </h2>
          <p className="caws-hero-content">
            orem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue,
            elit ut vulputate suscipit, nisi metus gravida justo, nec placerat
            massa est sed ex. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Sed orci justo, iaculis ut viverra nec, imperdiet non
            ligula.
          </p>
          <div className="linear-border" style={{width: 'fit-content'}}>
            <button className="btn filled-btn px-5">View here</button>
          </div>
        </div>
      </div>
      <div className="col-6 d-flex justify-content-end">
        <img src={cawsHeroBanner} alt="" />
      </div>
    </div>
  )
}

export default CawsWorld