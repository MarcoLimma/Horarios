var config = require('./config')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var mongodbURL = 'mongodb://localhost/' + config.apiName;
var mongodbOptions = { };

mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

var Schema = mongoose.Schema;

// User schema
var User = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
});

// ônibus schema
var Onibus = new Schema({
    numero: { type: Number, required: true},
    nome: { type: String, required: true },
    bairro: { type: String, required: true },
    itinerarios: { type: Object, required: false },
    created: { type: Date, default: Date.now }
});

// ônibus schema
var Ponto = new Schema({
    localizacao: { type: Object, required: true},
    bairro: { type: String, required: false },
    created: { type: Date, default: Date.now }
});


// Bcrypt middleware on UserSchema
User.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});

//Password verification
User.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};


//Define Models
var userModel = mongoose.model('User', User);
var onibusModel = mongoose.model('Onibus', Onibus);
var pontoModel = mongoose.model('Ponto', Ponto);


// Export Models
exports.userModel = userModel;
exports.onibusModel = onibusModel;
exports.pontoModel = pontoModel;
