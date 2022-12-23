import React from "react";
import "./_explorergrid.scss";
import playIcon from '../../../assets/playIcon.svg'

const ExplorerGrid = () => {


  const explorerCards = [
      
        {
            title: 'Play',
            content: 'Experience unique gameplay and explore a world without end in a quest to form your destiny. Players can create their own  tools and armors to assist in their journey. The opportunities are endless ensuring infinite possibilities.',
            icon: 'playIcon'
        },
        {
            title: 'Build',
            content: 'The World of dypians offers a robust set of creative tools so players can design the gameplay experience of their choice. Users can create gear, tools, weapons, and skins to use on never-ending quests!',
            icon: 'buildIcon'
        },
        {
            title: 'Discover',
            content: 'Players can discover new areas of the world as the map continuously grows and expands. As your journey continues, you will get access to new areas to explore and create in. An evolving world ready to be discovered.',
            icon: 'discoverIcon'
        },
        {
            title: 'Connect',
            content: 'Connect with other players, join clans, complete  quests, develop areas, trade items, and much more! The world of dypians provides a venue of collaboration limited only by the imagination.',
            icon: 'connectIcon'
        },
    ]


  return (
    <div className="px-3 px-lg-5" id="explorer">
      <div className="w-100">
        <h2 className="font-organetto explorer-grid-title px-0 w-50">
          The world is yours to <mark className="font-organetto explore-tag">shape</mark>
        </h2>
      </div>
      <div className="explorer-grid mt-5">
        {explorerCards.map((card) => (
               <div className="d-flex flex-column gap-3">
               <div className="d-flex flex-row flex-lg-column align-items-center align-items-lg-start gap-3">
                    <img src={require(`../../../assets/${card.icon}.svg`)} alt="play icon" height={56} width={56} />
                    <h6 className="explorer-card-title mb-0">{card.title}</h6>
               </div>
               <p className="explorer-card-content">{card.content}</p>
           </div>
        ))}
     
      </div>
    </div>
  );
};

export default ExplorerGrid;
