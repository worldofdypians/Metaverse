import Home from "./screens/Home/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './app.scss'
import "./fonts/Organetto.ttf";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Caws from "./screens/Caws/Caws";
import NftMinting from "./screens/Caws/NftMinting/NftMinting";
import News from "./screens/News/News";
import RegisterModal from "./components/RegisterModal/RegisterModal";

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [coinbase, setCoinbase] = useState();
  const [showForms, setShowForms] = useState(false);


  const handleRegister = () => {
    setShowWalletModal(true);
  };



  const handleConnection = async () => {
    try {
      localStorage.setItem("logout", "false");
      await window.connectWallet().then((data) => {
        setIsConnected(data);
      });
      await window.getCoinbase().then((data) => {
        setCoinbase(data);
      });
      setShowForms(true)
    } catch (e) {
      setShowWalletModal(false);
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }

    return isConnected;
  };

  return (
    <BrowserRouter>

      <div className="container-fluid p-0 main-wrapper position-relative">
        <Header handleRegister={handleRegister} />
        <MobileNavbar />
        <Routes>
        <Route exact path="/news" element={<News />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/caws" element={<Caws />} />
          <Route exact path="/stake" element={<NftMinting />} />
        </Routes>
        <Footer />
      </div>
      {showWalletModal === true && (
        <RegisterModal
          open={showWalletModal}
          onClose={() => {
            setShowWalletModal(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
