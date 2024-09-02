# Proactive Equipment Failure Detection System

Welcome to the Proactive Equipment Failure Detection System developed during the Caterpillar Hackathon. This project aims to predict potential equipment failures using telematics data, allowing for timely maintenance and minimizing downtime.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

In the world of heavy machinery, equipment downtime can result in significant financial losses. This project focuses on developing a predictive maintenance system using AI models to anticipate equipment failures. The system leverages telematics data to provide actionable insights, allowing for proactive maintenance and reducing the risk of unexpected breakdowns.

## Features

- **AI-Driven Predictions:** Custom AI models trained on telematics data to predict potential failures.
- **Real-Time Monitoring:** Continuous monitoring of equipment health, with immediate alerts for potential issues.
- **User-Friendly Interface:** A sleek and intuitive frontend for easy interaction with the system.
- **Data Visualization:** A PowerBI dashboard for visualizing telematics data and predictive analysis results.
- **Integrated Analytics:** Flask backend for AI model processing and Next.js frontend for real-time prediction display.

## Architecture

The system is built using a combination of Flask for the backend, Next.js for the frontend, and PowerBI for data visualization. The AI model is trained on historical telematics data, and the predictions are integrated into the frontend for real-time display.

```plaintext
+--------------------+      +------------------+      +--------------------+
|                    |      |                  |      |                    |
|   Telematics Data  | ---> |     AI Model     | ---> |  Predictive Alerts |
|                    |      |   (Flask API)    |      |   (Next.js UI)     |
+--------------------+      +------------------+      +--------------------+
                                 |
                                 v
                          +------------------+
                          |  PowerBI Dashboard|
                          +------------------+
```

## Installation

### Prerequisites

- Node.js
- Python 3.x
- Flask
- PowerBI
- Vercel (for deployment)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/caterpillar-hackathon
   cd caterpillar-hackathon
   ```

2. **Backend Setup:**

   - Navigate to the `backend` directory and install the dependencies:

     ```bash
     cd backend
     pip install -r requirements.txt
     ```

   - Start the Flask server:

     ```bash
     python app.py
     ```

3. **Frontend Setup:**

   - Navigate to the `frontend` directory and install the dependencies:

     ```bash
     cd frontend
     npm install
     ```

   - Start the Next.js development server:

     ```bash
     npm run dev
     ```

4. **PowerBI Setup:**

   - Import the provided PowerBI template and configure it with the relevant data source.

## Usage

- **Frontend:** Access the application by navigating to `http://localhost:3000`.
- **Backend:** The Flask API will be running on `http://localhost:5000`, providing real-time predictions.
- **PowerBI:** View the dashboard through the PowerBI service or desktop application.

## Technologies Used

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Flask, Python
- **Data Visualization:** PowerBI
- **Deployment:** Vercel

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project’s coding standards.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

We would like to thank Caterpillar for organizing the hackathon and providing this incredible opportunity. Special thanks to our team members and all the participants for their collaboration and innovation.


