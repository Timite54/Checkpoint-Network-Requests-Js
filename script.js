const API_KEY = "2b35255fa3db5ba343817538a8c21440" 
const API_URL = "https://api.openweathermap.org/data/2.5/weather"

// Éléments du DOM
const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search-btn")
const weatherInfo = document.getElementById("weather-info")
const errorMessage = document.getElementById("error-message")
const initialMessage = document.getElementById("initial-message")
const cityName = document.getElementById("city-name")
const country = document.getElementById("country")
const temperature = document.getElementById("temperature")
const description = document.getElementById("description")
const weatherIcon = document.getElementById("weather-icon")
const feelsLike = document.getElementById("feels-like")
const humidity = document.getElementById("humidity")
const windSpeed = document.getElementById("wind-speed")

// récupérer les données météo
async function getWeatherData(city) {
  try {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Ville non trouvée")
    }
    
    const data = await response.json()
    displayWeatherData(data)
  } catch (error) {
    showError()
    console.error("Erreur:", error)
  }
}

// Fonction pour afficher les données météo
function displayWeatherData(data) {
  initialMessage.classList.add("hidden")
  errorMessage.classList.add("hidden")
  weatherInfo.classList.remove("hidden")

  cityName.textContent = data.name
  country.textContent = data.sys.country
  temperature.textContent = `${Math.round(data.main.temp)}°C`
  description.textContent = data.weather[0].description
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`
  humidity.textContent = `${data.main.humidity}%`
  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h` // Conversion de m/s en km/h

  const iconCode = data.weather[0].icon
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  weatherIcon.alt = data.weather[0].description
}

function showError() {
  initialMessage.classList.add("hidden")
  weatherInfo.classList.add("hidden")
  errorMessage.classList.remove("hidden")
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim()
  if (city) {
    getWeatherData(city)
  }
})

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim()
    if (city) {
      getWeatherData(city)
    }
  }
})
