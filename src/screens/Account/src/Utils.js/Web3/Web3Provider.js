import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { topUpContract, erc20_abi } from "../../web3";
import Web3 from "web3";

const web3Context = createContext();

function Web3Provider({ children }) {
  const [connectedState, setConnectedState] = useState({
    isConnected: false,
    error: "",
  });
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();

  const [dypBalance, setDypBalance] = useState();
  const [depositTokens, setDepositTokens] = useState();

  const getDypBalance = async () => {
    // const [account] = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    // const web3eth = new Web3(
    //   "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    // );

    // if (account !== undefined) {
    //   const contract = erc20_abi;

    //   const bal1 = await contract.methods
    //     .balanceOf(account)
    //     .call()
    //     .then((data) => {
    //       return web3eth.utils.fromWei(data, "ether");
    //     });
      setDypBalance();
    // }
  };

  const checkIsConnected = async () => {
    if (window?.ethereum?.isMetaMask) {
      try {
        const accounts = await window.ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((data) => {
            setAccount(data[0]);
          });
        const chainId = await window.ethereum.request({
          method: "net_version",
        });

        setChainId(parseInt(chainId));
        setConnectedState((prev) => ({
          error: "",
          isConnected: true,
        }));
      } catch (error) {
        if (error.code === -32002) {
          setConnectedState((prev) => ({
            error: "Click on MetaMask Icon And Log In",
            isConnected: false,
          }));
        }
      }
    } else {
      setConnectedState((prev) => ({
        error: "Please install MetaMask to Continue!",
        isConnected: false,
      }));
    }
  };

  const { ethereum } = window;

  ethereum?.on("chainChanged", checkIsConnected);
  ethereum?.on("accountsChanged", checkIsConnected);
  ethereum?.on("connect", checkIsConnected);
  ethereum?.on("disconnect", checkIsConnected);

  const getDepositedTokens = async () => {
    if (chainId === 56) {
      const getTotalDepositedTokensResponse = await topUpContract.methods
        .getTotalDepositedTokens(account)
        .call();
      const totalDepositedTokens = Web3.utils.fromWei(
        getTotalDepositedTokensResponse
      );
      setDepositTokens(totalDepositedTokens);
    }
  };

  useEffect(() => {
    checkIsConnected();
  }, []);

  useEffect(() => {
    if (account) {
      getDepositedTokens();
      getDypBalance();
    }
  }, [account]);

  return (
    <web3Context.Provider
      value={{
        connectedState,
        account,
        dypBalance,
        depositTokens,
        chainId,
      }}
    >
      {children}
    </web3Context.Provider>
  );
}

Web3Provider.propTypes = {
  children: PropTypes.any,
};

function useWeb3() {
  const context = useContext(web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within an AuthProvider");
  }
  return context;
}

export { useWeb3 };
export default Web3Provider;
