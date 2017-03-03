model 					= require('./model');
var user_token_model 			= function(){ };
user_token_model.prototype.constructor  	= user_token_model;
user_token_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_token_model.prototype.insert_new_record = function(data, callback) {
	sql = "INSERT INTO user_token (user_id, token, refresher_token) VALUES (" + data.user_id + ", '" + data.token + "', '" + data.refresher_token + "')";
	this.execute(sql,callback);
};

module.exports = new user_token_model();