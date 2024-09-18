import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./_map.scss";
import {
  AreaTextMarker,
  CityTextMarker,
  SeaTextMarker,
  questMarker,
  dragonMarker,
  scorpionMarker,
  teleportMarker,
  craftingMarker,
  landMarker,
  leaderboardsMarker,
  mineMarker,
} from "./mapdata/markers";
import {
  areas,
  seas,
  hypatiaBorders,
  keplerBorders,
  quests,
  bosses,
  chainAreas,
  teleports,
  craftingTables,
  regions,
  dummyEvents,
  firstParcel,
  secondParcel,
  leaderboards,
  dypiansTransport,
  bearAreas,
  boarAreas,
  deerAreas,
  mines,
} from "./mapdata/areas";
import MapSidebar from "./components/MapSidebar";
import ZoomToLocation from "./components/ZoomToLocation";
import L from "leaflet";
import MapWithZoomHandler from "./components/MapWithZoomHandler";
import CustomMarker from "./components/CustomMarker";
import LogCoordinates from "./components/LogCoordinates";
import MarkerDetails from "./components/MarkerDetails";
import EventsBar from "./components/EventsBar";
import CustomPolygon from "./components/CustomPolygon";
import MarkerClusterGroup from "react-leaflet-cluster";
import landIcon from "./assets/landIcon.png";
import LeafletDraw from "./components/LeafletDraw";
import ChainPolygon from "./components/ChainPolygon";

// Utility Functions

// Custom Components

const ChainMarkers = ({ chainsVisible, chainAreas, handleMarkerClick }) =>
  chainsVisible &&
  chainAreas.map((item) => (
    <>
      <ChainPolygon item={item} handleMarkerClick={handleMarkerClick} />
      <CustomMarker
        key={item.title}
        item={item}
        icon={item.marker}
        type="chain"
        handleMarkerClick={handleMarkerClick}
      />
    </>
  ));

