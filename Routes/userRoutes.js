/**
 * New node file
 */
var express = require('express');

var userRoutes = function(User){

    var userRouter = express.Router();

    var userController = require('../Controllers/userController')(User);

    userRouter.route('/')
        .post(userController.post)
        .get(userController.get);

    userRouter.use('/:userId', function(req, res, next){
        if(req.query.username){
            query.username = req.query.username;
        }

        User.findById(req.params.userId, function(err, user){
            if(err){
                res.status(500).send(err);
            } else if (user) {
                req.user = user;
                next();
            } else {
                res.status(404).send('no user found');
            }
        });
    });


    userRouter.route('/:userId')
        .get(function(req, res){
            var returnUser = req.user.toJSON();
            returnUser.links = {};
            var newLink = 'http://' + req.headers.host + '/api/user/?email=' + returnUser.username;
            returnUser.links.filterByThisEmail = newLink.replace(' ', '%20');
            res.json(returnUser);
        }
    )
    .put(function(req, res){
    	var user = new User;
        user.userId = req.body.userId;
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.fbId = req.body.fbId;

        user.save(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }
        });
    })
    .patch(function(req, res){
        if(req.body._id){
            delete req.body._id;
        }

        for(var p in req.body){
            req.user[p] = req.body[p];
        }

        req.user.save(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.user);
            }

        });

    })
    .delete(function(req, res){
        req.user.remove(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    });

    return userRouter;

};


module.exports = userRoutes;
