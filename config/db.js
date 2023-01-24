const mongoose = require('mongoose');
const config = require('config');
const {mongo} = require("mongoose");
const db = config.get("mongoURI"); // gets whatever from whatever is in the default.json file


// ---------------- WHY DID THIS NOT WORK ----------------

// const connectDB = async () => {
//     try {
//         mongoose.set('strictQuery', true);
//         await mongoose.connect(db, {
//             useNewUrlParser: true
//         }); // once its connected to DB, run the console.log
//         console.log("mongo DB connected")
//     } catch (err) {
//         console.error(err.message); // sends stock error message from mongoDB
//         process.exit(1); //  Exit process with failure
//     }
// }

// ---------------- BUT THIS ONE DID --------------

const connectDB = async () => {
    const client = new mongo.MongoClient(
        db // MongoDB URI from db.js file
    )
    try {
        client.connect()
        console.log("\n🟢 Database connected.")
    } catch (err) {
        await client.close()
        throw new Error("❌ Database connection error.")
    }
}

module.exports = connectDB;