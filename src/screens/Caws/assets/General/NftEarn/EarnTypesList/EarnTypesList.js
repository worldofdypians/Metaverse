import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ChevronArrowSvg from "../../ChevronArrowSvg/ChevronArrowSvg";
import { handleHorizontalScroll } from "../../../../components/NftEarn/NftEarn";

const EarnTypesList = ({ typesArray, activeType, onItemClick }) => {
  const itemRef = useRef([]);
  const [offset, setOffset] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      const items = itemRef.current;
      const activeitemIndex = items.find((el) =>
        el.className.includes("active")
      );
      setOffset(activeitemIndex && activeitemIndex.offsetLeft);
    }
  }, [activeType]);

  const handleScoll = (value) => {
    handleHorizontalScroll(value, scrollRef);
    setScrollOffset(value);
  };

  return (
    <div className="earn-types-list">
      {scrollOffset < 94 && (
        <div className="scroll-arrow-container" onClick={() => handleScoll(94)}>
          <ChevronArrowSvg color="#E30613" />
        </div>
      )}
      {scrollOffset >= 94 && (
        <div
          className="scroll-arrow-container arrow-left"
          onClick={() => handleScoll(0)}
        >
          <ChevronArrowSvg color="#E30613" />
        </div>
      )}
      <div className="container-fluid padding-inline">
        <div
          className="types"
          ref={scrollRef}
          onScroll={(e) => {
            setScrollOffset(e.target.scrollLeft);
          }}
        >
          {typesArray.length > 0 &&
            typesArray.map((item, index) => (
              <p
                key={index}
                className={`type-item ${activeType === item && "active"}`}
                onClick={() => {
                  onItemClick(item);
                  itemRef?.current[index]?.scrollIntoView({
                    block: "nearest",
                    behavior: "auto",
                    inline: "center",
                  });
                }}
                ref={(el) => (itemRef.current[index] = el)}
              >
                {item}
              </p>
            ))}
          <div className="active-type-line" style={{ left: offset }}></div>
        </div>
      </div>
    </div>
  );
};

EarnTypesList.propTypes = {
  typesArray: PropTypes.array,
  activeType: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default EarnTypesList;
