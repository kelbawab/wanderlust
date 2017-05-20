var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     port     : '3306',
//     user     : 'root',
//     password : 'root',
//     database : 'wanderlust'
// });
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'wunderlust_db',
//     password : 'Hja99_2a..1@',
//     database : 'wunderlust'
// });

// var connection = mysql.createPool({
// 	connectionLimit : 10,
//     host     : 'us-cdbr-iron-east-04.cleardb.net',
//     port     : '3306',
//     user     : 'b657486ddf60b2',
//     password : '33911054',
//     database : 'ad_f47af548feb67bb'
// });

// var connection = mysql.createPool({
// 	connectionLimit : 10,
//     host     : 'localhost',
//     port     : '3306',
//     user     : 'root',
//     password : '',
//     database : 'ad_f47af548feb67bb'
// });

var connection = mysql.createPool({
	connectionLimit : 10,
    host     : '139.162.191.140',
    port     : '3306',
    user     : 'wanderlust',
    password : 'Wa123456..',
    database : 'wanderlust'
});


// connection.connect(function(err) {
//     if (err) {
//     	console.error('Error connecting: ' + err.stack);
//     	return;
// 	}
// 	console.log('Connection established');
// });

module.exports = connection;