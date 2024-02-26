import React from 'react'
import premiumLock from './assets/premiumLock.png'

const NewChestItem = ({item, index, openChest, selectedChest}) => {
  return (
    <div
    className={`new-chest-item ${
      item.opened && "new-chest-item-open"
    } ${selectedChest === item.id ? "selected-new-chest" : ""}  d-flex align-items-center justify-content-center position-relative`}
    onClick={() => openChest(item.id)}
    style={{pointerEvents: index === 5 || index === 8 ? "none" : ""}}
  >
    <img
      src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/${
        !item.opened ? index : index + "open"
      }.png`)}
      width={80}
      height={80}
      alt=""
      style={{ position: "relative", bottom: "5px", filter: index === 5 || index === 8 ? "blur(5px)" : "" }}
    />
    {index === 5 || index === 8 ?
    <img src={premiumLock} className='premium-lock' alt="" />
    :
    <></>
    }
    <div className="new-claim-chest-btn d-flex align-items-center justify-content-center">
      {item.opened ? "Claimed" : index === 5 || index === 8 ? "Premium" : "Claim "}
    </div>
  </div>
  )
}

export default NewChestItem