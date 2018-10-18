var express = require('express');
var router = express.Router();
var flash = require('express-flash-messages');
var db = require('../models');



router.post('/add', function(req,res){

        var newUser = req.body;
        console.log(newUser);
        db.create(newUser)
        .then(NewUsers => {
           //res.redirect('/login.html');
            console.log("new user created");
            console.log(newUsers);
            
        })
        .catch(err=>{
            res.send(err);
        })
});

module.exports = router;