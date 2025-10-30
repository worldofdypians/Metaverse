import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginWrapper,
  LoginCard,
  Input,
  Button,
  ErrorAlert,
} from "../../Components";
import classes from "./ForgotPassword.module.css";
import LoginCardBNB from "../../Components/LoginCard/LoginCardBNB";
import ReCaptchaV2 from "react-google-recaptcha";

const ForgotPasswordBNB = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [isEmailSentSucces, setEmailSentSucces] = useState(false);
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const history = useNavigate();
  const recaptchaRef = useRef(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleEmail = async () => {
    if (!captchaValue) {
      window.alertify.error("Please verify the reCAPTCHA");
    } else {
      try {
        const { data } = await axios.post(
          "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/SendRecoveryEmail",
          { email: email }
        );
        if (data.success) {
          setEmailSentSucces(true);
        }
      } catch (error) {
        if (error?.response?.data?.code === 400) {
          setError("Make sure you put the correct email address!");
        }
      }
    }
  };

  const onChangeEmail = (val) => {
    setError("");
    setEmail(val);
  };

  if (isEmailSentSucces) {
    return (
      <div style={{ margin: "auto" }}>
        <div className={classes.containerbnb}>
          <h6 className={classes.create_acc_bnb}>
            We sent you a link at your email.
          </h6>
          <span className={classes.createplayertxt2} style={{ margin: "auto" }}>
            *We sent you a link at your email. Check your inbox and reset your
            password. Then try to login again.
          </span>

          <h1
            onClick={() => {
              onSuccess();
            }}
            className={classes.errorText2}
          >
            Back to Sign In
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.containerbnb}>
        <div className="d-flex flex-column gap-3">
          <h6 className={classes.create_acc_bnb}>Reset Password</h6>
          <span className={classes.createplayertxt2}>
            *Please enter your email address in the field below. After
            submitting, the password reset link will be sent to your inbox.
          </span>
          <Input
            style={{
              marginBottom: 20,
            }}
            placeHolder="Email"
            value={email}
            onChange={onChangeEmail}
            type={"coingecko"}
          />
          <div className="summaryseparator"></div>
          <div className="d-flex flex-column gap-1 align-items-center">
            <Button
              onPress={handleEmail}
              title={"Send Email"}
              type={"primary2"}
              disabled={!email || !captchaValue}
            />
            <ReCaptchaV2
              sitekey="6LfFVMQrAAAAAGauKrn5cyQZRaXHMMlHMUz9IOnu"
              style={{ display: "inline-block" }}
              theme="dark"
              ref={recaptchaRef}
              onChange={handleCaptchaChange}
            />
            <h1
              onClick={() => {
                onSuccess();
              }}
              className={classes.errorText2}
            >
              Back to Sign In
            </h1>{" "}
          </div>
        </div>
      </div>

      <ErrorAlert error={error} />
    </div>
  );
};

export default ForgotPasswordBNB;
