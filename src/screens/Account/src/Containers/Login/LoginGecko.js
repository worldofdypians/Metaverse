/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
// import { Link, Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./Login.module.css";
// import { ErrorAlert } from "../../Components";
import ForgotPasswordGecko from "../ForgotPassword/ForgotPasswordGecko";

function LoginGecko({ mintTitle, onSuccessLogin, newEmail, onUsernameChange,onPassChange, onLoginTry }) {
  const {
    isAuthenticated,
    login: LoginGlobal,
    loginError,
    code,
    setLoginValues,
    isLoginIn,
  } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [showForgotPassword, setshowForgotPassword] = useState(false);

  const login = async () => {
    onLoginTry();
    await LoginGlobal(username, password);
  };

  useEffect(() => {
    if (username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  useEffect(() => {
    setUserName(newEmail);
  }, []);

  useEffect(() => {
    if (loginError) {
      seterrorMsg(loginError);

      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: null,
        };
      });
    }
  }, [username, password, verifyCode]);

  useEffect(() => {
    if (loginError) {
      seterrorMsg(loginError);
    }
  }, [loginError]);

  if (isAuthenticated) {
    onSuccessLogin();
  }

  async function verifyEmailValidationCode() {
    await Auth.confirmSignUp(username, verifyCode)
      .then(() => {
        login();
      })
      .catch((e) => {
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: e?.message,
          };
        });
        seterrorMsg(e?.message);
      });
  }

  if (code === "UserNotConfirmedException") {
    return (
      <div className={classes.containergecko}>
        <span className={classes.createplayertxt}>
          *The verification code has been sent to your email address.
        </span>
        <Input
          type={"coingecko"}
          placeHolder="Verify"
          value={verifyCode}
          onChange={setVerifyCode}
        />
        <span className="footertxt-coingecko mt-1">
          Users who have claimed the {mintTitle} NFT are required to create a
          WOD Account to receive the NFT and participate in the exclusive event.
        </span>
        <div className="summaryseparator"></div>

        <Button
          disabled={disabled}
          onPress={verifyEmailValidationCode}
          title={"Continue  >"}
          type={"coingecko"}
        />
      </div>
    );
  }

  return (
    <div className={classes.containergecko}>
      {showForgotPassword === false ? (
        <>
          <span className={classes.createplayertxt}>
            *Make sure to use the existing account details to log in to your
            account.
          </span>
          <Input
            type={"coingecko"}
            placeHolder="Email"
            value={username}
            onChange={(e) => {
              setUserName(e);
              onUsernameChange(e)
            }}
        inputType="email"

          />
          <Input
            type={"coingecko"}
            inputType="password"
            placeHolder="Password"
            value={password}
            onChange={(e)=>{setPassword(e);onPassChange(e)}}
          />{" "}
          <span
            className={classes.errorText2}
            onClick={() => {
              setshowForgotPassword(true);
            }}
          >
            Forgot your password?
          </span>
          <span className="footertxt-coingecko mt-1">
            Users who have claimed the {mintTitle} NFT are required to create a
            WOD Account to receive the NFT and participate in the exclusive
            event.
          </span>
          <div className="summaryseparator"></div>
          {errorMsg !== "" && (
            <span className={classes.errorText}>{errorMsg}</span>
          )}
          <Button
            disabled={disabled}
            onPress={login}
            title={"Continue  >"}
            type={"coingecko"}
          />
        </>
      ) : (
        <ForgotPasswordGecko
          onResetPass={() => {
            setshowForgotPassword(false);
          }}
          mintTitle={mintTitle}
        />
      )}
      {/* <ErrorAlert error={loginError} /> */}
    </div>
  );
}

export default LoginGecko;