// Main Component
const Map = () => {
  const mapRef = useRef();

  const [center, setCenter] = useState([
    -0.06862161903162572, 0.08585214614868165,
  ]);
  const [zoom, setZoom] = useState(17);
  const [chainsVisible, setChainsVisible] = useState(true);
  const [show, setShow] = useState(false);
  const [areaContent, setAreaContent] = useState(null);
  const [regionsVisible, setRegionsVisible] = useState(true);
  const [areasVisible, setAreasVisible] = useState(true);
  const [switches, setSwitches] = useState({
    regions: true,
    areas: true,
    borders: false,
    bosses: false,
    quests: false,
    teleports: false,
    craftingTables: false,
    leaderboards: false,
    mines: false,
    deer: false,
    boar: false,
    bear: false,
    challenges: false,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerType, setmarkerType] = useState(null);
  const [events, setEvents] = useState(false);

  const handleMarkerClick = (marker, zoom, type) => {
    setEvents(false);
    if (type === "" || !type) {
      setCenter(marker.location);
      setZoom(zoom);
    } else {
      setShow(true);
      setSelectedMarker(marker);
      setCenter(marker.location);
      setmarkerType(type);
      setZoom(zoom);
    }
  };

  const customClusterIcon = L.icon({
    iconUrl: landIcon, // Replace with your custom icon path
    iconSize: [40, 40], // Adjust the size of the icon
    iconAnchor: [20, 40], // Adjust the anchor point as needed
    popupAnchor: [0, -40], // Adjust the popup anchor point as needed
  });

  const createCustomClusterIcon = (cluster) => {
    return L.divIcon({
      html: `<img src="${customClusterIcon.options.iconUrl}" style="width: ${customClusterIcon.options.iconSize[0]}px; height: ${customClusterIcon.options.iconSize[1]}px;" />`,
      className: "custom-cluster-icon",
      iconSize: customClusterIcon.options.iconSize,
    });
  };

  // const bounds = [
  //   [-0.16, 0.0], // Southwest corner
  //   [0.16, 0.16], // Northeast corner
  // ];

  return (
    <div className="d-flex align-items-start">
      <MapSidebar
        switches={switches}
        setSwitches={setSwitches}
        handleMarkerClick={handleMarkerClick}
        chainAreas={chainAreas}
        setContent={setAreaContent}
        setInfo={areaContent}
      />
      <MapContainer
        bounds={[
          [0.0, 0.0],
          [-0.14373029, 0.14373045],
        ]}
        // maxBounds={bounds}
        // maxBoundsViscosity={1.0}
        center={center}
        zoom={zoom}
        minZoom={13}
        maxZoom={18}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* <TileLayer url="/mapTiles/{z}/{x}/{y}.png" /> */}
        <TileLayer url="https://cdn.worldofdypians.com/MapTiles/{z}/{x}/{y}.png" />
        <ChainMarkers
          chainsVisible={chainsVisible}
          chainAreas={chainAreas}
          handleMarkerClick={handleMarkerClick}
        />

        {switches.regions &&
          areasVisible &&
          areas.map((item) => (
            <AreaTextMarker
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
        {switches.leaderboards &&
          leaderboards.map((item) => (
            <CustomMarker
              icon={leaderboardsMarker}
              item={item}
              type={""}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.teleports &&
          dypiansTransport.map((item) => (
            <CustomMarker
              icon={item.marker}
              item={item}
              type={""}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.leaderboards &&
          leaderboards.map((item) => (
            <CustomMarker
              icon={leaderboardsMarker}
              item={item}
              type={""}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.bear &&
          bearAreas.map((item) => (
            <CustomMarker
              icon={item.marker}
              item={item}
              type={""}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.boar &&
          boarAreas.map((item) => (
            <CustomMarker
              icon={item.marker}
              item={item}
              type={""}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.deer &&
          deerAreas.map((item) => (
            <CustomMarker
              icon={item.marker}
              item={item}
              type={""}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.mines &&
          mines.map((item) => (
            <CustomMarker
              icon={mineMarker}
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
        {switches.challenges &&
          dummyEvents.map((item) => (
            <CustomMarker
              icon={item.marker}
              item={item}
              type={""}
              handleMarkerClick={() => handleMarkerClick(item, 18, "event")}
            />
          ))}
        <MarkerClusterGroup
          iconCreateFunction={createCustomClusterIcon}
          disableClusteringAtZoom={18}
          // iconCreateFunction={landMarker}
        >
          {firstParcel.map((item) => (
            <CustomMarker
              icon={landMarker}
              item={item}
              type={""}
              handleMarkerClick={() => handleMarkerClick(item, 18, "area")}
            />
          ))}
          {secondParcel.map((item) => (
            <CustomMarker
              icon={landMarker}
              item={item}
              type={""}
              handleMarkerClick={() => handleMarkerClick(item, 18, "area")}
            />
          ))}
        </MarkerClusterGroup>
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
        {regionsVisible &&
          switches.areas &&
          regions.map((item, index) => (
            <>
              <CustomPolygon
                key={index}
                item={item}
                handleMarkerClick={handleMarkerClick}
                setContent={setAreaContent}
                content={areaContent}
              />
              {item.location.length > 0 && (
                <CityTextMarker position={item.location} area={item.title} />
              )}
            </>
          ))}
        {seas.map((item) => (
          <SeaTextMarker
            key={item.title}
            position={item.location}
            area={item.title}
            color={item.color}
          />
        ))}

        {switches.regions && (
          <>
            <Polyline
              pathOptions={{ color: "#fff", weight: 2 }}
              positions={hypatiaBorders}
            />
            <Polyline
              pathOptions={{ color: "#fff", weight: 2 }}
              positions={keplerBorders}
            />
          </>
        )}
        <LogCoordinates />
        <MapWithZoomHandler
          setAreas={setAreasVisible}
          setRegions={setRegionsVisible}
          setChains={setChainsVisible}
        />
        <ZoomToLocation coordinates={center} zoomLevel={zoom} />
        {/* <LeafletDraw /> */}
      </MapContainer>

      <div
        className={`events-arrow ${events ? "events-arrow-open" : ""} ${
          show || selectedMarker ? "d-none" : "d-flex"
        } align-items-center justify-content-center p-3`}
        onClick={() => setEvents(!events)}
      >
        <img
          src={require("./assets/rightArrow.svg").default}
          width={24}
          height={24}
          alt=""
        />
      </div>
      <EventsBar
        show={events}
        onClose={() => setEvents(false)}
        handleMarkerClick={handleMarkerClick}
      />
      <MarkerDetails
        marker={selectedMarker}
        type={markerType}
        show={show}
        onClose={() => {
          setSelectedMarker(null);
          setmarkerType(null);
          setShow(false);
        }}
      />
    </div>
  );
};

export default Map;
