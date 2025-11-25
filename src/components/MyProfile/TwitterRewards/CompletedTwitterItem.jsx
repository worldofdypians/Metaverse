import React from "react";

const CompletedTwitterItem = ({ item, index }) => {


  const timestamp = item.tweetCreatedAt;
  const date = new Date(timestamp);

  // Get hours & minutes (UTC because timestamp ends with Z)
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const formattedHour = `${hours}:${minutes}`;


  return (
    <a
      href={`https://x.com/worldofdypians/status/${item.tweetId}`}
      target="_blank"
      className="twitter-task-item d-flex flex-column gap-3 w-100  p-2 position-relative"
      key={index}
    >
      <div className="twitter-check-mark">
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
          class="lucide lucide-check w-4 h-4 text-white"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      </div>
      <div className="d-flex flex-column gap-3 twitter-item-width">
        <a
          href={`https://x.com/worldofdypians/status/${item.tweetId}`}
          target="_blank"
          className="tweet-title-holder p-3 d-flex align-items-center gap-2"
        >
          <img
            src="https://cdn.worldofdypians.com/wod/wodToken.svg"
            width={32}
            height={32}
            alt=""
          />
          <div
            target="_blank"
            className="overall-link d-flex flex-column gap-1"
          >
          <span className="twitter-post">{item.tweetDescription.length > 100 ? item.tweetDescription.slice(0,100) + "..." : item.tweetDescription}</span>
            <span className="twitter-post">{formattedHour}</span>
          </div>
        </a>
      </div>
      <div className="d-flex align-items-center gap-1">
        <span className="task-completed-text">Task Completed</span>
        <div className="gray-dot"></div>
        <span className="task-completed-text">
          {new Date(item.assignedAt).toLocaleDateString("en-GB")}
        </span>
      </div>
    </a>
  );
};

export default CompletedTwitterItem;
