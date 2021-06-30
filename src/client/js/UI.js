const fetch = require('node-fetch');
const moment = require('moment');

const UI = async () => {
  const description = document.getElementById('weather-description');
  const weatherDate = document.getElementById('weather-date');
  const img = document.getElementById('img');
  const forcastResult = document.getElementById('forcast-result');
  const temp = document.getElementById('temp');
  const dateForcast = document.getElementById('forcast-date');
  const forcastWeather = document.getElementById('forcast-weather');

  const res = await fetch('http://localhost:8000/weather');
  try {
    const response = await res.json();

    // Use local storage to save data
    // Get Current weather data and update DOM Content
    const weatherData = response.weatherData;
    localStorage.setItem('Weather data', weatherData);
    const dateee = response.dateForcas;

    const uriImage = response.webImageUrls;

    description.innerHTML = 'Weather is:' + '' + weatherData.description;
    weatherDate.innerHTML = 'Date is :' + ' ' + weatherData.date;

    // Pull out the image retruned from pixabay response and use it to update the image div DOM

    img.innerHTML = `<img class="image" alt="Pixabay Image" src="${uriImage}"}>`;
    // Forcast weather result
    const forcast = response.weatherForcast;
    forcast.map((data) => {
      dateForcast.innerHTML = 'Date is :' + ' ' + dateee;
      temp.innerHTML = 'Temperature :' + ' ' + data.temp;
      forcastResult.innerHTML = 'Cloud is :' + ' ' + data.clouds;
      forcastWeather.innerHTML =
        'Weather forcast :' + data.weather['description'];
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { UI };
