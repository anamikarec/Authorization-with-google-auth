

const express= require('express');
const router = express.Router();

const authenticated = require("../middlewares/authenticated");
const Post = require('../models/post.model');

router.post("/", authenticated, async (req,res)=>{
    try{
        console.log("is Authenticated",req.isAuthenticated());
        const post = await Post.create({
            title: req.body.title,
            author_id: req.body.author_id
        })

        if(!post){
            return res.status(400).json({msg: "Post not created"})
        }

        return res.status(200).json(post);
    }
    catch(err){
        return res.status(400).json({msg: "Post not created"})
    }
})

const isOwnedByUser = (model,id) => model.findById({ _id: id})[key] === value;

router.delete("/", authenticated, async (req,res)=>{
    try{
        const post = await Post.findById(req.body.post_id)
        console.log(post);
        if(post.author_id !== req.user.email)
        {
            return res.status(403).json({msg: "You are not authorized to delete this post"})
        }
        // const bool = isOwnedByUser(Post, req.body.post_id, 'author_id',req.body.email);
         const response = await Post.findOneAndDelete({ _id: req.body.post_id})
         if(!response)
         {
            return res.status(404).json({msg: "Post not found"})
         }
         return res.status(200).json({success: true})
    }
    catch(err){
        return res.status(400).json({msg: "Post not deleted"})
    }
})

module.exports = router;