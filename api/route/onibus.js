var db = require('../config/mongo_database');

var publicFields = '_id numero nome bairro itinerarios created';


exports.create = function (req, res) {
	var onibusReq = req.body.onibus ||  '';
	
	console.log(onibusReq);

	if (onibusReq.numero == '' || onibusReq.nome == '' || onibusReq.bairro == '' ) {
		return res.send(400);
	}

	var onibus = new db.onibusModel();
	onibus.numero = onibusReq.numero;
	onibus.nome = onibusReq.nome;
	onibus.bairro = onibusReq.bairro;
	onibus.itinerarios = onibusReq.itinerarios;

	onibus.save(function (err) {
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

	var query = db.onibusModel.findOne({ _id: id });
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

	var onibus = req.body.onibus;

	if (onibus == null || onibus._id == null) {
		res.send(400);
	}

	var updateOnibus = {};

	updateOnibus.numero = onibus.numero;
	updateOnibus.nome = onibus.nome;
	updateOnibus.bairro = onibus.bairro;
	updateOnibus.itinerarios = onibus.itinerarios;

	db.onibusModel.update({ _id: onibus._id }, updateOnibus, function (err, nbRows, raw) {
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

	var query = db.onibusModel.findOne({ _id: id });

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

	var query = db.onibusModel.find();
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}
		  
  		return res.json(200, results);
	});
};
