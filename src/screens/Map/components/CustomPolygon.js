import React, { useState } from "react";
import { Polygon } from "react-leaflet";

const CustomPolygon = ({ item, handleMarkerClick, setInfo, setContent, content }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Polygon
      pathOptions={{
        fillColor: hovered || content === item.title ? 'beige' : 'transparent',  
        color: item?.special ? "gold" : 'beige',     
        dashArray: item?.special ? "none" : "5, 10", 
        weight: item?.special ? 2 : 1.5 
      }}
      positions={item.area}
      eventHandlers={{
        mouseover: () => setHovered(true),  
        mouseout: () => setHovered(false),
        click: () => {setContent(item.title); handleMarkerClick(item, 15, "area"); setInfo(true);}
      }}
    />
  );
};

export default CustomPolygon;

