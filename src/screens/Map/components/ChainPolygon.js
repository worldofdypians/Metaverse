import React from 'react'
import { Polygon, useMap } from 'react-leaflet';

const ChainPolygon = ({item, handleMarkerClick, setActiveMarker}) => {

    useMap().createPane('pane');
    useMap().getPane('pane').style.zIndex = 650;

  return (
    <Polygon
    pathOptions={{
      fillColor: 'transparent',
      color: 'transparent',
    }}
    pane='pane'
    positions={item.area}
    eventHandlers={{
      click: (e) => {
        e.originalEvent.stopPropagation();
        handleMarkerClick(item, 18, "chain");
        setActiveMarker(item.title);
      }
    }}
  />
  )
}

export default ChainPolygon