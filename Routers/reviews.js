const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review");
const ExpressError = require('../utils/expressError');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const { reviewSchema } = require('../schema');
const review = require('../controllers/review')

router.post('/', isLoggedIn, validateReview, catchAsync(review.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview));

module.exports = router;