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
			save_following_history(tomodel, req, res);
		});
	}
}

function save_following_history(tomodel, req, res) {
	tomodel.status = 2;
	console.log(tomodel);
	user_following_history_model.insert_following_history(tomodel, function(err,rows){
		var data = res.locals;
		data['status'] = '200';
		res.send(data);
	});
}
module.exports = new unfavourite();
