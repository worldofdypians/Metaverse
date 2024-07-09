import { config, passport } from '@imtbl/sdk';

const passportInstance = new passport.Passport({
  baseConfig: {
    environment: config.Environment.SANDBOX, // or Environment.PRODUCTION 
    publishableKey: 'pk_imapik-test-thnDYtOU1Z4uxZ85oiVj', // replace with your publishable API key from Hub
  },
  clientId: '<YOUR_CLIENT_ID>', // replace with your client ID from Hub
  redirectUri: 'https://localhost:8080/redirect', // replace with one of your redirect URIs from Hub
  logoutRedirectUri: 'https://localhost:8080/logout', // replace with one of your logout URIs from Hub
  audience: 'platform_api',
  scope: 'openid offline_access email transact',
  popupOverlayOptions: {
    disableGenericPopupOverlay: false, // Set to true to disable the generic pop-up overlay
    disableBlockedPopupOverlay: false, // Set to true to disable the blocked pop-up overlay
  }
});