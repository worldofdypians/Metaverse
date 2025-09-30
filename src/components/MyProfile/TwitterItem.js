import axios from "axios";
import React, { useState } from "react";

const TwitterItem = ({ item, index, address, checkTwitter }) => {
  const [loading, setLoading] = useState({
    like: false,
    comment: false,
    retweet: false,
  });



const [failed, setFailed] = useState(null);
const [success, setSuccess] = useState(null);
const [taskChecked, setTaskChecked] = useState(false);


  const checkTask = async (tweetId, taskType) => {
    axios
      .post(`https://api.worldofdypians.com/twitter/verify-task`, {
        walletAddress: address,
        tweetId: tweetId,
        taskType: taskType,
      })
      .then((res) => {
        if(res.data.verified){
          setTaskChecked(true);
          setSuccess(true);
          setTimeout(() => {
            setTaskChecked(false);
            setSuccess(null);
          }, 2000);
        } else if(!res.data.verified){
          setTaskChecked(true);
          setFailed(true);
          setTimeout(() => {
            setTaskChecked(false);
            setFailed(null);
          }, 2000);
        }
        checkTwitter()
      })
      .catch((err) => {
        console.log(err);
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

    setTimeout(() => {
      checkTask(item.tweetId, type);
      setLoading({
        like: false,
        comment: false,
        retweet: false,
      });
    }, 2000);
  };

  return (
    <a
      href={`https://x.com/worldofdypians/status/${item.tweetId}`}
      target="_blank"
      className="twitter-task-item d-flex flex-column gap-3 w-100  p-2 position-relative"
      key={index}
    >
     {success &&
     <div className={`star-amount-container-2 ${taskChecked && "task-opacity"} task-completed-tag d-flex align-items-center gap-2 p-1`}>
            <img
              src="https://cdn.worldofdypians.com/wod/lbStar.png"
              width={16}
              height={16}
              alt=""
            />
            <span className="star-amount-twitter">+15</span>
          </div>
     }

     {failed &&
          <div className={`task-completed-tag ${taskChecked && "task-opacity"}`}>
            <div className="task-failed-tag">
              <img src={`https://cdn.worldofdypians.com/wod/popupXmark.svg`} width={16} height={16} alt="" />
            </div>
          </div>
     }
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
      <div className="d-flex align-items-start align-items-lg-center flex-column flex-lg-row gap-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className={`twitter-action-btn ${
              item.tasks[0].verified && item.tasks[0].completed
                ? "twitter-action-btn-disabled"
                : ""
            } d-flex align-items-center gap-2 p-1`}
            onClick={(e) => {
              e.preventDefault(); // stop the <a> from redirecting
              e.stopPropagation(); // stop bubbling up
              handleCheckTask("like");
            }}
          >
            {!loading.like ? (
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
                  class={`lucide lucide-heart ${item.tasks[0].verified && item.tasks[0].completed ? "text-[#1E90FF]" : "icon-color"}`}
                  aria-hidden="true"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
                </svg>

                <span className="twitter-action-text">Like</span>
                {item.tasks[0].verified && item.tasks[0].completed && (
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
                    class="lucide lucide-check ml-1 text-[#1E90FF]"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                )}
              </>
            ) : (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
          <div className="star-amount-container d-flex align-items-center gap-2 p-1">
            <img
              src="https://cdn.worldofdypians.com/wod/lbStar.png"
              width={16}
              height={16}
              alt=""
            />
            <span className="star-amount-twitter">15</span>
          </div>
        </div>
         <div className="d-flex align-items-center gap-2">
          <div
            className={`twitter-action-btn ${
              item.tasks[1].verified && item.tasks[1].completed
                ? "twitter-action-btn-disabled"
                : ""
            } d-flex align-items-center gap-2 p-1`}
            onClick={(e) => {
              e.preventDefault(); // stop the <a> from redirecting
              e.stopPropagation(); // stop bubbling up
              handleCheckTask("retweet");
            }}
          >
            {!loading.retweet ? (
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
                  class={`lucide lucide-repeat ${item.tasks[1].verified && item.tasks[1].completed ? "text-[#1E90FF]" : "icon-color"}`}
                  aria-hidden="true"
                >
                  <path d="m17 2 4 4-4 4"></path>
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                  <path d="m7 22-4-4 4-4"></path>
                  <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                </svg>
                <span className="twitter-action-text">Retweet</span>
                {item.tasks[1].verified && item.tasks[1].completed && (
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
                    class="lucide lucide-check ml-1 text-[#1E90FF]"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                )}
              </>
            ) : (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
          <div className="star-amount-container d-flex align-items-center gap-2 p-1">
            <img
              src="https://cdn.worldofdypians.com/wod/lbStar.png"
              width={16}
              height={16}
              alt=""
            />
            <span className="star-amount-twitter">25</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div
            className={`twitter-action-btn ${
              item.tasks[2].verified && item.tasks[2].completed
                ? "twitter-action-btn-disabled"
                : ""
            } d-flex align-items-center gap-2 p-1`}
            onClick={(e) => {
              e.preventDefault(); // stop the <a> from redirecting
              e.stopPropagation(); // stop bubbling up
              handleCheckTask("comment");
            }}
          >
            {!loading.comment ? (
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
                  class={`lucide lucide-message-circle ${item.tasks[2].verified && item.tasks[2].completed ? "text-[#1E90FF]" : "icon-color"}`}
                  aria-hidden="true"
                >
                  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
                </svg>
                <span className="twitter-action-text">Comment</span>
                {item.tasks[2].verified && item.tasks[2].completed && (
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
                    class="lucide lucide-check ml-1 text-[#1E90FF]"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                )}
              </>
            ) : (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
          <div className="star-amount-container d-flex align-items-center gap-2 p-1">
            <img
              src="https://cdn.worldofdypians.com/wod/lbStar.png"
              width={16}
              height={16}
              alt=""
            />
            <span className="star-amount-twitter">35</span>
          </div>
        </div>
       
        {/* <div className="d-flex flex-column gap-2 align-items-center">
          <a
            href={`https://x.com/worldofdypians/status/${item.tweetId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={like}
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </a>
          <button
            disabled={loading.like}
            className="activate-btn px-3 py-1"
            onClick={() => handleCheckTask("like")}
          >
            {!loading.like ? (
              "Check"
            ) : (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div>
        <div className="d-flex flex-column gap-2 align-items-center">
          <a
            href={`https://x.com/worldofdypians/status/${item.tweetId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={comment}
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </a>
          <button
            disabled={loading.comment}
            className="activate-btn px-3 py-1"
            onClick={() => handleCheckTask("comment")}
          >
            {!loading.comment ? (
              "Check"
            ) : (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div>
        <div className="d-flex flex-column gap-2 align-items-center">
          <a
            href={`https://x.com/worldofdypians/status/${item.tweetId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={repost}
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </a>
          <button
            disabled={loading.retweet}
            className="activate-btn px-3 py-1"
            onClick={() => handleCheckTask("retweet")}
          >
            {!loading.retweet ? (
              "Check"
            ) : (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div> */}
      </div>
    </a>
  );
};

export default TwitterItem;
