import React, {useEffect, useState} from "react";
import CatsAndWatchesSociety from "./components/Nft/CatsAndWatchesSociety";
import CatsAndWatchesSocietyBenefits from "./components/Nft/CatsAndWatchesSocietyBenefits";
import CatSocietyRanking from "./components/Nft/CatSocietyRanking";
import CawsRoadmap from "./components/Nft/CawsRoadmap";
import CawsTraits from "./components/Nft/CawsTraits";
import FullScreenMainHero from "./components/Nft/FullScreenMainHero";
import CawsGame from "./CawsGame/CawsGame";
import NftStaking from "./NftStaking";


const Caws = () => {

    
    const [openedNft, setOpenedNft] = useState(false);



    const onShareClick = (item) => {
        // when user clicks share nft link
        console.log("item clicked", item);
    };

    // const latestMint = async () => {
    //     let end = await window.latestMint();
    //
    //     let start = end - 7;
    //
    //     let latest = range(start, end);
    //
    //     let nfts = latest.map((nft) => window.getNft(nft));
    //
    //     nfts = await Promise.all(nfts);
    //
    //     nfts.reverse();
    //
    //     setLatestMintNft(nfts);
    // };

    const onNftClick = (item) => {
        setOpenedNft(item);
    };


    // const myNft = async () => {
    //     let myNft = await window.myNftList(connectedWallet);
    //
    //     let nfts = myNft.values.map((nft) => window.getNft(nft));
    //
    //     nfts = await Promise.all(nfts);
    //
    //     nfts.reverse();
    //
    //     setMyNFTs(nfts);
    // };

    // useEffect(() => {
    //     latestMint().then();
    //
    //     if (connectedWallet) {
    //         myNft().then();
    //     }
    //
    //     const interval = setInterval(() => {
    //         if (connectedWallet) {
    //             myNft().then();
    //         }
    //         latestMint().then();
    //     }, 5000);
    //
    //     return () => clearInterval(interval);
    // }, [connectedWallet]);

    useEffect(()=>{
        window.scrollTo(0,0)
        document.title = 'Caws'


    },[])

    return (
        <div className="container-fluid px-0 d-flex align-items-center justify-content-center">
            <div className="d-flex w-100 flex-column news-main-wrapper" style={{gap: 0}}>
            <FullScreenMainHero image={"nft-main-image2.jpg"} hasScroll={true} />
            <div className="caws-container px-3 px-lg-5">
                <CatsAndWatchesSociety />
                <CawsGame/>
                {/*<div className="containerCaws col-lg-12">*/}
                {/*  <div className="container-padding row justify-content-between align-items-center">*/}
                {/*    <CtaButton />*/}
                {/*    <LatestMints*/}
                {/*      onItemClick={onNftClick}*/}
                {/*      items={latestMintNft}*/}
                {/*      label="#Trending"*/}
                {/*      smallTitle=""*/}
                {/*      bigTitle=""*/}
                {/*      visibleLatestMint={true}*/}
                {/*    />*/}
                {/*    <NftCardModal*/}
                {/*      modalId="newNft"*/}
                {/*      nftItem={openedNft}*/}
                {/*      visible={openedNft ? true : false}*/}
                {/*      link={link}*/}
                {/*      onShareClick={onShareClick}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</div>*/}
                <NftStaking/>
                <CawsTraits />
                <CatSocietyRanking />
                <CatsAndWatchesSocietyBenefits />
                <CawsRoadmap />
                <a
                    style={{ display: "none" }}
                    href="https://raritysniper.com/nft-drops-calendar"
                >
                    NFT Drops
                </a>
            </div>
</div>
        </div>
    )
}

export default Caws
