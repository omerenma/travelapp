const fetch = require('node-fetch');
const geonamesUri =
  'http://api.geonames.org/searchJSON?username=omerenma&country=ng';
const weatherBitApiKey = 'a610dd76d181454f97535a2b1a7ea90b';

// Geonames API Function
const geonamesApi = async (url) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      //   body: JSON.stringify(data),
    });
    const result = await response;
    return result.json();
  } catch (error) {
    console.log(error.message);
  }
};

// Weatherbit API FUnction

const weatherBitApi = async (url) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
    });
    const res = await response;
    const respons = await res.json();
    return respons;
  } catch (error) {
    console.log(error.message);
  }
};

// Weather Forcast

const weatherForcastApi = async (url) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
    });
    const res = await response;
    const respons = await res.json();
    return respons;
  } catch (error) {
    console.log(error.message);
  }
};

const pixaBayApi = async (url) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
    });
    const res = await response;
    const respons = await res.json();
    return respons;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  geonamesApi,
  weatherBitApi,
  weatherForcastApi,
  pixaBayApi,
};
