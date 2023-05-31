import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import getListedNFTS from "../../actions/Marketplace";
import ItemCard from "../../components/ItemCard/ItemCard";

function Index({isConnected}) {
  const params = useParams();

  const [listedNFT, setListedNFT] = useState({});

  useEffect(() => {
    getListedNFTS(parseInt(params.block)).then((NFT) => setListedNFT(NFT[0]));
  }, []);

  if (!listedNFT) return <div>Not Found...</div>;

  console.log(listedNFT);

  return (
    <div className="container-lg p-0 position-relative">
      <div className="main-wrapper my-4 w-100">
        <h1>This is the test page {params.block}</h1>
        <ItemCard nft={listedNFT} isConnected={isConnected} single={true} />
      </div>
    </div>
  );
}

export default Index;
