import React from 'react'

const NewChestItem = ({item, index, openChest, selectedChest}) => {
  return (
    <div
    className={`new-chest-item ${
      item.opened && "new-chest-item-open"
    } ${selectedChest === item.id ? "selected-new-chest" : ""} d-flex align-items-center justify-content-center`}
    onClick={() => openChest(item.id)}
  >
    <img
      src={require(`../../screens/Account/src/Components/WalletBalance/chestImages/${
        !item.opened ? index : index + "open"
      }.png`)}
      width={80}
      height={80}
      alt=""
      style={{ position: "relative", bottom: "5px" }}
    />
    <div className="new-claim-chest-btn d-flex align-items-center justify-content-center">
      {item.opened ? "Claimed" : "Claim "}
    </div>
  </div>
  )
}

export default NewChestItem