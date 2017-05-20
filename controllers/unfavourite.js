controller 					= require('./controller');

function unfavourite(){
	tomodel = {};
	user_following_model 	= require('../models/user_following_model');
	user_following_history_model = require('../models/user_following_history_model');
};
unfavourite.prototype.constructor = unfavourite;

unfavourite.prototype.post =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.following_id = req.body.following_id;
	if(Number.isInteger(parseInt(tomodel.following_id))) {
		user_following_model.delete_following(tomodel, function(err,rows){
			save_following_history(req, res);
		});
	}
	else {
		var result = res.locals;
		result['code'] = '403';
		res.send(result);
	}
}

function save_following_history(req, res) {
	tomodel.status = 2;
	console.log(tomodel);
	user_following_history_model.insert_following_history(tomodel, function(err,rows){
		var data = res.locals;
		data['code'] = '200';
		res.send(data);
	});
}

unfavourite.prototype.index =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	user_following_model.delete_followings(tomodel, function(err,rows){
		var result = res.locals;
		result['code'] = '200';
		res.send(result);
	});
}

module.exports = new unfavourite();
