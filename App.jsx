import { useState } from 'react';
import Axios from 'axios';
import PlantInfo from './PlantInfo';
import "../src/App.css"

const axiosInstance = Axios.create({
  baseURL: 'http://127.0.0.1:5000',  // Set your Flask server URL here
});

const App = () => {
  const [plantName, setPlantName] = useState('');
  const [choice, setChoice] = useState('');
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);

  const handlePlantNameChange = (event) => {
    setPlantName(event.target.value);
  };

  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
  };

  const handleSubmit = async () => {
    setError(null); // Clear previous errors
    if (!plantName) {
      setError('Please enter a plant name.');
      return;
    }
    if (!choice) {
      setError('Please select information type.');
      return;
    }

    try {
      const response = await axiosInstance.get('/', {
        params: {
          name: plantName,
          choice: choice
        }
      });
      setPlantInfo(response.data.plant_info);
    } catch (error) {
      console.error(error);
      setError('Error fetching plant information.');
    }
  };
  return (
    <div className="App">
      <h1 className='title'>VANA 📖 GYANKOSH</h1>
      <input type="text" value={plantName} onChange={handlePlantNameChange} placeholder="Enter plant name" className='search-bar'/>
      <select value={choice} onChange={handleChoiceChange} className='Choice' >
        <option value="" >Select information type</option>
        <option value="DESCRIPTION">Description</option>
        <option value="BIOLOGICAL_DATA">Biological Data</option>
        <option value="MARKET_DETAILS">Market Details</option>
        <option value="HOW_TO_GROW">How to Grow</option>
      </select>
      <button onClick={handleSubmit} className='dark-green-button'>Get Plant Info</button>
      {error && <p className="error">{error}</p>}
      {plantInfo && <PlantInfo plantInfo={plantInfo} />}
    </div>
  );
};

export default App;
