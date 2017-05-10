model 					= require('./model');
var user_model 			= function(){ };
user_model.prototype.constructor  	= user_model;
user_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_model.prototype.insert_user_facebook = function(data, callback) {
	sql = "INSERT INTO user (first_name, last_name, facebook_id, image_url, email, birth_date, about, cover_image_url, mobile_first, facebook_link, created_at) VALUES ('" + data.first_name + "', '" + data.last_name + "', '" + data.facebook_id + "', '" + data.image_url + "', '" + data.email + "', '" + data.birth_date + "', '" + data.about + "', '" + data.cover + "', 1, '" + data.facebook_link + "', CURRENT_TIMESTAMP)";
	this.execute(sql,callback);
};

user_model.prototype.select_user = function(data, callback) {
	sql = "SELECT u.*, co.name AS country_name, co.flag_image, co.flag_image_small, co.citizen_name, c.name AS city_name FROM user u LEFT JOIN country co on u.country_id = co.id LEFT JOIN city c on u.current_city_id = c.id WHERE u.id= " + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.update_user = function(data, callback) {
	sql = "UPDATE user SET first_name='" + data.first_name + "', last_name='" + data.last_name + "', birth_date='" + data.birth_date + "', about='" + data.about + "', country_id=" + data.country_id + ", mobile_first = 0 WHERE id=" + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.select_user_profile = function(data, callback) {
	sql = "SELECT u.first_name, u.last_name, u.image_url, u.cover_image_url, Date(u.birth_date), u.about, c.citizen_name, c.flag_image FROM user u LEFT JOIN country c on u.country_id = c.id WHERE u.id= " + data.user_id;
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
	sql = "UPDATE user SET current_city_id=" + data.city_id + " WHERE id=" + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.update_user_location = function(data, callback) {
	sql = "UPDATE user SET current_city_id=" + data.city_id + ", current_latitude=" + data.lat + ", current_longitude=" + data.lng + " WHERE id=" + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.select_users_by_city = function(data, callback) {
	sql = "SELECT * FROM user WHERE current_city_id= " + data.city_id;
	this.execute(sql,callback);
};


user_model.prototype.update_user_country = function(data, callback) {
	sql = "UPDATE user SET country_id = " + data.country_id + " WHERE id= " + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.update_user_city = function(data, callback) {
	sql = "UPDATE user SET current_city_id = " + data.city_id + " WHERE id= " + data.user_id;
	this.execute(sql,callback);
};

user_model.prototype.get_nearby_users = function(data, callback) {
	sql = "SELECT u.id, u.first_name, u.last_name, u.image_url, u.show_distance, c.name, c.flag_image, c.flag_image_small, ( 6371 * acos( cos( radians(" + data.lat + ") ) * cos( radians( u.current_latitude ) ) * cos( radians( u.current_longitude ) - radians(" + data.lng + ") ) + sin( radians(" + data.lat + ") ) * sin( radians( u.current_latitude ) ) ) ) AS distance FROM user u LEFT JOIN country c ON u.country_id = c.id JOIN user_activity ua ON u.id = ua.user_id WHERE u.id != " + data.user_id + " AND u.discoverable = 1 AND ua.activity_id IN (SELECT ua.activity_id FROM user u JOIN user_activity ua ON u.id = ua.user_id WHERE u.id = " + data.user_id + ") GROUP BY u.id HAVING distance < " + data.radius + " ORDER BY distance";
	this.execute(sql,callback);
};

user_model.prototype.get_users_by_city = function(data, callback) {
	sql = "SELECT u.id, u.first_name, u.last_name, u.image_url, c.name, c.flag_image, c.flag_image_small FROM user u LEFT JOIN country c ON u.country_id = c.id JOIN user_activity ua ON u.id = ua.user_id WHERE u.id != " + data.user_id + " AND u.discoverable = 1 AND u.current_city_id = " + data.city_id + " AND ua.activity_id IN (SELECT ua.activity_id FROM user u JOIN user_activity ua ON u.id = ua.user_id WHERE u.id = " + data.user_id + ") GROUP BY u.id";
	this.execute(sql,callback);
};

module.exports = new user_model();