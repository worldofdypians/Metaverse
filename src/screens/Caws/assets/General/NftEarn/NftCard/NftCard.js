import React, { useState, useEffect } from "react";
import NftBanner from "./cawsimg.svg";
import CawsBadge from "./cawsbadge.svg";
import { NavLink } from "react-router-dom";
import ChevronArrowSvg from "../../ChevronArrowSvg/ChevronArrowSvg";
import EthLogo from "../../../../assets/General/eth-create-nft.png";

const NftCard = () => {
  const [mystakes, setMystakes] = useState([]);

  const myStakes = async () => {
    let staking_contract = await new window.infuraWeb3.eth.Contract(
      window.NFT_ABI,
      window.config.nft_address,
      {from: undefined}
  );
    await staking_contract.methods
    .balanceOf(window.config.nftstaking_address)
    .call()
    .then((data)=>{setMystakes(data)});
    
  };


  useEffect(() => {
      myStakes().then();
  }, []);

  return (
    <div className="subasset-card-with-button col-md-3">
      <img src={NftBanner} alt="" id="newbadge" />
      <div className="nftcard">
        <div>
          <div className="row m-0 align-items-center justify-content-between data-section-top">
            <p style={{ color: "white" }}>
              <img src={CawsBadge} alt="" className="mr-1" />
              CAWS
            </p>
            <p style={{ color: "white" }}>50% APR</p>
          </div>
         
            <div className="row m-0 align-items-center justify-content-between data-section-middle">
              <p style={{ color: "white" }}>Total NFTs locked</p>
              <p style={{ color: "white" }}>{mystakes}/10000</p>
            </div>
        

          <div className="row m-0 align-items-center justify-content-between data-section-bottom">
            <p style={{ color: "white" }}>Lock time</p>
            <p style={{ color: "white" }}>30 Days</p>
          </div>
        </div>
        <div className="whiteseparator"></div>
        <div className="button-wrapper p-0">
          <NavLink to="/stake-caws">
            <button className="depositnowBtn">
              Deposit now
              <ChevronArrowSvg color={"#E9181B"} />
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
