const MarkerDetails = ({ marker, onClose, type }) => {
  if (!marker || !type) return null; // If no marker is selected, don't render anything

  return (
    <>
      {type === "chain" ? (
        <div className="marker-details">
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="text-white mb-0">{marker.title}</h3>
                <a
                  href="javascript:void(0)"
                  class="closebtn-3"
                  onClick={onClose}
                >
                  ×
                </a>
              </div>
              <img
                src={require(`../assets/chainImages/${marker.banner}`)}
                alt={marker.title}
                className="w-100"
              />
              <div className="d-flex flex-column gap-4 ">
                <p className="custom-marker-content  mb-0">
                  The {marker.title} is located inside the Dypians city. Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit. Omnis,
                  adipisci.
                </p>
                <p className="custom-marker-content mb-0">Associated Events:</p>
              </div>
              <ul className="mt-2">
                {marker.events.map((event, index) => (
                  <li className="custom-marker-content">{event}</li>
                ))}
              </ul>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <button className="land-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : type === "quest" ? (
        <div className="marker-details">
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="text-white mb-0" style={{ fontSize: "18px" }}>
                  {marker.title}
                </h3>
                <a
                  href="javascript:void(0)"
                  class="closebtn-3"
                  onClick={onClose}
                >
                  ×
                </a>
              </div>
              <img src={marker.banner} alt={marker.title} className="w-100" />
              <div className="d-flex flex-column gap-4 ">
                <p className="custom-marker-content mb-0">
                  Quest Starts From: {marker.questGiver}
                </p>
                <div className="d-flex flex-column gap-2">
                  <p className="custom-marker-content mb-0">Description:</p>
                  <p className="custom-marker-content mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur nostrum
                  </p>
                </div>
              </div>
              <p className="custom-marker-content mb-0">Requirements:</p>
              <ul>
                {marker.conditions.map((condition, index) => (
                  <li className="custom-marker-content" key={index}>
                    {condition}
                  </li>
                ))}
              </ul>
              <p className="custom-marker-content mb-0">Rewards:</p>
              <ul>
                {marker.rewards.map((reward, index) => (
                  <li className="custom-marker-content" key={index}>
                    {reward}
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex w-100 justify-content-center">
              <button className="land-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MarkerDetails;
