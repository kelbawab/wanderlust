controller 					= require('./controller');

function chats(){
	tomodel = {};
	user_messages_model 	= require('../models/user_messages_model');
};
chats.prototype.constructor = chats;

chats.prototype.get =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.receiver_id = req.body.receiver_id;
	user_messages_model.update_seen_messages(tomodel, function(err,rows){
		get_one_to_one_messages(req, res);
	});
}

function get_one_to_one_messages(req, res) {
	user_messages_model.select_one_to_one_messages(tomodel, function(err,rows){
		var result = res.locals;
		var last_id = -1;
		var flag = true;
		var messages = rows.map(function(message) { 
			
			message['sent'] = false;
			if(message['sender_id'] == tomodel.user_id) {
				message['sent'] = true;
			}

			message['first'] = true;
			if(last_id == message['sender_id']){
				message['first'] = false;
			}
			last_id = message['sender_id'];
			
			return message;
		});
		result['messages'] = messages;
		result['code'] = '200';
		res.send(result);
	});
}

chats.prototype.post =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	tomodel.receiver_id = req.body.receiver_id;
	tomodel.message_text = req.body.message_text;
	user_messages_model.insert_new_message(tomodel, function(err,rows){
		var result = res.locals;
		result['code'] = '200';
		res.send(result);
	});
}

chats.prototype.index =  function(req, res) {
	tomodel.user_id = req.session.user_id;
	user_messages_model.select_all_users_messages(tomodel, function(err,rows){
		var result = res.locals;
		var chats = rows.map(function(chat) {
			var date = formatDate(chat['last_message_date']);
			var time = formatAMPM(chat['last_message_date']);
			chat['date'] = date;
			chat['time'] = time;
			if(new Date().setHours(0,0,0,0) == chat['last_message_date'].setHours(0,0,0,0)) {
				chat['last_message_date'] = time;
			}
			else {
				chat['last_message_date'] = date;
			}
			return chat;
		});
		result['chats'] = chats;
		result['code'] = '200';
		res.send(result);
	});
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

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

module.exports = new chats();
