const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
    const UserSchema = mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            //Add user in Database
            newUser.save(callback);
        });
    });
}





// module.exports.addUser = function(newUser, callback) {
//     //Check username already exits
//     //const query = {username: newUser.username};
//     User.findOne({'username': newUser.username, 'email': newUser.email}, function(err, newUser) {
//         const user = newUser;
//         console.log(user);
//         if(newUser) {
//             //console.log("Username already exits!");
//             err = "Username or Email already exits!";
//             callback(err, newUser);
//         } else {
//             //console.log(newUser);
//             // bcrypt.genSalt(10, (err, salt) => {
//             //     bcrypt.hash(newUser.password, salt, (err, hash) => {
//             //         if(err) throw err;
//             //         newUser.password = hash;
//             //         // Add user in Database
//             //         newUser.save(callback);
//             //     });
//             // });
//         }
//     });
// }





module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}