import React, { useState, useRef, useEffect } from "react";
import NftCardPlaceholder from "../../components/NewsCard/NftCardPlaceholder";
import limitedOfferBadge from "../../assets/limitedoffer.svg";
import Countdown from "react-countdown";
import blackWallet from "../../assets/wallet-black.svg";
import whitewallet from "../../assets/wallet-white.svg";
import { shortAddress } from "../Caws/functions/shortAddress";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ReCaptchaV2 from "react-google-recaptcha";
import validateInfo from "./validate";
import axios from "axios";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import OutsideClickHandler from "react-outside-click-handler";
import modalClose from "../../assets/newsAssets/modalClose.svg";
import newsLetterModal from "../../assets/newsAssets/newsLetterModal.svg";

const { BigNumber } = window;

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "2",
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Poppins",
  },
  "& .MuiSelect-select": {
    color: "#fff",
    fontFamily: "Poppins",
    zIndex: "1",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#AAA5EB",
    fontFamily: "Poppins",
    color: "#fff",
    background: "#272450",
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    zIndex: "1",
    color: "#fff",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
    "&.Mui-disabled fieldset": {
      borderColor: "#AAA5EB",
      fontFamily: "Poppins",
      color: "#fff",
      background: "#272450",
      borderRadius: "8px",
    },
  },
});

