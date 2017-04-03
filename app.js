/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');



// create a new express server
var app = express();
var parser = require('body-parser');
var http = require('http');
var path = require('path');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var errorhandler = require('errorhandler');

require('cf-deployment-tracker-client').track();

// all environments
app.set('port', process.env.PORT || 3000);

// serve the files out of ./public as our main files
app.use(session({
  secret: 'topsupersecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./config/routes')(app);

http.createServer(app).listen(app.get('port'),
 function(){
  console.log('Express server listening on port ' + app.get('port'));
});
