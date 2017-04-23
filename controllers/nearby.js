controller 					= require('./controller');

function nearby(){
	tomodel = {};
	user_model 	= require('../models/user_model');
};
nearby.prototype.constructor = nearby;

nearby.prototype.get =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.lat = req.body.lat;
	tomodel.lng = req.body.lng;
	tomodel.radius = req.body.radius;
	user_model.get_nearby_users(tomodel, function(err, rows) {
		console.log(err);
		console.log(rows);
		var result = res.locals;
		result['code'] = '200';
		result['users'] = [];
		if (rows.length > 0) {
			result['users'] = rows;
		}
		res.send(result);
	});
}

module.exports = new nearby();
