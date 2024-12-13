import PoolsVaultsRow from "../../PoolsVaultsRow/PoolsVaultsRow";
import React from "react";
import PropTypes from "prop-types";
import SubAssetCard from "../../SubAssetCard/SubAssetCard";
import SubAssetCardWithButton from "../../SubAssetCardWithButton/SubAssetCardWithButton";
import NftCard from "../NftCard/NftCard";

const SubAssets = ({ data, onSubAssetButtonClick, subdata, clickedAsset }) => {
  const buttonText = data.type !== "Vault" ? "Deposit now" : "Supply";
  const devicewidth = window.innerWidth;

  return (
    <div
      className="container-fluid"
      style={{ padding: devicewidth < 500 ? "0px 15px" : "0px 80px 80px 80px" }}
    >
      <PoolsVaultsRow
        totalValue={data.totalValue}
        totalValueText={data.totalValueText}
      />
      <div className="subassets-wrapper row">
        {data?.type === "Vault" ? (
          data?.subAssets.length > 0 &&
          data?.subAssets.map((item, id) => (
            <div key={id} className="col-md-3">
              <SubAssetCardWithButton
                action={onSubAssetButtonClick}
                buttonText={buttonText}
                top_tick={item.top_tick}
                new_badge={item.new_badge}
                link={item.link}
              >
                <SubAssetCard
                  lock_time={item.lock_time}
                  percentage={item.percentage}
                  total_value_locked={item.total_value_locked}
                  hasCircleButton={false}
                  icons={item.icons}
                  name={item.title}
                />
              </SubAssetCardWithButton>
            </div>
          ))
        ) : data?.type === "Stake" ? (
          <>
          
            {subdata?.length > 0 &&
              subdata?.map((item, id) => (
                <div key={id} className="col-md-3">
                  <SubAssetCardWithButton
                    action={onSubAssetButtonClick}
                    buttonText={buttonText}
                    top_tick={item.top_tick}
                    new_badge={item.new_badge}
                    link={item.link}
                  >
                    <SubAssetCard
                      lock_time={item.lock_time}
                      percentage={item.percentage}
                      total_value_locked={item.total_value_locked}
                      hasCircleButton={false}
                      icons={item.icons}
                      name={item.title}
                    />
                  </SubAssetCardWithButton>
                </div>
              ))}

            {clickedAsset === "ETH Stake" ? <NftCard /> : <></>}
          </>
        ) : (
          <>
            {subdata?.length > 0 &&
              subdata?.map((item, id) => (
                <div key={id} className="col-md-3">
                  <SubAssetCardWithButton
                    action={onSubAssetButtonClick}
                    buttonText={buttonText}
                    top_tick={item.top_tick}
                    new_badge={item.new_badge}
                    link={item.link}
                  >
                    <SubAssetCard
                      lock_time={item.lock_time}
                      percentage={item.percentage}
                      total_value_locked={item.total_value_locked}
                      hasCircleButton={false}
                      icons={item.icons}
                      name={item.title}
                    />
                  </SubAssetCardWithButton>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};
SubAssets.propTypes = {
  data: PropTypes.object,
  subdata: PropTypes.array,
  onSubAssetButtonClick: PropTypes.func,
};

export default SubAssets;
