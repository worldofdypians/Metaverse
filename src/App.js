import Home from "./screens/Home/Home";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./fonts/Organetto.ttf";
import Web3 from "web3";
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
import LandPopup from "./components/LandPopup/LandPopup";
import Roadmap from "./screens/Roadmap/Roadmap";

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletModalDownload, setShowWalletModalDownload] = useState(false);
  const [showWalletModalRegister, setShowWalletModalRegister] = useState(false);
  const [donwloadSelected, setdownloadSelected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [coinbase, setCoinbase] = useState();
  const [chainId, setChainId] = useState();
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [showForms2, setShowForms2] = useState(false);

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

  const checkNetworkId = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((data) => {
          setChainId(parseInt(data));
        })
        .catch(console.error);
    } else {
      setChainId(1);
    }
  };

  const getEthBalance = async () => {
    const ethereum = window.ethereum;
    if (isConnected === true) {
      if(coinbase)
     { const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [coinbase, "latest"],
      });
      
      if (balance) {
        if (chainId === 1) {
          const stringBalance = window.infuraWeb3.utils.hexToNumberString(balance);
          const amount = window.infuraWeb3.utils.fromWei(stringBalance, "ether");
          setCurrencyAmount(amount.slice(0, 7));
        }
      }}
    }
  };

  const handleConnectWallet = async () => {
    try {
      await window.connectWallet().then((data) => {
        setIsConnected(data);
      });

      await window.getCoinbase().then((data) => {
        setCoinbase(data);
      });
      setShowForms2(true);
      checkNetworkId();
    } catch (e) {
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }
    return isConnected;
  };

  const { ethereum } = window;

  if (window.ethereum) {
    ethereum?.on("chainChanged", checkNetworkId);
    ethereum?.on("accountsChanged", handleConnectWallet);
  }

  useEffect(() => {
      getEthBalance();
    },[isConnected, coinbase,currencyAmount]
  );


  return (
    <BrowserRouter>
      <div className="container-fluid p-0 main-wrapper position-relative">
        <LandPopup />
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
          <Route exact path="/roadmap" element={<Roadmap />} />
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
                chainId={chainId}
                showForms={showForms2}
                balance={currencyAmount}
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
