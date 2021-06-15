const JWT = require('../../shared/jwt');
const UserModel = require('../models/users-models');
const Crypto = require('crypto');

exports.generateJWTToken = function (userId) {
  return JWT.sign(userId);
}

exports.login = (req, res) => {
  try {
    res.status(201).send({ ...req.body, token: this.generateJWTToken(req.body) });
  } catch (err) {
    console.error(err);
    res.status(500).send({ errors: err });
  }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
  UserModel.findUserByEmail(req.body.email)
    .then((user) => {
      // If we didnt find our user, send error back to client, other wise hash & salt password and add the user details to the req body
      if (!user) {
        res.status(404).send({});
      } else {
        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = Crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        if (hash === passwordFields[1]) {
          req.body = {
            ...user
          };
          delete req.body.password;
          return next();
        } else {
          return res.status(400).send({ error: 'Invalid email or password' });
        }
      }
    });
};

exports.validateJWT = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      // Validate there was a valid authorisation header following the spec, if it is valid, add it to the req userid value.
      let authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send();
      } else {
        req.userId = JWT.verify(authorization[1]);
        return next();
      }
    } catch (err) {
      console.log(err);
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};