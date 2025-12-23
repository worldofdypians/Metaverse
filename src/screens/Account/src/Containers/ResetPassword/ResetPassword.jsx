import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Input, Button, LoginCard, LoginWrapper } from "../../Components";
import { useNavigate } from "react-router-dom";
import classes from "./ResetPassword.module.css";

import { encode } from "base-64";
import ErrorAlert from "../../Components/ErrorAlert/ErrorAlert";
import ReCaptchaV2 from "react-google-recaptcha";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const history = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const recaptchaRef = useRef(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleNewPassword = async () => {
    if (!captchaValue) {
      window.alertify.error("Please verify the reCAPTCHA");
    } else {
      if (newPassword === confirmNewPassword) {
        try {
          const recoverSession = encode(`${token}:${newPassword}`);
          await axios.post(
            "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/reset",
            { recoverSession }
          );
          setIsResetSuccess(true);
        } catch (error) {
          if (error?.response?.data?.error?.name === "PasswordValidator") {
            setError(
              "The new password should have  a minimum length of 8 characters, 1 lowercase letter, 1 digit and 1 symbol."
            );
          } else {
            if (error?.response?.data?.error?.message) {
              setError(error?.response?.data?.error?.message);
            } else {
              setError("Something went wrong.");
            }
          }
        }
      } else {
        setError("Passwords do not match.");
      }
    }
  };

  useEffect(() => {
    const handleEnter = (event) => {
      if (
        event.key === "Enter" &&
        newPassword &&
        confirmNewPassword &&
        captchaValue &&
        !isResetSuccess
      ) {
        handleNewPassword();
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [newPassword, confirmNewPassword, captchaValue, isResetSuccess]);

  if (isResetSuccess) {
    return (
      <LoginWrapper
        style={{
          margin: "8rem 0rem",
        }}
      >
        <LoginCard>
          <div className={classes.container}>
            <h1>New Password succesfully changed</h1>
            <h1
              onClick={() => {
                history("/auth");
              }}
              className={classes.succesfulText}
            >
              Back to Sign In
            </h1>
          </div>
        </LoginCard>
      </LoginWrapper>
    );
  }

  return (
    <LoginWrapper
      style={{
        margin: "8rem 0rem",
      }}
    >
      <LoginCard>
        <div className={classes.container}>
          <h1>Set new password</h1>
          <div className="position-relative">
            <Input
              style={{
                marginBottom: 20,
              }}
              placeHolder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e);
                setError(null);
              }}
              inputType={showPassword ? "text" : "password"}
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
              style={{
                marginBottom: 20,
              }}
              placeHolder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e);
                setError(null);
              }}
              inputType={showPassword2 ? "text" : "password"}
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
          <ReCaptchaV2
            sitekey="6LfFVMQrAAAAAGauKrn5cyQZRaXHMMlHMUz9IOnu"
            style={{ display: "inline-block" }}
            theme="dark"
            ref={recaptchaRef}
            onChange={handleCaptchaChange}
          />
          <Button
            style={{ margin: "auto", marginTop: 30, marginBottom: 20 }}
            onPress={handleNewPassword}
            title={"Confirm Password"}
            disabled={!captchaValue}
          />
        </div>
      </LoginCard>
      <ErrorAlert error={error} />
    </LoginWrapper>
  );
};

export default ResetPassword;
