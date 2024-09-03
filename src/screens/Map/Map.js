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
} from "./mapdata/areas";
import MapSidebar from "./components/MapSidebar";
import ZoomToLocation from "./components/ZoomToLocation";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import MapWithZoomHandler from "./components/MapWithZoomHandler";
import CustomMarker from "./components/CustomMarker";
import LogCoordinates from "./components/LogCoordinates";
import MarkerDetails from "./components/MarkerDetails";
import EventsBar from "./components/EventsBar";
import CustomPolygon from "./components/CustomPolygon";
import AreaInfo from "./components/AreaInfo";

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
  const [areaInfo, setAreaInfo] = useState(false);
  const [areaContent, setAreaContent] = useState(null)
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
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerType, setmarkerType] = useState(null);
  const [events, setEvents] = useState(false);

  const handleMarkerClick = (marker,zoom, type) => {
    if (type === "" || !type) {
      setCenter(marker.location);
      setZoom(zoom);
    } else {
      setSelectedMarker(marker);
      setCenter(marker.location);
      setmarkerType(type);
      setZoom(zoom);
    }
  };

  const bounds = [
    [-0.16, 0.0], // Southwest corner
    [0.16, 0.16], // Northeast corner
  ];
  
  return (
    <div className="d-flex align-items-start">
      <MapSidebar
        switches={switches}
        setSwitches={setSwitches}
        handleMarkerClick={handleMarkerClick}
        chainAreas={chainAreas}
      />
      <MapContainer
        bounds={[
          [0.0, 0.0],
          [-0.14373029, 0.14373045],
        ]}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        center={center}
        zoom={zoom}
        minZoom={13}
        maxZoom={18}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="/mapTiles/{z}/{x}/{y}.png" />
      {zoom >= 14 &&
           
           <ChainMarkers
           chainsVisible={chainsVisible}
           chainAreas={chainAreas}
           handleMarkerClick={handleMarkerClick}
         />
      }

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
        {regionsVisible && switches.areas &&
          regions.map((item, index) => (
            <>
              <CustomPolygon
                key={index}
                item={item}
                handleMarkerClick={handleMarkerClick}
                setInfo={setAreaInfo}
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

        {switches.borders && (
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
          setAreaInfo={setAreaInfo}
        />
        <ZoomToLocation coordinates={center} zoomLevel={zoom} />
        {/* <LeafletDraw /> */}
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
          events || selectedMarker ? "d-none" : "d-flex"
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
      <AreaInfo show={areaInfo} content={areaContent} onClose={() => {setAreaInfo(false); setAreaContent(null)}} />
    </div>
  );
};

export default Map;
