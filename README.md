# 🌍 Global Weather App

A modern and responsive web application built with HTML, CSS, and JavaScript, powered by the OpenWeatherMap API. This app allows users to get real-time weather information for any city worldwide, with a dynamic background that changes based on the current weather conditions. It also features voice input for searching cities.

## ✨ Features

* **Real-time Weather Data:** Get current temperature, description, humidity, and wind speed.
* **City Search:** Search for weather in any global city.
* **Dynamic Backgrounds:** The app's background visually updates to match weather conditions (e.g., clear, clouds, rain, snow, thunderstorms, fog).
* **Voice Input:** Conveniently search for cities using your voice.
* **Responsive Design:** Optimized for a seamless experience across various devices.
* **API Key Management:** Securely handles the OpenWeatherMap API key using environment variables (`.env`) via Vite.

## 🚀 Technologies Used

* **HTML5:** Structure of the web application.
* **CSS3:** Styling and dynamic background effects.
* **JavaScript (ES6+):** Core logic and API integration.
* **OpenWeatherMap API:** Provides current weather and geolocation data.
* **Vite:** A fast and modern build tool for development and production bundling.
* **Git & GitHub:** Version control and project hosting.

## ⚙️ Setup and Installation

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js & npm:** (Node Package Manager, which comes with Node.js) - [Download & Install Node.js LTS](https://nodejs.org/en/download/)
* **Git:** [Download & Install Git](https://git-scm.com/downloads)
* **An OpenWeatherMap API Key:**
    1.  Go to [OpenWeatherMap](https://openweathermap.org/).
    2.  Sign up for a free account.
    3.  Generate an API key from your account dashboard. (Note: It may take a few minutes for a new API key to become active).

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
    # Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub details.
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd your-weather-app # or whatever your project folder is named
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create a `.env` file:**
    In the root of your project directory, create a file named `.env`.
    Add your OpenWeatherMap API key to this file:
    ```
    VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY_HERE
    ```
    **Important:** Replace `YOUR_OPENWEATHER_API_KEY_HERE` with the actual API key you obtained from OpenWeatherMap. This file is ignored by Git (`.gitignore`) for security reasons.

## 🏃 Running the Application

### Development Mode

To run the app in development mode with hot-reloading:

npm run dev

Vite will start a development server (usually on http://localhost:5173/). Open this URL in your browser to view the application.

Building for Production
To create an optimized production build of the application:

Bash

npm run build
This command will generate a dist/ folder in your project root, containing the production-ready static files.

---
**creating the `README.md` file:**

1.  **Stage the new file:**
    ```bash
    git add README.md
    ```
    or simply:
    ```bash
    git add .
    ```
    (if you want to stage all new/modified files, just make sure you've saved all changes you want to commit).

2.  **Commit the `README.md` file:**
    ```bash
    git commit -m "docs: Add README file"
    ```
    (Using `docs:` as a prefix for commits related to documentation is a common convention).

3.  **Push your changes to GitHub:**
    ```bash
    git push origin main
    ```

Now, when you visit your GitHub repository, the `README.md` will be automatically displayed on the main page, making your project much more understandable for anyone who visits!
