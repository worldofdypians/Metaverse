import React from "react";
import ProgressBar from "../../../elements/ProgressBar/ProgressBar";
import RedCircle from "../../../assets/images/done-white.svg";
import "./_catsTimeLine.scss";

const CatsTimeLine = () => {
  return (
    <div className="cats-timeline">
      <ul className="pl-4">
        <li className="d-flex align-items-center">
          10,000 CAWS are minted{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          10 ETH Giveaway{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          We pay 10% of minting fees to holders{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          Introduction of CAWS staking pool to earn ETH rewards{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          You can have a watch too! Take part in a giveaway for 5 Rolex watches
          worth $150k{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          Lots of cool merch{" "}
          <ProgressBar
            width={53}
            height={4}
            percent={0.8}
            status={"In Progress"}
          />
        </li>
        <li className="d-flex align-items-center">
          CAWS holders will be able to mint an additional standalone watch NFT
          for free{" "}
          <ProgressBar
            width={53}
            height={4}
            percent={0.8}
            status={"In Progress"}
          />
        </li>
        <li className="d-flex align-items-center">
          CAWS Adventures 2D mobile/pc Game{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          You can buy and sell on secondary market through OpenSea{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          Listing on Rarity Tools{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          Virtual reality in Metaverse begins for CAWS{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
        <li className="d-flex align-items-center">
          Play to earn NFT concept becomes active for CAWS holders{" "}
          <img
            src={RedCircle}
            alt=""
            style={{
              background: "white",
              height: 25,
              width: 25,
              borderRadius: "50%",
              marginLeft: 10,
            }}
          />
        </li>
      </ul>
    </div>
  );
};

export default CatsTimeLine;
