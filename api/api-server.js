var express = require('express');
var app = express();
var jwt = require('express-jwt');
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan = require('morgan'); // logger
var tokenManager = require('./config/token_manager');
var secret = require('./config/secret');

var port = 3003

app.listen(port);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.static(__dirname + "/../webapp"))

//Routes
var routes = {};
routes.users = require('./route/users.js');
routes.onibus = require('./route/onibus.js');
routes.trajetos = require('./route/trajetos.js');
routes.pontos = require('./route/pontos.js');

//Endpoints 

//User Route

//Create a new user
app.post('/user/register', routes.users.register);

//Login
app.post('/user/signin', routes.users.signin);

//Logout
app.get('/user/logout', jwt({ secret: secret.secretToken }), routes.users.logout);

//List all users
app.get('/user/list', jwt({ secret: secret.secretToken }), routes.users.list);

//Onibus Route

//Show a onibus list
app.get('/onibus/', routes.onibus.list);

//Read a onibus
app.get('/onibus/:id', routes.onibus.read);

//Create a new onibus
app.post('/onibus/create', jwt({ secret: secret.secretToken }), routes.onibus.create);

//Update a onibus
app.put('/onibus/', jwt({ secret: secret.secretToken }), routes.onibus.update);

//Delete a onibus
app.delete('/onibus/:id', jwt({ secret: secret.secretToken }), routes.onibus.delete);

//External Request
app.get('/trajetos/externalRequest/:url', routes.trajetos.externalRequest);

//Ponto Route

//Show a ponto list
app.get('/ponto/', routes.pontos.list);

//Read a ponto
app.get('/ponto/:id', routes.pontos.read);

//Create a new ponto
app.post('/ponto/save', jwt({ secret: secret.secretToken }), routes.pontos.save);

//Update a ponto
app.put('/ponto/', jwt({ secret: secret.secretToken }), routes.pontos.update);

//Delete a ponto
app.delete('/ponto/:id', jwt({ secret: secret.secretToken }), routes.pontos.delete);

console.log('The API is starting on port ' + port);
