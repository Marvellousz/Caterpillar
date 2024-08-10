"use client";  // Ensure this is at the top

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const parameters = [
  "Engine Oil Pressure",
  "Engine Speed",
  "Engine Temperature",
  "Brake Control",
  "Transmission Pressure",
  "Pedal Sensor",
  "Water Fuel",
  "Fuel Level",
  "Fuel Pressure",
  "Fuel Temperature",
  "System Voltage",
  "Exhaust Gas Temperature",
  "Hydraulic Pump Rate",
  "Air Filter Pressure Drop"
];

export default function PredictionForm() {
  const [selectedParameter, setSelectedParameter] = useState('');
  const [value, setValue] = useState('');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);  // Reset any previous errors

    console.log("Sending data:", { selectedParameter, value });

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ component: selectedParameter, value: Number(value) }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error during prediction:', error);
      setError('Failed to get prediction. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="parameter" className="block text-lg font-medium text-gray-700">
          Parameter
        </label>
        <select
          id="parameter"
          value={selectedParameter}
          onChange={(e) => setSelectedParameter(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 bg-white text-black text-lg p-2"
        >
          <option value="" disabled>
            Select any component
          </option>
          {parameters.map((param) => (
            <option key={param} value={param}>
              {param}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="value" className="block text-lg font-medium text-gray-700">
          Value
        </label>
        <Input
          type="number"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="text-lg p-2 bg-white"
        />
      </div>
      <Button type="submit" className="text-lg p-2">Predict</Button>

      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {prediction !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-medium">Prediction Result:</h3>
          <p className="text-xl font-bold">{prediction}</p>
        </div>
      )}
    </form>
  );
}
