const express = require("express"); // bringing in express
const mongo = require("mongodb");
const connectDB = require('./config/db');

// initialize app variable with express
const app = express()


connectDB();

// simple get request and sends data to browser "API RUNNING"
// app.get("/", (req, res) => res.send("API RUNNING"));


app.use(express.json({extended: false})) // Initializing middlware that allows us to get the data in req.body


// Define Routes so that we can actually ACCESS the routes
app.use('/api/users', require('./routes/api/users')); // '/api/users' route pertains to the route in users.js. so you can make the .use('route name here', ...) can be anything
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// looks for environment variable called PORT to use when we deploy to heroku. If no environment set it will default to 6060
const PORT = process.env.PORT || 6060

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.get('/', (req, res) => {
    res.send("hello");
});