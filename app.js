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

app.use(session({
    secret:'work hard',
    resave:true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());

app.use(express.static(__dirname + '/views'));

app.get('/', function(req,res){
    res.sendFile("index.html");
});

app.get('/user', function(req,res){
    res.sendFile("login.html");
})
app.use('/user', db);
var serv= app.listen(process.env.PORT || 4000);
 console.log("Server started.");

 function create_local_memory (req,res,next){
	
    if(typeof(req.session.users) === 'undefined'){
        
        req.session.users ={};
        console.log(`session created`);
        
        next()
    };
};