/**
 * New node file
 */
var express = require('express');

var channelRoutes = function(Channel){

    var channelRouter = express.Router();

    var channelController = require('../Controllers/channelController')(Channel);

    channelRouter.route('/')
        .post(channelController.post)
        .get(channelController.get);

    channelRouter.use('/:channelId', function(req, res, next){
        if(req.query.channelname){
            query.channelname = req.query.channelname;
        }

        Channel.findById(req.params.channelId, function(err, channel){
            if(err){
                res.status(500).send(err);
            } else if (channel) {
                req.channel = channel;
                next();
            } else {
                res.status(404).send('no channel found');
            }
        });
    });


    channelRouter.route('/:channelId')
        .get(function(req, res){
            var returnChannel = req.channel.toJSON();
            returnChannel.links = {};
            var newLink = 'http://' + req.headers.host + '/api/user/?channelname=' + returnChannel.channelname;
            returnChannel.links.filterByThisEmail = newLink.replace(' ', '%20');
            res.json(returnChannel);
        }
    )
    .put(function(req, res){
    	var channel = new Channel;
        channel.channelname = req.body.channelname;
        channel.channeltype = req.body.channeltype;
        channel.description = req.body.description;
        channel.admin = req.body.admin;
        channel.agree = req.body.agree;
        channel.disagree = req.body.disagree;
        
        channel.save(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.channel);
            }
        });
    })
    .patch(function(req, res){
        if(req.body._id){
            delete req.body._id;
        }

        for(var p in req.body){
            req.channel[p] = req.body[p];
        }

        req.channel.save(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.channel);
            }

        });

    })
    .delete(function(req, res){
        req.channel.remove(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    });

    return channelRouter;

};


module.exports = channelRoutes;
