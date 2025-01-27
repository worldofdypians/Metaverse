import React, { useState, useEffect } from "react";

import MyNfts from "./MyNfts/MyNfts";
import NftCardModal from "./NftCardModal/NftCardModal";
import NftLoadingModal from "./NftLoadingModal/NftLoadingModal";
import MyStakes from "./MyStakes/MyStakes";
import NftStakeCheckListModal from "./NftStakeChecklistModal/NftStakeChecklistModal";
import NftUnstakeModal from "./NftUnstakeModal/NftUnstakeModal";
import NftStakeModal from "./NftStakeModal/NftStakeModal";

import NewMintForm from "./NewMintForm/NewMintForm";

import NftMintingHero from "./NftMintingHero/NftMintingHero";
import Web3 from "web3";

const NftMinting = () => {
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showWhitelistLoadingModal, setShowWhitelistLoadingModal] =
    useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [showClaimAllModal, setShowClaimAllModal] = useState(false);

  //Load My Nfts
  const [myNFTs, setMyNFTs] = useState([]);
  //Show No. of Created Nfts
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);
  const [latestMintNft, setLatestMintNft] = useState([]);
  const [createdNft, setCreatedNft] = useState({});
  const [openedNft, setOpenedNft] = useState(false);
  const [openStakeNft, setOpenStakeNft] = useState(false);
  const [openUnStakeNft, setOpenUnStakeNft] = useState(false);

  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [showToStake, setshowToStake] = useState(false);
  const [showStaked, setshowStaked] = useState(true);

  const [mystakes, setMystakes] = useState([]);
  //Connect Wallet
  const [isConnectedWallet, setIsConnectedWallet] = useState(false);
  const [cawsMinted, setCawsMinted] = useState(0);
  const [EthRewards, setEthRewards] = useState(0);
  const [itemId, setItem] = useState();
  const [nftItemId, setNftItem] = useState();
  const [claimAllStatus, setclaimAllStatus] = useState(
    "Are you sure you want to Claim all your current selected NFT’s?"
  );
  const [unstakeAllStatus, setunstakeAllStatus] = useState(
    "Are you sure you want to Unstake all your current selected NFT’s?"
  );

  //Rarity & Score
  const [rarity, setRarity] = useState(false);
  const [score, setScore] = useState(false);
  const link = "https://dyp.finance/mint";

  //Countdown
  const [countDownLeft, setCountDownLeft] = useState(59000);



  async function getData(link) {
    try {
      let response = await fetch(link);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  const onStakeNft = async (item) => {
    setOpenStakeNft(item);
    setOpenStakeNft(item);

    let nftId = item.name.replace(/\D/g, "");

    let response;

    setRarity(false);
    setScore(false);

    try {
      response = await getData(
        "https://mint.dyp.finance/api/v1/score/" + nftId
      );
    } catch (error) {
      console.error(error);
    }

    if (response) {
      setRarity(response.rank);
      setScore(response.rarity);
    }

    // setOpenedNft(nftId)
    setNftItem(nftId);
  };

  const onUnstakeNft = async (item) => {
    setOpenUnStakeNft(item);
    let nftId = item.name?.slice(6, item.name?.length);

    let response;

    setRarity(false);
    setScore(false);

    try {
      response = await getData(
        "https://mint.dyp.finance/api/v1/score/" + nftId
      );
    } catch (error) {
      console.error(error);
    }

    if (response) {
      setRarity(response.rank);
      setScore(response.rarity);
    }

    setItem(nftId);
  };

  const onStakCheckList = (item) => {
    setOpenStakeChecklist(item);
  };

  useEffect(() => {
    if (connectedWallet) {
      myNft().then();
      myStakes().then();
      handleClaimAll().then();
      calculateCountdown().then();
    }

  }, [connectedWallet]);
 

  const calculateCountdown = async () => {
    const address =  connectedWallet

    let staking_contract = await window.getContractNFT("NFTSTAKING");
    let finalDay = await staking_contract.methods
      .stakingTime(address)
      .call()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
      });

    let lockup_time = await staking_contract.methods
      .LOCKUP_TIME()
      .call()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
      });

    finalDay = parseInt(finalDay) + parseInt(lockup_time);

    setCountDownLeft(parseInt(finalDay * 1000) - Date.now());
  };

  const descriptionTags = [
    // "Watch",
    // "Mustache",
    // "Glasses",
    // "Glasses",
    "Unrevealed",
  ];

  const handleConnectWallet = async () => {
    try {
      let isConnected = await window.connectWallet();

      if (isConnected) {
        setIsConnectedWallet(true);
        let coinbase = await window.getCoinbase();
        // Set Coinbase State
        setConnectedWallet(coinbase);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadingSuccessClick = () => {
    // when user click ok button in loading modal
    setShowLoadingModal(false);
    setShowWhitelistLoadingModal(false);
    // showToast('Your NFT was created successfully!')
  };

  const handleLoadingCancelClick = () => {
    // when user click cancel button in loading modal
    setShowLoadingModal(false);
    setShowWhitelistLoadingModal(false);
  };

  const onShareClick = (item) => {
    // when user clicks share nft link
    // console.log("item clicked", item);
  };

  const onNftClick = async (item) => {
    let nftId = item.name.replace(/\D/g, "");

    let response;

    setRarity(false);
    setScore(false);

    try {
      response = await getData(
        "https://mint.dyp.finance/api/v1/score/" + nftId
      );
    } catch (error) {
      console.error(error);
    }

    if (response) {
      setRarity(response.rank);
      setScore(response.rarity);
    }

    setOpenedNft(item);
  };

  const myNft = async () => {
    // let myNft = await window.myNftList(connectedWallet)

    let myNft = await window.myNftListContract(connectedWallet);
    // console.log(myNft)

    let nfts = myNft.map((nft) => window.getNft(nft));
    // console.log(nfts)

    nfts = await Promise.all(nfts);

    nfts.reverse();

    setMyNFTs(nfts);
  };

  const getStakesIds = async () => {
    const address = connectedWallet
    let web3 = new Web3(window.ethereum);
    if (address !== null&& web3.utils.isAddress(address)) {
    let staking_contract = await window.getContractNFT("NFTSTAKING");
    let stakenft = [];
    let myStakes = await staking_contract.methods
      .depositsOf(address)
      .call()
      .then((result) => {
        for (let i = 0; i < result.length; i++)
          stakenft.push(parseInt(result[i]));
        return stakenft;
      });

    return myStakes;
    }
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();

    let stakes = myStakes.map((stake) => window.getNft(stake));

    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakes(stakes);
  };

  const handleClaimAll = async () => {
    const address = connectedWallet
    let myStakes = await getStakesIds();
    let calculateRewards = [];
    let result = 0;
    let staking_contract = await window.getContractNFT("NFTSTAKING");
    if (myStakes.length > 0) {
      calculateRewards = await staking_contract.methods
        .calculateRewards(address, myStakes)
        .call()
        .then((data) => {
          return data;
        });
    }
    let a = 0;

    for (let i = 0; i < calculateRewards.length; i++) {
      a =  calculateRewards[i]/1e18;

      result = result + Number(a);
    }

    setEthRewards(result);
  };

  const claimRewards = async () => {
    let myStakes = await getStakesIds();
    let staking_contract = await window.getContractNFT("NFTSTAKING");

    setclaimAllStatus("Claiming all rewards, please wait...");
    await staking_contract.methods
      .claimRewards(myStakes)
      .send({from: connectedWallet})
      .then(() => {
        setEthRewards(0);
        setclaimAllStatus("Claimed All Rewards!");
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        setclaimAllStatus("An error occurred, please try again");
      });
  };

  const handleUnstakeAll = async () => {
    let myStakes = await getStakesIds();
    let stake_contract = await window.getContractNFT("NFTSTAKING");
    setunstakeAllStatus("Unstaking all please wait...");

    await stake_contract.methods
      .withdraw(myStakes)
      .send()
      .then(() => {
        setunstakeAllStatus("Successfully unstaked all!");
      })
      .catch((err) => {
        window.alertify.error(err?.message);
        setunstakeAllStatus("An error occurred, please try again");
        setShowUnstakeModal(false);
      });
  };

  const handleShowUnstake = () => {
    setShowUnstakeModal(true);
    setOpenStakeChecklist(false);
  };

  const handleShowClaimAll = () => {
    setShowClaimAllModal(true);
    setOpenStakeChecklist(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "NFT Staking";
  }, []);

  return (
    <div className="nft-minting">
      <NftLoadingModal
        visible={showLoadingModal}
        onCancelClick={handleLoadingCancelClick}
        onSuccessClick={handleLoadingSuccessClick}
        setIsVisible={setShowLoadingModal}
      />

      <NftCardModal
        modalId="newNft"
        nftItem={openedNft}
        open={openedNft ? true : false}
        link={link}
        score={score}
        rarity={rarity}
        onShareClick={onShareClick}
      />

      <NftStakeModal
        modalId="newNftStake"
        nftItem={openStakeNft}
        visible={openStakeNft ? true : false}
        link={link}
        score={score}
        rarity={rarity}
        onShareClick={onShareClick}
        itemId={parseInt(nftItemId)}
        countDownLeft={countDownLeft}
        onClose={() => {
          setOpenStakeNft(false);
        }}
      />

      <NftUnstakeModal
        modalId="NftUnstake"
        nftItem={openUnStakeNft}
        visible={openUnStakeNft ? true : false}
        link={link}
        score={score}
        rarity={rarity}
        onShareClick={onShareClick}
        itemId={parseInt(itemId)}
        countDownLeft={countDownLeft}
        onClose={() => {
          setOpenUnStakeNft(false);
        }}
      />

      <NftStakeCheckListModal
        onClose={() => {
          setOpenStakeChecklist(false);
        }}
        nftItem={showStaked ? mystakes : showToStake ? myNFTs : showStaked}
        open={openStakeChecklist ? true : false}
        link={link}
        onShareClick={onShareClick}
        onshowStaked={() => {
          setshowStaked(true);
          setshowToStake(false);
        }}
        onshowToStake={() => {
          setshowStaked(false);
          setshowToStake(true);
        }}
        onClaimAll={claimRewards}
        onUnstake={handleUnstakeAll}
        ETHrewards={EthRewards}
        countDownLeft={countDownLeft}
        connectedWallet={connectedWallet}
        isConnectedWallet={isConnectedWallet}
      />

      <NftMintingHero smallTitle="SOCIETY" bigTitle="BENEFITS" />

      <NewMintForm
        handleConnectWallet={handleConnectWallet}
        connectedWallet={connectedWallet}
        isConnectedWallet={isConnectedWallet}
      />

      <MyNfts
        onItemClick={onStakeNft}
        items={myNFTs}
        numberOfNfts={myNFTs.length}
        label="Collection"
        smallTitle="MY"
        bigTitle="CAWS"
        connectedWallet={connectedWallet}
        isConnectedWallet={isConnectedWallet}
      />
      <MyStakes
        onItemClick={onUnstakeNft}
        items={mystakes}
        numberOfNfts={mystakes.length}
        label=""
        smallTitle="STAKE"
        bigTitle="CAWS"
        onStakeNFTClick={onStakCheckList}
        onClaimAllRewards={claimRewards}
        ETHrewards={EthRewards}
        connectedWallet={connectedWallet}
        isConnectedWallet={isConnectedWallet}
      />
    </div>
  );
};

export default NftMinting;
