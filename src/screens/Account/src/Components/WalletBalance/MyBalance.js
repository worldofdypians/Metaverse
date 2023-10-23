import React, { useState, useEffect } from "react";
import axios from "axios";
import ethIcon from "./assets/ethIcon.svg";
import bnbIcon from "./assets/bnbIcon.svg";
import avaxIcon from "./assets/avaxIcon.svg";
import dypIcon from "./assets/dypIcon.svg";
import getFormattedNumber from "../../Utils.js/hooks/get-formatted-number";
import idyp from "../../Images/userProfile/idyp.svg";
import useWindowSize from "../../../../../hooks/useWindowSize";

const MyBalance = ({
  idypBalance,
  idypBalancebnb,
  idypBalanceavax,
  dypBalance,
  dypBalancebnb,
  dypBalanceavax,
}) => {
  const [dyptokenData, setDypTokenData] = useState([]);
  const [idyptokenData, setIDypTokenData] = useState([]);
  const [idyptokenDatabnb, setIDypTokenDatabnb] = useState([]);
  const [dyptokenDatabnb, setDypTokenDatabnb] = useState([]);
  const [idyptokenDataAvax, setIDypTokenDataAvax] = useState([]);
  const [dyptokenDataAvax, setDypTokenDataAvax] = useState([]);
  const [bnbPrice, setBnbPrice] = useState(0);
  const windowSize = useWindowSize();

  const getTokenData = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_eth_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setDypTokenData(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_eth_v2.token_data
        );
        setIDypTokenData(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDatabnb = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_bsc_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        const bnb = data.data.the_graph_bsc_v2.usd_per_eth;
        setBnbPrice(bnb);
        setDypTokenDatabnb(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_bsc_v2.token_data
        );
        setIDypTokenDatabnb(propertyIDyp[1][1].token_price_usd);
      });
  };

  const getTokenDataavax = async () => {
    await axios
      .get("https://api.dyp.finance/api/the_graph_avax_v2")
      .then((data) => {
        const propertyDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setDypTokenDataAvax(propertyDyp[0][1].token_price_usd);

        const propertyIDyp = Object.entries(
          data.data.the_graph_avax_v2.token_data
        );
        setIDypTokenDataAvax(propertyIDyp[1][1].token_price_usd);
      });
  };

  useEffect(() => {
    getTokenData();
    getTokenDataavax();
    getTokenDatabnb();
  }, []);

  return (
    <div
      className="d-flex flex-column align-items-center gap-3 balancewrapper3"
      style={{ marginTop: windowSize.width < 991 ? 0 : "50px" }}
    >
      <div className="d-flex flex-column flex-lg-row w-100 gap-1  justify-content-between">
        <div className="d-flex py-2 align-items-center gap-2 position-relative  col-12 col-lg-2">
          <img src={ethIcon} alt="" className="" />
          <span className="eth-chain-text">Ethereum</span>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-5">
          <div className="d-flex align-items-center gap-2">
            <img src={dypIcon} alt="dyp" className="dyp-icon" />
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(dypBalance, 2)}
            </h6>
          </div>
          <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
            ${getFormattedNumber(dypBalance * dyptokenData, 2)}
          </span>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-5">
          <div className="d-flex align-items-center gap-2">
            <img
              src={idyp}
              alt="dyp"
              className="dyp-icon"
              style={{ height: 16, width: 16 }}
            />
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(idypBalance, 2)}
            </h6>
          </div>
          <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
            ${getFormattedNumber(idypBalance * idyptokenData, 2)}
          </span>
        </div>
      </div>
      <div className="balanceseparator"></div>
      <div className="d-flex flex-column flex-lg-row w-100 gap-1 col-lg-12 justify-content-between">
        <div className="d-flex py-2 align-items-center gap-2 position-relative col-12 col-lg-2">
          <img src={bnbIcon} alt="" className="" />
          <span className="bnb-chain-text">BNB Chain</span>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-5">
          <div className="d-flex align-items-center gap-2">
            <img src={dypIcon} alt="dyp" className="dyp-icon" />
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(dypBalancebnb, 2)}
            </h6>
          </div>
          <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
            ${getFormattedNumber(dypBalancebnb * dyptokenDatabnb, 2)}
          </span>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-5">
          <div className="d-flex align-items-center gap-2">
            <img
              src={idyp}
              alt="dyp"
              className="dyp-icon"
              style={{ height: 16, width: 16 }}
            />
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(idypBalancebnb, 2)}
            </h6>
          </div>
          <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
            ${getFormattedNumber(idypBalancebnb * idyptokenDatabnb, 2)}
          </span>
        </div>
      </div>
      <div className="balanceseparator"></div>
      <div className="d-flex flex-column flex-lg-row w-100 gap-1 col-lg-12 justify-content-between">
        <div className="d-flex py-2 align-items-center gap-2 position-relative col-12 col-lg-2">
          <img src={avaxIcon} alt="" className="" />
          <span className="avax-chain-text">Avalanche</span>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between dyp-wrapper position-relative col-12 col-lg-5">
          <div className="d-flex align-items-center gap-2">
            <img src={dypIcon} alt="dyp" className="dyp-icon" />
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(dypBalanceavax, 2)}
            </h6>
          </div>
          <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
            ${getFormattedNumber(dypBalanceavax * dyptokenDataAvax, 2)}
          </span>
        </div>
        <div className="d-flex py-2 px-4 align-items-center justify-content-between idyp-wrapper position-relative col-12 col-lg-5">
          <div className="d-flex align-items-center gap-2">
            <img
              src={idyp}
              alt="dyp"
              className="dyp-icon"
              style={{ height: 16, width: 16 }}
            />
            <h6 className="wallet-amount mb-0">
              {getFormattedNumber(idypBalanceavax, 2)}
            </h6>
          </div>
          <span className="nft-price-usd" style={{ color: "#7DD9AF" }}>
            ${getFormattedNumber(idypBalanceavax * idyptokenDataAvax, 2)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default MyBalance;
