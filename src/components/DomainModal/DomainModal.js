import React, { useEffect, useState } from "react";
import "./_domainmodal.scss";
import domainIcon from "./assets/domainIcon.svg";
import popupXmark from "./assets/popupXmark.svg";
import searchIconDomain from "./assets/searchIconDomain.svg";
import registerDomainIcon from "./assets/registerDomainIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import plusIcon from "./assets/plusIcon.svg";
import minusIcon from "./assets/minusIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import getFormattedNumber from "../../screens/Caws/functions/get-formatted-number";
import useWindowSize from "../../hooks/useWindowSize";
import successMark from "./assets/successMark.svg";

const DomainModal = ({
  onClose,
  onSearch,
  available,
  price,
  chainId,
  bnbUSDPrice,
  onRegister,
  loading,
  successMessage,
  successDomain,
  metadata,
  bscAmount,
}) => {
  const windowSize = useWindowSize();
  const [domainSearch, setDomainSearch] = useState("");
  const [buyScreen, setBuyScreen] = useState(false);
  const [registrationYear, setRegistrationYear] = useState(1);
  const [selectedName, setSelectedName] = useState("");

  function onlyLettersAndNumbers(str) {
    return Boolean(str.match(/^[A-Za-z0-9]*$/));
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    if (domainSearch !== selectedName) {
      setBuyScreen(false);
      setRegistrationYear(1);
    }
  }, [domainSearch]);

  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className="domain-popup-wrapper popup-active p-3"
        style={{
          width: "30%",
          // height: windowSize.width > 786 ? "530px" : "650px",
          minHeight: "330px",
          background: "#1A1C39",
          borderRadius: "10px",
        }}
      >
        {successDomain === false && successMessage === "" ? (
          <>
            {" "}
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="popup-title mb-0">BNB Domain Name</h6>
              <img
                src={popupXmark}
                alt=""
                onClick={onClose}
                style={{ cursor: "pointer" }}
              />
            </div>
            <p className="domain-popup-desc mt-3">
              Elevate your Web3 experience by securing a personalized domain for
              your wallet address, simplifying transactions and enhancing your
              digital identity in the decentralized space.
            </p>
            <div className="position-relative w-100 mt-3">
              <img
                src={searchIconDomain}
                className="domain-search-icon"
                alt=""
              />
              <input
                type="text"
                className="domain-popup-input w-100"
                disabled={chainId === 56 ? false : true}
                value={domainSearch}
                onChange={(e) => {
                  onSearch(e.target.value);
                  setDomainSearch(e.target.value);
                }}
                placeholder="Search"
              />
            </div>
            {chainId === 56 &&
              metadata &&
              buyScreen === false &&
              domainSearch.length < 3 && (
                <div className="selected-domain-search-item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-between mt-5 p-3">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={metadata.image}
                      width={60}
                      height={60}
                      alt=""
                      className="your-domain-img"
                    />
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="domain-name mb-0">{metadata.name}</h6>
                      </div>
                      <span className="name-service mb-0">Your Domain</span>
                    </div>
                  </div>
                  {/* <div className="d-flex align-items-center justify-content-center flex-column gap-2">
            <div className="d-flex align-items-center gap-1">
              <div className="d-flex flex-column align-items-end gap-1">
                <div className="domain-price mb-0">
                  ${getFormattedNumber(price * bnbUSDPrice, 2)}
                </div>
                <span className="bnb-price-domain">
                  {getFormattedNumber(price, 2)} BNB
                </span>
              </div>
              <span className="name-service">/year</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="domain-register mb-0">Register now</span>
              <img
                src={registerDomainIcon}
                width={10}
                height={10}
                alt=""
              />
            </div>
          </div> */}
                  <div className="d-flex flex-lg-column flex-row gap-1">
                    <span className="name-service mb-0">Expires on </span>
                    <span className="name-service mb-0">
                      {new Date(
                        metadata.attributes[2].value * 1000
                      ).toLocaleDateString("en-US", options)}
                    </span>
                  </div>
                </div>
              )}
            {chainId !== 56 && (
              <div className="domain-search-items d-flex align-items-center justify-content-center mt-3 p-5">
                <span className="no-domains-text mb-0">
                  Please switch to BNB Chain to continue
                </span>
              </div>
            )}
            {buyScreen === false ? (
              <>
                {onlyLettersAndNumbers(domainSearch) === false ? (
                  <div className="domain-search-items d-flex align-items-center justify-content-center mt-3 p-5">
                    <span className="no-domains-text mb-0">
                      Invalid domain name
                    </span>
                  </div>
                ) : available === true && domainSearch.length >= 3 ? (
                  <div
                    className="domain-search-item d-flex align-items-center justify-content-between mt-5 p-3"
                    onClick={() => {
                      setBuyScreen(true);
                      setSelectedName(domainSearch);
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="bnb-domain-icon-green d-flex align-items-center justify-content-center">
                        <span className="mb-0">.bnb</span>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="domain-name mb-0">
                            {domainSearch}.bnb
                          </h6>
                          <div className="domain-available-tag d-none d-lg-flex px-2">
                            <span className="mb-0">Available</span>
                          </div>
                        </div>
                        <span className="name-service mb-0">
                          BNB Name Service
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column gap-2">
                      <div className="d-flex align-items-center gap-1">
                        <div className="d-flex flex-column align-items-end gap-1">
                          <div className="domain-price mb-0">
                            ${getFormattedNumber(price * bnbUSDPrice, 2)}
                          </div>
                          <span className="bnb-price-domain">
                            {getFormattedNumber(price, 2)} BNB
                          </span>
                        </div>
                        <span className="name-service">/year</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="domain-register mb-0">
                          Register now
                        </span>
                        <img
                          src={registerDomainIcon}
                          width={10}
                          height={10}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ) : available === false && domainSearch.length >= 3 ? (
                  <div
                    className="domain-search-item d-flex align-items-center justify-content-between mt-5  p-3"
                    style={{ minHeight: "92px" }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div className="bnb-domain-icon-orange d-flex align-items-center justify-content-center">
                        <span className="mb-0">.bnb</span>
                      </div>
                      <div className="d-flex flex-column">
                        <h6 className="domain-name mb-0">{domainSearch}.bnb</h6>
                        <span className="name-service mb-0">
                          BNB Name Service
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-lg-row">
                      <span className="name-service mb-0">
                        Domain Unavailable
                      </span>
                      {/* <span className="name-service mb-0">November 14, 2024</span> */}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <div className="d-flex flex-column gap-3">
                  <div className="selected-domain-search-item w-100 px-3 py-4 mt-4 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bnb-domain-icon-green d-flex align-items-center justify-content-center">
                        <span className="mb-0">.bnb</span>
                      </div>
                      <div className="d-flex flex-column">
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="domain-name mb-0">
                            {domainSearch}.bnb
                          </h6>
                          <div className="domain-available-tag d-none d-lg-flex d-none d-lg-flex px-2">
                            <span className="mb-0 ">Available</span>
                          </div>
                        </div>
                        <span className="name-service mb-0">
                          BNB Name Service
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center flex-column gap-2">
                      <div className="d-flex align-items-center gap-1">
                        <div className="d-flex flex-column align-items-end gap-1">
                          <div className="domain-price mb-0">
                            ${getFormattedNumber(price * bnbUSDPrice, 2)}
                          </div>
                          <span className="bnb-price-domain">
                            {getFormattedNumber(price, 2)} BNB
                          </span>
                        </div>
                        <span className="name-service">/year</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-0 align-items-center justify-content-between w-100">
                    <div className="d-flex flex-column gap-2 w-100">
                      <span className="registration-year mb-0">
                        Registration Year
                      </span>
                      <div
                        className="selected-domain-search-item p-2 d-flex justify-content-between align-items-center gap-4 gap-lg-5"
                        style={{
                          borderRadius: "8px",
                          width: windowSize.width > 786 ? "160px" : "100%",
                        }}
                      >
                        <img
                          src={minusIcon}
                          onClick={() =>
                            registrationYear == 1
                              ? null
                              : setRegistrationYear(registrationYear - 1)
                          }
                          style={{ cursor: "pointer" }}
                          alt=""
                        />
                        <span className="registration-year-amount mb-0">
                          {registrationYear}
                        </span>
                        <img
                          src={plusIcon}
                          onClick={() =>
                            setRegistrationYear(registrationYear + 1)
                          }
                          style={{ cursor: "pointer" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-start align-items-lg-end gap-2 w-100">
                      <span className="bnb-balance mb-0">
                        My Balance: {getFormattedNumber(bscAmount, 2)} BNB
                      </span>
                      <div
                        className="selected-domain-search-item p-2 justify-content-between d-flex align-items-center gap-4 gap-lg-5"
                        style={{
                          borderRadius: "8px",
                          // width: windowSize.width > 786 ? "220px" : "100%",
                        }}
                      >
                        <span
                          className="registration-year-amount mb-0"
                          style={{ whiteSpace: "pre" }}
                        >
                          Total Price
                        </span>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center gap-1">
                            <img src={bnbIcon} alt="" />
                            <span className="domain-bnb-value mb-0">
                              {getFormattedNumber(price * registrationYear, 2)}
                            </span>
                          </div>
                          <span className="domain-usd-value mb-0">
                            $
                            {getFormattedNumber(
                              price * bnbUSDPrice * registrationYear,
                              2
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="domain-popup-divider w-100" />
                  <div className="d-flex w-100 justify-content-center">
                    <div className="linear-border">
                      <button
                        className="btn filled-btn px-4"
                        onClick={() =>
                          onRegister(selectedName, registrationYear)
                        }
                      >
                        {loading ? (
                          <div
                          className="spinner-border text-light spinner-border-sm"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          "Register"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : successDomain === true && successMessage !== "" ? (
          <>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-4">
              <h6 className="rewards-success-title font-organetto">
                Successfully
              </h6>
              <h6
                className="rewards-success-title font-organetto"
                style={{ color: "#8C56FF" }}
              >
                Purchased Domain
              </h6>
            </div>
            <div className="d-flex w-100 justify-content-center mb-4">
              <img src={successMark} alt="" />
            </div>
            <div className="d-flex w-100 justify-content-center">
              <p
                className="popup-paragraph w-50"
                style={{ textAlign: "center" }}
              >
                {successMessage}
              </p>
            </div>
          </>
        ) : successDomain === false && successMessage !== "" ? (
          <>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 mb-4">
              <h6 className="rewards-success-title font-organetto">
                Domain purchase Failed
              </h6>
            </div>
            <div className="d-flex w-100 justify-content-center mb-4">
              <img src={require("./assets/failMark.svg").default} alt="" />
            </div>
            <div className="d-flex w-100 justify-content-center">
              <p
                className="popup-paragraph w-50"
                style={{ textAlign: "center" }}
              >
                {successMessage}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* <div className="domain-search-items mt-3">
        <div className="domain-search-item d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center gap-2">
          <div className="bnb-domain-icon-orange d-flex align-items-center justify-content-center">
            <span className="mb-0">.bnb</span>
          </div>
          <div className="d-flex flex-column">
            <h6 className="domain-name mb-0">
              example.bnb
            </h6>
            <span className="name-service mb-0">
                BNB Name Service
            </span>
          </div>
          </div>
          <div className="d-flex flex-column flex-lg-row">
          <span className="name-service mb-0">Expires on</span>
          <span className="name-service mb-0">November 14, 2024</span>
          </div>
        </div>
        <div className="domain-search-item d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center gap-2">
          <div className="bnb-domain-icon-green d-flex align-items-center justify-content-center">
            <span className="mb-0">.bnb</span>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
            <h6 className="domain-name mb-0">
              example.bnb
            </h6>
            <div className="domain-available-tag d-none d-lg-flex px-2">
              <span className="mb-0">Available</span>
            </div>
            </div>
            <span className="name-service mb-0">
                BNB Name Service
            </span>
          </div>
          </div>
            <div className="d-flex align-items-center justify-content-center flex-column gap-2">
              <div className="d-flex align-items-end gap-1">
                <div className="domain-price mb-0">$5.00</div>
                <span className="name-service">/year</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="domain-register mb-0">Register now</span>
                <img src={registerDomainIcon} width={10} height={10} alt="" />
              </div>
            </div>
        </div>
        <div className="domain-search-item d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center gap-2">
          <div className="bnb-domain-icon-green d-flex align-items-center justify-content-center">
            <span className="mb-0">.bnb</span>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
            <h6 className="domain-name mb-0">
              example.bnb
            </h6>
            <div className="domain-available-tag d-none d-lg-flex px-2">
              <span className="mb-0">Available</span>
            </div>
            </div>
            <span className="name-service mb-0">
                BNB Name Service
            </span>
          </div>
          </div>
            <div className="d-flex align-items-center justify-content-center flex-column gap-2">
              <div className="d-flex align-items-end gap-1">
                <div className="domain-price mb-0">$5.00</div>
                <span className="name-service">/year</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="domain-register mb-0">Register now</span>
                <img src={registerDomainIcon} width={10} height={10} alt="" />
              </div>
            </div>
        </div>
        <div className="domain-search-item d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center gap-2">
          <div className="bnb-domain-icon-green d-flex align-items-center justify-content-center">
            <span className="mb-0">.bnb</span>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
            <h6 className="domain-name mb-0">
              example.bnb
            </h6>
            <div className="domain-available-tag d-none d-lg-flex px-2">
              <span className="mb-0">Available</span>
            </div>
            </div>
            <span className="name-service mb-0">
                BNB Name Service
            </span>
          </div>
          </div>
            <div className="d-flex align-items-center justify-content-center flex-column gap-2">
              <div className="d-flex align-items-end gap-1">
                <div className="domain-price mb-0">$5.00</div>
                <span className="name-service">/year</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="domain-register mb-0">Register now</span>
                <img src={registerDomainIcon} width={10} height={10} alt="" />
              </div>
            </div>
        </div>
      </div> */}
        {/* <div className="domain-search-items d-flex align-items-center justify-content-center mt-3 p-5">
        <span className="no-domains-text mb-0">
        No .bnb domain names are currently available for your search
        </span>
      </div> */}
        {/* <div className="d-flex flex-column gap-3">
          <div className="selected-domain-search-item w-100 px-3 py-4 py-lg-5 mt-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="bnb-domain-icon-green d-flex align-items-center justify-content-center">
                <span className="mb-0">.bnb</span>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="domain-name mb-0">example.bnb</h6>
                  <div className="domain-available-tag d-none d-lg-flex d-none d-lg-flex px-2">
                    <span className="mb-0 ">Available</span>
                  </div>
                </div>
                <span className="name-service mb-0">BNB Name Service</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column gap-2">
              <div className="d-flex align-items-end gap-1">
                <div className="domain-price mb-0">$5.00</div>
                <span className="name-service">/year</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="domain-register mb-0">Register now</span>
                <img src={registerDomainIcon} width={10} height={10} alt="" />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column gap-2">
              <span className="registration-year mb-0">Registration Year</span>
              <div
                className="selected-domain-search-item p-2 d-flex align-items-center gap-4 gap-lg-5"
                style={{ borderRadius: "8px" }}
              >
                <img src={minusIcon} alt="" />
                <span className="registration-year-amount mb-0">1</span>
                <img src={plusIcon} alt="" />
              </div>
            </div>
            <div className="d-flex flex-column align-items-end gap-2">
              <span className="bnb-balance mb-0">My Balance: 2.14 WBNB</span>
              <div
                className="selected-domain-search-item p-2 d-flex align-items-center gap-4 gap-lg-5"
                style={{ borderRadius: "8px" }}
              >
                <span className="registration-year-amount mb-0">
                  Total Price
                </span>
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex align-items-center gap-1">
                    <img src={bnbIcon} alt="" />
                    <span className="domain-bnb-value mb-0">0.025</span>
                  </div>
                  <span className="domain-usd-value mb-0">$100.00</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="domain-popup-divider w-100" />
         <div className="d-flex w-100 justify-content-center">
         <div className="linear-border">
            <button className="btn filled-btn px-4">Register</button>
          </div>
         </div>
        </div> */}
      </div>
    </OutsideClickHandler>
  );
};

export default DomainModal;
