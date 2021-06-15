'use strict';
const TheMovieDB = require('../../external-api/the-movie-db/the-movie-db');
const Twitter = require('../../external-api/twitter/twitter');
const UserModel = require('../models/users-models')
const MovieModel = require('../models/movies-models')

exports.addFavourite = async function (req, res) {
  try {
    const result = await MovieModel.addFavourite(req.userId.id, req.body.movie);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(false);
  }
}

exports.removeFavourite = async function (req, res) {
  try {
    const result = await MovieModel.removeFavourite(req.userId.id, req.query.movieId);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(false);
  }
};

exports.getFavourites = async function (req, res) {
  try {
    const result = await MovieModel.getFavourites(req.userId.id);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(false);
  }
};

exports.getMovies = async function (req, res) {
  try {
    const result = await TheMovieDB.getTwentyTwentyMovies();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};

exports.getMovieTweets = async function (req, res) {

  try {
    const result = await Twitter.getTweetsForMovie(req.query.searchTerm);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

};
