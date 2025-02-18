import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Loader, useProgress } from "@react-three/drei";
import AgentHero from "./AgentHero/AgentHero";
import soundOn from "./assets/soundOn.svg";
import soundOff from "./assets/soundOff.svg";
import eyeClosed from "./assets/eyeClosed.svg";
import { UI } from "./UI";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import OrynPopup from "./components/OrynPopup";

const Agent = ({ email, coinbase, handleConnectWallet, isConnected }) => {
  const [playAudio, setPlayAudio] = useState(false);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [sound, setSound] = useState(false);
  const [tries, setTries] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popup, setPopup] = useState(false);
  const windowSize = useWindowSize();
  const { progress, active } = useProgress();

  useEffect(() => {
    if (progress === 100 && !active) {
      setTimeout(() => setIsLoaded(true), 500); // Short delay to ensure stability
    }
  }, [progress, active]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (popup) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [popup]);

  const fetchTries = async () => {
    try {
      const res = await axios.get("https://api.worldofdypians.com/user-tries/", {
        params: { userId: coinbase },
      });
      setTries(res.data.tries);
    } catch (error) {
      console.error("Error fetching tries:", error);
    }
  };

  useEffect(() => {
    fetchTries();
  }, [email]);

  return (
    <>
      <div className="container-fluid d-flex bridge-mainhero-wrapper token-wrapper justify-content-center">
        <div className="d-flex flex-column w-100">
          <AgentHero openPopup={() => setPopup(true)} />
          <div className="container-fluid d-flex justify-content-center" style={{ position: "relative", bottom: "30px" }}>
            <div className="custom-container">
              <div className="row">
                {windowSize.width > 786 && (
                  <div className={`col-12 col-lg-4 ${!toggle && "d-none"}`}>
                    <div className="canvas-wrapper position-relative" style={{border: !isLoaded && "0.5px solid #080b2a"}}>
                      {toggle && (
                        <div className="hide-oryn-btn d-flex align-items-center gap-2 p-2" onClick={() => setToggle(!toggle)}>
                          <img src={eyeClosed} alt="eye-closed" /> Hide Oryn
                        </div>
                      )}
                      {sound ? (
                        <img src={soundOn} width={40} height={40} alt="" onClick={() => setSound(!sound)} style={{ cursor: "pointer" }} className="sound-button-position" />
                      ) : (
                        <img src={soundOff} width={40} height={40} alt="" onClick={() => setSound(!sound)} style={{ cursor: "pointer" }} className="sound-button-position" />
                      )}
                      {!isLoaded ? (
                        <div className="custom-loader d-flex flex-column align-items-center justify-content-center gap-3">
                          <span>{Math.round(progress)}%</span>
                          <div className="loader-bar"></div>
                        </div>
                      ) : (
                        <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }} style={{ height: "60vh", pointerEvents: "none" }}>
                          <Experience playAudio={playAudio} setPlayAudio={setPlayAudio} count={count} audioFile={audioFile} jsonFile={jsonFile} sound={sound} />
                        </Canvas>
                      )}
                    </div>
                  </div>
                )}
                <div className={`col-12 ${toggle ? "col-lg-8" : "col-lg-12"}`}>
                  <UI
                    onPlay={(audio, json) => {
                      setPlayAudio(true);
                      setCount(count + 1);
                      setAudioFile(audio);
                      setJsonFile(json);
                    }}
                    toggle={toggle}
                    email={email}
                    sound={sound}
                    setTries={setTries}
                    handleToggle={() => setToggle(!toggle)}
                    tries={tries}
                    coinbase={coinbase}
                    handleConnectWallet={handleConnectWallet}
                    openPopup={() => setPopup(true)}
                    setPlayAudio={setPlayAudio}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup && (
        <OutsideClickHandler onOutsideClick={() => setPopup(false)}>
          <OrynPopup onClose={() => setPopup(false)} isConnected={isConnected} />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default Agent;
