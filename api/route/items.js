var db = require('../config/mongo_database');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var redisClient = require('../config/redis_database').redisClient;
var tokenManager = require('../config/token_manager');

var publicFields = '_id atribute1 atribute2 created';

exports.create = function (req, res) {
	var atribute1 = req.body.atribute1 ||  '';
	var atribute2 = req.body.atribute2 ||  '';

	if (atribute1 == '' || atribute2 == '') {
		return res.send(400);
	}

	var item = new db.itemModel();
	item.atribute1 = atribute1;
	item.atribute2 = atribute2;

	item.save(function (err) {
		if (err) {
			console.log(err);
			return res.send(500);
		}
	})
	return res.send(200);
};

exports.read = function (req, res) {

	var id = req.params.id || '';
	if (id == '')  {
		return res.send(400);
	}

	var query = db.itemModel.findOne({ _id: id });
	query.select(publicFields);
	query.exec(function (err, result) {
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

exports.update = function (req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var item = req.body.item;

	if (item == null || item._id == null) {
		res.send(400);
	}

	var updateItem = {};

	updateItem.atribute1 = item.atribute1;
	updateItem.atribute2 = item.atribute2;

	db.itemModel.update({ _id: item._id }, updateItem, function (err, nbRows, raw) {
		return res.send(200);
	});
};

exports.delete = function (req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var id = req.params.id;
	if (id == null ||  id == '') {
		res.send(400);
	}

	var query = db.itemModel.findOne({ _id: id });

	query.exec(function (err, result) {
		if (err)  {
			console.log(err);
			return res.send(400);
		}

		if (result != null) {
			result.remove();
			return res.send(200);
		}
		else {
			return res.send(400);
		}

	});
};

exports.list = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var query = db.itemModel.find();
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}
		  
  		return res.json(200, results);
	});
};
