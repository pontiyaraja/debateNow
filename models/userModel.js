var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userModel = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    fbId: {
        type: String
    },
    channels: {
        type: Array
    },
    adminchannels: {
        type: Array
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userModel);
