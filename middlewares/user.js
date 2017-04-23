controller                  = require('../controllers/controller');

function user(){
	tomodel = {};
};
user.prototype.constructor = user;

user.prototype.user_check_sign_in = function(req, res, next) {
    var token = req.headers['authorization'].slice(7);
    var payload = controller.verifyToken(token);
    if(payload.message == "error") {
        var result = res.locals;
        result['code'] = '403';
        result['message'] = 'unauthorized';
        res.send(result);        
    }
    else if(payload.message == "succuess") {
        console.log(token);
        req.session.user_id = payload.content.data;
        next();
    }
}

module.exports = new user();