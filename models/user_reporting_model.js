model 					= require('./model');
var user_reporting_model 			= function(){ };
user_reporting_model.prototype.constructor  	= user_reporting_model;
user_reporting_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_reporting_model.prototype.insert_reporting = function(data, callback) {
	sql = "INSERT INTO user_reporting (user_id, reporting_id, reporting_reason) VALUES (" + data.user_id + ", " + data.reporting_id + ", '" + data.reporting_reason + "')";
	this.execute(sql,callback);
}

module.exports = new user_reporting_model();