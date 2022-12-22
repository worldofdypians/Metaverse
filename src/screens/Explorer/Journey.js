import React from "react";

const Journey = () => {

    const journeyItems = [
        'Mining maps',
        'Battle Areas',
        'Interactive',
        'Rewards',
        'Open Space',
        'Quests',
        'Skins',
        'NFTs',
        'Rare gears',
        'Clans'
    ]

  return (
    <div className="row w-100 mx-0 px-3 px-lg-5">
      <div className="d-flex flex-column justify-content-center align-items-center gap-4 px-0">
        <h6 className="journey-title font-organetto">Embrace the Journey</h6>
        <p className="journey-desc font-poppins">
          Experience the thrill of questing through uncharted worlds. Players
          can receive rewards and achievements through combat, looting, and
          forging. Fight against other players or roam the world together as a
          clan.
        </p>
      </div>
      <div className="journey-grid d-flex px-0">
        {journeyItems.map((item, index) => (
            <div className="col-12 col-lg-3 px-3 py-3">
                <div className="journey-card d-flex align-items-center justify-content-end p-3" key={index}>
            <span className="journey-card-title font-organetto">{item}</span>
        </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
