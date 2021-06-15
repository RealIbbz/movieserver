
'use strict';
const { validationResult } = require('express-validator');
const UserModel = require('../models/users-models')
const Crypto = require('crypto')
const Authentication = require('./authentication-controller')

exports.createUser = async function (req, res) {

  // Finds the validation errors in this request and returns them
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // salt and hash our password if the user doesnt exist, then create it in the database
  let existing = await UserModel.findUserByEmail(req.body.email);
  if (!existing) {
    let salt = Crypto.randomBytes(16).toString('base64');
    let hash = Crypto.createHmac('sha512', salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;

    let user = await UserModel.createUser(req.body);
    res.status(201).send({ ...user, 'token': Authentication.generateJWTToken(user) });

  } else {
    res.status(400).send('Error - user already exists.');
  }

};