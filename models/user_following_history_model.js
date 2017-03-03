model 					= require('./model');
var user_following_history_model 			= function(){ };
user_following_history_model.prototype.constructor  	= user_following_history_model;
user_following_history_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_following_history_model.prototype.insert_following_history = function(data, callback) {
	sql = "INSERT INTO user_following_history (user_id, following_id, status) VALUES (" + data.user_id + ", " + data.following_id + ", " + data.status + ")";
	this.execute(sql,callback);
}

module.exports = new user_following_history_model();