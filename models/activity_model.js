model 					= require('./model');
var activity_model 			= function(){ };
activity_model.prototype.constructor  	= activity_model;
activity_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

activity_model.prototype.select_all_activities = function(callback) {
	sql = "SELECT * From activity ORDER BY name";
	this.execute(sql,callback);
};

activity_model.prototype.select_activity = function(data, callback) {
	sql = "SELECT * From activity WHERE id = " + data.activity_id;
	this.execute(sql,callback);
};

module.exports = new activity_model();