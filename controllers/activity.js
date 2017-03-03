controller 					= require('./controller');

function activity(){
	tomodel = {};
	activity_model 	= require('../models/activity_model');
	user_activity_model 	= require('../models/user_activity_model');
};
activity.prototype.constructor = activity;


activity.prototype.get =  function(req, res) {
	tomodel.activity_id = req.params.id;
	if(Number.isInteger(parseInt(tomodel.activity_id))) {
		activity_model.select_activity(tomodel, function(err,rows){
			var data = res.locals;
			data['activity'] = rows[0];
			data['status'] = '200';
			res.send(data);
		});	
	}
	else {
		res.send("404 Not Found");
	}
}

activity.prototype.post =  function(req, res) {
	tomodel.activity_id = req.body.id;
	tomodel.user_id = req.session.user_id;
	if(Number.isInteger(parseInt(tomodel.activity_id))) {
		user_activity_model.insert_user_activity(tomodel, function(err,rows){
			var data = res.locals;
			data['status'] = '200';
			res.send(data);
		});	
	}
	else {
		res.send("404 Not Found");
	}
}

module.exports = new activity();
