import passport from 'passport';
import pkg from 'passport-local';
const { Strategy } = pkg;

// model
import userModel from "../../models/user.model.js";

// stratey
const startegy = new Strategy({usernameField: 'email'}, async(email, password, done) => {
    try{
        const user = await userModel.findOne({email});

        // checking user
        if(!user) return done(null, false);
        
        // checking password
        const isCorrect = await user.isCorrectPassword(password)
        if(!isCorrect) return done(null, false)

        // checking if user email is verified
        if(!user.active) return done(null, false)

        // everything is good
        done(null, user);

    } catch(err){
        done(err, false);
    }
});

const localStrategy = (passport) => {
    passport.use(startegy);

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        userModel.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

export default localStrategy;