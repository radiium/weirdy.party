var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var log      = require('winston');

// Define User schema
var userSchema = mongoose.Schema({  
    username: String,
    password: String,
});

// Generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Create and export mongoose model
module.exports = mongoose.model('User', userSchema);