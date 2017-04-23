controller 					= require('./controller');

function user_activity(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_activity_model 	= require('../models/user_activity_model');
	user_token_model 	= require('../models/user_token_model');
};
user_activity.prototype.constructor = user_activity;

user_activity.prototype.post =  function(req, res) {
	var activities = req.body.activities;
	var user_id = req.session.user_id;
	var result = res.locals;
	if(Array.isArray(activities) && activities.length > 0) {
		var valid_array = activities_validations(activities);
		if(valid_array) {
			tomodel.user_id;
			user_activity_model.delete_user_activities(tomodel, function(err,rows) {
				add_user_activities(req, res, result);
			});
		}
		else {
			result['code'] = '400';
			res.send(result);
		}
	}
	else {
		result['code'] = '400';
		res.send(result);
	}
}

function activities_validations(data) {
	var valid_array = data.every(function checkInteger(id) { return Number.isInteger(parseInt(id));});
	return valid_array;
}

function add_user_activities(req, res, result) {
	var activities = req.body.activities;
	var user_id = req.session.user_id;
	var inserted_data = activities.reduce(function(data, activity) {
		var data = data + '(' + user_id +','+ activity +'),';
		return data;
	}, '');
	tomodel.inserted_data = inserted_data.slice(0,-1);
	console.log(tomodel.inserted_data);
	user_activity_model.insert_multiple_user_activities(tomodel, function(err,rows) {
		result['code'] = '200';
		res.send(result);
	});
}

module.exports = new user_activity();
