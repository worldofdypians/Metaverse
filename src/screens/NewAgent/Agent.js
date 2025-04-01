import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Loader, useProgress } from "@react-three/drei";
import AgentHero from "./AgentHero/AgentHero";
import soundOn from "./assets/soundOn.svg";
import soundOff from "./assets/soundOff.svg";
import eyeClosed from "./assets/eyeClosed.svg";
import { UI } from "./UI";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import OrynPopup from "./components/OrynPopup";
import Web3 from "web3";
import { ethers } from "ethers";

const Agent = ({
  email,
  coinbase,
  handleConnectWallet,
  isConnected,
  premiumOryn,
  chainId,
  handleSwitchNetwork,
  checkPremiumOryn,
  walletClient,
  publicClient,
  network_matchain,
  binanceW3WProvider,
}) => {
  let { reward_token_wod, BigNumber } = window;
  const [playAudio, setPlayAudio] = useState(false);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [sound, setSound] = useState(false);
  const [tries, setTries] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popup, setPopup] = useState(false);
  const [depositLoading, setdepositLoading] = useState(false);
  const [depositStatus, setdepositStatus] = useState("initial");
  const [depositAmount, setdepositAmount] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [withdrawTimer, setWithdrawTimer] = useState(0);
  const [approvedAmount, setapprovedAmount] = useState("0.00");
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const [withdrawStatus, setwithdrawStatus] = useState("initial");
  const [unlockLoading, setUnlockLoading] = useState(false);
  const [unlockStatus, setUnlockStatus] = useState("initial");
  const [errorMsg3, seterrorMsg3] = useState("");
  const [hasStartedTimer, setHasStartedTimer] = useState(false);

  const windowSize = useWindowSize();

  const { progress, active } = useProgress();

  const checkApproval = async (amount) => {
    if (window.WALLET_TYPE === "matchId") {
      if (publicClient) {
        const result = await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: reward_token_wod._address,
            functionName: "allowance",
            args: [coinbase, window.config.oryn_premium_address],
          })
          .then((data) => {
            return Number(data);
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
        let result_formatted = new BigNumber(result).div(1e18).toFixed(6);

        if (
          Number(result_formatted) >= Number(amount) &&
          Number(result_formatted) !== 0
        ) {
          setdepositStatus("deposit");
        } else {
          setdepositStatus("initial");
        }
      }
    } else {
      const result = await window
        .checkapproveStakePool(
          coinbase,
          reward_token_wod._address,
          window.config.oryn_premium_address
        )
        .then((data) => {
          return data;
        });

      let result_formatted = new BigNumber(result).div(1e18).toFixed(6);

      if (
        Number(result_formatted) >= Number(amount) &&
        Number(result_formatted) !== 0
      ) {
        setdepositStatus("deposit");
      } else {
        setdepositStatus("initial");
      }
    }
  };

  const getApprovedAmount = async () => {
    if (window.WALLET_TYPE === "matchId") {
      if (publicClient) {
        const result = await publicClient
          .readContract({
            abi: window.TOKEN_ABI,
            address: reward_token_wod._address,
            functionName: "allowance",
            args: [coinbase, window.config.oryn_premium_address],
          })
          .then((data) => {
            return Number(data);
          })
          .catch((e) => {
            console.error(e);
            return 0;
          });
        let result_formatted = new BigNumber(result).div(1e18).toFixed(6);
        setapprovedAmount(result_formatted);
      }
    } else {
      const result = await window
        .checkapproveStakePool(
          coinbase,
          reward_token_wod._address,
          window.config.oryn_premium_address
        )
        .then((data) => {
          console.log(data);
          return data;
        });

      let result_formatted = new BigNumber(result).div(1e18).toFixed(6);
      setapprovedAmount(result_formatted);
    }
  };

  const handleApprove = async () => {
    setdepositLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      window.web3 = new Web3(window.ethereum);
      let amount = new BigNumber(10000).times(1e18).toFixed(0);
      await reward_token_wod
        .approve(window.config.oryn_premium_address, amount)
        .then(() => {
          setdepositLoading(false);
          setdepositStatus("deposit");
          getApprovedAmount();
        })
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          console.error(e);
          setTimeout(() => {
            setdepositAmount("");
            setdepositStatus("initial");
            seterrorMsg("");
          }, 10000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      let amount = new BigNumber(10000).times(1e18).toFixed(0);
      let reward_token_Sc = new ethers.Contract(
        reward_token_wod._address,
        window.TOKEN_ABI,
        binanceW3WProvider.getSigner()
      );

      const txResponse = await reward_token_Sc
        .approve(window.config.oryn_premium_address, amount)
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          console.error(e);
          setTimeout(() => {
            setdepositAmount("");
            setdepositStatus("initial");
            seterrorMsg("");
          }, 10000);
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setdepositLoading(false);
        setdepositStatus("deposit");
        getApprovedAmount();
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new BigNumber(10000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: reward_token_wod._address,
            abi: window.TOKEN_ABI,
            functionName: "approve",
            args: [window.config.oryn_premium_address, amount],
          })
          .catch((e) => {
            setdepositLoading(false);
            setdepositStatus("fail");
            seterrorMsg(e?.message);
            console.error(e);
            setTimeout(() => {
              setdepositAmount("");
              setdepositStatus("initial");
              seterrorMsg("");
            }, 10000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setdepositLoading(false);
            setdepositStatus("deposit");
            getApprovedAmount();
          }
        }
      }
    }
  };

  const handleDeposit = async (e) => {
    setdepositLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      window.web3 = new Web3(window.ethereum);
      const oryn_premium_contract = new window.web3.eth.Contract(
        window.ORYN_PREMIUM_ABI,
        window.config.oryn_premium_address
      );
      let amount = new BigNumber(10000).times(1e18).toFixed(0);
      await oryn_premium_contract.methods
        .deposit(amount)
        .send({
          from: coinbase,
        })
        .then(() => {
          setdepositLoading(false);
          setdepositStatus("success");
          getApprovedAmount();
          checkPremiumOryn(coinbase);
          setTimeout(() => {
            setdepositStatus("initial");
            setdepositAmount("");
          }, 5000);
        })
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          setTimeout(() => {
            setdepositAmount("");
            setdepositStatus("fail");
            seterrorMsg("");
          }, 5000);
        });
    } else if (window.WALLET_TYPE === "binance") {
      const oryn_premium_contract = new ethers.Contract(
        window.config.oryn_premium_address,
        window.ORYN_PREMIUM_ABI,
        binanceW3WProvider.getSigner()
      );
      let amount = new BigNumber(10000).times(1e18).toFixed(0);

      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await oryn_premium_contract
        .deposit(amount, { ...transactionParameters })
        .catch((e) => {
          setdepositLoading(false);
          setdepositStatus("fail");
          seterrorMsg(e?.message);
          setTimeout(() => {
            setdepositAmount("");
            setdepositStatus("fail");
            seterrorMsg("");
          }, 5000);
        });
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setdepositLoading(false);
        setdepositStatus("success");
        getApprovedAmount();
        checkPremiumOryn(coinbase);
        setTimeout(() => {
          setdepositStatus("initial");
          setdepositAmount("");
        }, 5000);
      }
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        let amount = new BigNumber(10000).times(1e18).toFixed(0);
        const result = await walletClient
          .writeContract({
            address: window.config.oryn_premium_address,
            abi: window.ORYN_PREMIUM_ABI,
            functionName: "deposit",
            args: [amount],
          })
          .catch((e) => {
            setdepositLoading(false);
            setdepositStatus("fail");
            seterrorMsg(e?.message);
            setTimeout(() => {
              setdepositAmount("");
              setdepositStatus("fail");
              seterrorMsg("");
            }, 5000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setdepositLoading(false);
            setdepositStatus("success");
            getApprovedAmount();
            checkPremiumOryn(coinbase);
            setTimeout(() => {
              setdepositStatus("initial");
              setdepositAmount("");
            }, 5000);
          }
        }
      }
    }
  };

  const startWithdrawTimer = async () => {
    setUnlockLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      window.web3 = new Web3(window.ethereum);
      const oryn_premium_contract = new window.web3.eth.Contract(
        window.ORYN_PREMIUM_ABI,
        window.config.oryn_premium_address
      );
      await oryn_premium_contract.methods
        .startUnlock()
        .send({
          from: coinbase,
        })
        .then(() => {
          setUnlockLoading(false);
          setUnlockStatus("success");
          checkTimer();
          setTimeout(() => {
            setUnlockStatus("initial");
            seterrorMsg("");
          }, 5000);
        })
        .catch((err) => {
          setUnlockLoading(false);
          setUnlockStatus("fail");
          setTimeout(() => {
            setUnlockStatus("initial");
            seterrorMsg("");
          }, 5000);
          return err;
        });
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: window.config.oryn_premium_address,
            abi: window.ORYN_PREMIUM_ABI,
            functionName: "startUnlock",
            args: [],
          })
          .catch((err) => {
            setUnlockLoading(false);
            setUnlockStatus("fail");
            setTimeout(() => {
              setUnlockStatus("initial");
              seterrorMsg("");
            }, 5000);
            return err;
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setUnlockLoading(false);
            setUnlockStatus("success");
            checkTimer();
            setTimeout(() => {
              setUnlockStatus("initial");
              seterrorMsg("");
            }, 5000);
          }
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      const oryn_premium_contract = new ethers.Contract(
        window.config.oryn_premium_address,
        window.ORYN_PREMIUM_ABI,
        binanceW3WProvider.getSigner()
      );

      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await oryn_premium_contract
        .startUnlock({ ...transactionParameters })
        .catch((err) => {
          setUnlockLoading(false);
          setUnlockStatus("fail");
          setTimeout(() => {
            setUnlockStatus("initial");
            seterrorMsg("");
          }, 5000);
          return err;
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setUnlockLoading(false);
        setUnlockStatus("success");
        checkTimer();
        setTimeout(() => {
          setUnlockStatus("initial");
          seterrorMsg("");
        }, 5000);
      }
    }
  };

  const getWithdrawTimer = async () => {
    const oryn_premium_contract = new window.bscWeb3.eth.Contract(
      window.ORYN_PREMIUM_ABI,
      window.config.oryn_premium_address
    );
    const result = await oryn_premium_contract.methods
      .getRemainingTime(coinbase)
      .call()
      .catch((err) => {
        return 0;
      });

    setWithdrawTimer(result);
  };
  const checkTimer = async () => {
    const oryn_premium_contract = new window.bscWeb3.eth.Contract(
      window.ORYN_PREMIUM_ABI,
      window.config.oryn_premium_address
    );

    const result = await oryn_premium_contract.methods
      .locks(coinbase)
      .call()
      .catch((err) => {
        return false;
      });

    setHasStartedTimer(result.isUnlockStarted);
  };

  const handleWithdraw = async (e) => {
    setwithdrawLoading(true);
    if (window.WALLET_TYPE !== "binance" && window.WALLET_TYPE !== "matchId") {
      window.web3 = new Web3(window.ethereum);
      const oryn_premium_contract = new window.web3.eth.Contract(
        window.ORYN_PREMIUM_ABI,
        window.config.oryn_premium_address
      );
      oryn_premium_contract.methods
        .withdraw()
        .send({
          from: coinbase,
        })
        .then(() => {
          setwithdrawLoading(false);
          setwithdrawStatus("success");
          setTimeout(() => {
            checkPremiumOryn(coinbase);
            setwithdrawStatus("initial");
            setPopup(false);
          }, 5000);
        })
        .catch((e) => {
          setwithdrawLoading(false);
          setwithdrawStatus("failed");
          seterrorMsg3(e?.message);

          setTimeout(() => {
            setwithdrawStatus("initial");
            seterrorMsg3("");
          }, 10000);
        });
    } else if (window.WALLET_TYPE === "matchId") {
      if (walletClient) {
        const result = await walletClient
          .writeContract({
            address: window.config.oryn_premium_address,
            abi: window.ORYN_PREMIUM_ABI,
            functionName: "withdraw",
            args: [],
          })
          .catch((e) => {
            setwithdrawLoading(false);
            setwithdrawStatus("failed");
            seterrorMsg3(e?.message);

            setTimeout(() => {
              setwithdrawStatus("initial");
              seterrorMsg3("");
            }, 10000);
          });

        if (result) {
          const receipt = await publicClient
            .waitForTransactionReceipt({
              hash: result,
            })
            .catch((e) => {
              console.error(e);
            });

          if (receipt) {
            setwithdrawLoading(false);
            setwithdrawStatus("success");
            setTimeout(() => {
              checkPremiumOryn(coinbase);
              setwithdrawStatus("initial");
              setPopup(false);
            }, 5000);
          }
        }
      }
    } else if (window.WALLET_TYPE === "binance") {
      const oryn_premium_contract = new ethers.Contract(
        window.config.oryn_premium_address,
        window.ORYN_PREMIUM_ABI,
        binanceW3WProvider.getSigner()
      );

      const gasPrice = await binanceW3WProvider.getGasPrice();
      console.log("gasPrice", gasPrice.toString());
      const currentGwei = ethers.utils.formatUnits(gasPrice, "gwei");
      const increasedGwei = parseFloat(currentGwei) + 1.5;
      console.log("increasedGwei", increasedGwei);

      // Convert increased Gwei to Wei
      const gasPriceInWei = ethers.utils.parseUnits(
        currentGwei.toString().slice(0, 16),
        "gwei"
      );

      const transactionParameters = {
        gasPrice: gasPriceInWei,
      };

      const txResponse = await oryn_premium_contract
        .withdraw({ ...transactionParameters })
        .catch((e) => {
          setwithdrawLoading(false);
          setwithdrawStatus("failed");
          seterrorMsg3(e?.message);

          setTimeout(() => {
            setwithdrawStatus("initial");
            seterrorMsg3("");
          }, 10000);
        });

      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setwithdrawLoading(false);
        setwithdrawStatus("success");
        setTimeout(() => {
          checkPremiumOryn(coinbase);
          setwithdrawStatus("initial");
          setPopup(false);
        }, 5000);
      }
    }
  };

  useEffect(() => {
    if (progress === 100 && !active) {
      setTimeout(() => setIsLoaded(true), 500); // Short delay to ensure stability
    }
  }, [progress, active]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (popup) {
      html.classList.add("hidescroll");
    } else {
      html.classList.remove("hidescroll");
    }
  }, [popup]);

  const fetchTries = async () => {
    try {
      const res = await axios.get(
        "https://api.worldofdypians.com/user-tries/",
        {
          params: { userId: coinbase },
        }
      );
      setTries(res.data.tries);
    } catch (error) {
      console.error("Error fetching tries:", error);
    }
  };

  useEffect(() => {
    if (coinbase && isConnected) {
      checkApproval(10000);
    }
  }, [popup, coinbase, isConnected, publicClient]);

  useEffect(() => {
    if (coinbase && isConnected) {
      getWithdrawTimer();
      fetchTries();
    }
  }, [coinbase, startWithdrawTimer, isConnected]);

  useEffect(() => {
    if (coinbase && isConnected) {
      checkTimer();
    }
  }, [coinbase, isConnected, startWithdrawTimer, getWithdrawTimer]);

  return (
    <>
      <div className="container-fluid d-flex bridge-mainhero-wrapper token-wrapper justify-content-center">
        <div className="d-flex flex-column w-100">
          <AgentHero
            openPopup={() => setPopup(true)}
            premiumOryn={premiumOryn}
          />
          <div
            className="container-fluid d-flex justify-content-center"
            style={{ position: "relative", bottom: "30px" }}
          >
            <div className="custom-container">
              <div className="row">
                {windowSize.width > 786 && (
                  <div className={`col-12 col-lg-4 ${!toggle && "d-none"}`}>
                    <div
                      className="canvas-wrapper position-relative"
                      style={{ border: !isLoaded && "0.5px solid #080b2a" }}
                    >
                      {toggle && (
                        <div
                          className="d-flex align-items-center gap-2 oryn-tags-holder
                       "
                        >
                          {premiumOryn && (
                            <div className="premium-oryn-tag d-flex align-items-center justify-content-center p-2">
                              Premium
                            </div>
                          )}
                          <div
                            className={`hide-oryn-btn d-flex align-items-center gap-2 p-2 ${
                              !isLoaded && "d-none"
                            } `}
                            onClick={() => setToggle(!toggle)}
                          >
                            <img src={eyeClosed} alt="eye-closed" /> Hide Oryn
                          </div>
                        </div>
                      )}
                      {sound ? (
                        <img
                          src={soundOn}
                          width={40}
                          height={40}
                          alt=""
                          onClick={() => setSound(!sound)}
                          style={{ cursor: "pointer" }}
                          className={`sound-button-position ${
                            !isLoaded && "d-none"
                          }`}
                        />
                      ) : (
                        <img
                          src={soundOff}
                          width={40}
                          height={40}
                          alt=""
                          onClick={() => setSound(!sound)}
                          style={{ cursor: "pointer" }}
                          className={`sound-button-position ${
                            !isLoaded && "d-none"
                          }`}
                        />
                      )}
                      {!isLoaded ? (
                        <div className="teleport-container">
                          <div className="line"></div>
                          <div className="line"></div>
                          <div className="line"></div>
                        </div>
                      ) : (
                        <Canvas
                          shadows
                          camera={{ position: [0, 0, 8], fov: 42 }}
                          style={{ height: "60vh", pointerEvents: "none" }}
                        >
                          <Experience
                            playAudio={playAudio}
                            setPlayAudio={setPlayAudio}
                            count={count}
                            audioFile={audioFile}
                            jsonFile={jsonFile}
                            sound={sound}
                          />
                        </Canvas>
                      )}
                    </div>
                  </div>
                )}
                <div
                  className={`col-12 ${
                    toggle ? "col-lg-8" : "col-lg-12"
                  } px-0 px-lg-2`}
                >
                  <UI
                    onPlay={(audio, json) => {
                      setPlayAudio(true);
                      setCount(count + 1);
                      setAudioFile(audio);
                      setJsonFile(json);
                    }}
                    toggle={toggle}
                    email={email}
                    sound={sound}
                    setTries={setTries}
                    handleToggle={() => setToggle(!toggle)}
                    tries={tries}
                    coinbase={coinbase}
                    handleConnectWallet={handleConnectWallet}
                    openPopup={() => setPopup(true)}
                    setPlayAudio={setPlayAudio}
                    premiumOryn={premiumOryn}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup && (
        <OutsideClickHandler onOutsideClick={() => setPopup(false)}>
          <OrynPopup
            onClose={() => setPopup(false)}
            isConnected={isConnected}
            handleApprove={handleApprove}
            handleDeposit={handleDeposit}
            startWithdrawTimer={startWithdrawTimer}
            depositLoading={depositLoading}
            depositStatus={depositStatus}
            depositAmount={depositAmount}
            errorMsg={errorMsg}
            withdrawTimer={withdrawTimer}
            approvedAmount={approvedAmount}
            withdrawLoading={withdrawLoading}
            withdrawStatus={withdrawStatus}
            errorMsg3={errorMsg3}
            handleConnectWallet={handleConnectWallet}
            chainId={chainId}
            handleSwitchNetwork={handleSwitchNetwork}
            premiumOryn={premiumOryn}
            handleWithdraw={handleWithdraw}
            hasStartedTimer={hasStartedTimer}
            checkTimer={checkTimer}
            getWithdrawTimer={getWithdrawTimer}
            unlockLoading={unlockLoading}
            unlockStatus={unlockStatus}
            network_matchain={network_matchain}
          />
        </OutsideClickHandler>
      )}
    </>
  );
};

export default Agent;
