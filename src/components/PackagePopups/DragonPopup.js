import React from "react";    




const DragonPopup = ({ onClosePopup }) => {
  return (
    <div id="bgmenu" className="package-popup-wrapper">
      <div className="package-popup dragon-popup p-4">
        <div className=" package-popup-title-wrapper position-relative d-flex align-items-center justify-content-between mb-2">
          <h6 className="package-popup-title mb-0">
            Dragon{" "}
            <mark
              className="p-0 package-popup-title"
              style={{
                color: "#DCFB85",
                background: "transparent",
              }}
            >
              Ruins
            </mark>
          </h6>
          <img
            src={'https://cdn.worldofdypians.com/wod/popupXmark.svg'}
            className="popup-closer"
            onClick={onClosePopup}
            alt=""
          />
        </div>
        <div className="position-relative mb-3">
          <img src={"https://cdn.worldofdypians.com/wod/dragonPopup.webp"} alt="" style={{ width: "100%" }} />
        </div>
        <div className=" package-popup-title-wrapper d-flex align-items-center justify-content-between mb-2"></div>
        <div className="package-popup-content p-1">
          <p className="package-popup-desc mt-3">
            The Dragon Ruins challenge lets players summon and battle a dragon
            for significant benefits. Participants get a <b>4x multiplier</b> on
            in-game activities, boosting their leaderboard scores. The challenge
            benefits last for 1 hour, but players can buy bundles to extend the
            time and battle the dragon multiple times for more rewards. There's
            no limit to the number of bundles that can be purchased during the
            event.
          </p>

          <h6 className="text-white">How it works:</h6>
          <ul className="package-popup-desc">
            <li className="package-popup-desc">
              Purchase the bundle from the Challenge Center
            </li>
            <li className="package-popup-desc">
              Summon and defeat the dragon for rewards
            </li>
            <li className="package-popup-desc">
              Enjoy a x4 multiplier on activities for 1 hour
            </li>
            <li className="package-popup-desc">
              Buy additional bundles to extend time and earn more rewards, with
              no purchase limit
            </li>
          </ul>
          <h6 className="text-white">Point Distribution:</h6>
          <div className="table-responsive">
            <table className="table bgtable">
              <thead>
                <tr>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Animal
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Points
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Multiper
                  </th>
                  <th
                    scope="col popup-table-header"
                    style={{
                      color: "#828FBB",
                      fontSize: "14px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Total Points
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <img src={"https://cdn.worldofdypians.com/wod/boar.svg"} className="me-2" alt="" />
                    Boar
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    35
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    x4
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    140
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <img src={'https://cdn.worldofdypians.com/wod/deer.svg'} className="me-2" alt="" />
                    Deer
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    50
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    x4
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    200
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <img src={'https://cdn.worldofdypians.com/wod/wolf.svg'} className="me-2" alt="" />
                    Wolf
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    65
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    x4
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    260
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <img src={'https://cdn.worldofdypians.com/wod/bear.svg'} className="me-2" alt="" />
                    Bear
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    80
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    x4
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    320
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row d-flex align-items-center gap-2"
                    style={{
                      color: "#eeedff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <img src={'https://cdn.worldofdypians.com/wod/dragon.svg'} className="me-2" alt="" />
                    Dragon
                  </th>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#eeedff",
                      textAlign: "center",
                    }}
                  >
                    4,000
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    x4
                  </td>
                  <td
                    style={{
                      fontSize: "16px",
                      color: "#2DF5F2",
                      textAlign: "center",
                    }}
                  >
                    16,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragonPopup;
