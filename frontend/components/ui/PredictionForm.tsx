"use client";  // Ensure this is at the top

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PredictionForm() {
  const [component, setComponent] = useState('')
  const [value, setValue] = useState('')
  const [prediction, setPrediction] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);  // Reset any previous errors

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ component, value: Number(value) }),
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
        <label htmlFor="component" className="block text-sm font-medium text-gray-700">
          Component
        </label>
        <Input
          type="text"
          id="component"
          value={component}
          onChange={(e) => setComponent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700">
          Value
        </label>
        <Input
          type="number"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Predict</Button>

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
  )
}
