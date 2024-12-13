import React, { Fragment, useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import SingleAsset from '../SingleAsset'
import TwoItemsToggleButton from '../TwoItemsToggleButton'
import SubAssetCard from '../SubAssetCard'

const AssetsCard = ({ assets, field }) => {
    const [toggleItem, setToggleItem] = useState(true)
    const [activeCard, setActiveCard] = useState("")

    useEffect(() => {
        console.log("TOGGLE FROM PARENT", toggleItem)
    }, [toggleItem])


    return (
        <div className='asset-card-wrapper'>
            <TwoItemsToggleButton leftItem='By Chain' rightItem='Top APR' toggleItem={toggleItem} setToggleItem={setToggleItem} />
            {toggleItem ? (assets && assets.length > 0 && assets.map((asset) => {
                return <Fragment key={asset.text + " " + field}>
                    <SingleAsset
                        setActiveCard={setActiveCard}
                        activeCard={activeCard}
                        icon={asset.icon}
                        percentage={asset.percentage}
                        text={asset.text} />

                    {activeCard !== "" && activeCard == asset.text &&
                        <>
                            {asset.assetSubArray.length > 0 && asset.assetSubArray.map((item, id) => {
                                console.log("sub asset", id);
                                return <SubAssetCard
                                    key={id}
                                    action={() => console.log(id)}
                                    icons={item.icons}
                                    lock_time={item.lock_time}
                                    percentage={item.percentage}
                                    total_value_locked={item.total_value_locked}
                            link={item.link}
                            />
                            })}
                        </>}

                </Fragment>
            })) : (assets && assets.length > 0 && assets.map((asset) => {
                return <Fragment key={asset.text + " " + field}>
                    {asset.assetSubArray && asset.assetSubArray.length > 0 && asset.assetSubArray.map((subItem, id) => {
                        return <SubAssetCard
                            key={id}
                            action={() => console.log(id)}
                            icons={subItem.icons}
                            big_icon={asset.icon}
                            lock_time={subItem.lock_time}
                            percentage={subItem.percentage}
                            total_value_locked={subItem.total_value_locked}
                            link={subItem.link}
                        />
                    })}
                </Fragment>
            }))



            }


        </div>


    )
}
AssetsCard.propTypes = {
    assets: PropTypes.array,
    field: PropTypes.string
    // action: PropTypes.func
}

export default AssetsCard