model 					= require('./model');
var user_blocking_model 			= function(){ };
user_blocking_model.prototype.constructor  	= user_blocking_model;
user_blocking_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_blocking_model.prototype.select_blocking = function(data, callback) {
	sql = "SELECT * FROM user_blocking WHERE user_id = " + data.user_id;
	this.execute(sql,callback);
}

user_blocking_model.prototype.insert_blocking = function(data, callback) {
	sql = "INSERT INTO user_blocking (user_id, blocking_id) VALUES (" + data.user_id + ", " + data.blocking_id + ")";
	this.execute(sql,callback);
}

user_blocking_model.prototype.delete_blocking = function(data, callback) {
	sql = "DELETE FROM user_blocking WHERE user_id= " + data.user_id + " AND blocking_id = " + data.blocking_id ;
	this.execute(sql,callback);
}

module.exports = new user_blocking_model();