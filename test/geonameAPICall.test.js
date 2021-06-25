const jestDom = require('@testing-library/jest-dom');
const { UI } = require('../src/client/js/UI');

test('Expectd UI function to be defined', () => {
  expect(UI).toBeDefined();
});
