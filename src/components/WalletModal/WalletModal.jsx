import React from "react";
import Modal from "../General/Modal";
import OutsideClickHandler from "react-outside-click-handler";
import { useConnect, useChainId } from "wagmi";
import { getAccount } from "@wagmi/core";
import { wagmiClient } from "../../wagmiConnectors";
import "../../screens/Account/src/App.css";
import { useWallet } from "../../redux/hooks/useWallet";
import { connect } from "@wagmi/core";
const WALLET_OPTIONS = [
  // Top Wallets
  {
    name: "MetaMask",
    icon: "https://cdn.worldofdypians.com/wod/metamaskConnect.svg",
    type: "top",
    walletType: "metamask",
  },
  {
    name: "Binance Wallet",
    icon: "https://cdn.worldofdypians.com/wod/binanceWalletUpdated.svg",
    type: "top",
    connectorName: "Binance Wallet",
    chainId: 56, // BSC chainId
    walletType: "binance",
  },
  {
    name: "OKX Wallet",
    icon: "https://cdn.worldofdypians.com/wod/okxConnect.svg",
    type: "top",
    walletType: "okx",
  },
  {
    name: "Trust Wallet",
    icon: "https://cdn.worldofdypians.com/wod/trustWalletLogo.svg",
    type: "top",
    walletType: "trust",
  },
  // More Wallets
  {
    name: "MatchID",
    icon: "https://cdn.worldofdypians.com/wod/matchID-wallet.png",
    type: "more",
    customHandler: "handleConnectionMatchId",
    walletType: "matchId",
  },
  {
    name: "Immutable Passport",
    icon: "https://cdn.worldofdypians.com/wod/immutableConnect.svg",
    type: "more",
    customHandler: "handleConnectionPassport",
    walletType: "passport",
  },
  {
    name: "Gate wallet",
    icon: "https://cdn.worldofdypians.com/wod/gateBuyWod.svg",
    type: "more",
    walletType: "gate",
  },
  {
    name: "Coinbase",
    icon: "https://cdn.worldofdypians.com/wod/coinbaseConnect.svg",
    type: "more",
    walletType: "coinbase",
  },
  {
    name: "Coin98",
    icon: "https://cdn.worldofdypians.com/wod/coin98Connect.svg",
    type: "more",
    walletType: "coin98",
  },
  {
    name: "SafePal",
    icon: "https://cdn.worldofdypians.com/wod/safepalConnect.svg",
    type: "more",
    walletType: "safepal",
  },
];

const WalletModal = ({
  handleClose,
  show,
  handleConnectionPassport,
  handleConnectionMatchId,
}) => {
  const { isLoading, pendingConnector, error } = useConnect();
  // const chainId = useChainId();
  const connectors = wagmiClient.connectors;
  const { setWalletType, setWalletModal } = useWallet();

  // Helper to connect by display name or connector name
  const connectWallet = async (option) => {
    if (option.customHandler) {
      if (option.customHandler === "handleConnectionPassport")
        return handleConnectionPassport();
      if (option.customHandler === "handleConnectionMatchId")
        return handleConnectionMatchId("evm");
      return;
    }
    // For Binance Wallet, use WalletConnect with BSC chain
    // if (option.connectorName === "Binance Wallet") {
    //   const connector = connectors.find((c) => c.name === "Binance Wallet");
    //   if (connector) connect({ connector, chainId: option.chainId });
    //   return;
    // }
    // Default: match by name
    const connector = connectors.find((c) =>
      c.name.toLowerCase().includes(option.name.toLowerCase())
    );
    console.log("connector", connector);
    if (connector) {
      connect(wagmiClient, { connector: connector }).then(() => {
        window.WALLET_TYPE = option.walletType;
        setWalletType(option.walletType);

        if (option.connectorName === "Binance Wallet") {
          setTimeout(() => {
            console.log(getAccount(wagmiClient))
            getAccount(wagmiClient);
          }, 2000);
        }
      });
    } else window.alertify.error(option.name + " not found! Please add the browser extension or use mobile app wallet.");
  };

  return (
    <Modal visible={show} onModalClose={handleClose} maxWidth={565}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div className="walletmodal-wrapper px-3 py-4" id={"connect"}>
          <div className="sc-jwKygS bFQpTL">
            <h3 style={{ fontSize: 20 }} className="text-white mx-2 mx-lg-3">
              Connect to a wallet
            </h3>
          </div>
          <div className="wallet-items-wrapper">
            <div className="row mx-2 mx-lg-3 align-items-center gap-3">
              <span className="my-profile-email mt-3">Top Wallets</span>
              <div className="top-wallets-wrapper px-0">
                {WALLET_OPTIONS.filter((w) => w.type === "top").map(
                  (option) => (
                    <button
                      key={option.name}
                      className="walletbutton"
                      onClick={() => connectWallet(option)}
                      disabled={
                        isLoading && pendingConnector?.name === option.name
                      }
                    >
                      <div className="justify-content-between d-flex flex-column-reverse w-100 align-items-center">
                        <span className="text-white wallet-item-name">
                          {option.name}
                        </span>
                        <img
                          src={option.icon}
                          className="wallet-item-icon"
                          alt="Icon"
                        />
                      </div>
                    </button>
                  )
                )}
              </div>
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-2 bordertw border-cyan-400/30">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src="https://cdn.worldofdypians.com/wod/yellowthunder.svg"
                    alt=""
                    className="w-5 h-5 text-yellow-400"
                  />
                  <span className="text-white">New Feature</span>
                </div>
                <p className="text-gray-300 text-sm mb-0">
                  World of Dypians now supports <b>Binance Pay</b> for bundle
                  and prime purchases.
                </p>
                <p className="text-gray-300 text-sm mb-0">
                  To use it, <b>import</b> your game wallet into the Binance
                  Wallet app
                  <b> or connect </b>your Binance Wallet and sync it with your
                  game account.
                </p>
              </div>
              <span className="my-profile-email mt-4">More Wallets</span>
              <div className="top-wallets-wrapper px-0">
                {WALLET_OPTIONS.filter((w) => w.type === "more").map(
                  (option) => (
                    <button
                      key={option.name}
                      className="walletbutton"
                      onClick={() => connectWallet(option)}
                      disabled={
                        isLoading && pendingConnector?.name === option.name
                      }
                    >
                      <div className="justify-content-between d-flex flex-column-reverse w-100 align-items-center">
                        <span className="text-white wallet-item-name">
                          {option.name}
                        </span>
                        <img
                          src={option.icon}
                          className="wallet-item-icon"
                          alt="Icon"
                        />
                      </div>
                    </button>
                  )
                )}
              </div>
              {error && (
                <div className="text-red-500 mt-2">{error.message}</div>
              )}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default WalletModal;
