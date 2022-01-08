//server.js
"use strict";

const app = require("./app");
const db = require("./db");


const port = process.env.PORT || 3001;

app.listen(port, () => {
    try {
        console.log(`Server started on http://localhost:${port}`);
        db.once('open', function () {
            console.log('Connected to Mongoose');
        });
    } catch (error) {
        db.on('error', console.error.bind(console, 'connection error:'));
    }
});
