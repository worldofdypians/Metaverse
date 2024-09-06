import bearIcon from "../assets/bearIcon.svg";
import boarIcon from "../assets/boarIcon.svg";
import bnbIcon from "../assets/bnbIcon.svg";
import coreIcon from "../assets/coreIcon.svg";
import deerIcon from "../assets/deerIcon.svg";
import dypIcon from "../assets/dypIcon.svg";
import skaleIcon from "../assets/skaleIcon.svg";
import taikoIcon from "../assets/taikoIcon.svg";
import victionIcon from "../assets/victionIcon.svg";
import mantaIcon from "../assets/mantaIcon.png";
import landIcon from "../assets/landIcon.png";
import questIcon from "../assets/questIcon.svg";
import craftingIcon from "../assets/craftingIcon.svg";
import teleportIcon from "../assets/teleportIcon.svg";
import dragon from "../assets/dragon.png";
import dragonIcon from "../assets/dragonIcon.png";
import scorpionIcon from "../assets/tempScorpion2.png";
import treasureHuntIcon from "../assets/treasureHuntIcon.png";
import puzzleMadnessIcon from "../assets/puzzleMadnessIcon.png";
import mazeGardenIcon from "../assets/mazeGardenIcon.png";
import trainIcon from '../assets/trainIcon.svg';
import scorpionKing from "../assets/scorpionKing.png";
import whitePickaxe from "../assets/whitePickaxe.svg";
import magnifier from "../assets/magnifier.svg";
import leaderboardsIcon from '../assets/leaderboardsIcon.svg'
import minerIcon from '../assets/minerIcon.svg'
import L from "leaflet";
import { Marker } from "react-leaflet";

const AreaTextMarker = ({ area, position }) => {
  const textIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div class="area-text-marker">${area}</div>`,
    iconSize: [150, 60],
    iconAnchor: [75, 30], // Center the text
  });

  return (
    <Marker position={position} icon={textIcon}>
      {/* You can add a Popup here if needed */}
    </Marker>
  );
};
const CityTextMarker = ({ area, position }) => {
  const textIcon = L.divIcon({
    className: "custom-div-icon area-marker",
    html: `<div class="city-text-marker">${area}</div>`,
    iconSize: [100, 40],
    iconAnchor: [50, 20], // Center the text
  });

  return (
    <Marker position={position} icon={textIcon}>
      {/* You can add a Popup here if needed */}
    </Marker>
  );
};
const SeaTextMarker = ({ area, position, color }) => {
  const textIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div class="sea-text-marker" style="color: ${color};">${area}</div>`,
    iconSize: [100, 40],
    iconAnchor: [50, 20], // Center the text
  });

  return (
    <Marker position={position} icon={textIcon}>
      {/* You can add a Popup here if needed */}
    </Marker>
  );
};

const createIcon = (iconUrl, size) =>
  L.icon({
    iconUrl,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });

const bearMarker = createIcon(bearIcon, 32);
const boarMarker = createIcon(boarIcon, 32);
const deerMarker = createIcon(deerIcon, 32);
const bnbMarker = createIcon(bnbIcon, 24);
const coreMarker = createIcon(coreIcon, 24);
const mantaMarker = createIcon(mantaIcon, 24);
const dypMarker = createIcon(dypIcon, 24);
const skaleMarker = createIcon(skaleIcon, 24);
const taikoMarker = createIcon(taikoIcon, 24);
const victionMarker = createIcon(victionIcon, 24);
const landMarker = createIcon(landIcon, 32);
const dragonMarker = createIcon(dragonIcon, 32);
const scorpionMarker = createIcon(scorpionIcon, 32);
const questMarker = createIcon(questIcon, 32);
const teleportMarker = createIcon(teleportIcon, 32);
const craftingMarker = createIcon(craftingIcon, 32);
const findMarker = createIcon(magnifier, 32);
const mineMarker = createIcon(minerIcon, 32);
const mazeMarker = createIcon(mazeGardenIcon, 32);
const puzzleMarker = createIcon(puzzleMadnessIcon, 32);
const treasureMarker = createIcon(treasureHuntIcon, 32);
const trainMarker = createIcon(trainIcon, 32);
const leaderboardsMarker = createIcon(leaderboardsIcon, 32);

// Exporting the markers
export {
  bearMarker,
  boarMarker,
  deerMarker,
  bnbMarker,
  coreMarker,
  mantaMarker,
  dypMarker,
  skaleMarker,
  taikoMarker,
  victionMarker,
  AreaTextMarker,
  CityTextMarker,
  SeaTextMarker,
  landMarker,
  dragonMarker,
  questMarker,
  scorpionMarker,
  teleportMarker,
  craftingMarker,
  findMarker,
  mineMarker,
  mazeMarker,
  puzzleMarker,
  treasureMarker,
  trainMarker,
  leaderboardsMarker
};
