import pkg from 'express-validator';
const { check, oneOf, validationResult } = pkg;

// importing custom email checker
import isUniqEmail from "../../utils/customValidator.js";

// for signin
const bodyChecker = [
        check('email')
            .exists().withMessage('please provide a email')
            .isEmail().withMessage('please give valid email address')   
            .custom(isUniqEmail).withMessage('Email Already in Use. Please provide another'),

        check('name')
            .exists().withMessage('please provide a name')
            .trim()
            .isLength({min: 1}).withMessage('name must not be blank'),

        check('password')
            .exists().withMessage('please provide password')
            .trim()
            .isLength({min: 5}).withMessage('Password must be atleast 5 char long.')
];


// for update
const checkForOne = oneOf([
    check('email').exists().not().isEmpty(),
    check('password').exists().not().isEmpty(),
    check('name').exists().not().isEmpty()
], 'Please provide atleast one field');


const updateBodyChecker = async(req, res, next) => {
    if(req.body.name){
        await check('name')
                .trim()
                .isLength({min: 1}).withMessage('name must not be blank')
                .run(req);
    }
    if(req.body.newPassword){
        await check('password')
                .trim()
                .isLength({min: 5}).withMessage('Password must be atleast 5 char long.')
                .run(req);
    }
    if(req.body.email){
        await check('email')
                .isEmail().withMessage('please give valid email address')   
                .custom(isUniqEmail).withMessage('Email Already in Use. Please provide another')
                .run(req);
    }
    next();
};

// password checker
const keyNpassword = [
    check('password')
    .exists().withMessage('please provide password')
    .trim()
    .isLength({min: 5}).withMessage('Password must be atleast 5 char long.'),

    check('key')
    .exists()
    .not().isEmpty().withMessage('Plese give key')
    .trim()
    .isLength({min: 1}).withMessage('Please give a valid key'),
];


const siginError = (req, res, next) => {
    try{
        validationResult(req).throw();
        next()
    } catch(err){
        req.app.locals.msg = err.array()[0].msg;
        res.redirect('/signin?error=true');
    }
};


const updateError = (req, res, next) => {
    try{
        validationResult(req).throw();
        next()
    } catch(err){
        req.app.locals.msg = err.array()[0].msg;
        res.redirect('/update?error=true');
    }
};


const keyError = (req, res, next) => {
    try{
        validationResult(req).throw();
        next()
    } catch(err){
        req.app.locals.msg = err.array()[0].msg;
        res.redirect('/makePassword?error=true');
    }
};


const validators = {
    bodyChecker,
    keyNpassword,
    siginError,
    checkForOne,
    updateBodyChecker,
    updateError,
    keyError
};


export default validators;