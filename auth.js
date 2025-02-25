const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


passport.use(new localStrategy(async(username, password, done)=>{
    try {
        const user = await Person.findOne({username:username});
        if(!user){
            return done(null, false, {message:'User Not Found'});
        }
        const isPasswordmatch = await user.comparePassword(password);
        if(isPasswordmatch){
            return done(null, user);
        }else{
            return done(null, false, {message:'Password not match'});
        }
        
    } catch (err) {
        return done(err);
    }
}))

module.exports = passport;