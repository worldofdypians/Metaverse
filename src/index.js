// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

// Wagmi + Wallet
import { WagmiProvider } from "wagmi";
import { wagmiClient } from "./wagmiConnectors.js";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Apollo + React Query
import { ApolloProvider } from "@apollo/client/react";
import client from "./screens/Account/src/apolloConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Amplify } from "aws-amplify";
import awsExports from "./screens/Account/src/aws-exports";
// Auth + MatchID
import AuthProvider from "./screens/Account/src/Utils.js/Auth/AuthDetails.jsx";
import { MatchProvider } from "@matchain/matchid-sdk-react";

// App
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";

// Styles
import "./app.scss";
Amplify.configure(awsExports);
// ✅ React Query + Persist setup

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 6 * 60 * 1000,
    },
  },
});
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// ✅ React root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          {/* <Hydrate state={undefined}> */}
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <AuthProvider>
              <WagmiProvider config={wagmiClient}>
                <MatchProvider
                  appid="ipgjm4nszcr36mcz"
                  wallet={{ type: "UserPasscode" }}
                >
                  <App />
                </MatchProvider>
              </WagmiProvider>
            </AuthProvider>
          </PersistQueryClientProvider>{" "}
          {/* </Hydrate> */}
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Optional: measure performance
reportWebVitals();
