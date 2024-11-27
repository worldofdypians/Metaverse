<div className="container-lg p-0">
<div className="whitelist-banner d-flex flex-column flex-lg-row p-4 gap-3 gap-lg-0 align-items-center mb-4">
  <div className="col-12 col-lg-4">
    <div className="d-flex flex-column gap-3">
      <h6 className="migration-banner-title mb-0">
        WOD Token Whitelist
      </h6>
      <p className="migration-banner-desc mb-0">
        Join now to secure your spot and be among the first to unlock
        unique benefits within the World of Dypians ecosystem.
      </p>
      <a
        href="https://www.worldofdypians.com/tokenomics"
        target="_blank"
        rel="noreferrer"
        className="btn filledbtn"
        style={{ width: "fit-content" }}
      >
        Tokenomics
      </a>
    </div>
  </div>
  <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
    <div className="position-relative d-flex align-items-center flex-column">
      <div className="commiting-wrapper p-3">
        <div className="d-flex flex-column gap-2">
          <span className="commiting-amount">
            ${getFormattedNumber(totalCommitmentValue)}
          </span>
          <span className="migration-status-text-2">
            Total Committed Value
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="whitelist-info-grid">
  <div className="whitelist-info-item p-3 d-flex flex-column gap-1 align-items-start">
    <span className="whitelist-info-span">Token Distribution</span>
    <h6 className="mb-0 whitelist-info-title">Private Round</h6>
  </div>
  <div className="whitelist-info-item p-3 d-flex flex-column gap-1 align-items-start">
    <span className="whitelist-info-span">Token Price</span>
    <h6 className="mb-0 whitelist-info-title">$0.0325</h6>
  </div>
  <div className="whitelist-info-item p-3 d-flex flex-column gap-1 align-items-start">
    <span className="whitelist-info-span">
      Fully Diluted Valuation
    </span>
    <h6 className="mb-0 whitelist-info-title">$42,500,000</h6>
  </div>
  <div className="whitelist-info-item p-3 d-flex flex-column gap-1 align-items-start">
    <span className="whitelist-info-span d-flex align-items-center justify-content-between w-100">
      Cliff/Vesting Period
      <Tooltip
        title={
          <>
            <div className="d-flex flex-column gap-2">
              <span className="whitelist-tooltip-content-text">
                6% TGE unlock, followed by 3 months cliff and 16
                months of linear vesting
              </span>
            </div>
          </>
        }
        enterDelay={0}
        leaveDelay={0}
      >
        <img src={tooltipIcon} alt="" />
      </Tooltip>{" "}
    </span>
    <h6 className="mb-0 whitelist-info-title">3/16 Months</h6>
  </div>
  <div className="whitelist-info-item p-3 d-flex flex-column gap-1 align-items-start">
    <span className="whitelist-info-span">Network</span>
    <div className="d-flex align-items-center gap-2">
      <img src={bnb} width={24} height={24} alt="" />
      <h6 className="mb-0 whitelist-info-title">BNB Chain</h6>
    </div>
  </div>
