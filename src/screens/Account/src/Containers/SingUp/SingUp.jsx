/* eslint-disable react-hooks/exhaustive-deps */
import { confirmSignUp, signUp } from "@aws-amplify/auth";
import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./SignUp.module.css";
import ReCaptchaV2 from "react-google-recaptcha";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SingUp() {
  const {
    isAuthenticated,
    login: LoginGlobal,
    code,
    loginError,
    setLoginValues,
    signupUsername,
    isLoginIn,
  } = useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const recaptchaRef = useRef(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  async function verifyEmailValidationCode() {
    const emailToVerify = username || signupUsername;
    if (!emailToVerify || !verifyCode) {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: "Username and verification code are required",
        };
      });
      return;
    }

    setIsVerifying(true);
    try {
      await confirmSignUp({
        username: emailToVerify,
        confirmationCode: verifyCode,
      });

      const emailForLogin = username || signupUsername;
      if (emailForLogin && password) {
        try {
          await LoginGlobal(emailForLogin, password);
          setLoginValues((prev) => ({
            ...prev,
            signupUsername: undefined, // Clear stored username
          }));
        } catch (error) {
          setIsVerifying(false);
          setLoginValues((prev) => ({
            ...prev,
            code: undefined,
            loginError: error?.message || "Login failed after verification",
          }));
        }
      } else {
        setIsVerifying(false);
        setLoginValues((prev) => ({
          ...prev,
          code: undefined,
          loginError: "Please enter your password to complete login",
        }));
      }
    } catch (e) {
      console.log("failed with error", e);
      setIsVerifying(false);
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: e?.message,
        };
      });
    }
  }

  const signup = () => {
    if (!captchaValue) {
      window.alertify.error("Please verify the reCAPTCHA");
    } else if (password !== confirmPassword) {
      window.alertify.error("Passwords do not match");
    } else {
      signUp({
        username,
        password,
      })
        .then((user) => {
          setLoginValues((prev) => {
            return {
              ...prev,
              code: "UserNotConfirmedException",
              loginError: null,
              signupUsername: username,
            };
          });
        })
        .catch((err) => {
          if (
            err?.name === "ForbiddenException" &&
            err?.message === "Request not allowed due to WAF block."
          ) {
            setLoginValues({
              isLoginIn: false,
              loginError:
                "The IP address you are using through a VPN appears suspicious or blacklisted. Please update it and try again.",
              code: err?.code,
            });
          } else {
            setLoginValues((prev) => {
              return {
                ...prev,
                loginError: err?.message,
                code: undefined,
              };
            });
          }
        });
    }
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
    if (isAuthenticated) {
      setIsVerifying(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleEnter = (event) => {
      if (
        event.key === "Enter" &&
        username &&
        password &&
        confirmPassword &&
        !code &&
        captchaValue
      ) {
        signup();
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [username, password, confirmPassword, code, captchaValue]);

  if (isAuthenticated) {
    return <Navigate to="/account" state={{ fromLogin: true }} />;
  }

  if (code === "UserNotConfirmedException" || isVerifying || isLoginIn) {
    return (
      <div className={classes.container}>
        <Input
          style={{
            marginBottom: 24,
          }}
          placeHolder="Enter verification code"
          value={verifyCode}
          onChange={setVerifyCode}
        />

        <Button
          disabled={disabled || !verifyCode || isVerifying || isLoginIn}
          style={{ margin: "auto" }}
          onPress={verifyEmailValidationCode}
          title={isVerifying || isLoginIn ? "Verifying..." : "Verify"}
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
      <div className="position-relative">
        <Input
          placeHolder="Password"
          inputType={showPassword ? "text" : "password"}
          onChange={setPassword}
        />
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 18,
            cursor: "pointer",
          }}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <VisibilityOffIcon style={{ color: "wheat" }} />
          ) : (
            <RemoveRedEyeIcon style={{ color: "wheat" }} />
          )}
        </div>
      </div>
      <div className="position-relative">
        <Input
          inputType={showPassword2 ? "text" : "password"}
          placeHolder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 18,
            cursor: "pointer",
          }}
          onClick={() => setShowPassword2((prev) => !prev)}
        >
          {showPassword2 ? (
            <VisibilityOffIcon style={{ color: "wheat" }} />
          ) : (
            <RemoveRedEyeIcon style={{ color: "wheat" }} />
          )}
        </div>
      </div>
      <Button
        disabled={disabled || !captchaValue}
        style={{ margin: "auto" }}
        onPress={signup}
        title={"Create account"}
      />
      <ReCaptchaV2
        sitekey="6LfFVMQrAAAAAGauKrn5cyQZRaXHMMlHMUz9IOnu"
        style={{ display: "inline-block" }}
        theme="dark"
        ref={recaptchaRef}
        onChange={handleCaptchaChange}
      />
    </div>
  );
}

export default SingUp;
