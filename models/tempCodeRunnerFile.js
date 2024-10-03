const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ListingSchema = new schema({
    title: {
       type: String,
       required: true,
    },
    description: String,
    image:{
        type: String,
        set: (v)=> v === ""? 
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fcoder&psig=AOvVaw16TpZwsD48q-xuANMYBaCN&ust=1697650203516000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCqi_7N_YEDFQAAAAAdAAAAABAE" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing" , ListingSchema);
module.exports = Listing;