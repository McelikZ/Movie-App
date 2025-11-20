# MovieApp

Warning:

### ⚠️ This project is built with Expo.
Make sure you have Expo installed and configured before running the project.

### ⚠️ API Key Setup (Important!)

This project uses the TMDB (The Movie Database) API. You need to obtain your own API key:

1. Visit [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)
2. Create an account and get your API key
3. Create a `.env` file in the root directory
4. Copy the contents from `.env.example` and add your API key:
   ```
   TMDB_API_KEY=your_api_key_here
   ```

The API key is securely stored in the `.env` file and will never be committed to Git.

### ⚠️ Folder Name Notice

If you downloaded this project as a `.zip` file from GitHub, the extracted folder may be named something like:
Movie-App-master

To avoid any issues while working with the project, please rename the folder to:
Movie-App

# About the Project
MovieApp is a mobile application developed with React Native and Expo, designed to provide movie enthusiasts with an easy way to:
- 🎬 Browse trending, popular, and upcoming movies
- 🔍 Search for movies by title
- 📖 View detailed movie information (overview, release date, rating, genres)
- 🎥 Watch trailers via YouTube iframe integration
- ⭐ Save favorite movies locally using AsyncStorage

# Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/McelikZ/Movie-App.git
   cd Movie-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your API key (see API Key Setup section above)

4. Start the development server:
   ```bash
   npm start
   ```

# Dependencies and Setup

This project uses the following main libraries and packages as specified in package.json:

Redux Toolkit & React Redux: For efficient global state management.

- npm install @reduxjs/toolkit react-redux

React Navigation: For handling navigation between screens.
Core navigation and native dependencies:

- npm install @react-navigation/native react-native-screens react-native-safe-area-context

- npm install @react-navigation/native-stack

Axios: For making HTTP requests to the TMDB API:

- npm install axios

Expo Video & YouTube Iframe: Video playback and trailers

- npm install expo-video react-native-youtube-iframe

Async Storage: Local storage for favorites

- npm install @react-native-async-storage/async-storage

Babel Plugin: For environment variables support

- npm install --save-dev babel-plugin-transform-inline-environment-variables

Expo Build:

- npm install expo

Expo packages:

Included with Expo SDK:

- expo

- expo-status-bar

# Technologies and Concepts Used

React Navigation: For handling navigation between screens.

Axios: For making API requests

Redux: Used for global state management.

Props & Components: Data flow and reusability

Expo Video: Video content support

Services: Dedicated files for business logic and API calls.

AsyncStorage: Persistent local storage

Flexbox: For responsive layouts.

Environment Variables: Secure storage of sensitive data



# Project Structure

/src

  /components      # Reusable UI components

  /navigation      # Screen navigation setup

  /redux           # Redux store, reducers, and actions

  /services        # API and business logic services

  /screens         # Application screens

  /themes          # Color and style themes


# Example Design

<img width="3760" height="2820" alt="ExampleDesign" src="https://github.com/user-attachments/assets/9c5405b7-ada3-48da-bf9c-b0a435c1c80c" />


# Design

<img width="1920" height="1080" alt="Design" src="https://github.com/user-attachments/assets/b24a7f3a-02e2-4046-b83c-3443d8737221" />
