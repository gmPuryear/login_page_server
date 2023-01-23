// // bringing in express
// const express = require('express');
// const {connectDb} = require("./config/index");
// const mongo = require("mongodb")
// const {config} = require("dotenv");
//
// // initialize app variable with express
// const app = express();
//
// // DATABASE
// connectDb(config.MONGO_URI, app)
// // const PORT = 6060;
//
// // connect database
// // connectDB();
//
// // simple get request and sends data to browser "API RUNNING"
// app.get('/', (req, res) => res.send('API RUNNING'));
//
// // looks for environment variable called PORT to use when we deploy to heroku. If no environment set it will default to 5000
// const PORT = process.env.PORT || 6060;
//
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// bringing in express
const express = require("express")
const mongo = require("mongodb")

// initialize app variable with express
const app = express()

// DATABASE

const connectDB = async () => {
    const client = new mongo.MongoClient(
        "mongodb+srv://adminUser:gjFjsAFhRgT9qT6h@loginpagepractice.oqqo8jo.mongodb.net/?retryWrites=true&w=majority"
    )
    try {
        client.connect()
        console.log("\n🟢 Database connected.")
    } catch (err) {
        await client.close()
        throw new Error("❌ Database connection error.")
    }
}

connectDB();

// simple get request and sends data to browser "API RUNNING"
app.get("/", (req, res) => res.send("API RUNNING"));

// Init Middleware (allows us to get the data in response.body)
app.use(express.json({extended: false}));


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// looks for environment variable called PORT to use when we deploy to heroku. If no environment set it will default to 5000
const PORT = process.env.PORT || 6060

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))