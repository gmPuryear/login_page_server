// this is where we are doing our mongo DB connection
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// try catch will have it fail if we cannot connect and will throw an error
const connectDB = async () => {
    try {
        // we want to await here because we are waiting on the promise
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;