model 					= require('./model');
var country_model 			= function(){ };
country_model.prototype.constructor  	= country_model;
country_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
country_model.prototype.select_all_countries = function(callback) {
	sql = "SELECT * FROM country";
	this.execute(sql,callback);
};

country_model.prototype.select_country_by_name = function(data, callback) {
	sql = "SELECT * From country WHERE name = '" + data.country_name  + "'";
	this.execute(sql,callback);
};

country_model.prototype.select_country_by_short_name = function(data, callback) {
	sql = "SELECT * From country WHERE short_name = '" + data.country_short_name  + "' OR short_name2 ='" + data.country_short_name + "'";
	this.execute(sql,callback);
};

country_model.prototype.insert_new_country = function(data, callback) {
	sql = "INSERT INTO country(name,official_name,short_name,short_name2,citizen_name,latitude,longitude) VALUES ('" + data.country_long_name + "','" + data.country_long_name + "','" + data.country_short_name + "','" + data.country_short_name + "', 'of " + data.country_long_name + "', " + data.lat + ", " + data.lng + ")";
	this.execute(sql,callback);
};
module.exports = new country_model();