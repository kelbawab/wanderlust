module.exports = function(app){

	//Controllers++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var authentication_controller = require('../controllers/authentication');
	var activities_controller = require('../controllers/activities');
	var activity_controller = require('../controllers/activity');
	var favourite_controller = require('../controllers/favourite');
	var unfavourite_controller = require('../controllers/unfavourite');
	var block_controller = require('../controllers/block');
	var unblock_controller = require('../controllers/unblock');
	var report_controller = require('../controllers/report');
	var user_controller = require('../controllers/user');
	var city_controller = require('../controllers/city');
	var users_city_controller = require('../controllers/users_city');
	var users_activity_controller = require('../controllers/users_activity');
	var users_city_activity_controller = require('../controllers/users_city_activity');
	var user_preferences_controller = require('../controllers/user_preferences');
	var nearby_controller = require('../controllers/nearby');
	var fly_controller = require('../controllers/fly');
	var country_controller = require('../controllers/country');
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	//Middlewares++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var user_middleware = require('../middlewares/user');
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	//Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	app.post('/facebook_login', authentication_controller.facebook_login);
	app.get('/check_token/:token', authentication_controller.check_token);
	app.get('/user/activities/get', user_middleware.user_check_sign_in, activities_controller.get);
	app.post('/user/users_activity/post', user_middleware.user_check_sign_in, users_activity_controller.post);
	app.get('/user/get', user_middleware.user_check_sign_in, user_controller.get);
	app.post('/user/update_location', user_middleware.user_check_sign_in, user_controller.update_location);
	app.post('/user/get_nearby_users', user_middleware.user_check_sign_in, nearby_controller.get);
	app.post('/user/get_users_by_city', user_middleware.user_check_sign_in, fly_controller.get);
	app.get('/get_countries', user_middleware.user_check_sign_in, country_controller.index);

	app.post('/user/activities/post', activities_controller.post);
	app.get('/user/activity/get/:id', activity_controller.get);
	app.post('/user/activity/post', activity_controller.post);
	app.post('/user/favourite/post', favourite_controller.post);
	app.post('/user/unfavourite/post', unfavourite_controller.post);
	app.post('/user/block/post', block_controller.post);
	app.post('/user/unblock/post', unblock_controller.post);
	app.post('/user/report/post', report_controller.post);
	app.get('/user/favourite/index', favourite_controller.index);
	app.get('/user/block/index', block_controller.index);

	
	app.get('/user/index', user_controller.index);
	app.get('/user/city/index', city_controller.index);
	app.get('/user/users_city/get/:city_id', users_city_controller.get);
	
	app.post('/user/users_city_activity/get', users_city_activity_controller.get);
	
	app.get('/user/city/search/:limit/:query', city_controller.search);
	app.get('/user/city/index_limit/:limit', city_controller.index_limit);
	app.get('/user/users_city_activity/search/:city_id/:activity_id/:limit/:query', users_city_activity_controller.search);
	app.post('/user/users_city_activity/search_city/:city_id/:limit/:query', users_city_activity_controller.search_city);
	app.post('/user/put', user_controller.put);
	app.get('/user/preferences/index', user_preferences_controller.index);
	app.post('/user/discoverable/post', user_preferences_controller.discoverable_post);
	app.post('/user/radius/post', user_preferences_controller.radius_post);
	app.post('/user/show_distance/post', user_preferences_controller.show_distance_post);
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}