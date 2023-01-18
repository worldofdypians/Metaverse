import React from 'react'
import Community from './Community'
import LandBenefits from './LandBenefits'
import LandHero from './LandHero'
import LandStaking from './LandStaking'
import LandTiers from './LandTiers'
import Members from './Members'
import './_land.scss'

const Land = () => {
  return (
    <div className="container-fluid d-flex px-0 align-items-center justify-content-center">
        <div className="land-main-wrapper px-0 w-100 pt-5 d-flex flex-column">
            <LandHero />
            <LandStaking />
            <LandTiers />
            <Community />
            <Members />
            <LandBenefits />
        </div>
    </div>
  )
}

export default Land