// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Hydrate } from "@tanstack/react-query";

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

const queryClient = new QueryClient();
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

// ✅ React root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <QueryClientProvider client={queryClient}>
            {/* <Hydrate state={undefined}> */}
            <AuthProvider>
              <WagmiProvider config={wagmiClient}>
                <PersistQueryClientProvider
                  client={queryClient}
                  persistOptions={{ persister }}
                  hydrateOptions={{
                    defaultOptions: { queries: { retry: false } },
                  }} // <-- required in v5
                >
                  <MatchProvider
                    appid="ipgjm4nszcr36mcz"
                    wallet={{ type: "UserPasscode" }}
                  >
                    <App />
                  </MatchProvider>
                </PersistQueryClientProvider>
              </WagmiProvider>
            </AuthProvider>
            {/* </Hydrate> */}
          </QueryClientProvider>
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Optional: measure performance
reportWebVitals();
