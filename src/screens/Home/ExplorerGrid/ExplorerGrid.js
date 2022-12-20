import React from "react";
import "./_explorergrid.scss";
import playIcon from '../../../assets/playIcon.svg'

const ExplorerGrid = () => {


    const explorerCards = [
      
        {
            title: 'Play',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, elit ut vulputate suscipit, nisi metus gravida justo, nec placerat massa est sed ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed orci justo, iaculis ut viverra nec, imperdiet non ligula',
            icon: 'playIcon'
        },
        {
            title: 'Build',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, elit ut vulputate suscipit, nisi metus gravida justo, nec placerat massa est sed ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed orci justo, iaculis ut viverra nec, imperdiet non ligula',
            icon: 'buildIcon'
        },
        {
            title: 'Discover',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, elit ut vulputate suscipit, nisi metus gravida justo, nec placerat massa est sed ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed orci justo, iaculis ut viverra nec, imperdiet non ligula',
            icon: 'discoverIcon'
        },
        {
            title: 'Connect',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, elit ut vulputate suscipit, nisi metus gravida justo, nec placerat massa est sed ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed orci justo, iaculis ut viverra nec, imperdiet non ligula',
            icon: 'connectIcon'
        },
    ]


  return (
    <div className="px-5">
      <div className="w-100">
        <h2 className="font-organetto explorer-grid-title px-0 w-50">
          The world is yours to <mark className="font-organetto explore-tag">explore</mark>
        </h2>
      </div>
      <div className="explorer-grid mt-5">
        {explorerCards.map((card) => (
               <div className="d-flex flex-column gap-3">
               <div className="d-flex flex-column gap-3">
                    <img src={require(`../../../assets/${card.icon}.svg`)} alt="play icon" height={56} width={56} />
                    <h6 className="explorer-card-title">{card.title}</h6>
               </div>
               <p className="explorer-card-content">{card.content}</p>
           </div>
        ))}
     
      </div>
    </div>
  );
};

export default ExplorerGrid;
