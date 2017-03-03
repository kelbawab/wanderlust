controller 					= require('./controller');

function users_city(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_token_model 	= require('../models/user_token_model');
};
users_city.prototype.constructor = users_city;

users_city.prototype.get =  function(req, res) {
	
}

module.exports = new users_city();
