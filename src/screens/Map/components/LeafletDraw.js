import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

const LeafletDraw = () => {
  const map = useMap();
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    // Initialize Leaflet Draw Control
    const drawControl = new L.Control.Draw({
      draw: {
        polyline: true,
        polygon: true,
        rectangle: true,
        marker: true,
        circle: false,
        circlemarker: false,
      },
    });

    // Add the draw control to the map
    map.addControl(drawControl);

    // Event listener for drawing
    map.on(L.Draw.Event.CREATED, (event) => {
      const { layer, layerType } = event;

      // If the created layer is a polygon
      if (layerType === "polygon" || layerType === "rectangle") {
        // Get the coordinates of the polygon
        const coordinates = layer
          .getLatLngs()[0] // Get the first set of lat/lngs (in case of multi-polygon)
          .map((latlng) => [latlng.lat, latlng.lng]); // Convert to [lat, lng] format

        // Add the new polygon coordinates to state
        setPolygons((prevPolygons) => [...prevPolygons, coordinates]);

        // Log the coordinates
        console.log("Created polygon coordinates:", coordinates);
      }

      // Add the drawn layer to the map
      layer.addTo(map);
    });

    // Cleanup function to remove event listeners when the component is unmounted
    return () => {
      map.off(L.Draw.Event.CREATED);
    };
  }, [map]);

  // Log all polygons whenever they change
  useEffect(() => {
    if (polygons.length > 0) {
      console.log("All polygons:", polygons);
    }
  }, [polygons]);

  return null; // No UI for this component
};

export default LeafletDraw;
