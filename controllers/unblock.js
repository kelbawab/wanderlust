controller 					= require('./controller');

function unblock(){
	tomodel = {};
	user_blocking_model 	= require('../models/user_blocking_model');
	user_blocking_history_model = require('../models/user_blocking_history_model');
};
unblock.prototype.constructor = unblock;

unblock.prototype.post =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.blocking_id = req.body.blocking_id;
	if(Number.isInteger(parseInt(tomodel.blocking_id))) {
		user_blocking_model.delete_blocking(tomodel, function(err,rows){
			save_blocking_history(tomodel, req, res);
		});
	}
}

function save_blocking_history(tomodel, req, res) {
	tomodel.status = 2;
	console.log(tomodel);
	user_blocking_history_model.insert_blocking_history(tomodel, function(err,rows){
		var data = res.locals;
		data['status'] = '200';
		res.send(data);
	});
}

module.exports = new unblock();
