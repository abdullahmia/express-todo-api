const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

// importing routers
const todoHandler = require('./routeHandler/todoHandler');

// Express app initlialization
const app = express();
app.use(express.json());

// Mongodb connection with mongoose
mongoose.connect(process.env.db)
    .then(() => {
        console.log('Db connect success');
    })
    .catch(err => {
        console.log(err);
    })

// application routes

app.use('/todo', todoHandler);




// server listen
app.listen(process.env.port, () => {
    console.log(`Server is running at ${process.env.port}`);
})