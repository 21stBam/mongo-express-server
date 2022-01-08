const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
    "first_name": {
        type: String,
        required: [true, 'First_name is required'],
        trim: true,
        lowercase: true,
    },
    "last_name": {
        type: String,
        required: [true, 'Last_name is required'],
        trim: true,
        lowercase: true,
    },
    "title": {type: String, required: true},
    "body": {type: String, required: true},
});

const Post = model("PostModel", PostSchema);

module.exports = Post;