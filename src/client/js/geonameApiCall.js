const urls = 'http://localhost:8000/geoname';
const { UI } = require('./UI');
export const geonameAPiCall = async (url) => {
  const city = document.getElementById('city').value;
  const date = document.getElementById('date').value;
  const country = document.getElementById('country').value;
  const pixabay = document.querySelector('#pixabay');

  const data = { country, city, date };
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const response = await request.json();
    // response.map((res) => {
    //   pixabay.innerHTML = res.previewURL;
    // });
    return response;
  } catch (error) {
    return error.message;
  }
};

const submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
  e.preventDefault();

  geonameAPiCall(urls).then(() => {
    UI();
  });
});
