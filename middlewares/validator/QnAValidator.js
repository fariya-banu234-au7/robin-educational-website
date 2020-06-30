import pkg from 'express-validator';
const { check, oneOf, validationResult } = pkg;

// question body checker
export const questionCheker = [
    check('question')
    .exists().withMessage("Please write a question")
    .trim()
    .isLength({min: 10, max: 100}).withMessage("Question must be in between 10 - 100 words.")
];

// error handler
export const questionError = (req, res, next) => {
    try{
        // checking if there is any error
        validationResult(req).throw();
        // if not going forward
        next()
    } catch(err){
        req.app.locals.msg = err.array()[0].msg;
        // response
        res.redirect("/users/askMe?error=true");
    }
};


// answer checker
export const answerChecker = [
    check('answer')
    .exists().withMessage("Please give answer")
    .trim()
    .isLength({min: 10, max: 500}).withMessage("Answer must be in 10 - 500 words")
];


// answer error handler
export const answerError = (req, res, next) => {
    try{
        // checking if there is error
        validationResult(req).throw()
        // if not going forward
        next()
    } catch(err) {
        req.app.locals.msg = err.array()[0].msg;
        // response
        res.redirect("/admins/askMe?error=true");
    }
};


export const faqCreateError = (req, res, next) => {
    try{
        // checking if there is error
        validationResult(req).throw()
        // if not going forward
        next()
    } catch(err) {
        req.app.locals.msg = err.array()[0].msg;
        // response
        res.redirect("/faqs/new?error=true");
    }
}

// update check and error

export const checkForOne = oneOf([
    check('question').exists().not().isEmpty(),
    check('answer').exists().not().isEmpty()
], 'Please provide atleast one field');

export const checkBody = async(req, res, next) => {
    if(req.body.question){
        await check('question')
            .trim()
            .isLength({min: 10, max: 500}).withMessage('Question must be in between 10 - 500 words')
            .run(req)
    };
    if(req.body.answer){
        await check('answer')
            .trim()
            .isLength({min: 10, max: 1000}).withMessage('Answer must be in between 10 - 1000 words.')
            .run(req)
    };
    next();
}


export const faqUpdateError = (req, res, next) => {
    try{
        // checking if there is error
        validationResult(req).throw()
        // if not going forward
        next()
    } catch(err) {
        req.app.locals.msg = err.array()[0].msg;
        // response
        res.redirect(`/faqs/edit/${req.params.id}?error=true`);
    }
}