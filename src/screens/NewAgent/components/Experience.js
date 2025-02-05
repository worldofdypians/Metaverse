import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import { useState } from "react";
import { Model } from "../../../components/Avatar";
import { TestModel } from "../../../components/Avatar2";

export const Experience = ({
  playAudio,
  setPlayAudio,
  count,
  audioFile,
  sound,
  jsonFile,
}) => {
  const texture = useTexture("textures/youtubeBackground.jpg");
  const viewport = useThree((state) => state.viewport);
  return (
    <>
      {/* <OrbitControls /> */}
      {/* <Avatar position={[0, -2.7, 5]} scale={2} count={count} playAudio={playAudio} setPlayAudio={setPlayAudio} audioFile={audioFile} jsonDoc={jsonFile} /> */}
      <TestModel
        position={[0, -2.5, 4.5]}
        scale={2}
        count={count}
        playAudio={playAudio}
        setPlayAudio={setPlayAudio}
        audioFile={audioFile}
        jsonDoc={jsonFile}
        sound={sound}
      />
      <Environment preset="sunset" />
      {/* <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh> */}
    </>
  );
};
