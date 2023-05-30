import { Amplify } from "aws-amplify";

import { ApolloProvider } from "@apollo/client";

import "@aws-amplify/ui-react/styles.css";
import awsExports from "./src/aws-exports";
import "./src/App.css";

import AuthProvider, { useAuth } from "./src/Utils.js/Auth/AuthDetails.js";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { Auth, ForgotPassword, ResetPassword } from "./src/Containers";
import PlayerCreation from "./src/Containers/PlayerCreation/PlayerCreation.js";
import client from "./src/apolloConfig.js";
import Dashboard from "./src/Containers/Dashboard/Dashboard.js";
import LandingScreen from "./src/Containers/LandingScreen/LandingScreen.js";
import Web3Provider from "./src/Utils.js/Web3/Web3Provider.js";

Amplify.configure(awsExports);

function Account() {
  function UnAuthenticatedContent() {
    return (
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/ResetPassword" component={ResetPassword} />
        <Redirect to="/auth" path={["/dashboard", "/"]} />
      </Switch>
    );
  }

  function AppContent() {
    const { isLoading, isAuthenticated, playerId } = useAuth();
    if (isLoading) {
      return <LandingScreen />;
    }

    if (isAuthenticated) {
      if (!playerId) {
        return (
          <Switch>
            <Route exact path="/player" component={PlayerCreation} />
            <Redirect to="/player" path={["/"]} />
          </Switch>
        );
      }

      return (
        <Web3Provider>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Redirect to="/" path={["/"]} />
          </Switch>
        </Web3Provider>
      );
    }

    return <UnAuthenticatedContent />;
  }

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default Account;
