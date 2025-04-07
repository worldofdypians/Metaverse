import L from "leaflet";
import { Marker } from "react-leaflet";

// Consolidated icon data

// Consolidated icon data array
const iconData = [
  {
    name: "bearMarker",
    url: "https://cdn.worldofdypians.com/wod/bearIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "boarMarker",
    url: "https://cdn.worldofdypians.com/wod/boarIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "deerMarker",
    url: "https://cdn.worldofdypians.com/wod/deerIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "bnbMarker",
    url: "https://cdn.worldofdypians.com/wod/bnbIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "coreMarker",
    url: "https://cdn.worldofdypians.com/wod/core.svg",
    size: 24,
    chain: true,
  },
  {
    name: "mantaMarker",
    url: "https://cdn.worldofdypians.com/wod/manta.png",
    size: 24,
    chain: true,
  },
  {
    name: "matchainMarker",
    url: "https://cdn.worldofdypians.com/wod/matchainIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "dypMarker",
    url: "https://cdn.worldofdypians.com/wod/dypius.svg",
    size: 24,
    chain: true,
  },
  {
    name: "skaleMarker",
    url: "https://cdn.worldofdypians.com/wod/skaleIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "taikoMarker",
    url: "https://cdn.worldofdypians.com/wod/taiko.svg",
    size: 24,
    chain: true,
  },
  {
    name: "victionMarker",
    url: "https://cdn.worldofdypians.com/wod/viction.svg",
    size: 24,
    chain: true,
  },
  {
    name: "landMarker",
    url: "https://cdn.worldofdypians.com/wod/landIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "dragonMarker",
    url: "https://cdn.worldofdypians.com/wod/dragonMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "coldFuryMarker",
    url: "https://cdn.worldofdypians.com/wod/coldFuryMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "furyBeastMarker",
    url: "https://cdn.worldofdypians.com/wod/furyBeastMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "eagleMarker",
    url: "https://cdn.worldofdypians.com/wod/eagleMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "cyclopsMarker",
    url: "https://cdn.worldofdypians.com/wod/cyclopsMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "mazeMarker",
    url: "https://cdn.worldofdypians.com/wod/mazeMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "criticalHitMarker",
    url: "https://cdn.worldofdypians.com/wod/criticalHitMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "scorpionMarker",
    url: "https://cdn.worldofdypians.com/wod/scorpionMarker.png",
    size: 32,
    chain: false,
  },
  {
    name: "questMarker",
    url: "https://cdn.worldofdypians.com/wod/questsIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "teleportMarker",
    url: "https://cdn.worldofdypians.com/wod/teleportsIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "craftingMarker",
    url: "https://cdn.worldofdypians.com/wod/craftIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "findMarker",
    url: "https://cdn.worldofdypians.com/wod/magnifier.svg",
    size: 32,
    chain: false,
  },
  {
    name: "mineMarker",
    url: "https://cdn.worldofdypians.com/wod/minesIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "puzzleMarker",
    url: "https://cdn.worldofdypians.com/wod/puzzleMadnessIcon.png",
    size: 32,
    chain: false,
  },
  {
    name: "treasureMarker",
    url: "https://cdn.worldofdypians.com/wod/treasureHuntIcon.png",
    size: 32,
    chain: false,
  },
  {
    name: "trainMarker",
    url: "https://cdn.worldofdypians.com/wod/trainIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "leaderboardsMarker",
    url: "https://cdn.worldofdypians.com/wod/leaderboardsIcon.svg",
    size: 32,
    chain: false,
  },
  {
    name: "confluxMarker",
    url: "https://cdn.worldofdypians.com/wod/confluxIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "cmcMarker",
    url: "https://cdn.worldofdypians.com/wod/cmcIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "coingeckoMarker",
    url: "https://cdn.worldofdypians.com/wod/coingeckoIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "multiversxMarker",
    url: "https://cdn.worldofdypians.com/wod/multiversx.svg",
    size: 24,
    chain: true,
  },
  {
    name: "babydogeMarker",
    url: "https://cdn.worldofdypians.com/wod/babydogeIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "avaxMarker",
    url: "https://cdn.worldofdypians.com/wod/avaxIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "chainlinkMarker",
    url: "https://cdn.worldofdypians.com/wod/chainlinkIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "coin98Marker",
    url: "https://cdn.worldofdypians.com/wod/coin98Icon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "gateMarker",
    url: "https://cdn.worldofdypians.com/wod/gateIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "mexcMarker",
    url: "https://cdn.worldofdypians.com/wod/mexcIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "easy2stakeMarker",
    url: "https://cdn.worldofdypians.com/wod/easy2stakeIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "kucoinMarker",
    url: "https://cdn.worldofdypians.com/wod/kucoinLogoRound.svg",
    size: 24,
    chain: true,
  },
  {
    name: "seiMarker",
    url: "https://cdn.worldofdypians.com/wod/seiLogo.svg",
    size: 24,
    chain: true,
  },
  {
    name: "immutableMarker",
    url: "https://cdn.worldofdypians.com/wod/immutable.svg",
    size: 24,
    chain: true,
  },
  {
    name: "baseMarker",
    url: "https://cdn.worldofdypians.com/wod/base.svg",
    size: 24,
    chain: true,
  },
  {
    name: "dogecoinMarker",
    url: "https://cdn.worldofdypians.com/wod/dogecoinIcon.svg",
    size: 24,
    chain: true,
  },
  {
    name: "cookieMarker",
    url: "https://cdn.worldofdypians.com/wod/cookie3.svg",
    size: 24,
    chain: true,
  },
  {
    name: "midleMarker",
    url: "https://cdn.worldofdypians.com/wod/midle.svg",
    size: 24,
    chain: true,
  },
  {
    name: "ordifyMarker",
    url: "https://cdn.worldofdypians.com/wod/ordify.svg",
    size: 24,
    chain: true,
  },
];

