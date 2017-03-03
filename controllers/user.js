controller 					= require('./controller');

function user(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_token_model 	= require('../models/user_token_model');
};
user.prototype.constructor = user;


user.prototype.get =  function(req, res) {
	tomodel.user_id = req.params.id;
	if(Number.isInteger(parseInt(tomodel.user_id))) {
		user_model.select_user(tomodel, function(err,rows){
			var data = res.locals;
			data['user'] = rows[0];
			data['status'] = '200';
			res.send(data);
		});
	}
	else {
		res.send("404 Not Found");
	}
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
