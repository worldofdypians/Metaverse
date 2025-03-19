import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./app.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./screens/Account/src/Utils.js/Auth/AuthDetails";
import { ApolloProvider } from "@apollo/client";
import client from "./screens/Account/src/apolloConfig";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { getWeb3ReactContext } from "@web3-react/core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 30 * 60 * 1000,
//       cacheTime: 31 * 60 * 1000,
//     },
//   },
// });

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ApolloProvider client={client}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <AuthProvider>
              <App />
            </AuthProvider>
          </PersistQueryClientProvider>
        </ApolloProvider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
