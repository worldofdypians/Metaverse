import React from 'react'
import avaxIcon from './newAssets/avaxIcon.svg';
import ethIcon from './newAssets/ethIcon.svg';
import bnbIcon from './newAssets/bnbIcon.svg';
import dypIcon from './newAssets/dypIcon.svg';
import iDypIcon from './newAssets/iDypIcon.svg';
import genesisRank from './newAssets/genesisRank.svg';
import globalRank from './newAssets/globalRank.svg';
import rightIcon from './newAssets/rightIcon.svg';
import premium from './newAssets/premium.svg';
import nonPremium from './newAssets/nonPremium.svg';
import myRewards from './newAssets/myRewards.svg';

const NewWalletBalance = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-2">
                <div className="purple-container p-2 d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column justify-content-between">
                        <h6 className="profile-div-title mb-0">
                            Leaderboard Rankings
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                            <span className="profile-div-link mb-0">View</span>
                            <img src={rightIcon} alt="" />
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex flex-column align-items-center gap-2">
                            <img src={globalRank} alt="" />
                            <span className="font-organetto profile-rank mb-0">#3</span>
                            <span className="font-organetto profile-rank mb-0">Global</span>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-2">
                            <img src={genesisRank} alt="" />
                            <span className="font-organetto profile-rank mb-0">#22</span>
                            <span className="font-organetto profile-rank mb-0">Genesis</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-12 col-lg-8">

            </div>
        </div>
    </div>
  )
}

export default NewWalletBalance  