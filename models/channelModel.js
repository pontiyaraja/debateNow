var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var channelModel = new Schema({
	channelname: {
        type: String
    },
    channeltype: {
        type: String
    },
    description: {
        type: String
    },
    admin: {
        type: String
    },
    ratings: {
        type: String
    },
    status: {
        type: String
    },
    agree: {
        type: Array
    },
    disagree: {
        type: Array
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Channel', channelModel);
