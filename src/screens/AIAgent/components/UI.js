import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import "../_aiagent.scss";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import Typist from 'react-typist';
import Typewriter from 'typewriter-effect';


export const UI = ({ onPlay, toggle }) => {
  const input = useRef();
  // const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am the World of Dypians AI Agent. How may I assist you today?",
      position: "start",
      type: "system-message",
    },
  ]);

  const [loadingMessage, setLoadingMessage] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [defaultToggle, setDefaultToggle] = useState(true);

  const defaultMessages = [
    "What is World of Dypians?",
    "How many projects are building on World of Dypians?",
    "What is the best way to advance the leaderboards?",
  ];

  const formatText = (text) => {
    return text.replace(/\n/g, "<br />");
  };

  const speechBoxRef = useRef(null);

  const scrollToBottom = () => {
    const scrollable = speechBoxRef.current;
    if (scrollable) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  };

  const sendMessage = async (val) => {
    setDefaultToggle(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: val,
        position: "end",
        type: "user-message",
      },
    ]);
    setTextMessage("");
    setLoadingMessage(true);
    await axios
      .post(`https://api.worldofdypians.com/chat`, {
        userId: "aldialinj0@gmail.com",
        message: val,
      })
      .then((res) => {
        setLoadingMessage(false);
        console.log(res.data, "chat data");
        const systemMessage =
          res.data.messages && res.data.messages.length > 0
            ? res.data.messages[0].text
            : res.data.messages;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: systemMessage,
            position: "start",
            type: "system-message",
          },
        ]);
        if (toggle) {
          onPlay(res.data.messages[0].audio, res.data.messages[0].lipsync);
        }
        scrollToBottom();
      })
      .catch((err) => {
        setLoadingMessage(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Something went wrong, please try again in a few minutes",
            position: "start",
            type: "system-message",
          },
        ]);
        console.log(err);
      });
  };

  const handleClick = (val) => {
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   {
    //     text: val,
    //     position: "end",
    //     type: "user-message",
    //   },
    // ]);
    // setLoadingMessage(true);
    // setTimeout(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       text: "I can help you with that, It will only take a moment please",
    //       position: "start",
    //       type: "system-message",
    //     },
    //   ]);
    //   setLoadingMessage(false);
    //   onPlay()
    // }, 1500);
    // setTextMessage("");
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages update
  }, [messages, loadingMessage]);

  return (
    <>
      {/* <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">AI Agent</h1>
          <p>Test AI Agent</p>
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              const body = document.querySelector("body");
              if (body.classList.contains("greenScreen")) {
                body.classList.remove("greenScreen");
              } else {
                body.classList.add("greenScreen");
              }
            }}
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            disabled={loading || message}
            onClick={sendMessage}
            className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
              loading || message ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div> */}
      <div
        className="w-100 d-flex flex-column gap-3"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="speech-box d-flex flex-column gap-2 p-3 position-relative"
          ref={speechBoxRef}
        >
          {messages.map((item, index) => (
            <div
              className={` w-100 d-flex justify-content-${item.position}`}
              key={index}
            >
              <div className={`message-item p-3  ${item.type}`}>
                {/* <p className="message-text mb-0">{item.text}</p> */}
                {item.type === "system-message" ? (
              <Typewriter
              className="message-text mb-0"
              options={{
                strings: formatText(item.text),
                autoStart: true,
                loop: false,
                delay: 10,
              }}
              // onInit={(typewriter) => {
              //   typewriter
              //     .typeString('<strong>Hello</strong>, <em>World</em>!')
              //     .start();
              // }}
            />
               
                ) : (
                  <p className="message-text mb-0">{item.text}</p>
                )}
              </div>
            </div>
          ))}
          {loadingMessage && (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {defaultToggle && (
            <div className="default-messages-holder  mb-3 p-3 d-flex gap-4">
              {defaultMessages.map((item, index) => (
                <div
                  className="default-message-wrapper"
                  key={index}
                  onClick={() => {
                    sendMessage(item);
                    setDefaultToggle(false);
                  }}
                >
                  <h6 className="default-message mb-0">{item}</h6>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="d-flex align-items-center gap-3 mb-3">
          <input
            type="text"
            className="agent-input"
            placeholder="Ask a question..."
            value={textMessage}
            onChange={(e) => {
              setTextMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick(textMessage);
                sendMessage(textMessage);
              }
            }}
          />
          <button
            className="agent-button explore-btn d-flex align-items-center justify-content-center"
            onClick={() => {
              handleClick(textMessage);
              sendMessage(textMessage);
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </>
  );
};
