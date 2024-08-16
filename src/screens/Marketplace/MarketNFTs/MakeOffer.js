import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import closeX from "./assets/closeX.svg";
import errorImg from "./assets/error.svg";
import successImg from "./assets/success.svg";
import "./_filters.scss";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import OutsideClickHandler from "react-outside-click-handler";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";
import dropdownIcon from "./assets/dropdownIcon.svg";
import whiteTag from "./assets/whiteTag.svg";
import Web3 from "web3";
import getListedNFTS from "../../../actions/Marketplace";
import { ethers } from "ethers";

const MakeOffer = ({
  open,
  onclose,
  isCaws,
  isWod,
  isTimepiece,
  nft,
  ethTokenData,
  dypTokenData,
  dyptokenData_old,
  handleMakeOffer,
  handleUpdateOffer,
  handleDeleteOffer,
  nftCount,
  coinbase,
  status,
  nftAddr,
  nftId,
  deletestatus,
  updatestatus,binanceW3WProvider
}) => {
  const windowSize = useWindowSize();
  const [filter1, setFilter1] = useState("weth");
  const [price, setprice] = useState(0);
  const [offerData, setofferData] = useState([]);
  const [isApprove, setisApprove] = useState(false);
  const [approvestatus, setapprovestatus] = useState("initial");

  const [dypBalance, setDypBalance] = useState(0);
  const [dypBalance_new, setDypBalance_new] = useState(0);

  const [wethBalance, setWethBalance] = useState(0);
  const [lowestPriceNftListed, setlowestPriceNftListed] = useState([]);
  const [lowestPriceNftListedDYP, setlowestPriceNftListedDYP] = useState([]);

  const [bestOffer, setbestOffer] = useState([]);

  const { BigNumber } = window;

  const getListedNtsAsc = async () => {
    const dypNfts = await getListedNFTS(0, "", "payment_priceType", "DYP", "");

    let dypNftsAsc = dypNfts.sort((a, b) => {
      return a.price - b.price;
    });

    const ethNfts = await getListedNFTS(0, "", "payment_priceType", "ETH", "");

    let ethNftsAsc = ethNfts.sort((a, b) => {
      return a.price - b.price;
    });
    setlowestPriceNftListed(ethNftsAsc[0].price);

    setlowestPriceNftListedDYP(dypNftsAsc[0].price);
  };

  const getOffer = async () => {
    let finalArray = [];
    const result = await window.getAllOffers(nftAddr, nftId).catch((e) => {
      console.error(e);
    });

    finalArray = result.filter((object) => {
      // console.log(object);
      return object.offer.buyer.toLowerCase() === coinbase.toLowerCase();
    });

    const maxPrice = Math.max(...result.map((o) => o.offer.price));
    const obj = result.find((item) => item.offer.price == maxPrice);
    setbestOffer(obj);
    // finalArray.push({ offer: result[0].offer, index: result[0].index });
    setofferData(finalArray);
  };

  const approveMakeOffer = async (price, pricetype, tokenType) => {
    const newPrice = new BigNumber(price * 1e18).toFixed();
    setapprovestatus("loading");
    if(window.WALLET_TYPE !== 'binance'){
      await window
      .approveOffer(newPrice, pricetype, tokenType)
      .then(() => {
        setisApprove(true);
        setapprovestatus("success");

        setTimeout(() => {
          setapprovestatus("initial");
        }, 3000);
      })
      .catch((e) => {
        console.error(e);
        setapprovestatus("fail");

        setTimeout(() => {
          setapprovestatus("initial");
        }, 3000);
      });
    } else if(window.WALLET_TYPE === 'binance') {
      if (pricetype === 1) {
        const contract = new ethers.Contract(
         
          tokenType === "dypv2"
            ? window.config.token_dypius_new_address
            : window.config.dyp_token_address, window.DYP_ABI, binanceW3WProvider.getSigner()
        );
    
        
      
    
        await contract
          .approve(window.config.nft_marketplace_address, newPrice,{ from: coinbase })
          .then(() => {
            setisApprove(true);
            setapprovestatus("success");
            setTimeout(() => {
              setapprovestatus("initial");
            }, 3000);
          })
          .catch((e) => {
            console.error(e);
            setapprovestatus("fail");
            setTimeout(() => {
              setapprovestatus("initial");
            }, 3000);
          });
      } else if (pricetype === 0) {
        const contract = new ethers.Contract(
          window.config.weth2_address, window.TOKEN_ABI, binanceW3WProvider.getSigner()
        );
    

        await contract
          .approve(window.config.nft_marketplace_address, newPrice,{ from: coinbase })
          .then(() => {
            setisApprove(true);
            setapprovestatus("success");
            setTimeout(() => {
              setapprovestatus("initial");
            }, 3000);
          })
          .catch((e) => {
            console.error(e);
            setapprovestatus("fail");
            setTimeout(() => {
              setapprovestatus("initial");
            }, 3000);
          });
      }
    }
  };

  const getDypBalance = async () => {
    const web3eth = new Web3(
      "https://mainnet.infura.io/v3/94608dc6ddba490697ec4f9b723b586e"
    );

    if (coinbase !== undefined) {
      const token_address = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17";
      const token_address_new = "0x39b46b212bdf15b42b166779b9d1787a68b9d0c3";

      const contract1 = new web3eth.eth.Contract(
        window.ERC20_ABI,
        token_address
      );
      const contract1_new = new web3eth.eth.Contract(
        window.ERC20_ABI,
        token_address_new
      );
      const contract2 = new web3eth.eth.Contract(
        window.TOKEN_ABI,
        window.config.weth2_address
      );

      const bal1 = await contract1.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance(bal1);

      const bal1_new = await contract1_new.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setDypBalance_new(bal1_new);

      const bal2 = await contract2.methods
        .balanceOf(coinbase)
        .call()
        .then((data) => {
          return web3eth.utils.fromWei(data, "ether");
        });
      setWethBalance(bal2);
    }
  };

  const isapprovedMakeOffer = async (price, pricetype, tokenType) => {
    const newPrice = new BigNumber(price * 1e18).toFixed();
    const result = await window
      .isApprovedOffer(newPrice, pricetype, tokenType)
      .catch((e) => {
        console.error(e);
      });
    setisApprove(result);
    return result;
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      windowSize.width > 1400 ? "30%" : windowSize.width > 786 ? "50%" : "90%",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    minHeight: 200,
    overflowX: "hidden",
    borderRadius: "10px",
    background: "#1A1C39",
    height: windowSize.width < 500 ? "480px" : "auto",
  };

  useEffect(() => {
    if (coinbase) {
      getOffer();
      getDypBalance();
      getListedNtsAsc();
    }
  }, [coinbase, nftCount]);

  useEffect(() => {
    if (offerData.length > 0) {
      setprice(getFormattedNumber(offerData[0].offer[0] / 1e18, 2));
      setFilter1(
        offerData[0].offer.payment.priceType === "0" ? "weth" : "dypv1"
      );
    }
  }, [offerData.length]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between gap-1  position-relative">
            <h6 className="text-white summarytitle">Make an offer</h6>
            <img
              src={closeX}
              alt=""
              className="close-x"
              onClick={() => {
                onclose();
              }}
              style={{ bottom: "17px", right: "-22px", width: "auto" }}
            />
          </div>
          <div className="summarywrapper">
            <div className="d-flex flex-column flex-column flex-xxl-row flex-lg-row align-items-start align-items-lg-center justify-content-between">
              <div className="d-flex flex-row w-100 flex-xxl-row flex-lg-row  align-items-center gap-2">
                <img
                  className="p-0 nft-img nftimg2"
                  src={
                    isCaws
                      ? `https://mint.dyp.finance/thumbs150/${nftId}.png`
                      : isWod
                      ? `https://mint.worldofdypians.com/thumbs150/${nftId}.png`
                      : `https://timepiece.worldofdypians.com/thumbs150/${nftId}.png`
                  }
                  alt=""
                  loading="lazy"
                  style={{width: 80, height: 80}}
                />
                <div className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column align-items-center">
                    <span className="itemname">
                      {isCaws ? "CAWS" : isWod ? "Genesis Land" : "Timepiece"} #
                      {nftId}
                    </span>
                    {/* <span className="itemcollectionName">
                   {nft.name}
                  </span> */}
                  </div>
                  <span className="itemchain">Chain: Ethereum</span>
                </div>
              </div>
              {nft.price && (
                <div className="d-flex flex-row flex-lg-column flex-xxl-column gap-2 gap-lg-0 gap-xxl-0 align-items-xxl-end align-items-lg-end align-items-center">
                  <span className="itemname" style={{ whiteSpace: "nowrap" }}>
                    {getFormattedNumber(nft.price / 1e18, 2)}{" "}
                    {nft.payment_priceType === 0
                      ? "ETH"
                      : nft.payment_tokenAddress ===
                        window.config.token_dypius_new_address
                      ? "DYPv2"
                      : "DYPv1"}
                  </span>
                  <span className="itemcollectionName">
                    $
                    {getFormattedNumber(
                      nft?.payment_priceType === 0
                        ? ethTokenData * (nft?.price / 1e18)
                        : nft?.payment_tokenAddress ===
                          window.config.dyp_token_address
                        ? dyptokenData_old * (nft?.price / 1e18)
                        : dypTokenData * (nft?.price / 1e18),
                      2
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="summarywrapper">
            <div className="d-flex flex-column align-items-center justify-content-between">
              <div className="d-flex w-100 align-items-center gap-3 justify-content-between">
                <span className="itemchain">Balance</span>
                <span className="itemchain">
                  {filter1 === "weth"
                    ? getFormattedNumber(wethBalance, 2)
                    : filter1 === "dypv2"
                    ? getFormattedNumber(dypBalance_new, 2)
                    : getFormattedNumber(dypBalance, 2)}{" "}
                  {filter1 === "weth"
                    ? "WETH"
                    : filter1 === "dypv2"
                    ? "DYPv2"
                    : "DYPv1"}
                </span>
              </div>
              <div className="d-flex w-100 align-items-center gap-3 justify-content-between">
                <span className="itemchain">Floor price</span>
                <span className="itemchain">
                  {getFormattedNumber(
                    filter1 === "weth"
                      ? lowestPriceNftListed / 1e18
                      : lowestPriceNftListedDYP / 1e18,
                    2
                  )}{" "}
                  {filter1 === "weth" ? "ETH" : "DYPv1"}
                </span>
              </div>
              {offerData.length > 0 && (
                <div className="d-flex  w-100 align-items-center gap-3 justify-content-between">
                  <span className="itemchain">Best offer</span>
                  <span className="itemchain">
                    {getFormattedNumber(bestOffer.offer.price / 1e18, 2)}{" "}
                    {bestOffer.offer.payment.priceType === "0"
                      ? "ETH"
                      : bestOffer.offer.payment.tokenAddress ===
                        window.config.token_dypius_new_address
                      ? "DYPv2"
                      : "DYPv1"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="summaryseparator"></div>
          {offerData.length > 0 && (
            <div className="summaryred">
              <div className="d-flex align-items-center gap-2 justify-content-between w-100">
                <span className="itemchain">
                  <img src={whiteTag} alt="" /> My offer
                </span>
                <div className="d-flex flex-row flex-lg-column flex-xxl-column gap-2 gap-lg-0 gap-xxl-0 align-items-end">
                  <span className="itemname" style={{ whiteSpace: "nowrap" }}>
                    {getFormattedNumber(offerData[0].offer[0] / 1e18, 2)}{" "}
                    {offerData[0].offer.payment.priceType === "0"
                      ? "ETH"
                      : offerData[0].offer.payment.tokenAddress ===
                        window.config.token_dypius_new_address
                      ? "DYPv2"
                      : "DYPv1"}
                  </span>
                  <span className="itemcollectionName">
                    $
                    {getFormattedNumber(
                      offerData[0].offer.payment.priceType === "0"
                        ? ethTokenData * (offerData[0].offer[0] / 1e18)
                        : offerData[0].offer.payment.tokenAddress ===
                          window.config.token_dypius_new_address
                        ? dypTokenData * (offerData[0].offer[0] / 1e18)
                        : dyptokenData_old * (offerData[0].offer[0] / 1e18),
                      offerData[0].offer.payment.priceType === "0" ? 3 : 3
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row align-items-center gap-3 justify-content-between">
            <div className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row align-items-center gap-2">
              <input
                type="number"
                min={0}
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="Price"
                className="px-3 py-2 offerInput"
                value={price}
                onClickCapture={() => {
                  setprice(price != 0 ? price : "");
                }}
                onChange={(e) => {
                  setprice(e.target.value === "" ? "" : Number(e.target.value));
                  isapprovedMakeOffer(
                    Number(e.target.value),
                    filter1 === "weth" ? 0 : 1,
                    filter1
                  );
                }}
              />
              <span className="itemcollectionName">
                $
                {getFormattedNumber(
                  filter1 === "weth"
                    ? ethTokenData * price
                    : filter1 === "dypv2"
                    ? dypTokenData * price
                    : dyptokenData_old * price,
                  3
                )}
              </span>
            </div>
            <div className="dropdown" style={{ width: "150px" }}>
              <button
                className="btn btn-secondary nft-dropdown w-100
                 d-flex align-items-center justify-content-between dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center gap-2">
                  <h6
                    className="filter-nav-title mb-0"
                    style={{ textTransform: "uppercase" }}
                  >
                    {filter1}
                  </h6>
                </div>
                <img src={dropdownIcon} alt="" />
              </button>
              <ul className="dropdown-menu nft-dropdown-menu  p-2 w-100">
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilter1("weth");
                    isapprovedMakeOffer(price, 0, "weth");
                  }}
                >
                  <span>WETH</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilter1("dypv1");
                    isapprovedMakeOffer(price, 1, "dypv1");
                  }}
                >
                  <span>DYPv1</span>
                </li>
                <li
                  className="nft-dropdown-item"
                  onClick={() => {
                    setFilter1("dypv2");
                    isapprovedMakeOffer(price, 1, "dypv2");
                  }}
                >
                  <span>DYPv2</span>
                </li>
              </ul>
            </div>
          </div>
          {offerData.length === 0 ? (
            <button
              className={`btn ${
                status === "fail" || approvestatus === "fail"
                  ? "errorbtn"
                  : "mint-now-btn"
              } gap-2 align-self-center align-self-xxl-end align-self-xl-end align-self-lg-end mt-4`}
              style={{ width: "fit-content" }}
              onClick={() => {
                isApprove
                  ? handleMakeOffer(price, filter1 === "weth" ? 0 : 1, filter1)
                  : approveMakeOffer(
                      price,
                      filter1 === "weth" ? 0 : 1,
                      filter1
                    );
              }}
            >
              {status !== "fail " ||
                (!isApprove && <img src={whiteTag} alt="" />)}
              {status === "initial" ? (
                isApprove ? (
                  "Make offer"
                ) : approvestatus === "initial" ? (
                  "Approve"
                ) : approvestatus === "loading" ? (
                  <>
                    Approving{" "}
                    <div
                      className="spinner-border mx-1"
                      role="status"
                      style={{ width: 16, height: 16 }}
                    ></div>
                  </>
                ) : (
                  "Failed"
                )
              ) : status === "loading" ? (
                <>
                  Making offer{" "}
                  <div
                    className="spinner-border mx-1"
                    role="status"
                    style={{ width: 16, height: 16 }}
                  ></div>
                </>
              ) : status === "success" ? (
                "Success"
              ) : (
                "Failed"
              )}
            </button>
          ) : (
            <div className="d-flex align-items-center gap-2 justify-content-between w-100">
              <button
                className={`btn ${
                  deletestatus === "faildelete" ? "errorbtn" : "mint-now-btn"
                } gap-2  align-self-center align-self-xxl-end align-self-xl-end align-self-lg-end  mt-4`}
                style={{ width: "fit-content" }}
                onClick={() => {
                  handleDeleteOffer(offerData[0].index);
                }}
              >
                {deletestatus === "initial" ? (
                  "Delete offer"
                ) : deletestatus === "loadingdelete" ? (
                  <>
                    Deleting offer{" "}
                    <div
                      className="spinner-border mx-1"
                      role="status"
                      style={{ width: 16, height: 16 }}
                    ></div>
                  </>
                ) : deletestatus === "successdelete" ? (
                  "Success"
                ) : (
                  "Failed"
                )}
              </button>

              <button
                className={`btn ${
                  updatestatus === "failupdate" ? "errorbtn" : "pill-btn"
                } gap-2  align-self-center align-self-xxl-end align-self-xl-end align-self-lg-end  mt-4`}
                style={{ width: "fit-content" }}
                onClick={() => {
                  handleUpdateOffer(
                    price,
                    filter1 === "weth" ? 0 : 1,
                    offerData[0].index,
                    filter1
                  );
                }}
              >
                {updatestatus === "initial" ? (
                  "Update"
                ) : updatestatus === "loadingupdate" ? (
                  <>
                    Updating offer{" "}
                    <div
                      className="spinner-border mx-1"
                      role="status"
                      style={{ width: 16, height: 16 }}
                    ></div>
                  </>
                ) : updatestatus === "successupdate" ? (
                  "Success"
                ) : (
                  "Failed"
                )}
              </button>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default MakeOffer;
