import React, { useState } from 'react'
import premiumLock from './assets/premiumLock.png'
import errorSound from './assets/error.mp3'


const NewChestItem = ({item, index, openChest, selectedChest}) => {


  const [shake, setShake] = useState(false)


  const onShake = () => {
    setShake(true)
    new Audio(errorSound).play()
    setTimeout(() => {
      setShake(false)
    }, 1000);
  }

  return (
    <div
    className={`new-chest-item ${
      item.opened && "new-chest-item-open"
    } ${selectedChest === item.id ? "selected-new-chest" : ""}  d-flex align-items-center justify-content-center position-relative`}
    onClick={() => item.premium ? onShake() : openChest(item.id)}
    // style={{pointerEvents: item.premium && "none"}}
  >
    {/* <img
    className='new-chest-item-img'
      src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/premium/blueCrystal${
        !item.opened ? "" :  "OpenGems"
      }.png`)}
      
      alt=""
      style={{ position: "relative", bottom: "5px", filter: item.premium && "blur(5px)" }}
    /> */}
    <img
    className='new-chest-item-img'
      src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/${item.opened ? index + "open" : index}.png`)}
      
      alt=""
      style={{ position: "relative", bottom: "5px", filter: item.premium && "blur(5px)" }}
    />
    {item.premium &&
    <img src={premiumLock} className={`premium-lock ${shake && "shake-lock"}`}alt="" />
   
    }
    <div className="new-claim-chest-btn d-flex align-items-center justify-content-center">
      {item.opened ? "Claimed" : item.premium ? "Premium" : "Claim "}
    </div>
  </div>
  )
}

export default NewChestItem