const amplifyConfig = {
  Auth: {
    Cognito: {
      region: "eu-central-1",
      identityPoolRegion: "eu-central-1",
      userPoolId: "eu-central-1_qjH3uArwD",
      userPoolClientId: "guqq69uoiig1hgrbhig77poic",
      loginWith: {},
    },
    Analytics: {
      disabled: true,
    },
  },
};

export default amplifyConfig;
