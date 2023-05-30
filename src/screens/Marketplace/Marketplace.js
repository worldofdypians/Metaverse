import React, { useEffect, useState } from "react";
import './_marketplace.scss'
import { HashLoader } from "react-spinners";
import wodLogo from './assets/wodLogo.png'
import cawsLogo from './assets/cawsLogo.png'
import ItemCard from "../../components/ItemCard/ItemCard";
import { NavLink } from "react-router-dom";




const Marketplace = ({listedNFTS, isConnected, handleConnect}) => {

  const override = {
    display: "block",
    margin: "auto",
    borderColor: "#554fd8",
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listedNFTS && listedNFTS.length === 0) {
      setLoading(true);
    }
    if (listedNFTS && listedNFTS.length > 0) {
      setLoading(false);
    }
  }, [listedNFTS]);

  return (
    <div className="container-fluid p-0">
    {/* <HomeHero /> */}
    <div className="container-lg position-relative">
      {/* <WhyDypius /> */}
      <div className="main-wrapper my-4 w-100">
        <h1 className="collection-header">NFT Collections</h1>
        <div className="d-flex align-items-center gap-4 my-4">
          <a href="#caws" className="collection-item d-flex align-items-center gap-2 px-3 py-2" style={{textDecoration: 'none'}}>
            <img src={cawsLogo} width={25} height={25} alt="" />
            <span className="collection-title">Cats And Watches Society</span>
          </a>
          <a href="#timepiece" className="collection-item d-flex align-items-center gap-2 px-3 py-2" style={{textDecoration: 'none'}}>
            <img src={cawsLogo} width={25} height={25} alt="" />
            <span className="collection-title">CAWS Timepiece NFT Collection</span>
          </a>
          <a href="#wod" className="collection-item d-flex align-items-center gap-2 px-3 py-2" style={{textDecoration: 'none'}}>
            <img src={wodLogo} width={25} height={25} alt="" />
            <span className="collection-title">World of Dypians</span>
          </a>
        </div>
        <h1 className="my-5 collection-header" id="caws">Cats and Watches Society</h1>
        <div className="d-flex align-items-center gap-4 my-4">
        <div className={loading === false ? "item-cards-wrapper" : "loader-wrapper"}>
        {listedNFTS && listedNFTS.length > 0 ? (
          listedNFTS.slice(0,4).map((nft) => (
            <ItemCard key={nft.id} nft={nft} isConnected={isConnected} showConnectWallet={handleConnect}></ItemCard>
          ))
        ) : (
          <HashLoader
            color={"#554fd8"}
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
        </div>
      <div className="d-flex w-100 align-items-center justify-content-end">
        <NavLink to="cats-and-watches-society">
        <button className="btn home-hero-btn px-4 py-2">View All</button>
        </NavLink>
      </div>
        <h1 className="my-5 collection-header" id="timepiece">CAWS Timepiece NFT Collection</h1>
        <div className="d-flex align-items-center gap-4 my-4">
          <div className={loading === false ? "item-cards-wrapper" : "loader-wrapper"}>
        {listedNFTS && listedNFTS.length > 0 ? (
          listedNFTS.slice(0,4).map((nft) => (
            <ItemCard key={nft.id} nft={nft} isConnected={isConnected} showConnectWallet={handleConnect}></ItemCard>
          ))
        ) : (
          <HashLoader
            color={"#554fd8"}
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
        </div>
        <div className="d-flex w-100 align-items-center justify-content-end">
        <NavLink to="timepiece">
        <button className="btn home-hero-btn px-4 py-2">View All</button>
        </NavLink>
      </div>
        <h1 className="my-5 collection-header" id="wod">World of Dypians</h1>
        <div className="d-flex align-items-center gap-4 my-4">
         <div className={loading === false ? "item-cards-wrapper" : "loader-wrapper"}>
        {listedNFTS && listedNFTS.length > 0 ? (
          listedNFTS.slice(0,4).map((nft) => (
            <ItemCard key={nft.id} nft={nft} isConnected={isConnected} showConnectWallet={handleConnect}></ItemCard>
          ))
        ) : (
          <HashLoader
            color={"#554fd8"}
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
        </div>
        <div className="d-flex w-100 align-items-center justify-content-end">
        <NavLink to="world-of-dypians">
        <button className="btn home-hero-btn px-4 py-2">View All</button>
        </NavLink>
      </div>
        {/* <div className="mx-0 row my-3">
          <div className="col-12 col-lg-4">
            <NavLink to="/timepiece" style={{color: 'inherit', textDecoration: 'none'}}>
              <CollectionCard
                title={"CAWS Timepiece"}
                collectionName={"timepiece"}
              />
            </NavLink>
          </div>
          <div className="col-12 col-lg-4">
            <NavLink to="/world-of-dypians" style={{color: 'inherit', textDecoration: 'none'}}>
              <CollectionCard
                title={"World of Dypians"}
                collectionName={"wod"}
              />
            </NavLink>
          </div>
          <div className="col-12 col-lg-4">
            <NavLink to="/cats-and-watches-society" style={{color: 'inherit', textDecoration: 'none'}}>
              <CollectionCard
                title={"Cats and Watches Society"}
                collectionName={"caws"}
              />
            </NavLink>
          </div>
        </div> */}
        {/* <div className={loading === false ? "item-cards-wrapper" : ""}>
          {listedNFTS && listedNFTS.length > 0 ? (
            listedNFTS.map((nft) => (
              <ItemCard key={nft.id} nft={nft} isConnected={isConnected} showConnectWallet={handleConnect}></ItemCard>
            ))
          ) : (
            <BounceLoader
              color={"#554fd8"}
              loading={loading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div> */}
   
   
      </div>
    </div>
  </div>
  );
};

export default Marketplace;
