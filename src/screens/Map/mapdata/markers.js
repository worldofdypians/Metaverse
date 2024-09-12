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
import dypIcon from "../assets/chainIcons/dypIcon.svg";
import bearIcon from "../assets/bearIcon.svg";
import boarIcon from "../assets/boarIcon.svg";
import deerIcon from "../assets/deerIcon.svg";
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
import trainIcon from "../assets/trainIcon.svg";
import scorpionKing from "../assets/scorpionKing.png";
import whitePickaxe from "../assets/whitePickaxe.svg";
import magnifier from "../assets/magnifier.svg";
import leaderboardsIcon from "../assets/leaderboardsIcon.svg";
import minerIcon from "../assets/minerIcon.svg";
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

const confluxMarker = createIcon(confluxIcon, 24);
const cmcMarker = createIcon(cmcIcon, 24);
const coingeckoMarker = createIcon(coingeckoIcon, 24);
const multiversxMarker = createIcon(multiversx, 24);
const babydogeMarker = createIcon(babydogeIcon, 24);
const avaxMarker = createIcon(avaxIcon, 24);
const chainlinkMarker = createIcon(chainlinkIcon, 24);
const coin98Marker = createIcon(coin98Icon, 24);
const gateMarker = createIcon(gateIcon, 24);
const mexcMarker = createIcon(mexcIcon, 24);
const easy2stakeMarker = createIcon(easy2stakeIcon, 24);
const kucoinMarker = createIcon(kucoinIcon, 24);
const seiMarker = createIcon(seiLogo, 24);
const immutableMarker = createIcon(immutable, 24);
const baseMarker = createIcon(baseIcon, 24);

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
  leaderboardsMarker,
  baseMarker,
  cmcMarker,
  coingeckoMarker,
  multiversxMarker,
  confluxMarker,
  babydogeMarker,
  avaxMarker,
  chainlinkMarker,
  coin98Marker,
  gateMarker,
  mexcMarker,
  easy2stakeMarker,
  kucoinMarker,
  seiMarker,
  immutableMarker,
};
