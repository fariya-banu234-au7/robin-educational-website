import express from 'express';
import passport from 'passport';

// google Passport File
import "../middlewares/passportValidation/passportGoogle.js";

// creating route
const googleRoute = express.Router();

// getting user data from google
googleRoute.get(
    '/',
    passport.authenticate('google', {scope: ['profile', 'email']}
));

// authenticating user
googleRoute.get(
    '/callback',
    passport.authenticate('google', {failureRedirect: '/', successRedirect: '/users/home'}
));


export default googleRoute;