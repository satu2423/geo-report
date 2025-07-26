# GeoReport

GeoReport is a web-based map application that allows users to report incidents with descriptions and media (photos/videos). The application is built with Node.js, Express, Leaflet.js, and MongoDB.

## Features

*   Display an interactive map.
*   Get user's current location.
*   Report incidents with a description and media upload.
*   Incidents are stored in a MongoDB database.
*   Incidents are automatically deleted after 24 hours.
*   Reported incidents are displayed as markers on the map.
*   Separate, animated page for incident reporting.

## Prerequisites

*   Node.js and npm
*   MongoDB

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your MongoDB connection:**
    Make sure you have a MongoDB instance running. The application connects to `mongodb://localhost/georeport` by default. You can change this connection string in `server.js` if needed.

4.  **Create the `uploads` directory:**
    ```bash
    mkdir uploads
    ```

5.  **Start the server:**
    ```bash
    npm start
    ```

6.  **Open your browser:**
    Navigate to `http://localhost:3000` to use the application.
