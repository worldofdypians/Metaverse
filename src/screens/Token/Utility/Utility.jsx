import React from 'react'
import './_utility.scss'

const Utility = () => {

  const interactions = [
    {
      title: "Clan",
      content: "Join or create a clan",
    },
    {
      title: "Co-op",
      content: "Fight alongside teammates",
    },
    {
      title: "Multiplayer",
      content: "Interact and compete with players from all around the world",
    },
    {
      title: "Events",
      content: "Host and attend special in-game activities",
    },
    {
      title: "Chat",
      content: "Chat with your friends and other players",
    },
    {
      title: "Advertise",
      content: "Display products and services to an online community",
    },
    {
      title: "Vote",
      content: "Help shape the future of the metaverse",
    },
    {
      title: "Vote2",
      content: "Help shape the future of the metaverse",
    }
  ];

  return (
    <div className="utility-wrapper build-business-wrapper justify-content-center py-5 position-relative d-flex align-items-center">
    <div className="custom-container w-100">
      <h4 className="main-hero-title font-montserrat text-center mb-3">
      WOD{" "}
        <mark className="font-montserrat main-hero-title explore-tag pe-2">
          Utility
        </mark>
      </h4>
      <div className="d-flex flex-column">
          <div className="d-flex align-items-center justify-content-center">
            <span className='tiers-desc'>Possibilities are limited only by your imagination</span>
          </div>
          <div className="new-benefits-grid mt-3">
            {interactions.map((item, index) => (
              <div
                className="new-benefit-card d-flex flex-column align-items-center justify-content-center p-5"
                key={index}
              >
                <h6 className="new-benefit-title">{item.title}</h6>
                <span className="new-benefit-desc">{item.content}</span>
              </div>
            ))}
          </div>
        </div>
    </div>
  </div>
  )
}

export default Utility