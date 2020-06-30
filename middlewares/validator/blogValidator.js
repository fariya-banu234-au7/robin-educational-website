import pkg from 'express-validator';
const { check, oneOf, validationResult } = pkg;

// for new blog
export const bodyChecker = [
        check('title')
            .exists().withMessage('please provide a title')
            .trim()
            .isLength({min: 3, max: 30}).withMessage("Title must be in between 3 - 30 words."),

        check('body')
            .exists().withMessage('please provide content')
            .trim()
            .isLength({min: 10, max: 5000}).withMessage('Content must be in between 10 - 5000 words'),

        check('tag')
            .exists().withMessage('please provide tag')
            .trim()
            .isLength({min: 2}).withMessage('Please give a valid tag')
];


// for update
export const checkForOne = oneOf([
    check('title').exists().not().isEmpty(),
    check('body').exists().not().isEmpty(),
    check('tag').exists().not().isEmpty()
], 'Please provide atleast one field');


export const updateBodyChecker = async(req, res, next) => {
    if(req.body.title){
        await check('title')
                .exists().withMessage('please provide a title')
                .trim()
                .isLength({min: 3, max: 30}).withMessage("Title must be in between 3 - 30 words.")
                .run(req);
    }
    if(req.body.body){
        await check('body')
                .exists().withMessage('please provide content')
                .trim()
                .isLength({min: 10, max: 5000}).withMessage('Content must be in between 10 - 5000 words')
                .run(req);
    }
    if(req.body.tag){
        await check('tag')
                .exists().withMessage('please provide tag')
                .trim()
                .isLength({min: 2}).withMessage('Please give a valid tag')
                .run(req);
    }
    next();
};


// error handlers
export const createError = (req, res, next) => {
    try{
        validationResult(req).throw();
        next()
    } catch(err){
        req.app.locals.msg = err.array()[0].msg;
        res.redirect('/blogs/new?error=true');
    }
};


export const updateError = (req, res, next) => {
    try{
        validationResult(req).throw();
        next()
    } catch(err){
        req.app.locals.msg = err.array()[0].msg;
        res.redirect(`/blogs/edit/${req.params.id}?error=true`);
    }
};