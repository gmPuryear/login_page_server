const mongoose = require('mongoose');
const config = require('config');
const {mongo} = require("mongoose");
const db = config.get("mongoURI"); // gets whatever from whatever is in the default.json file


// ---------------- WHY DID THIS NOT WORK ----------------

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
            // useNewUrlParser: true
        }); // once its connected to DB, run the console.log
        console.log("🟢 Mongo DB connected")
    } catch (err) {
        console.error(err.message); // sends stock error message from mongoDB
        process.exit(1); //  Exit process with failure
    }
}

module.exports = connectDB;