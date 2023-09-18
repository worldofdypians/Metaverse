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

const ForgotPasswordGecko = () => {
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
          We sent you a link at your email.
        </span>
        <h1
          onClick={() => {
            history("/");
          }}
          className={classes.succesfulBack}
        >
          Back to Sign In
        </h1>
      </div>
    );
  }

  return (
    <div className={classes.containergecko}>
      <h1
        style={{
          fontSize: 24,
          marginBottom: 40,
          fontWeight: 500,
        }}
      >
        Reset Password
      </h1>
      <Input
       type={"coingecko"}
        placeHolder="Email"
        value={email}
        onChange={onChangeEmail}
      />
      <Button
       type={"coingecko"}
        onPress={handleEmail}
        title={"Send Email"}
      />
      <h1
        onClick={() => {
          history("/");
        }}
        className={classes.succesfulBack}
      >
        Back to Sign In
      </h1>
    </div>

    //   <ErrorAlert error={error} />
  );
};

export default ForgotPasswordGecko;
