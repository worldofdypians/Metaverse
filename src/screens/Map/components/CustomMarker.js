import { Marker, Popup } from "react-leaflet";

const CustomMarker = ({ item, icon, type, handleMarkerClick }) => (
    <Marker
      key={item.title}
      position={item.location}
      icon={icon}
      eventHandlers={{ click: () => handleMarkerClick(item) }}
    >
      {type === "chain" ? (
        <Popup
          style={{
            background:
              "linear-gradient(126.67deg,#181636 35.2%,#7133e5 191.04%)",
          }}
        >
          <a href={item.link} target="_blank" rel="noreferrer">
            <div className="d-flex flex-column align-items-center gap-2">
              <img
                src={require(`../assets/chainImages/${item.banner}`)}
                width={300}
                alt=""
              />
              <img
                src={require(`../assets/chainImages/${item.logo}`)}
                width={150}
                alt=""
              />
            </div>
          </a>
        </Popup>
      ) : type === "land" ? (
        <Popup
          style={{
            background:
              "linear-gradient(126.67deg,#181636 35.2%,#7133e5 191.04%)",
          }}
        >
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div className="d-flex flex-column align-items-center gap-2">
              <img src={require(`../assets/dummyLand.png`)} width={200} alt="" />
              <h6 className="land-title mb-0">{item.title}</h6>
              <button className="land-btn">View on Marketplace</button>
            </div>
          </a>
        </Popup>
      ) : null}
    </Marker>
  );


  export default CustomMarker;