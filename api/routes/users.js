'use strict';
const { body } = require('express-validator');
const UsersController = require('../controllers/users-controller');

module.exports = function (app) {
  

  app.route('/users')
    .post([
      body('email').isLength({ min: 3, max: 100 }).isEmail().normalizeEmail(),
      body('name').isLength({ min: 1, max: 200 }).withMessage('Name must be between 1 and 200 characters'),
      body('password').isLength({ min: 5, max: 50 }).withMessage('Password must be between 5 and 50 characters'),
      UsersController.createUser]);

};
