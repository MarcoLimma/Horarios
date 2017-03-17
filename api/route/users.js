var db = require('../config/mongo_database');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var redisClient = require('../config/redis_database').redisClient;
var tokenManager = require('../config/token_manager');

var publicFields = '_id username password created is_admin';

exports.signin = function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';

	if (username == '' || password == '') { 
		return res.send(401);
	}

	db.userModel.findOne({username: username}, function (err, user) {
		if (err) {
			console.log(err);
			return res.send(401);
		}

		if (user == undefined) {
			return res.send(401);
		}

		user.comparePassword(password, function(isMatch) {
			if (!isMatch) {
				console.log("Attempt failed to login with " + user.username);
				return res.send(401);
            }

			var token = jwt.sign({id: user._id}, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION });

			return res.json({token:token, id: user.id});
		});

	});
};

exports.logout = function(req, res) {
	if (req.user) {
		tokenManager.expireToken(req.headers);

		delete req.user;
		return res.send(200);
	}
	else {
		return res.send(401);
	}
}

exports.register = function(req, res) {
	var username = req.body.username || '';
	var password = req.body.password || '';
	var passwordConfirmation = req.body.passwordConfirmation || '';

	if (username == '' || password == '' || password != passwordConfirmation) {
		return res.send(400);
	}

	var user = new db.userModel();
	user.username = username;
	user.password = password;

	user.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(500);
		}

		db.userModel.count(function(err, counter) {
			if (err) {
				console.log(err);
				return res.send(500);
			}
		});
	});
}

exports.list = function(req, res) {

	var query = db.userModel.find();

	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}
  		return res.json(200, results);
	});
};

exports.read = function(req, res){

	var id = req.params.id || '';
	if (id == '') {
		return res.send(400);
	}

	var query = db.userModel.findOne({_id: id});
	query.select(publicFields);
	query.exec(function(err, result) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		if (result != null) {
  			return res.json(200, result);
			} else {
  			return res.send(400);
  		}
	});
};
