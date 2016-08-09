var Channel = require("../models/channelModel");
var userController = function(User){
    var post = function(req, res){
        var user = new User(req.body);
        console.log(user);

        if(!req.body.userId){
            res.status(400);
            res.send('user id is required');
        } else {
            user.save();
            res.status(201);
            res.send(user);
        }
    };


    var get = function(req, res){
        var query = {};

        if(req.query.username && req.query.password){
            query.username = req.query.username;
            query.password = req.query.password;
            
//            User.find(query, function(err, users){
//                if(err){
//                    res.status(500).send(err);
//                } else {
//
//                    var returnUsers = [];
//                    var i = 0;
//                    users.forEach(function(element, index, array){
//                        var newUser = element.toJSON();
//                         getUserChannels(newUser._id, function(data){
//                        	//console.log(data);
//                        	if(newUser._id == data.admin){
//                         	   newUser.adminchannels.push(data._id);
//    	                    } else if(data.agree.indexOf(newUser._id) > -1 || data.disagree.indexOf(newUser._id) > -1){
//    	                    	newUser.channels.push(data._id);
//    	                    }                   
//    	                     newUser.links = {};
//    	                     newUser.links.self =  'http://' + req.headers.host + '/api/user/' + newUser._id;
//    	                     returnUsers.push(newUser);
//    	                     res.json(returnUsers);
//                         });                                           
//                    });                    
//                }
//            });
        }else{
        	User.find(query, function(err, users){
                if(err){
                    res.status(500).send(err);
                } else {
                    var returnUsers = [];
                    users.forEach(function(element, index, array){
                        var newUser = element.toJSON();
                             newUser.links = {};
    	                     newUser.links.self =  'http://' + req.headers.host + '/api/user/' + newUser._id;
    	                     returnUsers.push(newUser);                                           
                    });
                    res.json(returnUsers);
                }
            });
        }

        
    };

    return {
        post: post,
        get: get
    };

};

function getUserChannels(userId, callback){
			var query = {};

		    if(userId != null){
		        query.admin = userId;
		    }
		    var newChannel = null;
		    Channel.find(query, function(err, channels){
		        if(err){
		            res.status(500).send(err);
		        } else {       	
		            console.log(userId);
		            console.log(query.admin);
		        	channels.forEach(function(element, index, array){
		                newChannel = element.toJSON();
		                /*newChannel.links = {};
		                newChannel.links.self =  'http://' + req.headers.host + '/api/user/' + newChannel._id;*/                
		            });
		        }
		        //console.log('---', newChannel);        
		        if(newChannel == null){
		        	//console.log('====', newChannel);  
		        	query = {};
		        	var channeldata = null;
		        	Channel.find(query, function(err, channels){
		                if(err){
		                    res.status(500).send(err);
		                } else {       	
		                    console.log(userId);               
		                	channels.forEach(function(element, index, array){
		                		channeldata = element.toJSON();
		                        if(channeldata.agree.indexOf(userId) > -1 || channeldata.disagree.indexOf(userId) > -1){
		                        	newChannel = channeldata;
		                        }
		                        /*newChannel.links = {};
		                        newChannel.links.self =  'http://' + req.headers.host + '/api/user/' + newChannel._id;*/                
		                    });
		                }
		            });    	
		        }
		        //console.log('#####', newChannel);
		        callback(newChannel);
		        //return newChannel;
		    });
	
}

module.exports = userController;
