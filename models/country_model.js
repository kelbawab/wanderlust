model 					= require('./model');
var country_model 			= function(){ };
country_model.prototype.constructor  	= country_model;
country_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
country_model.prototype.select_country_by_name = function(data, callback) {
	sql = "SELECT * From country WHERE name = '" + data.country_name  + "'";
	this.execute(sql,callback);
};

module.exports = new country_model();