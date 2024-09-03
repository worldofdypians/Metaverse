import React, { useState } from "react";
import { Polygon } from "react-leaflet";

const CustomPolygon = ({ item, handleMarkerClick, setInfo, setContent, content }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Polygon
      pathOptions={{
        fillColor: hovered || content === item.title ? 'beige' : 'transparent',  
        color: 'beige',     
        dashArray: "5, 10", weight: 1.5 
      }}
      positions={item.area}
      eventHandlers={{
        mouseover: () => setHovered(true),  
        mouseout: () => setHovered(false),
        click: () => {setContent(item.title); handleMarkerClick(item, 15); setInfo(true);}
      }}
    />
  );
};

export default CustomPolygon;

