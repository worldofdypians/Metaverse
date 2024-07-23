import React, { useEffect } from "react";
import { passport, config } from "@imtbl/sdk";
const Redirect = () => {
  useEffect(() => {
    const PUBLISHABLE_KEY = "pk_imapik-test-thnDYtOU1Z4uxZ85oiVj"; // Replace with your Publishable Key from the Immutable Hub
    const CLIENT_ID = "8u9twN341by6zff9xxJ34MIWIDX438PZ"; // Replace with your passport client ID

    window.addEventListener("load", function () {
      const passportInstance = new passport.Passport({
        baseConfig: {
          environment: config.Environment.SANDBOX,
          publishableKey: PUBLISHABLE_KEY,
        },
        clientId: CLIENT_ID,
        redirectUri: "http://localhost:8080/redirect",
        logoutRedirectUri: "http://localhost:8080/logout",
        audience: "platform_api",
        scope: "openid offline_access email transact",
      });

      passportInstance.loginCallback();
    });
  });
  return <div>redirecting...</div>;
};

export default Redirect;
