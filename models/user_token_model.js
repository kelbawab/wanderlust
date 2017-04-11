model 					= require('./model');
var user_token_model 			= function(){ };
user_token_model.prototype.constructor  	= user_token_model;
user_token_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_token_model.prototype.insert_new_record = function(data, callback) {
	sql = "INSERT INTO user_token (user_id, device_id, token) VALUES (" + data.user_id + ", '" + data.device_id + "', '" + data.token + "')";
	this.execute(sql,callback);
};

user_token_model.prototype.delete_old_record = function(data, callback) {
	sql = "DELETE user_token WHERE user_id = " + data.user_id + " AND device_id = '" + data.device_id + "'";
	this.execute(sql,callback);
};


module.exports = new user_token_model();