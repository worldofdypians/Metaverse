import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './_map.scss'
import L from 'leaflet'
import locationIcon from './assets/locationIcon.svg'
import locationIcon2 from './assets/locationIcon2.svg'

const MapComponent = () => {
  const [opacity, setOpacity] = useState(1);

  const MapUpdater = () => {
    const map = useMap();
    map.setZoom(14);
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: locationIcon, // Path to your custom icon
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Popup anchor
  });
  const customIcon2 = new L.Icon({
    iconUrl: locationIcon2, // Path to your custom icon
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Popup anchor
  });
  

  return (
    <div>
      <MapContainer
        style={{ height: '100vh', width: '100%' }}
        bounds={[
          [0.00000000, 0.00000000],
          [0.07358999, 0.07358997]
        ]}
        zoom={14}
        minZoom={11}
        maxZoom={16}
      >
        {/* <MapUpdater /> */}
        <TileLayer
          url="/map2/{z}/{x}/{y}.png"
          opacity={opacity}
          attribution='<a href="https://www.maptiler.com/engine/">Rendered with MapTiler Engine</a>, non-commercial use only'
          tms={false}
        />
         <Marker position={[0.02679499, 0.03679499]} icon={customIcon}>
                <Popup>
                    BNB Area
                </Popup>
            </Marker>
         <Marker position={[0.05679499, 0.04679499]} icon={customIcon2}>
                <Popup>
                    CORE Area
                </Popup>
            </Marker>
      </MapContainer>
  
    </div>
  );
};

export default MapComponent;
