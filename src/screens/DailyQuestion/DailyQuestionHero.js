import React from "react";

const DailyQuestionHero = () => {
  return (
    <div className="daily-question-wrapper position-relative d-flex align-items-center flex-column justify-content-end gap-5">
      <div className="custom-container  mt-5 pt-5 pt-lg-0 mt-lg-0">
        <div className="d-flex flex-column w-100 gap-5">
          <div className="row mx-0 align-items-center justify-content-center gap-2">
            <div className="col-12 col-lg-6 ps-lg-0">
              <div className="d-flex flex-column gap-2 align-items-center">
                <h6 className="market-banner-title text-center">
                  AI Question Of The Day
                </h6>
                <span className="market-banner-desc font-montserrat text-center">
                 The AI Question Of The Day is a fun and engaging mini-game where players unlock a new AI-generated question every day. Each question comes with three answer choices — one correct and two incorrect. Choose the right answer to earn star rewards and test your knowledge daily!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuestionHero;
