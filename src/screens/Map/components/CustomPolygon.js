import React, { useState } from "react";
import { Polygon } from "react-leaflet";

const CustomPolygon = ({ item, handleMarkerClick, setInfo, setContent, content }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    if (item.title !== "Dypians City") setHovered(true);
  };

  const handleMouseOut = () => {
    if (item.title !== "Dypians City") setHovered(false);
  };

  return (
    <Polygon
      pathOptions={{
        fillColor: hovered || (content === item.title && item.title !== "Dypians City") ? 'beige' : 'transparent',
        color: item?.special ? "gold" : 'beige',
        dashArray: item?.special ? "none" : "5, 10",
        weight: item?.special ? 2 : 1.5
      }}
      positions={item.area}
      eventHandlers={{
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
        click: () => {
          setContent(item.title);
          handleMarkerClick(item, 15, "area");
          setInfo(true);
        }
      }}
    />
  );
};

export default CustomPolygon;
