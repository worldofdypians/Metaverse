import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './_aiagent.scss'
import model from './model.glb'

// Viseme mapping example
const visemeMap = {
    "AH": 0.8,
    "O": 0.5,
    "E": 0.7,
    // Add more visemes and intensities
  };


  function Avatar({ viseme }) {
    const { scene } = useGLTF(model);
    const mouthBlendShape = scene.children[0].morphTargetDictionary['MouthShape'];
  
    useEffect(() => {
      if (mouthBlendShape) {
        mouthBlendShape.weight = visemeMap[viseme] || 0; // Set weight based on viseme
      }
    }, [viseme]);
  
    return <primitive object={scene} scale={1.5} />;
  }


const AIAgent = () => {

    const [viseme, setViseme] = useState('');

    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onboundary = (event) => {
        const char = text[event.charIndex];
        const detectedViseme = detectViseme(char); // Map char to a viseme
        setViseme(detectedViseme);
      };
      window.speechSynthesis.speak(utterance);
    };
  
    const detectViseme = (char) => {
      // Map characters to visemes (simplified example)
      if ('aeiou'.includes(char)) return 'AH';
      if ('o'.includes(char)) return 'O';
      if ('e'.includes(char)) return 'E';
      return '';
    };
  

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <Avatar viseme={viseme} />
        <OrbitControls />
      </Canvas>
      <button onClick={() => speak("Hello, I am your assistant!")}>Speak</button>
    </div>
  )
}

export default AIAgent