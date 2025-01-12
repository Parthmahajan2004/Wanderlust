const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-Mate");
const wrapasync = require("./utils/wrapasync.js");
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema } = require("./schema.js");

main().then(() => {
    console.log("connected to data base");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("hi i am root");
});

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMssg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings })
});

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

//create route
app.post("/listings",
    validateListing,
    wrapasync(async (req, res, next) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    }));


//edit route
app.get("/listings/:id/edit", wrapasync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
}));

//update route
app.put("/listings/:id",
    validateListing,
    wrapasync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        res.redirect(`/listings/${id}`);
    }));

//delete route
app.delete("/listings/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// app.get("/testlisting", async (req, res)=>{
//     let samplelisting = new Listing({
//         title: "My New Villa",
//         description: "by the beach",
//         price: 1200,
//         location: "calangute, Goa", 
//         country: "Bharat",
//     });
//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successfull testing");
// });, nnext


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
}
)

app.use((err, req, res, next) => {
    let { statusCode, message } = err;
    res.status(statusCode).render("error.ejs", { err });
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("server is listening to port 8080")
});





