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
import scorpionKing from "../assets/scorpionKing.png";
import whitePickaxe from '../assets/whitePickaxe.svg'
import magnifier from '../assets/magnifier.svg'
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
    className: "custom-div-icon",
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

const bearMarker = createIcon(bearIcon, 24);
const boarMarker = createIcon(boarIcon, 24);
const deerMarker = createIcon(deerIcon, 24);
const bnbMarker = createIcon(bnbIcon, 24);
const coreMarker = createIcon(coreIcon, 24);
const mantaMarker = createIcon(mantaIcon, 24);
const dypMarker = createIcon(dypIcon, 24);
const skaleMarker = createIcon(skaleIcon, 24);
const taikoMarker = createIcon(taikoIcon, 24);
const victionMarker = createIcon(victionIcon, 24);
const landMarker = createIcon(landIcon, 24);
const dragonMarker = createIcon(dragon, 40);
const scorpionMarker = createIcon(scorpionKing, 40);
const questMarker = createIcon(questIcon, 24);
const teleportMarker = createIcon(teleportIcon, 24);
const craftingMarker = createIcon(craftingIcon, 24);
const findMarker = createIcon(magnifier, 32);
const mineMarker = createIcon(whitePickaxe, 32);

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
};
