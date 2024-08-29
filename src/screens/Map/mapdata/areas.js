import { bnbMarker, coreMarker, dypMarker, mantaMarker, skaleMarker, taikoMarker, victionMarker } from "./markers";

const chainAreas = [
  {
    title: "BNB Chain Area",
    marker: bnbMarker,
    icon: "bnbIcon.svg",
    location: [-0.06735561726792588, 0.08666753768920898],
    link: "https://www.bnbchain.org/en",
    logo: "bnbBackers.svg",
    banner: "bnbBanner.webp",
  },
  {
    title: "CORE Area",
    marker: coreMarker,
    icon: "coreIcon.svg",
    location: [-0.06806371995340654, 0.08683919906616212],
    link: "https://coredao.org/",
    logo: "coreBackers.svg",
    banner: "coreBanner.png",
  },
  {
    title: "Dypius Area",
    marker: dypMarker,
    icon: "dypIcon.svg",
    location: [-0.07008073966681364, 0.08507966995239259],
    link: "https://www.dypius.com/",
    logo: "coreBackers.svg",
    banner: "bnbBanner.webp",
  },
  {
    title: "Manta Area",
    marker: mantaMarker,
    icon: "mantaIcon.png",
    location: [-0.06883619559843743, 0.08705377578735353],
    link: "https://manta.network/",
    logo: "mantaBackers.svg",
    banner: "mantaBanner.webp",
  },
  {
    title: "SKALE Area",
    marker: skaleMarker,
    icon: "skaleIcon.svg",
    location: [-0.0694799252930712, 0.08724689483642578],
    link: "https://skale.space/",
    logo: "skaleBackers.svg",
    banner: "skaleBanner.webp",
  },
  {
    title: "Taiko Area",
    marker: taikoMarker,
    icon: "taikoIcon.svg",
    location: [-0.06973741716847187, 0.08653879165649415],
    link: "https://taiko.xyz/",
    logo: "taikoBackers.svg",
    banner: "taikoBanner.webp",
  },
  {
    title: "Viction Area",
    marker: victionMarker,
    icon: "victionIcon.svg",
    location: [-0.06990907841795445, 0.08591651916503908],
    link: "https://www.viction.xyz/",
    logo: "victionBackers.svg",
    banner: "victionBanner.png",
  },
];



