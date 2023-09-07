/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./SignUp.module.css";

function SingUpGecko({ onSuccessVerify }) {
  const {
    isAuthenticated,
    login: LoginGlobal,
    code,
    loginError,
    setLoginValues,
    playerId,
  } = useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [playerCreation, setplayerCreation] = useState(false);

  const login = () => {
    LoginGlobal(username, password);
  };

  async function verifyEmailValidationCode() {
    await Auth.confirmSignUp(username, verifyCode)
      .then(() => {
        login();
      })
      .catch((e) => {
        console.log("failed with error", e);
      });
  }

  const signup = () => {
    Auth.signUp({
      username,
      password,
    })
      .then((user) => {
        login();
      })
      .catch((err) => {
        console.log(err)
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: err?.message,
          };
        });
      });
  };

  useEffect(() => {
    setLoginValues(() => {
      return {
        isLoginIn: false,
        loginError: null,
      };
    });
  }, []);

  console.log(username, password);

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
  }, [username, password]);

  if (isAuthenticated) {
    if (!playerId) {
      setplayerCreation(true);
      onSuccessVerify(true);
    }
  }

  if (code === "UserNotConfirmedException") {
    return (
      <div className={classes.container}>
        <Input
          style={{
            marginBottom: 24,
          }}
          placeHolder="Verify"
          value={verifyCode}
          onChange={setVerifyCode}
        />

        <Button
          disabled={disabled}
          style={{ margin: "auto" }}
          onPress={verifyEmailValidationCode}
          title={"Verify"}
        />
      </div>
    );
  }
  return (
    <div className={classes.containergecko}>
      <Input
        placeHolder="Email"
        value={username}
        onChange={setUserName}
        type={"coingecko"}
      />
      <Input
        inputType="password"
        placeHolder="Password"
        value={password}
        onChange={setPassword}
        type={"coingecko"}
      />
      <Input
        inputType="password"
        placeHolder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        type={"coingecko"}
      />
      <Button
        disabled={disabled}
        onPress={signup}
        title={"Create account"}
        type={"coingecko"}
      />
    </div>
  );
}

export default SingUpGecko;
