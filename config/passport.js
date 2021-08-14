const passport = require('passport')
const localStrategy = require('passport-local');

const dbConnection = require('./database');
const User = require('../models/user'); 
const {validatePassword} = require('./passportUtil')

const customFields = {
    usernameField:'username', 
    passwordField:'password'
}

const verifyCallback = (username, password, done)=>{
    User.findOne({username}).then(user=>{
        if(!user) return done(null, false); 
        const isValid = validatePassword(password,  user.hash. user.salt); 
        isValid ? done(null, user) : done(null, false)
    }).catch(err=>done(err))
}

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy); 

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});