import { useEffect, useRef, useState } from "react";
import "./_aiagent.scss";
import axios from "axios";
import Typewriter from "typewriter-effect";
import sendMessageIcon from "./assets/sendMessageIcon.svg";
import vectorD from "./assets/vectorD.svg";
import eyeOpen from "./assets/eyeOpen.svg";

export const UI = ({
  onPlay,
  toggle,
  email,
  sound,
  setTries,
  handleToggle,
  tries,
  openPopup,
  coinbase,
  handleConnectWallet,
  setPlayAudio,
  premiumOryn,
}) => {
  const [messages, setMessages] = useState([
    // {
    //   text: "Hello, I am the World of Dypians AI Agent. How may I assist you today?",
    //   position: "start",
    //   type: "system-message",
    // },
  ]);

  const [loadingMessage, setLoadingMessage] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [defaultToggle, setDefaultToggle] = useState(true);
  const typewriterRef = useRef();
  const [disable, setDisable] = useState(false);
  const [count, setCount] = useState(0);
  const defaultMessages = [
    "How can I create an account?",
    "Which event is available today?",
    "How can I maximize rewards in World or Dypians?",
  ];

  const formatText = (text) => {
    // Convert newlines to <br />
    text = text.replace(/\n/g, "<br />");

    // Convert Markdown-style bold (**text**) to <b>text</b>
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Convert Markdown-style links [text](url)
    text = text.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`
    );

    // Convert plain URLs to clickable links (removing trailing dots)
    text = text.replace(/(?<!href=")(https?:\/\/[^\s<]+)\.?/g, (match, url) => {
      const cleanUrl = url.replace(/\.+$/, "");
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`;
    });

    return text;
  };

  const speechBoxRef = useRef(null);

  const scrollToBottom = () => {
    const scrollable = speechBoxRef.current;
    if (scrollable) {
      scrollable.scrollTop = scrollable.scrollHeight;
    }
  };


  const replaceTodayWithDay = (text) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[new Date().getDay()];
    
    return text.replace(/\btoday\b/gi, currentDay);
  };

  const sendMessage = async (val) => {

    const updatedVal = replaceTodayWithDay(val)

    setCount(count + 1);
    if (count > 0) {
      stopTypewriter();
    }
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
        userId: coinbase,
        message: updatedVal,
        voice: sound ? "on" : null,
      })
      .then((res) => {
        setLoadingMessage(false);
        setTries(res.data.tries);
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

  const [typewriterInstance, setTypewriterInstance] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const stopTypewriter = () => {
    setPlayAudio(false);
    typewriterInstance.stop();
    typewriterInstance.pause();
    setIsTyping(false);

    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null; // Reset ref
    }

    if (tries >= 10 && !premiumOryn) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollIntervalRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the speed factor if needed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages update
  }, [messages, loadingMessage, typewriterRef?.current?.offsetHeight]);

  useEffect(() => {
    if ((tries >= 10 && !premiumOryn) || !coinbase) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [tries, coinbase]);

  return (
    <>
      <div
        className="w-100 d-flex flex-column gap-3"
        style={{ minHeight: "60vh" }}
      >
        <div className="speech-box d-flex flex-column justify-content-between p-3 position-relative">
          {!toggle && (
            <div
              className="show-oryn-btn d-flex align-items-center gap-2 p-2"
              onClick={handleToggle}
            >
              <img src={eyeOpen} alt="eye-closed" />
              Show Oryn
            </div>
          )}

          {defaultToggle && (
            <div className="help-stamp p-3 d-flex flex-column gap-2 gap-lg-4 align-items-center">
              <img src={vectorD} alt="dypians" />
              <h6 className="mb-0 help-stamp-text">What can I help with?</h6>
            </div>
          )}
          <div
            className="speech-box-inner d-flex flex-column gap-2 p-3 position-relative"
            ref={speechBoxRef}
          >
            {messages.map((item, index) => (
              <div className="d-flex align-items-start gap-2">
                {item.type === "system-message" && (
                  <div className="oryn-icon-holder d-flex align-items-center justify-content-center">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/orynIcon.png"}
                      width={24}
                      height={24}
                      className="mt-1"
                      alt=""
                    />
                  </div>
                )}
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
                      <div className="d-flex align-items-start gap-2">
                        <Typewriter
                          className="message-text mb-0"
                          options={{
                            strings: formatText(item.text),
                            autoStart: true,
                            loop: false,
                            delay: 10,
                          }}
                          onInit={(typewriter) => {
                            setTypewriterInstance(typewriter);
                            setIsTyping(true);

                            // Clear any existing interval before setting a new one
                            if (scrollIntervalRef.current) {
                              clearInterval(scrollIntervalRef.current);
                            }

                            scrollIntervalRef.current = setInterval(() => {
                              scrollToBottom();
                            }, 100);

                            typewriter
                              .callFunction(() => {
                                setIsTyping(false);
                                clearInterval(scrollIntervalRef.current);
                                scrollIntervalRef.current = null; // Reset ref
                                scrollToBottom();
                              })
                              .start();
                          }}
                        />
                      </div>
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
          </div>
          {defaultToggle && tries < 10 && coinbase && (
            <div
              className="default-messages-holder  mb-3 d-flex  gap-3 gap-lg-4"
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              onMouseUp={handleMouseUp}
            >
              {defaultMessages.map((item, index) => (
                <div
                  className="default-message-wrapper p-2"
                  key={index}
                  onClick={() => {
                    sendMessage(item);
                    setDefaultToggle(false);
                  }}
                >
                  <h6
                    className="default-message mb-0"
                    style={{ color: index === 2 && "#f3bf09" }}
                  >
                    {item}
                  </h6>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex w-100 flex-column gap-2">
            {tries >= 10 && !premiumOryn && coinbase && (
              <div className="premium-oryn-wrapper d-flex flex-column flex-lg-row gap-2 gap-lg-0 align-items-center justify-content-between p-3">
                <div className="d-flex flex-column gap-2">
                  <span className="premium-oryn-title">
                    You have reached the free plan limit for Oryn
                  </span>
                  <span className="premium-oryn-desc">
                    Upgrade to premium model or wait until the limit is reset
                    after 00:00 UTC
                  </span>
                </div>
                <button className="explore-btn px-3 py-2" onClick={openPopup}>
                  Get Premium
                </button>
              </div>
            )}
            {!coinbase && (
              <div className="connect-oryn-wrapper d-flex  gap-2 gap-lg-0 align-items-center justify-content-between p-3">
                <div className="d-flex flex-column gap-2 w-100">
                  {/* <span className="premium-oryn-title">Connect Wallet</span> */}
                  <span
                    className="premium-oryn-title"
                    style={{ color: "#FFFFFF" }}
                  >
                    Connect wallet to interact with Oryn
                  </span>
                </div>
                <button
                  className="getpremium-btn px-3 py-2"
                  onClick={handleConnectWallet}
                >
                  Connect 
                </button>
              </div>
            )}

            <div className="d-flex align-items-center gap-3  oryn-input-holder position-relative">
              <input
                type="text"
                className={`agent-input ${disable && "disabled-agent-input"}`}
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
              {isTyping ? (
                <div className="stop-message" onClick={stopTypewriter}>
                  <div className="stop-message-square"></div>
                </div>
              ) : (
                <img
                  src={sendMessageIcon}
                  alt="sendMessage"
                  className="send-message-icon"
                  style={{
                    opacity: textMessage === "" || disable ? "0.7" : "1",
                    pointerEvents:
                      textMessage === "" || disable ? "none" : "auto",
                  }}
                  onClick={() => {
                    sendMessage(textMessage);
                  }}
                  disabled={disable || textMessage === ""}
                />
              )}
              {/* <button
            className="agent-button explore-btn d-flex align-items-center justify-content-center"
            style={{
              opacity: textMessage === "" || disable ? "0.7" : "1",
              pointerEvents: textMessage === "" || disable ? "none" : "auto",
            }}
            onClick={() => {
              sendMessage(textMessage);
            }}
            disabled={disable || textMessage === ""}
          >
            Enter
          </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
