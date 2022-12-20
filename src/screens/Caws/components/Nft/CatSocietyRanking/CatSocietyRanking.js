import React from 'react'
import TitleWithParagraph from '../../General/TitleWithParagraph'
import './_catSocietyRanking.scss'

const CatSocietyRanking = () => {
    return (
        <div className="cats-society-ranking background">
            <div className="container-fluid position-relative">
                <div className="row align-items-center pt-5 px-4">
                    <div className='col-md-4'>
                        <TitleWithParagraph>
                            <h1 className='mb-4 d-flex flex-column' style={{color: 'white'}}>

                                <small>
                                    THE
                                </small>
                                SOCIETY
                            </h1>
                            <p className='mb-5' style={{color: 'white'}}>
                                We at Cats and Watches Society acknowledge that each cat has its own freedom of expression. By letting our cats have their own style, we really let them showcase their true colors and personality. Of course, some cats have <b>more style</b> than others and that’s totally fine.
                            </p>
                            <p className='mb-4' style={{color: 'white'}}>
                                Think about what could make your cat more unique…Do they prefer their own natural coat? Do you want to give them a cowboy suit? Maybe a unicorn horn? The <b>possibilities are almost endless!</b>
                            </p>
                            <p className='mb-4' style={{color: 'white'}}>
                                Keep in mind that cats are particularly fond of watches in this society, so make sure to give them a cool watch to match their outfit and personality.
                            </p>
                        </TitleWithParagraph>
                    </div>
                    <div className='col-md-8'>
                        <div className='row justify-content-center justify-content-md-end'>
                            <div className='col-md-4 col-6 px-0 first-image-container'>
                                <img src={require('../../../assets/Nft/cats-society-ranking-1.png')} alt="" className='first-image' />
                            </div>
                            <div className='col-md-4 col-6 px-0 second-image-container'>
                                <img src={require('../../../assets/Nft/cats-society-ranking-2.png')} alt="" className='second-image' />
                            </div>
                            <div className='col-md-4 col-6 px-0 third-image-container'>
                                <img src={require('../../../assets/Nft/cats-society-ranking-3.png')} alt="" className='third-image' />
                            </div>
                            <div className='col-md-4 col-6 px-0 fourth-image-container'>
                                <img src={require('../../../assets/Nft/cats-society-ranking-4.png')} alt="" className='fourth-image' />
                            </div>
                            <div className='col-md-4 col-6 px-0 fifth-image-container'>
                                <img src={require('../../../assets/Nft/cats-society-ranking-5.png')} alt="" className='fifth-image' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='svg-container'>

                </div>
            </div>
        </div>
    )
}

export default CatSocietyRanking
