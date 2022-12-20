import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const TypeAssetCard = ({
  icon,
  text,
  percentage,
  activeItem,
  setActiveItem,
}) => {
  const elementScrollRef = useRef(null);
  const [classtext, setClassText] =useState('')
  const setClass =(text)=>{
    if(text == 'ETH Stake')
    {
      if(activeItem === 'ETH Stake')
      {
        setClassText(text.split(" ")[0].toLowerCase() + "-active " + "active-asset");
      }
      else setClassText('')
    }
    if(text === 'AVAX Stake') {
      if(activeItem === 'AVAX Stake') {
        setClassText(text.split(" ")[0].toLowerCase() + "-active " + "active-asset new-pool")
      }
      else setClassText(' new-pool')
    }

    if(text === 'BSC Stake') {
      if(activeItem === 'BSC Stake') {
        setClassText(text.split(" ")[0].toLowerCase() + "-active " + "active-asset new-pool")
      }
      else setClassText(' new-pool')
    }
    
    if(!text.includes('Stake')){
      if (activeItem == text) {
        setClassText(
          text.split(" ")[0].toLowerCase() + "-active " + "active-asset"
        );
      } else setClassText("");  
    }
  }

  useEffect(()=>{
    setClass(text)
  }, [text, activeItem])

  return (
    <>
      <div
        className={`type-asset-card ${classtext} `}
        onClick={() => {
          setActiveItem(text);
          elementScrollRef?.current?.scrollIntoView({
            block: "nearest",
            behavior: "auto",
            inline: "center",
          });
        }}
        ref={elementScrollRef}
      >
        {icon}
        <div className="data">
          <p className="text">{text}</p>
          <p className="percentage">{percentage} APR</p>
        </div>
      </div>
    </>
  );
};

TypeAssetCard.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  percentage: PropTypes.string,
  activeItem: PropTypes.string,
  setActiveItem: PropTypes.func,
};

export default TypeAssetCard;
