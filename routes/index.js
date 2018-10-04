var express = require('express');
var router = express.Router();
var db = require('../models');



router.post('/add', function(req,res){
    var newUser = req.body;
    db.create(newUser)
    .then(NewUsers=>{
        res.redirect('/login.html');
        //alert("successfully registered");
        console.log("new user created");
    });
});


module.exports = router;