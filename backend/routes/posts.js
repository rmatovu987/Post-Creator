const express = require('express')
const Post = require("../models/post");

const router = express.Router()

router.get("", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        data: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        data: post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();

  res.status(201).json({
    message: "Post saved successfully",
  });
});

router.put("/:id", (req, res) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post)
    .then(() => {
      res.status(201).json({
        message: "Post updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({_id : req.params.id}).then(()=>{
    res.status(200).json({ message: "Post deleted succesffully" });
  }).catch((err)=>{
    console.log(err)
  });

});

module.exports = router;
