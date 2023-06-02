import React, {useEffect, useState} from 'react';
import getListedNFTS from "../actions/Marketplace";

function sell(nft, price, priceType, type)
{
    window.listNFT(nft, price, priceType, type).then((result) => {
        console.log("listNFT", result);
    });
}

async function isApprovedNFT(nft, type) {

    return await window.isApproved(nft, type);
}

const approveNFT = async (nft, type) =>
{
    return await window.approveNFT(nft, type);
}

const cancelNFT = (nftAddress, tokenId, type) =>
{
    return  window.cancelListNFT(nftAddress, tokenId, type);
}

async function ListedNFT(nft, type)
{
    let nft_address;

    if(type === "timepiece")
    {
        nft_address = window.config.nft_timepiece_address;
    }
    else if(type === "land")
    {
        nft_address = window.config.nft_land_address;
    }
    else
    {
        nft_address = window.config.nft_caws_address;
    }

    return await getListedNFTS(0, "", "nftAddress_tokenId", nft, nft_address);
}

// async function updateListing (nft, price, priceType, type)
// {
//     return await window.updateListingNFT(nft, price, priceType, type);
// }

async function isListedNFT(nft, type, details = false)
{
    let nft_address;

    if(type === "timepiece")
    {
        nft_address = window.config.nft_timepiece_address;
    }
    else if(type === "land")
    {
        nft_address = window.config.nft_land_address;
    }
    else
    {
        nft_address = window.config.nft_caws_address;
    }

    const listedNFTS = await getListedNFTS(0, "", "nftAddress_tokenId", nft, nft_address);

    return listedNFTS.length > 0;
}

const MyNFTCard = ({nft, type, coinbase, single}) =>
{
    const [IsApprove, setIsApprove] = useState(false);
    const [IsListed, setIsListed] = useState(false);
    const [Price, setPrice] = useState("");
    const [PriceType, setPriceType] = useState("eth");
    const [NFtDetails, setNftDetails] = useState({});

    const setPriceNFT = event => {
        setPrice(event.target.value);

        console.log('value is:', event.target.value);
    }

    const setPriceTypeNFT = event => {

        setPriceType(event.target.value);

        console.log('value is:', event.target.value);
    }

    useEffect( () =>  {

        ListedNFT(nft, type, true).then((details) => setNftDetails(details[0]));

        isListedNFT(nft, type).then((isListed) => setIsListed(isListed))

        if(!IsListed)
        {
            isApprovedNFT(nft, type).then((isApproved) => setIsApprove(isApproved));
        }
        else
        {
            console.log("NFtDetails 2", NFtDetails);
        }

    }, [nft, type, IsListed, NFtDetails]);


    return (
        <div style={{width: single ? '1200px': '600px', margin: '10px', float: 'left'}}>
            <div>
                <a href={`/nft/`}> <img style={{width: single ? '400px': '300px', padding: '10px'}} src="https://www.dypius.com/static/media/laptop2.221e066921ff71db7fc9.png"  alt="" /></a>
            </div>
            <div>
               Sell: <br />

                {IsApprove && !IsListed ? (
                        <div>
                            <div>
                                <input type="text" onChange={setPriceNFT} value={Price} placeholder="Price" />
                            </div>
                            <div>
                                <select onChange={setPriceTypeNFT}>
                                    <option value="eth">ETH</option>
                                    <option value="dyp">DYP</option>
                                </select>
                            </div>
                        </div>
                    ) : (
                    <div></div>
                )}

                <button style={{paddingLeft: '20px', paddingRight: '20px'}} onClick={() => {
                IsApprove === false
                        ? approveNFT(nft, type)
                        : !IsListed ? sell(nft, Price, PriceType, type) : cancelNFT(NFtDetails.nftAddress, NFtDetails.tokenId, NFtDetails.payment_priceType)
                }}>   {!IsApprove ? 'Approve' : !IsListed ? 'Sell it': 'Cancel List'}  </button>


            </div>
        </div>
    );
}

export default MyNFTCard;