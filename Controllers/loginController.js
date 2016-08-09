var User = require("../models/userModel");
var loginController = function(Login){
    var post = function(req, res){
        var login = new Login(req.body);
        console.log(login);

        if(!req.body.username){
            res.status(400);
            res.send('User name is required');
        } else {
        	var query = {};

            if(req.query.username && req.query.password){
                query.username = req.query.username;
                query.password = req.query.password;
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
        }
    };


    var get = function(req, res){
        var query = {};

        if(req.query.username && req.query.password){
            query.username = req.query.username;
            query.password = req.query.password;
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
                    res.json(null);
                }
            });
        }
    };    
    

    return {
        post: post,
        get: get
    };

};

module.exports = loginController;
