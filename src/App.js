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
import scrollToTop from "./assets/scrollToTop.svg";
import ScrollTop from "./components/ScrollTop";
import JoinBeta from "./screens/JoinBeta/JoinBeta";
import JoinBetaModal from "./components/JoinBetaModal/JoinBetaModal";
import PartnerForm from "./screens/PartnerForm/PartnerForm";
import LandFlyout from "./components/LandFlyout/LandFlyout";

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWalletModalDownload, setShowWalletModalDownload] = useState(false);
  const [showWalletModalRegister, setShowWalletModalRegister] = useState(false);
  const [betaModal, setBetaModal] = useState(false);
  const [donwloadSelected, setdownloadSelected] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [coinbase, setCoinbase] = useState();
  const [chainId, setChainId] = useState();
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [showForms2, setShowForms2] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myCAWNFTs, setMyCAWNFTs] = useState([]);

  const [mystakes, setMystakes] = useState([]);
  const [myCAWstakes, setCAWMystakes] = useState([]);
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);
  const [myCAWSNFTsCreated, setMyCAWSNFTsCreated] = useState([]);
  const [myCAWSNFTsTotalStaked, setMyCAWSNFTsTotalStaked] = useState([]);

  const handleRegister = () => {
    setShowWalletModal(true);
  };

  const handleBetaRegister = () => {
    setBetaModal(true);
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
      if (coinbase) {
        const balance = await ethereum.request({
          method: "eth_getBalance",
          params: [coinbase, "latest"],
        });

        // if (balance) {
        if (chainId === 1) {
          const stringBalance =
            window.infuraWeb3.utils.hexToNumberString(balance);
          const amount = window.infuraWeb3.utils.fromWei(
            stringBalance,
            "ether"
          );

          setCurrencyAmount(Number(amount));
        }
        // }
      }
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
    } catch (e) {
      window.alertify.error(String(e) || "Cannot connect wallet!");
      console.log(e);
      return;
    }
    return isConnected;
  };

  const myNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);
    let nfts = myNft.map((nft) => window.getLandNft(nft));
    nfts = await Promise.all(nfts);
    setMyNFTsCreated(nfts);

    nfts.reverse();
    setMyNFTs(nfts);
  };

  const myCAWNft = async () => {
    let myNft = await window.myNftListContract(coinbase);
    let nfts = myNft.map((nft) => window.getNft(nft));
    nfts = await Promise.all(nfts);
    setMyCAWSNFTsCreated(nfts);

    nfts.reverse();
    setMyCAWNFTs(nfts);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
  };

  const getStakesCAWIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractNFT("NFTSTAKING");
    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();
    let stakes = myStakes.map((stake) => window.getLandNft(stake));
    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakes(stakes);
  };

  const myCAWStakes = async () => {
    let myStakes = await getStakesCAWIds();
    let stakes = myStakes.map((stake) => window.getNft(stake));

    stakes = await Promise.all(stakes);
    setMyCAWSNFTsTotalStaked(stakes);
    stakes.reverse();
    setCAWMystakes(stakes);
  };

  const { ethereum } = window;

  if (window.ethereum) {
    ethereum?.on("chainChanged", checkNetworkId);
    ethereum?.on("accountsChanged", handleConnectWallet);
  }

  useEffect(() => {
    checkNetworkId();
    getEthBalance();
  }, [isConnected, coinbase, currencyAmount, chainId]);

  useEffect(() => {
    if (isConnected === true && coinbase && chainId === 1) {
      myCAWStakes();
      myStakes();
      myCAWNft();
      myNft();
    }
  }, [isConnected, coinbase, currencyAmount, chainId]);

  function Redirect() {
    window.location.href = "https://account.worldofdypians.com/";
  }

  return (
    <BrowserRouter>
      <div className="container-fluid p-0 main-wrapper position-relative">
        {!window.location.href.includes('/land') &&
        <LandFlyout />
        }
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
          <Route exact path="/build" element={<PartnerForm />} />
          <Route
            exact
            path="/join-beta"
            element={
              <JoinBeta
                coinbase={coinbase}
                handleRegister={handleBetaRegister}
              />
            }
          />

          <Route exact path="/account" element={<Redirect />} />

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
        {/* <img src={scrollToTop} alt="scroll top" onClick={() => window.scrollTo(0, 0)} className="scroll-to-top" /> */}
        <ScrollTop />
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
      {betaModal === true && (
        <JoinBetaModal
          open={betaModal}
          onClose={() => {
            setBetaModal(false);
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
          cawsMinted = {myCAWSNFTsCreated.length}
          cawsStaked = {myCAWSNFTsTotalStaked.length}
          landMinted = {myNFTs.length}
          landStaked = {mystakes.length}
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
          cawsMinted = {myCAWSNFTsCreated.length}
          cawsStaked = {myCAWSNFTsTotalStaked.length}
          landMinted = {myNFTs.length}
          landStaked = {mystakes.length}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
