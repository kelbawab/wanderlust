model 					= require('./model');
var city_model 			= function(){ };
city_model.prototype.constructor  	= city_model;
city_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

city_model.prototype.select_city_by_name = function(data, callback) {
	sql = "SELECT * From city WHERE name = '" + data.city_name +"'";
	this.execute(sql,callback);
};

city_model.prototype.select_city_by_name_and_country = function(data, callback) {
	sql = "SELECT * From city WHERE (name = '" + data.city_long_name  + "' OR short_name ='" + data.city_short_name + "') AND country_id = " + data.country_id;
	this.execute(sql,callback);
};

city_model.prototype.insert_new_city = function(data, callback) {
	sql = "INSERT INTO city(name,short_name,country_id,latitude,longitude) VALUES ('" + data.city_long_name + "','" + data.city_short_name + "', '" + data.country_id + "', " + data.lat + ", " + data.lng + ")";
	this.execute(sql,callback);
};

module.exports = new city_model();