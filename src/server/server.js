const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const env = require('dotenv').config();

const {
  geonamesApi,
  weatherBitApi,
  weatherForcastApi,
  pixaBayApi,
} = require('./APICALLS/apiCall');

const geonameData = [];
const geonameResult = {};
const weatherData = {};
const weatherForcast = [];
const pixaBayData = [];

const geonamesUri =
  'http://api.geonames.org/searchJSON?username=omerenma&country=ng';
const weatherBitApiUrlForcast = 'http://api.weatherbit.io/v2.0/forecast/daily';
const weatherBitApiUrl = 'http://api.weatherbit.io/v2.0/current?';
const weatherBitApiKey = 'a610dd76d181454f97535a2b1a7ea90b';
const pixabayApiUri = 'https://pixabay.com/api/?';
const pixabayKey = '22144354-a6dce848358aebe805c696aa2';

const params = {
  username: 'omerenma',
  country: 'ng',
  name: 'abuja',
};

// Create an instance of express
const app = express();
// Port to listen
const port = 8000;

// Setup cors
app.use(cors());
app.use(express.json());
// Connect frontend to backend
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

//Get weather Data
app.get('/weather', async (req, res) => {
  res.send({ weatherData, weatherForcast, pixaBayData });
});
// Make a post request to geoname
app.post('/geoname', async (req, res) => {
  const { country, city, date } = req.body;

  await geonamesApi(
    `http://api.geonames.org/searchJSON?username=omerenma
    &country=${country}
    &name=${city}`
  )
    .then((data) => {
      geonameData.push(data);
      geonameData.map((data) => {
        const lng = data.geonames[0]['lng'];
        const lat = data.geonames[0]['lat'];
        const countryName = data.geonames[0]['countryName'];
        geonameResult.lg = lng;
        geonameResult.lt = lat;
        geonameResult.countryName = countryName;
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  // Call Weatherbit api
  await weatherBitApi(
    `https://api.weatherbit.io/v2.0/current?lat=${geonameResult.lt}&lon=${geonameResult.lg}&key=a610dd76d181454f97535a2b1a7ea90b&city=${city}&include=minutely`
  )
    .then((data) => {
      data.data.map((dt) => {
        weatherData.icon = dt.weather.icon;
        weatherData.code = dt.weather.code;
        weatherData.description = dt.weather.description;
        weatherData.date = dt.datetime;
      });
    })
    .catch((error) => console.log(error));

  await weatherForcastApi(
    `http://api.weatherbit.io/v2.0/forecast/daily?lat=${geonameResult.lt}&lon=${geonameResult.lg}&key=a610dd76d181454f97535a2b1a7ea90b&city=${city}&include=minutely`
  ).then((data) => {
    weatherForcast.push(data.data);
  });

  //Call Pixabay API
  await pixaBayApi(
    `${pixabayApiUri}key=${pixabayKey}&q=weather&image_type=photo`
  )
    .then((data) => {
      pixaBayData.push(data.hits[0].webformatURL);
    })

    .catch((error) => console.log(error));

  res.status(200).send({ weatherData, weatherForcast, pixaBayData });
});
// Lister to port
app.listen(port, () => {
  console.log(`Server running port ${port}`);
});
