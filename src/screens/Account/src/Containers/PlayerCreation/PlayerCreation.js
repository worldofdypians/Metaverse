/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import { getErrorMessage } from "../../Utils.js/Helpers";
import { CREATE_PLAYER } from "./PlayerCreation.schema";
import {
  Input,
  LoginCard,
  Button,
  LoginWrapper,
  ErrorAlert,
} from "../../Components";
import classes from "./PlayerCreation.module.css";
import { useNavigate } from "react-router-dom";

function PlayerCreation() {
  const { getUpdatedUser } = useAuth();

  const [onCreatePlayer, { loading }] = useMutation(CREATE_PLAYER);
  const [createError, setCreateError] = useState("");
  
  const [creationState, setCreationState] = useState({
    displayName: "",
    password: "",
  });

  const setPassword = (val) => {
    setCreationState((prev) => ({
      ...prev,
      password: val,
    }));
  };
  const setDisplayName = (val) => {
    const input = val;
    const validInput = /^[a-zA-Z0-9]+$/.test(input);

    if (validInput) {
      setCreationState((prev) => ({
        ...prev,
        displayName: val,
      }));
    }
    else if(!validInput) {
        setCreateError('Username can only contain letters and numbers.');
    }
    
  };

  const { displayName, password } = creationState;
  const navigate = useNavigate();

  const _onCreatePlayer = async () => {
    try {
      await onCreatePlayer({
        variables: {
          displayName: displayName,
          password: password,
        },
      });
      getUpdatedUser();
      setTimeout(() => {
        navigate("/account");
      }, 1000);
    } catch (error) {
      setCreateError(getErrorMessage(error));
    }
  };

 
  useEffect(() => {
    if (createError) {
      setCreateError("");
    }
  }, [creationState]);

  return (
    <LoginWrapper style={{ margin: "8rem 0" }}>
      <LoginCard>
        <div className={classes.container}>
        <h4 className={classes.playerCreationTitle}>Player Creation</h4>
          <form autocomplete="off">
            <Input
              autocomplete="off"
              name="displayName"
              style={{
                marginBottom: 24,
              }}
              placeHolder="Display name"
              value={displayName}
              onChange={setDisplayName}
            />
            <Input
              name="player-password"
              style={{
                marginBottom: 48,
              }}
              inputType="password"
              placeHolder="Password"
              value={password}
              onChange={setPassword}
            />
            <Button
              style={{ margin: "auto" }}
              onPress={_onCreatePlayer}
              title={"Continue"}
              loading={loading}
            />
          </form>
        </div>
      </LoginCard>
      <ErrorAlert error={createError} />
    </LoginWrapper>
  );
}

export default PlayerCreation;
