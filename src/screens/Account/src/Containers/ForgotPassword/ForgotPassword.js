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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSentSucces, setEmailSentSucces] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleEmail = async () => {
    try {
      await axios.post(
        "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod/auth/SendRecoveryEmail",
        { email: email }
      ).then(()=>{
        setEmailSentSucces(true);
      })
     
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
      <LoginWrapper style={{ margin:'6rem 0rem' }}>
        <LoginCard>
          <div className={classes.container}>
            <h1 className={classes.succesfulMessageTitle}>
              We sent you a link at your email.
            </h1>
            <h1
              onClick={() => {
                history("/auth");
              }}
              className={classes.succesfulBack}
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
      margin:'6rem 0rem'
    }}
  >
      <LoginCard>
        <div className={classes.container}>
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
            style={{
              marginBottom: 20,
            }}
            placeHolder="Email"
            value={email}
            onChange={onChangeEmail}
          />
          <Button
            style={{ margin: "auto", marginTop: 30, marginBottom: 20 }}
            onPress={handleEmail}
            title={"Send Email"}
          />
          <h1
            onClick={() => {
              history("/auth");
            }}
            className={classes.succesfulBack}
          >
            Back to Sign In
          </h1>
        </div>
      </LoginCard>
      <ErrorAlert error={error} />
    </LoginWrapper>
  );
};

export default ForgotPassword;
