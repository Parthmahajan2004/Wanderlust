const mongoose = require("mongoose");
const initdata =  require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("connected to data base");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj, owner:"66ebb75a593d352d208d206b"}))
    await Listing.insertMany(initdata.data);
    console.log("data was initilized")
};

initDB();

