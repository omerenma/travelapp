const fetch = require('node-fetch');
const moment = require('moment');

const UI = async () => {
  const description = document.getElementById('weather-description');
  const weatherDate = document.getElementById('weather-date');
  const img = document.getElementById('img');
  const forcastResult = document.getElementById('forcast-result');
  const temp = document.getElementById('temp');
  const date = document.getElementById('forcast-date');
  const forcastWeather = document.getElementById('forcast-weather');
  const icon = document.getElementById('icon');

  const res = await fetch('http://localhost:8000/weather');
  try {
    // Response Data
    const response = await res.json();
    // Save data to Local Storage
    localStorage.setItem('response', response);
    // Get Current weather data and update DOM Content

    if (response.length < 0) {
      console.log('Loading');
    }
    const weatherData = response.weatherData;
    console.log(weatherData, 'daaata of weather');

    description.innerHTML = 'Weather is:' + '' + weatherData.description;
    weatherDate.innerHTML = 'Date is :' + ' ' + weatherData.date;

    // Pull out the image retruned from pixabay response and use it to update the image div DOM
    const imageURLFormat = response.pixaBayData;

    img.innerHTML = `<img class="image" alt="Pixabay Image" src="${imageURLFormat}"}>`;

    console.log(response, 'UI response');

    // Forcast weather result
    const forcast = response.weatherForcast[0];
    forcast.map((data) => {
      temp.innerHTML = 'Temperature :' + ' ' + data.temp;
      date.innerHTML = 'Date is :' + ' ' + data.datetime;
      forcastResult.innerHTML = 'Cloud is :' + ' ' + data.clouds;
      forcastWeather.innerHTML =
        'Weather forcast :' + data.weather['description'];
    });
  } catch (error) {}
};
module.exports = { UI };
