controller 					= require('./controller');

function user(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	user_token_model 	= require('../models/user_token_model');
	user_activity_model = require('../models/user_activity_model');
	country_model = require('../models/country_model');
	city_model = require('../models/city_model');
};
user.prototype.constructor = user;

user.prototype.get =  function(req, res) { 
	tomodel.user_id = req.session.user_id;
	var result = res.locals;
	user_model.select_user(tomodel, function(err,rows){
		if(rows.length > 0) {
			result['code'] = '200';
			result['user_info'] = rows[0];
			get_current_user_activity(req, res, result);
		}
		else {
			result['code'] = '400';
			res.send(result);
		}
		
	});
}

user.prototype.get_profile =  function(req, res) {
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

function get_current_user_activity(req, res, result) {
	user_activity_model.select_user_activities_details(tomodel, function(err,rows) {
		result['activities'] = rows;
		res.send(result);
	});
}

function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

user.prototype.put =  function(req, res) {
	
}

user.prototype.update_location =  function(req, res) {
	tomodel.lat = req.body.lat;
	tomodel.lng = req.body.lng;
	controller.request('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + req.body.lat + ',' + req.body.lng + '&key=AIzaSyBkt0uBOy1obcDNYuj8Wxs6eSwb7ezY_u8', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	console.log(response);	
	  	// res.send(body);
	  	var data = JSON.parse(body);
	  	var countries_long_name =[];
	  	var cities_long_name = [];
	  	var areas_long_name = [];

	  	var countries_short_name =[];
	  	var cities_short_name = [];
	  	var areas_short_name = [];
	  	
	  	for (var i = 0; i < data.results.length; i++) {
	  		for (var j = 0; j < data.results[i].address_components.length; j++) {
	  			if(data.results[i].address_components[j].types.includes("country")) {
	  				if(!countries_long_name.includes(data.results[i].address_components[j].long_name)) {
	  					countries_long_name.push(data.results[i].address_components[j].long_name);
	  				}
	  				if(!countries_short_name.includes(data.results[i].address_components[j].short_name)) {
	  					countries_short_name.push(data.results[i].address_components[j].short_name);
	  				}
	  			}
	  			if(data.results[i].address_components[j].types.includes("administrative_area_level_1")) {
	  				if(!cities_long_name.includes(data.results[i].address_components[j].long_name)) {
	  					cities_long_name.push(data.results[i].address_components[j].long_name);
	  				}
	  				if(!cities_short_name.includes(data.results[i].address_components[j].short_name)) {
	  					cities_short_name.push(data.results[i].address_components[j].short_name);
	  				}
	  			}

	  			if(data.results[i].address_components[j].types.includes("locality")) {
	  				if(!areas_long_name.includes(data.results[i].address_components[j].long_name)) {
	  					areas_long_name.push(data.results[i].address_components[j].long_name);
	  				}
	  				if(!areas_short_name.includes(data.results[i].address_components[j].short_name)) {
	  					areas_short_name.push(data.results[i].address_components[j].short_name);
	  				}	
	  			}
	  		}
	  	}

	  	var country,city;
	  	if(countries_long_name.length > 0) {
	  		country = {long_name: countries_long_name[0], short_name: countries_short_name[0]};
	  	}

	  	if(cities_long_name.length > 0) {
	  		city = {long_name: cities_long_name[0], short_name: cities_short_name[0]};
	  	}
	  	else if(areas_long_name.length > 0) {
	  		city = {long_name: areas_long_name[0], short_name: areas_short_name[0]};
	  	}

	  	tomodel.country_short_name = country.short_name;
	  	tomodel.country_long_name = country.long_name;
	  	tomodel.city_short_name = city.short_name;
	  	tomodel.city_long_name = city.long_name;
	  	country_model.select_country_by_short_name(tomodel, function(err,rows) {
	  		if(rows.length > 0) {
	  			tomodel.country_id = rows[0].id;
	  			check_city(req, res);
	  			// res.send({country: country, city: city, tomodel: tomodel});
	  		}
	  		else {
	  			country_model.insert_new_country(tomodel, function(err,rows) {
	  				tomodel.country_id =  rows.insertId;
	  				check_city(req, res);
	  				// res.send({country: country, city: city, , tomodel: tomodel});
	  			});
	  		}
	  	});
	  	
	  	// var country, city, area;
	  	// if(data.results[data.results.length - 1]) {
	  	// 	country = data.results[data.results.length - 1].address_components[data.results[data.results.length - 1].address_components.length - 1].long_name;
	  	// }
	  	// if(data.results[data.results.length - 2]) {
	  	// 	city = data.results[data.results.length - 2].address_components[data.results[data.results.length - 2].address_components.length - 2].long_name;
	  	// }
	  	// else {
	  	// 	city = country;
	  	// }
	  	// if(data.results[data.results.length - 3]) {
	  	// 	area = data.results[data.results.length - 3].address_components[data.results[data.results.length - 3].address_components.length - 3].long_name;
	  	// }
	  	// else{
	  	// 	area = city;
	  	// }
	  	// var data = {city: city, area: area};
	   //  console.log(body); // Show the HTML for the Google homepage.
	   //  res.send({country: country, city: city, area: area});
	  }
	});
}
function check_city(req, res) {
	city_model.select_city_by_name_and_country(tomodel, function(err,rows) {
  		console.log(rows);
  		if(rows.length > 0) {
  			tomodel.city_id = rows[0].id;
  			update_user_location(req, res);
  			// res.send({country: country, city: city, tomodel: tomodel});
  		}
  		else {
  			city_model.insert_new_city(tomodel, function(err,rows) {
  				tomodel.city_id =  rows.insertId;
  				update_user_location(req, res);
  				// res.send({country: country, city: city, , tomodel: tomodel});
  			});
  		}
  	});
}

function update_user_location(req, res) {
	tomodel.user_id = req.session.user_id;
	user_model.update_user_location(tomodel, function(err, rows) {
		var result = res.locals;
		result['code'] = '200';
		res.send(result);
	});
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
