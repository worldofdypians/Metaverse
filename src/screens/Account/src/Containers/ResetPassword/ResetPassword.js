import axios from "axios";
import React, { useState } from "react";
import { Input, Button, LoginCard, LoginWrapper } from "../../Components";
import { useNavigate } from "react-router-dom";
import classes from "./ResetPassword.module.css";

import { encode } from "base-64";
import ErrorAlert from "../../Components/ErrorAlert/ErrorAlert";

const ResetPassword = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const history = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleNewPassword = async () => {
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
    }
  };

  if (isResetSuccess) {
    return (
      <LoginWrapper
      style={{
        margin:'6rem 0rem'
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
      margin:'6rem 0rem'
    }}
    >
      <LoginCard>
        <div className={classes.container}>
          <h1>Set new password</h1>
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
            inputType={"password"}
          />
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
            inputType={"password"}
          />
          <Button
            style={{ margin: "auto", marginTop: 30, marginBottom: 20 }}
            onPress={handleNewPassword}
            title={"Confirm Password"}
          />
        </div>
      </LoginCard>
      <ErrorAlert error={error} />
    </LoginWrapper>
  );
};

export default ResetPassword;
