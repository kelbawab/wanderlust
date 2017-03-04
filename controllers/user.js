controller 					= require('./controller');

function user(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_token_model 	= require('../models/user_token_model');
	user_activity_model = require('../models/user_activity_model');
};
user.prototype.constructor = user;


user.prototype.get =  function(req, res) {
	tomodel.user_id = req.body.user_id;
	if(Number.isInteger(parseInt(tomodel.user_id))) {
		user_model.select_user_profile(tomodel, function(err,rows){
			if(rows.length > 0) {
				var age = calcAge(rows[0].birth_date);
				rows[0]['age'] = age;
				get_current_user_activity(req, res, rows[0]);
			}
			else {
				res.send({code:'403', message:'not a valid id'});
			}
			
		});
	}
	else {
		res.send({code:'403', message:'not a valid id'});
	}
}

function get_current_user_activity(req, res, user) {
	user_activity_model.select_user_activities_details(tomodel, function(err,rows) {
		user['activities'] = rows;
		var data = res.locals;
		data['user'] = user;
		data['code'] = '200';
		res.send(data);
	});
}

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

user.prototype.put =  function(req, res) {
	
}

user.prototype.index =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	user_model.select_users(tomodel, function(err,rows){
		var data = res.locals;
		data['users'] = rows;
		data['status'] = '200';
		res.send(data);
	});
}

module.exports = new user();
