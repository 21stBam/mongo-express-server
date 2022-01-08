const router = require("express").Router();
const Post = require("../db/models/posts");

function asyncHandler(cb){
    return async (req,res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}


router.get("/", asyncHandler(async (req, res) => {
    let filter = {};
    let limit = {};
    if (req.query.limit) {
        limit = {limit: req.query.limit};
    }
    if (req.query.first_name) {
        filter = {...filter, first_name: req.query.first_name};
    }
    if (req.query.last_name) {
        filter = {...filter, last_name: req.query.last_name};
    }
    const posts = await Post.find(filter, null, limit);
    return res.status(200).json({ status: true, data: posts });
}));

router.get("/:id", asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    return res.status(200).json({status: true, data: post});
}));

router.post("/", asyncHandler(async (req, res) => {
    const post = req.body;
    const result = await Post.create(post);
    return res.status(200).json({status: true, data: result});
}));

router.put("/:id", asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    const result = await Post.updateOne(post, req.body);
    return res.status(200).json({status: true, data: result});
}));

router.delete("/:id", asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    const result = await Post.deleteOne(post);
    return res.status(200).json({status: true, data: result});
}));

module.exports = router;