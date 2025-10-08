import { useEffect, useState } from "react";
import "./_whitelistcontent.scss";

import getFormattedNumber from "../../Caws/functions/get-formatted-number";

import Countdown from "react-countdown";

const Completionist = () => (
  <h6 className="rewardstxtwod mb-0" style={{ color: "#F3BF09" }}>
    00d:00h:00m
  </h6>
);

const renderer2 = ({ days, hours, minutes, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <h6 className="rewardstxtwod mb-0" style={{ color: "#F3BF09" }}>
        {days}D:{hours}H:{minutes}M
      </h6>
    );
  }
};

const WhitelistContent = ({
  isEOA,
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
  userClaimedTokens,
  totalVestedTokens,
  cliffTime,
  onTimerFinished,
  type,
}) => {
  const [timerFinished, settimerFinished] = useState(false);
  const [timerFinishedOTC, settimerFinishedOTC] = useState(false);
  const [timerFinishedOTC2, settimerFinishedOTC2] = useState(false);
  const [timerFinishedOTCBonus, settimerFinishedOTCBonus] = useState(false);
  const [timerFinishedOTCSpecial, settimerFinishedOTCSpecial] = useState(false);
  const [timerFinishedOTCSpecial4, settimerFinishedOTCSpecial4] =
    useState(false);
  const [timerFinishedOTCCliff, settimerFinishedOTCCliff] = useState(false);

  const [timerFinishedOTCPoolBonus, settimerFinishedOTCPoolBonus] =
    useState(false);

  const [timerFinishedOTCPoolDynamic, settimerFinishedOTCPoolDynamic] =
    useState(false);
  const [timerFinishedOTCPool2Dynamic, settimerFinishedOTCPool2Dynamic] =
    useState(false);
  const [timerFinishedOTCWodDynamic, settimerFinishedOTCWodDynamic] =
    useState(false);

  const [timerFinishedPrivate, settimerFinishedPrivate] = useState(false);
  const [timerFinishedKol, settimerFinishedKol] = useState(false);
  const [timerFinishedAdvisors, settimerFinishedAdvisors] = useState(false);

  const today = new Date();

  useEffect(() => {
    if (selectedRound) {
      if (selectedRound.id == "seed") {
        if (today.getTime() > cliffTime) {
          settimerFinished(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinished(true);
        }
      } else if (selectedRound.id == "otc") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTC(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTC(true);
        }
      } else if (selectedRound.id == "otc2") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTC2(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTC2(true);
        }
      } else if (selectedRound.id == "special-otc") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCSpecial(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCSpecial(true);
        }
      } else if (selectedRound.id == "special-otc-4") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCSpecial4(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCSpecial4(true);
        }
      } else if (selectedRound.id == "cliff-otc") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCCliff(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCCliff(true);
        }
      } else if (selectedRound.id == "pool-bonus") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCPoolBonus(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCPoolBonus(true);
        }
      } else if (selectedRound.id == "pool-dynamic") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCPoolDynamic(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCPoolDynamic(true);
        }
      } else if (selectedRound.id == "pool2-dynamic") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCPool2Dynamic(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCPool2Dynamic(true);
        }
      } else if (selectedRound.id == "wod-dynamic") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCWodDynamic(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCWodDynamic(true);
        }
      } else if (selectedRound.id == "bonus-otc") {
        if (today.getTime() > cliffTime) {
          settimerFinishedOTCBonus(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedOTCBonus(true);
        }
      } else if (selectedRound.id == "private") {
        if (today.getTime() > cliffTime) {
          settimerFinishedPrivate(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedPrivate(true);
        }
      } else if (selectedRound.id == "kol") {
        if (today.getTime() > cliffTime) {
          settimerFinishedKol(true);
          onTimerFinished(true);
        } else if (Number(userClaimedTokens) === 0) {
          settimerFinishedKol(true);
        }
      } else if (selectedRound.id == "advisors") {
        if (today.getTime() > cliffTime) {
          settimerFinishedAdvisors(true);
        }
        // else if (Number(userClaimedTokens) === 0) {
        //   settimerFinishedAdvisors(true);
        // }
      }
    }
  }, [selectedRound, userClaimedTokens, cliffTime]);

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
                <span className="whitelist-white-txt">
                  {selectedRound?.title}
                </span>
              </div>
            </div>
            {selectedRound?.tokenPrice && (
              <div className="whitelist-input-wrapper p-3">
                <div className="d-flex flex-column">
                  <span className="whitelist-green-txt">Token Price</span>
                  <span className="whitelist-white-txt">
                    $ {selectedRound?.tokenPrice}
                  </span>
                </div>
              </div>
            )}
            {selectedRound?.cliff && (
              <div className="whitelist-input-wrapper p-3">
                <div className="d-flex flex-column">
                  <span className="whitelist-green-txt">Cliff Period</span>
                  <span className="whitelist-white-txt">
                    {selectedRound?.cliff}
                  </span>
                </div>
              </div>
            )}
            <div className="whitelist-input-wrapper p-3">
              <div className="d-flex flex-column">
                <span className="whitelist-green-txt">Vesting Period</span>
                <span className="whitelist-white-txt">
                  {selectedRound?.vesting}
                </span>
              </div>
            </div>
          </div>
          <div className="new-whitelist-wrapper col-lg-7 d-flex flex-column gap-3 p-3 mt-4 mt-lg-0 justify-content-between">
            <div className="whitelist-input-wrapper d-flex flex-column gap-2">
              <div className="whitelist-input-upper-wrapper  d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center p-3 gap-2">
                  <img
                    src={"https://cdn.worldofdypians.com/wod/wodToken.png"}
                    alt=""
                    style={{ width: 32, height: 32 }}
                  />
                  <h6 className="mb-0 whitelist-wod-title">WOD</h6>
                </div>
                <div className="d-flex flex-column gap-1 p-3 whitelist-network-wrapper col-6 col-lg-5">
                  <span className="whitelist-network-span">Network</span>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                      alt=""
                    />
                    <h6 className="mb-0 whitelist-network-title">BNB Chain</h6>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 justify-content-between p-3">
                <span className="whitelist-balance-txt">
                  Available to claim
                </span>
                <span className="whitelist-balance-amount">
                  {getFormattedNumber(wodBalance)}{" "}
                  {selectedRound?.id == "pool-dynamic" ||
                  selectedRound?.id == "pool2-dynamic" ||
                  selectedRound?.id == "wod-dynamic"
                    ? "USD"
                    : "WOD"}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center w-100">
              {/* <img src={bridgeIcon} width={30} height={30} alt="" /> */}
            </div>
            <div className="whitelist-input-wrapper d-flex flex-column gap-2 p-3">
              <div className="d-flex align-items-center gap-2 justify-content-between">
                <div className="d-flex flex-column">
                  <span className="whitelist-upper-txt">
                    {getFormattedNumber(totalVestedTokens)}
                  </span>
                  <span className="whitelist-bottom-txt">
                    Total{" "}
                    {selectedRound?.id == "pool-dynamic" ||
                    selectedRound?.id == "pool2-dynamic" ||
                    selectedRound?.id == "wod-dynamic"
                      ? "USD"
                      : "WOD"}
                  </span>
                </div>

                <div className="d-flex flex-column">
                  <span className="whitelist-upper-txt">
                    {getFormattedNumber(userClaimedTokens, 2)}
                  </span>
                  <span className="whitelist-bottom-txt">WOD Withdrew</span>
                </div>
                {selectedRound?.id !== "pool-dynamic" &&
                  selectedRound?.id !== "pool2-dynamic" &&
                  selectedRound?.id !== "wod-dynamic" && (
                    <div className="d-flex flex-column">
                      <span className="whitelist-upper-txt">
                        {getFormattedNumber(
                          totalVestedTokens - userClaimedTokens
                        )}
                      </span>

                      <span className="whitelist-bottom-txt">
                        WOD Remaining
                      </span>
                    </div>
                  )}
              </div>

              <div className="whitelist-input-upper-wrapper p-2">
                <div className="d-flex align-items-center gap-2 justify-content-between">
                  <span className="whitelist-timer-txt">Next withdraw in</span>
                  <span className="whitelist-timer">
                    {" "}
                    {userClaimedTokens &&
                    Number(userClaimedTokens) > 0 &&
                    selectedRound?.id === "seed" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinished(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "otc" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTC(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "otc2" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTC2(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "special-otc" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCSpecial(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "special-otc-4" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCSpecial4(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "cliff-otc" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCCliff(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "pool-bonus" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCPoolBonus(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "pool-dynamic" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCPoolDynamic(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "pool2-dynamic" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCPool2Dynamic(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "wod-dynamic" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCWodDynamic(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "bonus-otc" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedOTCBonus(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "private" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedPrivate(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : userClaimedTokens &&
                      Number(userClaimedTokens) > 0 &&
                      selectedRound?.id === "kol" ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedKol(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : selectedRound?.id === "advisors" &&
                      isConnected &&
                      totalVestedTokens > 0 ? (
                      <Countdown
                        date={Number(cliffTime)}
                        renderer={renderer2}
                        onComplete={() => {
                          settimerFinishedAdvisors(true);
                          onTimerFinished(true);
                        }}
                      />
                    ) : (
                      <h6
                        className="rewardstxtwod mb-0"
                        style={{ color: "#F3BF09" }}
                      >
                        00d:00h:00m
                      </h6>
                    )}
                  </span>
                </div>
              </div>
            </div>
            {!isConnected && (
              <button className="connectbtn w-100 py-2" onClick={onConnect}>
                Connect Wallet
              </button>
            )}
            {isConnected && chainId !== 56 && (
              <button
                className="fail-button w-100 py-2"
                onClick={handleSwitchChain}
              >
                Switch to BNB Chain
              </button>
            )}
            {isConnected && chainId === 56 && selectedRound?.id === "seed" && (
              <button
                className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinished === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                disabled={
                  canClaim === false ||
                  timerFinished === false ||
                  Number(wodBalance) === 0 ||
                  !isEOA
                    ? true
                    : false
                }
                onClick={handleClaim}
              >
                {claimLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
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

            {isConnected && chainId === 56 && selectedRound?.id === "otc" && (
              <button
                className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTC === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                disabled={
                  canClaim === false ||
                  timerFinishedOTC === false ||
                  Number(wodBalance) === 0 ||
                  !isEOA
                    ? true
                    : false
                }
                onClick={handleClaim}
              >
                {claimLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
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

            {isConnected && chainId === 56 && selectedRound?.id === "otc2" && (
              <button
                className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTC2 === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                disabled={
                  canClaim === false ||
                  timerFinishedOTC2 === false ||
                  Number(wodBalance) === 0 ||
                  !isEOA
                    ? true
                    : false
                }
                onClick={handleClaim}
              >
                {claimLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "special-otc" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCSpecial === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCSpecial === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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
            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "special-otc-4" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCSpecial4 === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCSpecial4 === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "cliff-otc" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCCliff === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCCliff === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "pool-bonus" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCPoolBonus === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCPoolBonus === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "pool-dynamic" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCPoolDynamic === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCPoolDynamic === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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
            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "pool2-dynamic" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCPool2Dynamic === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCPool2Dynamic === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "wod-dynamic" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCWodDynamic === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCWodDynamic === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "bonus-otc" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedOTCBonus === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedOTCBonus === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "private" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedPrivate === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedPrivate === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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

            {isConnected && chainId === 56 && selectedRound?.id === "kol" && (
              <button
                className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedKol === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                disabled={
                  canClaim === false ||
                  timerFinishedKol === false ||
                  Number(wodBalance) === 0 ||
                  !isEOA
                    ? true
                    : false
                }
                onClick={handleClaim}
              >
                {claimLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
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

            {isConnected &&
              chainId === 56 &&
              selectedRound?.id === "advisors" && (
                <button
                  className={` w-100 py-2
                
                ${
                  ((claimStatus === "claimed" || claimStatus === "initial") &&
                    Number(wodBalance) === 0) ||
                  canClaim === false ||
                  timerFinishedAdvisors === false ||
                  !isEOA
                    ? "disabled-btn2"
                    : claimStatus === "failed"
                    ? "fail-button"
                    : claimStatus === "success"
                    ? "success-button"
                    : "connectbtn"
                }`}
                  disabled={
                    canClaim === false ||
                    timerFinishedAdvisors === false ||
                    Number(wodBalance) === 0 ||
                    !isEOA
                      ? true
                      : false
                  }
                  onClick={handleClaim}
                >
                  {claimLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-light"
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
            {isConnected && coinbase && !isEOA && (
              <span className="text-danger">
                Smart contract wallets are not supported for this action.
              </span>
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
                  <span className="user-whitelist-balance">Receive</span>
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
