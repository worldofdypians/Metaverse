import React, { useState } from "react";
import getFormattedNumber from "../../../Caws/functions/get-formatted-number";
import { shortAddress } from "../../../Caws/functions/shortAddress";
import moreinfo from "../assets/more-info.svg";
import Tooltip from "@material-ui/core/Tooltip";

const StakingWod = ({ selectedTab, chainId, is_wallet_connected }) => {
  const [token_balance, settoken_balance] = useState(0);
  const [pendingDivs, setpendingDivs] = useState("");
  const [cliffTime, setcliffTime] = useState("");
  const [stakingTime, setstakingTime] = useState("");
  const [depositedTokens, setdepositedTokens] = useState("");
  const [reInvestLoading, setreInvestLoading] = useState(false);
  const [reInvestStatus, setreInvestStatus] = useState("initial");
  const [depositAmount, setdepositAmount] = useState("");
  const [withdrawAmount, setwithdrawAmount] = useState("");
  const [depositLoading, setdepositLoading] = useState(false);
  const [depositStatus, setdepositStatus] = useState("initial");
  const [claimLoading, setclaimLoading] = useState(false);
  const [claimStatus, setclaimStatus] = useState("initial");
  const [withdrawLoading, setwithdrawLoading] = useState(false);
  const [withdrawStatus, setwithdrawStatus] = useState("initial");

  return (
    <div className="staking-pool-wrapper p-3">
      <div className="d-flex gap-3 align-items-center">
        {selectedTab === "deposit" ? (
          <div className="d-flex flex-column w-100 gap-2">
            <div className="d-flex align-items-center gap-2 justify-content-between w-100">
              <span className="deposit-popup-txt">Deposit</span>
              <div className="d-flex gap-1 align-items-baseline">
                <span className="bal-smallTxt">My Balance:</span>
                <span className="bal-bigTxt">
                  {token_balance !== "..."
                    ? getFormattedNumber(token_balance, 6)
                    : getFormattedNumber(0, 6)}{" "}
                  {token_symbol}
                </span>
              </div>
            </div>
            <div
              className={`d-flex flex-column w-100 gap-1 ${
                (chainId !== "1" || !is_wallet_connected) && "blurrypool"
              } `}
            >
              <div className="position-relative w-100 d-flex">
                <input
                  className="text-input2 w-100"
                  type="number"
                  autoComplete="off"
                  value={
                    Number(depositAmount) > 0 ? depositAmount : depositAmount
                  }
                  onChange={(e) => {
                    setdepositAmount(e.target.value);
                    checkApproval(e.target.value);
                  }}
                  name="amount_deposit"
                  id="amount_deposit"
                  key="amount_deposit"
                  placeholder={`0.0`}
                />
                <button
                  className="inner-max-btn position-absolute"
                  onClick={handleSetMaxDeposit}
                >
                  Max
                </button>
              </div>
              <div
                className={`d-flex w-100 ${
                  errorMsg ? "justify-content-between" : "justify-content-end"
                } gap-1 align-items-center`}
              >
                {errorMsg && <h6 className="errormsg m-0">{errorMsg}</h6>}
                <div className="d-flex gap-1 align-items-baseline">
                  <span className="bal-smallTxt">Approved:</span>
                  <span className="bal-bigTxt2">{approvedAmount} DYP</span>
                </div>
              </div>
            </div>
            <div className="info-pool-wrapper p-3 w-100">
              <div className="d-flex w-100 justify-content-between align-items-start align-items-lg-center gap-2 flex-column flex-lg-row">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-2">
                    <span className="bal-smallTxt">Pool Cap:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      1M DYP
                      <ClickAwayListener onClickAway={poolCapClose}>
                        <Tooltip
                          open={poolCapTooltip}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          placement="top"
                          title={
                            <div className="tooltip-text">
                              {
                                "The maximum amount of funds that can be staked in the pool."
                              }
                            </div>
                          }
                        >
                          <img src={moreinfo} alt="" onClick={poolCapOpen} />
                        </Tooltip>
                      </ClickAwayListener>
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="bal-smallTxt">Available Quota:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      {getFormattedNumber(availableQuota, 2)} DYP
                      <ClickAwayListener onClickAway={quotaClose}>
                        <Tooltip
                          open={quotaTooltip}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          placement="top"
                          title={
                            <div className="tooltip-text">
                              {
                                "The remaining capacity for staking in the pool."
                              }
                            </div>
                          }
                        >
                          <img src={moreinfo} alt="" onClick={quotaOpen} />
                        </Tooltip>
                      </ClickAwayListener>
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="bal-smallTxt">Maximum deposit:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      N/A
                      <ClickAwayListener onClickAway={maxDepositClose}>
                        <Tooltip
                          open={maxDepositTooltip}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          placement="top"
                          title={
                            <div className="tooltip-text">
                              {
                                "The highest amount that can be staked by an individual user."
                              }
                            </div>
                          }
                        >
                          <img src={moreinfo} alt="" onClick={maxDepositOpen} />
                        </Tooltip>
                      </ClickAwayListener>
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="bal-smallTxt">Total Est. Rewards</span>
                  <span className="deposit-popup-txt d-flex align-items-center gap-1">
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      {getFormattedNumber(
                        getApproxReturn(
                          depositAmount,
                          lockTime === "No Lock" ? 365 : lockTime
                        ),
                        2
                      )}{" "}
                      DYP
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {pendingDivs > 0 && (
              <>
                {" "}
                <div className="separator my-2"></div>
                <span className="deposit-popup-txt">Reinvest</span>
                <div
                  className={`d-flex flex-column w-100 gap-1 ${
                    (chainId !== "1" || !is_wallet_connected) && "blurrypool"
                  } `}
                >
                  <div className="info-pool-wrapper p-3 w-100">
                    <div className="d-flex w-100 justify-content-between align-items-end gap-2">
                      <div className="d-flex flex-column align-items-baseline">
                        <span className="bal-smallTxt">Rewards</span>
                        <span className="bal-bigTxt2">
                          {getFormattedNumber(pendingDivs, 5)} DYP
                        </span>
                      </div>
                      <button
                        className={`btn py-2 claim-inner-btn ${
                          (reInvestStatus === "claimed" &&
                            reInvestStatus === "initial") ||
                          pendingDivs <= 0
                            ? "disabled-btn"
                            : reInvestStatus === "failed"
                            ? "fail-button"
                            : reInvestStatus === "success"
                            ? "success-button"
                            : null
                        } d-flex justify-content-center align-items-center gap-2`}
                        style={{ height: "fit-content" }}
                        onClick={handleReinvest}
                        disabled={
                          reInvestStatus === "claimed" ||
                          reInvestStatus === "success" ||
                          pendingDivs <= 0
                            ? true
                            : false
                        }
                      >
                        {" "}
                        {reInvestLoading ? (
                          <div
                            class="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : reInvestStatus === "failed" ? (
                          <>
                            {/* <img src={failMark} alt="" /> */}
                            Failed
                          </>
                        ) : reInvestStatus === "success" ? (
                          <>Success</>
                        ) : (
                          <>Reinvest</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>{" "}
              </>
            )}
            <div className="separator my-2"></div>
            <div className="info-pool-wrapper p-3 w-100">
              <div className="d-flex w-100 flex-column flex-lg-row justify-content-between align-items-start align-items-lg-end gap-2">
                <div className="d-flex flex-column">
                  <span className="deposit-popup-txt">Summary</span>

                  <div className="d-flex align-items-center gap-2">
                    <span className="bal-smallTxt">Pool fee:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      {fee}%
                      <ClickAwayListener onClickAway={poolFeeClose}>
                        <Tooltip
                          open={poolFeeTooltip}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          placement="top"
                          title={
                            <div className="tooltip-text">
                              {
                                "The percentage of staking rewards or deposits for maintaining the pool."
                              }
                            </div>
                          }
                        >
                          <img src={moreinfo} alt="" onClick={poolFeeOpen} />
                        </Tooltip>
                      </ClickAwayListener>
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="bal-smallTxt">Pool address:</span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${window.config.etherscan_baseURL}/address/${staking?._address}`}
                      className="stats-link2"
                    >
                      {shortAddress(staking?._address)}{" "}
                      <img src={statsLinkIcon} alt="" />
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-1">
                    <span className="bal-smallTxt">Start date:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      07 Jun 2024{" "}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <span className="bal-smallTxt">End date:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      {expiration_time}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {is_wallet_connected && chainId === "1" && (
              <button
                disabled={
                  depositAmount === "" ||
                  depositLoading === true ||
                  canDeposit === false
                    ? true
                    : false
                }
                className={`btn filledbtn ${
                  ((depositAmount === "" && depositStatus === "initial") ||
                    canDeposit === false) &&
                  "disabled-btn"
                }  ${
                  depositStatus === "deposit" || depositStatus === "success"
                    ? "success-button"
                    : depositStatus === "fail"
                    ? "fail-button"
                    : null
                } d-flex justify-content-center align-items-center gap-2 m-auto`}
                onClick={() => {
                  depositStatus === "deposit"
                    ? handleStake()
                    : depositStatus === "initial" && depositAmount !== ""
                    ? handleApprove()
                    : console.log("");
                }}
                style={{ width: "fit-content" }}
              >
                {" "}
                {depositLoading ? (
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
        ) : (
          <div className="d-flex flex-column w-100 gap-2">
            <div className="d-flex align-items-center gap-2 justify-content-between w-100">
              <span className="deposit-popup-txt">Withdraw</span>
              <div className="d-flex gap-1 align-items-baseline">
                <span className="bal-smallTxt">Deposited:</span>
                <span className="bal-bigTxt">
                  {" "}
                  {getFormattedNumber(depositedTokens, 2)} {token_symbol}
                </span>
              </div>
            </div>
            <div
              className={`d-flex flex-column w-100 gap-1 ${
                (chainId !== "1" || !is_wallet_connected) && "blurrypool"
              } `}
            >
              <div className="position-relative w-100 d-flex">
                <input
                  className="text-input2 w-100"
                  type="number"
                  autoComplete="off"
                  value={withdrawAmount}
                  onChange={(e) => setwithdrawAmount(e.target.value)}
                  name="amount_withdraw"
                  id="amount_withdraw"
                  key="amount_withdraw"
                  placeholder={`0.0`}
                />
                <button
                  className="inner-max-btn position-absolute"
                  onClick={handleSetMaxWithdraw}
                >
                  Max
                </button>
              </div>
              <div className="d-flex w-100 justify-content-between gap-1 align-items-center">
                {errorMsg3 && <h6 className="errormsg m-0">{errorMsg3}</h6>}
                {!moment
                  .duration(
                    (Number(stakingTime) + Number(cliffTime)) * 1000 -
                      Date.now()
                  )
                  .humanize(true)
                  ?.includes("ago") && (
                  <div className="d-flex gap-1 align-items-baseline">
                    <span className="bal-smallTxt">Unlocks:</span>
                    <span className="bal-bigTxt2">
                      ~
                      {moment
                        .duration(
                          (Number(stakingTime) + Number(cliffTime)) * 1000 -
                            Date.now()
                        )
                        .humanize(true)}
                    </span>
                  </div>
                )}
              </div>
              <button
                disabled={
                  withdrawStatus === "failed" ||
                  withdrawStatus === "success" ||
                  withdrawAmount === "" ||
                  canWithdraw === false
                    ? true
                    : false
                }
                className={`btn filledbtn ${
                  withdrawStatus === "failed"
                    ? "fail-button"
                    : withdrawStatus === "success"
                    ? "success-button"
                    : (withdrawAmount === "" && withdrawStatus === "initial") ||
                      canWithdraw === false
                    ? "disabled-btn"
                    : null
                } w-25 d-flex align-items-center justify-content-center m-auto`}
                style={{ height: "fit-content" }}
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
                  <>Failed</>
                ) : withdrawStatus === "success" ? (
                  <>Success</>
                ) : (
                  <>Withdraw</>
                )}
              </button>
            </div>
            <div className="separator my-2"></div>

            <span className="deposit-popup-txt">Earnings</span>
            <div
              className={`d-flex flex-column w-100 gap-1 ${
                (chainId !== "1" || !is_wallet_connected) && "blurrypool"
              } `}
            >
              <div className="info-pool-wrapper p-3 w-100">
                <div className="d-flex w-100 justify-content-between align-items-end gap-2">
                  <div className="d-flex flex-column align-items-baseline">
                    <span className="bal-smallTxt">Rewards</span>
                    <span className="bal-bigTxt2">
                      {getFormattedNumber(pendingDivs, 5)} DYP
                    </span>
                  </div>
                  <button
                    className={`btn py-2 claim-inner-btn ${
                      (claimStatus === "claimed" &&
                        claimStatus === "initial") ||
                      pendingDivs <= 0
                        ? "disabled-btn"
                        : claimStatus === "failed"
                        ? "fail-button"
                        : claimStatus === "success"
                        ? "success-button"
                        : null
                    } d-flex justify-content-center align-items-center gap-2`}
                    style={{ height: "fit-content" }}
                    onClick={handleClaimDivs}
                    disabled={
                      claimStatus === "claimed" ||
                      claimStatus === "success" ||
                      pendingDivs <= 0
                        ? true
                        : false
                    }
                  >
                    {" "}
                    {claimLoading ? (
                      <div
                        class="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : claimStatus === "failed" ? (
                      <>Failed</>
                    ) : claimStatus === "success" ? (
                      <>Success</>
                    ) : (
                      <>Claim</>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="separator my-2"></div>
            <div className="info-pool-wrapper p-3 w-100">
              <div className="d-flex w-100 flex-column flex-lg-row justify-content-between align-items-start align-items-lg-end gap-2">
                <div className="d-flex flex-column">
                  <span className="deposit-popup-txt">Summary</span>

                  <div className="d-flex align-items-center gap-2">
                    <span className="bal-smallTxt">Pool fee:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      {fee}%
                      <ClickAwayListener onClickAway={poolFeeClose}>
                        <Tooltip
                          open={poolFeeTooltip}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          placement="top"
                          title={
                            <div className="tooltip-text">
                              {
                                "The percentage of staking rewards or deposits for maintaining the pool."
                              }
                            </div>
                          }
                        >
                          <img src={moreinfo} alt="" onClick={poolFeeOpen} />
                        </Tooltip>
                      </ClickAwayListener>
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="bal-smallTxt">Pool address:</span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${window.config.etherscan_baseURL}/address/${staking?._address}`}
                      className="stats-link2"
                    >
                      {shortAddress(staking._address)}{" "}
                      <img src={statsLinkIcon} alt="" />
                    </a>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center gap-1">
                    <span className="bal-smallTxt">Start date:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      07 Jun 2024{" "}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <span className="bal-smallTxt">End date:</span>
                    <span className="deposit-popup-txt d-flex align-items-center gap-1">
                      {expiration_time}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StakingWod;
