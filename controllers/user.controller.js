// importing modules
import randomString from 'randomString';

// user model
import userModel from "../models/user.model.js"
// mail file
import { sendEmail } from "../utils/mailer.js";
// mail config file
import { GMAIL_USER } from '../config/mailer.js';
// email body
import { verification, forgetPassword } from  "../utils/emailBody.js";
// file upload cloudinary
import uploadFile from '../utils/uploadPic.js';
// data to string converter
import dataToString from "../utils/dataTOstring.js";


const userController = {};

// signin
userController.signin = async (req, res, next) => {

    try {
        const user = await userModel({ ...req.body });

        // generate secret key 
        const key = randomString.generate();
        user.key = key;

        // send mail
        sendEmail(GMAIL_USER, req.body.email, 'Please verify your email', verification(key));

        // saving user
        await user.save();
        res.status(200).redirect("/login?registered=true");
    } catch (err) {
        next(err);
    }
};

// login
userController.login = async (req, res) => {
    res.status(200).render('userHome', { name: req.user.name, isAdmin: req.user.admin });
};

// verify
userController.verify = async (req, res, next) => {
    const key = req.params.key;
    try {
        const user = await userModel.findOne({ where: { key: key } });

        // check if user found
        if (!user) return res.status(404).redirect('/?found=false');

        // if user found redirect to login page
        user.active = true;
        user.key = '';
        await user.save();
        res.status(200).redirect("/login?found=true");
    } catch (err) {
        next(err);
    }
};

// update
userController.update = async (req, res, next) => {
    try {
        if (req.body.name) req.user.name = req.body.name;
        if (req.body.password) req.user.password = req.body.password;
        if (req.body.email) req.user.email = req.body.email;
        req.user = await req.user.save();
        res.status(200).redirect('/users/details?updated=true');
    } catch (err) {
        next(err)
    }
};

// user details
userController.details = (req, res) => {
    if (req.query.updated) {
        return res.status(200).render('userProfile', { updated: true, user: req.user });
    }
    res.status(200).render('userProfile', { user: req.user });
};

// home page
userController.home = (req, res) => {
    let error = false;
    if(req.query.error) error = true;
    res.status(200).render('userHome', { name: req.user.name, isAdmin: req.user.admin, error });
};

// logout
userController.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
};

// deleting account
userController.delete = async (req, res, next) => {
    try {
        await req.user.remove();
        req.logout();
        req.session.destroy();
        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};

// forget password route control
userController.forgetPassword = async (req, res, next) => {
    const email = req.body.email
    try {
        // finding user
        const user = await userModel.findOne({ where: { email: email } });

        // user not found
        if (!user) return res.status(404).redirect('/forgetPassword?notfound=true');

        // user found
        // generating key for verification
        const key = randomString.generate();
        // saving it in user db
        user.key = key;

        await user.save();

        // sending mail
        sendEmail(GMAIL_USER, email, 'FOR CREATING NEW PASSWORD', forgetPassword(key));

        res.render('emailSent');
    } catch (err) {
        next(err);
    }
};

// make password
userController.makePassword = async (req, res, next) => {
    const key = req.body.key;
    try {
        const user = await userModel.findOne({ where: { key: key } });

        // check if user found
        if (!user) {
            req.app.locals.msg = 'Key is not valid.'
            return res.status(404).redirect('/makePassword?error=true');
        }

        // if user found 
        user.key = '';
        user.password = req.body.password;
        await user.save();

        res.redirect('/login');
    } catch (err) {
        next(err);
    }
};

// upload file 
userController.file = async (req, res, next) => {
        try {
            // checking if file provided
            if(!req.file) return res.redirect('/upload?noFile=true');

            // converting file into string
            const file = dataToString(req);

            // uploading on cloudinary
            const result = await uploadFile(file);

            // saving link of file in db
            req.user.profilePicLink = result.url;
            await req.user.save()

            res.redirect('/users/details');
        } catch(err) {
            next(err);
        }
};

// ask me page 
userController.askMe = async (req, res, next) => {
    let error = false;
    if(req.query.error)  error = true;
    try {
        console.log(req.user._id);
        await userModel.findOne({ where: { id: req.user.id } })
            .populate('questions')
            // .sort('createdOn')
            .exec()
            .then(docs => {
                res.render('AskMe', {user: req.user._id, questions: docs.questions, error});
            });
    } catch(err) {
        next(err)
    }
};


export default userController;