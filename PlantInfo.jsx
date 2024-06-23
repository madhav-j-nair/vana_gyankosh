import PropTypes from 'prop-types';
import "../src/index.css";

const PlantInfo = ({ plantInfo }) => {
  if (!plantInfo) {
    return <p>Enter a plant name and choose information type.</p>;
  }

  // Split the plant info by whitespace, keeping non-empty elements.
  const processedInfo = plantInfo
    .split("**") // Split by one or more whitespace characters
    .filter((word) => word.trim() !== ""); // Remove empty strings after trimming

  // Check if any processed info remains after filtering
  if (!processedInfo.length) {
    return <p>No valid information found.</p>;
  }

  return (
    <div>
      <ul className='output-box'>
        {processedInfo.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

PlantInfo.propTypes = {
  plantInfo: PropTypes.string,
};

export default PlantInfo;
