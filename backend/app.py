from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)

# Load and preprocess data
data2_path = 'data2.csv'
book2_path = 'Book2.csv'

def load_and_preprocess_data(data2_path, book2_path):
    # Read the CSV files
    data2_df = pd.read_csv(data2_path)
    book2_df = pd.read_csv(book2_path)

    # Merge data2_df with book2_df on the Component column
    merged_df = pd.merge(data2_df, book2_df, left_on='Component', right_on='Parameter')

    # Create a feature to indicate if the value is outside the thresholds
    merged_df['Outside_Threshold'] = ((merged_df['Value'] < merged_df['Low_Threshold']) |
                                       (merged_df['Value'] > merged_df['High_Threshold']))

    # Map Probability_of_Failure to numerical values for evaluation
    failure_mapping = {'High': 2, 'Medium': 1, 'Low': 0}
    merged_df['Failure'] = merged_df['Probability_of_Failure'].map(failure_mapping)

    return merged_df, book2_df

# Load data and train the model when the app starts
merged_df, book2_df = load_and_preprocess_data(data2_path, book2_path)

# Define feature columns and target column
features = ['Value', 'Outside_Threshold']
X = merged_df[features]
y = merged_df['Failure']

# Train the Random Forest classifier
model = RandomForestClassifier(n_estimators=15, random_state=42)
model.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        component = data.get('component')
        value = data.get('value')

        # Basic validation
        if component is None or value is None:
            return jsonify({'error': 'Missing component or value'}), 400

        try:
            value = float(value)
        except ValueError:
            return jsonify({'error': 'Value must be a number'}), 400

        # Find the thresholds for the component
        threshold_info = book2_df[book2_df['Parameter'] == component]
        if threshold_info.empty:
            return jsonify({'error': f'Component {component} not found'}), 400

        low_threshold = threshold_info['Low_Threshold'].values[0]
        high_threshold = threshold_info['High_Threshold'].values[0]

        # Create the feature vector
        outside_threshold = (value < low_threshold) or (value > high_threshold)
        features = np.array([[value, outside_threshold]])

        # Predict the failure
        prediction = model.predict(features)[0]
        return jsonify({'prediction': int(prediction)})  # Convert to native Python type
    
    except Exception as e:
        return jsonify({'error': 'Unexpected error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)
