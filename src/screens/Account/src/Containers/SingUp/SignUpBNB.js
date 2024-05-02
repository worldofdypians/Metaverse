/* eslint-disable react-hooks/exhaustive-deps */
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./SignUp.module.css";

function SingUpBNB({
  onVerifySuccess,
  onUserExists,
  isLogin,
  handleGoToLogin,
  onShowVerify,
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
    onShowVerify(true);
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
    <div className={`${classes.containerbnb} h-100`}>
      <div className="d-flex flex-column gap-3">
        <h6 className={classes.create_acc_bnb}>Create your Account</h6>
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

        <div className="d-flex flex-column w-100 gap-1">
          <h6 className={classes.labelBNB}>Confirm Password*</h6>
          <Input
            inputType="password"
            placeHolder="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type={"coingecko"}
          />
        </div>

        <div className="summaryseparator"></div>
        <Button
          disabled={disabled}
          onPress={signup}
          style={{ margin: "auto" }}
          title={"Continue"}
          type={"primary2"}
        />
      </div>
      <div className="d-flex align-items-center gap-2">
        <h6 className={classes.bottomGroup_graytxt}>
          Already have an account?
        </h6>
        <h6 className={classes.bottomGroup_login} onClick={handleGoToLogin}>
          Log in
        </h6>
      </div>
    </div>
  );
}

export default SingUpBNB;
