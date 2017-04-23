model 					= require('./model');
var user_activity_model 			= function(){ };
user_activity_model.prototype.constructor  	= user_activity_model;
user_activity_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_activity_model.prototype.insert_user_activity = function(data, callback) {
	sql = "INSERT INTO user_activity (user_id, activity_id) VALUES (" + data.user_id + ", " + data.activity_id + ")";
	this.execute(sql,callback);
};

user_activity_model.prototype.select_user_activities = function(data, callback) {
	sql = "SELECT * FROM user_activity WHERE user_id = " + data.user_id;
	this.execute(sql,callback);
};

user_activity_model.prototype.select_user_activities_details = function(data, callback) {
	sql = "SELECT a.name, a.description, a.logo FROM user_activity ua JOIN activity a ON ua.activity_id = a.id WHERE ua.user_id =" + data.user_id;
	this.execute(sql,callback);
};

user_activity_model.prototype.delete_user_activities = function(data, callback) {
	sql = "DELETE FROM user_activity WHERE user_id = " + data.user_id;
	this.execute(sql,callback);
};

user_activity_model.prototype.select_users_activities = function(data, callback) {
	sql = "SELECT * FROM user_activity WHERE user_id IN " + data.users_ids;
	this.execute(sql,callback);
};

user_activity_model.prototype.insert_multiple_user_activities = function(data, callback) {
	sql = "INSERT INTO user_activity (user_id, activity_id) VALUES " + data.inserted_data;
	this.execute(sql,callback);
};

module.exports = new user_activity_model();