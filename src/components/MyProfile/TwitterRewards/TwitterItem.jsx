import axios from "axios";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import { log } from "three";

const TwitterItem = ({
  item,
  index,
  address,
  checkTwitter,
  add,
  checkLimit,
  seenPosts,
  setSeenPosts,
  handleRemove,
  email,
}) => {
  const [loading, setLoading] = useState({
    like: false,
    comment: false,
    retweet: false,
  });

  const isNew = (id) => !seenPosts.includes(id);

  const timestamp = item.tweetCreatedAt;
  const date = new Date(timestamp);

  // Get hours & minutes (UTC because timestamp ends with Z)
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const formattedHour = `${hours}:${minutes}`;

  const isLocked = () => {
    const lock = Number(localStorage.getItem("apiLock")) || 0;
    const cooldownUntil = Number(localStorage.getItem("apiCooldownUntil")) || 0;

    return lock === 2 && Date.now() < cooldownUntil;
  };

  const checkTask = async (tweetId, taskType) => {
    axios
      .post(`https://api.worldofdypians.com/twitter/verify-task`, {
        walletAddress: address,
        tweetId: tweetId,
        taskType: taskType,
      })
      .then(() => {
        addStars(tweetId, taskType);
        checkLimit();
        checkTwitter();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addStars = async (tweetId, taskType) => {
    const body = {
      email: email,
      tweetId: tweetId,
      taskType: taskType,
    };

    await axios
      .post(
        `https://worldofdypianssocials-htbgbnd6a2b3hzgk.westeurope-01.azurewebsites.net/api/AwardStarsForInteraction_X?code=Y8m2H8XIXz4DkOaOkYDTBMR9jnQ3NYbHDHlXRFv-ZX58AzFubmbkWQ==`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        add(Number(res.data.rewards[0].reward));

        setLoading({
          like: false,
          comment: false,
          retweet: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading({
          like: false,
          comment: false,
          retweet: false,
        });
      });
  };

  const handleCheckTask = (type) => {
    if (type === "like") {
      setLoading((prev) => ({
        ...prev,
        like: true,
      }));
    } else if (type === "comment") {
      setLoading((prev) => ({
        ...prev,
        comment: true,
      }));
    } else if (type === "retweet") {
      setLoading((prev) => ({
        ...prev,
        retweet: true,
      }));
    }

    checkTask(item.tweetId, type);
  };

  return (
    <div
      className="twitter-task-item d-flex flex-column flex-lg-row align-items-center justify-content-between  w-100  p-2 position-relative"
      key={index}
    >
      {isNew(item.tweetId) && (
        <div className="new-post-tag d-flex px-2 py-1 align-items-center justify-content-center">
          <span className="new-post-text">NEW</span>
        </div>
      )}

      <div className="d-flex flex-column gap-3 twitter-item-width">
        <a
          href={`https://x.com/worldofdypians/status/${item.tweetId}`}
          onClick={() => {
            handleRemove(item.tweetId);
          }}
          target="_blank"
          className="tweet-title-holder p-3 d-flex align-items-center gap-2 position-relative"
        >
          <img
            src="https://cdn.worldofdypians.com/wod/wodToken.svg"
            width={32}
            height={32}
            alt=""
          />
          <div
            target="_blank"
            className="overall-link d-flex flex-column gap-1 w-100"
          >
            <span className="twitter-post">
              {item.tweetDescription.length > 100
                ? item.tweetDescription.slice(0, 100) + "..."
                : item.tweetDescription}
            </span>
            <div className="d-flex w-100 justify-content-end">
              <span className="twitter-post-date">{formattedHour}</span>
            </div>
          </div>
        </a>
      </div>
      <div className="d-flex align-items-end align-items-lg-center flex-row flex-lg-column gap-2 mt-3 mt-lg-0">
        <button
          disabled={isLocked()}
          className={`twitter-action-btn ${
            item?.tasks[0]?.verified && item?.tasks[0].completed
              ? "twitter-action-btn-disabled"
              : ""
          } ${
            isLocked() && "locked-action-btn"
          }  d-flex align-items-center gap-2 p-1`}
          onClick={() => handleCheckTask("like")}
        >
          {loading.like ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class={`lucide lucide-heart icon-color`}
                aria-hidden="true"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
              </svg>

              <span className="twitter-action-text">
                {item?.tasks[0]?.verified && item?.tasks[0].completed
                  ? "Completed"
                  : "Check"}
              </span>
            </>
          )}
        </button>

        <button
          disabled={
            isLocked() || (item?.tasks[1]?.verified && item?.tasks[1].completed)
          }
          onClick={() => handleCheckTask("retweet")}
          className={`twitter-action-btn ${
            item?.tasks[1]?.verified && item?.tasks[1].completed
              ? "twitter-action-btn-disabled"
              : ""
          }   ${
            isLocked() && "locked-action-btn"
          } d-flex align-items-center gap-2 p-1`}
        >
          {loading.retweet ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class={`lucide lucide-repeat icon-color`}
                aria-hidden="true"
              >
                <path d="m17 2 4 4-4 4"></path>
                <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                <path d="m7 22-4-4 4-4"></path>
                <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
              </svg>
              <span className="twitter-action-text">
                {item?.tasks[1]?.verified && item?.tasks[1].completed
                  ? "Completed"
                  : "Check"}
              </span>
            </>
          )}
        </button>

        {/* <button
          onClick={() => handleCheckTask("comment")}
          className={`twitter-action-btn ${
            item?.tasks[2]?.verified && item?.tasks[2].completed
              ? "twitter-action-btn-disabled"
              : ""
          } d-flex align-items-center gap-2 p-1`}
        >
          {loading.comment ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class={`lucide lucide-message-circle icon-color`}
                aria-hidden="true"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
              </svg>
              <span className="twitter-action-text">Check</span>
            </>
          )}
        </button> */}
      </div>
    </div>
  );
};

export default TwitterItem;
