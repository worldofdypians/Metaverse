import React, { useState, useEffect } from "react";
import { LoginCard } from "../../Components/LoginCard";
import LoginWrapper from "../../Components/LoginWrapper/LoginWrapper";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ethers } from "ethers";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Utils.js/Auth/AuthDetails";
import ErrorAlert from "../../Components/ErrorAlert/ErrorAlert";
import SingUpBNB from "../SingUp/SignUpBNB";
import LoginBNB from "../Login/LoginBNB";
import PlayerCreationBNB from "../PlayerCreation/PlayerCreationBNB";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PLAYER } from "../Dashboard/Dashboard.schema";
import { useNavigate } from "react-router-dom";
import ForgotPasswordBNB from "../ForgotPassword/ForgotPasswordBNB";
import { GENERATE_NONCE, VERIFY_WALLET } from "../Dashboard/Dashboard.schema";
import axios from "axios";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 1,
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#F952B9",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 20,
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Poppins",
    "&.Mui-selected": {
      color: "#fff",
      background: "rgba(255, 255, 255, 0.1)",
      fontWeight: "bold",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function AuthBNB({
  isConnected,
  coinbase,
  handleConnect,
  isSuccess,
  onWalletLinkComplete,
}) {
  const { isAuthenticated, loginError, setLoginValues, playerId } = useAuth();

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const [value, setValue] = React.useState(0);
  const [playerCreation, setplayerCreation] = useState(false);
  const [forgotPassword, setforgotPassword] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const navigate = useNavigate();
  const [linkWallet, setLinkWallet] = useState(false);

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  useEffect(() => {
    if (isAuthenticated && !playerId) {
      setplayerCreation(true);
    }
  }, [isAuthenticated, playerId]);

  useEffect(() => {
    if (
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      !data.getPlayer.wallet
    ) {
      setLinkWallet(true);
      setplayerCreation(true);
    }
  }, [data]);

  useEffect(() => {
    if (dataNonce?.generateWalletNonce) {
      signWalletPublicAddress();
    }
  }, [dataNonce]);

  useEffect(() => {
    if (isSuccess === true && isConnected) {
      handleLinkWallet();
    }
  }, [isSuccess, isConnected]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLoginValues(() => {
      return {
        isLoginIn: false,
        loginError: null,
      };
    });
  };

  if (
    isAuthenticated &&
    playerId &&
    data &&
    data.getPlayer &&
    data.getPlayer.displayName &&
    data.getPlayer.playerId &&
    data.getPlayer.wallet &&
    data.getPlayer.wallet.publicAddress
  ) {
    return <Navigate to={"/account"} />;
  }

  const handleManageLoginStates = () => {
    if (
      isAuthenticated &&
      playerId &&
      data &&
      data.getPlayer &&
      data.getPlayer.displayName &&
      data.getPlayer.playerId &&
      data.getPlayer.wallet &&
      data.getPlayer.wallet.publicAddress
    ) {
      navigate("/account");
    } else if (isAuthenticated && !playerId) {
      setplayerCreation(true);
    }
  };

  const handleLinkWallet = async () => {
    if (isConnected) {
      await generateNonce({
        variables: {
          publicAddress: coinbase,
        },
      });
    } else {
      handleConnect();
    }
  };

  const handleFirstTask = async (wallet) => {
    const result = await axios
      .get(
        `https://api.worldofdypians.com/api/airdrop-alliance/task1/${wallet}`
      )
      .catch((e) => {
        console.error(e);
      });
    if (result && result.status === 200) {
      console.log(result);
      navigate("/account");
    }
  };

  const signWalletPublicAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(coinbase);
      const signature = await signer.signMessage(
        `Signing one-time nonce: ${dataNonce?.generateWalletNonce?.nonce}`
      );
      verifyWallet({
        variables: {
          publicAddress: coinbase,
          signature: signature,
        },
      }).then(() => {
        onWalletLinkComplete();
        handleFirstTask(coinbase);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // if (isAuthenticated && !playerId) {
  //   return <Navigate to={"/player"} />;
  // }

  // if (!playerId) {
  //   return <Navigate to={"/player"} />;
  // }

  return (
    <>
      {playerCreation === true ? (
        <PlayerCreationBNB
          linkWallet={linkWallet}
          onLinkWallet={handleLinkWallet}
        />
      ) : playerCreation === false && forgotPassword === true ? (
        <ForgotPasswordBNB
          onSuccess={() => {
            setforgotPassword(false);
            handleChange("click", 0);
          }}
        />
      ) : (
        <LoginWrapper style={{ margin: "5rem 0" }}>
          <LoginCard
            containerStyles={{
              height: 500,
            }}
            cardStyles={{
              height: 470,
            }}
          >
            <StyledTabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="styled tabs example"
            >
              <StyledTab label="Sign In" />
              <StyledTab label="Create Account" />
            </StyledTabs>
            {value === 0 &&
              playerCreation === false &&
              forgotPassword === false && (
                <LoginBNB
                  onForgetPassword={() => {
                    setforgotPassword(true);
                  }}
                  onLoginTry={() => {
                    setisLogin(true);
                  }}
                  onSuccessLogin={handleManageLoginStates}
                />
              )}

            {value === 1 && playerCreation === false && (
              <SingUpBNB
                onUserExists={() => {
                  handleChange("click", 0);
                }}
                onVerifySuccess={() => {
                  setplayerCreation(true);
                }}
                isLogin={isLogin}
              />
            )}
          </LoginCard>
          <ErrorAlert error={loginError} />
        </LoginWrapper>
      )}
    </>
  );
}

export default AuthBNB;
