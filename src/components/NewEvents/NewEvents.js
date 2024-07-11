import React from 'react'
import './_newevents.scss'
import treasureHuntIcon from './assets/treasureHuntIcon.png'
import dragonRuinsIcon from './assets/dragonRuinsIcon.png'
import mazeGardenIcon from './assets/mazeGardenIcon.png'
import puzzleMadnessIcon from './assets/puzzleMadnessIcon.png'
import scorpionKingIcon from './assets/scorpionKingIcon.png'
import treasureHuntBadge from './assets/treasureHuntBadge.png'
import criticalHitIcon from './assets/criticalHitIcon.png'
import dummyViction from './assets/dummyViction.png'


const NewEvents = () => {
  return (
    <div className="custom-container mt-5">
      <div className="row">
        <div className="col-12">
            <div className="d-flex flex-column">
                <div className="new-events-top-wrapper p-3 d-flex align-items-center justify-content-between">
                    <h6 className="challenges-text mb-0">Challenges</h6>
                    <div className="d-flex align-items-center gap-2">
                        <div className="active-challenge-tab px-4 py-2 d-flex align-items-center justify-content-center">
                            <span>Live</span>
                        </div>
                        <div className="challenge-tab px-4 py-2 d-flex align-items-center justify-content-center">
                            <span>Upcoming</span>
                        </div>
                        <div className="challenge-tab px-4 py-2 d-flex align-items-center justify-content-center">
                            <span>Past</span>
                        </div>
                    </div>
                </div>
                <div className="new-events-bottom-wrapper p-3">
                    <div className="row">
                        <div className="col-12 col-lg-2">
                            <div className="challenges-list-wrapper py-3 d-flex flex-column gap-3">
                                <div className="active-challenge-item d-flex align-items-center gap-2 py-2 px-4">
                                    <img src={treasureHuntIcon} alt="" />
                                    <h6 className="mb-0">Treasure Hunt</h6>
                                </div>
                                <div className="challenge-item d-flex align-items-center gap-2 py-2 px-4">
                                    <img src={dragonRuinsIcon} alt="" />
                                    <h6 className="mb-0">Dragon Ruins</h6>
                                </div>
                                <div className="challenge-item d-flex align-items-center gap-2 py-2 px-4">
                                    <img src={scorpionKingIcon} alt="" />
                                    <h6 className="mb-0">Scorpion King</h6>
                                </div>
                                <div className="challenge-item d-flex align-items-center gap-2 py-2 px-4">
                                    <img src={puzzleMadnessIcon} alt="" />
                                    <h6 className="mb-0">Puzzle Madness</h6>
                                </div>
                                <div className="challenge-item d-flex align-items-center gap-2 py-2 px-4">
                                    <img src={criticalHitIcon} alt="" />
                                    <h6 className="mb-0">Critical Hit</h6>
                                </div>
                                <div className="challenge-item d-flex align-items-center gap-2 py-2 px-4">
                                    <img src={mazeGardenIcon} alt="" />
                                    <h6 className="mb-0">Maze Garden</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-10">
                            <div className="d-flex flex-column gap-3">
                                <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NewEvents