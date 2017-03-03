controller 					= require('./controller');

function report(){
	tomodel = {};
	user_reporting_model 	= require('../models/user_reporting_model');
};
report.prototype.constructor = report;

report.prototype.post =  function(req, res) {
	var data = controller.xssClean(req.body);
	var validation_array = reporting_validations(data);
	if(Object.keys(validation_array).length > 0) {
		var result = controller.mergeArrays(validation_array, {status: '400'});
		res.send(result);
	}
	else {
		tomodel.user_id = req.session.user_id;
		tomodel.reporting_id = data.reporting_id;
		tomodel.reporting_reason = data.reporting_reason;
		user_reporting_model.insert_reporting(tomodel, function(err,rows){
			var data = res.locals;
			data['status'] = '200';
			res.send(data);
		});

	}
}

function reporting_validations(data) {
	var validation_array = {};
	var reporting_id = controller.validate({reporting_id: data.reporting_id},['required', 'integer']);
	if(reporting_id){
		validation_array = controller.mergeArrays(validation_array, reporting_id);
	}
	var reporting_reason = controller.validate({reporting_reason: data.reporting_reason},['length:0-20000']);
	if(reporting_reason){
		validation_array = controller.mergeArrays(validation_array, reporting_reason);
	}
	return validation_array;
}

module.exports = new report();
