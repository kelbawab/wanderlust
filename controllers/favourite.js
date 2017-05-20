controller 					= require('./controller');

function favourite(){
	tomodel = {};
	user_following_model 	= require('../models/user_following_model');
	user_following_history_model = require('../models/user_following_history_model');
};
favourite.prototype.constructor = favourite;

favourite.prototype.get =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.following_id = req.body.following_id;
	var result = res.locals;
	if(Number.isInteger(parseInt(tomodel.following_id))) {
		user_following_model.select_following(tomodel, function(err,rows){
			if(rows.length > 0) {
				result['favourite'] = true;
			}
			else {
				result['favourite'] = false;
			}
			
			result['code'] = '200';
			res.send(result);
		});
	}
	else {
		result['code'] = '403';
		res.send(result);
	}
}

favourite.prototype.post =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.following_id = req.body.following_id;
	if(Number.isInteger(parseInt(tomodel.following_id))) {
		user_following_model.insert_following(tomodel, function(err,rows){
			save_following_history(req, res);
		});
	}
	else {
		var result = res.locals;
		result['code'] = '403';
		res.send(result);
	}
}

favourite.prototype.index =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	user_following_model.select_followings(tomodel, function(err,rows){
		var data = res.locals;
		data['followings'] = [];
		if (rows.length > 0) {
			for (var i = 0; i < rows.length; i++) {
				var age = calcAge(rows[i].birth_date);
				var birthday = formatDate(rows[i].birth_date);
				rows[i]['age'] = age;
				rows[i]['birthday'] = birthday;
			}
			data['followings'] = rows;
		}
		data['code'] = '200';
		res.send(data);
	});	
}

function save_following_history(req, res) {
	tomodel.status = 1;
	user_following_history_model.insert_following_history(tomodel, function(err,rows){
		var result = res.locals;
		result['code'] = '200';
		res.send(result);
	});
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

module.exports = new favourite();
