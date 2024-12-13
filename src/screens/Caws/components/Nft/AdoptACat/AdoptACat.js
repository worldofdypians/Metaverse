import React from "react";
import Button from "../../General/Button";
import { NavLink } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './_adoptACat.scss'


const AdoptACat = () => {
  // const navigate = useNavigate();
  let navigate = useHistory();
  function goToWhitelist() {
    navigate.push("/whitelist");
  }



  return (
    <div className="adopt-a-cat container-padding pt-0">
      <span className="blur-backgroud-top-left" />
      <div className="container-fluid position-relative">
        <div className="row background py-5 px-2 px-md-4">
          <div className="col-md-3">
            <h2>
              <b>DISTRIBUTION</b>
            </h2>
            
            <p className="mb-2">
              There are <b>no bonding curves</b> here. We don’t believe whales
              are the only people who should be able to mint.
            </p>
            <p>
              Minting a Cat only costs 0.08 ETH. There are no price tiers, or
              crazy hoops to jump through. Everyone who wants to adopt will get
              the same price and access to their new feline friends!
            </p>
          </div>
          <div className="col-md-3 offset-md-1">
            <h1 className="bolder">
              <small>ADOPT A</small> <br />
              CAT
            </h1>
            {/*<Button onClick={() => { navigate("/whitelist"); }} icon="arrow-red.svg" type={'secondary'} rounded={false} text={'Join whitelist'} className="my-4" />*/}
            <Button
              onClick={goToWhitelist}
              icon="arrow-red.svg"
              type={"secondary"}
              rounded={false}
              text={"Join whitelist"}
              className="my-4"
            />
          </div>
          <div className="col-md-5 postion-relative">
            <div className="row">
              <div className="col-md-7 order-2 order-md-1">
                <img
                  className="img-fluid position-absolute image px-4 px-md-0"
                  src={require("../../../../../assets/Nft/adopt-a-cat.png")}
                />
              </div>
              <div className="col-md-5 order-1 order-md-2">
                <p className="note pr-4 pl-1">
                  Note: Fifty of our cats are reserved for giveaways, rewards
                  and the DYP Community. You can’t adopt them.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="svg-container"></div>
      </div>
      <span className="blur-backgroud-bottom-right" />
    </div>
  );
};

export default AdoptACat;
