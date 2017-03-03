model 					= require('./model');
var user_following_model 			= function(){ };
user_following_model.prototype.constructor  	= user_following_model;
user_following_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_following_model.prototype.select_following = function(data, callback) {
	sql = "SELECT * FROM user_following WHERE user_id = " + data.user_id;
	this.execute(sql,callback);
}

user_following_model.prototype.insert_following = function(data, callback) {
	sql = "INSERT INTO user_following (user_id, following_id) VALUES (" + data.user_id + ", " + data.following_id + ")";
	this.execute(sql,callback);
}

user_following_model.prototype.delete_following = function(data, callback) {
	sql = "DELETE FROM user_following WHERE user_id= " + data.user_id + " AND following_id = " + data.following_id ;
	this.execute(sql,callback);
}

module.exports = new user_following_model();