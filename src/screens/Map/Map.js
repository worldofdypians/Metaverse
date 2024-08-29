import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./_map.scss";
import {
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
  questMarker,
  dragonMarker,
  scorpionMarker,
} from "./mapdata/markers";
import {
  areas,
  cities,
  seas,
  hypatiaBorders,
  keplerBorders,
  firstParcel,
  secondParcel,
  thirdParcel,
  calderaBorders,
  quests,
  bosses,
  chainAreas,
} from "./mapdata/areas";
import MapSidebar from "./components/MapSidebar";
import ZoomToLocation from "./components/ZoomToLocation";
import MarkerClusterGroup from "react-leaflet-cluster";
import landIcon from "./assets/landIcon.png";
import L from "leaflet";
import MapWithZoomHandler from "./components/MapWithZoomHandler";
import CustomMarker from "./components/CustomMarker";
import LogCoordinates from "./components/LogCoordinates";
import MarkerDetails from "./components/MarkerDetails";

// Utility Functions

// Custom Components

const ChainMarkers = ({ chainsVisible, chainAreas, handleMarkerClick }) =>
  chainsVisible &&
  chainAreas.map((item) => (
    <CustomMarker
      key={item.title}
      item={item}
      icon={item.marker}
      type="chain"
      handleMarkerClick={handleMarkerClick}
    />
  ));

const LandMarkers = ({ parcels, handleMarkerClick, landMarker }) =>
  parcels.map((parcel) => (
    <MarkerClusterGroup
      chunkedLoading
      iconCreateFunction={createLandIcon}
      disableClusteringAtZoom={15}
    >
      {parcel.map((item) => (
        <CustomMarker
          key={item.title}
          item={item}
          icon={landMarker}
          type="land"
          handleMarkerClick={handleMarkerClick}
        />
      ))}
    </MarkerClusterGroup>
  ));

const createLandIcon = () =>
  L.icon({
    iconUrl: landIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const createChainIcon = () => {
  return L.divIcon({
    className: "custom-div-icon",
    html: '<div class="area-text-marker">Dypians City</div>',
    iconSize: [150, 60],
    iconAnchor: [75, 30], // Center the text
  });
};

// Main Component
const Map = () => {
  const [center, setCenter] = useState([
    -0.06862161903162572, 0.08585214614868165,
  ]);
  const [zoom, setZoom] = useState(17);
  const [chainsVisible, setChainsVisible] = useState(true);
  const [citiesVisible, setCitiesVisible] = useState(false);
  const [areasVisible, setAreasVisible] = useState(true);
  const [switches, setSwitches] = useState({
    areas: true,
    cities: true,
    borders: true,
    bosses: true,
    quests: true,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);


  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setCenter(marker.location);
    setZoom(17);
  };



  return (
    <div className="d-flex align-items-start" > 
      <MapSidebar
        switches={switches}
        setSwitches={setSwitches}
        setChainsVisible={setChainsVisible}
        handleMarkerClick={handleMarkerClick}
        chainAreas={chainAreas}
      />
      <MapContainer
        bounds={[
          [0.0, 0.0],
          [-0.14373029, 0.14373045],
        ]}
        center={center}
        zoom={zoom}
        minZoom={13}
        maxZoom={18}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="/mapTiles/{z}/{x}/{y}.png" />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createChainIcon}
          disableClusteringAtZoom={15}
        >
          <ChainMarkers
            chainsVisible={chainsVisible}
            chainAreas={chainAreas}
            handleMarkerClick={handleMarkerClick}
          />
        </MarkerClusterGroup>

        <LandMarkers
          parcels={[firstParcel, secondParcel, thirdParcel]}
          handleMarkerClick={handleMarkerClick}
          landMarker={landMarker}
        />

        {switches.areas &&
          areasVisible &&
          areas.map((item) => (
            <AreaTextMarker
              key={item.title}
              position={item.location}
              area={item.title}
            />
          ))}

        {switches.cities &&
          citiesVisible &&
          cities.map((item) => (
            <CityTextMarker
              key={item.title}
              position={item.location}
              area={item.title}
            />
          ))}
        {switches.quests &&
          quests.map((item) => (
            <CustomMarker
              icon={questMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.bosses && (
          <>
            <CustomMarker
              icon={dragonMarker}
              item={bosses[0]}
              handleMarkerClick={handleMarkerClick}
            />
            <CustomMarker
              icon={scorpionMarker}
              item={bosses[1]}
              handleMarkerClick={handleMarkerClick}
            />
          </>
        )}

        {seas.map((item) => (
          <SeaTextMarker
            key={item.title}
            position={item.location}
            area={item.title}
            color={item.color}
          />
        ))}

        {switches.borders && (
          <>
            <Polyline
              pathOptions={{ color: "#fff", dashArray: "5, 10" }}
              positions={hypatiaBorders}
            />
            <Polyline
              pathOptions={{ color: "#fff", dashArray: "5, 10" }}
              positions={keplerBorders}
            />
            <Polyline
              pathOptions={{ color: "#fff", dashArray: "5, 10" }}
              positions={calderaBorders}
            />
          </>
        )}
        <LogCoordinates />
        <MapWithZoomHandler
          setAreas={setAreasVisible}
          setCities={setCitiesVisible}
        />
        <ZoomToLocation coordinates={center} zoomLevel={zoom} />
      </MapContainer>
      <MarkerDetails
        marker={selectedMarker}
        onClose={() => setSelectedMarker(null)}
      />
    </div>
  );
};

export default Map;
