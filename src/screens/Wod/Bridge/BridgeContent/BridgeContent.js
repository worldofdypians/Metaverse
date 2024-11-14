import React, { useState } from "react";
import "./_bridgecontent.scss";
import eth from "../../../../components/Header/assets/eth.svg";
import bnb from "../../../../components/Header/assets/bnb.svg";
import wallet from "../../../../assets/wodAssets/wallet.svg";
import tooltip from "../../../../assets/wodAssets/tooltip.svg";
import bridgeSwitch from "../../../../assets/wodAssets/bridgeSwitch.svg";
import bridgeGuide from "../../../../assets/wodAssets/bridgeGuide.svg";
import copy from "../../../../assets/wodAssets/copy.svg";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { shortAddress } from "../../../Caws/functions/shortAddress";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import bridgeIcon from "../assets/bridgeIcon.svg";
import ethIcon from "../assets/ethIcon.svg";
import bnbIcon from "../assets/bnbIcon.svg";
import wodIcon from "../assets/wodIcon.svg";

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

const BridgeContent = ({
  isConnected,
  chainId,
  coinbase,
  onConnect,
  handleSwitchChain,
  wodBalance,
}) => {
  const [sourceChainButton, setsourceChainButton] = useState("");
  const [depositAmount, setdepositAmount] = useState("");
  const [status, setstatus] = useState("");
  const [txHash, settxHash] = useState("");

  return (
    <div
      className="ecosystem-wrapper position-relative d-flex justify-content-center align-items-center"
      id="bridge"
    >
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center">
            <div className="new-bridge-wrapper d-flex flex-column gap-3 p-3 mt-4 mt-lg-0">
            <div className="bridge-input-wrapper d-flex flex-column gap-2">
                <div className="bridge-input-upper-wrapper  d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-3 gap-2">
                    <img src={wodIcon} alt="" />
                    <h6 className="mb-0 bridge-wod-title">WOD</h6>
                  </div>
                  <div className="d-flex flex-column gap-1 p-3 bridge-network-wrapper col-6 col-lg-5">
                    <span className="bridge-network-span">Network</span>
                    <div className="d-flex align-items-center gap-2">
                      <img src={bnbIcon} alt="" />
                      <h6 className="mb-0 bridge-network-title">BNB Chain</h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center gap-2">
                    <button className="bridge-max-btn">MAX</button>
                    <input
                      type="number"
                      className="bridge-amount-input"
                      placeholder="0"
                    />
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <span className="bridge-balance-span">Balance</span>
                    <span className="bridge-balance">2,500,000 WOD</span>
                  </div>
                </div>
              </div>
                  <div className="d-flex justify-content-center w-100">
                  <img src={bridgeIcon} width={30} height={30} alt="" />
                  </div>
              <div className="bridge-input-wrapper d-flex flex-column gap-2">
                <div className="bridge-input-upper-wrapper  d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center p-3 gap-2">
                    <img src={wodIcon} alt="" />
                    <h6 className="mb-0 bridge-wod-title">WOD</h6>
                  </div>
                  <div className="d-flex flex-column gap-1 p-3 bridge-network-wrapper col-6 col-lg-5">
                    <span className="bridge-network-span">Network</span>
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="mb-0 bridge-network-title">Coming Soon</h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between p-3">
                    <input
                      type="number"
                      className="bridge-amount-input"
                      placeholder="0"
                    />
                  <div className="d-flex flex-column gap-1">
                    <span className="bridge-balance-span">Balance</span>
                    <span className="bridge-balance">2,500,000 WOD</span>
                  </div>
                </div>
              </div>
              <button className="outline-btn-disabled w-100 py-2" disabled>Coming Soon</button>
            </div>
        </div>
      </div>
      {/* <div className="custom-container w-100">
        <div className="row mx-0">
          <div className="col-12 col-lg-6">
            <div className="bridge-token-wrapper p-3">
              <div className="w-100 d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between gap-3 gap-lg-0">
                <div className="d-flex align-items-center gap-4">
                  <button
                    className={`${
                      sourceChainButton === "eth"
                        ? "bridge-btn-active"
                        : "bridge-btn-inactive"
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
                        ? "bridge-btn-active"
                        : "bridge-btn-inactive"
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
                    className="bridge-wallet-btn d-flex align-items-center gap-2 px-3 py-2"
                    onClick={onConnect}
                  >
                    <img src={wallet} width={20} height={20} alt="" />
                    Connect Wallet
                  </button>
                ) : (
                  <span className="pool-bridge-balance mb-0">
                    {shortAddress(coinbase)}
                  </span>
                )}
              </div>
              <div className="bridge-balance-wrapper d-flex flex-column flex-lg-row p-2 mt-5 align-items-start align-items-lg-center justify-content-between gap-3 gap-lg-0">
                <span className="user-bridge-balance">
                  Balance: {getFormattedNumber(wodBalance, 2)} WOD
                </span>
                <h6 className="pool-bridge-balance mb-0">
                  Ethereum Pool: 2,300,000.00 WOD
                </h6>
              </div>
              <div className="bridge-balance-wrapper p-2 mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="user-bridge-balance">Deposit</span>
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
                    className="bridge-btn-inactive d-flex align-items-center gap-2 px-3 py-2"
                    style={{ height: "37px" }}
                  >
                    Approve
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-3 w-100">
                  <span className="user-bridge-balance">
                    Please approve before deposit
                  </span>
                </div>
              </div>
              <div className="d-flex w-100 justify-content-center mt-5">
                <img src={bridgeSwitch} alt="" />
              </div>
              <div className="mt-5 d-flex flex-column gap-2">
                <span className="user-bridge-balance">Withdraw</span>
                <div className="d-flex align-items-center gap-4">
                  <button
                    className={`${
                      sourceChainButton === "bnb"
                        ? "bridge-btn-active"
                        : "bridge-btn-inactive"
                    } d-flex align-items-center gap-2 px-3 py-2`}
                  >
                    <img src={eth} alt="" />
                    Ethereum
                  </button>
                  <button
                    className={`${
                      sourceChainButton === "eth"
                        ? "bridge-btn-active"
                        : "bridge-btn-inactive"
                    } d-flex align-items-center gap-2 px-3 py-2`}
                  >
                    <img src={bnb} alt="" />
                    BNB Chain
                  </button>
                </div>
              </div>
              <div className="bridge-balance-wrapper p-2 mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="user-bridge-balance">Recieve</span>
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
                      "bridge-btn-inactive d-flex align-items-center gap-2 px-3 py-2"
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
            <div className="bridge-token-wrapper p-3 h-100">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={bridgeGuide} alt="" />
                <h6 className="bridge-guide-title mb-0">
                  Bridge process guide
                </h6>
              </div>
              <hr className="bridge-divider my-4" />
              <div className="d-flex flex-column justify-content-between gap-3">
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      isConnected
                        ? "bridge-guide-pointer-active"
                        : "bridge-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Connect wallet
                    </h6>
                    <span className="bridge-guide-desc">
                      Connect your wallet in order to start using Dypius Bridge.
                      Your wallet chain will be associated as default.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      sourceChainButton !== ""
                        ? "bridge-guide-pointer-active"
                        : "bridge-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Select chains
                    </h6>
                    <span className="bridge-guide-desc">
                      Select desired bridge chains at “FROM” and “TO” sections.
                      To change the "FROM” chain you need to change it in your
                      wallet.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      depositAmount !== "" && depositAmount > 0
                        ? "bridge-guide-pointer-active"
                        : "bridge-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Fill in amount
                    </h6>
                    <span className="bridge-guide-desc">
                      Check your balance and fill in the desired amount you want
                      to bridge. You can use “Max” button to fill in the maximum
                      amount.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      status === "successApprove"
                        ? "bridge-guide-pointer-active"
                        : "bridge-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Approve deposit
                    </h6>
                    <span className="bridge-guide-desc">
                      Approve the transaction and then deposit the assets. These
                      steps need confirmation in your wallet.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      status === "successDeposit"
                        ? "bridge-guide-pointer-active"
                        : "bridge-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Deposit tokens
                    </h6>
                    <span className="bridge-guide-desc">
                      Confirm the transaction and deposit the assets into the
                      bridge contract. This step needs confirmation in your
                      wallet.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      txHash !== ""
                        ? "bridge-guide-pointer-active"
                        : "bridge-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Fill in transaction hash
                    </h6>
                    <span className="bridge-guide-desc">
                      After successful deposit, fill in the transaction hash and
                      switch your wallet to the chosen bridge network.
                    </span>
                  </div>
                </div>
                <div className="bridge-guide-item d-flex align-items-center gap-2">
                  <div
                    className={
                      status === "successWithdraw"
                        ? "bridge-guide-pointer-active"
                        : "bridge-guide-pointer-inactive"
                    }
                  ></div>
                  <div className="d-flex flex-column">
                    <h6 className="bridge-guide-item-title mb-0">
                      Switch to destination chain. Wait timer & withdraw
                    </h6>
                    <span className="bridge-guide-desc">
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

export default BridgeContent;
