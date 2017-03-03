controller 					= require('./controller');

function user_activity(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_token_model 	= require('../models/user_token_model');
};
user_activity.prototype.constructor = user_activity;

user_activity.prototype.get =  function(req, res) {
	
}

module.exports = new user_activity();
