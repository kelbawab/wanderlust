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
var http = require('http').createServer(app);
var path = require('path');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var errorhandler = require('errorhandler');
var io = require('socket.io')(http);

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
app.use(parser.urlencoded({limit: '50mb', extended: true}));
app.use(parser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./config/routes')(app);

var sockets = {};
io.on('connection', function(socket){
  console.log("connected");
  socket.on('set socket', function (token) {
  	console.log(token);
  	var controller = require('./controllers/controller');
	var payload = controller.verifyToken(token);
    if(payload.message == "succuess") {
        var id = payload.content.data;
        console.log(sockets[id]);
	  	if(sockets[id]) {
		  sockets[id].push(socket);
		}
		else{
		  sockets[id]= [];
		  sockets[id].push(socket);
		}
		// sockets[id] = socket;
		console.log(socket.id)
		console.log(sockets);
    }
  });
  socket.on('chat message', function(token, receiver_id, msg){
  	console.log(msg);
  	if(sockets[receiver_id]) {
		var s =  sockets[receiver_id].filter(function(soc,i){
		    console.log(soc);
		    try{
		      soc.emit('chat message', msg);
		      return soc;
		    }
		    catch(err){
		      console.log(err);
		    }
		});
	}
	sockets[receiver_id] = s;
	if(sockets[receiver_id] && sockets[receiver_id].length == 0) {
		delete sockets[i];
	}

	var controller = require('./controllers/controller');
	var payload = controller.verifyToken(token);
    if(payload.message == "succuess") {
        var id = payload.content.data;
        if(sockets[id]) {
			var s =  sockets[id].filter(function(soc,i){
			    console.log(soc);
			    try{
			    	if(soc.id != socket.id) {
			    		soc.emit('chat my message', msg);
			    	}
			      	return soc;
			    }
			    catch(err){
			      	console.log(err);
			    }
			});
		}
		sockets[id] = s;
		if(sockets[id] && sockets[id].length == 0) {
			delete sockets[i];
		}
    }
  	//  io.emit('chat message', msg);
  });
});

http.listen(app.get('port'),
 function(){
  console.log('Express server listening on port ' + app.get('port'));
});
