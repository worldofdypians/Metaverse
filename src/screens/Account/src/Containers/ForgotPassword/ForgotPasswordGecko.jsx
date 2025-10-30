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

const ForgotPasswordGecko = ({ onResetPass, mintTitle }) => {
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
      // <div className={classes.containergecko}>
      //   <span className={classes.createplayertxt}>
      //     *We sent you a link at your email.
      //   </span>
      //   <span
      //     onClick={() => {
      //       onResetPass();
      //     }}
      //     className={classes.errorText2}
      //   >
      //     Back to Sign In
      //   </span>
      // </div>
      <div className={classes.containergecko}>
        <span className={classes.createplayertxt} style={{margin: 'auto'}}>
          *We sent you a link at your email. Check your inbox and reset your
          password. Then try to login again.
        </span>
        <div className="d-flex flex-column gap-3">
          <span className="footertxt-coingecko mt-1">
            Users who have claimed the {mintTitle} NFT are required to create a
            WOD Account to receive the NFT and participate in the exclusive
            event.
          </span>
          <div className="summaryseparator"></div>
       
        <div className="d-flex align-items-center justify-content-between gap-3">
          <span
            onClick={() => {
              onResetPass();
            }}
            className={classes.errorText2}
          >
         {"<   Back"}
          </span>

          <Button
            type={"coingecko"}
            onPress={() => {
              onResetPass();
            }}
            title={"Continue  >"}
          />
        </div> </div>
      </div>
    );
  }

  return (
    <div className={classes.containergecko}>
      <span className={classes.createplayertxt}>
        *Please enter your email address in the field below. After submitting,
        the password reset link will be sent to your inbox.
      </span>
      <Input
        type={"coingecko"}
        placeHolder="Email"
        value={email}
        onChange={onChangeEmail}
      />

      <span className="footertxt-coingecko mt-1">
        Users who have claimed the {mintTitle} NFT are required to create a WOD
        Account to receive the NFT and participate in the exclusive event.
      </span>
      <div className="summaryseparator"></div>
      <div className="d-flex align-items-center gap-2 justify-content-between">
        <span
          onClick={() => {
            onResetPass();
          }}
          className={classes.errorText2}
          style={{ width: "fit-content" }}
        >
          {"<   Back"}
        </span>
        <Button
          type={"coingecko"}
          onPress={handleEmail}
          title={"Continue  >"}
        />
      </div>
    </div>

    //   <ErrorAlert error={error} />
  );
};

export default ForgotPasswordGecko;
