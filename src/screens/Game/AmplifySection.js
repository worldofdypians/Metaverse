import React from "react";
import BetaEventCardHome from "../Marketplace/components/BetaEventCardHome";
import { NavLink } from "react-router-dom";
import amplifyCheck from "../../assets/gameAssets/amplifyCheck.svg";
import amplifyBannerSmall from "../../assets/gameAssets/amplifyBannerSmall.webp";

const AmplifySection = () => {
  const dummyBetaPassData2 = [
    {
      link: "/account#leaderboard",
      title: "LEADERBOARDS",
      desc: "Compete for the top rank",
      class: "tokenClass",
    },
    {
      link: "/account#my-rank",
      title: "MY RANK",
      desc: "Elevate your player status",
      class: "earnClass",
    },
    {
      link: "/account#dailybonus",
      title: "DAILY BONUS",
      desc: "Daily rewards for active players",
      class: "eventClass",
    },
  ];

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
      <div className="amplify-ways-wrapper d-flex align-items-center justify-content-center  py-4">
        <div className="custom-container">
          <div className="row justify-content-center align-items-center gap-3 gap-lg-0 mx-3 mx-lg-0">
            <div className="col-12 col-lg-3">
              <h2 className="font-montserrat builders-title explorer-grid-title px-0">
                Ways to Amplify Rewards
              </h2>
            </div>
            {dummyBetaPassData2.map((item, index) => (
              <div className="col-12 col-lg-3" key={index}>
                <NavLink to={`${item.link}`}>
                  <BetaEventCardHome
                    data={item}
                    isFrontPage={true}
                  />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid d-flex  p-0">
          <img
            src={amplifyBannerSmall}
            className="small-transaction-banner"
            alt=""
          />
        </div>
        <div className="new-game-stats-wrapper amplify-game-banner d-flex align-items-center justify-content-center ">
          <div className="d-flex align-items-center justify-content-center justify-content-md-end custom-container">
            <div className="d-flex flex-column col-12 col-md-6 col-lg-5 gap-2 px-4 py-3 px-lg-3 align-items-center align-items-md-end">
              <span className="amp-benefits-desc text-center text-md-end">
                Benefits
              </span>
              <span className="ways-to-amplify-title text-center text-md-end">
                Ways to Amplify Rewards
              </span>
              <span className="ways-to-amplify-desc mb-2 text-center text-md-end">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen
              </span>
              <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-end w-100">
                <button className="explore-btn col-lg-4 py-2">Explore</button>
                <button className="getpremium-btn col-lg-4 py-2">
                  Get Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="custom-container d-flex flex-column  mt-5 w-100">
          <h2 className="font-montserrat builders-title explorer-grid-title px-0">
            Amplify Experience
      
          </h2>
          <span className="classes-desc text-center" style={{ width: "fit-content" }}>
            Enhance your gameplay with advanced features and exclusive content.
          </span>
        </div>
      </div>
      <div className="container-fluid amplify-table-wrapper py-5 d-flex align-items-center justify-content-center">
        <div className="custom-container game-table-container d-flex flex-column mx-3 mx-lg-0 w-100">
          <table className="game-table">
            <thead>
              <tr>
                <th className="game-table-header-1">World of Dypians</th>
                <th className="game-table-header">Free</th>
                <th className="game-table-header">Beta Pass</th>
                <th className="game-table-header">Premium Subscriber</th>
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
                    {item.free ? <img src={amplifyCheck} alt="" /> : <></>}
                  </td>
                  <td>
                    {item.betaPass ? <img src={amplifyCheck} alt="" /> : <></>}
                  </td>
                  <td>
                    {item.premium ? <img src={amplifyCheck} alt="" /> : <></>}
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
                    <a
                      className="stake-wod-btn px-4 py-2 mt-4"
                      href="https://store.epicgames.com/p/world-of-dypians-2e0694"
                    >
                      Download
                    </a>
                  </div>
                </td>
                <td>
                  <div className="py-4">
                    <NavLink
                      className="stake-wod-btn px-4 py-2 mt-4"
                      to={"/marketplace/beta-pass/base"}
                    >
                      Get Beta Pass
                    </NavLink>
                  </div>
                </td>
                <td>
                  <div className="py-4">
                    <NavLink
                      className="stake-wod-btn buy-premium-btn px-4 py-2 mt-4"
                      to={"/account/premium"}
                    >
                      Buy Premium
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

export default AmplifySection;
