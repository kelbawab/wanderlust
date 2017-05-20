controller 					= require('./controller');

function fly(){
	tomodel = {};
	
};
fly.prototype.constructor = fly;

fly.prototype.get =  function(req, res) {
	tomodel.city_id = req.body.city_id;
	tomodel.user_id = req.session.user_id;
	user_model.get_users_by_city(tomodel, function(err, rows) {
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

module.exports = new fly();
