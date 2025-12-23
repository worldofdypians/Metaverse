/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { signIn, signOut, getCurrentUser } from "@aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";

const Auth = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: "",
    email: undefined,
    picture: "",
    userAttributes: "",
    data_loading: "",
    tooltips: "",
    website_locked: "",
    is_trialing: undefined,
    plan: "",
    roles: [],
    token: undefined,
    isAuthenticated: false,
    isLoading: true,
  });

  const [shouldLogin, setShouldLogin] = useState(true);
  const [upgradeSucces, setUpgradeSuccess] = useState(false);
  const [loginValues, setLoginValues] = useState({
    isLoginIn: false,
    loginError: null,
  });

  const logout = async () => {
    // signOut()
    //   .then(() => {
    //     setAuth({
    //       user: undefined,
    //       picture: undefined,
    //       userAttributes: undefined,
    //       data_loading: "",
    //       tooltips: "",
    //       website_locked: "",
    //       isAuthenticated: false,
    //       isLoading: false,
    //     });
    //   })
    //   .catch(() => {});
    await signOut();
    resetAuth();
  };

  const login = async (username, password) => {
    setLoginValues((prev) => ({
      ...prev,
      isLoginIn: true,
    }));
    try {
      //   const data = await signIn({ username: username, password: password });
      //   console.log('login data',data)
      //   setAuth({
      //     playerId: data?.attributes?.["custom:playerId"] || null,
      //     user: data?.username,
      //     email: data?.attributes?.email,
      //     picture: data?.attributes?.picture,
      //     token: data?.signInUserSession?.idToken?.jwtToken,
      //     userAttributes: data?.attributes,
      //     roles:
      //       data?.signInUserSession?.accessToken?.payload["cognito:groups"] || [],
      //     isAuthenticated: true,
      //     isLoading: false,
      //   });
      const user = await signIn({ username, password });
      await getAuthenticatedUser(user);
      setLoginValues((prev) => ({
        ...prev,
        isLoginIn: false,
        code: undefined,
      }));
    } catch (error) {
      // console.log(error, error.code, error.name, error.message);
      setAuth({
        isAuthenticated: false,
        isLoading: false,
        user: "",
        picture: "",
        userAttributes: "",
        data_loading: "",
        tooltips: "",
        website_locked: "",
        roles: [],
        token: undefined,
      });
      if (error?.code === "UserNotConfirmedException") {
        setLoginValues({
          isLoginIn: false,
          loginError: "",
          code: error?.code,
        });
      } else if (
        error?.name === "ForbiddenException" &&
        error?.message === "Request not allowed due to WAF block."
      ) {
        setLoginValues({
          isLoginIn: false,
          loginError:
            "The IP address you are using through a VPN appears suspicious or blacklisted. Please update it and try again.",
          code: error?.code,
        });
      } else {
        setLoginValues({
          isLoginIn: false,
          loginError:
            " The email and/or password you entered did not match our records. Please double-check and try again. ",
          code: error?.code,
        });
      }
    }
  };

  //   const getAuthenticatedUser = async (userData) => {
  //     if (!auth.isAuthenticated) {
  //       try {
  //         let data;
  //         if (userData) {
  //           data = userData;
  //         } else {
  //           data = await getCurrentUser();
  //         }
  //         console.log('datadata',data);
  //         setAuth({
  //           playerId: data?.attributes?.["custom:playerId"] || null,
  //           user: data?.username,
  //           email: data?.attributes?.email,
  //           picture: data?.attributes?.picture,
  //           token:
  //             data?.signInDetails?.idToken ||
  //             data?.signInUserSession?.idToken?.jwtToken,
  //           userAttributes: data?.attributes,
  //           roles:
  //             data?.signInUserSession?.accessToken?.payload["cognito:groups"] ||
  //             [],
  //           isAuthenticated: true,
  //           isLoading: false,
  //         });
  //       } catch (error) {
  //         setAuth({
  //           isAuthenticated: false,
  //           isLoading: false,
  //           user: "",
  //           picture: "",
  //           userAttributes: "",
  //           data_loading: "",
  //           tooltips: "",
  //           website_locked: "",
  //           roles: [],
  //           token: undefined,
  //         });
  //       }
  //     }
  //   };

  const getAuthenticatedUser = async (userData) => {
    if (!auth.isAuthenticated) {
      try {
        let user;
        let session;

        if (userData) {
          // If you pass userData from sign-in
          user = userData;
          session = await fetchAuthSession(); // get tokens
        } else {
          // Get current signed-in user
          user = await getCurrentUser();
          session = await fetchAuthSession({ forceRefresh: true });
        }

        const { idToken, accessToken } = session.tokens ?? {};
        const payload = accessToken?.payload ?? {};
        const attributes = idToken?.payload ?? {};

        setAuth({
          playerId: attributes["custom:playerId"] || null,
          user: user.username,
          email: attributes.email,
          picture: attributes.picture,
          token: idToken?.toString(),
          userAttributes: attributes,
          roles: payload["cognito:groups"] || [],
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error("getAuthenticatedUser error:", error);
        // resetAuth();
        setAuth({
          isAuthenticated: false,
          isLoading: false,
          user: "",
          picture: "",
          userAttributes: "",
          data_loading: "",
          tooltips: "",
          website_locked: "",
          roles: [],
          token: undefined,
        });
      }
    }
  };
  // const getUpdatedUser = async () => {
  //     try {
  //       let data = await getCurrentUser();
  //       setAuth({
  //         playerId: data?.attributes?.["custom:playerId"] || null,
  //         user: data?.username,
  //         email: data?.attributes?.email,
  //         picture: data?.attributes?.picture,
  //         token:
  //           data?.signInDetails?.idToken ||
  //           data?.signInUserSession?.idToken?.jwtToken,
  //         userAttributes: data?.attributes,
  //         roles:
  //           data?.signInUserSession?.accessToken?.payload["cognito:groups"] || [],
  //         isAuthenticated: true,
  //         isLoading: false,
  //       });
  //     } catch (error) {
  //       setAuth({
  //         isAuthenticated: false,
  //         isLoading: false,
  //         user: "",
  //         picture: "",
  //         userAttributes: "",
  //         data_loading: "",
  //         tooltips: "",
  //         website_locked: "",
  //         roles: [],
  //         token: undefined,
  //       });
  //     }
  //   };

  const getUpdatedUser = async () => {
    try {
      const user = await getCurrentUser();
      const session = await fetchAuthSession({ forceRefresh: true });
      const { idToken, accessToken } = session.tokens ?? {};
      const payload = accessToken?.payload ?? {};
      const attributes = idToken?.payload ?? {};

      setAuth({
        playerId: attributes["custom:playerId"] || null,
        user: user.username,
        email: attributes.email,
        picture: attributes.picture,
        token: idToken?.toString(),
        userAttributes: attributes,
        roles: payload["cognito:groups"] || [],
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // resetAuth();
      setAuth({
        isAuthenticated: false,
        isLoading: false,
        user: "",
        picture: "",
        userAttributes: "",
        data_loading: "",
        tooltips: "",
        website_locked: "",
        roles: [],
        token: undefined,
      });
    }
  };

  const resetAuth = () => {
    setAuth({
      user: "",
      email: undefined,
      picture: "",
      userAttributes: "",
      data_loading: "",
      tooltips: "",
      website_locked: "",
      is_trialing: undefined,
      plan: "",
      roles: [],
      token: undefined,
      isAuthenticated: false,
      isLoading: true,
    });
  };

  useEffect(() => {
    // getAuthenticatedUser();
    (async () => {
      try {
        const user = await getCurrentUser();
        if (user) await getAuthenticatedUser(user);
      } catch {
        resetAuth();
      }
    })();
  }, []);

  return (
    <Auth.Provider
      value={{
        ...auth,
        ...loginValues,
        setLoginValues,
        login,
        logout,
        getAuthenticatedUser,
        getUpdatedUser,
        shouldLogin,
        setShouldLogin,
        upgradeSucces,
        setUpgradeSuccess,
      }}
    >
      {children}
    </Auth.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.any,
};

function useAuth() {
  const context = useContext(Auth);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth };
export default AuthProvider;
