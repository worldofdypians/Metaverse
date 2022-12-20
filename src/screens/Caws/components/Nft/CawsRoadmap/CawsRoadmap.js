import React from 'react'
import TitleWithParagraph from '../../General/TitleWithParagraph'
import CatsTimeLine from '../CatsTimeLine'
import './_cawsRoadmap.scss'
const AdoptACat = () => {
    return (
        <div id="roadmap" className="caws-roadmap container-padding" style={{paddingBottom: 80}}>
            <div className="container-fluid position-relative">
                <span className='blur-backgroud-top-left top--120 left--120' />
                <div className="row background py-5 px-4">
                    <div className='col-md-6 px-md-5'>
                        <TitleWithParagraph >
                            <h1 className='mb-5' style={{color: 'white'}}>
                                <small>CAWS</small> <br />
                                ROADMAP
                            </h1>
                            <img src={require("../../../assets/Nft/caws-roadmap.png")}
                                className="img-fluid pr-md-5"
                                alt="phone-graphics" />
                        </TitleWithParagraph>
                    </div>
                    <div className='col-md-6 mt-5 mt-md-0 p-0 p-md-2'>
                        <CatsTimeLine />
                    </div>
                </div>
                <span className='blur-backgroud-bottom-right bottom--120 right--120' />
            </div>
        </div>
    )
}

export default AdoptACat
