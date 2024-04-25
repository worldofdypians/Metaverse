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
import defaultAvatar from "../../Images/userProfile/default-avatar.png";
import walletImg from "../../Images/userProfile/wallet.svg";
import circleArrow from "../../Images/userProfile/arrow-circle.svg";
import greenCheck from "../../Images/userProfile/greenCheck.svg";

function PlayerCreationBNB({ onLinkWallet, linkWallet }) {
  const { getUpdatedUser } = useAuth();

  const [onCreatePlayer, { loading }] = useMutation(CREATE_PLAYER);
  const [createError, setCreateError] = useState("");
  const [showLinkWallet, setShowLinkWallet] = useState(false);

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
      getUpdatedUser();
      setTimeout(() => {
        // navigate("/account");
        setShowLinkWallet(true);
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
    <LoginWrapper style={{ marginTop: "3rem" }}>
      <div className="container-lg">
        <div
          className="d-flex flex-column gap-3 align-items-center m-auto"
          style={{ width: "fit-content" }}
        >
          {(showLinkWallet === true || linkWallet === true) && (
            <div className="d-flex flex-column gap-2">
              <h5 className="d-flex align-items-center gap-2 text-white">
                <img src={greenCheck} alt="" /> Link your wallet to finish game
                account setup
              </h5>
              <div className="position-relative px-0 w-100">
                <div className={`user-cardImg`}>
                  <div className={`bordereddiv`}>
                    <div className="d-flex flex-column justify-content-between gap-2 align-items-start">
                      <div className="d-flex gap-2 justify-content-between align-items-center w-100">
                        <div className="d-flex align-items-center gap-2 w-100">
                          <img
                            src={defaultAvatar}
                            alt=""
                            className="userAvatar"
                          />
                          <div className="d-flex flex-column gap-1">
                            <span className="usernametext font-organetto">
                              Start your journey now!
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="walletconnectBtn m-0 w-100"
                        onClick={onLinkWallet}
                      >
                        <div className="d-flex gap-2 justify-content-between align-items-center">
                          <div className="d-flex gap-2 align-items-center">
                            <img src={walletImg} alt="" />
                            <div className="d-flex flex-column">
                              <span className="secondTitle">
                                Connect wallet
                              </span>

                              <span className="firsttitle">
                                Link your wallet
                              </span>
                            </div>
                          </div>
                          <img src={circleArrow} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`bordereddiv border-0 `}>
                    <div
                      className={`d-flex flex-column flex-xxl-row flex-lg-row  align-items-center gap-2 ${"justify-content-start p-2"} `}
                    >
                      <p className="walletassoc-txt m-0">
                        *There is no wallet address associated with your game
                        account.
                        <br /> Link your wallet to finish setup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showLinkWallet === false && linkWallet === false && (
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
          )}
        </div>
      </div>
      <ErrorAlert error={createError} />
    </LoginWrapper>
  );
}

export default PlayerCreationBNB;
