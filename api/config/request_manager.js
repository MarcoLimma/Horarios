var https = require("https");


// Middleware for requests
exports.get = function (req, res) {
	//url = "http://maps.googleapis.com/maps/api/directions/json?origin=Central Park&destination=Empire State Building&sensor=false&mode=walking";

	var url = req.params.url || '';
	if (url == '') {
		return res.send(400);
	}

	var decodedUrl = decodeURIComponent(url);
	
	try
	{
		// get is a simple wrapper for request()
		// which sets the http method to GET
		var request = https.get(decodedUrl, function (response) {
			// data is streamed in chunks from the server
			// so we have to handle the "data" event    
			var buffer = "",
				data,
				route;

			response.on("data", function (chunk) {
				buffer += chunk;
			});

			response.on("end", function (err) {
				// finished transferring data
				// dump the raw data
				console.log(buffer);
				console.log("\n");
				data = JSON.parse(buffer);

				if (data != null) {
					return res.json(200, data);
				} else {
					return res.send(400);
				}
			})
		})
	}
	catch(error)
	{
		console.log("Error: " + error)
	}
	
}