import React from "react";
import "./_challenges.scss";
import mazeGardenBanner from "./assets/mazeGardenBanner.png";

const MazeGarden = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="new-event-wrapper d-flex flex-column">
        <div className="position-relative">
          <img src={mazeGardenBanner} className="new-event-banner" alt="" />
          <h6 className="mb-0 new-event-title">Maze Garden</h6>
        </div>
        <div className="p-3">
          <p className="new-event-desc">
            The Maze Garden event offers players a weekly challenge to navigate
            and conquer intricate mazes. Players must use their skills and
            strategy to find their way through the complex labyrinths.
            Successful completion of the maze rewards players with leaderboard
            points, helping them improve their global rank and showcase their
            abilities.
          </p>
        </div>
      </div>

      <div className="new-event-wrapper mt-4 p-5 d-flex align-items-center justify-content-center">
        <h6 className="mb-0 event-coming-soon ">Event Coming Soon</h6>
      </div>
    </div>
  );
};

export default MazeGarden;
