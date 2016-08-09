/**
 * New node file
 */
var UserChannel = require("../models/userchannelModel");
var User = require("../models/userModel");
var channelController = function(Channel){
    var post = function(req, res){
        var channel = new Channel(req.body);
        console.log(channel);

        if(!req.body.channelname){
            res.status(400);
            res.send('channel name is required');
        } else {
            channel.save();
            var uChannel = new UserChannel;
            uChannel.userId = req.body.admin;
            uChannel.channelId = channel._id;
            uChannel.channelname = channel.channelname;
            uChannel.admin = true;
            uChannel.save();
            updateUserAdminChannels(req.body.admin, channel._id);
            res.status(201);
            res.send(channel);
        }
    };
    
    var subscribe = function(req, res){
        var channel = new Channel(req.body);
        console.log(channel);

        if(!req.body.channelname){
            res.status(400);
            res.send('channel name is required');
        } else {
            var uChannel = new UserChannel;
            uChannel.userId = req.body.userId;
            uChannel.channelId = channel._id;
            uChannel.channelname = channel.channelname;
            uChannel.admin = false;
            uChannel.subscribe = true;
            
            var productToUpdate = {};
            productToUpdate = Object.assign(productToUpdate, user._doc);
            delete productToUpdate._id;            
            
            updateUserChannel(req.body.userId, channel._id);
            res.status(201);
            res.send(channel);
        }
    };

    var get = function(req, res){
        var query = {};

        if(req.query.channelname){
            query.channelname = req.query.channelname;
        }
        console.log(query);

        Channel.find(query, function(err, channels){
            if(err){
                res.status(500).send(err);
            } else {

                var returnChannels = [];

                channels.forEach(function(element, index, array){
                    var newChannel = element.toJSON();
                    newChannel.links = {};
                    newChannel.links.self =  'http://' + req.headers.host + '/api/channel/' + newChannel._id;
                    returnChannels.push(newChannel);
                });
                res.json(returnChannels);
            }
        });
    };

    return {
        post: post,
        get: get,
        subscribe: subscribe,
    };

};

function updateUserAdminChannels(userId, channelId){
	var query = {};
	console.log(userId, channelId)
    if(userId != null){
        query._id = userId;
    }
    var newUser = null;
    User.find(query, function(err, users){
        if(err){
            res.status(500).send(err);
        } else {
        	users.forEach(function(element, index, array){
                newUser = element.toJSON();
                /*newChannel.links = {};
                newChannel.links.self =  'http://' + req.headers.host + '/api/user/' + newChannel._id;*/
                console.log(newUser)
            });
        	//console.log(newUser)
        	newUser.adminchannels.push(channelId);
        	
        	var user = new User;
            user.username = newUser.username;
            user.password = newUser.password;
            user.email = newUser.email;
            user.phone = newUser.phone;
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.fbId = newUser.fbId;
            user.channels = newUser.channels;
            user.adminchannels = newUser.adminchannels;

            //user.save();
            var productToUpdate = {};
            productToUpdate = Object.assign(productToUpdate, user._doc);
            delete productToUpdate._id;

            User.findOneAndUpdate({_id: newUser._id}, productToUpdate, 
                                   {upsert: true}, function (err) {
              if (err)  console.log(err)
              console.log("updated")

            });
        }
    });

}

function updateUserChannel(userId, channelId){
	var query = {};
	console.log(userId, channelId)
    if(userId != null){
        query._id = userId;
    }
    var newUser = null;
    User.find(query, function(err, users){
        if(err){
            res.status(500).send(err);
        } else {
        	users.forEach(function(element, index, array){
                newUser = element.toJSON();
                /*newChannel.links = {};
                newChannel.links.self =  'http://' + req.headers.host + '/api/user/' + newChannel._id;*/
                console.log(newUser)
            });
        	//console.log(newUser)
        	newUser.channels.push(channelId);
        	
        	var user = new User;
            user.username = newUser.username;
            user.password = newUser.password;
            user.email = newUser.email;
            user.phone = newUser.phone;
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.fbId = newUser.fbId;
            user.channels = newUser.channels;
            user.adminchannels = newUser.adminchannels;

            //user.save();
            var productToUpdate = {};
            productToUpdate = Object.assign(productToUpdate, user._doc);
            delete productToUpdate._id;

            User.findOneAndUpdate({_id: newUser._id}, productToUpdate, 
                                   {upsert: true}, function (err) {
              if (err)  console.log(err)
              console.log("updated")

            });
        }
    });

}

module.exports = channelController;
