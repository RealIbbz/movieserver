const cors = require('cors');
const express = require('express');
const ExternalAPI = require('./external-api/index');
const JWT = require('./shared/jwt');
const bodyParser = require('body-parser');

app = express();
port = process.env.PORT || 3000;
  
// enable cross domain & parse the body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import the routes
var usersRoutes = require('./api/routes/users'); 
usersRoutes(app); 
var movieRoutes = require('./api/routes/movies'); 
movieRoutes(app); 
var authenticationRoutes = require('./api/routes/authentication'); 
authenticationRoutes(app); 

JWT.setupCredentials().then(() => {
  ExternalAPI.setupExternalAPIs()
  .then(() => {
    app.use(function(req, res) {
      res.status(404).send({url: req.originalUrl + ' not found'})
    });
  
    app.listen(port);
    console.log('API server started on: ' + port);
  });

})
