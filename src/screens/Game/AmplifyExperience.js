import React from "react";
import "./_game.scss";

import { NavLink } from "react-router-dom";

const AmplifyExperience = () => {
  const rows = [
    {
      title: "Access to Basic Features",
      free: true,
      betaPass: true,
      premium: true,
    },
    {
      title: "Explore Every Game Map",
      free: true,
      betaPass: true,
      premium: true,
    },
    {
      title: "Ability to Buy Bundles",
      free: true,
      betaPass: true,
      premium: true,
    },
    {
      title: "Access to Specific Treasure Hunt events",
      free: false,
      betaPass: true,
      premium: true,
    },
    {
      title: "Full Participation in Game Events",
      free: false,
      betaPass: true,
      premium: true,
    },
    {
      title: "Unlock 20 Chests on Daily Bonus",
      free: false,
      betaPass: false,
      premium: true,
    },
    {
      title: "Receive Special Rewards",
      free: false,
      betaPass: false,
      premium: true,
    },
    {
      title: "Get Premium Items",
      free: false,
      betaPass: false,
      premium: true,
    },
    {
      title: "Access to Special Quests",
      free: false,
      betaPass: false,
      premium: true,
    },
  ];

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="custom-container d-flex flex-column align-items-center align-items-lg-start  mt-5 w-100">
          <h2
            className="explorer-grid-title px-0"
            style={{ width: "fit-content" }}
          >
            Amplify Experience
          </h2>
          <span
            className="classes-desc text-center"
            style={{ width: "fit-content" }}
          >
            Enhance your gameplay with advanced features and exclusive content.
          </span>
        </div>
      </div>
      <div className="container-fluid amplify-table-wrapper py-5 d-flex align-items-center justify-content-center">
        <div className="custom-container game-table-container d-flex flex-column  w-100">
          <table className="game-table">
            <thead>
              <tr>
                <th className="game-table-header-1">World of Dypians</th>
                <th className="game-table-header">Free</th>
                <th className="game-table-header">Beta Pass</th>
                <th className="game-table-header">Prime</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr
                  className="game-table-row"
                  key={index}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#15205D" : "transparent",
                  }}
                >
                  <td className="game-table-text py-3 ps-3">{item.title}</td>
                  <td>
                    {item.free ? (
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/amplifyCheck.svg"
                        }
                        alt=""
                      />
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    {item.betaPass ? (
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/amplifyCheck.svg"
                        }
                        alt=""
                      />
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    {item.premium ? (
                      <img
                        src={
                          "https://cdn.worldofdypians.com/wod/amplifyCheck.svg"
                        }
                        alt=""
                      />
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
              <tr
                className="game-table-row "
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <td className="game-table-text py-3 ps-3"></td>
                <td>
                  <div className="py-4">
                    <NavLink
                      className="stake-wod-btn px-4 py-2 mt-4"
                      to={"/join-beta"}
                    >
                      Join Beta
                    </NavLink>
                  </div>
                </td>
                <td>
                  <div className="py-4">
                    <NavLink
                      className="stake-wod-btn px-4 py-2 mt-4"
                      to={"/shop/beta-pass/bnb"}
                    >
                      Get Beta Pass
                    </NavLink>
                  </div>
                </td>
                <td>
                  <div className="py-4">
                    <NavLink
                      className="action-btn px-4 py-2 mt-4"
                      to={"/account/prime"}
                    >
                      Buy Prime
                    </NavLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AmplifyExperience;
