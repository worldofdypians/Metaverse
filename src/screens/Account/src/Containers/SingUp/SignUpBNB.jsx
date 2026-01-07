/* eslint-disable react-hooks/exhaustive-deps */
import { confirmSignUp, resendSignUpCode, signUp } from "@aws-amplify/auth";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from "../../Components";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import classes from "./SignUp.module.css";
import ReCaptchaV2 from "react-google-recaptcha";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
    signupUsername,
    isLoginIn,
  } = useAuth();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userExists, setuserExists] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const recaptchaRef = useRef(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const login = () => {
    LoginGlobal(username, password);
  };

  const resendCode = async () => {
    console.log("resend code");
    await resendSignUpCode(username).catch((err) => {
      setLoginValues((prev) => {
        return {
          ...prev,
          loginError: err?.message,
        };
      });
    });
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
    await confirmSignUp({
      username: emailToVerify,
      confirmationCode: verifyCode,
    })
      .then(async () => {
        const emailForLogin = username || signupUsername;
        if (emailForLogin && password) {
          try {
            await LoginGlobal(emailForLogin, password);
            setLoginValues((prev) => ({
              ...prev,
              code: undefined,
              signupUsername: undefined,
            }));
          } catch (error) {
            setLoginValues((prev) => ({
              ...prev,
              code: undefined,
              loginError: error?.message || "Login failed after verification",
            }));
          }
        } else {
          setLoginValues((prev) => ({
            ...prev,
            code: undefined,
            loginError: "Please enter your password to complete login",
          }));
        }
      })
      .catch((e) => {
        console.log("failed with error", e);
        setLoginValues((prev) => {
          return {
            ...prev,
            loginError: e?.message,
          };
        });
      });
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
            const timer = setTimeout(() => {
              setuserExists(true);
              onUserExists();
            }, 3000);
            return () => clearTimeout(timer);
          }
          setLoginValues((prev) => {
            return {
              ...prev,
              loginError: err?.message,
              code: undefined,
            };
          });
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
    if (code === "UserNotConfirmedException" && isLogin) {
      resendCode();
    }
  }, [code, isLogin]);

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
            *The verification code required for your account has been
            successfully sent to the email address associated with your account.
          </span>

          <span className={classes.createplayertxt2}>
            Please check your inbox, including the spam folder, and enter the
            code here to complete the verification process. The verification
            code you will receive is a 6-digit code.
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
          disabled={disabled || !verifyCode || isLoginIn}
          style={{ margin: "auto" }}
          onPress={verifyEmailValidationCode}
          title={isLoginIn ? "Verifying..." : "Verify"}
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
          <div className="position-relative">
            <Input
              inputType={showPassword ? "text" : "password"}
              placeHolder="Password"
              value={password}
              onChange={setPassword}
              type={"coingecko"}
            />
            <div
              style={{
                position: "absolute",
                right: 10,
                top: 7,
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
        </div>

        <div className="d-flex flex-column w-100 gap-1">
          <h6 className={classes.labelBNB}>Confirm Password*</h6>
          <div className="position-relative">
            <Input
              inputType={showPassword2 ? "text" : "password"}
              placeHolder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              type={"coingecko"}
            />
            <div
              style={{
                position: "absolute",
                right: 10,
                top: 7,
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
        </div>

        <div className="summaryseparator"></div>
        <Button
          disabled={disabled || !captchaValue}
          onPress={signup}
          style={{ margin: "auto" }}
          title={"Continue"}
          type={"primary2"}
        />
        <ReCaptchaV2
          sitekey="6LfFVMQrAAAAAGauKrn5cyQZRaXHMMlHMUz9IOnu"
          style={{ display: "inline-block" }}
          theme="dark"
          ref={recaptchaRef}
          onChange={handleCaptchaChange}
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
