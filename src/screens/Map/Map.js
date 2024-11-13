import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  Suspense,
  useEffect,
} from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./_map.scss";
import {
  markers,
  AreaTextMarker,
  CityTextMarker,
  SeaTextMarker,
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
  firstParcel,
  secondParcel,
  leaderboards,
  dypiansTransport,
  bearAreas,
  boarAreas,
  deerAreas,
  mines,
  challenges,
} from "./mapdata/areas";
import ZoomToLocation from "./components/ZoomToLocation";
import L from "leaflet";
import MapWithZoomHandler from "./components/MapWithZoomHandler";
import CustomMarker from "./components/CustomMarker";
// import MarkerDetails from "./components/MarkerDetails";
// import EventsBar from "./components/EventsBar";
import CustomPolygon from "./components/CustomPolygon";
import MarkerClusterGroup from "react-leaflet-cluster";
import landIcon from "./assets/landIcon.png";
import ChainPolygon from "./components/ChainPolygon";
import LogCoordinates from "./components/LogCoordinates";
import DynamicBounds from "./components/DynamicBounds";
import LeafletDraw from "./components/LeafletDraw";

// Lazy load for performance
const MapSidebar = React.lazy(() => import("./components/MapSidebar"));
const MarkerDetails = React.lazy(() => import("./components/MarkerDetails"));
const EventsBar = React.lazy(() => import("./components/EventsBar"));

