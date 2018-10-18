const fetch = require('node-fetch');
function getDogsByBreed({ breed, limit = 5 } = {}) {
  if (!breed) {
    throw new Error('Unable to list dogs without a breed');
  }
  const url = `https://dog.ceo/api/breed/${breed}/images`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data.message.map(val => ({ breed, imageUrl: val })))
    .then(arr => arr.slice(0, limit));
}

function getBreed({ breed } = {}) {
  return {
    name: breed
  };
}

function getBreeds({ limit = 3 } = {}) {
  const url = `https://dog.ceo/api/breeds/list/all`;
  return fetch(url)
    .then(response => response.json())
    .then(data => Object.keys(data.message))
    .then(names => names.map(name => ({ name })))
    .then(arr => arr.slice(0, limit));
}

module.exports = {
  getBreed,
  getBreeds,
  getDogsByBreed
};
