var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var loginModel = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Login', loginModel);
