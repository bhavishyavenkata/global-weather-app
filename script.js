// Main Weather Fetch Function
async function fetchWeather() {
  const searchInput = document.getElementById("search").value.trim();
  const weatherDataSection = document.getElementById("weather-data");
  weatherDataSection.style.display = "block";

  // Access the environment variable using Vite's import.meta.env
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // --- Start: Added API Key validation and error handling ---
  if (!apiKey) {
    weatherDataSection.innerHTML = `
      <div style="color:red;">
        <h2>Configuration Error!</h2>
        <p>API Key is missing. Please check your <code>.env</code> file and Vite setup.</p>
        <p>Ensure your <code>.env</code> file in the project root has <code>VITE_OPENWEATHER_API_KEY=YOUR_API_KEY</code>.</p>
      </div>
    `;
    return;
  }
  // --- End: Added API Key validation and error handling ---


  if (searchInput === "") {
    weatherDataSection.innerHTML = `
      <div>
        <h2>Empty Input!</h2>
        <p>Please enter a valid <u>city name</u> (e.g., London, Tokyo, New York).</p>
      </div>
    `;
    return;
  }

  try {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchInput)}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoURL);
    if (!geoResponse.ok) {
      // Improved error handling for geoResponse
      const errorText = await geoResponse.text(); // Get raw error message
      let errorMessage = `Failed to fetch location data: ${geoResponse.status} - ${geoResponse.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) errorMessage = `Failed to fetch location data: ${errorJson.message}`;
      } catch (e) { /* not JSON */ }
      throw new Error(errorMessage);
    }

    const geoData = await geoResponse.json();
    if (geoData.length === 0) {
      weatherDataSection.innerHTML = `
        <div>
          <h2>City Not Found</h2>
          <p>No results for "<strong>${searchInput}</strong>". Try a valid global city name.</p>
        </div>
      `;
      return;
    }

    const { lat, lon, name, country, state } = geoData[0];

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const weatherResponse = await fetch(weatherURL);
    if (!weatherResponse.ok) {
      // Improved error handling for weatherResponse
      const errorText = await weatherResponse.text(); // Get raw error message
      let errorMessage = `Failed to fetch weather data: ${weatherResponse.status} - ${weatherResponse.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) errorMessage = `Failed to fetch weather data: ${errorJson.message}`;
      } catch (e) { /* not JSON */ }
      throw new Error(errorMessage);
    }

    const data = await weatherResponse.json();

    // Display weather info
    weatherDataSection.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" width="100" />
      <div>
        <h2>${name}${state ? ', ' + state : ''}, ${country}</h2>
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
        <p><strong>Description:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      </div>
    `;

    // Reset input field
    document.getElementById("search").value = "";

    // 🔄 Update background based on weather type
    updateBackground(data.weather[0].main);

  } catch (error) {
    weatherDataSection.innerHTML = `
      <div style="color:red;">
        <h2>Error:</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// 🔁 Function to change background based on weather condition
function updateBackground(weatherType) {
  const body = document.body;
  body.className = ''; // Clear previous class

  switch (weatherType.toLowerCase()) {
    case "clear":
      body.classList.add("clear");
      break;
    case "clouds":
      body.classList.add("clouds");
      break;
    case "rain":
    case "drizzle":
      body.classList.add("rain");
      break;
    case "thunderstorm":
    case "storm": // Added 'storm' if it comes from API
      body.classList.add("thunderstorm");
      break;
    case "snow":
      body.classList.add("snow");
      break;
    case "mist":
    case "fog":
    case "haze":
    case "smoke":
    case "dust":
    case "sand":
    case "ash":
    case "squall":
      body.classList.add("fog"); // Grouping these for a 'foggy/atmospheric' background
      break;
    case "tornado":
      body.classList.add("tornado"); // Specific for tornado if you have a distinct style
      break;
    default:
      body.classList.add("default");
      break;
  }
}
// 🎤 Voice Input Feature
document.getElementById("voice-btn").addEventListener("click", () => {
  // Check for browser compatibility
  if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser does not support Speech Recognition.");
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  document.getElementById("voice-btn").textContent = "🔴 Listening..."; // Indicate listening

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("search").value = transcript;
    document.getElementById("voice-btn").textContent = "🎤"; // Reset button text
    fetchWeather(); // Automatically search
  };

  recognition.onerror = (event) => {
    document.getElementById("voice-btn").textContent = "🎤"; // Reset button text
    alert("Speech recognition error: " + event.error + ". Please ensure your microphone is connected and permission is granted.");
  };

  recognition.onend = () => {
    document.getElementById("voice-btn").textContent = "🎤"; // Reset button text when recognition stops
  };
});

// --- NEW CODE ADDED HERE FOR THE SEARCH BUTTON LISTENER ---
// Attach event listener for the search button
document.getElementById("submit").addEventListener("click", fetchWeather);