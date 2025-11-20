import axios from "axios";
import React, { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";

const TwitterItem = ({ item, index, address, checkTwitter, add }) => {
  const [loading, setLoading] = useState({
    like: false,
    comment: false,
    retweet: false,
  });

  const [likeChecked, setLikeChecked] = useState(false);
  const [repostChecked, setRepostChecked] = useState(false);
  const [commentChecked, setCommentChecked] = useState(false);

  const taskLength = JSON.parse(localStorage.getItem("taskLength"));

  const cryptoTweets = [
    "Market dumped but our community stayed unbothered like true diamond hands warriors 💎🛡️😂",
    "Big feature dropping tomorrow and yes, it’s actually worth the hype this time 👀🔥",
    "Dev team said the update is stable but we’ve heard that before so pray for us 🤞😂",
    "Gas fees hit ultra low levels today, even our bots got excited and started spamming transactions 🤖⛽️⬇️",
    "Our servers survived a massive traffic spike and didn’t explode, which is honestly a miracle 🚀🔥😅",
    "Community energy is unreal today, almost stronger than that random midnight pump 📈⚡️😎",
    "Testing a new upgrade that should make transactions faster, cheaper, and slightly less stressful 😭✨",
    "We’re cooking something huge and this time the devs refuse to leave the office until it's done 👨‍💻🔥",
    "HODL checklist: hydrate, breathe, touch grass, ignore charts, repeat until bull run arrives 🌱📉😂",
    "Something big is brewing and no we’re not telling you yet, stay tuned fam 👀💥",
    "Chart looks wild today but don’t worry, our tech is still solid and caffeine-powered ☕⚡️😂",
    "We just pushed a tiny update that somehow fixed three bugs and created zero new ones 😳🔥",
    "New partnership dropping soon and no it’s not another mystery collab with a random mascot 🐸🤝😂",
    "If this market keeps swinging like this we’re giving everyone honorary gymnast medals 🤸‍♂️📉📈",
    "Dev team claims the next release is ‘actually the one’ so fingers crossed for no chaos 🤞💻🔥",
    "Our community really woke up today choosing pure bullish energy and zero fear vibes 🐂💥😎",
    "Someone asked if we’re preparing for the next bull run—buddy we’ve been waiting since 2021 😂🚀",
    "We’re rolling out backend improvements so smooth even the blockchain might blush 😳✨🔗",
    "Reminder: you don’t lose if you don’t look at the chart today 😮‍💨📉😂",
    "This week’s update is almost ready, devs are whispering ‘don’t break please’ like a sacred ritual 🙏💻🔥",
  ];


const timestamp = item.assignedAt;
const date = new Date(timestamp);

// Get hours & minutes (UTC because timestamp ends with Z)
const hours = String(date.getUTCHours()).padStart(2, "0");
const minutes = String(date.getUTCMinutes()).padStart(2, "0");

const formattedHour = `${hours}:${minutes}`;

  const windowSize = useWindowSize();

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
      className="twitter-task-item d-flex flex-column flex-lg-row align-items-center justify-content-between  w-100  p-2 position-relative"
      key={index}
    >
      {!taskLength?.includes(item.tweetId) && (
        <div className="new-post-tag d-flex p-2 align-items-center justify-content-center">
          <span className="new-post-text">NEW</span>
        </div>
      )}
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
            <span className="twitter-post">{cryptoTweets[index]}</span>
            <span className="twitter-post">{formattedHour}</span>
          </div>
        </a>
     
      </div>
           <div className="d-flex align-items-end align-items-lg-center flex-row flex-lg-column gap-2 mt-3 mt-lg-0">
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
  );
};

export default TwitterItem;
