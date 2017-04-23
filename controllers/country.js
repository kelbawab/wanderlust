controller 					= require('./controller');

function country(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	country_model 	= require('../models/country_model');
	user_token_model 	= require('../models/user_token_model');
};
country.prototype.constructor = country;

country.prototype.index =  function(req, res) {
	country_model.select_all_countries(function(err,rows){
		var result = res.locals;
		result['code'] = '200';
		result['countries'] = rows;
		res.send(result);
	});
}


module.exports = new country();
