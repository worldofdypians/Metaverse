import L from "leaflet";
import { Marker } from "react-leaflet";

// Consolidated icon data
import bnbIcon from "../assets/chainIcons/bnbIcon.svg";
import coreIcon from "../assets/chainIcons/coreIcon.svg";
import baseIcon from "../assets/chainIcons/baseIcon.svg";
import skaleIcon from "../assets/chainIcons/skaleIcon.svg";
import taikoIcon from "../assets/chainIcons/taikoIcon.svg";
import victionIcon from "../assets/chainIcons/victionIcon.svg";
import cmcIcon from "../assets/chainIcons/cmcIcon.svg";
import coingeckoIcon from "../assets/chainIcons/coingeckoIcon.svg";
import confluxIcon from "../assets/chainIcons/confluxIcon.svg";
import babydogeIcon from "../assets/chainIcons/babydogeIcon.svg";
import multiversx from "../assets/chainIcons/multiversx.svg";
import avaxIcon from "../assets/chainIcons/avaxIcon.svg";
import coin98Icon from "../assets/chainIcons/coin98Icon.svg";
import gateIcon from "../assets/chainIcons/gateIcon.svg";
import mexcIcon from "../assets/chainIcons/mexcIcon.svg";
import easy2stakeIcon from "../assets/chainIcons/easy2stakeIcon.svg";
import kucoinIcon from "../assets/chainIcons/kucoinIcon.svg";
import seiLogo from "../assets/chainIcons/seiLogo.svg";
import immutable from "../assets/chainIcons/immutable.svg";
import chainlinkIcon from "../assets/chainIcons/chainlinkIcon.svg";
import mantaIcon from "../assets/chainIcons/mantaIcon.png";
import midle from "../assets/chainIcons/midle.png";
import dypIcon from "../assets/chainIcons/dypIcon.svg";
import cookie3 from "../assets/chainIcons/cookie3.svg";
import dogecoin from "../assets/chainIcons/dogecoin.svg";
import bearIcon from "../assets/bearIcon.svg";
import boarIcon from "../assets/boarIcon.svg";
import deerIcon from "../assets/deerIcon.svg";
import landIcon from "../assets/landIcon.png";
import questIcon from "../assets/sidebarIcons/questsIcon.svg";
import craftingIcon from "../assets/sidebarIcons/craftIcon.svg";
import teleportIcon from "../assets/sidebarIcons/teleportsIcon.svg";
import dragonIcon from "../assets/dragonIcon.png";
import scorpionIcon from "../assets/tempScorpion2.png";
import treasureHuntIcon from "../assets/treasureHuntIcon.png";
import puzzleMadnessIcon from "../assets/puzzleMadnessIcon.png";
import mazeGardenIcon from "../assets/mazeGardenIcon.png";
import trainIcon from "../assets/trainIcon.svg";
import magnifier from "../assets/magnifier.svg";
import leaderboardsIcon from "../assets/sidebarIcons/leaderboardsIcon.svg";
import minerIcon from "../assets/sidebarIcons/minesIcon.svg";
import markerPin from '../assets/markerPin.svg'

// Consolidated icon data array
const iconData = [
  { name: "bearMarker", url: bearIcon, size: 32 },
  { name: "boarMarker", url: boarIcon, size: 32 },
  { name: "deerMarker", url: deerIcon, size: 32 },
  { name: "bnbMarker", url: bnbIcon, size: 24 },
  { name: "coreMarker", url: coreIcon, size: 24 },
  { name: "mantaMarker", url: mantaIcon, size: 24 },
  { name: "dypMarker", url: dypIcon, size: 24 },
  { name: "skaleMarker", url: skaleIcon, size: 24 },
  { name: "taikoMarker", url: taikoIcon, size: 24 },
  { name: "victionMarker", url: victionIcon, size: 24 },
  { name: "landMarker", url: landIcon, size: 32 },
  { name: "dragonMarker", url: dragonIcon, size: 32 },
  { name: "scorpionMarker", url: scorpionIcon, size: 32 },
  { name: "questMarker", url: questIcon, size: 32 },
  { name: "teleportMarker", url: teleportIcon, size: 32 },
  { name: "craftingMarker", url: craftingIcon, size: 32 },
  { name: "findMarker", url: magnifier, size: 32 },
  { name: "mineMarker", url: minerIcon, size: 32 },
  { name: "mazeMarker", url: mazeGardenIcon, size: 32 },
  { name: "puzzleMarker", url: puzzleMadnessIcon, size: 32 },
  { name: "treasureMarker", url: treasureHuntIcon, size: 32 },
  { name: "trainMarker", url: trainIcon, size: 32 },
  { name: "leaderboardsMarker", url: leaderboardsIcon, size: 32 },
  { name: "confluxMarker", url: confluxIcon, size: 24 },
  { name: "cmcMarker", url: cmcIcon, size: 24 },
  { name: "coingeckoMarker", url: coingeckoIcon, size: 24 },
  { name: "multiversxMarker", url: multiversx, size: 24 },
  { name: "babydogeMarker", url: babydogeIcon, size: 24 },
  { name: "avaxMarker", url: avaxIcon, size: 24 },
  { name: "chainlinkMarker", url: chainlinkIcon, size: 24 },
  { name: "coin98Marker", url: coin98Icon, size: 24 },
  { name: "gateMarker", url: gateIcon, size: 24 },
  { name: "mexcMarker", url: mexcIcon, size: 24 },
  { name: "easy2stakeMarker", url: easy2stakeIcon, size: 24 },
  { name: "kucoinMarker", url: kucoinIcon, size: 24 },
  { name: "seiMarker", url: seiLogo, size: 24 },
  { name: "immutableMarker", url: immutable, size: 24 },
  { name: "baseMarker", url: baseIcon, size: 24 },
  { name: "dogecoinMarker", url: dogecoin, size: 24 },
  { name: "cookieMarker", url: cookie3, size: 24 },
  { name: "midleMarker", url: midle, size: 24 },
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
iconData.forEach(({ name, url, size }) => {
  markers[name] = L.divIcon({
    className: `custom-chain-icon`,
    html: `<div>
    <img class="marker-pin" src="${markerPin}" alt="marker-pin" />
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
  <TextMarker {...props} className="area-text-marker" size={{ width: 150, height: 60 }} />
);

const CityTextMarker = (props) => (
  <TextMarker {...props} className="city-text-marker" size={{ width: 100, height: 40 }} />
);

const SeaTextMarker = (props) => (
  <TextMarker {...props} className="sea-text-marker" size={{ width: 100, height: 40 }} />
);

// Exporting the markers and text markers
export {
  markers, // Exports all dynamically created markers
  AreaTextMarker,
  CityTextMarker,
  SeaTextMarker,
};
