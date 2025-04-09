import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
const ChainPopup = ({
  onDisconnect,
  onSwitchNetwork,
  onClose,
  activeChain,
  isMobile,
  isPremium,
}) => {
  return (
    <div className="challenge-popup-wrapper popup-active p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="select-gray-txt ">SELECT A NETWORK</span>
        <img
          src={"https://cdn.worldofdypians.com/wod/xMark.svg"}
          width={22}
          height={22}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          alt=""
        />
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-column position-relative gap-2">
          <hr className="header-divider my-0" />
          <div className="header-chain-grid">
            {window.WALLET_TYPE !== "matchId" && (
              <Dropdown.Item
                onClick={() => onSwitchNetwork("0x1", 1)}
                className={activeChain === "eth" ? "active-chain-btn" : ""}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/eth.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                Ethereum
              </Dropdown.Item>
            )}

            <Dropdown.Item
              onClick={() => {
                onSwitchNetwork("0x38", 56);
              }}
              className={activeChain === "bnb" ? "active-chain-btn" : ""}
            >
              <img
                src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                alt=""
                width={20}
                height={20}
              />
              BNB Chain
            </Dropdown.Item>
            {window.WALLET_TYPE !== "matchId" && !isPremium && (
              <Dropdown.Item
                onClick={() => onSwitchNetwork("0xcc", 204)}
                className={activeChain === "opbnb" ? "active-chain-btn" : ""}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/bnbIcon.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                opBNB Chain
              </Dropdown.Item>
            )}
            {window.WALLET_TYPE !== "binance" &&
              !window.ethereum?.isBinance && (
                <Dropdown.Item
                  onClick={() => onSwitchNetwork("0x2ba", 698)}
                  className={activeChain === "mat" ? "active-chain-btn" : ""}
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/matchainIcon.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                  Matchain
                </Dropdown.Item>
              )}

            {window.WALLET_TYPE !== "matchId" && (
              <Dropdown.Item
                onClick={() => onSwitchNetwork("0xa9", 169)}
                className={activeChain === "manta" ? "active-chain-btn" : ""}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/manta.png"}
                  alt=""
                  width={20}
                  height={20}
                />
                Manta
              </Dropdown.Item>
            )}
            {window.WALLET_TYPE !== "binance" &&
              !window.ethereum?.isBinance &&
              window.WALLET_TYPE !== "matchId" && (
                <Dropdown.Item
                  onClick={() => onSwitchNetwork("0x28c58", 167000)}
                  className={activeChain === "taiko" ? "active-chain-btn" : ""}
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/taiko.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                  Taiko
                </Dropdown.Item>
              )}

            {window.WALLET_TYPE !== "binance" &&
              !window.ethereum?.isBinance &&
              window.WALLET_TYPE !== "matchId" && (
                <Dropdown.Item
                  onClick={() => onSwitchNetwork("0x45c", 1116)}
                  className={activeChain === "core" ? "active-chain-btn" : ""}
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/core.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                  CORE
                </Dropdown.Item>
              )}
            {window.WALLET_TYPE !== "matchId" && (
              <Dropdown.Item
                onClick={() => onSwitchNetwork("0x2105", 8453)}
                className={activeChain === "base" ? "active-chain-btn" : ""}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/base.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                Base
              </Dropdown.Item>
            )}
            {window.WALLET_TYPE !== "matchId" &&
              window.WALLET_TYPE !== "binance" &&
              !window.ethereum?.isBinance && (
                <Dropdown.Item
                  onClick={() => onSwitchNetwork("0x531", 1329)}
                  className={activeChain === "sei" ? "active-chain-btn" : ""}
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/seiLogo.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                  SEI
                </Dropdown.Item>
              )}

            {window.WALLET_TYPE !== "matchId" &&
              window.WALLET_TYPE !== "binance" &&
              !window.ethereum?.isBinance && (
                <Dropdown.Item
                  onClick={() => onSwitchNetwork("0x58", 88)}
                  className={
                    activeChain === "viction" ? "active-chain-btn" : ""
                  }
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/viction.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                  Viction
                </Dropdown.Item>
              )}
            {window.WALLET_TYPE !== "matchId" && (
              <Dropdown.Item
                onClick={() => onSwitchNetwork("0xa86a", 43114)}
                className={activeChain === "avax" ? "active-chain-btn" : ""}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/avaxIcon.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
                Avalanche
              </Dropdown.Item>
            )}
            {window.WALLET_TYPE !== "matchId" &&
              window.WALLET_TYPE !== "binance" &&
              !window.ethereum?.isBinance && (
                <Dropdown.Item
                  onClick={() => onSwitchNetwork("0x585eb4b1", 1482601649)}
                  className={activeChain === "skale" ? "active-chain-btn" : ""}
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/skaleIcon.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  SKALE
                </Dropdown.Item>
              )}
            {window.WALLET_TYPE !== "matchId" &&
              window.WALLET_TYPE !== "binance" &&
              !isPremium &&
              !window.ethereum?.isBinance && (
                <Dropdown.Item
                  onClick={() => onSwitchNetwork("0x343b", 13371)}
                  className={
                    activeChain === "immutable" ? "active-chain-btn" : ""
                  }
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/immutable.svg"}
                    width={20}
                    height={20}
                    alt=""
                  />
                  Immutable
                </Dropdown.Item>
              )}
            <Dropdown.Item
              onClick={() => onSwitchNetwork("0x406", 1030)}
              className={activeChain === "conflux" ? "active-chain-btn" : ""}
            >
              <img
                src={"https://cdn.worldofdypians.com/wod/confluxIcon.svg"}
                alt=""
                width={20}
                height={20}
              />
              Conflux
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onSwitchNetwork("0x7f8", 2040)}
              className={activeChain === "vanar" ? "active-chain-btn" : ""}
            >
              <img
                src={"https://cdn.worldofdypians.com/wod/vanar.png"}
                alt=""
                width={20}
                height={20}
              />
              Vanar
            </Dropdown.Item>
          </div>
        </div>
        {!isMobile && (
          <>
            <hr className="header-divider my-0" />
            <div className="d-flex align-items-center gap-lg-3 gap-2">
              <a href="https://wod.space.id" rel="noreferrer" target="_blank">
                <span
                  className="dropdown-nav p-2 d-flex align-items-center gap-2"
                  onClick={() => {
                    // handleOpenDomains();
                    onClose();
                  }}
                >
                  <img
                    src={"https://cdn.worldofdypians.com/wod/domainIcon.svg"}
                    width={16}
                    height={16}
                    alt=""
                  />{" "}
                  Domain Name{" "}
                </span>
              </a>{" "}
              <button
                className="sign-out-btn p-2  d-flex align-items-center gap-2 justify-content-start"
                onClick={() => {
                  onDisconnect();
                }}
              >
                <img
                  src={"https://cdn.worldofdypians.com/wod/logout.svg"}
                  alt=""
                  className="logout-icon"
                />
                DISCONNECT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ChainPopup;
