model 					= require('./model');
var activity_model 			= function(){ };
activity_model.prototype.constructor  	= activity_model;
activity_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

activity_model.prototype.select_all_activities = function(data, callback) {
	sql = "SELECT a.id, a.name, a.description, a.logo, COALESCE(ua.picked,false) AS picked From activity a LEFT JOIN (SELECT activity_id,  true AS picked FROM user_activity WHERE user_id=" + data.user_id + ") AS ua ON a.id = ua.activity_id GROUP BY a.id ORDER BY a.name";
	this.execute(sql,callback);
};

activity_model.prototype.select_activity = function(data, callback) {
	sql = "SELECT * From activity WHERE id = " + data.activity_id;
	this.execute(sql,callback);
};

module.exports = new activity_model();