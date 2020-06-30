import express from 'express';
import reviewController from '../controllers/reviewController.js';

const reviewRouter = express.Router();

// reviewRouter.route('/').post( reviewController.createReview).get(reviewController.getAllReviews);

reviewRouter
    .post("/", reviewController.createReview)
    .get("/", reviewController.getAllReviews);


export default reviewRouter;