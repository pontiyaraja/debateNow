var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var db;

if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/debateAPI_test');

} else {
    db = mongoose.connect('mongodb://localhost/debateAPI');
}

var Login = require('./models/loginModel');
var User = require('./models/userModel');
var Channel = require('./models/channelModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

loginRouter = require('./Routes/loginRoutes')(Login);
userRouter = require('./Routes/userRoutes')(User);
channelRouter = require('./Routes/channelRoutes')(Channel);

app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/channel', channelRouter);
app.use('/api/channel/subscribe', channelRouter);
// app.use('/api/authors', authorRouter);

app.get('/', function(req,res){
    console.log('Welcome to my App');
    res.send('Welcome to my App');
});

app.listen(port, function(){
    console.log('Running on Port: ' + port);
});

module.exports = app;
