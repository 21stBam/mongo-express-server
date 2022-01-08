'use strict';

const express = require("express");
const routes = require("./routes/");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use('/api', routes);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 400);
    res.json({
        error: err.message
    });
});

module.exports = app;