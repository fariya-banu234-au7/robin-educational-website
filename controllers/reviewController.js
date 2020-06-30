import Review from './../models/reviewModel.js';

const reviewController = {};

reviewController.getAllReviews = async (req, res, next) => {
    try{
    const reviews = await Review.find({})
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            data: reviews
        }
    });
}catch(err){
res.status(404).json({
err
})
}
}

reviewController.createReview = async (req, res, next) => {
try{
    // console.log('hi from cretae revies controller');
    const newReview = await Review.create({ ...req.body });
    res.status(201).json({
        status: 'success',
        data: {
            data: newReview
        }
    });
}
catch(err){
res.status(404).json({
err
})
}
}

export default reviewController;