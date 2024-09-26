import { useMapEvents } from "react-leaflet";


function DynamicBounds() {
    const map = useMapEvents({
      zoomend: () => {
        const zoomLevel = map.getZoom();
  
        // Adjust bounds based on zoom level
        if (zoomLevel >= 15) {
          map.setMaxBounds([
            [0.0, 0.0],
            [-0.14373029, 0.14373045], // Bigger bounds when zoomed in
          ]);
        } else {
          map.setMaxBounds([
            [0.0, 0.0],
            [-0.12673029, 0.14373045], // Default bounds when zoomed out
          ]);
        }
      },
    });
  
    return null;
  }

  export default DynamicBounds