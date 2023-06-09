import React, { useState } from "react";
import TitleWithParagraph from "../../General/TitleWithParagraph";
import Button from "../../General/Button";
import "./_catWhiteList.scss";

const CatSocietyRanking = () => {
  const [isConnected, setisConnected] = useState(false);

  const joinDiscord = () => {
    window.open("https://discord.gg/worldofdypians", "_blank");
  };

  const handleWhitelistUpdate = async (e) => {
    e.preventDefault();

    let whitelisted = false;

    try {
      let isConnected = await window.connectWallet();

      let account = await window.getCoinbase();
      let checkNft = await window.checkWhitelistNft(account);

      whitelisted = checkNft;

      if (!checkNft) {
        // take signature here
        let auth_token = null;

        let signature = await window.sign(
          window.config.whitelist_nft,
          await window.getCoinbase()
        );
        console.log({ signature });
        auth_token = signature;
        // end taking signature logic

        let chainId = await window.getChainId();
        chainId = JSON.stringify(chainId);
        let m = window.alertify.message("Processing...");

        try {
          m.ondismiss = (f) => false;

          await window.jQuery.ajax({
            url: `${window.config.api_baseurl}/api/whitelist-nft`,
            method: "POST",
            data: { chainId },
            // processData: false,
            headers: {
              "auth-token": auth_token,
            },
          });

          window.alertify.message("Whitelisted!");
        } catch (e) {
          window.alertify.error("Something went wrong!" + e.responseText);
        } finally {
          m.ondismiss = (f) => true;
          m.dismiss();
        }
      }

      setisConnected(true);

      if (whitelisted) window.alertify.message("Already Whitelisted!");

      if (isConnected) {
        let coinbase = await window.getCoinbase();
        console.log({ coinbase });
        //this.setState({ coinbase })
      }
    } catch (e) {
      window.alertify.error(String(e));
    }
  };

  return (
    <div className="cats-whitelist background">
      <div className="container-fluid position-relative">
        <div className="row align-items-center pt-5 px-0 px-md-4">
          <div className="col-md-5">
            <TitleWithParagraph>
              <h1 className="mb-4">
                <small>CATS AND WATCHES SOCIETY</small>
                <br />
                WHITELIST
              </h1>
              <p className="mb-4">
                To get your address registered for the upcoming mint you have to
                connect your wallet, sign a message with your metamask wallet,
                and join our discord. You will be able to mint your caws only
                from registered address.
              </p>
              <p className="mb-5">
                <div className="d-flex">
                  {isConnected ? (
                    <Button
                      icon=""
                      type={"secondary"}
                      rounded={false}
                      text={"Wallet Connected"}
                      className="my-4 mr-4"
                    />
                  ) : (
                    <Button
                      action={handleWhitelistUpdate}
                      icon="arrow-red.svg"
                      type={"secondary"}
                      rounded={false}
                      text={"Connect Wallet"}
                      className="my-4 mr-4"
                    />
                  )}
                  <Button
                    action={joinDiscord}
                    icon="arrow.svg"
                    type={"primary"}
                    bordered
                    rounded={false}
                    text={"Join Discord"}
                    className="my-4"
                  />
                </div>
              </p>
            </TitleWithParagraph>
          </div>
          <div className="col-md-7 text-center">
            <img
              src={require("../../../../../assets/Nft/cats-whitelist-image.png")}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="svg-container"></div>
      </div>
    </div>
  );
};

export default CatSocietyRanking;
