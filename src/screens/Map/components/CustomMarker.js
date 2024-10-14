import { Marker, Popup, useMap } from "react-leaflet";

const CustomMarker = ({ item, icon, type, handleMarkerClick }) => {
  useMap().createPane("pane");
  useMap().getPane("pane").style.zIndex = 650;
  return (
    <Marker
      key={item.title}
      position={item.location}
      icon={icon}
      pane="pane"
      eventHandlers={{ click: () => handleMarkerClick(item, 18, type) }}
    ></Marker>
  );
};
export default CustomMarker;
    