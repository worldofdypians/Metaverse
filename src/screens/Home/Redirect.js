import React, { useEffect } from "react";
import { passport, config } from "@imtbl/sdk";
const Redirect = () => {
  useEffect(() => {
    const PUBLISHABLE_KEY = "pk_imapik-BnvsuBkVmRGTztAch9VH"; // Replace with your Publishable Key from the Immutable Hub
    const CLIENT_ID = "FgRdX0vu86mtKw02PuPpIbRUWDN3NpoE"; // Replace with your passport client ID

    window.addEventListener("load", function () {
      const passportInstance = new passport.Passport({
        baseConfig: {
          environment: config.Environment.PRODUCTION,
          publishableKey: PUBLISHABLE_KEY,
        },
        clientId: CLIENT_ID,
        redirectUri: "https://www.worldofdypians.com/redirect",
        logoutRedirectUri: "https://www.worldofdypians.com/logout",
        audience: "platform_api",
        scope: "openid offline_access email transact",
      });

      passportInstance.loginCallback();
    });
  });
  return <div>redirecting...</div>;
};

export default Redirect;
