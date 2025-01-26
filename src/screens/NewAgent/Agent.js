import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "../AIAgent/components/UI";
import { useState } from "react";

const Agent = () => {
  const [playAudio, setPlayAudio] = useState(false);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);

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
            <div className="col-12 mb-3">
              <button className={`getpremium-btn`} onClick={() => setToggle(!toggle)}>
                {toggle ? "Hide Orion" : "Show Orion"}
              </button>
            </div>
            {toggle && (
              <div className="col-12 col-lg-4">
               <div className="canvas-wrapper">
               <Canvas
                  shadows
                  camera={{ position: [0, 0, 8], fov: 42 }}
                  style={{ height: "70vh", pointerEvents: "none" }}
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
