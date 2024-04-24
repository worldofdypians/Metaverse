/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./SignUp.module.css";
import LoginBNB from "../Login/LoginBNB";

function SingUpBNB({ onVerifySuccess, onUserExists,  isLogin}) {
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
  const [userExists, setuserExists] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const login = () => {
    LoginGlobal(username, password);
  };

  const resendCode = async () => {
    console.log("resend code");
    await Auth.resendSignUp(username).catch((err) => {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: err?.message,
        };
      });
    });
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
        console.log("err?.message", err?.message);
        if (
          err?.message?.includes(
            "An account with the given email already exists."
          )
        ) {
          setLoginValues((prev) => {
            return {
              ...prev,
              loginError: err?.message,
            };
          });
          setTimeout(() => {
            setuserExists(true);
            onUserExists();
          }, 3000);
        }
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: err?.message,
          };
        });
      });
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
  }, [username, password]);

  useEffect(() => {
    if (code === "UserNotConfirmedException" && isLogin) {
      resendCode();
    }
  }, [code, isLogin]);

  //   if (isAuthenticated) {
  //     return <Navigate to="/account" state={{ fromLogin: true }} />;
  //   }

  if (isAuthenticated) {
    if (!playerId) {
      onVerifySuccess();
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
    <div className={classes.container}>
      <Input
        placeHolder="Email"
        value={username}
        onChange={setUserName}
        inputType="email"
      />
      <Input
        inputType="password"
        placeHolder="Password"
        value={password}
        onChange={setPassword}
      />
      <Input
        inputType="password"
        placeHolder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      <Button
        disabled={disabled}
        style={{ margin: "auto" }}
        onPress={signup}
        title={"Create account"}
      />
    </div>
  );
}

export default SingUpBNB;
