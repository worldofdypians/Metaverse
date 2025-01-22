import { createContext, useContext, useEffect, useState } from "react";
import introJson from '../assets/audio/intro_0.json'
import introAudio from '../assets/audio/intro_0.wav'


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {




   const audioFileToBase64 = async (filePath) => {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const base64String = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return base64String;
  };


   const readJsonTranscript = async (filePath) => {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load JSON file at ${filePath}`);
    }
    const json = await response.json();
    return json;
  };

  const mockResponses = [
    {
      text: "Hello Teki, How are you?",
      audio: audioFileToBase64(introAudio),
      lipsync: readJsonTranscript(introJson),
      facialExpression: "sad",
      animation: "Crying",
    },
  
]

  const chat = async (message) => {
    setLoading(true);
    
    // Mocked response logic
  
    // Simulate a delay (optional, to mimic API behavior)
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Select the response based on the input message
    const resp = mockResponses;
  
    // Update messages
    setMessages(mockResponses);
    setLoading(false);
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages(mockResponses);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
