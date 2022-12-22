import React from 'react'

const GamePillars = () => {

    const pillars = [
      
        {
            title: 'Explore the environment',
            content: 'A huge and diverse environment constantly evolving providing endless adventure.',
            icon: 'exploreIcon'
        },
        {
            title: 'Connect with community',
            content: 'Engage with the game community and grow a network of friends and foes.',
            icon: 'connectIcon'
        },
        {
            title: 'Real-time interaction',
            content: 'Access to real-time interaction with global players, NPCs and fresh game content.',
            icon: 'realIcon'
        },
        {
            title: 'Customizable',
            content: 'User can create their own custom experiences limited only by their imagination.',
            icon: 'customizableIcon'
        },
        {
            title: 'NFT integration',
            content: 'Utilize CAWS NFTs as in game companions enhancing player skills and rewards.',
            icon: 'nftIcon'
        },
        {
            title: 'Earn rewards',
            content: 'Explore our virtual world and participate in activities such as buying and selling land, completing quests, trade items, and much more!',
            icon: 'earnIcon'
        },
    ]

  return (
   <div className="pillars-grid px-3 px-lg-5">
    {pillars.map((pillar) => (
        <div className="d-flex flex-column gap-4">
        <img src={require(`../../assets/explorerAssets/pillarIcons/${pillar.icon}.svg`)} width={56} height={56} alt="" />
        <h6 className="pillar-title font-poppins">{pillar.title}</h6>
        <p className="pillar-desc font-poppins">{pillar.content}</p>
    </div>
    ))}
   </div>
  )
}

export default GamePillars