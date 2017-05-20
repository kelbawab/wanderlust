controller 					= require('./controller');

function nearby(){
	tomodel = {};
	user_model 	= require('../models/user_model');
};
nearby.prototype.constructor = nearby;

nearby.prototype.get =  function(req, res) {
	console.log(req.body.lng);
	console.log(req.body.lat);
	try {
		var validation_array = location_validations(req.body);
	    if(Object.keys(validation_array).length > 0) {
			var result = controller.mergeArrays(validation_array, {code: 404, message:'Bad Request'});
			res.send(result);
		}
		else{
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
					for (var i = 0; i < rows.length; i++) {
						var age = calcAge(rows[i].birth_date);
						var birthday = formatDate(rows[i].birth_date);
						rows[i]['age'] = age;
						rows[i]['birthday'] = birthday;
					}
					result['users'] = rows;
				}
				res.send(result);
			});
		}	
	}
	catch(err) {
		var result = res.locals;
		result['code'] = '400';
		res.send(result);
	}
		
}

function location_validations(data) {
	var validation_array = {};
	
	var lng = controller.validate({lng: data.lng.toString()},['required', 'match_regex:^(\\+|-)?(?:180(?:(?:\\.0{1,})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,})?))$||This is not a valid longitude']);
	if(lng){
		validation_array = controller.mergeArrays(validation_array, lng);
	}
	var lat = controller.validate({lat: data.lat.toString()},['required', 'match_regex:^(\\+|-)?(?:90(?:(?:\\.0{1,})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,})?))$||This not a valid latitude']);
	if(lat){
		validation_array = controller.mergeArrays(validation_array, lat);
	}
	
	var radius = controller.validate({radius: data.radius.toString()},['required', 'float']);
	if(radius){
		validation_array = controller.mergeArrays(validation_array, radius);
	}

	return validation_array;
}

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];
  
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' '+ day + ',' + year;
}

module.exports = new nearby();
