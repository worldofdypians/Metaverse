import React, { useState } from "react";
import "./_whitelistcontent.scss";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { shortAddress } from "../../Caws/functions/shortAddress";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import ethIcon from "../assets/eth.svg";
import bnbIcon from "../assets/bnb.svg";
import wodIcon from "../../../screens/Wod/Bridge/assets/wodIcon.svg";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Montserrat",
    fontSize: "14px",
    color: "#fff",
    background: "#272450",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Montserrat",
      fontSize: "14px",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Montserrat",
      fontSize: "14px",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const WhitelistContent = ({
  isConnected,
  chainId,
  coinbase,
  onConnect,
  handleSwitchChain,
  wodBalance,
  handleClaim,
  claimStatus,
  claimLoading,
  startedVesting,
  canClaim,
  selectedRound,
}) => {
  const [timerFinished, settimerFinished] = useState(false);

  return (
    <div
      className="whitelist-ecosystem-wrapper py-5 position-relative d-flex justify-content-center align-items-center mb-5"
      id="whitelist"
    >
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center gap-3">
          <div className="d-flex flex-column gap-3 col-lg-2">
            <div className="whitelist-input-wrapper p-3">
              <div className="d-flex flex-column">
                <span className="whitelist-green-txt">Token Distribution</span>
                <span className="whitelist-white-txt">{selectedRound?.title}</span>
              </div>
            </div>
            <div className="whitelist-input-wrapper p-3">
              <div className="d-flex flex-column">
                <span className="whitelist-green-txt">Token Price</span>
                <span className="whitelist-white-txt">$ {selectedRound?.tokenPrice}</span>
              </div>
            </div>
            <div className="whitelist-input-wrapper p-3">
              <div className="d-flex flex-column">
                <span className="whitelist-green-txt">Cliff Period</span>
                <span className="whitelist-white-txt">{selectedRound?.cliff}</span>
              </div>
            </div>
            <div className="whitelist-input-wrapper p-3">
              <div className="d-flex flex-column">
                <span className="whitelist-green-txt">Vesting Period</span>
                <span className="whitelist-white-txt">{selectedRound?.vesting}</span>
              </div>
            </div>
          </div>
          <div className="new-whitelist-wrapper col-lg-7 d-flex flex-column gap-3 p-3 mt-4 mt-lg-0">
            <div className="whitelist-input-wrapper d-flex flex-column gap-2">
              <div className="whitelist-input-upper-wrapper  d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center p-3 gap-2">
                  <img src={wodIcon} alt="" />
                  <h6 className="mb-0 whitelist-wod-title">WOD</h6>
                </div>
                <div className="d-flex flex-column gap-1 p-3 whitelist-network-wrapper col-6 col-lg-5">
                  <span className="whitelist-network-span">Network</span>
                  <div className="d-flex align-items-center gap-2">
                    <img src={bnbIcon} alt="" />
                    <h6 className="mb-0 whitelist-network-title">BNB Chain</h6>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 justify-content-between p-3">
                <span className="whitelist-balance-txt">
                  Available to claim
                </span>
                <span className="whitelist-balance-amount">
                  {getFormattedNumber(wodBalance)} WOD
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center w-100">
              {/* <img src={bridgeIcon} width={30} height={30} alt="" /> */}
            </div>
            <div className="whitelist-input-wrapper d-flex flex-column gap-2 p-3">
              <div className="d-flex align-items-center gap-2 justify-content-between">
                <div className="d-flex flex-column">
                  <span className="whitelist-upper-txt">26,548,220</span>
                  <span className="whitelist-bottom-txt">Total WOD</span>
                </div>

                <div className="d-flex flex-column">
                  <span className="whitelist-upper-txt">250,000</span>
                  <span className="whitelist-bottom-txt">WOD Withdrew</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="whitelist-upper-txt">25,200,850</span>
                  <span className="whitelist-bottom-txt">WOD Remaining</span>
                </div>
              </div>
              <div className="whitelist-input-upper-wrapper p-2">
                <div className="d-flex align-items-center gap-2 justify-content-between">
                  <span className="whitelist-timer-txt">Next withdraw in</span>
                  <span className="whitelist-timer">22D:12H:56M</span>
                </div>
              </div>
            </div>
            {!isConnected && (
              <button className="connectbtn w-100 py-2" onClick={onConnect}>
                Connect Wallet
              </button>
            )}
            {isConnected && chainId !== 56 && chainId !== 97 && (
              <button
                className="fail-button w-100 py-2"
                onClick={handleSwitchChain}
              >
                Switch to BNB Chain
              </button>
            )}
            {isConnected && (chainId === 56 || chainId === 97) && (
              <button
                className={`connectbtn w-100 py-2
                
                ${
                  claimStatus === "claimed" &&
                  claimStatus === "initial" &&
                  (startedVesting === false ||
                    canClaim === false ||
                    timerFinished === false)
                    ? "disabled-btn"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : null
                }`}
                // disabled={
                //   startedVesting === false ||
                //   canClaim === false ||
                //   timerFinished === false
                //     ? true
                //     : false
                // }
                onClick={handleClaim}
              >
                {claimLoading ? (
                  <div
                    class="spinner-border spinner-border-sm text-light"
                    role="status"
                  ></div>
                ) : claimStatus === "failed" ? (
                  <>Failed</>
                ) : claimStatus === "success" ? (
                  <>Success</>
                ) : (
                  <>Claim</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <div className="custom-container w-100">
        <div className="row mx-0">
          <div className="col-12 col-lg-6">
            <div className="whitelist-token-wrapper p-3">
              <div className="w-100 d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between gap-3 gap-lg-0">
                <div className="d-flex align-items-center gap-4">
                  <button
                    className={`${
                      sourceChainButton === "eth"
                        ? "whitelist-btn-active"
                        : "whitelist-btn-inactive"
                    } d-flex align-items-center gap-2 px-3 py-2`}
                    onClick={() => {
                      setsourceChainButton("eth");
                    }}
                  >
                    <img src={eth} alt="" />
                    Ethereum
                  </button>
                  <button
                    className={`${
                      sourceChainButton === "bnb"
                        ? "whitelist-btn-active"
                        : "whitelist-btn-inactive"
                    } d-flex align-items-center gap-2 px-3 py-2`}
                    onClick={() => {
                      setsourceChainButton("bnb");
                    }}
                  >
                    <img src={bnb} alt="" />
                    BNB Chain
                  </button>
                </div>
                {!isConnected ? (
                  <button
                    className="whitelist-wallet-btn d-flex align-items-center gap-2 px-3 py-2"
                    onClick={onConnect}
                  >
                    <img src={wallet} width={20} height={20} alt="" />
                    Connect Wallet
                  </button>
                ) : (
                  <span className="pool-whitelist-balance mb-0">
                    {shortAddress(coinbase)}
                  </span>
                )}
              </div>
              <div className="whitelist-balance-wrapper d-flex flex-column flex-lg-row p-2 mt-5 align-items-start align-items-lg-center justify-content-between gap-3 gap-lg-0">
                <span className="user-whitelist-balance">
                  Balance: {getFormattedNumber(wodBalance, 2)} WOD
                </span>
                <h6 className="pool-whitelist-balance mb-0">
                  Ethereum Pool: 2,300,000.00 WOD
                </h6>
              </div>
              <div className="whitelist-balance-wrapper p-2 mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="user-whitelist-balance">Deposit</span>
                  <img src={tooltip} alt="" />
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <StyledTextField
                      // error={businessErrors.business_name ? true : false}
                      size="small"
                      label="Amount"
                      id="business_name"
                      name="business_name"
                      value={depositAmount}
                      // helperText={businessErrors.business_name}
                      // required
                      onChange={(e) => {
                        setdepositAmount(e.target.value);
                      }}
                      sx={{ width: "100%" }}
                    />
                    <button className="max-deposit-btn px-2">Max</button>
                  </div>
                  <button
                    className="whitelist-btn-inactive d-flex align-items-center gap-2 px-3 py-2"
                    style={{ height: "37px" }}
                  >
                    Approve
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-3 w-100">
                  <span className="user-whitelist-balance">
                    Please approve before deposit
                  </span>
                </div>
              </div>
              <div className="d-flex w-100 justify-content-center mt-5">
                 
              </div>
              <div className="mt-5 d-flex flex-column gap-2">
                <span className="user-whitelist-balance">Withdraw</span>
                <div className="d-flex align-items-center gap-4">
                  <button
                    className={`${
                      sourceChainButton === "bnb"
                        ? "whitelist-btn-active"
                        : "whitelist-btn-inactive"
                    } d-flex align-items-center gap-2 px-3 py-2`}
                  >
                    <img src={eth} alt="" />
                    Ethereum
                  </button>
                  <button
                    className={`${
                      sourceChainButton === "eth"
                        ? "whitelist-btn-active"
                        : "whitelist-btn-inactive"
                    } d-flex align-items-center gap-2 px-3 py-2`}
                  >
                    <img src={bnb} alt="" />
                    BNB Chain
                  </button>
                </div>
              </div>
              <div className="whitelist-balance-wrapper p-2 mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="user-whitelist-balance">Recieve</span>
                  <img src={tooltip} alt="" />
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center gap-2">
                    <StyledTextField
                      // error={businessErrors.business_name ? true : false}
                      size="small"
                      label="Enter Deposit TX Hash"
                      id="business_name"
                      name="business_name"
                      value={txHash}
                      // helperText={businessErrors.business_name}
                      // required
                      onChange={(e) => {
                        settxHash(e.target.value);
                      }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <button
                    className={
                      "whitelist-btn-inactive d-flex align-items-center gap-2 px-3 py-2"
                    }
                    style={{ height: "37px" }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="whitelist-token-wrapper p-3 h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
         
                <h6 className="whitelist-guide-title mb-0">
                  whitelist process guide
                </h6>
              </div>
              <hr className="whitelist-divider my-4" />
              <div className="d-flex flex-column justify-content-between gap-3">
                <div className="whitelist-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      isConnected
                        ? "whitelist-guide-pointer-active"
                        : "whitelist-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="whitelist-guide-item-title mb-0">
                      Connect wallet
                    </h6>
                    <span className="whitelist-guide-desc">
                      Connect your wallet in order to start using Dypius whitelist.
                      Your wallet chain will be associated as default.
                    </span>
                  </div>
                </div>
                <div className="whitelist-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      sourceChainButton !== ""
                        ? "whitelist-guide-pointer-active"
                        : "whitelist-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="whitelist-guide-item-title mb-0">
                      Select chains
                    </h6>
                    <span className="whitelist-guide-desc">
                      Select desired whitelist chains at “FROM” and “TO” sections.
                      To change the "FROM” chain you need to change it in your
                      wallet.
                    </span>
                  </div>
                </div>
                <div className="whitelist-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      depositAmount !== "" && depositAmount > 0
                        ? "whitelist-guide-pointer-active"
                        : "whitelist-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="whitelist-guide-item-title mb-0">
                      Fill in amount
                    </h6>
                    <span className="whitelist-guide-desc">
                      Check your balance and fill in the desired amount you want
                      to whitelist. You can use “Max” button to fill in the maximum
                      amount.
                    </span>
                  </div>
                </div>
                <div className="whitelist-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      status === "successApprove"
                        ? "whitelist-guide-pointer-active"
                        : "whitelist-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="whitelist-guide-item-title mb-0">
                      Approve deposit
                    </h6>
                    <span className="whitelist-guide-desc">
                      Approve the transaction and then deposit the assets. These
                      steps need confirmation in your wallet.
                    </span>
                  </div>
                </div>
                <div className="whitelist-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      status === "successDeposit"
                        ? "whitelist-guide-pointer-active"
                        : "whitelist-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="whitelist-guide-item-title mb-0">
                      Deposit tokens
                    </h6>
                    <span className="whitelist-guide-desc">
                      Confirm the transaction and deposit the assets into the
                      whitelist contract. This step needs confirmation in your
                      wallet.
                    </span>
                  </div>
                </div>
                <div className="whitelist-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      txHash !== ""
                        ? "whitelist-guide-pointer-active"
                        : "whitelist-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="whitelist-guide-item-title mb-0">
                      Fill in transaction hash
                    </h6>
                    <span className="whitelist-guide-desc">
                      After successful deposit, fill in the transaction hash and
                      switch your wallet to the chosen whitelist network.
                    </span>
                  </div>
                </div>
                <div className="whitelist-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      status === "successWithdraw"
                        ? "whitelist-guide-pointer-active"
                        : "whitelist-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="whitelist-guide-item-title mb-0">
                      Switch to destination chain. Wait timer & withdraw
                    </h6>
                    <span className="whitelist-guide-desc">
                      Firstly go to your wallet and switch into the chain you
                      want to withdraw from. Wait for the timer to end and and
                      click withdraw button to receive the assets in the desired
                      chain.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default WhitelistContent;
