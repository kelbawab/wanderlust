controller 					= require('./controller');

function city(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	city_model 	= require('../models/city_model');
	user_token_model 	= require('../models/user_token_model');
};
city.prototype.constructor = city;

city.prototype.index =  function(req, res) {
	city_model.select_all_cities(function(err,rows){
		var result = res.locals;
		result['cities'] = rows;
		res.send(result);
	});
}
city.prototype.search =  function(req, res) {
	
}
city.prototype.index_limit =  function(req, res) {
	
}

module.exports = new city();
