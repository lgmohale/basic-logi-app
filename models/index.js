const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/users');

mongoose.Promise = Promise;

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        require:true
    }
});

var users = mongoose.model('users', userSchema);
module.exports = users;