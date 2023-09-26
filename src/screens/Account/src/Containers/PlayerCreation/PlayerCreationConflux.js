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

function PlayerCreationConflux({ onSuccessCreation, mintTitle }) {
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
    setCreationState((prev) => ({
      ...prev,
      displayName: val,
    }));
  };

  const { displayName, password } = creationState;

  const _onCreatePlayer = async () => {
    try {
      await onCreatePlayer({
        variables: {
          displayName: displayName,
          password: password,
        },
      });
      getUpdatedUser();
      onSuccessCreation();
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
    <div className="d-flex h-100">
      <div className={classes.containergecko}>
        {/* <form autocomplete="off"> */}
        <span className={classes.createplayertxt}>
          *Create the username that will be associated to your game account.
        </span>
        <Input
          autocomplete="off"
          name="displayName"
          placeHolder="Display name"
          value={displayName}
          onChange={setDisplayName}
          type={"coingecko"}
        />
        <Input
          name="player-password"
          inputType="password"
          placeHolder="Password"
          value={password}
          onChange={setPassword}
          type={"coingecko"}
        />{" "}
        <span className="footertxt-coingecko mt-1">
          Users who have claimed the {mintTitle} NFT are required to
          create a WoD Account to receive the NFT and participate in the
          exclusive event.
        </span>
        <div className="summaryseparator"></div>
        <Button
          onPress={_onCreatePlayer}
          title={"Continue  >"}
          loading={loading}
          type={"coingecko"}
        />
        {/* </form> */}
      </div>

      <ErrorAlert error={createError} />
    </div>
  );
}

export default PlayerCreationConflux;
