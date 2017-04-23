controller 					= require('./controller');

function activities(){
	tomodel = {};
	activity_model 	= require('../models/activity_model');
	user_activity_model 	= require('../models/user_activity_model');
};
activities.prototype.constructor = activities;


activities.prototype.get =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	activity_model.select_all_activities(tomodel, function(err,rows){
		var result = res.locals;
		result['activities'] = rows;
		result['code'] = '200';
		res.send(result);
	});
}

activities.prototype.post =  function(req, res) {
	var activities = req.body.activities.split(',');
	if(Number.isInteger(parseInt(req.body.user_id)) && Array.isArray(activities)) {
		var valid_array = activities_validations(activities);
		if(valid_array) {
			tomodel.user_id = req.body.user_id;
			user_activity_model.delete_user_activity(tomodel, function(err,rows){
	
				for (var i = 0; i < activities.length; i++) {
					tomodel.activity_id = activities[i];
					activity_model.select_activity(tomodel, function(err,rows){
						if(rows.length > 0) {
							tomodel.activity_id = rows[0].id;
							save_user_activity(tomodel);
						}
					});	
				}
				var result = res.locals;
				result['code'] = '200';
				res.send(result);
			});	
		}
		else{
			res.send("404 Not Found");
		}
	}
	else {
		res.send("404 Not Found");
	}
}

function activities_validations(data) {
	var valid_array = data.every(function checkInteger(id) { return Number.isInteger(parseInt(id));});

	return valid_array;
}

function save_user_activity(tomodel) {
	user_activity_model.insert_user_activity(tomodel, function(err,rows){});
		
}

module.exports = new activities();
