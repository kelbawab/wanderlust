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
	var chat_controller = require('../controllers/chat');
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	//Middlewares++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	var user_middleware = require('../middlewares/user');
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	//Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	app.post('/signup', authentication_controller.sign_up);
	app.post('/login', authentication_controller.normal_login);
	app.post('/facebook_login', authentication_controller.facebook_login);
	app.get('/check_token/:token', authentication_controller.check_token);
	app.get('/user/activities/index', user_middleware.user_check_sign_in, activities_controller.index);
	app.post('/user/activities/get', user_middleware.user_check_sign_in, activities_controller.get);
	app.post('/user/users_activity/post', user_middleware.user_check_sign_in, users_activity_controller.post);
	app.get('/user/get', user_middleware.user_check_sign_in, user_controller.get);
	app.post('/user/update_location', user_middleware.user_check_sign_in, user_controller.update_location);
	app.post('/user/get_nearby_users', user_middleware.user_check_sign_in, nearby_controller.get);
	app.post('/user/get_users_by_city', user_middleware.user_check_sign_in, fly_controller.get);
	app.get('/user/country/index', user_middleware.user_check_sign_in, country_controller.index);
	app.post('/user/update', user_middleware.user_check_sign_in, user_controller.update);
	app.get('/user/city/index', user_middleware.user_check_sign_in, city_controller.index);
	app.get('/user/chat/index', user_middleware.user_check_sign_in, chat_controller.index);
	app.post('/user/chat/get', user_middleware.user_check_sign_in, chat_controller.get);
	app.post('/user/chat/post', user_middleware.user_check_sign_in, chat_controller.post);
	app.post('/user/update_show_distance', user_middleware.user_check_sign_in, user_controller.update_show_distance);
	app.post('/user/update_discoverable', user_middleware.user_check_sign_in, user_controller.update_discoverable);
	app.post('/user/update_radius', user_middleware.user_check_sign_in, user_controller.update_radius);
	app.post('/user/favourite/get', user_middleware.user_check_sign_in, favourite_controller.get);
	app.post('/user/favourite/post', user_middleware.user_check_sign_in, favourite_controller.post);
	app.post('/user/unfavourite/post', user_middleware.user_check_sign_in, unfavourite_controller.post);
	app.get('/user/favourite/index', user_middleware.user_check_sign_in, favourite_controller.index);
	app.get('/user/unfavourite/index', user_middleware.user_check_sign_in, unfavourite_controller.index);


	app.get('/user/test', user_controller.test);

	app.post('/user/activities/post', activities_controller.post);
	app.get('/user/activity/get/:id', activity_controller.get);
	app.post('/user/activity/post', activity_controller.post);
	
	app.post('/user/block/post', block_controller.post);
	app.post('/user/unblock/post', unblock_controller.post);
	app.post('/user/report/post', report_controller.post);
	
	app.get('/user/block/index', block_controller.index);

	
	app.get('/user/index', user_controller.index);
	
	app.get('/user/users_city/get/:city_id', users_city_controller.get);
	
	app.post('/user/users_city_activity/get', users_city_activity_controller.get);
	
	app.get('/user/city/search/:limit/:query', city_controller.search);
	app.get('/user/city/index_limit/:limit', city_controller.index_limit);
	app.get('/user/users_city_activity/search/:city_id/:activity_id/:limit/:query', users_city_activity_controller.search);
	app.post('/user/users_city_activity/search_city/:city_id/:limit/:query', users_city_activity_controller.search_city);

	app.get('/user/preferences/index', user_preferences_controller.index);
	app.post('/user/discoverable/post', user_preferences_controller.discoverable_post);
	app.post('/user/radius/post', user_preferences_controller.radius_post);
	app.post('/user/show_distance/post', user_preferences_controller.show_distance_post);
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

}