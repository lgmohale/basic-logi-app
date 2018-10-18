const mongoose = require('mongoose');
let validator = require('validator');
const bcrypt = require('bcrypt');
mongoose.set('debug', true);
mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true });

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
        required:true
    }
});


//autheticate a user before loging
// userSchema.statics.authenticate = function(email, password, callback){
//     users.findOne({email:email})
//     .exec(function(err,user){
//         if(err){
//             return callback(err)

//         }else if(!user){
//             var err = new Error('User not found');
//             err.status = 401;
//             return callback(err);

//         }
//         bcrypt.compare(password,user.password, function(err, result){
//             if(result == true){
//                 return callback(null, user);

//             }else{
//                 return callback();
//             }
//         })
//     })
// }

//heashes password before it stores in the database
userSchema.pre('save',function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err)

        }
        user.password = hash;
        next();
    });
});

var users = mongoose.model('users', userSchema);
module.exports = users;