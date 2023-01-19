// bringing in express
const express = require('express');
const {connectDb} = require("./config/index");
const {config} = require("dotenv");

// initialize app variable with express
const app = express();

// DATABASE
connectDb(config.MONGO_URI, app)
// const PORT = 6060;
// connectDb(config.MONGO_URI, app)

// connect database
// connectDB();

// simple get request and sends data to browser "API RUNNING"
app.get('/', (req, res) => res.send('API RUNNING'));

// looks for environment variable called PORT to use when we deploy to heroku. If no environment set it will default to 5000
const PORT = process.env.PORT || 6060;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));