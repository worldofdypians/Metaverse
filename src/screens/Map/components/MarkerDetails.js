const MarkerDetails = ({ marker, onClose, content }) => {
    if (!marker || !content) return null; // If no marker is selected, don't render anything

    return (
      <div className="marker-details">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="text-white mb-0">{marker.title}</h3>
          <button onClick={onClose}>Close</button>
        </div>
        <img
          src={require(`../assets/chainImages/${marker.banner}`)}
          alt={marker.title}
          className="w-100"
        />
        <a href={marker.link} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
        {/* Additional details about the marker */}
      </div>
    );
  };


  export default MarkerDetails;