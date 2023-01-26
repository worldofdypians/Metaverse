import React, { useState, useEffect } from "react";
import LandBenefits from "./LandBenefits";
import LandHero from "./LandHero";
import LandStaking from "./LandStaking";
import LandTiers from "./LandTiers";
import LandStakingChecklistModal from "./LandStakingChecklistModal";
import "./_land.scss";
import Members from "./Members";
import Community from "./Community";
import UnstakeAllModal from "./UnstakeAllModal";
import WalletModal from "../../components/WalletModal/WalletModal";
import LandWhitelistModal from "../../components/LandWhitelistModal/LandWhitelistModal";
import axios from "axios";


const Land = ({
  handleConnectWallet,
  coinbase,
  isConnected,
  handleRegister,
  chainId,
  showForms,
  balance
}) => {
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [showWithdrawModal, setshowWithdrawModal] = useState(false);

  const [showToStake, setshowToStake] = useState(false);
  const [showStaked, setshowStaked] = useState(true);
  const [showClaimAllModal, setShowClaimAllModal] = useState(false);
  const [claimAllStatus, setclaimAllStatus] = useState(
    "Are you sure you want to Claim all your current selected NFTs?"
  );
  const [unstakeAllStatus, setunstakeAllStatus] = useState(
    "Are you sure you want to Unstake all your current selected NFTs?"
  );

  const [myNFTs, setMyNFTs] = useState([]);
  const [myCAWNFTs, setMyCAWNFTs] = useState([]);

  const [mystakes, setMystakes] = useState([]);
  const [myCAWstakes, setCAWMystakes] = useState([]);

  const [EthRewards, setEthRewards] = useState(0);
  const [openStakeChecklist, setOpenStakeChecklist] = useState(false);
  const [latestMintNft, setLatestMintNft] = useState([]);
  const [myNFTsCreated, setMyNFTsCreated] = useState([]);
  const [myCAWSNFTsCreated, setMyCAWSNFTsCreated] = useState([]);
  const [myCAWSNFTsTotalStaked, setMyCAWSNFTsTotalStaked] = useState([]);


  const [mintPrice, setmintPrice] = useState(0);
  const [mintStatus, setmintStatus] = useState("");
  const [mintloading, setmintloading] = useState("initial");
  const [walletModal, setwalletModal] = useState(false);
  const [whitelistModal, setwhitelistModal] = useState(false);

  const myNft = async () => {
    let myNft = await window.myNftLandListContract(coinbase);
    let nfts = myNft.map((nft) => window.getNft(nft));
    nfts = await Promise.all(nfts);
    setMyNFTsCreated(nfts);

    nfts.reverse();
    setMyNFTs(nfts);
  };

  
  const myCAWNft = async () => {
    let myNft = await window.myNftListContract(coinbase);
    let nfts = myNft.map((nft) => window.getNft(nft));
    nfts = await Promise.all(nfts);
    setMyCAWSNFTsCreated(nfts)

    nfts.reverse();
    setMyCAWNFTs(nfts);
  };

  function range(start, end, step = 1) {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len)
      .fill()
      .map((_, idx) => start + idx * step);
  }

  const latestMint = async () => {
    let end = await window.latestMint();

    let start = end - 7;

    let latest = range(start, end);

    let nfts = latest.map((nft) => window.getNft(nft));

    nfts = await Promise.all(nfts);

    nfts.reverse();

    setLatestMintNft(nfts);
  };

  const getStakesIds = async () => {
    const address = coinbase;
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
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
  };

  const getStakesCAWIds = async () => {
    const address = coinbase;
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
  };

  const myStakes = async () => {
    let myStakes = await getStakesIds();
    let stakes = myStakes.map((stake) => window.getNft(stake));
    stakes = await Promise.all(stakes);
    stakes.reverse();
    setMystakes(stakes);
  };

  const myCAWStakes = async () => {
    let myStakes = await getStakesCAWIds();
    let stakes = myStakes.map((stake) => window.getNft(stake));

    stakes = await Promise.all(stakes);
    setMyCAWSNFTsTotalStaked(stakes)
    stakes.reverse();
    setCAWMystakes(stakes);
  };


  const handleClaimAll = async () => {
    const address = coinbase;

    let myStakes = await getStakesIds();
    let calculateRewards = [];
    let result = 0;
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");
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
      a = await window.infuraWeb3.utils.fromWei(calculateRewards[i], "ether");

      result = result + Number(a);
    }

    setEthRewards(result);
  };

  const claimRewards = async () => {
    let myStakes = await getStakesIds();
    let staking_contract = await window.getContractLandNFT("LANDNFTSTAKING");

    setclaimAllStatus("Claiming all rewards, please wait...");
    await staking_contract.methods
      .claimRewards(myStakes)
      .send()
      .then(() => {
        setEthRewards(0);
        setclaimAllStatus("Claimed All Rewards!");
      })
      .catch((err) => {
        // window.alertify.error(err?.message);
        setclaimAllStatus("An error occurred, please try again");
      });
  };

  const handleUnstakeAll = async () => {
    let myStakes = await getStakesIds();
    let stake_contract = await window.getContractLandNFT("LANDNFTSTAKING");
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
    setshowWithdrawModal(true);
    setOpenStakeChecklist(false);
  };

  const handleShowClaimAll = () => {
    setShowClaimAllModal(true);
    setOpenStakeChecklist(false);
  };

  const handleMint = async (data) => {
    if (isConnected) {
      try {
        //Check Whitelist
        // let whitelist = await window.checkWhitelist(connectedWallet)
        let whitelist = 1;

        if (parseInt(whitelist) == 1) {
          setmintloading("mint");
          console.log(data);
          let tokenId = await window.landnft
            .mintNFT(data.numberOfTokens)
            .then(() => {
              setmintStatus("Success! Your Nft was minted successfully!");
              setmintloading("success");
              setTimeout(() => {
                setmintStatus("");
                setmintloading("initial");
              }, 5000);
            })
            .catch((e) => {
              console.error(e);
              setmintloading("error");
              if (typeof e == "object" && e.message) {
                setmintStatus(e.message);
              } else {
                setmintStatus(
                  "Oops, something went wrong! Refresh the page and try again!"
                );
              }
              setTimeout(() => {
                setmintloading("initial");
                setmintStatus("");
              }, 5000);
            });

          // if (isNaN(Number(tokenId))) {
          //   setmintloading("error");
          //   setmintStatus("Invalid Token ID");
          //   setTimeout(() => {
          //     setmintloading("initial");
          //     setmintStatus("");
          //   }, 5000);
          //   throw new Error("Invalid Token ID");
          // }

          if (tokenId) {
            let getNftData = await window.getNft(tokenId);
            setMyNFTsCreated(getNftData);
          }
        } else {
          // setShowWhitelistLoadingModal(true);
        }
      } catch (e) {
        setmintloading("error");

        if (typeof e == "object" && e.message) {
          setmintStatus(e.message);
        } else {
          setmintStatus(
            "Oops, something went wrong! Refresh the page and try again!"
          );
        }
        window.alertify.error(
          typeof e == "object" && e.message
            ? e.message
            : typeof e == "string"
            ? String(e)
            : "Oops, something went wrong! Refresh the page and try again!"
        );
        setTimeout(() => {
          setmintloading("initial");
          setmintStatus("");
        }, 5000);
      }
    } else {
      try {
        handleConnectWallet();
      } catch (e) {
        window.alertify.error("No web3 detected! Please Install MetaMask!");
      }
    }
  };

  const showWalletConnect = () => {
    setwalletModal(true);
  };

  const handleStake = () => {
    setOpenStakeChecklist(true);
    setshowStaked(false);
    setshowToStake(true);
  };

  const handleWithdraw = () => {
    setOpenStakeChecklist(true);
    setshowStaked(true);
    setshowToStake(false);
  };

  const withdrawModalShow = () => {
    setshowWithdrawModal(true);
  };

  const handleWhitelist = () => {
    setwhitelistModal(true);
  };


  const convertEthToUsd = async () => {
    const res = axios
      .get("https://api.coinbase.com/v2/prices/ETH-USD/spot")
      .then((data) => {
        return data.data.data.amount;
      });
    return res;
  };

  const getMintPrice = async () => {
    const ethprice = await convertEthToUsd();
    setmintPrice(1200 / Number(ethprice));
  };



  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Land";
    getMintPrice()
  }, []);

  useEffect(() => {
    if (isConnected === true) {
      setwalletModal(false);
    }
  }, [isConnected]);

  useEffect(() => {
     const interval = setInterval(async () => {
       if (isConnected && coinbase && chainId === 1) {
        //  handleClaimAll().then();
        //  myStakes();
        //  myNft();
         myCAWStakes();
         myCAWNft()
       }
       latestMint().then();
     }, 1000);

     return () => clearInterval(interval);
  }, [isConnected, EthRewards, coinbase, chainId]);

  return (
    <div className="container-fluid d-flex px-0 align-items-center justify-content-center">
      {openStakeChecklist === true && (
        <LandStakingChecklistModal
          onClose={() => {
            setOpenStakeChecklist(false);
          }}
          nftItem={showStaked ? mystakes : showToStake ? myNFTs : showStaked}
          open={openStakeChecklist ? true : false}
          // link={link}
          // onShareClick={onShareClick}
          onshowStaked={() => {
            setshowStaked(true);
            setshowToStake(false);
          }}
          showStaked={showStaked}
          showToStake={showToStake}
          onshowToStake={() => {
            setshowStaked(false);
            setshowToStake(true);
          }}
          onClaimAll={() => {
            claimRewards();
          }}
          onUnstake={() => handleShowUnstake()}
          ETHrewards={EthRewards}
          coinbase={coinbase}
        />
      )}

      {showWithdrawModal === true && (
        <UnstakeAllModal
          open={showWithdrawModal}
          onClose={() => {
            setshowWithdrawModal(false);
          }}
          onUnstake={handleUnstakeAll}
          onClaimAll={claimRewards}
        />
      )}

      {whitelistModal === true && (
        <LandWhitelistModal
          open={whitelistModal}
          onClose={() => {
            setwhitelistModal(false);
          }}
          coinbase={coinbase}
          showForms={showForms}
          balance={balance}
          mintPrice={mintPrice}
          totalCAWCreated={myCAWSNFTsCreated.length}
          totalCAWStaked={myCAWSNFTsTotalStaked.length}
          handleConnect={handleConnectWallet}
        />
      )}

      {walletModal === true && (
        <WalletModal
          show={walletModal}
          handleClose={() => {
            setwalletModal(false);
          }}
          handleConnection={() => {
            handleConnectWallet();
          }}
        />
      )}

      <div className="land-main-wrapper px-0 w-100 d-flex flex-column">
        <LandHero />
        <LandStaking
          showWalletConnect={showWalletConnect}
          handleMint={handleMint}
          handleStake={handleStake}
          coinbase={coinbase}
          isConnected={isConnected}
          handleWithdraw={handleWithdraw}
          withdrawModalShow={withdrawModalShow}
          createdNft={myNFTsCreated}
          totalCreated={myNFTsCreated.length}
          mintStatus={mintStatus}
          mintloading={mintloading}
          ETHrewards={EthRewards}
          onClaimAll={claimRewards}
          latestMintNft={latestMintNft}
          chainId={chainId}
          handleWhitelist={handleWhitelist}
          mintPrice={mintPrice}

        />
        <LandTiers />
        <Members handleRegister={handleRegister} />
        <Community />
        <LandBenefits />
      </div>
    </div>
  );
};

export default Land;
