import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const ZoomToLocation = ({ coordinates, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, zoomLevel);
    }
  }, [coordinates, zoomLevel, map]);


  
  return null;
};


export default ZoomToLocation;
