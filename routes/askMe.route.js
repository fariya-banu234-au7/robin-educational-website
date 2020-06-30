// import packages
import express from 'express';

// controller file
import askMeController from '../controllers/askMe.controller.js';
// validator
import { questionCheker, questionError, answerChecker, answerError } from "../middlewares/validator/QnAValidator.js"
// authorization
import userAutherized from '../middlewares/authorization/userAutherized.js';
import isAdmin from "../middlewares/authorization/isAdmin.js";


// creating route
const askMeRoute = express.Router();


// defining routes

// ask question route
askMeRoute.post(
    "/askQuestion/:user",
    userAutherized,
    questionCheker,
    questionError,
    askMeController.createQuestion
);

// answer route
askMeRoute.post(
    "/answer/:id",
    userAutherized,
    isAdmin,
    answerChecker,
    answerError,
    askMeController.answer
);


// exporting file
export default askMeRoute;