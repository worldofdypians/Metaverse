import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "../AIAgent/components/UI";
import { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Loader } from "@react-three/drei";

const Agent = ({ email }) => {
  const [playAudio, setPlayAudio] = useState(false);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [sound, setSound] = useState(true);
  const [tries, setTries] = useState(0)
  const windowSize = useWindowSize();

  const handlePlayMessage = (audio, json) => {
    setPlayAudio(true);
    setCount(count + 1);
    setAudioFile(audio);
    setJsonFile(json);
  };

  const handleToggle = () => {
    if (toggle && sound) {
      setToggle(!toggle);
      setSound(!sound);
    } else if (toggle && !sound) {
      setToggle(!toggle);
    } else {
      setToggle(!toggle);
      setSound(!sound);
    }
  };


  return (
    <>
      <Loader />
      <div className="container-fluid d-flex justify-content-center">
        <div className="custom-container" style={{ marginTop: "100px" }}>
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start">
                <h4 className="main-hero-title font-montserrat text-center text-lg-start">
                  AI Agent Oryn
                </h4>
                <span className="market-banner-desc font-montserrat">
                  Oryn is an AI Agent in World of Dypians, offering strategic
                  insights, mission support, and deep lore from the tech-magic
                  world.
                </span>
              </div>
            </div>
            {windowSize.width > 786 && (
              <div className="col-12 col-lg-6 d-flex align-items-end justify-content-end mb-3">
                {/* <button
                  className={`${!toggle ? "action-btn" : "red-btn"}`}
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? "Hide Oryn" : "Show Oryn"}
                </button> */}
                <div className="d-flex align-items-center gap-2">
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={toggle}
                      onChange={handleToggle}
                    />
                    <span class="slider round"></span>
                  </label>
                  <h6
                    className="oryn-toggle mb-0 text-white"
                    style={{ width: "90px" }}
                  >
                    {toggle ? "Hide Oryn" : "Show Oryn"}
                  </h6>
                </div>
              </div>
            )}
            {windowSize.width > 786 && (
              <div className={`col-12 col-lg-4 ${!toggle && "d-none"}`}>
                <div className="canvas-wrapper position-relative">
                  <button
                    className={`${
                      sound ? "action-btn" : "red-btn"
                    } sound-button-position`}
                    onClick={() => setSound(!sound)}
                  >
                    {sound ? (
                      <img
                        src={"https://cdn.worldofdypians.com/wod/soundOn.svg"}
                        width={24}
                        height={24}
                        alt=""
                      />
                    ) : (
                      <img
                        src={"https://cdn.worldofdypians.com/wod/soundOff.svg"}
                        width={24}
                        height={24}
                        alt=""
                      />
                    )}
                  </button>
                  <Canvas
                    shadows
                    camera={{ position: [0, 0, 8], fov: 42 }}
                    style={{ height: "70.5vh", pointerEvents: "none" }}
                  >
                    <Experience
                      playAudio={playAudio}
                      setPlayAudio={setPlayAudio}
                      count={count}
                      audioFile={audioFile}
                      jsonFile={jsonFile}
                      sound={sound}
                    />
                  </Canvas>
                </div>
              </div>
            )}
            <div className={`col-12 ${toggle ? "col-lg-8" : "col-lg-12"}`}>
              <UI onPlay={handlePlayMessage} toggle={toggle} email={email} sound={sound} setTries={setTries} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agent;
