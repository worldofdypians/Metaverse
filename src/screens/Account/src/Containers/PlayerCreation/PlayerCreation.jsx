/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import { getErrorMessage } from "../../Utils.js/Helpers";
import { CREATE_PLAYER } from "./PlayerCreation.schema";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  Input,
  LoginCard,
  Button,
  LoginWrapper,
  ErrorAlert,
} from "../../Components";
import classes from "./PlayerCreation.module.css";
import { useNavigate } from "react-router-dom";

function PlayerCreation({ onPlayerSuccessfulCreate }) {
  const { getUpdatedUser } = useAuth();

  const [onCreatePlayer, { loading }] = useMutation(CREATE_PLAYER);
  const [createError, setCreateError] = useState("");

  const [creationState, setCreationState] = useState({
    displayName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
    } else if (!validInput) {
      setCreateError("Username can only contain letters and numbers.");
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
      // Update user auth data first
      await getUpdatedUser();
      // Refetch player data to ensure it's up to date
      onPlayerSuccessfulCreate()
      // Small delay to ensure state updates propagate
      setTimeout(() => {
        navigate("/account");
      }, 500);
    } catch (error) {
      setCreateError(getErrorMessage(error));
    }
  };

 
  useEffect(() => {
    if (createError) {
      setCreateError("");
    }
  }, [creationState]);

  useEffect(() => {
    const handleEnter = (event) => {
      if (event.key === "Enter" && displayName && password && !loading) {
        _onCreatePlayer();
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [displayName, password, loading]);

  return (
    <LoginWrapper style={{ margin: "6rem 0rem" }}>
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
            <div className="position-relative">
              <Input
                name="player-password"
                style={{
                  marginBottom: 48,
                }}
                inputType={showPassword ? "text" : "password"}
                placeHolder="Password"
                value={password}
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
