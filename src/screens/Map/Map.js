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
import ChainPolygon from "./components/ChainPolygon";
import LogCoordinates from "./components/LogCoordinates";
import DynamicBounds from "./components/DynamicBounds";
import LeafletDraw from "./components/LeafletDraw";

// Lazy load for performance
const MapSidebar = React.lazy(() => import("./components/MapSidebar"));
const MarkerDetails = React.lazy(() => import("./components/MarkerDetails"));
const EventsBar = React.lazy(() => import("./components/EventsBar"));

const Map = ({ dummyBetaPassData2 }) => {
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
    chains: false,
    museum: false,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerType, setMarkerType] = useState(null);
  const [events, setEvents] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);

  const liveTreasureHunts = dummyBetaPassData2.filter((item) => {
    return item.eventStatus === "Live" || item.eventStatus === "Coming Soon";
  });

  // Memoize large data to avoid re-renders
  const memoizedChainAreas = useMemo(() => chainAreas, [chainAreas]);
  const memoizedRegions = useMemo(() => regions, [regions]);
  const memoizedQuests = useMemo(() => quests, [quests]);
  const memoizedSeas = useMemo(() => seas, [seas]);
  const memoizedAreas = useMemo(() => areas, [areas]);
  const memoizedTeleports = useMemo(() => teleports, [teleports]);
  const memoizedLeaderboards = useMemo(() => leaderboards, [leaderboards]);
  const memoizedCraftingTables = useMemo(
    () => craftingTables,
    [craftingTables]
  );
  const memoizedMines = useMemo(() => mines, [mines]);
  const memoizedBearAreas = useMemo(() => bearAreas, [bearAreas]);
  const memoizedBoarAreas = useMemo(() => boarAreas, [boarAreas]);
  const memoizedDeerAreas = useMemo(() => deerAreas, [deerAreas]);
  const memoizedFirstParcel = useMemo(() => firstParcel, [firstParcel]);
  const memoizedSecondParcel = useMemo(() => secondParcel, [secondParcel]);

  const museumLocation = {
    title: "Cryptiroum",
    special: true,
    type: "museum",
    location: [-0.06801544022518818, 0.08683919906616212],
    marker: "museumMarker",
    image: "https://cdn.worldofdypians.com/wod/museumMap.webp",
    link: "/shop/land",
    city: "Dypians",
    size: "500x500",
    rewards: "N/A",
    area: [
      [
        [-0.06759701591186747, 0.0870591402053833],
        [-0.06775258392621424, 0.08641004562377931],
        [-0.06839094922121794, 0.08656561374664307],
        [-0.06824074562316736, 0.08723616600036622],
      ],
    ],
    popupDesc:
      "The AI Museum & Academy is a next-generation educational hub built inside World of Dypians. With interactive elements and AI-driven guidance, it helps players understand everything from basic crypto concepts to advanced blockchain ecosystems.",
    benefits: [
      "A visual walkthrough of Web3 history and evolution",
      "Interactive lessons on crypto, wallets, NFTs, and DeFi",
      "Guided educational paths powered by AI",
      "AI-powered NPCs that explain, engage, and answer questions in real time",
      "A hands-on learning experience for both new and seasoned players",
    ],
    landInfo: [
      "Learn complex topics through storytelling and interaction",
      "Get real-time help from AI-driven characters",
      "Guided educational paths powered by AI",
      "Makes onboarding to Web3 simple, engaging, and rewarding",
      "Combines education and gameplay in a fully gamified format",
    ],
  };

  const allChallenges = challenges.filter((item) =>
    item.hasOwnProperty("location")
  );

  // Custom marker click handler with memoization
  const handleMarkerClick = useCallback((marker, zoom, type, showMarker) => {
    if (showMarker !== false) {
      setEvents(false);
      setSelectedMarker(marker);
      setShow(true);
      setMarkerType(type || "");
    }

    if (marker?.location) {
      setZoom(zoom);
      setCenter(marker.location);
    }
  }, []);

  // Create custom cluster icon
  const customClusterIcon = useMemo(
    () =>
      L.icon({
        iconUrl: "https://cdn.worldofdypians.com/wod/landIcon.png",
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

  useEffect(() => {
    document.title = "WOD Map";
    window.scrollTo(0, 0);
  }, []);

  // Render chain markers and polygons
  const ChainMarkers = useCallback(
    () =>
      chainsVisible &&
      memoizedChainAreas
        .filter((item) => {
          return item.title !== activeMarker;
        })
        .map((item) => (
          <React.Fragment key={item.title}>
            <ChainPolygon
              item={item}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
              type={"chain"}
            />
            <CustomMarker
              item={item}
              icon={item.marker}
              type="chain"
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          </React.Fragment>
        )),
    [chainsVisible, memoizedChainAreas, handleMarkerClick, activeMarker]
  );
  const ActiveChainMarkers = useCallback(
    () =>
      chainsVisible &&
      memoizedChainAreas
        .filter((item) => {
          return item.title === activeMarker;
        })
        .map((item) => (
          <React.Fragment key={item.title}>
            <ChainPolygon
              item={item}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
              type={"chain"}
            />
            <CustomMarker
              item={item}
              icon={item.activeMarker}
              type="chain"
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          </React.Fragment>
        )),
    [chainsVisible, memoizedChainAreas, handleMarkerClick, activeMarker]
  );

  return (
    <>
      {" "}
      <Suspense fallback={<div className="d-none">Loading...</div>}>
        <MapSidebar
          switches={switches}
          setSwitches={setSwitches}
          handleMarkerClick={handleMarkerClick}
          chainAreas={chainAreas}
          setContent={setAreaContent}
          setInfo={areaContent}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          museumLocation={museumLocation}
          onClose={() => {
            setSelectedMarker(null);
            setMarkerType(null);
            setActiveMarker(null);
            setShow(false);
          }}
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
        {/* <TileLayer url="/dummyTiles/{z}/{x}/{y}.webp" noWrap={true} /> */}
        <TileLayer url="https://cdn.worldofdypians.com/MapTiles/{z}/{x}/{y}.webp" />

        {switches.chains && (
          <>
            <ChainMarkers />
          </>
        )}
        <ActiveChainMarkers />
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
              showMarker={false}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          ))}
        {switches.boar &&
          memoizedBoarAreas.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.boarMarker}
              item={item}
              showMarker={false}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          ))}
        {switches.bear &&
          memoizedBearAreas.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.bearMarker}
              item={item}
              showMarker={false}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          ))}

        {switches.deer &&
          memoizedDeerAreas.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.deerMarker}
              item={item}
              showMarker={false}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
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
              setActiveMarker={setActiveMarker}
            />
          ))}
        {switches.leaderboards &&
          memoizedLeaderboards.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.leaderboardsMarker}
              item={item}
              showMarker={false}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          ))}
        {switches.museum && (
          <React.Fragment>
            <ChainPolygon
              item={museumLocation}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
              type={"museum"}
            />
            <CustomMarker
              key={museumLocation.title}
              icon={markers.museumMarker}
              item={museumLocation}
              type={museumLocation.type}
              showMarker={true}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          </React.Fragment>
        )}
        {switches.teleports &&
          memoizedTeleports.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.teleportMarker}
              item={item}
              type={item.type}
              showMarker={true}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          ))}
        {switches.mines &&
          memoizedMines.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.mineMarker}
              item={item}
              showMarker={false}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
            />
          ))}
        {switches.craftingTables &&
          memoizedCraftingTables.map((item) => (
            <CustomMarker
              key={item.title}
              icon={markers.craftingMarker}
              item={item}
              showMarker={false}
              handleMarkerClick={handleMarkerClick}
              setActiveMarker={setActiveMarker}
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
          src={"https://cdn.worldofdypians.com/wod/rightArrowMap.svg"}
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
            setActiveMarker(null);
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
    </>
  );
};

export default Map;
