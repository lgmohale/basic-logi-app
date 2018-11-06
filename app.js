var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
var flash = require('connect-flash');
var serv = require('http').Server(app);
var server;
var db = require('./routes');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:'225lokokl', resave: false, saveUninitialized:true}));

app.use(express.static(__dirname + '/views'));

app.get('/', function(req,res){
    res.sendFile("index.html");
});

app.use('/user', db);
var serv= app.listen(process.env.PORT || 4008);
 console.log("Server started. 4008");

