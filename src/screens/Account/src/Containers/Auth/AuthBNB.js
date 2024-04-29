import React, { useState, useEffect } from "react";
import { LoginCard } from "../../Components/LoginCard";
import LoginCardBNB from "../../Components/LoginCard/LoginCardBNB";
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
import mediumLogo from "../../../../../assets/mediumLogo.svg";

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
  const { isAuthenticated, loginError, setLoginValues, playerId, email } =
    useAuth();

  const {
    data,
    refetch: refetchPlayer,
    loading: loadingPlayer,
  } = useQuery(GET_PLAYER, {
    fetchPolicy: "network-only",
  });

  const [value, setValue] = React.useState(1);
  const [playerCreation, setplayerCreation] = useState(false);
  const [forgotPassword, setforgotPassword] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const navigate = useNavigate();
  const [linkWallet, setLinkWallet] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [successLink, setsuccessLink] = useState(false);

  const [generateNonce, { loading: loadingGenerateNonce, data: dataNonce }] =
    useMutation(GENERATE_NONCE);
  const [verifyWallet, { loading: loadingVerify, data: dataVerify }] =
    useMutation(VERIFY_WALLET);

  useEffect(() => {
    if (isAuthenticated && !playerId) {
      setplayerCreation(true);
      setShowVerify(true);
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
      setShowVerify(true);
    }
  }, [data]);

  useEffect(() => {
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
    }
  }, [data, playerId, isAuthenticated, isLogin]);

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

  const handleManageLoginStates = () => {
    refetchPlayer();
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
      setsuccessLink(true);
      setTimeout(() => {
        // window.location.reload();
        navigate("/account");
      }, 3000);
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
    <div className="mx-0 container-nft w-100 container-fluid d-flex align-items-start px-0 px-lg-5 flex-column">
      <div className="d-flex flex-column container-lg gap-2 w-100">
        <div className="nft-page-wrapper bg-transparent d-flex flex-column flex-lg-row gap-3 mb-3">
          <div className="col-12 col-md-12 col-lg-8 mt-0 p-3 nft-page-wrapperbnb">
            <div className="d-flex justify-content-end buttonwrapper-bnb-alliance">
              <a
                href="https://medium.com/@worldofdypians"
                target="_blank"
                rel="noreferrer"
                className="d-flex gap-2 align-items-center medium-btn-bnb px-3 py-1"
              >
                <img src={mediumLogo} alt="" /> Create Account Tutorial
              </a>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-4 mt-0 px-0 px-lg-2">
            <div style={{ margin: "auto" }}>
              <LoginCardBNB
                containerStyles={{
                  height: 500,
                }}
                cardStyles={{
                  height:
                    linkWallet === true || value === 0 ? "100%" : "fit-content",
                }}
              >
                {successLink === false && (
                  <div className="mt-3">
                    <ul class="timeline m-0 p-0" id="timeline">
                      <li class="col-3 li complete">
                        <div class="status">
                          <span className="text-white statusIndex">1</span>
                          <h4 className="listtext"> Register </h4>
                        </div>
                      </li>
                      <li class={`col-3 li ${showVerify && "complete"} `}>
                        <div class="status">
                          <span className="text-white statusIndex">2</span>
                          <h4 className="listtext"> Verify </h4>
                        </div>
                      </li>
                      <li class={`col-3 li ${playerCreation && "complete"} `}>
                        <div class="status">
                          <span className="text-white statusIndex">3</span>
                          <h4 className="listtext"> Profile </h4>
                        </div>
                      </li>
                      <li
                        class={`col-2 li ${linkWallet && "complete"}`}
                        style={{ width: 0 }}
                      >
                        <div class="status">
                          <span className="text-white statusIndex">4</span>
                          <h4
                            className="listtext"
                            style={{
                              width: 0,
                              whiteSpace: "nowrap",
                              left: "-17px",
                            }}
                          >
                            Link Wallet
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {playerCreation === true ? (
                  <PlayerCreationBNB
                    linkWallet={linkWallet}
                    onLinkWallet={handleLinkWallet}
                    successLink={successLink}
                    onShowLinkWallet={() => {
                      setLinkWallet(true);
                    }}
                  />
                ) : playerCreation === false && forgotPassword === true ? (
                  <ForgotPasswordBNB
                    onSuccess={() => {
                      setforgotPassword(false);
                      handleChange("click", 0);
                    }}
                  />
                ) : (
                  <>
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
                          handleGoToSignup={() => {
                            handleChange("click", 1);
                          }}
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
                        handleGoToLogin={() => {
                          handleChange("click", 0);
                        }}
                        onShowVerify={(value) => {
                          setShowVerify(value);
                        }}
                      />
                    )}
                  </>
                )}
              </LoginCardBNB>
              <ErrorAlert error={loginError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBNB;
