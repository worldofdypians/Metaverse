import { useEffect, useState, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Legend,
  Line,
} from "recharts";
import { localData } from "./data";
import { abbreviateNumber } from "js-abbreviation-number";
import getFormattedNumber from "../Caws/functions/get-formatted-number";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";
const Reserve = ({ wodPrice }) => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: undefined,
    });
  };

  const INITIAL_COUNT = 15;
  const LOAD_COUNT = 20;
  const chartRef = useRef(null);
  const dataFetchedRef = useRef(false);

  const [chartData, setChartData] = useState(localData);
  const [avgPrice, setavgPrice] = useState(0);

  const [activeButton, setActiveButton] = useState("down");
  const [displayData, setDisplayData] = useState([]);
  const [startIndex, setStartIndex] = useState(
    // Math.max(localData.length - INITIAL_COUNT, 0)
    0
  );

  const addOneDay = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const mergeData = (fetchData) => {
    const result = [...localData];
    let lastAmount = localData[localData.length - 1]?.amount || 0;

    const alteredFetch = fetchData.map((item) => {
      lastAmount += item.amount;
      return {
        ...item,
        amount: lastAmount,
      };
    });
    // if (alteredFetch.length > 0) {
    //   const lastItem = alteredFetch[alteredFetch.length - 1];
    //   alteredFetch.push({
    //     date: addOneDay(lastItem.date),
    //     amount: lastItem.amount,
    //     wodPrice: lastItem.wodPrice,
    //   });
    // }
    let allprice = 0;
    const sumFunction = (a, b) => a + b;
    [...result, ...alteredFetch].forEach((data) => {
      return (allprice = sumFunction(allprice, Number(data.wodPrice)));
    });

    setavgPrice(allprice / [...result, ...alteredFetch].length);
    setChartData([...result, ...alteredFetch]);
    return [...result, ...alteredFetch];
  };
  const fetchDynamicData = async () => {
    const result = await axios
      .get("https://api.worldofdypians.com/api/reserve-transfers")
      .catch((e) => {
        console.error(e);
      });
    if (result && result.status === 200) {
      // console.log(result.data);
      // chartData.push(...result.data);
      mergeData(result.data);
    }
  };

  useEffect(() => {
    setDisplayData(chartData.slice(startIndex));
  }, [startIndex, chartData]);

  useEffect(() => {
    const handleWheel = (e) => {
      // if (!zoomActive) return;
      e.preventDefault();

      if (e.deltaY < 0) handleScrollUp();
      if (e.deltaY > 0) handleScrollDown();
    };

    const chartDiv = chartRef.current;
    chartDiv.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      chartDiv.removeEventListener("wheel", handleWheel);
    };
  }, [startIndex, chartData.length]);

  const handleScrollUp = () => {
    setActiveButton("up");
    const newStart = Math.max(startIndex - LOAD_COUNT, 0);
    setStartIndex(newStart);
  };

  const handleScrollDown = () => {
    const newStart = Math.min(
      startIndex + LOAD_COUNT,
      Math.max(chartData.length - INITIAL_COUNT, 0)
    );
    setStartIndex(newStart);
    setActiveButton("down");
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchDynamicData();
  }, []);
  const isUpDisabled = startIndex === 0;
  const isDownDisabled = displayData.length <= INITIAL_COUNT;
  return (
    <div
      className="container-fluid bg-[#0a0d1f] py-5 bottom-border-divider position-relative"
      id="reserve"
    >
      {/* <div className="absolute inset-0 -z-1">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl -z-1"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-3xl -z-1"></div>
      </div> */}
      <div className="absolute top-0 right-0 w-64 h-64 opacitytw-20 -z-1">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#06b6d4", stopOpacity: 0.6 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#3b82f6", stopOpacity: 0.4 }}
              />
            </linearGradient>
          </defs>
          <polygon
            points="100,20 180,60 180,140 100,180 20,140 20,60"
            fill="url(#grad1)"
            opacity="0.3"
          />
          <polygon
            points="140,40 170,60 170,100 140,120 110,100 110,60"
            fill="url(#grad1)"
            opacity="0.5"
          />
          <polygon
            points="160,80 180,90 180,110 160,120 140,110 140,90"
            fill="url(#grad1)"
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="d-flex flex-column">
        <div className="custom-container  d-flex flex-column w-100 gap-3 mx-auto">
          <div className="d-flex flex-column align-items-center gap-2">
            <section className="w-100 mx-auto d-flex flex-column gap-5">
              <div className="d-flex flex-column flex-lg-row gap-2 align-items-center justify-content-center justify-content-lg-between">
                <div className="d-flex flex-column gap-3">
                  <h4 className="explorer-grid-title font-montserrat text-start mb-0">
                    World of Dypians Reserve
                  </h4>
                  <span className="tokenomics-wrapper-desc">
                    The World of Dypians Reserve is a strategic WOD fund powered
                    by continuous buybacks from on-chain and off-chain revenues,
                    driving long-term growth and stability.
                  </span>
                  <div className="d-flex flex-column flex-lg-row flex-md-row gap-2">
                    <a
                      href="https://bscscan.com/address/0xb9e7F9434E27589298a6C8a174A4CE8003509fD8"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bordertw border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <img src="https://cdn.worldofdypians.com/wod/link.svg" />
                      <span className="text-cyan-400 text-sm">
                        Reserve Wallet 1
                      </span>
                    </a>
                    <a
                      href="https://bscscan.com/address/0x3a0abB76fC578a5dBd8cf113AD70DF2ECeF86546"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bordertw border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <img src="https://cdn.worldofdypians.com/wod/link.svg" />
                      <span className="text-cyan-400 text-sm">
                        Reserve Wallet 2
                      </span>
                    </a>
                    <a
                      href="https://medium.com/@worldofdypians/introducing-world-of-dypians-reserve-creating-a-strategic-wod-token-reserve-fd3816e98d5c"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bordertw border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <img src="https://cdn.worldofdypians.com/wod/link.svg" />
                      <span className="text-cyan-400 text-sm">
                        Reserve Blog
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              {/* Metric Cards */}
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 mb-4 h-100">
                <div className="relative bg-[#0f1729]/90 backdrop-blur-xl bordertw border-cyan-500/20 rounded-xl hover:border-cyan-400/40 transition-all duration-300 d-flex flex-column col-lg-3">
                  <MetricCard
                    title="USD Value of Reserve"
                    value={
                      "$" +
                      getFormattedNumber(
                        chartData[chartData.length - 1].amount * wodPrice
                      )
                    }
                  />
                  <MetricCard
                    title="Current Reserve Size in WOD"
                    value={getFormattedNumber(
                      chartData[chartData.length - 1].amount
                    )}
                  />
                  <MetricCard
                    title="Average WOD Cost Basis"
                    value={"$" + getFormattedNumber(avgPrice, 6)}
                  />
                </div>

                {/* Chart */}
                <div className="bg-[#0f1729]/90 backdrop-blur-xl rounded-xl p-4 shadow-lg w-100">
                  <div className="d-flex align-items-center gap-2 justify-content-between">
                    <div className="d-flex flex-column">
                      <h3 className="text-lg font-semibold mb-1 text-white">
                        Reserve Activity
                      </h3>
                      <p className="text-slate-400/70 text-xs">
                        Updated Oct 2025
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-2 justify-content-end">
                      {/* 👇 Scroll control buttons */}
                      <button
                        onClick={handleScrollUp}
                        disabled={isUpDisabled}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg bordertw border-cyan-500/30 transition-all duration-300 text-white
          ${isUpDisabled ? "bg-cyan-500/5 cursor-not-allowed" : ""}
          ${
            activeButton === "up" && !isUpDisabled
              ? "bg-cyan-500"
              : "hover:bg-cyan-500/10 hover:border-cyan-400/50"
          }
        `}
                      >
                        <Remove />
                      </button>
                      <button
                        onClick={handleScrollDown}
                        disabled={isDownDisabled}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg bordertw border-cyan-500/30 transition-all duration-300 text-white
          ${isDownDisabled ? "bg-cyan-500/5 cursor-not-allowed" : ""}
          ${
            activeButton === "down" && !isDownDisabled
              ? "bg-cyan-500"
              : "hover:bg-cyan-500/10 hover:border-cyan-400/50"
          }
        `}
                      >
                        <Add />
                      </button>
                    </div>
                  </div>
                  <div
                    id="zoomable-chart"
                    className="relative h-96 w-full select-none"
                    ref={chartRef}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={displayData}>
                        <defs>
                          <linearGradient
                            id="colorGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#06b6d4"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="100%"
                              stopColor="#3b82f6"
                              stopOpacity={0.05}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(6, 182, 212, 0.08)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="date"
                          stroke="rgba(6, 182, 212, 0.3)"
                          tick={{
                            fill: "rgba(103, 232, 249, 0.6)",
                            fontSize: 11,
                          }}
                          axisLine={{ stroke: "rgba(6, 182, 212, 0.2)" }}
                          tickFormatter={formatDate}
                        />
                        <YAxis
                          stroke="rgba(6, 182, 212, 0.3)"
                          tick={{
                            fill: "rgba(103, 232, 249, 0.6)",
                            fontSize: 11,
                          }}
                          axisLine={false}
                          width={40}
                          tickFormatter={(amount) =>
                            `${abbreviateNumber(amount, 1).replace("G", "B")}`
                          }
                          tickCount={8}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 41, 0.95)",
                            border: "1px solid rgba(6, 182, 212, 0.3)",
                            borderRadius: "8px",
                            color: "#fff",
                            backdropFilter: "blur(10px)",
                          }}
                          labelStyle={{ color: "#67e8f9", marginBottom: "4px" }}
                          formatter={(amount) => [
                            amount.toLocaleString(),
                            "WOD",
                          ]}
                          labelFormatter={(label) => {
                            const date = new Date(label);
                            return date.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            });
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#06b6d4"
                          fill="url(#colorGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3 flex items-center justify-content-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <span className="text-slate-400/70">
                      Current Holdings in WOD
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

function MetricCard({ title, value }) {
  return (
    // <div className="p-4 shadow-md h-100 flex flex-col items-start justify-center">
    //   <p className="text-sm text-gray-400 mb-1">{title}</p>
    //   <h4 className="text-2xl font-bold text-white">{value}</h4>
    // </div>

    <div className="relative group h-100 d-flex flex-column justify-content-center metric-card">
      {/* <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-600/15 to-blue-600/15 rounded-xl blur-lg opacitytw-40 group-hover:opacitytw-60 transition duration-300"></div> */}
      <div className=" p-4 hover:border-cyan-400/40 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>
        <div className="relative">
          <p className="text-4xl font-semibold mb-0">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
              {value}
            </span>
          </p>
          <p className="text-slate-400/70 text-sm m-0">{title}</p>
        </div>
      </div>
    </div>
  );
}
export default Reserve;
