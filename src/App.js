import Home from "./screens/Home/Home";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./fonts/Organetto.ttf";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Caws from "./screens/Caws/Caws";
import NftMinting from "./screens/Caws/NftMinting/NftMinting";
import News from "./screens/News/News";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import CheckWhitelistModal from "./components/CheckWhitelistModal/CheckWhitelistModal";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./screens/TermsConditions/TermsConditions";
import Explorer from "./screens/Explorer/Explorer";
import Land from "./screens/Land/Land";

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletModalDownload, setShowWalletModalDownload] = useState(false);
  const [showWalletModalRegister, setShowWalletModalRegister] = useState(false);
  const [donwloadSelected, setdownloadSelected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [coinbase, setCoinbase] = useState();
  const [showForms, setShowForms] = useState(false);

  const handleRegister = () => {
    setShowWalletModal(true);
  };

  const handleDownload = () => {
    setdownloadSelected(true);
    setShowWalletModalDownload(true);
  };

  const handleSignUp = () => {
    setShowWalletModalRegister(true);
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
      setShowForms(true);
    } catch (e) {
      setShowWalletModal(false);
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }

    return isConnected;
  };

  const handleConnectWallet = async () => {
    try {
      await window.connectWallet().then((data) => {
        setIsConnected(data);
      });
      await window.getCoinbase().then((data) => {
        setCoinbase(data);
      });
    } catch (e) {
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }
    return isConnected;
  };

  return (
    <BrowserRouter>
      <div className="container-fluid p-0 main-wrapper position-relative">
        <Header handleSignUp={handleSignUp} />
        <MobileNavbar handleSignUp={handleSignUp} />
        <Routes>
          <Route exact path="/news" element={<News />} />
          <Route
            exact
            path="/"
            element={
              <Home
                handleRegister={handleRegister}
                handleDownload={handleDownload}
              />
            }
          />
          <Route exact path="/caws" element={<Caws />} />
          <Route exact path="/explorer" element={<Explorer />} />
          <Route exact path="/stake" element={<NftMinting />} />

          <Route
            exact
            path="/land"
            element={
              <Land
                handleConnectWallet={handleConnectWallet}
                coinbase={coinbase}
                isConnected={isConnected}
                handleRegister={handleRegister}
              />
            }
          />
          <Route exact path="/terms-conditions" element={<TermsConditions />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
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

      {showWalletModalDownload === true && (
        <CheckWhitelistModal
          open={showWalletModalDownload}
          onClose={() => {
            setdownloadSelected(false);
            setShowWalletModalDownload(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
        />
      )}

      {showWalletModalRegister === true && (
        <CheckWhitelistModal
          open={showWalletModalRegister}
          onClose={() => {
            setShowWalletModalRegister(false);
          }}
          handleConnect={handleConnection}
          coinbase={coinbase}
          showForms={showForms}
          openRegister={handleRegister}
          donwloadSelected={donwloadSelected}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
