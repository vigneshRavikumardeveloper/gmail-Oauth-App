const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

const User=require('../models/user-model');
console.log(`Passport up`);

passport.serializeUser((user,done)=>{
    console.log(`Serializing user`);
    console.log(user);
    done(null,user._id);
});


passport.deserializeUser((id,done)=>{
    console.log(`Deserializing user`);
    console.log(id);
    User.findById(id,(err,user)=>{
        if(err){
            done(err);
        }
        else{
            done(err,user);
        }
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL:'/auth/google/redirect'
    }, (accesstoken,refreshtoken,profile,done) => {
        console.log('passport callback function fired...');
        console.log(profile);

        User.findOne({googleId:profile.id}).then((userdata)=>{
            if(userdata){
                console.log(`Existing Data:`+userdata);
                done(null,userdata);
            }
            else{
                console.log(`User is not available in DB.I'm going to create...`);
                new User({
                    username:profile.displayName,
                    googleId:profile.id,
                    thumbnail:profile._json.image.url
                }).save().then((userdata)=>{
                    console.log("Data is saved:"+userdata);
                    done(null,userdata);
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }).catch((err)=>{
            console.log(err);
        }); 
    })
);

console.log(`Passport down`);