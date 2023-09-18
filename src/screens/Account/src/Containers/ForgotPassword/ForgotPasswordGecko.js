import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginWrapper,
  LoginCard,
  Input,
  Button,
  ErrorAlert,
} from "../../Components";
import classes from "./ForgotPassword.module.css";

const ForgotPasswordGecko = ({onResetPass}) => {
  const [email, setEmail] = useState("");
  const [isEmailSentSucces, setEmailSentSucces] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleEmail = async () => {
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
  };

  const onChangeEmail = (val) => {
    setError("");
    setEmail(val);
  };

  if (isEmailSentSucces) {
    return (
      <div className={classes.containergecko}>
        <span className={classes.createplayertxt}>
          *We sent you a link at your email.
        </span>
        <span
        onClick={() => {
          onResetPass();
        }}
        className={classes.errorText2}
      >
        Back to Sign In
      </span>
      </div>
    );
  }

  return (
    <div className={classes.containergecko}>
      <h6 className="land-name">Reset Password</h6>
      <Input
        type={"coingecko"}
        placeHolder="Email"
        value={email}
        onChange={onChangeEmail}
      />
       <div className="summaryseparator"></div>
      <Button type={"coingecko"} onPress={handleEmail} title={"Send Email"} />
      <span
        onClick={() => {
          onResetPass();
        }}
        className={classes.errorText2}
      >
        Back to Sign In
      </span>
    </div>

    //   <ErrorAlert error={error} />
  );
};

export default ForgotPasswordGecko;
