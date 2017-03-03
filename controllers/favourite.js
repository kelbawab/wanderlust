controller 					= require('./controller');

function favourite(){
	tomodel = {};
	user_following_model 	= require('../models/user_following_model');
	user_following_history_model = require('../models/user_following_history_model');
};
favourite.prototype.constructor = favourite;


favourite.prototype.post =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.following_id = req.body.following_id;
	if(Number.isInteger(parseInt(tomodel.following_id))) {
		user_following_model.insert_following(tomodel, function(err,rows){
			save_following_history(tomodel, req, res);
		});
	}
}

favourite.prototype.index =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	user_following_model.select_following(tomodel, function(err,rows){
		var data = res.locals;
		data['following'] = rows;
		data['status'] = '200';
		res.send(data);
	});	
}

function save_following_history(tomodel, req, res) {
	tomodel.status = 1;
	console.log(tomodel);
	user_following_history_model.insert_following_history(tomodel, function(err,rows){
		var data = res.locals;
		data['status'] = '200';
		res.send(data);
	});
}
module.exports = new favourite();
