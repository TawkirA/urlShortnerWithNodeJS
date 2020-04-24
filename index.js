const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = 7000;

app.use(bodyParser.json());
require('./models/shortUrl');
require('./routes/shortUrl') (app);

const mongoURI = "mongodb://localhost/short-url";
const mongoose = require('mongoose');
const connectOption = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOption, (err, db) => {
    if (err) console.log('Error', err);
    console.log('Connected to MongoDB');
});


app.listen(PORT, () => {
    console.log("Server started at port - ", PORT);
});