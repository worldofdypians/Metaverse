/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./Login.module.css";
import { Redirect } from "react-router-dom";

function LoginBNB({
  onLoginTry,
  onForgetPassword,
  onSuccessLogin,
  handleGoToSignup,
}) {
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
    if (loginError) {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: null,
        };
      });
    }
  }, [username, password, verifyCode]);

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
      });
  }

  if (isAuthenticated) {
    onSuccessLogin();
  }

  if (code === "UserNotConfirmedException") {
    return (
      <div className={classes.containerbnb}>
        <h6 className={classes.create_acc_bnb}>Verify Account</h6>
        <div className="d-flex flex-column gap-2">
        <span className={classes.createplayertxt2}>
          *The verification code required for your account has been successfully sent to the email address associated with your account. 
        </span>

        <span className={classes.createplayertxt2}>
        Please check your inbox, including the spam folder, and enter the code here to complete the verification process. The verification code you will receive is a 6-digit code.
        </span>
        
        </div>
        <div className="d-flex flex-column w-100 gap-1">
          <h6 className={classes.labelBNB}>Code*</h6>
        <Input
          style={{
            marginBottom: 24,
          }}
          placeHolder="Verify"
          value={verifyCode}
          onChange={setVerifyCode}
          type={"coingecko"}
        />
        </div>
        <div className="summaryseparator"></div>

        <Button
          disabled={disabled}
          style={{ margin: "auto" }}
          onPress={verifyEmailValidationCode}
          title={"Verify"}
          type={"primary2"}
        />
      </div>
    );
  }

  return (
    <div className={`${classes.containerbnb} h-auto`}>
      <div className="d-flex flex-column gap-3">
      <h6 className={classes.create_acc_bnb}>Log in to your Game Account</h6>
      <div className="d-flex flex-column w-100 gap-1">
        <h6 className={classes.labelBNB}>Email*</h6>
      <Input
        placeHolder="Email"
        value={username}
        onChange={setUserName}
        inputType="email"
        type={"coingecko"}
      />
      </div>
      <div className="d-flex flex-column w-100 gap-1">
        <h6 className={classes.labelBNB}>Password*</h6>
      <Input
        inputType="password"
        placeHolder="Password"
        value={password}
        onChange={setPassword}
        type={"coingecko"}
      />
      </div>
      <div className="summaryseparator"></div>
<div className="d-flex flex-column gap-1" >
      <Button
        disabled={disabled}
        style={{ margin: "auto" }}
        onPress={login}
        // loading={isLoginIn}
        title={"Continue"}
        type={"primary2"}
      />
      <div
        className={`${classes.forgotPasswordText} m-auto `}
        onClick={onForgetPassword}
      >
        <span className={classes.errorText2}>Forgot your password?</span>
      </div>
      </div></div>

      <div className="d-flex align-items-center gap-2">
        <h6 className={classes.bottomGroup_graytxt}>
          Don't have an account yet?
        </h6>
        <h6 className={classes.bottomGroup_login} onClick={handleGoToSignup}>
          Sign up
        </h6>
      </div>
    </div>
  );
}

export default LoginBNB;
