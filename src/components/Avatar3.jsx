import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export function Model3({
  position,
  scale,
  playAudio,
  count,
  audioFile,
  jsonDoc,
  sound,
}) {
  const { scene } = useGLTF("/models/avatarWEB3.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Load animations and set their names
  const { animations: hi1 } = useFBX("/newAnimations/hi1.fbx");
  const { animations: angry } = useFBX("/newAnimations/angry.fbx");
  const { animations: angry2 } = useFBX("/newAnimations/angry2.fbx");
  const { animations: idle2 } = useFBX("/newAnimations/idle2.fbx");
  const { animations: idle3 } = useFBX("/newAnimations/idle3.fbx");
  const { animations: look } = useFBX("/newAnimations/look.fbx");
  const { animations: looking2 } = useFBX("/newAnimations/looking2.fbx");
  const { animations: talk } = useFBX("/newAnimations/talk.fbx");
  const { animations: walksayHi } = useFBX("/newAnimations/walksayHi.fbx");
  const { animations: salute } = useFBX("/newAnimations/salute.fbx");

  hi1[0].name = "hi1";
  angry[0].name = "angry";
  angry2[0].name = "angry2";
  idle2[0].name = "idle2";
  idle3[0].name = "idle3";
  look[0].name = "look";
  looking2[0].name = "looking2";
  talk[0].name = "talk";
  walksayHi[0].name = "walksayHi";
  salute[0].name = "salute";

  const [animation, setAnimation] = useState("idle3");
  const group = useRef();

  const audio = useMemo(
    () => new Audio("data:audio/mp3;base64," + audioFile),
    [count]
  );

  // Modify materials for shine effect
  materials.glowBlue.emissive = new THREE.Color(0xffd700);
  materials.glowBlue.emissiveIntensity = 0;

  materials.Ga_Skin_Body1.emissive = new THREE.Color(0xffd700);
  materials.Ga_Skin_Body1.emissiveIntensity = 0;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const intensity = Math.sin(time * 7) * 0.5 + 0.5; // Pulsating effect

    if (audio.paused || audio.ended) {
      setAnimation("idle3");
      materials.glowBlue.emissiveIntensity = 0;
      // materials.Ga_Skin_Body1.emissiveIntensity = 0;
    } else {
      materials.glowBlue.emissiveIntensity = intensity;
      // materials.Ga_Skin_Body1.emissiveIntensity = intensity;
    }
  });

  useEffect(() => {
    if (playAudio && sound) {
      audio.play();
      setAnimation("talk");
    } else {
      setAnimation("idle3");
      audio.pause();
    }
  }, [playAudio, sound, count]);

  const { actions } = useAnimations(
    [
      hi1[0],
      angry[0],
      angry2[0],
      idle2[0],
      idle3[0],
      look[0],
      looking2[0],
      talk[0],
      walksayHi[0],
      salute[0],
    ],
    group
  );

  useEffect(() => {
    if (actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
    } else {
      console.warn(`Animation "${animation}" not found in actions.`);
    }

    return () => {
      if (actions[animation]) {
        actions[animation].fadeOut(0.5);
      }
    };
  }, [animation]);

  return (
    <group
      position={position}
      scale={scale}
      dispose={null}
      ref={group}
      rotation={[-1.5, 0, 0]}
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.eyeleft.geometry}
        material={materials.Std_Cornea_L1}
        skeleton={nodes.eyeleft.skeleton}
      />
      <skinnedMesh
        geometry={nodes.eyeright.geometry}
        material={materials.Std_Cornea_L1}
        skeleton={nodes.eyeright.skeleton}
      />
      <skinnedMesh
        geometry={nodes.gloveL.geometry}
        material={materials.spymask1}
        skeleton={nodes.gloveL.skeleton}
      />
      <skinnedMesh
        geometry={nodes.gloveR.geometry}
        material={materials.spymask1}
        skeleton={nodes.gloveR.skeleton}
      />
      <skinnedMesh
        geometry={nodes.glowBlue1.geometry}
        material={materials.glowBlue}
        skeleton={nodes.glowBlue1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Jacket.geometry}
        material={materials.futureClothes}
        skeleton={nodes.Jacket.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mask1.geometry}
        material={materials.phongE1}
        skeleton={nodes.mask1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Pants.geometry}
        material={materials.futureClothes}
        skeleton={nodes.Pants.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Shirt.geometry}
        material={materials.futureClothes}
        skeleton={nodes.Shirt.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Shoe_Left.geometry}
        material={materials.futureClothes}
        skeleton={nodes.Shoe_Left.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Shoe_Right.geometry}
        material={materials.futureClothes}
        skeleton={nodes.Shoe_Right.skeleton}
      />
      <skinnedMesh
        geometry={nodes.shoulderL.geometry}
        material={materials.spymask1}
        skeleton={nodes.shoulderL.skeleton}
      />
      <skinnedMesh
        geometry={nodes.shoulderR.geometry}
        material={materials.spymask1}
        skeleton={nodes.shoulderR.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Mesh008.geometry}
        material={materials.black}
        skeleton={nodes.Mesh008.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Mesh008_1.geometry}
        material={materials.blueglow}
        skeleton={nodes.Mesh008_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Mesh.geometry}
        material={materials.Ga_Skin_Head}
        skeleton={nodes.Mesh.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Mesh_1.geometry}
        material={materials.Ga_Skin_Body1}
        skeleton={nodes.Mesh_1.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/models/avatarWEB3.glb");
