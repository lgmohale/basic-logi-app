var express = require('express');
var router = express.Router();
var db = require('../models');



router.post('/add', function(req,res){
    var newUser = req.body;
    db.create(newUser)
    .then(NewUsers=>{
        res.redirect('/login.html');
        console.log("new user created");
    })
    .catch(err=>{
        res.send(err);
    })
});

module.exports = router;