model 					= require('./model');
var user_model 			= function(){ };
user_model.prototype.constructor  	= user_model;
user_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_model.prototype.insert_user_facebook = function(data, callback) {
	sql = "INSERT INTO user (first_name, last_name, facebook_id, image_url, email, created_at) VALUES ('" + data.first_name + "', '" + data.last_name + "', '" + data.facebook_id + "', '" + data.image_url + "', '" + data.email + "', CURRENT_TIMESTAMP)";
	this.execute(sql,callback);
};

user_model.prototype.select_user = function(data, callback) {
	sql = "SELECT * FROM user WHERE id= " + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.select_user_profile = function(data, callback) {
	sql = "SELECT u.first_name, u.last_name, u.image_url, u.cover_image_url, u.birth_date, u.about, c.citizen_name, c.flag_image FROM user u LEFT JOIN country c on u.country_id = c.id WHERE u.id= " + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.select_user_by_facebook_id = function(data, callback) {
	sql = "SELECT * FROM user WHERE facebook_id= " + data.facebook_id;
	this.execute(sql,callback);
};

user_model.prototype.select_user_by_email = function(data, callback) {
	sql = "SELECT * FROM user WHERE email= " + data.facebook_id;
	this.execute(sql,callback);
};

user_model.prototype.select_users = function(data, callback) {
	sql = "SELECT * FROM user";
	this.execute(sql,callback);
};

user_model.prototype.update_user_current_city = function(data, callback) {
	sql = "UPDATE user SET current_city_id=" + data.city_id + " WHERE user_id=" + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.select_users_by_city = function(data, callback) {
	sql = "SELECT * FROM user WHERE current_city_id= " + data.city_id;
	this.execute(sql,callback);
};

module.exports = new user_model();