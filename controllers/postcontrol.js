const post = require('../models/Post');

async function findPost (req, res) {
    await post.findAll().then(function(posts){
        res.render('home', {posts: posts})});
    res.json()
};

module.exports = findPost;