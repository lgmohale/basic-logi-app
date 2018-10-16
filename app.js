var express = require('express');
var app = express();
var serv = require('http').Server(app);
var server;
var db = require('./routes');
var bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/views'));

app.get('/', function(req,res){
    res.sendFile("index.html");
})

app.get('/user', function(req,res){
    res.sendFile("login.html");
})
app.use('/user', db);
var serv= app.listen(process.env.PORT || 4000);
 console.log("Server started.");