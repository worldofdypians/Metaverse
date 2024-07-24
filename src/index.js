import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./app.scss";
import { BrowserRouter } from "react-router-dom";
 
import { getConnectors } from "web3-connector";
import AuthProvider from "./screens/Account/src/Utils.js/Auth/AuthDetails";
import { ApolloProvider } from "@apollo/client";
import client from "./screens/Account/src/apolloConfig";

import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { ethers } from "ethers";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
 

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Web3ReactProvider getLibrary={getLibrary}>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
        </AuthProvider>
    </ApolloProvider>
    </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
