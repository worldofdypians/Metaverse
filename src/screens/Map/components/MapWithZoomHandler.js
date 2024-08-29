import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapWithZoomHandler = ({ setCities, setAreas }) => {
    const map = useMap();
    useEffect(() => {
      const handleZoomEnd = () => {
        const zoomLevel = map.getZoom();
        setAreas(zoomLevel === 13);
        setCities(zoomLevel !== 13);
      };
  
      map.on("zoomend", handleZoomEnd);
      return () => map.off("zoomend", handleZoomEnd);
    }, [map, setCities, setAreas]);
  
    return null;
  };


  export default MapWithZoomHandler