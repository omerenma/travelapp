const { response } = require('express');
const {
  weatherBitApi,
  weatherForcastApi,
  geonamesApi,
  pixaBayApi,
} = require('../src/server/APICALLS/apiCall');

test('Testing to check defined', () => {
  expect(weatherForcastApi).toBeDefined();
});

test('Testing to check defined', () => {
  expect(weatherBitApi).toBeDefined();
});
test('Testing to check defined', () => {
  expect(geonamesApi).toBeDefined();
});
test('Testing to check defined', () => {
  expect(pixaBayApi).toBeDefined();
});
