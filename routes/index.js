var express = require('express');
var router = express.Router();
var session = require('express-session');
var flash = require('express-flash-messages');
const bcrypt = require('bcrypt');
var db = require('../models');



router.post('/add',  function(req,res){

        var newUser = req.body;
        console.log(newUser);
        db.findOne({email: req.body.email}, function(err, user){
            if(err || user){
                console.log('user already exists, please lopg in')
            }
            else{
                db.create(newUser)
                .then(NewUsers => {
                //res.redirect('/login.html');
                console.log("new user added");
                console.log(newUsers);
                //return res.redirect('/login')
            
            })
            .catch(err=>{
                res.send(err);
            });
        }
    });
});

router.post('/login',  function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    db.findOne({email: email}, function(err, user){
        console.log(user.name);
        if(err || !user){
            console.log("user not found")
        }
        else{
            bcrypt.compare(password, user.password, function(err, results){
                if(results == true){
                    console.log('user exists and credentials are correct ');
                    req.session.user = user;
                    req.session.user.loggedIn = true;
                    console.log(`session created ${req.session.user}`);
                    console.log('authentification successfull', req.session.user.loggedIn);
                    res.send({userDetails:req.session.user});
                }else{
                    console.log('Incorrect password')
                   res.send({msg:"Oops wrong password or email",error: err});
                }
            });
        }
    });
});

router.get('/isUserLoggin', function(req,res){
    if(!req.session.user){
       res.send({resp: false})
    }
    else{
      res.send({resp: true})
    }
});

module.exports = router;