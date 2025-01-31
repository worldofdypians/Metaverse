import { useEffect, useRef, useState } from "react";
import "../_aiagent.scss";
import axios from "axios";
import Typewriter from "typewriter-effect";

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
  const typewriterRef = useRef();
  const [disable, setDisable] = useState(false);

  const defaultMessages = [
    "What is World of Dypians?",
    "How many projects are building on World of Dypians?",
    "What is the best way to advance the leaderboards?",
  ];

  const formatText = (text) => {
    // Convert newlines to <br />
    text = text.replace(/\n/g, "<br />");

    // Convert Markdown-style links [text](url) first
    text = text.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`
    );

    // Convert plain URLs to clickable links (only if they are NOT already inside an <a> tag)
    text = text.replace(
      /(?<!href=")(https?:\/\/[^\s<]+)/g,
      `<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`
    );

    return text;
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

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages update
  }, [messages, loadingMessage, typewriterRef?.current?.offsetHeight]);

  return (
    <>
      <div
        className="w-100 d-flex flex-column gap-3"
        style={{ minHeight: "70vh" }}
      >
        <div
          className="speech-box d-flex flex-column gap-2 p-3 position-relative"
          ref={speechBoxRef}
        >
          {messages.map((item, index) => (
          <div className="d-flex align-items-start gap-2">
            {item.type === "system-message" &&
            <img src={"https://cdn.worldofdypians.com/wod/orynIcon.png"} width={30} height={30} className="mt-1" alt="" />
            }
              <div
              className={`w-100 d-flex justify-content-${item.position}`}
              key={index}
            >
              <div
                className={`message-item p-2  ${item.type}`}
                ref={typewriterRef}
              >
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
                    onInit={(typewriter) => {
                      setDisable(true);
                      // const duration = item.text.length; // Estimated duration in m
                      const interval = setInterval(() => {
                        scrollToBottom();
                      }, 100); // Run every 100ms (adjust as needed)
                      typewriter
                        .callFunction(() => {
                          clearInterval(interval); // Stop after duration ends
                          scrollToBottom(); // Scroll when done
                          setDisable(false); // Enable input when typing ends
                        })
                        .start();
                    }}
                  />
                ) : (
                  <p className="message-text mb-0">{item.text}</p>
                )}
              </div>
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
            <div className="default-messages-holder  mb-3 p-3 d-flex flex-column flex-lg-row gap-3 gap-lg-4">
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
            style={{ opacity: disable ? "0.7" : "1" }}
            value={textMessage}
            disabled={disable}
            onChange={(e) => {
              setTextMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textMessage !== "") {
                sendMessage(textMessage);
              }
            }}
          />
          <button
            className="agent-button explore-btn d-flex align-items-center justify-content-center"
            style={{ opacity: textMessage === "" || disable ? "0.7" : "1", pointerEvents: textMessage === "" || disable ? "none" : "auto" }}
            onClick={() => {
              sendMessage(textMessage);
            }}
            
            disabled={disable || textMessage === ""}
          >
            Enter
          </button>
        </div>
      </div>
    </>
  );
};
