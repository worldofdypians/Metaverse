import axios from "axios";
import React, { useState } from "react";

const TwitterItem = ({ item, index, address, checkTwitter }) => {
  const [loading, setLoading] = useState({
    like: false,
    comment: false,
    retweet: false,
  });

  const [likeChecked, setLikeChecked] = useState(false);
  const [repostChecked, setRepostChecked] = useState(false);
  const [commentChecked, setCommentChecked] = useState(false);

  const checkTask = async (tweetId, taskType) => {
    axios
      .post(`https://api.worldofdypians.com/twitter/verify-task`, {
        walletAddress: address,
        tweetId: tweetId,
        taskType: taskType,
      })
      .then((res) => {
        checkTwitter();
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
      checkTask(item.tweetId, type).then(() => {
        if (type === "like") {
          setLikeChecked(true);
        } else if (type === "comment") {
          setCommentChecked(true);
        } else if (type === "retweet") {
          setRepostChecked(true);
        }
      });
      setLoading({
        like: false,
        comment: false,
        retweet: false,
      });
    }, 2000);
  };

  return (
    <div
      className="twitter-task-item d-flex align-items-center justify-content-between  w-100  p-2 position-relative"
      key={index}
    >
      {/* {success && (
        <div
          className={`star-amount-container-2 ${
            taskChecked && "task-opacity"
          } task-completed-tag d-flex align-items-center gap-2 p-1`}
        >
          <img
            src="https://cdn.worldofdypians.com/wod/lbStar.png"
            width={16}
            height={16}
            alt=""
          />
          <span className="star-amount-twitter">+15</span>
        </div>
      )}

      {failed && (
        <div className="twitter-task-failed p-1 d-flex align-items-center justify-content-center">
          <span>Task is not completed</span>
        </div>
      )} */}
      <div className="d-flex flex-column gap-3">
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
            <span className="twitter-username">@worldofdypians</span>
            <span className="twitter-post">
              Exciting news! New adventures await in World of Dypians. Join our
              community! 🎮✨
            </span>
          </div>
        </a>
        <div className="d-flex align-items-start align-items-lg-center flex-column flex-lg-row gap-3">
          <button
            className={`twitter-action-btn ${
              item?.tasks[0]?.verified && item?.tasks[0].completed
                ? "twitter-action-btn-disabled"
                : ""
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

                <span className="twitter-action-text">Check</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleCheckTask("retweet")}
            className={`twitter-action-btn ${
              item?.tasks[1]?.verified && item?.tasks[1].completed
                ? "twitter-action-btn-disabled"
                : ""
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
                <span className="twitter-action-text">Check</span>
              </>
            )}
          </button>

          <button
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
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center gap-2">
        <span className="available-rewards-text text-center text-white">
          Tasks
        </span>

        <div className="d-flex flex-column gap-1 align-items-center gap-1">
          <div className="d-flex align-items-center justify-content-between w-100 gap-2">
            <div className="d-flex align-items-center gap-1">
              <div className="task-icon-holder p-2">
                {likeChecked && (
                  <>
                    {item?.tasks[0]?.verified && item?.tasks[0]?.completed ? (
                      <div className="task-check-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M8.33073 2.5L3.7474 7.08333L1.66406 5"
                            stroke="white"
                            stroke-width="0.833333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="task-check-fail">✕</div>
                    )}
                  </>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M1.33594 6.33043C1.33595 5.58882 1.56092 4.86467 1.98113 4.25361C2.40134 3.64254 2.99703 3.17332 3.68951 2.90791C4.38199 2.6425 5.13869 2.59338 5.85967 2.76706C6.58065 2.94073 7.23199 3.32901 7.72767 3.88063C7.76258 3.91796 7.80479 3.94772 7.85167 3.96807C7.89856 3.98841 7.94913 3.99891 8.00024 3.99891C8.05135 3.99891 8.10191 3.98841 8.1488 3.96807C8.19569 3.94772 8.23789 3.91796 8.27281 3.88063C8.76692 3.32543 9.41841 2.93388 10.1406 2.7581C10.8627 2.58232 11.6213 2.63064 12.3153 2.89664C13.0093 3.16263 13.6058 3.63369 14.0255 4.2471C14.4452 4.86052 14.6681 5.5872 14.6645 6.33043C14.6645 7.85655 13.6649 8.99615 12.6652 9.99579L9.00521 13.5365C8.88104 13.6792 8.72793 13.7937 8.55607 13.8726C8.38421 13.9515 8.19753 13.9929 8.00843 13.9941C7.81932 13.9953 7.63213 13.9563 7.45929 13.8796C7.28644 13.8028 7.1319 13.6902 7.00592 13.5492L3.33523 9.99579C2.33558 8.99615 1.33594 7.86322 1.33594 6.33043Z"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="1.33286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="available-rewards-text">Like</span>
            </div>
            <div
              className={`star-amount-container ${
                item?.tasks[0]?.verified && item?.tasks[0]?.completed
                  ? "stars-completed"
                  : ""
              } d-flex align-items-center gap-2 p-1`}
            >
              <img
                src="https://cdn.worldofdypians.com/wod/lbStar.png"
                width={16}
                height={16}
                alt=""
              />
              <span className="star-amount-twitter">15</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between w-100 gap-2">
            <div className="d-flex align-items-center gap-1">
              <div className="task-icon-holder p-2">
                {repostChecked && (
                  <>
                    {item?.tasks[1]?.verified && item?.tasks[1]?.completed ? (
                      <div className="task-check-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M8.33073 2.5L3.7474 7.08333L1.66406 5"
                            stroke="white"
                            stroke-width="0.833333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="task-check-fail">✕</div>
                    )}
                  </>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M11.3281 1.33203L13.9938 3.99775L11.3281 6.66347"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="1.33286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 7.3302V6.66377C2 5.95677 2.28085 5.27874 2.78077 4.77882C3.28069 4.2789 3.95873 3.99805 4.66572 3.99805H13.9957"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="1.33286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.66572 14.6615L2 11.9958L4.66572 9.33008"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="1.33286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.9957 8.66406V9.33049C13.9957 10.0375 13.7149 10.7155 13.215 11.2154C12.715 11.7154 12.037 11.9962 11.33 11.9962H2"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="1.33286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="available-rewards-text">Repost</span>
            </div>
            <div
              className={`star-amount-container ${
                item?.tasks[1]?.verified && item?.tasks[1]?.completed
                  ? "stars-completed"
                  : ""
              } d-flex align-items-center gap-2 p-1`}
            >
              <img
                src="https://cdn.worldofdypians.com/wod/lbStar.png"
                width={16}
                height={16}
                alt=""
              />
              <span className="star-amount-twitter">25</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between w-100 gap-2">
            <div className="d-flex align-items-center gap-1">
              <div className="task-icon-holder p-2">
                {commentChecked && (
                  <>
                    {item?.tasks[1]?.verified && item?.tasks[1]?.completed ? (
                      <div className="task-check-success">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M8.33073 2.5L3.7474 7.08333L1.66406 5"
                            stroke="white"
                            stroke-width="0.833333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="task-check-fail">✕</div>
                    )}
                  </>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M1.99683 10.8917C2.09482 11.1389 2.11664 11.4098 2.05947 11.6694L1.34973 13.862C1.32686 13.9732 1.33277 14.0884 1.3669 14.1966C1.40104 14.3049 1.46226 14.4027 1.54477 14.4806C1.62728 14.5586 1.72833 14.6142 1.83835 14.6422C1.94837 14.6701 2.06371 14.6695 2.17343 14.6404L4.44796 13.9753C4.69302 13.9267 4.9468 13.9479 5.18037 14.0366C6.60345 14.7012 8.21553 14.8418 9.73218 14.4336C11.2488 14.0254 12.5726 13.0947 13.4699 11.8056C14.3672 10.5166 14.7804 8.95201 14.6365 7.388C14.4927 5.82398 13.8011 4.36102 12.6837 3.25723C11.5664 2.15344 10.0951 1.47975 8.52943 1.35504C6.96377 1.23032 5.40438 1.66258 4.12637 2.57556C2.84836 3.48854 1.93387 4.82357 1.54425 6.34509C1.15463 7.86661 1.31492 9.47686 1.99683 10.8917Z"
                    stroke="white"
                    stroke-opacity="0.6"
                    stroke-width="1.33286"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span className="available-rewards-text">Comment</span>
            </div>
            <div
              className={`star-amount-container ${
                item?.tasks[2]?.verified && item?.tasks[2]?.completed
                  ? "stars-completed"
                  : ""
              } d-flex align-items-center gap-2 p-1`}
            >
              <img
                src="https://cdn.worldofdypians.com/wod/lbStar.png"
                width={16}
                height={16}
                alt=""
              />
              <span className="star-amount-twitter">35</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterItem;
