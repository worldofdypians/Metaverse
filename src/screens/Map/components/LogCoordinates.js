import { useEffect } from "react";
import { useMap } from "react-leaflet";


const LogCoordinates = () => {
    const map = useMap();
  
    // Attach the click event listener only once
    useEffect(() => {
      const handleClick = (e) => console.log(`[${e.latlng.lat}, ${e.latlng.lng}]`);
      map.on("click", handleClick);
  
      // Clean up event listener on component unmount
      return () => {
        map.off("click", handleClick);
      };
    }, [map]);
  
    return null;
  };

  export default LogCoordinates;