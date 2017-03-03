model 					= require('./model');
var city_model 			= function(){ };
city_model.prototype.constructor  	= city_model;
city_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

city_model.prototype.select_city_by_name = function(data, callback) {
	sql = "SELECT * From city WHERE name = '" + data.city_name +"'";
	this.execute(sql,callback);
};

module.exports = new city_model();