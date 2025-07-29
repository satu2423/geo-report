# GeoReport

GeoReport is a web-based map application that allows users to report incidents with descriptions and media (photos/videos). The application is built with Node.js, Express, and Leaflet.js.

## Features

*   Display an interactive map.
*   Get user's current location.
*   Report incidents with a description and media upload.
*   Incidents are stored in a local `incidents.json` file.
*   Reported incidents are displayed as markers on the map.
*   Separate, animated page for incident reporting.

## Prerequisites

*   Node.js and npm

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create the `uploads` directory:**
    In the root of the project, create an `uploads` directory. This is where media files will be stored.
    ```bash
    mkdir uploads
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```

5.  **Open your browser:**
    Navigate to `http://localhost:3000` to use the application.

## Deployment

When deploying to a platform like Render, use the following settings:

*   **Root Directory:** (leave blank or set to the project root)
*   **Start Command:** `node src/server.js`

That's it! Since this version of the application does not have a database, there are no environment variables to set.
