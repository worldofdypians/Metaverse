import React, { useState } from "react";
import { Polygon, useMap } from "react-leaflet";

const CustomPolygon = ({ item, handleMarkerClick, setInfo, setContent, content }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    if (item.title !== "Dypians City") setHovered(true);
  };

  const handleMouseOut = () => {
    if (item.title !== "Dypians City") setHovered(false);
  };

  useMap().createPane('bottomPane');
  useMap().getPane('bottomPane').style.zIndex = 600;

  return (
    <Polygon
      pathOptions={{
        fillColor: hovered || (content === item.title && item.title !== "Dypians City") ? 'beige' : 'transparent',
        color: item?.special ? "gold" : 'beige',
        dashArray: item?.special ? "none" : "5, 10",
        weight: item?.special ? 2 : 1.5
      }}
      pane="bottomPane"
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
