import SvgAvaxIcon from "../../ListDataItem/SvgAvaxIcon";
import SvgBscIcon from "../../ListDataItem/SvgBscIcon";
import SvgEthIcon from "../../ListDataItem/SvgEthIcon";
import TypeAssetCard from "../../TypeAssetCard/TypeAssetCard";
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import ChevronArrowSvg from "../../ChevronArrowSvg/ChevronArrowSvg";
import { handleHorizontalScroll } from "../../../../components/NftEarn/NftEarn";

const TypeAssets = ({ assets, onTypeAssetClicked, clickedAsset }) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const devicewidth = window.innerWidth;

  const scrollRef = useRef(null);
  const renderSvgIcon = (item) => {
    const name = item.split(" ")[0].toLowerCase();
    if (name === "eth") {
      return <SvgEthIcon />;
    } else if (name === "bsc") {
      return <SvgBscIcon />;
    } else {
      return <SvgAvaxIcon />;
    }
  };

  const handleScoll = (value) => {
    handleHorizontalScroll(value, scrollRef);
    setScrollOffset(value);
  };

  return (
    <div className="type-assets">
      {scrollOffset < 200 && (
        <div
          className="scroll-arrow-container"
          onClick={() => handleScoll(200)}
        >
          <ChevronArrowSvg color="#E30613" />
        </div>
      )}
      {scrollOffset >= 200 && (
        <div
          className="scroll-arrow-container arrow-left"
          onClick={() => handleScoll(0)}
        >
          <ChevronArrowSvg color="#E30613" />
        </div>
      )}
      <div className="container-fluid" style={{padding: devicewidth < 500 ? '0px 15px' : '0px 80px'}}>
        <div
          className="assets-container"
          ref={scrollRef}
          onScroll={(e) => {
            setScrollOffset(e.target.scrollLeft);
          }}
        >
          {assets.length > 0 &&
            assets.map((item, id) => (
              <TypeAssetCard
                key={id}
                icon={renderSvgIcon(item.text)}
                text={item.text}
                percentage={item.percentage}
                activeItem={clickedAsset}
                setActiveItem={onTypeAssetClicked}
              />
            ))}
        </div>
        <div className="divider-border" style={{padding: devicewidth < 500 ? '0px 15px' : '0px 80px'}}></div>
      </div>
    </div>
  );
};

TypeAssets.propTypes = {
  assets: PropTypes.array,
  onTypeAssetClicked: PropTypes.func,
  clickedAsset: PropTypes.string,
};

export default TypeAssets;
