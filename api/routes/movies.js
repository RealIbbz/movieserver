'use strict';
const Movie = require('../controllers/movies-controller');
const { body } = require('express-validator');
const Authentication = require('../controllers/authentication-controller')

module.exports = function (app) {


  app.route('/movies/favourites')
    .get([Authentication.validateJWT, Movie.getFavourites])
    .post([Authentication.validateJWT, Movie.addFavourite])
    .delete([Authentication.validateJWT, Movie.removeFavourite]);

  app.route('/movies')
    .get([Authentication.validateJWT, Movie.getMovies]);

  app.route('/movies/tweets')
    .get([Authentication.validateJWT,
    body('searchTerm').isLength({ min: 1, max: 400 }).withMessage('Search Term must be between 1 and 400 characters'),
    Movie.getMovieTweets]);



};
