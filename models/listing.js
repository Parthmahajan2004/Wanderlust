const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ListingSchema = new schema({
    title: {
       type: String,
       required: true,
    },
    description: String,
    image:{
        url : String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner:{
        type: schema.Types.ObjectId,
        ref: "User",
    }
});

const Listing = mongoose.model("Listing" , ListingSchema);
module.exports = Listing;

