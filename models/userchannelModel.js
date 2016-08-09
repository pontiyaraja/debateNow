/**
 * New node file
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userchannelModel = new Schema({
	userId: {
        type: String
    },
    channelId: {
        type: String
    },
	channelname: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    subscribe: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserChannel', userchannelModel);
