controller 					= require('./controller');

function users_city_activity(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	city_model 	= require('../models/city_model');
	activity_model 	= require('../models/activity_model');
	user_token_model 	= require('../models/user_token_model');
	user_activity_model = require('../models/user_activity_model');
};
users_city_activity.prototype.constructor = users_city_activity;

users_city_activity.prototype.get =  function(req, res) {
	if(Number.isInteger(parseInt(req.body.user_id))) {
		tomodel.user_id = req.body.user_id;
		tomodel.city_name = req.body.city_name;
		city_model.select_city_by_name(tomodel, function(err,rows) {
			if(rows.length > 0) {
				tomodel.city_id = rows[0].id;
				update_user_current_city(req, res);
			}
			else {
				res.send({code:'403', message:'not a valid city'});
			}
		});
	}
	else {
		res.send({code:'403', message:'not a valid id'});
	}
}

function update_user_current_city(req, res) {
	user_model.update_user_current_city(tomodel, function(err,rows) {
		get_users_by_city(req, res);				
	});
}

function get_users_by_city(req, res) {
	user_model.select_users_by_city(tomodel, function(err,rows) {
		if(rows.length > 0) {
			get_current_user_activities(req, res, rows);
		}
		else {
			res.send({code:'200', message:'There are no avaliable users in your city'});
		}
	});
}

function get_current_user_activities(req, res, users) {
	user_model.select_user_activities(tomodel, function(err,rows) {
		if(rows.length > 0) {
			var users_ids = users.map(function(user) {
				return user.id;
			});

			var activities = rows.map(function(activity) {
				return activity.activity_id;
			})
			get_users_activities(req, res, users_ids, users, activities);
			// var valid_users = users.filter(function (user) {

			// });
		}
		else {
			res.send({code:'200', message:'You don\'t have any activity'});
		}
	});
}

function get_users_activities(req, res, users_ids, users, activities) {
	// console.log(users_ids);
	// console.log(activities);
	var users_string = '(';
	for (var i = users_ids.length - 1; i >= 0; i--) {
		users_string = users_string + users_ids[i];
		if(i == 0) {
			users_string = users_string + ')';
		}
		else {
			users_string = users_string + ',';	
		}
	}
	tomodel.users_ids = users_string;
	user_activity_model.select_users_activities(tomodel, function(err, rows) {
		if(rows.length > 0) {
			var returned_users = [];
			for (var i = 0; i < rows.length; i++) {
				// console.log(rows[i].activity_id);
				// console.log(rows[i].user_id);
				// console.log(activities.includes(rows[i].activity_id));
				if(activities.includes(rows[i].activity_id) && !returned_users.includes(rows[i].user_id)) {
					returned_users.push(rows[i].user_id);
				}
			}
			all_users_data = users.filter(function(user) {
				if(returned_users.includes(user.id)){
					return user;
				}
			});
			res.send({code:'200', users_ids: returned_users, users: all_users_data, city_name: req.body.city_name});
		}
		else {
			res.send({code:'200', message:'No other users have activities'});	
		}	
	});

}

users_city_activity.prototype.search =  function(req, res) {
	
}

users_city_activity.prototype.search_city =  function(req, res) {
	
}
module.exports = new users_city_activity();
