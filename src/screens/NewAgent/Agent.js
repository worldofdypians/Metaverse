import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Loader } from "@react-three/drei";
import AgentHero from "./AgentHero/AgentHero";
import soundOn from "./assets/soundOn.svg";
import soundOff from "./assets/soundOff.svg";
import eyeClosed from "./assets/eyeClosed.svg";
import { UI } from "./UI";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import OrynPopup from "./components/OrynPopup";

const Agent = ({ email }) => {
  const [playAudio, setPlayAudio] = useState(false);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [sound, setSound] = useState(false);
  const [tries, setTries] = useState(0);
  const windowSize = useWindowSize();
  const [popup, setPopup] = useState(false);

  const handlePlayMessage = (audio, json) => {
    setPlayAudio(true);
    setCount(count + 1);
    setAudioFile(audio);
    setJsonFile(json);
  };


  const html = document.querySelector("html");

  useEffect(() => {
    if (popup === true) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [popup]);



  const fetchTries = async () => {
    await axios
      .get(`https://api.worldofdypians.com/user-tries/`, {
        params: {
          userId: email,
        },
      })
      .then((res) => {
        setTries(res.data.tries);
      });
  };

  useEffect(() => {
    fetchTries();
  }, [email]);

  console.log(tries, "tries");
  

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
      <div className="container-fluid d-flex bridge-mainhero-wrapper token-wrapper justify-content-center">
        <div className="d-flex flex-column w-100">
          <AgentHero openPopup={() => setPopup(true)} />
          <div
            className="container-fluid d-flex justify-content-center"
            style={{ position: "relative", bottom: "30px" }}
          >
            <div className="custom-container">
              <div className="row">
                {windowSize.width > 786 && (
                  <div className={`col-12 col-lg-4 ${!toggle && "d-none"}`}>
                    <div className="canvas-wrapper position-relative">
                      {toggle && (
                        <div
                          className="hide-oryn-btn d-flex align-items-center gap-2 p-2"
                          onClick={handleToggle}
                        >
                          <img src={eyeClosed} alt="eye-closed" />
                          Hide Oryn
                        </div>
                      )}
                      {sound ? (
                        <img
                          src={soundOn}
                          width={40}
                          height={40}
                          alt=""
                          onClick={() => setSound(!sound)}
                          style={{ cursor: "pointer" }}
                          className="sound-button-position"
                        />
                      ) : (
                        <img
                          src={soundOff}
                          width={40}
                          height={40}
                          alt=""
                          onClick={() => setSound(!sound)}
                          style={{ cursor: "pointer" }}
                          className="sound-button-position"
                        />
                      )}
                      <Canvas
                        shadows
                        camera={{ position: [0, 0, 8], fov: 42 }}
                        style={{ height: "60vh", pointerEvents: "none" }}
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
                  <UI
                    onPlay={handlePlayMessage}
                    toggle={toggle}
                    email={email}
                    sound={sound}
                    setTries={setTries}
                    handleToggle={handleToggle}
                    tries={tries}
                    openPopup={() => setPopup(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup &&
      <OutsideClickHandler onOutsideClick={() => setPopup(false)}>
        <OrynPopup onClose={() => setPopup(false)} />
      </OutsideClickHandler>
      }
    </>
  );
};

export default Agent;
