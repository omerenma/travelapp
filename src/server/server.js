const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const env = require('dotenv').config();

// const { currentDate } = require('./dateFunc');
const {
  geonamesApi,
  weatherBitApi,
  weatherForcastApi,
  pixaBayApi,
  fetchImage,
} = require('./APICALLS/apiCall');

const geonameData = [];
const geonameResult = {};
const weatherData = {};
let weatherForcast;
const pixaBayData = [];
const urlImage = [];
let dateForcas;
let country_image;

let webImageUrls;

const geonamesUri =
  'http://api.geonames.org/searchJSON?username=omerenma&country=ng';
const weatherBitApiUrlForcast = 'http://api.weatherbit.io/v2.0/forecast/daily';
const weatherBitApiUrl = 'http://api.weatherbit.io/v2.0/current?';
const weatherBitApiKey = 'a610dd76d181454f97535a2b1a7ea90b';
const pixabayApiUri = 'https://pixabay.com/api/?';
const pixabayKey = '22144354-a6dce848358aebe805c696aa2';

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
  res.send({
    weatherData,
    weatherForcast,
    pixaBayData,
    webImageUrls,
    dateForcas,
    country_image,
  });
});

// Make a post request to geoname
app.post('/geoname', async (req, res) => {
  // const { country, city, date } = req.body;
  const country = req.body.country;
  const city = req.body.city;
  const date = req.body.date;
  dateForcas = date;
  await geonamesApi(
    `http://api.geonames.org/searchJSON?username=omerenma
    &country=${country}
    &name=${city}&maxRows=1`
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
    `https://api.weatherbit.io/v2.0/current?lat=${geonameResult.lt}&lon=${geonameResult.lg}&key=a610dd76d181454f97535a2b1a7ea90b&city=${city}&units=M`
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
    `http://api.weatherbit.io/v2.0/forecast/daily?lat=${geonameResult.lt}&lon=${geonameResult.lg}&key=a610dd76d181454f97535a2b1a7ea90b&city=${city}&units=M&start_data=${date}`
  )
    .then((data) => {
      weatherForcast = data.data;
    })
    .catch((error) => console.log(error));

  //Call Pixabay API
  await pixaBayApi(
    `${pixabayApiUri}key=${pixabayKey}&q=weather&image_type=photo`
  )
    .then((data) => {
      pixaBayData.push(data.hits[0].webformatURL);
    })
    .then(async () => {
      const resImageCity = await fetch(
        `${pixabayApiUri}key=${pixabayKey}&q=${city}`
      );
      const result = await resImageCity.json();
      if (result.total != 0) {
        const { webformatURL } = result.hits[0];
        webImageUrls = webformatURL;
      } else {
        const getCountry = await fetch(
          `${pixabayApiUri}?key=${pixabayKey}&q=${country}`
        );
        const countryResp = await getCountry.json();
        const { webformatURL } = countryResp.hits[0];
        country_image = webformatURL;
        console.log(country_image, 'country');
      }
    })

    .catch((error) => console.log(error));

  res.send({
    weatherData,
    weatherForcast,
    pixaBayData,
    urlImage,
    webImageUrls,
    date,
    dateForcas,
    country_image,
  });
});

// Lister to port
app.listen(port, () => {
  console.log(`Server running port ${port}`);
});
