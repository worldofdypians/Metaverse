import React from "react";

const CompletedTwitterItem = ({ item, index, checkTask }) => {
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
      <div className="d-flex align-items-center gap-2">
        <img
          src="https://cdn.worldofdypians.com/wod/wodToken.svg"
          width={32}
          height={32}
          alt=""
        />
        <div className="d-flex flex-column gap-1">
          <span className="twitter-username">@worldofdypians</span>
          <span className="twitter-post">
            Exciting news! New adventures await in World of Dypians. Join our
            community! 🎮✨
          </span>
        </div>
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
