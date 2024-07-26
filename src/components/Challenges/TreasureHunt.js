import React from 'react'
import './_challenges.scss'
import viction from './assets/viction.svg'
import core from './assets/core.svg'
import skale from './assets/skale.svg'
import bnb from './assets/bnb.svg'
import pickaxe from './assets/pickaxe.svg'
import calendar from './assets/calendar.svg'
import totalEarningsIcon from './assets/totalEarningsIcon.svg'
import victionBg from './assets/victionBg.png'

const TreasureHunt = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={core} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">CORE</h6>
            <span className="mb-0 new-treasure-hunt-rewards">$20,000 in CORE rewards</span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className='treasure-hunt-bg-img' alt="" />
        </div>
      </div>
      <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={viction} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">VICTION</h6>
            <span className="mb-0 new-treasure-hunt-rewards">$20,000 in VIC rewards</span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className='treasure-hunt-bg-img' alt="" />
        </div>
      </div>
      <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={bnb} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">BNB CHAIN</h6>
            <span className="mb-0 new-treasure-hunt-rewards">$20,000 in BNB rewards</span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className='treasure-hunt-bg-img' alt="" />
        </div>
      </div>
      <div className="new-treasure-hunt-wrapper d-flex align-items-center justify-content-between">
        <div className="ps-5 w-25 d-flex align-items-center gap-3">
          <img src={skale} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-2">
            <h6 className="mb-0 new-treasure-hunt-title">SKALE</h6>
            <span className="mb-0 new-treasure-hunt-rewards">$20,000 in SKL rewards</span>
          </div>
        </div>
        <div className="d-flex flex-column gap-4">
          <img src={totalEarningsIcon} alt="" />
          <div className="d-flex flex-column gap-2">
            <span className="total-earnings-amount">$53.5</span>
            <span className="total-earnings-span">My Earnings</span>
          </div>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div className="d-flex flex-column gap-3 treasure-type-date">
            <div className="d-flex align-items-center gap-2">
              <img src={pickaxe} alt="" />
              <span className="treasure-hunt-type">Explore and Mine</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src={calendar} alt="" />
              <span className="treasure-hunt-type">December 26</span>
            </div>
          </div>
          <img src={victionBg} className='treasure-hunt-bg-img' alt="" />
        </div>
      </div>
    </div>
  )
}

export default TreasureHunt