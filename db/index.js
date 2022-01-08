const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db = mongoose.connection;

module.exports = db;