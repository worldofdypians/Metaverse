import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function AiAgent() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <div className="container-fluid d-flex justify-content-center" style={{marginTop: "100px"}}>
        <div className="custom-container">
        <div className="row">
          <div className="col-12 col-lg-4">

      <Canvas shadows camera={{ position: [0, 0, 1], fov: 30 }} style={{height: "70vh", pointerEvents: "none"}}>
        <Experience />
      </Canvas>
          </div>
        <div className="col-12 col-lg-8">
      <UI />
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default AiAgent;
