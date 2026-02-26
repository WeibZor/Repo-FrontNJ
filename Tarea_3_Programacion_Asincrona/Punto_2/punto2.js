const apiKey = 'db0d19b2bd3f9ac815853235419579af';

const button = document.getElementById('searchBtn');
const result = document.getElementById('result');

button.addEventListener('click', getWeather);

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();

  if (city === '') {
    result.innerHTML = '<p>Escribe una ciudad</p>';
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      result.innerHTML = '<p>Ciudad no encontrada</p>';
      return;
    }

    const data = await response.json();
    showWeather(data);

  } catch (error) {
    result.innerHTML = '<p>Error al obtener el clima</p>';
  }
}

function showWeather(data) {
  result.innerHTML = `
    <h3>${data.name}</h3>
    <p>🌡️ ${Math.round(data.main.temp)} °C</p>
    <p>☁️ ${data.weather[0].description}</p>
  `;
}