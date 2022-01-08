const axios = require('axios');
const mongoose = require('mongoose');
const Post = require('../db/models/posts');

(async function() {
    await mongoose.connect("mongodb://localhost:27017/posts", {
        useNewUrlParser: true
    });

    let posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.data);
    let players = await axios.get("https://www.balldontlie.io/api/v1/players?per_page=5")
        .then(response => response.data.data);
    
    let postData = [];
    posts.forEach(post => {
        let player = players[Math.floor((Math.random() * 5))];
        let {first_name, last_name} = player;
        let {body, title } = post
        post = {first_name, last_name, body, title};
        postData.push(post);
    });

    const result = await Post.create(postData);
    mongoose.connection.close();
})();





