const got = require('got');

const Secret = require('../../shared/cloud-provider/index');
let apiKey;
exports.setupCredentials = async function setupCredentials() {
  apiKey = await Secret.secretManager.accessSecret('the-movie-db-api-key');
}

// Get the 2020 released movies sorted in descending order by popularity.
exports.getTwentyTwentyMovies = async function () {
  try {
    const hardCodedParameters = '?api_key=' + apiKey
      + '&language=en-US&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&sort_by=popularity.desc&primary_release_year=2020';
    const searchURI = 'https://api.themoviedb.org/3/discover/movie' + hardCodedParameters;
    const response = await got(searchURI);
    return response.body;

  } catch (error) {
    console.error(error.response);
    res.status(500)
  }
};