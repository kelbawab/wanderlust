var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'us-cdbr-iron-east-04.cleardb.net',
//     user     : 'b657486ddf60b2',
//     password : '33911054',
//     database : 'ad_f47af548feb67bb'
// });
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wunderlust_db',
    password : 'Hja99_2a..1@',
    database : 'wunderlust'
});

connection.connect(function(err) {
    if (err) {
    	console.error('Error connecting: ' + err.stack);
    	return;
	}
	console.log('Connection established');
});

module.exports = connection;