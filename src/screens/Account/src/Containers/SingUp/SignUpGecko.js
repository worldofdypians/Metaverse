/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./SignUp.module.css";
import LoginGecko from "../Login/LoginGecko";
import { ErrorAlert } from "../../Components";
function SignUpGecko({
  onSuccessVerify,
  onEmailVerify,
  onShowVerify,
  onSuccessLogin,
  mintTitle,
  chainId,
  activeTab,
  isExistingUser,
}) {
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
  const [userExists, setuserExists] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [isLogin, setisLogin] = useState(false);

  const login = () => {
    LoginGlobal(username, password);
  };

  async function verifyEmailValidationCode() {
    await Auth.confirmSignUp(username, verifyCode)
      .then(() => {
        login();
        onEmailVerify(true);
      })
      .catch((e) => {
        console.log("failed with error", e);
        seterrorMsg(e?.message);
      });
  }

  const signup = () => {
    Auth.signUp({
      username,
      password,
    })
      .then((user) => {
        login();
        seterrorMsg("");
      })
      .catch((err) => {
        console.log(typeof err, err.message);
        seterrorMsg(err?.message);
        if (
          err?.message?.includes(
            "An account with the given email already exists."
          )
        ) {
          setuserExists(true);
          isExistingUser();
          setPassword("");
          setConfirmPassword("");
        }
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: err?.message,
          };
        });
      });
  };

  const resendCode = async () => {
    await Auth.resendSignUp(username).catch((err)=>{
      seterrorMsg(err?.message);
    })
  };

  useEffect(() => {
    setLoginValues(() => {
      return {
        isLoginIn: false,
        loginError: null,
      };
    });
  }, []);

  useEffect(() => {
    if (
      username !== "" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username)
    ) {
      seterrorMsg("Email format is Invalid");
    } else if (
      username !== "" &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(username)
    ) {
      seterrorMsg("");
    }
  }, [username]);

  useEffect(() => {
    if (chainId !== 1030 && mintTitle === "Conflux Beta Pass") {
      setDisabled(true);
      seterrorMsg("You should be on Conflux network to register.");
    }
    else {
      if (username && password && confirmPassword) {
        setDisabled(false);
        if (password !== confirmPassword) {
          setDisabled(true);
          seterrorMsg("Passwords don't match");
        } else {
          setDisabled(false);
          seterrorMsg("");
        }
      } else {
        setDisabled(true);
      }
    }
  }, [chainId, mintTitle,username, password, confirmPassword]);

  // useEffect(() => {
  //   if (username && password && confirmPassword) {
  //     setDisabled(false);
  //     if (password !== confirmPassword) {
  //       setDisabled(true);
  //       seterrorMsg("Passwords don't match");
  //     } else {
  //       setDisabled(false);
  //       seterrorMsg("");
  //     }
  //   } else {
  //     setDisabled(true);
  //   }
  // }, [username, password, confirmPassword]);

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

  if (isAuthenticated) {
    if (!playerId) {
      setplayerCreation(true);
      onSuccessVerify(true);
    }
  }

  if (code === "UserNotConfirmedException") {
    onShowVerify(true);
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
          WoD Account to receive the NFT and participate in the exclusive event.
        </span>

        <div className="summaryseparator"></div>
        {errorMsg !== "" && (
          <span className={classes.errorText}>{errorMsg}</span>
        )}

        <Button
          onPress={verifyEmailValidationCode}
          title={"Continue  >"}
          type={"coingecko"}
        />
      </div>
    );
  }

  if (userExists || activeTab === "login") {
    return (
      <LoginGecko
        mintTitle={mintTitle}
        onSuccessLogin={onSuccessLogin}
        newEmail={username}
        onUsernameChange={(value) => {
          setUserName(value);
        }}
        onLoginTry={() => {
          setisLogin(true);
        }}
        onPassChange={(value)=>{setPassword(value)}}
      />
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
      <span
        className={classes.errorText}
        style={{ fontSize: "11px", textAlign: "start" }}
      >
        *Password must be at least 8 characters with numbers, symbols, and
        uppercase letters.
      </span>
      <span className="footertxt-coingecko mt-1">
        Users who have claimed the {mintTitle} NFT are required to create a WoD
        Account to receive the NFT and participate in the exclusive event.
      </span>

      <div className="summaryseparator"></div>
      {errorMsg !== "" && <span className={classes.errorText}>{errorMsg}</span>}

      <Button
        disabled={disabled}
        onPress={signup}
        title={"Continue  >"}
        type={"coingecko"}
      />
    </div>
  );
}

export default SignUpGecko;
