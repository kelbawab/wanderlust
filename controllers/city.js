controller 					= require('./controller');

function city(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_token_model 	= require('../models/user_token_model');
};
city.prototype.constructor = city;

city.prototype.index =  function(req, res) {
	
}
city.prototype.search =  function(req, res) {
	
}
city.prototype.index_limit =  function(req, res) {
	
}

module.exports = new city();
