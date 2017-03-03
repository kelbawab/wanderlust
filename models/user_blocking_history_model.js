model 					= require('./model');
var user_blocking_history_model 			= function(){ };
user_blocking_history_model.prototype.constructor  	= user_blocking_history_model;
user_blocking_history_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_blocking_history_model.prototype.insert_blocking_history = function(data, callback) {
	sql = "INSERT INTO user_blocking_history (user_id, blocking_id, status) VALUES (" + data.user_id + ", " + data.blocking_id + ", " + data.status + ")";
	this.execute(sql,callback);
}

module.exports = new user_blocking_history_model();