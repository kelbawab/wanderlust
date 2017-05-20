model 					= require('./model');
var user_messages_model 			= function(){ };
user_messages_model.prototype.constructor  	= user_messages_model;
user_messages_model.prototype     		= model;
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

user_messages_model.prototype.select_all_users_messages = function(data, callback) {
	sql = "SELECT u.id, u.first_name, u.last_name, u.image_url, message_table.* FROM (SELECT last_messages_table.sender_id, last_messages_table.receiver_id, last_messages_table.message_text, last_messages_table.last_message_date, COALESCE(new_messages_table.counter_unseen_messages,0) AS counter_unseen_messages FROM (SELECT um.sender_id, um.receiver_id, um.message_text, last_messages_date_table.last_message_date FROM (SELECT * FROM `user_messages` WHERE receiver_id = " + data.user_id + " OR sender_id =" + data.user_id + ") um INNER JOIN ( SELECT MAX(created_at) AS last_message_date FROM `user_messages` WHERE receiver_id = " + data.user_id + " OR sender_id =" + data.user_id + " GROUP BY CASE WHEN sender_id >receiver_id THEN receiver_id ELSE sender_id END ,CASE WHEN sender_id < receiver_id THEN receiver_id ELSE sender_id END ) last_messages_date_table ON last_messages_date_table.last_message_date = um.created_at) last_messages_table LEFT JOIN (SELECT *, count(seen) AS counter_unseen_messages From user_messages WHERE receiver_id = " + data.user_id + " AND seen = 0 GROUP BY sender_id) new_messages_table ON last_messages_table.sender_id = new_messages_table.sender_id AND last_messages_table.receiver_id = new_messages_table.receiver_id) message_table LEFT JOIN `user` u ON message_table.sender_id = u.id OR message_table.receiver_id = u.id WHERE u.id <> " + data.user_id + " ORDER BY message_table.last_message_date DESC";
	this.execute(sql,callback);
}

user_messages_model.prototype.select_one_to_one_messages = function(data, callback) {
	sql = "SELECT * FROM `user_messages` WHERE (sender_id = " + data.user_id + " AND receiver_id = " + data.receiver_id + ") OR (sender_id = " + data.receiver_id + " AND receiver_id = " + data.user_id + ") ORDER BY created_at ASC";
	this.execute(sql,callback);
}

user_messages_model.prototype.update_seen_messages = function(data, callback) {
	sql = "UPDATE `user_messages` SET seen = 1 WHERE (sender_id = " + data.receiver_id + " AND receiver_id = " + data.user_id + ")";
	this.execute(sql,callback);
}

user_messages_model.prototype.insert_new_message = function(data, callback) {
	sql = "INSERT INTO `user_messages` (sender_id, receiver_id, message_text, seen, created_at) VALUES (" + data.user_id + ", " + data.receiver_id + ", '" + data.message_text + "', 0, now())";
	this.execute(sql,callback);
}

module.exports = new user_messages_model();