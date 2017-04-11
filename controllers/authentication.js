controller 					= require('./controller');

//Contact controller
function authentication(){
	tomodel = {};
	user_model 	= require('../models/user_model');
	country_model 	= require('../models/country_model');
	user_activity_model 	= require('../models/user_activity_model');
	user_token_model 	= require('../models/user_token_model');
};
authentication.prototype.constructor = authentication;

//Function to list all contacts
authentication.prototype.facebook_login =  function(req, res) {
    var user_info = req.body.user_info;
    var validation_array = facebook_user_validations(user_info);
    if(Object.keys(validation_array).length > 0) {
		var result = controller.mergeArrays(validation_array, {code: 404, message:'Bad Request'});
		res.send(result);
	}
	else{
		tomodel.facebook_id = user_info.id;
		user_model.select_user_by_facebook_id(tomodel,function(err,rows){
			//check the existence of the facebook id
			if(rows.length > 0) {
				//login
				login(req, res, rows[0].id);
			}
			else {
				//check the existence of the email
				if(user_info.email) {
					check_facebook_user_email(req, res, user_info);
				}
				else {
					//create new facebook user
					create_new_facebook_user(req, res, user_info);
				}
				
			}
		});
	}
}

function check_facebook_user_email(req, res, user_info) {
	tomodel.email = user_info.email;
	user_model.select_user_by_email(tomodel,function(err,rows){
		if(rows.length > 0) {
			//login
			login(req, res, rows[0].id);
		}
		else {
			//create new facebook user
			create_new_facebook_user(req, res, user_info);
		}
	});
}

// function save_user_tokens(req, res, user_id, token, refresher_token) {
// 	tomodel.user_id = user_id;
// 	tomodel.token = token;
// 	tomodel.refresher_token = refresher_token;
// 	user_model.insert_new_record(tomodel,function(err,rows){
// 		res.send({status:200, token: token, refresher_token: refresher_token, headers:req.headers});
// 	});
// }

function create_new_facebook_user(req, res, user_info) {
	tomodel.facebook_id = user_info.id;

	tomodel.birth_date = '';
	if(user_info.birthday){
		tomodel.birth_date = user_info.birthday;
	}

	tomodel.gender = '';
	if(user_info.gender){
		tomodel.gender = user_info.gender;
	}

	tomodel.first_name = '';
	if(user_info.first_name){
		tomodel.first_name = user_info.first_name;
	}

	tomodel.last_name = '';
	if(user_info.last_name){
		tomodel.last_name = user_info.last_name;
	}

	tomodel.cover = '';
	if(user_info.cover){
		tomodel.cover = user_info.cover.source;
	}

	tomodel.image_url = '';
	if(user_info.picture){
		tomodel.image_url = user_info.picture.data.url;
	}
	
	tomodel.email = '';
	if(user_info.email){
		tomodel.email = user_info.email;
	}	

	tomodel.about = '';
	if(user_info.about){
		tomodel.about = user_info.about;
	}

	user_model.insert_user_facebook(tomodel,function(err,rows){
		var user_id = rows.insertId;
		if (user_info.hometown) {
			tomodel.country_name = user_info.hometown.location.country;
			country_model.select_country_by_name(tomodel,function(err,rows){
				if(rows.length > 0) {
					var country_id = rows[0].id;
					update_user_country(user_id, country_id);
				}
			});
		}

		if (user_info.location) {
			tomodel.city_name = location.location.city;
			city_model.select_city_by_name(tomodel,function(err,rows){
				if(rows.length > 0) {
					var city_id = rows[0].id;
					update_user_city(user_id, city_id);
				}
			});
		}
		login(req, res, user_id);
	});
}

function update_user_country(user_id, country_id) {
	tomodel.user_id = user_id;
	tomodel.country_id = country_id;
	user_model.update_user_country(tomodel,function(err,rows){});
}

function update_user_city(user_id, city_id) {
	tomodel.user_id = user_id;
	tomodel.city_id = city_id;
	user_model.update_user_city(tomodel,function(err,rows){});
}

function login(req, res, user_id) {
	tomodel.user_id = user_id;
	var token = controller.generateToken(user_id, '24h');
	var result = res.locals;
	result['token'] = token;
	result['activity'] = false;
	result['first_login'] = false;
	result['code'] = '200';
	tomodel.token = token;
	tomodel.device_id = req.headers['user-agent'];
	user_token_model.delete_old_record(tomodel, function(err,rows) {
		save_new_record(req, res);
	});
}

function save_new_record(req, res) {
	user_token_model.insert_new_record(tomodel, function(err,rows){
		check_activities_and_first_login(req, res);
	});
}

function check_activities_and_first_login(req, res) {
	user_activity_model.select_user_activities(tomodel,function(err,rows){
		if(rows.length > 0) {
			result['activity'] = true;
		}
		user_model.select_user(tomodel,function(err,rows){
			if(rows.length > 0) {
				if(rows[0].mobile_first == 1) {
					result['first_login'] = true;	
				}
			}
			res.send(result);
		});	
	});
}

function facebook_user_validations(data) {
	var validation_array = {};
	var id = controller.validate({id: data.id},['required']);
	if(id){
		validation_array = controller.mergeArrays(validation_array, id);
	}
	if(data.email) {
		var email = controller.validate({email: data.email},['email', 'length:0-100']);
		if(email){
			validation_array = controller.mergeArrays(validation_array, email);
		}
	}
	if(data.first_name) {
		var first_name = controller.validate({first_name: data.first_name},['length:0-30']);
		if(first_name){
			validation_array = controller.mergeArrays(validation_array, first_name);
		}
	}
	if(data.last_name) {
		var last_name = controller.validate({last_name: data.last_name},['length:0-30']);
		if(last_name){
			validation_array = controller.mergeArrays(validation_array, last_name);
		}	
	}
	
	return validation_array;
}

module.exports = new authentication();
