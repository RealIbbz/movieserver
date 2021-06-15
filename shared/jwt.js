const JsonWebToken = require('jsonwebtoken');

const Secret = require('../shared/cloud-provider/index');
let secret;

module.exports = {
  setupCredentials : async () => {
    secret = await Secret.secretManager.accessSecret('jwt-secret');
  }, 
  sign: (payload) => {
    // Token signing options
    var signOptions = {
      issuer: "movie",
      subject: "verify",
      audience: "clientid",
      expiresIn: "30d"    // 30 days validity      
    };
    return JsonWebToken.sign(payload, secret, signOptions);
  },
  verify: (token) => {
    var verifyOptions = {
      issuer: "movie",
      subject: "verify",
      audience: "clientid",
      expiresIn: "30d"
    };
    try {
      return JsonWebToken.verify(token, secret, verifyOptions);
    } catch (err) {
      return false;
    }
  }
}