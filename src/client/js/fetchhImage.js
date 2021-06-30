const { default: fetch } = require('node-fetch');
const fetchImage = async (url) => {
  console.log(url, 'url');
  const res = await fetch(url);
  try {
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { fetchImage };
