'use strict';
let Authentication = require('../controllers/authentication-controller');
const { body } = require('express-validator');

module.exports = function (app) { 
  app.route('/login')
    .post([
      body('email').isLength({ min: 3, max: 100 }).isEmail().normalizeEmail(),
      body('password').isLength({ min: 5, max: 50 }).withMessage('Password must be between 5 and 50 characters'),
      Authentication.isPasswordAndUserMatch, Authentication.login]);

};
