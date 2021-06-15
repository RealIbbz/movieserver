const cors = require('cors');
const express = require('express');
const ExternalAPI = require('./external-api/index');
const JWT = require('./shared/jwt');

app = express();
port = process.env.PORT || 3000;
//Task = require('./api/models/todoListModel'), //created model loading here
bodyParser = require('body-parser');
  
// enable cross domain
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var usersRoutes = require('./api/routes/users'); //importing route
usersRoutes(app); //register the route
var movieRoutes = require('./api/routes/movies'); //importing route
movieRoutes(app); //register the route
var authenticationRoutes = require('./api/routes/authentication'); //importing route
authenticationRoutes(app); //register the route

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
