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
		tomodel.facebook_id = data.user_info.id;
		tomodel.birthday = '';
		if(data.user_info.birthday){
			tomodel.birthday = data.user_info.birthday;
		}

		tomodel.gender = '';
		if(data.user_info.gender){
			tomodel.gender = data.user_info.gender;
		}

		tomodel.first_name = '';
		if(data.user_info.first_name){
			tomodel.first_name = data.user_info.first_name;
		}

		tomodel.last_name = '';
		if(data.user_info.last_name){
			tomodel.last_name = data.user_info.last_name;
		}

		tomodel.cover = '';
		if(data.user_info.cover){
			tomodel.cover = data.user_info.cover.source;
		}

		tomodel.picture = '';
		if(data.user_info.picture){
			tomodel.picture = data.user_info.picture.data.url;
		}

		if (data.user_info.hometown) {
			tomodel.country_name = data.user_info.hometown.location.country;
			country_model.select_country_by_name(tomodel,function(err,rows){
				if(rows.length > 0) {
					tomodel.country_id = rows[0].id;
				}
			});
		}

		if (data.user_info.location) {
			tomodel.city_name = data.location.location.city;
			city_model.select_city_by_name(tomodel,function(err,rows){
				if(rows.length > 0) {
					tomodel.city_id = rows[0].id;
				}
			});
		}
		///////////////////////////////////////
		var result = res.locals;
		result['message'] = tomodel;
		result['code'] = '200';
		res.send(result);
		/////////////////////////////////////
		// user_model.select_user_by_facebook_id(tomodel,function(err,rows){
		// 	//check the existence of the facebook id
		// 	if(rows.length > 0) {
		// 		//login
		// 		//login(req, res, rows[0]);
		// 	}
		// 	else {
		// 		//check the existence of the email
		// 		//check_facebook_user_email(req, res, data);
		// 	}
		// });
		
		
	}
}

function login(req, res, user_info) {
	var result =  res.locals;
	result['code'] = 200;
	result['message'] = "sucsses";
	result['user_info'] = user_info;
	tomodel.user_id = user_info.id;
	user_activity_model.select_user_activities(tomodel,function(err,rows){
		//check the existence of the facebook id
		if(rows.length > 0) {
			result['activity'] = true;
		}
		else {
			result['activity'] = false;
		}
		res.send(result);
	});
}

function check_facebook_user_email(req, res, data) {
	tomodel.email = data.email;
	user_model.select_user_by_email(tomodel,function(err,rows){
		if(rows.length > 0) {
			//login
			login(req, res, rows[0]);
		}
		else {
			//create new facebook user
			create_new_facebook_user(req, res, data);
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

function create_new_facebook_user(req, res, data) {
	tomodel.email = data.email;
	tomodel.facebook_id = data.id;
	tomodel.first_name = data.first_name;
	tomodel.last_name = data.last_name;
	tomodel.image_url = data.picture;
	user_model.insert_user_facebook(tomodel,function(err,rows){
		var user_id = rows.insertId;
		get_user(req, res, user_id);
	});
}

function get_user(req, res, user_id) {
	tomodel.user_id = user_id;
	user_model.select_user(tomodel,function(err,rows){
		login(req, res, rows[0]);
	});
}

function facebook_user_validations(data) {
	var validation_array = {};
	console.log(data);
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
