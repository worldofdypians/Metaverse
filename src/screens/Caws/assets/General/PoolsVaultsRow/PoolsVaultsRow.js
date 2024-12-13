import React from 'react'
import PropTypes from "prop-types"


const PoolsVaultsRow = ({ totalValueText, totalValue }) => {
    return (
        <div className="row-wrapper">
            <div className="left">

                <img src={require(`../Icons/${totalValueText == "Pools" ? "pools-icon.png" : "vaults-icon.png"}`)} alt="" />
                <p>{totalValueText}</p>
            </div>
            <div className="value">
                <p className="text">
                    Total Value Locked
                </p>
                <p className="price">
                    {totalValue}
                </p>
            </div>
        </div>
    )
}

PoolsVaultsRow.propTypes = {
    totalValue: PropTypes.string,
    totalValueText: PropTypes.string
}



export default PoolsVaultsRow