const bearAreas = [
    {
      title: "Sherwood Forest",
      location: [-0.02180099434699208, 0.012788772583007812],
    },
    {
      title: "Cedar Groove",
      location: [-0.011329650805073449, 0.03141403198242188],
    },
    {
      title: "Flag Mountain",
      location: [-0.019140243174277705, 0.049953460693359375],
    },
  ];
  const deerAreas = [
    {
      title: "Kruger Creek",
      location: [-0.03742217751510986, 0.010385513305664062],
    },
    {
      title: "Flaming Field",
      location: [-0.015363693053192292, 0.04205703735351563],
    },
    {
      title: "Broad Hill",
      location: [-0.06154059180485963, 0.03416061401367188],
    },
  ];
  const boarAreas = [
    {
      title: "Water Swamp",
      location: [-0.023946761387772898, 0.031843185424804694],
    },
    {
      title: "Burning Man",
      location: [-0.037937161534604455, 0.02051353454589844],
    },
    {
      title: "Brood Mountain",
      location: [-0.033645627949107575, 0.05887985229492188],
    },
  ];
  const areas = [
    {
      title: "Onyx",
      location: [-0.02180099434699208, 0.07141113281250001],
    },
    {
      title: "Hypatia",
      location: [-0.07020948560305092, 0.03793716430664063],
    },
    {
      title: "Kepler Land",
      location: [-0.06729124429600966, 0.11363983154296875],
    },
    {
      title: "Caldera",
      location: [-0.11930457076893519, 0.07020950317382814],
    },
  ];
  const cities = [
    {
      title: "Mexico",
      location: [-0.08506061387716997, 0.06317169862165352],
    },
    {
      title: "America Sude",
      location: [-0.0728726677120531, 0.04660637574567695],
    },
    {
      title: "Africa",
      location: [-0.06377462121177607, 0.028066947034739446],
    },
    {
      title: "Arabia",
      location: [-0.04909758064236935, 0.018968894056223817],
    },
    {
      title: "Scandinavia",
      location: [-0.01802687712518194, 0.06952316956891914],
    },
    {
      title: "Alaska",
      location: [-0.02429251695357766, 0.04720719056501289],
    },
    {
      title: "American Norde",
      location: [-0.03854040906211741, 0.0664332647837629],
    },
    {
      title: "Europa",
      location: [-0.03845457839302011, 0.10248215394391914],
    },
    {
      title: "East Caldera",
      location: [-0.11420137464595947, 0.09025597072952253],
    },
    {
      title: "West Caldera",
      location: [-0.12776259316169028, 0.059442753566436586],
    },
 
    {
      title: "Russia",
      location: [-0.08815051513205814, 0.09243996339216132],
    },
    {
      title: "Asia",
      location: [-0.061457194006946936, 0.10728867249860664],
    },
    {
      title: "Japan",
      location: [-0.07115605529852233, 0.13758690553083322],
    },
    {
      title: "Island Zero",
      location: [-0.0695442982620486, 0.07366418838500977],
    },
  ]

  const seas = [
    {
      title: "Glacialis Frozen Sea",
      location: [-0.036629332982360708, 0.043945947265625003],
      color: "white"
    },
   
    {
      title: "The Great Alimentum Reef",
      location: [-0.1025198918026858, 0.059226074218750003],
      color: "cyan"
    },
    {
      title: "Levamen Waters",
      location: [-0.1008032811203055, 0.11170791625976564],
      color: "#3d6b80"
    },
    {
      title: "Vertigo Sea",
      location: [-0.07829938796474668, 0.07587432861328126],
      color: "#3d6b80"
    },
  ];


  const firstParcel = [
    {
      title: "Genesis Land #1", 
      location: [-0.06604670015565114, 0.053202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #2", 
      location: [-0.06704670015565114, 0.053202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #3", 
      location: [-0.06804670015565114, 0.053202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #4", 
      location: [-0.06604670015565114, 0.054202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #5", 
      location: [-0.06704670015565114, 0.054202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #6", 
      location: [-0.06804670015565114, 0.054202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #7", 
      location: [-0.06804670015565114, 0.055202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #8", 
      location: [-0.06704670015565114, 0.055202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #9", 
      location: [-0.06604670015565114, 0.055202079772949226],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    },
  ]
  const secondParcel = [
    {
      title: "Genesis Land #10", 
      location: [-0.06089686200874071, 0.02594232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #11", 
      location: [-0.06189686200874071, 0.02594232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #12", 
      location: [-0.06289686200874071, 0.02594232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #13", 
      location: [-0.06289686200874071, 0.02694232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #14", 
      location: [-0.06189686200874071, 0.02694232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #15", 
      location: [-0.06089686200874071, 0.02694232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #16", 
      location: [-0.06089686200874071, 0.02794232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #17", 
      location: [-0.06189686200874071, 0.02794232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #18", 
      location: [-0.06289686200874071, 0.02794232559204102],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
  ]
  const thirdParcel = [
    {
      title: "Genesis Land #20", 
      location: [-0.05488871688514166, 0.10278224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #21", 
      location: [-0.05588871688514166, 0.10278224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #22", 
      location: [-0.05688871688514166, 0.10278224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #23", 
      location: [-0.05788871688514166, 0.10278224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #24", 
      location: [-0.05488871688514166, 0.10378224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #25", 
      location: [-0.05588871688514166, 0.10378224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #26", 
      location: [-0.05688871688514166, 0.10378224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #27", 
      location: [-0.05788871688514166, 0.10378224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #28", 
      location: [-0.05488871688514166, 0.10478224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #29", 
      location: [-0.05588871688514166, 0.10478224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #30", 
      location: [-0.05688871688514166, 0.10478224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #31", 
      location: [-0.05788871688514166, 0.10478224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #32", 
      location: [-0.05488871688514166, 0.10578224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #33", 
      location: [-0.05588871688514166, 0.10578224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #34", 
      location: [-0.05688871688514166, 0.10578224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
    {
      title: "Genesis Land #35", 
      location: [-0.05788871688514166, 0.10578224945068361],
      link: "https://www.worldofdypians.com/marketplace/nft/0/0xcd60d912655281908ee557ce1add61e983385a03"
    }, 
 
  ]


  const quests = [
    {
      title: "Dragon Slaying",
      location: [-0.06608961547135184, 0.085294246673584],
    },
    {
      title: "Scorpion Hunt",
      location: [-0.06945846763671572, 0.08226871490478517],
    },
    {
      title: "Alchemy Reagents",
      location: [-0.07126091073560278, 0.08694648742675783],
    },
    {
      title: "Portal Fuel",
      location: [-0.06817100823818639, 0.08831977844238283],
    },

  ]

  const hypatiaBorders = [
    [-0.04536151412107925, 0.04209995269775391],
    [-0.04619836306659037, 0.04463195800781251],
    [-0.04559754844003202, 0.0457906723022461],
    [-0.04583358275820873, 0.04667043685913086],
    [-0.04686355068292695, 0.04688501358032227],
    [-0.04703521200224178, 0.04825830459594727],
    [-0.04776477260464168, 0.0491166114807129],
    [-0.04774331493996587, 0.05272150039672852],
    [-0.04853724852813649, 0.05325794219970704],
    [-0.04926680911445551, 0.052850246429443366],
    [-0.048301214219107054, 0.054481029510498054],
    [-0.04855870619254514, 0.056605339050292976],
    [-0.04832267188359203, 0.05840778350830079],
    [-0.04982470838096353, 0.05911588668823243],
    [-0.050060742684598744, 0.06010293960571289],
    [-0.050983422227008586, 0.060317516326904304],
    [-0.051648609795904, 0.05990982055664063],
    [-0.053987495062927396, 0.06085395812988282],
    [-0.055682650383938694, 0.06257057189941408],
    [-0.05660532984207655, 0.06181955337524415],
    [-0.06089686200874071, 0.06566047668457033],
  ];

  const keplerBorders = [
    [-0.05881546894907884, 0.08089542388916017],
    [-0.04881619816501633, 0.08321285247802734],
    [-0.04658460103813389, 0.08068084716796876],
    [-0.0461554477362973, 0.08576631546020509],
    [-0.0390315025658018, 0.08615255355834961],
    [-0.03890275656286193, 0.0888347625732422],
    [-0.03714322783661564, 0.09025096893310547],
    [-0.03712177016900099, 0.09220361709594728],
    [-0.03828048421257122, 0.09297609329223634],
    [-0.03765821185776412, 0.09447813034057617],
    [-0.03825902654523646, 0.09851217269897462],
    [-0.03600597144602951, 0.10185956954956056],
    [-0.03686427815724359, 0.10323286056518556],
    [-0.03798007686942663, 0.10301828384399415],
    [-0.03757238118777626, 0.10391950607299806],
    [-0.035598275755359086, 0.10492801666259767],
    [-0.03188609912311909, 0.11363983154296875],
  ];

  const calderaBorders = [
    [-0.11248104499785845, 0.0667548179626465],
    [-0.11539928263541743, 0.06701231002807619],
    [-0.11902562163471021, 0.07299900054931642],
    [-0.11623613013835618, 0.07553100585937501],
    [-0.1223730110573374, 0.08132457733154298],
    [-0.1271795182128582, 0.08138895034790039],
  ]

  const bosses = [
    {
      title: "Scorching Dragon",
      location: [-0.11415474014968524, 0.08462905883789064],
    },
    {
      title: "Scorpion King",
      location: [-0.02729415790322787, 0.07261276245117189],
    },
  ]

  const allAreas = [ ...bearAreas,
    ...deerAreas,
    ...boarAreas,
    ...areas,
    ...cities,
    ...seas]


  export {
    bearAreas,
deerAreas,
boarAreas,
areas,
cities,
seas,
allAreas,
hypatiaBorders,
keplerBorders,
firstParcel,
secondParcel,
thirdParcel,
calderaBorders,
quests,
bosses,
chainAreas
  }