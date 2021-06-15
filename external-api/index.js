
const TheMovieDB = require('./the-movie-db/the-movie-db');
const Twitter = require('./twitter/twitter');

exports.setupExternalAPIs = async function setupExternalAPIs() {
    await Twitter.setupCredentials();
    await TheMovieDB.setupCredentials();
}