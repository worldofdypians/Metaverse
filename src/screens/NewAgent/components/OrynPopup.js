import React, { useEffect, useState } from "react";
import "../_aiagent.scss";
import { handleSwitchNetworkhook } from "../../../hooks/hooks";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <h6
      className="mb-0 oryn-lock-amount"
      style={{ color: "#F3BF09", fontSize: "18px" }}
    >
      {days}D : {hours}H : {minutes}M
    </h6>
  );
};

const OrynPopup = ({
  onClose,
  isConnected,
  handleApprove,
  handleDeposit,
  handleWithdraw,
  startWithdrawTimer,
  depositLoading,
  depositStatus,
  depositAmount,
  errorMsg,
  withdrawTimer,
  approvedAmount,
  withdrawLoading,
  withdrawStatus,
  errorMsg3,
  handleConnectWallet,
  chainId,
  handleSwitchNetwork,
  premiumOryn,
  hasStartedTimer,
  checkTimer,
  getWithdrawTimer,
  unlockLoading,
  unlockStatus
}) => {
  const benefits = [
    "No chat restrictions",
    "Faster responses and assistance",
    "Early access to new features",
    "Detailed stats and analytics",
    "Insights beyond World of Dypians",
    "Smarter and more interactive",
  ];

  const handleEthPool = async () => {
    await handleSwitchNetworkhook("0x38")
      .then(() => {
        handleSwitchNetwork(56);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if(Number(withdrawTimer) !== Number(0)){
      setTimer(true)
    }
  }, [withdrawTimer])
    
  console.log(withdrawTimer, "timer");
  

  return (
    <div className="oryn-popup-wrapper popup-active p-3">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <h6 className="mb-0 oryn-popup-title">Oryn Premium</h6>
        <img
          src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
          alt="close"
          style={{ cursor: "pointer" }}
          width={20}
          height={20}
          onClick={onClose}
        />
      </div>
      <p className="oryn-popup-desc mt-3">
        Lock WOD to access premium features for as long as your tokens remains
        locked. Withdrawals are subject to a 30-day unbounding period.
      </p>
      <div className="oryn-popup-benefits-wrapper p-3">
        <div className="d-flex flex-column gap-3">
          <span className="oryn-benefits-title">Premium Features</span>
          <div className="d-flex flex-column gap-2">
            {benefits.map((item, index) => (
              <div className="d-flex align-items-center gap-1" key={index}>
                <div className="oryn-green-dot"></div>
                <span className="oryn-popup-desc">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="oryn-lock-wrapper mt-3 p-3 d-flex align-items-center justify-content-between"
        style={{ background: premiumOryn && "rgba(113, 127, 255, 0.1)" }}
      >
        <span className="oryn-lock-title">
          {premiumOryn ? "Locked" : "You're about to lock"}
        </span>
        <h6
          className="mb-0 oryn-lock-amount"
          style={{ color: premiumOryn && "#F3BF09" }}
        >
          10,000 WOD
        </h6>
      </div>
      <div className="d-flex mt-3 w-100 justify-content-center">
        {premiumOryn && Number(withdrawTimer) === Number(0) && !hasStartedTimer ? (
          <button
          className={`${
            unlockStatus === "fail"
              ? "reverse-btn"
              : unlockStatus === "success"
              ? "action-btn"
              : "explore-btn"
          } px-3 py-2`}
          disabled={
            unlockLoading ||
            unlockStatus === "fail" ||
            unlockStatus === "success"
          }
            onClick={() => {
              startWithdrawTimer();
              checkTimer();
            }}
          >
             {unlockLoading ? (
              <div
                class="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : unlockStatus === "fail" ? (
              <>
                <img alt="" />
                Failed
              </>
            ) : unlockStatus === "success" ? (
              <>Success</>
            ) : (
              <>Unlock</>
            )}
          </button>
        )
        : premiumOryn && Number(withdrawTimer) === Number(0) && hasStartedTimer ? (
          <button
            className={`${
              withdrawStatus === "failed"
                ? "reverse-btn"
                : withdrawStatus === "success"
                ? "action-btn"
                : "explore-btn"
            } px-3 py-2`}
            disabled={
              withdrawLoading ||
              withdrawStatus === "failed" ||
              withdrawStatus === "success"
            }
            onClick={() => {
              handleWithdraw();
            }}
          >
            {withdrawLoading ? (
              <div
                class="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : withdrawStatus === "failed" ? (
              <>
                <img alt="" />
                Failed
              </>
            ) : withdrawStatus === "success" ? (
              <>Success</>
            ) : (
              <>Withdraw</>
            )}
          </button>
        )
        : premiumOryn && Number(withdrawTimer) !== Number(0) || hasStartedTimer ? (
          <div
            className="oryn-lock-wrapper  p-3 d-flex align-items-center justify-content-between w-100"
            style={{ background: "rgba(113, 127, 255, 0.1)" }}
          >
            <span className="oryn-lock-title">You can withdaw in</span>
            <Countdown
              renderer={renderer}
              date={Date.now() + withdrawTimer * 1000}
              onComplete={() => {
                checkTimer();
                getWithdrawTimer();
              }}
            />
          </div>
        )  : (
          <button
            className={`${
              !isConnected || chainId !== 56 || depositStatus === "fail"
                ? "reverse-btn"
                : depositStatus === "success"
                ? "action-btn"
                : "explore-btn"
            } px-3 py-2`}
            onClick={() => {
              !isConnected
                ? handleConnectWallet()
                : isConnected && chainId !== 56
                ? handleEthPool()
                : depositStatus === "deposit"
                ? handleDeposit()
                : depositStatus === "initial"
                ? handleApprove()
                : console.log("");
            }}
            disabled={depositLoading || depositStatus === "fail" || depositStatus === "success"}
          >
            {!isConnected ? (
              <>Connect Wallet</>
            ) : isConnected && chainId !== 56 ? (
              <>Switch to BNB Chain</>
            ) : depositLoading ? (
              <div
                class="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : depositStatus === "initial" ? (
              <>Approve</>
            ) : depositStatus === "deposit" ? (
              <>Deposit</>
            ) : depositStatus === "success" ? (
              <>Success</>
            ) : (
              <>Failed</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrynPopup;
