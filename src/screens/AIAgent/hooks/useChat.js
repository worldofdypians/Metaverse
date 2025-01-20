import { createContext, useContext, useEffect, useState } from "react";


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setLoading(true);
    
    // Mocked response logic
    const mockResponses = [
    //   {
    //     text: "Hello Teki, How are you?",
    //     audio: await audioFileToBase64("")
    //   },
    
  ]
  
    // Simulate a delay (optional, to mimic API behavior)
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Select the response based on the input message
    const resp = mockResponses[message.toLowerCase()] || mockResponses.default;
  
    // Update messages
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
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
