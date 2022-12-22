import React from "react";
import TitleWithParagraph from "../../General/TitleWithParagraph";
import arrowFilled from "../../../assets/General/ArrowIcons/arrow-filled2.png";
import "./_catsAndWatchesSociety.scss";

const CatsAndWatchesSociety = () => {
  const scrollToRoadMap = () => {
    document.getElementById("roadmap").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="cats-and-watches-society container-padding">
      <div className="container-fluid" style={{ paddingTop: "150px" }}>
        <div className="row align-items-center w-100 m-0 gap-2">
          {/* to be checked if text on blue cards is static */}
          <div className="col-12 col-md-12 col-lg-5">
            <TitleWithParagraph>
              <h1  className="text-white font-poppins">
                <small>COME IN AND</small> <br />
                JOIN THE SOCIETY!
              </h1>
              <p className="mb-4 text-white font-poppins">
                Since the beginning of time, cats have been worshiped as Gods
                and they will never let you forget that! In an endless quest to
                preserve their God Like status, cats have taken to a new
                exquisite hobby: They love to collect watches! Well, just like
                cats, watches are always right and they require a lot of
                attention and care to keep their pristine condition.
              </p>
              <p className="mb-4 text-white font-poppins">
                Cats and Watches Society (CAWS) are randomly generated Cat NFTs
                from over <mark>235 different traits.</mark> The Society’s
                population has almost reached its capacity and is ready for
                adoption!
              </p>
              <p className="mb-4 text-white font-poppins">
                These unique icons will live on the Ethereum blockchain as
                ERC-721 tokens and they’ll be hosted on the Interplanetary File
                System (IPFS).
              </p>
              <p className="mb-4 text-white font-poppins">
                Through the adoption process, your cat will be fitted with a
                cool luxury watch and will also grant you access to the
                members-only Society Benefits Zone. As a new cat owner, you will
                receive <mark>10% of minting fees</mark> and can join the CAWS
                staking pool to earn ETH rewards.
              </p>
              <p onClick={scrollToRoadMap} className="mb-4 cursor-pointer">
                <mark>Our roadmap includes many other upcoming Benefits!</mark>
                <img className="ml-2" src={arrowFilled} alt=''/>
              </p>
            </TitleWithParagraph>
          </div>
          <div className="col-12 col-md-12 col-lg-6">
            <img
              src={require("../../../assets/Nft/caws-meta-dark.png")}
              className="main-hero-graphics graphics w-100"
              alt="phone-graphics"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatsAndWatchesSociety;
