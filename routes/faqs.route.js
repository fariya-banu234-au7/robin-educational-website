// package
import express from 'express';
// controller
import faqController from '../controllers/faqs.controller.js';
// autherization
import  userAutherized  from '../middlewares/authorization/userAutherized.js';
import isAdmin from '../middlewares/authorization/isAdmin.js';
// validator
import { questionCheker, answerChecker, faqCreateError, checkForOne, checkBody, faqUpdateError } from "../middlewares/validator/QnAValidator.js"

// router
const faqRoute = express.Router();

// paths

// rendering pages
// create page
faqRoute.get(
    "/new",
    userAutherized,
    isAdmin,
    faqController.new
);

// update page
faqRoute.get(
    "/edit/:id",
    userAutherized,
    isAdmin,
    faqController.edit
);

// only admin has access to create faq
faqRoute.post(
    "/create",
    userAutherized,
    isAdmin,
    questionCheker,
    answerChecker,
    faqCreateError,
    faqController.create
);

// update faq
faqRoute.post(
    "/update/:id",
    userAutherized,
    isAdmin,
    checkForOne,
    checkBody,
    faqUpdateError,
    faqController.update
);

// deleting faq by id
faqRoute.get(
    "/delete/:id",
    userAutherized,
    isAdmin,
    faqController.delete
);

// Anyone can see FAQs
faqRoute.get(
    "/show",
    faqController.show
);


// export 
export default faqRoute;