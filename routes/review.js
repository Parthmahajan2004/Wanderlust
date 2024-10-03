const express=require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require('../utils/ExpressError.js');
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{validateReview, isloggedIn, isReviewAuthor, isOwner} = require("../middleware.js")

const reviewController = require("../controllers/review.js")

//Reviews 

//Post Route
router.post("/", isloggedIn,validateReview , wrapasync(reviewController.createReview)
);

//Delete Review Route   
router.delete("/:reviewId",isloggedIn,isOwner,isReviewAuthor,wrapasync(reviewController.destroyReview))

module.exports = router;












