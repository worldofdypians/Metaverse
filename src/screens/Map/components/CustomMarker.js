import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ item, icon, type, handleMarkerClick }) => (
    <Marker
      key={item.title}
      position={item.location}
      icon={icon}
      eventHandlers={{ click: () => handleMarkerClick(item, 18, type)}}
    >

    </Marker>
  );


  export default CustomMarker;