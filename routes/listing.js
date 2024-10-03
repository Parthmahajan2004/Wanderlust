const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const Listing = require("../models/listing.js")
const { isloggedIn, isOwner, validateListing } = require("../middleware.js")

const listingController = require("../controllers/listing.js");

const multer = require("multer")
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})



router.route("/")
    .get(
        wrapasync(listingController.index)
    )
    .post(isloggedIn,
       
       upload.single('listing[image]'),
       validateListing,
        wrapasync(listingController.createListing))
   

   
//New Route
router.get("/new", isloggedIn, listingController.renderNewForm)

router
    .route("/:id")
    .get( wrapasync(listingController.showListing))
    .put( isloggedIn, isOwner, 
       upload.single('listing[image]'),
        validateListing, wrapasync(listingController.updateListing))
    .delete( isloggedIn, isOwner, wrapasync(listingController.destroyListing));


//edit route
router.get("/:id/edit", isloggedIn, isOwner, wrapasync(listingController.renderEditForm));

module.exports = router;





