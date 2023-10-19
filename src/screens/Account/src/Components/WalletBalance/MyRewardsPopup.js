import React from "react";
import criticalHit from "./myrewardsAssets/criticalHit.png";
import dailyBonus from "./myrewardsAssets/dailyBonus.png";
import leaderboard from "./myrewardsAssets/leaderboard.png";
import nftStake from "./myrewardsAssets/nftStake.png";
import treasureHunt from "./myrewardsAssets/treasureHunt.png";

const MyRewardsPopup = () => {
  return (
    <div className="d-flex flex-column gap-2">
      <table className="myrewards-table table">
        <thead>
          <tr>
            <th className="myrewards-th">Reward Category</th>
            <th className="myrewards-th">Available Rewards </th>
            <th className="myrewards-th">Reward Type</th>
            <th className="myrewards-th">Total Earned</th>
          </tr>
        </thead>
      {/* <div className="table-separator"></div> */}
        <tbody className="border-0">  
          <tr>
            <td className="myrewards-td-main border-0">
              {" "}
              <img src={nftStake} alt="" style={{width: 24, height: 24}} /> NFT Staking
            </td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">CAWS</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 WETH</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">WoD Land & CAWS </td>
            <td className="myrewards-td-second border-0">$14</td>
            <td className="myrewards-td-second border-0">0.022 WETH</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>

          <tr>
            <td className="myrewards-td-main border-0">
              {" "}
              <img src={treasureHunt} alt=""  style={{width: 24, height: 24}} />
              Treasure Hunt
            </td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">CoinGecko</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 WBNB</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">Conflux Network</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 CFX</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>
          <tr>
            <td className="myrewards-td-second" border-0>Gate.io</td>
            <td className="myrewards-td-second" border-0>$120</td>
            <td className="myrewards-td-second" border-0>0.022 WBNB</td>
            <td className="myrewards-td-second" border-0>$500.00</td>
          </tr>

          <tr>
            <td className="myrewards-td-main border-0">
              {" "}
              <img src={leaderboard} alt=""  style={{width: 24, height: 24}} />
              Leaderboard
            </td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">Daily</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 WBNB</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">Weekly</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 CFX</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">Monthly</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 WBNB</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>

          <tr>
            <td className="myrewards-td-main border-0">
              {" "}
              <img src={dailyBonus} alt=""  style={{width: 24, height: 24}} />
              Daily Bonus
            </td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">Treasure Chests</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 WBNB</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>

          <tr>
            <td className="myrewards-td-main border-0">
              {" "}
              <img src={criticalHit} alt=""  style={{width: 24, height: 24}} />
              Critical Hit
            </td>
          </tr>
          <tr>
            <td className="myrewards-td-second border-0">Genesis Gem</td>
            <td className="myrewards-td-second border-0">$120</td>
            <td className="myrewards-td-second border-0">0.022 WBNB</td>
            <td className="myrewards-td-second border-0">$500.00</td>
          </tr>
        </tbody>
      </table>
      <div className="table-separator"></div>
      <div className="d-flex align-items-center gap-2 justify-content-between">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Available Rewards:</span>
            <span className="rightlight-text">The amount of rewards available to be withdrawn.</span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text">Reward Type:</span>
            <span className="rightlight-text">The type of reward distribution.</span>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-start">
            <span className="leftbold-text ">Total Earned:</span>
            <span className="rightlight-text">The total rewards evaluated in USD.</span>
          </div>
        </div>
        <div className="d-flex flex-column">
          <h4 className="all-total-earned">$435.25</h4>
          <span className="all-total-earned-subtitle">Total Earned</span>
        </div>
      </div>
    </div>
  );
};

export default MyRewardsPopup;