// Function to create markers dynamically
// const markers = {};
// iconData.forEach(({ name, url, size }) => {
//   markers[name] = L.icon({
//     iconUrl: url,
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size],
//     popupAnchor: [0, -size],
//   });
// });
const markers = {};
iconData.forEach(({ name, url, size, chain }) => {
  markers[name] = L.divIcon({
    className: `custom-chain-icon`,
    html: `<div>
    <img className="marker-pin ${
      !chain && "d-none"
    }" src="${"https://cdn.worldofdypians.com/wod/markerPin.svg"}" alt="marker-pin" />
    <img src="${url}" style="width: ${size}px; height: ${size}px;" alt="${name} icon"/></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
});

const activeMarkers = {};

iconData.forEach(({ name, url, size, chain }) => {
  activeMarkers[name] = L.divIcon({
    className: `custom-chain-icon`,
    html: `<div>
    <img className="marker-pin ${
      !chain && "d-none"
    }" src="${"https://cdn.worldofdypians.com/wod/markerPinRed.svg"}" alt="marker-pin" />
    <img src="${url}" style="width: ${size}px; height: ${size}px;" alt="${name} icon"/></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
});

// Generic Text Marker Component
const TextMarker = ({ area, position, className, color, size }) => {
  const textIcon = L.divIcon({
    className: `custom-div-icon ${className}`,
    html: `<div style="color: ${color};">${area}</div>`,
    iconSize: [size.width, size.height],
    iconAnchor: [size.width / 2, size.height / 2], // Center the text
  });

  return <Marker position={position} icon={textIcon} />;
};

// Specific marker components with predefined styles
const AreaTextMarker = (props) => (
  <TextMarker
    {...props}
    className="area-text-marker"
    size={{ width: 150, height: 60 }}
  />
);

const CityTextMarker = (props) => (
  <TextMarker
    {...props}
    className="city-text-marker"
    size={{ width: 100, height: 40 }}
  />
);

const SeaTextMarker = (props) => (
  <TextMarker
    {...props}
    className="sea-text-marker"
    size={{ width: 100, height: 40 }}
  />
);

// Exporting the markers and text markers
export {
  markers, // Exports all dynamically created markers
  activeMarkers,
  AreaTextMarker,
  CityTextMarker,
  SeaTextMarker,
};
