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
import successLogo from '../../Images/userProfile/successLogo.svg';

function PlayerCreationBNB({ onLinkWallet, linkWallet, successLink, onShowLinkWallet }) {
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
        onShowLinkWallet()
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
    <div className="d-flex flex-column h-100">
      <div className={`d-flex flex-column gap-3 align-items-center h-100`}>
        {(showLinkWallet === true || linkWallet === true) && successLink === false && (
          <div className="d-flex flex-column gap-2 w-100 px-3">
            <h4 className={classes.create_acc_bnb}>Link Wallet</h4>
            <span className={classes.createplayertxt2}>
              Make sure to connect your wallet, as it will be associated with
              your game account. This connection is essential for accessing
              in-game assets, making transactions, and participating in the
              game's economy.
            </span>
            <div className="summaryseparator my-2"></div>
            <div className="position-relative px-0 w-100">
              <div className="d-flex flex-column justify-content-between gap-2 align-items-start">
                <div
                  className="walletconnectBtn m-0 w-100"
                  onClick={onLinkWallet}
                >
                  <div className="d-flex gap-2 justify-content-between align-items-center">
                    <div className="d-flex gap-2 align-items-center">
                      <img src={walletImg} alt="" />
                      <div className="d-flex flex-column">
                        <span className="secondTitle">Connect wallet</span>

                        <span className="firsttitle">Link your wallet</span>
                      </div>
                    </div>
                    <img src={circleArrow} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showLinkWallet === false && linkWallet === false && successLink === false &&  (
          <div className={`${classes.containerbnb} w-100 align-items-center`}>
            <div className="d-flex flex-column gap-3">
              <h4 className={classes.create_acc_bnb}>Create Profile</h4>
              <span className={classes.createplayertxt2}>
                Please create a username that will be associated with your game
                account. This username will be used to identify you in the game
                and will be visible to other players. Choose a unique username
                that reflects your personality or gaming style.
              </span>
              <div className="d-flex flex-column w-100 gap-1">
                <h6 className={classes.labelBNB}>Username*</h6>
                <Input
                  autocomplete="off"
                  name="displayName"
                  placeHolder="Display name"
                  value={displayName}
                  onChange={setDisplayName}
                  type={"coingecko"}
                />
              </div>
              <div className="d-flex flex-column w-100 gap-1">
                <h6 className={classes.labelBNB}>Password*</h6>
                <Input
                  name="player-password"
                  inputType="password"
                  placeHolder="Password"
                  value={password}
                  onChange={setPassword}
                  type={"coingecko"}
                />
              </div>
              <div className="summaryseparator"></div>
            </div>
            <Button
              onPress={_onCreatePlayer}
              title={"Continue"}
              // loading={loading}
              type={"primary2"}
            />
          </div>
        )}
        {successLink === true && <div className="d-flex flex-column gap-3 align-items-center h-100 justify-content-center">
          <img src={successLogo} alt='' />
          <h6 className={classes.successmsg}>Congratulations!</h6>
          <h6 className={classes.bottomGroup_graytxt}>You have successfully created your game account</h6>
          </div>}
      </div>

      <ErrorAlert error={createError} />
    </div>
  );
}

export default PlayerCreationBNB;
