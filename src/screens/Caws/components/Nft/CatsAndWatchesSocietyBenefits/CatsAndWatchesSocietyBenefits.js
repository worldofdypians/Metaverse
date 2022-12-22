import React from 'react'
import TitleWithParagraph from '../../General/TitleWithParagraph'
import './_catsAndWatchesSocietyBenefits.scss'

const CatsAndWatchesSocietyBenefits = () => {
    return (
        <div className="cats-and-watches-society-benefits container-padding pb-0 mt-5 mb-5">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-between">
                    {/* to be checked if text on blue cards is static */}
                    <div className="col-md-6">
                        <TitleWithParagraph >
                            <h1 className="text-white">
                                <small>SOCIETY</small> <br />
                                BENEFITS
                            </h1>
                            <p className="mb-2 text-white">
                                After the minting period is over, the Society Benefits zone will become active and you can get cool stuff such as 10% from minting fees and you will be introduced to the CAWS staking pool. The benefits zone will only be available  for wallets that have adopted and are holding at least one cat. <mark>Are you a cat lover?</mark> Minting and owning more than one cat increases your share from the staking pool, and will increase your rewards!
                            </p>
                            <p className='mb-2 text-white'>
                                Later on, the play to earn NFT concept will become active, making it possible for holders to get all sorts of additional rewards.
                            </p>
                            <p className='mb-2 text-white'>
                                Once the minting is over, each CAWS holder will be able to mint <mark>an additional standalone watch NFT for free!</mark> These free NFTs will provide additional future benefits for the CAWS holders as well.
                            </p>
                        </TitleWithParagraph>
                    </div>
                    <div className="col-md-4 mt-5 mt-md-0">
                        <img src={require("../../../assets/Nft/cats-and-watches-society-benefits-new.png")}
                            className="graphics "
                            alt="phone-graphics" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatsAndWatchesSocietyBenefits
