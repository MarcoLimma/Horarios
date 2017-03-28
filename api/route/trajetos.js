var requester = require('../config/request_manager');

exports.externalRequest = function (req, res) {
	requester.get(req, res);
};