const EventForm = ({ showWalletConnect, coinbase, flag }) => {
  const initialValues = {
    land: "",
    purchase: "",
  };

  const renderer = ({ days, hours, minutes }) => {
    return (
      <>
        <div
          className="d-flex align-items-center gap-3"
          style={{ width: "fit-content" }}
        >
          <div
            className="d-flex flex-column align-items-center"
            style={{ width: "40px" }}
          >
            <span className="countdown-sup mb-0">{days}</span>
            <span className="countdown-sub" style={{ fontWeight: 300 }}>
              {flag === "ph" ? `Araw` : ` Days`}
            </span>
          </div>
          <span
            className="countdown-sup"
            style={{ position: "relative", bottom: "13px" }}
          >
            :
          </span>
          <div
            className="d-flex flex-column align-items-center"
            style={{ width: "40px" }}
          >
            <span className="countdown-sup mb-0">{hours}</span>
            <span className="countdown-sub" style={{ fontWeight: 300 }}>
              {flag === "ph" ? `Oras` : ` Hours`}
            </span>
          </div>
          <span
            className="countdown-sup"
            style={{ position: "relative", bottom: "13px" }}
          >
            :
          </span>
          <div
            className="d-flex flex-column align-items-center"
            style={{ width: "40px" }}
          >
            <span className="countdown-sup mb-0">{minutes}</span>
            <span className="countdown-sub" style={{ fontWeight: 300 }}>
              {flag === "ph" ? `Minuto` : `Minutes`}
            </span>
          </div>
        </div>
      </>
    );
  };

  const [mouseOver, setMouseOver] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [success, setSuccess] = useState(false);
  const [success2, setSuccess2] = useState(false)
  const recaptchaRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [landNfts, setLandNfts] = useState([]);
  const [landStakes, setLandStakes] = useState([]);
  const [count, setCount] = useState();

  const myLandNft = async () => {
    if (coinbase !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let nfts_contract = new infura_web3.eth.Contract(
        window.LANDMINTING_ABI,
        window.config.landnft_address
      );

      let getBalanceOf = await nfts_contract.methods.balanceOf(coinbase).call();

      let nftList = [];

      for (let i = 0; i < getBalanceOf; i++)
        nftList.push(
          await nfts_contract.methods.tokenOfOwnerByIndex(coinbase, i).call()
        );

      let nfts = nftList.map((nft) => window.getLandNft(nft));

      nfts = await Promise.all(nfts);
      nfts.reverse();
      setLandNfts(nfts);
    }
  };

  const getLandStakesIds = async () => {
    const address = coinbase;
    if (address !== null && coinbase !== undefined) {
      const infura_web3 = window.infuraWeb3;
      let staking_contract = new infura_web3.eth.Contract(
        window.LANDSTAKING_ABI,
        window.config.landnftstake_address
      );
      let stakenft = [];
      let myStakes = await staking_contract.methods
        .depositsOf(address)
        .call()
        .then((result) => {
          for (let i = 0; i < result.length; i++)
            stakenft.push(parseInt(result[i]));
          return stakenft;
        });

      return myStakes;
    }
  };

  const myLandStakes = async () => {
    let myStakes = await getLandStakesIds();
    let stakes = myStakes.map((stake) => window.getLandNft(stake));
    stakes = await Promise.all(stakes);
    stakes.reverse();
    setLandStakes(stakes);
  };

  const getCount = async () => {
    await axios
      .get("https://api3.dyp.finance/api/genesis/count")
      .then((res) => {
        setCount(res.data.left);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (coinbase) {
      myLandNft();
      myLandStakes();
    }
    getCount();
  }, [coinbase]);

  let lands = [...landNfts, ...landStakes];

  const convertLandsToString = (lands) => {
    let tempArray = [];
    lands.map((item) => {
      tempArray.push(item.name.slice(1, item.name.length));
    });

    return tempArray.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    let stringLands = convertLandsToString(lands);
    const captchaToken = await recaptchaRef.current.executeAsync();
    const data = {
      address: coinbase,
      nfts: stringLands,
      recaptcha: captchaToken,
    };
    console.log(data);
    if (coinbase !== "" && lands.length > 0) {
      const send = await axios
        .post("https://api-mail.dyp.finance/api/genesis/form", data)
        .then(function (result) {
          return result.data;
        })
        .catch(function (error) {
          console.error(error);
        });
      if (send.status === 1) {
        setSuccess(true);
        setSuccess2(true)
      } else {
        setSuccess(false);
        setSuccess2(false)

      }
    }
    recaptchaRef.current.reset();
  };

  return (
    <div className="row w-100 justify-content-center m-0 gap-3">
      <h6 className="genesis-benefits-title font-organetto d-flex flex-column flex-lg-row flex-xxl-row flex-md-row  flex-sm-row  gap-0 gap-lg-2 gap-md-2 gap-sm-2">
        Genesis
        <h6 className="genesis-benefits-title" style={{ color: "#8c56ff" }}>
          Form
        </h6>
      </h6>
      <div className="d-flex flex-column flex-xxl-row flex-lg-row justify-content-between align-items-center gap-3">
        <div>
          <NftCardPlaceholder flag={flag} count={count} />
        </div>
        <div
          className="d-flex flex-column justify-content-between gap-2"
          style={{ height: "100%", width: "100%" }}
        >
          <div className="d-flex flex-column flex-xxl-row flex-lg-row justify-content-between gap-3 align-items-center">
            <div className="d-flex flex-column gap-2 justify-content-between col-12 col-xxl-3 col-lg-3">
              <span className="stepsTitle">
                {flag === "ph"
                  ? `Gabay sa mga hakbang`
                  : ` A Step-by-Step Guide`}
              </span>

              <div className="stepscontainer">
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={`${lands.length > 0 ? 'timelinedot-completed' : 'timelinedot'}`} />
                      <TimelineConnector className={"timeline-line"} />
                    </TimelineSeparator>
                    <TimelineContent>
                      <h6 className="content-title2">
                        {flag === "ph"
                          ? `Bumili ng Genesis Land NFT sa OpenSea`
                          : `Buy Genesis Land NFT on OpenSea`}
                      </h6>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={`${success2 === true ? 'timelinedot-completed' : 'timelinedot'}`} />
                      <TimelineConnector className={"timeline-line"} />
                    </TimelineSeparator>
                    <TimelineContent>
                      <h6 className="content-title2">
                        {flag === "ph"
                          ? `Kumpletuhin ang Genesis form`
                          : `Complete Genesis form`}
                      </h6>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot className={"timelinedot"} />
                      {/* <TimelineConnector className={"timeline-line"} /> */}
                    </TimelineSeparator>
                    <TimelineContent>
                      <h6 className="content-title2">
                        {flag === "ph"
                          ? `Tumanggap ng reimbursement`
                          : `Receive reimbursement`}
                      </h6>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-between gap-2 col-12 col-xxl-8 col-lg-8">
              <div className="d-flex flex-column justify-content-between gap-4 mb-3">
                <div className="timerwrapper position-relative">
                  <img
                    src={limitedOfferBadge}
                    alt=""
                    className="limitedbadge"
                  />
                  <Countdown
                    renderer={renderer}
                    date={"2023-03-14T13:00:00.000+00:00"}
                  />
                </div>{" "}
                <div>
                  <div className="d-flex flex-column flex-lg-row align-items-center gap-2 gap-lg-4">
                    {!coinbase ? (
                      <div className={"linear-border"}>
                        <button
                          className={`btn outline-btn d-flex align-items-center gap-2
                  }  px-4 w-100`}
                          onClick={() => {
                            showWalletConnect();
                          }}
                          onMouseEnter={() => {
                            setMouseOver(true);
                          }}
                          onMouseLeave={() => {
                            setMouseOver(false);
                          }}
                        >
                          <img
                            src={
                              mouseOver === false ? whitewallet : blackWallet
                            }
                            alt=""
                            style={{ width: "23px", height: "23px" }}
                          />
                          Connect wallet
                        </button>
                      </div>
                    ) : (
                      <div className={"linear-border-purp"}>
                        <button
                          className={`btn outline-btn d-flex align-items-center gap-2
                }  px-4 w-100`}
                        >
                          Wallet connected
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column flex-xxl-row flex-lg-row flex-md-row justify-content-between align-items-center gap-3">
                <div className="d-flex flex-column gap-2 w-100">
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex mt-3 mt-lg-0 justify-content-between gap-4 col-12 col-xxl-7 col-lg-7">
                      <StyledTextField
                        size="small"
                        label="Wallet address"
                        id="name"
                        name="name"
                        value={coinbase}
                        required
                        disabled
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="linear-border">
                      <button
                        className="btn filled-btn px-5"
                        disabled={coinbase && lands.length > 0 ? false : true}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                  {!coinbase ? (
                    <div className="mt-2"></div>
                  ) : coinbase && lands.length < 1 ? (
                    <h6
                      className="eventform-desc mt-2"
                      style={{ color: "#d87b7b" }}
                    >
                      {flag === "ph"
                        ? `Mangyaring bumili ng Genesis Land NFT sa OpenSea`
                        : `*Please purchase a Genesis Land NFT on OpenSea`}
                    </h6>
                  ) : (
                    <div className="mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          </div>{" "}
          <p className="text-white eventform-desc mb-0 col-12">
            {flag === "ph"
              ? `Ang iyong Genesis Land NFT ay nagsisilbing susi para magkaroon ng pribilehiyo sa mga espesyal na gantimpala, kaganapan, at feature na eksklusibo sa mga may hawak ng NFT.`
              : `Your Genesis Land NFT serves as a key that unlocks access to special
                          rewards, events, and features that are exclusive to NFT holders.`}
          </p>
          <hr className="partner-divider" />
        </div>
      </div>
      <ReCaptchaV2
        sitekey="6LflZgEgAAAAAO-psvqdoreRgcDdtkQUmYXoHuy2"
        style={{ display: "inline-block" }}
        theme="dark"
        size="invisible"
        ref={recaptchaRef}
      />
      {success && (
        <OutsideClickHandler onOutsideClick={() => setSuccess(false)}>
          <div className="success-modal d-flex flex-column p-3 justify-content-center align-items-center gap-4">
            <div className="d-flex w-100 justify-content-end">
              <img
                src={modalClose}
                alt="close modal"
                onClick={() => setSuccess(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <img src={newsLetterModal} alt="success" />
            <h6 className="newsletter-modal-title font-poppins">
              {flag === "ph" ? `Salamat` : `Thank you`}
            </h6>
            <span className="newsletter-modal-span font-poppins">
              {flag === "ph"
                ? `Matagumpay na natanggap ang iyong pagsusumite`
                : `Your submission has been received successfully`}
            </span>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default EventForm;
