# Geoportal Project

## Overview
<!-- This section provides a brief description of the project. -->
This project involves the development of a Geoportal for the Grand Casablanca region using the ArcGIS Maps SDK for JavaScript. The Geoportal will provide interactive maps, various data layers, symbology options, query and filter capabilities, data editing tools, and geoprocessing functionalities.

## Features
<!-- This section outlines the main features of the Geoportal. -->

### I. Map
<!-- Subsection for map features. -->

1. **Geoportal Map**:
    - **Region**: Grand Casablanca
    - **Layers**:
        - Administrative boundaries of Casablanca communes
        - Road network
        - Population distribution
        - Hotels
        - Large shopping centers
        - Higher education institutions
        - Basemaps (satellite images, topographic maps, street maps, etc.)

2. **Map Tools**:
    - Standard navigation tools (zoom, pan, measure)
    - Basemap switcher widget
    - Legend widget
    - Search widget for place search

### II. Symbology
<!-- Subsection for symbology options. -->

3. **Layer Display Options**:
    - **Administrative Boundaries**:
        - By prefecture
        - By commune/district
        - By area (five classes)
    - **Population**:
        - Population in 2004 (five classes)
        - Population in 1994 (five classes)
        - Population change 1994/2004 (with charts)

### III. Queries and Filters
<!-- Subsection for query and filter functionalities. -->

5. **Search Capabilities**:
    - Hotels by category (1*, 2*, 3*, etc.)
    - Large shopping centers by type (Marjane, Acima, etc.)

6. **Contextual Windows**:
    - Configure and display pop-up windows for search results on the map

### IV. Data Editing
<!-- Subsection for data editing tools. -->

7. **Complaint Management**:
    - Display a map with the Complaints layer (published under ArcSDE and ArcGIS Server)
    - Editing tool for citizens to add complaints:
        - Tag the location of the complaint on the map
        - Input details: subject, message, actions already taken, contact email
    - Display a list of all complaints

## Installation
<!-- This section provides instructions for setting up the project. -->

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/geoportal-project.git
    ```
2. Navigate to the project directory:
    ```bash
    cd geoportal-project
    ```
3. Install the necessary dependencies:
    ```bash
    ./mvnw install
    ```
