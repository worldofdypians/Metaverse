import { useEffect, useState } from "react";
// import getFormattedNumber from "../../../screens/Caws/functions/get-formatted-number";
import "./kickstarter_newcss.scss";
import { abbreviateNumber } from "js-abbreviation-number";
import axios from "axios";
// const KickstarterStats = () => {
//   return (
//     <div
//       className="px-3 px-lg-5 py-4 metrics-bg d-flex justify-content-center"
//       id="explorer"
//     >
//       <div className="metrics-wrapper w-100">
//         <div className="custom-container">
//           <div className="row">
//             <div className="col-12 col-lg-4 mb-3 mb-lg-0">
//               <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center position-relative gap-2">
//                 <h6 className="mb-0 new-stats-value">
//                   {getFormattedNumber(1300000, 0)}+
//                 </h6>
//                 <span className="new-stats-type">Daily Active Users</span>
//               </div>
//             </div>
//             <div className="col-12 col-lg-4 mb-3 mb-lg-0">
//               <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
//                 <h6 className="mb-0 new-stats-value">
//                   {" "}
//                   {getFormattedNumber(3600000, 0)}+
//                 </h6>
//                 <span className="new-stats-type">Monthly Active Users</span>
//               </div>
//             </div>
//             <div className="col-12 col-lg-4 mb-3 mb-lg-0">
//               <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
//                 <h6 className="mb-0 new-stats-value">
//                   {getFormattedNumber(550000000, 0)}+
//                 </h6>
//                 <span className="new-stats-type">
//                   Total On-Chain Transactions
//                 </span>
//               </div>
//             </div>
//             <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
//               <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
//                 <h6 className="mb-0 new-stats-value">
//                   {getFormattedNumber(80, 0)}+
//                 </h6>
//                 <span className="new-stats-type">Strategic Partners</span>
//               </div>
//             </div>
//             <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
//               <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
//                 <h6 className="mb-0 new-stats-value">
//                   {getFormattedNumber(2500000, 0)}+
//                 </h6>
//                 <span className="new-stats-type">Community Members</span>
//               </div>
//             </div>
//             <div className="col-12 col-lg-4 mt-0 mt-lg-4 mb-3 mb-lg-0">
//               <div className="new-stats-wrapper px-4 py-5 d-flex flex-column align-items-center justify-content-center gap-2">
//                 <h6 className="mb-0 new-stats-value">
//                   {getFormattedNumber(152, 0)}
//                 </h6>
//                 <span className="new-stats-type">Countries</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KickstarterStats;

const KickstarterStats = ({ monthlyPlayers, totalVolumeNew }) => {
  const [totalTx2, setTotalTx] = useState(0);
  const [, setTotalVolume] = useState(0);

  const stats = [
    {
      icon: "https://cdn.worldofdypians.com/wod/userStats.svg",
      number: abbreviateNumber(monthlyPlayers, 1) + "+",
      label: "Monthly Players",
      color: "from-cyan-400 to-blue-500",
      glowColor: "shadow-cyan-500/50",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/tropyStats.svg",
      number: "80+",
      label: "Successful Partnerships",
      color: "from-yellow-400 to-orange-500",
      glowColor: "shadow-yellow-500/50",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/chartStats.svg",
      number: abbreviateNumber(totalTx2, 1) + "+",
      label: "Total Transactions",
      color: "from-green-400 to-emerald-500",
      glowColor: "shadow-green-500/50",
    },
    {
      icon: "https://cdn.worldofdypians.com/wod/valueStats.svg",
      number: "$" + abbreviateNumber(totalVolumeNew, 1).replace("G", "B") + "+",
      label: "Volume Created",
      color: "from-purple-400 to-pink-500",
      glowColor: "shadow-purple-500/50",
    },
  ];

  const getAllData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/totalTXs")
      .catch((e) => {
        console.error(e);
      });
    const result2 = await axios
      .get("https://api.worldofdypians.com/api/getWodVolume")
      .catch((e) => {
        console.error(e);
      });

    if (
      result &&
      result.status === 200 &&
      result.data &&
      result.data !== "NaN"
    ) {
      setTotalTx(result.data);
      localStorage.setItem("cachedTvl", result.data);
    }

    if (
      result2 &&
      result2.status === 200 &&
      result2.data &&
      result2.data !== "NaN"
    ) {
      setTotalVolume(result2.data.totalVolume);
      localStorage.setItem("cachedVolume", result2.data.totalVolume);
    }
  };

  const cachedVolume = localStorage.getItem("cachedVolume");
  const cachedTvl = localStorage.getItem("cachedTvl");

  const fetchCachedData = () => {
    if (cachedTvl && cachedVolume) {
      setTotalTx(cachedTvl);
      setTotalVolume(cachedVolume);
    }
  };

  useEffect(() => {
    getAllData();
    fetchCachedData();
  }, []);

  return (
    <div className="py-20 px-6 position-relative overflow-hidden metrics-bg">
      {/* Background Image */}
      <div className="position-absolute top-0 end-0 bottom-0 start-0">
        <img
          src="https://cdn.worldofdypians.com/wod/metricsbg.webp"
          alt="Futuristic Technology"
          className="w-100 h-100 object-fit-cover"
          style={{ opacity: 0.2 }}
        />
        <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      </div>

      <div className="custom-container mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 bordertw border-cyan-400/30 rounded-full backdrop-blur-sm mb-6">
            <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
              Performance Metrics
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r metrics-title from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DRIVING REAL
            </span>
            <br />
            <span className="text-white metrics-title">RESULTS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              {/* Glow effect */}
              <div
                className={`position-absolute top-0 end-0 bottom-0 start-0 bg-gradient-to-r ${stat.color} opacitytw-20 rounded-2xl blur-xl group-hover:opacitytw-40 transition-all duration-500`}
              ></div>

              <div
                className={`position-relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 bordertw border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 ${stat.glowColor} shadow-2xl group-hover:shadow-3xl`}
              >
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">
                      <img src={stat.icon} alt={stat.label} />
                    </div>
                  </div>

                  <div
                    className={`text-4xl font-semibold md:text-5xl mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.number}
                  </div>

                  <div className="text-gray-300 text-sm tracking-wider">
                    {stat.label}
                  </div>
                </div>

                {/* Animated border */}
                <div
                  className={`position-absolute top-0 end-0 bottom-0 start-0 rounded-2xl bg-gradient-to-r ${stat.color} opacitytw-0 group-hover:opacitytw-20 transition-opacity duration-500 pointer-events-none`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default KickstarterStats;
