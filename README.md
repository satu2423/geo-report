# GeoReport

GeoReport is a web-based map application that allows users to report incidents with descriptions and media (photos/videos). The application is built with Node.js, Express, Leaflet.js, and SQLite.

## Features

*   Display an interactive map.
*   Get user's current location.
*   Report incidents with a description and media upload.
*   Incidents are stored in a local SQLite database file (`database.db`).
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
    This command will also automatically create and initialize the `database.db` file if it doesn't exist.

5.  **Open your browser:**
    Navigate to `http://localhost:3000` to use the application.

## Deployment

When deploying to a platform like Render, use the following settings:

*   **Root Directory:** (leave blank or set to the project root)
*   **Start Command:** `npm start`
*   **Persistent Storage:** You will need to configure a persistent disk on your hosting platform to store the `database.db` and `uploads` directory. On Render, you can do this by adding a "Disk" in your service settings with the mount path set to the project root.

That's it! Since this version of the application uses a self-contained database, there are no external services or environment variables to configure.
