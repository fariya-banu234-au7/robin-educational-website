// importing packages
import express from 'express';
import passport from 'passport'

// password hasshing file
import crypting from "../middlewares/hassing/bcrypt.js"

// controller file
import userController from '../controllers/user.controller.js'

// validation files
import  validators  from '../middlewares/validator/requestValidator.js';
import userAutherized from "../middlewares/authorization/userAutherized.js";
import checkPassword from '../middlewares/authorization/checkPassword.js';

// multer upload middleware
import { multerUploads, imageErrorHandler } from "../middlewares/uploader/multer.js";


const userRoute = express.Router();

// sigin
userRoute.post(
    "/signin", 
    validators.bodyChecker,
    validators.siginError,
    crypting,
    userController.signin
);

// login
userRoute.post(
    "/login",
    passport.authenticate('local', {failureRedirect: '/login?failed=true'}),
    userController.login
);

// verify email
userRoute.get(
    "/verify/:key",
    userController.verify
);

// user update
userRoute.post(
    '/update',
    userAutherized,
    validators.checkForOne,
    validators.updateBodyChecker,
    validators.updateError,
    crypting,
    checkPassword,
    userController.update
);

// user details
userRoute.get(
    '/details',
    userAutherized,
    userController.details
);

// user home page
userRoute.get(
    '/home',
    userAutherized,
    userController.home
);

// logout
userRoute.get(
    '/logout',
    userAutherized,
    userController.logout
);

// delete 
userRoute.get(
    '/delete',
    userAutherized,
    userController.delete
);

// forget password
userRoute.post(
    '/forgetPassword',
    userController.forgetPassword
);

// make new password
userRoute.post(
    '/makePassword',
    validators.keyNpassword,
    validators.keyError,
    crypting,
    userController.makePassword
);

// upload pic
userRoute.post(
    '/file',
    userAutherized,
    multerUploads,
    imageErrorHandler,
    userController.file
);

// ask question
userRoute.get(
    '/askMe',
    userAutherized,
    userController.askMe
)



export default userRoute;