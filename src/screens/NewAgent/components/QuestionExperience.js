import {
  Environment,
  Loader,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Model3 } from "../../../components/Avatar3";

export const QuestionExperience = ({
  playAudio,
  setPlayAudio,
  count,
  audioFile,
  sound,
  jsonFile,
}) => {
  return (
    <>
      <Model3
        position={[0, -3.15, 8.9]}
        scale={2}
        count={count}
        playAudio={playAudio}
        setPlayAudio={setPlayAudio}
        audioFile={audioFile}
        jsonDoc={jsonFile}
        sound={sound}
      />
      <Environment preset="sunset" />
    </>
  );
};
