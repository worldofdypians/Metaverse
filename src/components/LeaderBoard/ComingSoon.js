import React from "react";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import "./_leaderboard.scss";
import playerAvatar from "./assets/userAvatar2.png";

const ComingSoon = ({ optionText, data }) => {
  const placeholderplayerData = [
    {
      position: "0",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "7,000",
    },
    {
      position: "1",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "5,000",
    },
    {
      position: "2",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "3,000",
    },
    {
      position: "3",
      displayName: "---",
      reward: "---",
      statValue: "2,000",
      premium: false,
    },

    {
      position: "4",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "1,500",
    },
    {
      position: "5",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "1,000",
    },
    {
      position: "6",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "1,000",
    },
    {
      position: "7",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "500",
    },
    {
      position: "8",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "500",
    },
    {
      position: "9",
      displayName: "---",
      reward: "---",
      premium: false,
      statValue: "500",
    },
  ];

  return (
    <div
      className="d-flex flex-column position-relative"
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      <table className="playerTable">
      <tbody>
        <tr className="playerRow">
          <th className="playerHeader">Rank</th>
          <th className="playerHeader">Player</th>
          {/* <th className="playerHeader">Gem Hits</th> */}
          <th className="playerHeader">Reward</th>
        </tr>
        {data &&
          optionText === "genesis" &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <tr key={index} className={`playerInnerRow`}>
                <td className="playerData col-2">
                  #{Number(index) + 1}
                </td>
                <td className="playerName col-5">
                  <div className="position-relative d-flex align-items-center">
                    <img src={playerAvatar} alt="" className="playerAvatar" />{" "}
                    {item.displayName}
                  </div>
                </td>
                {/* <td className="playerScore col-3">
                  {getFormattedNumber(item.reward, 0)}
                </td> */}
                <td className="playerReward col-2">${getFormattedNumber(item.statValue,0)}</td>
                
                {/* <td className="playerReward col-2">$ 0</td> */}
              </tr>
            );
          })}
          </tbody>
      </table>
      {/* <span className="statusText" style={{textAlign: 'left', paddingTop: 5}}>*Genesis leaderboard coming soon</span> */}
    </div>
  );
};

export default ComingSoon;
