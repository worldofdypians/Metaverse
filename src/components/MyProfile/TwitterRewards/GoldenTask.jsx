import React from "react";
import GoldenTaskItem from "./GoldenTaskItem";

const GoldenTask = () => {
  const dummyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-9">
          <div className="golden-task-wrapper d-flex flex-column  w-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <div className="golden-cup-holder d-flex align-items-center justify-content-center p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-trophy w-7 h-7 text-[#0B092D]"
                    aria-hidden="true"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                </div>
                <div className="d-flex flex-column">
                  <h6 className="golden-task-title">Premium Gold Task</h6>
                  <span className="golden-task-desc">
                    Compete for the grand prize pool
                  </span>
                </div>
              </div>
              <div className="golden-cup-holder p-2 d-flex flex-column align-items-center gap-2">
                <span className="total-pool-span">Total Pool</span>
                <h6 className="mb-0 total-pool">$10,000</h6>
              </div>
            </div>
            <GoldenTaskItem />
            <div className="d-flex align-items-center gap-2 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trending-up w-4 h-4 text-[#FFD700]"
                aria-hidden="true"
              >
                <path d="M16 7h6v6"></path>
                <path d="m22 7-8.5 8.5-5-5L2 17"></path>
              </svg>
              <span className="milestone-text">Milestone Progress</span>
            </div>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex align-items-center justify-content-between">
                <span className="current-milestone-progress">
                  Current Progress
                </span>
                <span className="total-milestone-progress">145/1000 Likes</span>
              </div>
              <div className="milestone-progess-bar">
                <div className="milestone-progess-bar-inner"></div>
              </div>
            </div>
            <span className="next-milestone-text mt-1">
              855 Likes till next milestone
            </span>
            <div className="d-flex flex-column gap-2 mt-1">
              <div className="milestone-wrapper-completed d-flex align-items-center justify-content-between p-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="completed-milestone-icon-wrapper p-2 d-flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-circle-check w-4 h-4 text-white"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="milestone-title mb-0">Reach 100 Likes</h6>
                    <span className="completed-milestone-span">Unlocked ✓</span>
                  </div>
                </div>
                <h6 className="milestone-prize-completed mb-0">$1,000</h6>
              </div>
              <div className="milestone-wrapper d-flex align-items-center justify-content-between p-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="milestone-icon-wrapper p-2 d-flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-lock w-4 h-4 text-white/40 lock-color"
                      aria-hidden="true"
                    >
                      <rect
                        width="18"
                        height="11"
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="milestone-title mb-0">Reach 1,000 Likes</h6>
                    <span className="milestone-span">Locked</span>
                  </div>
                </div>
                <h6 className="milestone-prize mb-0">$5,000</h6>
              </div>

              <div className="milestone-wrapper d-flex align-items-center justify-content-between p-2">
                <div className="d-flex align-items-center gap-2">
                  <div className="milestone-icon-wrapper p-2 d-flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-lock w-4 h-4 text-white/40 lock-color"
                      aria-hidden="true"
                    >
                      <rect
                        width="18"
                        height="11"
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className="d-flex flex-column">
                    <h6 className="milestone-title mb-0">Reach 5,000 Likes</h6>
                    <span className="milestone-span">Locked</span>
                  </div>
                </div>
                <h6 className="milestone-prize mb-0">$10,000</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div className="milestone-leaderboard-wrapper p-2 d-flex flex-column gap-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-trophy w-5 h-5 text-[#FFD700]"
                  aria-hidden="true"
                >
                  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                  <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                  <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                </svg>
                <h6 className="milestone-leaderboard-title mb-0">Winners</h6>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-info w-4 h-4 text-white/40 hover:text-[#FFD700] transition-colors"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div className="milestone-leaderboard-divider"></div>
            <div className="d-flex flex-column gap-1">
             {dummyList.map((item,index) => (
               <div key={index} className="milestone-leaderboard-item w-100 d-flex align-items-center justify-content-between p-1">
                <div className="d-flex align-items-center gap-2">
                  <div className="milestone-leaderboard-rank-holder d-flex align-items-center justify-content-center p-2">
                    <span className="milestone-leaderboard-rank">{item}</span>
                  </div>
                  <h6 className="milestone-player mb-0">Player #{item}</h6>
                </div>
                <span className="milestone-leaderboard-prize">$10,000</span>
              </div>
             ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldenTask;
