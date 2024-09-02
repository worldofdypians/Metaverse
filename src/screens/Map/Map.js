import React, { useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./_map.scss";
import {

  AreaTextMarker,
  CityTextMarker,
  SeaTextMarker,
  landMarker,
  questMarker,
  dragonMarker,
  scorpionMarker,
  teleportMarker,
  craftingMarker,
} from "./mapdata/markers";
import {
  areas,
  cities,
  seas,
  hypatiaBorders,
  keplerBorders,

  calderaBorders,
  quests,
  bosses,
  chainAreas,
  teleports,
  craftingTables,
  regions,
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
import EventsBar from "./components/EventsBar";
import LeafletDraw from "./components/LeafletDraw";

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

  const mapRef = useRef();

  const [center, setCenter] = useState([
    -0.06862161903162572, 0.08585214614868165,
  ]);
  const [zoom, setZoom] = useState(17);
  const [chainsVisible, setChainsVisible] = useState(true);
  const [citiesVisible, setCitiesVisible] = useState(false);
  const [areasVisible, setAreasVisible] = useState(true);
  const [switches, setSwitches] = useState({
    areas: false,
    cities: false,
    borders: false,
    bosses: false,
    quests: false,
    teleports: false,
    craftingTables: false,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerType, setmarkerType] = useState(null);
  const [events, setEvents] = useState(false);

  const handleMarkerClick = (marker, type) => {
    if (type === "" || !type) {
      setCenter(marker.location);
      setZoom(18);
    } else {
      setSelectedMarker(marker);
      setCenter(marker.location);
      setmarkerType(type);
      setZoom(18);
    }
  };


  return (
    <div className="d-flex align-items-start">
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
              type={"quest"}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.teleports &&
          teleports.map((item) => (
            <CustomMarker
              icon={teleportMarker}
              item={item}
              type={""}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.craftingTables &&
          craftingTables.map((item) => (
            <CustomMarker
              icon={craftingMarker}
              item={item}
              type={""}
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
       {regions.map((item, index) => (
      <Polygon
        key={index}
        pathOptions={{ fillColor: 'red', color: 'red' }}
        positions={item.location}
      />
    ))}
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
        <LeafletDraw />
      </MapContainer>
      <MarkerDetails
        marker={selectedMarker}
        type={markerType}
        onClose={() => {
          setSelectedMarker(null);
          setmarkerType(null);
        }}
      />
      <div
        className={`events-arrow ${
          events ? "d-none" : "d-flex"
        } align-items-center justify-content-center p-3`}
        onClick={() => setEvents(true)}
      >
        <img
          src={require("./assets/rightArrow.svg").default}
          width={24}
          height={24}
          alt=""
        />
      </div>
      <EventsBar show={events} onClose={() => setEvents(false)} />
    </div>
  );
};

export default Map;
