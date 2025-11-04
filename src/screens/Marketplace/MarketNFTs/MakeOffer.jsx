import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box"; 
import "./_filters.scss";
import getFormattedNumber from "../../Caws/functions/get-formatted-number";
import useWindowSize from "../../../hooks/useWindowSize";
import "../_marketplace.scss";  
import getListedNFTS from "../../../actions/Marketplace";
import { writeContract, readContract, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiClient } from "../../../wagmiConnectors";
import { parseEther } from "viem";

 


const MakeOffer = ({
  open,
  onclose,
  isCaws,
  isWod,
  isTimepiece,
  nft,
  ethTokenData,
  handleMakeOffer,
  handleUpdateOffer,
  handleDeleteOffer,
  nftCount,
  coinbase,
  status,
  nftAddr,
  nftId,
  deletestatus,
  updatestatus,
  lowestPriceNftListed
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
  const [bestOffer, setbestOffer] = useState([]);

  const { BigNumber } = window;

 


  const getOffer = async () => {
    try {
      const result = await readContract(wagmiClient, {
        address: window.config.nft_marketplace_address,
        abi: window.MARKETPLACE_ABI,
        functionName: "getAllOffers",
        args: [nftAddr, BigInt(nftId)],
        chainId: 1,
      });

      const finalArray = result.filter((object) => {
        return object.offer.buyer.toLowerCase() === coinbase.toLowerCase();
      });

      const maxPrice = Math.max(...result.map((o) => Number(o.offer.price)));
      const obj = result.find((item) => Number(item.offer.price) == maxPrice);
      setbestOffer(obj);
      setofferData(finalArray);
    } catch (e) {
      console.error("Error getting offers:", e);
      setofferData([]);
    }
  };

  const approveMakeOffer = async (price, pricetype, tokenType) => {
    const newPrice = new BigNumber(price * 1e18).toFixed();
    setapprovestatus("loading");
    
    try {
      // WETH address for offers
      const tokenAddress = window.config.weth2_address;
      
      const hash = await writeContract(wagmiClient, {
        address: tokenAddress,
        abi: window.TOKEN_ABI,
        functionName: "approve",
        args: [window.config.nft_marketplace_address, newPrice],
      });

      const receipt = await waitForTransactionReceipt(wagmiClient, {
        hash: hash,
      });

      if (receipt) {
        setisApprove(true);
        setapprovestatus("success");
        setTimeout(() => {
          setapprovestatus("initial");
        }, 3000);
      }
    } catch (e) {
      console.error("Error approving for offer:", e);
      setapprovestatus("fail");
      setTimeout(() => {
        setapprovestatus("initial");
      }, 3000);
    }
  };


  const isapprovedMakeOffer = async (price, pricetype, tokenType) => {
    try {
      const newPrice = new BigNumber(price * 1e18).toFixed();
      const tokenAddress = window.config.weth2_address;
      
      const result = await readContract(wagmiClient, {
        address: tokenAddress,
        abi: window.TOKEN_ABI,
        functionName: "allowance",
        args: [coinbase, window.config.nft_marketplace_address],
        chainId: 1,
      });

      const isApproved = BigInt(result) >= BigInt(newPrice);
      setisApprove(isApproved);
      return isApproved;
    } catch (e) {
      console.error("Error checking offer approval:", e);
      setisApprove(false);
      return false;
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:
      windowSize.width && windowSize.width > 1400
        ? "30%"
        : windowSize.width && windowSize.width > 786
        ? "50%"
        : windowSize.width && windowSize.width < 786
        ? "90%"
        : "30%",
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
      // getDypBalance(); 
      isapprovedMakeOffer(price, 0, "weth");
    }
  }, [coinbase, nftCount]);

  useEffect(() => {
    if (offerData.length > 0) {
      setprice(getFormattedNumber(offerData[0].offer[0] / 1e18, 2));
      setFilter1(
          "weth"  
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
              src={'https://cdn.worldofdypians.com/wod/popupXmark.svg'}
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
                  style={{ width: 80, height: 80 }}
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
                    ETH
                  </span>
                  <span className="itemcollectionName">
                    $
                    {getFormattedNumber( ethTokenData * (nft?.price / 1e18)
                        ,
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
                  {getFormattedNumber(wethBalance, 2)
                    }{" "}
                  WETH
                </span>
              </div>
              <div className="d-flex w-100 align-items-center gap-3 justify-content-between">
                <span className="itemchain">Floor price</span>
                <span className="itemchain">
                  {getFormattedNumber(
                    lowestPriceNftListed / 1e18
                      ,
                    2
                  )}{" "}
                 ETH
                </span>
              </div>
              {offerData.length > 0 && (
                <div className="d-flex  w-100 align-items-center gap-3 justify-content-between">
                  <span className="itemchain">Best offer</span>
                  <span className="itemchain">
                    {getFormattedNumber(bestOffer.offer.price / 1e18, 2)}{" "}
                    ETH
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
                  <img src={'https://cdn.worldofdypians.com/wod/whiteTag.svg'} alt="" /> My offer
                </span>
                <div className="d-flex flex-row flex-lg-column flex-xxl-column gap-2 gap-lg-0 gap-xxl-0 align-items-end">
                  <span className="itemname" style={{ whiteSpace: "nowrap" }}>
                    {getFormattedNumber(offerData[0].offer[0] / 1e18, 2)}{" "}
                    ETH
                  </span>
                  <span className="itemcollectionName">
                    $
                    {getFormattedNumber(
                      ethTokenData * (offerData[0].offer[0] / 1e18)
                        ,3
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
                     0,
                    filter1
                  );
                }}
              />
              <span className="itemcollectionName">
                $
                {getFormattedNumber(
                  ethTokenData * price
                   ,
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
                <img src={'https://cdn.worldofdypians.com/wod/dropdownIcon.svg'} alt="" />
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
                {/* <li
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
                </li> */}
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
                  ? handleMakeOffer(price, 0, filter1)
                  : approveMakeOffer(
                      price,
                      0,
                      filter1
                    );
              }}
            >
              {status !== "fail " ||
                (!isApprove && <img src={'https://cdn.worldofdypians.com/wod/whiteTag.svg'} alt="" />)}
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
                   0,
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
