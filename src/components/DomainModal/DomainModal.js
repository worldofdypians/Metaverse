import React from "react";
import "./_domainmodal.scss";
import domainIcon from "./assets/domainIcon.svg";
import popupXmark from "./assets/popupXmark.svg";
import searchIconDomain from "./assets/searchIconDomain.svg";
import registerDomainIcon from "./assets/registerDomainIcon.svg";
import OutsideClickHandler from "react-outside-click-handler";
import plusIcon from "./assets/plusIcon.svg";
import minusIcon from "./assets/minusIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";

const DomainModal = ({ onClose, onSearch }) => {
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <div
        className="popup-wrapper popup-active p-3"
        style={{
          width: "35%",
          height: "520px",
          background: "#1A1C39",
          borderRadius: "10px",
        }}
      >
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
        <img src={searchIconDomain} className="domain-search-icon" alt="" />
      <input type="text" className="domain-popup-input w-100" onChange={(e) => onSearch(e.target.value)} placeholder="example.bnb" />
      </div>
        <div className="domain-search-items mt-3">
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
      </div>
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
