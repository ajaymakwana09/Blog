const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const adminmodel = require('../Models/adminmodel');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, done) {
        try {
            const admin = await adminmodel.findOne({ email: email });
            if (!admin) {
                console.log('User not found');
                return done(null, false, { message: 'User not found' });
            }
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                console.log('Password incorrect');
                return done(null, false, { message: 'Password incorrect' });
            }
            console.log('Authentication successful');
            return done(null, admin);
        } catch (error) {
            console.error('Error during authentication:', error);
            return done(error);
        }
    }));

// Serialize user
passport.serializeUser((admin, done) => {
    console.log('Serializing user:', admin);
    return done(null, admin.id);
});

// Deserialize user
passport.deserializeUser(async(id, done) => {
   try{
    const admin=await  adminmodel.findById(id);
    //  console.log('Deserializing user:', admin.email);
     return done(null, admin);
   }catch(err){
    done(err);
   }
});

module.exports = passport;