</div>
<div className="row mt-4">
  <div className="col-12 col-lg-7">
    <div className="whitelist-info-item d-flex flex-column w-100 p-3 h-100 justify-content-between">
      <div className="d-flex align-items-center justify-content-between">
        {/* <Tooltip
      title={
        <>
          <div className="d-flex flex-column gap-2">
            <span className="whitelist-tooltip-content-text">
              The deposit process for the WOD token whitelist is
              straightforward and lasts for two weeks from launch. You
              can deposit using Ethereum or BNB Chain and make
              multiple commitments. The minimum commitment is $100 per
              transaction, while the total amount you can commit is
              $20,000. For BNB Chain, deposits are accepted in USDT,
              while Ethereum allows USDT or USDC.
            </span>
            <span className="whitelist-tooltip-content-text">
              After depositing, your commitment is marked as
              'Successful' until the review. If approved, you'll be
              eligible to receive WOD tokens. If not, the committed
              funds are automatically refunded to your wallet.
            </span>
          </div>
        </>
      }
      enterDelay={0}
      leaveDelay={0}
    >
      <img src={tooltipIcon} alt="" />
    </Tooltip> */}
      </div>
      <h6 className="mb-0 whitelist-deposit-title text-center">
        {startedVesting ? "Vesting has Started" : "Vesting upcoming"}
      </h6>

      <div className="whitelist-deposit-wrapper mt-3  d-flex flex-column gap-3">
        <div className="whitelist-deposit-wrapper-header p-2 d-flex align-items-center justify-content-between">
          <span className="commitment-text">Commitment</span>
          <div className="d-flex align-items-center gap-1">
            <span className="whitelist-my-balance">
              Available to claim
            </span>
            <span className="whitelist-my-balance-value">
              {getFormattedNumber(pendingTokens)} WOD
            </span>
          </div>
        </div>
        <div className="px-2 d-flex w-100 justify-content-between gap-2 align-items-center">
          <span className="commitment-text d-flex align-items-center gap-3">
            Available time until claim{" "}
            {cliffTime !== 0 && (
              <Countdown
                date={cliffTime * 1000}
                renderer={renderer2}
                onComplete={() => {
                  settimerFinished(true);
                }}
              />
            )}
          </span>
          {!isConnected && (
            <button
              className={`btn connectbtn  d-flex justify-content-center align-items-center`}
              onClick={() => {
                handleConnection();
              }}
            >
              Connect Wallet
            </button>
          )}
          {isConnected && chainId !== 97 && (
            <button
              className={`btn  fail-button  d-flex justify-content-center align-items-center`}
              onClick={() => {
                handleEthPool();
              }}
            >
              Switch to BSC Testnet
            </button>
          )}

          {isConnected && chainId === 97 && (
            <button
              className={`connectbtn px-3 ${
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
              disabled={
                startedVesting === false ||
                canClaim === false ||
                timerFinished === false
                  ? true
                  : false
              }
              onClick={handleClaim}
            >
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
          )}
        </div>
      </div>
      {/*   <div className="d-flex flex-column gap-2 w-100 p-3">
      <div className="d-flex flex-column flex-lg-row align-items-center w-100 gap-2">
        <div className="d-flex flex-column gap-1 commitment-deposit-wrapper">
          <span className="commitment-input-span">Deposit</span>
          <div className="d-flex align-items-center">
            <div className="position-relative coin-select-dropdown">
              {coinDropdown && (
                <OutsideClickHandler
                  onOutsideClick={() => setCoinDropdown(false)}
                >
                  <div className="coins-dropdown-list d-flex flex-column ">
                    {(chainId === 1
                      ? window.config.commitmenteth_tokens
                      : chainId === 56
                      ? window.config.commitmentbnb_tokens
                      : window.config.commitmenteth_tokens
                    ).map((item, index) => {
                      return (
                        <div
                          className="d-flex align-items-center gap-2 coin-dropdown-item p-2"
                          key={index}
                          onClick={() => {
                            setSelectedCoin({
                              icon: require(`./assets/${item.symbol.toLowerCase()}.svg`),
                              coin: item.symbol,
                              address: item.address,
                            });
                            setCoinDropdown(false);
                            getUserBalanceForToken(item);
                            setselectedToken(item);
                          }}
                        >
                          <img
                            src={require(`./assets/${item.symbol.toLowerCase()}.svg`)}
                            width={20}
                            height={20}
                            alt=""
                          />
                          <span className="whitelist-token-text">
                            {item.symbol}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </OutsideClickHandler>
              )}
              <div
                className="text-input2 d-flex align-items-center justify-content-between coin-dropdown position-relative"
                onClick={() => setCoinDropdown(true)}
              >
                <div className="d-flex align-items-center gap-1">
                  <img
                    src={selectedCoin.icon}
                    width={20}
                    height={20}
                    alt=""
                  />
                  <span className="whitelist-token-text">
                    {selectedCoin.coin}
                  </span>
                </div>
                <img src={dropArrow} alt="" />
              </div>
            </div>
            <div className="position-relative coin-input d-flex">
              <input
                className="text-input2 commitment-input w-100"
                style={{
                  height: "39px",
                  borderRadius: "0 8px 8px 0",
                }}
                type="text"
                autoComplete="off"
                name="amount_deposit"
                id="amount_deposit"
                key="amount_deposit"
                placeholder={`Min 100 USDT`}
                value={depositAmount}
                onChange={(e) => {
                  setDepositAmount(e.target.value);
                  checkApproval(e.target.value);
                }}
                min={100}
                maxLength={10}
                pattern="[0-9]{4}"
              />
              <button
                className="inner-max-btn position-absolute"
                onClick={handleUserMaxDeposit}
              >
                Max
              </button>
            </div>
          </div>
        </div>
        <div className="commitment-chain-wrapper d-flex flex-column gap-1 ms-0 ms-lg-2">
          <span className="commitment-input-span">
            Select Network
          </span>
          <div className="position-relative w-100">
            {chainDropdown && (
              <OutsideClickHandler
                onOutsideClick={() => setChainDropdown(false)}
              >
                <div className="coins-dropdown-list d-flex flex-column ">
                  <div
                    className="d-flex align-items-center gap-2 coin-dropdown-item p-2"
                    onClick={() => {
                      setChainDropdown(false);
                      handleChangeChain("0x38", "56");
                    }}
                  >
                    <img src={bnb} width={20} height={20} alt="" />
                    <span className="whitelist-token-text">
                      BNB Chain
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center gap-2 coin-dropdown-item p-2"
                    onClick={() => {
                      setChainDropdown(false);
                      handleChangeChain("0x1", "1");
                    }}
                  >
                    <img src={eth} width={20} height={20} alt="" />
                    <span className="whitelist-token-text">
                      Ethereum
                    </span>
                  </div>
                </div>
              </OutsideClickHandler>
            )}
            <div
              className="text-input2 d-flex align-items-center justify-content-between"
              style={{ height: "39px", cursor: "pointer" }}
              onClick={() => setChainDropdown(true)}
            >
              <div className="d-flex align-items-center gap-1">
                <img
                  src={selectedChain.icon}
                  width={20}
                  height={20}
                  alt=""
                />
                <span className="whitelist-token-text">
                  {selectedChain.chain}
                </span>
              </div>
              <img src={dropArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
      {errorMsg && (
        <h6 className="errormsg m-0 justify-content-start">
          {errorMsg}
        </h6>
      )}
      <div className="d-flex align-items-center mt-2 gap-1">
        <span className="commitment-input-span">Estimation:</span>
        <span className="wod-tokens-commited">
          {getFormattedNumber((depositAmount ?? 0) / 0.0325, 4)} WOD
        </span>
        <span className="commitment-input-span">
          (distributed on BNB Chain)
        </span>
      </div>
    </div>
    <div className="d-flex w-100 justify-content-center mb-3">
      {isConnected && (chainId === 1 || chainId === 56) ? (
        <button
          disabled={
            depositAmount === "" ||
            depositLoading === true ||
            canDeposit === false ||
            !isConnected ||
            !depositAmount ||
            (!hasDypBalance &&
              !hasiDypBalance &&
              !hasDypStaked &&
              !hasiDypStaked &&
              !isPremium)
              ? true
              : false
          }
          className={`btn filledbtn ${
            ((depositAmount === "" && depositStatus === "initial") ||
              (!hasDypBalance &&
                !hasiDypBalance &&
                !hasDypStaked &&
                !hasiDypStaked &&
                !isPremium) ||
              canDeposit === false ||
              !isConnected ||
              !depositAmount) &&
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
        >
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
      ) : !isConnected ? (
        <button
          className="connectbtn btn m-auto"
          onClick={handleConnection}
        >
          <img src={wallet} alt="" /> Connect wallet
        </button>
      ) : (
        <button
          className="connectbtn btn m-auto"
          onClick={() => {
            handleChangeChain("0x38", "56");
          }}
        >
          Change Network
        </button>
      )}
    </div>
  </div> */}
    </div>
  </div>
  <div className="col-12 col-lg-5 mt-2 mt-lg-0">
    <div className="d-flex flex-column gap-2">
      <div className="my-commitment-wrapper py-4 w-100 d-flex flex-column align-items-center gap-2">
        <h6 className="mb-0 my-commitment-value">
          ${getFormattedNumber(totalDeposited)}
        </h6>
        <span className="my-commitment-span">My Commitment</span>
      </div>
      {/* <div className="whitelist-info-item d-flex flex-column w-100 p-3">
    <div className="d-flex align-items-center justify-content-between">
      <h6 className="mb-0 whitelist-deposit-title">Requirements</h6>
      <Tooltip
        title={
          <>
            <div className="whitelist-tooltip-content-text">
              You only need to complete one of the requirements to be
              eligible for the whitelist. Meeting multiple
              requirements and increasing your holding/staking value
              will raise your accepted allocation.
            </div>
          </>
        }
        enterDelay={0}
        leaveDelay={0}
      >
        <img src={tooltipIcon} alt="" />
      </Tooltip>
    </div>
    <div className="requirements-grid mt-3">
      {requirements.map((item, index) => (
        <div
          key={index}
          className={`requirements-item ${
            item.active && "requirements-active"
          } p-3 d-flex align-items-center justify-content-center gap-2`}
        >
          {item.active && (
            <img src={checkIcon} className="req-check" alt="" />
          )}
          <img src={item.icon} height={36} width={36} alt="" />
          <div className="d-flex flex-column gap-1">
            <span className="requirement-token">{item.coin}</span>
            <span className="requirement-title">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="requirements-divider mt-3"></div>
    {isConnected &&
    (isPremium ||
      hasDypBalance ||
      hasiDypBalance ||
      hasDypStaked ||
      hasiDypStaked) ? (
      <span className="eligible-span mt-3">
        You are eligible for the whitelist.
      </span>
    ) : (
      <a
        className="req-buy-dyp-wrapper mt-2 d-flex align-items-center justify-content-between w-100 p-2"
        href="https://app.uniswap.org/swap?use=V2&inputCurrency=0x39b46B212bDF15b42B166779b9d1787A68b9D0c3"
        target={"_blank"}
        rel="noreferrer"
      >
        <span className="req-buy-dyp">
          Buy DYP tokens to become eligible for the whitelist
        </span>
        <img src={buyToken} alt="" />
      </a>
    )}
  </div> */}
    </div>
  </div>
</div>
{allUserCommitments && allUserCommitments.length > 0 && (
  <div className="row mt-4">
    <div className="col-12">
      <div className="whitelist-info-item-2 d-flex flex-column">
        <div className="d-flex align-items-center p-3 justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <h6 className="mb-0 whitelist-deposit-title">
              Commitment History
            </h6>
          </div>
          <Tooltip
            title={
              <>
                <div className="d-flex flex-column gap-2">
                  <span className="whitelist-tooltip-content-text">
                    After making a commitment, your status will
                    initially be set to <b>Successful.</b>
                  </span>
                  <span className="whitelist-tooltip-content-text">
                    Once the team reviews your commitment, there are
                    two possible outcomes:
                  </span>
                  <ul>
                    <li className="whitelist-tooltip-content-text mb-2">
                      <b>Approved:</b> You are eligible to receive the
                      WOD token.
                    </li>
                    <li className="whitelist-tooltip-content-text mb-2">
                      <b>Refund:</b> Committed funds are automatically
                      refunded.
                    </li>
                  </ul>
                </div>
              </>
            }
            enterDelay={0}
            leaveDelay={0}
          >
            <img src={tooltipIcon} alt="" />
          </Tooltip>
        </div>
        <div className="outer-table-wrapper p-3">
          <table
            border={0}
            className="table item-history-table"
            style={{ borderSpacing: "10px" }}
          >
            <thead className="item-history-table-thead">
              <th className="item-history-table-th text-center">
                No.
              </th>
              <th className="item-history-table-th text-center">
                Date
              </th>
              <th className="item-history-table-th text-center">
                Network
              </th>
              <th className="item-history-table-th text-center">
                Wallet
              </th>
              <th className="item-history-table-th text-center">
                Commited
              </th>
              <th className="item-history-table-th text-center">
                WOD Amount
              </th>
              <th className="item-history-table-th text-center">
                Status
              </th>
            </thead>
            <tbody>
              {allUserCommitments
                .slice(0, slice)
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="item-history-table-td first-td left-border text-center">
                        #{index + 1}
                      </td>
                      <td className="item-history-table-td text-center">
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        }).format(
                          item.commitment_list.timestamp * 1000
                        )}
                      </td>
                      <td className="item-history-table-td text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <img
                            src={
                              item.network === "BNB Chain" ? bnb : eth
                            }
                            alt=""
                          />
                          {item.network}
                        </div>
                      </td>
                      <td className="item-history-table-td table-greentext text-center">
                        <a
                          className="table-greentext"
                          href={
                            item.network === "BNB Chain"
                              ? `https://bscscan.com/address/${coinbase}`
                              : `https://etherscan.io/address/${coinbase}`
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {shortAddress(coinbase)}
                        </a>
                      </td>
                      <td className="item-history-table-td text-center">
                        {item.commitment_list.refunded === true
                          ? "Refunded"
                          : getFormattedNumber(
                              item.network === "BNB Chain"
                                ? item.commitment_list.amount / 1e18
                                : item.commitment_list.amount / 1e6,
                              2
                            )}{" "}
                        {item.token}
                      </td>
                      <td className="item-history-table-td right-border text-center">
                        {item.commitment_list.refunded === true
                          ? "Refunded"
                          : getFormattedNumber(
                              item.network === "BNB Chain"
                                ? item.commitment_list.amount /
                                    1e18 /
                                    0.0325
                                : item.commitment_list.amount /
                                    1e6 /
                                    0.0325,

                              0
                            )}{" "}
                        WOD
                      </td>
                      <td className="item-history-table-td last-td table-greentext right-border text-center">
                        {/* {item.commitment_list.refunded === true ? (
                    <button className="refund-btn">
                      {item.status}
                    </button>
                  ) : (
                    <> */}
                        {item.commitment_list.accepted === false &&
                        item.commitment_list.refunded === false
                          ? "Successful"
                          : item.commitment_list.accepted === true
                          ? "Approved"
                          : "Refund"}
                        {/* </> */}
                        {/* )} */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="d-flex w-100 justify-content-center">
            <div class="spinner-border text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {allUserCommitments && allUserCommitments.length > 5 && (
          <div className="d-flex my-3 w-100 align-items-center justify-content-center">
            <button
              className="btn filledbtn"
              onClick={handleViewMore}
            >
              {slice >= allUserCommitments.length
                ? "View Less"
                : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)}
</div>