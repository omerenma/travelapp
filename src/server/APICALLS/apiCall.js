const fetch = require('node-fetch');

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

// Pixabay random image
const fetchImage = async (url) => {
  const res = await fetch(url);
  try {
    const result = await res.json();
    console.log(result, 'result');
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  geonamesApi,
  weatherBitApi,
  weatherForcastApi,
  pixaBayApi,
  fetchImage,
};