const Map = ({
  dummyBetaPassData2
}) => {
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
    regions: false,
    areas: false,
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
  const [markerType, setMarkerType] = useState(null);
  const [events, setEvents] = useState(false);

  const liveTreasureHunts = dummyBetaPassData2.filter((item) => {
    return item.eventStatus === "Live"
  })

  


  // Memoize large data to avoid re-renders
  const memoizedChainAreas = useMemo(() => chainAreas, [chainAreas]);
  const memoizedRegions = useMemo(() => regions, [regions]);
  const memoizedQuests = useMemo(() => quests, [quests]);
  const memoizedSeas = useMemo(() => seas, [seas]);
  const memoizedAreas = useMemo(() => areas, [areas]);
  const memoizedTeleports = useMemo(() => teleports, [teleports]);
  const memoizedLeaderboards = useMemo(() => leaderboards, [leaderboards]);
  const memoizedCraftingTables = useMemo(() => craftingTables, [craftingTables]);
  const memoizedMines = useMemo(() => mines, [mines]);
  const memoizedBearAreas = useMemo(() => bearAreas, [bearAreas]);
  const memoizedBoarAreas = useMemo(() => boarAreas, [boarAreas]);
  const memoizedDeerAreas = useMemo(() => deerAreas, [deerAreas]);
  const memoizedFirstParcel = useMemo(() => firstParcel, [firstParcel]);
  const memoizedSecondParcel = useMemo(() => secondParcel, [secondParcel]);



  const allChallenges = [...challenges]

  // Custom marker click handler with memoization
  const handleMarkerClick = useCallback((marker, zoom, type) => {
    setEvents(false);
    setSelectedMarker(marker);
    setCenter(marker.location);
    setZoom(zoom);
    setMarkerType(type || "");
    setShow(true);
  }, []);

  // Create custom cluster icon
  const customClusterIcon = useMemo(
    () =>
      L.icon({
        iconUrl: landIcon,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      }),
    []
  );

  const createCustomClusterIcon = useCallback(
    (cluster) =>
      L.divIcon({
        html: `<img src="${customClusterIcon.options.iconUrl}" style="width: ${customClusterIcon.options.iconSize[0]}px; height: ${customClusterIcon.options.iconSize[1]}px;" />`,
        className: "custom-cluster-icon",
        iconSize: customClusterIcon.options.iconSize,
      }),
    [customClusterIcon]
  );

  // Render chain markers and polygons
  const ChainMarkers = useCallback(
    () =>
      chainsVisible &&
      memoizedChainAreas.map((item) => (
        <React.Fragment key={item.title}>
          <ChainPolygon item={item} handleMarkerClick={handleMarkerClick} />
          <CustomMarker
            item={item}
            icon={item.marker}
            type="chain"
            handleMarkerClick={handleMarkerClick}
          />
        </React.Fragment>
      )),
    [chainsVisible, memoizedChainAreas, handleMarkerClick]
  );

  return (
    <div className="d-flex align-items-start">
      <Suspense fallback={<div className="d-none">Loading...</div>}>
        <MapSidebar
          switches={switches}
          setSwitches={setSwitches}
          handleMarkerClick={handleMarkerClick}
          chainAreas={chainAreas}
          setContent={setAreaContent}
          setInfo={areaContent}
        />
      </Suspense>
      <MapContainer
        bounds={[
          [0.0, 0.0],
          [-0.14373029, 0.14373045],
        ]}
        center={center}
        zoom={zoom}
        minZoom={13}
        maxZoom={18}
        maxBounds={[
          [0.0, 0.0],
          [-0.12373029, 0.14373045],
        ]}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* <TileLayer url="/testtiles/{z}/{x}/{y}.png" noWrap={true} /> */}
        <TileLayer url="https://cdn.worldofdypians.com/MapTiles/{z}/{x}/{y}.png" />

        <ChainMarkers />

        {switches.regions &&
          areasVisible &&
          memoizedAreas.map((item) => (
            <AreaTextMarker
              key={item.title}
              position={item.location}
              area={item.title}
            />
          ))}

        {switches.quests &&
          memoizedQuests.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.questMarker}
              item={item}
              type={"quest"}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.boar &&
          memoizedBoarAreas.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.boarMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.bear &&
          memoizedBearAreas.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.bearMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}

        {switches.deer &&
          memoizedDeerAreas.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.deerMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.challenges &&
          allChallenges.map((item) => (
            <CustomMarker
              key={item.title}
              icon={item.marker}
              type={item.type}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.leaderboards &&
          memoizedLeaderboards.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.leaderboardsMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.teleports &&
          memoizedTeleports.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.teleportMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.mines &&
          memoizedMines.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.mineMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {switches.craftingTables &&
          memoizedCraftingTables.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.craftingMarker}
              item={item}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        {/* <MarkerClusterGroup
          iconCreateFunction={createCustomClusterIcon}
          disableClusteringAtZoom={18}
        >
          {memoizedFirstParcel.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.landMarker}
              item={item}
              handleMarkerClick={() => handleMarkerClick(item, 18, "area")}
            />
          ))}
          {memoizedSecondParcel.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.landMarker}
              item={item}
              handleMarkerClick={() => handleMarkerClick(item, 18, "area")}
            />
          ))}
        </MarkerClusterGroup> */}

        {regionsVisible &&
          switches.areas &&
          memoizedRegions.map((item, index) => (
            <React.Fragment key={index}>
              <CustomPolygon
                key={index}
                compKey={index}
                item={item}
                handleMarkerClick={handleMarkerClick}
                setContent={setAreaContent}
                content={areaContent}
              />
              {item.location.length > 0 && (
                <CityTextMarker position={item.location} area={item.title} />
              )}
            </React.Fragment>
          ))}

        {memoizedSeas.map((item) => (
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
        <DynamicBounds />
        {/* <LeafletDraw /> */}
        <MapWithZoomHandler
          setAreas={setAreasVisible}
          setRegions={setRegionsVisible}
          setChains={setChainsVisible}
        />
        <ZoomToLocation coordinates={center} zoomLevel={zoom} />
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
      <Suspense fallback={<div className="d-none">Loading...</div>}>
        <MarkerDetails
          marker={selectedMarker}
          type={markerType}
          show={show}
          onClose={() => {
            setSelectedMarker(null);
            setMarkerType(null);
            setShow(false);
          }}
        />
      </Suspense>
      <Suspense fallback={<div className="d-none">Loading...</div>}>
        <EventsBar
          show={events}
          handleMarkerClick={handleMarkerClick}
          setSwitches={setSwitches}
          switches={switches}
          onClose={() => setEvents(false)}
          liveTreasureHunts={liveTreasureHunts}
        />
      </Suspense>
    </div>
  );
};

export default Map;
