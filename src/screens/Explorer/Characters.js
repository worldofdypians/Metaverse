import React from 'react'
import warrior from '../../assets/explorerAssets/warrior.png'

const Characters = () => {
  return (
    <div className="row justify-content-center mx-0 w-100 px-3 px-lg-5 gap-5 gap-lg-0 mt-5 mt-lg-0" style={{minHeight: '75vh'}}>
        <div className="col-12 col-lg-6 character-card">
          <div className="d-flex flex-column-reverse flex-lg-row gap-3 character-card justify-content-end">
            <div className="d-flex flex-column justify-content-start gap-5 character-info" style={{width: '38%'}}>
              <div className="d-flex flex-column gap-3">
                <div className="character-title font-organetto">Warrior</div>
                <div className="character-desc font-poppins">Specializing in combat, the warrior utilizes weapons, armor, and brute strength to conquer his enemies.</div>
              </div>
              <ul className="character-list p-3">
                <li className="character-trait">Physically strongest class</li>
                <li className="character-trait">Masters of weapons and armor</li>
                <li className="character-trait">Excel at meele combat</li>
                <li className="character-trait">Wield swords, axes, maces and shields</li>
                <li className="character-trait">High vitality</li>
              </ul>
            </div>
              <img src={warrior} alt="" />
          </div>
        </div>
        <div className="col-12 col-lg-6 character-card">
          <div className="d-flex flex-column flex-lg-row gap-3 character-card justify-content-start second-character">
              <img src={warrior} alt="" />
            <div className="d-flex flex-column justify-content-start gap-5 character-info" style={{width: '34%'}}>
              <div className="d-flex flex-column gap-3">
                <div className="character-title font-organetto">Sorcerer</div>
                <div className="character-desc font-poppins">Harnessing the power of the elements, sorcerers utilize powerful spells to freeze and ignite their enemies into oblivion.</div>
              </div>
              <ul className="character-list p-3">
                <li className="character-trait">Highest intellect class</li>
                <li className="character-trait">Proeficent in high end spell casting</li>
                <li className="character-trait">Excel at long range combat</li>
                <li className="character-trait">Leveling spells increases damage</li>
              </ul>
            </div>
           
          </div>
        </div>
    </div>
  )
}

export default Characters