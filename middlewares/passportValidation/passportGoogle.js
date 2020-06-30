import passport from "passport";
import pkg from 'passport-google-oauth2';
const { Strategy } = pkg;
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config/googleAuth.js";
import userModel from '../../models/user.model.js';


const config = {
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
};

// Strategy
passport.use(new Strategy( config,
// finding user in databse, if there user is not there then registering user.
   (request, accessToken, refreshToken, profile, done) => {
        // finding user
       userModel.findOne({ where: { email: profile.email } }, (err, user) => {
            if(err) return done(err, null);

            // if user not found
            if(!user){
                const newUser = new userModel({
                    name: profile.displayName,
                    email: profile.email,
                    active: true
                });

                // saving user
                newUser.save((err, user) => {
                    if(err) return done(err, null);
                    return done(null, user);
                })
            } else {
                return done(null, user);
            }
        });
    }
));