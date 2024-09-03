import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapWithZoomHandler = ({ setAreas, setRegions, setChains, setAreaInfo }) => {
    const map = useMap();
    useEffect(() => {
      const handleZoomEnd = () => {
        const zoomLevel = map.getZoom();
        setAreas(zoomLevel <= 14);
        setChains(zoomLevel >= 14);
        setRegions(zoomLevel >= 15);
      };
  
      map.on("zoomend", handleZoomEnd);
      return () => map.off("zoomend", handleZoomEnd);
    }, [map, setAreas, setChains, setRegions]);
  
    return null;
  };


  export default MapWithZoomHandler