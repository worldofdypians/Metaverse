import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "../AIAgent/components/UI";
import { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";

const Agent = () => {
  const [playAudio, setPlayAudio] = useState(false);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);

  const windowSize = useWindowSize();

  const handlePlayMessage = (audio, json) => {
    setPlayAudio(true);
    setCount(count + 1);
    setAudioFile(audio);
    setJsonFile(json);
  };

  return (
    <>
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
                <button
                  className={`${!toggle ? "action-btn" : "red-btn"}`}
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? "Hide Oryn" : "Show Oryn"}
                </button>
              </div>
            )}
            {toggle && windowSize.width > 786 && (
              <div className="col-12 col-lg-4">
                <div className="canvas-wrapper">
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
                    />
                  </Canvas>
                </div>
              </div>
            )}
            <div className={`col-12 ${toggle ? "col-lg-8" : "col-lg-12"}`}>
              <UI onPlay={handlePlayMessage} toggle={toggle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agent;
