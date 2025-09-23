import React, { useState } from "react";
import like from "./assets/like.svg";
import repost from "./assets/repost.svg";
import comment from "./assets/comment.svg";

const TwitterItem = ({ item, index, checkTask }) => {
  const [loading, setLoading] = useState({
    like: false,
    comment: false,
    retweet: false,
  });

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
    <div
      className="twitter-task-item d-flex w-100 justify-content-between p-2"
      key={index}
    >
      <div className="d-flex align-items-center gap-2">
        <img
          src="https://cdn.worldofdypians.com/wod/twitterFooter.svg"
          width={32}
          height={32}
          alt=""
        />
        <span className="tweet-date">
          {/* {new Date(item.assignedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} */}
          World of Dypians
        </span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex flex-column gap-2 align-items-center">
          <a
            href={`https://x.com/Coinwink/status/${item.tweetId}`}
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
          <button disabled={loading.like} className="activate-btn px-3 py-1" onClick={() => handleCheckTask("like")}>
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
            href={`https://x.com/Coinwink/status/${item.tweetId}`}
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
          <button disabled={loading.comment} className="activate-btn px-3 py-1" onClick={() => handleCheckTask("comment")}>
       
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
        <div className="d-flex flex-column gap-2 align-items-center" >
          <a
            href={`https://x.com/Coinwink/status/${item.tweetId}`}
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
          <button disabled={loading.retweet} className="activate-btn px-3 py-1" onClick={() => handleCheckTask("retweet")}>
           
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
        </div>
      </div>
    </div>
  );
};

export default TwitterItem;
