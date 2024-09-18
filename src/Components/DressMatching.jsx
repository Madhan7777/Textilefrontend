// App.js
import React, { useState } from 'react';

// Sample dress-color data
const dressColorData = {
  'Summer Dress': ['Red', 'Yellow', 'Light Blue'],
  'Evening Gown': ['Black', 'Navy Blue', 'Emerald Green'],
  'Casual Shirt': ['White', 'Gray', 'Beige'],
};

// DressSelector Component
const DressSelector = ({ selectedDress, onDressChange }) => {
  const dresses = Object.keys(dressColorData);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Select Dress:</h3>
      <select
        value={selectedDress}
        onChange={(e) => onDressChange(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        {dresses.map((dress) => (
          <option key={dress} value={dress}>
            {dress}
          </option>
        ))}
      </select>
    </div>
  );
};

// ColorSuggestions Component
const ColorSuggestions = ({ colors }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Suggested Colors:</h3>
      <div className="flex flex-wrap">
        {colors.map((color) => (
          <div
            key={color}
            className="w-24 h-24 m-2 border border-gray-300"
            style={{ backgroundColor: color.toLowerCase() }}
          >
            <span className="block text-center text-white font-bold mt-2">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [selectedDress, setSelectedDress] = useState('Summer Dress');
  const [suggestedColors, setSuggestedColors] = useState(dressColorData['Summer Dress']);

  const handleDressChange = (dress) => {
    setSelectedDress(dress);
    setSuggestedColors(dressColorData[dress]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dress Matching Algorithm</h1>
      <DressSelector selectedDress={selectedDress} onDressChange={handleDressChange} />
      <ColorSuggestions colors={suggestedColors} />
    </div>
  );
};

export default App;
