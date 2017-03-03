controller 					= require('./controller');

function user_preferences(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_token_model 	= require('../models/user_token_model');
};
user_preferences.prototype.constructor = user_preferences;

user_preferences.prototype.index =  function(req, res) {
	
}

user_preferences.prototype.discoverable_post =  function(req, res) {
	
}
user_preferences.prototype.radius_post =  function(req, res) {
	
}
user_preferences.prototype.show_distance_post =  function(req, res) {
	
}

module.exports = new user_preferences();
