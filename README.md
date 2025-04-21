# Nautilus Tracker - Frontend

This application, inspired by Next Leaflet Starter, provides an intuitive interface for visualizing geographic tracks fetched from a server. Users can interact with a dynamic map that displays various track segments overlaid on geographical data.

### Features:

- **Track Visualization**: The app fetches track data from the server and displays it seamlessly on an interactive map, allowing users to explore recorded paths and journeys in a geographical context.

- **Flexible Time Range Selection**: Users can filter and select specific tracks by either year or a customized time range, making it easy to visualize tracks from particular periods or events.

- **Track Segments**: Each track is visualized as a segment, enabling users to focus on specific sections of the journey and easily compare different time periods or events.

- **User-friendly Interface**: The interface is simple yet powerful, offering smooth navigation and customization for a personalized experience. Whether tracking historical routes or analyzing patterns, the app enhances user interaction with geographical data.

This tool is ideal for applications involving geospatial analysis, transportation tracking, or any system that requires the visualization of time-based geographic data in an easy-to-use format.

### Installation:

Follow these steps to set up and run the Nautilus Tracker app on your local machine.
```
- npm install
- npm run dev
```
#### Prerequisites:
 - **Node.js version 22.9.0**: Make sure you have Node.js installed.
 
#### Set Up Environment Variables

In order to run the application locally, you will need to create a .env file in the root of the project directory. This file will store essential API variables, such as:
- API_URL
- API_URL_YEARS
- API_KEY.

Create a .env file and add the variables

**.tool-versions** is required if you are using ASDF https://asdf-vm.com/
